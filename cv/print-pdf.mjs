// Print an HTML file to PDF with headless Firefox over WebDriver BiDi.
// Usage: node print-pdf.mjs <input.html> <output.pdf> <profileDir>
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const [input, output, profile] = process.argv.slice(2);
const PORT = 9333;
mkdirSync(profile, { recursive: true });

const ff = spawn("firefox", ["--headless", "--no-remote", "--profile", profile, `--remote-debugging-port=${PORT}`], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 60; i++) {
  try {
    ws = await new Promise((res, rej) => {
      const s = new WebSocket(`ws://127.0.0.1:${PORT}/session`);
      s.onopen = () => res(s);
      s.onerror = rej;
    });
    break;
  } catch { await sleep(500); }
}
if (!ws) { ff.kill(); throw new Error("could not connect to Firefox"); }

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.type === "error" ? rej(new Error(`${msg.error}: ${msg.message}`)) : res(msg.result);
  }
};
const send = (method, params = {}) => new Promise((res, rej) => {
  const n = ++id;
  pending.set(n, { res, rej });
  ws.send(JSON.stringify({ id: n, method, params }));
});

try {
  await send("session.new", { capabilities: {} });
  const { contexts } = await send("browsingContext.getTree", {});
  const context = contexts[0].context;
  await send("browsingContext.navigate", { context, url: "file://" + resolve(input), wait: "complete" });
  await send("script.evaluate", { expression: "document.fonts.ready.then(() => document.fonts.size)", target: { context }, awaitPromise: true });
  await sleep(800);
  const { data } = await send("browsingContext.print", {
    context,
    background: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    page: { width: 21.59, height: 27.94 },
    shrinkToFit: false,
  });
  writeFileSync(output, Buffer.from(data, "base64"));
  console.log("wrote", output);
  await send("session.end", {}).catch(() => {});
} finally {
  ws.close();
  ff.kill();
}

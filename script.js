// ---------- Clock (Sonora has no DST: America/Hermosillo) ----------
const clock = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Hermosillo",
  hour: "2-digit",
  minute: "2-digit",
});
const tick = () => { clock.textContent = fmt.format(new Date()); };
tick();
setInterval(tick, 30_000);

// ---------- Skill dots ----------
document.querySelectorAll(".dots").forEach((el) => {
  const level = Number(el.dataset.level);
  el.setAttribute("aria-label", `${level}/3`);
  el.setAttribute("role", "img");
  el.innerHTML = [1, 2, 3].map((n) => `<i class="${n <= level ? "on" : ""}"></i>`).join("");
});

// ---------- Pixel meteors (the motif from Romina's CV) ----------
const METEOR = [
  "..........rroo..",
  "......rrooyyyvv.",
  "..rrrooyyywvvvv.",
  "rrooyyywwwvvbvvv",
  "..rrrooyyywvvvv.",
  "......rrooyyyvv.",
  "..........rroo..",
];
const COLORS = { r: "#e8442a", o: "#ff8a3d", y: "#ffd23f", w: "#fff6d6", v: "#3b4fd8", b: "#9fb4ff" };

function meteorSvg() {
  const rects = METEOR.flatMap((row, y) =>
    [...row].map((c, x) => (c === "." ? "" : `<rect x="${x}" y="${y}" width="1" height="1" fill="${COLORS[c]}"/>`))
  ).join("");
  return `<svg viewBox="0 0 16 7" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

const sky = document.querySelector(".meteors");
[
  { top: "8%", left: "30%", delay: "0s", scale: 1 },
  { top: "62%", left: "80%", delay: "-3s", scale: .7 },
  { top: "74%", left: "3%", delay: "-6s", scale: .55 },
].forEach(({ top, left, delay, scale }) => {
  const m = document.createElement("div");
  m.className = "meteor";
  m.style.cssText = `top:${top};left:${left};animation-delay:${delay};scale:${scale}`;
  m.innerHTML = meteorSvg();
  sky.append(m);
});
[["14%", "62%"], ["40%", "6%"], ["93%", "30%"], ["30%", "92%"], ["55%", "40%"]].forEach(([top, left]) => {
  const p = document.createElement("span");
  p.className = "pixel";
  p.style.cssText = `top:${top};left:${left}`;
  sky.append(p);
});

// ---------- Translations (English lives in the HTML, Spanish here) ----------
const ES = {
  "nav.profile": "Perfil",
  "nav.projects": "Proyectos",
  "nav.process": "Proceso",
  "nav.contact": "Contacto",
  "hero.meta": "Portafolio de Project Manager",
  "tag.plan": "Planear",
  "tag.build": "Construir",
  "tag.ship": "Entregar",
  "hero.lede": "Project manager con experiencia en desarrollo. Acompaño a mi equipo desde el primer brief hasta el release, y me aseguro de comprender con humanidad las necesidades del cliente y de mi equipo.",
  "icon.profile": "perfil",
  "icon.projects": "proyectos",
  "icon.process": "proceso",
  "icon.contact": "contacto.txt",
  "profile.statement": "Estudié Ingeniería en Producción Multimedia, así que tengo un perfil amplio en diseño y desarrollo. Llevé la creatividad al desarrollo y, después, a la gestión de proyectos.",
  "id.name": "Nombre",
  "id.based": "Ubicación",
  "id.langs": "Idiomas",
  "id.langsv": "Español, inglés (certificado EF SET)",
  "id.highlight": "Destacado",
  "id.highlightv": "Participé en la certificación CMMI nivel 5 de la empresa (2026)",
  "id.looking": "Busco",
  "id.lookingv": "Puestos de project manager, remoto o híbrido",
  "cv": "Descargar CV (PDF)",
  "h.exp": "Experiencia",
  "h.edu": "Educación",
  "h.cert": "Certificaciones",
  "h.skills": "Habilidades",
  "now": "2024 – hoy",
  "role.dev": "Desarrolladora Full-stack",
  "role.hr": "Becaria de RH, Backend",
  "role.support": "Soporte a jugadores (bilingüe)",
  "edu.deg": "Ingeniería en Producción Multimedia",
  "edu.where": "Universidad La Salle Noroeste, 2023. Promedio 9.8",
  "cert.ef": "Inglés EF SET",
  "cert.ux": "Curso de UI/UX",
  "sk.plan": "Planeación de proyectos",
  "sk.cmmi": "Prácticas CMMI 5",
  "sk.comms": "Comunicación con stakeholders",
  "proj.hint": "Abre una carpeta para leer el caso de estudio.",
  "proc.lede": "Así se mueve un proyecto cuando yo lo dirijo. Las mismas cuatro etapas, sea una funcionalidad de dos semanas o una plataforma de un año.",
  "step.discovery": "Descubrimiento",
  "step.discovery.p": "Me siento con el cliente y el equipo hasta que el problema quede escrito en un párrafo que todos aprueben.",
  "step.planning": "Planeación",
  "step.planning.p": "Alcance, estimaciones y riesgos, documentados al estilo CMMI, para que nadie tenga que adivinar qué significa “terminado”.",
  "step.delivery": "Entrega",
  "step.delivery.p": "Iteraciones cortas, reportes de estado honestos y ojo de desarrolladora sobre los bloqueos antes de que se vuelvan retrasos.",
  "step.review": "Revisión",
  "step.review.p": "Medimos contra el plan, hacemos la retro y lo aprendido alimenta el siguiente proyecto.",
  "contact.big": "¿Buscas una project manager que hable el idioma de los desarrolladores?",
  "contact.text": "Estoy buscando mi siguiente puesto como PM. Escríbeme o llámame y te respondo en menos de un día.",
  "contact.email": "Escríbeme",
  "contact.call": "Llámame",
  "contact.mail": "Correo",
  "contact.phone": "Teléfono",
  "ticker": "Disponible para puestos de project manager ✱ Remoto o Sonora, México ✱ Bilingüe ES / EN ✱ ",
};
const LABELS = { close: { en: "Close window", es: "Cerrar ventana" } };

// ---------- Projects ----------

const projects = [
  {
    id: "customs",
    name: { en: "Customs platform", es: "Plataforma aduanal" },
    meta: { en: "Project management, public sector", es: "Gestión de proyectos, sector público" },
    facts: {
      en: { Role: "Project Manager", Client: "Federal customs agency (confidential)", Team: "2 teams, each 3 devs, 1 QA, 1 UI/UX", Method: "CMMI levels 3 and 5", When: "Apr – Sep 2025" },
      es: { Rol: "Project Manager", Cliente: "Dependencia federal de aduanas (confidencial)", Equipo: "2 equipos, cada uno con 3 devs, 1 QA, 1 UI/UX", Metodología: "CMMI niveles 3 y 5", Fechas: "Abr – sep 2025" },
    },
    overview: {
      en: "A system of control mechanisms to record, track and enforce the rulings from customs administrative proceedings, along with the legal challenges filed against them. It was a large program with every module built in parallel; I was assigned two of them and led them from requirements gathering to formal client acceptance.",
      es: "Un sistema de medios de control para registrar, dar seguimiento y cumplimentar las resoluciones derivadas de procedimientos administrativos en materia aduanera, así como los medios de defensa interpuestos contra ellas. Era un macroproyecto con todos sus módulos desarrollándose en paralelo; me asignaron dos y los llevé desde el levantamiento de requerimientos hasta la aceptación formal del cliente.",
    },
    modules: [
      {
        name: { en: "Queries", es: "Consultas" },
        desc: {
          en: "Lets users search the records kept in the system’s related modules, specifically customs administrative proceedings (PAMA).",
          es: "Permite a los usuarios consultar los registros resguardados en los módulos alternos del sistema, en específico los de PAMA.",
        },
        stats: { en: ["9 iterations", "~13 requirements, split into user stories", "Apr 14 – Sep 26"], es: ["9 iteraciones", "~13 requerimientos, desglosados en HUs", "14 abr – 26 sep"] },
      },
      {
        name: { en: "Revocation appeals", es: "Recursos de revocación" },
        desc: {
          en: "Modernizes how the agency manages the administrative appeals that taxpayers file against customs authority decisions.",
          es: "Moderniza la gestión de los recursos administrativos que interponen los contribuyentes contra actos de la autoridad aduanera.",
        },
        stats: { en: ["5 iterations", "~11 requirements, split into user stories", "Jun 2 – Aug 15"], es: ["5 iteraciones", "~11 requerimientos, desglosados en HUs", "2 jun – 15 ago"] },
      },
    ],
    challenge: {
      en: "Two voices for one client. The agency’s IT department sometimes relayed the end users’ feedback and acted as the client itself, so I had to keep the business users and IT aligned on the same requirements.",
      es: "Dos voces para un mismo cliente. El área de TI de la dependencia a veces canalizaba los comentarios del usuario final y tomaba el rol de cliente, así que tenía que mantener alineados al área usuaria y a TI sobre los mismos requerimientos.",
    },
    did: {
      en: [
        "Ran requirements-gathering meetings with the business users and the agency’s IT department.",
        "Followed the full CMMI level 3 flow with the company’s own formats: requirements specification, backlog of user stories, effort and cost estimates, and project plan.",
        "Coordinated two teams, one per module, each with 3 developers, 1 QA and 1 UI/UX designer.",
        "Tracked the work on the company’s own ERP, with a Kanban board adapted to CMMI, and kept project records in SharePoint and GitHub.",
        "Re-estimated the minor changes that came up during demos and delivered them on the new estimate.",
        "Led acceptance sessions with the client until every requirement was signed off.",
      ],
      es: [
        "Dirigí las reuniones de levantamiento de requerimientos con el área usuaria y el área de TI de la dependencia.",
        "Seguí el flujo completo de CMMI nivel 3 con los formatos propios de la empresa: especificación de requerimientos, backlog con HUs, estimación de esfuerzo y económica, y plan de proyecto.",
        "Coordiné dos equipos, uno por módulo, cada uno con 3 desarrolladores, 1 QA y 1 diseñador UI/UX.",
        "Di seguimiento en el ERP propio de la empresa, con tablero Kanban adaptado a CMMI, y resguardé la información en SharePoint y GitHub.",
        "Reestimé los cambios menores que surgieron en las demos y los entregué de acuerdo con la nueva estimación.",
        "Conduje las sesiones de aceptación con el cliente hasta que todos los requerimientos quedaron aceptados.",
      ],
    },
    improvement: {
      intro: {
        en: "As PM I started applying CMMI level 5 practices together with the company’s Integrated Management System (SGI) team. We tracked five indicators:",
        es: "Como PM empecé a aplicar prácticas de CMMI nivel 5 junto con el área de SGI (Sistema de Gestión Integral). Medíamos cinco indicadores:",
      },
      metrics: {
        en: ["Effort deviation", "Schedule deviation", "Internal defect density", "Client defect density", "Peer-review defect density"],
        es: ["Desviación de esfuerzo", "Desviación de avance", "Densidad de defectos interna", "Densidad de defectos con el cliente", "Densidad de defectos en revisión por pares"],
      },
      steps: {
        en: ["Root cause analysis (5 whys)", "Statistical analysis of the baseline data", "Formal corrective action proposal", "Rollout of the improvement", "New analysis to show the improvement", "Significance test to rule out chance"],
        es: ["Análisis de causa raíz (5 porqués)", "Análisis estadístico de los datos iniciales", "Propuesta formal de acción correctiva", "Despliegue de la mejora", "Nuevo análisis para demostrar la mejora", "Prueba de significancia para descartar coincidencia"],
      },
      fixes: [
        {
          title: { en: "Peer reviews inside the ERP", es: "Revisiones por pares dentro del ERP" },
          problem: {
            en: "Peer reviews came back almost perfect while QA kept finding bugs. Across 442 reviews in the company’s projects, 58% reported zero defects.",
            es: "Las revisiones por pares salían casi perfectas mientras QA seguía encontrando bugs. De 442 revisiones en los proyectos de la empresa, el 58% reportaba cero defectos.",
          },
          cause: {
            en: "Reviews lived in an Excel file outside the ERP where the team manages its daily work, so nobody could see which features were still unreviewed. The template also had no “N/A” option, so items that didn’t apply were marked as passed.",
            es: "Las revisiones se registraban en un Excel fuera del ERP donde el equipo gestiona su trabajo diario, así que nadie veía qué funcionalidades seguían sin revisión. Además, la plantilla no tenía opción “N/A”, y lo que no aplicaba se marcaba como cumplido.",
          },
          actions: {
            en: [
              "Reviewed the peer-review checklist with the developers.",
              "Set up peer-review training for PMs and developers.",
              "Designed and built peer reviews inside the ERP: tied to each feature on the Kanban board, with automatic reviewer assignment, follow-up of every finding, and an N/A option.",
            ],
            es: [
              "Revisé el checklist de revisión por pares con los desarrolladores.",
              "Se agendó una capacitación en revisión por pares para PMs y desarrolladores.",
              "Diseñé y desarrollé las revisiones por pares dentro del ERP: ligadas a cada funcionalidad en el tablero Kanban, con asignación automática de revisores, seguimiento de cada observación y opción N/A.",
            ],
          },
          results: [
            { value: "0.29 → 1.12", label: { en: "peer-review defect density: reviews now catch real defects", es: "densidad de defectos en revisión por pares: ahora detectan defectos reales" } },
            { value: "p < 0.001", label: { en: "statistically significant, and still stable a month later", es: "estadísticamente significativa, y estable un mes después" } },
            { value: "Cpk 0.88 → 1.04", label: { en: "process capability, +18%", es: "capacidad del proceso, +18%" } },
          ],
        },
        {
          title: { en: "Migration to GitLab", es: "Migración a GitLab" },
          problem: {
            en: "In my two modules, rework and defect density went over the company thresholds (4% rework, 0.10 defect density), with rework peaks of up to 46%.",
            es: "En mis dos módulos, el retrabajo y la densidad de defectos superaron los umbrales de la empresa (4% de retrabajo, 0.10 de densidad de defectos), con picos de retrabajo de hasta 46%.",
          },
          cause: {
            en: "Fixed bugs came back because several teams worked on the same branch and overwrote each other’s fixes. The free version of GitHub didn’t allow branch protection or per-team permissions.",
            es: "Los bugs corregidos volvían porque varios equipos trabajaban sobre la misma rama y sobrescribían las correcciones de otros. La versión gratuita de GitHub no permitía proteger ramas ni dar permisos por equipo.",
          },
          actions: {
            en: [
              "Evaluated repository management tools and chose GitLab.",
              "Wrote the improvement plan and the GitLab user manual.",
              "Rolled out GitLab across the organization, with protected branches and per-team access.",
            ],
            es: [
              "Evalué herramientas de gestión de repositorios y elegimos GitLab.",
              "Elaboré el plan de mejora y el manual de uso de GitLab.",
              "Desplegamos GitLab en la organización, con ramas protegidas y accesos por equipo.",
            ],
          },
          results: [
            { value: "6.0% → 0.68%", label: { en: "average rework, −88.7% (p = 0.005)", es: "retrabajo promedio, −88.7% (p = 0.005)" } },
            { value: "Cpk 0.13 → 1.00", label: { en: "rework process capability", es: "capacidad del proceso de retrabajo" } },
            { value: "< 3%", label: { en: "rework held under 3% after the change, with no more extreme peaks", es: "retrabajo sostenido por debajo de 3%, sin más picos extremos" } },
          ],
        },
      ],
    },
    values: { en: ["Clear requirements", "CMMI quality", "Continuous improvement"], es: ["Requerimientos claros", "Calidad CMMI", "Mejora continua"] },
    outcome: {
      en: "The original scope of both modules was delivered on time and as specified. Changes requested during demos were re-estimated and delivered on the new estimate, and the client accepted every requirement in formal acceptance sessions. Along the way, two corrective actions cut rework by 88.7% and made peer reviews catch real defects; I later presented both at the company’s CMMI level 5 appraisal.",
      es: "El alcance original de ambos módulos se entregó en tiempo y forma. Los cambios que surgieron en las demos se reestimaron y se entregaron según la nueva estimación, y el cliente aceptó todos los requerimientos en sesiones formales de aceptación. En el camino, dos acciones correctivas redujeron el retrabajo 88.7% e hicieron que las revisiones por pares detectaran defectos reales; después presenté ambas en el appraisal de CMMI nivel 5 de la empresa.",
    },
  },
  {
    id: "cmmi5",
    name: { en: "CMMI level 5", es: "CMMI nivel 5" },
    meta: { en: "Process improvement and appraisal", es: "Mejora de procesos y appraisal" },
    facts: {
      en: { Role: "Project Manager and process improvement", Company: "Mediaérea", Consultant: "SIE Center", Appraisal: "July 2026" },
      es: { Rol: "Project Manager y mejora de procesos", Empresa: "Mediaérea", Consultoría: "SIE Center", Appraisal: "Julio 2026" },
    },
    overview: {
      en: "The company held CMMI level 3 and set out to reach level 5. Alongside my work as PM, I helped improve our software operations procedures with the external consultant, trained the teams on every change, and presented at the appraisal. The company achieved level 5.",
      es: "La empresa tenía CMMI nivel 3 y se propuso alcanzar el nivel 5. Además de mi trabajo como PM, ayudé a mejorar nuestros procedimientos de operaciones de software con el consultor externo, capacité a los equipos en cada cambio y presenté en el appraisal. La empresa obtuvo el nivel 5.",
    },
    challenge: {
      en: "Practice versus reality. Every procedure had to meet the CMMI practices and still fit how the organization actually operates, so it would work day to day and not only on paper.",
      es: "La práctica contra la realidad. Cada procedimiento tenía que cumplir con las prácticas de CMMI y, al mismo tiempo, acoplarse a la realidad operativa de la organización, para que funcionara en el día a día y no solo en papel.",
    },
    did: {
      en: [
        "Joined the sessions with the SIE Center consultant, took in their feedback and recommendations, and sent the relevant improvements to the SGI team.",
        "Updated the software operations procedures so they met the practices and fit the way the organization really works.",
        "Trained the teams on every procedure update, in groups by role.",
        "Prepared evidence and took part in the appraisal interviews.",
        "Presented the CAR and DAR practices (causal analysis and decision making) as well as the project management practices. For CAR I presented my two corrective actions from the customs project, peer reviews and GitLab, each with its improvement plan.",
        "Two of my projects were presented as evidence in the appraisal.",
      ],
      es: [
        "Participé en las sesiones con el consultor de SIE Center, recibí su retroalimentación y recomendaciones, y envié las mejoras pertinentes al SGI.",
        "Actualicé los procedimientos de operaciones de software para que cumplieran con las prácticas y se acoplaran a la realidad operativa de la organización.",
        "Capacité a los equipos en cada actualización de los procedimientos, en grupos por rol.",
        "Preparé evidencias y participé en las entrevistas del appraisal.",
        "Presenté las prácticas de CAR y DAR (análisis causal y toma de decisiones), además de las de gestión de proyectos. En CAR presenté mis dos acciones correctivas del proyecto aduanal, revisiones por pares y GitLab, cada una con su plan de mejora.",
        "Dos de mis proyectos se presentaron como evidencia en el appraisal.",
      ],
    },
    trained: {
      en: ["Project managers (5–8)", "Developers (20–30)", "QA (5)", "Technical writers (4)"],
      es: ["Project managers (5–8)", "Desarrolladores (20–30)", "QA (5)", "Documentadores (4)"],
    },
    values: { en: ["Continuous improvement", "Practical processes", "Data-driven decisions"], es: ["Mejora continua", "Procesos que funcionan", "Decisiones con datos"] },
    outcome: {
      en: "The company achieved CMMI level 5 in July 2026.",
      es: "La empresa obtuvo la certificación CMMI nivel 5 en julio de 2026.",
    },
    results: [
      { value: { en: "Level 5", es: "Nivel 5" }, label: { en: "CMMI achieved, July 2026", es: "CMMI obtenido, julio 2026" } },
      { value: { en: "2 projects", es: "2 proyectos" }, label: { en: "of mine presented as evidence", es: "míos presentados como evidencia" } },
      { value: { en: "4 roles", es: "4 roles" }, label: { en: "trained on every procedure update", es: "capacitados en cada actualización" } },
    ],
  },
  {
    id: "erp",
    name: { en: "MA-ERP", es: "MA-ERP" },
    meta: { en: "Internal project management platform", es: "Plataforma interna de gestión de proyectos" },
    facts: {
      en: { Role: "Project Manager", Team: "2 devs, 1 QA", Stack: "Laravel, Tailwind", When: "Feb 2025 – now" },
      es: { Rol: "Project Manager", Equipo: "2 devs, 1 QA", Stack: "Laravel, Tailwind", Fechas: "Feb 2025 – hoy" },
    },
    overview: {
      en: "The company already had a simple internal ERP for projects, clients and staff, with a basic Kanban board, and paid for GitScrum, which kept causing problems. After the CMMI level 3 certification we decided to cut the GitScrum spend and grow the internal tool into the place where the whole CMMI process lives. I lead it as PM, through improvement phases that started in February 2025 and are still going.",
      es: "La empresa ya tenía un ERP interno sencillo para proyectos, clientes y colaboradores, con un tablero Kanban básico, y pagaba GitScrum, que presentaba muchos problemas. Después de la certificación CMMI nivel 3 decidimos reducir el gasto en GitScrum y convertir la herramienta interna en el lugar donde vive todo el proceso CMMI. Lo dirijo como PM, en fases de mejora que iniciaron en febrero de 2025 y continúan hasta hoy.",
    },
    gallery: [
      { src: "assets/erp/board.webp", w: 1908, h: 865, caption: { en: "Kanban board per project, with iterations, QA and integration columns", es: "Tablero Kanban por proyecto, con iteraciones y columnas de QA e integración" } },
      { src: "assets/erp/backlog.webp", w: 1916, h: 881, caption: { en: "Backlog: requirements broken into features that become cards on the board", es: "Backlog: requerimientos desglosados en funcionalidades que se vuelven tarjetas del tablero" } },
      { src: "assets/erp/peer-review.webp", w: 1914, h: 865, caption: { en: "Peer review tied to a feature, with frontend and backend checklists", es: "Revisión por pares ligada a una funcionalidad, con checklist de frontend y backend" } },
    ],
    challenge: {
      en: "Make the process the easy path. Every CMMI format that lived in an Excel file on SharePoint was a step people could skip. Built into the tool the team already uses every day, the practice happens as part of the work.",
      es: "Que el proceso sea el camino fácil. Cada formato de CMMI que vivía en un Excel en SharePoint era un paso que se podía saltar. Dentro de la herramienta que el equipo ya usa a diario, la práctica sucede como parte del trabajo.",
    },
    did: {
      en: [
        "Backlog module: requirements broken into features with user stories, acceptance criteria, business rules, critical dependencies and effort estimates. Each feature becomes a card on the board.",
        "Peer reviews tied to each feature, with frontend and backend checklists and every finding tracked to closure.",
        "Risk management and project monitoring moved from Excel files into the system.",
        "Retrospectives at the close of each iteration, so the team actually does them.",
        "Time tracking on every card, with complexity points and the organizational indicators calculated automatically and visible in real time: progress, effort, execution and schedule deviation, and defect density.",
        "Beyond that, the platform includes QA test matrices per iteration, a Gantt view, function point sizing, and a library of the company’s procedures and guides.",
      ],
      es: [
        "Módulo de backlog: requerimientos desglosados en funcionalidades con historia de usuario, criterios de aceptación, reglas de negocio, dependencias críticas y estimación de esfuerzo. Cada funcionalidad se convierte en una tarjeta del tablero.",
        "Revisiones por pares ligadas a cada funcionalidad, con checklist de frontend y backend y seguimiento de cada observación hasta su cierre.",
        "Gestión de riesgos y monitoreo del proyecto digitalizados, antes eran archivos de Excel.",
        "Retrospectivas al cierre de cada iteración, para que el equipo se apegue a la práctica.",
        "Registro de tiempos en cada tarjeta, con puntos de complejidad y cálculo automático de los indicadores organizacionales, consultables en tiempo real: avance, desviación de esfuerzo, de ejecución y de avance, y densidad de defectos.",
        "Además, la plataforma incluye matrices de pruebas de QA por iteración, vista de Gantt, medición por puntos de función y una biblioteca de procedimientos y guías de la empresa.",
      ],
    },
    spotlight: {
      title: { en: "Estimating work done with AI", es: "Estimar el trabajo hecho con IA" },
      body: {
        en: [
          "The time tracked on the cards showed effort deviation: the company’s developers use several AI tools, and our complexity estimates didn’t account for that.",
          "Now developers mark whether each activity was AI-assisted and, if so, with which agent, model and reasoning level. The system keeps that history and keeps updating an organizational AI function point, which feeds the estimation module.",
          "As PMs we can flag a task as AI-assisted so its complexity is calculated with the AI function point, and that value updates on its own as developers log their time. The longer the system runs, the more accurate the estimates get.",
        ],
        es: [
          "El registro de tiempos de las tarjetas mostró desviación de esfuerzo: en la empresa se usan varias herramientas de IA para desarrollar y nuestras estimaciones de complejidad no lo contemplaban.",
          "Ahora los devs indican si cada actividad fue asistida con IA y, si fue así, con qué agente, modelo y nivel de razonamiento. El sistema guarda ese histórico y va actualizando un punto de función de IA organizacional, que consume el módulo de estimaciones.",
          "Como PMs podemos indicar que una tarea se hará con IA para que su complejidad se calcule con el punto de función de IA, y ese valor se actualiza solo conforme los devs registran sus tiempos. Entre más tiempo pasa, más precisas son las estimaciones.",
        ],
      },
    },
    values: { en: ["Process built in", "Real-time data", "One source of truth"], es: ["Proceso integrado", "Datos en tiempo real", "Una sola fuente de verdad"] },
    outcome: {
      en: "The whole organization runs every project on it. It reduced the spend on GitScrum and became the backbone of the CMMI level 5 process: the indicators the company analyzes come straight from it, and the peer-review improvement from the customs project lives in it.",
      es: "Toda la organización gestiona todos sus proyectos en ella. Redujo el gasto en GitScrum y se convirtió en la columna vertebral del proceso CMMI nivel 5: los indicadores que analiza la empresa salen directamente de ahí, y ahí vive la mejora de revisiones por pares del proyecto aduanal.",
    },
    results: [
      { value: { en: "Up to 30", es: "Hasta 30" }, label: { en: "projects at once (9 active today)", es: "proyectos a la vez (9 activos hoy)" } },
      { value: "150+", label: { en: "collaborators at its peak (37 active today)", es: "colaboradores en su punto más alto (37 activos hoy)" } },
      { value: { en: "Real time", es: "Tiempo real" }, label: { en: "organizational indicators, calculated automatically", es: "indicadores organizacionales, calculados automáticamente" } },
      { value: { en: "AI-aware", es: "IA medida" }, label: { en: "estimates that learn from every AI-assisted task", es: "estimaciones que aprenden de cada tarea asistida con IA" } },
    ],
  },
];

const CASE_HEADINGS = {
  en: { overview: "Overview", modules: "My modules", challenge: "Challenge", did: "What I did", improvement: "Continuous improvement with CMMI 5", how: "The process", problem: "Problem", cause: "Root cause", actions: "Corrective actions", values: "Values", trained: "Who I trained", outcome: "Outcome" },
  es: { overview: "Resumen", modules: "Mis módulos", challenge: "Reto", did: "Qué hice", improvement: "Mejora continua con CMMI 5", how: "El proceso", problem: "Problema", cause: "Causa raíz", actions: "Acciones correctivas", values: "Valores", trained: "A quién capacité", outcome: "Resultado" },
};

let lang = "en";
const grid = document.getElementById("project-grid");
const dialog = document.getElementById("project-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogBody = document.getElementById("dialog-body");
let openId = null;

function renderGrid() {
  grid.innerHTML = projects
    .map(
      (p) => `<li>
        <button class="project" type="button" data-project="${p.id}" aria-haspopup="dialog">
          <span class="mini-folder" aria-hidden="true"></span>
          <span class="project__name">${p.name[lang]}</span>
          <span class="project__meta">${p.meta[lang]}</span>
        </button>
      </li>`
    )
    .join("");
}

function improvementHtml(im, h) {
  return `<section class="case__improve">
    <h3>${h.improvement}</h3>
    <p>${im.intro[lang]}</p>
    <ul class="chips">${im.metrics[lang].map((m) => `<li>${m}</li>`).join("")}</ul>
    <h4>${h.how}</h4>
    <ol class="steps">${im.steps[lang].map((x) => `<li>${x}</li>`).join("")}</ol>
    ${im.fixes.map((f) => `<article class="fix">
      <h4 class="fix__title">${f.title[lang]}</h4>
      <dl class="fix__why">
        <dt>${h.problem}</dt><dd>${f.problem[lang]}</dd>
        <dt>${h.cause}</dt><dd>${f.cause[lang]}</dd>
      </dl>
      <h5>${h.actions}</h5>
      <ul>${f.actions[lang].map((x) => `<li>${x}</li>`).join("")}</ul>
      <ul class="results">${f.results.map((r) => `<li><strong>${r.value}</strong><span>${r.label[lang]}</span></li>`).join("")}</ul>
    </article>`).join("")}
  </section>`;
}

function renderProject(id) {
  const p = projects.find((x) => x.id === id);
  const h = CASE_HEADINGS[lang];
  dialogTitle.textContent = `${p.name[lang].toLowerCase().replace(/\s+/g, "_")}.case`;
  dialogBody.innerHTML = `
    <dl class="case__facts">
      ${Object.entries(p.facts[lang]).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
    </dl>
    <h3>${h.overview}</h3>
    <p>${p.overview[lang]}</p>
    ${p.gallery ? `<div class="gallery">${p.gallery.map((g) => `<figure>
      <a href="${g.src}" target="_blank" rel="noopener"><img src="${g.src}" width="${g.w}" height="${g.h}" alt="${g.caption[lang]}" loading="lazy"></a>
      <figcaption>${g.caption[lang]}</figcaption>
    </figure>`).join("")}</div>` : ""}
    ${p.modules ? `<h3>${h.modules}</h3>
    <div class="case__modules">${p.modules.map((m) => `<article class="module">
      <h4>${m.name[lang]}</h4>
      <p>${m.desc[lang]}</p>
      <ul>${m.stats[lang].map((x) => `<li>${x}</li>`).join("")}</ul>
    </article>`).join("")}</div>` : ""}
    ${p.challenge ? `<h3>${h.challenge}</h3><p>${p.challenge[lang]}</p>` : ""}
    <h3>${h.did}</h3>
    <ul>${p.did[lang].map((d) => `<li>${d}</li>`).join("")}</ul>
    ${p.improvement ? improvementHtml(p.improvement, h) : ""}
    ${p.spotlight ? `<section class="case__improve"><h3>${p.spotlight.title[lang]}</h3>${p.spotlight.body[lang].map((x) => `<p>${x}</p>`).join("")}</section>` : ""}
    ${p.trained ? `<h3>${h.trained}</h3><ul class="chips">${p.trained[lang].map((t) => `<li>${t}</li>`).join("")}</ul>` : ""}
    <h3>${h.values}</h3>
    <ul class="case__values">${p.values[lang].map((v) => `<li>${v}</li>`).join("")}</ul>
    <h3>${h.outcome}</h3>
    <p>${p.outcome[lang]}</p>
    ${p.results ? `<ul class="results">${p.results.map((r) => `<li><strong>${r.value[lang] ?? r.value}</strong><span>${r.label[lang]}</span></li>`).join("")}</ul>` : ""}`;
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-project]");
  if (!btn) return;
  openId = btn.dataset.project;
  renderProject(openId);
  dialog.showModal();
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog || e.target.closest("[data-close]")) dialog.close();
});

// ---------- Language switch ----------
const EN = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] ??= el.innerHTML; });
const toggle = document.getElementById("lang-toggle");

function setLang(next) {
  lang = next;
  const dict = lang === "es" ? ES : EN;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", LABELS[el.dataset.i18nLabel][lang]);
  });
  toggle.textContent = lang === "es" ? "EN" : "ES";
  toggle.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  renderGrid();
  if (dialog.open && openId) renderProject(openId);
  try { localStorage.setItem("lang", lang); } catch {}
}

toggle.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));

let saved = null;
try { saved = localStorage.getItem("lang"); } catch {}
setLang(saved || (navigator.language.startsWith("es") ? "es" : "en"));

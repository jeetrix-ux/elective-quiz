/* ============================================================
   Elective Compass — course data & question bank
   Syllabus content: NIT Warangal B.Tech ECE curriculum 2024-25
   (Professional Elective II & III, 6th semester).
   Difficulty / grading / job numbers are ESTIMATES (see About tab).
   ============================================================ */

const COURSES = {
  ai: {
    id: "ai", slot: "II", code: "EC1322", short: "AI & ML",
    name: "Introduction to Artificial Intelligence and Machine Learning",
    prereq: [], prereqText: "None",
    units: [
      ["Introduction to AI", "History, intelligent systems, foundations of AI, applications, AI languages, current trends."],
      ["Supervised ML", "Linear regression (assumptions, limits, industry use), least-squares and gradient-descent regression, multiple and polynomial regression, logistic regression."],
      ["Artificial Neural Networks", "Biological vs artificial neurons, activation functions, network architectures, multi-layer feed-forward nets, back-propagation (training, convergence, function approximation), intro to PINNs."],
      ["Unsupervised ML", "Distance, density and hierarchical clustering, K-Means and image quantization, basics of PCA."],
      ["Intro to Deep Learning", "Key computations of deep learning, CNNs: convolutional, pooling and dense layers."]
    ],
    books: "Bishop, Pattern Recognition & ML · James et al., Intro to Statistical Learning · Goodfellow, Deep Learning · Duda, Pattern Classification",
    difficulty: 3.0, competition: 4.5, mathDemand: 4, codeDemand: 3.5,
    style: { num: .30, desc: .20, algo: .30, code: .20 },
    gate: 0.0,
    honors: { h1: 1.0, h2: .1, h3: .1 },
    hw: { rtl: .1, dv: .1, dft: 0, pd: 0, analog: 0, fw: .2, psv: 0, rf: .1, auto: .3, mlhw: .9, sw: 1 },
    interview: "Regression, gradient descent, back-prop, CNN basics, PCA/K-means. Useful for ML-hardware and edge-AI roles, and the default vocabulary for any software/ML interview.",
    unlocks: "This is a <b>hard prerequisite</b> for Honors-1 EC16003 <i>Machine Learning Algorithms &amp; Applications</i>. It also feeds PE-IV Digital Image Processing &amp; Computer Vision.",
    gradeNote: "Intro-level, but needs linear algebra, calculus and probability. It's usually the most popular elective, so under relative grading you're up against a large, motivated class.",
    examNote: "A mix of derivations (gradients, backprop) and algorithm tracing (K-means, PCA), with some coding.",
    synergyCore: "Builds on Probability & Stochastic Processes (4th sem) and DSP (5th sem).",
    verdict: "Take it if you want ML (software, ML hardware or Honors-1). Most of it can be self-taught, but the Honors prerequisite can't be."
  },
  ertos: {
    id: "ertos", slot: "II", code: "EC1324", short: "Embedded & RTOS",
    name: "Embedded and Real Time Operating Systems",
    prereq: ["EC1202", "MA1163"], prereqText: "EC1202 Digital System Design, MA1163 Computer Programming (both core, already done)",
    units: [
      ["Intro to Embedded Systems", "Embedded vs general computing, history, classification, applications, characteristics, design challenges, design metrics."],
      ["Embedded System Development", "GPPs vs domain-specific processors, ASICs, PLDs, COTS; ROM/RAM, memory shadowing and selection; sensors, actuators; reset, brown-out, oscillator, RTC, watchdog; onboard/external communication interfaces."],
      ["Embedded Firmware", "ARM architecture: pipeline, registers, instructions, Thumb mode, exceptions; firmware design approaches and languages."],
      ["Real-Time Operating Systems", "Kernel architecture, tasks and scheduler, scheduling algorithms, ISRs, semaphores, mutexes, mailboxes, message queues, event registers, pipes, signals, timers, memory management, priority inversion; µC/OS-II, VxWorks, RT-Linux."],
      ["HW–SW Co-design", "Fundamental issues, computation models, intro to UML, hardware/software trade-offs."]
    ],
    books: "Shibu K.V · Chattopadhyay · Vahid & Givargis · K.V.K.K. Prasad · David Simon, An Embedded Software Primer",
    difficulty: 2.5, competition: 3.0, mathDemand: 1.5, codeDemand: 3,
    style: { num: .05, desc: .60, algo: .10, code: .25 },
    gate: 0.1,
    honors: { h1: .8, h2: .2, h3: 0 },
    hw: { rtl: .3, dv: .3, dft: 0, pd: 0, analog: 0, fw: 1, psv: .8, rf: .1, auto: .8, mlhw: .4, sw: .3 },
    interview: "ARM pipeline and exceptions, ISRs, scheduling (RMS/EDF), mutex vs semaphore, priority inversion and inheritance, watchdogs, memory types. These are the standard firmware and post-silicon validation interview questions.",
    unlocks: "Leads into PE-IV <i>Hardware &amp; Software Co-design</i> and Honors-1 <i>Embedded Hardware Platforms</i>.",
    gradeNote: "Mostly conceptual and descriptive, and builds directly on 5th-sem Microcontrollers, so it's very scoreable if you write good theory answers.",
    examNote: "Mostly descriptive theory (RTOS concepts, ARM architecture), plus some code reading.",
    synergyCore: "Follows on from Microcontrollers (5th sem) and helps directly in the 6th-sem Product Development course.",
    verdict: "The safest hardware-job pick in PE-II if you lean towards firmware, validation or automotive."
  },
  web: {
    id: "web", slot: "II", code: "EC1326", short: "Web Tech",
    name: "Web Technologies",
    prereq: [], prereqText: "None",
    units: [
      ["Website design basics", "Protocols and programs, secure connections, dev tools, the browser, navigation and organisation strategies."],
      ["Client-side technologies", "HTML, formatting, hyperlinks, forms, site structure, HTML5, CSS, JavaScript, JSON, jQuery."],
      ["Server-side technologies", "Choosing and setting up Unix/Linux web servers, logging users, dynamic IPs, PHP: variables, input, loops, arrays, functions, browser detection, strings, files, passwords, email, uploads."],
      ["Network & web security", "Ethical hacking, types of attack and intrusion, firewalls, passwords, defence, databases."]
    ],
    books: "Moseley & Savaliya · Deitel, Internet & WWW How to Program · NPTEL/Swayam web course",
    difficulty: 1.5, competition: 3.0, mathDemand: 1, codeDemand: 3.5,
    style: { num: 0, desc: .45, algo: 0, code: .55 },
    gate: 0.0,
    honors: { h1: .1, h2: 0, h3: 0 },
    hw: { rtl: 0, dv: 0, dft: 0, pd: 0, analog: 0, fw: .1, psv: 0, rf: 0, auto: 0, mlhw: 0, sw: .7 },
    interview: "HTML/CSS/JS, HTTP, PHP, SQL injection and password hashing. Close to zero value in hardware interviews.",
    unlocks: "Loosely related to PE-VIII <i>Cloud based Technologies</i>. It's not a prerequisite for anything.",
    gradeNote: "The lightest syllabus here, but dated (PHP, jQuery). Probably the easiest to score in, and the least ECE-specific.",
    examNote: "Descriptive theory plus writing small HTML/JS/PHP snippets.",
    synergyCore: "Little overlap with 6th-sem core courses.",
    verdict: "A CGPA-safe option with low long-term value. Almost all of it is free to learn online."
  },
  lpv: {
    id: "lpv", slot: "II", code: "EC2322", short: "Low Power VLSI",
    name: "Low Power VLSI",
    prereq: ["EC1321"], prereqText: "EC1321 CMOS VLSI Design (PE-I)",
    units: [
      ["Introduction", "Sources of power dissipation: static and active; circuit techniques to reduce leakage."],
      ["Adders", "Standard adder cells, CMOS adder architectures, low-voltage low-power techniques, current-mode adders."],
      ["Multipliers", "Multiplier architectures; Braun and Booth multipliers compared; low-voltage low-power techniques."],
      ["Memories", "Power dissipation in SRAMs and DRAMs, and low-power circuit techniques for each."],
      ["Wires", "Growing wire delay, new wire and dielectric materials, testing basics, low-power and safely operating circuits, case study of a low-power subsystem."]
    ],
    books: "Yeo & Roy, Low-Voltage Low-Power VLSI Subsystems · Soudris, Piguet & Goutis · Rabaey, Low Power Design Essentials",
    difficulty: 3.5, competition: 3.5, mathDemand: 3, codeDemand: .5,
    style: { num: .40, desc: .50, algo: .10, code: 0 },
    gate: 0.3,
    honors: { h1: .2, h2: 1.0, h3: 0 },
    hw: { rtl: .6, dv: .2, dft: .3, pd: .9, analog: 1, fw: .1, psv: .3, rf: .1, auto: 0, mlhw: .5, sw: 0 },
    interview: "αCV²f, leakage mechanisms (subthreshold, gate, junction), clock and power gating, DVFS, 6T SRAM read/write stability, adder and Booth multiplier architectures, wire RC delay. Core material for circuit, memory and physical design interviews.",
    unlocks: "Strongest base for Honors-2 VLSI, PE-V <i>Introduction to ASIC Design</i>, PE-VII <i>CAD for IC Design</i>, PE-V <i>RF Microelectronics</i>.",
    gradeNote: "Transistor-level reasoning with some numericals. The class is mostly VLSI enthusiasts, so the peer group is strong but smaller.",
    examNote: "Half circuit analysis and numericals, half explaining techniques and trade-offs.",
    synergyCore: "Needs CMOS VLSI Design. Pairs with Verification & Testing for a full VLSI semester.",
    verdict: "A top hardware-job pick for circuit, memory and physical design, but only if you took CMOS VLSI Design."
  },
  iot: {
    id: "iot", slot: "III", code: "EC1328", short: "IoT",
    name: "Internet of Things",
    prereq: [], prereqText: "None",
    units: [
      ["Intro to IoT", "IoT technology, applications, IoT stack, communication strategies, cloud platforms."],
      ["Internet principles", "OSI, IP, TCP, UDP, the TCP/IP suite, IP addresses, DNS, static and dynamic addressing, IPv6."],
      ["IoT communication", "Cellular, satellite, Wi-Fi, RF, Bluetooth, RFID, NFC, LoRa."],
      ["Prototyping", "Cost vs ease, prototype to production, sensors and actuators, microcontrollers, ESP8266, ESP32, Raspberry Pi."],
      ["Serial protocols", "SSI, SPI, I²C, UART."],
      ["Cloud for IoT", "Virtualisation, cloud architecture, SaaS/PaaS/IaaS; ThingSpeak, AWS, Azure IoT, Google IoT, IBM Watson."],
      ["Application layer", "MQTT, CoAP, AMQP."],
      ["Edge computing & applications", "Edge architectures; smart buildings, health, home automation, fleet management, agriculture. Build an IoT end-device prototype for a societal problem."]
    ],
    books: "McEwen & Cassimally, Designing the Internet of Things · Balani, Enterprise IoT · Ruparelia, Cloud Computing",
    difficulty: 2.0, competition: 3.5, mathDemand: 1, codeDemand: 2.5,
    style: { num: .05, desc: .65, algo: .05, code: .25 },
    gate: 0.1,
    honors: { h1: .4, h2: 0, h3: .3 },
    hw: { rtl: 0, dv: 0, dft: 0, pd: 0, analog: .1, fw: .7, psv: .5, rf: .3, auto: .4, mlhw: .3, sw: .3 },
    interview: "UART/SPI/I²C timing, MQTT/CoAP, TCP vs UDP, BLE/LoRa trade-offs. This is breadth for embedded/IoT firmware roles, not depth.",
    unlocks: "Feeds PE-VIII <i>Cloud based Technologies</i> and <i>Adhoc Networks</i>.",
    gradeNote: "Broad but shallow. Much of it repeats Data Networks (OSI, TCP/IP, DNS) and Microcontrollers (UART/SPI/I²C) from 5th sem.",
    examNote: "Mostly descriptive (protocols, platforms), plus a prototype.",
    synergyCore: "Big overlap with Data Networks and Microcontrollers. The prototype can double as your Product Development project.",
    verdict: "Low risk and project-friendly. Best paired with ERTOS for an embedded profile."
  },
  cell: {
    id: "cell", slot: "III", code: "EC1330", short: "Cellular & Mobile",
    name: "Cellular and Mobile Communications",
    prereq: ["EC1303", "EC1304"], prereqText: "EC1303 Analog Comm (5th sem) and EC1304 Digital Comm (core, same 6th sem)",
    units: [
      ["Overview", "Introduction to wireless communication systems."],
      ["Cellular design fundamentals", "Frequency reuse, channel assignment, handoff strategies, interference and system capacity, improving coverage and capacity."],
      ["Propagation I", "Large-scale path loss, reflection, diffraction, scattering, practical link budget design, outdoor and indoor propagation models."],
      ["Propagation II & multiple access", "Small-scale fading and multipath, Rayleigh and Rician distributions; FDMA, TDMA, spread-spectrum multiple access."],
      ["1G & 2G", "AMPS; GSM features, architecture, radio subsystem, traffic channels, call processing."],
      ["3G & 4G", "CDMA architecture, forward and reverse channels, power control, capacity; OFDM; 4G LTE."]
    ],
    books: "W.C.Y. Lee, Mobile Cellular Telecommunications · Stallings · Rappaport, Wireless Communications",
    difficulty: 3.5, competition: 2.5, mathDemand: 3.5, codeDemand: .5,
    style: { num: .60, desc: .35, algo: .05, code: 0 },
    gate: 0.4,
    honors: { h1: 0, h2: 0, h3: 1.0 },
    hw: { rtl: 0, dv: 0, dft: 0, pd: 0, analog: .2, fw: .1, psv: .2, rf: 1, auto: 0, mlhw: 0, sw: .1 },
    interview: "Link budget, path loss and fading, cluster size and capacity, OFDM/LTE, CDMA power control. Directly relevant to modem, RAN and wireless-systems roles.",
    unlocks: "Leads into PE-VI <i>Wireless Communication – 5G Use Cases</i>, Honors-3 Advanced Communication, PE-VII SDR and Radar.",
    gradeNote: "Numerical-heavy (cluster size, reuse ratio, Erlang capacity, link budgets) plus standards. Often a smaller class, so relative grading competition is lower.",
    examNote: "Mostly numericals, plus descriptive answers on the GSM/CDMA/LTE standards.",
    synergyCore: "Runs alongside core Digital Communications and Antennas & Propagation in 6th sem. The three reinforce each other, but it makes the semester very comm-heavy.",
    verdict: "The pick for wireless/telecom careers, especially if you liked Analog Comm."
  },
  vt: {
    id: "vt", slot: "III", code: "EC2302", short: "Verification & Testing",
    name: "Verification and Testing",
    prereq: ["EC1321"], prereqText: "EC1321 CMOS VLSI Design (PE-I)",
    units: [
      ["Introduction", "Digital VLSI design flow, high-level design representation, transformations for high-level synthesis."],
      ["Scheduling & allocation", "Scheduling, allocation and binding; scheduling algorithms; clique partitioning, left-edge algorithm, iterative refinement."],
      ["Logic optimisation & synthesis", "Two-level synthesis and heuristic minimisation, FSM synthesis, multilevel implementation."],
      ["Binary Decision Diagrams", "Construction, OBDDs, operations on OBDDs, OBDDs for sequential circuits."],
      ["Temporal logic & model checking", "CTL syntax and semantics, equivalences; model checking algorithm, symbolic model checking."],
      ["Digital testing & fault simulation", "Functional and fault simulation, testability measures (SCOAP), structural testing, fault equivalence."],
      ["ATPG & scan", "ATPG algebras, D-algorithm; ATPG for sequential circuits, scan-chain based testing."],
      ["BIST", "Built-in self-test, memory testing."]
    ],
    books: "Bushnell & Agrawal, Essentials of Electronic Testing · Palnitkar, Verilog HDL · De Micheli, Synthesis & Optimization · Huth & Ryan, Logic in CS",
    difficulty: 4.0, competition: 3.5, mathDemand: 3, codeDemand: 1,
    style: { num: .15, desc: .15, algo: .70, code: 0 },
    gate: 0.2,
    honors: { h1: .1, h2: .8, h3: 0 },
    hw: { rtl: .7, dv: .7, dft: 1, pd: .5, analog: 0, fw: 0, psv: .5, rf: 0, auto: 0, mlhw: .1, sw: .2 },
    interview: "Stuck-at fault models, ATPG and the D-algorithm, scan insertion, BIST/MBIST, fault coverage, SCOAP; logic minimisation, FSM optimisation, BDDs and formal basics. Core for DFT and helpful for RTL/DV. Note: it does <b>not</b> cover UVM/SystemVerilog testbenches.",
    unlocks: "Leads into PE-V <i>Introduction to ASIC Design</i>, PE-VII <i>CAD for IC Design</i>, Honors-2 <i>Physical Design Automation</i>.",
    gradeNote: "The most abstract course on the list: synthesis algorithms, BDDs, CTL, model checking and ATPG. It's procedural, so it rewards students who enjoy algorithms.",
    examNote: "Mostly hand-tracing algorithms (scheduling, BDD, D-algorithm, CTL).",
    synergyCore: "Needs CMOS VLSI Design. Builds on Digital Circuit/System Design and pairs with Low Power VLSI.",
    verdict: "The most direct course for DFT and front-end VLSI jobs. Hard, but it's what chip companies hire freshers for."
  },
  cs: {
    id: "cs", slot: "III", code: "EE1262", short: "Control Systems",
    name: "Control Systems Engineering",
    prereq: ["MA1161", "MA1162"], prereqText: "MA1161, MA1162 (core maths, already done). Offered by the EE department.",
    units: [
      ["Introduction", "Open vs closed loop, classification, effects of feedback; differential-equation models, impulse response, transfer functions."],
      ["Transfer function representation", "Block-diagram algebra, signal flow graphs, Mason's gain formula."],
      ["Time response", "Test signals, first- and second-order responses, time-domain specs, steady-state errors and error constants, P/PI/PD effects."],
      ["Stability", "Routh criterion, conditional stability, limitations."],
      ["Root locus", "Construction; effect of adding poles and zeros."],
      ["Frequency response", "Bode plots, gain and phase margin, polar and Nyquist plots; lead, lag and lead-lag compensators; PID."],
      ["State space", "State models from block diagrams, diagonalisation, solving state equations, state transition matrix, controllability and observability."]
    ],
    books: "Nise, Control Systems Engineering · Nagrath & Gopal · Ogata, Modern Control Engineering · Kuo",
    difficulty: 3.5, competition: 3.0, mathDemand: 4.5, codeDemand: .5,
    style: { num: .80, desc: .10, algo: .10, code: 0 },
    gate: 1.0,
    honors: { h1: .1, h2: 0, h3: .1 },
    hw: { rtl: 0, dv: 0, dft: 0, pd: 0, analog: .6, fw: .3, psv: .1, rf: .2, auto: 1, mlhw: 0, sw: .1 },
    interview: "Stability, Bode plots and phase margin, PID tuning, state space. Used in analog design (LDO and PLL loop compensation), power electronics, EV motor control, robotics, and in GATE/PSU interviews.",
    unlocks: "The <b>only</b> control course in the whole ECE curriculum, and Control Systems is a full subject in the GATE EC syllabus. Useful background for PE-VII Optimization Techniques.",
    gradeNote: "Heavy on maths, but very predictable: Routh, root locus, Bode and Nyquist are drill-able numericals, so practice turns straight into marks.",
    examNote: "Almost entirely numericals and plots.",
    synergyCore: "Builds on Signals & Systems and Laplace transforms. Taught by EE faculty, possibly to a mixed-branch class.",
    verdict: "Essential if you're going for GATE/PSUs, automotive or EV, or analog design. Otherwise it's a solid but maths-heavy choice."
  }
};

const SLOT_II = ["ai", "ertos", "web", "lpv"];
const SLOT_III = ["iot", "cell", "vt", "cs"];

/* Hardware roles + relative demand weight (India semiconductor/embedded hiring, 2025-26 reports) */
const ROLES = {
  rtl:    { label: "RTL / front-end digital design", demand: 1.0 },
  dv:     { label: "Design verification (DV)", demand: 1.0 },
  dft:    { label: "DFT (design-for-test)", demand: .8 },
  pd:     { label: "Physical design / timing / power", demand: .8 },
  analog: { label: "Analog / memory / custom circuit design", demand: .75 },
  fw:     { label: "Embedded firmware / system software", demand: .9 },
  psv:    { label: "Post-silicon validation / board bring-up", demand: .7 },
  rf:     { label: "RF / wireless / modem / telecom", demand: .65 },
  auto:   { label: "Automotive / EV / robotics / power electronics", demand: .75 },
  mlhw:   { label: "ML hardware / edge AI", demand: .6 },
  sw:     { label: "Software / AI / data (non-hardware)", demand: 0 }
};

/* Pair synergy (PE-II x PE-III): -1..2 */
const SYNERGY = {
  ai:    { iot: 1, cell: 0, vt: 0, cs: 1 },
  ertos: { iot: 2, cell: 0, vt: .5, cs: 1 },
  web:   { iot: 1.5, cell: -.5, vt: -.5, cs: 0 },
  lpv:   { iot: .5, cell: 0, vt: 2, cs: .5 }
};
const SYNERGY_NOTE = {
  "ai-iot": "Edge-AI combo: models plus connected devices.",
  "ai-cell": "Two unrelated directions, so you get breadth with little overlap.",
  "ai-vt": "Algorithm-heavy semester: both reward systematic, procedural thinking.",
  "ai-cs": "Both lean on linear algebra and optimisation, and together they're the robotics/autonomy stack.",
  "ertos-iot": "Classic embedded combo: MCUs, serial buses, RTOS and the cloud. Heavy overlap lightens the load and fits Product Development.",
  "ertos-cell": "Firmware plus wireless: a modem/RF-firmware angle, with little overlap.",
  "ertos-vt": "Hardware breadth: SoC software side plus test side. Good for post-silicon validation.",
  "ertos-cs": "Embedded control: the automotive/EV/robotics firmware stack.",
  "web-iot": "Full-stack IoT: devices plus dashboards plus cloud.",
  "web-cell": "Unrelated pair with no synergy.",
  "web-vt": "Unrelated pair with no synergy.",
  "web-cs": "Unrelated pair, but a light-plus-heavy workload balance.",
  "lpv-iot": "Low-power circuits plus battery-powered devices. Loose synergy.",
  "lpv-cell": "Circuits plus wireless systems: an RF-IC direction, little overlap.",
  "lpv-vt": "Full VLSI semester: both need CMOS VLSI, both feed Honors-2, ASIC and CAD. The strongest chip-job signal on a transcript.",
  "lpv-cs": "Analog-leaning pair: circuits plus feedback/stability (LDOs, PLLs)."
};

/* ---------- PART 1: About you ---------- */
const PART_A = [
  { id: "pe1", type: "single", q: "Which Professional Elective-I did you take in 5th sem?",
    hint: "Low Power VLSI and Verification & Testing both list EC1321 CMOS VLSI Design as a prerequisite.",
    options: [
      { v: "cmos", t: "CMOS VLSI Design (EC1321)" },
      { v: "organic", t: "Organic Electronics (EC1323)" },
      { v: "instr", t: "Electronic Instrumentation (EC1325)" }
    ] },
  { id: "roles", type: "multi", max: 3, q: "Which careers are you aiming for after B.Tech? Pick up to 3.",
    hint: "These drive the hardware-job score. Pick “Not sure yet” if you have no idea.",
    options: Object.keys(ROLES).map(k => ({ v: k, t: ROLES[k].label })).concat([{ v: "unsure", t: "Not sure yet" }]) },
  { id: "jobw", type: "scale", q: "How much should future job value count in this decision?",
    low: "Barely: I'm choosing for interest", high: "A lot: employability first", def: 4 },
  { id: "gate", type: "single", q: "Are you planning to write GATE (M.Tech / PSU jobs)?",
    options: [ { v: "yes", t: "Yes, seriously" }, { v: "maybe", t: "Maybe" }, { v: "no", t: "No" } ] },
  { id: "honors", type: "single", q: "Are you doing (or planning) an Honors track?",
    options: [
      { v: "h1", t: "Honors-1: Embedded & Machine Learning Systems" },
      { v: "h2", t: "Honors-2: VLSI System Design" },
      { v: "h3", t: "Honors-3: Advanced Communication Systems" },
      { v: "none", t: "No / undecided" } ] },
  { id: "prio", type: "scale", q: "Learning what you love vs protecting your CGPA. Where are you?",
    low: "Learn what I love", high: "Maximise CGPA", def: 3 },
  { id: "math", type: "scale", q: "How comfortable are you with heavy maths (Laplace, linear algebra, probability)?",
    low: "I avoid it", high: "I enjoy it", def: 3 },
  { id: "code", type: "scale", q: "How comfortable are you writing code (C / Python)?",
    low: "Struggle", high: "Very comfortable", def: 3 },
  { id: "styleFav", type: "single", q: "Which exam style suits you best?",
    options: [
      { v: "num", t: "Numericals & derivations: one right answer" },
      { v: "desc", t: "Descriptive theory: explain concepts well" },
      { v: "algo", t: "Algorithm tracing: step-by-step procedures by hand" },
      { v: "code", t: "Coding / projects / practical work" } ] },
  { id: "styleAvoid", type: "single", q: "Which exam style do you dislike most?",
    options: [
      { v: "num", t: "Numericals & derivations" },
      { v: "desc", t: "Long descriptive theory answers" },
      { v: "algo", t: "Hand-tracing algorithms" },
      { v: "code", t: "Coding / projects" } ] },
  { id: "load", type: "single", q: "6th sem also has Product Development (0-1-4) plus three core courses. What's your workload appetite for electives?",
    options: [
      { v: "light", t: "Keep electives light: I need time for other things" },
      { v: "balanced", t: "Balanced" },
      { v: "heavy", t: "Bring it on" } ] },
  { id: "syn", type: "single", q: "Should your two electives reinforce each other or diversify?",
    options: [
      { v: "reinforce", t: "Reinforce: overlapping, one clear specialisation" },
      { v: "balanced", t: "Doesn't matter much" },
      { v: "diversify", t: "Diversify: keep options open" } ] },
  { id: "prior", type: "grid", q: "How much did you enjoy these courses so far?",
    hint: "Skip the ones you haven't taken. This is a strong signal of what you'll enjoy next.",
    rows: [
      { v: "prog", t: "Computer Programming", w: { ai: .6, web: .7, ertos: .4, iot: .3 } },
      { v: "dig", t: "Digital Circuit / Digital System Design", w: { vt: .9, lpv: .6, ertos: .5 } },
      { v: "ckt", t: "Electronic Circuits / Linear IC Applications", w: { lpv: .8, cs: .3, iot: .2 } },
      { v: "sns", t: "Signals & Systems", w: { cs: .9, cell: .4, ai: .3 } },
      { v: "prob", t: "Probability & Stochastic Processes", w: { ai: .7, cell: .7 } },
      { v: "maths", t: "Laplace / ODE / transform maths", w: { cs: .8, cell: .3, ai: .3 } },
      { v: "mcu", t: "Microcontrollers", w: { ertos: 1, iot: .8 } },
      { v: "dn", t: "Data Networks", w: { iot: .8, web: .6, cell: .3 } },
      { v: "ac", t: "Analog Communications", w: { cell: 1 } },
      { v: "dsp", t: "Digital Signal Processing", w: { ai: .4, cell: .4, cs: .4 } },
      { v: "emf", t: "Electromagnetic Fields & Waves", w: { cell: .5 } },
      { v: "cmos", t: "CMOS VLSI Design (if taken)", w: { lpv: 1, vt: .8 } }
    ] }
];

/* ---------- PART 2: Scenarios ---------- */
const PART_B = [
  { id: "b1", q: "Free weekend. Which project do you actually start?", options: [
    { t: "Train a CNN that recognises hand-drawn digits from your webcam", w: { ai: 1 } },
    { t: "Write a tiny pre-emptive scheduler on an STM32 and watch tasks switch on a logic analyser", w: { ertos: 1, iot: .2 } },
    { t: "Build a full-stack site with login, database and a slick UI", w: { web: 1 } },
    { t: "Build an ESP32 plant monitor that pushes data to a cloud dashboard", w: { iot: 1, web: .3, ertos: .3 } },
    { t: "Simulate a 4G/5G link: path loss, fading, how many users a tower can serve", w: { cell: 1 } },
    { t: "Tune a PID controller so a self-balancing robot stays upright", w: { cs: 1, ertos: .3 } },
    { t: "Design a full adder at transistor level and squeeze its power down", w: { lpv: 1, vt: .2 } },
    { t: "Write a tool that automatically finds input patterns exposing a bug in a circuit", w: { vt: 1, lpv: .2 } } ] },
  { id: "b2", q: "Which “aha!” moment would feel best?", options: [
    { t: "The loss curve finally drops and the model generalises", w: { ai: 1 } },
    { t: "A race condition that crashed the device every 3 hours is finally gone", w: { ertos: 1, iot: .3 } },
    { t: "The step response stops overshooting after you add a lead compensator", w: { cs: 1 } },
    { t: "You prove two circuits are equivalent without simulating every input", w: { vt: 1 } },
    { t: "The power report shows you cut leakage by 40%", w: { lpv: 1 } },
    { t: "The link budget closes and calls stop dropping at the cell edge", w: { cell: 1 } },
    { t: "The page loads instantly and looks perfect on mobile", w: { web: 1 } },
    { t: "50 sensors across a building start reporting reliably over MQTT", w: { iot: 1 } } ] },
  { id: "b3", q: "Which tool would you most like to master?", options: [
    { t: "PyTorch / scikit-learn", w: { ai: 1 } },
    { t: "FreeRTOS on ARM Cortex-M (Keil / STM32CubeIDE)", w: { ertos: 1, iot: .3 } },
    { t: "JavaScript / Node + PHP + SQL", w: { web: 1 } },
    { t: "Cadence Virtuoso / SPICE power analysis", w: { lpv: 1 } },
    { t: "ESP32 + AWS IoT / ThingSpeak", w: { iot: 1, web: .2 } },
    { t: "MATLAB LTE/5G toolbox, drive-test tools", w: { cell: 1 } },
    { t: "ATPG / scan insertion tools (e.g. TetraMAX) and formal checkers", w: { vt: 1 } },
    { t: "MATLAB / Simulink control design", w: { cs: 1 } } ] },
  { id: "b4", q: "Which kind of difficulty do you enjoy?", options: [
    { t: "Long derivations and numericals with one right answer", w: { cs: .8, cell: .8, lpv: .4, ai: .3 } },
    { t: "Understanding how a complex system fits together, then explaining it", w: { ertos: .8, iot: .8, cell: .3, web: .3 } },
    { t: "Hand-tracing algorithms: graphs, decision diagrams, search", w: { vt: 1, ai: .4 } },
    { t: "Building and debugging something until it works", w: { web: .8, iot: .7, ertos: .6, ai: .4 } } ] },
  { id: "b5", q: "Two internship offers land. Which team do you join?", options: [
    { t: "ML team at a product company", w: { ai: 1 } },
    { t: "Firmware team at an automotive / EV company", w: { ertos: 1, cs: .4 } },
    { t: "Web platform team at a startup", w: { web: 1 } },
    { t: "Memory / SoC circuit design team at a chip company", w: { lpv: 1, vt: .3 } },
    { t: "DFT / verification team at a chip company", w: { vt: 1, lpv: .3 } },
    { t: "Modem / RAN team at a telecom company", w: { cell: 1 } },
    { t: "Smart-building or agritech IoT startup", w: { iot: 1 } },
    { t: "Control / GNC team at a drone or robotics company", w: { cs: 1, ertos: .3 } } ] },
  { id: "b6", q: "In a lab, you're happiest when you're…", options: [
    { t: "Staring at a scope or logic analyser", w: { ertos: .7, iot: .5, cs: .3, lpv: .3 } },
    { t: "Writing code in an editor", w: { web: .7, ai: .7, iot: .3 } },
    { t: "Doing hand calculations / MATLAB plots", w: { cs: .8, cell: .8 } },
    { t: "Running simulations on schematics / netlists", w: { lpv: .8, vt: .7 } } ] },
  { id: "b7", q: "Which YouTube rabbit hole would you fall into?", options: [
    { t: "How large language and diffusion models actually work", w: { ai: 1 } },
    { t: "How an RTOS kernel switches tasks in microseconds", w: { ertos: 1 } },
    { t: "How websites get hacked (SQL injection, XSS)", w: { web: 1 } },
    { t: "Why phones get hot and how chips save battery", w: { lpv: 1, ertos: .2 } },
    { t: "How a single tower handles thousands of phones", w: { cell: 1 } },
    { t: "How smart homes (Zigbee, Matter, BLE) work", w: { iot: 1 } },
    { t: "How chips are tested before shipping, and famous silicon bugs", w: { vt: 1 } },
    { t: "How rockets land themselves", w: { cs: 1 } } ] },
  { id: "b8", q: "Your relationship with maths:", options: [
    { t: "I like maths that predicts something physical (poles, fading, power)", w: { cs: .7, cell: .7, lpv: .5 } },
    { t: "I like maths as a tool for optimisation and statistics (gradients, PCA)", w: { ai: 1, cell: .3 } },
    { t: "I like discrete / logic maths (Boolean algebra, graphs, logic)", w: { vt: 1, lpv: .2 } },
    { t: "I'd rather keep maths to a minimum", w: { web: 1, iot: .8, ertos: .6 } } ] },
  { id: "b9", q: "In a group project, you naturally become…", options: [
    { t: "The one who wires up the hardware and makes it talk", w: { iot: .9, ertos: .7 } },
    { t: "The one who writes the core algorithm or model", w: { ai: .8, vt: .4, cs: .3 } },
    { t: "The one who builds the interface or demo", w: { web: 1, iot: .3 } },
    { t: "The one who does the analysis and theory section", w: { cs: .6, cell: .6, lpv: .5, vt: .3 } } ] },
  { id: "b10", q: "Which end-sem question scares you LEAST?", options: [
    { t: "“Draw the root locus and design a lead compensator.”", w: { cs: 1 } },
    { t: "“Construct the OBDD and check this CTL formula.”", w: { vt: 1 } },
    { t: "“Derive the back-prop updates for this 2-layer network.”", w: { ai: 1 } },
    { t: "“Compute the link budget and channels per cell.”", w: { cell: 1 } },
    { t: "“Explain priority inversion and how priority inheritance fixes it.”", w: { ertos: 1 } },
    { t: "“Compare leakage-reduction techniques; Booth vs Braun multipliers.”", w: { lpv: 1 } },
    { t: "“Compare MQTT vs CoAP and design an IoT node for a farm.”", w: { iot: 1 } },
    { t: "“Write a PHP form handler that stores passwords safely.”", w: { web: 1 } } ] },
  { id: "b11", q: "Ten years out, what would you be proudest of?", options: [
    { t: "Shipping a model used by millions", w: { ai: 1 } },
    { t: "Firmware in a car or aircraft that never fails", w: { ertos: .8, cs: .4 } },
    { t: "A chip that runs for a year on a coin cell", w: { lpv: 1, iot: .3 } },
    { t: "A chip that shipped with zero test escapes", w: { vt: 1 } },
    { t: "The network that connected a remote region", w: { cell: .8, iot: .4 } },
    { t: "An autonomous robot or drone", w: { cs: .8, ai: .3, ertos: .3 } },
    { t: "A product people use daily", w: { web: .7, iot: .7 } } ] },
  { id: "b12", q: "When learning something new, you prefer to…", options: [
    { t: "Build it now, read the theory later", w: { web: .7, iot: .7, ertos: .5 } },
    { t: "Learn the theory first, then implement", w: { ai: .6, cs: .5, vt: .5 } },
    { t: "Model it, simulate it, compare", w: { cs: .6, cell: .6, lpv: .6 } },
    { t: "Read the standard / spec end to end", w: { cell: .7, iot: .5, ertos: .4 } } ] },
  { id: "b13", q: "Which level of abstraction feels like home?", options: [
    { t: "Transistors and wires", w: { lpv: 1 } },
    { t: "Gates, netlists and state machines", w: { vt: 1, lpv: .3 } },
    { t: "Processors, interrupts and memory maps", w: { ertos: 1, iot: .3 } },
    { t: "Networks and protocols", w: { iot: .9, web: .3 } },
    { t: "Spectrum and radio channels", w: { cell: 1 } },
    { t: "Signals, systems and transfer functions", w: { cs: 1, cell: .3 } },
    { t: "Data and models", w: { ai: 1 } },
    { t: "Browsers and servers", w: { web: 1 } } ] },
  { id: "b14", q: "Which annoyance would you tolerate the longest?", options: [
    { t: "Hours of training runs and hyper-parameter tuning", w: { ai: 1 } },
    { t: "A board that won't flash or keeps hard-faulting", w: { ertos: .8, iot: .6 } },
    { t: "Browser compatibility and CSS bugs", w: { web: 1 } },
    { t: "SPICE convergence errors", w: { lpv: 1 } },
    { t: "Long fault-coverage reports to close the last 1%", w: { vt: 1 } },
    { t: "Erlang tables and endless dB conversions", w: { cell: 1 } },
    { t: "Long Routh tables and Bode asymptotes by hand", w: { cs: 1 } } ] }
];

/* ---------- PART 3: Blind syllabus taste test (real topics) ---------- */
const TOPICS = [
  ["ai", "Linear & logistic regression via gradient descent", "Fit lines and decision boundaries by iteratively minimising error."],
  ["ai", "Back-propagation in multi-layer neural networks", "The chain-rule algorithm that trains every neural net."],
  ["ai", "K-Means clustering & image colour quantisation", "Group unlabelled data; compress an image to k colours."],
  ["ai", "Principal Component Analysis", "Find the directions that capture most of the variance in data."],
  ["ai", "Convolution, pooling & dense layers in CNNs", "Building blocks of image-recognition networks."],
  ["ai", "Physics-Informed Neural Networks (PINNs)", "Neural nets trained to obey differential equations."],
  ["ertos", "ARM pipeline, registers, Thumb mode & exceptions", "How a Cortex-class CPU actually executes your firmware."],
  ["ertos", "RTOS task schedulers & scheduling algorithms", "Deciding which task runs when, with hard deadlines."],
  ["ertos", "Semaphores, mutexes, mailboxes & message queues", "Safely sharing resources and data between tasks."],
  ["ertos", "The priority-inversion problem", "Why a low-priority task can block a critical one (the Mars Pathfinder bug)."],
  ["ertos", "Watchdog, brown-out & reset circuits", "Keeping a device alive when software or power misbehaves."],
  ["ertos", "µC/OS-II, VxWorks & RT-Linux", "Real off-the-shelf real-time operating systems."],
  ["web", "HTML5 forms, CSS & site structure", "Laying out and styling web pages."],
  ["web", "JavaScript, JSON & jQuery", "Making pages interactive and exchanging data."],
  ["web", "Setting up Unix/Linux web servers", "Running and configuring the machine that serves a site."],
  ["web", "PHP: files, passwords, email, uploads", "Server-side scripting for dynamic sites."],
  ["web", "Ethical hacking: attack & intrusion types", "How sites and networks get compromised."],
  ["web", "Firewalls, password defence & databases", "Protecting web apps and their data."],
  ["lpv", "Static vs dynamic power dissipation in CMOS", "Where every milliwatt in a chip goes."],
  ["lpv", "Circuit techniques to reduce leakage", "Stacking, multi-Vt, power gating: fighting leakage at nanometre nodes."],
  ["lpv", "Low-voltage CMOS adder architectures", "Ripple, carry-lookahead, current-mode adders under power limits."],
  ["lpv", "Braun vs Booth multipliers", "Multiplier architectures and their power/speed trade-offs."],
  ["lpv", "Low-power SRAM & DRAM circuits", "Designing memory arrays that don't drain the battery."],
  ["lpv", "Wire delay & new interconnect materials", "Why wires, not transistors, now limit chips."],
  ["iot", "IoT stack & cloud platforms (AWS IoT, Azure, ThingSpeak)", "Getting device data into the cloud."],
  ["iot", "TCP/IP, UDP, DNS & IPv6", "Internet plumbing for connected devices."],
  ["iot", "Wi-Fi, BLE, LoRa, RFID & NFC for IoT", "Choosing the right wireless link for a sensor."],
  ["iot", "Prototyping on ESP32 / Raspberry Pi", "Turning an idea into a working gadget."],
  ["iot", "SPI, I²C & UART serial buses", "How chips on a board talk to each other."],
  ["iot", "MQTT, CoAP & AMQP messaging", "Lightweight protocols for millions of devices."],
  ["cell", "Frequency reuse, cluster size & channel assignment", "How limited spectrum serves a whole city."],
  ["cell", "Handoff strategies & interference-limited capacity", "Keeping calls alive as you move between cells."],
  ["cell", "Path-loss models & link budget design", "Will the signal reach? Engineering it in dB."],
  ["cell", "Rayleigh / Rician multipath fading", "Statistics of signals bouncing off buildings."],
  ["cell", "GSM architecture & call processing", "What happens inside the network when you dial."],
  ["cell", "CDMA power control, OFDM & 4G LTE", "The physical layer of modern mobile networks."],
  ["vt", "High-level synthesis: scheduling, allocation & binding", "Turning algorithms into hardware datapaths automatically."],
  ["vt", "Two-level & multilevel logic minimisation, FSM synthesis", "What synthesis tools do to your logic."],
  ["vt", "Binary Decision Diagrams (OBDDs)", "Canonical graphs that represent Boolean functions."],
  ["vt", "Temporal logic (CTL) & model checking", "Mathematically proving a design can never reach a bad state."],
  ["vt", "Fault simulation, SCOAP, ATPG & the D-algorithm", "Generating test patterns that catch manufacturing defects."],
  ["vt", "Scan chains, BIST & memory testing", "Designing chips that can test themselves."],
  ["cs", "Block diagrams & Mason's gain formula", "Reducing complex systems to one transfer function."],
  ["cs", "Second-order transient response & steady-state error", "Overshoot, settling time and accuracy."],
  ["cs", "Routh stability criterion", "Is the system stable? Answer without solving for the poles."],
  ["cs", "Root-locus construction", "How poles move as you turn up the gain."],
  ["cs", "Bode & Nyquist plots, gain/phase margins", "Frequency-domain stability analysis."],
  ["cs", "Lead/lag compensators & PID design", "Shaping a system's response to meet specs."],
  ["cs", "State-space models, controllability & observability", "Modern matrix-based control."]
];

/* ---------- PART 4: Readiness probes (2 per course) ---------- */
const PROBES = [
  { c: "ai", q: "Gradient-descent update for minimising loss L(w) with learning rate η:",
    options: ["w ← w + η∇L", "w ← w − η∇L", "w ← η∇L", "w ← w − ∇L / η"], a: 1 },
  { c: "ai", q: "A 32×32×3 image goes through a conv layer with 16 filters of 3×3, stride 1, no padding. Output shape?",
    options: ["32×32×16", "30×30×3", "30×30×16", "30×30×48"], a: 2 },
  { c: "ertos", q: "A low-priority task holds a mutex the high-priority task needs, while a medium-priority task keeps pre-empting the low one. This is:",
    options: ["Deadlock", "Priority inversion", "Round-robin starvation", "A stack overflow"], a: 1 },
  { c: "ertos", q: "What does a watchdog timer do?",
    options: ["Keeps calendar time when power is off", "Resets the system if software stops refreshing it in time", "Debounces push-buttons", "Generates PWM for motors"], a: 1 },
  { c: "web", q: "Which of these executes on the server?",
    options: ["CSS", "jQuery", "PHP", "HTML5 canvas"], a: 2 },
  { c: "web", q: "The standard defence against SQL injection is:",
    options: ["Using HTTPS", "Parameterised (prepared) queries", "Minifying JavaScript", "A stronger password policy"], a: 1 },
  { c: "lpv", q: "Dynamic power ∝ αCV²f. If V drops from 1.2 V to 0.6 V (all else fixed), dynamic power becomes:",
    options: ["1/2 of original", "1/4 of original", "1/8 of original", "Unchanged"], a: 1 },
  { c: "lpv", q: "Lowering a transistor's threshold voltage Vth generally…",
    options: ["Reduces subthreshold leakage", "Increases subthreshold leakage", "Has no effect on leakage", "Makes the gate slower"], a: 1 },
  { c: "iot", q: "How many signal lines does I²C use (excluding ground)?",
    options: ["1", "2", "3", "4"], a: 1 },
  { c: "iot", q: "MQTT's communication model is:",
    options: ["Request/response like HTTP", "Publish/subscribe through a broker", "Peer-to-peer mesh flooding", "Circuit-switched"], a: 1 },
  { c: "cell", q: "For hexagonal cells with shift parameters i = 2, j = 1, the cluster size N = i² + ij + j² is:",
    options: ["3", "4", "5", "7"], a: 3 },
  { c: "cell", q: "Co-channel reuse ratio Q = D/R = √(3N). For N = 7, Q ≈",
    options: ["2.65", "3.46", "4.58", "7.00"], a: 2 },
  { c: "vt", q: "To detect a stuck-at-0 fault at the output of a 2-input AND gate, apply:",
    options: ["A=0, B=0", "A=1, B=0", "A=1, B=1", "Any input pattern"], a: 2 },
  { c: "vt", q: "A circuit has 10 signal lines. How many single stuck-at faults exist (before collapsing)?",
    options: ["10", "20", "100", "1024"], a: 1 },
  { c: "cs", q: "For the characteristic equation s² + 4s + 16 = 0, the damping ratio ζ is:",
    options: ["0.25", "0.5", "1", "4"], a: 1 },
  { c: "cs", q: "s³ + 2s² + 3s + K = 0 is stable for:",
    options: ["0 < K < 3", "0 < K < 6", "K > 6", "All K > 0"], a: 1 }
];

/* ---------- Instructor & senior intel (from seniors, Nov 2026; instructor allotment NOT confirmed) ---------- */
const SENIOR = {
  ai:    { prof: "Prof. Farukh", note: "Very relaxed teacher, but his lectures take patience to sit through.", vibe: "chill", gradeAdj: 3 },
  ertos: { prof: "Not known yet", note: "Seniors put it in the “chill” group.", vibe: "chill", gradeAdj: 5 },
  web:   { prof: "Not known yet", note: "No senior feedback yet.", vibe: "unknown", gradeAdj: 0 },
  lpv:   { prof: "Lakshmi ma'am or Narendar sir", note: "Seniors call it one of the two “core” electives (serious, VLSI-heavy). Not easy to score.", vibe: "core", gradeAdj: -4 },
  iot:   { prof: "Not known yet", note: "Last year's batch didn't have this course, so there's no senior feedback.", vibe: "unknown", gradeAdj: 0 },
  cell:  { prof: "Kalpana ma'am", note: "Relaxed class, but lectures are talk-heavy and exams expect long descriptive answers. Seniors: skip it if you hate writing lengthy answers. Not easy to score.", vibe: "chill", gradeAdj: -2, longAnswers: true },
  vt:    { prof: "Not known yet", note: "Seniors call it one of the two “core” electives. Not easy to score.", vibe: "core", gradeAdj: -6 },
  cs:    { prof: "Not known yet (EE dept)", note: "Not easy to score, but seniors say it's comparatively the easiest of Cellular, V&T and Control Systems.", vibe: "moderate", gradeAdj: 4 }
};
const SENIOR_RUN_NOTE = "Seniors say that depending on how many students pick each course, only 2 of the 4 in each slot may actually run.";

/* extra Part-1 questions about class vibe and how much the prof should count */
PART_A.splice(PART_A.findIndex(q => q.id === "prio") + 1, 0,
  { id: "vibe", type: "single", q: "What kind of class do you want?",
    options: [
      { v: "chill", t: "Chill: relaxed class and pace" },
      { v: "core", t: "Serious core course: rigorous, worth the effort" },
      { v: "any", t: "Don't care, the content matters more" } ] },
  { id: "profw", type: "scale", q: "How much should the professor and seniors' feedback count?",
    low: "Barely", high: "A lot: a bad prof can ruin a good course", def: 4 }
);

#!/usr/bin/env node
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NEXUS_SIMULATOR_ROOT =
  process.env.NEXUS_SIMULATOR_ROOT ?? "/Users/crimsonwheeler/Documents/GitHub/NexusSimulator/NexusSimulator-V1";
const DEFAULT_CODEX_PATH = "/Applications/Codex.app/Contents/Resources/codex";
const DEFAULT_PORT = 4179;
const OBJECT_KIT_ID = "corridor-lamp";
const VIEWER_ROOT = join(REPO_ROOT, "testing", "object-kits", OBJECT_KIT_ID);
const RUNS_ROOT = join(VIEWER_ROOT, "runs");
const SCHEMA_PATH = join(VIEWER_ROOT, "review-output.schema.json");
const PRIMARY_REFERENCE_PATH = join(VIEWER_ROOT, "references", "reference-primary.png");
const REVIEW_MODES = ["front", "side", "three-quarter", "player-distance", "corridor-dark"];
const ORBIT_MODES = [
  "orbit-000",
  "orbit-045",
  "orbit-090",
  "orbit-135",
  "orbit-180",
  "orbit-225",
  "orbit-270",
  "orbit-315",
];
const VIEW_MODES = [...REVIEW_MODES, ...ORBIT_MODES];

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function nowIso() {
  return new Date().toISOString();
}

function slugTime(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function toRepoRelative(path) {
  return path.startsWith(REPO_ROOT)
    ? path.slice(REPO_ROOT.length + 1).split(sep).join("/")
    : path;
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function writeJson(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, `${value}\n`);
}

function parseArgs(argv) {
  const kit = argv[0] && !argv[0].startsWith("--") ? argv[0] : "";
  const args = {
    dryRun: false,
    mockScore: null,
    noCodex: false,
    port: DEFAULT_PORT,
    referenceImage: "",
    runDir: "",
  };

  for (let index = kit ? 1 : 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--mock-score" && next) {
      args.mockScore = Number(next);
      index += 1;
    } else if (arg === "--no-codex") {
      args.noCodex = true;
    } else if (arg === "--port" && next) {
      args.port = Number(next);
      index += 1;
    } else if (arg === "--reference-image" && next) {
      args.referenceImage = resolve(next);
      index += 1;
    } else if (arg === "--run-dir" && next) {
      args.runDir = resolve(next);
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      return { args, kit: "help" };
    } else {
      throw new Error(`unknown or incomplete argument: ${arg}`);
    }
  }

  return { args, kit: kit || "help" };
}

function printHelp() {
  console.log(`Object Kit Review Harness

Usage:
  npm run review:object-kit -- corridor-lamp [options]

Options:
  --dry-run              Write manifests/prompts without browser or Codex execution
  --mock-score <score>   Write mock review JSON instead of invoking Codex
  --no-codex             Capture screenshots only
  --port <port>          Static review-room server port
  --reference-image <png> Copy a supplied/generated PNG into the primary reference slot
  --run-dir <path>       Explicit run artifact directory
`);
}

function installPrimaryReference(referenceImage) {
  if (!referenceImage) return null;
  if (!existsSync(referenceImage) || !statSync(referenceImage).isFile()) {
    throw new Error(`reference image not found: ${referenceImage}`);
  }
  if (extname(referenceImage).toLowerCase() !== ".png") {
    throw new Error("--reference-image currently expects a PNG file");
  }
  ensureDir(dirname(PRIMARY_REFERENCE_PATH));
  copyFileSync(referenceImage, PRIMARY_REFERENCE_PATH);
  const metadata = {
    copiedAt: nowIso(),
    source: referenceImage,
    target: PRIMARY_REFERENCE_PATH,
  };
  writeJson(join(VIEWER_ROOT, "references", "reference-primary.json"), metadata);
  return metadata;
}

function createRunDir(options) {
  if (options.runDir) return options.runDir;
  return join(RUNS_ROOT, `${slugTime()}-${process.pid}-human-review`);
}

function loadPlaywright() {
  try {
    return { module: createRequire(import.meta.url)("playwright"), source: "repo" };
  } catch (repoError) {
    if (existsSync(join(NEXUS_SIMULATOR_ROOT, "package.json"))) {
      try {
        const nexusRequire = createRequire(join(NEXUS_SIMULATOR_ROOT, "package.json"));
        return { module: nexusRequire("playwright"), source: "nexus-simulator" };
      } catch {
        // fall through to useful error below
      }
    }
    throw new Error(`Playwright unavailable: ${repoError.code ?? repoError.message}`);
  }
}

function findCodex() {
  const which = spawnSync("which", ["codex"], { encoding: "utf8" });
  const found = which.status === 0 ? which.stdout.trim() : "";
  if (found) return found;
  return existsSync(DEFAULT_CODEX_PATH) ? DEFAULT_CODEX_PATH : "";
}

function runCommand(command, commandArgs, options = {}) {
  const startedAt = Date.now();
  const result = spawnSync(command, commandArgs, {
    cwd: options.cwd ?? REPO_ROOT,
    encoding: "utf8",
    input: options.input,
    maxBuffer: 1024 * 1024 * 30,
    timeout: options.timeoutMs ?? 120000,
  });
  return {
    command: [command, ...commandArgs].join(" "),
    durationMs: Date.now() - startedAt,
    error: result.error ? result.error.message : null,
    signal: result.signal ?? null,
    status: result.status,
    stderr: result.stderr ?? "",
    stdout: result.stdout ?? "",
  };
}

function startStaticServer(port) {
  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
    const safePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
    const filePath = resolve(REPO_ROOT, safePath || "testing/object-kits/corridor-lamp/viewer.html");
    if (!filePath.startsWith(REPO_ROOT) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("not found");
      return;
    }
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": CONTENT_TYPES[extname(filePath)] ?? "application/octet-stream",
    });
    response.end(readFileSync(filePath));
  });

  return new Promise((resolveServer, rejectServer) => {
    server.once("error", rejectServer);
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

function mockReview(score) {
  const pass = score >= 90;
  const orbitComparison = ORBIT_MODES.map((angle) => ({
    angle,
    bestReferenceMatch: "reference-001",
    score,
    visibleFailure: pass ? "" : `Mock ${angle} failure: lamp silhouette needs improvement from this orbit angle.`,
  }));
  return {
    categoryScores: {
      artifactFreeRender: score,
      geometryDetail: score,
      horrorCorridorFit: score,
      lampIdentity: score,
      lightSourceBelievability: score,
      materialBelievability: score,
      playerDistanceReadability: score,
      rustGrimeQuality: score,
      silhouetteReadability: score,
    },
    firstVisibleFailure: pass ? "" : "Mock score below threshold: review-room capture needs a lamp-visible correction.",
    humanReadableSummary: pass
      ? "Mock accepted: the review-room lamp is treated as human-readable."
      : "Mock rejected: the review-room lamp needs visible improvement.",
    pass,
    promotionStatus: pass ? "accept" : "retry",
    orbitComparison,
    referenceRanking: [
      { rank: 1, reason: "Closest match for rusted practical-lamp silhouette.", reference: "reference-001" },
      { rank: 2, reason: "Best match for caged lamp-head detail.", reference: "reference-002" },
      { rank: 3, reason: "Best match for low-light corridor context.", reference: "reference-003" },
      { rank: 4, reason: "Best match for bracket and cable detail.", reference: "reference-004" },
      { rank: 5, reason: "Best match for broken-city mood.", reference: "reference-005" },
    ],
    requiredChanges: pass ? [] : ["Improve the first visible lamp failure before main-scene promotion."],
    score,
    topSemanticDifferences: pass ? [] : ["Mock semantic delta: lamp does not yet satisfy isolated human-view target."],
  };
}

function validateReview(review) {
  if (!review || typeof review !== "object") throw new Error("review must be an object");
  if (typeof review.score !== "number") throw new Error("review.score must be numeric");
  if (typeof review.pass !== "boolean") throw new Error("review.pass must be boolean");
  if (!Array.isArray(review.requiredChanges)) throw new Error("review.requiredChanges must be an array");
  if (!Array.isArray(review.topSemanticDifferences)) throw new Error("review.topSemanticDifferences must be an array");
  if (!Array.isArray(review.orbitComparison) || review.orbitComparison.length !== ORBIT_MODES.length) {
    throw new Error("review.orbitComparison must include all 8 orbit angles");
  }
  if (!Array.isArray(review.referenceRanking) || review.referenceRanking.length !== 5) {
    throw new Error("review.referenceRanking must rank all 5 references");
  }
  const orbitPasses = ORBIT_MODES.every((mode) => {
    const entry = review.orbitComparison.find((candidate) => candidate.angle === mode);
    return entry && typeof entry.score === "number" && entry.score >= 90;
  });
  const aggregatePasses = review.score >= 90 && review.pass && orbitPasses;
  return {
    ...review,
    pass: aggregatePasses,
    promotionStatus: aggregatePasses ? "accept" : review.promotionStatus === "accept" ? "retry" : review.promotionStatus,
  };
}

function buildReviewPrompt(runDir, captures) {
  return [
    "Review the HorrorCorridor corridor-lamp object from a human viewer perspective.",
    "",
    "The attached images are full review-room screenshots, not only raw WebGL frames.",
    "Judge the current lamp against the references, checklist, notes, camera mode, and lighting mode visible in the review room.",
    "If a primary generated reference is visible, treat it as the target image. Treat the other references as supporting trait examples.",
    "",
    "Do not pass from technical existence, object counts, or shader names.",
    "Pass only if the lamp would look convincing to a person at normal browser size and player distance.",
    "",
    "Required focus:",
    "- rusted practical lamp, not cyber neon",
    "- readable silhouette with pole, base, arm, head, cage/lens, cable",
    "- warm light visibly originates from lamp head",
    "- material reads as grime/rust/rough PBR hardware",
    "- corridor-dark and player-distance views are both readable",
    "",
    `Run folder: ${toRepoRelative(runDir)}`,
    "Captured review-room screenshots:",
    ...captures.filter((capture) => capture.kind === "review").map((capture) => `- ${capture.mode}: ${toRepoRelative(capture.reviewRoomPath)}`),
    "",
    "Captured orbit comparison screenshots:",
    ...captures.filter((capture) => capture.kind === "orbit").map((capture) => `- ${capture.mode}: ${toRepoRelative(capture.reviewRoomPath)}`),
    "",
    "Required orbit review:",
    "- Score every orbit angle independently.",
    "- A pass requires all eight orbit angles to preserve lamp identity and readable silhouette.",
    "- Rank the five references by which target trait they are most useful for matching.",
    "- Name the first angle where the lamp fails from a normal human perspective.",
    "",
    "Return JSON only using the schema.",
  ].join("\n");
}

function runCodexReview(runDir, captures) {
  const codexPath = findCodex();
  if (!codexPath) throw new Error("Codex CLI not found");
  const reviewPath = join(runDir, "review.json");
  const prompt = buildReviewPrompt(runDir, captures);
  const promptPath = join(runDir, "review-prompt.md");
  writeText(promptPath, prompt);
  const args = [
    "exec",
    "-C",
    REPO_ROOT,
    "--sandbox",
    "read-only",
    "--ask-for-approval",
    "never",
    "--ephemeral",
    "--json",
    "--output-schema",
    SCHEMA_PATH,
    "--output-last-message",
    reviewPath,
  ];
  for (const capture of captures) {
    args.push("--image", capture.reviewRoomPath);
  }
  args.push("-");
  const result = runCommand(codexPath, args, {
    input: prompt,
    timeoutMs: 1000 * 60 * 10,
  });
  writeJson(join(runDir, "codex-review-command.json"), {
    command: [codexPath, ...args].join(" "),
    durationMs: result.durationMs,
    error: result.error,
    exitCode: result.status,
    signal: result.signal,
    stderr: result.stderr,
    stdout: result.stdout,
  });
  if (result.status !== 0) {
    throw new Error(`Codex review failed with exit code ${result.status}`);
  }
  return validateReview(JSON.parse(readFileSync(reviewPath, "utf8")));
}

async function captureReviewRoom(options, runDir) {
  const { module: playwright, source } = loadPlaywright();
  const server = await startStaticServer(options.port);
  const browser = await playwright.chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const captures = [];

  try {
    for (const mode of VIEW_MODES) {
      const url = `http://127.0.0.1:${options.port}/testing/object-kits/corridor-lamp/viewer.html?mode=${mode}`;
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load", { timeout: 10000 }).catch(() => undefined);
      await page.waitForFunction(() => Boolean(window.__corridorLampReviewRoom), null, { timeout: 15000 });
      await page.evaluate((nextMode) => window.__corridorLampReviewRoom.setMode(nextMode), mode);
      await page.waitForTimeout(300);
      const reviewRoomPath = join(runDir, "screenshots", `review-room-${mode}.png`);
      const rawCanvasPath = join(runDir, "screenshots", `raw-canvas-${mode}.png`);
      ensureDir(dirname(reviewRoomPath));
      await page.screenshot({ fullPage: true, path: reviewRoomPath });
      await page.locator("#lamp-canvas").screenshot({ path: rawCanvasPath });
      captures.push({
        kind: ORBIT_MODES.includes(mode) ? "orbit" : "review",
        mode,
        rawCanvasPath,
        reviewRoomPath,
      });
    }
  } finally {
    await browser.close().catch(() => undefined);
    await new Promise((resolveClose) => server.close(resolveClose));
  }

  return { captures, playwrightSource: source };
}

function writeRetryPlan(runDir, review) {
  const retryPlan = {
    createdAt: nowIso(),
    firstVisibleFailure: review.firstVisibleFailure,
    requiredChanges: review.requiredChanges,
    score: review.score,
    topSemanticDifferences: review.topSemanticDifferences,
  };
  writeJson(join(runDir, "retry-plan.json"), retryPlan);
}

function writeFinalReport(runDir, review, captures) {
  const lines = [
    "# Corridor Lamp Object Review",
    "",
    `Status: ${review.pass ? "accepted" : "needs-fix"}`,
    `Score: ${review.score}`,
    `Promotion: ${review.promotionStatus}`,
    "",
    "## Human Summary",
    "",
    review.humanReadableSummary,
    "",
    "## First Visible Failure",
    "",
    review.firstVisibleFailure || "None recorded.",
    "",
    "## Captures",
    "",
    ...captures.filter((capture) => capture.kind === "review").map((capture) => `- ${capture.mode}: ${toRepoRelative(capture.reviewRoomPath)}`),
    "",
    "## 8-Angle Orbit Captures",
    "",
    ...captures.filter((capture) => capture.kind === "orbit").map((capture) => `- ${capture.mode}: ${toRepoRelative(capture.reviewRoomPath)}`),
    "",
    "## Orbit Comparison",
    "",
    ...review.orbitComparison.map((entry) => `- ${entry.angle}: ${entry.score} - ${entry.visibleFailure || "no blocking failure"}`),
    "",
    "## Reference Ranking",
    "",
    ...review.referenceRanking.map((entry) => `- #${entry.rank} ${entry.reference}: ${entry.reason}`),
  ];
  writeText(join(runDir, "final-report.md"), lines.join("\n"));
}

async function main() {
  const { args, kit } = parseArgs(process.argv.slice(2));
  if (kit === "help") {
    printHelp();
    return;
  }
  if (kit !== OBJECT_KIT_ID) {
    throw new Error(`only ${OBJECT_KIT_ID} is supported in this first review harness`);
  }

  const runDir = createRunDir(args);
  ensureDir(runDir);
  const primaryReference = installPrimaryReference(args.referenceImage);
  writeJson(join(runDir, "run-manifest.json"), {
    createdAt: nowIso(),
    dryRun: args.dryRun,
    kit,
    mockScore: args.mockScore,
    primaryReference,
    reviewRoom: toRepoRelative(join(VIEWER_ROOT, "viewer.html")),
    status: "running",
  });

  if (args.dryRun) {
    writeJson(join(runDir, "review.json"), mockReview(args.mockScore ?? 90));
    writeText(join(runDir, "final-report.md"), "# Corridor Lamp Object Review\n\nDry run only.");
    console.log(JSON.stringify({ runDir, status: "dry-run" }, null, 2));
    return;
  }

  const { captures, playwrightSource } = await captureReviewRoom(args, runDir);
  const review =
    args.mockScore !== null || args.noCodex
      ? validateReview(mockReview(args.mockScore ?? 90))
      : runCodexReview(runDir, captures);
  writeJson(join(runDir, "review.json"), review);
  if (!review.pass) {
    writeRetryPlan(runDir, review);
  }
  writeFinalReport(runDir, review, captures);
  writeJson(join(runDir, "run-manifest.json"), {
    completedAt: nowIso(),
    captures: captures.map((capture) => ({
      mode: capture.mode,
      kind: capture.kind,
      rawCanvasPath: toRepoRelative(capture.rawCanvasPath),
      reviewRoomPath: toRepoRelative(capture.reviewRoomPath),
    })),
    kit,
    playwrightSource,
    primaryReference,
    review,
    status: review.pass ? "accepted" : "needs-fix",
  });
  console.log(JSON.stringify({
    captures: captures.length,
    finalReport: join(runDir, "final-report.md"),
    runDir,
    score: review.score,
    status: review.pass ? "accepted" : "needs-fix",
  }, null, 2));
}

main().catch((error) => {
  console.error(`review-object-kit: ${error instanceof Error ? error.message : "unknown failure"}`);
  process.exit(1);
});

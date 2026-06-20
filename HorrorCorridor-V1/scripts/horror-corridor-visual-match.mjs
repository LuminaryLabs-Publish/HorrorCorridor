#!/usr/bin/env node
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_RUNS_ROOT = join(REPO_ROOT, "docs", "visual-review", "runs");
const DEFAULT_SCHEMA_PATH = join(REPO_ROOT, "docs", "visual-review", "review-output.schema.json");
const DEFAULT_REFERENCE_IMAGE = join(REPO_ROOT, "docs", "reference-images", "generated", "starting-scene-target-2026-06-19.png");
const DEFAULT_LIVE_PLAYER_LATEST = join(REPO_ROOT, "docs", "live-player-harness", "latest");
const DEFAULT_CODEX_PATH = "/Applications/Codex.app/Contents/Resources/codex";
const DEFAULT_URL = "http://localhost:3000/?debug=frames";
const DEFAULT_CDP_PORT = 9224;
const MAX_ATTEMPTS_CAP = 5;
const MIN_REFERENCE_BYTES = 4096;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function nowIso() {
  return new Date().toISOString();
}

function slugTime(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function safeSlug(value, fallback = "visual-match") {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9_.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || fallback;
}

function toRepoRelative(path) {
  return relative(REPO_ROOT, path).split(sep).join("/");
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function ensureCleanDir(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
  mkdirSync(dir, { recursive: true });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, `${value}\n`);
}

function appendJsonLine(path, value) {
  ensureDir(dirname(path));
  appendFileSync(path, `${JSON.stringify(value)}\n`);
}

function tailText(value, maxChars = 5000) {
  if (!value) return "";
  return value.length <= maxChars ? value : value.slice(value.length - maxChars);
}

function fail(message) {
  console.error(`visual-match: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const hasCommand = Boolean(argv[0] && !argv[0].startsWith("--"));
  const command = hasCommand ? argv[0] : "help";
  const args = {
    actionDurationMs: 900,
    actionProfile: "forward",
    allowExisting: false,
    autoFix: true,
    cdpPort: DEFAULT_CDP_PORT,
    codexPath: "",
    dryRun: false,
    generateReference: true,
    launchCdpChrome: true,
    maxAttempts: 3,
    minScore: 90,
    mockInvalidReview: false,
    mockScore: null,
    note: "",
    referenceImage: "",
    referencePromptFile: "",
    runDir: "",
    runsRoot: DEFAULT_RUNS_ROOT,
    schemaPath: DEFAULT_SCHEMA_PATH,
    skipCapture: false,
    slug: "",
    startServer: false,
    target: "starting-scene",
    url: DEFAULT_URL,
  };

  for (let index = hasCommand ? 1 : 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--allow-existing") {
      args.allowExisting = true;
    } else if (arg === "--action-duration-ms" && next) {
      args.actionDurationMs = Number(next);
      index += 1;
    } else if (arg === "--action-profile" && next) {
      args.actionProfile = next;
      index += 1;
    } else if (arg === "--cdp-port" && next) {
      args.cdpPort = Number(next);
      index += 1;
    } else if (arg === "--codex-path" && next) {
      args.codexPath = resolve(next);
      index += 1;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--generate-reference") {
      args.generateReference = true;
    } else if (arg === "--max-attempts" && next) {
      args.maxAttempts = Math.max(1, Math.min(MAX_ATTEMPTS_CAP, Number(next)));
      index += 1;
    } else if (arg === "--min-score" && next) {
      args.minScore = Number(next);
      index += 1;
    } else if (arg === "--mock-invalid-review") {
      args.mockInvalidReview = true;
    } else if (arg === "--mock-score" && next) {
      args.mockScore = Number(next);
      index += 1;
    } else if (arg === "--image" && next) {
      args.referenceImage = resolve(next);
      index += 1;
    } else if (arg === "--no-auto-fix") {
      args.autoFix = false;
    } else if (arg === "--no-launch-cdp-chrome") {
      args.launchCdpChrome = false;
    } else if (arg === "--note" && next) {
      args.note = next;
      index += 1;
    } else if (arg === "--reference-image" && next) {
      args.referenceImage = resolve(next);
      index += 1;
    } else if (arg === "--reference-prompt-file" && next) {
      args.referencePromptFile = resolve(next);
      index += 1;
    } else if (arg === "--run-dir" && next) {
      args.runDir = resolve(next);
      index += 1;
    } else if (arg === "--runs-root" && next) {
      args.runsRoot = resolve(next);
      index += 1;
    } else if (arg === "--schema-path" && next) {
      args.schemaPath = resolve(next);
      index += 1;
    } else if (arg === "--skip-capture") {
      args.skipCapture = true;
    } else if (arg === "--skip-reference-generation" || arg === "--no-generate-reference") {
      args.generateReference = false;
    } else if (arg === "--slug" && next) {
      args.slug = next;
      index += 1;
    } else if (arg === "--start-server") {
      args.startServer = true;
    } else if (arg === "--target" && next) {
      args.target = next;
      index += 1;
    } else if (arg === "--url" && next) {
      args.url = next;
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      return { command: "help", args };
    } else {
      fail(`unknown or incomplete argument: ${arg}`);
    }
  }

  return { command, args };
}

function runDirFor(options) {
  if (options.runDir) return options.runDir;
  const suffix = options.slug ? `-${safeSlug(options.slug)}` : `-${safeSlug(options.target)}`;
  return join(options.runsRoot, `${slugTime()}${suffix}`);
}

function findCodex(options = {}) {
  if (options.codexPath && existsSync(options.codexPath)) return options.codexPath;
  const which = spawnSync("which", ["codex"], { encoding: "utf8" });
  const found = which.status === 0 ? which.stdout.trim() : "";
  if (found) return found;
  return existsSync(DEFAULT_CODEX_PATH) ? DEFAULT_CODEX_PATH : "";
}

function runCommand(command, commandArgs, options = {}) {
  const startedAt = Date.now();
  const child = spawnSync(command, commandArgs, {
    cwd: options.cwd ?? REPO_ROOT,
    encoding: "utf8",
    input: options.input,
    maxBuffer: 1024 * 1024 * 30,
    timeout: options.timeoutMs ?? 120000,
  });

  return {
    command: [command, ...commandArgs].join(" "),
    durationMs: Date.now() - startedAt,
    error: child.error ? child.error.message : null,
    signal: child.signal ?? null,
    status: child.status,
    stderr: child.stderr ?? "",
    stdout: child.stdout ?? "",
  };
}

function imageDimensions(buffer, ext) {
  if (ext === ".png" && buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if ((ext === ".jpg" || ext === ".jpeg") && buffer.length > 4) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2) break;
      if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      offset += 2 + length;
    }
  }
  if (ext === ".webp" && buffer.length >= 30 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        height: 1 + buffer.readUIntLE(27, 3),
        width: 1 + buffer.readUIntLE(24, 3),
      };
    }
  }
  return { height: null, width: null };
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function validateImage(path, options = {}) {
  const ext = extname(path).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) {
    throw new Error(`unsupported image extension: ${ext || "(none)"}`);
  }
  if (options.requirePng && ext !== ".png") {
    throw new Error("reference image must be PNG so the artifact contract stays stable as reference.png");
  }
  const stats = statSync(path);
  if (!stats.isFile()) {
    throw new Error(`not a file: ${path}`);
  }
  if (stats.size < (options.minBytes ?? MIN_REFERENCE_BYTES)) {
    throw new Error(`image is too small: ${stats.size} bytes`);
  }
  if (options.startedAt) {
    const startedAtMs = Date.parse(options.startedAt);
    if (Number.isFinite(startedAtMs) && stats.mtimeMs + 1000 < startedAtMs) {
      throw new Error(`image is older than the reference step: ${stats.mtime.toISOString()} < ${options.startedAt}`);
    }
  }
  const buffer = readFileSync(path);
  return {
    bytes: stats.size,
    ext,
    mtime: stats.mtime.toISOString(),
    sha256: sha256(path),
    ...imageDimensions(buffer, ext),
  };
}

function defaultReferencePrompt(target) {
  if (target !== "starting-scene") {
    return `Create one high-fidelity HorrorCorridor visual reference image for target "${target}". The image should be a first-person game reference, no HUD, dark horror mood, readable foreground/midground, believable PBR materials, and clear player route direction.`;
  }
  return [
    "Create one raster PNG reference image for HorrorCorridor's starting player-view scene.",
    "",
    "Art direction:",
    "- First-person horror corridor, no HUD, no UI, no browser chrome.",
    "- Dirty overgrown broken-city corridor, not neon cyberpunk.",
    "- Muddy dark terrain/floor, damp concrete, broken brick, rusted metal, moss, roots, rubble, and practical lamps.",
    "- Subtle warm flashlight/player spill with very low ambient fill.",
    "- Rare sickly anomaly accents only as distant hints.",
    "- Strong readable floor/wall separation near camera.",
    "- At least one midground route cue or landmark.",
    "- Props should have real silhouettes: pipes, vents, cables, lamps, rocks, broken wall chunks, debris, and corroded fixtures.",
    "- High-fidelity PBR feel: normal-map texture, roughness variation, grime, corrosion, wetness, and material-specific color.",
    "- Darkness should shape attention, not hide the scene.",
    "",
    "Camera:",
    "- First-person eye height, wide but believable FOV.",
    "- View forward into a corridor path, not a blank wall or empty floor.",
    "- Cinematic but playable, showing what the player should understand in the first 3 seconds.",
  ].join("\n");
}

function writeReferencePrompt(runDir, options) {
  const prompt = options.referencePromptFile
    ? readFileSync(options.referencePromptFile, "utf8")
    : defaultReferencePrompt(options.target);
  const promptPath = join(runDir, "reference", "reference-prompt.md");
  writeText(promptPath, prompt.trim());
  return { prompt, promptPath };
}

function readRunManifest(runDir) {
  const manifestPath = join(runDir, "run-manifest.json");
  return existsSync(manifestPath) ? readJson(manifestPath) : null;
}

function writeRunManifest(runDir, manifest) {
  writeJson(join(runDir, "run-manifest.json"), {
    ...manifest,
    updatedAt: nowIso(),
  });
}

function createRunManifest(runDir, options, mode) {
  return {
    harness: "horror-corridor-visual-match",
    mode,
    options: {
      actionDurationMs: options.actionDurationMs,
      actionProfile: options.actionProfile,
      autoFix: options.autoFix,
      cdpPort: options.cdpPort,
      dryRun: options.dryRun,
      maxAttempts: options.maxAttempts,
      minScore: options.minScore,
      target: options.target,
      url: options.url,
    },
    repoRoot: REPO_ROOT,
    runDir,
    startedAt: nowIso(),
    status: "running",
  };
}

function buildReferenceGenerationPrompt({ runDir, prompt, referenceManifestPath }) {
  const submitCommand = `node scripts/horror-corridor-visual-match.mjs submit-reference --run-dir ${runDir} --image <path-to-new-image> --note generated-by-codex-imagegen`;
  return [
    "Generate the required HorrorCorridor visual reference image.",
    "",
    "Reference prompt:",
    prompt,
    "",
    "Hard requirements:",
    "- Use the installed Codex imagegen skill in default built-in image_gen mode to create one raster PNG image.",
    "- Do not use SVG, HTML, CSS, canvas mockups, placeholders, or text-only descriptions.",
    "- Do not use direct OpenAI API code, OPENAI_API_KEY, or external SDK image calls from this repo.",
    `- The reference step manifest is ${toRepoRelative(referenceManifestPath)}.`,
    "- The output is only accepted after it is registered through the repo submit command.",
    "- After image generation succeeds, run this exact submit command:",
    `  ${submitCommand}`,
    "- Replace <path-to-new-image> with the concrete PNG path created by imagegen.",
    "- The submit command will copy the image to reference/reference.png and write submission metadata.",
    "- Return a concise final message listing the submitted reference image path.",
  ].join("\n");
}

function runCodexExec({ codexPath, finalMessagePath, images = [], input, outputSchemaPath = "", sandbox, stdoutPath, stderrPath, timeoutMs = 1000 * 60 * 15 }) {
  const args = [
    "exec",
    "-C",
    REPO_ROOT,
    "--sandbox",
    sandbox,
    "--ask-for-approval",
    "never",
    "--ephemeral",
    "--json",
    "--output-last-message",
    finalMessagePath,
  ];
  if (outputSchemaPath) {
    args.push("--output-schema", outputSchemaPath);
  }
  for (const image of images) {
    args.push("--image", image);
  }
  args.push("-");

  const result = runCommand(codexPath, args, { input, timeoutMs });
  writeText(stdoutPath, result.stdout || "");
  writeText(stderrPath, result.stderr || "");
  return {
    command: [codexPath, ...args.filter((arg) => arg !== input)].join(" "),
    durationMs: result.durationMs,
    error: result.error,
    exitCode: result.status,
    signal: result.signal,
    stderrPath: toRepoRelative(stderrPath),
    stdoutPath: toRepoRelative(stdoutPath),
  };
}

function copyReferenceIntoRun(runDir, sourcePath, manifest) {
  if (!existsSync(sourcePath)) {
    throw new Error(`reference image does not exist: ${sourcePath}`);
  }
  const image = validateImage(sourcePath, { minBytes: 1 });
  const dest = join(runDir, "reference", "reference.png");
  ensureDir(dirname(dest));
  copyFileSync(sourcePath, dest);
  const copied = validateImage(dest, { minBytes: 1 });
  writeJson(join(runDir, "reference", "submission.json"), {
    copiedFrom: sourcePath,
    image: toRepoRelative(dest),
    source: image,
    status: "completed",
    submittedAt: nowIso(),
    target: manifest?.options?.target ?? "starting-scene",
    ...copied,
  });
  return dest;
}

function submitReference(options) {
  const runDir = options.runDir;
  if (!runDir) fail("submit-reference requires --run-dir");
  const imagePath = options.referenceImage;
  if (!imagePath) fail("submit-reference requires --image");
  const manifestPath = join(runDir, "reference", "manifest.json");
  if (!existsSync(manifestPath)) fail(`missing reference manifest: ${manifestPath}`);
  const referenceManifest = readJson(manifestPath);
  const details = validateImage(imagePath, {
    requirePng: true,
    startedAt: options.allowExisting ? null : referenceManifest.startedAt,
  });
  const destination = join(runDir, "reference", "reference.png");
  ensureDir(dirname(destination));
  copyFileSync(imagePath, destination);
  const copied = validateImage(destination, { minBytes: MIN_REFERENCE_BYTES, requirePng: true });
  const submission = {
    copied,
    image: toRepoRelative(destination),
    note: options.note ?? "",
    sourcePath: imagePath,
    source: details,
    status: "completed",
    submittedAt: nowIso(),
  };
  writeJson(join(runDir, "reference", "submission.json"), submission);
  const manifest = readRunManifest(runDir) ?? {};
  writeRunManifest(runDir, {
    ...manifest,
    reference: submission,
    status: "reference-ready",
  });
  console.log(JSON.stringify(submission, null, 2));
}

function parseSubmitReferenceArgs(argv) {
  const parsed = {
    allowExisting: false,
    note: "",
    referenceImage: "",
    runDir: "",
  };
  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--allow-existing") {
      parsed.allowExisting = true;
    } else if (arg === "--image" && next) {
      parsed.referenceImage = resolve(next);
      index += 1;
    } else if (arg === "--note" && next) {
      parsed.note = next;
      index += 1;
    } else if (arg === "--run-dir" && next) {
      parsed.runDir = resolve(next);
      index += 1;
    }
  }
  return parsed;
}

function prepareReference(options) {
  const runDir = runDirFor(options);
  ensureDir(join(runDir, "reference"));
  const manifest = createRunManifest(runDir, options, "prepare");
  const { prompt, promptPath } = writeReferencePrompt(runDir, options);
  const referenceManifestPath = join(runDir, "reference", "manifest.json");
  const referenceManifest = {
    promptPath: toRepoRelative(promptPath),
    startedAt: nowIso(),
    status: "pending",
    target: options.target,
  };
  writeJson(referenceManifestPath, referenceManifest);
  writeRunManifest(runDir, {
    ...manifest,
    referencePromptPath: toRepoRelative(promptPath),
    status: options.dryRun ? "dry-run-reference-pending" : "reference-pending",
  });

  const generationPromptPath = join(runDir, "reference", "codex-reference-prompt.md");
  const generationPrompt = buildReferenceGenerationPrompt({ prompt, referenceManifestPath, runDir });
  writeText(generationPromptPath, generationPrompt);

  if (options.referenceImage) {
    const reference = copyReferenceIntoRun(runDir, options.referenceImage, manifest);
    writeRunManifest(runDir, {
      ...manifest,
      referenceImage: toRepoRelative(reference),
      referencePromptPath: toRepoRelative(promptPath),
      status: "reference-ready",
    });
  } else if (options.generateReference && !options.dryRun) {
    const codexPath = findCodex(options);
    if (!codexPath) fail("Codex CLI was not found for reference generation");
    const result = runCodexExec({
      codexPath,
      finalMessagePath: join(runDir, "reference", "final.md"),
      input: generationPrompt,
      sandbox: "workspace-write",
      stderrPath: join(runDir, "reference", "codex-reference-stderr.txt"),
      stdoutPath: join(runDir, "reference", "codex-reference-events.jsonl"),
      timeoutMs: 1000 * 60 * 20,
    });
    writeJson(join(runDir, "reference", "codex-reference-command.json"), result);
    const referencePath = join(runDir, "reference", "reference.png");
    writeRunManifest(runDir, {
      ...manifest,
      referenceGeneration: result,
      referencePromptPath: toRepoRelative(promptPath),
      status: existsSync(referencePath) && result.exitCode === 0 ? "reference-ready" : "reference-failed",
    });
    if (!existsSync(referencePath)) {
      process.exitCode = 1;
    }
  }

  console.log(JSON.stringify({ runDir, referencePromptPath: promptPath }, null, 2));
}

function captureCurrentScene(options, attemptDir, referenceImage = "") {
  const captureDir = join(attemptDir, "capture");
  ensureCleanDir(captureDir);

  if (options.dryRun || options.skipCapture) {
    const latestStarting = join(DEFAULT_LIVE_PLAYER_LATEST, "starting-scene.png");
    const latestMovement = join(DEFAULT_LIVE_PLAYER_LATEST, "movement-scene.png");
    const latestReport = join(DEFAULT_LIVE_PLAYER_LATEST, "report.json");
    if (existsSync(latestStarting)) copyFileSync(latestStarting, join(captureDir, "starting-scene.png"));
    if (existsSync(latestMovement)) copyFileSync(latestMovement, join(captureDir, "movement-scene.png"));
    if (existsSync(latestReport)) copyFileSync(latestReport, join(captureDir, "report.json"));
    if (!existsSync(join(captureDir, "starting-scene.png")) && referenceImage && existsSync(referenceImage)) {
      copyFileSync(referenceImage, join(captureDir, "starting-scene.png"));
    }
    if (!existsSync(join(captureDir, "report.json"))) {
      writeJson(join(captureDir, "report.json"), {
        artifacts: [],
        harness: "horror-corridor-live-player-harness",
        note: "Dry-run capture copied the reference image as a placeholder because no latest live-player screenshot existed.",
        status: "dry-run",
      });
    }
    return {
      captureDir,
      command: null,
      status: existsSync(join(captureDir, "starting-scene.png")) ? "completed" : "dry-run-no-screenshot",
    };
  }

  const args = [
    "scripts/horror-corridor-live-player-harness.mjs",
    "--artifact-dir",
    captureDir,
    "--action-profile",
    options.actionProfile,
    "--action-duration-ms",
    String(options.actionDurationMs),
    "--cdp-port",
    String(options.cdpPort),
    "--url",
    options.url,
  ];
  if (options.launchCdpChrome) args.push("--launch-cdp-chrome");
  if (options.startServer) args.push("--start-server");

  const result = runCommand("node", args, { timeoutMs: 1000 * 60 * 4 });
  writeJson(join(attemptDir, "capture-command.json"), {
    command: result.command,
    durationMs: result.durationMs,
    error: result.error,
    exitCode: result.status,
    signal: result.signal,
    stderr: tailText(result.stderr),
    stdout: tailText(result.stdout),
  });

  return {
    captureDir,
    command: result.command,
    status: result.status === 0 && existsSync(join(captureDir, "starting-scene.png")) ? "completed" : "blocked",
  };
}

function buildReviewPrompt({ attemptIndex, currentImage, referenceImage, reportPath }) {
  return [
    "You are the HorrorCorridor final visual gate.",
    "",
    "Compare the attached reference image to the attached current player-view screenshot.",
    "Judge only what is visible. Do not give credit for code, object counts, debug counters, architecture, or intended behavior.",
    "",
    `Attempt: ${attemptIndex}`,
    `Reference image path: ${toRepoRelative(referenceImage)}`,
    `Current screenshot path: ${toRepoRelative(currentImage)}`,
    `Live-player report path: ${toRepoRelative(reportPath)}`,
    "",
    "Score the current screenshot against the reference with this rubric:",
    "- identityMatch: object/scene identity and intended genre target.",
    "- silhouetteGeometry: mesh shapes, scale, object profile, and non-placeholder geometry.",
    "- materialPbr: material believability, PBR response, grime, corrosion, wetness, roughness, and normal-map feel.",
    "- textureDetail: visible texture resolution, triplanar fit, surface breakup, and lack of broad flat slabs.",
    "- lightingReadability: readable darkness, floor/wall separation, local light shaping, and no crushed black.",
    "- compositionRoute: foreground, midground, route direction, focal cue, and objective/landmark clarity.",
    "- moodArtDirection: dirty overgrown broken-city horror, not neon cyber UI or generic prototype.",
    "- artifactFree: no HUD contamination, browser/debug overlay, broken geometry, blown exposure, or obvious render artifacts.",
    "",
    "Return JSON only. Use the required schema. Accept only when score >= 90.",
    "If rejected, requiredChanges must be the smallest visible levers to try next: camera, light, material, fog, placement, scale, silhouette, or UI contamination.",
  ].join("\n");
}

function mockReview(score) {
  return {
    categoryScores: {
      artifactFree: Math.min(100, score),
      compositionRoute: Math.min(100, score),
      identityMatch: Math.min(100, score),
      lightingReadability: Math.min(100, score),
      materialPbr: Math.min(100, score),
      moodArtDirection: Math.min(100, score),
      silhouetteGeometry: Math.min(100, score),
      textureDetail: Math.min(100, score),
    },
    firstVisibleFailure: score >= 90 ? "" : "Mock score is below threshold.",
    pass: score >= 90,
    promotionStatus: score >= 90 ? "accept" : "retry",
    requiredChanges: score >= 90 ? [] : ["Mock retry: apply the smallest visible material/lighting/silhouette correction."],
    score,
    topSemanticDifferences: score >= 90 ? [] : ["Mock semantic difference for retry artifact validation."],
  };
}

function validateReview(review, minScore) {
  if (!review || typeof review !== "object") {
    throw new Error("review is not an object");
  }
  if (typeof review.score !== "number" || !Number.isFinite(review.score)) {
    throw new Error("review.score must be a finite number");
  }
  if (typeof review.pass !== "boolean") {
    throw new Error("review.pass must be a boolean");
  }
  if (!["accept", "retry", "reject", "blocked"].includes(review.promotionStatus)) {
    throw new Error("review.promotionStatus must be accept, retry, reject, or blocked");
  }
  if (!Array.isArray(review.topSemanticDifferences)) {
    throw new Error("review.topSemanticDifferences must be an array");
  }
  if (!Array.isArray(review.requiredChanges)) {
    throw new Error("review.requiredChanges must be an array");
  }
  return {
    ...review,
    pass: review.score >= minScore && review.pass,
    promotionStatus: review.score >= minScore && review.pass ? "accept" : review.promotionStatus,
  };
}

function reviewAttempt(options, attemptDir, attemptIndex, referenceImage, currentImage) {
  const reportPath = join(attemptDir, "capture", "report.json");
  const reviewPromptPath = join(attemptDir, "review-prompt.md");
  const reviewPrompt = buildReviewPrompt({ attemptIndex, currentImage, referenceImage, reportPath });
  writeText(reviewPromptPath, reviewPrompt);
  const reviewPath = join(attemptDir, "review.json");

  if (options.mockInvalidReview) {
    writeText(reviewPath, "{ invalid json");
    throw new Error("mock invalid review JSON");
  }

  if (options.dryRun || options.mockScore !== null) {
    const review = mockReview(options.mockScore ?? options.minScore);
    writeJson(reviewPath, review);
    return validateReview(review, options.minScore);
  }

  const codexPath = findCodex(options);
  if (!codexPath) throw new Error("Codex CLI was not found for visual review");
  const result = runCodexExec({
    codexPath,
    finalMessagePath: reviewPath,
    images: [referenceImage, currentImage],
    input: reviewPrompt,
    outputSchemaPath: options.schemaPath,
    sandbox: "read-only",
    stderrPath: join(attemptDir, "codex-review-stderr.txt"),
    stdoutPath: join(attemptDir, "codex-review-events.jsonl"),
    timeoutMs: 1000 * 60 * 10,
  });
  writeJson(join(attemptDir, "codex-review-command.json"), result);
  if (result.exitCode !== 0) {
    throw new Error(`Codex review failed with exit code ${result.exitCode}`);
  }
  return validateReview(readJson(reviewPath), options.minScore);
}

function writeRetryPlan(attemptDir, review, attemptIndex) {
  const retryPlan = {
    attemptIndex,
    createdAt: nowIso(),
    firstVisibleFailure: review.firstVisibleFailure,
    requiredChanges: review.requiredChanges,
    score: review.score,
    topSemanticDifferences: review.topSemanticDifferences,
  };
  writeJson(join(attemptDir, "retry-plan.json"), retryPlan);
  return retryPlan;
}

function buildFixPrompt({ attemptIndex, currentImage, referenceImage, retryPlanPath, reviewPath }) {
  return [
    "Implement the next smallest HorrorCorridor visual fix for the failed visual-match attempt.",
    "",
    "Mandatory orientation:",
    "- Start by reading `.agent/start-here.md`, `.agent/workflow.md`, `.agent/intention.md`, `.agent/live-agent.md`, `.agent/memory.md`, `.agent/goal.md`, `.agent/feedback.md`, and `.agent/change-log.md`.",
    "- Re-open `docs/HorrorCorridor-V1-Parity-Audit.md` before editing.",
    "",
    "Evidence:",
    `- Reference image: ${toRepoRelative(referenceImage)}`,
    `- Current screenshot: ${toRepoRelative(currentImage)}`,
    `- Review JSON: ${toRepoRelative(reviewPath)}`,
    `- Retry plan: ${toRepoRelative(retryPlanPath)}`,
    `- Attempt: ${attemptIndex}`,
    "",
    "Rules:",
    "- Use the screenshot as player-visible truth.",
    "- Apply one cohesive fix only.",
    "- Prefer the smallest visible lever first: camera, light, material, fog, placement, scale, silhouette, or UI contamination.",
    "- Do not run destructive git commands.",
    "- Do not do broad rewrites or unrelated architecture migrations.",
    "- Keep HorrorCorridor-specific tuning in presets/content packs when changing kit data.",
    "- Do not claim success; this CLI will re-run screenshot capture and visual review after your patch.",
    "- Run focused checks if practical and summarize exactly what changed.",
  ].join("\n");
}

function runFix(options, attemptDir, attemptIndex, referenceImage, currentImage) {
  const retryPlanPath = join(attemptDir, "retry-plan.json");
  const reviewPath = join(attemptDir, "review.json");
  const fixPrompt = buildFixPrompt({ attemptIndex, currentImage, referenceImage, retryPlanPath, reviewPath });
  const fixPromptPath = join(attemptDir, "fix-prompt.md");
  const fixSummaryPath = join(attemptDir, "fix-summary.md");
  writeText(fixPromptPath, fixPrompt);

  if (options.dryRun) {
    writeText(fixSummaryPath, "Dry run: auto-fix was not invoked.");
    return {
      command: null,
      dryRun: true,
      exitCode: 0,
      status: "skipped",
    };
  }

  const codexPath = findCodex(options);
  if (!codexPath) {
    return {
      error: "Codex CLI was not found for auto-fix.",
      exitCode: 1,
      status: "blocked",
    };
  }

  const result = runCodexExec({
    codexPath,
    finalMessagePath: fixSummaryPath,
    images: [referenceImage, currentImage],
    input: fixPrompt,
    sandbox: "workspace-write",
    stderrPath: join(attemptDir, "codex-fix-stderr.txt"),
    stdoutPath: join(attemptDir, "codex-fix-events.jsonl"),
    timeoutMs: 1000 * 60 * 20,
  });
  return {
    ...result,
    status: result.exitCode === 0 ? "completed" : "failed",
  };
}

function runStaticChecks(attemptDir, dryRun) {
  const checks = [
    { args: ["tsc", "--noEmit"], command: "npx", name: "typecheck", timeoutMs: 1000 * 60 * 3 },
    { args: ["run", "lint"], command: "npm", name: "lint", timeoutMs: 1000 * 60 * 3 },
    { args: ["run", "smoke:protokits"], command: "npm", name: "smoke-protokits", timeoutMs: 1000 * 60 * 4 },
  ];

  const results = checks.map((check) => {
    if (dryRun) {
      return {
        command: [check.command, ...check.args].join(" "),
        name: check.name,
        status: "dry-run",
      };
    }
    const result = runCommand(check.command, check.args, { timeoutMs: check.timeoutMs });
    return {
      command: result.command,
      durationMs: result.durationMs,
      error: result.error,
      exitCode: result.status,
      name: check.name,
      signal: result.signal,
      stderr: tailText(result.stderr),
      stdout: tailText(result.stdout),
      status: result.status === 0 ? "passed" : "failed",
    };
  });

  writeJson(join(attemptDir, "checks.json"), {
    createdAt: nowIso(),
    results,
    status: results.every((result) => result.status === "passed" || result.status === "dry-run") ? "passed" : "failed",
  });
  return results;
}

function writeFinalReport(runDir, manifest, attempts) {
  const latest = attempts[attempts.length - 1];
  const status = manifest.status ?? "unknown";
  const lines = [
    "# HorrorCorridor Visual Match Report",
    "",
    "Status: generated",
    "",
    "## Summary",
    "",
    `- runDir: ${runDir}`,
    `- status: ${status}`,
    `- target: ${manifest.options?.target ?? "starting-scene"}`,
    `- minScore: ${manifest.options?.minScore ?? 90}`,
    `- attempts: ${attempts.length}`,
    latest?.review ? `- latestScore: ${latest.review.score}` : "- latestScore: unavailable",
    "",
    "## Attempts",
    "",
    ...attempts.map((attempt) => {
      const score = attempt.review?.score ?? "unavailable";
      const promotion = attempt.review?.promotionStatus ?? attempt.status;
      return `- attempt ${attempt.attemptIndex}: status=${attempt.status}, score=${score}, promotion=${promotion}, dir=${toRepoRelative(attempt.attemptDir)}`;
    }),
    "",
    "## Next Action",
    "",
    status === "accepted"
      ? "- Promote this visual state only after human review confirms the screenshot actually matches the reference."
      : "- Use the latest retry plan and screenshot as the next focused visual-fix input.",
  ];
  writeText(join(runDir, "final-report.md"), lines.join("\n"));
}

function ensureReference(runDir, options, manifest) {
  const referencePath = join(runDir, "reference", "reference.png");
  if (options.referenceImage) {
    return copyReferenceIntoRun(runDir, options.referenceImage, manifest);
  }
  if (existsSync(referencePath)) {
    validateImage(referencePath, { minBytes: 1 });
    return referencePath;
  }
  if (existsSync(DEFAULT_REFERENCE_IMAGE)) {
    return copyReferenceIntoRun(runDir, DEFAULT_REFERENCE_IMAGE, manifest);
  }
  throw new Error("No reference image available. Run `visual:match -- prepare` first or pass --reference-image.");
}

function runVisualMatch(options) {
  const runDir = runDirFor(options);
  ensureDir(join(runDir, "attempts"));
  let manifest = readRunManifest(runDir) ?? createRunManifest(runDir, options, "run");
  manifest = {
    ...manifest,
    mode: "run",
    status: "running",
  };
  writeRunManifest(runDir, manifest);
  if (!existsSync(join(runDir, "reference", "reference-prompt.md"))) {
    writeReferencePrompt(runDir, options);
  }
  const referenceImage = ensureReference(runDir, options, manifest);
  const attempts = [];

  for (let attemptIndex = 1; attemptIndex <= options.maxAttempts; attemptIndex += 1) {
    const attemptDir = join(runDir, "attempts", `attempt-${String(attemptIndex).padStart(3, "0")}`);
    ensureCleanDir(attemptDir);
    const attempt = {
      attemptDir,
      attemptIndex,
      createdAt: nowIso(),
      status: "pending",
    };

    try {
      const capture = captureCurrentScene(options, attemptDir, referenceImage);
      attempt.capture = capture;
      const currentImage = join(attemptDir, "capture", "starting-scene.png");
      if (!existsSync(currentImage)) {
        throw new Error(`starting screenshot was not captured: ${currentImage}`);
      }
      const review = reviewAttempt(options, attemptDir, attemptIndex, referenceImage, currentImage);
      attempt.review = review;
      attempt.status = review.score >= options.minScore && review.pass ? "accepted" : "needs-fix";
      if (attempt.status === "accepted") {
        attempts.push(attempt);
        manifest = {
          ...manifest,
          acceptedAt: nowIso(),
          latestAttempt: attempt,
          status: "accepted",
        };
        writeRunManifest(runDir, manifest);
        appendJsonLine(join(runDir, "attempts.jsonl"), attempt);
        break;
      }

      writeRetryPlan(attemptDir, review, attemptIndex);
      if (!options.autoFix || attemptIndex === options.maxAttempts) {
        const fixPromptPath = join(attemptDir, "fix-prompt.md");
        const fixSummaryPath = join(attemptDir, "fix-summary.md");
        writeText(fixPromptPath, buildFixPrompt({
          attemptIndex,
          currentImage,
          referenceImage,
          retryPlanPath: join(attemptDir, "retry-plan.json"),
          reviewPath: join(attemptDir, "review.json"),
        }));
        writeText(
          fixSummaryPath,
          "Auto-fix was not invoked because the run reached its max attempts or auto-fix was disabled.",
        );
        attempts.push(attempt);
        appendJsonLine(join(runDir, "attempts.jsonl"), attempt);
        manifest = {
          ...manifest,
          latestAttempt: attempt,
          status: options.dryRun ? "dry-run-needs-fix" : "exhausted",
        };
        writeRunManifest(runDir, manifest);
        break;
      }

      const fix = runFix(options, attemptDir, attemptIndex, referenceImage, currentImage);
      attempt.fix = fix;
      attempt.checks = runStaticChecks(attemptDir, options.dryRun);
      attempts.push(attempt);
      appendJsonLine(join(runDir, "attempts.jsonl"), attempt);
      manifest = {
        ...manifest,
        latestAttempt: attempt,
        status: "retrying",
      };
      writeRunManifest(runDir, manifest);
    } catch (error) {
      attempt.status = "blocked";
      attempt.error = error instanceof Error ? error.message : "unknown visual-match error";
      attempts.push(attempt);
      appendJsonLine(join(runDir, "attempts.jsonl"), attempt);
      manifest = {
        ...manifest,
        latestAttempt: attempt,
        status: options.dryRun ? "dry-run-blocked" : "blocked",
      };
      writeRunManifest(runDir, manifest);
      break;
    }
  }

  const finalManifest = readRunManifest(runDir) ?? manifest;
  writeFinalReport(runDir, finalManifest, attempts);
  console.log(JSON.stringify({
    attempts: attempts.length,
    finalReport: join(runDir, "final-report.md"),
    runDir,
    status: finalManifest.status,
  }, null, 2));
  if (!options.dryRun && !["accepted"].includes(finalManifest.status)) {
    process.exitCode = 1;
  }
}

function printHelp() {
  console.log(`HorrorCorridor Visual Match CLI

Usage:
  node scripts/horror-corridor-visual-match.mjs prepare [options]
  node scripts/horror-corridor-visual-match.mjs run [options]
  node scripts/horror-corridor-visual-match.mjs submit-reference --run-dir <dir> --image <png>

Common options:
  --target <name>                  Target name, default: starting-scene
  --slug <slug>                    Human label appended to generated run id
  --run-dir <path>                 Existing or explicit run directory
  --reference-image <path>         Seed/copy an existing reference image
  --dry-run                        Write prompts/artifacts without Codex/browser execution

Run options:
  --min-score <number>             Default: 90
  --max-attempts <number>          Default: 3, hard cap: 5
  --mock-score <number>            Bypass Codex review for artifact tests
  --mock-invalid-review            Exercise invalid review handling
  --no-auto-fix                    Review only; do not invoke Codex patching
`);
}

const { args, command } = parseArgs(process.argv.slice(2));

try {
  if (command === "prepare") {
    prepareReference(args);
  } else if (command === "run") {
    runVisualMatch(args);
  } else if (command === "submit-reference") {
    submitReference(parseSubmitReferenceArgs(process.argv.slice(2)));
  } else {
    printHelp();
  }
} catch (error) {
  fail(error instanceof Error ? error.message : "unknown visual-match failure");
}

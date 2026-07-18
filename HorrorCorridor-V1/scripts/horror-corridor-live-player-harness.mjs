#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NEXUS_SIMULATOR_ROOT =
  process.env.NEXUS_SIMULATOR_ROOT ?? "/Users/crimsonwheeler/Documents/GitHub/NexusSimulator/NexusSimulator-V1";
const DEFAULT_URL = "http://localhost:3000/?debug=frames";
const DEFAULT_ARTIFACT_DIR = join(REPO_ROOT, "docs/live-player-harness/latest");
const DEFAULT_CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEFAULT_CDP_PORT = 9222;
const DEFAULT_CDP_URLS = ["http://127.0.0.1:9222", "http://127.0.0.1:9223"];
const DEFAULT_THRESHOLD = {
  centerCropRatio: 0.82,
  maxDarkRatio: 0.55,
  minLightRatio: 0.15,
  minLights: 8,
  minMovementDelta: 0.25,
  minProps: 48,
  minTextures: 96,
  maxHudChromeBrightPixels: 25,
};

const launchArgs = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-background-networking",
  "--disable-breakpad",
  "--disable-crash-reporter",
  "--disable-features=Crashpad",
];

function parseArgs(argv) {
  const args = {
    actionDurationMs: 900,
    actionProfile: "forward",
    artifactDir: DEFAULT_ARTIFACT_DIR,
    browserExecutable: "",
    browserEngine: "all",
    cdpUrl: "",
    cdpPort: DEFAULT_CDP_PORT,
    dryRun: false,
    fastLive: false,
    headed: false,
    keepPageOpen: false,
    launchCdpChrome: false,
    reuseSessionPage: false,
    sessionId: "",
    skipBrowser: false,
    startServer: false,
    url: DEFAULT_URL,
    thresholds: { ...DEFAULT_THRESHOLD },
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--action-duration-ms" && next) {
      args.actionDurationMs = Number(next);
      index += 1;
    } else if (arg === "--action-profile" && next) {
      args.actionProfile = next;
      index += 1;
    } else if (arg === "--artifact-dir" && next) {
      args.artifactDir = resolve(next);
      index += 1;
    } else if (arg === "--browser-executable" && next) {
      args.browserExecutable = resolve(next);
      index += 1;
    } else if (arg === "--browser-engine" && next) {
      args.browserEngine = next;
      index += 1;
    } else if (arg === "--cdp-url" && next) {
      args.cdpUrl = next;
      index += 1;
    } else if (arg === "--cdp-port" && next) {
      args.cdpPort = Number(next);
      index += 1;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--fast-live") {
      args.fastLive = true;
    } else if (arg === "--headed") {
      args.headed = true;
    } else if (arg === "--launch-cdp-chrome") {
      args.launchCdpChrome = true;
    } else if (arg === "--keep-page-open") {
      args.keepPageOpen = true;
    } else if (arg === "--reuse-session-page") {
      args.reuseSessionPage = true;
    } else if (arg === "--session-id" && next) {
      args.sessionId = next;
      index += 1;
    } else if (arg === "--skip-browser") {
      args.skipBrowser = true;
    } else if (arg === "--start-server") {
      args.startServer = true;
    } else if (arg === "--url" && next) {
      args.url = next;
      index += 1;
    } else if (arg === "--max-dark-ratio" && next) {
      args.thresholds.maxDarkRatio = Number(next);
      index += 1;
    } else if (arg === "--center-crop-ratio" && next) {
      args.thresholds.centerCropRatio = Number(next);
      index += 1;
    } else if (arg === "--min-light-ratio" && next) {
      args.thresholds.minLightRatio = Number(next);
      index += 1;
    } else if (arg === "--min-lights" && next) {
      args.thresholds.minLights = Number(next);
      index += 1;
    } else if (arg === "--min-movement-delta" && next) {
      args.thresholds.minMovementDelta = Number(next);
      index += 1;
    } else if (arg === "--min-props" && next) {
      args.thresholds.minProps = Number(next);
      index += 1;
    } else if (arg === "--min-textures" && next) {
      args.thresholds.minTextures = Number(next);
      index += 1;
    } else if (arg === "--max-hud-chrome-bright-pixels" && next) {
      args.thresholds.maxHudChromeBrightPixels = Number(next);
      index += 1;
    }
  }

  if (
    args.actionProfile === "turn-left" ||
    args.actionProfile === "turn-right" ||
    args.actionProfile === "ceiling-overlap" ||
    args.actionProfile === "ceiling-fracture" ||
    args.actionProfile === "ceiling-material" ||
    args.actionProfile === "industrial-shelving" ||
    args.actionProfile === "wet-reflection" ||
    args.actionProfile === "floor-material" ||
    args.actionProfile === "success-path" ||
    args.actionProfile === "restart-after-caught"
  ) {
    const url = new URL(args.url);
    url.searchParams.set("liveAgent", "1");
    args.url = url.toString();
  }

  return args;
}

function nowIso() {
  return new Date().toISOString();
}

function ensureCleanDir(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { force: true, recursive: true });
  }
  mkdirSync(dir, { recursive: true });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function findChromiumShells(root = "/Users/crimsonwheeler/Library/Caches/ms-playwright") {
  if (!existsSync(root)) return [];
  const results = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      let stats;
      try {
        stats = statSync(fullPath);
      } catch {
        continue;
      }
      if (stats.isDirectory()) {
        visit(fullPath);
      } else if (entry === "chrome-headless-shell" || entry === "chrome") {
        results.push(fullPath);
      }
    }
  };
  visit(root);
  return results.sort().reverse();
}

async function loadPlaywright() {
  const attempts = [];
  try {
    return { module: await import("playwright"), source: "repo" };
  } catch (error) {
    attempts.push(`repo:${error.code ?? error.message}`);
  }

  if (existsSync(join(NEXUS_SIMULATOR_ROOT, "package.json"))) {
    try {
      const nexusRequire = createRequire(join(NEXUS_SIMULATOR_ROOT, "package.json"));
      return { module: nexusRequire("playwright"), source: "nexus-simulator" };
    } catch (error) {
      attempts.push(`nexus-simulator:${error.code ?? error.message}`);
    }
  }

  const error = new Error(`Playwright unavailable. Attempts: ${attempts.join("; ")}`);
  error.attempts = attempts;
  throw error;
}

async function canReachCdp(url) {
  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/json/version`);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForCdp(url, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await canReachCdp(url)) {
      return true;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 300));
  }
  return false;
}

async function launchCdpChromeIfRequested(options, report) {
  if (!options.launchCdpChrome) {
    return;
  }
  if (!existsSync(DEFAULT_CHROME_PATH)) {
    report.cdpLaunch = {
      launched: false,
      message: `Chrome executable not found at ${DEFAULT_CHROME_PATH}`,
    };
    return;
  }

  const cdpUrl = options.cdpUrl || `http://127.0.0.1:${options.cdpPort}`;
  options.cdpUrl = cdpUrl;
  if (await canReachCdp(cdpUrl)) {
    report.cdpLaunch = {
      launched: false,
      message: `CDP already reachable at ${cdpUrl}`,
      url: cdpUrl,
    };
    return;
  }

  const profileDir = `/tmp/horror-corridor-live-player-cdp-${options.cdpPort}`;
  const launch = spawnSync(
    "open",
    [
      "-na",
      "Google Chrome",
      "--args",
      `--remote-debugging-port=${options.cdpPort}`,
      `--user-data-dir=${profileDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      options.url,
    ],
    { encoding: "utf8" },
  );

  const reachable = await waitForCdp(cdpUrl);
  report.cdpLaunch = {
    launched: launch.status === 0,
    message: reachable ? "CDP Chrome is reachable." : "CDP Chrome did not become reachable.",
    profileDir,
    stderr: launch.stderr?.trim() ?? "",
    stdout: launch.stdout?.trim() ?? "",
    url: cdpUrl,
  };
}

async function findReachableCdpUrls(options) {
  const candidates = [options.cdpUrl, ...DEFAULT_CDP_URLS].filter(Boolean);
  const reachable = [];
  for (const url of candidates) {
    if (await canReachCdp(url)) {
      reachable.push(url);
    }
  }
  return reachable;
}

async function launchBrowser(playwright, options) {
  const candidates = [];
  const cdpUrls = await findReachableCdpUrls(options);
  for (const cdpUrl of cdpUrls) {
    candidates.push({ cdpUrl, engine: "chromium", name: `cdp:${cdpUrl}` });
  }

  if (options.browserExecutable) {
    candidates.push({
      engine: "chromium",
      executablePath: options.browserExecutable,
      name: "explicit-browser",
    });
  }

  const requestedEngines =
    options.browserEngine === "all" ? ["chromium", "webkit", "firefox"] : [options.browserEngine];

  if (requestedEngines.includes("chromium")) {
    candidates.push({ engine: "chromium", name: "playwright-default" });

    for (const shellPath of findChromiumShells()) {
      candidates.push({
        engine: "chromium",
        executablePath: shellPath,
        name: `installed-headless-shell:${shellPath}`,
      });
    }

    if (existsSync(DEFAULT_CHROME_PATH)) {
      candidates.push({ engine: "chromium", executablePath: DEFAULT_CHROME_PATH, name: "system-chrome" });
    }
  }

  if (requestedEngines.includes("webkit")) {
    candidates.push({ engine: "webkit", name: "playwright-webkit" });
  }

  if (requestedEngines.includes("firefox")) {
    candidates.push({ engine: "firefox", name: "playwright-firefox" });
  }

  const errors = [];
  for (const candidate of candidates) {
    try {
      if (candidate.cdpUrl) {
        const browser = await playwright.chromium.connectOverCDP(candidate.cdpUrl);
        return { browser, launchMode: candidate.name };
      }

      const browserType = playwright[candidate.engine];
      if (!browserType) {
        throw new Error(`Playwright browser engine is unavailable: ${candidate.engine}`);
      }

      const browser = await browserType.launch({
        args: launchArgs,
        executablePath: candidate.executablePath,
        headless: !options.headed,
      });
      return { browser, launchMode: candidate.name };
    } catch (error) {
      errors.push({
        engine: candidate.engine,
        mode: candidate.name,
        message: error.message,
      });
    }
  }

  const error = new Error("All browser launch modes failed.");
  error.launchErrors = errors;
  throw error;
}

function waitForHttp(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  return new Promise((resolveWait, rejectWait) => {
    const tick = async () => {
      try {
        const response = await fetch(url);
        if (response.status < 500) {
          resolveWait();
          return;
        }
      } catch {
        // Keep polling until timeout.
      }

      if (Date.now() - startedAt > timeoutMs) {
        rejectWait(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(tick, 300);
    };
    tick();
  });
}

function startDevServer() {
  const child = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
    cwd: REPO_ROOT,
    env: process.env,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return {
    close: () =>
      new Promise((resolveClose) => {
        child.once("close", resolveClose);
        child.kill();
        setTimeout(resolveClose, 1500);
      }),
    process: child,
  };
}

async function clickFirst(page, candidates) {
  const errors = [];
  for (const candidate of candidates) {
    try {
      const locator = candidate(page).first();
      await locator.waitFor({ state: "visible", timeout: 5000 });
      await locator.click();
      return;
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(`No click candidate matched. ${errors.join(" | ")}`);
}

async function enterPlayableRun(page) {
  try {
    await page.getByRole("button", { name: /start solo corridor/i }).click({ timeout: 5000 });
    return "solo";
  } catch {
    await clickFirst(page, [
      (candidatePage) => candidatePage.getByRole("button", { name: /create a room/i }),
      (candidatePage) => candidatePage.getByRole("button", { name: /host/i }),
    ]);
    await clickFirst(page, [
      (candidatePage) => candidatePage.getByRole("button", { name: /start run/i }),
      (candidatePage) => candidatePage.getByRole("button", { name: /enter run/i }),
    ]);
    return "host";
  }
}

async function extractState(page) {
  return page.evaluate(() => window.__HORROR_CORRIDOR_DEBUG__?.extractState?.() ?? null);
}

async function extractNexusEvidence(page) {
  return page.evaluate(() => {
    const surface = window.__HORROR_CORRIDOR_NEXUS__;
    const snapshot = surface?.snapshot?.();
    if (!snapshot) return null;

    const stateAt = (path) =>
      snapshot.domains.find((domain) => domain.path === path)?.state ?? null;

    return {
      version: snapshot.version,
      source: snapshot.source,
      counts: snapshot.counts,
      domainSnapshotCount: snapshot.domains.length,
      registeredDomainPathCount: snapshot.registeredDomainPaths.length,
      installCount: snapshot.installOrder.length,
      coreKitCount: snapshot.coreKitIds.length,
      coreKitIds: snapshot.coreKitIds,
      compositionKitCount: snapshot.compositionKitIds.length,
      compositionKitIds: snapshot.compositionKitIds,
      descriptorKitCount: snapshot.descriptorKitIds.length,
      descriptorKitIds: snapshot.descriptorKitIds,
      performance: surface.performance?.() ?? null,
      criticalState: {
        expedition: stateAt("n:horror-corridor:expedition"),
        corridor: stateAt("n:horror-corridor:corridor"),
        concrete: stateAt(
          "n:horror-corridor:corridor:ground:surface:paving:concrete",
        ),
        concreteSlabs: stateAt(
          "n:horror-corridor:corridor:ground:surface:paving:concrete:slabs",
        ),
        concreteSlab: stateAt(
          "n:horror-corridor:corridor:ground:surface:paving:concrete:slabs:slab",
        ),
        ceiling: stateAt(
          "n:horror-corridor:corridor:ruin:structure:ceilings:ceiling",
        ),
        ceilingOpenings: stateAt(
          "n:horror-corridor:corridor:ruin:structure:ceilings:ceiling:openings",
        ),
        cracking: stateAt(
          "n:horror-corridor:corridor:ruin:decay:cracking",
        ),
        rubble: stateAt("n:horror-corridor:corridor:ground:rubble"),
        fallenMasonry: stateAt(
          "n:horror-corridor:corridor:ground:rubble:fallen-masonry",
        ),
        body: stateAt(
          "n:horror-corridor:party:explorers:explorer:body",
        ),
        anomalyRite: stateAt("n:horror-corridor:anomaly-rite"),
        sharedExpedition: stateAt("n:horror-corridor:shared-expedition"),
      },
    };
  });
}

async function extractNexusResetReplayProof(page) {
  return page.evaluate(() =>
    window.__HORROR_CORRIDOR_NEXUS__?.proveResetReplay?.() ?? null,
  );
}

async function waitForLatestFrame(page, predicateSource, timeoutMs = 15000) {
  await waitForRendererReady(page);
  await page.waitForFunction(
    (source) => {
      const debug = window.__HORROR_CORRIDOR_DEBUG__?.extractState?.();
      const frame = debug?.latestFrame;
      if (!frame) return false;
      const predicate = new Function("frame", `return (${source})(frame);`);
      return Boolean(predicate(frame));
    },
    predicateSource,
    { timeout: timeoutMs },
  );
}

async function waitForRendererReady(page, timeoutMs = 15000) {
  await page.waitForSelector('[data-render-ready="true"]', {
    state: "attached",
    timeout: timeoutMs,
  });
}

function positionOf(debugState) {
  const position = debugState?.latestFrame?.localPose?.position;
  return {
    x: Number(position?.x ?? 0),
    y: Number(position?.y ?? 0),
    z: Number(position?.z ?? 0),
  };
}

function distance2d(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function sceneDressingOf(debugState) {
  return debugState?.latestFrame?.sceneDressing ?? null;
}

function summarizeVisibleText(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return {
    length: normalized.length,
    sample: normalized.slice(0, 240),
  };
}

async function collectVisibleText(page) {
  return page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const chunks = [];

    const isHiddenByAncestor = (element) => {
      let current = element;
      while (current && current !== document.body) {
        if (current.hidden || current.getAttribute("aria-hidden") === "true") {
          return true;
        }

        const style = window.getComputedStyle(current);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) <= 0.01) {
          return true;
        }

        current = current.parentElement;
      }
      return false;
    };

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent?.replace(/\s+/g, " ").trim();
      if (!text) continue;

      const element = node.parentElement;
      if (!element) continue;
      if (isHiddenByAncestor(element)) {
        continue;
      }

      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()];
      range.detach();

      const visible = rects.some((rect) => {
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.right > 0 &&
          rect.bottom > 0 &&
          rect.left < viewportWidth &&
          rect.top < viewportHeight
        );
      });

      if (visible) {
        chunks.push(text);
      }
    }

    return chunks.join(" ");
  });
}

function summarizeDebugState(debugState) {
  return {
    enabled: Boolean(debugState?.enabled),
    eventCount: debugState?.events?.length ?? 0,
    frameCount: debugState?.frames?.length ?? 0,
    latestFrame: debugState?.latestFrame ?? null,
    overlayVisible: Boolean(debugState?.overlayVisible),
  };
}

async function ensurePlayUiHidden(page) {
  let visibleText = summarizeVisibleText(await collectVisibleText(page).catch(() => ""));
  if (/monster index|field chronicle/i.test(visibleText.sample)) {
    await page.keyboard.press("m");
    await page.waitForTimeout(300);
    visibleText = summarizeVisibleText(await collectVisibleText(page).catch(() => ""));
  }

  if (!/settings|control map/i.test(visibleText.sample)) return;
  await page.keyboard.press("q");
  await page.waitForTimeout(300);

  const nextVisibleText = summarizeVisibleText(await collectVisibleText(page).catch(() => ""));
  if (!/settings|control map/i.test(nextVisibleText.sample)) {
    return;
  }

  await page.getByRole("button", { name: /close/i }).click({ timeout: 2000 }).catch(() => undefined);
  await page.waitForTimeout(300);

}

const ACTION_PROFILES = {
  backward: ["s"],
  forward: ["w"],
  "forward-left": ["w", "a"],
  "forward-right": ["w", "d"],
  "strafe-left": ["a"],
  "strafe-right": ["d"],
  listen: [],
  "hold-beam": [],
  "turn-left": [],
  "turn-right": [],
  "ceiling-overlap": [],
  "ceiling-fracture": [],
  "ceiling-material": [],
  "industrial-shelving": [],
  "wet-reflection": [],
  "floor-material": [],
  "claim-offer": [],
  "success-path": [],
  "restart-after-caught": [],
};

const normalizeRadians = (value) => {
  let angle = value % (Math.PI * 2);
  if (angle > Math.PI) angle -= Math.PI * 2;
  if (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
};

async function readSuccessFrame(page) {
  return page.evaluate(() => {
    const frame = window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame;
    if (!frame) return null;
    return {
      screen: frame.screen ?? null,
      roomId: frame.roomId ?? null,
      localPlayerId: frame.localPlayerId ?? null,
      gameState: frame.snapshot?.gameState ?? null,
      expedition: frame.expedition,
      position: frame.localPose?.position ?? null,
      streamedRoom: frame.sceneDressing?.referenceRoom ?? null,
      yaw: Number(frame.localPose?.rotationY ?? 0),
    };
  });
}

const summarizeSuccessFrame = (label, startedAt, frame) => ({
  label,
  elapsedMs: Date.now() - startedAt,
  phase: frame?.expedition?.phase ?? null,
  buildingNumber: frame?.expedition?.buildingNumber ?? null,
  buildingsCrossed: frame?.expedition?.buildingsCrossed ?? null,
  encountersSurvived: frame?.expedition?.encountersSurvived ?? null,
  encounter: frame?.expedition?.activeEncounter
    ? {
        number: frame.expedition.activeEncounter.encounterNumber,
        monsterId: frame.expedition.activeEncounter.monsterId,
        state: frame.expedition.activeEncounter.state,
        bearingRadians: frame.expedition.activeEncounter.bearingRadians,
        distance: frame.expedition.activeEncounter.distance,
        blackoutRemainingMs: frame.expedition.activeEncounter.blackoutRemainingMs,
        lastChanceRemainingMs: frame.expedition.activeEncounter.lastChanceRemainingMs,
        fullScareWitnessed: frame.expedition.activeEncounter.fullScareWitnessed,
      }
    : null,
  roomOffer: frame?.expedition?.roomOffer
    ? {
        id: frame.expedition.roomOffer.id,
        kind: frame.expedition.roomOffer.kind,
        claimed: frame.expedition.roomOffer.claimed,
      }
    : null,
  studiedMonsterIds:
    frame?.expedition?.monsterIndex
      ?.filter((entry) => entry.knowledge === "studied")
      .map((entry) => entry.id) ?? [],
  collectedMonsterIds:
    frame?.expedition?.monsterIndex
      ?.filter((entry) => entry.knowledge === "collected")
      .map((entry) => entry.id) ?? [],
  streamedRoom: frame?.streamedRoom
    ? {
        buildingNumber: frame.streamedRoom.streamedBuildingNumber ?? null,
        origin: frame.streamedRoom.streamedOrigin ?? null,
        entryYaw: frame.streamedRoom.entryYaw ?? null,
      }
    : null,
  position: frame?.position ?? null,
  yaw: frame?.yaw ?? null,
});

async function waitForSuccessFrame(page, predicateSource, timeoutMs) {
  try {
    await page.waitForFunction(
      (source) => {
        const frame = window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame;
        return Boolean(frame && new Function("frame", `return (${source})(frame);`)(frame));
      },
      predicateSource,
      { timeout: timeoutMs },
    );
  } catch (error) {
    const matchedAtBoundary = await page.evaluate((source) => {
      const frame = window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame;
      return Boolean(frame && new Function("frame", `return (${source})(frame);`)(frame));
    }, predicateSource);
    if (matchedAtBoundary) {
      return readSuccessFrame(page);
    }
    error.details = {
      predicateSource,
      timeoutMs,
      lastFrame: await readSuccessFrame(page),
    };
    throw error;
  }
  return readSuccessFrame(page);
}

async function turnByRadians(page, deltaYaw) {
  const turned = await page.evaluate((delta) => {
    const control = window.__HORROR_CORRIDOR_LIVE_CONTROL__;
    if (!control?.turnByRadians) return false;
    control.turnByRadians(delta);
    return true;
  }, normalizeRadians(deltaYaw));
  if (!turned) {
    const error = new Error("The action profile requires the live-control surface.");
    error.details = { url: page.url() };
    throw error;
  }
  await page.waitForTimeout(120);
}

async function faceActiveEncounter(page) {
  const frame = await readSuccessFrame(page);
  const bearing = Number(frame?.expedition?.activeEncounter?.bearingRadians);
  if (!Number.isFinite(bearing)) {
    throw new Error("Cannot face an encounter that is not active.");
  }
  await turnByRadians(page, -bearing);
}

async function moveUntil(page, isDone, timeoutMs) {
  const startedAt = Date.now();
  let batches = 0;
  let blockedTurns = 0;
  let distanceTravelled = 0;
  const trace = [];

  while (Date.now() - startedAt < timeoutMs) {
    const before = await readSuccessFrame(page);
    if (isDone(before)) {
      return { batches, blockedTurns, distanceTravelled, trace };
    }

    await page.keyboard.down("w");
    await page.waitForTimeout(520);
    await page.keyboard.up("w");
    await page.waitForTimeout(80);

    const after = await readSuccessFrame(page);
    batches += 1;
    const movement = Math.hypot(
      Number(after?.position?.x ?? 0) - Number(before?.position?.x ?? 0),
      Number(after?.position?.z ?? 0) - Number(before?.position?.z ?? 0),
    );
    distanceTravelled += movement;
    trace.push({
      batch: batches,
      movement,
      yaw: after?.yaw ?? null,
      phase: after?.expedition?.phase ?? null,
      introDistanceTravelled:
        after?.expedition?.introDistanceTravelled ?? null,
      distanceTravelled: after?.expedition?.distanceTravelled ?? null,
      distanceSinceEncounter:
        after?.expedition?.distanceSinceEncounter ?? null,
      encounterNumber:
        after?.expedition?.activeEncounter?.encounterNumber ?? null,
    });
    if (isDone(after)) {
      return { batches, blockedTurns, distanceTravelled, trace };
    }
    if (movement < 0.4) {
      await turnByRadians(page, -Math.PI / 2);
      blockedTurns += 1;
    }
  }

  const error = new Error(`Success-path movement timed out after ${timeoutMs} ms.`);
  error.details = {
    batches,
    blockedTurns,
    distanceTravelled,
    lastFrame: await readSuccessFrame(page),
    trace,
  };
  throw error;
}

async function performSuccessPath(page) {
  const startedAt = Date.now();
  const steps = [];
  const record = async (label, frame = null) => {
    const current = frame ?? (await readSuccessFrame(page));
    steps.push(summarizeSuccessFrame(label, startedAt, current));
    return current;
  };

  await record("playable-start");
  const firstApproach = await moveUntil(
    page,
    (frame) => Number(frame?.expedition?.activeEncounter?.encounterNumber ?? 0) === 1,
    20_000,
  );
  const firstEncounter = await record("first-encounter-seen");
  const firstTravelYaw = Number(firstEncounter?.yaw ?? 0);
  await faceActiveEncounter(page);
  const firstResolved = await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.encountersSurvived >= 1 && !frame.expedition?.activeEncounter",
    6_000,
  );
  await record("first-encounter-repelled-early", firstResolved);

  await turnByRadians(page, firstTravelYaw - Number(firstResolved?.yaw ?? 0));
  const secondApproach = await moveUntil(
    page,
    (frame) => Number(frame?.expedition?.activeEncounter?.encounterNumber ?? 0) === 2,
    30_000,
  );
  const secondEncounter = await record("second-encounter-seen");
  const secondTravelYaw = Number(secondEncounter?.yaw ?? 0);
  const blackout = await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.activeEncounter?.state === 'blackout'",
    35_000,
  );
  await record("full-scare-blackout", blackout);
  const lastChance = await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.activeEncounter?.state === 'last-chance'",
    5_000,
  );
  await record("last-chance-opened", lastChance);
  await faceActiveEncounter(page);
  const secondResolved = await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.encountersSurvived >= 2 && !frame.expedition?.activeEncounter && frame.expedition?.monsterIndex?.some((entry) => entry.knowledge === 'collected')",
    6_000,
  );
  await record("full-scare-survived-and-collected", secondResolved);

  await page.keyboard.press("e");
  const offerClaimed = await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.roomOffer?.claimed === true",
    3_000,
  );
  await record("room-offer-claimed", offerClaimed);

  await turnByRadians(page, secondTravelYaw - Number(offerClaimed?.yaw ?? 0));
  const thirdApproach = await moveUntil(
    page,
    (frame) =>
      Number(frame?.expedition?.buildingNumber ?? 0) >= 3 &&
      Number(frame?.expedition?.activeEncounter?.encounterNumber ?? 0) === 3,
    30_000,
  );
  const finalFrame = await record("next-building-entered");

  return {
    passed:
      Number(finalFrame?.expedition?.encountersSurvived ?? 0) >= 2 &&
      Number(finalFrame?.expedition?.buildingNumber ?? 0) >= 3 &&
      finalFrame?.expedition?.roomOffer?.claimed === true &&
      finalFrame?.expedition?.monsterIndex?.some(
        (entry) => entry.knowledge === "collected",
      ) === true &&
      Number(finalFrame?.streamedRoom?.streamedBuildingNumber ?? -1) ===
        Number(finalFrame?.expedition?.buildingNumber ?? -2),
    durationMs: Date.now() - startedAt,
    firstApproach,
    secondApproach,
    thirdApproach,
    blackoutObservedMs:
      (steps.find((step) => step.label === "last-chance-opened")?.elapsedMs ?? 0) -
      (steps.find((step) => step.label === "full-scare-blackout")?.elapsedMs ?? 0),
    steps,
  };
}

const summarizeRestartFrame = (frame) => ({
  screen: frame?.screen ?? null,
  roomId: frame?.roomId ?? null,
  localPlayerId: frame?.localPlayerId ?? null,
  gameState: frame?.gameState ?? null,
  phase: frame?.expedition?.phase ?? null,
  elapsedMs: frame?.expedition?.elapsedMs ?? null,
  distanceTravelled: frame?.expedition?.distanceTravelled ?? null,
  buildingNumber: frame?.expedition?.buildingNumber ?? null,
  buildingsCrossed: frame?.expedition?.buildingsCrossed ?? null,
  encountersSurvived: frame?.expedition?.encountersSurvived ?? null,
  activeEncounterNumber:
    frame?.expedition?.activeEncounter?.encounterNumber ?? null,
  monsterKnowledge:
    frame?.expedition?.monsterIndex?.map((entry) => ({
      id: entry.id,
      knowledge: entry.knowledge,
      encounters: entry.encounters,
      scaresSurvived: entry.scaresSurvived,
    })) ?? [],
  position: frame?.position ?? null,
});

async function performRestartAfterCaught(page, artifactDir) {
  const startedAt = Date.now();
  const initial = await readSuccessFrame(page);
  const approach = await moveUntil(
    page,
    (frame) => Number(frame?.expedition?.activeEncounter?.encounterNumber ?? 0) === 1,
    25_000,
  );
  const encounter = await readSuccessFrame(page);
  const bearing = Number(encounter?.expedition?.activeEncounter?.bearingRadians);
  if (!Number.isFinite(bearing)) {
    throw new Error("Restart proof could not observe the first monster bearing.");
  }

  await turnByRadians(page, Math.PI - bearing);
  await waitForSuccessFrame(
    page,
    "(frame) => frame.expedition?.phase === 'caught'",
    45_000,
  );
  await waitForLatestFrame(
    page,
    "(frame) => frame.screen === 'COMPLETED' && frame.expedition?.phase === 'caught'",
    5_000,
  );
  const caught = await readSuccessFrame(page);
  const restartButton = page.getByRole("button", {
    name: /begin another expedition/i,
  });
  await restartButton.waitFor({ state: "visible", timeout: 5_000 });
  const caughtText = summarizeVisibleText(
    await collectVisibleText(page).catch(() => ""),
  );
  const caughtPath = join(artifactDir, "caught-terminal.png");
  await page.screenshot({ fullPage: false, path: caughtPath });

  const loadingHeading = page.getByRole("heading", {
    name: /generating scene kits/i,
  });
  await Promise.all([
    loadingHeading.waitFor({ state: "visible", timeout: 5_000 }),
    restartButton.click(),
  ]);
  const loadingPath = join(artifactDir, "restart-loading.png");
  await page.screenshot({ fullPage: false, path: loadingPath });

  await waitForRendererReady(page, 20_000);
  await page.waitForFunction(
    (previousRoomId) => {
      const frame = window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame;
      return Boolean(
        frame?.screen === "PLAYING" &&
          frame?.roomId &&
          frame.roomId !== previousRoomId &&
          frame.expedition?.phase === "intro",
      );
    },
    caught?.roomId ?? null,
    { timeout: 20_000 },
  );
  await page.evaluate(() => {
    window.__HORROR_CORRIDOR_DEBUG__?.hideOverlay?.();
    window.__HORROR_CORRIDOR_LIVE_CONTROL__?.resume?.();
  });
  await page.waitForTimeout(300);
  await ensurePlayUiHidden(page);
  const fresh = await readSuccessFrame(page);
  const freshPath = join(artifactDir, "fresh-expedition.png");
  await page.screenshot({ fullPage: false, path: freshPath });

  await page.keyboard.down("w");
  await page.waitForTimeout(700);
  await page.keyboard.up("w");
  await page.waitForTimeout(180);
  const moved = await readSuccessFrame(page);
  const movedPath = join(artifactDir, "fresh-expedition-moved.png");
  await page.screenshot({ fullPage: false, path: movedPath });
  const movementDelta = distance2d(
    fresh?.position ?? { x: 0, z: 0 },
    moved?.position ?? { x: 0, z: 0 },
  );
  const freshMonsterIndex = fresh?.expedition?.monsterIndex ?? [];
  const passed =
    caught?.screen === "COMPLETED" &&
    caught?.gameState === "failure" &&
    caught?.expedition?.phase === "caught" &&
    fresh?.screen === "PLAYING" &&
    fresh?.gameState === "playing" &&
    fresh?.expedition?.phase === "intro" &&
    fresh?.roomId !== caught?.roomId &&
    fresh?.localPlayerId !== caught?.localPlayerId &&
    Number(fresh?.expedition?.buildingNumber ?? -1) === 0 &&
    Number(fresh?.expedition?.buildingsCrossed ?? -1) === 0 &&
    Number(fresh?.expedition?.encountersSurvived ?? -1) === 0 &&
    fresh?.expedition?.activeEncounter === null &&
    freshMonsterIndex.length > 0 &&
    freshMonsterIndex.every(
      (entry) =>
        entry.knowledge === "unknown" &&
        entry.encounters === 0 &&
        entry.scaresSurvived === 0,
    ) &&
    movementDelta >= DEFAULT_THRESHOLD.minMovementDelta;

  return {
    passed,
    durationMs: Date.now() - startedAt,
    artifacts: [caughtPath, loadingPath, freshPath, movedPath],
    approach,
    caughtText,
    initial: summarizeRestartFrame(initial),
    caught: summarizeRestartFrame(caught),
    fresh: summarizeRestartFrame(fresh),
    moved: summarizeRestartFrame(moved),
    movementDelta,
    loadingObserved: true,
  };
}

async function performActionProfile(
  page,
  actionProfile,
  actionDurationMs,
  artifactDir,
) {
  const keys = ACTION_PROFILES[actionProfile];
  if (!keys) {
    throw new Error(`Unknown action profile: ${actionProfile}`);
  }

  if (actionProfile === "success-path") {
    return performSuccessPath(page);
  }
  if (actionProfile === "restart-after-caught") {
    return performRestartAfterCaught(page, artifactDir);
  }
  if (
    actionProfile === "ceiling-overlap" ||
    actionProfile === "ceiling-fracture" ||
    actionProfile === "ceiling-material"
  ) {
    await page.keyboard.down("w");
    await page.waitForTimeout(actionDurationMs);
    await page.keyboard.up("w");
    await page.waitForTimeout(180);
    const movementPath = join(
      artifactDir,
      actionProfile === "ceiling-fracture"
        ? "ceiling-fracture-after-movement.png"
        : actionProfile === "ceiling-material"
          ? "ceiling-material-after-movement.png"
          : "ceiling-route-after-movement.png",
    );
    await page.screenshot({ fullPage: false, path: movementPath });
    const lookApplied = await page.evaluate(() => {
      const control = window.__HORROR_CORRIDOR_LIVE_CONTROL__;
      if (!control?.lookByRadians) return false;
      control.lookByRadians(0.32, 0.34);
      return true;
    });
    if (!lookApplied) {
      throw new Error(
        `The ${actionProfile} profile requires yaw-and-pitch live control.`,
      );
    }
    await page.waitForTimeout(280);
    return {
      artifacts: [movementPath],
      look: { deltaPitch: 0.34, deltaYaw: 0.32 },
    };
  }
  if (actionProfile === "industrial-shelving") {
    const approachDurationMs = Math.min(actionDurationMs, 260);
    await page.keyboard.down("w");
    await page.waitForTimeout(approachDurationMs);
    await page.keyboard.up("w");
    await page.waitForTimeout(180);
    const approachPath = join(
      artifactDir,
      "industrial-shelving-after-approach.png",
    );
    await page.screenshot({ fullPage: false, path: approachPath });
    const lookApplied = await page.evaluate(() => {
      const control = window.__HORROR_CORRIDOR_LIVE_CONTROL__;
      if (!control?.lookByRadians) return false;
      control.lookByRadians(0.82, 0.03);
      return true;
    });
    if (!lookApplied) {
      throw new Error(
        "The industrial-shelving profile requires yaw-and-pitch live control.",
      );
    }
    await page.waitForTimeout(320);
    const sideLookPath = join(
      artifactDir,
      "industrial-shelving-side-look.png",
    );
    await page.screenshot({ fullPage: false, path: sideLookPath });
    return {
      artifacts: [approachPath, sideLookPath],
      approachDurationMs,
      look: { deltaPitch: 0.03, deltaYaw: 0.82 },
    };
  }
  if (actionProfile === "wet-reflection") {
    await page.keyboard.down("w");
    await page.waitForTimeout(actionDurationMs);
    await page.keyboard.up("w");
    await page.waitForTimeout(180);
    const movementPath = join(artifactDir, "reflection-after-movement.png");
    await page.screenshot({ fullPage: false, path: movementPath });
    const lookApplied = await page.evaluate(() => {
      const control = window.__HORROR_CORRIDOR_LIVE_CONTROL__;
      if (!control?.lookByRadians) return false;
      control.lookByRadians(0.7, -0.24);
      return true;
    });
    if (!lookApplied) {
      throw new Error("The wet-reflection profile requires yaw-and-pitch live control.");
    }
    await page.waitForTimeout(280);
    return {
      artifacts: [movementPath],
      look: { deltaPitch: -0.24, deltaYaw: 0.7 },
    };
  }
  if (actionProfile === "floor-material") {
    await page.keyboard.down("w");
    await page.waitForTimeout(actionDurationMs);
    await page.keyboard.up("w");
    await page.waitForTimeout(180);
    const movementPath = join(artifactDir, "floor-material-after-movement.png");
    await page.screenshot({ fullPage: false, path: movementPath });
    const lookApplied = await page.evaluate(() => {
      const control = window.__HORROR_CORRIDOR_LIVE_CONTROL__;
      if (!control?.lookByRadians) return false;
      control.lookByRadians(0.32, -0.48);
      return true;
    });
    if (!lookApplied) {
      throw new Error("The floor-material profile requires yaw-and-pitch live control.");
    }
    await page.waitForTimeout(320);
    return {
      artifacts: [movementPath],
      look: { deltaPitch: -0.48, deltaYaw: 0.32 },
    };
  }
  if (actionProfile === "turn-left" || actionProfile === "turn-right") {
    const deltaYaw = actionProfile === "turn-right" ? -1.05 : 1.05;
    await page.evaluate((delta) => {
      window.__HORROR_CORRIDOR_LIVE_CONTROL__?.turnByRadians?.(delta);
    }, deltaYaw);
  } else if (actionProfile === "claim-offer") {
    await page.keyboard.press("e");
  } else {
    for (const key of keys) {
      await page.keyboard.down(key);
    }
  }

  await page.waitForTimeout(actionDurationMs);

  for (const key of [...keys].reverse()) {
    await page.keyboard.up(key);
  }
  return null;
}

function evaluateGates({
  actionProof,
  actionProfile,
  canvas,
  debugAfter,
  debugBefore,
  hudChrome,
  luminance,
  nexusAfter,
  nexusResetReplay,
  thresholds,
  viewChecks,
  visibleText,
}) {
  const movementDelta = distance2d(positionOf(debugBefore), positionOf(debugAfter));
  const yawBefore = Number(debugBefore?.latestFrame?.localPose?.rotationY ?? 0);
  const yawAfter = Number(debugAfter?.latestFrame?.localPose?.rotationY ?? 0);
  const yawDelta = Math.abs(yawAfter - yawBefore);
  const pitchAfter = Number(debugAfter?.latestFrame?.localPose?.pitch ?? 0);
  const expeditionElapsedDelta =
    Number(debugAfter?.latestFrame?.expedition?.elapsedMs ?? 0) -
    Number(debugBefore?.latestFrame?.expedition?.elapsedMs ?? 0);
  const movementProfiles = new Set([
    "backward",
    "forward",
    "forward-left",
    "forward-right",
    "strafe-left",
    "strafe-right",
  ]);
  const actionObserved = movementProfiles.has(actionProfile)
    ? movementDelta >= thresholds.minMovementDelta
    : actionProfile === "turn-left" || actionProfile === "turn-right"
      ? yawDelta >= 0.25
      : actionProfile === "wet-reflection"
        ? movementDelta >= thresholds.minMovementDelta &&
          yawDelta >= 0.5 &&
          pitchAfter <= -0.18
      : actionProfile === "floor-material"
        ? movementDelta >= thresholds.minMovementDelta &&
          yawDelta >= 0.3 &&
          pitchAfter <= -0.24
      : actionProfile === "industrial-shelving"
        ? movementDelta >= thresholds.minMovementDelta && yawDelta >= 0.8
      : actionProfile === "ceiling-overlap" ||
          actionProfile === "ceiling-fracture" ||
          actionProfile === "ceiling-material"
        ? movementDelta >= thresholds.minMovementDelta &&
          yawDelta >= 0.2 &&
          pitchAfter >= 0.25
      : actionProfile === "claim-offer"
        ? debugAfter?.latestFrame?.expedition?.roomOffer?.claimed === true ||
          debugBefore?.latestFrame?.expedition?.roomOffer === null
        : actionProfile === "success-path"
          ? Number(debugAfter?.latestFrame?.expedition?.encountersSurvived ?? 0) >= 2 &&
            Number(debugAfter?.latestFrame?.expedition?.buildingNumber ?? 0) >= 3 &&
            debugAfter?.latestFrame?.expedition?.roomOffer?.claimed === true &&
            debugAfter?.latestFrame?.expedition?.monsterIndex?.some(
              (entry) => entry.knowledge === "collected",
            ) === true &&
            Number(
              debugAfter?.latestFrame?.sceneDressing?.referenceRoom
                ?.streamedBuildingNumber ?? -1,
            ) ===
              Number(
                debugAfter?.latestFrame?.expedition?.buildingNumber ?? -2,
              )
        : actionProfile === "restart-after-caught"
          ? actionProof?.passed === true
        : expeditionElapsedDelta >= 100;
  const sceneDressing = sceneDressingOf(debugAfter);
  const concretePaving = sceneDressing?.concretePaving ?? null;
  const concreteState = nexusAfter?.criticalState?.concrete ?? null;
  const concreteSlabsState = nexusAfter?.criticalState?.concreteSlabs ?? null;
  const concreteSlabState = nexusAfter?.criticalState?.concreteSlab ?? null;
  const ceilingCollapse = sceneDressing?.ceilingCollapse ?? null;
  const referenceRoom = sceneDressing?.referenceRoom ?? null;
  const ceilingState = nexusAfter?.criticalState?.ceiling ?? null;
  const ceilingOpeningsState =
    nexusAfter?.criticalState?.ceilingOpenings ?? null;
  const crackingState = nexusAfter?.criticalState?.cracking ?? null;
  const rubbleState = nexusAfter?.criticalState?.rubble ?? null;
  const fallenMasonryState =
    nexusAfter?.criticalState?.fallenMasonry ?? null;
  const terminalCaught = debugAfter?.latestFrame?.expedition?.phase === "caught";
  const gates = {
    canvasMounted: Boolean(canvas?.width && canvas?.height),
    hiddenPlayUi: terminalCaught || visibleText.length === 0,
    noHudIconChrome: hudChrome
      ? hudChrome.bottomLeftBrightPixels <= thresholds.maxHudChromeBrightPixels
      : false,
    lightCount: Number(sceneDressing?.lightCount ?? 0) >= thresholds.minLights,
    luminanceReadable: terminalCaught || (luminance
      ? luminance.darkRatio <= thresholds.maxDarkRatio && luminance.lightRatio >= thresholds.minLightRatio
      : false),
    actionObserved: terminalCaught || actionObserved,
    nexusResetReplay: nexusResetReplay?.passed === true,
    playingReached:
      debugAfter?.latestFrame?.screen === "PLAYING" ||
      (terminalCaught && debugAfter?.latestFrame?.screen === "COMPLETED"),
    propCount: Number(sceneDressing?.propCount ?? 0) >= thresholds.minProps,
    textureCount: Number(sceneDressing?.textureCount ?? 0) >= thresholds.minTextures,
    wetReflectionViewsHudFree:
      actionProfile !== "wet-reflection" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    wetReflectionViewsReadable:
      actionProfile !== "wet-reflection" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
    floorMaterialDescriptorPublished:
      actionProfile !== "floor-material" ||
      (
        concretePaving?.schema === "horror-corridor.concrete-paving/1" &&
        Number(concretePaving?.concreteAreas?.cellCount ?? 0) > 0 &&
        Number(concretePaving?.slabMembership?.estimatedCount ?? 0) > 0 &&
        Number(concretePaving?.slab?.cracks?.density ?? 0) > 0 &&
        Number(concretePaving?.aggregateExposure ?? 0) > 0
      ),
    floorMaterialNexusPublished:
      actionProfile !== "floor-material" ||
      (
        Number(concreteState?.["concrete areas"]?.cellCount ?? 0) > 0 &&
        Number(concreteState?.["aggregate exposure"] ?? 0) > 0 &&
        Number(concreteSlabsState?.["slab membership"]?.estimatedCount ?? 0) > 0 &&
        concreteSlabsState?.["slab alignment"]?.mode === "settled-pour-field" &&
        concreteSlabState?.cracks?.network === "settlement-branching" &&
        Number(concreteSlabState?.wetness ?? 0) > 0
      ),
    floorMaterialViewsHudFree:
      actionProfile !== "floor-material" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    floorMaterialViewsReadable:
      actionProfile !== "floor-material" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
    ceilingOverlapViewsHudFree:
      actionProfile !== "ceiling-overlap" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    ceilingOverlapViewsReadable:
      actionProfile !== "ceiling-overlap" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
    ceilingFractureDescriptorPublished:
      actionProfile !== "ceiling-fracture" ||
      (
        ceilingCollapse?.schema === "horror-corridor.ceiling-collapse/1" &&
        Number(referenceRoom?.collapsedCeilingPartCount ?? 0) >= 26 &&
        Number(referenceRoom?.collapsedCeilingFractureCount ?? 0) >= 8 &&
        Number(referenceRoom?.collapsedCeilingEdgeFragmentCount ?? 0) >= 10 &&
        Number(referenceRoom?.collapseRubbleClusterCount ?? 0) >= 3
      ),
    ceilingFractureNexusPublished:
      actionProfile !== "ceiling-fracture" ||
      (
        ceilingState?.stability === "localized-collapse" &&
        Number(ceilingOpeningsState?.["opening bounds"]?.length ?? 0) > 0 &&
        Number(ceilingOpeningsState?.["sky exposure"] ?? 0) > 0 &&
        ceilingOpeningsState?.["falling debris"] === "settled" &&
        crackingState?.["crack paths"]?.mode === "aperture-radial" &&
        Number(crackingState?.["crack paths"]?.count ?? 0) >= 8 &&
        crackingState?.["active movement"] === false &&
        Number(rubbleState?.["rubble areas"]?.clusterCount ?? 0) >= 3 &&
        rubbleState?.passability?.mode === "route-clear" &&
        Number(
          fallenMasonryState?.["fallen masonry"]?.estimatedPieceCount ?? 0,
        ) > 0 &&
        fallenMasonryState?.settlement?.mode === "edge-settled"
      ),
    ceilingFractureViewsHudFree:
      actionProfile !== "ceiling-fracture" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    ceilingFractureViewsReadable:
      actionProfile !== "ceiling-fracture" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
    ceilingMaterialDescriptorPublished:
      actionProfile !== "ceiling-material" ||
      (
        ceilingCollapse?.schema === "horror-corridor.ceiling-collapse/1" &&
        ceilingCollapse?.ceiling?.surface?.body?.construction ===
          "reinforced-concrete-and-brick" &&
        ceilingCollapse?.ceiling?.surface?.condition?.profile ===
          "damp-spalled-masonry" &&
        Number(ceilingCollapse?.ceiling?.surface?.condition?.dampness ?? 0) >=
          0.4 &&
        Number(
          ceilingCollapse?.ceiling?.surface?.condition?.mineralBloom ?? 0,
        ) >= 0.25 &&
        Number(
          ceilingCollapse?.ceiling?.surface?.pattern?.aggregate?.exposure ?? 0,
        ) >= 0.25 &&
        Number(
          ceilingCollapse?.ceiling?.surface?.response?.surfaceRelief ?? 0,
        ) >= 0.25 &&
        Number(referenceRoom?.ceilingMaterialSurfaceCount ?? 0) >= 3 &&
        Number(referenceRoom?.ceilingMaterialTextureCount ?? 0) >= 2 &&
        Number(referenceRoom?.ceilingMaterialRelief ?? 0) >= 0.25
      ),
    ceilingMaterialNexusPublished:
      actionProfile !== "ceiling-material" ||
      (
        ceilingState?.surface?.body?.construction ===
          "reinforced-concrete-and-brick" &&
        ceilingState?.surface?.body?.primaryMaterial === "damp-concrete" &&
        ceilingState?.surface?.body?.exposedMaterial === "broken-brick" &&
        ceilingState?.surface?.condition?.profile ===
          "damp-spalled-masonry" &&
        Number(ceilingState?.surface?.pattern?.aggregate?.exposure ?? 0) > 0 &&
        Number(ceilingState?.surface?.response?.roughnessRange?.[0] ?? 0) > 0
      ),
    ceilingMaterialViewsHudFree:
      actionProfile !== "ceiling-material" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    ceilingMaterialViewsReadable:
      actionProfile !== "ceiling-material" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
    industrialShelvingCompositionPublished:
      actionProfile !== "industrial-shelving" ||
      (
        Number(referenceRoom?.industrialShelvingObjectCount ?? 0) >= 2 &&
        Number(referenceRoom?.industrialShelvingPartCount ?? 0) >= 80 &&
        Number(referenceRoom?.industrialShelvingStoredPartCount ?? 0) >= 36 &&
        Number(referenceRoom?.industrialShelvingTriangleCount ?? 0) >= 1280
      ),
    industrialShelvingViewsHudFree:
      actionProfile !== "industrial-shelving" ||
      viewChecks.every(
        (check) =>
          !check.hudChrome.error &&
          check.hudChrome.bottomLeftBrightPixels <=
            thresholds.maxHudChromeBrightPixels,
      ),
    industrialShelvingViewsReadable:
      actionProfile !== "industrial-shelving" ||
      viewChecks.every(
        (check) =>
          !check.luminance.error &&
          check.luminance.darkRatio <= thresholds.maxDarkRatio &&
          check.luminance.lightRatio >= thresholds.minLightRatio,
      ),
  };
  return {
    gates,
    expeditionElapsedDelta,
    movementDelta,
    pitchAfter,
    yawDelta,
    passed: Object.values(gates).every(Boolean),
  };
}

function computeLuminanceWithPython(imagePath, centerCropRatio) {
  const python = String.raw`
import json
import sys
from PIL import Image

path = sys.argv[1]
center_crop_ratio = float(sys.argv[2])
image = Image.open(path).convert("RGB")
width, height = image.size
crop_ratio = max(0.1, min(1.0, center_crop_ratio))
crop_width = max(1, int(width * crop_ratio))
crop_height = max(1, int(height * crop_ratio))
crop_left = max(0, (width - crop_width) // 2)
crop_top = max(0, (height - crop_height) // 2)
crop_right = min(width, crop_left + crop_width)
crop_bottom = min(height, crop_top + crop_height)
pixels = image.crop((crop_left, crop_top, crop_right, crop_bottom)).getdata()
count = 0
dark = 0
light = 0
total = 0.0
for r, g, b in pixels:
    lum = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
    count += 1
    total += lum
    if lum < 15:
        dark += 1
    if lum >= 35:
        light += 1
print(json.dumps({
    "average": total / count if count else 0,
    "crop": {
        "left": crop_left,
        "top": crop_top,
        "right": crop_right,
        "bottom": crop_bottom,
        "centerCropRatio": crop_ratio
    },
    "darkRatio": dark / count if count else 1,
    "height": image.height,
    "lightRatio": light / count if count else 0,
    "path": path,
    "width": image.width
}))
`;
  const result = spawnSync("python3", ["-", imagePath, String(centerCropRatio)], {
    encoding: "utf8",
    input: python,
  });
  if (result.status !== 0) {
    return {
      error: result.stderr.trim() || result.stdout.trim() || "python luminance probe failed",
      path: imagePath,
    };
  }
  return JSON.parse(result.stdout);
}

function computeHudChromeWithPython(imagePath) {
  const python = String.raw`
import json
import sys
from PIL import Image

path = sys.argv[1]
image = Image.open(path).convert("RGB")
width, height = image.size
left = 0
top = int(height * 0.86)
right = min(int(width * 0.08), 112)
bottom = height
bright_pixels = 0
sampled_pixels = 0

for y in range(top, bottom):
    for x in range(left, right):
        r, g, b = image.getpixel((x, y))
        luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if luma > 112 and max(r, g, b) - min(r, g, b) < 85:
            bright_pixels += 1
        sampled_pixels += 1

print(json.dumps({
    "bottomLeftBrightPixels": bright_pixels,
    "sampledPixels": sampled_pixels,
    "region": {"left": left, "top": top, "right": right, "bottom": bottom}
}))
`;
  const result = spawnSync("python3", ["-c", python, imagePath], { encoding: "utf8" });
  if (result.status !== 0) {
    return {
      bottomLeftBrightPixels: Infinity,
      error: result.stderr.trim() || result.stdout.trim() || "python hud chrome probe failed",
    };
  }
  return JSON.parse(result.stdout);
}

async function runBrowserHarness(options, report) {
  let server = null;
  let browser = null;
  let isCdpAttach = false;
  try {
    if (options.startServer) {
      server = startDevServer();
      report.server = { started: true };
    }

    await waitForHttp(options.url);
    await launchCdpChromeIfRequested(options, report);
    const { module: playwright, source } = await loadPlaywright();
    report.playwrightSource = source;
    report.cdpProbe = {
      defaultUrls: DEFAULT_CDP_URLS,
      reachableUrls: await findReachableCdpUrls(options),
      requestedUrl: options.cdpUrl || null,
    };
    const launch = await launchBrowser(playwright, options);
    browser = launch.browser;
    report.launchMode = launch.launchMode;

    isCdpAttach = launch.launchMode.startsWith("cdp:");
    const context = isCdpAttach
      ? (browser.contexts()[0] ?? (await browser.newContext()))
      : await browser.newContext({
          viewport: { height: 900, width: 1400 },
        });
    let page = null;
    if (options.reuseSessionPage && options.sessionId) {
      for (const candidate of context.pages()) {
        if (!candidate.url().startsWith("http://localhost:3000")) continue;
        const sessionId = await candidate
          .evaluate(() => window.__HORROR_CORRIDOR_LIVE_SESSION_ID__ ?? null)
          .catch(() => null);
        if (sessionId === options.sessionId) {
          page = candidate;
          break;
        }
      }
    }
    const reusedSessionPage = Boolean(page);
    page ??= await context.newPage();
    await page.setViewportSize({ height: 900, width: 1400 }).catch(() => undefined);
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    if (!reusedSessionPage) {
      await page.goto(options.url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => undefined);
      if (options.sessionId) {
        await page.evaluate((sessionId) => {
          window.__HORROR_CORRIDOR_LIVE_SESSION_ID__ = sessionId;
        }, options.sessionId);
      }
      report.playMode = await enterPlayableRun(page);
    } else {
      await page.bringToFront().catch(() => undefined);
      report.playMode = "reused-live-session";
    }
    report.reusedSessionPage = reusedSessionPage;

    await page.waitForFunction(() => Boolean(window.__HORROR_CORRIDOR_DEBUG__?.extractState), null, {
      timeout: 15000,
    });
    await page.evaluate(() => {
      window.__HORROR_CORRIDOR_DEBUG__?.enable?.();
      window.__HORROR_CORRIDOR_DEBUG__?.hideOverlay?.();
      // A persistent live-agent page can be held while its UI is paused. Resume
      // it before requiring a PLAYING frame so sequential calls can reuse the
      // same browser/game session instead of timing out on the prior call's UI.
      window.__HORROR_CORRIDOR_LIVE_CONTROL__?.resume?.();
    });
    await waitForLatestFrame(
      page,
      "(frame) => frame.screen === 'PLAYING' || frame.screen === 'COMPLETED'",
      15000,
    );
    await ensurePlayUiHidden(page);
    await page.waitForTimeout(300);

    const debugBefore = await extractState(page);
    const nexusBefore = options.fastLive ? null : await extractNexusEvidence(page);
    const screenshotPath = join(options.artifactDir, "starting-scene.png");
    await page.screenshot({ fullPage: false, path: screenshotPath });

    const phaseBefore = debugBefore?.latestFrame?.expedition?.phase ?? null;
    let actionProof = null;
    if (phaseBefore !== "caught") {
      await page.evaluate(() => window.__HORROR_CORRIDOR_LIVE_CONTROL__?.resume?.());
      try {
        actionProof = await performActionProfile(
          page,
          options.actionProfile,
          options.actionDurationMs,
          options.artifactDir,
        );
      } finally {
        await page.evaluate(() => window.__HORROR_CORRIDOR_LIVE_CONTROL__?.hold?.()).catch(() => undefined);
      }
    }
    await page.waitForTimeout(250);
    const phaseAfterAction = await page
      .evaluate(() => window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame?.expedition?.phase ?? null)
      .catch(() => null);
    if (phaseAfterAction === "jumpscare") {
      await page
        .waitForFunction(
          () =>
            window.__HORROR_CORRIDOR_DEBUG__?.extractState?.()?.latestFrame?.expedition?.phase === "caught",
          null,
          { timeout: 2_500 },
        )
        .catch(() => undefined);
    }
    const debugAfter = await extractState(page);
    const nexusAfter = options.fastLive ? null : await extractNexusEvidence(page);
    const nexusResetReplay = options.fastLive
      ? { passed: true, skipped: "fast-live preserves the current session instead of constructing proof runtimes" }
      : await extractNexusResetReplayProof(page);
    const movementScreenshotPath = join(options.artifactDir, "movement-scene.png");
    await page.screenshot({ fullPage: false, path: movementScreenshotPath });
    const luminance = computeLuminanceWithPython(screenshotPath, options.thresholds.centerCropRatio);
    const hudChrome = computeHudChromeWithPython(screenshotPath);
    const viewPaths = [
      screenshotPath,
      ...(actionProof?.artifacts ?? []),
      movementScreenshotPath,
    ];
    const viewChecks = viewPaths.map((path) => ({
      path,
      hudChrome: computeHudChromeWithPython(path),
      luminance: computeLuminanceWithPython(
        path,
        options.thresholds.centerCropRatio,
      ),
    }));

    const canvas = await page.evaluate(() => {
      const largest = [...document.querySelectorAll("canvas")]
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return { height: rect.height, width: rect.width };
        })
        .sort((a, b) => b.width * b.height - a.width * a.height)[0];
      return largest ?? null;
    });
    const visibleText = summarizeVisibleText(await collectVisibleText(page).catch(() => ""));
    const validation = evaluateGates({
      actionProof,
      actionProfile: options.actionProfile,
      canvas,
      debugAfter,
      debugBefore,
      hudChrome: hudChrome.error ? null : hudChrome,
      luminance: luminance.error ? null : luminance,
      nexusAfter,
      nexusResetReplay,
      thresholds: options.thresholds,
      viewChecks,
      visibleText,
    });

    report.artifacts.push(...viewPaths);
    report.canvas = canvas;
    report.consoleErrors = consoleErrors;
    report.debugAfter = summarizeDebugState(debugAfter);
    report.debugBefore = summarizeDebugState(debugBefore);
    report.hudChrome = hudChrome;
    report.luminance = luminance;
    report.viewChecks = viewChecks;
    report.nexusRuntime = {
      after: nexusAfter,
      before: nexusBefore,
      resetReplay: nexusResetReplay,
    };
    report.action = {
      durationMs: options.actionDurationMs,
      profile: options.actionProfile,
      proof: actionProof,
    };
    report.expedition = debugAfter?.latestFrame?.expedition ?? null;
    report.liveControlHeld = await page
      .evaluate(() => window.__HORROR_CORRIDOR_LIVE_CONTROL__?.isHeld?.() ?? null)
      .catch(() => null);
    report.status = validation.passed && consoleErrors.length === 0 ? "passed" : "failed";
    report.validation = validation;
    report.visibleText = visibleText;
  } catch (error) {
    report.status = "blocked";
    report.blocker = {
      details: error.details ?? null,
      launchErrors: error.launchErrors ?? null,
      message: error.message,
      stack: error.stack,
    };
  } finally {
    if (browser && !(isCdpAttach && options.keepPageOpen)) {
      await browser.close().catch(() => undefined);
    }
    if (server) {
      await server.close();
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  ensureCleanDir(options.artifactDir);
  const report = {
    artifacts: [],
    createdAt: nowIso(),
    harness: "horror-corridor-live-player-harness",
    nexusSimulator: {
      commandVocabulary: [
        "openPage",
        "click",
        "holdKey",
        "assertCanvasExists",
        "captureScreenshot",
        "assertGlobalState",
      ],
      root: NEXUS_SIMULATOR_ROOT,
      source: "local script aligned to NexusSimulator playwright-simtime semantics",
    },
    options,
    repoRoot: REPO_ROOT,
    status: "pending",
  };

  if (options.dryRun || options.skipBrowser) {
    report.status = "dry-run";
    report.proposedGates = {
      canvasMounted: "largest canvas has non-zero size",
      hiddenPlayUi: "body text is empty after entering PLAYING and hiding debug overlay",
      noHudIconChrome: `bottom-left bright icon pixels <= ${options.thresholds.maxHudChromeBrightPixels}`,
      luminanceReadable: `darkRatio <= ${options.thresholds.maxDarkRatio}, lightRatio >= ${options.thresholds.minLightRatio}`,
      actionObserved: `the selected movement, turn, listen, beam hold, or offering action changes its authoritative state`,
      nexusResetReplay: "all mounted mutable domains reset and fixed-step replay matches after reset and on a fresh runtime",
      sceneDressing: `props >= ${options.thresholds.minProps}, textures >= ${options.thresholds.minTextures}, lights >= ${options.thresholds.minLights}`,
    };
  } else {
    await runBrowserHarness(options, report);
  }

  if (Array.isArray(report.consoleErrors)) {
    report.consoleErrors = report.consoleErrors.filter(
      (message) =>
        !(
          options.startServer &&
          message.includes("/_next/webpack-hmr") &&
          message.includes("ERR_CONNECTION_REFUSED")
        ),
    );
    if (report.status === "passed" && report.consoleErrors.length > 0) {
      report.status = "failed";
    }
  }

  const reportPath = join(options.artifactDir, "report.json");
  writeJson(reportPath, report);
  report.artifacts.push(reportPath);
  writeJson(reportPath, report);

  console.log(JSON.stringify({ reportPath, status: report.status }, null, 2));
  if (report.status === "failed" || report.status === "blocked") {
    process.exitCode = 1;
  }
  if (options.keepPageOpen && report.launchMode?.startsWith("cdp:")) {
    process.exit(process.exitCode ?? 0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

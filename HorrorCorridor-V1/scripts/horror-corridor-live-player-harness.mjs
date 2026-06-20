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
  "--disable-gpu",
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
    headed: false,
    launchCdpChrome: false,
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
    } else if (arg === "--headed") {
      args.headed = true;
    } else if (arg === "--launch-cdp-chrome") {
      args.launchCdpChrome = true;
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

async function waitForLatestFrame(page, predicateSource, timeoutMs = 15000) {
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
  const visibleText = summarizeVisibleText(await collectVisibleText(page).catch(() => ""));
  if (!/settings|control map/i.test(visibleText.sample)) {
    return;
  }

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
};

async function performActionProfile(page, actionProfile, actionDurationMs) {
  const keys = ACTION_PROFILES[actionProfile];
  if (!keys) {
    throw new Error(`Unknown action profile: ${actionProfile}`);
  }

  for (const key of keys) {
    await page.keyboard.down(key);
  }

  await page.waitForTimeout(actionDurationMs);

  for (const key of [...keys].reverse()) {
    await page.keyboard.up(key);
  }
}

function evaluateGates({ canvas, debugAfter, debugBefore, hudChrome, luminance, thresholds, visibleText }) {
  const movementDelta = distance2d(positionOf(debugBefore), positionOf(debugAfter));
  const sceneDressing = sceneDressingOf(debugAfter);
  const gates = {
    canvasMounted: Boolean(canvas?.width && canvas?.height),
    hiddenPlayUi: visibleText.length === 0,
    noHudIconChrome: hudChrome
      ? hudChrome.bottomLeftBrightPixels <= thresholds.maxHudChromeBrightPixels
      : false,
    lightCount: Number(sceneDressing?.lightCount ?? 0) >= thresholds.minLights,
    luminanceReadable: luminance
      ? luminance.darkRatio <= thresholds.maxDarkRatio && luminance.lightRatio >= thresholds.minLightRatio
      : false,
    movementChanged: movementDelta >= thresholds.minMovementDelta,
    playingReached: debugAfter?.latestFrame?.screen === "PLAYING",
    propCount: Number(sceneDressing?.propCount ?? 0) >= thresholds.minProps,
    textureCount: Number(sceneDressing?.textureCount ?? 0) >= thresholds.minTextures,
  };
  return {
    gates,
    movementDelta,
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

    const isCdpAttach = launch.launchMode.startsWith("cdp:");
    const context = isCdpAttach
      ? (browser.contexts()[0] ?? (await browser.newContext()))
      : await browser.newContext({
          viewport: { height: 900, width: 1400 },
        });
    const page = await context.newPage();
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

    await page.goto(options.url, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => undefined);

    report.playMode = await enterPlayableRun(page);

    await page.waitForFunction(() => Boolean(window.__HORROR_CORRIDOR_DEBUG__?.extractState), null, {
      timeout: 15000,
    });
    await page.evaluate(() => {
      window.__HORROR_CORRIDOR_DEBUG__?.enable?.();
      window.__HORROR_CORRIDOR_DEBUG__?.hideOverlay?.();
    });
    await waitForLatestFrame(page, "(frame) => frame.screen === 'PLAYING'", 15000);
    await ensurePlayUiHidden(page);
    await page.waitForTimeout(300);

    const debugBefore = await extractState(page);
    const screenshotPath = join(options.artifactDir, "starting-scene.png");
    await page.screenshot({ fullPage: false, path: screenshotPath });

    await performActionProfile(page, options.actionProfile, options.actionDurationMs);
    await page.waitForTimeout(250);
    const debugAfter = await extractState(page);
    const movementScreenshotPath = join(options.artifactDir, "movement-scene.png");
    await page.screenshot({ fullPage: false, path: movementScreenshotPath });
    const luminance = computeLuminanceWithPython(screenshotPath, options.thresholds.centerCropRatio);
    const hudChrome = computeHudChromeWithPython(screenshotPath);

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
      canvas,
      debugAfter,
      debugBefore,
      hudChrome: hudChrome.error ? null : hudChrome,
      luminance: luminance.error ? null : luminance,
      thresholds: options.thresholds,
      visibleText,
    });

    report.artifacts.push(screenshotPath, movementScreenshotPath);
    report.canvas = canvas;
    report.consoleErrors = consoleErrors;
    report.debugAfter = summarizeDebugState(debugAfter);
    report.debugBefore = summarizeDebugState(debugBefore);
    report.hudChrome = hudChrome;
    report.luminance = luminance;
    report.action = {
      durationMs: options.actionDurationMs,
      profile: options.actionProfile,
    };
    report.status = validation.passed && consoleErrors.length === 0 ? "passed" : "failed";
    report.validation = validation;
    report.visibleText = visibleText;
  } catch (error) {
    report.status = "blocked";
    report.blocker = {
      launchErrors: error.launchErrors ?? null,
      message: error.message,
      stack: error.stack,
    };
  } finally {
    if (browser) {
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
      movementChanged: `W key changes local pose by >= ${options.thresholds.minMovementDelta}`,
      sceneDressing: `props >= ${options.thresholds.minProps}, textures >= ${options.thresholds.minTextures}, lights >= ${options.thresholds.minLights}`,
    };
  } else {
    await runBrowserHarness(options, report);
  }

  const reportPath = join(options.artifactDir, "report.json");
  writeJson(reportPath, report);
  report.artifacts.push(reportPath);
  writeJson(reportPath, report);

  console.log(JSON.stringify({ reportPath, status: report.status }, null, 2));
  if (report.status === "failed" || report.status === "blocked") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

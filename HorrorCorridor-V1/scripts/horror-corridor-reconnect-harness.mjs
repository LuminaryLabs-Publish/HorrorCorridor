#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import {
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NEXUS_SIMULATOR_ROOT =
  process.env.NEXUS_SIMULATOR_ROOT ??
  "/Users/crimsonwheeler/Documents/GitHub/NexusSimulator/NexusSimulator-V1";
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = Number(process.env.HORROR_CORRIDOR_RECONNECT_PORT ?? 3011);
const URL = `http://127.0.0.1:${PORT}/?debug=frames&liveAgent=1`;
const ARTIFACT_DIR = join(
  REPO_ROOT,
  "docs/live-player-harness/reconnect-recovery-proof",
);
const REPORT_PATH = join(ARTIFACT_DIR, "report.json");
const SCREENSHOTS = Object.freeze({
  sharedStart: join(ARTIFACT_DIR, "shared-expedition-start.png"),
  disconnected: join(ARTIFACT_DIR, "client-disconnected.png"),
  hostDuringDisconnect: join(ARTIFACT_DIR, "host-during-disconnect.png"),
  recovering: join(ARTIFACT_DIR, "client-recovering.png"),
  restored: join(ARTIFACT_DIR, "client-restored.png"),
});

const wait = (durationMs) =>
  new Promise((resolveWait) => setTimeout(resolveWait, durationMs));

const writeJson = (path, value) =>
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const ensureArtifactDir = () => {
  if (existsSync(ARTIFACT_DIR)) {
    rmSync(ARTIFACT_DIR, { recursive: true, force: true });
  }
  mkdirSync(ARTIFACT_DIR, { recursive: true });
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const distance2d = (left, right) =>
  Math.hypot(
    Number(left?.x ?? 0) - Number(right?.x ?? 0),
    Number(left?.z ?? 0) - Number(right?.z ?? 0),
  );

const playerPosition = (snapshot, playerId) =>
  snapshot?.players?.find((player) => player.id === playerId)?.position ?? null;

async function loadPlaywright() {
  try {
    return { module: await import("playwright"), source: "repo" };
  } catch (repoError) {
    if (!existsSync(join(NEXUS_SIMULATOR_ROOT, "package.json"))) {
      throw repoError;
    }

    const nexusRequire = createRequire(join(NEXUS_SIMULATOR_ROOT, "package.json"));
    return {
      module: nexusRequire("playwright"),
      source: "nexus-simulator",
    };
  }
}

async function waitForHttp(url, timeoutMs = 30_000) {
  const startedAtMs = Date.now();

  while (Date.now() - startedAtMs < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch {
      // The dev server is still starting.
    }
    await wait(250);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function startServer() {
  const output = [];
  const child = spawn(
    "npm",
    ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(PORT)],
    {
      cwd: REPO_ROOT,
      detached: true,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const record = (chunk) => {
    output.push(chunk.toString());
    if (output.length > 80) output.shift();
  };
  child.stdout.on("data", record);
  child.stderr.on("data", record);

  return {
    child,
    output,
    close: async () => {
      if (!child.pid || child.exitCode !== null) return;
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        child.kill("SIGTERM");
      }
      await Promise.race([
        new Promise((resolveClose) => child.once("close", resolveClose)),
        wait(1_500),
      ]);
    },
  };
}

function observePage(page, name, errors) {
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push({ page: name, kind: "console", message: message.text() });
    }
  });
  page.on("pageerror", (error) => {
    errors.push({ page: name, kind: "pageerror", message: error.message });
  });
}

const sessionSnapshot = (page) =>
  page.evaluate(() =>
    window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.() ?? null,
  );

const nexusRecoverySnapshot = (page) =>
  page.evaluate(() => {
    const snapshot = window.__HORROR_CORRIDOR_NEXUS__?.snapshot?.();
    if (!snapshot) return null;

    const domainState = (path) =>
      snapshot.domains.find((domain) => domain.path === path)?.state ?? null;

    return {
      installCount: snapshot.installOrder.length,
      registeredDomainPathCount: snapshot.registeredDomainPaths.length,
      rejoining: domainState(
        "n:horror-corridor:shared-expedition:rejoining",
      ),
      sharedChronicle: domainState(
        "n:horror-corridor:shared-expedition:shared-chronicle",
      ),
    };
  });

async function waitForSessionScreen(page, screen, timeout = 20_000) {
  await page.waitForFunction(
    (expectedScreen) =>
      window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.().screen ===
      expectedScreen,
    screen,
    { timeout },
  );
}

async function run() {
  ensureArtifactDir();
  const startedAtMs = Date.now();
  const timeline = [];
  const consoleErrors = [];
  const report = {
    schema: "horror-corridor.reconnect-recovery-proof/1",
    harness: "horror-corridor-reconnect-harness",
    status: "running",
    createdAt: new Date(startedAtMs).toISOString(),
    repoRoot: REPO_ROOT,
    url: URL,
    headed: process.env.HORROR_CORRIDOR_RECONNECT_HEADLESS !== "1",
    timeline,
    consoleErrors,
    artifacts: [...Object.values(SCREENSHOTS), REPORT_PATH],
  };
  const mark = (event, detail = {}) => {
    const atMs = Date.now();
    const previousAtMs = timeline.at(-1)?.atMs ?? startedAtMs;
    timeline.push({
      event,
      atMs,
      elapsedMs: atMs - startedAtMs,
      sincePreviousMs: atMs - previousAtMs,
      ...detail,
    });
  };

  const server = startServer();
  let browser = null;

  try {
    await waitForHttp(URL);
    mark("server-ready");

    const playwright = await loadPlaywright();
    report.playwrightSource = playwright.source;
    browser = await playwright.module.chromium.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-breakpad",
        "--disable-crash-reporter",
        "--disable-features=Crashpad",
      ],
      executablePath: existsSync(CHROME_PATH) ? CHROME_PATH : undefined,
      headless: process.env.HORROR_CORRIDOR_RECONNECT_HEADLESS === "1",
    });
    const context = await browser.newContext({
      viewport: { width: 1400, height: 900 },
    });
    const hostPage = await context.newPage();
    const clientPage = await context.newPage();
    observePage(hostPage, "host", consoleErrors);
    observePage(clientPage, "client", consoleErrors);

    await Promise.all([
      hostPage.goto(URL, { waitUntil: "domcontentloaded" }),
      clientPage.goto(URL, { waitUntil: "domcontentloaded" }),
    ]);
    await Promise.all([
      hostPage.waitForFunction(() =>
        Boolean(window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot),
      ),
      clientPage.waitForFunction(() =>
        Boolean(window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot),
      ),
    ]);
    mark("pages-opened");

    await hostPage.getByRole("button", { name: /create a room/i }).click();
    await hostPage.getByRole("heading", { name: /host lobby/i }).waitFor();
    const roomLabels = await hostPage.getByText(/^Room:/i).allTextContents();
    const roomCode = roomLabels
      .map((label) => label.match(/Room:\s*([A-Z0-9-]+)/i)?.[1] ?? null)
      .find(Boolean);
    assert(roomCode, "The host did not expose a room code.");
    mark("host-room-created", { roomCode });

    await clientPage.getByRole("button", { name: /join a room/i }).click();
    await clientPage.getByLabel(/join code/i).fill(roomCode);
    await clientPage.getByLabel(/display name/i).fill("Recovery Scout");
    await clientPage.getByRole("button", { name: /join lobby/i }).click();
    await clientPage.getByRole("heading", { name: /client lobby/i }).waitFor();
    await hostPage.getByText(/Players:\s*2/i).waitFor({ timeout: 10_000 });
    mark("client-joined-host-lobby");

    await hostPage.getByRole("button", { name: /start run/i }).click();
    await Promise.all([
      waitForSessionScreen(hostPage, "PLAYING"),
      waitForSessionScreen(clientPage, "PLAYING"),
    ]);
    await Promise.all([
      hostPage.locator("canvas").first().waitFor({ state: "visible" }),
      clientPage.locator("canvas").first().waitFor({ state: "visible" }),
      hostPage.waitForFunction(() => Boolean(window.__HORROR_CORRIDOR_NEXUS__)),
      clientPage.waitForFunction(() => Boolean(window.__HORROR_CORRIDOR_NEXUS__)),
    ]);
    await Promise.all([
      hostPage.evaluate(() => {
        window.__HORROR_CORRIDOR_DEBUG__?.enable?.();
        window.__HORROR_CORRIDOR_DEBUG__?.hideOverlay?.();
        window.__HORROR_CORRIDOR_LIVE_CONTROL__?.resume?.();
      }),
      clientPage.evaluate(() => {
        window.__HORROR_CORRIDOR_DEBUG__?.enable?.();
        window.__HORROR_CORRIDOR_DEBUG__?.hideOverlay?.();
        window.__HORROR_CORRIDOR_LIVE_CONTROL__?.resume?.();
      }),
    ]);
    await wait(650);
    mark("shared-expedition-playing");
    await hostPage.screenshot({ path: SCREENSHOTS.sharedStart });

    const beforeMoveHost = await sessionSnapshot(hostPage);
    const beforeMoveClient = await sessionSnapshot(clientPage);
    assert(beforeMoveHost && beforeMoveClient, "Session controls were not mounted.");
    const clientPlayerId = beforeMoveClient.playerId;
    assert(clientPlayerId, "The client player identity is missing.");
    const initialClientPosition = playerPosition(beforeMoveHost, clientPlayerId);
    assert(initialClientPosition, "The host does not own the client player.");

    await clientPage.bringToFront();
    await clientPage.keyboard.down("w");
    await wait(900);
    await clientPage.keyboard.up("w");
    await hostPage.waitForFunction(
      ({ playerId, initial }) => {
        const snapshot =
          window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.();
        const position = snapshot?.players.find((player) => player.id === playerId)
          ?.position;
        return Boolean(
          position && Math.hypot(position.x - initial.x, position.z - initial.z) > 0.25,
        );
      },
      { playerId: clientPlayerId, initial: initialClientPosition },
      { timeout: 10_000 },
    );
    await wait(300);
    const preDisconnectHost = await sessionSnapshot(hostPage);
    const preDisconnectClient = await sessionSnapshot(clientPage);
    const preDisconnectPosition = playerPosition(preDisconnectHost, clientPlayerId);
    mark("client-movement-observed-by-host", {
      movementMeters: distance2d(initialClientPosition, preDisconnectPosition),
      authoritativeTick: preDisconnectHost.tick,
    });

    const disconnected = await clientPage.evaluate(() =>
      window.__HORROR_CORRIDOR_SESSION_CONTROL__?.disconnectClient?.() ?? false,
    );
    assert(disconnected, "The client transport did not accept disconnection.");
    await waitForSessionScreen(clientPage, "RECOVERING");
    await clientPage
      .getByRole("heading", { name: /connection lost/i })
      .waitFor({ state: "visible" });
    mark("client-disconnected");
    await clientPage.screenshot({ path: SCREENSHOTS.disconnected });
    await hostPage.screenshot({ path: SCREENSHOTS.hostDuringDisconnect });

    await hostPage.waitForFunction(
      (previousTick) =>
        Number(
          window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.().tick ?? 0,
        ) > Number(previousTick ?? 0) + 1,
      preDisconnectHost.tick,
      { timeout: 10_000 },
    );
    const hostDuringDisconnect = await sessionSnapshot(hostPage);
    mark("host-continued-authoritative-simulation", {
      authoritativeTick: hostDuringDisconnect.tick,
    });

    const rejoinButton = clientPage.getByRole("button", {
      name: /rejoin expedition/i,
    });
    await rejoinButton.click();
    await clientPage
      .getByRole("heading", { name: /recovering your place/i })
      .waitFor({ state: "visible", timeout: 5_000 });
    mark("recovery-request-visible");
    await clientPage.screenshot({ path: SCREENSHOTS.recovering });

    await waitForSessionScreen(clientPage, "PLAYING", 15_000);
    await clientPage.waitForFunction(
      () =>
        window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.().recovery
          .connection === "restored",
      null,
      { timeout: 10_000 },
    );
    await wait(450);
    const restoredClient = await sessionSnapshot(clientPage);
    const restoredHost = await sessionSnapshot(hostPage);
    const nexusRecovery = await nexusRecoverySnapshot(clientPage);
    mark("client-restored", {
      authoritativeTick: restoredClient.recovery.restoredPlace?.authoritativeTick,
    });
    await clientPage.screenshot({ path: SCREENSHOTS.restored });

    const beforePostRecoveryMove = playerPosition(restoredHost, clientPlayerId);
    await clientPage.bringToFront();
    await clientPage.keyboard.down("w");
    await wait(800);
    await clientPage.keyboard.up("w");
    await hostPage.waitForFunction(
      ({ playerId, initial }) => {
        const snapshot =
          window.__HORROR_CORRIDOR_SESSION_CONTROL__?.snapshot?.();
        const position = snapshot?.players.find((player) => player.id === playerId)
          ?.position;
        return Boolean(
          position && Math.hypot(position.x - initial.x, position.z - initial.z) > 0.25,
        );
      },
      { playerId: clientPlayerId, initial: beforePostRecoveryMove },
      { timeout: 10_000 },
    );
    await wait(250);
    const postRecoveryHost = await sessionSnapshot(hostPage);
    const postRecoveryClient = await sessionSnapshot(clientPage);
    const postRecoveryPosition = playerPosition(postRecoveryHost, clientPlayerId);
    mark("post-recovery-movement-observed", {
      movementMeters: distance2d(beforePostRecoveryMove, postRecoveryPosition),
      authoritativeTick: postRecoveryHost.tick,
    });

    const historyKinds = restoredClient.recovery.recoveryHistory.map(
      (entry) => entry.kind,
    );
    const restoredPlace = restoredClient.recovery.restoredPlace;
    const recoveredPlayerPosition = playerPosition(restoredClient, clientPlayerId);
    const hostPositionAtRestore = playerPosition(restoredHost, clientPlayerId);
    const gates = {
      sharedIdentityPreserved:
        preDisconnectClient.roomId === restoredClient.roomId &&
        preDisconnectClient.gameId === restoredClient.gameId &&
        preDisconnectClient.seed === restoredClient.seed,
      hostIdentityAgrees:
        restoredClient.roomId === restoredHost.roomId &&
        restoredClient.gameId === restoredHost.gameId &&
        restoredClient.seed === restoredHost.seed,
      recoveryHistoryComplete:
        historyKinds.includes("disconnected") &&
        historyKinds.includes("reconnecting") &&
        historyKinds.includes("restored"),
      recoveryRequestCorrelated:
        Boolean(restoredClient.recovery.recovery?.requestId) &&
        restoredClient.recovery.recovery?.requestId ===
          restoredClient.recovery.recoveryHistory.find(
            (entry) => entry.kind === "restored",
          )?.requestId,
      authoritativeTickAdvanced:
        Number(restoredPlace?.authoritativeTick ?? 0) >
        Number(preDisconnectClient.tick ?? 0),
      hostStayedAlive:
        Number(hostDuringDisconnect.tick ?? 0) >
        Number(preDisconnectHost.tick ?? 0) + 1,
      restoredPlaceMatchesHost:
        Boolean(recoveredPlayerPosition && hostPositionAtRestore) &&
        distance2d(recoveredPlayerPosition, hostPositionAtRestore) < 0.05,
      lastPlacePreserved:
        Boolean(preDisconnectPosition && restoredPlace?.playerPosition) &&
        distance2d(preDisconnectPosition, restoredPlace.playerPosition) < 0.05,
      nexusRejoiningRestored:
        nexusRecovery?.rejoining?.connection === "restored" &&
        nexusRecovery?.rejoining?.["restored place"]?.roomId ===
          restoredClient.roomId &&
        nexusRecovery?.rejoining?.["restored place"]?.authoritativeTick ===
          restoredPlace?.authoritativeTick,
      nexusChronicleRecorded:
        Array.isArray(nexusRecovery?.sharedChronicle?.["recovery history"]) &&
        nexusRecovery.sharedChronicle["recovery history"].some(
          (entry) => entry.kind === "restored",
        ),
      clientCanMoveAfterRecovery:
        distance2d(beforePostRecoveryMove, postRecoveryPosition) > 0.25,
      clientRemainsPlaying:
        postRecoveryClient.screen === "PLAYING" &&
        postRecoveryClient.connectionStatus === "connected",
      noConsoleErrors: consoleErrors.length === 0,
    };

    report.status = Object.values(gates).every(Boolean) ? "passed" : "failed";
    report.durationMs = Date.now() - startedAtMs;
    report.roomCode = roomCode;
    report.clientPlayerId = clientPlayerId;
    report.gates = gates;
    report.evidence = {
      beforeMoveHost,
      beforeMoveClient,
      preDisconnectHost,
      preDisconnectClient,
      hostDuringDisconnect,
      restoredClient,
      restoredHost,
      postRecoveryHost,
      postRecoveryClient,
      nexusRecovery,
      distances: {
        initialMovementMeters: distance2d(
          initialClientPosition,
          preDisconnectPosition,
        ),
        restoredHostDifferenceMeters: distance2d(
          recoveredPlayerPosition,
          hostPositionAtRestore,
        ),
        restoredLastPlaceDifferenceMeters: distance2d(
          preDisconnectPosition,
          restoredPlace?.playerPosition,
        ),
        postRecoveryMovementMeters: distance2d(
          beforePostRecoveryMove,
          postRecoveryPosition,
        ),
      },
    };
    writeJson(REPORT_PATH, report);

    if (report.status !== "passed") {
      const failedGates = Object.entries(gates)
        .filter(([, passed]) => !passed)
        .map(([name]) => name);
      throw new Error(`Reconnect proof failed gates: ${failedGates.join(", ")}`);
    }

    process.stdout.write(
      `${JSON.stringify(
        {
          status: report.status,
          durationMs: report.durationMs,
          report: REPORT_PATH,
          gates,
        },
        null,
        2,
      )}\n`,
    );
  } catch (error) {
    report.status = "failed";
    report.durationMs = Date.now() - startedAtMs;
    report.error = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null,
    };
    report.serverOutput = server.output.join("").slice(-12_000);
    writeJson(REPORT_PATH, report);
    throw error;
  } finally {
    await browser?.close().catch(() => undefined);
    await server.close();
  }
}

run().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});

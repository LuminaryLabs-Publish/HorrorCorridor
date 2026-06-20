#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_RUNS_ROOT = join(REPO_ROOT, "docs", "live-agent", "runs");
const DEFAULT_CDP_PORT = 9224;
const DEFAULT_INTERVAL_MS = 1500;
const DEFAULT_URL = "http://localhost:3000/?debug=frames";

function nowIso() {
  return new Date().toISOString();
}

function slugTime(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function parseArgs(argv) {
  const args = {
    actionDurationMs: 900,
    cdpPort: DEFAULT_CDP_PORT,
    forever: true,
    intervalMs: DEFAULT_INTERVAL_MS,
    launchCdpChrome: true,
    runDir: "",
    runsRoot: DEFAULT_RUNS_ROOT,
    startServerOnce: false,
    url: DEFAULT_URL,
    maxEpisodes: Number.POSITIVE_INFINITY,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--action-duration-ms" && next) {
      args.actionDurationMs = Number(next);
      index += 1;
    } else if (arg === "--cdp-port" && next) {
      args.cdpPort = Number(next);
      index += 1;
    } else if (arg === "--interval-ms" && next) {
      args.intervalMs = Number(next);
      index += 1;
    } else if (arg === "--max-episodes" && next) {
      args.maxEpisodes = Math.max(1, Number(next));
      args.forever = false;
      index += 1;
    } else if (arg === "--run-dir" && next) {
      args.runDir = resolve(next);
      index += 1;
    } else if (arg === "--runs-root" && next) {
      args.runsRoot = resolve(next);
      index += 1;
    } else if (arg === "--forever") {
      args.forever = true;
      args.maxEpisodes = Number.POSITIVE_INFINITY;
    } else if (arg === "--start-server-once") {
      args.startServerOnce = true;
    } else if (arg === "--url" && next) {
      args.url = next;
      index += 1;
    } else if (arg === "--once") {
      args.maxEpisodes = 1;
      args.forever = false;
    } else if (arg === "--no-launch-cdp-chrome") {
      args.launchCdpChrome = false;
    }
  }

  if (Number.isFinite(args.maxEpisodes)) {
    args.forever = false;
  }

  return args;
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function appendJsonLine(path, value) {
  const line = `${JSON.stringify(value)}\n`;
  writeFileSync(path, line, { flag: "a" });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
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

function chooseActionProfile(previousEpisodes) {
  if (previousEpisodes.length === 0) {
    return "forward";
  }

  const lastEpisode = previousEpisodes[previousEpisodes.length - 1];
  const gates = lastEpisode.report?.validation?.gates ?? {};
  const previousAction = lastEpisode.actionProfile;
  const failedProfiles = previousEpisodes
    .filter((episode) => episode.report?.status === "failed")
    .map((episode) => episode.actionProfile);

  if (gates.movementChanged === false) {
    return previousAction === "backward" ? "forward" : "backward";
  }

  if (gates.luminanceReadable === false) {
    const luminanceSweep = ["forward", "strafe-left", "strafe-right", "forward-left", "forward-right"];
    for (const candidate of luminanceSweep) {
      if (!failedProfiles.includes(candidate)) {
        return candidate;
      }
    }
    return luminanceSweep[previousEpisodes.length % luminanceSweep.length];
  }

  const cycle = ["forward", "strafe-left", "strafe-right", "forward-left", "forward-right", "backward"];
  const nextIndex = (cycle.indexOf(previousAction) + 1) % cycle.length;
  return cycle[nextIndex];
}

function createRunManifest(options, runDir) {
  return {
    harness: "horror-corridor-live-agent",
    startedAt: nowIso(),
    options,
    repoRoot: REPO_ROOT,
    runDir,
    status: "running",
  };
}

function summarizeEpisode(report, actionProfile, episodeIndex, episodeDir, command, status, errorMessage = null) {
  return {
    actionProfile,
    command,
    createdAt: nowIso(),
    episodeDir,
    episodeIndex,
    errorMessage,
    report,
    status,
  };
}

async function runEpisode(options, runDir, episodeIndex, previousEpisodes) {
  const actionProfile = chooseActionProfile(previousEpisodes);
  const episodeLabel = `episode-${String(episodeIndex).padStart(4, "0")}-${actionProfile}`;
  const episodeDir = join(runDir, "episodes", episodeLabel);
  if (existsSync(episodeDir)) {
    rmSync(episodeDir, { recursive: true, force: true });
  }
  ensureDir(episodeDir);

  const command = [
    "node",
    "scripts/horror-corridor-live-player-harness.mjs",
    "--artifact-dir",
    episodeDir,
    "--action-profile",
    actionProfile,
    "--action-duration-ms",
    String(options.actionDurationMs),
    "--cdp-port",
    String(options.cdpPort),
    "--url",
    options.url,
  ];

  if (options.launchCdpChrome) {
    command.push("--launch-cdp-chrome");
  }

  const child = spawnSync(command[0], command.slice(1), {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });

  const reportPath = join(episodeDir, "report.json");
  const report = existsSync(reportPath) ? readJson(reportPath) : null;
  const status = child.status === 0 ? "completed" : "failed";
  const errorMessage =
    child.status === 0
      ? null
      : [child.stderr?.trim(), child.stdout?.trim()].filter(Boolean).join("\n") || "episode process failed";

  return summarizeEpisode(report, actionProfile, episodeIndex, episodeDir, command.join(" "), status, errorMessage);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const runDir = options.runDir || join(options.runsRoot, slugTime());
  ensureDir(join(runDir, "episodes"));
  const manifestPath = join(runDir, "run-manifest.json");
  const logPath = join(runDir, "agent-log.jsonl");
  const latestPath = join(runDir, "latest-summary.json");
  const manifest = createRunManifest(options, runDir);
  writeJson(manifestPath, manifest);

  let interrupted = false;
  const previousEpisodes = [];
  let server = null;

  const markInterrupted = () => {
    interrupted = true;
  };

  process.on("SIGINT", markInterrupted);
  process.on("SIGTERM", markInterrupted);

  try {
    if (options.startServerOnce) {
      server = startDevServer();
    }

    let episodeIndex = 1;
    while (!interrupted && (options.forever || episodeIndex <= options.maxEpisodes)) {
      const episode = await runEpisode(options, runDir, episodeIndex, previousEpisodes);
      previousEpisodes.push(episode);
      appendJsonLine(logPath, episode);
      writeJson(latestPath, episode);
      console.log(JSON.stringify({
        actionProfile: episode.actionProfile,
        episodeDir: episode.episodeDir,
        episodeIndex: episode.episodeIndex,
        status: episode.status,
      }));

      episodeIndex += 1;
      if (interrupted || (!options.forever && episodeIndex > options.maxEpisodes)) {
        break;
      }
      await sleep(options.intervalMs);
    }
  } finally {
    if (server) {
      await server.close();
    }
    manifest.completedAt = nowIso();
    manifest.episodeCount = previousEpisodes.length;
    manifest.status = interrupted ? "interrupted" : "completed";
    writeJson(manifestPath, manifest);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

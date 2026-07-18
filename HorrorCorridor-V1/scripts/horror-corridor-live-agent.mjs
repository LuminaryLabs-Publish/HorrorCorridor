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
const JUDGMENT_SCHEMA_PATH = join(REPO_ROOT, "HorrorCorridor-Harness", "schemas", "live-agent-judgment.schema.json");
const JUDGMENT_PROMPT_PATH = join(REPO_ROOT, "HorrorCorridor-Harness", "prompts", "live-agent-judge.md");
const DEFAULT_CDP_PORT = 9224;
const DEFAULT_INTERVAL_MS = 0;
const DEFAULT_URL = "http://localhost:3000/?debug=frames&liveAgent=1";
const DEFAULT_GOAL = "Play one continuous HorrorCorridor expedition: move through the intro, listen for each stalker, turn toward its directional sign, hold the flashlight beam to repel it, and keep collecting scare records until the game authoritatively reports caught.";
const ACTION_PROFILES = Object.freeze([
  "forward",
  "backward",
  "strafe-left",
  "strafe-right",
  "forward-left",
  "forward-right",
  "listen",
  "turn-left",
  "turn-right",
  "hold-beam",
  "claim-offer",
]);
const JUDGMENT_VALUES = new Set(["confirmed", "partially-confirmed", "inconclusive", "regressed", "blocked"]);
const STATUS_VALUES = new Set(["continue", "stop", "blocked"]);

function nowIso() {
  return new Date().toISOString();
}

function slugTime(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function parseArgs(argv) {
  const args = {
    actionDurationMs: 2_000,
    cdpPort: DEFAULT_CDP_PORT,
    codexPath: "codex",
    episodeTimeoutMs: 120_000,
    forever: true,
    goal: DEFAULT_GOAL,
    historyWindow: 3,
    intervalMs: DEFAULT_INTERVAL_MS,
    judgeTimeoutMs: 1_200_000,
    launchCdpChrome: true,
    maxContextChars: 24_000,
    maxEpisodes: Number.POSITIVE_INFINITY,
    maxJudgeFailures: 1,
    mockJudge: false,
    model: "gpt-5.6-luna",
    reasoning: "low",
    runDir: "",
    runsRoot: DEFAULT_RUNS_ROOT,
    serviceTier: "priority",
    sessionId: "",
    startServerOnce: false,
    url: DEFAULT_URL,
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
    } else if (arg === "--codex-path" && next) {
      args.codexPath = next;
      index += 1;
    } else if (arg === "--episode-timeout-ms" && next) {
      args.episodeTimeoutMs = Number(next);
      index += 1;
    } else if (arg === "--goal" && next) {
      args.goal = next;
      index += 1;
    } else if (arg === "--history-window" && next) {
      args.historyWindow = Number(next);
      index += 1;
    } else if (arg === "--interval-ms" && next) {
      args.intervalMs = Number(next);
      index += 1;
    } else if (arg === "--judge-timeout-ms" && next) {
      args.judgeTimeoutMs = Number(next);
      index += 1;
    } else if (arg === "--max-context-chars" && next) {
      args.maxContextChars = Number(next);
      index += 1;
    } else if (arg === "--max-episodes" && next) {
      args.maxEpisodes = Math.max(1, Number(next));
      args.forever = false;
      index += 1;
    } else if (arg === "--max-judge-failures" && next) {
      args.maxJudgeFailures = Math.max(1, Number(next));
      index += 1;
    } else if (arg === "--model" && next) {
      args.model = next;
      index += 1;
    } else if (arg === "--reasoning" && next) {
      args.reasoning = next;
      index += 1;
    } else if (arg === "--run-dir" && next) {
      args.runDir = resolve(next);
      index += 1;
    } else if (arg === "--runs-root" && next) {
      args.runsRoot = resolve(next);
      index += 1;
    } else if (arg === "--service-tier" && next) {
      args.serviceTier = next;
      index += 1;
    } else if (arg === "--session-id" && next) {
      args.sessionId = next;
      index += 1;
    } else if (arg === "--until-loss") {
      args.forever = true;
      args.maxEpisodes = Number.POSITIVE_INFINITY;
    } else if (arg === "--forever") {
      args.forever = true;
      args.maxEpisodes = Number.POSITIVE_INFINITY;
    } else if (arg === "--mock-judge") {
      args.mockJudge = true;
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
  if (!Number.isInteger(args.historyWindow) || args.historyWindow < 1 || args.historyWindow > 12) {
    throw new Error("--history-window must be an integer from 1 to 12.");
  }
  if (!Number.isFinite(args.maxContextChars) || args.maxContextChars < 4_000) {
    throw new Error("--max-context-chars must be at least 4000.");
  }
  if (!args.goal.trim()) {
    throw new Error("--goal cannot be empty.");
  }

  return args;
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

async function waitForGameServer(url, timeoutMs = 60_000) {
  const startedAt = Date.now();
  let lastError = null;
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
      lastError = new Error(`Game server returned HTTP ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw new Error(
    `Timed out waiting for the persistent game server: ${lastError instanceof Error ? lastError.message : "unknown error"}`,
  );
}

function writeText(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, value, "utf8");
}

function writeJson(path, value) {
  writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

function appendJsonLine(path, value) {
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(value)}\n`, { flag: "a" });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function startDevServer(runDir) {
  const child = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
    cwd: REPO_ROOT,
    env: process.env,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (chunk) => writeFileSync(join(runDir, "server.stdout.log"), chunk, { flag: "a" }));
  child.stderr.on("data", (chunk) => writeFileSync(join(runDir, "server.stderr.log"), chunk, { flag: "a" }));

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

function fallbackAction(previousEpisodes) {
  if (previousEpisodes.length === 0) {
    return "forward";
  }
  const previousAction = previousEpisodes.at(-1)?.actionProfile ?? "forward";
  const nextIndex = (ACTION_PROFILES.indexOf(previousAction) + 1) % ACTION_PROFILES.length;
  return ACTION_PROFILES[nextIndex];
}

function chooseActionProfile(previousEpisodes) {
  const requestedAction = previousEpisodes.at(-1)?.judgment?.nextActionProfile;
  return ACTION_PROFILES.includes(requestedAction) ? requestedAction : fallbackAction(previousEpisodes);
}

function createRunManifest(options, runDir) {
  return {
    controls: {
      historyWindow: options.historyWindow,
      maxActivePredictions: 1,
      maxContextChars: options.maxContextChars,
      maxEpisodes: Number.isFinite(options.maxEpisodes) ? options.maxEpisodes : null,
      maxJudgeFailures: options.maxJudgeFailures,
      predictionConcurrency: 1,
      retryPolicy: "none; stop after bounded consecutive failures",
      shardCount: 1,
      waitBetweenEpisodesMs: options.intervalMs,
    },
    goal: options.goal,
    harness: "horror-corridor-live-agent",
    options,
    provider: {
      binary: options.codexPath,
      mode: options.mockJudge ? "mock" : "live-codex-cli",
      model: options.model,
      reasoning: options.reasoning,
      sandbox: "read-only",
      serviceTier: options.serviceTier,
    },
    repoRoot: REPO_ROOT,
    runDir,
    startedAt: nowIso(),
    status: "running",
  };
}

function summarizeReport(report) {
  const latestFrame = report?.debugAfter?.latestFrame ?? null;
  return {
    artifacts: report?.artifacts?.filter((artifact) => artifact.endsWith(".png")) ?? [],
    consoleErrors: report?.consoleErrors ?? [],
    gates: report?.validation?.gates ?? {},
    hudChrome: report?.hudChrome ?? null,
    luminance: report?.luminance ?? null,
    movementDelta: report?.validation?.movementDelta ?? null,
    playerPosition: latestFrame?.localPose?.position ?? null,
    reportStatus: report?.status ?? "missing-report",
    sceneDressing: latestFrame?.sceneDressing ?? null,
    expedition: latestFrame?.expedition ?? report?.expedition ?? null,
    visibleText: report?.visibleText ?? null,
  };
}

function compactEpisode(episode) {
  return {
    actionProfile: episode.actionProfile,
    callId: episode.callId,
    episodeIndex: episode.episodeIndex,
    judgment: episode.judgment
      ? {
          confidence: episode.judgment.confidence,
          evidence: episode.judgment.evidence,
          judgment: episode.judgment.judgment,
          nextActionProfile: episode.judgment.nextActionProfile,
          nextHypothesis: episode.judgment.nextHypothesis,
          observation: episode.judgment.observation,
          reasoningSummary: episode.judgment.reasoningSummary,
          status: episode.judgment.status,
          trend: episode.judgment.trend,
        }
      : null,
    judgeTiming: episode.judgeTiming ?? null,
    processStatus: episode.status,
    report: summarizeReport(episode.report),
  };
}

function renderPrompt(template, replacements) {
  return Object.entries(replacements).reduce(
    (rendered, [key, value]) => rendered.replaceAll(`{{${key}}}`, value),
    template,
  );
}

function buildJudgmentPrompt(options, currentEpisode, previousEpisodes) {
  const template = readFileSync(JUDGMENT_PROMPT_PATH, "utf8");
  const candidates = previousEpisodes.slice(-options.historyWindow).map(compactEpisode);
  const current = compactEpisode(currentEpisode);

  for (let start = 0; start <= candidates.length; start += 1) {
    const recentHistory = candidates.slice(start);
    const prompt = renderPrompt(template, {
      CURRENT_EPISODE: JSON.stringify(current, null, 2),
      GOAL: options.goal,
      HISTORY_CALL_IDS: JSON.stringify(recentHistory.map((entry) => entry.callId)),
      RECENT_HISTORY: JSON.stringify(recentHistory, null, 2),
    });
    if (prompt.length <= options.maxContextChars) {
      return { historyCallIds: recentHistory.map((entry) => entry.callId), prompt };
    }
  }

  throw new Error(`Current live judgment prompt exceeds maxContextChars=${options.maxContextChars}.`);
}

function validateJudgment(value) {
  if (!value || typeof value !== "object") {
    throw new Error("Live judgment output must be an object.");
  }
  if (!STATUS_VALUES.has(value.status) || !JUDGMENT_VALUES.has(value.judgment)) {
    throw new Error("Live judgment output has an invalid status or judgment.");
  }
  for (const key of ["observation", "trend", "reasoningSummary", "nextHypothesis"]) {
    if (typeof value[key] !== "string" || !value[key].trim()) {
      throw new Error(`Live judgment output needs a non-empty ${key}.`);
    }
  }
  if (!Array.isArray(value.evidence) || !value.evidence.every((item) => typeof item === "string")) {
    throw new Error("Live judgment evidence must be an array of strings.");
  }
  if (!Array.isArray(value.historyCallIds) || !value.historyCallIds.every((item) => typeof item === "string")) {
    throw new Error("Live judgment historyCallIds must be an array of strings.");
  }
  if (!ACTION_PROFILES.includes(value.nextActionProfile)) {
    throw new Error("Live judgment selected an unknown nextActionProfile.");
  }
  if (typeof value.confidence !== "number" || value.confidence < 0 || value.confidence > 1) {
    throw new Error("Live judgment confidence must be from 0 to 1.");
  }
  if (value.stopReason !== null && typeof value.stopReason !== "string") {
    throw new Error("Live judgment stopReason must be a string or null.");
  }
  return value;
}

function mockJudgment(currentEpisode, historyCallIds) {
  const gates = currentEpisode.report?.validation?.gates ?? {};
  const passed = Object.values(gates).length > 0 && Object.values(gates).every(Boolean);
  return validateJudgment({
    confidence: passed ? 0.72 : 0.42,
    evidence: [`reportStatus=${currentEpisode.report?.status ?? "missing"}`, `movementDelta=${currentEpisode.report?.validation?.movementDelta ?? "missing"}`],
    historyCallIds,
    judgment: passed ? "partially-confirmed" : "inconclusive",
    nextActionProfile: fallbackAction([currentEpisode]),
    nextHypothesis: "A different movement profile will test whether the latest result is stable across direction changes.",
    observation: passed ? "The current episode passed its deterministic live-player gates." : "The current episode did not provide a complete passing gate set.",
    reasoningSummary: "This deterministic mock proves history wiring and next-action propagation without claiming semantic visual judgment.",
    status: "continue",
    stopReason: null,
    trend: historyCallIds.length > 0 ? "The chain contains prior calls and can compare the current episode against them." : "This is the first call, so no over-time trend is established yet.",
  });
}

function runJudgment(options, episodeDir, currentEpisode, previousEpisodes) {
  const { historyCallIds, prompt } = buildJudgmentPrompt(options, currentEpisode, previousEpisodes);
  const callDir = join(episodeDir, "judge");
  const finalPath = join(callDir, "judgment.json");
  ensureDir(callDir);
  writeText(join(callDir, "prompt.md"), prompt);

  if (options.mockJudge) {
    const judgment = mockJudgment(currentEpisode, historyCallIds);
    writeJson(finalPath, judgment);
    writeText(join(callDir, "events.jsonl"), "");
    writeText(join(callDir, "stderr.log"), "");
    return { judgment, providerStatus: "mock-completed" };
  }

  const args = [
    "-a", "never",
    "--disable", "multi_agent",
    "exec",
    "--ignore-user-config",
    "--sandbox", "read-only",
    "--ephemeral",
    "--color", "never",
    "-C", REPO_ROOT,
    "--json",
    "--output-schema", JUDGMENT_SCHEMA_PATH,
    "--output-last-message", finalPath,
    "--model", options.model,
    "--config", `model_reasoning_effort=${JSON.stringify(options.reasoning)}`,
    "--config", `service_tier=${JSON.stringify(options.serviceTier)}`,
    "-",
  ];
  writeJson(join(callDir, "command.json"), {
    command: [options.codexPath, ...args].join(" "),
    historyCallIds,
    model: options.model,
    reasoning: options.reasoning,
    sandbox: "read-only",
    serviceTier: options.serviceTier,
  });
  const child = spawnSync(options.codexPath, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    input: prompt,
    maxBuffer: 20 * 1024 * 1024,
    timeout: options.judgeTimeoutMs,
  });
  writeText(join(callDir, "events.jsonl"), child.stdout ?? "");
  writeText(join(callDir, "stderr.log"), child.stderr ?? "");
  if (child.error) {
    throw child.error;
  }
  if (child.status !== 0 || !existsSync(finalPath)) {
    throw new Error(`Live judgment call failed with exit code ${child.status ?? "unknown"}.`);
  }
  const judgment = validateJudgment(readJson(finalPath));
  if (JSON.stringify(judgment.historyCallIds) !== JSON.stringify(historyCallIds)) {
    throw new Error("Live judgment did not acknowledge the exact bounded history window supplied by the harness.");
  }
  return { judgment, providerStatus: "live-completed" };
}

function summarizeEpisode(report, actionProfile, episodeIndex, episodeDir, command, status, errorMessage = null) {
  return {
    actionProfile,
    callId: `call-${String(episodeIndex).padStart(4, "0")}`,
    command,
    createdAt: nowIso(),
    episodeDir,
    episodeIndex,
    errorMessage,
    judgment: null,
    judgmentError: null,
    judgeTiming: null,
    providerStatus: "pending",
    report,
    status,
  };
}

function runEpisode(options, runDir, episodeIndex, previousEpisodes) {
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
    "--session-id",
    options.sessionId,
    "--reuse-session-page",
    "--keep-page-open",
    "--fast-live",
  ];
  if (options.launchCdpChrome) {
    command.push("--launch-cdp-chrome");
  }

  const child = spawnSync(command[0], command.slice(1), {
    cwd: REPO_ROOT,
    encoding: "utf8",
    timeout: options.episodeTimeoutMs,
  });
  const reportPath = join(episodeDir, "report.json");
  const report = existsSync(reportPath) ? readJson(reportPath) : null;
  const status = child.status === 0 ? "completed" : "failed";
  const errorMessage = child.status === 0
    ? null
    : [child.error?.message, child.stderr?.trim(), child.stdout?.trim()].filter(Boolean).join("\n") || "episode process failed";

  return summarizeEpisode(report, actionProfile, episodeIndex, episodeDir, command.join(" "), status, errorMessage);
}

function writeLoopState(path, options, episodes, consecutiveJudgeFailures, stopRequested) {
  const latest = episodes.at(-1) ?? null;
  writeJson(path, {
    callCount: episodes.filter((episode) => episode.judgment).length,
    consecutiveJudgeFailures,
    episodeCount: episodes.length,
    goal: options.goal,
    historyWindow: options.historyWindow,
    latestJudgment: latest?.judgment ?? null,
    nextActionProfile: latest?.judgment?.nextActionProfile ?? null,
    recentCalls: episodes.slice(-options.historyWindow).map(compactEpisode),
    stopRequested,
    updatedAt: nowIso(),
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const runDir = options.runDir || join(options.runsRoot, slugTime());
  options.sessionId ||= `horror-corridor-live-${slugTime()}`;
  ensureDir(join(runDir, "episodes"));
  const manifestPath = join(runDir, "run-manifest.json");
  const logPath = join(runDir, "agent-log.jsonl");
  const latestPath = join(runDir, "latest-summary.json");
  const loopStatePath = join(runDir, "loop-state.json");
  const manifest = createRunManifest(options, runDir);
  writeJson(manifestPath, manifest);

  let interrupted = false;
  let stopReason = null;
  let consecutiveJudgeFailures = 0;
  const previousEpisodes = [];
  let previousJudgeTiming = null;
  let server = null;

  const markInterrupted = () => {
    interrupted = true;
  };
  process.on("SIGINT", markInterrupted);
  process.on("SIGTERM", markInterrupted);

  try {
    if (options.startServerOnce) {
      server = startDevServer(runDir);
      await waitForGameServer(options.url);
    }

    let episodeIndex = 1;
    while (!interrupted && !stopReason && (options.forever || episodeIndex <= options.maxEpisodes)) {
      const episode = runEpisode(options, runDir, episodeIndex, previousEpisodes);
      const judgeStartedAtMs = Date.now();
      episode.judgeTiming = {
        callCompletedAt: null,
        callDurationMs: null,
        callStartedAt: new Date(judgeStartedAtMs).toISOString(),
        startToStartMs: previousJudgeTiming
          ? judgeStartedAtMs - previousJudgeTiming.startedAtMs
          : null,
        timeBetweenCallsMs: previousJudgeTiming
          ? judgeStartedAtMs - previousJudgeTiming.completedAtMs
          : null,
      };
      try {
        const result = runJudgment(options, episode.episodeDir, episode, previousEpisodes);
        episode.judgment = result.judgment;
        episode.providerStatus = result.providerStatus;
        consecutiveJudgeFailures = 0;
      } catch (error) {
        episode.providerStatus = "failed";
        episode.judgmentError = error instanceof Error ? error.message : String(error);
        consecutiveJudgeFailures += 1;
        if (consecutiveJudgeFailures >= options.maxJudgeFailures) {
          stopReason = `judge failure limit reached: ${episode.judgmentError}`;
        }
      }

      const judgeCompletedAtMs = Date.now();
      episode.judgeTiming.callCompletedAt = new Date(judgeCompletedAtMs).toISOString();
      episode.judgeTiming.callDurationMs = judgeCompletedAtMs - judgeStartedAtMs;
      previousJudgeTiming = {
        completedAtMs: judgeCompletedAtMs,
        startedAtMs: judgeStartedAtMs,
      };
      writeJson(join(episode.episodeDir, "judge", "timing.json"), episode.judgeTiming);

      const expeditionPhase =
        episode.report?.debugAfter?.latestFrame?.expedition?.phase ??
        episode.report?.expedition?.phase ??
        null;
      if (expeditionPhase === "caught") {
        const score =
          episode.report?.debugAfter?.latestFrame?.expedition?.encountersSurvived ??
          episode.report?.expedition?.encountersSurvived ??
          0;
        stopReason = `authoritative game loss after ${score} survived encounters`;
      }

      previousEpisodes.push(episode);
      appendJsonLine(logPath, episode);
      writeJson(latestPath, episode);
      writeLoopState(loopStatePath, options, previousEpisodes, consecutiveJudgeFailures, Boolean(stopReason));
      console.log(JSON.stringify({
        actionProfile: episode.actionProfile,
        callId: episode.callId,
        episodeDir: episode.episodeDir,
        episodeIndex: episode.episodeIndex,
        judgment: episode.judgment?.judgment ?? null,
        callDurationMs: episode.judgeTiming.callDurationMs,
        nextActionProfile: episode.judgment?.nextActionProfile ?? null,
        providerStatus: episode.providerStatus,
        expeditionPhase,
        status: episode.status,
        timeBetweenCallsMs: episode.judgeTiming.timeBetweenCallsMs,
      }));

      episodeIndex += 1;
      if (interrupted || stopReason || (!options.forever && episodeIndex > options.maxEpisodes)) {
        break;
      }
      if (options.intervalMs > 0) {
        await sleep(options.intervalMs);
      }
    }
  } finally {
    if (server) {
      await server.close();
    }
    manifest.callCount = previousEpisodes.filter((episode) => episode.judgment).length;
    manifest.completedAt = nowIso();
    manifest.episodeCount = previousEpisodes.length;
    manifest.status = interrupted ? "interrupted" : stopReason ? "stopped" : "completed";
    manifest.stopReason = stopReason;
    writeJson(manifestPath, manifest);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

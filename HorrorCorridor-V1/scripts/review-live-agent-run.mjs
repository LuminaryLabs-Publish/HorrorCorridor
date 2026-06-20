#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_RUNS_ROOT = join(REPO_ROOT, "docs", "live-agent", "runs");

function parseArgs(argv) {
  const args = {
    outputPath: "",
    runDir: "",
    runsRoot: DEFAULT_RUNS_ROOT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--output-path" && next) {
      args.outputPath = resolve(next);
      index += 1;
    } else if (arg === "--run-dir" && next) {
      args.runDir = resolve(next);
      index += 1;
    } else if (arg === "--runs-root" && next) {
      args.runsRoot = resolve(next);
      index += 1;
    }
  }

  return args;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function readJsonLines(path) {
  return readFileSync(path, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function latestRunDir(runsRoot) {
  const entries = readdirSync(runsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(runsRoot, entry.name))
    .sort();
  return entries[entries.length - 1] ?? "";
}

function summarizeGateFailures(episodes) {
  const counts = {};
  for (const episode of episodes) {
    const gates = episode.report?.validation?.gates ?? {};
    for (const [key, passed] of Object.entries(gates)) {
      if (!passed) {
        counts[key] = (counts[key] ?? 0) + 1;
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function outputPathFor(runDir, requestedOutputPath) {
  return requestedOutputPath || join(runDir, "review-notes.md");
}

function buildReview(manifest, episodes, runDir) {
  const failures = summarizeGateFailures(episodes);
  const completed = episodes.filter((episode) => episode.status === "completed");
  const failed = episodes.filter((episode) => episode.status !== "completed");
  const latestEpisode = episodes[episodes.length - 1] ?? null;

  const episodeLines = episodes.map((episode) => {
    const reportStatus = episode.report?.status ?? "missing-report";
    const movementDelta = episode.report?.validation?.movementDelta ?? null;
    const darkRatio = episode.report?.luminance?.darkRatio ?? null;
    const lightRatio = episode.report?.luminance?.lightRatio ?? null;
    return `- episode ${episode.episodeIndex}: action=${episode.actionProfile}, process=${episode.status}, report=${reportStatus}, movementDelta=${movementDelta}, darkRatio=${darkRatio}, lightRatio=${lightRatio}, dir=${episode.episodeDir}`;
  });

  const failureLines =
    failures.length === 0
      ? "- none"
      : failures.map(([gate, count]) => `- ${gate}: ${count}`);

  const screenshotLines = episodes
    .map((episode) => episode.report?.artifacts?.filter((artifact) => artifact.endsWith(".png")) ?? [])
    .flat()
    .map((artifact) => `- ${artifact}`);

  const latestSummary = latestEpisode
    ? `Latest episode used \`${latestEpisode.actionProfile}\` and ended with process status \`${latestEpisode.status}\` and report status \`${latestEpisode.report?.status ?? "missing-report"}\`.`
    : "No episodes were recorded.";

  return `# Live Agent Review

Status: generated

## Run

- runDir: ${runDir}
- harness: ${manifest.harness}
- startedAt: ${manifest.startedAt}
- completedAt: ${manifest.completedAt ?? "still running"}
- episodeCount: ${episodes.length}
- completedEpisodes: ${completed.length}
- nonCompletedEpisodes: ${failed.length}

## Summary

${latestSummary}

## Gate Failures

${failureLines.join("\n")}

## Episodes

${episodeLines.join("\n")}

## Screenshot Artifacts

${screenshotLines.length === 0 ? "- none" : screenshotLines.join("\n")}

## Analyst Notes

- Review these screenshots separately from the live loop.
- Compare repeated gate failures against the actual images before changing durable memory.
- Promote only repeated findings into \`.agent/memory.md\`, \`memory.md\`, or the parity audit.
`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const runDir = options.runDir || latestRunDir(options.runsRoot);
  if (!runDir || !existsSync(runDir)) {
    throw new Error(`No live-agent run directory found. Checked ${options.runsRoot}`);
  }

  const manifest = readJson(join(runDir, "run-manifest.json"));
  const episodes = readJsonLines(join(runDir, "agent-log.jsonl"));
  const review = buildReview(manifest, episodes, runDir);
  const outputPath = outputPathFor(runDir, options.outputPath);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${review}\n`);
  console.log(JSON.stringify({ outputPath, runDir, episodeCount: episodes.length }, null, 2));
}

main();

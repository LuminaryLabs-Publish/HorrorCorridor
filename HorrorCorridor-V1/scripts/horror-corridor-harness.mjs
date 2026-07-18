#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = resolve(REPO_ROOT, "docs");
const SOURCE_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "domain-service-kit-source.json");
const SWARM_CONFIG_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "swarm.config.json");
const SWARM_REQUEST_SCHEMA_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "schemas", "swarm-request.schema.json");
const SWARM_WORKER_SCHEMA_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "schemas", "worker-result.schema.json");
const LIVE_AGENT_JUDGMENT_SCHEMA_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "schemas", "live-agent-judgment.schema.json");
const LIVE_AGENT_PROMPT_PATH = resolve(REPO_ROOT, "HorrorCorridor-Harness", "prompts", "live-agent-judge.md");
const OUTPUT_DOC_PATH = resolve(DOCS_DIR, "HorrorCorridor-Harness-Guide.md");
const OUTPUT_MANIFEST_PATH = resolve(DOCS_DIR, "HorrorCorridor-Harness-Manifest.json");

const CONTROL_FILES = [
  ".agent/start-here.md",
  ".agent/workflow.md",
  ".agent/intention.md",
  ".agent/live-agent.md",
  ".agent/memory.md",
  ".agent/goal.md",
  ".agent/feedback.md",
  "memory.md",
];

function readText(path) {
  return readFileSync(path, "utf8").trim();
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function sectionBulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function summarizeControlFile(relativePath) {
  const absolutePath = resolve(REPO_ROOT, relativePath);
  const content = readText(absolutePath);
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  const headingsToCheck = [
    "## Purpose",
    "## Objective",
    "## Current Focus",
    "## Durable Notes",
    "## Active Feedback",
    "## Posture",
  ];

  for (const heading of headingsToCheck) {
    const headingIndex = lines.findIndex((line) => line === heading);
    if (headingIndex !== -1) {
      for (let index = headingIndex + 1; index < lines.length; index += 1) {
        const line = lines[index];
        if (!line.startsWith("#") && !line.startsWith("Status:")) {
          return line.replace(/^- /, "");
        }
      }
    }
  }

  const fallback = lines.find((line) => !line.startsWith("#") && !line.startsWith("Status:"));
  return fallback ?? relativePath;
}

function buildGuide(source, swarmConfig) {
  const controlFileSummary = CONTROL_FILES.map((relativePath) => {
    const description = summarizeControlFile(relativePath);
    return `- \`${relativePath}\`: ${description}`;
  }).join("\n");

  const definitionList = source.definitions
    .map((entry) => `### ${entry.term}\n\n${entry.body}`)
    .join("\n\n");

  return `# ${source.title}

Status: generated

## Purpose

${source.purpose}

## Current Repo Control Surfaces

${controlFileSummary}

## Core Vocabulary

${definitionList}

## Public Capability Rule

${sectionBulletList(source.publicKitRule)}

## Local Kit Rule

${sectionBulletList(source.localKitRule)}

## Promotion Path

${source.promotionPath.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Conversation-Derived Directives

${sectionBulletList(source.conversationDirectives)}

## Future Harness Directions

${sectionBulletList(source.futureHarnessDirections)}

## Luna Swarm Orchestrator

- Model: \`${swarmConfig.provider.model}\` with \`${swarmConfig.provider.reasoning}\` reasoning.
- Task concurrency: \`${swarmConfig.controls.taskConcurrency}\`; active predictions: \`${swarmConfig.controls.maxActivePredictions}\`; validation concurrency: \`${swarmConfig.controls.validationConcurrency}\`.
- Every task uses an isolated worktree and branch, declared app-relative paths, structured output, deterministic validation, and artifact-backed decisions.
- The harness creates a validated integration branch only. Default-branch merge and push remain human-owned.

\`\`\`bash
cd ${REPO_ROOT}
npm run harness:swarm -- check HorrorCorridor-Harness/swarm-request.example.json
npm run harness:swarm -- plan HorrorCorridor-Harness/swarm-request.example.json
npm run harness:swarm -- run HorrorCorridor-Harness/my-swarm-request.json --execute
\`\`\`

## Sequential Live Agent

- Every browser episode is followed by exactly one read-only Luna judgment with prediction concurrency fixed at one, low reasoning, and the Codex priority service tier.
- Each judgment sees the original goal, the current compact episode, and a bounded recent window of structured outputs and reasoning summaries.
- The judgment chooses the next action profile and records an over-time trend; malformed or missing output fails closed.
- There is no artificial delay between episodes; each call records duration plus the completion-to-next-start gap.
- One browser expedition persists across calls and normal execution ends only when the authoritative game reports \`caught\`.
- The current real proof is \`docs/live-agent/runs/2026-07-17T18-42-11-807Z\` with seven Luna calls; see \`docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md\`.
- Full prompts, provider events, structured judgments, screenshots, timing, logs, and loop state remain inspectable in the external run directory.

\`\`\`bash
cd ${REPO_ROOT}
npm run live-agent:sample
npm run review:live-agent -- <run-directory>
\`\`\`

## Command

\`\`\`bash
cd ${REPO_ROOT} && npm run harness:horror-corridor
\`\`\`

## Notes

- This document is generated by \`scripts/horror-corridor-harness.mjs\`.
- Refresh it whenever durable chat guidance changes the repo's process, kit vocabulary, or promotion rules.
`;
}

function buildManifest(source, swarmConfig) {
  return {
    name: "HorrorCorridor-Harness",
    generatedAt: new Date().toISOString(),
    source: relative(REPO_ROOT, SOURCE_PATH),
    outputs: [
      relative(REPO_ROOT, OUTPUT_DOC_PATH),
      relative(REPO_ROOT, OUTPUT_MANIFEST_PATH),
    ],
    controlFiles: CONTROL_FILES.map((relativePath) => ({
      path: relativePath,
      purpose: summarizeControlFile(relativePath),
    })),
    definitions: source.definitions.map((entry) => entry.term),
    promotionPath: source.promotionPath,
    swarm: {
      config: relative(REPO_ROOT, SWARM_CONFIG_PATH),
      requestSchema: relative(REPO_ROOT, SWARM_REQUEST_SCHEMA_PATH),
      workerResultSchema: relative(REPO_ROOT, SWARM_WORKER_SCHEMA_PATH),
      model: swarmConfig.provider.model,
      reasoning: swarmConfig.provider.reasoning,
      controls: swarmConfig.controls,
      promotion: "validated integration branch; human-owned default-branch merge and push",
    },
    liveAgent: {
      runner: "scripts/horror-corridor-live-agent.mjs",
      reviewer: "scripts/review-live-agent-run.mjs",
      prompt: relative(REPO_ROOT, LIVE_AGENT_PROMPT_PATH),
      judgmentSchema: relative(REPO_ROOT, LIVE_AGENT_JUDGMENT_SCHEMA_PATH),
      model: "gpt-5.6-luna",
      reasoning: "low",
      serviceTier: "priority",
      historyWindow: 3,
      predictionConcurrency: 1,
      waitBetweenEpisodesMs: 0,
      policy: "one read-only judgment after every live browser episode",
      stopCondition: "authoritative expedition phase caught",
      currentProof: "docs/live-agent/runs/2026-07-17T18-42-11-807Z",
    },
  };
}

function writeOutputs() {
  mkdirSync(DOCS_DIR, { recursive: true });
  const source = readJson(SOURCE_PATH);
  const swarmConfig = readJson(SWARM_CONFIG_PATH);
  const guide = buildGuide(source, swarmConfig);
  const manifest = buildManifest(source, swarmConfig);
  writeFileSync(OUTPUT_DOC_PATH, `${guide}\n`);
  writeFileSync(OUTPUT_MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${relative(REPO_ROOT, OUTPUT_DOC_PATH)}`);
  console.log(`Wrote ${relative(REPO_ROOT, OUTPUT_MANIFEST_PATH)}`);
}

function checkInputs() {
  const source = readJson(SOURCE_PATH);
  readJson(SWARM_CONFIG_PATH);
  readJson(SWARM_REQUEST_SCHEMA_PATH);
  readJson(SWARM_WORKER_SCHEMA_PATH);
  readJson(LIVE_AGENT_JUDGMENT_SCHEMA_PATH);
  readText(LIVE_AGENT_PROMPT_PATH);
  for (const relativePath of CONTROL_FILES) {
    summarizeControlFile(relativePath);
  }
  console.log(`Source ok: ${source.title}`);
  console.log(`Swarm config ok: ${relative(REPO_ROOT, SWARM_CONFIG_PATH)}`);
  console.log(`Swarm request schema ok: ${relative(REPO_ROOT, SWARM_REQUEST_SCHEMA_PATH)}`);
  console.log(`Swarm worker schema ok: ${relative(REPO_ROOT, SWARM_WORKER_SCHEMA_PATH)}`);
  console.log(`Live-agent judgment schema ok: ${relative(REPO_ROOT, LIVE_AGENT_JUDGMENT_SCHEMA_PATH)}`);
  console.log(`Live-agent prompt ok: ${relative(REPO_ROOT, LIVE_AGENT_PROMPT_PATH)}`);
  for (const relativePath of CONTROL_FILES) {
    console.log(`Control ok: ${relativePath}`);
  }
}

const command = process.argv[2] ?? "refresh-docs";

if (command === "check") {
  checkInputs();
} else if (command === "refresh-docs") {
  writeOutputs();
} else {
  console.error(`Unknown command: ${command}`);
  console.error("Usage: node scripts/horror-corridor-harness.mjs [refresh-docs|check]");
  process.exit(1);
}

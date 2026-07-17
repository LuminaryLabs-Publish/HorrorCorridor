# HorrorCorridor-Harness

Status: active

## Purpose

`HorrorCorridor-Harness` is the repo-owned Codex control surface for durable guidance and large asynchronous Luna implementation swarms.

It has two explicit modes:

- `scripts/horror-corridor-harness.mjs` is the linear guidance refresh chain.
- `scripts/horror-corridor-swarm.mjs` is the asynchronous orchestrator for scoped change-request batches.

Neither replaces the live-player harness. The guidance chain owns process and vocabulary refresh:

- what a kit is in this repo
- what a domain-service kit is
- when to adopt a public NexusRealtime or ProtoKit capability
- when to create a local HorrorCorridor ProtoKit
- how kit work should move from preview to smoke to live-player proof

## Inputs

- `.agent/start-here.md`
- `.agent/workflow.md`
- `.agent/intention.md`
- `.agent/memory.md`
- `.agent/goal.md`
- `.agent/feedback.md`
- `memory.md`
- `HorrorCorridor-Harness/domain-service-kit-source.json`

## Outputs

- `docs/HorrorCorridor-Harness-Guide.md`
- `docs/HorrorCorridor-Harness-Manifest.json`

## Luna Swarm

Luna is the Codex model `gpt-5.6-luna`; it is not a separate executable. The swarm harness launches bounded `codex exec` workers with Luna and medium reasoning.

Each worker receives:

- one change request
- one isolated git worktree and `codex/hc-swarm/<run>/<task>` branch
- explicit app-relative `allowedPaths`
- declared validation commands
- dependency evidence from accepted upstream workers

Worker scopes are deliberately narrow: exact files or trailing `/**` scopes under `src/`, `public/`, or `testing/object-kits/`. Broad globs, control files, package/config files, and tracked `runs` proof folders are rejected before work starts.

Validation is also allowlisted rather than arbitrary host command execution. V1 accepts only the repo's TypeScript, lint, build, ProtoKit smoke, and deterministic self-test version probes encoded in the committed request schema. A live integration must include TypeScript, lint, build, and ProtoKit smoke; the Node version probe is mock-only.

The deterministic orchestrator owns task scheduling, prediction and validation concurrency, scope locks, path validation, worker commits, dependency propagation, JSONL evidence, and the integration branch. Workers cannot use git, spawn subagents, push, deploy, or edit shared control files.

The harness never merges or pushes the default branch. Successful runs stop at a validated `codex/hc-swarm/<run>/integrate` branch for human review.

### Prepare a batch

Copy and edit `swarm-request.example.json`, keeping independent worker path scopes disjoint:

```bash
npm run harness:swarm -- check HorrorCorridor-Harness/my-swarm-request.json
npm run harness:swarm -- plan HorrorCorridor-Harness/my-swarm-request.json
```

`plan` renders prompts and run artifacts but does not invoke Codex or create worktrees.

### Execute Luna workers

Live mutation requires the explicit `--execute` gate and a clean base worktree:

```bash
npm ci
npm run harness:swarm -- run HorrorCorridor-Harness/my-swarm-request.json --execute
```

The harness links the base checkout's ignored `node_modules` directory into each isolated worktree so many workers can validate without reinstalling the dependency graph. Workers are forbidden from installing or updating dependencies.

Default artifacts live under `~/.codex/horror-corridor-harness/runs/<run-id>/`. Worktrees live under `~/.codex/worktrees/HorrorCorridor-Harness/<run-id>/`.

### Inspect or resume

```bash
npm run harness:swarm -- status ~/.codex/horror-corridor-harness/runs/<run-id>
npm run harness:swarm -- resume ~/.codex/horror-corridor-harness/runs/<run-id> --execute
```

Resume skips validated worker mutations but rechecks canonical repo/run/worktree identity, configuration and prompt hashes, branch heads, commit ancestry, changed-file scope, clean worktrees, artifact hashes, worker validation, and integration validation. An interrupted or timed-out mutation is held and never replayed automatically.

### Validate the harness

```bash
npm run harness:swarm:check
npm run harness:swarm:self-test
```

The self-test uses a temporary git repository and deterministic mock workers. It proves two-worker concurrency, isolated commits, integration, scope rejection, dependency blocking, resume safety, and valid JSONL without invoking Luna or credentials.

## Swarm Artifacts

```text
runs/<run-id>/
  manifest.json
  events.jsonl
  queue.jsonl
  inputs/tasks/*.json
  workers/<task-id>/
    prompt.md
    events.jsonl
    final.json
    changed-files.json
    diff.patch
    validation.json
  decisions/*.json
  integration/validation.json
  validation-report.json
  final-report.json
```

## Command

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1 && npm run harness:horror-corridor
```

## Linear Flow

1. Read the repo control files.
2. Load the conversation-derived kit/domain vocabulary source.
3. Render the repo guide and manifest into `docs/`.
4. Stop and let the next implementation batch use those repo-owned docs.

## Authority Boundary

- Luna workers: bounded edits inside declared paths in isolated worktrees.
- Swarm orchestrator: queue, locks, worktrees, commits, deterministic validation, and integration branch.
- Human reviewer: default-branch merge, push, deployment, credentials, or any destructive cleanup.

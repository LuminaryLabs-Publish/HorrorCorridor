# Goal

Status: completed

## Objective

Set up `HorrorCorridor-Harness` to batch-submit scoped change requests to Codex CLI with Luna and coordinate massive asynchronous swarm changes safely.

## Success Criteria

- Luna is explicitly pinned as `gpt-5.6-luna` with medium reasoning instead of inheriting user defaults.
- Large request batches can be checked, planned, run, resumed, and inspected through one repo command.
- Task concurrency is separate from active model-prediction and validation concurrency.
- Every worker receives an isolated worktree, branch, allowed paths, dependency evidence, and deterministic validation commands.
- Out-of-scope changes, dependency failures, cycles, concurrent scope overlap, malformed outputs, and unknown mutation outcomes fail closed.
- Worker commits integrate in dependency order on a dedicated integration branch.
- The harness never merges or pushes the default branch; human approval remains required.
- Run manifests, JSONL ledgers, prompts, decisions, diffs, validation, and final reports reconstruct every run.
- Structural, concurrent happy-path, scope-failure, dependency-blocking, resume, and JSONL proofs pass without using credentials.

## Current Focus

The swarm harness is ready for a user-authored batch request. No live Luna workers were launched during setup; the first real batch remains explicitly gated by `--execute`.

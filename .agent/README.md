# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T16-09-54-04-00/project-breakdown.md
```

Focus: local and host authority result cutover for the oldest eligible tracked Publish repo. This pass keeps the next implementation boundary on explicit command result envelopes, stable rejection reasons, publish decisions, runtime debug projection, and DOM-free replay parity before renderer, world-builder, PeerJS, or visual-kit extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, mesh object kits, texture kits, command envelope and acceptance targets, `command-result-envelope-kit`, `publish-decision-snapshot-kit`, `interaction-preflight-reason-catalog-kit`, `interaction-preflight-diagnostics-kit`, `player-pose-command-result-kit`, `interaction-command-result-kit`, `ooze-command-result-kit`, `command-result-journal-kit`, `runtime-debug-result-projection-kit`, `local-authority-result-consumer-kit`, `host-authority-result-consumer-kit`, `command-replay-fixture-kit`, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-07T14-51-44-04-00/project-breakdown.md
.agent/trackers/2026-07-07T13-41-22-04-00/project-breakdown.md
.agent/trackers/2026-07-07T11-51-17-04-00/project-breakdown.md
.agent/trackers/2026-07-07T10-41-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T09-28-43-04-00/project-breakdown.md
.agent/trackers/2026-07-07T08-20-44-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-10-27-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
```

## Current next slice

```txt
HorrorCorridor Local/Host Result Cutover + Fixture Parity Gate
```

Build order:

```txt
keep solo, host, and client play working
-> add command-result-contract-kit types first
-> add command-result-envelope-kit as DOM-free source code under game-state/domain
-> add stable result statuses: accepted, rejected, unchanged, publish-only
-> add stable rejection reasons for every current silent no-op path
-> add publish decisions: publish, skip, recovery, victory
-> keep current interactionRules and networkRules exports returning GameState
-> add result-returning interaction and network rule wrappers
-> make legacy exports call result wrappers and return result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel through explicit policy
-> add publish-decision-snapshot-kit near buildReplicatedSnapshot/createFullSyncMessage seams
-> update GameCanvas local applyInteraction to journal rejected commands without publishing
-> update GameCanvas host TRY_INTERACT path to skip rejected command publishes and publish request-sync recovery
-> preserve current victory behavior while attaching victory publish decision
-> extend RuntimeDebugFrameRecord and debug extractState with latest result, latest publish decision, and command journal counts
-> add DOM-free fixtures for every result status and publish decision
-> add replay parity fixture comparing normalized final replicated snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and visual object-kit work
```

## Tracker Layout

```txt
.agent/
├─ README.md
├─ kit-registry.json
└─ trackers/
   └─ <timestamp>/
      └─ project-breakdown.md
```

## Rules

- Keep entries public-safe.
- Track one repo per run.
- Prefer evidence-backed findings from repository files.
- Separate current implementation from recommended next work.
- Do not store private reasoning or chat-only scratchpad content.

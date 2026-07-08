# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-08T01-31-11-04-00/project-breakdown.md
```

Focus: command reason catalog and result journal fixture gate for the oldest eligible tracked Publish repo. This pass keeps the next work on stable `CommandReason` values, `CommandResult` records, publish-decision snapshots, local/host authority consumers, runtime debug result projection, and DOM-free fixture parity before PeerJS, renderer, minimap, postprocess, or object-kit extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented object/texture kits, source-backed runtime services, command envelope targets, reason catalog targets, `command-result-contract-kit`, `command-result-envelope-kit`, `interaction-preflight-reason-catalog-kit`, `pickup-command-result-kit`, `drop-command-result-kit`, `place-command-result-kit`, `remove-command-result-kit`, `player-pose-command-result-kit`, `request-sync-command-result-kit`, `ready-cancel-command-result-kit`, `victory-command-result-kit`, `publish-decision-snapshot-kit`, `command-result-journal-kit`, `command-result-fixture-matrix-kit`, `runtime-debug-result-projection-kit`, `local-authority-result-consumer-kit`, `host-authority-result-consumer-kit`, `command-replay-fixture-kit`, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-08T00-00-20-04-00/project-breakdown.md
.agent/trackers/2026-07-07T22-41-23-04-00/project-breakdown.md
.agent/trackers/2026-07-07T21-18-45-04-00/project-breakdown.md
.agent/trackers/2026-07-07T20-00-46-04-00/project-breakdown.md
.agent/trackers/2026-07-07T18-41-07-04-00/project-breakdown.md
.agent/trackers/2026-07-07T17-20-57-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-09-54-04-00/project-breakdown.md
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
HorrorCorridor Command Reason Catalog + Result Journal Fixture Gate
```

Build order:

```txt
preserve current solo, host, client, rendering, minimap, debug overlay, and PeerJS behavior
-> add CommandEnvelope, CommandStatus, CommandReason, CommandResult, and PublishDecision contracts under game-state/domain
-> define stable CommandReason values for every current silent no-op branch
-> add interaction preflight helpers beside interactionRules
-> add result-returning wrappers for pickup, drop, place, and remove
-> keep legacy interaction exports returning result.state
-> add result-returning wrappers for player update and network interaction request
-> keep legacy network exports returning result.state
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as explicit skipped commands until lobby policy exists
-> add command result journal counters
-> add publish decision snapshot helper
-> wire local-authority consumer to journal rejections and only publish accepted changed/victory results
-> wire host-authority consumer to skip rejected TRY_INTERACT publishes and publish request-sync recovery
-> extend runtime debug frame/export with latestCommandResult, latestPublishDecision, commandJournal, and latestFixtureParity
-> add DOM-free fixtures for accepted pickup, rejected pickup, accepted drop, rejected drop, accepted place, rejected place, remove, request-sync recovery, ignored toggle-ready/cancel, player update, ooze tick, and victory completion
-> defer PeerJS extraction, renderer extraction, minimap extraction, postprocess extraction, and object-kit visual expansion
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

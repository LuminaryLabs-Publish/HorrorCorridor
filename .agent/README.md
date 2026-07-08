# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T20-00-46-04-00/project-breakdown.md
```

Focus: command result source cutover for the oldest eligible tracked Publish repo. This pass keeps the implementation boundary on source-owned command result wrappers, stable rejection reasons, publish decision metadata, local/host result consumers, runtime debug result projection, command journals, and DOM-free replay fixtures before PeerJS, renderer, minimap, or object-kit extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented object/texture kits, source-backed runtime services, command envelope and acceptance targets, `command-result-contract-kit`, `command-result-envelope-kit`, `interaction-preflight-reason-catalog-kit`, `interaction-command-result-kit`, `player-pose-command-result-kit`, `request-sync-command-result-kit`, `ready-cancel-command-result-kit`, `victory-command-result-kit`, `publish-decision-snapshot-kit`, `command-result-journal-kit`, `runtime-debug-result-projection-kit`, `local-authority-result-consumer-kit`, `host-authority-result-consumer-kit`, `command-replay-fixture-kit`, and the next build slice.

## Previous Entries

```txt
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
HorrorCorridor Command Result Source Cutover + Replay Fixture Smoke Lock
```

Build order:

```txt
preserve current solo, host, client, rendering, minimap, debug overlay, and network behavior
-> add command result type definitions under game-state/domain without moving renderer code
-> define CommandStatus: accepted, rejected, unchanged, publish-only
-> define CommandReason catalog for every silent no-op branch
-> define PublishDecision: publish, skip, recovery, victory, no-op
-> add result factories with beforeTick, afterTick, changed, events, source, and diagnostics
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
-> extend runtime debug frame with latestCommandResult, latestPublishDecision, and commandJournal
-> add DOM-free fixtures for accepted pickup, rejected pickup, accepted place, rejected place, request-sync recovery, and victory completion
-> defer PeerJS extraction, renderer extraction, minimap extraction, and object-kit visual expansion
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

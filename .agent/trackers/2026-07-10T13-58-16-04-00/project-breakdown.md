# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-10T13-58-16-04-00`

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

## Goal

Refresh the repo-local operating memory for the current source state, identify the complete interaction/domain/service/kit surface, and define the smallest safe next implementation boundary without changing runtime code.

## Selection ledger

```txt
[x] full accessible LuminaryLabs-Publish inventory compared
[x] central LuminaryLabs-Dev/LuminaryLabs ledger compared
[x] root .agent state checked
[x] TheCavalryOfRome excluded
[x] HorrorCorridor selected as oldest eligible documented fallback
```

## Interaction loop

```txt
menu -> solo/host/join -> room/readiness -> seeded game bootstrap
-> GameCanvas runtime -> pointer-lock movement -> derived interaction
-> local or peer command routing -> host authority rules
-> GameState-only outcome -> inferred publish/skip
-> replicated snapshot -> renderer/minimap/HUD/debug/completion
```

## Domains identified

```txt
shell/session/network/replication
maze/cube/anomaly bootstrap
first-person input/movement/collision/camera
interaction and carried-object authority
host/local authoritative simulation
ooze cadence and trail mutation
ordered sequence and victory
Three.js world/minimap/postprocess rendering
runtime debug frames/events
legacy GameState-only rule adapters
planned command/result/reason/decision/journal/fixture contracts
```

## Implemented kits and services

```txt
corridor-session-domain-kit: mode, identity, readiness
peer-room-sync-domain-kit: peer transport, sync, updates, interactions
maze-snapshot-bootstrap-kit: maze, lookup, cubes, anomaly slots
first-person-corridor-player-kit: input, movement, collision, camera
corridor-interaction-domain-kit: pickup, drop, place, remove
ordered-anomaly-sequence-kit: slot order, validation, victory
ooze-trail-domain-kit: cadence, decay, spawn, spacing/cap guards
corridor-render-world-kit: Three.js world projection
corridor-minimap-kit: map and markers
runtime-debug-frame-kit: frame/event export
```

## Main finding

The runtime is playable, but command outcomes are erased at the rule boundary. Unchanged-state returns and consumer inference cannot distinguish rejection, skip, no-op, recovery, ooze, victory, or publish-only behavior. The next safe cut is a source-owned command outcome ledger plus a deterministic fixture and additive runtime-debug projection.

## Plan ledger

```txt
[x] refresh START_HERE.md
[x] refresh current-audit.md
[x] refresh known-gaps.md
[x] refresh next-steps.md
[x] refresh validation.md
[x] refresh kit-registry.json
[x] add timestamped turn ledger
[x] add architecture audit
[x] add render audit
[x] add gameplay audit
[x] add command-authority audit
[x] add interaction audit
[x] add deploy audit
[ ] implement command contracts
[ ] implement deterministic command fixture
[ ] wire runtime debug projection
[ ] replace GameCanvas inference after fixture proof
```

## Validation

Documentation-only pass. Runtime source and package scripts were not changed. Existing checks and the planned command fixture were not run. No branch or pull request was created.
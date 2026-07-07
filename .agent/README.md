# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T13-41-22-04-00/project-breakdown.md
```

Focus: interaction preflight reason catalog and command replay fixture follow-up for the oldest eligible tracked Publish repo. This pass narrows the command-result work to the first gameplay legality seam: pickup, drop, anomaly placement, anomaly removal, pose, request-sync, and ooze updates need explicit accepted/rejected/unchanged/publish-only result records before render, world-builder, or broad PeerJS extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, mesh object kits, texture kits, command envelope and acceptance policy targets, the new `interaction-preflight-reason-catalog-kit`, `interaction-preflight-diagnostics-kit`, `command-result-rejection-contract-kit`, `player-pose-command-result-kit`, `interaction-command-result-kit`, `ooze-command-result-kit`, `snapshot-publish-metadata-kit`, `command-result-journal-kit`, `command-replay-fixture-kit`, command fixtures, replay fixtures, and the next build slice.

## Previous Entries

```txt
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
HorrorCorridor Interaction Preflight Reason Catalog + Command Replay Fixture Cutover
```

Build order:

```txt
keep solo, host, and client play working
-> add interaction-preflight-reason-catalog-kit before touching render or PeerJS extraction
-> define stable reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube, missing_anomaly_cell, unknown_interaction_action
-> add interaction-preflight-diagnostics-kit that returns checked playerId, cubeId, slotId, distanceToEnd, carriedCubeId, candidateCubeId, selectedSlotId, and rule name
-> wrap pickUpCube, dropCube, placeCubeAtEndAnomaly, and removeCubeFromEndAnomaly with preflight functions before applying effects
-> keep existing interactionRules exports compatible while adding result-returning variants
-> add command-result-rejection-contract-kit fields: commandId, type, actorId, accepted, rejected, rejectionReason, changed, events, publishDecision, publishReason, beforeTick, afterTick, diagnostics
-> add player-pose-command-result-kit around applyNetworkPlayerUpdate
-> add ooze-command-result-kit around advanceOozeTrail with deterministic RNG required in fixtures
-> add snapshot-publish-metadata-kit and make request-sync publish-only with accepted=true changed=false publishReason=recovery
-> add command-result-journal-kit with accepted, rejected, unchanged, and publish-only counts
-> extend runtime debug frames with lastCommandId, lastCommandType, lastResultStatus, lastRejectionReason, lastPublishReason, publishDecision, and journal counts
-> add DOM-free fixtures for missing-player pose, unchanged pose, illegal pickup, legal pickup, illegal place, legal place, wrong-slot remove, request-sync, seeded ooze, and victory
-> add command-replay-fixture-kit to replay command journals and compare normalized final snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and new visual-kit work
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

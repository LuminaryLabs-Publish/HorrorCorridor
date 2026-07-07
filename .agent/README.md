# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T14-51-44-04-00/project-breakdown.md
```

Focus: command result envelopes and publish decision snapshots for the oldest eligible tracked Publish repo. This pass narrows the next implementation seam to explicit accepted/rejected/unchanged/publish-only result records, stable publish/skip/recovery/victory decisions, command journals, runtime debug projection, and DOM-free replay fixtures before render, world-builder, or broad PeerJS extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, mesh object kits, texture kits, command envelope and acceptance targets, `command-result-envelope-kit`, `publish-decision-snapshot-kit`, `interaction-preflight-reason-catalog-kit`, `interaction-preflight-diagnostics-kit`, `player-pose-command-result-kit`, `interaction-command-result-kit`, `ooze-command-result-kit`, `command-result-journal-kit`, `runtime-debug-result-projection-kit`, `command-replay-fixture-kit`, and the next build slice.

## Previous Entries

```txt
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
HorrorCorridor Command Result Envelope + Publish Decision Snapshot Fixture Cutover
```

Build order:

```txt
keep solo, host, and client play working
-> add command-result-envelope-kit as a DOM-free source boundary
-> define result statuses: accepted, rejected, unchanged, publish-only
-> define stable rejection reasons: not_playing, missing_player, already_carrying, no_carried_cube, no_nearby_cube, too_far_from_anomaly, no_open_slot, wrong_slot, no_placed_cube, missing_anomaly_cell, unknown_interaction_action, unknown_network_action
-> define publish decisions: publish, skip, recovery, victory
-> keep current interactionRules exports compatible
-> add result-returning interaction variants for pickup, drop, place, and remove
-> keep current networkRules exports compatible
-> add applyNetworkPlayerUpdateWithResult and applyNetworkInteractionRequestWithResult
-> classify missing-player pose updates as rejected missing_player
-> classify identical pose updates as accepted unchanged
-> classify request-sync as publish-only recovery
-> classify toggle-ready and cancel as publish-only or skipped by explicit policy instead of silent default
-> add publish-decision-snapshot-kit around buildReplicatedSnapshot and createFullSyncMessage seams
-> change GameCanvas host/local authority paths to consume result metadata while preserving current behavior
-> add command-result-journal-kit with accepted, rejected, unchanged, publish-only, publish, skip, recovery, and victory counts
-> extend RuntimeDebugFrameRecord with latestCommandResult, latestPublishDecision, and commandJournal counts
-> expose the same data through window.__HORROR_CORRIDOR_DEBUG__.extractState()
-> add DOM-free fixtures for missing-player pose, unchanged pose, illegal pickup, legal pickup, illegal place, legal place, wrong-slot remove, request-sync recovery, seeded ooze unchanged, seeded ooze changed, and victory publish
-> add command replay fixture that replays result-bearing envelopes and compares normalized final snapshots
-> defer render extraction, world-builder extraction, broad PeerJS adapter extraction, and new object/texture visual work
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

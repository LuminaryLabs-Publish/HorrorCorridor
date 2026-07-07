# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T09-28-43-04-00/project-breakdown.md
```

Focus: command result metadata and replay fixture follow-up for the next eligible Publish repo in the tracked rotation. This pass narrows the previous command-application contract into a concrete command envelope, command result, snapshot publish, replay journal, diagnostics, and smoke-fixture boundary.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, the `host-authority-command-kit`, `command-envelope-contract-kit`, `command-result-contract-kit`, `snapshot-publish-contract-kit`, `command-result-fixture-kit`, `command-journal-replay-kit`, `snapshot-contract-smoke-kit`, service cutover order, recommended smoke fixtures, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-07T08-20-44-04-00/project-breakdown.md
.agent/trackers/2026-07-07T07-10-27-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
```

## Current next slice

```txt
HorrorCorridor Command Result Metadata + Replay Fixture Cutover
```

Build order:

```txt
keep current solo, host, and client play working
-> add command-envelope-contract-kit with commandId, type, actorId, source, sequence, timestampMs, payload, and requestId
-> add command-result-contract-kit with state, changed, rejected, rejectionReason, events, publishReason, journalEntry, and diagnostics
-> implement host-authority-command-kit as a React-free / Three-free domain module
-> wrap applyNetworkPlayerUpdate as PLAYER_POSE_UPDATE command application
-> wrap applyNetworkInteractionRequest as TRY_INTERACT command application
-> wrap advanceOozeTrail as ADVANCE_OOZE command application with seeded RNG context
-> keep interactionRules legality logic as the effect layer under command application
-> move sequence validation into command application result events
-> make publishAuthoritativeState consume command results rather than infer publish reasons locally
-> add command-result-fixture-kit for legal pickup, illegal pickup, place correct cube, wrong-order correction, seeded ooze, and victory
-> add command-journal-replay-kit that replays command envelopes and compares normalized snapshots
-> extend runtime debug frames with lastCommandType, lastCommandId, rejectedCommandCount, journalLength, lastPublishReason, and replayParityStatus
-> add smoke fixtures that can run without DOM, React, Three, PeerJS, or pointer lock
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

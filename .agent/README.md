# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T11-51-17-04-00/project-breakdown.md
```

Focus: command result rejection contract and snapshot metadata fixture follow-up for the next eligible Publish repo in the tracked rotation. This pass narrows the previous host command envelope boundary into the first reducer-level execution seam: every authoritative state mutation should produce explicit accepted, rejected, changed, publish, event, and diagnostics metadata before broad render or transport extraction.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, mesh object kits, texture kits, command envelope and acceptance policy targets, the new `command-result-rejection-contract-kit`, `player-pose-command-result-kit`, `interaction-command-result-kit`, `ooze-command-result-kit`, `snapshot-publish-metadata-kit`, `command-result-journal-kit`, command fixtures, replay fixtures, and the next build slice.

## Previous Entries

```txt
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
HorrorCorridor Command Result Rejection Contract + Snapshot Metadata Fixture Cutover
```

Build order:

```txt
keep solo, host, and client play working
-> add command-result-rejection-contract-kit before moving the whole runtime through command envelopes
-> define CommandResult fields: commandId, type, actorId, accepted, rejected, rejectionReason, changed, events, publishDecision, publishReason, beforeTick, afterTick, diagnostics
-> add player-pose-command-result-kit around applyNetworkPlayerUpdate
-> return rejected=true with reason=missing_player for unknown player updates
-> return changed=false with reason=unchanged_pose for valid no-change pose updates
-> add interaction-command-result-kit with preflight reason mapping before calling existing interactionRules effects
-> map illegal pickup/drop/place/remove to stable reasons
-> add ooze-command-result-kit around advanceOozeTrail with deterministic RNG required in fixtures
-> add snapshot-publish-metadata-kit to derive publishDecision from CommandResult
-> keep request-sync as publish-only with accepted=true, changed=false, publishReason=recovery
-> add command-result-journal-kit with accepted, rejected, and unchanged counts
-> extend runtime debug frame shape with last command, rejection, publish, and journal fields
-> add command-result-fixture-kit with scripted pose, illegal pickup, legal pickup, illegal place, legal place, request-sync, seeded ooze, and victory examples
-> add replay-parity-smoke-kit after fixture result shape is stable
-> defer render extraction, world-builder extraction, and broad PeerJS adapter extraction until command result fixtures pass
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

# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T10-41-32-04-00/project-breakdown.md
```

Focus: host command envelope adapter and snapshot publish fixture follow-up for the next eligible Publish repo in the tracked rotation. This pass narrows the previous command-result boundary into the first executable authority seam: normalize local, host, client, and fixture mutations into canonical command envelopes, then make snapshot publishing consume command result metadata.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, the `host-command-envelope-adapter-kit`, `command-acceptance-policy-kit`, `host-authority-command-kit`, `command-result-contract-kit`, `snapshot-publish-fixture-kit`, `command-result-journal-kit`, `command-journal-replay-kit`, replay/smoke fixtures, and the next build slice.

## Previous Entries

```txt
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
HorrorCorridor Host Command Envelope + Snapshot Publish Fixture Cutover
```

Build order:

```txt
keep current solo, host, and client play working
-> add host-command-envelope-adapter-kit as a React-free / Three-free / Zustand-free / PeerJS-free domain module
-> define PLAYER_POSE_UPDATE, TRY_INTERACT, ADVANCE_OOZE, REQUEST_SYNC, PAUSE, RESUME, and COMPLETE_RUN commands
-> normalize local authoritative pose updates and remote PLAYER_UPDATE messages into PLAYER_POSE_UPDATE envelopes
-> normalize local and remote interaction requests into TRY_INTERACT envelopes
-> normalize host cadence ooze updates into ADVANCE_OOZE envelopes with deterministic RNG context
-> add command-acceptance-policy-kit for room, actor, source, screen, and command-type checks
-> add command-result-contract-kit around existing networkRules, interactionRules, winRules, and oozeRules effects
-> add command-result-journal-kit for accepted and rejected outcomes
-> add snapshot-publish-fixture-kit so publishAuthoritativeState consumes publishReason from command results
-> convert publishAuthoritativeState into a thin snapshot/write/broadcast caller
-> add command fixture JSON for pose update, illegal interact, legal pickup, correct placement, wrong-order correction, seeded ooze, request-sync, and victory
-> add replay parity fixture with normalized final snapshot comparison
-> extend runtime debug frames with command and publish metadata
-> defer render extraction until command envelope, publish fixture, and replay fixture pass
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

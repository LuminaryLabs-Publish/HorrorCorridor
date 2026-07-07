# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T08-20-44-04-00/project-breakdown.md
```

Focus: command application contract and snapshot publishing follow-up for the next eligible Publish repo in the tracked rotation. This pass narrows the command reducer work into one explicit `applyCommand(state, command, context) -> result` boundary and adds `snapshot-publish-contract-kit` as the bridge between authority, sync, diagnostics, smoke, and replay.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, the `host-authority-command-kit`, `snapshot-publish-contract-kit`, `command-journal-replay-kit`, `snapshot-contract-smoke-kit`, service cutover order, recommended smoke fixtures, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-07T07-10-27-04-00/project-breakdown.md
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
```

## Current next slice

```txt
HorrorCorridor Command Application Contract + Snapshot Publish Cutover
```

Build order:

```txt
keep current solo, host, and client play working
-> add host-authority-command-kit as a pure domain module
-> define PLAYER_POSE_UPDATE, TRY_INTERACT, ADVANCE_OOZE, PAUSE, RESUME, REQUEST_SYNC, COMPLETE_RUN
-> define applyCommand(state, command, context) -> result
-> return state, events, rejected, rejectionReason, publishReason, and journalEntry
-> move player update, interaction, objective, and ooze mutation behind command application
-> add snapshot-publish-contract-kit
-> make publishAuthoritativeState a thin caller
-> route solo and host mutations through the same command path
-> add command-journal-replay-kit and snapshot-contract-smoke-kit
-> extend debug frames with command-level diagnostics
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

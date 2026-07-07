# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T07-10-27-04-00/project-breakdown.md
```

Focus: command reducer and replay follow-up for the oldest eligible Publish repo in the tracked rotation. This pass narrows the host-authority cutover into a pure command boundary, command journal replay, seeded ooze advancement, snapshot parity smoke, and service-level debug outputs.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned service surfaces, implemented ProtoKit/catalog surfaces, the `host-authority-command-kit`, the new `command-journal-replay-kit`, the new `snapshot-contract-smoke-kit`, service cutover order, recommended smoke fixtures, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
```

## Current next slice

```txt
HorrorCorridor Command Reducer Replay Cutover
```

Build order:

```txt
keep current playable flow
-> add pure host-authority-command-kit
-> define player / interaction / ooze / sync command types
-> route solo play through the command reducer
-> route host PLAYER_UPDATE and TRY_INTERACT through the same reducer
-> move sequence validation and ooze advance behind command application
-> return state, events, rejected flag, publishReason, and journalEntry from reducer
-> make GameCanvas dispatch commands and consume snapshots
-> add command-journal-replay-kit
-> add snapshot-contract-smoke-kit fixtures
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

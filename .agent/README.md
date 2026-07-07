# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T06-01-21-04-00/project-breakdown.md
```

Focus: host-authority contract follow-up for the oldest eligible Publish repo in the tracked rotation. This pass documents the service cutover from component-owned gameplay behavior into a pure command reducer that can validate solo, host, and client actions through the same authority surface.

## Registry

```txt
.agent/kit-registry.json
```

The registry now tracks current source-owned kit surfaces, implemented ProtoKit/catalog surfaces, the new `host-authority-command-kit`, service cutover order, recommended command-journal smoke fixtures, and the next build slice.

## Previous Entries

```txt
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
```

## Current next slice

```txt
HorrorCorridor Host Authority Contract Cutover
```

Build order:

```txt
keep current playable flow
-> add pure host-authority-command-kit
-> define player/update/interaction command types
-> route solo and host play through one command reducer
-> route client TRY_INTERACT and PLAYER_UPDATE through the same reducer
-> move sequence validation and ooze advance behind host authority
-> make GameCanvas dispatch commands and consume snapshots
-> add command journal replay fixture
-> add deterministic smoke fixtures
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

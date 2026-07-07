# HorrorCorridor Agent Tracker

This root `.agent` folder stores public-safe repo breakdowns, tracker runs, kit registries, and next-work analysis for `LuminaryLabs-Publish/HorrorCorridor`.

## Latest Entry

```txt
.agent/trackers/2026-07-07T04-50-42-04-00/project-breakdown.md
```

Focus: service-registry follow-up for the oldest eligible Publish repo, adding a canonical kit registry and documenting the cutover from component-owned behavior into session, peer sync, player, interaction, objective, ooze, render, and diagnostics kits.

## Registry

```txt
.agent/kit-registry.json
```

The registry tracks current source-owned kit surfaces, implemented ProtoKit/catalog surfaces, runtime extraction candidates, service cutover order, and recommended smoke fixtures.

## Previous Entries

```txt
.agent/trackers/2026-07-07T03-38-41-04-00/project-breakdown.md
.agent/trackers/2026-07-07T16-25-00-04-00/project-breakdown.md
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

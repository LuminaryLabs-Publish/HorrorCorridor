# HorrorCorridor-Harness

Status: active

## Purpose

`HorrorCorridor-Harness` is a small linear Codex CLI support tool for turning durable HorrorCorridor chat direction into repo-owned guidance.

It does not replace the live-player harness. It owns process and vocabulary refresh:

- what a kit is in this repo
- what a domain-service kit is
- when to adopt a public NexusRealtime or ProtoKit capability
- when to create a local HorrorCorridor ProtoKit
- how kit work should move from preview to smoke to live-player proof

## Inputs

- `.agent/start-here.md`
- `.agent/workflow.md`
- `.agent/intention.md`
- `.agent/memory.md`
- `.agent/goal.md`
- `.agent/feedback.md`
- `memory.md`
- `HorrorCorridor-Harness/domain-service-kit-source.json`

## Outputs

- `docs/HorrorCorridor-Harness-Guide.md`
- `docs/HorrorCorridor-Harness-Manifest.json`

## Command

```bash
cd /Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1 && npm run harness:horror-corridor
```

## Linear Flow

1. Read the repo control files.
2. Load the conversation-derived kit/domain vocabulary source.
3. Render the repo guide and manifest into `docs/`.
4. Stop and let the next implementation batch use those repo-owned docs.

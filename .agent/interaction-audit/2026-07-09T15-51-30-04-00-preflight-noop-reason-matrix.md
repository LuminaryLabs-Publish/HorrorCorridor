# HorrorCorridor Interaction Audit: Preflight No-op Reason Matrix

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T15-51-30-04-00`

## Current interaction derivation

`GameCanvas.tsx` derives the interaction action from two browser/runtime facts:

```txt
distanceToEnd < 6
hasCarriedCube
```

Then it chooses:

```txt
near anomaly + carrying      -> place-cube-at-anomaly
near anomaly + not carrying  -> remove-cube-from-anomaly
away from anomaly + carrying -> drop-cube
away from anomaly + no carry -> pickup-cube
```

## Current no-op/rejection ambiguity

`interactionRules.ts` contains legitimate no-op/rejection branches but returns only the original `GameState`. That makes browser behavior playable but fixture evidence incomplete.

## Preflight matrix required

```txt
pickup-cube
  ready?                  rejected:not-playing
  player exists?          rejected:missing-player
  already carrying?       rejected:already-carrying
  loose active cube near?  rejected:no-nearby-cube
  accepted branch         accepted:pickup

drop-cube
  ready?                  rejected:not-playing
  player exists?          rejected:missing-player
  carrying cube?          rejected:no-carried-cube
  accepted branch         accepted:drop

place-cube-at-anomaly
  ready?                  rejected:not-playing
  player exists?          rejected:missing-player
  carrying cube?          rejected:no-carried-cube
  anomaly cell exists?    rejected:missing-anomaly-cell
  near anomaly?           rejected:too-far-from-anomaly
  free target slot?       rejected:no-free-slot
  accepted branch         accepted:place
  final solved branch     victory:ordered-sequence-complete

remove-cube-from-anomaly
  ready?                  rejected:not-playing
  player exists?          rejected:missing-player
  already carrying?       rejected:already-carrying
  anomaly cell exists?    rejected:missing-anomaly-cell
  near anomaly?           rejected:too-far-from-anomaly
  occupied slot exists?   rejected:no-occupied-slot
  requested slot matches? rejected:wrong-slot
  cube id exists?         rejected:missing-cube-id
  accepted branch         accepted:remove
```

## Network action matrix required

```txt
player update
  player exists?          unchanged:player-missing
  pose changed?           accepted:player-update or unchanged:no-state-diff

held cube sync
  cube position changed?  accepted:held-cube-sync or unchanged:held-cube-already-synced

request-sync
  explicit policy         publish-only:request-sync

toggle-ready
  explicit policy         skipped:toggle-ready-policy-not-implemented

cancel
  explicit policy         skipped:cancel-policy-not-implemented

unknown/default
  explicit policy         skipped:unknown-action
```

## Interaction-kit responsibilities

```txt
interaction-preflight-kit
  -> pure input inspection
  -> reason selection
  -> no mutation

interaction-result-rules-kit
  -> applies existing mutation when preflight passes
  -> wraps legacy state in CommandResult
  -> preserves old exports

network-result-rules-kit
  -> applies player update and network interaction commands
  -> records request-sync/toggle-ready/cancel/default policy explicitly
```

## Acceptance rule

Every interaction branch that currently returns `state` unchanged must have a stable reason before it is wired into runtime debug projection.

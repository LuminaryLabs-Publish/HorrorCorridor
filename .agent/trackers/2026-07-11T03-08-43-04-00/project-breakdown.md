# HorrorCorridor Project Breakdown

**Timestamp:** `2026-07-11T03-08-43-04-00`

## Goal

Document the active client-prediction and host-publication path, identify every movement authority gap, and route the next implementation through deterministic movement-admission and reconciliation fixtures.

## Checklist

- [x] Compare the complete accessible Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `HorrorCorridor` as the oldest current eligible root audit.
- [x] Read current root `.agent` state.
- [x] Read `GameCanvas.tsx`, `networkRules.ts` and `syncSnapshot.ts`.
- [x] Identify the interaction loop.
- [x] Identify active domains.
- [x] Identify all implemented kits and their services.
- [x] Trace client sequence and pose publication.
- [x] Trace host player-update consumption and snapshot publication.
- [x] Trace active client pose handling and non-playing snapshot replay.
- [x] Define candidate movement authority and reconciliation kits.
- [x] Add architecture, render, gameplay, interaction, movement-authority and deploy audits.
- [x] Refresh root audit files and kit registry.
- [x] Change no runtime source.
- [x] Create no branch or pull request.
- [x] Push directly to `main`.

## Selection result

All nine eligible non-Cavalry Publish repositories were already tracked and had root `.agent` state. `TheOpenAbove` had a newer repo-local audit at `2026-07-11T03-01-38-04-00`. `HorrorCorridor` was therefore the oldest current eligible root audit at `2026-07-11T01-10-28-04-00`.

## Interaction loop

```txt
client predicts local movement
  -> PLAYER_UPDATE sends sequence, input and completed pose
  -> host copies payload.playerId pose
  -> host publishes authoritative SYNC
  -> client renders snapshot
  -> active client keeps advancing local poseRef
  -> host pose applies only when simulation is not advancing
```

## Main finding

`PLAYER_UPDATE` exposes the data needed for ordered input authority, but the host ignores the input sequence and movement input. It trusts the claimed player id and pose, mutates state verbatim, and republishes it. The active client does not reconcile to the host pose, so the system is simultaneously client-authoritative during admission and non-convergent during correction.

## Current source-backed kit count

```txt
implemented kit responsibilities: 24
new movement-authority candidate kits: 14
```

## Next implementation gate

```txt
HorrorCorridor Host Movement Admission
+ Client Reconciliation Fixture Gate
```

This gate remains ordered after run-session identity, message admission and snapshot acceptance.

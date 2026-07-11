# Unbound Actor Projection Gap

**Timestamp:** `2026-07-11T07-30-40-04-00`

## Plan ledger

**Goal:** ensure world, minimap, HUD and debug output only project state produced by a transport-bound admitted actor.

- [x] Trace inbound player identity into snapshot publication.
- [x] Trace snapshots into world, minimap and debug projection.
- [x] Identify missing actor provenance and consumption proof.
- [ ] Add actor-bound snapshot rows and render-consumption results.

## Current render path

```txt
unverified payload.playerId
  -> player pose or interaction mutation
  -> host publishes authoritative snapshot
  -> world.update(snapshot)
  -> minimap draws snapshot markers
  -> HUD reads runtime stores
  -> debug frame records resulting player state
  -> post-processing presents the frame
```

## Gap

Render consumers receive a normal authoritative snapshot after the host accepts an unbound command. They cannot distinguish a legitimate connection-owned mutation from an impersonated or stale actor claim.

Missing render/readback identity:

```txt
acceptedCommandId
connectionId
remotePeerId
boundMemberId
boundPlayerId
admissionResultId
publishedTick
committedFrameId
worldConsumptionAck
minimapConsumptionAck
```

## Required guarantee

Every projected remote-player change must be traceable to one accepted actor-bound command. Rejected identity claims must produce no player movement, cube transition, minimap change or committed frame mutation.
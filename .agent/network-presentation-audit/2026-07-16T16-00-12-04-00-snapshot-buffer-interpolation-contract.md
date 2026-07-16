# Snapshot Buffer Interpolation Contract

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

HorrorCorridor needs a presentation-only buffer that converts accepted authoritative pose samples into one stable remote-actor pose set per visible frame.

## Intent

Define the minimum semantic contract without coupling transport, gameplay truth or render providers.

## Contract

```txt
RemoteActorHistory {
  sessionRevision
  actorId
  actorRevision
  samples[]
  lastAcceptedTick
  lastAcceptedHostTimeMs
  lastReceivedAtMs
  retirementState
}
```

Each sample contains:

```txt
authoritativeTick
hostTimestampMs
receivedAtMs
position
rotationY
pitch
```

## Admission rules

1. Validate finite pose values.
2. Match the active session and actor generation.
3. Reject duplicate or older authoritative ticks.
4. Record host and receive time separately.
5. Detect teleport-sized discontinuities before normal interpolation.
6. Keep a fixed-capacity history.
7. Retire history when the authoritative actor disappears.

## Projection rules

1. Resolve `presentationTime = frameTime - interpolationDelay`.
2. Select the samples surrounding presentation time.
3. Interpolate position and pitch linearly.
4. Interpolate yaw on the shortest angular arc.
5. Apply a teleport immediately and clear incompatible history.
6. Permit extrapolation only within explicit time and distance budgets.
7. Freeze at the last accepted pose after the budget expires.
8. Return one immutable pose set to every visual consumer.

## Default-policy questions requiring fixtures

- Fixed versus cadence-adaptive interpolation delay.
- Maximum history capacity.
- Teleport distance and tick-gap thresholds.
- Extrapolation time and distance limits.
- Whether a recovering late sample blends or snaps after freeze.

## Provider boundary

```txt
network and protocol
  -> supply authoritative evidence

remote actor projection domain
  -> owns presentation-time interpretation

Three.js and Canvas2D
  -> consume projected poses only
```

## Claim boundary

This file defines proposed authority. It does not select production tuning values or claim implementation.
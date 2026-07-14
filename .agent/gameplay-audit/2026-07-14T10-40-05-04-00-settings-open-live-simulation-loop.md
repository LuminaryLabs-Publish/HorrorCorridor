# Settings Open Live Simulation Loop

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

Settings visibility is not part of the simulation-admission predicate. Because the frame loop advances whenever the UI screen is `PLAYING`, opening Settings through `Q` leaves authoritative solo/host simulation or client prediction active.

## Plan ledger

**Goal:** make settings entry suspend gameplay work without conflating it with network/session retirement.

- [x] Trace keyboard admission.
- [x] Trace local and client simulation predicates.
- [x] Trace interaction and publication paths.
- [x] Define the desired suspension boundary.
- [ ] Implement and fault-test it.

## Current loop

```txt
Q keydown
  -> toggle settings overlay
  -> no screen transition
  -> no input clear
  -> no pointer-lock release

next RAF
  -> screen is still PLAYING
  -> solo/host advances movement and publishes snapshots
     or client advances prediction and sends updates
  -> interaction keys remain admitted
  -> world renders behind overlay
```

## Gameplay risk

```txt
held W before opening settings
  -> movement can continue

E while settings is visible
  -> interaction can still run

mouse movement while pointer locked
  -> look deltas can still accumulate

client settings session
  -> player updates can continue reaching host
```

## Required policy

Settings must suspend player-originated gameplay input and local prediction while preserving passive receipt of authoritative network state. Closing must require a fresh pointer-lock gesture and must not replay held keys from before the overlay opened.

## Validation boundary

Source inspection only. No claim is made that a specific unintended movement occurred in a browser run.
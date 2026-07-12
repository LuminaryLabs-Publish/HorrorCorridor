# HorrorCorridor Debug Activation / Puzzle Disclosure Loop

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Document how the current debug surface can collapse the intended exploration and ordered-color puzzle loop.

## Intended gameplay loop

```txt
enter procedural corridor
  -> explore the maze
  -> locate colored cubes
  -> carry one cube at a time
  -> discover the end anomaly
  -> infer and complete the ordered sequence
  -> avoid rising ooze pressure
  -> reach victory
```

## Current debug-assisted loop

```txt
enter runtime
  -> press Backquote or use ?debug=frames
  -> read complete anomaly color order
  -> read every cube color and world position
  -> use local exact position and heading to route directly
  -> monitor owners, slots and state changes
  -> bypass discovery and uncertainty
```

## Source-backed disclosure

The frame record includes:

```txt
anomaly.sequence
anomaly.slots
cubes[].id
cubes[].color
cubes[].state
cubes[].ownerId
cubes[].position
localPose.position
localPose.rotationY
```

The visible panel formats and prints both the anomaly sequence and cube records. The same information is available through the public extraction API.

## Main finding

The product has no policy distinction between:

```txt
operational diagnostics needed to verify performance
and
gameplay-privileged state that solves the experience
```

A bounded logger can still invalidate gameplay when the retained fields are privileged and activation is public.

## Multiplayer impact

```txt
one client activates privileged debug
  -> sees target order and object positions
  -> can direct other players
  -> no host-visible capability or audit receipt exists
  -> no role restriction or session policy can reject the advantage
```

The current debug state is local, but the disclosed authoritative snapshot content can affect cooperative decision-making.

## Required gameplay-safe policy

```txt
player-safe tier:
  cadence, readiness, render quality and coarse non-spoiler status

QA tier:
  selected object/state diagnostics under explicit preview policy

 developer tier:
  complete state only in local development or an explicitly admitted private environment
```

## Required guarantees

```txt
public players cannot reveal anomaly order through debug controls
public players cannot reveal cube coordinates or ownership through export
capability status is explicit and session-scoped
privileged QA/developer use is visible in diagnostics/journal evidence
revocation removes retained privileged history
```

## Fixture scenarios

```txt
public solo run + Backquote
public hosted run + debug query
public client + persisted debug localStorage
QA preview with player-safe tier
QA preview with privileged lease
runtime restart and session replacement
```
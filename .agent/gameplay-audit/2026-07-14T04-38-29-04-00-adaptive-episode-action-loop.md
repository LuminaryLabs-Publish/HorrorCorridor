# Gameplay Audit: Adaptive Episode Action Loop

**Timestamp:** `2026-07-14T04-38-29-04-00`

## Summary

The recurring runner chooses the next movement profile from the prior episode’s gates. This creates a useful adaptive smoke loop, but each episode is independent and lacks a sealed repository, server, browser, seed and starting-state identity, so cross-episode comparisons are not controlled experiments.

## Plan ledger

**Goal:** retain adaptive movement exploration while making every episode reproducible and comparable.

- [x] Trace action-profile selection.
- [x] Trace playable-run admission and movement execution.
- [x] Identify uncontrolled episode inputs.
- [ ] Bind actions to immutable starting-state and environment evidence.

## Current loop

```txt
no prior episodes
  -> forward

movement gate failed
  -> alternate forward/backward

luminance gate failed
  -> rotate through directional sweep

otherwise
  -> cycle forward, strafe-left, strafe-right,
     forward-left, forward-right, backward
```

## Comparison gaps

```txt
run seed identity in episode manifest: absent
starting snapshot fingerprint: absent
starting player pose fingerprint: absent
browser and renderer generation continuity: absent
server and source revision continuity: absent
action command ID: absent
input-down and input-up acknowledgement: absent
simulation ticks during action: absent
movement result tied to authoritative snapshot: absent
failed episode quarantine policy: absent
```

## Required episode command

```txt
ActionProfileCommand {
  episodeId
  expectedRepositoryRevision
  expectedServerGeneration
  expectedPageGeneration
  expectedStartFrameId
  expectedStartSnapshotRevision
  profile
  durationMs
  inputPolicyRevision
}
```

## Required result

```txt
ActionProfileResult {
  status
  commandId
  admittedAtFrameId
  releasedAtFrameId
  simulationTicks
  startPose
  endPose
  authoritativeSnapshotRevision
  movementDelta
  diagnostics
}
```

## Validation boundary

No episode was executed. The current action loop is documented, not validated or changed.

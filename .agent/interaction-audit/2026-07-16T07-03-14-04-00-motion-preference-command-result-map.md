# Motion Preference Command Result Map

**Timestamp:** `2026-07-16T07-03-14-04-00`

## Summary

The browser capability, product override and active frame currently have no typed transaction connecting them.

## Plan ledger

**Goal:** make preference changes explicit, revisioned and observable without coupling them to gameplay commands.

- [x] Define admission inputs.
- [x] Define accepted, unchanged, rejected and retired results.
- [x] Define frame acknowledgement.
- [ ] Implement browser and route lifecycle adapters.

## Command path

```txt
OS media-query evidence or product override
  -> MotionPreferenceAdmissionCommand
  -> validate document route and policy revisions
  -> resolve normal or reduced profile
  -> classify essential and ornamental producers
  -> publish MotionProjectionResult
  -> renderer consumes accepted profile
  -> publish FirstReducedMotionGameplayFrameAck
```

## Result classes

```txt
accepted
  new preference revision committed

unchanged
  evidence matches active preference and emits no duplicate policy work

rejected
  stale document route or policy generation

retired
  route/runtime ended before the profile reached a visible frame
```

## Live-change rule

A media-query or override change must atomically replace the active motion profile. Old callbacks may finish their current frame but may not publish a later acknowledgement for the retired profile.

## Interaction invariant

Pointer lock, keyboard state, movement, interaction requests and network publication do not depend on the selected motion profile.
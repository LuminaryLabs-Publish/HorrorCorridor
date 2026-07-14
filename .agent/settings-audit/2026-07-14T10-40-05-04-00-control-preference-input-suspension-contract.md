# Control Preference and Input Suspension Contract

**Timestamp:** `2026-07-14T10-40-05-04-00`

## Summary

The current surface documents controls but stores no settings. This contract separates overlay lifecycle from typed preference adoption and makes input suspension mandatory while the overlay owns interaction.

## Plan ledger

**Goal:** establish a small, deterministic settings contract that can be implemented without restructuring the game domains.

- [x] Separate open/close lifecycle from apply semantics.
- [x] Define candidate preferences and ownership.
- [x] Define rollback and re-entry behavior.
- [ ] Implement the contract.

## Candidate preference schema

```txt
SettingsCandidate
  lookSensitivity
  invertY
  reducedCameraShake
  bloomEnabled or bloomStrength
  minimapEnabled
  debugOverlayAllowed
  keyBindingProfile
  accessibilityTextScale
```

Only preferences backed by actual consumers should be admitted. The static control map must not imply unsupported mutability.

## Ownership contract

```txt
Open
  allocate SettingsSessionId
  snapshot predecessor UI/input/pointer state
  clear movement/look/interact state
  release pointer lock
  suspend local gameplay commands
  retain passive network state receipt

Apply
  validate range and capability support
  prepare camera, input, render, UI, and persistence candidates
  commit one SettingsRevision
  publish participant receipts
  acknowledge matching visible frame

Close
  retire focus trap and overlay
  restore screen policy
  retain cleared input state
  require new pointer-lock gesture
  reject late keyup/keydown from predecessor generation
```

## Failure and rollback

```txt
invalid candidate -> preserve accepted revision
consumer failure -> restore all predecessor consumers
persistence failure -> report degraded or roll back by declared policy
stale session -> reject without mutation
route exit -> retire settings session before runtime cleanup
```

## Validation boundary

Planned contract only. No preference is currently implemented or persisted.
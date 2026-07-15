# Architecture Audit: Device-Control Action Coverage DSK Map

**Timestamp:** `2026-07-15T02-00-17-04-00`

## Summary

The existing `first-person-input-kit` provides a sound renderer-independent normalized state, but browser producer ownership is implicit and desktop-only. The required change is a coordinating domain around the existing input kit, not a replacement movement implementation.

## Plan ledger

**Goal:** map current ownership and define the smallest semantic authority that admits complete device profiles.

- [x] Map browser event producers.
- [x] Map normalized input state.
- [x] Map gameplay consumers.
- [x] Map visible control projection.
- [x] Define parent domain and sub-surfaces.
- [ ] Implement without bypassing the existing input model.

## Current DSK map

```txt
GameCanvas browser host
  -> window keydown/keyup
  -> document mousemove
  -> document pointerlockchange
  -> first-person-input-kit
  -> PlayerInputState
  -> movement-collision-camera-kit
  -> corridor-interaction-domain-kit
  -> network-player-update-kit
  -> render and publication

PointerLockGate
  -> capture/release buttons
  -> desktop instructions
  -> no complete touch action surface
```

## Required parent domain

```txt
corridor-device-control-action-coverage-authority-domain
```

## Planned surfaces

```txt
device-capability-snapshot-kit
control-profile-descriptor-kit
required-action-set-manifest-kit
control-generation-identity-kit
keyboard-control-profile-kit
pointer-lock-mouse-profile-kit
touch-movement-surface-kit
touch-look-surface-kit
touch-interact-surface-kit
touch-pause-surface-kit
pointer-capture-ownership-kit
gesture-dead-zone-policy-kit
look-sensitivity-policy-kit
hybrid-input-arbitration-kit
duplicate-action-suppression-kit
held-action-retirement-kit
semantic-control-projection-kit
device-control-admission-result-kit
first-device-control-surface-frame-ack-kit
first-device-action-effect-frame-ack-kit
device-control-fixture-parity-kit
```

## Dependency rule

```txt
browser producers
  -> device-control authority
  -> existing PlayerInputState
  -> existing movement and interaction consumers
```

Never let touch controls mutate player pose, camera or interaction state directly.

## Admission contract

```txt
DeviceControlAdmissionCommand
  -> resolve capabilities and viewport
  -> choose one or more compatible profiles
  -> verify complete action coverage
  -> establish producer ownership
  -> publish controls
  -> admit input generation
  -> acknowledge the visible control surface
```

## Retirement contract

```txt
blur | visibility loss | pointercancel | route exit | profile replacement
  -> retire producer generation
  -> clear held movement and action buttons
  -> release captured pointers
  -> publish retirement result
```

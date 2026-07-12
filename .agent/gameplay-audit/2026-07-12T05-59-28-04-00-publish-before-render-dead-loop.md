# HorrorCorridor Publish-Before-Render Dead-Loop Audit

**Timestamp:** `2026-07-12T05-59-28-04-00`

## Summary

Authoritative and predicted gameplay effects can escape the local frame before the visible render succeeds. Host snapshots are published before world/minimap/post-processing completion, and client movement can be sent before the client proves its own frame.

## Plan ledger

**Goal:** prevent a failed local frame from leaving peers, host state, client prediction and visible presentation on different committed revisions.

- [x] Trace host/solo simulation ordering.
- [x] Trace client prediction and send ordering.
- [x] Trace authoritative snapshot publication.
- [x] Trace render ordering after gameplay mutation.
- [x] Identify divergent host and client failure paths.
- [x] Define commit and quarantine requirements.
- [ ] Implement and validate the transaction.

## Host and solo path

```txt
advance local pose
  -> apply player update to current game state
  -> synchronize held cubes
  -> optionally advance ooze
  -> build and publish authoritative snapshot
  -> broadcast SYNC to peers
  -> project runtime stores
  -> attempt visible render
```

If rendering throws after publication:

```txt
peer state: current
runtime authoritative snapshot: current
local pose/store: current
host visible canvas: previous or partial
host loop: dead
listeners and transport: live
```

## Client path

```txt
advance predicted pose
  -> optionally send PLAYER_UPDATE
  -> project runtime stores
  -> attempt visible render
```

If rendering throws after the send:

```txt
host may accept movement
client local store: current
client canvas: previous or partial
client loop: dead
transport and input listeners: live
```

## Missing gameplay authority

```txt
frame-scoped simulation proposal
frame-scoped publication proposal
publication-after-visible policy
rollback or compensation policy
partial-frame gameplay classification
failed-frame input quarantine
failed-frame transport quarantine
terminal runtime state
replacement runtime generation
```

## Required policy

The architecture must choose and document one policy:

```txt
Policy A: render-gated publication
  stage simulation and presentation
  commit publication only after mandatory visible-frame success

Policy B: authoritative-first publication
  publish gameplay state before render
  classify local render failure as presentation-terminal
  keep simulation ownership only in a separate headless authority
  revoke browser input/render mutators

Current behavior is neither policy because simulation, publication, rendering and lifecycle remain one browser closure without typed separation.
```

## Required proof

```txt
host render fault cannot silently leave an active mutation-capable dead loop
client render fault cannot continue accepting local input against a stale canvas
published snapshots cite the frame or simulation transaction that produced them
failure records whether publication escaped before the fault
replacement runtime cannot replay or duplicate escaped commands
terminal failure is visible to the user and diagnostics
```
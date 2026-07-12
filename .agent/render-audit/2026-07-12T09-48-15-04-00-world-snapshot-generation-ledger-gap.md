# World/Snapshot Generation Ledger Gap

**Timestamp:** `2026-07-12T09-48-15-04-00`

## Summary

`GameCanvas` builds maze topology and retained Three.js resources from the first authoritative snapshot accepted by its local `initialized` guard. Later snapshots continue to drive state projection, but neither the world nor the snapshot carries a shared loading/run generation that can prove topology parity.

## Current flow

```txt
snapshot A becomes available
  -> initializeRuntime(A)
  -> initialized = true
  -> buildMazeResultFromSnapshot(A)
  -> buildMazeWorld(A)

later snapshot B
  -> runtime store accepts B
  -> initializeRuntime(B) returns because initialized is true
  -> retained world remains A
  -> gameplay/readback may use B
```

## Missing render authority

```txt
loading generation on snapshot
run generation on world resources
world descriptor fingerprint
snapshot topology fingerprint
world/snapshot compatibility admission
stale-bootstrap rejection
world replacement transaction
first visible frame receipt
last-known-good frame policy for rejected replacement
```

## Required result

```txt
WorldGenerationAdmissionResult {
  loadingGeneration
  runGeneration
  snapshotFingerprint
  worldFingerprint
  status: accepted | unchanged | stale | incompatible | failed
  replacementReceipt
  firstFrameReceipt
}
```

A visible frame must not combine authoritative state from one run generation with retained geometry from another.

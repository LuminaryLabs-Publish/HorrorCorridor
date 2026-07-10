# HorrorCorridor Known Gaps

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T18-31-21-04-00`

## Selection state

```txt
full accessible LuminaryLabs-Publish list compared with central ledger
all nine eligible non-Cavalry repos tracked
root .agent state present for every eligible repo
TheCavalryOfRome excluded
HorrorCorridor selected as oldest eligible documented fallback
```

## Snapshot envelope preflight gaps

```txt
no protocol-version acceptance policy
no host sender identity check
no envelope roomId / payload roomId / snapshot roomId agreement check
no gameId continuity check
no seed continuity check
no authoritativeTick / snapshot.tick consistency check
no malformed snapshot result type
```

## Monotonicity and replay gaps

```txt
no last accepted authoritative tick ledger
no stale snapshot rejection
no out-of-order snapshot rejection
no duplicate snapshot classification
no conflicting duplicate detection
no authority or session epoch for legitimate tick reset
no reconnect/recovery acceptance policy
no accepted snapshot fingerprint
```

## Projection gaps

```txt
GameShell applies room, lobby players, snapshot, readiness, and UI through separate setters
no atomic snapshot projection transaction
runtimeStore setAuthoritativeSnapshot replaces state unconditionally
no accepted/rejected result returned to the transport consumer
no stale-snapshot guard around COMPLETED -> PLAYING regression
no stale-snapshot guard around cubes, ooze, anomaly, or player rewind
GameCanvas reads whichever snapshot was most recently stored as interaction reference state
```

## Request acknowledgement integration gaps

```txt
request identity and acknowledgement remain unimplemented
an acknowledgement linked to a stale or rejected snapshot would be ambiguous
no rule states whether a rejected snapshot may resolve a pending request
no accepted snapshot tick ledger is available to join with request acknowledgements
no-publish acknowledgement remains required independently of snapshot acceptance
```

## Runtime debug gaps

```txt
no snapshot candidate row
no previous accepted tick or candidate tick comparison
no acceptance status or reject reason
no source host, room, game, seed, or epoch readback
no stale, duplicate, conflicting, or wrong-source counters
no accepted snapshot fingerprint
no UI projection commit correlation
```

## Missing source files

```txt
HorrorCorridor-V1/src/features/networking/protocol/protocolEnvelopePreflight.ts
HorrorCorridor-V1/src/features/networking/protocol/authoritySourceIdentity.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotAcceptanceTypes.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotAcceptancePolicy.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotAcceptanceLedger.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotProjectionTransaction.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugSnapshotProjection.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotAcceptanceFixtureSeeds.ts
HorrorCorridor-V1/src/features/game-state/domain/snapshotAcceptanceFixtureRows.ts
HorrorCorridor-V1/scripts/horror-corridor-snapshot-acceptance-fixture.mjs
```

## Validation gaps

```txt
package.json has no fixture:snapshot-acceptance script
no DOM-free snapshot acceptance fixture exists
no fixture proves stale or out-of-order rejection
no fixture proves duplicate idempotency or conflicting duplicate rejection
no fixture proves wrong-room, wrong-host, wrong-version, or tick-mismatch rejection
no fixture proves reconnect/recovery epoch behavior
no fixture proves victory cannot rewind to playing
no fixture proves runtime-debug acceptance projection
```

## Deferred work

```txt
PeerJS extraction
renderer extraction
minimap extraction
post-processing extraction
route restructuring
new maze content
scene-dressing expansion
visual object-kit expansion
cadence retuning
gameplay balance changes
```
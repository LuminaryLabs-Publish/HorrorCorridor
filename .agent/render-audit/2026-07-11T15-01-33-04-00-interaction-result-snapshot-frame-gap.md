# Render Audit: Interaction Result, Snapshot and Frame Gap

**Timestamp:** `2026-07-11T15-01-33-04-00`

## Plan ledger

**Goal:** prove that the world, minimap, HUD and debug projection display the same admitted interaction result and authoritative snapshot revision.

- [x] Trace interaction mutation into authoritative snapshot publication.
- [x] Trace snapshot consumption by world, minimap and debug frame capture.
- [x] Identify missing command/result and frame identities.
- [x] Define required consumer acknowledgements and fixture cases.

## Current render path

```txt
interaction request
  -> host mutation or silent no-op
  -> publishAuthoritativeState
  -> latestHostSnapshot / runtime store
  -> world.update(snapshot)
  -> drawMinimapFrame(snapshot)
  -> recordRuntimeDebugFrame(snapshot)
  -> postProcessing.render()
```

## Gap

The replicated snapshot carries cube and anomaly state, but it does not identify the interaction command or typed result that produced it. Debug frames record a local frame number and snapshot tick, yet no interaction result ID, target revision, ownership revision or consumer acknowledgement is attached.

```txt
command-to-snapshot correlation: absent
result-to-snapshot correlation: absent
snapshot-to-world acknowledgement: absent
snapshot-to-minimap acknowledgement: absent
snapshot-to-HUD acknowledgement: absent
first accepted interaction frame: absent
rejected interaction projection: absent
```

## Divergence cases

```txt
accepted host mutation
  -> snapshot changes
  -> client eventually sees new object state
  -> no proof that every consumer rendered the same revision

silent rejection/no-op
  -> remote host may publish another snapshot
  -> client cannot distinguish rejection from delayed acceptance

contention target substitution
  -> different cube or slot mutates
  -> render truthfully shows host state
  -> render does not reveal that accepted target differed from observed intent
```

## Required frame contract

```txt
InteractionResult
  -> authoritativeSnapshotRevision
  -> RenderInteractionPlan
  -> world acknowledgement
  -> minimap acknowledgement
  -> HUD acknowledgement
  -> debug acknowledgement
  -> firstInteractionFrameReceipt
```

The receipt should include:

```txt
runtimeSessionId
runSessionId
sessionEpoch
interactionCommandId
interactionResultId
targetKind and targetId
targetRevision
authoritativeSnapshotRevision
renderFrameId
consumer acknowledgement rows
state fingerprint
```

## Required fixtures

```txt
accepted pickup appears in world and minimap on one correlated frame
accepted placement appears in anomaly, HUD and debug on one correlated frame
rejection publishes a typed result without a false success frame
duplicate result does not create another visible transition
stale target does not cause a substitute-target frame
cross-epoch acknowledgement cannot complete a current result
```

## Validation boundary

No renderer, minimap, HUD, debug store or runtime source changed in this pass. Browser and visual fixtures were not run.

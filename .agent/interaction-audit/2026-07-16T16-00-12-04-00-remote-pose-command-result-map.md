# Remote Pose Command / Result Map

**Timestamp:** `2026-07-16T16-00-12-04-00`

## Summary

Remote pose evidence currently flows from accepted SYNC snapshots directly into render consumers. The missing command/result layer should admit samples once, project them once per frame and expose matching consumer receipts.

## Intent

Make sample acceptance, visual projection and actor retirement explicit without changing protocol or gameplay authority.

## Command map

```txt
RemoteActorSampleAdmissionCommand {
  sessionRevision
  snapshotRevision
  authoritativeTick
  hostTimestampMs
  receivedAtMs
  actors[]
}
  -> RemoteActorSampleAdmissionResult {
       acceptedActorIds[]
       duplicateActorIds[]
       staleActorIds[]
       teleportedActorIds[]
       retiredActorIds[]
       historyRevision
     }

RemoteActorProjectionCommand {
  sessionRevision
  historyRevision
  frameRevision
  frameTimeMs
  interpolationPolicyRevision
}
  -> RemoteActorProjectionResult {
       projectionRevision
       presentationTimeMs
       actorPoses[]
       extrapolatedActorIds[]
       frozenActorIds[]
     }

RemoteActorRetirementCommand {
  sessionRevision
  actorId
  reason
}
  -> RemoteActorRetirementResult {
       actorId
       retiredHistoryRevision
       meshRetired
       minimapMarkerRetired
     }
```

## Consumer receipts

```txt
ThreeRemoteActorProjectionReceipt
MinimapRemoteActorProjectionReceipt
  -> same projectionRevision
  -> FirstSmoothedMultiplayerFrameAck
```

## Rejection reasons

- Wrong session generation.
- Older authoritative tick.
- Duplicate actor sample.
- Actor already retired.
- Invalid or non-finite pose.
- Projection requested from retired history.
- Consumer receipt references a stale projection revision.

## Interaction boundary

Projected poses are visual only. Pickup, drop, placement, anomaly interaction, collision and victory continue to evaluate authoritative state.

## Validation boundary

These command/result types are proposed documentation. No runtime exports, event bus entries or executable fixtures exist yet.
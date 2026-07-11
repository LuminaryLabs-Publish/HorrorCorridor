# Interaction Audit: Disconnect and Reconnect Command Admission Map

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Current ingress

```txt
transport close event
  -> remotePeerId and connectionId
  -> direct lobby mutation
```

No command envelope connects the event to a canonical actor, run, epoch or observed membership revision.

## Required DisconnectCommand

```txt
commandId
connectionId
remotePeerId
actorId
roomId
runSessionId
sessionEpoch
observedMembershipRevision
cause
observedAtMs
```

## Required admission

```txt
connection is current and bound to actor
actor belongs to current run and epoch
membership revision is current
close has not already produced a result
actor is not already retired
cause policy is supported
```

## Required ReconnectClaim

```txt
claimId
newConnectionId
peerId
actorId
runSessionId
sessionEpoch
suspendedMembershipRevision
claimProof
```

## Required rejection cases

```txt
unknown connection
sender/actor mismatch
duplicate close
stale close
cross-epoch close
actor already retired
wrong reconnect actor
actor already live
expired suspension
ownership revision conflict
```

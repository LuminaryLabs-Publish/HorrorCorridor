# Connection Attempt and Path Admission Map

## Summary

The current client `connectToHost()` result is a boolean meaning that a path was initiated, not that a host was reached. The local bridge branch converts that initiation into `connected` immediately.

## Plan ledger

**Goal:** replace implicit boolean connection attempts with typed commands, acknowledgements and path-admission results.

- [x] Map connect, status and send paths.
- [x] Identify command/result ambiguity.
- [x] Define required interaction results.
- [ ] Implement and fixture the map.

## Current interaction map

```txt
Join action
  -> createClient
  -> connectToHost(joinCode)
  -> boolean true
  -> status connecting
  -> local packet post
  -> status connected
  -> no acknowledgement
```

## Required map

```txt
ConnectSessionCommand
  -> ConnectionAttemptStarted
  -> TransportCandidatePrepared
  -> HostHandshakeSent
  -> HostHandshakeAcknowledged | TimedOut | Rejected
  -> TransportPathAdmitted | FallbackStarted | Failed
  -> SessionConnectionCommitted
  -> FirstSessionMessageAccepted
  -> FirstRemotePlayerFrameAcknowledged
```

## Typed results

```txt
accepted
rejected
unreachable
timed-out
stale
superseded
fallback-started
fallback-committed
failed
cancelled
```

## Admission evidence

```txt
attempt ID
transport mode and revision
local and remote peer IDs
room ID and join code
host acknowledgement ID
connection/data-channel ID
fallback predecessor
first accepted message ID
visible-frame acknowledgement
```
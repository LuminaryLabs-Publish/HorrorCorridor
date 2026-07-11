# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T18-11-21-04-00`

## Primary ordered gaps

```txt
1. canonical lobby member, peer and gameplay-player identity
2. transport actor binding and message admission
3. sealed lobby start transaction and correlated initial SYNC
4. run exit, session epoch and late-message quarantine
5. runtime readiness leases and generation fencing
6. snapshot acceptance ordering and monotonic revision
7. explicit interaction targets and cube/slot claims
8. active-run disconnect, player retirement and reconnect claims
9. monotonic terminal outcome authority
10. host network cadence and fixed simulation authority
11. host movement admission and client reconciliation
12. snapshot delivery, payload budgeting and backpressure authority
13. replicated pause/resume convergence
```

## Snapshot construction gaps

```txt
publishAuthoritativeState builds a complete local replicated snapshot
createFullSyncMessage rebuilds the complete replicated snapshot
room state is cloned again into the SYNC payload
maze, players, cubes, anomaly and ooze are copied for every publication
no canonical one-build payload result
no payload schema revision beyond protocol version
no payload fingerprint
no serialized byte count
no maximum snapshot byte budget
no full-versus-delta selection policy
no dirty-field or dirty-entity set
```

## Delivery and backpressure gaps

```txt
HostTransportAdapter.broadcast returns only an integer
HostTransportAdapter.sendTo returns only a boolean
send admission checks only connection.open
connection.send is not wrapped in a typed attempt result
no intended peer set is captured
no sent/skipped/closed/failed/timed-out/backpressured rows
no pending buffered bytes observation
no send queue depth or oldest-age observation
no send duration or delivery-lag observation
no retry, coalesce, drop or timeout policy
no slow-peer isolation policy
no per-peer publication sequence baseline
no connection-specific payload budget
no exception classification or partial-success commit
publication caller discards the aggregate sent count
BroadcastChannel path increments sent without delivery acknowledgement
```

## Cadence amplification interaction

```txt
remote PLAYER_UPDATE
  -> direct state mutation
  -> full local snapshot clone
  -> full outbound snapshot clone
  -> complete JSON serialization
  -> all-peer fanout

P clients * U update-triggered publications/s
  -> approximately P * U full payload builds/s
  -> approximately P * P * U peer send attempts/s
```

## Frame-correlation gaps

```txt
no publication ID distinct from snapshot tick
no canonical payload fingerprint in debug state
no per-peer delivery completion revision
no accepted-client acknowledgement tied to a delivery row
no first visible frame tied to publication and payload identity
world, minimap, HUD and debug cannot prove which delivered payload they consumed
```

## Retained cadence gaps

```txt
client input sequence is generated but not admitted by host
no bounded per-player input queue or deterministic coalescing
remote movement directly triggers publication
lastNetworkTickAtMs aliases send, publication and ooze timing
continuous traffic can postpone ooze advancement
snapshot tick represents publication count rather than stable simulation steps
```

## Retained disconnect gaps

```txt
connection close mutates session/lobby state but not live GameState
retired/disconnected actors can remain in players, ooze inputs and snapshots
held cube ownership can reference a missing actor
no suspension, grace, retirement or reconnect claim result
```

## Required snapshot-delivery fixtures

```txt
fixture:snapshot-single-build
fixture:snapshot-payload-fingerprint
fixture:snapshot-payload-byte-budget
fixture:snapshot-full-delta-policy
fixture:delivery-intended-peer-set
fixture:delivery-all-open-peers
fixture:delivery-closed-peer
fixture:delivery-send-exception
fixture:delivery-partial-success
fixture:delivery-backpressured-peer
fixture:delivery-slow-peer-isolation
fixture:delivery-retry-coalescing-budget
fixture:delivery-publication-frame-correlation
fixture:browser-slow-peer-fanout
fixture:pages-slow-peer-fanout
```

## Required guarantees

```txt
one publication creates one canonical payload
payload size and fingerprint are known before send admission
publication cannot exceed configured byte, peer or time budgets silently
every intended peer receives one typed result row
one slow or failing peer cannot block healthy peers
partial success is committed and observable
retries and queued payloads remain bounded
stale payloads can be coalesced or superseded deterministically
delivery and rendered-frame evidence cite one committed state revision
```

# Loading Race Fixture Gate

**Timestamp:** `2026-07-12T09-38-46-04-00`

## Required deterministic fixtures

```txt
rapid repeated solo-start requests
rapid repeated host-start requests
new peer joins during host loading
peer leaves during host loading
readiness changes during host loading
return to title during loading
return to lobby during loading
component unmount during loading
transport replacement during loading
candidate bootstrap throws
START_GAME send fails
initial SYNC send fails
first visible frame fails
```

## Required assertions

```txt
only one generation commits
cancelled/stale generations mutate no live store
all RAF and timeout leases retire
sealed roster input is either current or rejected
START_GAME emitted once per committed run
initial SYNC emitted once per committed run
no partial session/runtime/UI commit survives failure
world, snapshot and run generations match
first frame receipt exists before READY
repeated tests leave no transport, callback or GPU leak
```

## Browser and Pages proof

A production-like browser fixture must exercise real timers, RAF, React unmount, PeerJS adapter seams and retained Three.js world creation. Static build success alone does not prove loading-race safety.

# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T07-30-40-04-00`

## Queue-head roster gaps

- Lobby members do not distinguish real peers from reserved slots.
- Peer, member and player identities are not canonically bound.
- Roster mutations have no revision, fingerprint or typed result.
- Reserved slots can enter gameplay bootstrap.

## Transport actor-binding gaps

- `PeerTransportEvent` exposes `remotePeerId` and `connectionId`, but host gameplay dispatch ignores both.
- The protocol envelope independently claims `senderId`.
- PLAYER_UPDATE and TRY_INTERACT independently claim `payload.playerId`.
- Structural decoding does not compare transport, envelope and payload identities.
- Envelope `roomId` is not admitted against the live host room before gameplay dispatch.
- There is no run-session or session-epoch field on current gameplay messages.
- PLAYER_UPDATE input sequence is not checked for monotonicity.
- Request IDs are not deduplicated.
- Unknown or retired connections have no shared rejection path.
- Duplicate active connections for one peer/player have no conflict policy.
- Reserved-slot or disconnected member claims have no admission policy.
- Host dispatch has no typed accepted, rejected, duplicate, stale or no-change result.
- Rejected actor claims have no bounded debug observation.

## Gameplay consequences

- A connected peer can claim another existing player ID in PLAYER_UPDATE.
- `applyNetworkPlayerUpdate()` replaces the selected player's position, rotation, pitch and velocity.
- Held cubes follow the selected player after the update.
- A peer can claim another player in TRY_INTERACT.
- Pickup, drop, place and remove actions can execute under the claimed identity.
- The host can publish the resulting mutation as an authoritative SYNC.

## Dependent gaps

- Lobby readiness and start requests are not routed through host actor admission.
- Run exit does not commit one session epoch transition.
- Snapshot acceptance lacks duplicate, stale and conflict policy.
- Remote movement lacks speed, collision and temporal validation.
- Active clients do not reconcile predicted pose to host pose.
- Pause and resume remain local projection rather than replicated authority.

## Render and readback gaps

- Snapshots do not identify the accepted actor-bound command that produced a player change.
- World, minimap, HUD and debug output cannot distinguish bound from unbound mutations.
- No committed frame ID correlates command result, published tick and projected frame.
- Rejected message counters and reasons are absent from host diagnostics.

## Validation gap

Current package commands do not prove:

```txt
connection-to-peer-to-player ownership
transport/envelope/payload identity consistency
wrong-room rejection
session/epoch admission
request deduplication
sequence ordering
connection retirement
duplicate connection conflict
no-publication on rejection
multi-peer impersonation resistance
actor-bound render projection
```

## Required guarantees

```txt
one active connection owns at most one admitted player
remotePeerId senderId and payload.playerId resolve to the same actor
wrong room session epoch or phase rejects before mutation
duplicate request and stale sequence never mutate
retired connection never regains authority from message claims
accepted command produces one terminal result
rejected command advances no gameplay tick
only accepted state changes are published and rendered
```
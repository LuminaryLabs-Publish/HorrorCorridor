# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T05-28-29-04-00`

## Queue-head roster gaps

- `LobbyPlayer` has no member kind, peer binding, slot identity or bootstrap-admission field.
- `makePlayer()` defaults every row to `connectionState: "connected"`.
- Add guest creates a synthetic connected-looking player rather than a reserved slot.
- Real peer arrival creates a second row because the placeholder ID does not match `remotePeerId`.
- Peer close removes only the real peer row and leaves synthetic rows untouched.
- Session roster mutation has no monotonic revision, fingerprint or typed result.
- Duplicate peer IDs and duplicate player IDs have no explicit rejection policy.
- Slot claim, release and disconnect are not atomic transactions.
- Reserved slots can be displayed as ready-capable participants.
- `createInitialGameState()` maps every roster row into an active gameplay player.
- Placeholder players can consume spawn offsets, colors, snapshot rows, avatars and minimap markers.
- World, minimap and debug output cannot prove that projected players are transport-owned.
- No deterministic roster identity, placeholder admission or peer-slot-claim fixture exists.

## Start-transaction gaps

- Client readiness mutates only local Zustand state.
- The host does not own readiness admission.
- The Start button is not guarded by roster policy.
- `startPlay()` has no duplicate-start fence while loading.
- The host commits local PLAYING state before correlated client publication.
- `START_GAME` and initial `SYNC` have no shared start transaction ID.
- Neither message proves a sealed roster revision or fingerprint.
- Clients can enter PLAYING from `SYNC` without matching `START_GAME`.
- No rollback restores the prior lobby observation after partial start failure.

## Dependent gaps

- Run exit does not commit one session epoch transition.
- Network messages are not admitted against run-session identity and epoch.
- Snapshot acceptance lacks duplicate, stale and conflict policy.
- Remote movement is not host validated.
- Active clients do not reconcile to host pose.
- Pause and resume remain local projection rather than replicated authority.

## Render and readback gaps

- Gameplay player descriptors omit member kind, peer ID and roster fingerprint.
- Reserved slots and real peers are indistinguishable after bootstrap.
- Minimap and world projection have no roster-consumption result.
- Debug state cannot expose unowned or duplicate player identities.
- No shared roster revision links lobby UI, bootstrap, snapshot, world and minimap.

## Validation gap

Current package commands prove build, lint, visual, ProtoKit and live-player surfaces, but none prove:

```txt
member-kind semantics
unique peer/player binding
reserved-slot exclusion
slot claim and release
disconnect ownership
roster revision and fingerprint ordering
sealed-roster bootstrap
placeholder-free world and minimap projection
correlated START_GAME and initial SYNC
```

## Required guarantees

```txt
reserved slots remain lobby-only
one peer binds to one member and one player
accepted mutations increment revision once
same semantic replay returns no-change
stale or conflicting revisions reject
bootstrap receives one immutable admitted roster
all gameplay player descriptors originate from admitted real members
world, minimap, snapshot and debug share the same roster fingerprint
```
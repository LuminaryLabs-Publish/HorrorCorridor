# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T03-18-44-04-00`

## Queue-head gaps

- Client readiness mutates only local Zustand state.
- The host does not own readiness admission or roster revision.
- Placeholder guests can be bootstrapped as active players.
- The Start button is not disabled or guarded by policy.
- `startPlay()` has no duplicate-start fence while loading.
- The host commits local PLAYING state before proving correlated client publication.
- `START_GAME` and initial `SYNC` have no shared start transaction ID.
- Neither message proves the sealed roster revision or fingerprint.
- Clients can enter PLAYING from `SYNC` without matching `START_GAME`.
- A lone `START_GAME` leaves the client in the lobby.
- No rollback contract restores lobby state after partial start failure.
- No immutable start receipt or bounded lobby authority ledger exists.
- No deterministic lobby-start fixture exists.

## Dependent gaps

- Run exit does not commit one session epoch transition.
- Network messages are not admitted against run-session identity and epoch.
- Snapshot acceptance lacks duplicate, stale and conflict policy.
- Remote movement is not host validated.
- Active clients do not reconcile to host pose.
- Pause and resume remain local projection rather than replicated authority.

## Validation gap

Current package commands prove build, lint, visual and live-player surfaces, but none prove ready propagation, roster sealing, double-start prevention, START_GAME/SYNC correlation, out-of-order handling or rollback.

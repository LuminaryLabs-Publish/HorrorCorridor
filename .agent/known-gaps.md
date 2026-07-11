# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T11-39-11-04-00`

## Queue-head identity gaps

- Lobby members do not yet distinguish every real peer, gameplay player and reserved slot through one canonical binding.
- Transport connection identity and protocol sender identity are not fully converged.
- Room, roster, run-session, epoch, request and sequence admission remain incomplete.

## Lobby start transaction gaps

- The lobby primary action is always enabled.
- Host start does not require connected transport state.
- Host start does not enforce an all-required-members-ready policy.
- Client primary action is labeled `Enter run` but toggles readiness.
- There is no typed start command, command ID or semantic start result.
- Start has no in-progress lock or cancellation policy.
- Room and roster revisions are not captured or sealed.
- The roster has no start-time fingerprint.
- Loading yields through frames and timers while roster and connection stores remain mutable.
- `startPlay()` does not revalidate role, room, transport, roster or readiness after loading.
- Bootstrap uses callback-captured `room` and `lobbyPlayers` values that can be stale.
- Reserved or disconnected rows can become gameplay players unless an earlier audit gate excludes them.
- The host commits active room, snapshot, UI and readiness before network publication.
- Host broadcast recipient counts are returned but ignored.
- START_GAME and initial SYNC do not share a mandatory start transaction ID.
- Start messages carry no run-session ID or session epoch.
- START_GAME alone leaves a client in a lobby/active-room split state.
- SYNC alone can enter PLAYING without correlated START_GAME admission.
- Clients do not acknowledge accepted or rejected start commits.
- The host has no retry, timeout, quorum or partial-start policy.
- Duplicate and conflicting start payloads have no explicit result policy.
- Late prior-run start messages cannot be rejected by epoch.

## Render and runtime consequences

- Host `GameCanvas` can mount before any client publication succeeds.
- A client can mount from an uncorrelated SYNC.
- The first gameplay frame has no start transaction, run session, epoch or roster fingerprint.
- Runtime readiness can be marked true before start publication or provider proof.
- Debug output cannot prove which start transaction produced a frame.

## Existing readiness gaps

- `RuntimeReadiness` remains four unconditional booleans.
- Readiness has no session ID, runtime generation, revision, provider identity or resource proof.
- Shell and inbound SYNC can mark providers ready before initialization.
- `resetRuntime()` can be followed by a late cleanup patch from an old mount.
- Cleanup can report networking ready after transport destruction or in solo mode.

## Dependent authority gaps

- Run exit does not commit one session epoch transition.
- Snapshot acceptance lacks duplicate, stale and conflict policy.
- Remote movement lacks complete speed, collision and temporal validation.
- Active clients do not reconcile predicted pose to host pose.
- Pause and resume remain primarily local projection rather than replicated authority.

## Validation gap

Current package commands do not prove:

```txt
start admission policy
sealed roster parity
roster mutation during loading
connection loss during loading
correlated START_GAME/SYNC handling
partial delivery and reorder handling
per-peer acknowledgement
retry and dedupe
stale prior-epoch rejection
host publication rollback or degraded policy
first-frame start correlation
provider-owned readiness and generation fencing
```

## Required guarantees

```txt
one admitted host actor starts
one sealed roster feeds bootstrap
loading-time changes invalidate stale plans
one transaction binds all initial messages
one run session and epoch bind room snapshot runtime and frame
partial messages do not commit gameplay
host records per-peer publication and acknowledgement
clients commit exactly once
retries are idempotent
old epochs are rejected before mutation
first frame proves the accepted start identity
```

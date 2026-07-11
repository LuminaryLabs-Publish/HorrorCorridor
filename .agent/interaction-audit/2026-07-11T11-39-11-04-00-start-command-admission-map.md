# Start Command Admission Map

**Timestamp:** `2026-07-11T11-39-11-04-00`

## Summary

The lobby primary button invokes `startPlay()` directly. The UI does not expose a disabled or reasoned admission state, and the handler returns silently for non-host or missing-room cases. Client primary action is repurposed to toggle readiness rather than entering a committed run.

## Plan ledger

**Goal:** turn the lobby primary interaction into a typed command/result flow with visible admission reasons and no silent state mutation.

- [x] Trace UI button to handler.
- [x] Trace host and client branches.
- [x] Identify missing preflight and result projection.
- [x] Define interaction admission requirements.
- [ ] Implement command dispatch and UI result projection.

## Current map

```txt
LobbyScreen primary button
  -> always enabled
  -> label is Start run for host, Enter run for client
  -> onPrimaryAction = startPlay

startPlay
  -> client: toggleReady(), return
  -> host without room: silent return
  -> host with room: begin async loading and local start sequence
```

## Interaction gaps

```txt
command ID: absent
observed room/roster revision: absent
host actor proof: absent
transport status admission: absent
all-ready policy: absent
start-in-progress lock: absent
cancel during loading: absent
semantic result: absent
reason catalog: absent
UI disabled state: absent
retry/duplicate state: absent
per-peer acknowledgement projection: absent
```

## Required interaction flow

```txt
button intent
  -> create StartRunCommand
  -> preflight current lobby state
  -> return immediate accepted-for-processing or rejected result
  -> disable conflicting lobby mutations while transaction is active
  -> project progress from transaction journal
  -> project committed, partial, failed or cancelled result
  -> enter PLAYING only from committed local result
```

## Required UI states

```txt
not-host
room-missing
transport-connecting
transport-reconnecting
waiting-for-members
member-not-ready
roster-changed
preparing-bootstrap
publishing-start
waiting-for-acknowledgements
committed
failed
cancelled
```

## Client rule

Client readiness toggling should remain an explicit readiness command. It should not be hidden behind a button labeled `Enter run`. Client entry into gameplay should be a projection of an accepted host start transaction, not an independent local action.

## Stale interaction policy

A click created from an old room, roster revision, host role, session or epoch must return a typed stale result. It must not silently bootstrap or mutate current stores after async loading completes.

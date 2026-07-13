# Client Join Central Reconciliation Fixture Gate

**Timestamp:** `2026-07-13T03-38-31-04-00`

## Summary

Current checks do not prove input policy, host presence, room admission, bounded timeout, exact cancellation, retry isolation, transport parity or accepted visible-state correlation. Production-readiness claims remain blocked.

## Plan ledger

**Goal:** define the executable matrix required before client joining can be considered correct in source, production build and deployed origin.

- [x] Define unit, transport, browser and deployment gates.
- [x] Define zero-mutation and visible-frame requirements.
- [ ] Implement the authority.
- [ ] Run the matrix on `main`.

## Unit fixtures

```txt
host-generated codes satisfy shared grammar
empty, oversized, malformed and control-character codes reject
display names normalize and enforce code-point and byte limits
attempt ID and generation are stable
one terminal result per attempt
non-Accepted results produce zero canonical store mutation
Accepted installs one canonical room and roster revision
cancellation is idempotent
retry fences predecessor events
```

## Transport fixtures

```txt
PeerJS host available -> Accepted
PeerJS host absent -> TimedOut or RoomUnavailable
PeerJS host rejects -> Rejected
PeerJS room full -> RoomFull
local bridge host available -> Accepted
local bridge host absent -> never Connected or Accepted
cancel before transport open -> Cancelled
cancel awaiting acknowledgement -> Cancelled
late predecessor open/error/message/ack -> Stale
```

## Browser fixtures

```txt
pending join does not display Joined room
pending join does not install canonical room or roster
accepted join displays canonical host room and admitted roster
rejected, timed-out and cancelled states show typed feedback
Back retires attempt resources exactly once
rapid cancel/retry cannot adopt predecessor events
first accepted lobby frame cites attempt and manifest revisions
```

## Gameplay fixtures

```txt
room-full rejection creates no local gameplay actor
START_GAME must match accepted room generation
SYNC from predecessor attempt is rejected
accepted lobby and first gameplay snapshot share room generation
```

## Environment matrix

```txt
source development server
production build and server
same-origin BroadcastChannel bridge
cross-device PeerJS
GitHub Pages deployed origin
keyboard and pointer activation
background/focus changes during pending attempt
rapid repeated submit and cancel
```

## Current validation state

```txt
runtime implementation: absent
unit fixtures: absent
transport fixtures: absent
browser fixtures: absent
gameplay fixtures: absent
deployed-origin fixtures: absent
visible-frame acknowledgement: absent
```

## Gate decision

Fail closed. Documentation establishes the missing contract but does not prove correct client joining.
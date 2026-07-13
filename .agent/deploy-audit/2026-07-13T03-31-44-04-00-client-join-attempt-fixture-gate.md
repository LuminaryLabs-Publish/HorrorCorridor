# Client Join Attempt Fixture Gate

**Timestamp:** `2026-07-13T03-31-44-04-00`

## Summary

The current package checks do not prove join-input policy, host acknowledgement, timeout, cancellation, retry isolation or PeerJS/local-bridge parity. Deployment readiness must remain withheld until focused fixtures execute against source, production build and deployed origin.

## Plan ledger

**Goal:** define the executable gate required before claiming that client joining is accepted, rejected, cancelled and rendered correctly.

- [x] Identify source-only findings.
- [x] Define transport-independent and transport-specific fixtures.
- [x] Define visible-frame and deployed-origin gates.
- [ ] Implement and run the matrix.

## Required unit fixtures

```txt
join-code grammar accepts generated host codes
join-code grammar rejects empty, oversized and control-character inputs
display-name policy normalizes and bounds input
ClientJoinCommand allocates stable attempt identity
terminal JoinResult is exactly once
non-Accepted results perform zero canonical session mutation
Accepted commits one canonical room/member manifest
cancellation is idempotent
retry increments generation and quarantines predecessor events
```

## Required transport fixtures

```txt
PeerJS host available -> Accepted
PeerJS host unavailable -> TimedOut or RoomUnavailable
PeerJS host rejects -> Rejected
PeerJS room full -> RoomFull
local bridge host available -> Accepted
local bridge host absent -> TimedOut, never connected
cancel before open -> Cancelled and resources retired
cancel while awaiting ack -> Cancelled and late ack rejected
late predecessor open/error/message -> Stale and zero mutation
```

## Required browser fixtures

```txt
pending join does not display Joined room
pending join does not install canonical room or roster
accepted join displays canonical host room and roster
rejected join displays typed reason and retry
cancel returns to stable predecessor screen
first accepted lobby frame cites JoinAttemptId and room revision
```

## Required parity matrix

```txt
source development server
production build and server
same-origin local bridge
cross-origin or cross-device PeerJS
GitHub Pages deployed origin
keyboard and pointer activation
rapid cancel/retry
background/focus transition during join
```

## Current validation state

```txt
runtime implementation: absent
unit fixtures: absent
transport fixtures: absent
browser fixtures: absent
deployed-origin fixtures: absent
first-visible-frame acknowledgement: absent
```

## Gate decision

Fail closed for production-readiness claims. Documentation establishes the missing contract only.

# Host Room Identity Admission Map

**Timestamp:** `2026-07-12T18-31-01-04-00`

## Summary

The Host Game interaction currently commits visible room state before the asynchronous transport proves ownership of the requested host peer ID.

## Plan ledger

**Goal:** turn Host Game into one typed command whose accepted result alone enables join, readiness and start interactions.

- [x] Map UI intent to identity and transport effects.
- [x] Identify missing command, generation and result boundaries.
- [ ] Introduce `StartHostIdentityCommand`.
- [ ] Disable downstream lobby actions until identity acceptance.

## Current map

```txt
Host Game click
  -> enterHostLobby()
  -> generate IDs and code
  -> mutate session stores
  -> expose host lobby
  -> create transport
  -> generic transport events
```

## Required map

```txt
Host Game click
  -> StartHostIdentityCommand(commandId, expectedSessionRevision)
  -> allocate candidate identity generation
  -> reserve and acquire peer ID
  -> bind transport mode
  -> HostIdentityResult

Accepted
  -> commit session manifest
  -> expose Join, Ready and Start interactions

Collision, Failed, TimedOut or Cancelled
  -> zero lobby-membership mutation
  -> retire partial resources
  -> expose retry or return-to-title action
```

## Interaction invariants

```txt
one command maps to one terminal result
one active identity generation per host session
retries supersede predecessors
late predecessor events are ignored
no rejected code is displayed as joinable
```

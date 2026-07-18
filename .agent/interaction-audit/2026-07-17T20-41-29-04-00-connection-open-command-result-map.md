# Connection Open Command/Result Map

**Timestamp:** `2026-07-17T20-41-29-04-00`

## Current event path

```txt
PeerJS connection candidate
  -> callback registration
  -> unconditional peer/connection-open event
  -> GameShell roster mutation
  -> lobby event broadcast
```

## Missing command boundary

The raw event is treated as a command and a successful result at once. It has no admission decision, attempt generation, deadline, cancellation, stale rejection or reason code.

## Proposed map

```txt
ConnectionCandidateObserved
  -> ConnectionOpenAdmissionCommand
  -> ConnectionOpenAdmissionResult
     accepted-pending | rejected-mode | rejected-duplicate | stale

real open / local bridge ready / close / error / timeout
  -> ConnectionOpenSettlementCommand
  -> ConnectionOpenSettlementResult
     opened | closed-before-open | errored | timed-out | cancelled | stale

opened
  -> LobbyMembershipCommitCommand
  -> LobbyMembershipCommitResult
  -> PlayerJoinedPublicationResult
```

## Required interaction guarantees

- A guest row is not an implicit transport result.
- Duplicate candidate events are idempotent per connection generation.
- Close or error before open settles without membership.
- Route/transport replacement cancels pending generations.
- The first accepted message and first guest lobby frame cite the committed generation.

## Claim boundary

No commands or results were implemented.
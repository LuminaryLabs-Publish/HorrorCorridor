# Room Identity Central Reconciliation DSK Map

**Timestamp:** `2026-07-12T18-38-51-04-00`  
**Parent domain:** `corridor-room-join-code-allocation-authority-domain`

## Summary

Room identity currently spans UI, session stores, PeerJS, BroadcastChannel, lobby state, protocol messages, gameplay bootstrap, and rendering without one accepted manifest. This DSK boundary makes identity allocation a transactional prerequisite rather than a collection of optimistic mutations.

## Plan ledger

**Goal:** compose atomic identity kits into one authority that admits exactly one host identity generation or returns a typed zero-advertisement failure.

- [x] Preserve existing runtime domains and kit services.
- [x] Separate candidate generation from accepted identity ownership.
- [x] Define reservation, PeerJS admission, local-bridge binding, commit, rollback, observation, and visible-frame boundaries.
- [ ] Implement the kits and fixtures.

## Parent domain responsibilities

```txt
own host-identity command admission
own identity generation and predecessor revision
own candidate normalization and reservation
own PeerJS requested/admitted identity evidence
own BroadcastChannel binding for the accepted generation
own one canonical RoomIdentityManifest
own atomic commit or complete rollback
own late predecessor event rejection
own bounded observations and terminal results
own first accepted-hosting frame acknowledgement
```

## Candidate kit map

```txt
room-id-kit
  -> logical room ID allocation and validation

join-code-candidate-kit
  -> detached candidate generation

join-code-entropy-policy-kit
  -> entropy source, alphabet, length, retry budget

join-code-normalization-kit
  -> canonical casing, allowed characters, length validation

join-code-reservation-kit
  -> pending reservation lease and release result

peer-id-ownership-admission-kit
  -> requested ID, peer/open evidence, unavailable/collision result

room-identity-manifest-kit
  -> session epoch, generation, roomId, joinCode, hostPlayerId,
     requestedHostPeerId, admittedHostPeerId, transportMode

room-identity-generation-kit
  -> strictly monotonic attempt generation

room-identity-fingerprint-kit
  -> canonical manifest fingerprint

host-identity-start-command-kit
  -> command ID, expected predecessor revision, cancellation token

host-identity-retry-policy-kit
  -> bounded retries, backoff, terminal exhaustion

identity-collision-result-kit
  -> Accepted, Collision, Unavailable, TimedOut, Cancelled, Failed

identity-error-classification-kit
  -> transport error to identity-allocation reason

local-bridge-identity-binding-kit
  -> BroadcastChannel lease bound to accepted generation

peerjs-identity-binding-kit
  -> PeerJS instance and open receipt bound to accepted generation

identity-commit-kit
  -> atomic session, room, roster, readiness, and UI installation

identity-rollback-kit
  -> partial resource retirement and predecessor preservation

stale-identity-event-rejection-kit
  -> late open/error/message rejection by generation

identity-observation-kit
  -> bounded status and reason projection

identity-journal-kit
  -> command/result/generation ledger

first-hosting-state-frame-ack-kit
  -> first lobby frame citing the accepted manifest fingerprint
```

## Integration boundary

```txt
corridor-application-shell-kit
  -> emits StartHostIdentityCommand

corridor-session-domain-kit
  -> receives only accepted RoomIdentityManifest

peer-host-transport-kit
  -> provides candidate acquisition evidence, not session truth

lobby-screen-presentation-kit
  -> renders Pending, Accepted, or Failed from typed results

protocol-message-construction-kit
  -> cites accepted room identity generation and fingerprint

runtime-resource-cleanup-kit
  -> retires failed and superseded candidate resources exactly once
```

## Required invariants

```txt
no joinable lobby without Accepted
no two current identity generations
no room/joinCode/peerId split manifest
no local bridge current while PeerJS generation failed
no late predecessor open/error mutation
no partial session mutation on failed candidate
no first-frame acknowledgement for a different manifest fingerprint
```

## Proof kits

```txt
join-code-collision-fixture-kit
peer-id-unavailable-fixture-kit
retry-exhaustion-fixture-kit
late-predecessor-identity-event-fixture-kit
partial-resource-rollback-fixture-kit
mode-parity-fixture-kit
first-hosting-state-frame-fixture-kit
```

## Validation boundary

Architecture documentation only. No DSK implementation or executable fixture currently exists.
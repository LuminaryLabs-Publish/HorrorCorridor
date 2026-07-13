# Transition Command and Participant Result Map

**Timestamp:** `2026-07-13T07-00-29-04-00`

## Summary

The active host exposes no command/result boundary for multi-store transitions. Event handlers directly mutate each store, so callers cannot distinguish a fully committed successor from a partial transition.

## Plan ledger

**Goal:** map every route/network intent to one command, participant preparation set and terminal result.

- [x] Map local route intents.
- [x] Map START_GAME, SYNC and LOBBY_EVENT intents.
- [x] Map session, runtime and UI participants.
- [x] Define terminal results and receipts.
- [ ] Implement dispatch and fixture coverage.

## Map

```txt
HostStartIntent
ClientStartGameMessage
ClientSyncMessage
PauseIntent
ResumeIntent
CompletionIntent
ReturnToLobbyIntent
ReturnToTitleIntent
  -> SessionTransitionCommand
  -> session candidate
  -> runtime candidate
  -> UI candidate
  -> cross-domain invariant checks
  -> participant prepare results
  -> atomic commit or rollback
  -> CrossStoreTransitionResult
  -> CoherentFrameEnvelope
```

## Participant receipts

```txt
SessionParticipantResult
  roomRevision
  rosterRevision
  identityRevision
  connectionRevision

RuntimeParticipantResult
  snapshotRevision
  inputRevision
  readinessRevision

UiParticipantResult
  screenRevision
  overlayRevision
  pauseRevision
  completionRevision
```

## Rejection policy

```txt
wrong predecessor revision -> RejectedStale
room/roster mismatch -> RejectedInvariant
snapshot/room mismatch -> RejectedInvariant
identity absent from snapshot -> RejectedInvariant
screen incompatible with snapshot -> RejectedInvariant
duplicate transition ID -> Duplicate
participant prepare failure -> Failed with zero commit
participant commit failure -> rollback or classified fatal result
```

No direct store setter sequence should serve as a public transition API.
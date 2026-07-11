# Terminal Result and Exit Admission Map

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

Terminal state currently enters through mutable game state or an incoming SYNC, then leaves through untyped `returnToLobby` or `returnToStart` callbacks. No command/result boundary validates who may commit an outcome, which run it belongs to, or whether restart and title exit consume the same terminal result.

## Plan ledger

**Goal:** map all terminal ingress and egress surfaces into typed, epoch-scoped admission contracts.

- [x] Trace local victory ingress.
- [x] Trace replicated victory/failure ingress.
- [x] Trace CompleteScreen restart and title actions.
- [x] Identify missing identity, revision and dedupe fields.
- [ ] Implement after run session and epoch identity exist.

## Current ingress

```txt
local host/solo interaction
  -> mutable GameState
  -> victory state
  -> commitVictory()

client peer message
  -> SYNC payload
  -> direct store writes
  -> victory branch, paused branch, or generic playing branch
```

## Current egress

```txt
CompleteScreen Restart
  -> returnToLobby()
  -> reset UI
  -> preserve transport, room and authoritative snapshot
  -> set readiness false/false/true/false

CompleteScreen Quit to title
  -> returnToStart()
  -> destroy transport
  -> clear session
  -> reset runtime and UI
```

## Missing admission fields

```txt
terminalOutcomeId
runSessionId
sessionEpoch
terminalRevision
source command/result ID
snapshot revision and tick
sender/actor binding
outcome policy version
proof fingerprint
duplicate/stale/conflict result
exit command ID
consumed terminal result ID
```

## Required command flow

```txt
OutcomeEvaluationInput
  -> TerminalOutcomeAdmission
  -> TerminalOutcomeResult
  -> TerminalPublicationResult
  -> TerminalClientAdmissionResult
  -> TerminalFrameReceipt
  -> RestartRunCommand or ExitToTitleCommand
  -> RunExitResult
```

## Required rejection cases

```txt
non-authoritative actor attempts terminal commit
outcome belongs to another room or run
old session epoch outcome arrives
playing snapshot arrives after terminal latch
duplicate outcome arrives
conflicting victory and failure arrive
restart consumes an uncommitted outcome
exit callback executes twice
```

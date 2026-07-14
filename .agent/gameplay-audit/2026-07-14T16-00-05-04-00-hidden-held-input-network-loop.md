# Hidden Held Input and Network Loop

**Timestamp:** `2026-07-14T16-00-05-04-00`

## Summary

Held input, local prediction and network cadence have no explicit page-lifecycle boundary. A keyup missed while the page is hidden can leave movement admitted, while wall-clock cadence makes client update or host publication immediately due on resume.

## Plan ledger

**Goal:** prevent hidden-page state from creating unowned movement, interaction or publication after restoration.

- [x] Trace input mutation, movement admission and network cadence.
- [x] Trace blur and pointer-lock behavior.
- [ ] Add lifecycle input retirement and send/publication policy.

## Current loop

```txt
player holds movement or interact
  -> input state is true
  -> page hides or freezes
  -> no lifecycle command clears input
  -> keyup may not reach the page
  -> RAF and network cadence are implicitly suspended by browser behavior
  -> page resumes
  -> PLAYING may still admit predecessor input
  -> Date.now cadence can make network work immediately due
```

## Required behavior

```txt
hide/pagehide/freeze
  -> clear held movement, look, interact and pause intent
  -> reject local gameplay commands
  -> suspend client sends and host publication under explicit policy
  -> optionally continue bounded passive snapshot receipt

resume/pageshow
  -> reject predecessor input and callbacks
  -> require fresh key and pointer gestures
  -> reconcile latest accepted snapshot
  -> resume one scheduler/network generation
```

## Missing results

```txt
HeldInputRetirementResult
LocalCommandSuspensionResult
ClientSendSuspensionResult
HostPublicationSuspensionResult
PassiveSnapshotBufferResult
ResumeReconciliationResult
```

## Validation boundary

No hidden-input safety, network lifecycle policy, stale-command rejection or multiplayer resume correctness is claimed.
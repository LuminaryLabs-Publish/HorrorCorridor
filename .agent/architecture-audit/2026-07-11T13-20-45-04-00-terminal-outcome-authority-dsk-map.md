# Terminal Outcome Authority DSK Map

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

HorrorCorridor currently spreads terminal state across ordered-sequence rules, ooze state, replicated snapshots, UI state, shell routing and rendered-frame projection. Victory has a partial executable path; failure has only type and presentation support. No composed domain owns terminal policy, monotonic admission, publication, client convergence or frame proof.

## Plan ledger

**Goal:** define the parent DSK and atomic kit boundaries required for one authoritative victory/failure transaction.

- [x] Map current outcome producers and consumers.
- [x] Separate evaluation from UI projection.
- [x] Identify missing failure and terminal-latch services.
- [x] Define publication, admission and frame-correlation services.
- [x] Preserve run-session and epoch dependencies.
- [ ] Implement after start, epoch and snapshot-admission foundations exist.

## Current domain split

```txt
ordered-anomaly-sequence-kit
  -> evaluates exact cube order
  -> can set gameState victory
  -> can return victory to playing

ooze-trail-domain-kit
  -> spawns and decays ooze
  -> calculates oozeLevel
  -> has no defeat predicate

corridor-authoritative-publication-kit
  -> serializes current game state into SYNC
  -> has no terminal transaction identity

snapshot-outcome-routing-kit
  -> handles victory explicitly
  -> handles paused explicitly
  -> routes every other state, including failure, to playing

ui-completion-projection-kit
  -> supports victory and failure presentation
  -> is not an authority

complete-screen-presentation-kit
  -> displays victory/failure copy
  -> routes restart to lobby and quit to title
```

## Required parent domain

```txt
horror-corridor-terminal-outcome-authority-domain
```

### 1. `terminal-outcome-policy-kit`

Services:

```txt
versioned policy descriptor
victory predicate registry
defeat predicate registry
predicate precedence
tie-break policy
terminal reason catalog
policy fingerprint
```

### 2. `outcome-evaluation-input-kit`

Services:

```txt
runSessionId
sessionEpoch
snapshot revision and tick
room phase
game state
sequence state
ooze pressure
player state
observed command/result identity
deterministic evaluation payload
```

### 3. `victory-predicate-kit`

Services:

```txt
exact anomaly-order evaluation
completion proof
source command/result linkage
accepted/no-change/rejected evaluation
```

### 4. `defeat-predicate-kit`

Services:

```txt
explicit defeat conditions
ooze threshold or alternative pressure policy
player/party defeat policy
timeout or disconnect policy when enabled
defeat proof
```

### 5. `terminal-outcome-admission-kit`

Services:

```txt
authoritative actor admission
active-run phase admission
run/session/epoch admission
snapshot revision admission
duplicate and stale rejection
conflict resolution
```

### 6. `terminal-outcome-latch-kit`

Services:

```txt
single terminal commit per run epoch
monotonic state
idempotent duplicate result
late-playing quarantine
conflicting outcome rejection
terminal revision
```

### 7. `terminal-outcome-result-kit`

Services:

```txt
accepted/rejected/duplicate/no-change result
victory/failure kind
reason code
proof fingerprint
before and after revisions
committed timestamp
```

### 8. `terminal-room-phase-kit`

Services:

```txt
active to ending transition
terminal room revision
closed/returned transition handoff
phase/result correlation
```

### 9. `terminal-publication-kit`

Services:

```txt
terminal message or correlation-complete SYNC bundle
per-peer publication rows
retry identity
bounded timeout
publication result
```

### 10. `terminal-client-admission-kit`

Services:

```txt
sender/room/run/epoch admission
outcome revision ordering
duplicate suppression
conflict rejection
exactly-once client commit
```

### 11. `terminal-ui-projection-kit`

Services:

```txt
victory projection
failure projection
message projection
completion acknowledgement
restart/title capability projection
```

### 12. `terminal-frame-correlation-kit`

Services:

```txt
terminal outcome revision
run session and epoch
snapshot tick
first terminal frame ID
HUD/CompleteScreen projection proof
rendered-frame acknowledgement
```

### 13. `terminal-outcome-acknowledgement-kit`

Services:

```txt
peer accepted/rejected rows
first-frame proof attachment
quorum or admitted-peer policy
host completion receipt
```

### 14. `terminal-outcome-journal-kit`

Services:

```txt
bounded evaluation rows
admission rows
commit rows
publication rows
client acknowledgement rows
frame proof rows
```

### 15. `terminal-outcome-fixture-kit`

Services:

```txt
victory fixture
failure fixture
simultaneous predicate fixture
duplicate fixture
late-playing fixture
stale-epoch fixture
loss/reorder fixture
first-terminal-frame fixture
restart/exit handoff fixture
```

## Dependency graph

```txt
canonical roster and actor binding
  -> lobby start transaction
  -> runSessionId and sessionEpoch
  -> snapshot acceptance authority
  -> terminal outcome evaluation
  -> terminal latch and result
  -> publication and client admission
  -> UI and frame projection
  -> run-exit transaction
```

## Non-negotiable rules

```txt
UI stores do not decide outcomes
oozeLevel alone is not a defeat result
failure is never routed through a generic playing fallback
victory is not reversible within one run epoch
late snapshots cannot reopen a terminal run
restart does not create a new run without a new admitted start transaction
```

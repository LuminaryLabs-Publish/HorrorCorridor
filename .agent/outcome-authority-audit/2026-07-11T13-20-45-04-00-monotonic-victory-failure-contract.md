# Monotonic Victory and Failure Contract

**Timestamp:** `2026-07-11T13-20-45-04-00`

## Summary

The terminal outcome must become a first-class authority result, not a reversible field inferred independently by gameplay, networking and UI consumers. This contract defines the minimum state and transition guarantees for victory and failure convergence.

## Plan ledger

**Goal:** freeze a deterministic contract that can be implemented without inventing a second gameplay authority in the shell or renderer.

- [x] Define terminal identities and revisions.
- [x] Define accepted outcome kinds.
- [x] Define monotonicity and conflict policy.
- [x] Define publication and acknowledgement requirements.
- [x] Define restart and exit handoff.
- [ ] Select and version the actual defeat predicate.
- [ ] Implement executable fixtures.

## Terminal outcome record

```ts
type TerminalOutcome = Readonly<{
  terminalOutcomeId: string;
  runSessionId: string;
  sessionEpoch: number;
  terminalRevision: number;
  roomId: string;
  kind: "victory" | "failure";
  reason: string;
  policyVersion: number;
  sourceTick: number;
  sourceRevision: number;
  committedAtMs: number;
  proofFingerprint: string;
}>;
```

## Admission result

```ts
type TerminalOutcomeResult = Readonly<{
  status: "accepted" | "rejected" | "duplicate" | "no-change" | "conflict";
  reason: string;
  outcome: TerminalOutcome | null;
  beforeRevision: number;
  afterRevision: number;
}>;
```

## State machine

```txt
active
  -> evaluating
  -> accepted victory | accepted failure
  -> terminal
  -> exiting
  -> lobby | closed
```

Forbidden transitions:

```txt
terminal -> active within the same runSessionId/sessionEpoch
victory -> failure within the same terminal revision
failure -> victory within the same terminal revision
old epoch -> current epoch mutation
uncommitted UI state -> authoritative outcome
```

## Evaluation rules

```txt
one policy version evaluates all predicates
same source snapshot feeds victory and defeat checks
predicate tie uses explicit precedence
accepted result increments terminal revision once
duplicate same-fingerprint result returns duplicate/no-change
conflicting result returns conflict and does not mutate state
```

## Replication rules

```txt
terminal result carries room/run/epoch/revision identity
host records per-peer publication outcome
client admits sender, room, run, epoch and revision before mutation
client commits outcome exactly once
client acknowledges admitted result and first terminal frame
late playing snapshots are quarantined
```

## Projection rules

```txt
victory -> COMPLETED + gameScreen victory
failure -> COMPLETED + gameScreen failure
paused is not terminal
playing is rejected after terminal latch
CompleteScreen is a projection only
```

## Exit rules

```txt
restart references terminalOutcomeId
restart allocates a new start transaction and run epoch
return to lobby retires the terminal runtime generation
quit to title consumes the same terminal result and closes the session
all exit paths are idempotent
```

# HorrorCorridor Command Authority Audit: Outcome and Publish Contract

**Timestamp:** `2026-07-10T13-58-16-04-00`

## Current authority problem

The domain mutates or retains `GameState`, but it does not own the semantic result of the attempted command. Consumers infer outcome from object identity, message type, and ad hoc reason strings.

## Required command envelope

```txt
CommandEnvelope
  id
  source: local | host | client | cadence | recovery | fixture
  kind: player-update | pickup | drop | place | remove | request-sync | toggle-ready | cancel | ooze-tick | victory-check | unknown
  playerId?
  cubeId?
  slotId?
  timestamp?
```

## Required status contract

```txt
accepted
rejected
skipped
no-op
recovery
victory
```

## Required reason families

```txt
accepted:state-changed
accepted:state-unchanged
rejected:not-playing
rejected:player-missing
rejected:already-carrying
rejected:not-carrying
rejected:cube-unavailable
rejected:outside-interaction-range
rejected:anomaly-missing
rejected:outside-anomaly-range
rejected:no-free-slot
rejected:wrong-removal-slot
skipped:toggle-ready-unowned
skipped:cancel-unowned
skipped:unknown-action
no-op:held-cube-already-synced
no-op:ooze-decay-not-due
no-op:ooze-spacing-guard
no-op:ooze-capacity-guard
recovery:request-sync
victory:ordered-sequence-complete
victory:ordered-sequence-rollback
```

## Publish decision contract

| Result | Decision | Consumer behavior |
|---|---|---|
| accepted + changed | publish | apply state and publish snapshot |
| accepted + unchanged | no-op | journal, no broadcast |
| rejected | skip | journal reason, no broadcast |
| skipped | skip | journal reason, no broadcast |
| recovery request-sync | publish-only | publish current authoritative snapshot |
| victory completion | victory | publish changed snapshot and completion state |
| victory rollback | publish | publish corrected snapshot |
| ooze changed | publish | publish cadence mutation |
| ooze unchanged | no-op | journal, no broadcast |

## Journal contract

```txt
sequence
command summary
status
reason
changed
publish decision
consumer action
before summary
after summary
event types
```

Journal retention should be bounded and deterministic. Raw full state should not be duplicated into every row.

## Compatibility contract

```txt
applyInteractionWithResult(...).state === legacy interaction export result
applyNetworkWithResult(...).state === legacy network export result
applyOozeWithResult(...).state === legacy ooze export result
applyVictoryWithResult(...).state === legacy win export result
```

## Gate

GameCanvas must not consume the new contract until the DOM-free fixture proves the table above and legacy state parity.
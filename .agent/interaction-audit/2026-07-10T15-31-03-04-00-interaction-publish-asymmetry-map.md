# HorrorCorridor Interaction Publish Asymmetry Map

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Interaction actions

```txt
pickup-cube
drop-cube
place-cube-at-anomaly
remove-cube-from-anomaly
request-sync
toggle-ready
cancel
unknown/default
```

## Silent result branches

```txt
not playing
missing player
already carrying
not carrying
no nearby cube
missing anomaly cell
too far from anomaly
no free slot
wrong removal slot
no occupied slot
missing cube
request-sync/toggle-ready/cancel/default
```

All of these currently collapse to `GameState`, usually the original state object.

## Consumer asymmetry

| Result shape | Local authority | Host authority |
|---|---|---|
| changed GameState | publish | publish |
| unchanged original object | skip | publish |
| request-sync unchanged state | not locally derived | publish recovery |
| unknown/cancel/toggle-ready | local identity skip if invoked | publish resync if received as TRY_INTERACT |

## Required result contract

```txt
status: accepted | rejected | skipped | no-op
reason: stable catalog value
changed: semantic state change, not object identity
events: domain facts
state: legacy GameState
```

## Required publish policy

```txt
accepted + changed -> publish command result
accepted + victory -> publish victory
rejected/no-op -> skip unless protocol explicitly requires acknowledgement
request-sync -> publish recovery
cadence -> publish cadence without fabricating a command success
```

## Fixture requirement

Every action must be executed from the same canonical state through local and host consumers. Domain result equality and publication-decision equality must be asserted separately.
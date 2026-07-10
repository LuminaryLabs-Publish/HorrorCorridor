# HorrorCorridor Local/Host Authority Parity Loop

**Timestamp:** `2026-07-10T15-31-03-04-00`

## Local authority

```txt
interact key
  -> derive action
  -> applyNetworkInteractionRequest
  -> if nextState === currentGameState: return without publication
  -> otherwise sync held cubes
  -> publish resync snapshot
  -> commit victory when reached
```

## Host authority

```txt
TRY_INTERACT message
  -> applyNetworkInteractionRequest
  -> sync held cubes
  -> publish recovery for request-sync, otherwise resync
  -> commit victory when reached
```

## Parity problem

Both paths call the same GameState-returning rule, but only the local path uses identity to suppress unchanged publications. The host path publishes unchanged rejected/no-op interactions. The difference is not represented as a domain result or policy decision.

## Periodic simulation loop

```txt
movement step
  -> apply player update
  -> sync held cubes
  -> on network cadence: advance ooze
  -> publish resync snapshot
```

This publication is required for simulation replication, but it must be classified as cadence-driven. It is not proof that a player command was accepted or that ooze changed.

## Required fixture groups

```txt
accepted interaction parity
rejected interaction parity
no-op interaction parity
victory transition parity
request-sync intentional recovery publication
cadence intentional publication without command result
ooze semantic changed and unchanged rows
published tick correlation
```

## Gameplay safety rule

Do not change distances, cube rules, sequence order, ooze constants, movement, camera, or network cadence during the authority ledger cut. The goal is observability and deterministic policy, not gameplay retuning.
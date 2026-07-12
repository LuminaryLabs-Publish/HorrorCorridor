# Startup Acquisition Ledger and First-Frame Contract

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Authority invariant

```txt
A runtime is not ready because a snapshot exists or a screen says PLAYING.
A runtime is ready only after the current startup transaction owns every mandatory lease and commits one matching visible frame.
```

## Transaction phases

```txt
idle
  -> admitted
  -> preparing
  -> committing-first-frame
  -> ready

preparing or committing-first-frame
  -> failed
  -> rolling-back
  -> rolled-back | rollback-incomplete
  -> retry-admissible only from a proven baseline
```

## Acquisition ledger row

```txt
leaseId
resourceKind
ownerGeneration
acquiredAtPhase
dependsOn[]
retireService
retirementRequired
retirementStatus
retirementReceipt
```

## Mandatory leases

```txt
renderer/context
canvas attachment
post-processing composer and targets
world/scene resource graph
ResizeObserver
resize listener
pointer-lock listener
keyboard listeners
mousemove listener
blur listener
transport subscription
RAF controller
```

## Commit rule

StartupSuccess is atomic across:

```txt
runtime phase = ready
current generation
mandatory lease inventory
first committed frame ID
snapshot revision shown by that frame
provider readiness revision
clone-safe startup observation
```

## Rollback rule

- Stop callbacks before disposing resources they may access.
- Retire dependents before dependencies.
- Detach DOM ownership before or with renderer retirement.
- Make every retirement idempotent.
- Record failures and unresolved mandatory leases.
- Clear initialized/public readiness only through the rollback result.
- Reject callbacks and commits from the retired generation.

## Retry rule

A new attempt requires:

```txt
previous result = rolled-back
mandatory live leases = 0
no callback generation admitted
mount and snapshot revalidated
new transaction ID
new runtime generation
```

## Observation

Expose only detached data: transaction, generation, phase, snapshot revision, lease counts, last acquisition, last failure, rollback result, first frame ID and readiness revision. Do not expose live Three.js objects or callback handles.

# Start and Retry Command Admission Map

**Timestamp:** `2026-07-11T21-21-12-04-00`

## Current ingress

```txt
solo button
  -> enterSoloRun()

host primary action
  -> startPlay()

client SYNC
  -> store snapshot and route PLAYING

GameCanvas effect
  -> initializeRuntime(snapshot)
```

These paths do not create a shared command envelope or result. They rely on screen/store mutation and a local `initialized` Boolean.

## Required command

```txt
StartRuntimeCommand
  commandId
  sessionId
  runId
  sessionEpoch
  snapshotRevision
  mountId
  requestedGeneration
  source: solo | host | client-sync | retry
  requestedAtMs
```

## Admission checks

```txt
session and run identities are current
snapshot belongs to the current run and epoch
mount is connected and has nonzero bounds or an explicit deferred-size policy
no committed runtime already owns the generation
no rollback is still in progress
mandatory live leases from the previous generation are zero
retry references the failure result it supersedes
```

## Results

```txt
accepted-preparing
accepted-ready
duplicate-active
rejected-stale-session
rejected-stale-epoch
rejected-stale-snapshot
rejected-mount
rejected-live-leases
failed-acquisition
failed-first-frame
rolled-back
rollback-incomplete
```

## Retry rule

A retry never reuses the failed generation or ambient local flags. It starts only after rollback receipts prove the required baseline, and it returns a new generation plus one first-frame result.

## UI projection

Loading, failure, retry and ready UI should project the typed startup result. Screen state must not be used as the authority for whether runtime resources exist.

# HorrorCorridor Debug Command / Capability Result Map

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Replace ambient debug activation and extraction with explicit commands, admission results and revocable capability leases.

## Current ingress map

```txt
query parameter
  -> initializeRuntimeDebug
  -> setEnabled(true)
  -> setOverlayVisible(true)

persisted localStorage
  -> initializeRuntimeDebug
  -> setEnabled(true)
  -> optionally setOverlayVisible(true)

Backquote key
  -> initializeRuntimeDebug
  -> setEnabled(true)
  -> toggle overlay

window API
  -> enable / showOverlay / extractState / getFrames / getEvents
```

Every path mutates or reads the same privileged store. None returns a typed admission result.

## Current result map

```txt
enable: void
disable: void
showOverlay: void
hideOverlay: void
clear: void
getLatestFrame: full frame or null
getFrames: full retained frames
getEvents: full retained events
extractState: full debug export
```

Missing identities:

```txt
commandId
actorId and role
buildChannel
runtimeGeneration
sessionEpoch
capabilityTier
leaseId
redactionProfileId
exportId
revocationId
```

## Required command envelopes

### DebugActivationCommand

```txt
commandId
source: query | keyboard | preference | window-api | harness
requestedTier: player-safe | qa | developer
actorId
actorRole
runtimeGeneration
sessionEpoch
buildChannel
issuedAtMs
```

### DebugExportCommand

```txt
commandId
leaseId
runtimeGeneration
sessionEpoch
requestedFrames
requestedEvents
requestedFormat
requestedAtMs
```

### DebugRevocationCommand

```txt
commandId
leaseId
reason: stop | restart | replacement | role-loss | expiry | policy-change | manual
runtimeGeneration
sessionEpoch
issuedAtMs
```

## Required activation results

```txt
accepted
rejected-build-policy
rejected-role
rejected-source
rejected-tier
stale-runtime
stale-session
expired
no-change
```

Accepted result must include:

```txt
leaseId
admittedTier
redactionProfileId
issuedAtMs
expiresAtMs
allowedProjectionSurfaces
retentionBudget
```

## Required export results

```txt
accepted
accepted-redacted
accepted-truncated
rejected-no-lease
rejected-expired
rejected-stale-runtime
rejected-stale-session
rejected-format
empty
```

Each accepted export must cite:

```txt
exportId
leaseId
runtimeGeneration
sessionEpoch
redactionProfileId
frame/event ranges
record count
serialized byte count
truncation reason
```

## Required interaction flow

```txt
browser or harness requests debug capability
  -> create DebugActivationCommand
  -> resolve build channel and policy
  -> validate actor, role, runtime and session
  -> admit maximum tier
  -> issue revocable lease
  -> configure capture projection and retention
  -> publish DebugActivationResult

capture or overlay request
  -> validate lease
  -> project through named redaction profile
  -> publish typed projection result

export request
  -> validate lease and range
  -> enforce byte/count budget
  -> return typed export result

runtime/session transition
  -> issue revocation command
  -> clear privileged buffers and elevation preferences
  -> publish revocation result
```

## Required parity

```txt
query, keyboard, preference and window API use the same activation authority
overlay and export use the same field classification
public-safe capture, overlay and export return equivalent schemas
revoked and stale leases are rejected identically across all ingress paths
```

## Fixture matrix

```txt
public-production + query + developer tier -> rejected-build-policy
public-production + Backquote -> no privilege elevation
public-production + persisted developer flag -> rejected and cleared
QA-preview + admitted tester + QA tier -> accepted lease
local-development + developer actor -> accepted developer lease
session replacement + old lease -> stale-session
runtime restart + old lease -> stale-runtime
export over byte budget -> accepted-truncated or rejected-policy
```
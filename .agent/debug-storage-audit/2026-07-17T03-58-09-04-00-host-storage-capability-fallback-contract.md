# HorrorCorridor Host Storage Capability and Fallback Contract

**Timestamp:** `2026-07-17T03-58-09-04-00`

## Goal

Keep optional debug preferences usable without allowing browser storage availability to control gameplay runtime availability.

## Capability states

```txt
available
  reads and writes admitted

read-only
  reads admitted; writes settle memory-only

denied
  host rejects access; use memory-only defaults

unavailable
  storage surface absent or inaccessible; use memory-only defaults

quota
  read may succeed; write settles memory-only

malformed
  stored value rejected and safe default selected

indeterminate
  unknown host failure; contain and use safe memory-only policy
```

## Read contract

```txt
probe capability
  -> read only declared public-safe keys
  -> validate schema/build scope
  -> normalize boolean values
  -> reject malformed or elevated legacy values
  -> return immutable DebugPreferenceReadResult
```

A read failure must never throw across the authority boundary or block renderer/world construction.

## Write contract

```txt
validate preference
  -> apply accepted in-memory preference
  -> attempt bounded durable write
  -> return persisted or memory-only result
```

The in-memory value is authoritative for the active runtime. Durable storage is an optional host projection.

## Fallback contract

```txt
read failure
  -> use safe defaults
  -> mark storage memory-only/unavailable
  -> continue runtime boot

write failure
  -> retain accepted in-memory value
  -> retain failure reason
  -> continue active gameplay/render loop

malformed stored value
  -> reject value
  -> do not elevate debug access
  -> use default or admitted query/build policy
```

## Security and policy boundary

```txt
stored values cannot issue a capability lease
stored values cannot select QA/developer data tier
stored values cannot bypass build-channel policy
query parameters remain command sources only
window API remains command source only
```

## Result identity

Every result binds:

```txt
commandId
runtimeGeneration
buildChannel
schemaVersion
preferenceRevision
storageOrigin
reasonCode
```

## Required proof

```txt
localStorage getter throws SecurityError
localStorage setter throws SecurityError
setter throws quota error
storage object unavailable
stored values malformed
runtime replaced before result settlement
production build and deployed route preserve memory-only fallback
first playable frame still commits
```

## Claim boundary

This document defines proposed behavior only.
# Runtime Readiness Lease DSK Map

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Summary

The current runtime readiness record is a shared four-boolean projection. It does not identify the session, runtime generation, provider, resource proof, transition result or revocation owner that makes a capability true.

## Current ownership

```txt
GameShell
  -> predicts simulation/rendering/networking/input readiness

GameCanvas
  -> creates resources
  -> patches readiness during initialization
  -> patches readiness during cleanup

runtimeStore
  -> merges every patch unconditionally
```

## Required composed domain

```txt
horror-corridor-runtime-readiness-authority-domain
  -> runtime-session-identity-kit
  -> runtime-generation-kit
  -> readiness-capability-descriptor-kit
  -> readiness-provider-lease-kit
  -> resource-readiness-proof-kit
  -> readiness-commit-transaction-kit
  -> readiness-revocation-kit
  -> simulation-readiness-adapter-kit
  -> rendering-readiness-adapter-kit
  -> networking-readiness-adapter-kit
  -> input-readiness-adapter-kit
  -> stale-cleanup-fence-kit
  -> readiness-transition-journal-kit
  -> readiness-debug-projection-kit
  -> runtime-readiness-fixture-kit
```

## Canonical readiness record

```txt
sessionId
runtimeGeneration
revision
capability
status: requested | initializing | ready | failed | revoked
providerId
providerGeneration
proofId
committedAtMs
revokedAtMs
reason
```

## Commit contract

A capability may become `ready` only when its provider can attach a concrete proof:

```txt
simulation -> live state owner and admitted clock
rendering  -> renderer + scene + world + composer + RAF
networking -> active transport role + connected/host-ready status
input      -> installed listeners + current input owner
```

## Revocation contract

```txt
revocation requires matching sessionId + runtimeGeneration + providerId
stale generation returns rejected-stale
already revoked returns no-change
partial initialization failure revokes acquired leases in reverse order
reset advances runtimeGeneration before old cleanup can publish
```

## Existing owners to update first

```txt
runtime-store-snapshot-kit
corridor-application-shell-kit
runtime-resource-cleanup-kit
corridor-animation-loop-kit
peer-host-transport-kit
peer-client-transport-kit
first-person-input-kit
corridor-render-world-kit
corridor-post-processing-kit
runtime-debug-frame-kit
```

## Required fixture matrix

```txt
solo mount success
host mount success
client mount success
renderer initialization failure
transport failure
listener installation failure
return to lobby
return to title
reset before unmount cleanup
strict-mode mount/unmount/remount
old cleanup after new generation starts
double cleanup
```

## Dependency order

```txt
run session identity
  -> runtime generation
  -> provider leases
  -> resource proofs
  -> atomic readiness commit
  -> generation-fenced revocation
  -> bounded observation
```

This is a documentation map. No runtime implementation was added.
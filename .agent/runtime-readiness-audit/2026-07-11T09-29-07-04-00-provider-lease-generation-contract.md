# Runtime Readiness Provider Lease and Generation Contract

**Timestamp:** `2026-07-11T09-29-07-04-00`

## Purpose

Define runtime readiness as a lease owned by the provider that holds the live resource, not as a mutable boolean shared by shell and canvas code.

## Capability record

```txt
capabilityId
sessionId
runtimeGeneration
revision
status
providerId
providerGeneration
proofId
requestedAtMs
committedAtMs
revokedAtMs
reason
```

## Providers

```txt
simulation -> authoritative local simulation or client prediction host
rendering  -> GameCanvas render host
networking -> host/client transport adapter
input      -> GameCanvas input owner
```

## Rules

1. A shell action may request a capability but cannot mark it ready.
2. A provider commits readiness only after all required resources exist.
3. A provider revokes only the lease it owns.
4. Reset increments `runtimeGeneration` before old resources are disposed.
5. Any old-generation commit or revocation returns `rejected-stale-generation`.
6. Solo networking remains unavailable unless a separate local transport is explicitly admitted.
7. Partial initialization failure rolls back acquired leases in reverse order.
8. Disposal and revocation are idempotent.
9. Readiness cannot be inferred from a received snapshot alone.
10. Debug output must expose the provider and proof behind every ready capability.

## Transition result

```txt
accepted-request
accepted-ready
accepted-revoked
rejected-stale-generation
rejected-provider-mismatch
rejected-invalid-transition
failed-resource-initialization
no-change-already-ready
no-change-already-revoked
```

## Proof examples

```txt
simulation: stateOwnerId + clockId
rendering: rendererId + worldId + composerId + firstFrameId
networking: transportId + role + connection status
input: listenerLeaseId + pointerLockTargetId
```

## Fixture contract

A deterministic fake lifecycle harness must support ordered calls for request, provider commit, reset, stale cleanup and revocation. It must prove that old cleanup cannot alter the latest generation and that final readiness exactly matches live resources.

No runtime implementation was added.
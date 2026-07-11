# HorrorCorridor Known Gaps

**Updated:** `2026-07-11T09-29-07-04-00`

## Queue-head identity gaps

- Lobby members do not distinguish real peers from reserved slots.
- Peer, member and player identities are not canonically bound.
- Transport events expose real connection identity, but gameplay dispatch trusts message claims.
- Room, run-session, epoch, request and sequence admission remain incomplete.

## Runtime readiness gaps

- `RuntimeReadiness` contains only four booleans.
- Readiness has no session ID, runtime generation, revision, provider identity or resource proof.
- `GameShell` can mark simulation, rendering and input ready before `GameCanvas` initializes their providers.
- Inbound SYNC marks all four capabilities ready from protocol receipt alone.
- Host/client lobby entry marks networking ready before a connected transport proof exists.
- `patchReadiness()` accepts every write without expected revision or generation.
- `resetRuntime()` can be followed by a late `GameCanvas` cleanup patch.
- `GameCanvas` cleanup always writes `networking: true`.
- Solo cleanup can therefore report networking ready despite no transport.
- An old mount can patch a replacement runtime generation.
- Partial initialization failure has no typed failure, rollback or lease revocation result.
- Readiness transitions are not journaled or correlated to resources.

## Concrete stale-write gap

```txt
returnToStart
  -> destroy transport
  -> resetRuntime readiness = all false
  -> GameCanvas unmount cleanup
  -> readiness.networking = true
```

## Render and input consequences

- Rendering can be reported ready before renderer, world, composer, canvas and RAF exist.
- Input can be reported ready before listeners are installed.
- A received snapshot can report rendering/input ready even if provider initialization fails.
- Debug output cannot identify which provider or frame proves readiness.
- Cleanup cannot prove that listeners, RAF and render resources belong to the same generation it revokes.

## Network consequence

- Networking readiness is not derived from transport role and status.
- Solo and disconnected states can be mislabeled ready.
- Return-to-lobby retains networking without a transport proof row.
- Stale cleanup can reassert networking after transport destruction.

## Dependent authority gaps

- Lobby readiness and start requests are not routed through host actor admission.
- Run exit does not commit one session epoch transition.
- Snapshot acceptance lacks duplicate, stale and conflict policy.
- Remote movement lacks speed, collision and temporal validation.
- Active clients do not reconcile predicted pose to host pose.
- Pause and resume remain local projection rather than replicated authority.

## Validation gap

Current package commands do not prove:

```txt
provider-owned readiness
runtime generation fencing
stale cleanup rejection
solo networking correctness
render first-frame readiness
input listener readiness
partial initialization rollback
idempotent cleanup
strict-mode mount/unmount/remount safety
readiness journal and proof projection
```

## Required guarantees

```txt
requested capability does not equal ready capability
one provider owns each ready capability
ready capability carries resource proof
reset advances runtime generation
old generation writes are rejected
solo networking remains false
return-to-title ends with all capabilities revoked
return-to-lobby networking requires a live transport lease
failed setup rolls back partial leases
cleanup is idempotent
final readiness exactly matches live resources
```
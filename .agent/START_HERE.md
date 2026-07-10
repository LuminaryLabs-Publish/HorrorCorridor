# HorrorCorridor START HERE

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Updated:** `2026-07-10T17-00-54-04-00`

## Current safe ledge

```txt
HorrorCorridor Request Identity Propagation + Authoritative Acknowledgement Fixture Gate
```

## Selection result

The full accessible `LuminaryLabs-Publish` inventory was compared against `LuminaryLabs-Dev/LuminaryLabs` and root `.agent` state. All nine eligible non-Cavalry repositories were tracked and documented. `HorrorCorridor` was the oldest eligible fallback. `TheCavalryOfRome` remained excluded.

```txt
HorrorCorridor       selected / prior central activity 2026-07-10T15-36-42-04-00
PhantomCommand       tracked  / 2026-07-10T15-48-27-04-00
ZombieOrchard        tracked  / 2026-07-10T15-55-49-04-00
TheUnmappedHouse     tracked  / 2026-07-10T16-07-30-04-00
MyCozyIsland         tracked  / 2026-07-10T16-17-08-04-00
TheOpenAbove         tracked  / 2026-07-10T16-28-54-04-00
PrehistoricRush      tracked  / 2026-07-10T16-37-25-04-00
AetherVale           tracked  / 2026-07-10T16-48-42-04-00
IntoTheMeadow        tracked  / 2026-07-10T16-58-28-04-00
TheCavalryOfRome     excluded by rule
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T17-00-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T17-00-54-04-00.md
.agent/architecture-audit/2026-07-10T17-00-54-04-00-request-acknowledgement-dsk-map.md
.agent/render-audit/2026-07-10T17-00-54-04-00-runtime-debug-request-ack-gap.md
.agent/gameplay-audit/2026-07-10T17-00-54-04-00-local-host-request-ack-loop.md
.agent/interaction-audit/2026-07-10T17-00-54-04-00-interaction-request-identity-map.md
.agent/network-authority-audit/2026-07-10T17-00-54-04-00-request-to-authoritative-ack-contract.md
.agent/protocol-audit/2026-07-10T17-00-54-04-00-protocol-request-ack-capability-map.md
.agent/deploy-audit/2026-07-10T17-00-54-04-00-request-ack-fixture-gate.md
```

## Current interaction loop

```txt
menu and session selection
  -> solo, host, or join
  -> room identity, readiness, and deterministic maze bootstrap
  -> GameCanvas initializes rendering, input, transport, cadence, and diagnostics
  -> pointer-lock movement updates local pose
  -> interact derives pickup, drop, place, or remove
  -> local authority applies a rule directly
  -> client sends TRY_INTERACT to host
  -> host applies the rule and publishes a SYNC snapshot
  -> client consumes the snapshot
  -> world, minimap, HUD, completion, and runtime debug update
```

## Main finding

The wire contract already has the beginning of a correlation mechanism, but the runtime does not use it.

```txt
ProtocolEnvelope already defines optional requestId for every message.
createInteractionRequestMessage accepts requestId.
createFullSyncMessage accepts requestId.
sendInteractionRequest does not create or pass requestId.
sendPlayerUpdate uses input.sequence but does not pass requestId.
the host logs PLAYER_UPDATE requestId but does not retain it in the result or publication path.
the host interaction log omits requestId.
publishAuthoritativeState does not accept or forward requestId.
local authority commands have no equivalent stable request identity.
runtime debug event ids are random display ids, not command correlation ids.
a rejected or no-op client command will need an acknowledgement even when publication is skipped.
```

The previous command-result and publish-parity work remains necessary. The immediate prerequisite is now a request and acknowledgement contract that survives both publish and no-publish decisions. Do not begin with renderer, minimap, PeerJS extraction, maze expansion, or visual polish.

## First implementation targets

```txt
HorrorCorridor-V1/src/features/networking/protocol/requestIdentity.ts
HorrorCorridor-V1/src/features/networking/protocol/commandAcknowledgement.ts
HorrorCorridor-V1/src/features/game-state/domain/pendingCommandLedger.ts
HorrorCorridor-V1/src/features/game-state/domain/authorityCommandConsumer.ts
HorrorCorridor-V1/src/features/debug/domain/runtimeDebugRequestProjection.ts
HorrorCorridor-V1/src/components/game/GameCanvas.tsx
HorrorCorridor-V1/scripts/horror-corridor-request-ack-fixture.mjs
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, deployment, branches, and pull requests were unchanged. Existing checks were not run.

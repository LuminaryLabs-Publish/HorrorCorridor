# Request Acknowledgement Fixture Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-10T17-00-54-04-00`

## Required command

```txt
npm run fixture:request-ack
```

## Proposed runner

```txt
HorrorCorridor-V1/scripts/horror-corridor-request-ack-fixture.mjs
```

## Gate rows

```txt
local accepted command
host accepted command
client request through host acknowledgement
rejected command with no snapshot publication
no-op command with no snapshot publication
request-sync recovery
duplicate request replay
pending request timeout
cadence sync without requestId
acknowledged snapshot tick
runtime-debug projection
legacy GameState parity
replicated snapshot parity
```

## Failure policy

The fixture must fail on missing request ids, duplicate mutation, unresolved pending requests, mismatched acknowledgement reasons, false snapshot ticks, or cadence messages carrying command request ids.

## Current status

The fixture, source contracts, package script, and deterministic rows do not exist. Existing commands were not run during this documentation-only pass.

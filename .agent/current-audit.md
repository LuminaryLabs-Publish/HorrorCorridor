# HorrorCorridor Current Audit

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Updated:** `2026-07-17T20-41-29-04-00`  
**Branch:** `main`  
**Status:** `peer-data-connection-open-admission-settlement-authority-audited`

## Summary

The repository retains 29 implemented kit surfaces and two browser-proof adapters. The current boundary is real PeerJS host DataConnection admission: `createHost()` registers an `open` listener and checks `connection.open`, then calls the same one-shot open emitter unconditionally. A pending channel can therefore publish `peer/connection-open`; the guard then blocks the later actual `open` event from adding corrective evidence.

## Plan ledger

**Goal:** admit room membership only after mode-correct connection-open settlement.

- [x] Compare the Publish inventory, central ledgers and root `.agent` states.
- [x] Select only HorrorCorridor by the oldest synchronized timestamp.
- [x] Inspect `createHost.ts`, `createClient.ts`, `GameShell.tsx` and `sessionStore.ts`.
- [x] Preserve all 29 kits, two adapters and offered services.
- [x] Confirm the unconditional host open emission.
- [x] Confirm the client real path waits for actual/already-open evidence.
- [x] Confirm roster mutation and joined publication consume the raw host event.
- [x] Add and route the timestamped connection-open audit family.
- [ ] Implement connection admission, settlement, timeout and cancellation.
- [ ] Execute delayed-open, close-before-open, error-before-open, stale-replacement and deployed-origin fixtures.

## Current host path

```txt
PeerJS connection candidate
  -> store connection
  -> attach open callback
  -> if connection.open, emit connection-open
  -> unconditionally emit connection-open
  -> connectionOpenEmitted = true
  -> later actual open callback becomes a no-op
  -> GameShell upserts guest
  -> room roster and visible lobby accept the guest
```

## Main finding

Candidate observation, actual data-channel readiness, lobby membership and visible guest projection are collapsed into one raw event. The same-origin BroadcastChannel bridge intentionally models synchronous readiness, but the real PeerJS path requires actual `open` evidence. No transport-mode policy, connection generation, open result, timeout, close/error-before-open settlement, first accepted message acknowledgement or first accepted guest frame acknowledgement exists.

## Required authority

```txt
corridor-peer-data-connection-open-admission-settlement-authority-domain
```

## Required results

```txt
ConnectionOpenAdmissionResult
ConnectionOpenSettlementResult
LobbyMembershipCommitResult
PlayerJoinedPublicationResult
FirstAcceptedPeerMessageAck
FirstAcceptedGuestLobbyFrameAck
```

## Claim boundary

Documentation only. No runtime incident was reproduced and no corrected connection admission, roster guarantee, accepted-message proof, guest-frame proof or deployment parity is claimed.
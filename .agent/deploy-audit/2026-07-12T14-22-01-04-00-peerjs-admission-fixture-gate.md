# Deploy Audit: PeerJS Admission Fixture Gate

**Timestamp:** `2026-07-12T14-22-01-04-00`

## Summary

Current package scripts include build, lint, harness, visual and live-player checks, but no fixture controls PeerJS `DataConnection.open`, delayed-open, never-open, error-only or start-during-opening behavior. Deployment cannot claim a truthful shared lobby until those event-order cases are executable.

## Plan ledger

**Goal:** require deterministic connection-admission and roster-parity proof before multiplayer deployment readiness is promoted.

- [x] Inspect declared package scripts.
- [x] Identify missing transport-event controls.
- [x] Define fixture and artifact requirements.
- [x] Preserve existing build and live-player gates.
- [ ] Add fixtures and CI integration after runtime implementation.

## Existing declared commands

```txt
npm run build
npm run lint
npm run harness:horror-corridor
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run smoke:protokits
npm run visual:match
npm run validate:live-player
```

None currently proves data-channel admission ordering.

## Required deterministic adapter

The test harness needs an injectable PeerJS-compatible adapter that can control:

```txt
peer open time
connection candidate arrival
connection.open initial value
data-channel open callback time
data delivery
connection error
connection close
missing close after error
reconnect generation
```

## Required fixture matrix

```txt
1. connection candidate open=false
   expected: no connected member

2. delayed open
   expected: exactly one admission after open

3. never-open connection
   expected: timeout/rejection and no roster mutation

4. error without close
   expected: terminal cleanup and no ghost member

5. close before open
   expected: candidate retirement and unchanged roster

6. duplicate open callback
   expected: one roster revision only

7. start during opening candidate
   expected: start rejected or candidate excluded under explicit policy

8. start after admitted roster seal
   expected: bootstrap roster equals admitted roster

9. initial lobby publication failure
   expected: no shared-lobby readiness claim

10. host/client visible parity
    expected: screenshots and debug frames cite same roster revision
```

## Required artifacts

```txt
fixture configuration
ordered event transcript
connection candidate journal
admission command/result log
roster revision history
lobby publication delivery results
host and client debug snapshots
host and client screenshots
first visible roster-frame acknowledgements
build/lint output
commit SHA and artifact hashes
```

## Deployment gate

Do not claim multiplayer lobby readiness until:

```txt
actual open evidence gates admission
never-open/error-only candidates cannot create members
start eligibility excludes unadmitted candidates
host and client agree on one roster revision
first visible lobby and gameplay frames cite that revision
```

No workflow or deployment configuration was changed.
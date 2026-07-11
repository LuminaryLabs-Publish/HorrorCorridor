# HorrorCorridor Lobby Authority Contract

**Timestamp:** `2026-07-10T20-08-46-04-00`

## Authority invariant

Only the host lobby reducer may mutate authoritative readiness, roster revision, room phase, or start-admission state. Clients may request changes and may display pending intent, but local presentation state is not authoritative.

## Current authority distribution

```txt
GameShell
  owns client local toggle
  owns host membership updates
  owns host start orchestration
  owns room/screen projection

sessionStore
  mutates local room and lobby arrays

GameCanvas/networkRules
  recognizes toggle-ready as an active-game action
  intentionally performs no mutation

protocol
  exposes several readiness names
  has no canonical readiness route
```

## Required authoritative state

```ts
type LobbyAuthorityState = Readonly<{
  roomId: string;
  hostPlayerId: string;
  phase: "lobby" | "starting" | "active" | "closed";
  rosterRevision: number;
  roster: readonly LobbyParticipant[];
  pendingStartId: string | null;
  admittedRosterFingerprint: string | null;
  lastResult: LobbyCommandResult | null;
}>;
```

## Participant classification

```txt
real-host
real-client
placeholder-debug
 disconnected-real-client
```

Only real connected participants may enter the admitted roster. Placeholder rows must be excluded or explicitly converted into a separately controlled bot domain before gameplay bootstrap.

## Readiness mutation rules

1. The actor must be an authoritative roster member.
2. The envelope room, command room, and authority room must agree.
3. The command roster revision must match or be classified stale.
4. Disconnected participants cannot become ready.
5. The host readiness policy must be explicit; recommended default is host implicitly ready.
6. Repeating the current desired value is `no-change`, not a new mutation.
7. Accepted mutation increments the roster revision exactly once.
8. The host publishes the complete authoritative roster after acceptance.

## Start admission rules

1. Caller is the active host.
2. Phase is exactly `lobby`.
3. No other start transaction is pending.
4. At least one real participant exists.
5. Participant count does not exceed room capacity.
6. Every required real client is connected and ready.
7. No placeholder/debug participant is admitted.
8. Evaluated roster revision remains current at commit.
9. The admitted roster is sealed before bootstrap.
10. `starting` is published before asynchronous loading or generation.
11. Bootstrap either commits `active` with the same fingerprint or atomically rolls back to `lobby`.

## Fingerprint inputs

```txt
roomId
hostPlayerId
rosterRevision
ordered participant ids
roles
connection states
ready states
participant kinds
```

Display names and timestamps should not make the admission fingerprint nondeterministic.

## Debug ledger rows

```txt
commandId
kind
actorPlayerId
status
reason
roomId
rosterRevisionBefore
rosterRevisionAfter
rosterFingerprintBefore
rosterFingerprintAfter
phaseBefore
phaseAfter
admittedRosterFingerprint
publishedEventType
recordedAtMs
```

## Failure containment

A rejected or failed start must not create a maze, mutate runtime stores, set the playing screen, publish START_GAME, publish initial SYNC, or leave the room in `starting`.

## Next safe ledge

```txt
HorrorCorridor Lobby Readiness Authority + Start Admission Fixture Gate
```
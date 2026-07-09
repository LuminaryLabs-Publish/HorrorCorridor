# Command Authority Audit: Central Ledger Result Fixture Contract

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-09T06-51-11-04-00`

## Authority problem

`HorrorCorridor` needs a first-class command result contract before more rendering, object kits, PeerJS extraction, or GameCanvas restructuring.

The current rules are correct enough to play, but not correct enough to prove:

```txt
- accepted versus rejected
- skipped versus unchanged
- publish-only recovery versus no-op
- local consumer versus host consumer behavior
- final victory intent
- runtime debug command explanation
```

## Contract target

```ts
CommandEnvelope = {
  id: string;
  source: 'local' | 'host-peer' | 'client-peer' | 'fixture';
  type: 'player-update' | 'try-interact' | 'request-sync' | 'toggle-ready' | 'cancel' | 'ooze-tick';
  playerId: string | null;
  action?: string;
  payload?: unknown;
}

CommandResult = {
  command: CommandEnvelope;
  status: 'accepted' | 'rejected' | 'unchanged' | 'skipped' | 'publish-only' | 'victory';
  reason: CommandReason;
  before: SnapshotSummary;
  after: SnapshotSummary;
  changed: boolean;
  state: GameState;
  events: readonly CommandEvent[];
  diagnostics: CommandDiagnostics;
}

PublishDecision = {
  kind: 'publish' | 'skip' | 'recovery' | 'no-op' | 'victory';
  shouldBroadcast: boolean;
  shouldCommitVictory: boolean;
  snapshotReason: 'resync' | 'recovery' | 'initial' | 'join' | 'victory' | 'none';
}
```

## Reason catalog seed

```txt
accepted:pickup
accepted:drop
accepted:place
accepted:remove
accepted:player-update
accepted:held-cube-sync
accepted:ooze-tick
victory:ordered-sequence-complete

rejected:not-playing
rejected:missing-player
rejected:already-carrying
rejected:no-nearby-cube
rejected:no-carried-cube
rejected:missing-anomaly-cell
rejected:too-far-from-anomaly
rejected:no-free-slot
rejected:no-occupied-slot
rejected:wrong-slot
rejected:missing-cube-id

unchanged:player-missing
unchanged:held-cube-already-synced
unchanged:no-state-diff

publish-only:request-sync

skipped:toggle-ready-policy-not-implemented
skipped:cancel-policy-not-implemented
skipped:unknown-action
```

## Fixture contract

Every fixture row should include:

```txt
fixture id
seed id
command id
command source
command type
player id
action
before summary
expected status
expected reason
expected changed flag
expected publish decision
expected shouldBroadcast
expected shouldCommitVictory
expected snapshot reason
expected cube facts
expected slot facts
expected local consumer action
expected host consumer action
expected runtime debug projection
final summary
volatile normalization list
pass/fail result
```

## Legacy adapter rule

Do not remove existing exports.

```txt
pickUpCube(...) -> GameState remains available
dropCube(...) -> GameState remains available
placeCubeAtEndAnomaly(...) -> GameState remains available
removeCubeFromEndAnomaly(...) -> GameState remains available
applyNetworkPlayerUpdate(...) -> GameState remains available
applyNetworkInteractionRequest(...) -> GameState remains available
syncHeldCubesToPlayers(...) -> GameState remains available
```

Add result-returning wrappers beside them, then adapt legacy exports from `result.state` only after fixture proof.

## GameCanvas consumer rule

Only after the fixture passes:

```txt
local applyInteraction path consumes LocalAuthorityCommandConsumer result
host PLAYER_UPDATE path consumes HostAuthorityCommandConsumer result
host TRY_INTERACT path consumes HostAuthorityCommandConsumer result
publishAuthoritativeState receives explicit PublishDecision context
runtime debug receives RuntimeDebugCommandProjection
legacy snapshot shape remains unchanged
```

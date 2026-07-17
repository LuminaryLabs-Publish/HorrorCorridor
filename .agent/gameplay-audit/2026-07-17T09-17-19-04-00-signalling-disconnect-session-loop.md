# Signalling Disconnect Session Loop

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Current loop

```txt
host/client session active
  -> PeerJS signalling disconnects
  -> adapter publishes reconnecting
  -> GameShell projects reconnecting
  -> existing DataConnection may remain active
  -> simulation, snapshots and rendering continue by existing path
  -> no reconnect attempt is started
  -> new connection acceptance/creation remains unproven
```

## Gameplay risk boundary

The source does not prove that an active run immediately stops when signalling is unavailable. Existing DataConnections may remain alive. The gap is that gameplay, lobby admission and recovery status do not share one explicit settlement:

- active peers may continue exchanging state;
- a host may be unable to accept a replacement client;
- a client may be unable to create a replacement connection;
- the UI may remain `reconnecting` indefinitely;
- an explicit user disconnect has no terminal-intent generation to defeat late disconnect events;
- no recovered snapshot or remote-player frame closes the loop.

## Required gameplay policy

```txt
active data path retained
  -> continue current session under bounded degraded state
  -> disable claims that require signalling availability

active data path lost
  -> pause, fail, reconnect or return to lobby by explicit product policy

recovery settled
  -> accept matching snapshot/message revision
  -> render matching remote actor state
  -> acknowledge recovered gameplay frame
```

## Claim boundary

No session loss, frozen player, duplicate peer or false recovery incident was reproduced. Runtime behavior remains unchanged.
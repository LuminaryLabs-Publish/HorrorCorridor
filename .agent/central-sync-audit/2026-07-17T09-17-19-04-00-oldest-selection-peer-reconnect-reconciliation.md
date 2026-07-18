# Oldest Selection and Peer Reconnect Reconciliation

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Selection result

```txt
Publish inventory: 11
excluded: LuminaryLabs-Publish/TheCavalryOfRome
eligible: 10
central-ledger missing: 0
root .agent missing: 0
new or undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/HorrorCorridor
rule: oldest synchronized central timestamp
prior timestamp: 2026-07-17T03-58-09-04-00
next oldest: LuminaryLabs-Publish/ZombieOrchard at 2026-07-17T04-41-15-04-00
```

## Repo-local reconciliation

This audit adds one new timestamped tracker family and refreshes root routing without changing runtime code. The complete 29-kit and two-adapter inventory remains authoritative.

```txt
status: peer-signalling-reconnect-admission-settlement-authority-audited
parent domain: corridor-peer-signalling-reconnect-admission-settlement-authority-domain
implemented surfaces: 31
planned reconnect surfaces: 20
```

## Central record required

```txt
repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
internal-change-log/2026-07-17T09-17-19-04-00-horror-corridor-peer-signalling-reconnect.md
```

## Boundary

Central reconciliation records documentation findings only. It does not claim that PeerJS reconnect, retry, session continuity, recovered messages or recovered frames are implemented.
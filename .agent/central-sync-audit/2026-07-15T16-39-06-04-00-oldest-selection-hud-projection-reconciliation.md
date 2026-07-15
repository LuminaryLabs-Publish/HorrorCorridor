# Oldest Selection HUD Projection Reconciliation

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`  
**Timestamp:** `2026-07-15T16-39-06-04-00`

## Summary

The complete current Publish inventory contains 11 accessible repositories. After excluding `TheCavalryOfRome`, all ten eligible repositories had central ledgers, root `.agent` audit state and current heads matching their recorded repo-local documentation heads. HorrorCorridor therefore qualified under the oldest synchronized timestamp rule.

## Plan ledger

**Goal:** record the selection proof and central reconciliation boundary for the active gameplay HUD audit.

- [x] Enumerate the organization inventory.
- [x] Exclude Cavalry of Rome.
- [x] Compare central ledger presence.
- [x] Compare current and documented heads.
- [x] Apply the oldest synchronized fallback.
- [x] Select and modify only HorrorCorridor.
- [ ] Bind the final repository head in the central ledger after repo-local finalization.

## Comparison

```txt
accessible repositories: 11
excluded repositories: 1
eligible repositories: 10
central ledgers: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/HorrorCorridor
prior timestamp: 2026-07-15T11-39-04-04-00
next oldest: LuminaryLabs-Publish/TheOpenAbove
next timestamp: 2026-07-15T12-02-38-04-00
```

## Eligible head comparison

```txt
HorrorCorridor    69d81c1a83e98d67b0d925d4c564f9755fbb0a93 matched
AetherVale        b5c3257c52278c8a3c29b2ed7f2dcbfb4be38560 matched
TheOpenAbove      86d3847e89a148671dca8487a9afbbb0a1e04951 matched
PhantomCommand    b31341b961c54caf75fb2690a5bfc6a8a0269e4e matched
PrehistoricRush   bfc51c01a79601686e5fad12ff3240472b3f111c matched
ZombieOrchard     144a6c7d6d0388e94c3ca6b2881b5886f6d359d4 matched
IntoTheMeadow     a502f9789573704c81f05510d51a5e0deac52dde matched
MyCozyIsland      dc3ef1a0c638fcef11123e4819af53f71f8aeb5e matched
TheUnmappedHouse  ebaf766a41671f59c5d53204e483c90d989604a1 matched
TheLongHaul       cc4ec1d7ad16e6aa29e7719203d5411217142f25 matched
```

## Chosen finding

```txt
PLAYING HUD substitutes settings/debug surfaces for the complete gameplay HUD
objective, sequence, held-item, player-status and minimap surfaces are not mounted
GameCanvas continues submitting minimap draw work against a missing canvas
COMPLETED mounts the fuller HUD and minimap
```

## Central records required

```txt
repo-ledger/LuminaryLabs-Publish/HorrorCorridor.md
internal-change-log/2026-07-15T16-39-06-04-00-horror-corridor-active-gameplay-hud-projection.md
```

## Validation boundary

Selection and source inspection are documented. Runtime repair and deployed-origin proof remain future work.
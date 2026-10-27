# Sequence overhaul checkpoint

## Doorway opening and practical lighting — 2026-10-26

The browser now starts in the scene at the lower-service entrance. Clicking the
physical door opens it and moves the player briefly into the route; the separate
title/start panel is removed. Corridor and room fixtures use localized downward
spotlights, and corridor walls and ceilings cast shadows. In the fresh browser
review, the flashlight illuminated a localized patch on each side wall without
visible spill through it. Overall darkness and fixture readability still need
human tuning; this is not final lighting acceptance.

Fresh checks passed: TypeScript, ESLint, runtime proof, Nexus consumer proof,
production build and `git diff --check`. Playwright confirmed door entry,
movement stopping at 2m after the brief step, and left/right look views with no
browser errors after the app icon was added. Two WebGL upload warnings remain in
the development browser; their cause and production-browser behavior are
unverified. No encounter, audible, multiplayer, headset or full-route acceptance
was performed in this review.

## Puzzle-room continuation

The browser now enables a shared Room domain with 50 separate authored kits,
physical exit locks and no escape-instruction panel. Read
[the room checkpoint](./room-kits.md) for proof, remaining family-specific fidelity
and acceptance limits. This intentionally changes the earlier always-open route
in puzzle mode; reference runtime behavior remains available without room puzzles.

## Native Quest continuation

The current direction is a Nexus-authored Rust/OpenXR APK, not a PWA wrapper.
The first native milestone remains blocked, not implemented. The existing engine
pin and desktop runtime are unchanged. Read [the native checkpoint](./native-quest.md)
for the real Build inspection failure, ownership constraints and resume command.
The historical publication evidence below describes the earlier desktop baseline.

Updated: 2026-10-26. Status: **development baseline; full game remains in progress**.

The authorized scope is [the complete plan](./plan.md). This checkpoint is not a reduced replacement scope. No final release or eight-hour completion is claimed.

## Current implementation

- Root Next.js candidate: `npm ci`, `npm run dev` (localhost:4173).
- The in-scene door entry and practical-light pass are described above; they do not complete the puzzle route or lighting acceptance.
- Browser-free domain runtime under `src/game`; the browser selects `worldMode: "composed"`.
- Nexus pinned to `a74e8689d1a71c0b42236c009f0f4c46e9b89387`; public import consumer proof in `tools/nexus-migration`.
- One seeded `base-corridor` grammar replaces the six fixed active environments. Geometry, fixtures, clues and encounter roles vary by seed/index. **256m is the composed traversal proof distance, not a route cap.** Lighting/materials still use renderer conventions; full variation and authored campaign coverage remain unfinished.
- Composition injects Corridor's place-residency service. Residency retains previous/current/next places and may additionally retain the threat's place. Presentation maps snapshots to screen/HUD/objective descriptors.
- Shared placement definitions drive room geometry, fixture collision and navigation. Stable definition/instance IDs, bounded neighboring residency, pure Nexus A* path queries and passage sequence checkpoints are implemented.
- Difficulty filters water encounters out of dry locations, tunes response windows and avoids recent families. This is not the full eligibility contract.
- Root save/network/snapshot schemas use `/2`; V2 `/1` data is not silently imported.
- Existing runtime proof was ported and extended; the reference-policy mode remains for migration comparisons. Its 1,920m/124-manifestation output does not describe the new composed route's unique content.

## Verified evidence

- Frozen V1 fresh install and production build passed.
- Existing V2 validation passed. A fresh restored V2 browser proof failed the upcoming `boiler-shrine` assertion. Historical live reports are not fresh acceptance.
- Public Nexus consumer proves installation, dependency rejection, A*, operation receipts, sequence events and fixed clock behavior.
- New composed runtime proof passes connector continuity, collision along the main route, bounded residency, eligible selection, spatial stalking, pause, save/load and continuation during sign/approach/blackout/last chance, collection, offering continuity and retained Index.
- Latest root `npm run lint`, `npm run typecheck`, `npm run proof:runtime` and `npm run build` passed after residency-key and stale-snapshot fixes. The runtime proof does not replace real multiplayer recovery proof.
- Browser startup and movement/left/right captures produced no page errors. Local images are under `artifacts/overhaul/greybox-reviewed/`. This is a greybox inspection, not final visual, audible or performance acceptance.
- V1/V2 tracked source remains unchanged.

### Publication validation — 2026-09-20

- TypeScript, ESLint, runtime proof, Nexus consumer proof, production build and diff whitespace checks passed on the publication candidate.
- Fresh Playwright captures are local under `artifacts/publish-review/`: spawn, movement, left/right, warning, capture and restart. Traversal reached 106m across generated places. Browser capture/restart completed with no page errors.
- Human inspection finds readable floor/wall separation, route markers and primitive fixtures. This is limited greybox acceptance; the supporting image metric failed its brightness threshold (63.87% dark, 8.45% readable pixels). Final lighting and visual quality are not accepted.
- WebAudio unlocked and reported a running context and encounter cue. Audible recording/listening and sound-mix acceptance remain unverified. Semantic stepping proves state transitions, not real-time performance.
- Outgoing files were checked for common credential patterns and private-key markers with no matches. This is a bounded source review, not a complete security audit. PeerJS message admission/payload validation and malformed-save handling remain hardening work; multiplayer is experimental.
- No GitHub Actions workflows are configured. Local proof is the available validation authority for this development baseline.

## Preservation

- Original main: `539982a8764ade914659e4b912a2d56b6cb5337e`.
- Work branch: `codex/horror-sequence-overhaul`.
- Frozen local ref: `archive/horror-before-sequence-overhaul-20260910`.
- Restore checkout: `/Users/crimsonwheeler/.codex/worktrees/horror-sequence-baseline-20260910`.
- Local bundle and dirty-worktree file backups: `.git/overhaul-preservation/2026-09-10T07-07-30.518Z/manifest.json`.
- Bundle SHA-256: `b24af5c17644f5fa20e42c6526ca197c74c8fe5bc55ea4db71e634f38cfd2901`.
- Thirteen older swarm worktrees were inventoried, including two dirty ones and four unique commit tips. None were cleaned or merged.
- Backups are local, not an off-device archive. Ignored assets and executable/symlink/staging metadata need a fuller restoration audit before deletion is allowed. No deletion gate has passed.

## Remaining implementation and release gates

| Plan area | Status and next proof |
| --- | --- |
| Product contract | Scope retained; co-op behavior, final target hardware and final campaign acceptance remain unresolved. |
| Freeze | Source baseline and dirty patches preserved; prove complete restore before cleanup. |
| Nexus migration | Consumer/reference checks pass; full gameplay adapters and complete ownership graph still need reconciliation. |
| Domain ownership | Five owners and two stateful subservices exist; legacy behavior wrappers/renderer remain to be decomposed. |
| Place compositions | Generated straight corridors; alcoves, reconnecting side routes, richer affordances and difficulty-shaped variation remain. |
| Greybox | Main route passes; every room activity, side exploration, fixture interaction and player-view gate remains. |
| Sequences | Place readiness/entry/departure checkpoint exists; warning, response, reward, cancellation and authority handoff sequences remain. |
| Difficulty | Initial filtering exists; clearance, affordance combinations, threat budgets and fallback proofs remain. |
| Stalking | A* movement exists; perception/lost-contact, pursuit obstacle browser proof and navigation cache budgets remain. |
| Model replacement | Presentation IDs exist; asset/model sockets, bounds, collision and animation parity gates remain. |
| Next host | Boots/builds; startup cleanup, atomic malformed-save rejection, real host/client recovery and browser lifecycle checks remain. |
| Authoring | Root has preview pieces and compatible semantic controls; existing MCP/proof manager has not been migrated to the new root authority. Do not start a second MCP. |
| Campaign | Generated route extent is not authored campaign coverage. Chapters, distinctive encounters, activities, pacing, finale and full-run evidence remain. |
| Final presentation | Final models, animation, particles, audio mix, accessibility and agreed hardware performance acceptance remain. |
| Promotion | This publication is a development baseline. Full campaign, visual/audio, multiplayer and performance release gates remain. |

## Next action

Review corridor continuity and residency across several seeds, including backward movement, seams, threat retention and long-run lookup cost. Then finish encounter presentation/audio evidence through the existing harness. Keep work bounded before expanding content. This checkpoint does not claim completion of the full plan.

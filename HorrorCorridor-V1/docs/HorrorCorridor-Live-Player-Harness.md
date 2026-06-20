# HorrorCorridor Live Player Harness

Status: active

## Purpose

`scripts/horror-corridor-live-player-harness.mjs` is the repo-local live-player validation harness for HorrorCorridor. It is aligned with NexusSimulator's Playwright simtime vocabulary, but it stays local to this repo so HorrorCorridor-specific debug gates, screenshot thresholds, and scene-dressing checks can evolve with the game.

## Command

```bash
npm run validate:live-player
```

The default package script launches a headed Chrome CDP profile on port `9224` and attaches to it because local headless Chromium launches are unstable in this environment.
Run the app separately before invoking the default validation command. The preferred local flow is:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
npm run validate:live-player
```

Useful variants:

```bash
npm run validate:live-player -- --dry-run
npm run validate:live-player -- --url http://localhost:3000/?debug=frames
npm run validate:live-player:dev
npm run validate:live-player -- --browser-executable /path/to/chrome-or-headless-shell
npm run validate:live-player -- --browser-engine all
npm run validate:live-player -- --browser-engine webkit
npm run validate:live-player -- --launch-cdp-chrome --cdp-port 9225
npm run validate:live-player -- --cdp-url http://127.0.0.1:9222
npm run validate:live-player -- --center-crop-ratio 0.82
```

## Harness Class

- Class: hybrid harness.
- Agent boundary: local script controls a browser actor and reads HorrorCorridor debug state.
- NexusSimulator boundary: command shape mirrors `openPage`, `click`, `holdKey`, `assertCanvasExists`, `captureScreenshot`, and `assertGlobalState`.
- HorrorCorridor boundary: product-specific gates stay here because NexusSimulator does not know this game's debug schema or visual thresholds.
- Capture boundary: the harness tries CDP attach first when a reachable `--cdp-url` or default local CDP port exists, then falls back to Playwright browser engines.

## Flow

1. Open `/?debug=frames`.
2. Click `Create a room`.
3. Click `Start run`.
4. Enable debug extraction and hide the debug overlay.
5. Wait for `latestFrame.screen === "PLAYING"`.
6. Capture `starting-scene.png` before movement.
7. Hold `W` and verify local pose changes.
8. Capture `movement-scene.png` after movement.
9. Compute center-cropped starting-scene luminance with Python/Pillow when available.
10. Validate scene-dressing counts from `window.__HORROR_CORRIDOR_DEBUG__.extractState()`.
11. Write a JSON report to `docs/live-player-harness/latest/report.json`.

## Gates

- `canvasMounted`: the largest canvas has a non-zero size.
- `playingReached`: debug frame reaches `PLAYING`.
- `movementChanged`: pressing `W` changes the local pose by at least `0.25` world units.
- `hiddenPlayUi`: body text is empty after entering `PLAYING` and hiding the debug overlay.
- `propCount`: scene dressing reports at least `48` props.
- `textureCount`: scene dressing reports at least `96` texture/decal descriptors.
- `lightCount`: scene dressing reports at least `8` lights.
- `luminanceReadable`: center-cropped screenshot has `darkRatio <= 0.55` and `lightRatio >= 0.15`.

## Outputs

Default artifact folder:

```text
docs/live-player-harness/latest/
├── report.json
├── movement-scene.png
└── starting-scene.png
```

`report.json` records:

- browser launch mode or launch blocker;
- debug state before and after movement;
- movement delta;
- visible text sample;
- canvas size;
- scene-dressing summary;
- luminance summary when available;
- pass/fail/blocked status.

## Failure Policy

- `passed`: all gates pass and no console/page errors were captured.
- `failed`: browser ran but a game, screenshot, movement, UI, or visual gate failed. The command exits non-zero.
- `blocked`: browser launch, navigation, app boot, or harness infrastructure failed. The command exits non-zero.
- `dry-run`: no browser was launched; only the harness contract and thresholds were emitted.

Browser launch failure is not treated as visual success. The harness writes the blocker into `report.json` so future work can distinguish "game failed" from "local browser proof unavailable."

## Known Limits

- This harness uses CPU center-cropped screenshot luminance thresholds so browser chrome and non-game margins do not mask a dark player view. It does not yet perform semantic image comparison against the generated target scene.
- The current no-UI gate counts visible text only. A screenshot review on 2026-06-19 still found a bottom-left compass/marker in active play, so future harness hardening should add DOM or image checks for icon-only HUD chrome.
- It validates the host path first. Client-path multiplayer simulation should be added after the host visual proof is stable.
- It depends on Playwright from this repo or the local NexusSimulator checkout. If both are missing, it reports `blocked`.
- It can launch a headed Chrome CDP profile with `--launch-cdp-chrome`, or attach to an already-running debug browser with `--cdp-url`. This is the preferred workaround when local Playwright browser launching fails.
- Python/Pillow is used for luminance. If unavailable, the luminance gate fails until a JS image decoder or alternate capture backend is added.

## Latest Run

- `node --check scripts/horror-corridor-live-player-harness.mjs`: passed.
- `npm run validate:live-player -- --dry-run`: passed and wrote `docs/live-player-harness/latest/report.json`.
- `npm run validate:live-player`: passed against a fresh production server.
- Launch mode: `cdp:http://127.0.0.1:9224`.
- Movement delta: `8.2584` world units.
- Visible text: `0` characters.
- Luminance: `darkRatio=0`, `lightRatio=0.9668`, average luminance `52.4023`.
- Scene dressing: `propCount=140`, `textureCount=260`, `lightCount=27`, `walkthroughCheckpointCount=8`.
- Current status: harness infrastructure is present and produces current player-view screenshot proof through the CDP backend. Headless Chromium/WebKit/Firefox launching remains unstable, but it no longer blocks validation.
- Human-view caveat: the latest screenshot is readable and HUD-free, but still below the target concept. It has primitive pale prop slabs, a flatter green palette than intended, and weak focal/anomaly lighting.

## CDP Workaround

If the default package script needs a different port, run:

```bash
npm run validate:live-player -- --launch-cdp-chrome --cdp-port 9225
```

To attach to an already-running debug browser instead, run:

```bash
npm run validate:live-player -- --cdp-url http://127.0.0.1:9222
```

# HorrorCorridor Live Luna Run — 2026-07-17

Status: completed by authoritative game loss

## Run Contract

- Run directory: `docs/live-agent/runs/2026-07-17T18-42-11-807Z`
- Model: `gpt-5.6-luna`
- Reasoning: `low`
- Service tier: `priority`
- Prediction concurrency: `1`
- Artificial interval: `0 ms`
- Recent-call context: current episode plus the last three completed calls
- Browser/game continuity: one CDP browser page and one expedition session
- Normal stop condition: authoritative expedition phase `caught`

The first attempted live run at `docs/live-agent/runs/2026-07-17T18-36-34-085Z` exposed a stale six-hour CDP transport. Its first Luna call completed in 7,824 ms and correctly marked the missing episode evidence blocked. The stale Chrome process was replaced, a direct persistent-session transport proof passed, and the final run began from a fresh expedition.

## Call Log

| Call | Action | Authoritative result | Luna judgment | Call time | Gap after prior call |
| --- | --- | --- | --- | ---: | ---: |
| 1 | `forward` | Intro crossed; phase `exploring` | inconclusive; continue forward | 26,180 ms | — |
| 2 | `forward` | Still Guest approaching; bearing `2.920`; distance `16.773` | partially confirmed; turn right | 22,467 ms | 15,199 ms |
| 3 | `turn-right` | bearing `1.743`; distance `12.976` | partially confirmed; turn right | 18,433 ms | 11,754 ms |
| 4 | `turn-right` | bearing `0.571`; distance `9.316` | partially confirmed; turn right | 90,974 ms | 25,111 ms |
| 5 | `turn-right` | full scare reached; exact blackout begins at `3,000 ms` | partially confirmed; turn left | 23,536 ms | 42,257 ms |
| 6 | `turn-left` | light restored; `last-chance`; `4,932 ms` remain | partially confirmed; turn left | 47,416 ms | 19,970 ms |
| 7 | `turn-left` | phase `caught`; jumpscare resolved; score `0` | confirmed; stop | 20,532 ms | 19,136 ms |

## Timing Summary

- Real Luna calls: `7`
- Total model-call time: `249,538 ms`
- Mean model-call time: `35,648 ms`
- Fastest model call: `18,433 ms`
- Slowest model call: `90,974 ms`
- Mean completion-to-next-call-start gap: `22,238 ms`
- Smallest gap: `11,754 ms`
- Largest gap: `42,257 ms`

There was no configured sleep. The logged gaps are browser attachment, screenshot/state capture, two-second action execution, report generation, and prompt construction. Call 4 was a provider-latency outlier.

## Gameplay Proof

- Call 2 changed the Still Guest Index entry from `unknown` to `seen`.
- Calls 2–4 prove that sequential judgments read prior output and reduce encounter bearing over time instead of cycling actions blindly.
- Call 5 proves the monster, not random flicker, triggered the full scare and exact three-second flashlight blackout.
- Call 6 proves the light returned into a response window below ten seconds.
- Call 7 proves failed response caused jumpscare defeat and the authoritative `caught` terminal state.
- The run manifest ended with `stopReason: authoritative game loss after 0 survived encounters` and process exit code `0`.

## Evidence

- Manifest: `docs/live-agent/runs/2026-07-17T18-42-11-807Z/run-manifest.json`
- Full chronological log: `docs/live-agent/runs/2026-07-17T18-42-11-807Z/agent-log.jsonl`
- Final structured call: `docs/live-agent/runs/2026-07-17T18-42-11-807Z/latest-summary.json`
- Final failed-run frame: `docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0007-turn-left/movement-scene.png`
- Separate visible jumpscare frame: `docs/live-player-harness/loss-proof/jumpscare-final.png`

## Remaining Quality Work

- The player can lose correctly, but this run did not prove an early repel, full-scare survival, collected Index entry, room-offer claim, or progression into later buildings; existing targeted proof artifacts cover the Index states, while a later live run should prove the full survival branch in one continuous session.
- Live encounter frames intentionally become very dark, so the general spawn luminance threshold fails during pressure. A future encounter-specific visual gate should distinguish intentional blackout/near-black danger from unreadable normal exploration without weakening the spawn gate.
- The model/action loop is genuinely sequential but not yet minimal-latency. Keeping Playwright attached inside the parent process would remove repeated CDP attachment and screenshot-analysis startup costs.

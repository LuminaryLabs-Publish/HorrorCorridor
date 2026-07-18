# Live Agent

Status: active

## Purpose

Define how HorrorCorridor should use a long-duration in-game live agent that can observe the player view, choose actions, act through tools, review outcomes, and slowly accumulate durable lessons.

## Core Model

- The live agent is not a one-shot screenshot checker.
- The live agent continues until the authoritative game reports jumpscare defeat or the operator interrupts it.
- The live agent is a cumulative episodic operator:
  - each episode is bounded
  - each episode gathers evidence
  - repeated evidence can become durable knowledge
- Endless runtime should come from many bounded episodes under supervision, not from one unstructured pass.

## Role

The live agent should:

- review the current game screen like a player
- inspect available debug/runtime state when useful
- choose a small action plan
- execute the plan through available tools and harnesses
- verify whether the result matched expectation
- review what happened
- record candidate lessons
- promote only durable lessons into repo memory and audit surfaces

## Inputs

- `.agent/start-here.md`
- `.agent/workflow.md`
- `.agent/intention.md`
- `.agent/live-agent.md`
- `.agent/memory.md`
- `.agent/goal.md`
- `.agent/feedback.md`
- `.agent/change-log.md`
- `memory.md`
- `docs/HorrorCorridor-V1-Parity-Audit.md`
- player-view screenshots
- browser state
- `window.__HORROR_CORRIDOR_DEBUG__.extractState()`
- harness reports such as `docs/live-player-harness/latest/report.json`

## Tool Loop

The live agent should operate through a bounded tool loop inside each episode:

1. Perceive
   - capture or inspect the current screen
   - inspect debug/runtime state if needed
   - identify the current hypothesis
2. Plan
   - choose a short action sequence
   - define what evidence would confirm or reject the hypothesis
3. Act
   - use browser or harness tools
   - move, look, click, toggle, pause, or trigger the needed runtime path
4. Verify
   - inspect the screen again
   - inspect state again
   - compare expected versus actual
5. Review
   - classify the episode result as:
     - confirmed
     - partially confirmed
     - inconclusive
     - regressed
     - blocked

## Episode Loop

Each live-agent run should be broken into episodes.

Episode shape:

1. orient from `.agent`
2. pick one micro-goal
3. inspect the current scene
4. execute a bounded action loop
5. verify the result
6. record the episode judgment
7. decide whether to continue, retry, narrow, or stop

The supervisor keeps one browser run alive across explicit episodes. Model-thinking time may hold the supervised simulation, but it must not reload or silently replace the expedition between calls.

## Review Loop

After each episode:

- run exactly one read-only sequential judgment call
- give it the original goal, current episode artifacts, and the bounded recent-call window
- persist its observation, trend, evidence, concise reasoning summary, confidence, and next action
- compare expected outcome to actual outcome
- identify which assumption held and which failed
- record candidate lessons
- decide whether the lesson is:
  - transient
  - candidate durable
  - durable now because it is repeated or directly user-mandated

## Separate Reviewer

- The in-loop sequential judge chooses the next bounded action but does not edit the repo or promote durable memory.
- The post-run reviewer is not the live agent or its in-loop judge.
- The reviewer runs after artifacts exist.
- The reviewer reads logs, reports, and screenshots from the live-agent run and writes notes separately.
- Reviewer notes should not be mixed into the live-agent episode log itself.

## Lesson Promotion Rules

- Do not promote one-off observations into durable memory.
- Promote direct user corrections into `.agent/feedback.md`.
- Promote lasting repo or architecture conventions into `.agent/memory.md` and `memory.md`.
- Promote parity or runtime failures into `docs/HorrorCorridor-V1-Parity-Audit.md`.
- Keep ephemeral per-episode observations out of durable memory unless they repeat or materially change the repo strategy.

## Relationship To Existing Harnesses

- `HorrorCorridor-Harness`:
  - owns repo guidance and vocabulary refresh
- `validate:live-player` harness:
  - owns short-form player-view proof
- `live-agent` harness:
  - owns longer interactive exploration, one-at-a-time Luna judgments, bounded recent-call context, and cumulative evidence gathering
- `review-live-agent` harness:
  - owns artifact review and note generation after the live loop has already produced evidence

## Long-Duration Behavior

Long-duration does not mean uncontrolled logic.

It means:

- many bounded episodes
- shared goal context across episodes
- cumulative evidence
- gradual improvement of hypotheses and tactics
- durable lesson promotion only when earned
- operator-controlled interruption when needed

## Stop Conditions

The normal stop condition is the game-owned `caught` state after the monster's jumpscare. A judge may choose the next action or report evidence quality, but a semantic `stop` judgment must not end a healthy live run before defeat. Infrastructure failure, explicit operator interruption, or user redirection may still abort and must be labeled separately from a game loss.

The action vocabulary must support movement, listening without movement, turning left/right, and holding the current flashlight aim. Later calls must inspect encounter bearing, distance, flashlight state, blackout time, last-chance time, beam contact, encounter score, and Monster Index progress from the bounded debug report.

## Expected Future Build

The future live-agent system should:

- use the `.agent` files as first-read control state
- use browser and game harness tools as its action plane
- inspect screen output as primary truth
- use runtime/debug state as supporting evidence
- persist only durable lessons
- record episode logs and screenshots continuously while running
- support a separate review pass that can inspect those logs and screenshots outside the live loop
- support NexusSimulator-backed long-run play validation once that interaction plane is built

## Sequential Judgment Contract

- Model calls are serialized with prediction concurrency fixed at one.
- The live lane defaults to `gpt-5.6-luna`, low reasoning, Codex `priority` service tier, and no artificial wait between episodes.
- Call one judges the first live episode without claiming a trend.
- Every later call sees the original goal, current episode, and the last three call outputs/reasoning summaries by default.
- The saved `reasoningSummary` is a concise evidence explanation, not hidden chain-of-thought.
- Structured output chooses the next action profile. The harness continues until authoritative jumpscare defeat; judge `stop` is advisory before that state.
- Malformed output, provider failure, unknown actions, or mismatched history ids fail closed.
- Every call logs its duration, start-to-start interval, and completion-to-next-start `timeBetweenCallsMs` gap.
- The post-run reviewer remains separate and may inspect the complete artifact chain without mutating it.

## Current Live Proof

The completed real run is `docs/live-agent/runs/2026-07-17T18-42-11-807Z`; its concise game-facing report is `docs/HorrorCorridor-Live-Luna-Run-2026-07-17.md`.

- Seven serialized `gpt-5.6-luna` calls ran at low reasoning and priority service tier with no configured wait.
- One browser page and expedition persisted from intro through defeat.
- The judge used prior bearing evidence to turn toward the Still Guest over successive calls.
- The game then proved a monster-owned exact `3,000 ms` blackout, restored-beam last chance, jumpscare, and authoritative `caught` state.
- The manifest stopped because of authoritative game loss after zero survived encounters, not a duration or episode cap.
- Calls averaged `35,648 ms`; completion-to-next-call-start gaps averaged `22,238 ms` and include browser/action/report work rather than artificial sleep.

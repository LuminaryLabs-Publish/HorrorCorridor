# Goal

Status: completed

## Objective

Upgrade the HorrorCorridor live-agent harness into a real sequential Luna judgment chain that accumulates bounded evidence over time.

## Success Criteria

- Every bounded browser episode is followed by exactly one read-only Luna judgment call.
- Calls run one after another with prediction concurrency fixed at one.
- Each judgment receives the original goal, the current live episode, and a bounded window of recent call outputs and reasoning summaries.
- Structured judgments select the next action, state an over-time trend, and fail closed on malformed or missing provider output.
- Run artifacts include manifests, JSONL episode/call records, prompts, provider events, structured judgments, screenshots, and explicit loop state.
- A bounded two-call live proof demonstrates that call two acknowledges and reasons over call one's output.
- The default live lane uses Luna with low reasoning, Codex priority service, no artificial delay, and persists call timing including the gap between calls.

## Current Focus

Delivered and proven with a fresh two-call live run: Luna used low reasoning and Codex priority service with zero artificial delay; calls completed in 25,635 ms and 22,633 ms, and call two logged a 47,504 ms completion-to-next-start gap while consuming call one's selected action and judgment history.

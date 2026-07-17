# Signalling Reconnect Browser Fixture Gate

**Timestamp:** `2026-07-17T09-17-19-04-00`

## Required fixture matrix

```txt
host signalling loss with active client DataConnection
client signalling loss with active host DataConnection
signalling loss before any DataConnection
signalling loss during lobby admission
signalling loss during active gameplay
successful peer.reconnect
reconnect failure because old peer ID is unavailable
bounded retry exhaustion
explicit client disconnect
transport destroy during pending reconnect
route replacement during pending reconnect
late open after cancellation
late disconnected after explicit close
recovered protocol message
first recovered remote-player frame
source development server
production build
browser artifact
published origin
```

## Required assertions

- `reconnecting` is published only for an admitted active attempt.
- Explicit disconnect and destroy remain terminal.
- Existing DataConnections are neither discarded nor assumed healthy without observation.
- Retry count, backoff and deadline are bounded.
- Stale attempt events cannot mutate a replacement transport.
- Host acceptance and client connection creation are separately verified.
- Full recovery is not projected until a matching message and visible frame are acknowledged.
- Source, production build and deployed origin use the same policy.

## Current state

```txt
fixture implementation: absent
runtime reconnect command: absent
attempt/result telemetry: absent
source smoke: not run
production build smoke: not run
deployed-origin smoke: not run
```

## Release gate

Do not claim signalling recovery, session continuity or deployed parity until this matrix passes on `main`.
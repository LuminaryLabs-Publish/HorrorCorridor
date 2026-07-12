# HorrorCorridor Production Debug Capability Fixture Gate

**Timestamp:** `2026-07-12T01-08-06-04-00`

## Goal

Define the executable evidence required before the runtime debug surface can be considered safe for a public production deployment.

## Current proof

The existing logging audit proves:

```txt
query activation works
overlay activation works
window extraction works
frame/event buffers are bounded
live frame state advances
```

That evidence proves logger functionality. It does not prove product authorization, redaction, capability isolation or revocation.

## Required unit fixtures

### Build-channel policy

```txt
public production maximum tier is player-safe
QA preview admits only configured roles and tiers
local development admits developer tier under explicit policy
unknown channel fails closed
```

### Activation admission

```txt
query activation in public production cannot elevate privilege
Backquote in public production cannot elevate privilege
persisted privileged preference is rejected and cleared
window API request uses the same command authority
stale runtime/session commands are rejected
```

### Redaction

```txt
player-safe frame excludes roomId and localPlayerId
player-safe frame excludes exact pose/input history
player-safe frame excludes cubes array
player-safe frame excludes anomaly sequence and slots
player-safe events exclude raw payloads
QA/developer output matches declared profile exactly
```

### Retention and export

```txt
count budget enforced
serialized-byte budget enforced
age budget enforced
truncation returns a typed reason
export cannot return raw store references
capture, overlay and export schemas remain profile-equivalent
```

### Revocation

```txt
runtime stop revokes lease
runtime restart rejects old lease
session replacement rejects old lease
role loss revokes lease
expiry revokes lease
revocation clears privileged frames/events and elevation preferences
```

## Required browser fixtures

### Public route

```txt
open normal route
open ?debug=frames
seed privileged localStorage keys
press Backquote
call window debug API if present
assert no anomaly order, cube coordinates, owner IDs or session IDs are visible/exportable
```

### QA route/build

```txt
admit QA actor and tier
verify typed lease result
verify declared QA redaction profile
verify overlay and export parity
replace session
verify old lease and retained state are unavailable
```

### Development route/build

```txt
admit developer tier explicitly
verify full-state access only under developer policy
restart runtime
verify new lease is required
switch to public policy
verify privileged state is cleared
```

## Required integration fixtures

```txt
GameCanvas capture cites runtime generation and session epoch
captured record cites committed render frame and surface revision
HUD overlay accepts only projected records
window export accepts only projected records
runtime cleanup invokes revocation before completion
session store reset cannot leave a live privileged lease
```

## Required deployment checks

```txt
production environment identity is explicit
production build has no implicit developer fallback
static/server output preserves fail-closed policy
query strings cannot select a stronger build channel
deployed route passes public browser fixture
source maps or globals do not expose a bypass authority
```

## Failure criteria

Any of the following blocks a production-safe diagnostics claim:

```txt
ambient public activation reveals privileged state
stored debug elevation survives into public production
overlay and export apply different redaction
revocation leaves privileged buffers readable
old lease works after runtime/session replacement
unknown policy/build channel fails open
export exceeds declared count/byte/age budget without a typed result
```

## Validation state

```txt
runtime source changed: no
package/deployment source changed: no
fixtures implemented: no
unit fixtures run: no
browser fixtures run: no
deployed route checked: no
production-safe diagnostics claim: not made
```
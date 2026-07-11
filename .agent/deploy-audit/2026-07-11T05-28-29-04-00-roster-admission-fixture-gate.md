# HorrorCorridor Deploy Audit: Roster Admission Fixture Gate

**Timestamp:** `2026-07-11T05-28-29-04-00`

## Goal

Define the executable proof required before lobby roster identity and peer binding can be treated as safe for start-transaction work.

## Proposed commands

```txt
npm run fixture:lobby-roster-identity
npm run fixture:placeholder-admission
npm run fixture:peer-slot-claim
npm run fixture:roster-protocol-ordering
npm run smoke:host-client-roster
```

## Pure fixture cases

```txt
host member is bootstrap-admitted
reserved slot is lobby-only
reserved slot cannot report connected or ready
real peer joins without slot -> one peer member
real peer claims slot -> one peer member and no duplicate row
same peer joins twice -> duplicate rejection
same player id binds twice -> duplicate rejection
peer close changes exactly its bound member
stale roster command rejects without mutation
same accepted command replay is idempotent
sealed roster excludes reserved slots
bootstrap output count equals admitted real-member count
```

## Protocol fixture cases

```txt
accepted mutation increments revision once
snapshot fingerprint matches ordered member records
revision gap requests resync
same revision/different fingerprint rejects
START_GAME and initial SYNC name the same sealed roster
placeholder member in start payload rejects
```

## Browser smoke

```txt
host opens lobby
host adds one reserved slot
client connects and claims or replaces the slot by declared policy
host and client both display one host and one peer member
no extra connected placeholder remains
client toggles ready and host receives the authoritative result
host starts the run
world, minimap, snapshot and debug state contain exactly two players
client disconnect removes or explicitly marks exactly one peer member
```

## Existing commands

```txt
npm run build
npm run lint
npm run smoke:protokits
npm run harness:horror-corridor
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
npm run review:object-kit
```

These existing commands do not prove roster member kinds, peer binding, placeholder exclusion, revision ordering or sealed-roster bootstrap.

## Current result

```txt
runtime source changed: no
new fixture scripts added: no
existing commands run: no
browser smoke run: no
fixture gate status: planned
```
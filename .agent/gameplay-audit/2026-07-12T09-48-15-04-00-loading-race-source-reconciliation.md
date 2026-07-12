# Loading Race Source Reconciliation

**Timestamp:** `2026-07-12T09-48-15-04-00`

## Interaction loop

```txt
Start action A
  -> LOADING
  -> five RAF/timer pairs

while A is suspended
  -> route can change
  -> component can unmount
  -> transport can be replaced
  -> lobby membership/readiness can change
  -> Start action B can begin

A resumes
  -> no cancellation or predecessor check
  -> commits session, runtime and UI stores
  -> host may broadcast START_GAME and SYNC
```

## Gameplay consequences

```txt
stale lobby members can enter the run
cancelled loading can restore PLAYING
multiple starts can commit
initial network messages can duplicate
mixed store generations can be observed
world geometry can disagree with the newest snapshot
```

## Required gameplay boundary

A run may enter `PLAYING` only through a committed `LoadingTransitionResult` whose route, session, room, roster, readiness, connection and loading generations are still current. All predecessor or cancelled results must perform zero gameplay and transport mutation.

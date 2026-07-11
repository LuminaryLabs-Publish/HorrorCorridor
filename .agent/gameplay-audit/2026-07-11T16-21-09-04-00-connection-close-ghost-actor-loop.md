# Gameplay Audit: Connection-Close Ghost-Actor Loop

**Timestamp:** `2026-07-11T16-21-09-04-00`

## Current loop

```txt
client moves or holds cube
  -> host GameState stores player/cube state
  -> client connection closes
  -> lobby row is removed
  -> GameState player remains
  -> host ooze tick includes retained position
  -> held cube remains attached
  -> host publishes retained state
```

## Gameplay consequences

```txt
ghost player remains an ooze target/input
held cube can become unavailable to remaining players
roster UI and gameplay population disagree
late player updates have no explicit retired-actor rejection contract
terminal and interaction logic can consume stale membership
reconnect can create a second row instead of reclaiming the original actor
```

## Required policy decisions

```txt
grace period duration
suspended actor simulation behavior
held cube drop/return/reserve/transfer behavior
anomaly participation behavior
host disconnect behavior
explicit leave versus network loss
reconnect identity and ownership restoration
```

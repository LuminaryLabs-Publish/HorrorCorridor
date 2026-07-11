# Render Audit: Publication, Delivery and Frame Proof Gap

**Timestamp:** `2026-07-11T18-11-21-04-00`

## Summary

The renderer can show a snapshot, but the host cannot prove which peers received which payload or which visible frame consumed it. Publication tick, payload identity, per-peer delivery and rendered-frame identity are not correlated.

## Plan ledger

**Goal:** define the evidence chain from committed state through payload delivery to the first visible client frame.

- [x] Trace snapshot publication identity.
- [x] Trace transport result shape.
- [x] Trace current debug cadence fields.
- [x] Identify missing payload and peer result identities.
- [x] Define required frame acknowledgement.
- [ ] Add executable browser proof after runtime authority exists.

## Current projection chain

```txt
host state mutation
  -> snapshot tick increment
  -> full SYNC payload
  -> aggregate send count discarded
  -> client accepts a snapshot
  -> world, minimap, HUD and debug render
```

## Missing correlation

```txt
publication ID: absent
committed state revision: absent
payload fingerprint: absent
serialized byte count: absent
intended peer set: absent
per-peer delivery row: absent
client acceptance acknowledgement: absent
first visible frame receipt: absent
```

The runtime debug surface currently records aggregate publication and client-update rates plus snapshot tick. It does not record payload size, payload fingerprint, intended/sent/failed peers, pending bytes or delivery lag.

## Required visible-frame contract

```txt
host publication commit
  publication ID
  committed state revision
  payload fingerprint and bytes
  complete per-peer delivery rows

client acceptance
  connection and actor identity
  publication ID
  snapshot revision
  payload fingerprint

render acknowledgement
  frame sequence
  world/minimap/HUD/debug revision
  publication ID
  snapshot revision
  recorded time
```

## Required guarantees

```txt
healthy peers can prove receipt independently of slow peers
partial host delivery is visible before client rendering claims convergence
world, minimap, HUD and debug cite the same accepted snapshot
first frame never cites an unknown or failed delivery identity
stale queued payloads cannot produce a newer frame receipt
```

## Fixture gate

```txt
fixture:delivery-publication-frame-correlation
fixture:partial-delivery-visible-frame
fixture:slow-peer-healthy-peer-frame-isolation
fixture:stale-payload-frame-rejection
browser multi-peer publication/frame smoke
```

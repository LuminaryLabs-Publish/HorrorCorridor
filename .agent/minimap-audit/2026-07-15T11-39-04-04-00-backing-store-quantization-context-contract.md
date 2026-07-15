# HorrorCorridor Minimap Backing-Store Quantization and Context Contract

**Timestamp:** `2026-07-15T11-39-04-04-00`

## Summary

The minimap needs an explicit conversion from logical CSS dimensions and effective DPR to integer physical pixels. That conversion must be stable across unchanged frames and must own the resulting 2D context generation.

## Plan ledger

**Goal:** prevent implicit floating-point/integer comparison from deciding canvas lifecycle inside the draw loop.

- [x] Define logical and physical dimension domains.
- [x] Define one deterministic quantization boundary.
- [x] Define resize, transform, draw and retirement ownership.
- [x] Define observability requirements.
- [ ] Implement and prove the contract.

## Descriptor contract

```ts
type MinimapBackingStoreDescriptor = Readonly<{
  surfaceId: string;
  logicalWidth: number;
  logicalHeight: number;
  observedDpr: number;
  effectiveDpr: number;
  physicalWidth: number;   // positive integer
  physicalHeight: number;  // positive integer
  viewportRevision: number;
  dprPolicyRevision: number;
  fingerprint: string;
}>;
```

## Quantization policy

One policy must be chosen and frozen. For example:

```txt
physicalWidth = max(1, round(logicalWidth * effectiveDpr))
physicalHeight = max(1, round(logicalHeight * effectiveDpr))
```

The exact policy may use `round`, `floor` or `ceil`, but it must:

```txt
produce integers before comparison
be deterministic for the same inputs
be shared by resize admission and fixtures
record the observed and effective DPR
avoid repeated writes for unchanged descriptors
```

## Context generation contract

```txt
initial accepted descriptor
  -> assign integer width and height once
  -> acquire context
  -> ContextGeneration 1
  -> apply logical transform

unchanged descriptor
  -> preserve width and height
  -> preserve context generation
  -> apply no lifecycle mutation

changed descriptor
  -> assign integer width and height once
  -> ContextGeneration + 1
  -> restore transform and baseline drawing policy
  -> execute one matching frame

retirement
  -> invalidate surface and context generation
  -> reject late commands
  -> publish receipt
```

## Frame contract

```txt
MinimapFramePlan
  surface descriptor fingerprint
  context generation
  snapshot revision
  local pose revision
  heading revision
  ordered draw operations
```

The draw executor must not read raw DPR or assign canvas dimensions. It may only use the accepted descriptor and context generation supplied by the surface authority.

## Required counters

```txt
surface observations
accepted descriptor changes
unchanged admissions
width writes
height writes
context generations
frames executed
stale frames rejected
surface retirements
first matching frame acknowledgements
```

## Invariants

```txt
width writes == height writes for normal resize transactions
unchanged frames produce zero dimension writes
one descriptor change produces at most one context generation
frame descriptor == accepted surface descriptor
retired surface executes zero later frames
```

## Validation boundary

This is a documentation contract. No Canvas2D code was modified.
# Overload

fuse room, difficulty 4. Authored object assembly owned by the shared Room domain.

The kit exposes an immutable definition and `createRuntimeKit()`. Its family recipe supplies objects, guarded interactions and exit conditions; Room owns each instance's mutable state, reach/aim validation, gate animation, snapshot and reset. No renderer, browser or network objects enter the definition.

Example: `room.interact({x,y,z}, yaw, pitch)` selects a visible nearby object. Accepted rules change the instance; satisfying all goal conditions transitions `locked → opening → open`. Rejected or distant interactions do not unlock anything.

Compose this kit after `n:horror-corridor-v2:room`; repeated registry admission with the same immutable definition is idempotent. Conflicting IDs are rejected. `room.snapshot()` serializes state and presentation objects without solutions; `room.reset()` clears progress. The exported designer-only `solution` witness is not exposed in player snapshots.

Proof: `npm run proof:runtime` checks all 50 room witnesses, locked exits, snapshot/reset and content uniqueness. Human view and family-specific fidelity remain separate acceptance gates. Runtime uses the existing Nexus composition, clock, scene and navigation substrate rather than implementing another engine.

# HorrorCorridor

The root Next.js app is the active desktop game. V1 and V2 remain preserved
reference surfaces, not runtime dependencies. One shared game remains the goal
for browser and future native formats; a Quest APK is not implemented.

```text
HorrorCorridor/
├── app/                       active browser host
├── src/game/domains/room/      shared puzzle state and exit locks
├── src/content/rooms/kits/     50 authored room kits
├── src/providers/              presentation, input, audio and storage
├── HorrorCorridor-V1/          preserved reference
└── HorrorCorridor-V2/          prior baseline and harnesses
```

Run the active game:

```bash
npm ci
npm run dev
```

Controls: `WASD` move · mouse look/listen · `F` flashlight · `E` interact · `I` Monster Index · `P` pause.

The game opens in the scene at a lower-service door. Click the physical door to
open it and step into the route; there is no separate start screen. The active
browser route remains a puzzle-room greybox: ten room families at five levels.
Aim at nearby objects and press E. Gates remain closed until the room's rules
are satisfied; no escape solution is displayed. Practical lights are localized
to fixtures, with corridor walls and ceilings casting shadows. This is still
in-progress low-poly lighting, not final visual acceptance. Read the
[room checkpoint](docs/sequence-overhaul/room-kits.md) for fidelity limits.

Validation:

```bash
npm run typecheck
npm run lint
npm run proof:runtime
npm run proof:nexus
npm run build
```

See [the current checkpoint](docs/sequence-overhaul/checkpoint.md) for active
implementation and [the native checkpoint](docs/sequence-overhaul/native-quest.md)
for Rust/OpenXR blockers. Browser proofs do not establish headset readiness.

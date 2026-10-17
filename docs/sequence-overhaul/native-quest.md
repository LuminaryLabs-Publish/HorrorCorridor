# Native Quest checkpoint

Target: one shared Nexus-authored game, Rust gameplay runtime, Android ARM64
OpenXR APK. This supersedes PWA-first delivery, not the desktop gameplay host.
The first milestone is one rendered corridor, independent tracked head and hand,
physical flashlight contact and one complete encounter. It is not implemented.

The repository's default `main` branch is the single game source. Desktop/browser,
Quest Android ARM64 APK and future PCVR are output formats of that same authored
composition, not separate games or platform-specific gameplay branches. Share
gameplay service kits, content identities and behavior contracts; vary only host
providers, capability adapters and Build target packaging. The temporary work
branch is for integration, not a second product. Native formats are still future
outputs until their runtime and device gates pass.

## Source authority

- Game baseline: `f2888fb831149993858bdc8bfe6ce6874481d514`.
- Installed engine remains `a74e8689d1a71c0b42236c009f0f4c46e9b89387`.
- Candidate engine: `bd06da114b7d41d0dadfa641dd9c77a0292dc739`.
- Do not adopt the candidate until the existing consumer/runtime proofs pass.
- `n:authoring` owns editable composition and assemblies; runtime service kits own
  gameplay; isolated `n:build` owns analysis, Rust lowering, targets and artifacts.
- Party owns embodiment; Corridor owns contact and place residency; Dread owns
  encounters; Expedition owns progress; Shared Expedition owns network authority.
- Native rendering consumes Presentation/Render contracts. Three.js stays desktop-only.

## Executable readiness check

```sh
npm run native:inspect -- --engine /absolute/clean/NexusEngine --out /absolute/external/report-directory
```

This delegates to the candidate's actual `createBuildDomain().inspect()` and
toolchain discovery. It verifies the engine commit and clean build sources,
records the unchanged application dependency, checks project immutability and
returns exit 2 for blocked readiness. Reports and build state must remain outside
both projects. It never provisions tools, compiles, installs, signs or publishes.
Sparse checkouts cover materialized active source only, not archived V1/V2.

## Current blockers

- The candidate dependency-source kit rejects the immutable URL
  `https://registry.npmjs.org/next/-/next-16.3.4.tgz` as a moving locator because
  `/next/` matches its moving-locator regular expression. Fix the nearest source
  validation kit, preserving rejection of real moving tags. Do not change the
  lockfile, disguise the package name or bypass dependency validation.
- Rust lowering currently covers numeric expression exports, not this game's
  complete stateful service-kit graph. Native classification is not yet reached
  for the real project because dependency inspection fails first.
- The generated Android activity validates package contracts; it does not start
  this game's simulation or render it. Native provider and application lifecycle
  work are required before APK success can mean playability.
- The shared engine checkout contains another task's Build registry/orchestration
  changes and an unrelated active target. Preserve them; use a clean worktree.
- The mandatory `nexus-editor` persistent guided-development controller is not
  installed. The discovered Editor API exposes a finite verification attempt,
  not the required persistent controller. Do not forge tracker state or bypass
  the engine's AGENTS.md development protocol.
- No headset is attached through adb. Device, comfort, sound and sustained
  performance acceptance remain unverified. Missing toolchains are reported by
  the readiness command; do not assume they are installed.

## Validation of this continuation

- `npm run lint`, `npm run typecheck`, `npm run proof:runtime`,
  `npm run proof:nexus`, `npm run build`, script syntax and `git diff --check` pass.
  Nexus consumer proof still targets the existing `a74e8689` dependency, not the
  candidate pin.
- Readiness returns exit 2 and `sourceUnchanged: true`, reproducing the locked
  Next package error. Report: `/tmp/horror-native-readiness-jdk-20261016/native-readiness.json`.
- Missing engine arguments, duplicate flags, source-local output and dirty engine
  build sources are rejected with exit 1. No additional test files were created.
- Selecting `/opt/homebrew/opt/openjdk/bin` on PATH and its installed JAVA_HOME
  fixes Java discovery for this machine without installing another JDK.
- No gameplay or presentation code changed. No APK, device run, headset capture,
  signing or engine adoption is claimed. These checks precede publication of the
  readiness tooling and documentation.

## Next action

Restore the required guided-development controller and run a dedicated engine
task in isolation. First repair immutable dependency recognition, then rerun
readiness and preserve its actual graph diagnostics. Do not replace the game with
a numeric example or claim JavaScript fallback satisfies Rust gameplay.
After native lowering/provider support is proven, migrate the application pin,
assemble the runtime through authoring service kits, and complete the encounter.
Retain desktop regression, deterministic parity, save recovery, beam obstruction,
XR interruption and actual player-view/audio/device gates. Obtain explicit
authorization for sensitive signing, deployment and store submission.

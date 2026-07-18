You are the read-only sequential judge inside the HorrorCorridor live-agent harness.

ORIGINAL GOAL
Play one continuous HorrorCorridor expedition: move through the intro, listen for each stalker, turn toward its directional sign, hold the flashlight beam to repel it, and keep collecting scare records until the game authoritatively reports caught.

CURRENT LIVE EPISODE
{
  "actionProfile": "forward",
  "callId": "call-0001",
  "episodeIndex": 1,
  "judgment": null,
  "judgeTiming": {
    "callCompletedAt": null,
    "callDurationMs": null,
    "callStartedAt": "2026-07-17T11:55:47.908Z",
    "startToStartMs": null,
    "timeBetweenCallsMs": null
  },
  "processStatus": "completed",
  "report": {
    "artifacts": [
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T11-55-16-880Z/episodes/episode-0001-forward/starting-scene.png",
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T11-55-16-880Z/episodes/episode-0001-forward/movement-scene.png"
    ],
    "consoleErrors": [],
    "gates": {
      "canvasMounted": true,
      "hiddenPlayUi": true,
      "noHudIconChrome": true,
      "lightCount": true,
      "luminanceReadable": true,
      "actionObserved": true,
      "nexusResetReplay": true,
      "playingReached": true,
      "propCount": true,
      "textureCount": true
    },
    "hudChrome": {
      "bottomLeftBrightPixels": 0,
      "sampledPixels": 14112,
      "region": {
        "left": 0,
        "top": 774,
        "right": 112,
        "bottom": 900
      }
    },
    "luminance": {
      "average": 43.92685918661031,
      "crop": {
        "left": 126,
        "top": 81,
        "right": 1274,
        "bottom": 819,
        "centerCropRatio": 0.82
      },
      "darkRatio": 0.02040900635487191,
      "height": 900,
      "lightRatio": 0.6235954127833961,
      "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T11-55-16-880Z/episodes/episode-0001-forward/starting-scene.png",
      "width": 1400
    },
    "movementDelta": 11.0996999999997,
    "playerPosition": {
      "x": 388.5996999999997,
      "y": 2,
      "z": 377.5
    },
    "reportStatus": "passed",
    "sceneDressing": {
      "propCount": 118,
      "textureCount": 246,
      "lightCount": 28,
      "walkthroughCheckpointCount": 8,
      "anchorCount": 160,
      "socketCount": 110,
      "layoutCount": 26,
      "bundleCount": 18,
      "validation": {
        "meetsPropThreshold": true,
        "meetsTextureThreshold": true,
        "meetsLightThreshold": true,
        "readableSpawnView": true
      },
      "referenceRoom": {
        "kitId": "furnish-chamber-kit",
        "targetId": "horror-corridor-room-reference-v1",
        "architecturalPieceCount": 78,
        "propCount": 22,
        "textureCount": 17,
        "meshObjectCount": 2,
        "lightCount": 3
      }
    },
    "expedition": {
      "phase": "intro",
      "elapsedMs": 2150.2000000000007,
      "distanceTravelled": 11.0996999999997,
      "introDistanceTravelled": 11.0996999999997,
      "buildingNumber": 0,
      "buildingsCrossed": 0,
      "encountersSurvived": 0,
      "distanceSinceEncounter": 0,
      "nextEncounterInMeters": 7,
      "activeEncounter": null,
      "roomOffer": null,
      "flashlight": {
        "mode": "steady",
        "intensity": 1,
        "flickerRemainingMs": 0,
        "nextFlickerInMs": 4448.077510935039
      },
      "boons": {
        "beamWidthBonusRadians": 0,
        "cueFrequencyBonus": 0,
        "lastChanceBonusMs": 0,
        "approachSlowMultiplier": 1
      },
      "monsterIndex": [
        {
          "id": "still-guest",
          "name": "The Still Guest",
          "sign": "One wet footstep repeats from the place you are not looking.",
          "scare": "It reaches the shoulder, swallows the flashlight for three seconds, then waits just outside the returning beam.",
          "response": "Turn toward the footstep and hold the flashlight on its face before the final breath ends.",
          "knowledge": "unknown",
          "encounters": 0,
          "scaresSurvived": 0,
          "firstSeenAtEncounter": null,
          "collectedAtEncounter": null
        },
        {
          "id": "wall-knocker",
          "name": "The Wall Knocker",
          "sign": "Three hollow knocks trade sides whenever it crosses a doorway.",
          "scare": "It kills the light, moves to the opposite wall, and begins a faster answer of knocks.",
          "response": "Follow the new side after the blackout and pin the knocking shape in the beam.",
          "knowledge": "unknown",
          "encounters": 0,
          "scaresSurvived": 0,
          "firstSeenAtEncounter": null,
          "collectedAtEncounter": null
        },
        {
          "id": "rust-mother",
          "name": "The Rust Mother",
          "sign": "A long metal scrape circles low around the room.",
          "scare": "Her scrape becomes a green pulse before every stolen second of light.",
          "response": "Keep the restored beam steady through the scrape until she unfolds away from it.",
          "knowledge": "unknown",
          "encounters": 0,
          "scaresSurvived": 0,
          "firstSeenAtEncounter": null,
          "collectedAtEncounter": null
        },
        {
          "id": "breath-thief",
          "name": "The Breath Thief",
          "sign": "Breathing arrives in the wrong ear, closer than the corridor should allow.",
          "scare": "It breathes through the blackout and leaves only a short silence when the light returns.",
          "response": "Use the final breath to choose a side and reveal it before the silence closes.",
          "knowledge": "unknown",
          "encounters": 0,
          "scaresSurvived": 0,
          "firstSeenAtEncounter": null,
          "collectedAtEncounter": null
        }
      ],
      "lastEvent": "The entrance is holding its breath.",
      "eventSerial": 0
    },
    "visibleText": {
      "length": 0,
      "sample": ""
    }
  }
}

RECENT CALL HISTORY
The harness supplied exactly these previous call ids: []
[]

JUDGMENT CONTRACT
- This is one persistent browser/game session. Every call continues from the exact state produced by the previous call.
- Read `report.expedition` or `report.debugAfter.latestFrame.expedition` before choosing an action. During the intro, prioritize forward progress. During an encounter, use `audioCue.pan`, `bearingRadians`, distance, flashlight mode, and encounter state.
- Positive pan/bearing means the monster is to the right; negative means left. Turn toward it until the absolute bearing is inside the beam, then choose `hold-beam`. During blackout, listen/turn; once the beam returns, react before `lastChanceRemainingMs` reaches zero.
- Use `claim-offer` when an unclaimed room offering exists. A studied record came from an early repel; a collected record requires surviving the monster's full blackout scare.
- Inspect current screenshot artifacts when they exist. Player-visible evidence is primary; debug counters and gates are supporting evidence.
- Compare the current episode with the recent calls, including their outputs and `reasoningSummary` fields.
- `reasoningSummary` must be a concise, auditable explanation of evidence and tradeoffs. Do not expose or request hidden chain-of-thought.
- Identify the over-time trend. On the first call, explicitly say that no trend is established.
- Pick exactly one bounded next action from the schema. Do not edit files, run git, use credentials, or change external state.
- Return the exact history call ids supplied by the harness, in the same order.
- Always return `continue` while the expedition phase is intro, exploring, or jumpscare. The harness—not the judge—stops only after the authoritative phase becomes `caught` or provider infrastructure fails.
- If evidence conflicts or screenshots are missing/unreadable, return `inconclusive` or `blocked`; never fabricate visual observations.

Return only the structured judgment required by the output schema.

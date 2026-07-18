You are the read-only sequential judge inside the HorrorCorridor live-agent harness.

ORIGINAL GOAL
Play one continuous HorrorCorridor expedition: move through the intro, listen for each stalker, turn toward its directional sign, hold the flashlight beam to repel it, and keep collecting scare records until the game authoritatively reports caught.

CURRENT LIVE EPISODE
{
  "actionProfile": "turn-right",
  "callId": "call-0003",
  "episodeIndex": 3,
  "judgment": null,
  "judgeTiming": {
    "callCompletedAt": null,
    "callDurationMs": null,
    "callStartedAt": "2026-07-17T18:44:31.753Z",
    "startToStartMs": 34221,
    "timeBetweenCallsMs": 11754
  },
  "processStatus": "failed",
  "report": {
    "artifacts": [
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0003-turn-right/starting-scene.png",
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0003-turn-right/movement-scene.png"
    ],
    "consoleErrors": [],
    "gates": {
      "canvasMounted": true,
      "hiddenPlayUi": true,
      "noHudIconChrome": true,
      "lightCount": true,
      "luminanceReadable": false,
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
      "average": 18.865818866105915,
      "crop": {
        "left": 126,
        "top": 81,
        "right": 1274,
        "bottom": 819,
        "centerCropRatio": 0.82
      },
      "darkRatio": 0.39000311605903515,
      "height": 900,
      "lightRatio": 0.05238520155236395,
      "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0003-turn-right/starting-scene.png",
      "width": 1400
    },
    "movementDelta": 0,
    "playerPosition": {
      "x": 405.01389999999935,
      "y": 2,
      "z": 377.5
    },
    "reportStatus": "failed",
    "sceneDressing": {
      "propCount": 122,
      "textureCount": 249,
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
        "targetId": "horror-corridor-expedition-room-v2",
        "architecturalPieceCount": 82,
        "propCount": 32,
        "textureCount": 17,
        "meshObjectCount": 8,
        "lightCount": 3
      }
    },
    "expedition": {
      "phase": "exploring",
      "elapsedMs": 12203.500000000005,
      "distanceTravelled": 27.513899999999353,
      "introDistanceTravelled": 12.41279999999972,
      "buildingNumber": 1,
      "buildingsCrossed": 0,
      "encountersSurvived": 0,
      "distanceSinceEncounter": 7.948799999999835,
      "nextEncounterInMeters": 7,
      "activeEncounter": {
        "id": "encounter-1-still-guest",
        "encounterNumber": 1,
        "buildingNumber": 1,
        "monsterId": "still-guest",
        "state": "approaching",
        "worldAngle": 1.9189352043082817,
        "bearingRadians": 1.7434537760764082,
        "distance": 12.976170000000002,
        "closestDistance": 12.976170000000002,
        "beamContact": false,
        "beamHoldMs": 0,
        "fullScareWitnessed": false,
        "blackoutRemainingMs": 0,
        "lastChanceRemainingMs": 0,
        "jumpscareRemainingMs": 0,
        "audioCue": {
          "serial": 3,
          "kind": "footstep",
          "pan": 1,
          "intensity": 0.4901740909090909,
          "nextInMs": 942.7803236911623
        }
      },
      "roomOffer": null,
      "flashlight": {
        "mode": "steady",
        "intensity": 1,
        "flickerRemainingMs": 0,
        "nextFlickerInMs": 2431.5952866693515
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
          "knowledge": "seen",
          "encounters": 1,
          "scaresSurvived": 0,
          "firstSeenAtEncounter": 1,
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
      "lastEvent": "The Still Guest entered Building 1. Listen before you look.",
      "eventSerial": 2
    },
    "visibleText": {
      "length": 0,
      "sample": ""
    }
  }
}

RECENT CALL HISTORY
The harness supplied exactly these previous call ids: ["call-0002"]
[
  {
    "actionProfile": "forward",
    "callId": "call-0002",
    "episodeIndex": 2,
    "judgment": {
      "confidence": 0.94,
      "evidence": [
        "expedition.phase=exploring",
        "activeEncounter.id=encounter-1-still-guest",
        "activeEncounter.state=approaching",
        "activeEncounter.bearingRadians=2.9200207760764085",
        "activeEncounter.beamContact=false",
        "activeEncounter.distance=16.773179999999986",
        "previous call had activeEncounter=null and reportStatus=passed",
        "current reportStatus=failed",
        "current luminance.readable=false"
      ],
      "judgment": "partially-confirmed",
      "nextActionProfile": "turn-right",
      "nextHypothesis": "Turning right will bring the Still Guest's positive bearing within the flashlight beam so the next action can hold the beam.",
      "observation": "The expedition remains exploring with the first encounter approaching. The Still Guest is strongly to the right (positive bearing 2.92) and has not contacted the beam.",
      "reasoningSummary": "Forward movement correctly advanced into Building 1, but the active encounter now requires turning toward the positive right-side bearing before holding the beam. The failed report and reduced luminance limit visual confirmation, while debug state still supports a bounded turn-right response.",
      "status": "continue",
      "trend": "An encounter has emerged after forward progress; movement continued, but screenshot luminance readability regressed versus the prior episode."
    },
    "judgeTiming": {
      "callCompletedAt": "2026-07-17T18:44:19.999Z",
      "callDurationMs": 22467,
      "callStartedAt": "2026-07-17T18:43:57.532Z",
      "startToStartMs": 41379,
      "timeBetweenCallsMs": 15199
    },
    "processStatus": "failed",
    "report": {
      "artifacts": [
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0002-forward/starting-scene.png",
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0002-forward/movement-scene.png"
      ],
      "consoleErrors": [],
      "gates": {
        "canvasMounted": true,
        "hiddenPlayUi": true,
        "noHudIconChrome": true,
        "lightCount": true,
        "luminanceReadable": false,
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
        "average": 17.927254097893115,
        "crop": {
          "left": 126,
          "top": 81,
          "right": 1274,
          "bottom": 819,
          "centerCropRatio": 0.82
        },
        "darkRatio": 0.46560531807408667,
        "height": 900,
        "lightRatio": 0.04939779798494849,
        "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0002-forward/starting-scene.png",
        "width": 1400
      },
      "movementDelta": 10.19789999999972,
      "playerPosition": {
        "x": 405.01389999999935,
        "y": 2,
        "z": 377.5
      },
      "reportStatus": "failed",
      "sceneDressing": {
        "propCount": 122,
        "textureCount": 249,
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
          "targetId": "horror-corridor-expedition-room-v2",
          "architecturalPieceCount": 82,
          "propCount": 32,
          "textureCount": 17,
          "meshObjectCount": 8,
          "lightCount": 3
        }
      },
      "expedition": {
        "phase": "exploring",
        "elapsedMs": 8587.300000000023,
        "distanceTravelled": 27.513899999999353,
        "introDistanceTravelled": 12.41279999999972,
        "buildingNumber": 1,
        "buildingsCrossed": 0,
        "encountersSurvived": 0,
        "distanceSinceEncounter": 7.948799999999835,
        "nextEncounterInMeters": 7,
        "activeEncounter": {
          "id": "encounter-1-still-guest",
          "encounterNumber": 1,
          "buildingNumber": 1,
          "monsterId": "still-guest",
          "state": "approaching",
          "worldAngle": 1.7923682043082814,
          "bearingRadians": 2.9200207760764085,
          "distance": 16.773179999999986,
          "closestDistance": 16.773179999999986,
          "beamContact": false,
          "beamHoldMs": 0,
          "fullScareWitnessed": false,
          "blackoutRemainingMs": 0,
          "lastChanceRemainingMs": 0,
          "jumpscareRemainingMs": 0,
          "audioCue": {
            "serial": 2,
            "kind": "footstep",
            "pan": 1,
            "intensity": 0.31758272727272796,
            "nextInMs": 2355.1767613881666
          }
        },
        "roomOffer": null,
        "flashlight": {
          "mode": "steady",
          "intensity": 1,
          "flickerRemainingMs": 0,
          "nextFlickerInMs": 6047.795286669334
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
            "knowledge": "seen",
            "encounters": 1,
            "scaresSurvived": 0,
            "firstSeenAtEncounter": 1,
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
        "lastEvent": "The Still Guest entered Building 1. Listen before you look.",
        "eventSerial": 2
      },
      "visibleText": {
        "length": 0,
        "sample": ""
      }
    }
  }
]

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

You are the read-only sequential judge inside the HorrorCorridor live-agent harness.

ORIGINAL GOAL
Play one continuous HorrorCorridor expedition: move through the intro, listen for each stalker, turn toward its directional sign, hold the flashlight beam to repel it, and keep collecting scare records until the game authoritatively reports caught.

CURRENT LIVE EPISODE
{
  "actionProfile": "turn-right",
  "callId": "call-0005",
  "episodeIndex": 5,
  "judgment": null,
  "judgeTiming": {
    "callCompletedAt": null,
    "callDurationMs": null,
    "callStartedAt": "2026-07-17T18:47:28.528Z",
    "startToStartMs": 133231,
    "timeBetweenCallsMs": 42257
  },
  "processStatus": "failed",
  "report": {
    "artifacts": [
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0005-turn-right/starting-scene.png",
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0005-turn-right/movement-scene.png"
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
      "average": 21.91389809928649,
      "crop": {
        "left": 126,
        "top": 81,
        "right": 1274,
        "bottom": 819,
        "centerCropRatio": 0.82
      },
      "darkRatio": 0.3130577037477692,
      "height": 900,
      "lightRatio": 0.04508606932759223,
      "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0005-turn-right/starting-scene.png",
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
      "elapsedMs": 22522.500000000022,
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
        "state": "blackout",
        "worldAngle": 2.2801002043082796,
        "bearingRadians": -0.7177112239235897,
        "distance": 2.2,
        "closestDistance": 2.141219999999977,
        "beamContact": false,
        "beamHoldMs": 0,
        "fullScareWitnessed": true,
        "blackoutRemainingMs": 3000,
        "lastChanceRemainingMs": 0,
        "jumpscareRemainingMs": 0,
        "audioCue": {
          "serial": 10,
          "kind": "footstep",
          "pan": -0.45690915599989385,
          "intensity": 1,
          "nextInMs": 520
        }
      },
      "roomOffer": null,
      "flashlight": {
        "mode": "blackout",
        "intensity": 0,
        "flickerRemainingMs": 0,
        "nextFlickerInMs": 6472.9216844485545
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
      "lastEvent": "The Still Guest reached you. The flashlight is gone for three seconds.",
      "eventSerial": 3
    },
    "visibleText": {
      "length": 0,
      "sample": ""
    }
  }
}

RECENT CALL HISTORY
The harness supplied exactly these previous call ids: ["call-0004"]
[
  {
    "actionProfile": "turn-right",
    "callId": "call-0004",
    "episodeIndex": 4,
    "judgment": {
      "confidence": 0.95,
      "evidence": [
        "expedition.phase=exploring",
        "activeEncounter.id=encounter-1-still-guest",
        "activeEncounter.state=approaching",
        "activeEncounter.bearingRadians=0.5714472760764076",
        "activeEncounter.distance=9.31597499999996",
        "activeEncounter.beamContact=false",
        "activeEncounter.beamHoldMs=0",
        "audioCue.pan=0.363794634815837",
        "movementDelta=0",
        "prior bearingRadians=1.7434537760764082",
        "reportStatus=failed",
        "luminance.readable=false"
      ],
      "judgment": "partially-confirmed",
      "nextActionProfile": "turn-right",
      "nextHypothesis": "A final bounded right turn should bring the Still Guest within the flashlight beam; then hold-beam should be attempted when beamContact becomes true or bearing approaches zero.",
      "observation": "The Still Guest remains approaching on the right with bearingRadians=0.571 and beamContact=false. The prior right turn improved alignment from 1.743 to 0.571 without movement; the encounter is not yet repelled.",
      "reasoningSummary": "State evidence supports another bounded right turn because the encounter remains active, right-sided, and not in beam contact. Holding the beam now is premature while beamContact is false; screenshots cannot provide reliable primary confirmation.",
      "status": "continue",
      "trend": "Successive right turns are steadily reducing the positive bearing toward beam alignment, but contact has not yet occurred and visual luminance remains unreadable."
    },
    "judgeTiming": {
      "callCompletedAt": "2026-07-17T18:46:46.271Z",
      "callDurationMs": 90974,
      "callStartedAt": "2026-07-17T18:45:15.297Z",
      "startToStartMs": 43544,
      "timeBetweenCallsMs": 25111
    },
    "processStatus": "failed",
    "report": {
      "artifacts": [
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0004-turn-right/starting-scene.png",
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0004-turn-right/movement-scene.png"
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
        "average": 20.318367589012766,
        "crop": {
          "left": 126,
          "top": 81,
          "right": 1274,
          "bottom": 819,
          "centerCropRatio": 0.82
        },
        "darkRatio": 0.35448830533601505,
        "height": 900,
        "lightRatio": 0.059959349593495935,
        "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0004-turn-right/starting-scene.png",
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
        "elapsedMs": 15689.400000000043,
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
          "worldAngle": 2.0409417043082825,
          "bearingRadians": 0.5714472760764076,
          "distance": 9.31597499999996,
          "closestDistance": 9.31597499999996,
          "beamContact": false,
          "beamHoldMs": 0,
          "fullScareWitnessed": false,
          "blackoutRemainingMs": 0,
          "lastChanceRemainingMs": 0,
          "jumpscareRemainingMs": 0,
          "audioCue": {
            "serial": 5,
            "kind": "footstep",
            "pan": 0.363794634815837,
            "intensity": 0.6565465909090928,
            "nextInMs": 1172.0612867603672
          }
        },
        "roomOffer": null,
        "flashlight": {
          "mode": "steady",
          "intensity": 1,
          "flickerRemainingMs": 0,
          "nextFlickerInMs": 6122.921684448584
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

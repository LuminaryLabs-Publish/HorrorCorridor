You are the read-only sequential judge inside the HorrorCorridor live-agent harness.

ORIGINAL GOAL
Play one continuous HorrorCorridor expedition: move through the intro, listen for each stalker, turn toward its directional sign, hold the flashlight beam to repel it, and keep collecting scare records until the game authoritatively reports caught.

CURRENT LIVE EPISODE
{
  "actionProfile": "turn-left",
  "callId": "call-0007",
  "episodeIndex": 7,
  "judgment": null,
  "judgeTiming": {
    "callCompletedAt": null,
    "callDurationMs": null,
    "callStartedAt": "2026-07-17T18:49:18.586Z",
    "startToStartMs": 66552,
    "timeBetweenCallsMs": 19136
  },
  "processStatus": "completed",
  "report": {
    "artifacts": [
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0007-turn-left/starting-scene.png",
      "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0007-turn-left/movement-scene.png"
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
      "average": 22.50901454889788,
      "crop": {
        "left": 126,
        "top": 81,
        "right": 1274,
        "bottom": 819,
        "centerCropRatio": 0.82
      },
      "darkRatio": 0.29881825821742536,
      "height": 900,
      "lightRatio": 0.054633721424322254,
      "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0007-turn-left/starting-scene.png",
      "width": 1400
    },
    "movementDelta": 0,
    "playerPosition": {
      "x": 405.01389999999935,
      "y": 2,
      "z": 377.5
    },
    "reportStatus": "passed",
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
      "phase": "caught",
      "elapsedMs": 35824.1,
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
        "state": "jumpscare",
        "worldAngle": 2.61238898038469,
        "bearingRadians": 0,
        "distance": 0.72,
        "closestDistance": 0,
        "beamContact": false,
        "beamHoldMs": 0,
        "fullScareWitnessed": true,
        "blackoutRemainingMs": 0,
        "lastChanceRemainingMs": 0,
        "jumpscareRemainingMs": 0,
        "audioCue": {
          "serial": 22,
          "kind": "footstep",
          "pan": -0.9574960154079662,
          "intensity": 1,
          "nextInMs": 666.9739904759857
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
      "lastEvent": "Caught by The Still Guest after 0 survived encounters.",
      "eventSerial": 6
    },
    "visibleText": {
      "length": 415,
      "sample": "Horror Corridor Prototype Port Room: SOLO Mode: solo Status: connected HORROR CORRIDOR PROTOTYPE PORT COMPLETED ROOM SOLO THE CORRIDOR HAS ENDED [ RED ] [ GREEN ] [ BLUE ] Settings STATUS COMPLETE HINT RUN COMPLETE. USE THE OVERLAY TO RETUR"
    }
  }
}

RECENT CALL HISTORY
The harness supplied exactly these previous call ids: ["call-0006"]
[
  {
    "actionProfile": "turn-left",
    "callId": "call-0006",
    "episodeIndex": 6,
    "judgment": {
      "confidence": 0.88,
      "evidence": [
        "expedition.phase=exploring",
        "activeEncounter.state=last-chance",
        "activeEncounter.bearingRadians=-0.7065912239235903",
        "activeEncounter.distance=0.38859999999999884",
        "activeEncounter.beamContact=false",
        "activeEncounter.beamHoldMs=0",
        "activeEncounter.lastChanceRemainingMs=4932",
        "flashlight.mode=steady",
        "flashlight.intensity=1",
        "reportStatus=failed"
      ],
      "judgment": "partially-confirmed",
      "nextActionProfile": "turn-left",
      "nextHypothesis": "A further bounded left turn should reduce the remaining negative bearing and align the restored flashlight beam with The Still Guest before the last-chance window closes.",
      "observation": "The Still Guest is in last-chance with the flashlight restored, but beamContact is false and bearingRadians=-0.707 remains clearly left. The previous bounded left turn did not yet align the beam.",
      "reasoningSummary": "Because the beam is available and the monster remains left of the player, one more bounded left turn is the best immediate alignment action. Holding the beam now would likely miss while bearing remains outside the beam.",
      "status": "continue",
      "trend": "The encounter progressed from blackout to last-chance, but repeated turning has not produced beam contact; the monster remains consistently left of center."
    },
    "judgeTiming": {
      "callCompletedAt": "2026-07-17T18:48:59.450Z",
      "callDurationMs": 47416,
      "callStartedAt": "2026-07-17T18:48:12.034Z",
      "startToStartMs": 43506,
      "timeBetweenCallsMs": 19970
    },
    "processStatus": "failed",
    "report": {
      "artifacts": [
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0006-turn-left/starting-scene.png",
        "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0006-turn-left/movement-scene.png"
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
        "average": 23.181947843089183,
        "crop": {
          "left": 126,
          "top": 81,
          "right": 1274,
          "bottom": 819,
          "centerCropRatio": 0.82
        },
        "darkRatio": 0.24185693511987386,
        "height": 900,
        "lightRatio": 0.06634490996477908,
        "path": "/Users/crimsonwheeler/Documents/GitHub/HorrorCorridor/HorrorCorridor-V1/docs/live-agent/runs/2026-07-17T18-42-11-807Z/episodes/episode-0006-turn-left/starting-scene.png",
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
        "elapsedMs": 28390.700000000033,
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
          "state": "last-chance",
          "worldAngle": -2.964205102871306,
          "bearingRadians": -0.7065912239235903,
          "distance": 0.38859999999999884,
          "closestDistance": 0.38859999999999884,
          "beamContact": false,
          "beamHoldMs": 0,
          "fullScareWitnessed": true,
          "blackoutRemainingMs": 0,
          "lastChanceRemainingMs": 4932,
          "jumpscareRemainingMs": 0,
          "audioCue": {
            "serial": 16,
            "kind": "footstep",
            "pan": -0.4498299441311668,
            "intensity": 1,
            "nextInMs": 542.7651991057064
          }
        },
        "roomOffer": null,
        "flashlight": {
          "mode": "steady",
          "intensity": 1,
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
        "lastEvent": "The beam returned. Find The Still Guest before the last chance closes.",
        "eventSerial": 4
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

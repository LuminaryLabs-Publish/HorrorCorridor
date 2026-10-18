import type { HorrorCorridorV2Action, HorrorCorridorV2Snapshot } from "../../contracts";

export type PresentationScreen = "title" | "playing" | "paused" | "offering" | "caught";
export type PresentationUrgency = "calm" | "building" | "urgent";
export type PresentationAction = Readonly<{
  id: "open-index" | "pause" | "resume" | "claim-offering" | "restart";
  label: string;
  runtimeAction: Extract<HorrorCorridorV2Action, { type: "pause" | "claim-offering" | "restart" }> | null;
}>;

export type GamePresentationState = Readonly<{
  screen: PresentationScreen;
  objective: Readonly<{ title: string; instruction: string; urgency: PresentationUrgency }>;
  hud: Readonly<{ building: number; depthMeters: number; chronicle: number; timeMs: number; network: string | null }>;
  threat: Readonly<{ soundDirection: string | null; flashlight: "live" | "off" | "blackout"; message: string; countdownMs: number | null }>;
  actions: readonly PresentationAction[];
}>;

export type PresentationService = Readonly<{
  describe: (snapshot: HorrorCorridorV2Snapshot) => GamePresentationState;
}>;

function objectiveFor(snapshot: HorrorCorridorV2Snapshot): GamePresentationState["objective"] {
  if (snapshot.expedition.phase === "title") return { title: "Enter the corridor", instruction: "Begin the expedition.", urgency: "calm" };
  if (snapshot.expedition.phase === "caught") return { title: "The expedition ended", instruction: "Return to the lift.", urgency: "calm" };
  if (snapshot.expedition.phase === "paused") return { title: "The corridor waits", instruction: "Resume when ready.", urgency: "calm" };
  if (snapshot.room) return { title: "", instruction: "", urgency: "calm" };
  if (snapshot.expedition.phase === "offering") return { title: "The building gives something back", instruction: "Claim the offering to cross the threshold.", urgency: "calm" };
  switch (snapshot.dread.phase) {
    case "sign": return { title: "Find the sound", instruction: "Turn toward the warning.", urgency: "building" };
    case "approaching": return { title: "Face the threat", instruction: "Track the sound before it reaches you.", urgency: "building" };
    case "repelling": return { title: "Hold the beam", instruction: "Keep the monster in the flashlight.", urgency: "urgent" };
    case "blackout": return { title: "Keep moving", instruction: "The beam is down.", urgency: "urgent" };
    case "last-chance": return { title: "Respond now", instruction: "Turn and shine the light.", urgency: "urgent" };
    case "jumpscare": return { title: "Survive", instruction: "The darkness is close.", urgency: "urgent" };
    default: return { title: "Keep moving", instruction: "Listen for a change in the dark.", urgency: "calm" };
  }
}

function screenFor(snapshot: HorrorCorridorV2Snapshot): PresentationScreen {
  if (snapshot.expedition.phase === "title") return "title";
  if (snapshot.expedition.phase === "caught") return "caught";
  if (snapshot.expedition.phase === "paused") return "paused";
  if (snapshot.expedition.phase === "offering") return "offering";
  return "playing";
}

export function createPresentationService(): PresentationService {
  return Object.freeze({
    describe(snapshot: HorrorCorridorV2Snapshot): GamePresentationState {
      const screen = screenFor(snapshot);
      const actions: PresentationAction[] = screen === "playing"
        ? [
            { id: "open-index", label: "Index", runtimeAction: null },
            { id: "pause", label: "Pause", runtimeAction: { type: "pause", paused: true } },
          ]
        : screen === "paused"
          ? [{ id: "resume", label: "Keep moving", runtimeAction: { type: "pause", paused: false } }]
          : screen === "offering"
            ? [{ id: "claim-offering", label: "Claim and cross the threshold", runtimeAction: { type: "claim-offering" } }]
            : screen === "caught"
              ? [{ id: "restart", label: "Return to the lift", runtimeAction: { type: "restart" } }]
              : [];
      return Object.freeze({
        screen,
        objective: Object.freeze(objectiveFor(snapshot)),
        hud: Object.freeze({
          building: snapshot.expedition.buildingNumber,
          depthMeters: Math.floor(snapshot.expedition.distanceMeters),
          chronicle: Math.floor(snapshot.expedition.score),
          timeMs: snapshot.expedition.elapsedMs,
          network: snapshot.sharedExpedition.roomCode
            ? `${snapshot.sharedExpedition.connection}:${snapshot.sharedExpedition.roomCode}`
            : null,
        }),
        threat: Object.freeze({
          soundDirection: snapshot.dread.heardSide,
          flashlight: snapshot.dread.phase === "blackout" || snapshot.dread.phase === "jumpscare"
            ? "blackout"
            : snapshot.party.flashlight.effectiveOn ? "live" : "off",
          message: snapshot.dread.message,
          countdownMs: snapshot.dread.phase === "last-chance" ? snapshot.dread.lastChanceRemainingMs : null,
        }),
        actions: Object.freeze(actions),
      });
    },
  });
}

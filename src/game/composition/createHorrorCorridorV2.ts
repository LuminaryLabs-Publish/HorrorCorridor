import { createHorrorNexusRuntime } from "./nexusRuntime.mjs";
import {createPlaceExperience} from "../sequences/placeExperience";
import {
  EMPTY_INPUT,
  NETWORK_SCHEMA,
  SAVE_SCHEMA,
  SNAPSHOT_SCHEMA,
  type HorrorCorridorNetworkMessage,
  type HorrorCorridorV2Action,
  type HorrorCorridorV2Options,
  type HorrorCorridorV2Runtime,
  type HorrorCorridorV2Save,
  type HorrorCorridorV2Snapshot,
  type OfferingId,
  type SemanticInput,
} from "../contracts";
import { createCorridorDomain } from "../domains/corridor/index";
import { createPlaceResidency } from "../domains/corridor/places";
import { createCorridorContentRoutingService } from "../../content/corridorContentRouting";
import { createDreadDomain } from "../domains/dread/index";
import { createExpeditionDomain } from "../domains/expedition/index";
import { createPartyDomain } from "../domains/party/index";
import { createSharedExpeditionDomain } from "../domains/shared-expedition/index";
import { createPresentationService } from "../domains/presentation";
import { createRoomDomain } from "../domains/room";
import { ROOM_DEFINITIONS, ROOM_KITS } from "../../content/rooms";
import { createHorrorCorridorBehaviorKits, createHorrorCorridorRootKit } from "./behaviorKits";
import { createHorrorCorridorDomainKits, DOMAIN_PATHS } from "./domainKits";
import {
  clamp,
  createDeterministicRandom,
  deterministicDigest,
  normalizeAngle,
  normalizeSeed,
} from "./determinism";

const NETWORK_STEP_MS = 50;
const DEFAULT_STEP_SECONDS = 1 / 60;

function assertSnapshot(value: HorrorCorridorV2Snapshot): void {
  if (value.schema !== SNAPSHOT_SCHEMA) throw new Error(`Unsupported V2 snapshot schema: ${String(value.schema)}`);
}

function assertSave(value: HorrorCorridorV2Save): void {
  if (value.schema !== SAVE_SCHEMA) throw new Error(`Unsupported V2 save schema: ${String(value.schema)}`);
  assertSnapshot(value.snapshot);
}

export function createHorrorCorridorV2(options: HorrorCorridorV2Options = {}): HorrorCorridorV2Runtime {
  const seed = normalizeSeed(options.seed);
  const mode = options.mode ?? "solo";
  const explorerId = options.explorerId ?? `listener-${seed.toString(36).slice(0, 6)}`;
  const corridorRandom = createDeterministicRandom((seed ^ 0x0c0111d0) >>> 0);
  const dreadRandom = createDeterministicRandom((seed ^ 0x000d2ead) >>> 0);
  const experience=options.worldMode==="composed"?createPlaceExperience(()=>nexus.engine.sequenceNodeRuntime):undefined;
  const expedition = createExpeditionDomain(seed,experience,options.difficulty);
  const corridorContentRouting = createCorridorContentRoutingService();
  const placeResidency = createPlaceResidency(seed);
  const corridor = createCorridorDomain(seed, corridorRandom, corridorContentRouting, placeResidency, options.worldMode==="composed");
  const party = createPartyDomain(explorerId);
  const dread = createDreadDomain(dreadRandom,options.worldMode==="composed"?(start,goal)=>nexus.findPath(corridor.places.navigationGrid(start,goal),start,goal):undefined);
  const sharedExpedition = createSharedExpeditionDomain(seed, mode, options.roomCode);
  const presentation = createPresentationService();
  const room = options.roomPuzzles ? createRoomDomain(ROOM_DEFINITIONS) : undefined;
  room?.observe(corridor.places.current());
  const controllers = { expedition, corridor, party, dread, sharedExpedition, presentation, room } as const;

  const domainKits = createHorrorCorridorDomainKits(controllers,options.worldMode==="composed");
  const behaviorKits = createHorrorCorridorBehaviorKits(controllers);
  const explicitKits = [
    ...domainKits,
    ...behaviorKits,
    ...(room ? ROOM_KITS.map(kit => kit.createRuntimeKit()) : []),
    createHorrorCorridorRootKit(),
  ];
  const nexus = createHorrorNexusRuntime(explicitKits);
  const engine = nexus.engine;

  let started = false;
  let disposed = false;
  let tickNumber = 0;
  let simTimeMs = 0;
  let networkAccumulatorMs = 0;
  let currentInput: SemanticInput = { ...EMPTY_INPUT };
  let latestSnapshot: HorrorCorridorV2Snapshot;

  const buildSnapshot = (): HorrorCorridorV2Snapshot => {
    sharedExpedition.publicationRemainder(networkAccumulatorMs);
    const expeditionState = expedition.snapshot();
    const stateWithoutDigest = {
      schema: SNAPSHOT_SCHEMA,
      seed,
      tick: tickNumber,
      simTimeMs,
      expedition: expeditionState,
      corridor: corridor.snapshot(),
      party: party.snapshot(),
      dread: dread.snapshot(),
      sharedExpedition: sharedExpedition.snapshot(),
      ...(room ? { room: room.snapshot(party.snapshot()) } : {}),
    };
    const changedIndexEntries = Object.fromEntries(
      Object.entries(expeditionState.monsterIndex).filter(([, entry]) => (
        entry.status !== "unseen" || entry.encounters > 0 || entry.survivals > 0 || entry.captures > 0
      )),
    );
    const digestState = {
      ...stateWithoutDigest,
      expedition: {
        ...expeditionState,
        monsterIndex: {
          catalogSize: Object.keys(expeditionState.monsterIndex).length,
          changed: changedIndexEntries,
        },
      },
    };
    return {
      ...stateWithoutDigest,
      digest: deterministicDigest(digestState),
    };
  };

  const refresh = () => {
    latestSnapshot = buildSnapshot();
    return latestSnapshot;
  };

  const validateRoomSnapshot = (snapshot: HorrorCorridorV2Snapshot): void => {
    if (!snapshot.room) return;
    if (!room) throw new Error("This save requires room puzzles to be enabled.");
    const places = snapshot.corridor.places;
    const place = places?.instances.find(place => place.id === places.activeId);
    if (!place) throw new Error("Room snapshot has no active Corridor place.");
    // Validate the complete new Room branch before any existing owner is mutated.
    createRoomDomain(ROOM_DEFINITIONS).load(snapshot.room, place);
  };

  const applyAuthoritativeSnapshot = (snapshot: HorrorCorridorV2Snapshot): void => {
    assertSnapshot(snapshot);
    // Reject stale authority before any domain state can be changed.
    if (snapshot.sharedExpedition.revision < sharedExpedition.snapshot().revision) return;
    validateRoomSnapshot(snapshot);
    expedition.load(snapshot.expedition);
    corridor.load(snapshot.corridor);
    party.load(snapshot.party);
    dread.load(snapshot.dread);
    if (room && snapshot.room) room.load(snapshot.room, corridor.places.current());
    tickNumber = snapshot.tick;
    simTimeMs = snapshot.simTimeMs;
    engine.clock.frame = snapshot.tick;
    engine.clock.elapsed = snapshot.simTimeMs / 1_000;
    sharedExpedition.accept(snapshot);
  };

  const handleNetworkMessage = (message: HorrorCorridorNetworkMessage): void => {
    if (message.schema !== NETWORK_SCHEMA || message.sessionId !== sharedExpedition.snapshot().sessionId) return;
    if (mode === "client" && message.type === "snapshot") {
      applyAuthoritativeSnapshot(message.snapshot);
      refresh();
      return;
    }
    if (mode === "host" && message.type === "presence") {
      sharedExpedition.presence(message.peerId, message.connected, simTimeMs);
      refresh();
    }
  };

  const networkUnsubscribe = options.adapters?.network?.onMessage(handleNetworkMessage);
  const statusUnsubscribe = options.adapters?.network?.onStatus?.((status, peerId) => {
    sharedExpedition.status(status, peerId, simTimeMs);
    refresh();
  });

  const publishNetworkStep = (): void => {
    if (!options.adapters?.network || mode === "solo") return;
    const shared = sharedExpedition.snapshot();
    if (mode === "host") {
      sharedExpedition.commit(simTimeMs);
      const snapshot = buildSnapshot();
      options.adapters.network.publish({
        schema: NETWORK_SCHEMA,
        type: "snapshot",
        sessionId: shared.sessionId,
        revision: snapshot.sharedExpedition.revision,
        snapshot,
      });
    } else {
      options.adapters.network.publish({
        schema: NETWORK_SCHEMA,
        type: "intent",
        sessionId: shared.sessionId,
        peerId: explorerId,
        input: currentInput,
      });
    }
  };

  const claimOffering = (offeringId?: OfferingId) => {
    const claimed = corridor.claimOffering(offeringId);
    if (!claimed) return;
    const next = expedition.advanceBuilding();
    corridor.enterBuilding(next.buildingNumber);
    dread.forceDormant();
  };

  const dispatch = (action: HorrorCorridorV2Action): HorrorCorridorV2Snapshot => {
    if (disposed) throw new Error("HorrorCorridor V2 runtime is disposed.");
    switch (action.type) {
      case "set-input":
        currentInput = {
          forward: clamp(action.input.forward ?? currentInput.forward, -1, 1),
          strafe: clamp(action.input.strafe ?? currentInput.strafe, -1, 1),
          turn: clamp(action.input.turn ?? currentInput.turn, -1, 1),
          sprint: action.input.sprint ?? currentInput.sprint,
        };
        break;
      case "look":
        party.look(action.yawDelta, action.pitchDelta);
        break;
      case "flashlight": {
        const next = action.active ?? !party.snapshot().flashlight.intentOn;
        party.setFlashlight(next);
        break;
      }
      case "interact":
        if (room && expedition.snapshot().phase !== "delving") break;
        if (room && room.snapshot()?.phase !== "open") {
          const pose = party.snapshot(); room.interact(pose.position, pose.yaw, pose.pitch);
        } else if (corridor.snapshot().offering) claimOffering();
        else if(options.worldMode==="composed" && !room){
          const result=corridor.places.inspect(party.snapshot().position);
          if(result?.fresh)expedition.recordDiscovery(result.text);
        }
        break;
      case "claim-offering":
        claimOffering(action.offeringId);
        break;
      case "pause": {
        const paused = action.paused ?? expedition.snapshot().phase !== "paused";
        expedition.pause(paused);
        break;
      }
      case "restart":
        expedition.restartRun();
        corridor.reset();
        party.reset();
        dread.reset();
        room?.reset(); room?.observe(corridor.places.current());
        currentInput = { ...EMPTY_INPUT };
        started = true;
        break;
      case "network-message":
        handleNetworkMessage(action.message);
        break;
      case "network-status":
        sharedExpedition.status(action.status, action.peerId, simTimeMs);
        break;
    }
    return refresh();
  };

  const tick = (deltaSeconds = DEFAULT_STEP_SECONDS): HorrorCorridorV2Snapshot => {
    if (disposed) throw new Error("HorrorCorridor V2 runtime is disposed.");
    if (!started) return latestSnapshot;
    if (expedition.snapshot().phase === "paused") return latestSnapshot;
    const dt = clamp(deltaSeconds, 0, 0.1);
    const deltaMs = dt * 1_000;
    engine.tick(dt);
    tickNumber = engine.clock.frame;
    simTimeMs = engine.clock.elapsed * 1_000;
    networkAccumulatorMs += deltaMs;

    if (mode !== "client") {
      const expeditionBefore = expedition.snapshot();
      if (room && !["dormant", "resolved"].includes(dread.snapshot().phase)) dread.forceDormant();
      const dreadBefore = dread.snapshot();
      const forcedBlackout = dreadBefore.phase === "blackout" || dreadBefore.phase === "jumpscare";
      party.setEffectiveFlashlight(!forcedBlackout);
      const activeInput = expeditionBefore.phase === "delving" ? currentInput : EMPTY_INPUT;
      room?.observe(corridor.places.current());
      const movement = party.step(dt, activeInput, (position, previous) => {
        const resolved = corridor.resolveMotion(position, previous);
        return room ? room.resolve(resolved, previous) : resolved;
      });
      expedition.step(deltaMs, movement.distanceMeters);
      corridor.step(deltaMs, forcedBlackout);

      const partyState = party.snapshot();
      corridor.observePose(partyState.position,dreadBefore.spatial?.position);
      room?.observe(corridor.places.current());
      const roomOutcome = room?.step(deltaMs);
      if (roomOutcome) expedition.recordDiscovery(`Escaped ${room?.snapshot()?.title}.`);
      if(options.worldMode==="composed")expedition.enterPlace(corridor.places.current().id);
      const corridorState = corridor.snapshot();
      const relativeBearing = normalizeAngle(dreadBefore.bearingRadians - partyState.yaw);
      const beamContact = Boolean(
        dreadBefore.monsterId &&
        partyState.flashlight.effectiveOn &&
        Math.abs(relativeBearing) <= corridorState.beam.halfAngle,
      );
      corridor.setBeam(partyState.flashlight.effectiveOn, beamContact);
      corridor.setAcousticCue(Math.sin(relativeBearing), dreadBefore.monsterId ? dreadBefore.threat : 0);

      const outcomes = dread.step({
        deltaMs,
        encounterEligible:room ? false : corridor.encounterEligible(),
        placeId:corridor.places.current().definitionId,
        difficulty:expedition.snapshot().difficulty,
        buildingNumber: expedition.snapshot().buildingNumber,
        distanceSinceEncounter: expedition.snapshot().distanceSinceEncounter,
        playerYaw: partyState.yaw,
        playerPosition:partyState.position,
        flashlightEffective: partyState.flashlight.effectiveOn,
        beamContact,
        isMoving: movement.distanceMeters > 0.001,
      });

      for (const outcome of outcomes) {
        if (outcome.type === "encounter-started") {
          expedition.hearMonster(outcome.monster.id, outcome.monster.name);
        } else if (outcome.type === "repelled") {
          expedition.recordOutcome(outcome.monster.id, outcome.monster.name, outcome.study);
          corridor.openOffering(expedition.snapshot().buildingNumber);
          party.setCondition("shaken");
        } else {
          expedition.caught(outcome.monster.id, outcome.monster.name);
          party.setCondition("captured");
        }
      }

      const dreadAfter = dread.snapshot();
      if (dreadAfter.phase === "blackout") party.setCondition("blinded");
      else if (party.snapshot().condition === "blinded") party.setCondition("shaken");
    }

    while (networkAccumulatorMs >= NETWORK_STEP_MS) {
      networkAccumulatorMs -= NETWORK_STEP_MS;
      if (mode === "solo") sharedExpedition.commit(simTimeMs);
      publishNetworkStep();
    }
    return refresh();
  };

  const start = (): HorrorCorridorV2Snapshot => {
    if (disposed) throw new Error("HorrorCorridor V2 runtime is disposed.");
    started = true;
    engine.tick(0);
    expedition.begin();
    return refresh();
  };

  const reset = (): HorrorCorridorV2Snapshot => {
    expedition.reset();
    corridor.reset();
    party.reset();
    dread.reset();
    room?.reset(); room?.observe(corridor.places.current());
    sharedExpedition.reset();
    currentInput = { ...EMPTY_INPUT };
    tickNumber = 0;
    simTimeMs = 0;
    engine.clock.frame = 0;
    engine.clock.elapsed = 0;
    networkAccumulatorMs = 0;
    started = false;
    return refresh();
  };

  const save = async (): Promise<HorrorCorridorV2Save> => {
    const value: HorrorCorridorV2Save = {
      schema: SAVE_SCHEMA,
      savedAt: new Date().toISOString(),
      snapshot: refresh(),
    };
    await options.adapters?.persistence?.save(value);
    return value;
  };

  const load = async (value?: HorrorCorridorV2Save): Promise<boolean> => {
    const resolved = value ?? await options.adapters?.persistence?.load();
    if (!resolved) return false;
    assertSave(resolved);
    const next = resolved.snapshot;
    validateRoomSnapshot(next);
    expedition.load(next.expedition);
    corridor.load(next.corridor);
    party.load(next.party);
    dread.load(next.dread);
    if (room) {
      if (next.room) room.load(next.room, corridor.places.current());
      else { room.reset(); room.observe(corridor.places.current()); }
    }
    sharedExpedition.load(next.sharedExpedition);
    tickNumber = next.tick;
    simTimeMs = next.simTimeMs;
    engine.clock.frame=next.tick;
    engine.clock.elapsed=next.simTimeMs/1_000;
    networkAccumulatorMs=next.sharedExpedition.publicationRemainderMs??0;
    currentInput={...EMPTY_INPUT};
    started = next.expedition.phase !== "title";
    refresh();
    return true;
  };

  const dispose = (): void => {
    if (disposed) return;
    disposed = true;
    networkUnsubscribe?.();
    statusUnsubscribe?.();
    options.adapters?.network?.dispose();
    nexus.dispose();
  };

  latestSnapshot = buildSnapshot();

  return Object.freeze({
    start,
    tick,
    dispatch,
    snapshot: () => latestSnapshot,
    reset,
    save,
    load,
    dispose,
    diagnostics: () => ({
      coreKitCount: nexus.coreKitCount,
      explicitKitCount: nexus.installOrder.length,
      installOrder: [...nexus.installOrder],
      domainPaths: [...Object.values(DOMAIN_PATHS), ...(room ? ["n:horror-corridor-v2:room"] : [])],
    }),
  });
}

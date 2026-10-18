import { defineDomainServiceKit, type NexusRuntimeKit } from "nexusengine";
import type { CorridorDomain } from "../domains/corridor/index";
import type { DreadDomain } from "../domains/dread/index";
import type { ExpeditionDomain } from "../domains/expedition/index";
import type { PartyDomain } from "../domains/party/index";
import type { SharedExpeditionDomain } from "../domains/shared-expedition/index";
import type { PlaceResidencyService } from "../domains/corridor/places";
import type { PresentationService } from "../domains/presentation";
import type { RoomDomain } from "../domains/room";
import { ROOM_DOMAIN_PATH } from "../domains/room/contracts";

export const HORROR_CORRIDOR_ROOT_DOMAIN = "n:horror-corridor-v2";
export const DOMAIN_PATHS = Object.freeze({
  expedition: `${HORROR_CORRIDOR_ROOT_DOMAIN}:expedition`,
  corridor: `${HORROR_CORRIDOR_ROOT_DOMAIN}:corridor`,
  party: `${HORROR_CORRIDOR_ROOT_DOMAIN}:party`,
  dread: `${HORROR_CORRIDOR_ROOT_DOMAIN}:dread`,
  sharedExpedition: `${HORROR_CORRIDOR_ROOT_DOMAIN}:shared-expedition`,
});

export type HorrorCorridorDomainControllers = Readonly<{
  expedition: ExpeditionDomain;
  corridor: CorridorDomain;
  party: PartyDomain;
  dread: DreadDomain;
  sharedExpedition: SharedExpeditionDomain;
  presentation: PresentationService;
  room?: RoomDomain;
}>;

export function createHorrorCorridorDomainKits(controllers: HorrorCorridorDomainControllers,composed=false): readonly NexusRuntimeKit[] {
  return Object.freeze([
    ...(controllers.room ? [defineDomainServiceKit({
      id: "horror-corridor-room-dsk", domain: "room", domainPath: ROOM_DOMAIN_PATH,
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN, requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      provides: [ROOM_DOMAIN_PATH], apiName: "horrorCorridorRoom", version: "1.0.0", stability: "project",
      services: ["instances", "interactions", "exit-lock", "snapshot", "reset"],
      inputs: ["place-residency", "party-pose", "interact"], outputs: ["room-descriptor", "room-opened"],
      createApi: () => controllers.room,
    })] : []),
    defineDomainServiceKit({
      id: "horror-corridor-presentation-dsk",
      domain: "presentation",
      domainPath: `${HORROR_CORRIDOR_ROOT_DOMAIN}:presentation`,
      provides: ["horror-corridor:presentation"],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorPresentation",
      services: ["screen", "objective", "hud", "actions"],
      stability: "project",
      version: "1.0.0",
      inputs: ["domain-snapshot"],
      outputs: ["presentation-descriptor"],
      createApi: (): PresentationService => controllers.presentation,
    }),
    ...(composed?[defineDomainServiceKit({
      id:"horror-corridor-place-residency-kit",domain:"places",
      domainPath:`${DOMAIN_PATHS.corridor}:places`,parentDomainPath:DOMAIN_PATHS.corridor,
      requires:[DOMAIN_PATHS.corridor],provides:["horror-corridor:place-residency"],
      apiName:"horrorCorridorPlaces",version:"1.0.0",stability:"project",
      createApi:():PlaceResidencyService=>controllers.corridor.places,
    }),defineDomainServiceKit({
      id:"horror-corridor-place-experience-kit",domain:"experience",
      domainPath:`${DOMAIN_PATHS.expedition}:experience`,parentDomainPath:DOMAIN_PATHS.expedition,
      requires:[DOMAIN_PATHS.expedition,"n:runtime:sequence"],provides:["horror-corridor:place-experience"],
      apiName:"horrorCorridorExperience",version:"1.0.0",stability:"project",
      createApi:()=>controllers.expedition.experience,
    })]:[]),
    defineDomainServiceKit({
      id: "horror-corridor-v2-expedition-dsk",
      domain: "expedition",
      domainPath: DOMAIN_PATHS.expedition,
      provides: [DOMAIN_PATHS.expedition],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorExpedition",
      services: ["progress", "fate", "chronicle", "monster-index"],
      stability: "project",
      version: "1.0.0",
      inputs: ["movement-distance", "dread-outcome", "offering-claimed"],
      outputs: ["expedition-snapshot", "progression-event"],
      createApi: () => controllers.expedition,
    }),
    defineDomainServiceKit({
      id: "horror-corridor-v2-corridor-dsk",
      domain: "corridor",
      domainPath: DOMAIN_PATHS.corridor,
      provides: [DOMAIN_PATHS.corridor],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorWorld",
      services: ["route", "content-routing", "chamber", "illumination", "beam", "acoustics", "offering"],
      stability: "project",
      version: "1.0.0",
      inputs: ["route-context", "party-pose", "flashlight-intent", "dread-blackout"],
      outputs: ["routed-content-descriptor", "corridor-snapshot", "beam-contact", "threshold-event"],
      createApi: () => controllers.corridor,
    }),
    defineDomainServiceKit({
      id: "horror-corridor-v2-party-dsk",
      domain: "party",
      domainPath: DOMAIN_PATHS.party,
      provides: [DOMAIN_PATHS.party],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorParty",
      services: ["explorer", "pose", "gaze", "flashlight-intent", "condition"],
      stability: "project",
      version: "1.0.0",
      inputs: ["semantic-input", "collision-result", "dread-consequence"],
      outputs: ["party-snapshot", "movement-distance", "flashlight-intent"],
      createApi: () => controllers.party,
    }),
    defineDomainServiceKit({
      id: "horror-corridor-v2-dread-dsk",
      domain: "dread",
      domainPath: DOMAIN_PATHS.dread,
      provides: [DOMAIN_PATHS.dread],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorDread",
      services: ["monster", "sign", "pursuit", "blackout", "capture"],
      stability: "project",
      version: "1.0.0",
      inputs: ["party-pose", "corridor-beam-contact"],
      outputs: ["dread-snapshot", "encounter-outcome", "forced-blackout"],
      createApi: () => controllers.dread,
    }),
    defineDomainServiceKit({
      id: "horror-corridor-v2-shared-expedition-dsk",
      domain: "shared-expedition",
      domainPath: DOMAIN_PATHS.sharedExpedition,
      provides: [DOMAIN_PATHS.sharedExpedition],
      requires: [HORROR_CORRIDOR_ROOT_DOMAIN],
      parentDomainPath: HORROR_CORRIDOR_ROOT_DOMAIN,
      apiName: "horrorCorridorSharedExpedition",
      services: ["authority", "replication", "reconnect", "recovery"],
      stability: "project",
      version: "1.0.0",
      inputs: ["authoritative-snapshot", "network-presence"],
      outputs: ["shared-snapshot", "recovery-event"],
      createApi: () => controllers.sharedExpedition,
    }),
  ]);
}

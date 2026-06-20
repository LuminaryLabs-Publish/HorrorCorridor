import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type SpatialInteractionDomainKitConfig = Readonly<{
  interactionDistance: number;
  targetKinds: readonly string[];
}>;

export const createSpatialInteractionDomainKit = (
  config: SpatialInteractionDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "spatial-interaction",
    services: ["targets", "range-checks", "interaction-events"],
    resources: {
      SpatialInteractionState: "spatialInteraction.state",
    },
    events: {
      InteractionRequested: "spatialInteraction.requested",
      InteractionAccepted: "spatialInteraction.accepted",
      InteractionRejected: "spatialInteraction.rejected",
    },
    metadata: {
      purpose: "Generic nearby target discovery, interaction validation, and interaction events.",
      config,
    },
  });

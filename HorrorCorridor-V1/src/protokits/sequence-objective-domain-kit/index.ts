import { defineHorrorDomainKit, createHorrorDomainToken, type HorrorDomainKit } from "../domainKit";

export type SequenceObjectiveDomainKitConfig = Readonly<{
  slotCount: number;
  requiredValues: readonly string[];
  completionMode: "ordered" | "unordered";
}>;

export const createSequenceObjectiveDomainKit = (
  config: SequenceObjectiveDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "sequence-objective",
    services: ["requirements", "slots", "completion"],
    requires: [createHorrorDomainToken("inventory"), createHorrorDomainToken("spatial-interaction")],
    resources: {
      SequenceObjectiveState: "sequenceObjective.state",
      SequenceSlotState: "sequenceObjective.slots",
    },
    events: {
      SequenceSlotFilled: "sequenceObjective.slotFilled",
      SequenceCompleted: "sequenceObjective.completed",
    },
    metadata: {
      purpose: "Generic ordered or unordered objective sequence with slot state and completion events.",
      config,
    },
  });

import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type InventoryDomainKitConfig = Readonly<{
  capacity: number;
  acceptedItemKinds: readonly string[];
}>;

export const createInventoryDomainKit = (config: InventoryDomainKitConfig): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "inventory",
    services: ["held-items", "pickup-drop"],
    resources: {
      InventoryState: "inventory.state",
    },
    events: {
      ItemPickedUp: "inventory.itemPickedUp",
      ItemDropped: "inventory.itemDropped",
    },
    metadata: {
      purpose: "Generic held-item inventory and pickup/drop ownership state.",
      config,
    },
  });

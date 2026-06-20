import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type GridFieldDomainKitConfig = Readonly<{
  cellValues: Readonly<Record<string, number>>;
  safeZoneCellRadius: number;
  surfaces: readonly ("wall" | "floor" | "ceiling" | "anomaly")[];
}>;

export const createGridFieldDomainKit = (config: GridFieldDomainKitConfig): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "grid-field",
    services: ["occupancy-field", "surface-field", "safe-zones"],
    requires: [createHorrorDomainToken("grid-maze")],
    resources: {
      GridFieldState: "gridField.state",
      GridFieldQuery: "gridField.query",
    },
    metadata: {
      purpose:
        "Generic conversion from grid cells into queryable occupancy, surface, and safe-zone fields.",
      config,
    },
  });

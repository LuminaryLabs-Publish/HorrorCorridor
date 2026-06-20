import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type CorridorTileDomainKitConfig = Readonly<{
  tileSet: readonly string[];
  variantWeights: Record<string, number>;
  regionThemes: readonly string[];
}>;

export const createCorridorTileDomainKit = (
  config: CorridorTileDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "corridor-tile",
    services: ["connectivity-signatures", "tile-variants", "region-themes"],
    requires: [createHorrorDomainToken("grid-maze")],
    resources: {
      CorridorTileState: "corridorTile.state",
      CorridorTileDescriptors: "corridorTile.descriptors",
    },
    metadata: {
      purpose: "Generic modular corridor tile descriptors derived from grid connectivity.",
      config,
    },
  });

import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type GridMazeDomainKitConfig = Readonly<{
  gridSize: number;
  cellSize: number;
  generatorId: string;
  cellValues: Record<string, number>;
}>;

export const createGridMazeDomainKit = (config: GridMazeDomainKitConfig): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "grid-maze",
    services: ["grid", "paths", "spawn-points"],
    resources: {
      GridMazeState: "gridMaze.state",
      GridMazeLookup: "gridMaze.lookup",
    },
    metadata: {
      purpose: "Generic grid maze state, cell lookup, start/end markers, path lookup, and spawn anchors.",
      config,
    },
  });

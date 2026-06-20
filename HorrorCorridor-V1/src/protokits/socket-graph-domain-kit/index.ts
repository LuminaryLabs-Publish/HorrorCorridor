import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type SocketGraphDomainKitConfig = Readonly<{
  enabled: boolean;
  maxSockets: number;
  connectionRadius: number;
  maxNeighborsPerSocket: number;
}>;

export const createSocketGraphDomainKit = (
  config: SocketGraphDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "socket-graph",
    services: ["socket-nodes", "socket-connections", "placement-frames"],
    requires: [createHorrorDomainToken("triangle-surface-sampler")],
    resources: {
      SocketGraphState: "socketGraph.state",
      SocketNodeDescriptors: "socketGraph.nodes",
      SocketEdgeDescriptors: "socketGraph.edges",
    },
    metadata: {
      purpose:
        "Generic graph-building over sampled placement sockets so scene dressing can attach to meaningful local frames instead of random cells.",
      config,
    },
  });

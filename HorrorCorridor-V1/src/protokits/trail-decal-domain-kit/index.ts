import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type TrailDecalDomainKitConfig = Readonly<{
  spacing: number;
  maxDecals: number;
  decayIntervalMs: number;
  decalKind: string;
  material: Readonly<{
    color: number;
    opacity: number;
  }>;
}>;

export const createTrailDecalDomainKit = (config: TrailDecalDomainKitConfig): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "trail-decal",
    services: ["distance-spawn", "decay", "render-descriptors"],
    resources: {
      TrailDecalState: "trailDecal.state",
    },
    events: {
      TrailDecalSpawned: "trailDecal.spawned",
      TrailDecalDecayed: "trailDecal.decayed",
    },
    metadata: {
      purpose: "Generic distance-based trail decal spawning, decay, cap, and render descriptor output.",
      config,
    },
  });

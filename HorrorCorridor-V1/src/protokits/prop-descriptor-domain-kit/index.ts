import { defineHorrorDomainKit, type HorrorDomainKit } from "../domainKit";

export type PropDescriptorDomainKitConfig = Readonly<{
  propKinds: readonly string[];
  maxProps: number;
}>;

export const createPropDescriptorDomainKit = (
  config: PropDescriptorDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: "prop-descriptor",
    services: ["asset-registry", "render-descriptors"],
    resources: {
      PropDescriptorState: "propDescriptor.state",
    },
    metadata: {
      purpose: "Generic prop asset and renderer descriptor registry.",
      config,
    },
  });

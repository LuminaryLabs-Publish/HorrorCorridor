import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "./domainKit";

export type SceneObjectDomainKitConfig = Readonly<{
  enabled: boolean;
  maxVisible: number;
  palette: readonly number[];
  propKinds: readonly string[];
  materialFamilies: readonly string[];
  shaderProfiles: readonly string[];
}>;

export type SceneObjectDomainKitDefinition = Readonly<{
  domain: string;
  services: readonly string[];
  purpose: string;
  resources: Record<string, string>;
  requires?: readonly string[];
}>;

export const createSceneObjectDomainKit = (
  definition: SceneObjectDomainKitDefinition,
  config: SceneObjectDomainKitConfig,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    domain: definition.domain,
    services: definition.services,
    requires: [
      createHorrorDomainToken("object-placement"),
      createHorrorDomainToken("prop-material-fidelity"),
      ...(definition.requires ?? []),
    ],
    resources: definition.resources,
    metadata: {
      purpose: definition.purpose,
      config,
    },
  });

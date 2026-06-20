import { createHorrorDomainToken, defineHorrorDomainKit, type HorrorDomainKit } from "../../domainKit";
import type { CorridorLampPartProfileConfig } from "./types";

export type CorridorLampPartProfileKitDefinition = Readonly<{
  apiName: string;
  config: CorridorLampPartProfileConfig;
  domain: string;
  purpose: string;
  resources: Record<string, string>;
  services: readonly string[];
  requires?: readonly string[];
}>;

export const defineCorridorLampPartProfileKit = (
  definition: CorridorLampPartProfileKitDefinition,
): HorrorDomainKit =>
  defineHorrorDomainKit({
    id: `${definition.domain}-kit`,
    domain: definition.domain,
    apiName: definition.apiName,
    services: definition.services,
    requires: [
      createHorrorDomainToken("prop-material-fidelity"),
      ...(definition.requires ?? []),
    ],
    resources: definition.resources,
    metadata: {
      purpose: definition.purpose,
      config: definition.config,
    },
  });


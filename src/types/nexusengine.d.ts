// Narrow declarations for the public JS factory surfaces used by local kits.
declare module "nexusengine" {
  export type NexusRuntimeKit = Readonly<{
    id: string; provides?: readonly string[]; requires?: readonly string[];
    [key: string]: unknown;
  }>;
  export function defineRuntimeKit(config: {id: string; [key: string]: unknown}): NexusRuntimeKit;
  export function defineDomainServiceKit(config: {id: string; domain: string; [key: string]: unknown}): NexusRuntimeKit;
  export function createEngine(config?: Record<string, unknown>): any;
}

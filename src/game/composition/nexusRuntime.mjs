import { createEngine, defineDomainServiceKit } from 'nexusengine';
import { createCompositionKit } from 'nexusengine/domains/composition';
import { createSpatialKit } from 'nexusengine/domains/spatial/contracts';
import { createWorldDomain } from 'nexusengine/domains/world/runtime';
import { createProceduralGenerationKit } from 'nexusengine/domains/world/generation';
import { createNavMeshKit } from 'nexusengine/domains/world/navigation/navmesh';
import { createPathfindingKit, createAStarPathfinder, resolveNavigationAdapter } from 'nexusengine/domains/world/navigation/pathfinding';
import { createSceneKit } from 'nexusengine/domains/world/scene';

export const NEXUS_COMMIT = 'a74e8689d1a71c0b42236c009f0f4c46e9b89387';

/** Capability installation, not a second owner of gameplay state. */
export function createHorrorNexusRuntime(localKits = []) {
  const engine = createEngine({ tick:{maxDelta:0.1},kits: [createCompositionKit()] });
  const core = [createSpatialKit(), createWorldDomain({ foundation: false, features: false }),
    createProceduralGenerationKit(), createNavMeshKit(), createPathfindingKit(), createSceneKit()];
  const byId = new Map(core.map(kit => [kit.id, kit]));
  const plan = engine.n.composition.planning.validate({ kits: [...byId.keys()] }, { throwOnError: true });
  const coreOrder = plan.order.map(id => {
    const kit = byId.get(id);
    if (!kit) throw new Error(`Unapproved transitive dependency: ${id}`);
    return kit;
  });
  const root = defineDomainServiceKit({ id:'horror-corridor-domain',domain:'horror-corridor-v2',
    provides:['n:horror-corridor-v2'],
    domainPath:'n:horror-corridor-v2',apiName:'horrorCorridor',version:'2.0.0',stability:'project',
    createApi:()=>Object.freeze({purpose:'Coordinate the expedition without owning its state.'}) });
  const ordered = [...coreOrder, root];
  const provided = new Set([...engine.kits, ...ordered].flatMap(kit => [kit.id,...(kit.provides ?? [])]));
  const ids = new Set([...engine.kits, ...ordered].map(kit=>kit.id));
  const pending = [...localKits];
  for (const kit of pending) {
    if (ids.has(kit.id)) throw new Error(`Duplicate kit: ${kit.id}`);
    ids.add(kit.id);
  }
  while (pending.length) {
    const index = pending.findIndex(kit=>(kit.requires ?? []).every(id=>provided.has(id)));
    if (index<0) throw new Error(`Unresolved local kit dependencies: ${pending.map(kit=>kit.id).join(', ')}`);
    const [kit] = pending.splice(index,1);
    ordered.push(kit);
    for (const id of [kit.id,...(kit.provides ?? [])]) provided.add(id);
  }
  const expected = [...engine.kits.map(kit=>kit.id), ...ordered.map(kit=>kit.id)];
  for (const kit of ordered) engine.installKit(kit);
  if (JSON.stringify(engine.kits.map(kit=>kit.id)) !== JSON.stringify(expected)) throw new Error('Hidden kit install');
  let disposed = false;
  return { engine, coreKitCount:4+core.length, installOrder:Object.freeze(expected),
    findPath(walkability,start,goal){
      const adapter=resolveNavigationAdapter('grid',{walkability});
      const result=createAStarPathfinder({adapter}).findPath({start,goal});
      return result.status==='resolved'?result.points:[];
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      engine.sequenceNodeRuntime.dispose();
      engine.sequenceRuntime.dispose();
    },
  };
}

import { createEngine } from 'nexusengine';
import { createCompositionKit } from 'nexusengine/domains/composition';
import { createSpatialKit } from 'nexusengine/domains/spatial/contracts';
import { createWorldDomain } from 'nexusengine/domains/world/runtime';
import { createProceduralGenerationKit } from 'nexusengine/domains/world/generation';
import { createNavMeshKit } from 'nexusengine/domains/world/navigation/navmesh';
import { createPathfindingKit } from 'nexusengine/domains/world/navigation/pathfinding';
import { createSceneKit } from 'nexusengine/domains/world/scene';

export const CANDIDATE_COMMIT = 'a74e8689d1a71c0b42236c009f0f4c46e9b89387';

/** Consumer gate only. No game imports and no replacement of V2's authority. */
export function createMigrationConsumer() {
  const engine = createEngine({ kits: [createCompositionKit()] });
  const kits = [createSpatialKit(), createWorldDomain({ foundation: false, features: false }),
    createProceduralGenerationKit(), createNavMeshKit(), createPathfindingKit(), createSceneKit()];
  const byId = new Map(kits.map(kit => [kit.id, kit]));
  const plan = engine.n.composition.planning.validate({ kits: [...byId.keys()] }, { throwOnError: true });
  for (const id of plan.order) {
    const kit = byId.get(id);
    if (!kit) throw new Error(`Unapproved transitive dependency: ${id}`);
    engine.installKit(kit);
  }
  const approved = [...engine.kits.slice(0, 4).map(kit => kit.id), ...plan.order];
  if (JSON.stringify(engine.kits.map(kit => kit.id)) !== JSON.stringify(approved)) {
    throw new Error('Hidden installs changed the accepted consumer graph.');
  }
  let disposed = false;
  return {
    engine, plan,
    tick(delta = 1 / 60) {
      if (disposed) throw new Error('Consumer disposed');
      engine.tick(delta);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      // This revision has no engine.dispose(). Dispose the public sequence owners.
      engine.sequenceNodeRuntime.dispose();
      engine.sequenceRuntime.dispose();
    },
  };
}

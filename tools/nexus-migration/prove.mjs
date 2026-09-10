import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createMigrationConsumer, CANDIDATE_COMMIT } from './consumer.mjs';

const began = performance.now();
const lock = JSON.parse(readFileSync(new URL('package-lock.json', import.meta.url)));
assert.match(lock.packages['node_modules/nexusengine'].resolved, new RegExp(CANDIDATE_COMMIT));
const consumer = createMigrationConsumer();
const { engine } = consumer;
try {
  const ids = engine.kits.map(kit => kit.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids.slice(0, 3), ['runtime-lifecycle-kit', 'realtime-runtime-kit', 'runtime-sequence-kit']);
  assert.equal(engine.n.composition.planning.validate({kits:['nonexistent-kit']}).ok, false);
  const spatial = engine.n.spatial;
  const initial = spatial.getSnapshot();
  spatial.update({ migrationMarker: 7 });
  assert.equal(spatial.getSnapshot().migrationMarker, 7);
  spatial.loadSnapshot(initial);
  assert.deepEqual(spatial.getSnapshot(), initial);
  spatial.reset();
  assert.deepEqual(spatial.getSnapshot(), initial);
  const pathfinding = engine.n.pathfinding;
  const command = { operationId:'tavern-occluder-1', mode:'grid',
    walkability:{ width:3, height:3, cells:Array.from({length:9},(_,i)=>({x:i%3,y:Math.floor(i/3),walkable:i!==4})) },
    start:{x:0,y:1}, goal:{x:2,y:1} };
  const receipt = pathfinding.requestPath(command);
  assert.equal(receipt.result.status, 'resolved');
  assert.equal(receipt.result.points.length, 5);
  assert(receipt.result.nodes.every(node => node.x !== 1 || node.y !== 1));
  assert.deepEqual(pathfinding.requestPath(command), receipt);
  assert.throws(() => pathfinding.requestPath({...command, goal:{x:1,y:1}}), /different content/);
  assert.equal(pathfinding.requestPath({...command, operationId:'blocked', goal:{x:1,y:1}}).result.status, 'failed');
  const saved = pathfinding.getSnapshot();
  pathfinding.reset();
  pathfinding.loadSnapshot(saved);
  assert.deepEqual(pathfinding.requestPath(command), receipt);
  const sequence = engine.sequenceNodeRuntime;
  const definition = { id:'place', type:'flow', children:[
    {id:'arrival',type:'waitForEvent',config:{event:'corridor.entered'}},
    {id:'response',type:'waitForEvent',config:{event:'dread.resolved'}},
  ]};
  assert.equal(sequence.validate(definition).ok, true);
  assert.equal(sequence.validate({id:'invalid',type:'waitForEvent'}).ok, false);
  sequence.mount(definition);
  sequence.start('place');
  for (let frame=0;frame<60;frame++) consumer.tick();
  assert.equal(engine.clock.frame, 60);
  assert(Math.abs(engine.clock.elapsed-1)<1e-9);
  assert.equal(sequence.getNodeState('arrival'), 'running');
  sequence.dispatch('unrelated');
  assert.equal(sequence.getNodeState('arrival'), 'running');
  sequence.dispatch('corridor.entered');
  assert.equal(sequence.getNodeState('response'), 'running');
  sequence.dispatch('dread.resolved');
  assert.equal(sequence.getNodeState('place'), 'finished');
  const final = sequence.getRunnerStates();
  sequence.dispatch('dread.resolved');
  assert.deepEqual(sequence.getRunnerStates(), final);
  consumer.dispose(); consumer.dispose();
  assert.equal(sequence.snapshot().disposed, true);
  assert.equal(sequence.snapshot().nodes.length, 0);
  assert.throws(()=>consumer.tick(), /disposed/);
  console.log(JSON.stringify({schema:'horror-corridor.nexus-consumer-proof/1',ok:true,
    engineCommit:CANDIDATE_COMMIT,kitIds:ids,proofs:['public-install-graph','single-clock','snapshot-reset',
      'obstacle-aware-astar','unreachable-path','idempotent-path-receipt','event-sequence','sequence-disposal'],
    digest:createHash('sha256').update(JSON.stringify({receipt,final})).digest('hex'),
    elapsedMs:Math.round(performance.now()-began),
    limits:['Not game parity or browser acceptance.','Mid-encounter resume requires a game-owned checkpoint mapping.']},null,2));
} finally { consumer.dispose(); }

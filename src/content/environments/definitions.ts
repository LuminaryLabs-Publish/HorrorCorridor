/** Semantic geometry is authoritative; greybox and model bindings consume it. */
export type EnvironmentDefinition = Readonly<{
  id: string; version: 1; title: string;
  role: "safe" | "investigation" | "threat" | "recovery";
  length: number; width: number; height: number;
  entrance: Readonly<{ width: number; floorY: 0 }>;
  exit: Readonly<{ width: number; floorY: 0 }>;
  presentation: Readonly<{ greybox: string; model: string | null }>;
  fixtures: readonly Readonly<{id:string;x:number;z:number;width:number;depth:number;height:number}>[];
  clue: string;
}>;

function place(id:string,title:string,role:EnvironmentDefinition["role"],length:number,width:number,
  fixtures:EnvironmentDefinition["fixtures"],clue:string):EnvironmentDefinition {
  return Object.freeze({id,version:1,title,role,length,width,height:3.8,
    entrance:Object.freeze({width:3,floorY:0}),exit:Object.freeze({width:3,floorY:0}),
    presentation:Object.freeze({greybox:`${id}:greybox/1`,model:null}),
    fixtures:Object.freeze(fixtures.map(f=>Object.freeze(f))),clue});
}

export const ENVIRONMENTS:readonly EnvironmentDefinition[] = Object.freeze([
  place("safe-arrival","The Last Working Lift","safe",32,7.2,[],
    "Listen here. There is no pursuit inside the arrival shelter."),
  place("maintenance-passage","The Service Walk","investigation",64,6.4,
    [{id:"service-cabinet",x:-2.5,z:32,width:0.8,depth:2,height:2.1}],
    "A warm beam buys time. When it dies, keep your footsteps moving."),
  place("tavern","The Unattended Tavern","threat",48,10,
    [{id:"bar",x:-3.7,z:24,width:1.2,depth:12,height:1.25},
      {id:"partition",x:2,z:21,width:0.5,depth:6,height:2.7},
      {id:"table",x:3.5,z:32,width:1.3,depth:1.5,height:0.9}],
    "The footsteps can come around the partition. Listen before turning."),
  place("service-bend","The Linen Passage","investigation",24,6.4,
    [{id:"linen-rack",x:-2.4,z:12,width:0.8,depth:5,height:2.6}],
    "Beyond the linen the room sounds different."),
  place("flooded-laundry","The Drowned Washroom","threat",56,9.6,
    [{id:"washers",x:-3.7,z:25,width:1.2,depth:12,height:1.6},
      {id:"linen-screen",x:2,z:24,width:0.4,depth:8,height:2.5}],
    "Water carries a warning. The floor remains passable."),
  place("recovery-place","The Night Porter's Rest","recovery",32,7.2,
    [{id:"bench",x:-2.5,z:16,width:0.7,depth:3,height:0.7}],
    "Read what you survived. The onward passage stays open."),
]);

export const ENVIRONMENT_BY_ID = Object.freeze(Object.fromEntries(ENVIRONMENTS.map(place=>[place.id,place])));
export const SECTION_LENGTH = ENVIRONMENTS.reduce((sum,place)=>sum+place.length,0);

export function validateEnvironmentDefinitions():void {
  const ids=new Set<string>();
  for(const place of ENVIRONMENTS){
    if(ids.has(place.id))throw new Error(`Duplicate environment ${place.id}`);
    ids.add(place.id);
    if(place.length<=0||place.width<place.entrance.width||place.height<2.4)throw new Error(`Invalid bounds: ${place.id}`);
    for(const fixture of place.fixtures){
      if(Math.abs(fixture.x)+fixture.width/2>place.width/2||fixture.z-fixture.depth/2<0||fixture.z+fixture.depth/2>place.length)
        throw new Error(`Fixture outside ${place.id}: ${fixture.id}`);
      if(Math.abs(fixture.x)-fixture.width/2<1.5)throw new Error(`Fixture blocks main passage: ${fixture.id}`);
    }
  }
}

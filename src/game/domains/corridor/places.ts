import {createCorridorDefinition,DEFAULT_ROUTE_SEED,validateCorridorGrammar} from "../../../content/environments/definitions";
import type {Vec3} from "../../contracts";

export type PlaceInstance=Readonly<{id:string;definitionId:string;version:1;index:number;entryZ:number;exitZ:number;definition:import("../../../content/environments/definitions").EnvironmentDefinition}>;
export type PlacesSnapshot=Readonly<{schema:"horror-corridor.places/1";activeId:string;instances:readonly PlaceInstance[];inspected:readonly string[]}>;
export type PlaceNavigationGrid=Readonly<{
  width:number;
  height:number;
  cellSize:number;
  origin:Readonly<{x:number;z:number}>;
  cells:readonly Readonly<{x:number;y:number;walkable:boolean}>[];
}>;
export type PlaceInspection=Readonly<{id:string;fresh:boolean;text:string}>;

/**
 * Corridor's replaceable place-residency boundary. The implementation below
 * remains the authoritative runtime service; composition owns its creation.
 */
export type PlaceResidencyService=Readonly<{
  snapshot:()=>PlacesSnapshot;
  observe:(position:Vec3,threatPosition?:Vec3|null)=>void;
  current:()=>PlaceInstance;
  navigationGrid:(start:Vec3,goal:Vec3)=>PlaceNavigationGrid;
  threatEligible:()=>boolean;
  inspect:(position:Vec3)=>PlaceInspection|null;
  resolve:(position:Vec3,previous:Vec3)=>Vec3;
  reset:()=>void;
  load:(value:PlacesSnapshot)=>void;
}>;

export function instanceAt(index:number,routeSeed=DEFAULT_ROUTE_SEED):PlaceInstance {
  const safe=Math.max(0,Math.floor(index));
  const definition=createCorridorDefinition(routeSeed,safe);
  let entryZ=4;
  for(let prior=0;prior<safe;prior+=1)entryZ-=createCorridorDefinition(routeSeed,prior).length;
  return Object.freeze({id:`place-${safe}-${definition.id}`,definitionId:definition.id,version:1,index:safe,entryZ,exitZ:entryZ-definition.length,definition});
}

export function placeAt(z:number,routeSeed=DEFAULT_ROUTE_SEED):PlaceInstance {
  let depth=Math.max(0,4-z);
  let index=0;
  let entryZ=4;
  let definition=createCorridorDefinition(routeSeed,index);
  while(depth>=definition.length){
    depth-=definition.length;
    entryZ-=definition.length;
    index+=1;
    definition=createCorridorDefinition(routeSeed,index);
  }
  return Object.freeze({id:`place-${index}-${definition.id}`,definitionId:definition.id,version:1,index,entryZ,exitZ:entryZ-definition.length,definition});
}

/** Corridor owns residency and local discoveries. Definitions remain immutable. */
export function createPlaceResidency(routeSeed=DEFAULT_ROUTE_SEED):PlaceResidencyService{
  validateCorridorGrammar(routeSeed);
  let active=instanceAt(0,routeSeed);
  let inspected=new Set<string>();
  let retained:PlaceInstance[]=[];
  const observe=(position:Vec3,threatPosition?:Vec3|null)=>{
    active=placeAt(position.z,routeSeed);
    const indices=new Set([Math.max(0,active.index-1),active.index,active.index+1]);
    if(threatPosition)indices.add(placeAt(threatPosition.z,routeSeed).index);
    retained=[...indices].sort((a,b)=>a-b).map(index=>instanceAt(index,routeSeed));
  };
  observe({x:0,y:0,z:4});
  const snapshot=():PlacesSnapshot=>({schema:"horror-corridor.places/1",activeId:active.id,instances:retained.map(p=>({...p})),inspected:[...inspected].sort()});
  return Object.freeze({snapshot,observe,
    current:()=>active,
    navigationGrid(start:Vec3,goal:Vec3){
      const origin={x:-6,z:Math.floor(Math.min(start.z,goal.z)-4)};
      const width=24,cellSize=0.5,height=Math.min(160,Math.ceil((Math.max(start.z,goal.z)+4-origin.z)/cellSize));
      const cells=Array.from({length:width*height},(_,index)=>{
        const x=index%width,y=Math.floor(index/width);
        const px=origin.x+(x+0.5)*cellSize,pz=origin.z+(y+0.5)*cellSize;
        const place=placeAt(pz,routeSeed),definition=place.definition;
        const nearSeam=Math.min(Math.abs(pz-place.entryZ),Math.abs(pz-place.exitZ))<0.45;
        const halfWidth=nearSeam?definition.entrance.width/2:definition.width/2;
        const localZ=place.entryZ-pz;
        const walkable=pz<=4 && Math.abs(px)<halfWidth-0.3 && !definition.fixtures.some(f=>Math.abs(px-f.x)<f.width/2+0.3 && Math.abs(localZ-f.z)<f.depth/2+0.3);
        return {x,y,walkable};
      });
      return {width,height,cellSize,origin,cells};
    },
    threatEligible:()=>active.definition.role==="threat",
    inspect(position:Vec3){
      const place=placeAt(position.z,routeSeed);
      const targetZ=(place.entryZ+place.exitZ)/2;
      if(Math.abs(position.z-targetZ)>3)return null;
      const id=`${place.id}:clue`;
      const fresh=!inspected.has(id); inspected.add(id);
      return {id,fresh,text:place.definition.clue};
    },
    resolve(position:Vec3,previous:Vec3):Vec3 {
      const current=placeAt(position.z,routeSeed);const definition=current.definition;
      const radius=0.3;
      const crossing=placeAt(previous.z,routeSeed).id!==current.id;
      if(crossing && Math.abs(position.x)>definition.entrance.width/2-radius)return previous;
      const x=Math.max(-definition.width/2+radius,Math.min(definition.width/2-radius,position.x));
      const localZ=current.entryZ-position.z;
      const blocked=definition.fixtures.some(f=>Math.abs(x-f.x)<f.width/2+radius && Math.abs(localZ-f.z)<f.depth/2+radius);
      return blocked?previous:{x,y:position.y,z:Math.min(4,position.z)};
    },
    reset(){active=instanceAt(0,routeSeed);inspected=new Set();observe({x:0,y:0,z:4});},
    load(value:PlacesSnapshot){
      if(value.schema!=="horror-corridor.places/1")throw new Error("Unsupported places snapshot");
      for(const item of value.instances){
        if(JSON.stringify(instanceAt(item.index,routeSeed))!==JSON.stringify(item))throw new Error("Generated corridor definition drift");
      }
      const next=value.instances.find(p=>p.id===value.activeId);
      if(!next)throw new Error("Active environment missing");
      active={...next};retained=value.instances.map(p=>({...p}));inspected=new Set(value.inspected);
    },
  });
}

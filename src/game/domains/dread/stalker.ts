import type {Vec3} from "../../contracts";

export type StalkerSnapshot=Readonly<{position:Vec3|null;path:readonly Vec3[];nextQueryMs:number;lastKnown:Vec3|null;blocked:boolean}>;
export type NavigationQuery=(start:Vec3,goal:Vec3)=>readonly Vec3[];

/** Dread owns intention and movement state. Navigation only supplies a route. */
export function createSpatialStalker(navigate:NavigationQuery){
  let state:StalkerSnapshot={position:null,path:[],nextQueryMs:0,lastKnown:null,blocked:false};
  const snapshot=():StalkerSnapshot=>structuredClone(state);
  return Object.freeze({snapshot,
    spawn(player:Vec3){
      for(const x of [2.5,-2.5,0]){
        const candidate={x,y:0,z:player.z-12};
        const path=navigate(candidate,player);
        if(path.length){state={position:{...path[0]},path:[...path],nextQueryMs:750,lastKnown:{...player},blocked:false};return true;}
      }
      state={position:null,path:[],nextQueryMs:750,lastKnown:{...player},blocked:true};
      return false;
    },
    advance(player:Vec3,deltaMs:number,speed:number){
      if(!state.position)return null;
      let path=[...state.path];
      let query=state.nextQueryMs-deltaMs;
      if(query<=0){path=[...navigate(state.position,player)];query=750;}
      let budget=speed*deltaMs/1000;
      let position={...state.position};
      while(path.length && budget>0){
        const point=path[0];const distance=Math.hypot(point.x-position.x,point.z-position.z);
        if(distance<=budget){position={x:point.x,y:0,z:point.z};budget-=distance;path.shift();}
        else{position={x:position.x+(point.x-position.x)/distance*budget,y:0,z:position.z+(point.z-position.z)/distance*budget};budget=0;}
      }
      state={position,path,nextQueryMs:query,lastKnown:{...player},blocked:!path.length && Math.hypot(position.x-player.x,position.z-player.z)>1};
      return position;
    },
    reset(){state={position:null,path:[],nextQueryMs:0,lastKnown:null,blocked:false};},
    load(next:StalkerSnapshot){state=structuredClone(next);},
  });
}

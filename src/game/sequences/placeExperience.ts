export type ExperienceCheckpoint=Readonly<{schema:"horror-corridor.experience/1";placeId:string;events:readonly string[]}>;
type SequenceRuntime={
  validate:(node:unknown)=>{ok:boolean};mount:(node:unknown)=>unknown;start:(id:string)=>unknown;
  dispatch:(event:string)=>unknown;unmount:(id:string)=>unknown;
};

/** Checkpointed event coordination. It never applies rewards or modifies another domain. */
export function createPlaceExperience(getRuntime:()=>SequenceRuntime){
  let checkpoint:ExperienceCheckpoint|null=null;
  const event=(name:string)=>`${checkpoint?.placeId}:${name}`;
  const mount=(placeId:string)=>{
    const runtime=getRuntime();
    const node={id:`experience:${placeId}`,type:"flow",children:[
      {id:`${placeId}:before`,type:"waitForEvent",config:{event:`${placeId}:ready`}},
      {id:`${placeId}:during`,type:"waitForEvent",config:{event:`${placeId}:entered`}},
      {id:`${placeId}:after`,type:"waitForEvent",config:{event:`${placeId}:departed`}},
    ]};
    if(!runtime.validate(node).ok)throw new Error("Invalid place sequence");
    runtime.mount(node);runtime.start(node.id);
  };
  const accept=(name:string)=>{
    if(!checkpoint || checkpoint.events.includes(name))return;
    if(!["ready","entered","departed"].includes(name))throw new Error("Unknown place sequence event");
    const expected=["ready","entered","departed"][checkpoint.events.length];
    if(name!==expected)throw new Error("Place sequence event out of order");
    checkpoint={...checkpoint,events:[...checkpoint.events,name]};
    getRuntime().dispatch(event(name));
  };
  const reset=()=>{if(checkpoint)getRuntime().unmount(`experience:${checkpoint.placeId}`);checkpoint=null;};
  return Object.freeze({
    select(placeId:string){
      if(checkpoint?.placeId===placeId)return;
      if(checkpoint){accept("departed");reset();}
      checkpoint={schema:"horror-corridor.experience/1",placeId,events:[]};
      mount(placeId);accept("ready");accept("entered");
    },
    snapshot:()=>checkpoint?structuredClone(checkpoint):null,
    reset,
    load(next:ExperienceCheckpoint|null){
      if(next && next.schema!=="horror-corridor.experience/1")throw new Error("Unsupported experience checkpoint");
      reset();if(!next)return;
      checkpoint={schema:next.schema,placeId:next.placeId,events:[]};mount(next.placeId);
      for(const name of next.events)accept(name);
    },
  });
}

import { AmbientLight, Group, HemisphereLight } from "three";

export type CorridorLights = Readonly<{
  group: Group;
  update: (elapsedMs: number) => void;
}>;

export const createLights = (): CorridorLights => {
  const group = new Group();

  const ambient = new AmbientLight(0x625f55, 0.2);
  const hemisphere = new HemisphereLight(0x526056, 0x181510, 0.3);

  ambient.position.set(0, 2.5, 0);
  hemisphere.position.set(0, 3, 0);

  group.add(ambient);
  group.add(hemisphere);

  return {
    group,
    update: () => {},
  };
};

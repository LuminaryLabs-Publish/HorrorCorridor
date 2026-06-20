import { AmbientLight, Group, HemisphereLight } from "three";

export type CorridorLights = Readonly<{
  group: Group;
  update: (elapsedMs: number) => void;
}>;

export const createLights = (): CorridorLights => {
  const group = new Group();

  const ambient = new AmbientLight(0x766f63, 0.32);
  const hemisphere = new HemisphereLight(0x69705f, 0x1f1a14, 0.48);

  ambient.position.set(0, 2.5, 0);
  hemisphere.position.set(0, 3, 0);

  group.add(ambient);
  group.add(hemisphere);

  return {
    group,
    update: () => {},
  };
};

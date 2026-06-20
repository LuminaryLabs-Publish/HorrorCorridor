import { Color, FogExp2, Scene } from "three";

export const createScene = (): Scene => {
  const scene = new Scene();

  scene.background = new Color(0x0b0c0a);
  scene.fog = new FogExp2(0x0d0f0c, 0.0074);

  return scene;
};

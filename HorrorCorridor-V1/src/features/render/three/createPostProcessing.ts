import { Vector2, type PerspectiveCamera, type Scene, type WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export type CorridorPostProcessing = Readonly<{
  composer: EffectComposer;
  render: () => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  dispose: () => void;
}>;

export const createPostProcessing = (
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
): CorridorPostProcessing => {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new Vector2(1, 1), 0.08, 0.22, 0.94);
  const outputPass = new OutputPass();

  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  return {
    composer,
    render: () => {
      composer.render();
    },
    resize: (width: number, height: number, pixelRatio: number) => {
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);
      bloomPass.resolution.set(width * pixelRatio, height * pixelRatio);
    },
    dispose: () => {
      composer.dispose();
    },
  };
};

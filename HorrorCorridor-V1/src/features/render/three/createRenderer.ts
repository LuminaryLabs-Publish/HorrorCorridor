import {
  LinearToneMapping,
  SRGBColorSpace,
  type WebGLRenderer,
  WebGLRenderer as ThreeWebGLRenderer,
} from "three";

export type RendererSurface = Readonly<{
  pixelRatio: number;
  clearColor?: number;
}>;

const DEFAULT_PIXEL_RATIO = 1;

export const createRenderer = (surface?: RendererSurface): WebGLRenderer => {
  const renderer = new ThreeWebGLRenderer({
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = LinearToneMapping;
  renderer.toneMappingExposure = 2.24;
  renderer.setClearColor(surface?.clearColor ?? 0x090907, 1);
  renderer.setPixelRatio(surface?.pixelRatio ?? DEFAULT_PIXEL_RATIO);
  renderer.autoClear = true;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  return renderer;
};

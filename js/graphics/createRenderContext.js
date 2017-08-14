import initGL from "./initGL";
import initAntTweakBar from "./initAntTweakBar";

import initShaders from "./shaderPrograms/initShaders";

import {
  createColorCubeBuffer,
  createTerrainCubeBuffer,
  createWireFrameCubeBuffer
} from "./models";

export default (document, state) => {
  document.setTitle("cube with AntTweakBar");
  const canvas = document.createElement("cube-canvas");
  const gl = initGL(canvas);
  const ATB = document.AntTweakBar;
  const twbar = initAntTweakBar(ATB, canvas, state);
  const renderContext = {
    gl,
    ATB,
    programs: {
      basic: initShaders(gl)
    },
    models: {
      cube: createColorCubeBuffer(gl),
      wireframeCube: createWireFrameCubeBuffer(gl),
      terrain: createTerrainCubeBuffer(gl)
    },
    renderers: {
      terrain: () => {},
      cube: () => {}
    },
    perspectiveMatrix: null,
    cameraMatrix: null
  };
  return renderContext;
};

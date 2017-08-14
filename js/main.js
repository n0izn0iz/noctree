"use strict";
import WebGL from "node-webgl";
import tick from "./tick";
import initKeys from "./input/initInput";
import actions from "./actions";
import genTerrain from "./genTerrain";
import createRenderContext from "./graphics/createRenderContext";
import Vector3 from "./utils/Vector3";
import Octree from "./utils/Octree";

const bindStateToActions = (actions, state) =>
  Object.keys(actions).reduce(
    (result, key) =>
      Object.defineProperty(result, key, {
        value: arg => actions[key](arg, state)
      }),
    {}
  );

const inputState = {
  currentlyPressedKeys: {},
  mouseDelta: { x: 0, y: 0 },
  mouseClick: false
};

const main = () => {
  const document = WebGL.document();
  const state = {
    xSpeed: 5,
    ySpeed: -5,
    z: -5.0,
    xRot: 0,
    yRot: 0,
    fps: 0,
    lastTime: 0,
    octree: new Octree(),
    observer: {
      position: new Vector3(0, -5, 0),
      orientation: { phi: 0, theta: 0, up: { x: 0, y: 0, z: 1 } },
      eyesHeight: 1.65
    }
  };
  const renderContext = createRenderContext(document, state);
  initKeys(document, renderContext.gl, renderContext.ATB, inputState);
  actions.createCube({ x: 0, y: 0, z: 0 }, state);
  genTerrain(state.octree);
  tick(
    null,
    state,
    inputState,
    bindStateToActions(actions, state),
    renderContext,
    document.requestAnimationFrame
  );
};

main();

/*
WorldSpace
                ^ +y far
       up +z ^ /
             |/
left -x <____|___> +x right
            /|
           / v -z down
          v -y near
*/

"use strict";
import WebGL from "node-webgl";

import initGL from "./initGL";
import initShaders from "./initShaders";
import initBuffers from "./initBuffers";
import initWireframeCubeBuffer from "./initWireframeCubeBuffer";
import initAntTweakBar from "./initAntTweakBar";
import initKeys from "./initInput";
import tick from "./tick";
import Camera from "./Camera";
import Vector3 from "./Vector3";
import Octree from "./Octree";
import constants from "./constants";
import entityTypes from "./entityTypes";
import { degCircle, degHalfCircle, degQuarterCircle } from "./constants";
import geometry from "./glMatrix-0.9.5.min.js";
const vec3 = geometry.vec3;
import degToRad from "./degToRad";
import { getLookPoint, getLookVector } from "./getLookPoint";

console.log("entityTypes", entityTypes);

const document = WebGL.document();

document.setTitle("cube with AntTweakBar");

const ATB = document.AntTweakBar;

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
    orientation: { phi: 0, theta: 0, up: { x: 0, y: 0, z: 1 } }
  }
};

const speed = 0.02;

const actions = {
  createCube: (position, { octree, observer }) => {
    const placementDistance = 5;
    if (!position)
      position = getLookPoint(
        observer.position,
        observer.orientation.phi,
        observer.orientation.theta,
        placementDistance
      );
    const cube = { type: entityTypes.cube, position };
    try {
      octree.insertEntity(cube);
    } catch (error) {
      console.warn("Failed to insert", cube, ":", error);
    }
  },
  moveObserver: (controlVector, { observer }) => {
    controlVector = controlVector.multipliedByScalar(speed);
    const cameraPt = vec3.create([
      observer.position.x,
      observer.position.y,
      observer.position.z
    ]);
    const upVector = vec3.create([0, 0, 1]);
    // front/back just add look vector * xControl
    const lookVector = getLookVector(observer.orientation.phi, 0);
    let moveVector = new Vector3(lookVector[0], lookVector[1], lookVector[2]);
    moveVector = moveVector.multipliedByScalar(controlVector.y);
    // right/left find right vector then add it * yControl
    const rightVector = vec3.create();
    vec3.cross(lookVector, upVector, rightVector);
    vec3.normalize(rightVector);
    moveVector = moveVector.plus(
      new Vector3(
        rightVector[0],
        rightVector[1],
        rightVector[2]
      ).multipliedByScalar(controlVector.x)
    );
    // up/down just add the up vector * zControl
    moveVector = moveVector.plus(
      new Vector3(upVector[0], upVector[1], upVector[2]).multipliedByScalar(
        controlVector.z
      )
    );
    observer.position = observer.position.plus(moveVector);
  },
  orientObserver: ({ phi, theta }, { observer }) => {
    if (phi === 0 && theta === 0) return;
    observer.orientation.phi += phi; // vector2 is a screen coordinates delta in pixels where the origin is bottom-left
    observer.orientation.theta += theta; // TODO: dpi?
    while (observer.orientation.phi < -degHalfCircle)
      observer.orientation.phi += degCircle;
    while (observer.orientation.phi >= degHalfCircle)
      observer.orientation.phi -= degCircle;
    const margin = 0.0001;
    const bound = degQuarterCircle - margin;
    if (observer.orientation.theta >= bound) observer.orientation.theta = bound;
    else if (observer.orientation.theta <= -bound)
      observer.orientation.theta = -bound;
  }
};

const bindStateToActions = (actions, state) =>
  Object.keys(actions).reduce(
    (result, key) =>
      Object.defineProperty(result, key, {
        value: arg => actions[key](arg, state)
      }),
    {}
  );

const canvas = document.createElement("cube-canvas");
const gl = initGL(canvas);
const twbar = initAntTweakBar(ATB, canvas, state);

const inputState = {
  currentlyPressedKeys: {},
  mouseDelta: { x: 0, y: 0 },
  mouseClick: false
};

const renderContext = {
  gl,
  ATB,
  programs: {
    basic: initShaders(gl)
  },
  models: {
    cube: initBuffers(gl),
    wireframeCube: initWireframeCubeBuffer(gl)
  },
  renderers: {
    terrain: () => {},
    cube: () => {}
  },
  perspectiveMatrix: null,
  cameraMatrix: null
};

initKeys(document, renderContext.gl, renderContext.ATB, inputState);

const main = () =>
  tick(
    null,
    state,
    inputState,
    bindStateToActions(actions, state),
    renderContext,
    document.requestAnimationFrame
  );

const terrainBlock = {
  type: entityTypes.terrain,
  size: state.octree.size / 2,
  position: {
    x: -(state.octree.size / 4),
    y: -(state.octree.size / 4),
    z: -(state.octree.size / 4)
  }
};

console.log("terrainBlock", terrainBlock);

state.octree.insertEntity(terrainBlock);

actions.createCube({ x: 0, y: 0, z: 0 }, state);

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

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

const document = WebGL.document();

document.setTitle("cube with AntTweakBar");

const ATB = document.AntTweakBar;
const log = console.log;

const octree = new Octree();

import entityTypes from "./entityTypes";
console.log("entityTypes", entityTypes);

const terrainBlock = {
  type: entityTypes.terrain,
  size: octree.size / 2,
  position: {
    x: -(octree.size / 4),
    y: -(octree.size / 4),
    z: -(octree.size / 4)
  }
};

console.log("terrainBlock", terrainBlock);

octree.insertEntity(terrainBlock);

const createCube = ({ x, y, z }, octree) => {
  const cube = { type: entityTypes.cube, position: { x, y, z } };
  try {
    octree.insertEntity(cube);
  } catch (error) {
    console.warn("Failed to insert entity:", error);
  }
};

const boundedCreateCube = position => createCube(position, octree);

const vars = {
  xSpeed: 5,
  ySpeed: -5,
  z: -5.0,
  xRot: 0,
  yRot: 0,
  fps: 0,
  lastTime: 0
};

boundedCreateCube({ x: 0, y: 0, z: 0 });
const canvas = document.createElement("cube-canvas");
const gl = initGL(canvas, log);
const shaderProgram = initShaders(gl, log);
const twBar = initAntTweakBar(ATB, canvas, log, vars);
const camera = new Camera(new Vector3(0, -5, 0));
const inputState = {
  currentlyPressedKeys: {},
  mouseDelta: { x: 0, y: 0 },
  mouseClick: false
};
initKeys(document, gl, ATB, inputState);

const renderContext = {
  gl,
  ATB,
  camera,
  programs: {
    basic: shaderProgram
  },
  models: {
    cube: initBuffers(gl, log),
    wireframeCube: initWireframeCubeBuffer(gl, log)
  },
  renderers: {
    terrain: () => {},
    cube: () => {}
  }
};

gl.clearColor(255, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

tick(
  null,
  ATB,
  gl,
  shaderProgram,
  vars,
  document.requestAnimationFrame,
  camera,
  inputState,
  boundedCreateCube,
  octree,
  renderContext
);

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

//Read and eval library
const fs = require("fs");
eval(fs.readFileSync(__dirname + "/glMatrix-0.9.5.min.js", "utf8"));
const WebGL = require("node-webgl");
const initGL = require("./initGL");
const initShaders = require("./initShaders");
const initBuffers = require("./initBuffers");
const initWireframeCubeBuffer = require("./initWireframeCubeBuffer");
const initAntTweakBar = require("./initAntTweakBar");
const initKeys = require("./initInput");
const tick = require("./tick");
const Camera = require("./Camera");
const Vector3 = require("./Vector3");
const Octree = require("./Octree");

const document = WebGL.document();

document.setTitle("cube with AntTweakBar");

const ATB = document.AntTweakBar;
const log = console.log;

const octree = new Octree();

const entityTypes = ["terrain", "entity"].reduce((result, key, index) => {
  result[key] = index;
}, {});

console.log("entityTypes", entityTypes);

const terrainBlock = {
  type: "terrain",
  size: constants.worldSize / 2,
  position: {
    x: 0,
    y: 0,
    z: -(constants.worldSize / 4)
  }
};

console.log("terrainBlock", terrainBlock);

const createCube = ({ x, y, z }, octree) => {
  const cube = { type: "entity", position: { x, y, z } };
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

gl.clearColor(255, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

tick(
  null,
  ATB,
  gl,
  shaderProgram,
  initBuffers(gl, log),
  initWireframeCubeBuffer(gl, log),
  vars,
  document.requestAnimationFrame,
  camera,
  inputState,
  boundedCreateCube,
  octree
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

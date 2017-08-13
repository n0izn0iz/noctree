"use strict";
import { keys } from "./constants";
const speed = 0.02;
const mouseSpeed = 0.1;
import Vector3 from "./Vector3";

const convertVector = array => new Vector3(array[0], array[1], array[2]);

module.exports = (inputState, { camera, createCube }) => {
  if (inputState.currentlyPressedKeys[keys.move.forward]) {
    camera.move(convertVector([0, speed, 0]));
  }
  if (inputState.currentlyPressedKeys[keys.move.back]) {
    camera.move(convertVector([0, -speed, 0]));
  }
  if (inputState.currentlyPressedKeys[keys.move.right]) {
    camera.move(convertVector([speed, 0, 0]));
  }
  if (inputState.currentlyPressedKeys[keys.move.left]) {
    camera.move(convertVector([-speed, 0, 0]));
  }
  if (inputState.currentlyPressedKeys[keys.move.up]) {
    // Up cursor key
    camera.move(convertVector([0, 0, speed]));
  }
  if (inputState.currentlyPressedKeys[keys.move.down]) {
    // Down cursor key
    camera.move(convertVector([0, 0, -speed]));
  }
  //console.log("speed: "+xSpeed+" "+ySpeed+" "+z);
  if (inputState.mouseDelta.x !== 0 || inputState.mouseDelta.y !== 0) {
    camera.orient([
      inputState.mouseDelta.x * mouseSpeed,
      inputState.mouseDelta.y * mouseSpeed
    ]);
    inputState.mouseDelta.x = 0;
    inputState.mouseDelta.y = 0;
  }

  if (inputState.mouseClick) {
    createCube(camera.getLookPoint(5));
    inputState.mouseClick = false;
  }
};

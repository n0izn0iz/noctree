"use strict";
import { keys } from "../utils/constants";
const mouseSpeed = 0.1;
import Vector3 from "../utils/Vector3";
import getLookPoint from "../utils/getLookPoint";

const convertVector = array => new Vector3(array[0], array[1], array[2]);

const moveVectors = {
  forward: new Vector3(0, 1, 0),
  back: new Vector3(0, -1, 0),
  right: new Vector3(1, 0, 0),
  left: new Vector3(-1, 0, 0),
  up: new Vector3(0, 0, 1),
  down: new Vector3(0, 0, -1)
};

const handleKeys = (
  inputState,
  { createCube, moveObserver, orientObserver }
) => {
  const controlVector = Object.keys(keys.move)
    .reduce(
      (moveVector, key) =>
        inputState.currentlyPressedKeys[keys.move[key]]
          ? moveVector.plus(moveVectors[key])
          : moveVector,
      new Vector3()
    )
    .normalize();
  moveObserver(controlVector);

  if (inputState.mouseDelta.x !== 0 || inputState.mouseDelta.y !== 0) {
    orientObserver({
      phi: inputState.mouseDelta.x * mouseSpeed,
      theta: inputState.mouseDelta.y * mouseSpeed
    });
    inputState.mouseDelta.x = 0;
    inputState.mouseDelta.y = 0;
  }

  if (inputState.mouseClick) {
    createCube();
    inputState.mouseClick = false;
  }
};

export default handleKeys;

"use strict";

export const keys = {
  move: {
    forward: 87, //Z
    left: 65, //Q
    back: 83, //S
    right: 68, //D
    up: 32, //SPACE
    down: 340 //SHIFT
  }
};

export default {
  defaultSize: 128,
  maxEntitiesPerNode: 8,
  minSize: 2,
  keys
};

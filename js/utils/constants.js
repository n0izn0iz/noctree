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

export const degCircle = 360;
export const degHalfCircle = degCircle / 2;
export const degQuarterCircle = degHalfCircle / 2;

export default {
  defaultSize: 128,
  maxEntitiesPerNode: 7,
  minSize: 1,
  keys
};

"use strict";
import geometry from "./glMatrix-0.9.5.min.js";
const vec3 = geometry.vec3;
import degToRad from "./degToRad";
import { degQuarterCircle } from "./constants";

export const getLookVector = (phi, theta) => {
  const radPhi = degToRad(-phi - degQuarterCircle); // ISO phi is weird for me or this is because there is no up defined here
  const radTheta = degToRad(theta - degQuarterCircle); // ISO theta is a little less weird
  return vec3.create([
    Math.sin(radTheta) * Math.cos(radPhi),
    Math.sin(radTheta) * Math.sin(radPhi),
    theta === 0 ? 0 : Math.cos(radTheta)
  ]);
};

export const getLookPoint = (position, phi, theta, distance = 1) => {
  const lookVector = getLookVector(phi, theta);
  return {
    x: position.x + lookVector[0] * distance,
    y: position.y + lookVector[1] * distance,
    z: position.z + lookVector[2] * distance
  };
};

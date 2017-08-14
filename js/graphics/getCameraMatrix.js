"use strict";
import degToRad from "../utils/degToRad";
import geometry from "../utils/glMatrix-0.9.5.min.js";
/*
  +90 theta
   |
___|___ +90 phi
   0
*/

import { degCircle, degHalfCircle, degQuarterCircle } from "../utils/constants";

const vec3 = geometry.vec3;
const mat4 = geometry.mat4;

const getLookVector = (phi, theta) => {
  const radPhi = degToRad(-phi - degQuarterCircle); // ISO phi is weird for me or this is because there is no up defined here
  const radTheta = degToRad(theta - degQuarterCircle); // ISO theta is a little less weird
  return vec3.create([
    Math.sin(radTheta) * Math.cos(radPhi),
    Math.sin(radTheta) * Math.sin(radPhi),
    theta === 0 ? 0 : Math.cos(radTheta)
  ]);
};

export const getCameraMatrix = (position, { phi, theta, up }) => {
  const upPt = vec3.create([up.x, up.y, up.z]);
  const cameraPt = vec3.create([position.x, position.y, position.z]);
  const lookVector = getLookVector(phi, theta);
  const lookPt = vec3.create();
  vec3.add(cameraPt, lookVector, lookPt);
  return mat4.lookAt(cameraPt, lookPt, upPt);
};

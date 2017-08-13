"use strict";
/*
  +90 theta
   |
___|___ +90 phi
   0
*/

const degCircle = 360;
const degHalfCircle = degCircle / 2;
const degQuarterCircle = degHalfCircle / 2;
import degToRad from "./degToRad";
import Vector3 from "./Vector3";
import geometry from "./glMatrix-0.9.5.min.js";
const vec3 = geometry.vec3;
const mat4 = geometry.mat4;

const getLookVector = (phi, theta) => {
  const radPhi = degToRad(-phi - degQuarterCircle); // ISO phi is weird for me
  const radTheta = degToRad(theta - degQuarterCircle); // ISO theta is a little less weird
  return vec3.create([
    Math.sin(radTheta) * Math.cos(radPhi),
    Math.sin(radTheta) * Math.sin(radPhi),
    theta === 0 ? 0 : Math.cos(radTheta)
  ]);
};

class Camera {
  constructor(position) {
    this.position = position;
    this.phi = 0; // ISO spherical coordinates
    this.theta = 0;
  }

  getMatrix() {
    const upPt = vec3.create([0, 0, 1]);
    const cameraPt = vec3.create([
      this.position.x,
      this.position.y,
      this.position.z
    ]);
    const lookVector = getLookVector(this.phi, this.theta);
    const lookPt = vec3.create();
    vec3.add(cameraPt, lookVector, lookPt);
    return mat4.lookAt(cameraPt, lookPt, upPt);
  }

  getLookPoint(distance = 1) {
    const lookVector = getLookVector(this.phi, this.theta);
    return {
      x: this.position.x + lookVector[0] * distance,
      y: this.position.y + lookVector[1] * distance,
      z: this.position.z + lookVector[2] * distance
    };
  }

  move(controlVector) {
    const cameraPt = vec3.create([
      this.position.x,
      this.position.y,
      this.position.z
    ]);
    const upVector = vec3.create([0, 0, 1]);
    // front/back just add look vector * xControl
    const lookVector = getLookVector(this.phi, 0);
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
    this.position = this.position.plus(moveVector);
  }

  orient(vector2) {
    if (vector2[0] === 0 && vector2[1] === 0) return;
    this.phi += vector2[0]; // vector2 is a screen coordinates delta in pixels where the origin is bottom-left
    this.theta += vector2[1]; // TODO: dpi?
    while (this.phi < -degHalfCircle) this.phi += degCircle;
    while (this.phi >= degHalfCircle) this.phi -= degCircle;
    const margin = 0.0001;
    const bound = degQuarterCircle - margin;
    if (this.theta >= bound) this.theta = bound;
    else if (this.theta <= -bound) this.theta = -bound;
  }
}

module.exports = Camera;

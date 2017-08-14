"use strict";
import entityTypes from "../utils/entityTypes";
const speed = 0.02;
import geometry from "../utils/glMatrix-0.9.5.min.js";
const vec3 = geometry.vec3;
import { getLookPoint, getLookVector } from "../utils/getLookPoint";
import Vector3 from "../utils/Vector3";
import { degCircle, degHalfCircle, degQuarterCircle } from "../utils/constants";

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
    if (observer.position.z < observer.eyesHeight)
      observer.position.z = observer.eyesHeight;
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

export default actions;

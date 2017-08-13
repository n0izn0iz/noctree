"use strict";
const drawCube = require("./drawCube");
const drawOctree = require("./drawOctree");
const geometry = require("./glMatrix-0.9.5.min.js");
const mat4 = geometry.mat4;

module.exports = (
  gl,
  shaderProgram,
  cube,
  wireframeCube,
  { xRot, yRot, z },
  camera,
  octree
) => {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const perspectiveMatrix = mat4.create();

  mat4.perspective(
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    100.0,
    perspectiveMatrix
  );

  const camMatrix = camera.getMatrix();

  octree.forEachEntity(({ position }) =>
    drawCube(
      position,
      xRot,
      yRot,
      gl,
      shaderProgram,
      cube,
      perspectiveMatrix,
      camMatrix
    )
  );

  drawOctree(
    octree,
    wireframeCube,
    gl,
    shaderProgram,
    perspectiveMatrix,
    camMatrix
  );

  // cleanup GL state
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

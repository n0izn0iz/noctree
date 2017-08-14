"use strict";
import geometry from "../../utils/glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import drawModel from "./drawModel";

export default (
  terrain,
  { gl, programs, models, perspectiveMatrix, cameraMatrix }
) => {
  const worldMatrix = mat4.create();
  const cubeModelSize = 1;

  mat4.identity(worldMatrix);

  mat4.translate(worldMatrix, [
    terrain.position.x,
    terrain.position.y,
    terrain.position.z
  ]);

  const scaleSize = terrain.size / cubeModelSize;
  mat4.scale(worldMatrix, [scaleSize, scaleSize, scaleSize]);

  gl.disable(gl.BLEND);
  gl.enable(gl.DEPTH_TEST);

  drawModel(gl, models.terrain, programs.basic, gl.TRIANGLES, {
    perspectiveMatrix,
    cameraMatrix,
    worldMatrix
  });
};

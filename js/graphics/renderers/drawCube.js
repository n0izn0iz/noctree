"use strict";
import geometry from "../../utils/glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import degToRad from "../../utils/degToRad";
import drawModel from "./drawModel";

export default (
  { position },
  { gl, programs, models, cameraMatrix, perspectiveMatrix },
  { xRot, yRot }
) => {
  const worldMatrix = mat4.create();
  mat4.identity(worldMatrix);
  mat4.translate(worldMatrix, [position.x, position.y, position.z]);
  mat4.rotate(worldMatrix, degToRad(xRot), [1, 0, 0]);
  mat4.rotate(worldMatrix, degToRad(yRot), [0, 1, 0]);

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  drawModel(gl, models.cube, programs.basic, gl.TRIANGLES, {
    perspectiveMatrix,
    cameraMatrix,
    worldMatrix
  });
};

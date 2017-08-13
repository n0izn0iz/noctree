"use strict";
import geometry from "./glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import degToRad from "./degToRad";
import setMatrixUniforms from "./setMatrixUniforms";

export default (
  { position },
  { gl, programs, models, cameraMatrix, perspectiveMatrix },
  { xRot, yRot }
) => {
  const worldMatrix = mat4.create();
  const shaderProgram = programs.basic;
  const cube = models.cube;

  mat4.identity(worldMatrix);

  mat4.translate(worldMatrix, [position.x, position.y, position.z]);

  mat4.rotate(worldMatrix, degToRad(xRot), [1, 0, 0]);
  mat4.rotate(worldMatrix, degToRad(yRot), [0, 1, 0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    cube.vertexPositionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  gl.bindBuffer(gl.ARRAY_BUFFER, cube.verticesColorBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexColorAttribute,
    4,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndexBuffer);

  setMatrixUniforms(
    gl,
    shaderProgram,
    perspectiveMatrix,
    cameraMatrix,
    worldMatrix
  );

  gl.drawElements(
    gl.TRIANGLES,
    cube.vertexIndexBuffer.numItems,
    gl.UNSIGNED_SHORT,
    0
  );
};

"use strict";
export default (
  gl,
  shaderProgram,
  perspectiveMatrix,
  camMatrix,
  worldMatrix
) => {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, perspectiveMatrix);
  let error = gl.getError();
  if (error !== 0)
    throw "Error occured " +
      gl.viewportWidth +
      ", " +
      gl.viewportHeight +
      ": " +
      error;
  gl.uniformMatrix4fv(shaderProgram.camMatrixUniform, false, camMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, worldMatrix);
};

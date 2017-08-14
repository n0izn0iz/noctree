"use strict";
import setMatrixUniforms from "../setMatrixUniforms";

export default (
  gl,
  model,
  program,
  drawType,
  { perspectiveMatrix, cameraMatrix, worldMatrix }
) => {
  const shaderProgram = program;

  // vertices are mandatory
  gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexPositionBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    model.vertexPositionBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  if ("vertexColorBuffer" in model) {
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexColorBuffer);
    gl.vertexAttribPointer(
      shaderProgram.vertexColorAttribute,
      4,
      gl.FLOAT,
      false,
      0,
      0
    );
  }

  setMatrixUniforms(gl, program, perspectiveMatrix, cameraMatrix, worldMatrix);

  if ("vertexIndexBuffer" in model) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.vertexIndexBuffer);
    gl.drawElements(
      drawType,
      model.vertexIndexBuffer.numItems,
      gl.UNSIGNED_SHORT,
      0
    );
  } else {
    throw "Rendering without indices is unimplemented";
  }
};

"use strict";
import setMatrixUniforms from "./setMatrixUniforms";
import geometry from "./glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;

export default (
  octree,
  cube,
  gl,
  shaderProgram,
  perspectiveMatrix,
  camMatrix
) => {
  octree.forEachNode(node => {
    if (node.isLeaf() && (!node.entities || node.entities.length <= 0)) return;
    const worldMatrix = mat4.create();
    const cubeModelSize = 2;

    mat4.identity(worldMatrix);

    mat4.translate(worldMatrix, [
      node.position.x,
      node.position.y,
      node.position.z
    ]);

    const scaleSize = node.size / cubeModelSize;
    mat4.scale(worldMatrix, [scaleSize, scaleSize, scaleSize]);

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
      camMatrix,
      worldMatrix
    );

    gl.drawElements(
      gl.LINES,
      cube.vertexIndexBuffer.numItems,
      gl.UNSIGNED_SHORT,
      0
    );
  });
};

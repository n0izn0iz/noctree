"use strict";
import geometry from "../../utils/glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import drawModel from "./drawModel";

export default (
  octree,
  { gl, models, programs, cameraMatrix, perspectiveMatrix }
) => {
  octree.forEachNode(node => {
    if (node.isLeaf() && (!node.entities || node.entities.length <= 0)) return;
    const worldMatrix = mat4.create();
    const cubeModelSize = 1;

    mat4.identity(worldMatrix);

    mat4.translate(worldMatrix, [
      node.position.x,
      node.position.y,
      node.position.z
    ]);

    const scaleSize = node.size / cubeModelSize;
    mat4.scale(worldMatrix, [scaleSize, scaleSize, scaleSize]);

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);

    drawModel(gl, models.wireframeCube, programs.basic, gl.LINES, {
      perspectiveMatrix,
      cameraMatrix,
      worldMatrix
    });
  });
};

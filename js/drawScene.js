"use strict";
import drawCube from "./drawCube";
import drawOctree from "./drawOctree";
import geometry from "./glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import entityTypes from "./entityTypes";
import drawTerrainBlock from "./drawTerrainBlock";

const renderers = {
  [entityTypes.terrain]: (
    terrain,
    xRot,
    yRot,
    gl,
    shaderProgram,
    cube,
    wireframeCube,
    perspectiveMatrix,
    camMatrix
  ) =>
    drawTerrainBlock(
      terrain,
      wireframeCube,
      gl,
      shaderProgram,
      perspectiveMatrix,
      camMatrix
    ),
  [entityTypes.cube]: (
    entity,
    xRot,
    yRot,
    gl,
    shaderProgram,
    cube,
    wireframeCube,
    perspectiveMatrix,
    camMatrix
  ) =>
    drawCube(
      entity.position,
      xRot,
      yRot,
      gl,
      shaderProgram,
      cube,
      perspectiveMatrix,
      camMatrix
    )
};

export default ({ xRot, yRot, z }, octree, renderContext) => {
  const gl = renderContext.gl;
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

  const camMatrix = renderContext.camera.getMatrix();

  octree.forEachEntity(entity =>
    renderers[entity.type](
      entity,
      xRot,
      yRot,
      gl,
      renderContext.programs.basic,
      renderContext.models.cube,
      renderContext.models.wireframeCube,
      perspectiveMatrix,
      camMatrix
    )
  );

  drawOctree(
    octree,
    renderContext.models.wireframeCube,
    gl,
    renderContext.programs.basic,
    perspectiveMatrix,
    camMatrix
  );

  // cleanup GL state
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

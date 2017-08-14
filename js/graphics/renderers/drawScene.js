"use strict";
import drawCube from "./drawCube";
import drawOctree from "./drawOctree";
import geometry from "../../utils/glMatrix-0.9.5.min.js";
const mat4 = geometry.mat4;
import entityTypes from "../../utils/entityTypes";
import drawTerrainBlock from "./drawTerrainBlock";
import { getCameraMatrix } from "../getCameraMatrix";

const renderers = {
  [entityTypes.terrain]: drawTerrainBlock,
  [entityTypes.cube]: drawCube
};

export default (state, renderContext) => {
  const gl = renderContext.gl;
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  renderContext.perspectiveMatrix = mat4.create();
  renderContext.cameraMatrix = getCameraMatrix(
    state.observer.position,
    state.observer.orientation
  );

  mat4.perspective(
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    1000.0,
    renderContext.perspectiveMatrix
  );

  state.octree.forEachEntity(entity =>
    renderers[entity.type](entity, renderContext, state)
  );

  drawOctree(state.octree, renderContext);

  // cleanup GL state
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

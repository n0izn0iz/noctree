const drawCube = require("./drawCube");
const drawOctree = require("./drawOctree");

//Read and eval library
fs = require("fs");
eval(fs.readFileSync(__dirname + "/glMatrix-0.9.5.min.js", "utf8"));

module.exports = (
  gl,
  shaderProgram,
  cube,
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

  drawOctree(octree, cube, gl, shaderProgram, perspectiveMatrix, camMatrix);

  // cleanup GL state
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

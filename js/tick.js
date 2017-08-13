"use strict";
const drawScene = require("./drawScene");
const handleKeys = require("./handleKeys");

const animate = (timeNow, vars) => {
  if (!timeNow) return; // first time, timeNow may be undefined

  if (vars.lastTime != 0) {
    var elapsed = timeNow - vars.lastTime;
    vars.fps = Math.round(1000 / elapsed);

    vars.xRot += vars.xSpeed * elapsed / 1000.0;
    vars.yRot += vars.ySpeed * elapsed / 1000.0;
  }
  vars.lastTime = timeNow;
};

/* Before calling AntTweakBar or any other library that could use programs,
 * one must make sure to disable the VertexAttribArray used by the current
 * program otherwise this may have some unpredictable consequences aka
 * wrong vertex attrib arrays being used by another program!
 */
const enableProgram = (gl, shaderProgram) => {
  gl.useProgram(shaderProgram);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
};

const disableProgram = (gl, shaderProgram) => {
  gl.disableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
  gl.useProgram(null);
};

const drawATB = (ATB, gl, shaderProgram) => {
  disableProgram(gl, shaderProgram);
  ATB.Draw();
  enableProgram(gl, shaderProgram);
};

const tick = (
  timeNow,
  ATB,
  gl,
  shaderProgram,
  cube,
  wireframeCube,
  vars,
  requestAnimationFrame,
  camera,
  inputState,
  createCube,
  octree
) => {
  drawScene(gl, shaderProgram, cube, wireframeCube, vars, camera, octree);
  animate(timeNow, vars);

  drawATB(ATB, gl, shaderProgram);

  gl.finish(); // for timing

  handleKeys(inputState, { camera, createCube });

  requestAnimationFrame(
    timeNow =>
      tick(
        timeNow,
        ATB,
        gl,
        shaderProgram,
        cube,
        wireframeCube,
        vars,
        requestAnimationFrame,
        camera,
        inputState,
        createCube,
        octree
      ),
    0
  );
};

module.exports = tick;

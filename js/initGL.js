"use strict";
module.exports = (canvas, log) => {
  let gl;

  log("init WebGL");
  gl = canvas.getContext("experimental-webgl");
  gl.viewportWidth = canvas.width;
  gl.viewportHeight = canvas.height;
  gl.disable(gl.CULL_FACE);
  return gl;
};

"use strict";
export default canvas => {
  let gl;

  console.log("init WebGL");
  gl = canvas.getContext("experimental-webgl");
  gl.viewportWidth = canvas.width;
  gl.viewportHeight = canvas.height;
  gl.disable(gl.CULL_FACE);
  gl.clearColor(0, 191, 255, 1);
  gl.enable(gl.DEPTH_TEST);
  return gl;
};

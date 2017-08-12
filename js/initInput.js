const GLFW = require("node-glfw");

module.exports = (document, gl, ATB, inputState) => {
  let firtTime = true;
  document.on("resize", function(evt) {
    gl.viewportWidth = evt.width;
    gl.viewportHeight = evt.height;

    // make sure AntTweakBar is repositioned correctly and events correct
    ATB.WindowSize(evt.width, evt.height);
  });

  document.on("keydown", function(evt) {
    inputState.currentlyPressedKeys[evt.which] = true;
  });

  document.on("keyup", function(evt) {
    inputState.currentlyPressedKeys[evt.which] = false;
  });

  document.on("mousemove", function(evt) {
    const mouseCenter = {
      x: gl.viewportWidth / 2,
      y: gl.viewportHeight / 2
    };
    if (firtTime) firtTime = false;
    else {
      inputState.mouseDelta.x = evt.x - mouseCenter.x;
      inputState.mouseDelta.y = mouseCenter.y - evt.y;
    }
    GLFW.SetCursorPos(GLFW.GetCurrentContext(), mouseCenter.x, mouseCenter.y);
  });

  document.on("mousedown", function(evt) {
    inputState.mouseClick = true;
  });
};
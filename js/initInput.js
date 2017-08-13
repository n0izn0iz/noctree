"use strict";
const GLFW = require("node-glfw");

module.exports = (document, gl, ATB, inputState) => {
  let firtTime = true;
  const eventHandlers = {
    resize: evt => {
      gl.viewportWidth = evt.width;
      gl.viewportHeight = evt.height;

      // make sure AntTweakBar is repositioned correctly and events correct
      ATB.WindowSize(evt.width, evt.height);
    },
    keydown: evt => (inputState.currentlyPressedKeys[evt.which] = true),
    keyup: evt => (inputState.currentlyPressedKeys[evt.which] = false),
    mousemove: evt => {
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
    },
    mousedown: () => (inputState.mouseClick = true)
  };
  Object.keys(eventHandlers).forEach(key =>
    document.on(key, eventHandlers[key])
  );
};

"use strict";
import drawScene from "./graphics/renderers/drawScene";
import handleKeys from "./input/handleKeys";

const animate = (timeNow, state) => {
  if (!timeNow) return; // first time, timeNow may be undefined

  if (state.lastTime != 0) {
    var elapsed = timeNow - state.lastTime;
    state.fps = Math.round(1000 / elapsed);

    state.xRot += state.xSpeed * elapsed / 1000.0;
    state.yRot += state.ySpeed * elapsed / 1000.0;
  }
  state.lastTime = timeNow;
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

const drawATB = ({ ATB, gl, programs }) => {
  disableProgram(gl, programs.basic);
  ATB.Draw();
  enableProgram(gl, programs.basic);
};

const render = (state, timeNow, renderContext) => {
  drawScene(state, renderContext);
  drawATB(renderContext);
  renderContext.gl.finish(); // for timing
};

const tick = (
  timeNow,
  state,
  inputState,
  actions,
  renderContext,
  requestAnimationFrame
) => {
  render(state, timeNow, renderContext);
  handleKeys(inputState, actions);
  animate(timeNow, state);

  requestAnimationFrame(
    timeNow =>
      tick(
        timeNow,
        state,
        inputState,
        actions,
        renderContext,
        requestAnimationFrame
      ),
    0
  );
};

export default tick;

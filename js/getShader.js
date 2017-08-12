const fs = require("fs");

var shaders = {
  "shader-fs": fs.readFileSync(__dirname + "/../shaders/basic.frag").toString(),
  "shader-vs": fs.readFileSync(__dirname + "/../shaders/basic.vert").toString()
};

module.exports = (gl, id) => {
  if (!shaders.hasOwnProperty(id)) return null;

  let shader;
  let str = shaders[id];

  if (id.match(/-fs/)) {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (id.match(/-vs/)) {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
};

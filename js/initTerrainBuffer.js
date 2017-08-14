"use strict";
import { vertices, vertexNormals, vertexIndices } from "./cube";
export default gl => {
  const cube = {};
  console.log("init GL buffers");
  cube.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  cube.vertexPositionBuffer.itemSize = 3;
  cube.vertexPositionBuffer.numItems = 24;
  cube.vertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cube.vertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexNormals),
    gl.STATIC_DRAW
  );
  cube.vertexNormalBuffer.itemSize = 3;
  cube.vertexNormalBuffer.numItems = 24;

  var colors = [
    [1.0, 1.0, 1.0, 0.5], // Front face: white
    [1.0, 0.0, 0.0, 0.5], // Back face: red
    [0.0, 1.0, 0.0, 0.5], // Top face: green
    [0.0, 0.0, 1.0, 0.5], // Bottom face: blue
    [1.0, 1.0, 0.0, 0.5], // Right face: yellow
    [1.0, 0.0, 1.0, 0.5] // Left face: purple
  ];

  let generatedColors = [];

  for (let j = 0; j < 6; j++) {
    const c = colors[j];

    for (let i = 0; i < 4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }

  cube.verticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cube.verticesColorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(generatedColors),
    gl.STATIC_DRAW
  );

  cube.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.vertexIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(vertexIndices),
    gl.STATIC_DRAW
  );
  cube.vertexIndexBuffer.itemSize = 1;
  cube.vertexIndexBuffer.numItems = 36;

  console.log(gl.getError());
  return cube;
};

"use strict";
import {
  createVertexIndexBuffer,
  createVertexPositionBuffer,
  createVertexNormalBuffer,
  createVertexColorBuffer
} from "./createBuffers";

import {
  vertices,
  vertexNormals,
  vertexIndices,
  wireframeVertexIndices,
  generateColors
} from "./cube";

class Model {
  constructor(gl, { vertices, colors, normals, indices }) {
    if (!vertices) throw new TypeError("Needs at least a vertices array");
    this.vertexPositionBuffer = createVertexPositionBuffer(gl, vertices);
    if (colors) this.vertexColorBuffer = createVertexColorBuffer(gl, colors);
    if (normals)
      this.vertexNormalBuffer = createVertexNormalBuffer(gl, normals);
    if (indices) this.vertexIndexBuffer = createVertexIndexBuffer(gl, indices);
  }
}

const createCubeBuffer = (gl, colors, indices) =>
  new Model(gl, { vertices, colors: generateColors(colors), indices });

const brown = [87.0 / 255.0, 59.0 / 255.0, 12.0 / 255.0, 1.0];
const green = [45.0 / 255.0, 208.0 / 255.0, 11.0 / 255.0, 1.0];

export const createTerrainCubeBuffer = gl =>
  createCubeBuffer(
    gl,
    [
      green, // Top face: green
      brown,
      brown,
      brown,
      brown,
      brown
    ],
    vertexIndices
  );

export const createWireFrameCubeBuffer = gl =>
  createCubeBuffer(gl, [1.0, 1.0, 1.0, 1.0], wireframeVertexIndices);

export const createColorCubeBuffer = gl =>
  createCubeBuffer(
    gl,
    [
      [1.0, 1.0, 1.0, 0.5], // Front face: white (actually top)
      [1.0, 0.0, 0.0, 0.5], // Back face: red
      [0.0, 1.0, 0.0, 0.5], // Top face: green
      [0.0, 0.0, 1.0, 0.5], // Bottom face: blue
      [1.0, 1.0, 0.0, 0.5], // Right face: yellow
      [1.0, 0.0, 1.0, 0.5] // Left face: purple
    ],
    vertexIndices
  );

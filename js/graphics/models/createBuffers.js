"use strict";
const createGLBuffer = (gl, array, itemSize, bindType, ArrayType) => {
  const gLBuffer = gl.createBuffer();
  gl.bindBuffer(bindType, gLBuffer);
  gl.bufferData(bindType, new ArrayType(array), gl.STATIC_DRAW);
  gLBuffer.itemSize = itemSize;
  gLBuffer.numItems = array.length / itemSize;
  return gLBuffer;
};

export const createVertexIndexBuffer = (gl, indices, itemSize = 1) =>
  createGLBuffer(gl, indices, itemSize, gl.ELEMENT_ARRAY_BUFFER, Uint16Array);

const createFloat32Buffer = (gl, array, itemSize) =>
  createGLBuffer(gl, array, itemSize, gl.ARRAY_BUFFER, Float32Array);

export const createVertexPositionBuffer = (gl, vertices, itemSize = 3) =>
  createFloat32Buffer(gl, vertices, itemSize);

export const createVertexNormalBuffer = (gl, normals, itemSize = 3) =>
  createFloat32Buffer(gl, normals, itemSize);

export const createVertexColorBuffer = (gl, colors, itemSize = 4) =>
  createFloat32Buffer(gl, colors, itemSize);

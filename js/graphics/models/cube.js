/*
-1,1,1__________1,1,1
3               2
|       top     |
-1,-1,1_________1,-1,1
0               1
|               |
-1,1,-1_________1,1,-1
5               6
|    bottom     |
-1,-1,-1________1,-1,-1
4               7
*/

export const vertices = [
  // Front face
  -1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,

  // Back face
  -1.0,
  -1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  -1.0,
  -1.0,

  // Top face
  -1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  -1.0,

  // Bottom face
  -1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,

  // Right face
  1.0,
  -1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  -1.0,
  1.0,

  // Left face
  -1.0,
  -1.0,
  -1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  -1.0
].map(value => value / 2);

export const vertexNormals = [
  // Front face
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,

  // Back face
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,

  // Top face
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,

  // Bottom face
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,

  // Right face
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,

  // Left face
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0,
  -1.0,
  0.0,
  0.0
];

export const vertexIndices = [
  0,
  1,
  2,
  0,
  2,
  3, // Front face
  4,
  5,
  6,
  4,
  6,
  7, // Back face
  8,
  9,
  10,
  8,
  10,
  11, // Top face
  12,
  13,
  14,
  12,
  14,
  15, // Bottom face
  16,
  17,
  18,
  16,
  18,
  19, // Right face
  20,
  21,
  22,
  20,
  22,
  23 // Left face
];

export const wireframeVertexIndices = [
  0,
  1,

  1,
  2,

  2,
  3,

  3,
  0,

  4,
  5,

  5,
  6,

  6,
  7,

  7,
  4,

  0,
  4,

  1,
  7,

  2,
  6,

  3,
  5
];

const numberOfFaces = 6;
const compPerColor = 4;

export const generateColors = colors => {
  if (!(colors instanceof Array))
    throw new TypeError("colors should be an array");
  if (colors.length === 0) throw new TypeError("colors should not be empty");
  if (!(colors[0] instanceof Array)) {
    const color = colors;
    colors = [];
    for (let i = 0; i < numberOfFaces; i++) colors.push(color);
  }
  if (colors.length !== 6)
    throw new TypeError("colors should be and array of 6 colors or a color");
  let generatedColors = [];
  for (let j = 0; j < 6; j++) {
    const c = colors[j];
    for (let i = 0; i < 4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }
  return generatedColors;
};

attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uCamMatrix;

varying vec4 vColor;

void main(void) {
  vec4 worldPos = uMVMatrix * vec4(aVertexPosition, 1.0);
  vec4 cameraPos = uCamMatrix * worldPos;
  gl_Position = uPMatrix * cameraPos;
  vColor = aVertexColor;
}

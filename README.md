Dependencies

NodeJS While v0.6.5+ work in many cases, some missing features for typed arrays are only available in v0.7.x. So we recommend at least v0.7.5.

GLEW (http://glew.sourceforge.net/) GLEW is used to find OpenGL extensions in a cross-platform manner.

GLFW (http://www.glfw.org/) GLFW is a simple multi-platform framework for opening a window, creating an OpenGL context, and managing input.

AntTweakBar (http://www.antisphere.com/Wiki/tools:anttweakbar) AntTweakBar allows programmers to quickly add a light and intuitive graphical user interface into graphic applications to interactively tweak parameters on-screen.

All of these libraries are cross-platform. node-glfw provides a Javascript wrapper to access native methods in GLFW and AntTweakBar. See example of usage in node-webgl/test/cube.js.

Once dependent libraries are installed, do

`npm run install_node_glfw`

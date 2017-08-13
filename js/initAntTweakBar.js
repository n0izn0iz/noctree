"use strict";
import degToRad from "./degToRad";

export default (ATB, canvas, log, vars) => {
  log("init AntTweakBar");

  ATB.Init();
  ATB.Define(
    " GLOBAL help='This example shows how to integrate AntTweakBar with GLFW and OpenGL.' "
  ); // Message added to the help bar.
  ATB.WindowSize(canvas.width, canvas.height);

  const twBar = ATB.NewBar("Cube");
  twBar.AddVar(
    "z",
    ATB.TYPE_FLOAT,
    {
      getter: function(data) {
        return vars.z;
      },
      setter: function(val, data) {
        vars.z = val;
      }
    },
    " label='z' min=-5 max=5 step=0.1 keyIncr=s keyDecr=S help='Eye distance' "
  );

  twBar.AddVar(
    "Orientation",
    ATB.TYPE_QUAT4F,
    {
      getter: function(data) {
        let a = degToRad(vars.xRot) * 0.5,
          b = degToRad(vars.yRot) * 0.5;
        let x1 = Math.sin(a),
          y1 = 0,
          z1 = 0,
          w1 = Math.cos(a);
        let x2 = 0,
          y2 = Math.sin(b),
          z2 = 0,
          w2 = Math.cos(b);
        return [
          w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
          w1 * y2 + y1 * w2 + z1 * x2 - x1 * z2,
          w1 * z2 + z1 * w2 + x1 * y2 - y1 * x2,
          w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2
        ];
      }
    },
    " label=Orientation opened=true group=Rotation help='Orientation (degree)' "
  );

  // twBar.AddVar("yRot", ATB.TYPE_FLOAT, {
  //   getter: function(data){ return yRot; },
  // },
  // " label='yRot' precision=1 group=Rotation help='y rot (degree)' ");

  twBar.AddVar(
    "xSpeed",
    ATB.TYPE_FLOAT,
    {
      getter: function(data) {
        return vars.xSpeed;
      },
      setter: function(val, data) {
        vars.xSpeed = val;
      }
    },
    " label='xSpeed' group=Rotation help='x speed' "
  );

  twBar.AddVar(
    "ySpeed",
    ATB.TYPE_FLOAT,
    {
      getter: function(data) {
        return vars.ySpeed;
      },
      setter: function(val, data) {
        vars.ySpeed = val;
      }
    },
    " label='ySpeed' group=Rotation help='y speed' "
  );

  twBar.AddSeparator("misc");
  twBar.AddVar(
    "fps",
    ATB.TYPE_INT32,
    {
      getter: function(data) {
        return vars.fps;
      }
    },
    " label='fps' help='frames per second' "
  );

  //twBar.AddButton("toto",speedup,"dummy value"," label='misc' ");

  return twBar;
};

"use strict";
class Vector3 {
  constructor(x, y, z) {
    if (typeof x === "object") {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
    } else if (typeof x === "array") {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
    } else if (typeof x === "number") {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
  }

  plus({ x, y, z }) {
    return new Vector3(this.x + x, this.y + y, this.z + z);
  }

  minus({ x, y, z }) {
    return new Vector3(this.x - x, this.y - y, this.z - z);
  }

  multipliedBy({ x, y, z }) {
    return new Vector3(this.x * x, this.y * y, this.z * z);
  }

  multipliedByScalar(scalar) {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  dividedByScalar(scalar) {
    return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
  }

  dividedBy({ x, y, z }) {
    return new Vector3(this.x / x, this.y / y, this.z / z);
  }

  invert() {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  /*toString() {
    return "Vector3{x: " + this.x + ",y: " + this.y + ",z: " + this.z + "}";
  }*/
}

export default Vector3;

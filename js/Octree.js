"use strict";
const constants = require("./constants");
const Vector3 = require("./Vector3");

/*
Octree space
        z+ ___________ +0.5
        ^ / |tnw y+  /| tne
        |/  |   ^   / |
        /______/___/  |
        |tsw| /   tse |
        |   |/_.0__|__|
        |  / bnw   |  / bne
        | /        | /
x- <____|/_________|/ ____> x+
        -0.5 bsw     bse
      / |
     /  |
    v   v
   y-   z-
*/

const east = new Vector3({ x: 1 });
const west = east.invert();
const north = new Vector3({ y: 1 });
const south = north.invert();
const top = new Vector3({ z: 1 });
const bottom = top.invert();

const cardinalVectors = {
  east,
  north,
  top
};

Object.keys(cardinalVectors).forEach(key => {
  console.log("cardVec", key, cardinalVectors[key]);
});

const numDimensions = 3;

const octo = 8;

const directionVectors = [
  bottom.plus(south).plus(west),
  bottom.plus(south).plus(east),
  bottom.plus(north).plus(west),
  bottom.plus(north).plus(east),
  top.plus(south).plus(west),
  top.plus(south).plus(east),
  top.plus(north).plus(west),
  top.plus(north).plus(east)
];

const directionStrings = [
  "bottomSouthWest",
  "bottomSouthEast",
  "bottomNorthWest",
  "bottomNorthEast",
  "topSouthWest",
  "topSouthEast",
  "topNorthWest",
  "topNorthEast"
];

directionVectors.forEach((vector, index) => {
  console.log("dirVec", directionStrings[index], vector);
});

const directionIndexes = directionStrings.reduce((result, element, index) => {
  result[element] = index;
  return result;
}, {});

const childVectors = directionVectors.map(directionVector =>
  directionVector.dividedByScalar(2)
);

childVectors.forEach((vector, index) => {
  console.log("childVec", directionStrings[index], vector);
});

const outOfBound = (value, position, size) =>
  value < position - size || value >= position + size;

const isOutOfBounds = (point, position, size) =>
  outOfBound(point.x, position.x, size) ||
  outOfBound(point.y, position.y, size) ||
  outOfBound(point.z, position.z, size);

class Octree {
  constructor(
    { parent, direction } = {
      parent: null,
      direction: null
    }
  ) {
    if (parent && isNaN(direction))
      throw "Must specify parent and direction or none of them";
    if (parent)
      this.size = parent.halfSize; // the cube is size*size*size
    else this.size = constants.defaultSize;
    if (this.size < constants.minSize)
      throw "Size too small (" + size + "/" + constants.minSize + ")";
    this.parent = parent; // create root by default
    this.position = parent ? parent.getChildPosition(direction) : new Vector3(); // center of the cube
    this.entities = [];
    this.childs = null;
    this.halfSize = this.size / 2;
  }

  insertEntity(entity) {
    if (this.isOutOfBounds(entity.position)) throw "Out of bounds";
    if (this.isLeaf()) {
      this.entities.push(entity);
      /*if (this.size / 2 >= constants.minSize)*/ this.checkDivide();
    } else {
      let success = false;
      this.childs.forEach(child => {
        try {
          child.insertEntity(entity);
          if (success === true) throw "Inserted entity twice!";
          success = true;
        } catch (error) {
          if (error === "Inserted entity twice!") throw error;
        }
      });
      if (!success) throw "Failed to pass entity";
    }
  }

  forEachNode(action) {
    action(this);
    if (!this.isLeaf()) this.childs.forEach(child => child.forEachNode(action));
  }

  forEachLeaf(action) {
    this.forEachNode(node => {
      if (node.isLeaf()) action(node);
    });
  }

  forEachEntity(action) {
    this.forEachLeaf(leaf => leaf.entities.forEach(entity => action(entity)));
  }

  checkDivide() {
    if (this.entities.length > constants.maxEntitiesPerNode) this.divide();
  }

  divide() {
    this.childs = Array.apply(null, Array(octo)).map((element, direction) => {
      const child = new Octree({
        parent: this,
        direction: direction
      });
      this.passEntities(direction, child);
      return child;
    });
    if (this.childs.length <= 0) throw "Failed to divide";
    if (this.entities.length > 0) throw "Failed to pass entity/ies to childs";
    this.entities = null;
  }

  isRoot() {
    return this.parent === null;
  }

  isLeaf() {
    return this.childs === null;
  }

  isOutOfBounds(point) {
    return isOutOfBounds(point, this.position, this.halfSize);
  }

  passEntities(direction, node) {
    this.entities.forEach((entity, index) => {
      try {
        node.insertEntity(entity);
        this.entities.splice(this.entities.indexOf(entity), 1);
      } catch (error) {}
    });
  }

  getChildPosition(direction) {
    return this.position.plus(
      childVectors[direction].multipliedByScalar(this.halfSize)
    );
  }
}

module.exports = Octree;

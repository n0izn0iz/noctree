"use strict";
import constants from "./constants";
import Vector3 from "./Vector3";

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

export const east = new Vector3({ x: 1 });
export const west = east.invert();
export const north = new Vector3({ y: 1 });
export const south = north.invert();
export const top = new Vector3({ z: 1 });
export const bottom = top.invert();

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

const outOfBound = (value, position, halfSize) =>
  value < position - halfSize || value >= position + halfSize;

const isOutOfBounds = (point, position, halfSize) =>
  outOfBound(point.x, position.x, halfSize) ||
  outOfBound(point.y, position.y, halfSize) ||
  outOfBound(point.z, position.z, halfSize);

class Octree {
  constructor(
    { parent, direction, entities } = {
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
      throw "Can't construct Octree, size too small (" +
        this.size +
        "/" +
        constants.minSize +
        ")";
    this.parent = parent; // create root by default
    this.position = parent ? parent.getChildPosition(direction) : new Vector3(); // center of the cube
    this.entities = [];
    this.childs = null;
    this.halfSize = this.size / 2;
    if (entities) entities.forEach(entity => this.insertEntity(entity));
  }

  findOctant(point) {
    for (let direction = 0; direction < octo; direction++)
      if (this.pointIsInOctant(point, direction)) return direction;
    throw "Failed to find octant for " +
      new Vector3(point).toString() +
      " at " +
      new Vector3(this.position).toString();
  }

  insertEntity(entity) {
    if (this.isOutOfBounds(entity.position))
      throw "Out of bounds at " + new Vector3(entity.position).toString();
    if (this.isLeaf()) {
      this.entities.push(entity);
      if (this.size / 2 >= constants.minSize) this.checkDivide();
    } else {
      const direction = this.findOctant(entity.position);
      this.childs[direction].insertEntity(entity);
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
    console.log("Spliting octree");
    const octoArray = Array.apply(null, Array(octo));

    const childEntities = octoArray.map(() => []);
    this.entities.forEach((entity, index) => {
      const direction = this.findOctant(entity.position);
      childEntities[direction].push(entity);
    });
    this.entities = null;

    this.childs = octoArray.map(
      (element, direction) =>
        new Octree({
          parent: this,
          direction,
          entities: childEntities[direction]
        })
    );
  }

  isRoot() {
    return this.parent === null;
  }

  isLeaf() {
    return this.childs === null;
  }

  pointIsInOctant(point, direction) {
    return !isOutOfBounds(
      point,
      this.getChildPosition(direction),
      this.halfSize / 2
    );
  }

  isOutOfBounds(point) {
    return isOutOfBounds(point, this.position, this.halfSize);
  }

  getChildPosition(direction) {
    return this.position.plus(
      childVectors[direction].multipliedByScalar(this.halfSize)
    );
  }
}

export default Octree;

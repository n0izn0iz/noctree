"use strict";
import Octree from "./utils/Octree";

const octree = new Octree();

octree.insertEntity({ position: { x: -100, y: -100, z: -100 } });
octree.insertEntity({ position: { x: 100, y: -100, z: -100 } });
octree.insertEntity({ position: { x: -100, y: 100, z: -100 } });
octree.insertEntity({ position: { x: 100, y: 100, z: -100 } });
octree.insertEntity({ position: { x: -100, y: -100, z: 100 } });
octree.insertEntity({ position: { x: 100, y: -100, z: 100 } });
octree.insertEntity({ position: { x: -100, y: 100, z: 100 } });
octree.insertEntity({ position: { x: 100, y: 100, z: 100 } });
console.log("Is leaf? ", octree.isLeaf());
if (!octree.isLeaf()) return 1;
console.log("Another one?");
octree.insertEntity({ position: { x: -100, y: -100, z: -150 } });
console.log("Is leaf? ", octree.isLeaf());
if (octree.isLeaf()) return 1;
console.log("What if... ");
octree.insertEntity({ position: { x: 0, y: 0, z: 0 } });
console.log("SUCCESS");
return 0;

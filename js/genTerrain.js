import entityTypes from "./utils/entityTypes";

export default octree =>
  [
    {
      type: entityTypes.terrain,
      size: octree.size / 2,
      position: {
        x: -(octree.size / 4),
        y: -(octree.size / 4),
        z: -(octree.size / 4)
      }
    },
    {
      type: entityTypes.terrain,
      size: octree.size / 2,
      position: {
        x: octree.size / 4,
        y: octree.size / 4,
        z: -(octree.size / 4)
      }
    },
    {
      type: entityTypes.terrain,
      size: octree.size / 2,
      position: {
        x: -(octree.size / 4),
        y: octree.size / 4,
        z: -(octree.size / 4)
      }
    },
    {
      type: entityTypes.terrain,
      size: octree.size / 2,
      position: {
        x: octree.size / 4,
        y: -(octree.size / 4),
        z: -(octree.size / 4)
      }
    }
  ].forEach(terrainBlock => octree.insertEntity(terrainBlock));

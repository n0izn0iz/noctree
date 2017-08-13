const entityTypes = ["terrain", "cube"];

module.exports = entityTypes.reduce(
  (result, key) => Object.defineProperty(result, key, { value: key }),
  {}
);

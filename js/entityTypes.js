const entityTypes = ["terrain", "cube"];

export default entityTypes.reduce(
  (result, key) => Object.defineProperty(result, key, { value: key }),
  {}
);

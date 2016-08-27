import Immutable from 'immutable';
import obj from './obj';

const create = (width, depth) =>
  Immutable.fromJS(obj.create(width, depth));

const mutate = (map, modificationDepth = 0) => {
  let mutatedMap = map;
  let isOdd = true;

  for (const mapKey of mutatedMap.keys()) {
    const mapVal = (isOdd && (modificationDepth <= 0)) ? '...' : mutate(mutatedMap.get(mapKey), modificationDepth - 1);

    isOdd = !isOdd;
    mutatedMap = mutatedMap.set(mapKey, mapVal);
  }

  return mutatedMap;
};

const optimizedMutate = (map, modificationDepth = 0) => {
  let isOdd = false;

  return map.map(val => {
    isOdd = !isOdd;
    return (isOdd && (modificationDepth <= 0)) ? '...' : optimizedMutate(val, modificationDepth - 1);
  });
};

const mutateGlobal = (mutableMap, mapNode, modificationDepth, path) => {
  let isOdd = true;

  for (const mapKey of mapNode.keys()) {
    const updatedPath = [...path, mapKey];

    if ((modificationDepth > 0) || !isOdd) {
      mutateGlobal(mutableMap, mapNode.get(mapKey), modificationDepth - 1, updatedPath);
    }
    else {
      mutableMap.setIn(updatedPath, '...');
    }
    isOdd = !isOdd;
  }
};

const globalMutate = (map, modificationDepth = 0) =>
  map.withMutations(m => mutateGlobal(m, map, modificationDepth, []));

export default {
  create,
  mutate,
  optimizedMutate,
  globalMutate
};

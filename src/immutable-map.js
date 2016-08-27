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

export default {
  create,
  mutate,
  optimizedMutate
};

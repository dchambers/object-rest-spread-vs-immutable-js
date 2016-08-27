const create = (width, depth) => {
  const obj = {};

  if (depth > 0) {
    for (let i = 0; i < width; ++i) {
      obj[`item #${i + 1}`] = create(width, depth - 1);
    }
  }

  return obj;
};

const mutate = (obj, modificationDepth = 0) => {
  let mutatedObj = obj;
  let isOdd = true;

  for (const objKey in mutatedObj) {
    const objVal = (isOdd && (modificationDepth <= 0)) ? '...' : mutate(mutatedObj[objKey], modificationDepth - 1);

    isOdd = !isOdd;
    mutatedObj = {...mutatedObj, [objKey]: objVal};
  }

  return mutatedObj;
};

export default {
  create,
  mutate
};

import test from 'ava';
import obj from './obj';
import map from './immutable-map';

const expectedObj = {
  'item #1': {
    'item #1': {},
    'item #2': {}
  },
  'item #2': {
    'item #1': {},
    'item #2': {}
  }
};

const expectedMutatedObj = {
  'item #1': '...',
  'item #2': {
    'item #1': '...',
    'item #2': {}
  }
};

const expectedPartiallyMutatedObj = {
  'item #1': {
    'item #1': '...',
    'item #2': {}
  },
  'item #2': {
    'item #1': '...',
    'item #2': {}
  }
};

test('obj.create works as expected', t => {
  t.deepEqual(obj.create(2, 2), expectedObj);
});

test('obj.mutate works as expected', t => {
  t.deepEqual(obj.mutate(obj.create(2, 2)), expectedMutatedObj);
  t.deepEqual(obj.mutate(obj.create(2, 2), 1), expectedPartiallyMutatedObj);
});

test('map.create works as expected', t => {
  t.deepEqual(map.create(2, 2).toJS(), expectedObj);
});

test('map.mutate works as expected', t => {
  t.deepEqual(map.mutate(map.create(2, 2)).toJS(), expectedMutatedObj);
  t.deepEqual(map.mutate(map.create(2, 2), 1).toJS(), expectedPartiallyMutatedObj);
});

test('map.optimizedMutate works as expected', t => {
  t.deepEqual(map.optimizedMutate(map.create(2, 2)).toJS(), expectedMutatedObj);
  t.deepEqual(map.optimizedMutate(map.create(2, 2), 1).toJS(), expectedPartiallyMutatedObj);
});

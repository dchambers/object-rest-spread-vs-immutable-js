import test from 'ava';
import obj from './obj';
import map from './immutable-map';

const expectedObj = {
  'item #1': {
    'item #1': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #2': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #3': {'item #1': {}, 'item #2': {}, 'item #3': {}}
  },
  'item #2': {
    'item #1': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #2': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #3': {'item #1': {}, 'item #2': {}, 'item #3': {}}
  },
  'item #3': {
    'item #1': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #2': {'item #1': {}, 'item #2': {}, 'item #3': {}},
    'item #3': {'item #1': {}, 'item #2': {}, 'item #3': {}}
  }
};

const expectedPartiallyMutatedObj = {
  'item #1': {
    'item #1': '...',
    'item #2': {'item #1': '...', 'item #2': {}, 'item #3': '...'},
    'item #3': '...'
  },
  'item #2': {
    'item #1': '...',
    'item #2': {'item #1': '...', 'item #2': {}, 'item #3': '...'},
    'item #3': '...'
  },
  'item #3': {
    'item #1': '...',
    'item #2': {'item #1': '...', 'item #2': {}, 'item #3': '...'},
    'item #3': '...'
  }
};

const expectedMutatedObj = {
  'item #1': '...',
  'item #2': {
    'item #1': '...',
    'item #2': {'item #1': '...', 'item #2': {}, 'item #3': '...'},
    'item #3': '...'
  },
  'item #3': '...'
};

test('obj.create works as expected', t => {
  t.deepEqual(obj.create(3, 3), expectedObj);
});

test('map.create works as expected', t => {
  t.deepEqual(map.create(3, 3).toJS(), expectedObj);
});

test('obj.mutate works as expected', t => {
  t.deepEqual(obj.mutate(obj.create(3, 3)), expectedMutatedObj);
  t.deepEqual(obj.mutate(obj.create(3, 3), 1), expectedPartiallyMutatedObj);
});

test('map.mutate works as expected', t => {
  t.deepEqual(map.mutate(map.create(3, 3)).toJS(), expectedMutatedObj);
  t.deepEqual(map.mutate(map.create(3, 3), 1).toJS(), expectedPartiallyMutatedObj);
});

test('map.optimizedMutate works as expected', t => {
  t.deepEqual(map.optimizedMutate(map.create(3, 3)).toJS(), expectedMutatedObj);
  t.deepEqual(map.optimizedMutate(map.create(3, 3), 1).toJS(), expectedPartiallyMutatedObj);
});

test('map.globalMutate works as expected', t => {
  t.deepEqual(map.globalMutate(map.create(3, 3)).toJS(), expectedMutatedObj);
  t.deepEqual(map.globalMutate(map.create(3, 3), 1).toJS(), expectedPartiallyMutatedObj);
});

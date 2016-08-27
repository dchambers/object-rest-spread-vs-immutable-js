import obj from './obj';
import immutableMap from './immutable-map';

const log = (msg) =>
  console.log(msg); // eslint-disable-line no-console

const profile = (blockName, test) => {
  const startTime = Date.now();
  test();
  const endTime = Date.now();
  log(`${blockName}: ${endTime - startTime}ms`);
};

const runProfileSet = (name, create, mutate) => {
  const runProfile = (w, d, m = 0) =>
    profile(` (${w}x${d} @${m})`, () => {
      for (let i = 0; i < 1000; ++i) {
        mutate(create(w, d), m);
      }
    });

  log('');
  log(`${name}:`);
  profile('TOTAL', () => {
    runProfile(5, 5);
    runProfile(7, 3);
    runProfile(3, 7);
  });

  log('');
  profile('TOTAL', () => {
    runProfile(5, 5, 3);
    runProfile(7, 3, 2);
    runProfile(3, 7, 5);
  });
};

runProfileSet('Object Rest/Spread Tests', obj.create, obj.mutate);
runProfileSet('Immutable Tests', immutableMap.create, immutableMap.mutate);
runProfileSet('Immutable Tests (Optimized)', immutableMap.create, immutableMap.optimizedMutate);
runProfileSet('Immutable Tests (Global)', immutableMap.create, immutableMap.globalMutate);

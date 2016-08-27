The tests within this repo (runnable with `npm test`) seek to compare the performance differences between modifying a large tree of object data using the object rest/spread operator Vs using Immutable.js. My findings so far have come to the topsy turvy conclusion that object rest/spread is always faster, which intuitively seems wrong, so something may be
amiss.

The [js-hashtrie-benchmark micro-benchmarks](https://github.com/mattbierner/js-hashtrie-benchmark) show Immutable.js beating native objects in the majority of tests, and in many tests by several orders of magnitude. However, those tests are performed on single maps rather than a tree of maps, so maybe this is relevant?

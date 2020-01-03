import { microToStacks, stacksToMicro } from './units';

test('microToStacks()', () => {
  expect(microToStacks(1000)).toBe(0.001);
  expect(microToStacks(1000000)).toBe(1);
});

test('stacksToMicro()', () => {
  expect(stacksToMicro(1)).toBe(1000000);
  expect(stacksToMicro(100)).toBe(100000000);
  expect(stacksToMicro(999999999)).toBe(999999999000000);
});

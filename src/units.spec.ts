import { microToStacks, stacksToMicro } from './units';

test('microToStacks()', () => {
  expect(microToStacks(1000)).toBe(0.001);
  expect(microToStacks(1000000)).toBe(1);
  // expect(microToStacks(Number.MAX_SAFE_INTEGER)).toBe(9007199254.740992);
  // expect(microToStacks(Infinity)).toBe(9007199254.740992);
  // expect(microToStacks(NaN)).toBe(9007199254.740992);
});

test('stacksToMicro()', () => {
  expect(stacksToMicro(1)).toBe(1000000);
  expect(stacksToMicro(100)).toBe(100000000);
  expect(stacksToMicro(999999999)).toBe(999999999000000);
  // expect(stacksToMicro(Number.MAX_SAFE_INTEGER)).toBe(9.007199254740991e21);
  // expect(stacksToMicro(Infinity)).toBe(Infinity);
  // expect(stacksToMicro(NaN)).toBe(NaN);
});

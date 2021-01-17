import {
  addGenerator,
  minusGenerator,
  buildPositionCalculator
} from '../calculator';
import fn = jest.fn;
import clearAllMocks = jest.clearAllMocks;

describe('test addGenerator()', () => {
  it('should return a operator who can add two numbers for a result, while the sum is less than max', () => {
    const add = addGenerator(10, false, 0);

    expect(add(3, 2)).toBe(5);
  });
});

describe('test minusGenerator()', () => {
  it('should return a operator who can add two numbers for a result, while the result is greater than min', () => {
    const minus = minusGenerator(0, false, 10);

    expect(minus(3, 2)).toBe(1);
  });
});

describe('test function from addGenerator() - add numbers while max number is 10 and min is 0)', () => {
  const max = 10;
  const min = 0;

  const current = 6;
  const diff = 5;
  it('should return null while the result is more than max number and displayLoop is false', () => {
    const expected = null;

    const add = addGenerator(max, false, min);

    const actual = add(current, diff);

    expect(actual).toBe(expected);
  });

  it('should go back to min number and calculate with the remainder while the result is more than max number and displayLoop is true', () => {
    const expected = 0;

    const add = addGenerator(max, true, min);

    const actual = add(current, diff);

    expect(actual).toBe(expected);
  });
});

describe('test function from minusGenerator() - subtract numbers while max number is 10 and min is 0)', () => {
  const max = 10;
  const min = 0;

  const current = 3;
  const diff = 5;
  it('should return null while the result is less than min number and displayLoop is false', () => {
    const expected = null;

    const minus = minusGenerator(min, false, max);

    const actual = minus(current, diff);

    expect(actual).toBe(expected);
  });

  it('should go back to max number and calculate with the remainder while the result is less than min number and displayLoop is true', () => {
    const expected = 9;

    const minus = minusGenerator(min, true, max);

    const actual = minus(current, diff);

    expect(actual).toBe(expected);
  });
});

describe('test a function from buildPositionCalculator(add, minus)', () => {
  const addCallback = fn();
  const minusCallback = fn();

  const calculate = buildPositionCalculator(addCallback, minusCallback);

  beforeEach(() => {
    clearAllMocks();
  });

  it('should call addCallback when diff is greater than 0', () => {
    const current = 3;
    const diff = 5;
    calculate(current, diff);

    expect(addCallback).toHaveBeenCalledWith(current, diff);
    expect(minusCallback).toBeCalledTimes(0);
  });

  it('should call minusCallback when diff is less than 0', () => {
    const current = 3;
    const diff = 2;

    calculate(current, diff * -1);

    expect(addCallback).toBeCalledTimes(0);
    expect(minusCallback).toHaveBeenCalledWith(current, diff);
  });

  it('should return the same number when diff is 0 and dont call addCallback and minusCallback', () => {
    const current = 3;
    const result = calculate(current, 0);

    expect(result).toBe(current);
    expect(addCallback).toBeCalledTimes(0);
    expect(minusCallback).toBeCalledTimes(0);
  });
});

import {
  compose,
  parseCalculateResultToString,
  toString,
  updateObject
} from '../util';
import fn = jest.fn;

describe('test updateObject(raw, newValues)', () => {
  it('should return a new object which has the same values of the raw object which is already assigned by the values of newValues', () => {
    const raw = { content: 'test', type: 1 };
    const newValues = { content: 'new Content' };

    const actual = updateObject(raw, newValues);

    expect(actual).toStrictEqual({
      content: newValues.content,
      type: raw.type
    });
  });
});

describe('test toSting(input: T)', () => {
  it('should return a string of the input number', () => {
    const n = 123;
    const actual = toString(n);

    expect(actual).toBe(String(n));
  });

  it('should return empty string when input is null', () => {
    const n = null;
    const actual = toString(n);

    expect(actual).toBe('');
  });
});

describe('test compose(f, g)(x)', () => {
  it('should compose the two functions - f(g(x))', () => {
    const fn1 = fn();
    const fn2 = fn().mockReturnValueOnce(10);
    compose(fn1, fn2)(30, 20);

    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn2).toBeCalledWith(30, 20);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toBeCalledWith(10);
  });
});

describe('test parseCalculateResultToString(operator)', () => {
  it('should return a string of the number provided by operator', function () {
    const n = 10;
    const operator = fn().mockReturnValueOnce(n);
    const actual = parseCalculateResultToString(operator)(20, 30);

    expect(operator).toHaveBeenCalledTimes(1);
    expect(operator).toBeCalledWith(20, 30);
    expect(actual).toBe(String(n));
  });

  it('should return empty string, while operator return null', () => {
    const n = null;
    const operator = fn().mockReturnValueOnce(n);
    const actual = parseCalculateResultToString(operator)(20, 30);

    expect(operator).toHaveBeenCalledTimes(1);
    expect(operator).toBeCalledWith(20, 30);
    expect(actual).toBe('');
  });
});

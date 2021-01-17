import { Operator } from './useCases/calculator';

export const updateObject = <T extends P, P>(raw: T, newValues: P): T =>
  Object.assign({}, raw, newValues);

type Composition<T, R> = {
  (...args: T[]): R;
};

export function compose<T, C, R>(
  g: (...args: T[]) => C,
  f: (input: C) => R
): Composition<T, R> {
  return (...args: T[]) => f(g(...args));
}

export const toString = (input: number | null): string => {
  if (input == null) return '';

  return String(input);
};

export const parseCalculateResultToString = (
  func: Operator
): Composition<number, string> => compose(func, toString);

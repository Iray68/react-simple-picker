import { NumberOperator, Operator } from './useCases/calculator';
import { TimerRef } from './useCases/move';

export const updateObject = <T extends P, P>(raw: T, newValues: P): T =>
  Object.assign({}, raw, newValues);

export type Composition<T, R> = {
  (...args: T[]): R;
};

export function compose<T, C, R>(
  f: (input: C) => R,
  g: (...args: T[]) => C
): Composition<T, R> {
  return (...args: T[]) => f(g(...args));
}

export const toString = <T>(input: T): string => {
  if (input == null) return '';

  return String(input);
};

export const parseCalculateResultToString = (
  operator: NumberOperator
): Operator<number, string> => compose(toString, operator);

export function delay(s: number, timer: TimerRef) {
  return new Promise(resolve => {
    timer.current = setTimeout(resolve, s);
  });
}

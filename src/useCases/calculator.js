// @flow
export type OperatorType = (raw: number, count: number) => number | null;

export function addGenerator(
  maxCount: number,
  displayLoop: boolean,
  minCount: number
): OperatorType {
  const add: OperatorType = (current, diff = 1) => {
    const total = current + diff;
    if (total > maxCount) {
      if (!displayLoop) {
        return null;
      }

      return total - maxCount - 1 + minCount;
    }

    return total;
  };
  return add;
}
export function minusGenerator(
  minCount: number,
  displayLoop: boolean,
  maxCount: number
): OperatorType {
  const minus: OperatorType = (current, diff = 1) => {
    const total = current + diff * -1;
    if (total < minCount) {
      if (!displayLoop) {
        return null;
      }

      return maxCount + 1 + total - minCount;
    }

    return total;
  };
  return minus;
}
export function calculateGenerator(
  next: OperatorType,
  prev: OperatorType
): OperatorType {
  const calculate = (current, diff) => {
    if (diff === 0) {
      return current;
    }

    return diff > 0 ? next(current, diff) : prev(current, diff * -1);
  };
  return calculate;
}

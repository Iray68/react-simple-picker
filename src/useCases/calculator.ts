export interface Operator {
  (raw: number, count: number): number | null;
}

export function addGenerator(
  maxCount: number,
  displayLoop: boolean,
  minCount: number
): Operator {
  const add: Operator = (current, diff = 1) => {
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
): Operator {
  const minus: Operator = (current, diff = 1) => {
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
export function calculateGenerator(next: Operator, prev: Operator): Operator {
  const calculate = (current: number, diff: number) => {
    if (diff === 0) {
      return current;
    }

    return diff > 0 ? next(current, diff) : prev(current, diff * -1);
  };
  return calculate;
}

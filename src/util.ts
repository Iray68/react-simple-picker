export const updateObject = <T extends P, P>(raw: T, newValues: P): T =>
  Object.assign({}, raw, newValues);

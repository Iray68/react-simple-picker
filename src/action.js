export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_MOVING_STATUS = 'CHANGE_MOVING_STATUS';

export const setCurrent = current => {
  return { type: SET_CURRENT, current };
};
export const setMoving = moving => {
  return { type: CHANGE_MOVING_STATUS, moving };
};

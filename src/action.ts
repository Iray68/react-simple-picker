import { MovingState } from './index';

export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_MOVING_STATUS = 'CHANGE_MOVING_STATUS';

export type Action =
  | { type: 'SET_CURRENT'; current: number }
  | { type: 'CHANGE_MOVING_STATUS'; moving: MovingState };

export const setCurrent: (current: number) => Action = current => {
  return { type: SET_CURRENT, current };
};
export const setMoving: (moving: MovingState) => Action = moving => {
  return { type: CHANGE_MOVING_STATUS, moving };
};

// @flow
import type { MovingType } from './index';

export const SET_CURRENT = 'SET_CURRENT';
export const CHANGE_MOVING_STATUS = 'CHANGE_MOVING_STATUS';

export type ActionType =
  | { type: 'SET_CURRENT', current: number }
  | { type: 'CHANGE_MOVING_STATUS', moving: MovingType };

export const setCurrent: number => ActionType = current => {
  return { type: SET_CURRENT, current };
};
export const setMoving: MovingType => ActionType = moving => {
  return { type: CHANGE_MOVING_STATUS, moving };
};

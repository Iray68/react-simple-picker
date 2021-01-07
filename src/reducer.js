// @flow
import { useReducer } from 'react';
import { CHANGE_MOVING_STATUS, SET_CURRENT } from './action';
import { updateObject } from './util';
import type { PickerStateType } from './index';
import type { ActionType } from './action';

type DispatchType = ActionType => void;

const initialState: PickerStateType = {
  current: 0,
  moving: {}
};

const reducer = (state: PickerStateType, action: ActionType) => {
  switch (action.type) {
    case CHANGE_MOVING_STATUS:
      return updateObject(state, { moving: action.moving });
    case SET_CURRENT:
      return updateObject(state, { current: action.current });
    default:
      return state;
  }
};

export default (
  initialArgs: PickerStateType
): [PickerStateType, DispatchType] =>
  useReducer(reducer, updateObject(initialState, initialArgs));

import { useReducer } from 'react';
import { CHANGE_MOVING_STATUS, SET_CURRENT } from './action';
import { updateObject } from './util';
import { PartialPickerState, PickerState } from './index';
import { Action } from './action';

export interface Dispatch {
  (action: Action): void;
}

const initialState: PickerState = {
  current: 0,
  moving: {}
};

const reducer = (state: PickerState, action: Action) => {
  switch (action.type) {
    case CHANGE_MOVING_STATUS:
      return updateObject(state, { moving: action.moving });
    case SET_CURRENT:
      return updateObject(state, { current: action.current });
    default:
      return state;
  }
};

export default (initialArgs: PartialPickerState): [PickerState, Dispatch] =>
  useReducer(reducer, updateObject(initialState, initialArgs));

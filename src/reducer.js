import { useReducer } from 'react';
import { CHANGE_MOVING_STATUS, SET_CURRENT } from './action';
import { updateObject } from './util';

const initialState = {
  current: 0,
  moving: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_MOVING_STATUS:
      return updateObject(state, { moving: action.moving });
    case SET_CURRENT:
      return updateObject(state, { current: action.current });
    default:
      return state;
  }
};

export default initialArgs =>
  useReducer(reducer, updateObject(initialState, initialArgs));

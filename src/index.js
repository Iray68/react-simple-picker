//@flow
import React from 'react';
import { setCurrent, setMoving } from './action';
import createReducer from './reducer';
import Picker from './Picker';
import styles from './index.css';

export type AnimeType = styles.moveDown | styles.moveUp;

export type MovingType = {
  className?: AnimeType,
  time?: number
};

export type PickerStateType = {
  current: number,
  moving?: MovingType
};

const mapStateToProps = (state: PickerStateType) => {
  return {
    current: state.current,
    moving: state.moving
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrent: (value: number) => {
      dispatch(setCurrent(value));
    },
    setMoving: (value: MovingType) => {
      dispatch(setMoving(value));
    }
  };
};

// eslint-disable-next-line react/display-name
export default ({
  minCount = 0,
  initCount = minCount,
  ...others
}: {
  minCount?: number,
  initCount?: number,
  maxCount: number
}) => {
  const [state, dispatch] = createReducer({ current: initCount });

  return (
    <Picker
      minCount={minCount}
      {...mapStateToProps(state)}
      {...mapDispatchToProps(dispatch)}
      {...others}
    />
  );
};

//@flow
import React from 'react';
import { setCurrent, setMoving } from './action';
import createReducer from './reducer';
import Picker from './Picker';

const mapStateToProps = state => {
  return {
    current: state.current,
    moving: state.moving
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrent: value => {
      dispatch(setCurrent(value));
    },
    setMoving: value => {
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
  minCount: ?number,
  initCount: ?number
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

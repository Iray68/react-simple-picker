import React, { ComponentType } from 'react';
import { setCurrent, setMoving } from './action';
import createReducer, { Dispatch } from './reducer';
import Picker, { MaskProps, PickerProps } from './Picker';

export interface MovingState {
  className?: string;
  time?: number;
}

export interface PartialPickerState {
  current?: number;
  moving?: MovingState;
}

export interface PickerState extends PartialPickerState {
  current: number;
  moving: MovingState;
}

export type MaskComponent = ComponentType<MaskProps>;

export interface DispatchMapProps {
  setCurrent: (current: number) => void;
  setMoving: (moving: MovingState) => void;
}

const mapStateToProps = (state: PickerState): PickerState => {
  return {
    current: state.current,
    moving: state.moving
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchMapProps => {
  return {
    setCurrent: value => {
      dispatch(setCurrent(value));
    },
    setMoving: value => {
      dispatch(setMoving(value));
    }
  };
};

interface NumberPickerProps extends PickerProps {
  minCount?: number;
  initCount?: number;
}

const NumberPicker: ComponentType<NumberPickerProps> = ({
  minCount = 0,
  initCount = minCount,
  ...props
}: NumberPickerProps) => {
  const [state, dispatch] = createReducer({ current: initCount });

  return (
    <Picker
      {...mapStateToProps(state)}
      {...mapDispatchToProps(dispatch)}
      {...props}
      minCount={minCount}
    />
  );
};

NumberPicker.displayName = 'NumberPicker';

export default NumberPicker;

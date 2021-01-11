import { MovingState } from '../index';
import { SelectNumberOperator, TimerRef, TouchRef } from '../useCases/move';
import { initMoveHandler } from '../useCases/move';
import { Operator } from '../useCases/calculator';
import { useGesture } from 'react-use-gesture';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MoveOperator } from '../useCases/gesture';
import styles from '../index.css';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';

const clearTimeoutIfExist = (timer: NodeJS.Timeout | null) => {
  if (timer) {
    clearTimeout(timer);
  }
};

interface Gesture {
  bind: () => ReactEventHandlers;
  velocity: number;
  down: boolean;
  y: number;
  diffY: number;
}

interface MoveOperators {
  endMoving: MoveOperator;
  next: MoveOperator;
  prev: MoveOperator;
}

export const useGestureEffect = (
  initialLayout: (scrollTop: number, itemHeight: number) => void,
  itemHeight: number,
  preloadCount: number,
  setMoving: (moving: MovingState) => void,
  selectNumber: SelectNumberOperator,
  current: number,
  touchRef: TouchRef,
  add: Operator,
  minus: Operator
): [Gesture, MoveOperators] => {
  const [{ y, velocity, down }, setDrag] = useState(() => ({
    y: 0,
    velocity: 0,
    down: false
  }));

  const endMoving: MoveOperator = () => {
    clearTimeoutIfExist(timer.current);
    setMoving({});
    setDrag({ y: 0, velocity: 0, down: false });
  };

  const bind = useGesture(
    {
      onDrag: ({ down, velocity, movement: [, y] }) =>
        setDrag({ y, down, velocity }),
      onPointerDown: () => endMoving()
    },
    {
      drag: { initial: () => [0, 0] }
    }
  );

  const timer: TimerRef = useRef(null);

  const initial = useCallback(initialLayout, [itemHeight, preloadCount]);

  useEffect(() => {
    initial(itemHeight * (preloadCount - 1), itemHeight);

    return () => clearTimeoutIfExist(timer.current);
  }, [initial, itemHeight, preloadCount]);

  const move = initMoveHandler(
    selectNumber,
    current,
    setMoving,
    timer,
    endMoving,
    touchRef
  );

  const next: MoveOperator = (count = 1, isSkipAnimation) =>
    move(add, styles.moveDown, Math.round(count), isSkipAnimation);
  const prev: MoveOperator = (count = 1, isSkipAnimation) =>
    move(minus, styles.moveUp, Math.round(count), isSkipAnimation);

  return [
    {
      bind,
      velocity,
      down,
      y,
      diffY: Math.abs(y)
    },
    {
      endMoving,
      next,
      prev
    }
  ];
};

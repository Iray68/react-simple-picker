import { MovingState } from '../index';
import { SelectNumberOperator, TimerRef } from '../useCases/move';
import { initMoveHandler } from '../useCases/move';
import { NumberOperator } from '../useCases/calculator';
import { useGesture } from 'react-use-gesture';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
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

export interface MoveOperator {
  (movingCount?: number, isSkipAnimation?: boolean): void;
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
  add: NumberOperator,
  minus: NumberOperator
): [Gesture, MoveOperators] => {
  const timer: TimerRef = useRef(null);

  const initial = useCallback(initialLayout, [itemHeight, preloadCount]);

  useEffect(() => {
    initial(itemHeight * (preloadCount - 1), itemHeight);

    return () => clearTimeoutIfExist(timer.current);
  }, [initial, itemHeight, preloadCount]);

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

  const bind = useGesture({
    onDrag: ({ down, velocity, movement: [, y] }) => {
      setDrag({ y, down, velocity });
      if (!down && preventTouchRef.current) {
        preventTouchRef.current = false;
      }
    },
    onPointerDown: () => {
      if (!preventTouchRef.current) {
        preventTouchRef.current = true;
      }
      endMoving();
    }
  });

  const move = initMoveHandler(
    selectNumber,
    current,
    setMoving,
    timer,
    endMoving
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

import { MovingState } from '../index';
import { Operator } from './calculator';
import { MutableRefObject } from 'react';

export interface MoveHandler {
  (
    operator: Operator,
    animationStyle: string,
    i: number,
    isSkipAnimation?: boolean,
    j?: number
  ): void;
}

export type TimerRef = MutableRefObject<null | NodeJS.Timeout>;
export type TouchRef = MutableRefObject<boolean>;

export interface SelectNumberOperator {
  (number: number | null): void;
}

export function initMoveHandler(
  selectNumber: SelectNumberOperator,
  current: number,
  setMoving: (moving: MovingState) => void,
  timer: TimerRef,
  endMoving: () => void,
  touchRef: TouchRef
): MoveHandler {
  const MAX_ANIME_TIME = 150;

  const move: MoveHandler = (
    operator,
    animationStyle,
    i = 1,
    isSkipAnimation,
    j = i
  ) => {
    if (isSkipAnimation) {
      selectNumber(operator(current, j));
      return;
    }

    const movingTime = i === 1 ? MAX_ANIME_TIME / 2 : MAX_ANIME_TIME - i * 2;
    setMoving({ className: animationStyle, time: movingTime });

    timer.current = setTimeout(() => {
      selectNumber(operator(current, j - i + 1));
      endMoving();

      if (i - 1 > 0 && !touchRef.current) {
        requestAnimationFrame(() =>
          move(operator, animationStyle, i - 1, isSkipAnimation, j)
        );
      }
    }, movingTime);
  };
  return move;
}

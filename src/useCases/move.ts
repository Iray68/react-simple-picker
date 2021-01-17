import { MovingState } from '../index';
import { Operator } from './calculator';
import { MutableRefObject } from 'react';

export interface MoveHandler {
  (
    operator: Operator,
    animationStyle: string,
    remainCount: number,
    isSkipAnimation?: boolean,
    totalShiftCount?: number
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
    remainCount = 1,
    isSkipAnimation,
    totalShiftCount = remainCount
  ) => {
    if (isSkipAnimation) {
      selectNumber(operator(current, totalShiftCount));
      return;
    }

    const movingTime =
      remainCount === 1 ? MAX_ANIME_TIME / 2 : MAX_ANIME_TIME - remainCount * 2;
    setMoving({ className: animationStyle, time: movingTime });

    timer.current = setTimeout(() => {
      const target = totalShiftCount - remainCount;

      selectNumber(operator(current, target));
      endMoving();

      if (totalShiftCount !== target && !touchRef.current) {
        requestAnimationFrame(() =>
          move(
            operator,
            animationStyle,
            remainCount - 1,
            isSkipAnimation,
            totalShiftCount
          )
        );
      }
    }, movingTime);
  };
  return move;
}

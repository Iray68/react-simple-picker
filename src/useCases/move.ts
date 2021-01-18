import { MovingState } from '../index';
import { NumberOperator, Operator } from './calculator';
import { MutableRefObject } from 'react';
import { compose, delay } from '../util';

export interface MoveHandler {
  (
    operator: NumberOperator,
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
  timerRef: TimerRef,
  endMoving: () => void
): MoveHandler {
  const MAX_ANIME_TIME = 150;

  const move: MoveHandler = (
    operator,
    animationStyle,
    remainCount = 1,
    isSkipAnimation,
    totalShiftCount = remainCount
  ) => {
    const selectNumberOperator = compose(selectNumber, operator);

    if (isSkipAnimation) {
      selectNumberOperator(current, totalShiftCount);
      return;
    }

    const movingTime =
      remainCount === 1 ? MAX_ANIME_TIME / 2 : MAX_ANIME_TIME - remainCount * 2;
    setMoving({ className: animationStyle, time: movingTime });

    delay(movingTime, timerRef).then(() => {
      const target = totalShiftCount - remainCount + 1;

      selectNumberOperator(current, target);
      endMoving();

      if (totalShiftCount !== target) {
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
    });
  };
  return move;
}

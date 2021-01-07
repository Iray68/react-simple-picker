// @flow
import type { AnimeType, MovingType } from '../index';
import type { OperatorType } from './calculator';

export type MoveHandlerType = (
  operator: OperatorType,
  animationStyle: AnimeType,
  isSkipAnimation: ?boolean,
  i: number,
  j?: number
) => void;

export type TimerRefType = { current: null | TimeoutID };
export type TouchRefType = { current: boolean };

export type SelectNumberType = (number | null) => void;

export function initMoveHandler(
  selectNumber: SelectNumberType,
  current: number,
  setMoving: MovingType => void,
  timer: TimerRefType,
  endMoving: () => void,
  touchRef: any
): MoveHandlerType {
  const MAX_ANIME_TIME: number = 150;

  const move: MoveHandlerType = (
    operator,
    animationStyle,
    isSkipAnimation,
    i = 1,
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
          move(operator, animationStyle, isSkipAnimation, i - 1, j)
        );
      }
    }, movingTime);
  };
  return move;
}

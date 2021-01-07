// @flow
import type { MovingType } from '../index';
import type { SelectNumberType, TouchRefType } from '../useCases/move';
import { initMoveHandler } from '../useCases/move';
import type { OperatorType } from '../useCases/calculator';
import { useGesture } from 'react-with-gesture';
import { useEffect, useRef } from 'react';
import type { MoveOperatorType } from '../useCases/gesture';
import styles from '../index.css';

export const useGestureEffect = (
  initialLayout: (scrollTop: number, itemHeight: number) => void,
  itemHeight: number,
  preloadCount: number,
  setMoving: MovingType => void,
  selectNumber: SelectNumberType,
  current: number,
  touchRef: TouchRefType,
  add: OperatorType,
  minus: OperatorType
) => {
  const [
    bind,
    {
      velocity,
      down,
      delta: [, y]
    }
  ] = useGesture();

  const timer: { current: null | TimeoutID } = useRef(null);

  useEffect(() => {
    initialLayout(itemHeight * (preloadCount - 1), itemHeight);

    return () => clearTimeout(timer.current);
  }, [itemHeight, preloadCount]);

  const endMoving = () => {
    clearTimeout(timer.current);
    setMoving({});
  };

  const move = initMoveHandler(
    selectNumber,
    current,
    setMoving,
    timer,
    endMoving,
    touchRef
  );

  const next: MoveOperatorType = (count = 1, isSkipAnimation) =>
    move(add, styles.moveDown, isSkipAnimation, Math.round(count));
  const prev: MoveOperatorType = (count = 1, isSkipAnimation) =>
    move(minus, styles.moveUp, isSkipAnimation, Math.round(count));

  const diffY = Math.abs(y);

  return [
    {
      bind,
      velocity,
      down,
      y,
      diffY
    },
    {
      isTappedWhileMoving: down && timer.current && diffY < itemHeight,
      endMoving,
      next,
      prev
    }
  ];
};

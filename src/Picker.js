//@flow
import type { ComponentType, Element } from 'react';
import React, { useRef } from 'react';
import styles from './index.css';
import Button from './Button';
import { range } from 'lodash';
import Row from './Row';
import type { MovingType } from './index';
import {
  addGenerator,
  calculateGenerator,
  minusGenerator
} from './useCases/calculator';
import { initGestureHandler } from './useCases/gesture';
import { useGestureEffect } from './hook/useGestureEffect';
import type { TouchRefType } from './useCases/move';
import { updateObject } from './util';

type MaskPropsType = {
  className: ?string,
  style: ?StyleSheet
};

const updateHeightWithStyle = (height, style) =>
  updateObject({ height: `${height}px` }, style);

const getMask = (itemHeight: number): ComponentType<MaskPropsType> => {
  const Mask = ({ className, style, ...others }: MaskPropsType) => (
    <div
      className={[styles.mask, className].join(' ')}
      {...others}
      style={updateHeightWithStyle(itemHeight, style)}
    />
  );

  Mask.displayName = 'Mask';

  return Mask;
};

export type PickerPropsType = {
  className?: string,
  style?: StyleSheet,
  scrollerBackground?: string,
  minCount: number,
  maxCount: number,
  preloadCount?: number,
  onChange?: number => void,
  height?: number,
  iconAdd?: Element<ComponentType<HTMLElement>>,
  iconMinus?: Element<ComponentType<HTMLElement>>,
  renderMask?: (
    ComponentType<MaskPropsType>
  ) => Element<ComponentType<MaskPropsType>>,
  current: number,
  moving: MovingType,
  setCurrent: number => void,
  setMoving: MovingType => void
};

const Picker = ({
  className,
  style,
  scrollerBackground = 'white',
  minCount,
  maxCount,
  preloadCount = 2,
  onChange,
  height = 150,
  iconAdd = <i className="material-icons">keyboard_arrow_up</i>,
  iconMinus = <i className="material-icons">keyboard_arrow_down</i>,
  // eslint-disable-next-line react/display-name
  renderMask = Mask => <Mask />,
  current,
  moving,
  setCurrent,
  setMoving
}: PickerPropsType) => {
  if (!maxCount) {
    throw new Error('Please input maxCount parameter');
  }

  const layoutRef: { current: null | HTMLElement } = useRef(null);
  const touchRef: TouchRefType = useRef(false);

  const isLoop = minCount === 0;

  const itemHeight = height / 5;

  const selectNumber = n => {
    if (n === null) {
      return;
    }

    if (n > maxCount) {
      throw new Error('select number could not greater than max count');
    }

    setCurrent(n);
    if (onChange) onChange(n);
  };

  const add = addGenerator(maxCount, isLoop, minCount);
  const minus = minusGenerator(minCount, isLoop, maxCount);

  const initialLayout = (scrollTop, itemHeight) => {
    if (layoutRef.current) {
      layoutRef.current.scrollTop = scrollTop;
      layoutRef.current.style.setProperty('--item-height', `${itemHeight}px`);
    }
  };

  const [
    { bind, velocity, down, y, diffY },
    { isTappedWhileMoving, endMoving, next, prev }
  ] = useGestureEffect(
    initialLayout,
    itemHeight,
    preloadCount,
    setMoving,
    selectNumber,
    current,
    touchRef,
    add,
    minus
  );

  const calculate = calculateGenerator(add, minus);

  const operatorWithNoAnime = operator => () => {
    endMoving();
    operator();
  };

  const handleGesture = initGestureHandler(
    velocity,
    diffY,
    itemHeight,
    y,
    isLoop,
    maxCount,
    current,
    minCount,
    next,
    prev
  );

  if (moving.className && isTappedWhileMoving) {
    endMoving();
  }

  if (down && !touchRef.current) {
    touchRef.current = true;
  }

  if (touchRef.current && !down) {
    if (y && diffY > itemHeight) {
      handleGesture();
    }
    touchRef.current = false;
  }

  return (
    <div
      className={[styles.border, className].join(' ')}
      style={updateHeightWithStyle(height, style)}
    >
      <Button icon={iconAdd} onClick={operatorWithNoAnime(next)} />
      <div
        ref={layoutRef}
        className={styles.layout}
        style={{ background: scrollerBackground }}
      >
        {renderMask(getMask(itemHeight))}
        <div
          {...bind()}
          className={moving.className}
          style={
            touchRef.current
              ? { transform: `translateY(${y}px)` }
              : {
                  transition: moving.time
                    ? `transform ${moving.time}ms ease-out`
                    : 'unset'
                }
          }
        >
          {range(preloadCount, -1 * preloadCount).map(diff => (
            <Row
              style={{
                height: itemHeight,
                lineHeight: `${itemHeight}px`,
                transform: touchRef.current
                  ? `rotateX(${45 * (diff + -y / itemHeight)}deg)`
                  : `rotateX(${45 * diff}deg)`
              }}
              key={diff}
              value={String(calculate(current, diff))}
            />
          ))}
        </div>
      </div>
      <Button icon={iconMinus} onClick={operatorWithNoAnime(prev)} />
    </div>
  );
};

Picker.displayName = 'Picker';

export default Picker;

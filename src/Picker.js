//@flow
import React, { Component, useRef, useEffect } from 'react';
import { useGesture } from 'react-with-gesture';
import styles from './index.css';
import Button from './Button';
import { range } from 'lodash';
import Row from './Row';

type MaskPropsType = {
  className: ?string,
  style: ?StyleSheet
};

const getMask = itemHeight => {
  const Mask = ({ className, style, ...others }: MaskPropsType) => (
    <div
      className={[styles.mask, className].join(' ')}
      {...others}
      style={Object.assign({ height: itemHeight }, style)}
    />
  );

  Mask.displayName = 'Mask';

  return Mask;
};

type PickerPropsType = {
  className: ?string,
  style: ?StyleSheet,
  scrollerBackground: ?string,
  minCount: ?number,
  maxCount: number,
  preloadCount: ?number,
  onChange?: Event => void,
  height: ?number,
  iconAdd: ?Component,
  iconMinus: ?Component,
  renderMask?: Component => Component,
  current: ?number,
  moving: ?number,
  setCurrent?: number => void,
  setMoving?: number => void
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
  iconAdd = _ => <i className="material-icons">keyboard_arrow_up</i>,
  iconMinus = _ => <i className="material-icons">keyboard_arrow_down</i>,
  renderMask = Mask => <Mask />,
  current,
  moving,
  setCurrent,
  setMoving
}: PickerPropsType) => {
  if (!maxCount) {
    throw new Error('Please input maxCount parameter');
  }

  const timer = useRef(null);
  const layoutRef = useRef(null);
  const touchRef = useRef(false);
  const [
    bind,
    {
      velocity,
      down,
      delta: [x, y]
    }
  ] = useGesture();
  const diffY = Math.abs(y);
  const displayLoop = minCount === 0;

  const itemHeight = height / 5;

  useEffect(() => {
    layoutRef.current.scrollTo(0, itemHeight * (preloadCount - 1));
    layoutRef.current.style.setProperty('--item-height', `${itemHeight}px`);

    return () => clearTimeout(timer.current);
  }, []);

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

  const next = (i, t = 1) => {
    const total = i + t;
    if (total > maxCount) {
      if (!displayLoop) {
        return null;
      }

      return total - maxCount - 1 + minCount;
    }

    return total;
  };

  const prev = (i, t = 1) => {
    const total = i - t;
    if (total < minCount) {
      if (!displayLoop) {
        return null;
      }

      return maxCount + 1 + total - minCount;
    }

    return total;
  };

  const calculate = (current, diff) => {
    if (diff === 0) {
      return current;
    }

    return diff > 0 ? next(current, diff) : prev(current, diff * -1);
  };

  const endMoving = () => {
    clearTimeout(timer.current);
    setMoving('');
  };

  const move = (operator, animationStyle, skipAnimation, i = 1, j = i) => {
    if (skipAnimation) {
      selectNumber(operator(current, j));
      return;
    }

    const movingTime = i === 1 ? 150 / 2 : 150 - i * 2;
    setMoving({ className: animationStyle, time: movingTime });

    timer.current = setTimeout(() => {
      selectNumber(operator(current, j - i + 1));
      endMoving();

      if (i - 1 > 0 && !touchRef.current) {
        requestAnimationFrame(() =>
          move(operator, animationStyle, skipAnimation, i - 1, j)
        );
      }
    }, movingTime);
  };

  const add = (i = 1, skipAnimation) =>
    move(next, styles.moveDown, skipAnimation, Math.round(i));
  const minus = (i = 1, skipAnimation) =>
    move(prev, styles.moveUp, skipAnimation, Math.round(i));

  const handleGesture = () => {
    const ratio = velocity < 1 ? 1 : velocity / 2;
    const skipAnimation = velocity < 0.2 && diffY > itemHeight;

    let movingCount = Math.abs((y / itemHeight) * ratio);

    if (displayLoop) {
      movingCount = movingCount > maxCount ? maxCount - 1 / ratio : movingCount;
    }

    if (y > 0) {
      if (!displayLoop && current + movingCount > maxCount) {
        movingCount = maxCount - current + 1;
      }

      add(movingCount, skipAnimation);
    } else {
      if (!displayLoop && current - movingCount < minCount) {
        movingCount = current - minCount + 1;
      }
      minus(movingCount, skipAnimation);
    }
  };

  if (down && moving.className && timer.current && diffY < itemHeight) {
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
      style={Object.assign({ height: `${height}px` }, style)}
    >
      <Button
        icon={iconAdd}
        onClick={() => {
          endMoving();
          add();
        }}
      />
      <div
        ref={layoutRef}
        className={styles.layout}
        onClick={() => console.log('click')}
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
              value={calculate(current, diff)}
            />
          ))}
        </div>
      </div>
      <Button
        icon={iconMinus}
        onClick={() => {
          endMoving();
          minus();
        }}
      />
    </div>
  );
};

Picker.displayName = 'Picker';

export default Picker;

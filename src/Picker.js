//@flow
import React, { ComponentType, Element, useRef, useEffect } from 'react';
import { useGesture } from 'react-with-gesture';
import styles from './index.css';
import Button from './Button';
import { range } from 'lodash';
import Row from './Row';
import type { AnimeType, MovingType } from './index';

const MAX_ANIME_TIME: number = 150;

type MaskPropsType = {
  className: ?string,
  style: ?StyleSheet
};

const getMask = (itemHeight: number): ComponentType<MaskPropsType> => {
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
  iconAdd: HTMLElement,
  iconMinus: HTMLElement,
  renderMask?: (
    ComponentType<MaskPropsType>
  ) => Element<ComponentType<MaskPropsType>>,
  current: ?number,
  moving: ?MovingType,
  setCurrent?: number => void,
  setMoving?: MovingType => void
};

const nextGenerator = (maxCount, displayLoop, minCount) => {
  const next = (current, diff = 1) => {
    const total = current + diff;
    if (total > maxCount) {
      if (!displayLoop) {
        return null;
      }

      return total - maxCount - 1 + minCount;
    }

    return total;
  };
  return next;
};

const prevGenerator = (minCount, displayLoop, maxCount) => {
  const prev = (current, diff = 1) => {
    const total = current - diff;
    if (total < minCount) {
      if (!displayLoop) {
        return null;
      }

      return maxCount + 1 + total - minCount;
    }

    return total;
  };
  return prev;
};

const calculateGenerator = (next, prev) => {
  const calculate = (current, diff) => {
    if (diff === 0) {
      return current;
    }

    return diff > 0 ? next(current, diff) : prev(current, diff * -1);
  };
  return calculate;
};

const moveHandler = (
  selectNumber,
  current,
  setMoving,
  timer,
  endMoving,
  touchRef
) => {
  const move = (
    operator: (number, number) => number,
    animationStyle: AnimeType,
    isSkipAnimation: boolean,
    i: number = 1,
    j: number = i
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
      delta: [, y]
    }
  ] = useGesture();
  const diffY = Math.abs(y);
  const isLoop = minCount === 0;

  const itemHeight = height / 5;

  useEffect(() => {
    layoutRef.current.scrollTo(0, itemHeight * (preloadCount - 1));
    layoutRef.current.style.setProperty('--item-height', `${itemHeight}px`);

    return () => clearTimeout(timer.current);
  }, [itemHeight, preloadCount]);

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

  const next = nextGenerator(maxCount, isLoop, minCount);
  const prev = prevGenerator(minCount, isLoop, maxCount);
  const calculate = calculateGenerator(next, prev);

  const endMoving = () => {
    clearTimeout(timer.current);
    setMoving({});
  };

  const move = moveHandler(
    selectNumber,
    current,
    setMoving,
    timer,
    endMoving,
    touchRef
  );

  const operatorWithNoAnime = operator => () => {
    endMoving();
    operator();
  };

  const add = (count = 1, isSkipAnimation) =>
    move(next, styles.moveDown, isSkipAnimation, Math.round(count));
  const minus = (count = 1, isSkipAnimation) =>
    move(prev, styles.moveUp, isSkipAnimation, Math.round(count));

  const handleGesture = () => {
    const ratio = velocity < 1 ? 1 : velocity / 2;
    const isSkipAnimation = velocity < 0.2 && diffY > itemHeight;

    let movingCount = Math.abs((y / itemHeight) * ratio);

    if (isLoop) {
      movingCount = movingCount > maxCount ? maxCount - 1 / ratio : movingCount;
    }

    if (y > 0) {
      if (!isLoop && current + movingCount > maxCount) {
        movingCount = maxCount - current + 1;
      }

      add(movingCount, isSkipAnimation);
    } else {
      if (!isLoop && current - movingCount < minCount) {
        movingCount = current - minCount + 1;
      }
      minus(movingCount, isSkipAnimation);
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
      <Button icon={iconAdd} onClick={operatorWithNoAnime(add)} />
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
              value={calculate(current, diff)}
            />
          ))}
        </div>
      </div>
      <Button icon={iconMinus} onClick={operatorWithNoAnime(minus)} />
    </div>
  );
};

Picker.displayName = 'Picker';

export default Picker;

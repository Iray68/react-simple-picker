import {
  useRef,
  ComponentType,
  CSSProperties,
  MouseEventHandler,
  MutableRefObject,
  ReactElement
} from 'react';
import styles from './index.css';
import Button from './Button';
import { range } from 'lodash';
import Row from './Row';
import { DispatchMapProps, PickerState } from './index';
import {
  addGenerator,
  buildPositionCalculator,
  minusGenerator
} from './useCases/calculator';
import { handleGesture, MoveOperator } from './useCases/gesture';
import { useGestureEffect } from './hook/useGestureEffect';
import { SelectNumberOperator, TouchRef } from './useCases/move';
import { updateObject } from './util';

export interface MaskProps {
  className?: string;
  style?: CSSProperties;
}

const updateHeightWithStyle = (height: number, style?: CSSProperties) =>
  updateObject({ height: `${height}px` }, style);

const getMask = (itemHeight: number): ComponentType<MaskProps> => {
  const Mask = ({ className, style, ...others }: MaskProps) => (
    <div
      className={[styles.mask, className].join(' ')}
      {...others}
      style={updateHeightWithStyle(itemHeight, style)}
    />
  );

  Mask.displayName = 'Mask';

  return Mask;
};

export interface PickerProps {
  className?: string;
  style?: CSSProperties;
  scrollerBackground?: string;
  maxCount: number;
  preloadCount?: number;
  onChange?: (index: number) => void;
  height?: number;
  iconAdd?: ReactElement<HTMLElement>;
  iconMinus?: ReactElement<HTMLElement>;
  renderMask?: (
    Mask: ComponentType<MaskProps>
  ) => ReactElement<ComponentType<MaskProps>>;
}

interface InnerPickerProps extends PickerProps, PickerState, DispatchMapProps {
  minCount: number;
}

const Picker: ComponentType<InnerPickerProps> = ({
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
}: InnerPickerProps) => {
  if (!maxCount) {
    throw new Error('Please input maxCount parameter');
  }

  const layoutRef: MutableRefObject<null | HTMLDivElement> = useRef(null);
  const touchRef: TouchRef = useRef(false);

  const isLoop = minCount === 0;

  const itemHeight = height / 5;

  const selectNumber: SelectNumberOperator = n => {
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

  const initialLayout = (scrollTop: number, itemHeight: number) => {
    if (layoutRef.current) {
      layoutRef.current.scrollTop = scrollTop;
      layoutRef.current.style.setProperty('--item-height', `${itemHeight}px`);
    }
  };

  const [
    { bind, velocity, down, y, diffY },
    { endMoving, next, prev }
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

  const operateAndStopAnimation = (
    operator: MoveOperator
  ): MouseEventHandler<HTMLButtonElement> => () => {
    endMoving();
    operator();
  };

  if (down && !touchRef.current) {
    touchRef.current = true;
  }

  if (touchRef.current && !down) {
    if (y && diffY > itemHeight) {
      handleGesture(
        velocity,
        diffY,
        itemHeight,
        y,
        isLoop,
        maxCount,
        current,
        minCount
      ).then(countingResult => {
        const { movingCount, isSkipAnimation } = countingResult;

        const diff = Math.abs(movingCount);

        if (movingCount > 0) {
          next(diff, isSkipAnimation);
        } else {
          prev(diff, isSkipAnimation);
        }
      });
    }
    touchRef.current = false;
  }

  return (
    <div
      className={[styles.border, className].join(' ')}
      style={updateHeightWithStyle(height, style)}
    >
      <Button icon={iconAdd} onClick={operateAndStopAnimation(next)} />
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
                  ? `rotateX(${45 * (diff - y / itemHeight)}deg)`
                  : `rotateX(${45 * diff}deg)`
              }}
              key={diff}
              value={String(calculate(current, diff))}
            />
          ))}
        </div>
      </div>
      <Button icon={iconMinus} onClick={operateAndStopAnimation(prev)} />
    </div>
  );
};

Picker.displayName = 'Picker';

export default Picker;

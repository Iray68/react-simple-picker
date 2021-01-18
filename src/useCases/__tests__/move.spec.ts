import { initMoveHandler } from '../move';
import fn = jest.fn;
import clearAllTimers = jest.clearAllTimers;
import resetAllMocks = jest.resetAllMocks;
import restoreAllMocks = jest.restoreAllMocks;

jest.useFakeTimers();

describe('test move() from initMoveHandler()', () => {
  const selectNumber = fn();
  const setMoving = fn();
  const endMoving = fn();
  const operator = fn();
  const animationStyle = 'moveUp';

  const useRefSpy = { current: null };

  const move = initMoveHandler(
    selectNumber,
    0,
    setMoving,
    useRefSpy,
    endMoving
  );

  beforeEach(() => {
    resetAllMocks();
    restoreAllMocks();
    clearAllTimers();
  });

  it('should not be call timer while isSkipAnimation is true', () => {
    move(operator, animationStyle, 1, true);
    expect(operator).toBeCalledWith(0, 1);
    expect(selectNumber).toHaveBeenCalled();
    expect(setTimeout).toBeCalledTimes(0);
  });

  it('should be handled with timer while isSkipAnimation is true', () => {
    move(operator, animationStyle, 1);

    expect(setMoving).toBeCalledWith({ className: animationStyle, time: 75 });
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 75);
  });
});

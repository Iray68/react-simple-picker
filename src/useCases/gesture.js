// @flow
export type MoveOperatorType = (
  movingCount?: number,
  isSkipAnimation?: boolean
) => void;

export function initGestureHandler(
  velocity: number,
  diffY: number,
  itemHeight: number,
  y: number,
  isLoop: boolean,
  maxCount: number,
  current: number,
  minCount: number,
  next: MoveOperatorType,
  prev: MoveOperatorType
): () => void {
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

      next(movingCount, isSkipAnimation);
    } else {
      if (!isLoop && current - movingCount < minCount) {
        movingCount = current - minCount + 1;
      }
      prev(movingCount, isSkipAnimation);
    }
  };
  return handleGesture;
}

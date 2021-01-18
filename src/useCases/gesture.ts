export function handleGesture(
  velocity: number,
  diffY: number,
  itemHeight: number,
  y: number,
  isLoop: boolean,
  maxCount: number,
  current: number,
  minCount: number
): Promise<{ movingCount: number; isSkipAnimation: boolean }> {
  const ratio = velocity < 1 ? 1 : velocity / 2;
  const isMovingSlowly = velocity < 0.2 && diffY > itemHeight;

  let movingCount = Math.abs((y / itemHeight) * ratio);

  if (isLoop) {
    movingCount = movingCount > maxCount ? maxCount - 1 / ratio : movingCount;
  }

  if (y > 0) {
    if (!isLoop && current + movingCount > maxCount) {
      movingCount = maxCount - current + 1;
    }
  } else {
    if (!isLoop && current - movingCount < minCount) {
      movingCount = current - minCount + 1;
    }

    movingCount = movingCount * -1;
  }

  return Promise.resolve({ movingCount, isSkipAnimation: isMovingSlowly });
}

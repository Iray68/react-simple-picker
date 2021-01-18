import { handleGesture } from '../gesture';

describe('test handleGesture() while isLoop is false', () => {
  const y = 100;
  const itemHeight = 50;
  it('should move without the animation while velocity is less than 0.2 and diffY is greater than itemHeight', async () => {
    const velocity = 0.1;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      false,
      10,
      0,
      0
    );

    expect(result).toHaveProperty('isSkipAnimation', true);
  });

  it('should move with the animation while velocity is less than 0.2 and diffY is greater than itemHeight', async () => {
    const velocity = 0.5;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      false,
      10,
      0,
      0
    );

    expect(result).toHaveProperty('isSkipAnimation', false);
  });

  it('should move y / itemHeight * 1 while velocity is less than 1 and diffY is greater than itemHeight', async () => {
    const velocity = 0.5;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      false,
      10,
      0,
      0
    );

    expect(result).toHaveProperty('movingCount', y / itemHeight);
  });

  it('should move (y / itemHeight) * (velocity / 2) while velocity is greater than 1 and diffY is greater than itemHeight', async () => {
    const velocity = 2;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      false,
      10,
      0,
      0
    );

    expect(result).toHaveProperty(
      'movingCount',
      (y / itemHeight) * (velocity / 2)
    );
  });

  it('should go to max number + 1 while y > 0 and moveCount plus current is greater than max number', async () => {
    const velocity = 2;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      false,
      10,
      9,
      0
    );

    expect(result).toHaveProperty('movingCount', 2);
  });

  it('should go to min number - 1 while y < 0 and current minus moveCount is less than min number', async () => {
    const velocity = 4;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y * -1,
      false,
      10,
      0,
      0
    );

    expect(result).toHaveProperty('movingCount', -1);
  });
});

describe('test handleGesture() while isLoop is true', () => {
  const y = 100;
  const itemHeight = 50;
  const maxCount = 10;
  it('should go slower (movingCount = maxCount - 1 / (velocity / 2)) while movingCount is greater than max number', async () => {
    const velocity = 20;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      true,
      maxCount,
      9,
      0
    );

    expect(result).toHaveProperty('movingCount', maxCount - 1 / (velocity / 2));
  });

  it('should return normal movingCount although movingCount + current is greater than max number', async () => {
    const velocity = 2;
    const result = await handleGesture(
      velocity,
      100,
      itemHeight,
      y,
      true,
      maxCount,
      10,
      0
    );

    expect(result).toHaveProperty(
      'movingCount',
      (y / itemHeight) * (velocity / 2)
    );
  });
});

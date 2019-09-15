//@flow
import { render } from 'react-dom';
import Picker from '../dist/bundle';
import React from 'react';
import 'normalize.css';
import styles from './index.css';

const Text = ({ text, className }: { text: string, className?: string }) => (
  <div className={className}>{text}</div>
);
Text.displayName = 'Text';

const renderCustomMask = (className, style) => {
  const CustomMask = Mask => <Mask className={className} style={style} />;

  CustomMask.displayName = 'CustomMask';

  return CustomMask;
};

const MaskDateRender = renderCustomMask(styles.dateMask);

const handleChange = tag => number => console.log(tag, number);

render(
  <div className={styles.layout}>
    <Picker
      height={300}
      iconAdd={<Text text="+" />}
      iconMinus={<Text text="-" />}
      initCount={2019}
      minCount={1970}
      maxCount={2999}
      preloadCount={8}
      renderMask={MaskDateRender}
      onChange={handleChange('year')}
    />
    <Picker
      height={300}
      initCount={6}
      minCount={1}
      maxCount={12}
      preloadCount={8}
      renderMask={MaskDateRender}
      onChange={handleChange('month')}
    />
    <Picker
      height={300}
      initCount={6}
      minCount={1}
      maxCount={31}
      preloadCount={8}
      renderMask={MaskDateRender}
      onChange={handleChange('day')}
    />

    <Picker
      initCount={6}
      maxCount={23}
      preloadCount={8}
      onChange={handleChange('hour')}
    />
    <Picker
      initCount={6}
      maxCount={59}
      preloadCount={8}
      onChange={handleChange('minute')}
    />
    <Picker
      className={styles.customPicker}
      iconAdd={<Text className={styles.whiteButtonB} text="+" />}
      iconMinus={<Text className={styles.whiteButtonT} text="-" />}
      height={130}
      initCount={6}
      maxCount={59}
      preloadCount={8}
      renderMask={renderCustomMask(styles.gradientMask, {
        height: 'calc(60% - 2px)'
      })}
      onChange={handleChange('second')}
    />
  </div>,
  document.querySelector('#app')
);

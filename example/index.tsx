import { render } from 'react-dom';
import Picker, { MaskComponent } from '../dist/index';
import { CSSProperties } from 'react';
import 'normalize.css';
import styles from './index.css';

/*
// TODO: Fix missing Chunk file issue
const Picker = lazy(() =>
  import(/!* webpackChunkName: "Picker" *!/ '../dist/index')
);
*/

interface TextProps {
  text: string;
  className?: string;
}

const Text = ({ text, className }: TextProps) => (
  <div className={className}>{text}</div>
);
Text.displayName = 'Text';

const renderCustomMask = (className: string, style?: CSSProperties) => {
  const CustomMask = (Mask: MaskComponent) => (
    <Mask className={className} style={style} />
  );

  CustomMask.displayName = 'CustomMask';

  return CustomMask;
};

const MaskDateRender = renderCustomMask(styles.dateMask);

const handleChange = (tag: string) => (number: number) =>
  console.log(tag, number);

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
        height: 'calc(60% - 2px)',
        top: 'calc(20% + 1px)'
      })}
      onChange={handleChange('second')}
    />
  </div>,
  document.querySelector('#app')
);

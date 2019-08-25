//@flow
import { render } from 'react-dom';
import Picker from '../src/index';
import React from 'react';
import 'normalize.css';
import styles from './index.css';

// avoid ios bouncing
if (
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i)
) {
  document.ontouchmove = function(event: Event) {
    event.preventDefault();
  };
}

const IconAdd = props => <div {...props}>+</div>;
const IconMinus = props => <div {...props}>-</div>;

render(
  <div style={{ display: 'flex' }}>
    <Picker
      height={300}
      iconAdd={IconAdd}
      iconMinus={IconMinus}
      initCount={2019}
      minCount={1970}
      maxCount={2999}
      preloadCount={8}
      renderMask={Mask => <Mask className={styles.dateMask} />}
      onChange={number => console.log('year', number)}
    />
    <Picker
      height={300}
      initCount={6}
      minCount={1}
      maxCount={12}
      preloadCount={8}
      renderMask={Mask => <Mask className={styles.dateMask} />}
      onChange={number => console.log('month', number)}
    />
    <Picker
      height={300}
      initCount={6}
      minCount={1}
      maxCount={31}
      preloadCount={8}
      renderMask={Mask => <Mask className={styles.dateMask} />}
      onChange={number => console.log('day', number)}
    />

    <Picker
      initCount={6}
      maxCount={23}
      preloadCount={8}
      onChange={number => console.log('hour', number)}
    />
    <Picker
      initCount={6}
      maxCount={59}
      preloadCount={8}
      onChange={number => console.log('minute', number)}
    />
    <Picker
      style={{
        width: '40px',
        backgroundColor: '#4c4c4c'
      }}
      iconAdd={props => <IconAdd className={styles.whiteButtonB} />}
      iconMinus={props => <IconMinus className={styles.whiteButtonT} />}
      height={130}
      initCount={6}
      maxCount={59}
      preloadCount={8}
      renderMask={Mask => (
        <Mask
          className={styles.gradientMask}
          style={{
            height: 'calc(60% - 2px)'
          }}
        />
      )}
      onChange={number => console.log('second', number)}
    />
  </div>,
  document.querySelector('#app')
);

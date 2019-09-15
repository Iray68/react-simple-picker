//@flow
import React from 'react';
import styles from './index.css';

const Button = ({ icon, ...others }: { icon: HTMLElement }) => (
  <button className={styles.button} {...others}>
    {icon}
  </button>
);

Button.displayName = 'Button';

export default Button;

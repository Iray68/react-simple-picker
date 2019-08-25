//@flow
import React from 'react';
import styles from './index.css';

const Button = ({ icon: Icon, ...others }: { icon: ?Component }) => (
  <button className={styles.button} {...others}>
    <Icon />
  </button>
);

Button.displayName = 'Button';

export default Button;

//@flow
import React from 'react';
import styles from './index.css';
import type { Element, ComponentType } from 'react';

const Button = ({
  icon,
  ...others
}: {
  icon: Element<ComponentType<HTMLElement>>
}) => (
  <button className={styles.button} {...others}>
    {icon}
  </button>
);

Button.displayName = 'Button';

export default Button;

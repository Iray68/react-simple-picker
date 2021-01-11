import React, { ButtonHTMLAttributes, ComponentType } from 'react';
import styles from './index.css';
import { ReactElement } from 'react';

interface IconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<HTMLElement>;
}

const Button: ComponentType<IconButton> = ({ icon, ...others }: IconButton) => (
  <button className={styles.button} {...others}>
    {icon}
  </button>
);

Button.displayName = 'Button';

export default Button;

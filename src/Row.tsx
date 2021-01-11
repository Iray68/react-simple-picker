import { ComponentType, CSSProperties } from 'react';
import styles from './index.css';

interface RowProps {
  style?: CSSProperties;
  value?: string;
}

const Row: ComponentType<RowProps> = ({ style, value }: RowProps) => (
  <div className={styles.number} style={style}>
    {value}
  </div>
);

Row.displayName = 'Row';

export default Row;

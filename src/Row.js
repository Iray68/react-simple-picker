//@flow
import React from 'react';
import styles from './index.css';

type RowPropsType = { style: ?StyleSheet, value: ?string };

const Row = ({ style, value }: RowPropsType) => (
  <div className={styles.number} style={style}>
    {value}
  </div>
);

Row.displayName = 'Row';

export default Row;

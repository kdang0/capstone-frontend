// import React from 'react'
import styles from './Choice.module.css';

export const Choice = ({value} : {value : string}) => {
  return (
    <div>
      <div className={styles.panel}>
        <p>{value}</p>
      </div>
    </div>
  )
}

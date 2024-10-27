// import React from 'react'
import styles from './Choice.module.css';

interface ChoiceProps{
  onChoiceClicked : (choice : string) => void
  value: string,
  clicked: boolean
}

export const Choice = ({value, onChoiceClicked, clicked} : ChoiceProps) => {
  
  const handleClick = () => {
    onChoiceClicked(value);
  }
  
  return (
    <div className={`${styles.panel} ${clicked ? styles.clicked : ''}`} onClick={handleClick}>
        <p>{value}</p>
    </div>
  )
}

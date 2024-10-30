import styles from './StudentCard.module.css';

interface StudentClassProps {
    firstName: string,
    lastName: string
}

export const StudentCard = ({firstName, lastName} : StudentClassProps) => {
  return (
    <div className={`${styles.container}`}>
        <p>{firstName} {lastName}</p>    
    </div>
  )
}

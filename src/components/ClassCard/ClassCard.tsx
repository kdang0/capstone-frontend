import styles from './ClassCard.module.css';

interface ClassCardProps {
    name: string
}


export default function ClassCard({name} : ClassCardProps) {
  return (
    <div className={`${styles.container}`}>
        <p>{name}</p>    
    </div>
  )
}

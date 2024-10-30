import { Link } from "react-router-dom";
import styles from './AssignmentCard.module.css';
interface AssignmentCardProp {
  name: string;
  role: string;
  id: string;
  handleOnClick: (id: string, type:string) => void;
  classId: string;
}

export default function AssignmentCard({
  name,
  role,
  id,
  handleOnClick,
  classId
}: AssignmentCardProp) {


  return (
    <>
      {role == "tutor" ? (
        <div className={`${styles.container}`}>
          <div>
            <p>{name}</p>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <Link className={`${styles.button}`} to={`/assignment/edit/${id}`}>
              edit
            </Link>
            <button className={`${styles.button}`} onClick={() => handleOnClick(id, "delete")}>delete</button>
            <button className={`${styles.button}`} onClick={()=> handleOnClick(id, "publish")}>publish</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={`${styles.container}`}>
            <p className={`${styles.name}`}>{name}</p>
            <Link to={`/class/${classId}/assignment/${id}`} className={`${styles.button}`}>
                start
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

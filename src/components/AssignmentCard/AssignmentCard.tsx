import { Link } from "react-router-dom";
interface AssignmentCardProp {
  name: string;
  description: string;
  role: string;
  id: string;
  handleOnClick: (id: string) => void;
  classId: string;
}

export default function AssignmentCard({
  name,
  description,
  role,
  id,
  handleOnClick,
  classId
}: AssignmentCardProp) {

  const handleDelete = (assignmentId: string) => {
    handleOnClick(assignmentId);
  }
  return (
    <>
      {role == "tutor" ? (
        <div>
          <div>
            <p>{name}</p>
            <p>{description}</p>
          </div>
          <Link to={`/assignment/edit/${id}`}>
            <button>edit</button>
          </Link>
          <button onClick={() => handleDelete(id)}>delete</button>
        </div>
      ) : (
        <div>
          <div>
            <p>{name}</p>
            <p>{description}</p>
            <Link to={`/class/${classId}/assignment/${id}`}>
              <button>start</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

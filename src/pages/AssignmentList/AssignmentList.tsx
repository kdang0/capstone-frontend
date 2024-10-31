import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import AssignmentCard from  '../../components/AssignmentCard/AssignmentCard';
import { Link } from 'react-router-dom';
import styles from './AssignmentList.module.css';

axios.defaults.withCredentials = true;
interface Assignment{
  _id: string,
  name: string,
  description: string,
  classId: string
}

export const AssignmentList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const {user} = useAuth();
  useEffect(()=> {
    async function fetchAssignments(){
      if(user){
        const res = await axios.get(`http://localhost:4000/assignment/${user.role}/${user._id}`);
        const data = res.data;
        setAssignments(data);
      } 
    }
    fetchAssignments();
  }, [user]);

  const handleAssignment = async (assignmentId: string, type: string) => {
    if(type === "delete"){
      setAssignments((prevAssignment) => prevAssignment.filter((assignment) => assignment._id !== assignmentId)); 
      await axios.delete(`http://localhost:4000/assignment/${assignmentId}`);
    } else if(type==="publish"){
      await axios.post(`http://localhost:4000/assignment/access/${assignmentId}`);
    }
  }

  return (
    <div className='displayFlex flexColumn alignItemsCenter container gap10 padding15'>
      {
        user && user.role == 'tutor' ? 
        <Link to='/assignment/create'>
          <button className={`${styles.button}`}>create assignment</button>
        </Link>
         :
        <></>
      }
      {
        user ? 
        assignments.map((assignment) => <AssignmentCard key={assignment._id} name={assignment.name} role={user.role} id={assignment._id} handleOnClick={handleAssignment} classId={assignment.classId}/>) : <></>
      }
    </div>
  )
}

import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import AssignmentCard from  '../components/AssignmentCard/AssignmentCard';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;
interface Assignment{
  _id: string,
  name: string,
  description: string
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


  return (
    <div>
      {
        user && user.role == 'tutor' ? 
        <Link to='/assignment/create'>
          <button>create assignment</button>
        </Link>
         :
        <></>
      }
      {
        user ? 
        assignments.map((assignment) => <AssignmentCard key={assignment._id} name={assignment.name} description={assignment.description} role={user.role}/>) : <></>
      }
    </div>
  )
}

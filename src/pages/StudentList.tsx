import {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { StudentCard } from '../components/StudentCard/StudentCard';
axios.defaults.withCredentials = true;
//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
type Student = {
  firstName:string,
  lastName:string,
  _id: string
}

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    async function fetchStudents(){
      if(user){
        const res = await axios.get(`http://localhost:4000/user/students/${user._id}`);
        const data = res.data;
        setStudents(data);
      }
    }
    fetchStudents();
  }, [user]);

  return (
    <div className='displayFlex flexColumn alignItemsCenter container gap10 padding15'>
      {
        students.map((student) => <StudentCard key={student._id} firstName={student.firstName} lastName={student.lastName} />)
      }
    </div>
  )
}

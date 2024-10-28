import {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import ClassCard from '../components/ClassCard/ClassCard';
axios.defaults.withCredentials = true;

type Class = {
  _id:string,
  name:string
}


export const ClassList = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    async function fetchClasses(){
      if(user){
        const res = await axios.get(`http://localhost:4000/class/${user.role}/${user._id}`);
        const data = res.data;
        console.log(data);
        setClasses(data);
      }
    }
    fetchClasses();
  }, [user])
  return (
    <div>
      {
        classes.map((classInst) => <ClassCard key={classInst._id} name={classInst.name}/>)
      }
    </div>
  )
}

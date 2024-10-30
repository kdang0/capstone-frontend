import {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import ClassCard from '../components/ClassCard/ClassCard';
axios.defaults.withCredentials = true;

//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
type Class = {
  _id:string,
  name:string
}


export const ClassList = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const {user} = useAuth();
  //Fetches list of classes based on user
  useEffect(() => {
    async function fetchClasses(){
      if(user){
        const res = await axios.get(`http://localhost:4000/class/${user.role}/${user._id}`);
        const data = res.data;
        setClasses(data);
      }
    }
    fetchClasses();
  }, [user])
  return (
    <div className='displayFlex flexColumn alignItemsCenter container gap10 padding15'>
      {
        classes.map((classInst) => <ClassCard key={classInst._id} name={classInst.name}/>)
      }
    </div>
  )
}

import React from 'react'
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
export default function Navbar() {
  const {user, logout} = useAuth();
  if(user === undefined){
    return <>Loading</>
  }
  if(user === null){
    return <></>
  }
  const handleLogout = async () => {
    await axios.delete(`http://localhost:4000/logout`);
    logout();    
}

  return (
    <div className={`${styles.container}`}>
        {
            user.role == 'tutor' ? 
            <>
                <Link to={`/class`}>Class</Link>
                <Link to={`/assignment`}>Assignment</Link>
                <Link to={`/student`}>Student</Link>
                <button onClick={handleLogout}>Logout</button>
            </> 
            :
            <>
                <Link to={`/class`}>Class</Link>
                <Link to={`/assignment`}>Assignment</Link>
                <button onClick={handleLogout}>Logout</button>
            </>
        }

    </div>
  )
}

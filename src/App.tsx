import { useEffect, useState } from 'react'
import {Assignment} from './pages/Assignment/Assignment';
import { getAssignment } from './services/dac-api';
type Assignment = { 
  questions: Question[],
  description: string,
  name: string
}

type Question = {
  _id: string,
  problem: string,
  choices: string[]
}

function App() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  const updateAssignment = async () => {
    const assignment : Assignment = await getAssignment();
    setAssignment(assignment);
  }

  useEffect(() => {
    updateAssignment();
  }, []);

  return (
    <>
      <h1>Capstone</h1>
      {
        assignment ?
        <Assignment questions={assignment.questions} description={assignment.description} name={assignment.name}/> 
        :
        <></>
      }
    </>
  )
}

export default App

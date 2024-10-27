import {useState, useEffect} from 'react'
import {Question} from '../components/Question/Question';
import { getAssignment } from '../services/dac-api';
import {useParams} from 'react-router-dom';

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
export const Assignment = () => {
  const params = useParams();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answerChoices, setAnswerChoices] = useState({});
  const updateAssignment = async () => {
    const assignment : Assignment = await getAssignment(params.toString());
    setAssignment(assignment);
  }

  useEffect(() => {
    updateAssignment();
  }, []);

  const handleSelection = (questionId : string, choice : string) => {
      setAnswerChoices((prevSelection) => ({...prevSelection, [questionId] : choice}))
  }
  return (
    <>
        {
            assignment ? 
            <form>
                <h1>{assignment.name}</h1>
                <p>{assignment.description}</p>
                {
                    assignment.questions.map((question) => <Question key={question._id} problem={question.problem} choices={question.choices} handleSelect={handleSelection} id={question._id}/>)
                }
                <button>Submit</button>
            </form> : <>Loading...</>

        }
    
    </>
  )
}

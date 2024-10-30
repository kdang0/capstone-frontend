import { useState, useEffect} from "react";
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import AssignmentForm from "../components/AssignmentForm/AssignmentForm";
import { useNavigate, useParams } from "react-router-dom";

type Assignment = {
    name: string;
    description: string;
    totalPoints: number;
    classId: string;
    questions: Question[];
  };
  
  type Question = {
    problem: string;
    answer: string;
    choices: string[];
    questionId?: string;
  };
  
  type Class = {
      name: string,
      _id: string
  }

export const AssignmentEdit = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [assignment, setAssignment] = useState<Assignment>({
        name: '',
        description: '',
        totalPoints: 0,
        classId: '',
        questions: []
    });

    const {user} = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchAssignment(){
            const res = await axios.get(`http://localhost:4000/assignment/${params.id}`);
            const data : Assignment = res.data;
            data.questions.forEach((question) => {
                question['questionId'] = crypto.randomUUID();
            })
            setAssignment(data);
        }
        fetchAssignment();
    }, [params.id]);

    useEffect(() => {
        async function fetchClasses(){
            if(user){
                const res = await axios.get(`http://localhost:4000/class/tutor/${user._id}`);
                const data = res.data;
                setClasses(data);
                setAssignment((prevAssignment) => ({...prevAssignment, classId: data[0]._id}));
            }
        }
        fetchClasses();
    }, [user]);

    const updateAssignment = async (assignmentItem : Assignment) => {
        if(user){
            await axios.patch(`http://localhost:4000/assignment/${params.id}`, assignmentItem);
        }
        navigate('/assignment');
    }

    return (
    <div className="displayFlex flexColumn alignItemsCenter container">
        <h1>Edit Assignment</h1>
        <AssignmentForm assignmentItem={assignment} classes={classes} createAssignment={updateAssignment} formType="edit"/>
    </div>
  )
}

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AssignmentForm from "../components/AssignmentForm/AssignmentForm";


//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
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
  name: string;
  _id: string;
};

export const AssignmentCreate = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignment, setAssignment] = useState<Assignment>({
    name: "",
    description: "",
    totalPoints: 0,
    classId: "",
    questions: [],
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchClasses() {
      if (user) {
        const res = await axios.get(
          `http://localhost:4000/class/tutor/${user._id}`
        );
        const data = res.data;
        setClasses(data);
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          classId: data[0]._id,
        }));
      }
    }
    fetchClasses();
  }, [user]);

  const addButton = () => {
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      questions: [
        ...assignment["questions"],
        {
          problem: "",
          answer: "",
          choices: ["", "", "", ""],
          questionId: crypto.randomUUID(),
        },
      ],
    }));
  };

  const createAssignment = async (assignmentItem: Assignment) => {
    if (user) {
      await axios.post(
        `http://localhost:4000/assignment?userId=${user._id}`,
        assignmentItem
      );
    }
    navigate("/assignment");
  };

  return (
    <div>
      <button onClick={addButton}>add question</button>
      <AssignmentForm
        assignmentItem={assignment}
        classes={classes}
        createAssignment={createAssignment}
        formType="create"
      />
    </div>
  );
};

import { useState, useEffect } from "react";
import { Question } from "../../components/Question/Question";
import { getAssignment } from "../../services/dac-api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Assignment.module.css";

//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
type Assignment = {
  questions: Question[];
  description: string;
  name: string;
};

type Question = {
  _id: string;
  problem: string;
  choices: string[];
};

export const Assignment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = useParams();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answerChoices, setAnswerChoices] = useState<Record<string, unknown>>(
    {}
  );

  useEffect(() => {
    const updateAssignment = async () => {
      if (params.assignmentId) {
        const assignment: Assignment = await getAssignment(params.assignmentId);
        setAssignment(assignment);
      }
    };
    updateAssignment();
  }, [params.assignmentId]);

  const handleSelection = (questionId: string, choice: string) => {
    setAnswerChoices((prevSelection) => ({
      ...prevSelection,
      [questionId]: choice,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answers = [];
    const submission: Record<string, unknown> = {};
    for (const answerChoice in answerChoices) {
      const refAnswer = {
        questionId: answerChoice,
        answer: answerChoices[answerChoice],
      };
      answers.push(refAnswer);
    }
    submission["answers"] = answers;
    submission["classId"] = params.classId;
    submission["assignmentId"] = params.assignmentId;
    if (user) submission["id"] = user._id;
    const res = await axios.patch(
      `http://localhost:4000/assignment/submit`,
      submission
    );
    if (res.status === 201) {
      navigate("/assignment");
    }
  };
  return (
    <>
      {assignment ? (
        <div className={`${styles.container}`}>
          <form onSubmit={handleSubmit}>
            <h1>{assignment.name}</h1>
            <p>{assignment.description}</p>
            <div>
              {assignment.questions.map((question) => (
                <Question
                  key={question._id}
                  problem={question.problem}
                  choices={question.choices}
                  handleSelect={handleSelection}
                  id={question._id}
                />
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

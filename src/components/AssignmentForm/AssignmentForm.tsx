import { useState, useEffect } from "react";
import { QuestionForm } from "../QuestionForm/QuestionForm";

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

interface AssignmentFormProps {
  assignmentItem: Assignment;
  classes: Class[];
  createAssignment: (assignment: Assignment) => void;
  formType: string;
}
export default function AssignmentForm({
  assignmentItem,
  classes,
  createAssignment,
  formType,
}: AssignmentFormProps) {
  const [assignment, setAssignment] = useState<Assignment>(assignmentItem);

  useEffect(() => {
    if (formType === "create") {
      setAssignment((prevAssignment) => ({
        ...prevAssignment,
        questions: assignmentItem.questions,
        classId: assignmentItem.classId,
      }));
    } else if (formType === "edit") {
      setAssignment(assignmentItem);
    }
  }, [assignmentItem, formType]);

  const modifyAssignment = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };
  const modifyQuestion = (
    name: string,
    value: string,
    id?: string,
    choiceNumber?: number
  ) => {
    if (typeof choiceNumber === "number" && choiceNumber >= 0) {
      const updatedQuestion = assignment.questions.find(
        (question) => id === question.questionId
      );
      if (name == "choices" && updatedQuestion) {
        updatedQuestion[name].splice(choiceNumber, 1, value);

        const updatedQuestions = assignment.questions.map((question) =>
          question.questionId === id ? updatedQuestion : question
        );
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          questions: updatedQuestions,
        }));
      }
    } else {
      const updatedQuestions = assignment.questions.map((question) =>
        question.questionId === id ? { ...question, [name]: value } : question
      );
      setAssignment((prevAssignment) => ({
        ...prevAssignment,
        questions: updatedQuestions,
      }));
    }
  };

  //SENDS BACK UPDATED ASSIGNMENT STATE TO PARENT COMPONENT ON SUBMISSION
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedQuestions = assignment.questions.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ questionId, ...question }) => question
    );
    const updatedAssignment = { ...assignment, questions: updatedQuestions };
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      questions: updatedQuestions,
    }));
    createAssignment(updatedAssignment);
  };

  return (
    <form onSubmit={handleSubmit} className="displayFlex flexColumn">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={assignment.name}
          onChange={modifyAssignment}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={assignment.description}
          onChange={modifyAssignment}
        />
      </div>
      <div>
        <label>Total Points:</label>
        <input
          type="number"
          inputMode="numeric"
          value={assignment.totalPoints}
          name="totalPoints"
          onChange={modifyAssignment}
        />
      </div>
      <div>
        <label>Select Class</label>
        <select name="classId" onChange={modifyAssignment}>
          {classes.map((classInst) => (
            <option key={classInst._id} value={classInst._id}>
              {classInst.name}
            </option>
          ))}
        </select>
      </div>

      {assignment.questions.map((question) => (
        <QuestionForm
          key={question.questionId}
          id={question.questionId}
          passQuestionData={modifyQuestion}
          questionItem={question}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

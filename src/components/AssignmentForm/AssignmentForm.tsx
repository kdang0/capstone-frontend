import { useState, useEffect } from "react";
import { QuestionForm } from "../QuestionForm/QuestionForm";
import styles from './AssignmentForm.module.css';


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
    //Operation is different depending on formType modularized into CREATE and EDIT
    if (formType === "create") {
      /** 
       * If the passed down assignment has at least one question then
       * tack the most recently added question to this component's assignment useState so this question form has its own unique ID
       * You see how convoluted this sounds... 
       * */ 
      if(assignmentItem.questions.length > 0){
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          questions: [...prevAssignment.questions, assignmentItem.questions[assignmentItem.questions.length-1]],
          classId: assignmentItem.classId,
        }));
      }
    } else if (formType === "edit") {
      setAssignment(assignmentItem);
    }
  }, [assignmentItem, formType]);


  //Modify any input form other than questions
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


  /**
   * 
   * @param name Name of the input (e.target.name)
   * @param value Value of the input (e.target.value)
   * @param id ID of the question
   * @param choiceNumber  ID for choice 
   */
  const modifyQuestion = (
    name: string,
    value: string,
    id?: string,
    choiceNumber?: number
  ) => {
    //If the choiceNumber is present and is a valid number modify the choices
    if (typeof choiceNumber === "number" && choiceNumber >= 0) {
      //Find the question associated with the given id
      const updatedQuestion = assignment.questions.find(
        (question) => id === question.questionId
      );
      /**
       * If the name is choices and the question with the associated ID is found 
       * then replace the current value of choice with the new one
       */
      if (name == "choices" && updatedQuestion) {
        /** 
         * Splice => takes the index of the desired choice to replace using the ID
                  => we want to replace one instance of it
                  => the value we want to use to replace the current value of choice
         * */ 
        updatedQuestion[name].splice(choiceNumber, 1, value);

        /**
         * Make a copy of questions array with the updated changes we did with choices
         */
        const updatedQuestions = assignment.questions.map((question) =>
          question.questionId === id ? updatedQuestion : question
        );
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          questions: updatedQuestions,
        }));
      }
    } else {
      //Just modify the inputs of question form that are not choices
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
    <form onSubmit={handleSubmit} className={`displayFlex flexColumn`}>
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
        <label>Select Class:</label>
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
      <div className={`${styles.container}`}>
        <button type="submit">{formType === "edit" ? 'Save' : 'Create'}</button>
      </div>
    </form>
  );
}

import React from 'react'


//REMINDER TO STORE THESE TYPES AND INTERFACES IN ANOTHER FILE TO REDUCE REDUNDANCY
interface QuestionFormProps{
    passQuestionData: (name: string, value: string, id?: string, choiceId?: number) => void;
    id?: string;
    questionItem: Question;
}

type Question = {
  problem:string,
  answer: string,
  choices: string[]
}


export const QuestionForm = ({passQuestionData, id, questionItem} : QuestionFormProps) => {
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    passQuestionData(name,value,id);
  }

  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>, choiceId:number) => {
    const {value, name} = e.target;
    passQuestionData(name,value,id, choiceId);
  }

  /**
   * 
   */
  return (
    <div>
        <label>Problem: </label>
        <input type="text" name='problem' value={questionItem.problem} onChange={handleChange}/>
        <label>Answer: </label>
        <input type="text" name='answer' value={questionItem.answer} onChange={handleChange}/>
        <label>Choices: </label>
        <input type="text" name="choices" value={questionItem.choices[0]} onChange={(e) => handleChoice(e,0)}/>
        <input type="text" name="choices" value={questionItem.choices[1]} onChange={(e) => handleChoice(e,1)}/>
        <input type="text" name="choices" value={questionItem.choices[2]} onChange={(e) => handleChoice(e,2)}/>
        <input type="text" name="choices" value={questionItem.choices[3]} onChange={(e) => handleChoice(e,3)}/>
    </div>
  )
}

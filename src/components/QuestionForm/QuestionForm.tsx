import React from 'react'

interface QuestionFormProps{
    passQuestionData: (name: string, value: string, id?: string, choiceId?: number) => void;
    id?: string;
}


export const QuestionForm = ({passQuestionData, id} : QuestionFormProps) => {
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    passQuestionData(name,value,id);
  }

  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>, choiceId:number) => {
    const {value, name} = e.target;
    passQuestionData(name,value,id, choiceId);
  }
  return (
    <div>
        <input type="text" name='problem' onChange={handleChange}/>
        <input type="text" name='answer' onChange={handleChange}/>
        <input type="text" name="choices" onChange={(e) => handleChoice(e,0)}/>
        <input type="text" name="choices" onChange={(e) => handleChoice(e,1)}/>
        <input type="text" name="choices" onChange={(e) => handleChoice(e,2)}/>
        <input type="text" name="choices" onChange={(e) => handleChoice(e,3)}/>
    </div>
  )
}

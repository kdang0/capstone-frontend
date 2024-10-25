import React from 'react';
import {Choice} from '../Choice/Choice';
interface QuestionProps{
    problem : string;
    choices: string[];
}

export const Question = ({problem, choices} : QuestionProps) => {
  return (
    <div>
        <h1>{problem}</h1>
        {
            choices.map((choice, i) => <Choice key={i} value={choice}/>)
        }
    </div>
  )
}

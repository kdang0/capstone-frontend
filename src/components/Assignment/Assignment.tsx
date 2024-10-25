import React from 'react'
import {Question} from '../Question/Question';


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
export const Assignment = ({questions, description, name} : Assignment) => {
  return (
    <form>
        <h1>{name}</h1>
        <p>{description}</p>
        {
            questions.map((question) => <Question key={question._id} problem={question.problem} choices={question.choices}/>)
        }
    </form>
  )
}

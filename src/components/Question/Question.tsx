import {useState} from 'react';
import {Choice} from '../Choice/Choice';
interface QuestionProps{
    problem : string;
    choices: string[];
    id: string;
    handleSelect: (questionId: string, choice: string) => void
}

export const Question = ({problem, choices, handleSelect, id} : QuestionProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string|null>(null);
  const handleChoiceClick = (choice: string) => {
    handleSelect(id, choice);
    setSelectedChoice(choice);
  }
  return (
    <div>
        <h1>{problem}</h1>
        {
            choices.map((choice) => <Choice key={choice} value={choice} onChoiceClicked={handleChoiceClick} clicked={selectedChoice === choice}/>)
        }
    </div>
  )
}

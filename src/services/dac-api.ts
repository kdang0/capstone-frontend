
interface Assignment {
    tutorId: string, 
    questions: {
        _id: string,
        problem: string
        answer: string,
        choices: string[]
    } [],
    dueDate: string,
    classId: string,
    name: string,
    description: string,
    totalPoints: number
}



const url = `http://localhost:4000`;

export const getAssignment = async (id : string) : Promise<Assignment> => {
    const res = await fetch(`${url}/assignment/${id}`);
    const data : Assignment = await res.json();
    console.log(data);
    return data;
}


import React from "react";

interface AssignmentCardProp {
  name: string;
  description: string;
  role: string;
}

export default function AssignmentCard({
  name,
  description,
  role,
}: AssignmentCardProp) {
  return (
    <>
      {role == "tutor" ? (
        <div>
          <div>
            <p>{name}</p>
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p>{name}</p>
            <p>{description}</p>
          </div>
        </div>
      )}
    </>
  );
}

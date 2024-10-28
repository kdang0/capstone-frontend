import React from 'react'

interface ClassCardProps {
    name: string
}


export default function ClassCard({name} : ClassCardProps) {
  return (
    <>
        <p>{name}</p>    
    </>
  )
}

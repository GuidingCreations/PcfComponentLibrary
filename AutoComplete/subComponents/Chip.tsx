import React from 'react'

export interface chipProps {
  label: any
}

const Chip = (props : chipProps) => {
  return (
    <div className='bg-blue-700 text-white border border-solid rounded-md p-1'>{props.label}</div>
  )
}

export default Chip
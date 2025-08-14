/* eslint-disable */

import React from 'react'
import { ThemeProvider } from '@mui/material'
import { iconProps } from '../types'

const Icon = (props: iconProps) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 -960 960 960" 
        style={{width: "24px", height:'24px'}}>
            <path d={props.d} fill={props.fill}/>
    </svg>
  )
}

export default Icon
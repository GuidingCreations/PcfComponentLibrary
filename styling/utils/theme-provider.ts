import * as React from 'react'
import { createTheme } from '@mui/material/styles';
import colorSchemes from '../color-schemes'
import { Config } from '../types/types'



const generateTheme = (props: Config) => {


  const theme = createTheme(colorSchemes(props))

  return theme

}

export default generateTheme
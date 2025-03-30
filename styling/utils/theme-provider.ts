import * as React from 'react'
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import colorSchemes from '../color-schemes'
import { PrimaryColor, Mode, Config } from '../types/types'
import { primaryColorNames } from '../colors';
import { useState } from 'react';


const generateTheme = (props: Config) => {


  const theme = createTheme(colorSchemes(props))

  return theme

}

export default generateTheme
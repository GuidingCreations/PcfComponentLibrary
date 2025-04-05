/* eslint-disable */

import * as React from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';
import { CssBaseline } from '@mui/material';

export interface TextFieldProps {
  onChangeText: (newText: string) => void
}

const TextFieldComponent = (props: TextFieldProps) => {

  
  const config : Config = {
    Mode: 'dark',
    primaryColor: 'Orange' as PrimaryColor
  }
  
  const theme = generateTheme(config)
  const styles  = {
    "--focusedBorderColor": theme.palette.primary.main
  } as  React.CSSProperties

  return (
    
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    
    <TextField id='textFieldMui' type='text' style={styles} ></TextField>

    </ThemeProvider>
  )
}

export default TextFieldComponent
/* eslint-disable */

import * as React from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';
import { CssBaseline } from '@mui/material';

export interface TextFieldProps {
  onChangeText: (newText: string) => void,
  primaryColor: string;
  useDarkMode: boolean;
  labelText: string;
  isMultiline: boolean;
  height: number;
  width: number;
}

const TextFieldComponent = (props: TextFieldProps) => {

  
  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  }
  
  const theme = generateTheme(config)
  const styles  = {
    "--focusedBorderColor": theme.palette.primary.main,
    "--marginBottom": props.isMultiline ? 'auto' : 0,
    height: '100%',
    width: '100%',
    marginBottom: props.isMultiline ? 'auto' : 0
  } as  React.CSSProperties

  return (
    <div style={{height: `${props.height}px`, width: `${props.width}px`}}>

    <ThemeProvider theme={theme}>
    <CssBaseline/>
    
    <TextField multiline id='textFieldMui' type='text' style={styles} label={props.labelText} variant='outlined' onChange={(e) => props.onChangeText(e.target.value)}></TextField>

    </ThemeProvider>
    </div>
  )
}

export default TextFieldComponent
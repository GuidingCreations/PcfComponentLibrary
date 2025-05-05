/* eslint-disable */

import * as React from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';
import { CssBaseline } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export interface TextFieldProps {
  onChangeText: (newText: string, outputHeight: number) => void,
  primaryColor: string;
  useDarkMode: boolean;
  labelText: string;
  isMultiline: boolean;
  height: number;
  width: number;
  defaultText: string;
}

const TextFieldComponent = (props: TextFieldProps) => {

  
  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  };

  const defaultValue = useRef(props.defaultText || '');
  const [textValue, setTextValue] = useState(defaultValue.current);
  const rootRef = useRef<any>()

  if (props.defaultText != defaultValue.current) {
      defaultValue.current = props.defaultText;
      setTextValue(defaultValue.current);
  }

  useEffect(() => {

    const outputHeight = rootRef.current.getBoundingClientRect().height
    props.onChangeText(textValue, outputHeight)
  }, [textValue])
  
  
  const theme = generateTheme(config)
  const styles  = {
    "--focusedBorderColor": theme.palette.primary.main,
    "--marginBottom": props.isMultiline ? 'auto' : 0,
    width: '100%',
    marginBottom: props.isMultiline ? 'auto' : 0
  } as  React.CSSProperties

  return (
    <div style={{height: `${props.height}px`, width: `${props.width}px`}}>

    <ThemeProvider theme={theme}>
    <CssBaseline/>
    
    <TextField ref = {rootRef} multiline id='textFieldMui' value = {textValue} type='text' style={styles} label={props.labelText} variant='outlined' onChange={(e) => setTextValue(e.target.value)}></TextField>

    </ThemeProvider>
    </div>
  )
}

export default TextFieldComponent
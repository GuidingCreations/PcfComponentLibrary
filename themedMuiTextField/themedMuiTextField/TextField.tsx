/* eslint-disable */

import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface TextFieldProps {
  onChangeText: (newText: string, outputHeight: number) => void,
  primaryColor: string;
  useDarkMode: boolean;
  labelText: string;
  isMultiline: boolean;
  height: number;
  width: number;
  defaultText: string;
  onChangeHeight: (newHeight: number) => void
}

const TextFieldComponent = memo(function (props: TextFieldProps)  {

  
  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  };

  const defaultValue = useRef(props.defaultText || '');
  const [textValue, setTextValue] = useState(defaultValue.current); 
  const rootRef = useRef<any>(null)

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
    marginBottom: props.isMultiline ? 'auto' : 0,
    height: props.isMultiline ? 'fit-content' : props.height
  } as  React.CSSProperties


  useResizeObserver(rootRef, (entry) => {
    console.log("RECT", entry.contentRect.height);
    props.onChangeHeight(entry.contentRect.height)
  })




  return (
    <div style={{height: props.isMultiline ? 'fit-content' : props.height, width: `${props.width}px`}} ref = {rootRef}>

    <ThemeProvider theme={theme}>
    
    <TextField  multiline = {props.isMultiline} id='textFieldMui' value = {textValue} type='text' style={styles} label={props.labelText} variant='outlined' onChange={(e) => {console.log("CHANGING TO: ", e.target.value); setTextValue(e.target.value)}}></TextField>

    </ThemeProvider>
    </div>
  )
})

export default TextFieldComponent
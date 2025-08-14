/* eslint-disable */


import * as React from 'react'
import Button from "@mui/material/Button"
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import { ThemeProvider } from '@mui/material';
import { memo } from 'react';

export interface buttonProps {
  
  PrimaryColor: string;
  useDarkMode: boolean;
  onClick: () => void;
  labelText: string;
  variantType: string;
  isDisabled: boolean;
  startIconColor?: string |  null;
  endIconColor?: string | null;
  startIcon?: string | null;
  endIcon?: string | null;
  containerHeight: number | null;
  containerWidth: number | null
}

const ButtonComponent = memo(function (props : buttonProps) {
  
const themeConfig: Config = {Mode: props.useDarkMode ? 'dark' : 'light', primaryColor: props.PrimaryColor as PrimaryColor};
const theme = generateTheme(themeConfig)

const renderStartIcon = (iconSvg: string) => {
  return <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill= {props.startIconColor ?? 'white'} style={{minWidth: '16px', width: "24px"}}><path d={iconSvg} fill={props.startIconColor ?? 'white'}/></svg>
}

const renderEndIcon = (iconSvg: string) => {
  return <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill= {props.endIconColor ?? 'white'} style={{minWidth: '16px', width: "24px"}}><path d={iconSvg} fill={props.endIconColor ?? 'white'}/></svg>
}

  return (

    <div style={{width: `${props.containerWidth}px`, height: `${props.containerHeight}px`}}>

    <ThemeProvider theme = {theme}>
      
      <Button startIcon = {props.startIcon ? renderStartIcon(props.startIcon) : null} endIcon = {props.endIcon ? renderEndIcon(props.endIcon) : null} disabled = {props.isDisabled} onClick={(e) => props.onClick()} variant = {props.variantType.toLowerCase() == 'contained' ? 'contained' : props.variantType.toLowerCase() == 'outlined' ? 'outlined' : props.variantType.toLowerCase() == 'text' ? 'text' : 'contained'} sx={{width: '100%', height: '100%'}}>
       
        {props.labelText}
      
      </Button>
      
    </ThemeProvider>
    
    </div>
  
)
})

export default ButtonComponent
import * as React from 'react'
import Button from "@mui/material/Button"
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import { ThemeProvider } from '@mui/material';

export interface buttonProps {
  componentHeight: number;
  componentWidth: number;
  PrimaryColor: string;
  useDarkMode: boolean;
  onClick: () => void;
  labelText: string;
  variantType: string;
}

const ButtonComponent = (props : buttonProps) => {
  
const themeConfig: Config = {Mode: props.useDarkMode ? 'dark' : 'light', primaryColor: props.PrimaryColor as PrimaryColor};
const theme = generateTheme(themeConfig)


  return (

    <div style={{width: props.componentWidth, height: props.componentHeight}}>

    <ThemeProvider theme = {theme}>
      
      <Button onClick={(e) => props.onClick()} variant = {props.variantType == 'contained' ? 'contained' : props.variantType == 'outlined' ? 'outlined' : props.variantType == 'text' ? 'text' : 'contained'} sx={{width: props.componentWidth, height: props.componentHeight}}>
       
        {props.labelText}
      
      </Button>
      
    </ThemeProvider>
    
    </div>
  
)
}

export default ButtonComponent
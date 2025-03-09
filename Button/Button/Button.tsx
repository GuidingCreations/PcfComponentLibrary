/* eslint-disable */


import * as React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Link} from "@mui/material";
import Icon from '@mui/material/Icon'
import  {determineScreenSize} from '../../utils'

export interface ButtonProps {
  ButtonText: string;
  useDarkMode: boolean;
  size: string;
  typeVariant: string;
  onClick: () => void;
  width?: number;
  height?: number;
  isDisabled: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontColor?: string;
  borderWidth?: number;
  textAlign?: string;
  className?: string;
  styles?: any
  startIcon?: string;
  endIcon?: string;
}

export default function ButtonComponent(props: ButtonProps) {
  
  console.log("PROPS PASSED: ", props)
  const screenSize = determineScreenSize()

  const theme = createTheme({
    palette: {
      mode: props.useDarkMode ? "dark" : "light" ,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: props.backgroundColor,
            color: props.fontColor,
            borderColor: props.borderColor,
            borderWidth: `${props.borderWidth}px`,
            borderStyle: 'solid',
            justifyContent: props.textAlign == 'left' ? 'flex-start' : props.textAlign == 'right' ? 'flex-end' : 'center'
          }
        }
      }
    }
  });

  const renderStartIcon = () => { return (  <Icon sx={{height: screenSize == "xl"? '500px' : '10px'}}>{props.startIcon}</Icon>)}
  const renderEndIcon = () => { return (<Icon>{props.endIcon}</Icon>)}

  const buttonSize = props.size == "small" ? "small" : props.size == "medium" ? "medium" : props.size == "large" ? "large" : "small"
  const buttonVariant = props.typeVariant == "contained" ? "contained" : props.typeVariant == "outlined" ? "outlined" : "contained"
  const styles = Object.assign({}, {width: `${props.width}px`, height: `${props.height}px`}, props.styles)
  return (

    
    <ThemeProvider theme={theme}>
      
      <link rel="stylesheet"   href="https://fonts.googleapis.com/icon?family=Material+Icons">
      </link>

      <CssBaseline />
      <h1>{screenSize}</h1>
      {renderStartIcon()}
      <Button 
       
        startIcon = {props.startIcon ?  renderStartIcon() : null}
        endIcon = {props.endIcon ?  renderEndIcon() : null}
        disabled = {props.isDisabled} 
        className={`${props.className}`}
        style={styles}  
        onClick={() => {console.log("BUTTON CLICKED"); props.onClick()}} 
        size = {  buttonSize }  
        variant = {buttonVariant}> 
        {props.ButtonText} 
      </Button>
    </ThemeProvider>

  );
}

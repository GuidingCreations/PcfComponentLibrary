import * as React from "react";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export interface ButtonProps {
  ButtonText: string;
  useDarkMode: boolean;
  size: string;
  typeVariant: string;
  onClick: () => void;
  width: number;
  height: number;
  isDisabled: boolean;
}

export default function ButtonComponent(props: ButtonProps) {
  
  console.log("PROPS PASSED: ", props)

  const theme = createTheme({
    palette: {
      mode: props.useDarkMode ? "dark" : "light" ,
    },
  });

  const buttonSize = props.size == "small" ? "small" : props.size == "medium" ? "medium" : props.size == "large" ? "large" : "small"
  const buttonVariant = props.typeVariant == "contained" ? "contained" : props.typeVariant == "outlined" ? "outlined" : "contained"

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Button disabled = {props.isDisabled} style={{width: `${props.width}px`, height: `${props.height}px`}} onClick={props.onClick} size = {  buttonSize }  variant = {buttonVariant}> {props.ButtonText} </Button>
    </ThemeProvider>
  );
}

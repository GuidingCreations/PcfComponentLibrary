/* eslint-disable */

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../styling/types/types';

import {
  ThemeProvider,
  Typography,
} from "@mui/material";

export interface StepType {
  stepTitle: string;
  isOptional?: boolean;
  recordID?: string
  [key: string]: unknown;
  [key: number]: unknown;
  
}

export interface StepperHeaderProps {
  Steps: StepType[];
  activeStepIndex: number;
  height: number;
  width: number;
  useDarkMode: boolean;
  primaryColor: string;
  updateSelectedStep: (newStep: any) => void
}

const StepperHeaderComponent = (props: StepperHeaderProps) => {

  const isStepOptional = (step: number) => {
    const isOptional = props.Steps[step].isOptional;
    return isOptional;
  };

    const config : Config = {
      Mode: props.useDarkMode ? 'dark' : 'light',
      primaryColor: props.primaryColor as PrimaryColor
    }
  
      const theme = generateTheme(config);

      const [activeStep, setActiveStep] = React.useState(0);

      React.useEffect(() => {
        if (props.Steps[activeStep]?.recordID) {
          props.updateSelectedStep(props.Steps[activeStep])
        }
      }, [activeStep])
   
      if (props.activeStepIndex != activeStep) {
      
        setActiveStep(props.activeStepIndex)
      }

  return (

    <ThemeProvider theme={theme}>
      <Box sx={{width: '100%'}}>

   
        <Stepper activeStep={props.activeStepIndex}>
          {props.Steps.map((step: any, index) => {

            const labelProps: {
              optional?: React.ReactNode;
              
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }

            return (
              <Step key={step.stepTitle}>
                <StepLabel {...labelProps}>{step.stepTitle}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        

      </Box>
    </ThemeProvider>
  );
};

export default StepperHeaderComponent;

/* eslint-disable */

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

export interface StepperHeaderProps {
  Steps: any[];
  activeStepIndex: number;
}

const StepperHeaderComponent = (props: StepperHeaderProps) => {
  console.log("StepperHeader received props: ", props);

  const isStepOptional = (step: number) => {
    const isOptional = props.Steps[step].isOptional;
    return isOptional;
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
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

 /* eslint-disable */
import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect } from 'react';
import generateTheme from '../../styling/utils/theme-provider'
import testItems from '../testData';
import { Config, PrimaryColor } from '../../styling/types/types';

export interface StepperProps {
  useTestHarness?: boolean
  useDarkMode?: boolean
  stepCount: number;
  variant: string
  showBorder?: boolean
  containerWidth: number
  containerHeight: number,
  handleStepChange: (newStepNumber: number) => void;
  isSubmittable: boolean;
  onSubmit?: () => void;
  primaryColor: string;
  
}


export default function StepperComponent(props: StepperProps) {
  
  const theme = generateTheme({Mode: props.useDarkMode ? "dark" : "light", primaryColor: props.primaryColor as PrimaryColor})

  
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleNext = () => {
    
    setActiveStep(
      (prevActiveStep) => 
        Math.min(prevActiveStep + 1, props.stepCount - 1)
    );
    
    if( activeStep === props.stepCount - 1 && props.onSubmit) {
      props.onSubmit()
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {

    if (props.stepCount > 0) {
      props.handleStepChange(activeStep)
    }
  }, [activeStep])

  return (


<ThemeProvider theme={theme}>
  <div className={`flex items-center justify-center h-full`} style={{height: `${props.containerHeight}px`, width:  `${props.containerWidth}px`}} >
       <MobileStepper
      variant= {props.variant == "dots" ? "dots" : props.variant == "progress" ? "progress" : "text"}
      steps={props.stepCount}
      position="static"
      className='p-0'
      sx={{
      
       
        width:  props.useTestHarness ? '90%' : '100%',
        height: props.containerHeight,
        border: ` ${ props.showBorder ?   `1px solid ${props.useDarkMode ? 'white' : 'black'}` : ''}`,
        padding: "0px"
      
      }}
      
      activeStep={activeStep}
 
      nextButton={
        <Button size="small" onClick={handleNext} disabled = {!props.isSubmittable && activeStep == props.stepCount - 1}>
         
         { props.isSubmittable && activeStep == props.stepCount - 1  ? <p style={{marginRight: '8px'}}>Submit</p> : <p>Next</p>}
         
         { props.isSubmittable && activeStep == props.stepCount -1 ? null : <KeyboardArrowRight /> }

        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
      />
      </div>

</ThemeProvider >
    

    
     
      
  );
}
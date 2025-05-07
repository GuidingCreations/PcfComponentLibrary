 /* eslint-disable */
import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {determineScreenSize} from '../../utils'
import { useEffect } from 'react';

export interface StepperProps {
  useTestHarness?: boolean
  useDarkMode?: boolean
  Steps: any[]
  showBorder?: boolean
  containerWidth?: number
  containerHeight?: number,
  handleStepChange: (newStepNumber: number, newStepID: any) => void;
  isSubmittable: boolean;
  onSubmit?: () => void
}


export default function StepperComponent(props: StepperProps) {
  const theme = createTheme({
    palette: {
      mode: props.useDarkMode ? "dark" : "light",
    },
    components: {
      MuiMobileStepper: {
        styleOverrides: {
          root: {
            padding: '0px'
          }
        }
      }
    }
  });


  const steps : any[] =  props.Steps
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  


  const handleNext = () => {
    
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, maxSteps - 1));

    if( activeStep === maxSteps - 1 && props.onSubmit) {
      props.onSubmit()
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {

    if (steps.length > 0) {
      console.log("STEPS > 0")
      console.log("USE EFFTECT TRIGGERED")
      console.log("ACTIVE STEP: ", activeStep);
      console.log("ACTIVE STEP RECORD ID: ", steps[activeStep].recordID)
      props.handleStepChange(activeStep, steps[activeStep].recordID)
    } else {
      console.log("STEPS == 0")
    }
  }, [activeStep])

 console.log("PROPS: ", props)

  return (


<ThemeProvider theme={theme}>
  <div className={`flex items-center justify-center h-full`} style={{height: props.useTestHarness ? '100vh' : `${props.containerHeight}px`, width:  props.useTestHarness ? '100%'  :`${props.containerWidth}px`}} >
       <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      className='p-0'
      sx={{
      
       
        width:  props.useTestHarness ? '90%' : '100%',
        height: props.containerHeight,
        border: ` ${ props.showBorder ?   `1px solid ${props.useDarkMode ? 'white' : 'black'}` : ''}`
        
      
      }}
      
      activeStep={activeStep}
 
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled = {!props.isSubmittable && activeStep == maxSteps - 1}
          >
         { props.isSubmittable && activeStep == maxSteps - 1  ? "Submit" : "Next"}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
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
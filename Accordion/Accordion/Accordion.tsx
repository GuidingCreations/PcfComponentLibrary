import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useRef } from 'react';

export interface AccordionProps {
  darkMode: boolean;
  accordionData: any[];
  useTestData: boolean;
  height: number;
  width: number;
}

export default function AccordionComponent(props: AccordionProps) {
  
console.log("PROPS RECEIVED", props)

  const darkMode = useRef(props.darkMode);
  if (props.darkMode != darkMode.current) {
    darkMode.current = props.darkMode
  }

  const theme = createTheme({
    palette: {
      mode: darkMode.current ? 'dark' : 'light'
    }
    
  });


  const testData = [
    {
      Title: "Read me",
      bodyContent: `This is some example content for an accordion body. Make sure your Items property has the schema format of [{Title: "Title text", bodyContent: "BodyContentText"}]`
    },
    {
      Title: "Read me too",
      bodyContent: `You just lost the game`
    }
  ]

  const accordionRecords = props.useTestData ? testData : props.accordionData

  console.log("DATA", accordionRecords)
  return (


    <ThemeProvider theme={theme}>
<CssBaseline />

    <div style={{width: props.width, height: props.height, padding: '8px'}}>
      
      { accordionRecords.map( (record) => {

      return (

        
        <Accordion key={record.Title} style={{width: '!00%'}}>
        
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
          <Typography component="span">{record.Title}</Typography>
        </AccordionSummary>
        
        <AccordionDetails>
          {record.bodyContent}
        </AccordionDetails>
      
      </Accordion>
    )        
      })}
      
      
    </div>
          </ThemeProvider>
  );
}
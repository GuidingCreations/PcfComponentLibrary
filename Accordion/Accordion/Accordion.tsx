import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import useResizeObserver from '@react-hook/resize-observer';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { memo, useRef } from 'react';
import { Stack } from '@mui/material';

export interface AccordionProps {
  darkMode: boolean;
  accordionData: any[];
  useTestData: boolean;
  width: number;
  onChangeHeight: (newHeight: number) => void
}

const AccordionComponent = (props: AccordionProps) => {
  
const accordionRef = useRef(null)

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

   useResizeObserver(accordionRef, (entry) => {
      props.onChangeHeight(entry.contentRect.height)
    })


  return (

    <ThemeProvider theme={theme}>

    <div style={{width: props.width, height: 'fit-content'}} ref = {accordionRef}>
      
      { accordionRecords.map( (record) => {

      return (
        
        <Accordion slotProps={{transition: {unmountOnExit: true}}} key={record.Title} style={{width: '!00%'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{fontSize: '14pt'}}>
          <Typography component="span">{record.Title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{fontSize: '12pt', lineHeight: 2}}>
          <Stack>
            <div className='bodyContentWrapper'>
            <p style={{whiteSpace: 'pre-wrap'}}>{record.bodyContent}</p>
            
          
          </div>

          {record.images?.map((image : any) => {
            
            return <img key={image.src} src={image.src} style={{width: image.width ? image.width : '100%', height: image.height ? image.height : '', marginTop: "16px"}}></img>
            
          })}
          </Stack>
        </AccordionDetails>
      
      </Accordion>
    )        
      })}
      
      
    </div>
          </ThemeProvider>
  );
}

export default memo(AccordionComponent)
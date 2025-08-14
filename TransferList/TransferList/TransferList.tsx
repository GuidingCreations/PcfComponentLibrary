/* eslint-disable */

import * as React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import generateTheme from '../../styling/utils/theme-provider'
import {createInfoMessage} from '../../utils'
import { useEffect } from 'react';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import { PrimaryColor } from '../../styling/types/types';

export interface TransferListProps {
  onMoveItems: (newSelected: any[]) => void;
  Choices: any[];
  displayField: string;
  useDarkMode: boolean;
  primaryColor: string;
  leftBucketName?: string | null;
  rightBucketName?: string | null;
  height: number
  width: number
}

const TransferlistComponent = (props : TransferListProps) => {


  function not(a: any[], b: any[]) {
    return a.filter((value) => !b.includes(value));
  }
  
  function intersection(a: any[], b: any[]) {
    return a.filter((value) => b.includes(value));
  }
  
  function union(a: any[], b: any[]) {
    return [...a, ...not(b, a)];
  }

  
  
  const [checked, setChecked] = React.useState<any[]>([]);
  const [left, setLeft] = React.useState<any[]>([]);
  const [right, setRight] = React.useState<any[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [items, setItems] = React.useState<any[]>([])

  if (items != props.Choices) {
    setItems(props.Choices)
  }

  useEffect(() => {

    setLeft(items);
    setRight([])
  }, [items])


  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    setChecked(newChecked);
  };
  
  const numberOfChecked = (items: any[]) =>
    intersection(checked, items).length;
  
  const handleToggleAll = (items: any[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  
  const handleMoveToRight = () => {
    
    setRight((prevRight) => prevRight.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
   
  };
  
  const handleMoveToLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  

  const customList = (title: React.ReactNode, items: any[]) => (
    <Card sx={{borderColor: props.useDarkMode ? 'white':'black', borderWidth: '1px', borderStyle: 'solid'}}>

      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
          onClick={handleToggleAll(items)}
          checked={numberOfChecked(items) === items.length && items.length !== 0}
          indeterminate={
            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
          }
          disabled={items.length === 0}
          inputProps={{
            'aria-label': 'all items selected',
          }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 'fit-content',
          maxHeight: props.height * .7,
          minHeight: props.height * .4,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
        >
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value[props.displayField ?? "label"]}-label`;
          
          return (
            <ListItemButton
            key={value[props.displayField ?? "label"]}
            role="listitem"
            onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value[props.displayField ?? "label"]} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );
  
  useEffect(() => {
    createInfoMessage("RIGHT: ", right);
    props.onMoveItems(right)
  }, [right]);



  const theme = generateTheme({Mode: props.useDarkMode ? "dark" : "light", primaryColor: props.primaryColor as PrimaryColor})

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{width: '100%', height: '100%', display: 'flex'}}>

<Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center', height: '95%' }}
      >
      <Stack direction={"row"} spacing={2}>

      <Grid item style={{height: "fit-content", maxHeight: '100%', overflow: 'hidden'}}>{customList(props.leftBucketName ?? "choices", left)}</Grid>
      
      <Grid item style={{alignSelf: "center"}}>
        
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleMoveToRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleMoveToLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
    
      </Grid>

      <Grid item style={{height: "fit-content", maxHeight: '100%', overflow: 'hidden'}}>{customList(props.rightBucketName ?? 'Chosen', right)}</Grid>
    
      </Stack>
    
    </Grid>      


    </Box>
    </ThemeProvider>
  )
}

export default TransferlistComponent
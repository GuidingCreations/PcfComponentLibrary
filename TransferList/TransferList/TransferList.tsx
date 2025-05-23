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
import {createInfoMessage} from '../../utils'
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export interface TransferListProps {
  onMoveItems: (newSelected: any[]) => void;
  Choices: any[];
  displayField: string;
  useDarkMode: boolean;
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
  

if (left.length == 0 && right.length == 0 && props.Choices.length > 0) {
  setLeft(props.Choices)
}

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
  
  const displayField = props.displayField || 'label'

  const customList = (title: React.ReactNode, items: any[]) => (
    <Card>
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
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
        >
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value[displayField]}-label`;
          
          return (
            <ListItemButton
            key={value[displayField]}
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
              <ListItemText id={labelId} primary={value[displayField]} />
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



  const theme = createTheme({
    palette: {
      mode:  props.useDarkMode ? 'dark' : 'light'
    }})  

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{width: '100%', height: '100%', display: 'flex'}}>

<Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
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
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>      

    </Box>
    </ThemeProvider>
  )
}

export default TransferlistComponent
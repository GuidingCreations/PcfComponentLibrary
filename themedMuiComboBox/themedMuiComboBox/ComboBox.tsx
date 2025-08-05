/* eslint-disable */

// Imports

import * as React from 'react'
import Autocomplete from "@mui/material/Autocomplete"
import { TextField, ThemeProvider } from '@mui/material';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import { memo, useEffect, useRef, useState } from 'react';
import testItems from './testItems';
import Chip from '@mui/material/Chip';


// Props interface

export interface comboBoxProps {
  useDarkMode: boolean,
  primaryColor: string,
  labelText: string,
  allowSelectMultiple: boolean,
  optionsList: any[],
  useTestData: boolean,
  displayField: string,
  onSearchTextChange?: (searchText: string) => void,
  onSelectionChange?: (newRecordIDs: any[], newHeight: number) => void,
  defaultSelectedValues: any[];
  isRequired: boolean;
  width: number;
  isReadOnly?: boolean
}

const ComboBoxComponent = memo(function ComboBoxComponent(props: comboBoxProps) {


  // Init basic values

  const items = props.useTestData ? testItems : props.optionsList.length > 0 ? props.optionsList : [] 
  const displayField = props.useTestData ? 'title' : props.displayField;
  const autoRef = useRef<any>(null);
  const defaultSelectedValues = useRef(items.length > 0 ? props.defaultSelectedValues : []);

  const getMatchingRecords = () => {
    const matching = items.filter(
        (item : any) => props.defaultSelectedValues.filter(
            (defaultItem : any) => defaultItem[displayField] == item[displayField]).length > 0);
    return matching
  }

  const [selectedValues, setSelectedValues] = useState<any[]>(getMatchingRecords());

  if(props.defaultSelectedValues != defaultSelectedValues.current && items.length > 0 && !props.useTestData) {
    let matchingArray : any[] = []
    defaultSelectedValues.current = props.defaultSelectedValues;
   
    defaultSelectedValues.current.map((defaultItem) => {
      const matchingItems = items.filter((item : any) => item[props.displayField] == defaultItem[props.displayField]);
      matchingArray = matchingArray.concat(matchingItems);
    });

    if(matchingArray.length > 0) {

      setSelectedValues(matchingArray);

    } else {
      setSelectedValues([])
    }

  }

  // Hook to call whenever selectedValues array changes

  useEffect(() => {

    if ( props.onSelectionChange && autoRef.current && !props.useTestData) {

      props.onSelectionChange(selectedValues, autoRef.current.getBoundingClientRect().height)
    }

  }, [selectedValues])


  // Config to pass to theme

  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor:  props.primaryColor as PrimaryColor
  }

  const theme : Theme = generateTheme(config)

  useEffect(() => {
    
    console.log("COMPONENT HEIGHT: ", autoRef.current.getBoundingClientRect().height)
  })
  return (
    
    // Theme wrapper
    
    <ThemeProvider theme = {theme}>
      
    {/* Wrapper around the autocomplete component */}
    
    <div  style={{position: "relative",  width: `${props.width}px`, height: 'fit-content'}} ref = {autoRef}>

    <Autocomplete
    multiple = {props.allowSelectMultiple}
    readOnly = {props.isReadOnly}
    renderValue={(value, getItemProps) => {
    
      return  props.allowSelectMultiple ? 
      <div style = {{display: 'flex', gap: '4px', maxWidth: `${props.width}px`, flexWrap: "wrap", minWidth: '100%'}}>

      {

        value.map((tag : any, index : any) => {
          return (

            <Chip 
              key={index} 
              label = {tag[displayField]} 
              onDelete={props.isReadOnly ? undefined : (e) => {  setSelectedValues( selectedValues.filter((selected) => selected[displayField] != tag[displayField])) }}
              sx={{maxWidth: '80%'}}
              
              
              />
              
  )}) 
      }
      </div>
      
      : (

        <Chip sx={{maxWidth: '80%'}} label = {value[displayField]} onDelete={(e) => {setSelectedValues([])}}/>
      
      )}
    } 
    onChange={(e : any, value: any[]) => value == null ? setSelectedValues([]) : props.onSelectionChange ? props.allowSelectMultiple ?  setSelectedValues(value) : setSelectedValues([value]) : ''}
    slotProps={{
    
      listbox: {
        
        sx: {
          boxShadow: 'none',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.mode == 'dark' ? 'white' : 'black',
          
        }
      },
      chip: {
        sx: {
          color: theme.palette.mode == 'dark' ? 'black' : 'white'
        }
      },
      popper: {
        sx: {
          zIndex: 9999
          },
        
      }
    }}
    options={items}
    getOptionLabel={(option) => option[displayField]}
    value={ props.allowSelectMultiple ? selectedValues || null : selectedValues[0] || null}
    

    // Render input
    renderInput={(params) => {

    

      return (
        
        <TextField
        {...params}
        variant="outlined"
        label= {`${props.labelText} ${props.isRequired ? "*" : ""}`}
        placeholder={props.labelText}
        onChange={(e) => props.onSearchTextChange ? props.onSearchTextChange(e.target.value) : ''}
        />
      )
    

    
    }
  }
    
    
    />
    
    </div>
    </ThemeProvider>
  )


});

export default ComboBoxComponent
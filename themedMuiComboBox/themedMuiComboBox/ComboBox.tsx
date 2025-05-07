/* eslint-disable */

// Imports

import * as React from 'react'
import Autocomplete from "@mui/material/Autocomplete"
import { TextField, ThemeProvider } from '@mui/material';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import { memo, useEffect, useRef, useState } from 'react';
import testItems from './testItems';
import Checkbox from '@mui/material/Checkbox';

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
}

const ComboBoxComponent = memo(function ComboBoxComponent(props: comboBoxProps) {

  console.log("THEMED MUI COMBO BOX PROPS MEMOIZED: ", props)

  // Init basic values

  const liveData = props.optionsList.length > 0 ? props.optionsList : [] 
  const items = props.useTestData ? testItems : liveData
  const displayField = props.useTestData ? 'title' : props.displayField;
  const autoRef = useRef<any>(null);
  const defaultSelectedValues = useRef(items.length > 0 ? props.defaultSelectedValues : []);

  const getMatchingRecords = () => {
    const matching = items.filter((item : any) => props.defaultSelectedValues.filter((defaultItem : any) => defaultItem[displayField] == item[displayField]).length > 0);
    return matching
  }

  const [selectedValues, setSelectedValues] = useState<any[]>(getMatchingRecords());

  if(props.defaultSelectedValues != defaultSelectedValues.current && items.length > 0) {
    console.log("ITEMS IN MATCH: ", items)
    let matchingArray : any[] = []
    console.log("DEFAULT VALUES HAVE CHANGED: ", props.defaultSelectedValues, defaultSelectedValues.current);
    defaultSelectedValues.current = props.defaultSelectedValues;
    console.log("SETTING NEW VALUES FROM DEFAULT: ", defaultSelectedValues.current)
   
    defaultSelectedValues.current.map((defaultItem) => {
      const matchingItems = items.filter((item : any) => item[props.displayField] == defaultItem[props.displayField]);
      console.log("INNER MATCHING ITEMS: ", matchingItems);
      matchingArray = matchingArray.concat(matchingItems);
      console.log("MATCHED: ", matchingArray)
    });

    console.log("OVERALL MATCHING: ", matchingArray);
    if(matchingArray.length > 0) {

      setSelectedValues(matchingArray)
    } else {
      setSelectedValues([])
    }

  }

  // Hook to call whenever selectedValues array changes

  useEffect(() => {

    if ( props.onSelectionChange && autoRef.current) {

      props.onSelectionChange(selectedValues, autoRef.current.getBoundingClientRect().height)
    }

  }, [selectedValues])


  // Config to pass to theme

  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor:  props.primaryColor as PrimaryColor
  }

  const theme : Theme = generateTheme(config)

  console.log("THEME GENERATED: ", theme)


  return (
    
    // Theme wrapper
    
    <ThemeProvider theme = {theme}>
      
    {/* Wrapper around the autocomplete component */}
    
    <div  style={{position: "relative",  width: '100%', height: 'fit-content'}} ref = {autoRef}>

    <Autocomplete
    multiple = {props.allowSelectMultiple}
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
    renderInput={(params) => (
      <TextField
      {...params}
      variant="outlined"
      label= {props.labelText}
      placeholder={props.labelText}
      onChange={(e) => props.onSearchTextChange ? props.onSearchTextChange(e.target.value) : ''}
      />
    )}
    
    
    />
    
    </div>
    </ThemeProvider>
  )


});

export default ComboBoxComponent
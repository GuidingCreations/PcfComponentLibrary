/* eslint-disable */

// Imports

import * as React from 'react'
import Autocomplete from "@mui/material/Autocomplete"
import { CssBaseline, TextField, ThemeProvider } from '@mui/material';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor, Theme } from '../../styling/types/types';
import { useEffect, useRef, useState } from 'react';
import testItems from './testItems';

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
  onSelectionChange?: (newRecordIDs: any[], newHeight: number) => void
}

const ComboBoxComponent = (props: comboBoxProps) => {

  // Init basic values

  const liveData = props.optionsList.length > 0 ? props.optionsList : [] 
  const items = props.useTestData ? testItems : liveData
  const displayField = props.useTestData ? 'title' : props.displayField;
  const autoRef = useRef<any>(null)
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

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


  return (
    
    // Theme wrapper
    
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
    
    
    {/* Wrapper around the autocomplete component */}
    
    <div  style={{position: "relative",  width: '100%', height: 'fit-content'}} ref = {autoRef}>

    <Autocomplete
    multiple = {props.allowSelectMultiple}
    onChange={(e : any, value: any[]) => value == null ? setSelectedValues([]) : props.onSelectionChange ? props.allowSelectMultiple ?  setSelectedValues(value) : setSelectedValues([value]) : ''}
    slotProps={{
      listbox: {
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.mode == 'dark' ? 'white' : 'black'
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
        }
      }
    }}
    options={items}
    getOptionLabel={(option) => option[displayField]}
    
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
}

export default ComboBoxComponent
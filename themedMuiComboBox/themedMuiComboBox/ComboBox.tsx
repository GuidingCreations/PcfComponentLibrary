/* eslint-disable */

// Imports

import * as React from 'react'
import Autocomplete from "@mui/material/Autocomplete"
import { inputClasses, TextField, textFieldClasses, ThemeProvider } from '@mui/material';
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
  onSelectionChange?: (newRecordIDs: any[]) => void,
  defaultSelectedValues: any[];
  isRequired: boolean;
  width: number;
  isReadOnly?: boolean;
  updateComponentHeight: (newOutputHeight: number) => void
}

const ComboBoxComponent = function ComboBoxComponent(props: comboBoxProps) {

  // Init basic values

  const items = props.useTestData ? testItems : props.optionsList.length > 0 ? props.optionsList : [] 
  const displayField = props.useTestData ? 'title' : props.displayField;
  const autoRef = useRef<any>(null);
  const defaultSelectedValues = useRef(items.length > 0 ? props.defaultSelectedValues : []);

  // Function to establish which records from the main dataset match the defaultSelectedItems

  const getMatchingRecords = () => {
    const matching = items.filter(
        (item : any) => props.defaultSelectedValues.filter(
            (defaultItem : any) => defaultItem[displayField] == item[displayField]).length > 0);
    return matching
  }

  const [selectedValues, setSelectedValues] = useState<any[]>(getMatchingRecords());

  // If there are new default items & there are a non-zero number of main items & useTestData is false 

  if(
    props.defaultSelectedValues != defaultSelectedValues.current && 
    items.length > 0 && 
    !props.useTestData
  ) {

    let matchingArray : any[] = []
    
    // update default items to new default items

    defaultSelectedValues.current = props.defaultSelectedValues;

    // map through new default items to find matching main items

    defaultSelectedValues.current.map((defaultItem) => {
      const matchingItems = items.filter(
        (item : any) => item[props.displayField] == defaultItem[props.displayField]
      );
      matchingArray = matchingArray.concat(matchingItems);
    });

    // If there are matches to the default

    if(matchingArray.length > 0) {

      // Update selectedValues to new items that match a default item

      setSelectedValues(matchingArray);

    } else {

      // If there are no matches, set selectedValues to empty array

      setSelectedValues([])
    }

  }

  // Hook to call whenever selectedValues array changes

  useEffect(() => {

    if ( props.onSelectionChange && autoRef.current && !props.useTestData) {

      props.onSelectionChange(selectedValues)
    }

  }, [selectedValues])

  // Config to pass to theme

  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor:  props.primaryColor as PrimaryColor
  }

  const theme : Theme = generateTheme(config)

  // Update component output height after each render

  useEffect(() => {
    props.updateComponentHeight(autoRef.current.clientHeight);
    console.log("SHOULD HIDE INPUT: ", (!props.allowSelectMultiple) && selectedValues.length > 0)
  })

  return (
    
    // Theme wrapper
    
    <ThemeProvider theme = {theme}>
      
    {/* Wrapper around the autocomplete component */}
    
    <div  style={{position: "relative",  width: `${props.width}px`, height: 'fit-content'}} ref = {autoRef}>
      <Autocomplete
      
        multiple = {props.allowSelectMultiple}
        readOnly = {props.isReadOnly}
        renderValue={(value) => {
          const valueList = props.allowSelectMultiple ? value : [value];
          return (  
            <div style = {{display: 'flex', gap: '4px', maxWidth: `${props.width}px`, flexWrap: "wrap", minWidth: props.allowSelectMultiple ? '100%' : "75%" }}>
              {
                valueList.map((tag : any, index : any) => {
                  return (
                    <Chip 
                      key={index} 
                      label = {tag[displayField]} 
                      onDelete={props.isReadOnly ? undefined : 
                        (e) => {  setSelectedValues( selectedValues.filter((selected) => selected[displayField] != tag[displayField])) }}
                      sx={{maxWidth: '80%'}}
                    />
                  )
                }) 
              }
            </div>
          )
    
    }
    
    
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
        sx: {color: theme.palette.mode == 'dark' ? 'black' : 'white'}
      },
      popper: {
        sx: {zIndex: 9999},
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
        slotProps={{
          input: {
            ...params.InputProps,
            slotProps: {
              input: {
                sx: {
                  display: (!props.allowSelectMultiple) && selectedValues.length > 0 ? 'none' : 'block'
                }
              }
            }
          }
        }}
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
};

export default memo(ComboBoxComponent)
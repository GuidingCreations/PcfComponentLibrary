/* eslint-disable */

// imports

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
  useGridApiRef,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import { ThemeProvider, createTheme, Chip, Button, ButtonGroup } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { Config, PrimaryColor } from "../../styling/types/types";
import generateTheme from '../../styling/utils/theme-provider'
import SquashedButtonGroup from "../renderOptions/SquashedButtonGroup";
import ChipList from "../renderOptions/ChipList";

// Test data

const testRows: GridRowsProp = [
  { id: 1, Title: "Hello", col2: "World" },
  { id: 2, Title: "DataGridPro", col2: "is Awesome" },
  { id: 3, Title: "MUI", col2: "is Amazings" },
  { id: 4, Title: "Hello", col2: "World" },
  { id: 5, Title: "DataGridPro", col2: "is Awesome" },
  { id: 6, Title: "MUI", col2: "is Amazings" },
  { id: 7, Title: "Hello", col2: "World" },
  { id: 8, Title: "DataGridPro", col2: "is Awesome" },
  { id: 9, Title: "MUI", col2: "is Amazings" },
  { id: 10, Title: "Hello", col2: "World" },
  { id: 11, Title: "DataGridPro", col2: "is Awesome" },
  { id: 12, Title: "MUI", col2: "is Amazings" },
  { id: 13, Title: "Hello", col2: "World" },
  { id: 14, Title: "DataGridPro", col2: "is Awesome" },
  { id: 15, Title: "MUI", col2: "is Amazings" },
  { id: 16, Title: "Hello", col2: "World" },
  { id: 17, Title: "DataGridPro", col2: "is Awesome" },
  { id: 18, Title: "MUI", col2: "is Amazings" },
  { id: 19, Title: "Hello", col2: "World" },
  { id: 10, Title: "Hello", col2: "World" },
  { id: 11, Title: "DataGridPro", col2: "is Awesome" },
  { id: 12, Title: "MUI", col2: "is Amazings" },
  { id: 13, Title: "Hello", col2: "World" },
  { id: 14, Title: "DataGridPro", col2: "is Awesome" },
  { id: 15, Title: "MUI", col2: "is Amazings" },
  { id: 16, Title: "Hello", col2: "World" },
  { id: 17, Title: "DataGridPro", col2: "is Awesome" },
  { id: 18, Title: "MUI", col2: "is Amazings" },
  { id: 19, Title: "Hello", col2: "World" },
 
];

const testColumns: GridColDef[] = [
  { field: "Title", headerName: "Title", width: 150, display: "flex" },
  { field: "col2", headerName: "Column 2", width: 150, display: "flex" },
  {field: "Options", headerName: "Options"}
];

// Interface

export interface paginationModelType {
  page: number;
  pageSize: number;
}

export interface DataTableProps {
  tableData: any[];
  tableColumns: GridColDef[];
  primaryColor: string;
  useTheming: boolean;
  height: number;
  width: number;
  defaultColumnWidths: any[];
  allowSelectMultiple: boolean;
  useDarkMode: boolean;
  useServerSidepagination: boolean;
  setSelectedRecords: (selectedRecordIDs: any[]) => void;
  pageSize: number;
  pageNumber: number;
  totalRowCount: number;
  onOptionSelect: (
    outputType: string,
    optionValue: string,
    recordID: any
  ) => void;
  columnVisibility: any;
  hideFooter: boolean;
  showCheckboxes: boolean;
  fullWidth?: boolean;
  classes?: string;
  showToolbar: boolean;
  noRowsText?: string;
  paginationModel: paginationModelType;
  useTestData: boolean;
  onPaginationModelChange: (paginationModel: paginationModelType) => void;
  onFilterModelChange?: (filterModel: GridFilterModel) => void;
  datasetLoading: boolean;
  showQuickFilter: boolean;
  isDelegable: boolean;
}

const DataTableComponent = memo(function DataTableComponent(props: DataTableProps) {
  
  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  }
  
  const theme = props.useTheming ? generateTheme(config) : createTheme({palette: {mode: config.Mode}})

  //  Set primaryColor ref, and check each render to see if default has updated. If it has, update ref.

  const primaryColor = useRef(props.primaryColor);

  if (primaryColor.current !== props.primaryColor) {
    primaryColor.current = props.primaryColor
  }

//  Set columnVisibility ref, and check each render to see if default has updated. If it has, update ref.


  const defaultVisibilityModel = useRef(props.columnVisibility)
  const [visibilityModel, setVisibilityModel] = useState<any>(
    props.columnVisibility
  );

  const [paginationModel, setPaginationModel] = useState<paginationModelType>({pageSize: 25, page: 0});

  useEffect(() => {
    if ( (props.paginationModel.page - 1 != paginationModel.page || props.paginationModel.pageSize != paginationModel.pageSize) ) {
      
      props.onPaginationModelChange(paginationModel)
    
    }
  }, [paginationModel])


  if (props.columnVisibility != defaultVisibilityModel.current) {
    defaultVisibilityModel.current = props.columnVisibility;
    setVisibilityModel(defaultVisibilityModel.current)
  }

  const apiRef = useGridApiRef();
  
  // Function to fire formula from prop to update selected records
  
  const updateSelectedRecordIDs = (IDs: any) => {
    props.setSelectedRecords(IDs);
  };

  // Function to return rowID

  function getRowId(row: any) {
    return   props.useTestData ? row.id : row.recordID;
  }

  const data = props.useTestData ? testRows : props.tableData;
  const columns =  props.useTestData ? testColumns : props.tableColumns
  
  // Map through columns to generate overrides

  columns.map((column: any) => {

    const matchingOverride = column.matchingOverride;
    matchingOverride?.columnName && matchingOverride.componentType
    ? (column.renderCell = (params: GridRenderCellParams<any>) => {

          const matchingColorRecord =
            matchingOverride?.colorGenerator?.filter(
              (record: any) => record.matchingValue == params.row[params.field]
            )[0];


          const backgroundColor = matchingColorRecord?.backgroundColor ?? matchingOverride?.backgroundColor ?? theme.palette.primary.main

          const fontColor = matchingColorRecord?.fontColor ?? matchingOverride?.fontColor ?? theme.palette.primary.contrastText

                switch (matchingOverride?.componentType.toLowerCase()) {
                  case "chip" :
                  return (

                    <Chip 
                      style={{
                          backgroundColor: backgroundColor, 
                          color: fontColor
                      }} sx={{
                      color : fontColor,
                      "& .MuiChip-label": {
                        color: fontColor
                      }
                      }} 
                      label = { params.row[params.field]}/>
                  );
                  case "squashedbuttongroup" :
                  return (
                    <SquashedButtonGroup 
                      displayField="Value"
                      currentOption = {[]}
                      useTestData = {false}
                      isDisabled = {false}
                      onChangedDisplayedOption={() => {}}
                      useDarkMode = {props.useDarkMode}
                      primaryColor= {primaryColor.current}
                      useFlexibleWidth
                      height= {35}
                      options={column?.matchingOverride?.optionsList || ["No options passed"]}
                      onOptionSelect={(option: string) => {props.onOptionSelect("selectedOption", option, params.row.recordID)}}
                      fullWidth
                />

                  )
                  case "chiplist" :
                  {
                     const propChips = params.row[params.field].map((chipInfo : any) => {
                      
                      const colorRecord = column?.matchingOverride?.colorGenerator?.filter(
                        (record: any) => record.matchingValue == chipInfo.Value)[0]
                        const obj : any = {}; 
                        obj.label = chipInfo.Value ?? "label"
                        obj.backgroundColor = colorRecord?.backgroundColor ??  column?.matchingOverride?.backgroundColor ?? theme.palette.primary.main;
                        obj.fontColor = colorRecord?.fontColor ?? column?.matchingOverride?.fontColor ?? theme.palette.contrastText;
                        return obj
                      });
                    
                    return (
                      <ChipList Chips={propChips}/>
                    )
                  }
                }
        })
      : null;
  });




  const styles = {
    '--var-selected-background-color': `${theme.palette.primary.main}4D`,
    '--varToolbarIconColor': `${props.useDarkMode ? theme.palette.primary.main : 'black'}`,
    paddingTop: '8px',
    height: props.height,
    width: props.width
  } as React.CSSProperties

  const renderCount = useRef(0);
  renderCount.current++;
  

  return (
    
     
     <ThemeProvider theme={theme}>
      
      <div
        style={styles}
      >

{/* For the on pagination model change, there's some weird glitch where it loads page 0 when you reach the last page, so had to throw a check in there to not fire function if page difference is greater than 1 */}

        <DataGrid
            loading = {props.datasetLoading}
            rowCount={props.totalRowCount}
            disableAutosize
            disableMultipleRowSelection={!props.allowSelectMultiple}
            columnVisibilityModel={visibilityModel}
            onPaginationModelChange={(e) => {if (Math.abs(e.page - paginationModel.page) == 1 || e.pageSize != paginationModel.pageSize)  { setPaginationModel(e)}}}
            rows={data}
            columns={columns}
            checkboxSelection={props.showCheckboxes}
            hideFooter={props.hideFooter}
            paginationModel={paginationModel}
            getRowHeight={(params) => "auto"}
            apiRef={apiRef}
            onRowSelectionModelChange={(e) => updateSelectedRecordIDs(e)}
            getRowId={getRowId}
            className={props.classes}
            
            onFilterModelChange={(e) => { props.onFilterModelChange ? props.onFilterModelChange(e) : null}}
            
            paginationMode = {props.isDelegable ? "server" : "client"}
            
            sx={{ color: props.useDarkMode ? "white" : "black", width: props.fullWidth ? '100%' : props.width }}
            
            localeText={{ noRowsLabel: props.noRowsText ? props.noRowsText : "No results found" }}
            
            onColumnVisibilityModelChange={ (newModel) => setVisibilityModel(newModel) }
            
            initialState={{ columns: { columnVisibilityModel: visibilityModel } }}
            slotProps={{
              toolbar: {
                printOptions: {
                  disableToolbarButton: true
                },
                showQuickFilter: (!props.useServerSidepagination) && props.showQuickFilter
                
              }
            }}
            slots={{ toolbar: props.showToolbar ? GridToolbar : null }}
        />
      </div>
    
    </ThemeProvider>
     
  )
});

export default DataTableComponent;

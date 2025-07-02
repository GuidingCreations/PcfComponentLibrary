 "use client"

// imports

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import SquashedBG from "../../squashedButtonGroup/SquashedButtonGroup/SquashedButtonGroup";
import chipRender, {chipProps} from "../renderOptions/chipRender";
import { memo, useRef, useState } from "react";
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from "../../styling/types/types";
import { Chip } from "@mui/material";

// Test data

const testRows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazings" },
];

const testColumns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150, display: "flex" },
  { field: "col2", headerName: "Column 2", width: 150, display: "flex" },
  {field: "Options", headerName: "Options"}
];

// Interface

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
}

const DataTableComponent = memo(function DataTableComponent(props: DataTableProps) {
  
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
    return   row.recordID;
  }

  const data = props.tableData ? props.tableData : testRows;
  const columns =  props.tableColumns ? props.tableColumns : testColumns;

  console.log("COLUMNSSSSS", columns);
  
  // Map through columns to generate overrides

  columns.map((column: any) => {

    const matchingOverride = column.matchingOverride;
    console.log("MATCHING OVERRIDE: ", matchingOverride)
    matchingOverride?.columnName && matchingOverride.componentType
      ? (column.renderCell = (params: GridRenderCellParams<any>) => {
          const matchingColorRecord =
            column?.matchingOverride?.colorGenerator?.filter(
              (record: any) => record.matchingValue == params.row[params.field]
            )[0];


          const backgroundColor = matchingOverride?.backgroundColor
            ? matchingOverride?.backgroundColor
            : matchingColorRecord?.backgroundColor
            ? matchingColorRecord?.backgroundColor
            : props.useDarkMode
            ? "#ABACB0"
            : "black";

          const fontColor = matchingOverride?.fontColor
            ? matchingOverride?.fontColor
            : matchingColorRecord?.fontColor
            ? matchingColorRecord?.fontColor
            : "white";

            // Function to render squashedBG

            const renderSquashedBG = () => { 
              
              return (

              <SquashedBG
              key={params.row[params.field]}
              displayField="Value"
              currentOption = {[]}
              useTestData = {false}
              isDisabled = {false}
              onChangedDisplayedOption={() => {}}
              useDarkMode = {props.useDarkMode}
              primaryColor= {primaryColor.current}
              height="35px"
              options={
                column?.matchingOverride?.optionsList || ["No options passed"]
              }
            
              onOptionSelect={(option: string) => {
                console.log("OPTIONNN", option);
                props.onOptionSelect(
                  "selectedOption",
                  option,
                  params.row.recordID
                );
              }}
              fullWidth
              />
              )
            }

           return (
            <>
              {
                // if component type is chip

                column?.matchingOverride?.componentType.toLowerCase() == "chip"  && params.row[params.field] ? 
                
                <Chip style={{backgroundColor: backgroundColor, color: fontColor}} label = { params.row[params.field]}/>
                
                 : column?.matchingOverride?.componentType ==
                  "squashedButtonGroup" ? (
                    renderSquashedBG()
                ) : (
                  <></>
                )
              }
            </>
          );
        })
      : null;
  });


  console.log("COLUMNS AFTER APPENDING RENDER", columns);

  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  }
  const theme = props.useTheming ? generateTheme(config) : createTheme({palette: {mode: config.Mode}})
  console.log(" D THEME : ", theme)


  const styles = {
    '--var-selected-background-color': `${theme.palette.primary.main}4D`,
    '--varToolbarIconColor': `${props.useDarkMode ? theme.palette.primary.main : 'black'}`,
    paddingTop: '8px',
    height: props.height,
    width: props.width
  } as React.CSSProperties

  const renderCount = useRef(0);
  renderCount.current++;
  console.log("rend count: ", renderCount.current)
  
  return (
    
     
     <ThemeProvider theme={theme}>
      
      <div
        style={styles}
      >
        <DataGrid
          sx={{
            color: props.useDarkMode ? "white" : "black",
            width: props.fullWidth ? '100%' : props.width
          }}
          disableAutosize
          localeText={{
            noRowsLabel: props.noRowsText
              ? props.noRowsText
              : "No results found",
          }}
          disableMultipleRowSelection={!props.allowSelectMultiple}
          columnVisibilityModel={visibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setVisibilityModel(newModel)
          }
          rows={data}
          columns={columns}
          checkboxSelection={props.showCheckboxes}
          hideFooter={props.hideFooter}
          initialState={{
            columns: {
              columnVisibilityModel: visibilityModel,
            },
          }}
          slots={{
            toolbar: props.showToolbar ? GridToolbar : null
          }}
          getRowHeight={(params) => "auto"}
          apiRef={apiRef}
          onRowSelectionModelChange={(e) => updateSelectedRecordIDs(e)}
          getRowId={getRowId}
          className={props.classes}
          onFilterModelChange={(e) => console.log("FILTER MODEL CHANGE: ", e, e.items)}
        />
      </div>
    
    </ThemeProvider>
     
  )
});

export default DataTableComponent;

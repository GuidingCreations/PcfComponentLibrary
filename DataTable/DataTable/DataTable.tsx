import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Chip } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { chipRender } from "../renderOptions/chipRender";
import CssBaseline from "@mui/material/CssBaseline";
import { useRef, useState } from "react";

const testRows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const testColumns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150, display: 'flex' }
];

export interface DataTableProps {
  tableData: any[];
  tableColumns: GridColDef[];
  height: number;
  width: number;
  defaultColumnWidths: any[];
  allowSelectMultiple: boolean;
  useDarkMode: boolean;
  setSelectedRecords: (selectedRecordIDs: any[]) => void
}

export default function DataTableComponent(props: DataTableProps) {

  const apiRef = useGridApiRef();
  const updateSelectedRecordIDs = (IDs : any) => {
    console.log("ITEMS", IDs)
    const selected  = apiRef.current?.getSelectedRows()
    console.log(selected)
    console.log("SELECTED ROWS", apiRef.current?.getSelectedRows() )
    props.setSelectedRecords(IDs)
  }

  const renderCount = useRef(0)
  renderCount.current++

  const selectionModel = useRef<any>([])


  function getRowId(row : any) {
    console.log("ROW ID: ", row.recordID)
    return row.recordID
  }

  console.log("PROPPY : ", props)

  const data = props.tableData ? props.tableData : testRows;
  const columns = props.tableColumns ? props.tableColumns : testColumns

  console.log("COLUMNS in data table before custom render", columns)

// Map through columns to generate overrides

  columns.map((column : any) => {
  
    const matchingOverride = column.matchingOverride
    matchingOverride?.columnName ? column.renderCell = 
    
    
    (params: GridRenderCellParams<any>) =>  { 

      const matchingColorRecord = column?.matchingOverride?.colorGenerator?.filter((record : any) => record.matchingValue == params.row[params.field])[0]

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
            : "white"


      
      return (<>
    
    {
   
    // if component type is chip

    column?.matchingOverride?.componentType == 'chip' ? 
    chipRender( {backgroundColor: backgroundColor, label: params.row[params.field], testObj: params.field,  fontColor: fontColor})
    
  
    
    : <h2></h2>}
    
    </>) 
    
      
    
    
  }
  : null
}


)

  console.log("COLUMNS AFTER APPENDING RENDER", columns)

  const theme = createTheme({
    palette: {
      mode: props.useDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={{ height: props.height, width: "100%" , maxWidth: `${props.width}px`}}>
        <DataGrid 
        sx={{color: props.useDarkMode ? 'white' : 'black'}}
        disableMultipleRowSelection = {!props.allowSelectMultiple}
        rows={data} 
        columns={columns} 
        checkboxSelection
        initialState={{
          columns: {
            columnVisibilityModel: {
              recordID: false
            }
          }
        }}
        getRowHeight={() => 'auto'}
        apiRef={apiRef}
        onRowSelectionModelChange={(e) => {console.log("EVENT", e); const items = e;  updateSelectedRecordIDs(items)}}
        getRowId={getRowId}
        />
      </div>
    </ThemeProvider>
  );
}

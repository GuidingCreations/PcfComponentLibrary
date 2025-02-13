import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {} from '@mui/x-data-grid/themeAugmentation';
import {SquashedBG} from '../../squashedButtonGroup/squashedButtonGroup';
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
  pageSize: number;
  pageNumber: number;
  totalRowCount: number;
  onOptionSelect: (outputType: string, recordID: any, optionValue: string) => void;
  columnVisibility: any;
  hideFooter: boolean;
  showCheckboxes: boolean;
}

export default function DataTableComponent(props: DataTableProps) {


  const [defaultVisibilityModel, setDefaultVisibilityModel] = useState<any>(props.columnVisibility);
  const [visibilityModel, setVisibilityModel] = useState<any>(props.columnVisibility)

  if (props.columnVisibility != defaultVisibilityModel) {
    setDefaultVisibilityModel(props.columnVisibility);
    setVisibilityModel(props.columnVisibility)
  }


  const apiRef = useGridApiRef();
  const updateSelectedRecordIDs = (IDs : any) => {
    props.setSelectedRecords(IDs)
  }

  const renderCount = useRef(0)
  renderCount.current++




  function getRowId(row : any) {
    return row.recordID
  }





  const data = props.tableData ? props.tableData : testRows;
  const columns = props.tableColumns ? props.tableColumns : testColumns

  console.log("COLUMNSSSSS", columns)
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
    
  
    
    : 
    
    column?.matchingOverride?.componentType == 'squashedButtonGroup' ?
    <SquashedBG 
      options={ 
        column?.matchingOverride?.optionsList ? column.matchingOverride.optionsList.map((option : any) => option.Value ) : ["No options passed"]
      }
      onOptionSelect={
        (option: string) => { console.log("OPTIONNN", option); props.onOptionSelect(params.row.recordID, "selectedOption", option)}
      }
      width = {column?.matchingOverride?.componentWidth || 150}
      height = {column?.matchingOverride?.componentHeight || 50}
    
  /> : <></>

    }
    
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
        columnVisibilityModel={visibilityModel}
        onColumnVisibilityModelChange={(newModel) => setVisibilityModel(newModel)}
        rows={data}
        columns={columns} 
        checkboxSelection = {props.showCheckboxes}
        hideFooter = {props.hideFooter}
        initialState={{
          columns: {
            columnVisibilityModel: defaultVisibilityModel
          }
        }}
        getRowHeight={() => 'auto'}
        apiRef={apiRef}
        onRowSelectionModelChange={(e) => updateSelectedRecordIDs(e)}
        getRowId={getRowId}
        />
      </div>
    </ThemeProvider>
  );
}

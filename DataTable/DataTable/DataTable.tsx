import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {} from '@mui/x-data-grid/themeAugmentation';

import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

const testRows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const testColumns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150, display: 'flex' },
];

export interface DataTableProps {
  tableData: any[];
  tableColumns: GridColDef[];
  height: number;
  width: number;
  setSelectedRecords: (selectedRecordIDs: any[]) => void
}

export default function DataTableComponent(props: DataTableProps) {

  const [selectedRecordIDs, setSelectedRecordsIDs] = useState<any[]>([])
  const apiRef = useGridApiRef();

  const updateSelectedRecordIDs = (IDs : any) => {
    console.log("ITEMS", IDs)
    const selected  = apiRef.current?.getSelectedRows()
    console.log(selected)
    console.log("SELECTED ROWS", apiRef.current?.getSelectedRows() )
    props.setSelectedRecords(IDs)
  }


  function getRowId(row : any) {
    console.log("ROW ID: ", row.recordID)
    return row.recordID
  }

  console.log("PROPPY : ", props)

  const data = props.tableData ? props.tableData : testRows;
  const columns = props.tableColumns ? props.tableColumns : testColumns
  
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={{ height: props.height, width: "100%" , maxWidth: `${props.width}px`}}>
        <DataGrid 
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

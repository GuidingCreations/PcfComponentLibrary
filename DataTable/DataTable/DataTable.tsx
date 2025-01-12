import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {} from '@mui/x-data-grid/themeAugmentation';

import CssBaseline from "@mui/material/CssBaseline";

const testRows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const testColumns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

export interface DataTableProps {
  tableData: any[];
  tableColumns: GridColDef[];
}

export default function DataTableComponent(props: DataTableProps) {

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
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid 
        rows={data} 
        columns={columns} 
        checkboxSelection
        
        />
      </div>
    </ThemeProvider>
  );
}

import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Chip } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';

export interface chipProps {
    backgroundColor: string, 
    label: string
    testObj: any;
    fontColor: string;
}


export function chipRender(props : chipProps)  {

    console.log("TEST OBJ: ", props.testObj)

  return (
    <Chip
    label = {props.label}
    sx={{backgroundColor: props.backgroundColor, color: props.fontColor}}
    />
  )
}


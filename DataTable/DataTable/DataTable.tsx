"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  useGridApiRef,
} from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import SquashedBG from "../../squashedButtonGroup/SquashedButtonGroup/SquashedButtonGroup";
import { chipRender } from "../renderOptions/chipRender";
import { memo, useRef, useState } from "react";
import generateTheme from '../../styling/utils/theme-provider'
import { Config, PrimaryColor } from "../../styling/types/types";

const testRows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const testColumns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150, display: "flex" },
];

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
    recordID: any,
    optionValue: string
  ) => void;
  columnVisibility: any;
  hideFooter: boolean;
  showCheckboxes: boolean;
  fullWidth?: boolean;
  classes?: string;
  noRowsText?: string;
}

const DataTableComponent = memo(function DataTableComponent(props: DataTableProps) {
  
const primaryColor = useRef(props.primaryColor);

  if (primaryColor.current !== props.primaryColor) {
    console.log("SWITCHING PRIMARY COLOR FROM: ", primaryColor, " to ", props.primaryColor);
    primaryColor.current = props.primaryColor
    console.log("NEW PRIMARY COLOR: ", primaryColor)
  }

  console.log("PROPS DTC: ", props)
  
  console.log("DEFAULT VISIBILITY MODEL: ", props.columnVisibility)
  

  const [visibilityModel, setVisibilityModel] = useState<any>(
    props.columnVisibility
  );

  if (props.columnVisibility != visibilityModel) {
    setVisibilityModel(props.columnVisibility);
  }

  const apiRef = useGridApiRef();
  const updateSelectedRecordIDs = (IDs: any) => {
    props.setSelectedRecords(IDs);
  };

  const renderCount = useRef(0);
  renderCount.current++;

  function getRowId(row: any) {
    return row.recordID;
  }

  const data = props.tableData ? props.tableData : testRows;
  const columns = props.tableColumns ? props.tableColumns : testColumns;

  console.log("COLUMNSSSSS", columns);
  // Map through columns to generate overrides

  columns.map((column: any) => {
    const matchingOverride = column.matchingOverride;
    matchingOverride?.columnName
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


            const renderSquashedBG = () => { 
              
              console.log("PRIMARY COLOR BEFORE RENDER: ", primaryColor)
              return (

              <SquashedBG
              useDarkMode = {props.useDarkMode}
              primaryColor= {primaryColor.current}
              options={
                column?.matchingOverride?.optionsList
                ? column.matchingOverride.optionsList.map(
                  (option: any) => option.Value
                )
                : ["No options passed"]
              }
              onOptionSelect={(option: string) => {
                console.log("OPTIONNN", option);
                props.onOptionSelect(
                  params.row.recordID,
                  "selectedOption",
                  option
                );
              }}
              width={column?.matchingOverride?.componentWidth || 150}
              fullWidth
              height={column?.matchingOverride?.componentHeight || 50}
              />
            )
            }

          return (
            <>
              {
                // if component type is chip

                column?.matchingOverride?.componentType == "chip" ? (
                  chipRender({
                    backgroundColor: backgroundColor,
                    label: params.row[params.field],
                    testObj: params.field,
                    fontColor: fontColor,
                  })
                ) : column?.matchingOverride?.componentType ==
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
  const theme =  generateTheme(config)
  console.log(" D THEME : ", theme)


  const styles = {
    '--var-selected-background-color': `${theme.palette.primary.main}4D`,
    height: props.height,
    width: props.width
  } as React.CSSProperties

  const renderMain = () => {
    return (
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
          getRowHeight={(params) => "auto"}
          apiRef={apiRef}
          onRowSelectionModelChange={(e) => updateSelectedRecordIDs(e)}
          getRowId={getRowId}
          className={props.classes}
        />
      </div>
    )
  }

  const renderWithTheme = () => {
    return(

      <ThemeProvider theme={theme}>
      {renderMain()}
    </ThemeProvider>
    )
  }

  const renderWithoutTheme = () => {
   return (
    <ThemeProvider theme = {createTheme({palette: {mode: props.useDarkMode ? 'dark' : 'light'}})}>

     {renderMain()}
    </ThemeProvider>
    )
  
  }

  return (
    props.useTheming ? renderWithTheme() : renderWithoutTheme()
  )
});

export default DataTableComponent;

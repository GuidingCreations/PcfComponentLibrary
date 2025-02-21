/* eslint-disable */

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import DataTableComponent from "../../DataTable/DataTable/DataTable";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GridColDef } from "@mui/x-data-grid";
export interface AccesPageProps {
  Users: any[];
  columns: any[];
  width: number;
  navItems: any[];
  sidebarWidth: number;
  containerHeight: number;
  headerText: string;
  usersList: any[];
  useTestData: boolean;
  handleNewUserSearchText: (newSearchText: string) => void;
  userSearchText: string
}
import Sidebar from "../../Sidebar2/Sidebar2/Sidebar";
import Stack from "@mui/material/Stack";
import ComboBox from "../../ComboBoxMUI/ComboBoxMUI/ComboBox";
import { Autocomplete, Checkbox, createFilterOptions, createTheme, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material";
import Button from '../../Button/Button/Button'

const HelloWorld = (props: AccesPageProps) => {
  const theme = createTheme({
    palette: {
      mode:  'dark'
    },
    components: {

      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: 'auto',
            bottom: '50%'
          },
          shrink: {
            top: 0
                    }
        }
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
          '& .MuiOutlinedInput-notchedOutline': {

              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'white',
            },
            height:  `50px`
          }
        }
      }
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [userSearchText, setUserSearchText] = useState<string>('');


  if (isLoading && props.columns.length > 0) {
    setIsLoading(false);
  }

  const testCols: GridColDef<(typeof testRows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const testRows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);

  const handleShowUserFormChange = () => {
    console.log("CURRENT VAL: ", showAddUserForm);
    setShowAddUserForm(!showAddUserForm);
    console.log("NEW VAL: ", showAddUserForm);
  };

  const handleSearchTextChange = (newSearchText: string) => {
    setUserSearchText(newSearchText)
  }

  useEffect( () => {

    const timeoutID = setTimeout(() => {

      props.handleNewUserSearchText(userSearchText)
      
    }, 500);

    return () => clearTimeout(timeoutID)
    
  }, [userSearchText])

  const rows = props.columns.length > 0 ? props.Users : testRows;
  const columns = props.columns.length > 0 ? props.columns : testCols;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  console.log("ROWS IN ACC: ", rows);
  console.log("COLS in ACC: ", columns);
  console.log("ACCESS PAGE PROPS: ", props)
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {/* If showAddUserForm is true, display the user form and hide everything else */}

          {showAddUserForm ? (
            <div
              className="w-full flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Stack spacing={2} width={props.width * .5}>

                <Typography variant="h5" color="white" gutterBottom>
                  Add User
                </Typography>

<ThemeProvider theme={theme}>
<CssBaseline />
<Autocomplete
 
  onChange={(e:any) => {}}
  options={props.usersList}
  filterOptions={createFilterOptions({
    limit: 100
  })}
  inputValue = {userSearchText}
  getOptionLabel={(option : any) => option.label}
  isOptionEqualToValue={(option, value) => option.label == value.label}
  renderOption={(props, option : any, { selected }) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
          
          />
        {option.label}
      </li>
    );
  }}
  style={{ width: `400px`}}
  renderInput={(params) => (
    <TextField {...params} label= {`User`} placeholder = {"User"} onChange={(e) => {handleSearchTextChange(e.target.value)}}/>
    
  )}
  />
</ThemeProvider>

                <ComboBox
                  useTestData = {false}
                  height={50}
                  width = {400}
                  borderColor="white"
                  borderStyle="solid"
                  borderWidth="1px"
                  displayColumn="label"
                  Items={[
                    {
                      label: "Owner"
                    },
                    {
                      label: "Member"
                    }
                  ]}
                  labelText="Access type"
                  allowSelectMultiple={false}
                  defaultValues={[]}
                  isDisabled={false}
                  darkMode
                  setSelectedRecords={() => {}}
                />


              <Stack direction={'row'} spacing={2}>
              
                  <Button 
                    ButtonText="Add user"
                    useDarkMode
                    isDisabled = {false}
                    onClick={() => {}}
                    size = "medium"
                    typeVariant="contained"
                  />
                  
                  <Button 
                    ButtonText="Cancel"
                    useDarkMode
                    isDisabled = {false}
                    onClick={() => {handleShowUserFormChange()}}
                    size = "medium"
                    typeVariant="outlined"
                  />

                  
              </Stack>

              </Stack>
            </div>
          ) : (
            <div className="flex flex-row">
              <Sidebar
                height={props.containerHeight}
                width={props.sidebarWidth}
                useDarkMode={true}
                defaultDarkMode={true}
                activeScreen=""
                mainLogo=""
                handleToggleChange={() => {
                  console.log("TOGGLE");
                }}
                navItems={props.navItems}
                adjustScreenName={() => console.log("SCREEN ADJUST")}
                changeScreen={() => console.log("CHANGE SCREEN")}
                userImage=""
                userName="HUNTER MCCARTHY"
                iconColor="white"
                navItemHeight={70}
              />
              <div className="flex flex-col ml-3" style={{ justifyContent: "start" }}>
                {/* Container for the add user and delete selected button
            horizontal container
            */}

                <Typography variant="h5" color="white" style={{marginTop: '5%'}}>
                  {props.headerText}
                </Typography>

                <div className="flex gap-1 mt-4">
                  <Button
                    typeVariant="contained"
                    size="medium"
                    ButtonText="Add user"
                    onClick={() => {
                      handleShowUserFormChange();
                    }}
                    useDarkMode
                    isDisabled = {false}
                  />

                  <Button
                    typeVariant="outlined"
                    size="medium"
                    ButtonText="Delete selected"
                    useDarkMode
                    isDisabled = {false}
                    onClick={() => {
                    }}
                  />
                </div>

                <DataTableComponent
                  tableColumns={columns}
                  tableData={rows}
                  height={props.containerHeight * 0.75}
                  width={props.width - props.sidebarWidth - 16}
                  defaultColumnWidths={[]}
                  allowSelectMultiple={true}
                  useDarkMode={true}
                  setSelectedRecords={() => console.log("hi")}
                  pageSize={2000}
                  pageNumber={1}
                  totalRowCount={2000}
                  onOptionSelect={() => console.log("hi")}
                  columnVisibility={[]}
                  hideFooter={false}
                  showCheckboxes={true}
                  fullWidth
                  classes="mb-1 mt-2"
                />
              </div>
            </div>
          )}

          {/* Sidebar and main content container */}
        </>
      )}
    </>
  );
};

export default HelloWorld;

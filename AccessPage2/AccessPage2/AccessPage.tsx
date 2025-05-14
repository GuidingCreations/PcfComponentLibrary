/* eslint-disable */

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import {determineScreenSize} from '../../utils'
import { GridColDef } from "@mui/x-data-grid";
import DataTableComponent from "../../DataTable/DataTable/DataTable";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Sidebar from "../../Sidebar2/Sidebar2/Sidebar";
import Stack from "@mui/material/Stack";
import ComboBox from "../../ComboBoxMUI/ComboBoxMUI/ComboBox";
import { createTheme,  ThemeProvider, Typography } from "@mui/material";
import Button from '../../Button/Button/Button'

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
  userSearchText: string;
  onOptionSelected: (optionText: string) => void
  handleNewUserSearchText: (newSearchText: string) => void;
  handleNewUserSelection : (newUser: any) => void
  addMemberToGroup: () => void
  addOwnerToGroup: () => void
  handleDataTableSelection: (recordIDs: any[]) => void
  handleDeleteUsers: () => void
  handleNewScreenSelection: (newScreenName: string) => void
}

const HelloWorld = (props: AccesPageProps) => {
  
  // Generate theme

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
      },
      MuiStack: {
        styleOverrides: {
          root: {
            alignItems: 'center',
            justifyContent: 'center'
          }
        }
      }
    }
  });

  // Establish states
  
  const [userSearchText, setUserSearchText] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<any>( null);
  const [changeType, setChangeType] = useState<string>('');

  
  // Function to call when new user is selected on add user section
  
  const handleNewSelectedUser = (newSelectedUser: any) => {

    if (newSelectedUser !== undefined) {
      
      setSelectedUser(newSelectedUser[0])
    
    }
  }

  // UseEffect handler to call back to index.ts and update output properties when selectedUser state changes

  useEffect(() => {

    console.log("sss", selectedUser)
    if (selectedUser) {

      props.handleNewUserSelection(selectedUser)
    
    }
  }, [selectedUser])

  // End 

  

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
    console.log("NEW SE TEXT PASSED: ", newSearchText)
    setUserSearchText(newSearchText);
    console.log("NEW SE TTEXT: ", userSearchText)
  }

  useEffect( () => {
    console.log("NEW SE TTEXT in useEFF: ", userSearchText)

    const timeoutID = setTimeout(() => {

      props.handleNewUserSearchText(userSearchText)
      
    }, 50);

    return () => clearTimeout(timeoutID)
    
  }, [userSearchText])

  useEffect(() => {
    console.log("NEW CH TY: ", changeType)
  }, [changeType])

  const handleNewChangeType  = (e: any) => {
    console.log("EVENT ", e); 
    const newValue = e[0];
    console.log("NEW VAL", newValue)
    if (e.length > 0) {
      setChangeType(e[0].label);
    } else {
      setChangeType('')
    }
   
  }


  const rows = props.columns.length > 0 ? props.Users : testRows;
  const columns = props.columns.length > 0 ? props.columns : testCols;

  const screenSize = determineScreenSize()

  const handleAddUser = () => {
    
    changeType == "Member" ?  props.addMemberToGroup() : props.addOwnerToGroup();
    setShowAddUserForm(false);
  
  }
  
  return (
    
        <>
          {/* If showAddUserForm is true, display the user form and hide everything else */}

          {showAddUserForm ? (
            
            <div
              className="w-full flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
<ThemeProvider theme={theme}>
              <Stack spacing={2} width={
                screenSize == 'xl' ? props.width * .25
                : screenSize == 'lg' ? props.width * .5 
                : screenSize == 'md' ? props.width * .75 
                : screenSize == 'sm' ? props.width * .8
                :  props.width}>

                <Typography variant="h5" color="white" gutterBottom>
                  Add User
                </Typography>




                <ComboBox
                  useTestData = {false}
                  height={50}
                  defaultHeight={50}
                  width={'100%'}
                  borderColor="white"
                  borderStyle="solid"
                  borderWidth="1px"
                  displayColumn="label"
                  Items={props.usersList}
                  labelText="New user"
                  handleNewUserSearchText={(newSearchText: string) => {console.log("TRYING NEW USER SEARCH TEXT", newSearchText); handleSearchTextChange(newSearchText)}}
                  allowSelectMultiple={false}
                  defaultValues={[{label: ''}]}
                  isDisabled={false}

                  darkMode
                  setSelectedRecords={(value: any, height: number) => {console.log("EVENTT mk: ", value, height); handleNewSelectedUser(value)}}
                  />
    
                <ComboBox
                  useTestData = {false}
                  height={50}
                  width={'100%'}
                  borderColor="white"
                  borderStyle="solid"
                  borderWidth="1px"
                  defaultHeight={50}
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
                  defaultValues={[{label: ''}]}
                  isDisabled={false}
                  darkMode
                  setSelectedRecords={(e: any) => {handleNewChangeType(e)}}
                  />


              <Stack alignItems={'stretch'} justifyContent={'center'} direction={'row'} spacing={2} width={'100%'} sx={{alignItems: 'center', justifyContent: 'center'}}>
              
                  <Button 
                    ButtonText="Add user"
                    useDarkMode
                    isDisabled = {false}
                    onClick={() => { handleAddUser() }}
                    size = "medium"
                    typeVariant="contained"
                    className="flex-grow"
                    />
                  
                  <Button 
                    ButtonText="Cancel"
                    useDarkMode
                    
                    isDisabled = {false}
                    onClick={() => {handleShowUserFormChange()}}
                    size = "medium"
                    className="flex-grow"
                    typeVariant="outlined"
                    />

                  
              </Stack>

              </Stack>
              </ThemeProvider>
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
                adjustScreenName={(newScreenName: string) => {console.log("clicked new screen"); props.handleNewScreenSelection(newScreenName)}}
                changeScreen={() => {}}
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
                    onClick={() => {props.handleDeleteUsers()}}
                  />
                </div>

                <DataTableComponent
                  tableColumns={columns}
                  primaryColor="Teal"
                  useTheming
                  tableData={rows}
                  height={props.containerHeight * 0.75}
                  width={props.width - props.sidebarWidth - 16}
                  defaultColumnWidths={[]}
                  allowSelectMultiple={true}
                  useDarkMode={true}
                  setSelectedRecords={(selectedRecordIDs: any[]) => props.handleDataTableSelection(selectedRecordIDs)}
                  pageSize={2000}
                  pageNumber={1}
                  totalRowCount={2000}
                  onOptionSelect={(optionText: string) => props.onOptionSelected(optionText)}
                  columnVisibility={{id: false}}
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
    

export default HelloWorld;

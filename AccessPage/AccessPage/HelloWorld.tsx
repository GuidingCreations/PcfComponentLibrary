/* eslint-disable */

import * as React from "react";
import { useEffect, useState } from "react";
import DataTableComponent from "../../DataTable/DataTable/DataTable";
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
  handleNewUserSearchText: (newSearchText: string) => void
}
import Sidebar from "../../Sidebar2/Sidebar2/Sidebar";
import Stack from "@mui/material/Stack";
import ComboBox from "../../ComboBoxMUI/ComboBoxMUI/ComboBox";
import { Typography } from "@mui/material";
import Button from '../../Button/Button/Button'

const HelloWorld = (props: AccesPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userSearchText, setUserSearchText] = useState<string>('')

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

  const handleNewUserSelection = (e: any) => {
    console.log("E:: ", e)
    console.log("TARgeT val: ", e.target.value);

  }

  useEffect(() => {console.log("NEW USER SER TRIGGERED: ", userSearchText); props.handleNewUserSearchText(userSearchText)}, [userSearchText])


  const rows = props.columns.length > 0 ? props.Users : testRows;
  const columns = props.columns.length > 0 ? props.columns : testCols;
  
  const handleNewSearchText = (newSearchText : string) => {
    setUserSearchText(newSearchText)
  }

  console.log("ROWS IN ACC: ", rows);
  console.log("COLS in ACC: ", columns);

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

                <ComboBox
                  useTestData = {props.useTestData}
                  displayColumn="label"
                  Items={props.usersList}
                  labelText="User"
                  allowSelectMultiple={false}
                  defaultValues={[]}
                  isDisabled={false}
                  darkMode
                  setSelectedRecords={(selectedRecords : any[], outputHeight: number) => {console.log("SEL RECS", selectedRecords)}}
                  handleSearchTextChange={(searchText: string) => {handleNewSearchText(searchText)}}
                  defaultSearchText = {userSearchText}
                />

                <ComboBox
                  useTestData = {false}
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
                  handleSearchTextChange={() => {}}
                  defaultSearchText=""
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

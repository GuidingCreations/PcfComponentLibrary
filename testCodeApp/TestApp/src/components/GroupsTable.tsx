import { GridColDef } from '@mui/x-data-grid';
import { ListOwnedGroups_V2_Response } from '../Models/Office365GroupsModel';
import { useEffect, useState } from 'react';
import {loadGroups} from '../../../../Code Apps utils/Groups utils'
import {
  DataGrid,

} from '@mui/x-data-grid';
import TestComp from '../../../../Code Apps Components/TestComp'


interface GroupsTableProps {
    classes?: string;
    styles?: any;
}

const GroupsTable = (props: GroupsTableProps) => {



    const [loading, setLoading] = useState(true);
    const [SecurityGroups, SetSecurityGroups] = useState<ListOwnedGroups_V2_Response  | undefined>(undefined)

    

    useEffect(() => {
      setLoading(true)
      const groups = Promise.resolve(loadGroups());
      groups.then((value) => {SetSecurityGroups( value); setLoading(false)});
      console.log("Sec groups: ", SecurityGroups)

    }, [])



  const cols : GridColDef[] = [
    {
      field: "id", 
      headerName: "Group ID", 
      display: 'flex', 
      width: 300 
    }, 
    {
      field: "displayName", 
      headerName: "Display name", 
      display: 'flex', 
      width: 250 
    }, 
    {
      field: "description", 
      headerName: "Group description", 
      display: 'flex', 
      width: 350 
    }, 
    {
      field: "groupTypes", 
      headerName: "Group types", 
      display: 'flex', 
      width: 100, 
      valueGetter: (value: string[]) =>value.join(", ")
    },
    {
      field: "securityEnabled", 
      headerName: "Security enabled", 
      display: 'flex', 
      width: 200 
    },     
    {
      field: "mail", 
      headerName: "Email", 
      display: 'flex', 
      width: 350 
    },
  ]

  return (
    <div className={props.classes} style={{width: '100%', height: '100%', flexGrow: 1}}>
    <TestComp/>
    <DataGrid

      showToolbar
      loading = {loading}
      disableMultipleRowSelection
      checkboxSelection 
      rows = {SecurityGroups as readonly any[]} 
      columns={cols} 
      slotProps={{
        toolbar: {
          showQuickFilter: true
        },
      
      }}/>
    </div>
  )
}

export default GroupsTable
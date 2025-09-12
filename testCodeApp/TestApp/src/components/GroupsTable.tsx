import { GridColDef, GridRowProps } from '@mui/x-data-grid';
import { ListOwnedGroups_V2_Response } from '../Models/Office365GroupsModel';
import { useEffect, useState } from 'react';
import { Office365GroupsService } from '../Services/Office365GroupsService';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
} from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';


interface GroupsTableProps {
    classes?: string;
    styles?: any;
}

const GroupsTable = (props: GroupsTableProps) => {



   const [loading, setLoading] = useState(true);
      const [SecurityGroups, SetSecurityGroups] = useState<ListOwnedGroups_V2_Response | undefined>(undefined)

    const loadGroups = async () => {
        try {
            const loadedGroups  = await Office365GroupsService.ListOwnedGroups_V2();
            const loadedGroupsData : ListOwnedGroups_V2_Response = loadedGroups.data.value
            console.log("LOADED GROUPS DATA: ", loadedGroupsData)
         
            console.log("FILTERED GROUPS: ", loadedGroupsData)

            SetSecurityGroups(loadedGroupsData);
            console.log("GROUPS SET: ", SecurityGroups)
        } catch (error : any) {
            throw new Error("An error occurred while loading groups: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadGroups();
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
      field: "groupTypes", 
      headerName: "Group types", 
      display: 'flex', 
      width: 250, 
      valueGetter: (value: string[]) =>value.join(", ")
    } 
  ]

  return (
    <div style={{width: '100%', height: '100%', flexGrow: 1}}>

    <DataGrid 
      showToolbar
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
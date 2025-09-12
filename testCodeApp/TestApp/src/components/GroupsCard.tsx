import { useEffect, useState } from 'react'
import { Office365GroupsService } from '../Services/Office365GroupsService'
import { ListOwnedGroups_V2_Response } from '../Models/Office365GroupsModel'
import Skeleton from '@mui/material/Skeleton'

export interface GroupsCardProps {
    GroupType: "any" | "M365" | "Entra"
}
const GroupsCard = (props: GroupsCardProps) => {
    const [loading, setLoading] = useState(true);
    const [SecurityGroups, SetSecurityGroups] = useState<ListOwnedGroups_V2_Response[] | undefined>(undefined)

    const loadGroups = async () => {
        try {
            const loadedGroups  = await Office365GroupsService.ListOwnedGroups_V2();
            const loadedGroupsData : any[] = loadedGroups.data.value
            console.log("LOADED GROUPS DATA: ", loadedGroupsData)
            const filteredGroups = 
                props.GroupType == "M365" ? loadedGroupsData.filter((item) => item.groupTypes.includes('Unified')) :
                props.GroupType == "Entra" ? loadedGroupsData.filter((item) => !item.groupTypes.includes("Unififed") && item.securityEnabled)
                : loadedGroupsData
            console.log("FILTERED GROUPS: ", filteredGroups)

            SetSecurityGroups(filteredGroups);
            console.log("GROUPS SET: ", SecurityGroups)
        } catch (error : any) {
            throw new Error("An error occurred while loading groups: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadGroups()

    }, [])

    return (
        <div >

            {
                loading ? (
                    <div style={{backgroundColor: '#121517', width: '250px', height: '156px', display: "flex", flexDirection: 'column', gap: '1rem'}}>
                        <Skeleton variant='rectangular' sx={{flexGrow: 1, marginRight: '1rem', marginTop: '1rem', marginLeft: '1rem', marginBottom: 0, width: '90%', height: '56px'}}/>
                        <Skeleton variant='rectangular' sx={{height: '50px',  flexGrow: 1, marginBottom: '1rem', marginLeft: '1rem', marginRight: '1rem', width: '90%'}}/>
                    </div>
                ) : (

                    <div style={{ backgroundColor: '#121517', padding: '.5rem 1rem', border: "1px solid whitesmoke", borderRadius: '10px', width: '250px', maxHeight: '175px' }}>

                    <h1 style={{margin: '1rem'}}>{SecurityGroups?.length}</h1>
                    <h4>{props.GroupType == "M365" ? "M365 Security Groups" : props.GroupType == "Entra" ? "Entra ID Security Groups" : "Groups"}</h4>
                </div>
                )
            }
        </div>
    )
}

export default GroupsCard
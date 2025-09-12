import GroupsCard from '../../../../components/GroupsCard'
import GroupsTable from '../../../../components/GroupsTable'
import Stack from '@mui/material/Stack'
const MyOwnedGroups = () => {
  return (
    
    <Stack className='MyOwnedGroupsWrapper' alignItems={"start"} padding={"1rem"} gap="1rem" sx={{flexGrow: 1}}>
      
      <div style={{display: 'flex', gap: '2rem'}}>
        <GroupsCard GroupType='Entra'/>
        <GroupsCard GroupType='M365'/>
      </div>

    <GroupsTable classes='' styles={{marginTop: '2rem'}}/>
    
    </Stack>
  )
}

export default MyOwnedGroups
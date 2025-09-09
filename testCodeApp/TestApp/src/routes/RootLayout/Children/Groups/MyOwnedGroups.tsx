import React from 'react'
import GroupsCard from '../../../../components/GroupsCard'

const MyOwnedGroups = () => {
  return (
    <div style={{padding: '1rem', display: 'flex', gap: '2rem'}}>
    <GroupsCard GroupType='Entra'/>
    <GroupsCard GroupType='M365'/>
    <div></div>
    </div>
  )
}

export default MyOwnedGroups
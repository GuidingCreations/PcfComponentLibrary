import * as React from 'react'
import Icon from '@mui/material/Icon'

const muiIcon = (icon: string) => {

  return (
    <Icon sx={{minWidth: '20px'}}>{icon}</Icon>
  )
}

export default muiIcon
import * as React from 'react'
import Icon from '@mui/material/Icon'

const muiIcon = (icon: string) => {

  return (
    <Icon sx={{height: 'fit-content'}}>{icon}</Icon>
  )
}

export default muiIcon
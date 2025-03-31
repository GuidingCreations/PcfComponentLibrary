/* eslint-disable */

import * as React from 'react'
import { primaryColorNames } from '../../../styling/colors'
import { Stack, Typography } from '@mui/material'
import generateTheme from '../../../styling/utils/theme-provider'
import { Config, PrimaryColor } from '../../../styling/types/types'
import { borderRadius } from '@mui/system'

interface primaryColorOptionsProps {
    activeColor: PrimaryColor,
    onSelectOption: (color: PrimaryColor) => void
}



const PrimaryColorOptions = (props: primaryColorOptionsProps) => {
  return (
    <Stack direction={'column'} gap={2} padding='16px'>


    <Typography variant = 'h6' color = 'white'>Primary color</Typography>

    <Stack direction='row' flexWrap= 'wrap' spacing={2} gap = {2} style={{}} alignItems={'center'} justifyContent={'start'}>
        {primaryColorNames.map((name) => {
            const config : Config = {
                Mode: 'dark', 
                primaryColor: name as PrimaryColor,


            }

            const tempTheme = generateTheme(config)
            const isActive = props.activeColor == name

            return (

                <div key={name} style={{margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'start', border: `${isActive ? '3px' : '1px'} solid ${props.activeColor == name ? tempTheme.palette.primary.main : 'rgba(255,255,255,.5)'}`, borderRadius: '10px', cursor: 'pointer', backgroundColor: '#32383e', padding: '8px 16px', flexBasis: '33%', gap: '8px', flexGrow: .33}} onClick={() => props.onSelectOption(name as PrimaryColor)}>
                    <div style={{width: '24px', height: '24px', backgroundColor: tempTheme.palette.primary.main, borderRadius: 10000}}></div>
                    <p style={{color: 'white', margin: '2px', fontSize: '1rem'}}>{name}</p>
                </div>
               
            )

        })}
    </Stack>

    </Stack>
  )
}

export default PrimaryColorOptions
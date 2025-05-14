/* eslint-disable */

import *  as React from 'react'
import { Mode } from '../../../styling/types/types'
import { Stack, Typography } from '@mui/material'
import { memo } from 'react';

interface themeModeOptionsProps {
    onChangeMode: (useDarkMode: boolean) => void,
    isDarkActive: boolean;
    activeOptionBorderColor: string
}

const ThemeModeOptions = memo( function ThemeModeOptions(props: themeModeOptionsProps) {

const modes = [{value: 'light', svgData: "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"}, {value: 'dark', svgData: 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z'}]

  return (
    <Stack direction={'column'} gap={1} spacing={1} padding={'16px'}>
        <Typography variant='h6' style={{color: 'white'}}>Color mode</Typography>
        <Stack direction={'row'} style={{}} gap={2}>
            {modes.map( (mode : any) => {

                const isActive = (props.isDarkActive && mode.value == 'dark') || (!props.isDarkActive && mode.value == 'light')
                const isDark = mode.value == 'dark'
                return (
                    <div onClick={(e) => props.onChangeMode(isDark)} style={{display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', padding: '8px 16px', borderRadius: '10px', backgroundColor: '#32383e', border: `${isActive ? `3px solid ${props.activeOptionBorderColor}` : ''}`}} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d={mode.svgData}/></svg>
                        <Typography variant='h6' style={{color: 'white'}}>{mode.value}</Typography>
                    </div>
                )
            })}
        </Stack>
    </Stack>
  )
})

export default ThemeModeOptions
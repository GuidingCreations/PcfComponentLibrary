import * as React from 'react'
import { Container, Link, Stack, ThemeProvider, Button } from '@mui/material';
import {Theme} from '../../../styling/types'

interface navLinkProps {
    useDarkMode: boolean
    isActive: boolean
    svgData?: string;
    linkText: string;
    onSelect: () => void;
    theme: Theme
}



const NavLink = (props: navLinkProps) => {
  
    return (

        <ThemeProvider theme = {props.theme}>

     <div 
        className = 'navItem'
        key={props.linkText} 
        style={{backgroundColor: props.isActive ? props.theme.palette.primary.main : '', paddingRight: '8px', marginRight: '0'}}
        onClick={(e) => {props.onSelect()}}
        
        >
        
        {props.svgData ? 
        
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="16px" fill={'white'} style={{minWidth: '16px'}}><path d={props.svgData}/></svg>
        : ''
    }

        <p style={{margin: 'auto 0', color: 'white', fontSize: '.875rem', lineHeight: `24px`}}>{props.linkText}</p>

      </div>

           

        </ThemeProvider>
  )

}

export default NavLink
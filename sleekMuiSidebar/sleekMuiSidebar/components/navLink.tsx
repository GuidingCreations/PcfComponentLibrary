/* eslint-disable */
import * as React from 'react'
import { Container, Link, Stack, ThemeProvider, Button, Icon, Box } from '@mui/material';
import {Theme, Mode} from '../../../styling/types/types'
import { ArrowDownward, ArrowRight, ArrowUpward } from '@mui/icons-material';
import { useState } from 'react';
import  {navLinkProps, navSection}  from '../testItems';
import generateTheme from '../../../styling/utils/theme-provider';

interface linkProps {
    activeItem: navLinkProps
    svgData?: string;
    linkText: string;
    onSelect: (item: any) => void;
    theme: Theme;
    isExpanded?: boolean;
    item: navLinkProps
}



const NavLink = (props: linkProps) => {
  
    // const activeBackgroundColor = props.theme.palette.primary.main 
    const [isExpanded, setISExpanded] = useState(props.isExpanded)
    
    

    return (

        <ThemeProvider theme = {props.theme}>

    {/* nav link wrapper */}

       

     <Stack 
        className='navItem'
        key={props.linkText} 
        style={{backgroundColor: props.activeItem == props.item && !props.item.children ? props.theme.palette.primary.main : '', padding: '4px 8px', marginRight: '0', flexGrow: 1}}
        onClick={(e) => {setISExpanded(!isExpanded); props.onSelect(props.item)}}
        direction={'row'}
        >
        
        {props.svgData ? 
        
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="16px" fill='white' style={{minWidth: '16px'}}><path d={props.svgData} fill='white'/></svg>
        : ''
    }

        <p style={{margin: 'auto 0', color: 'white', fontSize: '.875rem', lineHeight: `24px`, paddingLeft: '8px'}}>{props.linkText}</p>

        { props.item.children && isExpanded ? 
            <ArrowDownward style={{alignSelf: 'end', marginLeft: 'auto', fill: 'white'}} fontSize= {'small'}></ArrowDownward> 
            : props.item.children && !isExpanded ? <ArrowRight style={{alignSelf: 'end', marginLeft: 'auto', fill: 'white'}} fontSize= {'small'}></ArrowRight>
            : ''
    
    }
       
      
      
      
      </Stack>

    {props.item.children && isExpanded ? 
    
 <Box paddingLeft={'16px'} sx={{paddingTop: '8px'}}>

<Box sx={{paddingLeft: '8px', borderLeftStyle: 'solid', borderColor: '#32383e', borderLeftWidth: '1px'}}>
  <Stack direction={'column'}>
    {props.item.children.map((child : navLinkProps) => {
     
        const isMatched =  props.activeItem.navTitle == child.navTitle
     
        return (
            <div style={{cursor: 'pointer', backgroundColor: isMatched ? props.theme.palette.primary.main : '', padding: '4px 8px', marginRight: '0', marginLeft: '8px', flexGrow: 1}} onClick={(e) => {console.log("CLICKED");  props.onSelect(child)}} className={`navItem ${isMatched ? 'navItemActive' : ''}`} key={child.navTitle}>
                
                <p style={{margin: 0, textAlign: 'left', lineHeight: 2, color: 'white'}}>{child.navTitle}</p>
            </div>
        )
    })}
  </Stack>
</Box>
    </Box>   

: ''

}

           

        </ThemeProvider>
  )

}

export default NavLink
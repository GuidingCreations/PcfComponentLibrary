/* eslint-disable */
import * as React from 'react'
import { Stack, ThemeProvider, Box, Badge, SvgIcon} from '@mui/material';
import {Theme} from '../../../styling/types/types'
import { memo, useState } from 'react';
import  {navLinkProps}  from '../testItems';

interface linkProps {
    activeItem?: navLinkProps
    svgData?: string;
    linkText: string;
    onSelect: (item: any) => void;
    theme: Theme;
    isExpanded?: boolean;
    item: navLinkProps;
    badge?: any
}



const NavLink = memo(function NavLink(props: linkProps) {

    const renderSvgIcon = (item: any) => {

        console.log("BADGE: ", item);
        console.log("activeItems: ", props.activeItem, item)
        const isActive = props.activeItem == item
        console.log("IS ACTIVE: ", isActive)
        return (
        
        <Badge showZero badgeContent = {item.badge.badgeContent ?? 0} color={props.activeItem == item ? "secondary" : "primary"} sx={{marginLeft: '8px', marginRight: '16px'}} slotProps={{badge: {
            style: {
                height: '16px',
                width: '16px'
            }
        }}}>


     <svg xmlns="http://www.w3.org/2000/svg" 
        height="20px" 
        viewBox="0 -960 960 960" 
        width="20px" 
        fill="white">
            <path 
                d={item.badge.icon ?? null}/>
            </svg>
        </Badge> 
        
        )
    }
    
    // const activeBackgroundColor = props.theme.palette.primary.main 
    const [isExpanded, setISExpanded] = useState(props.isExpanded)
     console.log("PARENT ITEM: ", props.item)
    return (

        <ThemeProvider theme = {props.theme}>

            <Stack
            className='navItem'
            key={props.linkText} 
            style={{
                backgroundColor: props.activeItem == props.item && !props.item.children ? props.theme.palette.primary.main : '', 
                paddingTop: '6px', 
                paddingBottom: '6px', 
                paddingLeft: '4px', 
                marginTop: '4px', flexGrow: 1}}
            onClick={(e) => {setISExpanded(!isExpanded); props.onSelect(props.item)}}
            direction={'row'}
            flexWrap={"nowrap"}
            >
{props.svgData ? 
        
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="16px" fill='white' style={{minWidth: '16px'}}><path d={props.svgData} fill='white'/></svg>
        : ''
    }

    
    <p style={{margin: 'auto 0', color: 'white', fontSize: '.875rem', lineHeight: `24px`, paddingLeft: '8px'}}>{props.linkText}</p>

    {
        props.item.badge ?
        renderSvgIcon(props.item)
        :null
    }

    { props.item.children && isExpanded ? 
        
        <svg
            style={{marginLeft: 'auto'}} 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" viewBox="0 0 24 24" 
            width="24px" 
            fill="#e3e3e3">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
        </svg> : 

        props.item.children && !isExpanded ?

        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 0 24 24" 
            width="24px" 
            fill="#e3e3e3"
            style={{marginLeft: 'auto'}}
            >
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M10 17l5-5-5-5v10z"/>
            style
        </svg>

        : null
    }

            </Stack>



    {props.item.children && isExpanded ? 
    
 <Box paddingLeft={'16px'} sx={{paddingTop: '8px'}}>

<Box sx={{paddingLeft: '8px', borderLeftStyle: 'solid', borderColor: '#32383e', borderLeftWidth: '1px'}}>
  <Stack direction={'column'}>
    {props.item.children.map((child : navLinkProps, index) => {
     
        const isMatched =  props.activeItem?.navTitle == child.navTitle
     
        console.log("CHILD: ", child)
        return (

            !child.isHidden ?
            <div style={{
                cursor: 'pointer', 
                backgroundColor: isMatched ? props.theme.palette.primary.main : '', 
                paddingTop: '4px', 
                paddingBottom: '4px', 
                paddingLeft: '4px', 
                marginLeft: '8px', 
                marginTop: '4px',
                flexGrow: 1
            }} 
            onClick={(e) => {props.onSelect(child)}} className={`navItem ${isMatched ? 'navItemActive' : ''}`} key={index}>

                <p 
                    style={{
                        margin: 0, 
                        textAlign: 'left', 
                        lineHeight: 2, 
                        color: 'white', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: "ellipsis"}}>
                            {child.navTitle}
                </p>
                {
                    child.badge ?
                    renderSvgIcon(child) : null
                }

            </div> : ''
        )
    })}
  </Stack>
</Box>
    </Box>   

: null

}
       
        </ThemeProvider>

  )

})

export default NavLink
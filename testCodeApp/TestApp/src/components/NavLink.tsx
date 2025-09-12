/* eslint-disable */
import { Stack, ThemeProvider, Box, Badge} from '@mui/material';
import { memo, useState } from 'react';
import  {navLinkProps}  from './navItems';
import { useLocation } from 'react-router-dom';

interface linkProps {
    activeItem?: navLinkProps
    svgData?: string;
    linkText: string;
    onSelect: (item: any) => void;
    theme: any;
    isExpanded?: boolean;
    item: navLinkProps;
    badge?: any;
    href?: string;
}



const NavLink = memo(function NavLink(props: linkProps) {

    const pathName = useLocation().pathname;
    console.log("PATHs NAME: ", pathName)
    console.log("Location: ", useLocation());
    console.log("href: ", props.item.href);
    const isActive = useLocation().pathname == props.item.href;
    const renderSvgIcon = (item: any) => {

        return (
        
        <Badge showZero badgeContent = {item.badge.badgeContent ?? 0} color={isActive ? "secondary" : "primary"} sx={{marginLeft: '8px', marginRight: '16px'}} slotProps={{badge: {
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
                backgroundColor: isActive && !props.item.children ? props.theme.palette.primary.main : '', 
                paddingTop: '6px', 
                paddingBottom: '6px', 
                paddingLeft: '4px', 
                marginTop: '4px', flexGrow: 1}}
            onClick={() => {setISExpanded(!isExpanded); props.onSelect(props.item)}}
            direction={'row'}
            flexWrap={"nowrap"}
            >
{props.svgData ? 
        
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="16px" fill='white' style={{minWidth: '16px'}}><path d={props.svgData} fill='white'/></svg>
        : ''
    }

    
    <a href={props.item.href ?? undefined} style={{margin: 'auto 0', color: 'white', fontSize: '.875rem', lineHeight: `24px`, paddingLeft: '8px'}}>{props.linkText}</a>

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
     
        const isMatched =  pathName == child.href
     
        console.log("CHILD rendering: ", child, useLocation().pathname, "IS MATCHING: ", child.href == useLocation().pathname)
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
            onClick={() => {props.onSelect(child)}} className={`navItem ${isMatched ? 'navItemActive' : ''}`} key={index}>

                <a 
                    href={child.href}
                    style={{
                        margin: 0, 
                        textAlign: 'left', 
                        lineHeight: 2, 
                        color: 'white', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: "ellipsis"}}>
                            {child.navTitle}
                </a>
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
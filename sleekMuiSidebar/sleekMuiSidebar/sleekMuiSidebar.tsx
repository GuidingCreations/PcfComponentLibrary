/* eslint-disable */
"use client"

import * as React from 'react'
import {  useEffect, useRef, memo, useState } from 'react';
import { Box, Stack, Drawer } from '@mui/material';
import testItems, {navLinkProps, navSection} from './testItems';
import NavLink from './components/navLink';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, Mode, PrimaryColor } from '../../styling/types/types';
import PrimaryColorOptions from './components/primaryColorOptions';
import ThemeModeOptions from './components/themModeOptions';


export interface muiSidebarProps {
    
  containerHeight: number;
  containerWidth: number;
  useTestData: boolean;
  useDarkMode: boolean;
  primaryColor: PrimaryColor;
  navItems: any[];
  changePrimaryColor: (newColor: string) => void
  changeUseDarkMode: (useDarkMode: boolean) => void
  changeActiveScreen: (newScreenName: string) => void
  activeScreen: string;

}







const muiSidebar = memo(function muiSidebar(props: muiSidebarProps) {


const items : navSection[]  = props.useTestData ? testItems : props.navItems.length > 0 ? props.navItems : []

console.log("ITEMS: ", items)
  
const findActiveItem = () => {

  let activeItem = {}

  items.map( (navSection) => {

    navSection.children.map( (firstLevel) => {

      if (firstLevel.navTitle == props.activeScreen) {
        activeItem = firstLevel
      } else {
        firstLevel.children?.map( (secondLevel) => {
          
          if (secondLevel.navTitle == props.activeScreen) {
            
            firstLevel.isExpanded = true
            console.log("FOUND ITEM: ", secondLevel)
            activeItem = secondLevel;
            
          }
          
          
          
      });}
        
        
      })
      
  })

console.log("RETURNING ACTIVE ITEM: ", activeItem)
return activeItem

}


const primaryColor = useRef(props.primaryColor)
const [isOpen, setIsOpen] = useState(false)
const activeItem = useRef<any>(undefined);

const activeNav = findActiveItem();
console.log("ACTIVE NAV", activeNav);

if (activeNav != activeItem.current) {

  activeItem.current = activeNav;

  
}



  console.log("ACTIVE ITEM", activeItem)

  console.log()



  if (props.primaryColor != primaryColor.current) {
    console.log("SWITCHING TO PROPS PRIMARY COLOR")
    primaryColor.current = props.primaryColor
  }

  


  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: primaryColor.current as PrimaryColor
  }

  

  const [theme, setTheme] = useState(generateTheme({Mode: props.useDarkMode ? 'dark' : 'light', primaryColor: primaryColor.current}));
  
  const updateTheme = () => {
    setTheme(generateTheme({Mode: props.useDarkMode ? 'dark' : 'light', primaryColor: primaryColor.current}))
  }
  
  console.log("RETURNED THEME for SLEEK MUI SIDEBAR", theme)

  const updateActiveNav = (newNav: navLinkProps) => {
    
    console.log("CHANGING TO NEW NAV: ", newNav)
    activeItem.current = newNav;
    props.changeActiveScreen(activeItem.current.navTitle)

  }


return(


    
  <ThemeProvider theme={theme}>


  <Box sx={{height : '100%', width: '100%'}}>

  <Stack sx={{backgroundColor: theme.palette.primary.sidebarFill, justifyContent: 'space-between', height: '100%', width: '100%'}}>


  <Stack sx={{ height : '100%', width: '100%', paddingBottom: '16px', overflowY: 'scroll'}} id = "mainSidebarList">

  
  {
    items.length > 0 ?
     
    items.map( (navSection : navSection) => {
      return (
        
        // Wrapper for section labels
        
        <div 
        style={{
          display: navSection.isHidden ? 'none' : 'flex', 
          flexDirection: 'column', 
          paddingLeft: '16px',
          paddingTop: '16px',
          paddingRight: '8px'
          
        }}
        key={navSection.sectionTitle}  
        >
          
          <p style={{
            color: 'white',
            textAlign: 'left',
            fontWeight: '550',
            marginTop: 0
          }}
          className='sectionLabel'
          >
          
            {navSection.sectionTitle}
          
          </p>

          <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '24px'}}>
          {navSection.children.map( (child : navLinkProps) => {
            
            
            return(
              
              !child.isHidden ?
              <NavLink 
              theme = {theme}
              svgData = {child.icon}
              activeItem={activeItem.current}
              linkText = {child.navTitle}
              onSelect={(item: any) => {console.log("SETTING TO: ", item); !item.children ?  updateActiveNav(item) : ''; console.log("CHANGING TO: ", !child.isExpanded); child.isExpanded = !child.isExpanded}}
              isExpanded = {child.isExpanded}
              item = {child}
              />
            : <></>
            
            )
            
          })}
          </div>
        </div>

)})

: ''
}
      

     

  <Drawer open = {isOpen} anchor='right' onClose={() => setIsOpen(false)}>

    <Stack sx={{height: '100vh', backgroundColor: theme.palette.primary.sidebarFill, width: '400px'}} direction={'column'}>
      <PrimaryColorOptions activeColor={props.primaryColor} onSelectOption={(color: PrimaryColor) => {primaryColor.current = color ; updateTheme(); props.changePrimaryColor(color)}}/>
      <ThemeModeOptions activeOptionBorderColor={theme.palette.primary.main} isDarkActive = {props.useDarkMode} onChangeMode={(useDarkMode: boolean) => props.changeUseDarkMode(useDarkMode)}/>
    </Stack>

  
  
  </Drawer>

  </Stack>
  <div 
      style={{display: 'flex', flexDirection: 'row', gap: '8px', paddingLeft: '16px', alignItems: 'center', cursor: 'pointer',
        paddingTop: '8px',
        paddingRight: '8px', paddingBottom: '8px'}}
      className='navItem'
      onClick={() => setIsOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill='white' style={{minWidth: '16px', margin: 'auto 0'}}><path d={"m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"} fill='white'/></svg>
          <p style={{
            color: 'white',
            textAlign: 'left',
            fontWeight: '550',
            margin: 'auto 0'
          }}
          className='sectionLabel'
          >
          
            Theme Settings
          
          </p>

          
        </div>

  </Stack>

  </Box>

 
</ThemeProvider>


)

})



export default muiSidebar

/*

const rootSpacing = '8px'


const muiSidebar = (props: muiSidebarProps) => {
  
const [activeItem, setActiveItem] = useState(testItems[0].children[0])
    
const styles = {
  '--var-activeLinkBackgroundFill' : `${props.darkModeActiveBackground}`
} as React.CSSProperties

  return (

// Sidebar wrapper
<ThemeProvider theme={createMuiTheme()}>
    <Stack color={'secondary'}>

    <div 
      className='sidebarWrapper'
      style={{
        backgroundColor: props.darkModeCanvasColor,
        padding: `calc(2 * ${rootSpacing})`,
        display: 'flex',
        flexDirection: 'column'
      }}    
    >

    {
      testItems.map( (navSection : navSection) => {
        return (

        // Wrapper for section labels

        <div 
          style={{
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%',
          }}
          key={navSection.sectionTitle}  
        >
          
          <p style={{
            color: props.darkModeIconColor,
            textAlign: 'left',
            fontWeight: '550',
            
          }}
          className='sectionLabel'
          >
          
            {navSection.sectionTitle}
          
          </p>

          <div style={{display: 'flex', flexDirection: 'column', gap: rootSpacing}}>
          {navSection.children.map( (child : navLinkProps) => {
            
            return (

              // wrapper for nav items

              <div 
                className= {`navItem ${activeItem == child ? 'navItemActive': ''}`} 
                key={child.navTitle} 
                style = {styles}
                onClick={(e) => {setActiveItem(child)}}
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={props.darkModeIconColor}><path d={child.icon}/></svg>
                <p style={{margin: 'auto 0', color: props.darkModeNavTextColor, fontSize: '.875rem', lineHeight: `calc(3 * ${rootSpacing})`}}>{child.navTitle}</p>

              </div>
            
          )
            
              
            

          })}
          </div>
        </div>

      )})
    }
    
    </div>
    </Stack>

    </ThemeProvider>


  )
}

export default muiSidebar

*/
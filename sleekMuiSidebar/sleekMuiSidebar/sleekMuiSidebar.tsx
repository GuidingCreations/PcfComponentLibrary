/* eslint-disable */

import * as React from 'react'
import Icon from '@mui/material/Icon';
import muiIcon from './components/Icon';
import { useEffect, useState } from 'react';
import { Box, PaletteMode, Stack, useColorScheme } from '@mui/material';
import {Button} from '@mui/material';
import testItems, {navLinkProps, navSection} from './testItems';
import NavLink from './components/navLink';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { primaryColorNames } from '../../styling/colors';
import { Config, Mode, PrimaryColor } from '../../styling/types/types';
export interface muiSidebarProps {
    
  containerHeight: number;
  containerWidth: number
  useTestData: boolean    

}







const muiSidebar = (props: muiSidebarProps) => {
  
  
  const [activeItem, setActiveItem] = useState(testItems[0].children[0])
  const [mode, setMode] = useState(localStorage.getItem("pcfPrimaryColorMode") || 'dark');
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("pcfPrimaryColorTheme") || 'green');

  const config : Config = {
    Mode: mode as Mode,
    primaryColor: primaryColor as PrimaryColor
  }

  const theme = generateTheme(config);
  console.log("RETURNED THEME", theme)
  
  useEffect(() => {
    localStorage.setItem("pcfPrimaryColorMode", mode)
  }, [mode])
  
  useEffect(() => {
    localStorage.setItem("pcfPrimaryColorTheme", primaryColor)
  }, [primaryColor])


return(

  <ThemeProvider theme={theme}>

  <button  style={{backgroundColor: theme.palette.primary.main}} onClick={(e) => {setMode(mode == 'dark' ? 'light': 'dark')}}>test button</button>

  <Box sx={{height : '100%', width: '100%'}}>

  <Stack sx={{backgroundColor: theme.palette.primary.sidebarFill, height : '100%', width: '100%'}} >

  {
      testItems.map( (navSection : navSection) => {
        return (

        // Wrapper for section labels

        <div 
          style={{
            display: 'flex', 
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

            child.isExpanded = false

            return(

              <NavLink 
              theme = {theme}
              svgData = {child.icon}
              activeItem={activeItem}
              linkText = {child.navTitle}
              onSelect={(item: any) => {console.log("SETTING TO: ", item); !item.children ?  setActiveItem(item) : ''; console.log("CHANGING TO: ", !child.isExpanded); child.isExpanded = !child.isExpanded}}
              isExpanded = {child.isExpanded}
              item = {child}
              />
            )
            
          })}
          </div>
        </div>

      )})
    }
    

  </Stack>
  </Box>

 
</ThemeProvider>
)

}



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
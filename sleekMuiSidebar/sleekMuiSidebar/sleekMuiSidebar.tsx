/* eslint-disable */

import * as React from 'react'
import Icon from '@mui/material/Icon';
import muiIcon from './components/Icon';
import { useState } from 'react';
import { Stack, ThemeProvider } from '@mui/material';
import {Button} from '@mui/material';
import testItems, {navLinkProps, navSection} from './testItems';
import NavLink from './components/navLink';
import {createTheme} from '../../styling/create-theme'

export interface muiSidebarProps {
    
  darkModeCanvasColor: string;
  darkModeIconColor: string;
  darkModeNavTextColor: string;
  darkModeNavItemHoverBackground: string;
  darkModeActiveBackground: string;
  darkModeActiveIconColor: string;
  useTestData: boolean    

}



const theme = createTheme({primaryColor: 'neonBlue'})




const muiSidebar = (props: muiSidebarProps) => {

  const [activeItem, setActiveItem] = useState(testItems[0].children[0])

return(

  <ThemeProvider theme={theme}>

  <Stack sx={{backgroundColor: 'black', height: '100vh', width: '10vw'}} padding='16px'>

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

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {navSection.children.map( (child : navLinkProps) => {
            return(

              <NavLink 
              theme = {theme}
              svgData = {child.icon}
              useDarkMode
              isActive = {activeItem == child}
              linkText = {child.navTitle}
              onSelect={() => setActiveItem(child)}
              />
            )
            
          })}
          </div>
        </div>

      )})
    }
    

  </Stack>

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
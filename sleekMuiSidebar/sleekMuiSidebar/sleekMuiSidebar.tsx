/* eslint-disable */

import * as React from 'react'
import Icon from '@mui/material/Icon';
import muiIcon from './components/Icon';
export interface muiSidebarProps {
    
  darkModeCanvasColor: string;
  darkModeIconColor: string;
  darkModeNavTextColor: string;
  darkModeNavItemHoverBackground: string;
  darkModeActiveBackground: string;
  darkModeActiveIconColor: string;
  useTestData: boolean    
}


interface navSection {
  sectionTitle: string;
  children: navLink[]
}

interface navLink {
  icon: string;
  navTitle: string
}



const testItems : navSection[] = [
  {
    sectionTitle: "Dashboards",
    children: [
      {
        icon: "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z",
        navTitle: "Overview"
      },
      {
        icon: "M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z",
        navTitle: "Analytics"
      }
    ]
  }
]

const rootSpacing = '8px'

const muiSidebar = (props: muiSidebarProps) => {

    

  return (
    <div 
      className='sidebarWrapper'
      style={{
        width: '10vw',
        height: '100vh',
        backgroundColor: props.darkModeCanvasColor,
        padding: `calc(2 * ${rootSpacing})`,
        display: 'flex'
      }}    
    >

    {
      testItems.map( (navSection : navSection) => {
        return (

        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          
          <p style={{
            color: props.darkModeIconColor,
            textAlign: 'left'
          }}>
          
            {navSection.sectionTitle}
          
          </p>

          <div style={{display: 'flex', flexDirection: 'column', gap: rootSpacing}}>
          {navSection.children.map( (child : navLink) => {
            
            return (
              <div key={child.navTitle} style={{display: 'flex', gap: rootSpacing, width: '100%', marginLeft: `calc(2 * ${rootSpacing})`, height: 'fit-content'}}>
                
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={props.darkModeIconColor}><path d={child.icon}/></svg>
                <p style={{margin: 'auto 0', color: props.darkModeNavTextColor}}>{child.navTitle}</p>
              </div>
            )
            
              
            

          })}
          </div>
        </div>

      )})
    }
    
    </div>
  )
}

export default muiSidebar
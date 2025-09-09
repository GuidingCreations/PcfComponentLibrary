import { useState } from 'react'
import { Box, Stack, Drawer, Badge } from '@mui/material';
import navItems, { navSection, navLinkProps } from './navItems';
import NavLink from './NavLink';
import { useCustomThemeContext } from '../contexts/CustomThemeContext';
import '../Styling/Sidebar.css'

const Sidebar = () => {

   const {CustomTheme, SetCustomTheme} = useCustomThemeContext();
const [isOpen, setIsOpen] = useState(false)


  return (
     <Box sx={{height : '100vh', width: '15vw'}}>
       <Stack sx={{backgroundColor: "#151b23", justifyContent: 'space-between', height: '100%', width: '100%'}}>
        <Stack sx={{ height : '100%', width: '100%', paddingBottom: '16px', overflowY: 'scroll'}} id = "mainSidebarList" alignItems='start'>
    
          {
            navItems.length > 0 ? 
              navItems.map( (navSection : navSection) => {
                return (
                  navSection.isHidden ? null : 
                  <div
                  className='sectionWrapper' 
                  style={{
                    display: navSection.isHidden ? 'none' : 'flex', 
                    flexDirection: 'column', 
                    paddingLeft: '16px',
                    paddingTop: '16px',
                    paddingRight: '8px',
                    alignItems: 'left',
                    width: '100%'
                    }
                  }>
                    <p style={{color: 'white', textAlign: 'left'}}>{navSection.sectionTitle}</p>
              
  
              <Stack style={{paddingLeft: '24px', paddingRight: '32px'}}>

                  {navSection.children.map( (child : navLinkProps) => {
                    return(
              
              !child.isHidden ?
             

              <NavLink 
              theme={CustomTheme}
              svgData = {child.icon}
              activeItem={child}
              linkText = {child.navTitle}
              onSelect={() => {}}
              isExpanded = {child.isExpanded}
              item = {child}
              badge={child.badge ?? undefined}
              />
               
              : <></>
            
            )
                    
                  })}
              </Stack>

                  </div>
                )
              
              })
            
            :
            null
          }

    <Drawer open = {isOpen} anchor='right' onClose={() => setIsOpen(false)}>
     <Stack sx={{height: '100vh', backgroundColor: "#151b23", width: '400px'}} direction={'column'}>
      {/* Options for changing theme will go here */}
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
          <p style={{ color: 'white', textAlign: 'left', fontWeight: '550', margin: 'auto 0'}} className='sectionLabel'>
            Theme Settings
          </p>
    </div>
  </Stack>
  </Box>
  )
}

export default Sidebar
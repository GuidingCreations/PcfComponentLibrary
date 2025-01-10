
import { useRef, useState } from 'react'
import DarkLightToggle from "../../DarkLightToggle/DarkLightToggle/HelloWorld"
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import * as React from 'react'

// Establish testData

const testData = {
  navigation: [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#Team', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#Projects', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#Calendar', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#Documents', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#Reports', icon: ChartPieIcon, current: false },
  ]
}

// Function for concatting class names with ' '

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

// Establish props

export interface SidebarProps {
  height: number;
  width: number;
  useDarkMode: boolean;
  defaultDarkMode: boolean
  handleToggleChange: (newValue: boolean) => void
  navItems: any[],
  adjustScreenName: (newScreenName: any) => void;
  changeScreen: () => void;
}

function renderSvgUrl(svgData: string) {
  const source = svgData;
  
  return "data:image/svg+xml;base64," + btoa(source);

}


// Start component

export default function SidebarTW(props : SidebarProps) {
  
  /* Establish states: 
  
  1. renderCount - we need this because pcf components don't pass data in on first render, so we need to count renders to pass in data on the render which the data actually comes through
  2. darkMode - establishes whether to display dark or light version of sidebar 
  */
  
  const renderCount = useRef(0);
  renderCount.current++;
  const darkMode = useRef(true);

// On the third render (when the data actually comes through - thanks pcf * eye roll *), set the state of dark mode to the value passed in from props

  if (renderCount.current == 3) {
    console.log("SETTING STATE")
    darkMode.current = props.defaultDarkMode
  }
  
  // for the initial render, pass the props back up to the parent so it generates the output property needed to be accessible by other controls in power apps

  if(renderCount.current == 1) {
    console.log("HANDLE INITIAL RENDER")
    props.handleToggleChange(props.useDarkMode);
    console.log("End INITIAL RENDER")

  }

  // Handle change in dark/light mode

const handleModeChange = () => {
  darkMode.current = !darkMode.current
  props.handleToggleChange(darkMode.current)  
}

  return (
    <>
      
      <div style={{width: `${props.width}px`, height: `${props.height}px`}}>
       
      
        <div className="lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-full h-full overflow-hidden">
          
          
          <div className={`flex grow flex-col gap-y-5 rounded-tr-md border border-solid border-slate-900 overflow-hidden  px-6 ${!darkMode.current ? "bg-gray-100" : "bg-gray-900"}`}>
          
          {/* top row of header where icon and dark/light toggle are */}
            
            <div className="flex h-16 shrink-0 items-center justify-between">
          
          {/* main icon */}
          
              <img
                alt="Your Company"
                src= {`https://tailwindui.com/plus/img/logos/mark.svg?color=${darkMode.current ? "indigo&shade=500" : "black"}`}
                className="h-8 w-auto"
                />
                
              {/* dark/light toggle */}
              
               <div >
                    <DarkLightToggle
                    defaultDarkMode = {true}
                    useDarkMode = {true}
                    handleToggleChange={() => handleModeChange()}
                    />
                </div>

            </div>


            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {props.navItems.map((item) => (
                      <li key={item.screenName} onClick={() => { props.adjustScreenName(item.screenName); props.changeScreen() }} className={
                            
                        darkMode.current ? 
                        
                        classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                      ) : classNames(
                        item.current
                          ? 'bg-slate-900 text-white border-l-blue-500 border border-l-4'
                          : 'text-slate-900 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                      )
                    
                    
                    }  >
                        
                          
                          
                       
                          <img src = {renderSvgUrl(item.svgData)}  className= "size-8 shrink-0">
                          </img>
                          <h2 className='text-white mt-auto mb-auto font-semibold'>{item.screenName}</h2>
                       
                      </li>
                    ))}
                  </ul>
                </li>
                


               <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className={`flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold  ${ darkMode.current ? " text-white bg-slate-900" : "text-white bg-slate-900"}  text-white hover:bg-gray-800`}
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-800"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div>
    </>
  )
}
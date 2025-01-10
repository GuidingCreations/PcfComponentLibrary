
import { useRef, useState } from 'react'
import DarkLightToggle from "../../DarkLightToggle/DarkLightToggle/HelloWorld"
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import * as React from 'react'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]


function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export interface SidebarProps {
  height: number;
  width: number;
  useDarkMode: boolean;
  defaultDarkMode: boolean
  handleToggleChange: (newValue: boolean) => void

}

export default function SidebarTW(props : SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("PROPPP DARKMODE", props.defaultDarkMode)
  console.log("RENDER COUNT", renderCount.current)
  const darkMode = useRef(true);

  if (renderCount.current == 3) {
    console.log("SETTING STATE")
    darkMode.current = props.defaultDarkMode
  }

  console.log("DEFAULT DARK MODE", darkMode.current)

  
  
  if(renderCount.current == 1) {
    console.log("HANDLE INITIAL RENDER")
    props.handleToggleChange(props.useDarkMode);
    console.log("End INITIAL RENDER")

  }






const handleModeChange = () => {
  console.log("CURRENT MODE", darkMode.current);
  darkMode.current = !darkMode.current
  console.log("NEW MODE", darkMode.current);
  props.handleToggleChange(darkMode.current)
  
}

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div style={{width: `${props.width}px`, height: `${props.height}px`}}>
       
      
        {/* Static sidebar for desktop */}
        <div className="hidden lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-full h-full overflow-hidden">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className={`flex grow flex-col gap-y-5 rounded-tr-md border border-solid border-slate-900 overflow-hidden  px-6 ${!darkMode.current ? "bg-gray-100" : "bg-gray-900"}`}>
            <div className="flex h-16 shrink-0 items-center justify-between">
              <img
                alt="Your Company"
                src= {`https://tailwindui.com/plus/img/logos/mark.svg?color=${darkMode.current ? "indigo&shade=500" : "black"}`}
                className="h-8 w-auto"
              />
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
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={
                            
                            darkMode.current ? 
                            
                            classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          ) : classNames(
                            item.current
                              ? 'bg-slate-900 text-white border-l-iwhite border border-l-4'
                              : 'text-slate-900 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )
                        
                        
                        }  
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </a>
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
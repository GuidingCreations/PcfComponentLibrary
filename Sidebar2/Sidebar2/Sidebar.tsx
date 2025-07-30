// Imports

import { useRef, useState } from "react";
import DarkLightToggle from "../../DarkLightToggle/DarkLightToggle/HelloWorld";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import * as React from "react";

//Test data

const testData = {
  navigation: [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#Team", icon: UsersIcon, current: false },
    { name: "Projects", href: "#Projects", icon: FolderIcon, current: false },
    { name: "Calendar", href: "#Calendar", icon: CalendarIcon, current: false },
    {
      name: "Documents",
      href: "#Documents",
      icon: DocumentDuplicateIcon,
      current: false,
    },
    { name: "Reports", href: "#Reports", icon: ChartPieIcon, current: false },
  ],
};

// Function for concatting class names with ' '

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// Establish props

export interface SidebarProps {
  height: number;
  width: number;
  useDarkMode: boolean;
  defaultDarkMode: boolean;
  activeScreen: string;
  mainLogo: string;
  handleToggleChange: (newValue: boolean) => void;
  navItems: any[];
  adjustScreenName: (newScreenName: any) => void;
  changeScreen: () => void;
  userImage: string;
  userName: string;
  iconColor: string;
  navItemHeight: number;
}

// Start component

export default function SidebarTW(props: SidebarProps) {
  /* Establish states: 
  
  1. renderCount - we need this because pcf components don't pass data in on first render, so we need to count renders to pass in data on the render which the data actually comes through
  2. darkMode - establishes whether to display dark or light version of sidebar 
  */

  const renderCount = useRef(0);
  renderCount.current++;
  const darkMode = useRef(props.defaultDarkMode);

  // On the third render (when the data actually comes through - thanks pcf * eye roll *), set the state of dark mode to the value passed in from props

  if (renderCount.current == 3) {
    darkMode.current = props.defaultDarkMode;
  }

  // for the initial render, pass the props back up to the parent so it generates the output property needed to be accessible by other controls in power apps


  // Handle change in dark/light mode

  const handleModeChange = () => {
    if (renderCount.current >= 3) {
      darkMode.current = !darkMode.current;
      props.handleToggleChange(darkMode.current);
    }
  };

// Render svg

  function renderSvgUrl(svgData: string) {
    
    
    const source = svgData ? svgData.replace("iconColor", props.iconColor || "white") : ''

    return "data:image/svg+xml;base64," + btoa(source);
  }

  const itemRef = useRef<any>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const switchExpanded = (item: any) => {
    itemRef.current = item;
    isExpanded ? setIsExpanded(false) : setIsExpanded(true);
  };

  return (
    <>

{/* Start sidebar */}

      <div style={{ width: `${props.width}px`, height: `${props.height}px` }}>
        <div className="lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-full h-full overflow-hidden">
          <div
            className={`flex grow flex-col gap-y-5 h-full rounded-tr-md border border-solid border-slate-900 overflow-hidden  px-6 ${
              !darkMode.current ? "bg-white" : "bg-gray-900"
            }`}
          >
            {/* top row of header where icon and dark/light toggle are */}

            <div className="flex h-16 shrink-0 items-center justify-between" style={{maxHeight: '50px'}}>
              {/* main icon */}

              {props.mainLogo ? 
              
              <img
              alt="Your Company"
              src={props.mainLogo}
              className=""
              style={{height: '100%'}}
            /> : ''
            
            }
              
              

              {/* dark/light toggle */}

              <div>
                <DarkLightToggle
                  defaultDarkMode={darkMode.current}
                  useDarkMode={darkMode.current}
                  handleToggleChange={() => {handleModeChange()}}
                  
                />
              </div>
            </div>

{/* Screen list */}

            <nav className="flex flex-1 flex-col">
              
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
              
                <li>
              
                  <ul role="list" className="-mx-2 space-y-1">
              
{/* Map through screens */}

                    {props.navItems.map((item) =>


// If there are no child screens

                      !item.children ? 
                      (
                        <li
                          key={item.screenName}
                          style={{ height: `${props.navItemHeight}px` }}
                          onClick={() => {
                            itemRef.current = item;
                            props.adjustScreenName(item.screenName);
                          }}
                          ref={itemRef}
                          className={
                            darkMode.current
                              ? classNames(
                                  props.activeScreen == item.screenName
                                    ? "bg-gray-800 text-white"
                                    : ` text-gray-400 hover:bg-gray-800 hover:text-white `,
                                  "cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )
                              : classNames(
                                  props.activeScreen == item.screenName
                                    ? "bg-gray-100 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-50 group-hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )
                          }
                        >
                    
                          
                          <img
                            src={renderSvgUrl(item.svgData)}
                            className="size-8 shrink-0 mt-0 mb-0"
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                          ></img>
                          
                           <h2 style={{marginTop: 'auto', marginBottom: 'auto'}}>
                           {item.screenName}
                            </h2> 
                          
                        
                        </li>
                      ) : 
                      
// If there are child screens
                      
                      (
                        <div className="flex flex-col" key={item.name}>
                       
{/* Parent screen */}

                          <li
                            className={ darkMode.current ? classNames(
                                      item.children.some((child : any) =>  child.screenName == props.activeScreen) || item.screenName == props.activeScreen
                                      ? "text-white bg-gray-800"
                                      : ` text-gray-400 hover:bg-gray-800`,
                                        "cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                    ) : classNames(
                                    
                                      item.children.some((child : any) =>  child.screenName == props.activeScreen) || item.screenName == props.activeScreen
                                      ? "text-black bg-gray-100"
                                      : "text-black hover:bg-gray-50 hover:text-indigo-600",
                                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                  )
                            }
                            id={item.screenName}
                            key={item.screenName}
                            ref={itemRef}
                            onClick={() => { itemRef.current = item;  switchExpanded(item); } }
                            style={{ height: `${props.navItemHeight}px` }}
                          >
                            <img
                              src={renderSvgUrl(item.svgData)}
                              className="size-8 shrink-0"
                              style={{marginTop: 'auto', marginBottom: 'auto'}}
                            ></img>
                            <h2
                              className=""
                              style={{
                                marginTop: "auto",
                                marginBottom: "auto",
                              }}
                            >
                              {" "}
                              {item.screenName}{" "}
                            </h2>
                            {itemRef.current == item && isExpanded ? (
                              <ChevronUpIcon
                                color = {darkMode.current ? "white" : "black"}
                                className="h-full"
                                style={{ width: "1.5rem", marginLeft: 'auto'}}
                                onClick={() => {
                                 
                                }}
                                cursor={"pointer"}
                              />
                            ) : (
                              <ChevronDownIcon
                                color = {darkMode.current ? "white" : "black"}
                                className="h-full"
                                style={{ width: "1.5rem", marginLeft: 'auto' }}
                                onClick={() => {
                                  switchExpanded(item);
                                }}
                                cursor={"pointer"}
                              />
                            )}
                          </li>

{/* Child screens */}
                 
                 
                          {item.children.map((child: any) => (
                         
                         <li
                              key={child.screenName}
                              className={
                                darkMode.current
                                  ? classNames(
                                      props.activeScreen == child.screenName
                                        ? "bg-gray-800 text-white"
                                        : ` text-gray-400 hover:bg-gray-800 hover:text-white `,
                                      "cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                    )
                                  : classNames(
                                      props.activeScreen == child.screenName
                                        ? "bg-gray-100"
                                        : " hover:bg-gray-50 hover:text-indigo-600",
                                      "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-black"
                                    )
                              }
                              style={{
                                display:
                                  itemRef.current == item && isExpanded
                                    ? "block"
                                    : "none",
                              }}
                              onClick={() => {
                                itemRef.current = item;
                                props.adjustScreenName(child.screenName);
                              }}
                            >
                              <h2
                                style={{ textAlign: "center" }}
                                className = {
                                  props.activeScreen == child.screenName
                                  ?   darkMode.current ? 'text-white' : 'text-black'
                                  :   darkMode.current ? 'text-white' : 'text-black'
                                
                                
                                }
                              >
                                {child.screenName}
                              </h2>
                            </li>
                          ))}
                        </div>
                      )
                    )}
                  </ul>
                </li>


{/* User profile/image section */}


                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className={`flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold  ${
                      darkMode.current
                        ? " text-white bg-slate-900"
                        : "text-slate-900 bg-white"
                    }`}
                  >
                    <img
                      alt=""
                      src={
                        props.userImage ||
                        "https://res.cloudinary.com/dsvmviwkc/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1724713434/kfrdtkueqel1bqm9ie2y.jpg"
                      }
                      className="size-8 rounded-full bg-gray-800"
                      color="pink"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{props.userName}</span>
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
  );
}

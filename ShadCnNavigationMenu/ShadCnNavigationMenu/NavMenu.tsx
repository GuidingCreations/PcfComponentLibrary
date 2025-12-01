/* eslint-disable */
"use client"

// imports

import * as React from "react"

import { useIsMobile } from "../../utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"
import { memo } from "react";

// interfaces



export interface navItemProps {
  Title: string;
  Description?: string;
  children?: navItemProps[]
}

// test data

const testData : navItemProps[] = [
  {Title: "Home"},
  {
    Title: "Components",
    children: [
        {
    Title: "Alert Dialog",
    Description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    Title: "Hover Card",
    Description:
      "For sighted users to preview content available behind a link.",
  },
  {
    Title: "Progress",
    Description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    Title: "Scroll-area",
    Description: "Visually or semantically separates content.",
  },
  {
    Title: "Tabs",
    Description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    Title: "Tooltip",
    Description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
    ]

  },
  {
    Title: "Test",
    children: [
      {Title: "Item 1", Description: "This is the first item in the list of children"},
      {Title: "Item 2", Description: "This is the second item in the list of children"},
      {Title: "Item 3", Description: "This is the third item in the list of children"}
    ]
  },
  {
    Title: "Single Col",
    children: [{
      Title: "Item 1",
      Description: "This will be the only item in this list"
    }]
  }
]

export interface NavMenuProps {
  useDarkMode: boolean;
  NavItems: navItemProps[];
  useTestData: boolean;
  onNavSelect: (navText: string) => void
}

const NavMenu = (props: NavMenuProps) => {
  
  const isMobile = useIsMobile()

  // Establish light vs dark mode

  const root = window.document.documentElement
  
  if (props.useDarkMode) {
    root.classList.add("dark");
    root.classList.remove("light")
  } else {
    root.classList.add("light");
    root.classList.remove("dark")
  }

  // is mobile?

  console.log(isMobile)

  const data = props.useTestData ? testData : props.NavItems  

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        
        {/* Loop through root items */}
        
        {data.map((item, index) => (
          <NavigationMenuItem key={index}>
            {

              // If there are children, populate trigger and content

              item.children ? <>
                <NavigationMenuTrigger className={`text-black ${props.useDarkMode ? 'text-white' : null}`} style={{fontWeight: 600}}>{item.Title}</NavigationMenuTrigger> 
                <NavigationMenuContent style={{width: "fit-content"}}>
                  <ul className={`grid gap-2 ${item.children.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} `} style={{width: item.children.length > 1 ? '600px' : '300px'}}>
                    {item.children.map((child, index) => (
                      <ListItem key={index} title={child.Title} className="font-semibold" onClick={() => props.onNavSelect(child.Title)}>
                        {child.Description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
              
              // If there are no children, just populate item

              : 
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <p className={`clickable`} style={{color: props.useDarkMode ? 'white' : 'black', fontWeight: 600}} onClick={() => {props.onNavSelect(item.Title)}}>{item.Title}</p>
                </NavigationMenuLink>
              </NavigationMenuItem> 
                
                
                }
          </NavigationMenuItem>
        ))}


      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default memo(NavMenu)

function ListItem({
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a className="h-full clickable">
          <div className="text-sm leading-none font-medium text-left" style={{fontWeight: 600}}>{title}</div>
          <p style={{minWidth: '250px'}} className="text-muted-foreground line-clamp-3 text-sm leading-snug text-pretty text-left">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

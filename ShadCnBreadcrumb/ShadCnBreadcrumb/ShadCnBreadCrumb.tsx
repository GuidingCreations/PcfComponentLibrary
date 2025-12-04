import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import * as React from "react"
import {generateShadCnTheme} from '../../utils'

interface childItem {
  Title: string;
}

interface parentItem {
  Title?: string;
  children?: childItem[]
}

export interface BreadCrumbProps {
  navItems: parentItem[];
  onNavItemSelect: (navItemTitle: string) => void;
  themeColor: string;
  useDarkMode: boolean
}


export function BreadcrumbDemo(props: BreadCrumbProps) {
  
  const root = window.document.documentElement

  if (props.useDarkMode) {
    root.classList.add("dark");
    root.classList.remove("light")
  } else {
    root.classList.add("light");
    root.classList.remove("dark")
  }

  const varDemoData : parentItem[] = [
    {
      Title: "Home",  
    },
    {
      children: [
        {Title: "How to do abc"},
        {Title: "How to do def"},
        {Title: "How to do ghi"},
        {Title: "How to do jkl"},
      ]
    },
    {
      Title: "Navigation item 2"
    },
    {
      Title: "Navigation item 3"
    }
  ]

   const ThemeStyles = generateShadCnTheme(props.themeColor, props.useDarkMode) as React.CSSProperties;

  return (
    <Breadcrumb style={ThemeStyles}>
      <BreadcrumbList>

      {
        varDemoData.map(
          (parent, index) => (
            <>
            <BreadcrumbItem key = {index}>
              {
                parent.children ?
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1" onClick={() => {console.log("DROP DOWN MENU TRIGGER CLICKED")}}>
                      <BreadcrumbEllipsis className="size-4" />
                        <span className="sr-only">Toggle menu</span> 
                          </DropdownMenuTrigger>
                        
                        <DropdownMenuContent onClick={() => console.log("DROP DOWN MENU CONTENT CLICKED")}>
                          
                          {parent.children.map((child, index) => (
                        
                            <DropdownMenuItem key = {index} asChild onClick={() => {console.log("DROPDOWN MENU ITEM CLICKED: "); props.onNavItemSelect(child.Title)}}>
                              <p  >{child.Title}</p>
                            </DropdownMenuItem>
                            
                          ))}
                        
                        </DropdownMenuContent>
                       
                    
                  </DropdownMenu> 
              
            
              : 
              <BreadcrumbLink asChild onClick={() => props.onNavItemSelect(parent.Title!)}>
                <p>{parent.Title}</p>
              </BreadcrumbLink>

            }
            </BreadcrumbItem>
            {varDemoData.length - 1 > index ? <BreadcrumbSeparator/> : null}
            </>

          )
        )
      }

     
      </BreadcrumbList>
    </Breadcrumb>
  )
    
}

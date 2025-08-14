import * as React from "react";
import { Label } from "@fluentui/react";
import { setEngine } from "crypto";

export interface HeaderComponentProps {
  navLinks: string;
  updateValue: (value: string) => void;
  currentLink: string;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const links = JSON.parse(props.navLinks);
  const [selectedLink, setSelectedLink] = React.useState(props.currentLink)

  return (
    <nav className="bg-gray-800 w-full">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
        <div className="ml-10 flex items-baseline space-x-4 w-full">
        {links.map((link: any) => {
          return (
            <h1
              key={link.linkText}
              className= {link.linkText == selectedLink ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}
              onClick={
                (e) => {
                  props.updateValue(link.linkText)
                  setSelectedLink(link.linkText)
                }
                }
            >
              {link.linkText}
            </h1>
          );
        })}
      </div>
      </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;

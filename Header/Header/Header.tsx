import * as React from 'react';
import { Label } from '@fluentui/react';

export interface HeaderComponentProps  {
navLinks: string;
}


const HeaderComponent = (props: HeaderComponentProps) => {

  const links = JSON.parse(props.navLinks);

  return (
    <div className='bg-gray-800'>

      {links.map((link: any) => {
        return(<h1 key={link.linkText} className='bg-gray-800'>{link.linkText}</h1>)
      })}
    </div>
  )
}

export default HeaderComponent

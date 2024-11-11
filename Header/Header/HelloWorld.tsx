import * as React from 'react';
import { Label } from '@fluentui/react';

export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <div className='bg-gray-900'>
       <h1 className='text-white'> {this.props.name}</h1>
      </div>
    )
  }
}

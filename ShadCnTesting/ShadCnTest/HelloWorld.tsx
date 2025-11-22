import * as React from 'react';
import {Button, BreadCrumbs} from 'pcf-npm-library'
export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <BreadCrumbs/>
    )
  }
}

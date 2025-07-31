import * as React from 'react';
import { Label } from '@fluentui/react-components';
import SquashedBG from "../../squashedButtonGroup/SquashedButtonGroup/SquashedButtonGroup";

export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <SquashedBG
      options={[]}
      currentOption={0}
      displayField=''
      isDisabled = {false}
      onOptionSelect={() => {}}
      useDarkMode
      primaryColor='Green'
      useFlexibleWidth
      useTestData
      onChangedDisplayedOption={() => {}}
      />
    )
  }
}

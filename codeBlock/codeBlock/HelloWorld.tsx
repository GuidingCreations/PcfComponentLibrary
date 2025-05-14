import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface IHelloWorldProps {
  name?: string;
}

const codeSnippet = `If(Self.changeType = "screen", Navigate(Lookup(colAllScreens, Screen.Name = Self.outputScreenName).Screen),
Set(varDarkMode, Self.darkModeEnabled)
)`

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    
    return (
      <SyntaxHighlighter language="typescript" style={agate} customStyle={{display: 'flex', alignItems: 'start'}}>
        {codeSnippet}
      </SyntaxHighlighter>
    );
  }
}

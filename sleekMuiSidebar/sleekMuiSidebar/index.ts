/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import muiSidebar, {muiSidebarProps} from "./sleekMuiSidebar";
import { primaryColorNames } from "../../styling/colors";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { PrimaryColor } from "../../styling/types/types";
import { useCookies, CookiesProvider } from "react-cookie";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class sleekMuiSidebar implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    private _primaryColor = '';
    private _useDarkMode = true;

    private updatePrimaryColor = (newColor: string) => {
        this._primaryColor = newColor;
        console.log("NEW OUTPUT PRIMARY COLOR: ", this._primaryColor)
        this.notifyOutputChanged();

        setTimeout(() => {
            this.context.events.onChangePrimaryColor()
            
        }, 200);
    }

    private updateUseDarkMode = (newValue: boolean) => {
        this._useDarkMode = newValue;
        console.log("NEW MODE TRIGGERED: ", this._useDarkMode);
        this.notifyOutputChanged()
        setTimeout(() => {
            this.context.events.onChangeColorMode()
            
        }, 200);
    }

    constructor() {
    }


    public init( 

        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    
    ): void {
     
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context
        
        
    }

    
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        if (this._primaryColor == '' && this.context.parameters.primaryColor.raw) {
            this.updatePrimaryColor(context.parameters.primaryColor.raw!)
        }

        const isPrimaryColor = primaryColorNames.some( (name) => name == context.parameters.primaryColor.raw)

        const props : muiSidebarProps = {
            containerHeight: context.parameters.containerHeight.raw || 1080,
            containerWidth: context.parameters.containerWidth.raw || 300,
            useTestData: context.parameters.useTestData.raw,
            useDarkMode: context.parameters.useDarkMode.raw,
            primaryColor: isPrimaryColor ? context.parameters.primaryColor.raw as PrimaryColor : 'Green',
            changePrimaryColor: this.updatePrimaryColor,
            changeUseDarkMode: this.updateUseDarkMode

    
        }

        return React.createElement(
            
           muiSidebar, props
        
        );
    }

    
    public getOutputs(): IOutputs {
        return {
            outputPrimaryColor: this._primaryColor,
            outputUseDarkMode: this._useDarkMode
        };
    }

    
    public destroy(): void {

    }
}

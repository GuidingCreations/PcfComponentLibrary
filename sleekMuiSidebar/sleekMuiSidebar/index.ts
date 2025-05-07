/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import muiSidebar, {muiSidebarProps} from "./sleekMuiSidebar";
import { primaryColorNames } from "../../styling/colors";
import { PrimaryColor } from "../../styling/types/types";
import {populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class sleekMuiSidebar implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    private _primaryColor = '';
    private _useDarkMode = true;
    private _activeScreen = ''
    private _navItems : any[] = []

    private updatePrimaryColor = async (newColor: string) => {
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

    private updateActiveScreen = (newScreenName: string) => {
        this._activeScreen = newScreenName;
        console.log("NEW SCREEN: ", this._activeScreen);
        this.notifyOutputChanged();

        setTimeout(() => {
            
            this.context.events.onChangeScreen()
        }, 200);
    }

    updateNavItems = () => {
        if (this.context.updatedProperties.indexOf("dataset") > -1 || (this.context.parameters.navItems.sortedRecordIds.length > this._navItems.length)) {

            this._navItems = populateDataset(this.context.parameters.navItems);
    }
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

        this.updateNavItems();

        const isPrimaryColor = primaryColorNames.some( (name) => name == context.parameters.primaryColor.raw)

        const props : muiSidebarProps = {
            containerHeight: context.parameters.containerHeight.raw || 1080,
            containerWidth: context.parameters.containerWidth.raw || 300,
            useTestData: context.parameters.useTestData.raw,
            useDarkMode: context.parameters.useDarkMode.raw,
            primaryColor: isPrimaryColor ? context.parameters.primaryColor.raw as PrimaryColor : 'Green',
            changePrimaryColor: this.updatePrimaryColor,
            changeUseDarkMode: this.updateUseDarkMode,
            changeActiveScreen: this.updateActiveScreen,
            navItems: this._navItems,
            activeScreen: context.parameters.activeScreen.raw || "Settings"

    
        }

        return React.createElement(
            
           muiSidebar, props
        
        );
    }

    
    public getOutputs(): IOutputs {
        return {
            outputPrimaryColor: this._primaryColor,
            outputUseDarkMode: this._useDarkMode,
            outputScreenName: this._activeScreen
        };
    }

    
    public destroy(): void {

    }
}

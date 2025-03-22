/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import muiSidebar, {muiSidebarProps} from "./sleekMuiSidebar";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class sleekMuiSidebar implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;

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

        const props = {
            darkModeCanvasColor : context.parameters.darkModeCanvasColor.raw || "#202427",
            darkModeIconColor : context.parameters.darkModeIconColor.raw || "#9fa6ad",
            darkModeNavTextColor : context.parameters.darkModeNavTextColor.raw || "#cdd7e1",
            darkModeNavItemHoverBackground : context.parameters.darkModeNavItemHoverBackground.raw || "#ffffff66",
            darkModeActiveBackground : context.parameters.darkModeActiveBackground.raw || "#0073e6",
            darkModeActiveIconColor : context.parameters.darkModeActiveIconColor.raw || "#ffffff",
            useTestData: context.parameters.useTestData.raw
        }

        return React.createElement(
            
            muiSidebar, props
        
        );
    }

    
    public getOutputs(): IOutputs {
        return {};
    }

    
    public destroy(): void {

    }
}

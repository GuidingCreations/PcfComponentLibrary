import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TreeViewComponent from "./TreeView";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class TreeView implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>

   
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
        
        return React.createElement(
            TreeViewComponent
        );
    }

 
    public getOutputs(): IOutputs {
        return {};
    }


    public destroy(): void {
    }
}

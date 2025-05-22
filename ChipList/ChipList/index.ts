/* eslint-disable */
// Imports

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ChipListComponent, { ChipListProps } from "./ChipList";
import * as React from "react";
import {sourceNeedsUpdate, populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

// Type object for the component state

type componentStateType = {
    ChipList: any[]
}

export class ChipList implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    // Initialize variables/state
    context: ComponentFramework.Context<IInputs>
    private notifyOutputChanged: () => void;
    private componentState : componentStateType = {
        ChipList: []
    }

    // Empty constructor

    constructor() {

    }


  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
    this.context = context;
  }

   
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
       context.mode.trackContainerResize(true)

        // If the data needs updated, update data

        const needsUpdated = sourceNeedsUpdate(this.context, "ChipItems", this.componentState.ChipList);
        if (needsUpdated) {
            this.componentState.ChipList = populateDataset(context.parameters.ChipItems)
        }


        // Establish props
        
        const props : ChipListProps = {

            ChipList: this.componentState.ChipList,
            width: context.mode.allocatedWidth,
            height: context.mode.allocatedHeight,
            useTestData: context.parameters.useTestData.raw
        }

        // Render component
        
        console.log("PASSING PROPS: ", props)

        return React.createElement(
            ChipListComponent, props
        );
    }

    
    // Generate outputs

    public getOutputs(): IOutputs {
        return {};
    }

    // Destroy cycle

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

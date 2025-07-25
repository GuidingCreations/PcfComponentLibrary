/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TabListComponent from "./TabList";
import * as React from "react";
import { TabListComponentProps } from "../types";
import {populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class TabList implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    private tabData : any[] = []

    private updateSelectedItem = (newRecordID: any) => {
        console.log("SETTING SELECTED RECORDS: ", newRecordID)
        this.context.parameters.tabData.setSelectedRecordIds([newRecordID]);
        this.notifyOutputChanged();
    }

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

        console.log("SELECTED RECORDS: ", context.parameters.tabData.getSelectedRecordIds())
        
        const selectedRecords = context.parameters.tabData.getSelectedRecordIds();
        const recordIDs = context.parameters.tabData.sortedRecordIds
        
        if (selectedRecords.length == 0 && recordIDs.length > 0) {

            context.parameters.tabData.setSelectedRecordIds([recordIDs[0]])
        }

        console.log("UPDATED PROPS: ", context.updatedProperties)
       if ( this.context.updatedProperties.indexOf("dataset") > -1 || this.context.updatedProperties.indexOf("records") > -1 || context.parameters.tabData.sortedRecordIds.length > this.tabData.length) {
            console.log("UPDATING TAB DATA");
            this.tabData = populateDataset(context.parameters.tabData);
            console.log("DATA: ", this.tabData)
       }

        console.log("HITTING")

        const props : TabListComponentProps = {
            primaryColor: context.parameters.primaryColor.raw ?? "Green",
            useDarkMode: context.parameters.useDarkMode.raw,
            useTestData: context.parameters.useTestData.raw,
            tabData: this.tabData,
            updateSelectedItem: this.updateSelectedItem
        }

        console.log("PROPS: ", props)
        return React.createElement(
            TabListComponent, props
        );
    }

    public getOutputs(): IOutputs {
        return {};
    }

   
    public destroy(): void {
    }
}

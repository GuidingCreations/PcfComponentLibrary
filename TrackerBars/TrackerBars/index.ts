/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import  TrackerBarsComponent, { TrackerBarsProps }  from "./TrackerBars";
import * as React from "react";
import { populateDataset } from "../../utils";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class TrackerBars implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    private _tableData : any[] = []

 
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

         if ( this.context.updatedProperties.indexOf("dataset") > -1 || ( this.context.parameters.trackerData.sortedRecordIds.length > this._tableData.length ) ) {
            
            this.context.parameters.trackerData.paging.setPageSize(1000)
            this._tableData = populateDataset(context.parameters.trackerData)
         }

         const props : TrackerBarsProps = {
            trackerData: this._tableData,
            useTestData: context.parameters.useTestData.raw,
            height: context.parameters.containerHeight.raw ?? 50,
            width: context.parameters.containerWidth.raw ?? 500,
            useDarkMode: context.parameters.useDarkMode.raw
         }

        return React.createElement(
            TrackerBarsComponent, props
        );
    }

   
    public getOutputs(): IOutputs {
        return {};
    }

   
    public destroy(): void {
    }
}

/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TransferListComponent, { TransferListProps } from "./TransferList";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { createInfoMessage, createPropsMessage, datasetChanged, populateDataset } from "../../utils";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class TransferList implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    context: ComponentFramework.Context<IInputs>
    private _Choices : any[] = []
    private notifyOutputChanged: () => void;
    
    private handleMoveItems = (newSelectedRecords: any[]) => {
        createInfoMessage("new recs: ", newSelectedRecords);
        this.context.parameters.initialChoices.setSelectedRecordIds(newSelectedRecords.map((record : any) => {return record.recordID}));
        createInfoMessage("NEW SEL RECS IDS: ", this.context.parameters.initialChoices.getSelectedRecordIds());
        this.notifyOutputChanged()
        this.context.events.onMoveItems()
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
        this.context.parameters.initialChoices.paging.setPageSize(2000)
    }

    
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
    const updatedProps = context.updatedProperties;
    
    createInfoMessage("Transfer list updated props: ", updatedProps)
    
    if (datasetChanged(updatedProps, context.parameters.initialChoices, this._Choices )) {

        this._Choices = populateDataset(context.parameters.initialChoices)
    }

    const props : TransferListProps = {
        onMoveItems: this.handleMoveItems,
        Choices: this._Choices,
        displayField: context.parameters.displayField.raw || 'label',
        useDarkMode: context.parameters.useDarkMode.raw
    }

    createPropsMessage("CHOICES: ", this._Choices)
    
        return React.createElement(
            TransferListComponent, props
        );
    
    }

    
    public getOutputs(): IOutputs {
        return {};
    }

   
    public destroy(): void {
    }
}

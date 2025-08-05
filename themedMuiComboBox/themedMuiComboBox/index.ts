/* eslint-disable */

// Imports

import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { primaryColorNames } from "../../styling/colors";
import { PrimaryColor } from "../../styling/types/types";
import {populateDataset} from '../../utils'
import ComboBoxComponent, { comboBoxProps } from "./ComboBox";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;

import * as ReactDOM from "react-dom";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

// typing for component state

type stateType = {
    items: any[];
    defaultSelectedItems: any[];
    searchText: string;
    outputHeight: number;
}
export class themedMuiComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    
    // Initialize state

    private state : stateType = {
        items: [],
        defaultSelectedItems: [],
        searchText: '',
        outputHeight: 60
    }

    // Function to call when search text is changed

    handleSearchTextChange = (searchText: string) => {
      
        this.state.searchText = searchText
        this.notifyOutputChanged()

    }

    // Function to call when the selected items in the combo box changes

    handleSelectionChange = (selectedItems: any[]) => {

        // If selected items array is empty, clear selected records, else set selected records to selected items array

        if (selectedItems.length > 0) {
            const selectedRecordIDs = selectedItems.map((selectedItem) => selectedItem.recordID);
            this.context.parameters.Items.setSelectedRecordIds(selectedRecordIDs);
        } else {
            this.context.parameters.Items.clearSelectedRecordIds();
        }

        this.notifyOutputChanged()

    }

    // Function to generate dataset whenever needed, will not re-generate if data source has not changed

    private updateDataset = () => {
        if (this.context.updatedProperties.indexOf("dataset") > -1 || (this.context.parameters.Items.sortedRecordIds.length > this.state.items.length) ) {
            this.state.items = populateDataset(this.context.parameters.Items);
        };

        if(this.context.updatedProperties.indexOf("DefaultSelectedItems_dataset") > -1 || this.context.parameters.DefaultSelectedItems.sortedRecordIds.length > this.state.defaultSelectedItems.length) {
            this.state.defaultSelectedItems = []

            this.context.parameters.DefaultSelectedItems.sortedRecordIds.map((item : any) => {
                const valueToAdd : any = {}
                const displayField = this.context.parameters.displayField.raw;

                valueToAdd[displayField!] = this.context.parameters.DefaultSelectedItems.records[item].getFormattedValue(displayField!);
                this.state.defaultSelectedItems.push(valueToAdd)
                
                    
                
            
            })
        }
    }

    // Function to update the output height of the control if it has changed after a render

    private updateOutputHeight = (newOutputHeight: number) => {
        if (newOutputHeight != this.state.outputHeight) {
            this.state.outputHeight = newOutputHeight;
            this.notifyOutputChanged()
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


        /*TODO : make reset function for component, outside source changes context variable to true, component reads new true value, resets state, then fires Event from manifest that will update that same context variable to false, stopping the reset*/
        
        this.context.parameters.Items.paging.setPageSize(10000)

        // check for dataset changes and update if changed

        this.updateDataset()

        // Establish props

        const props : comboBoxProps = {
            useDarkMode: context.parameters.useDarkMode.raw,
            primaryColor: context.parameters.primaryColor.raw ?? "Green" as PrimaryColor,
            labelText: context.parameters.labelText.raw ?? 'Label text',
            allowSelectMultiple: context.parameters.allowSelectMultiple.raw,
            useTestData: context.parameters.useTestData.raw,
            optionsList: this.state.items,
            displayField: context.parameters.displayField.raw ?? 'title',
            onSearchTextChange: this.handleSearchTextChange,
            onSelectionChange: this.handleSelectionChange,
            defaultSelectedValues: this.state.defaultSelectedItems,
            isRequired: context.parameters.isRequired.raw,
            width: context.parameters.containerWidth.raw ?? 250,
            isReadOnly: context.parameters.isReadOnly.raw,
            updateComponentHeight: this.updateOutputHeight
        }

        // Render component

        return React.createElement(
            ComboBoxComponent, props
        );
    }

    // Outputs
    
    public getOutputs(): IOutputs {
        return {
            searchText: this.state.searchText,
            outputHeight: this.state.outputHeight
        };
    }

    
    public destroy(): void {
    }
}

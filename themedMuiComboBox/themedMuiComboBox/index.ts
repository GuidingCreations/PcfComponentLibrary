/* eslint-disable */

// Imports

import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { primaryColorNames } from "../../styling/colors";
import { PrimaryColor } from "../../styling/types/types";
import {createInfoMessage, populateDataset} from '../../utils'
import ComboBoxComponent, { comboBoxProps } from "./ComboBox";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class themedMuiComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    
    // Initialize state

    private state : ComponentFramework.Dictionary = {
        items: [],
        searchText: '',
        outputHeight: 60
    }

    // Function to call when search text is changed

    handleSearchTextChange = (searchText: string) => {
      
        this.state.searchText = searchText
        this.notifyOutputChanged()

    }

    // Function to call when the selected items in the combo box changes

    handleSelectionChange = (selectedItems: any[], newHeight: number) => {

        this.state.outputHeight = newHeight;

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
        
        this.context.parameters.Items.paging.setPageSize(10000)

        this.updateDataset()

        const primaryColor : PrimaryColor = primaryColorNames.filter((color) => color == context.parameters.primaryColor.raw)[0] || 'Green';

        const props : comboBoxProps = {
            useDarkMode: context.parameters.useDarkMode.raw,
            primaryColor: primaryColor as PrimaryColor,
            labelText: context.parameters.labelText.raw || 'Label text',
            allowSelectMultiple: context.parameters.allowSelectMultiple.raw,
            useTestData: context.parameters.useTestData.raw,
            optionsList: this.state.items,
            displayField: context.parameters.displayField.raw || 'title',
            onSearchTextChange: this.handleSearchTextChange,
            onSelectionChange: this.handleSelectionChange
        }

        return React.createElement(
            ComboBoxComponent, props
        );
    }

    
    public getOutputs(): IOutputs {
        return {
            searchText: this.state.searchText,
            outputHeight: this.state.outputHeight
        };
    }

    
    public destroy(): void {
    }
}

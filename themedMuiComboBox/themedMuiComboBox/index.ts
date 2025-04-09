/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ComboBoxComponent, { comboBoxProps } from "./ComboBox";
import * as React from "react";
import { primaryColorNames } from "../../styling/colors";
import { PrimaryColor } from "../../styling/types/types";
import {createInfoMessage, populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class themedMuiComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    private state : ComponentFramework.Dictionary = {
        items: [],
        searchText: '',
        outputHeight: 60
    }

    handleSearchTextChange = (searchText: string) => {
      
        this.state.searchText = searchText
        createInfoMessage(`NEW SEARCH TEXT: ${this.state.searchText}`)
        this.notifyOutputChanged()

    }

    handleSelectionChange = (selectedItems: any[], newHeight: number) => {

        console.log(selectedItems);
        this.state.outputHeight = newHeight;

        if (selectedItems.length > 0) {

            
            const selectedRecordIDs = selectedItems.map((selectedItem) => selectedItem.recordID);
            createInfoMessage("SEL REC ID: ", selectedRecordIDs)
            this.context.parameters.Items.setSelectedRecordIds(selectedRecordIDs);
            createInfoMessage("NEW SELECTED RECORD IDS: ", this.context.parameters.Items.getSelectedRecordIds());
        } else {
            this.context.parameters.Items.clearSelectedRecordIds();
            createInfoMessage("NEW SELECTED RECORD IDS: ", this.context.parameters.Items.getSelectedRecordIds());

        }
            this.notifyOutputChanged()

    }




    private updateDataset = () => {
        if (this.context.updatedProperties.indexOf("dataset") > -1 || (this.context.parameters.Items.sortedRecordIds.length > this.state.items.length) ) {
            this.state.items = populateDataset(this.context.parameters.Items);
            console.log("NEW ITEMS: ", this.state.items)
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

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            searchText: this.state.searchText,
            outputHeight: this.state.outputHeight
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

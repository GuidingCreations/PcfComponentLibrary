// Imports

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ComboBoxProps } from "./ComboBox";
import ComboBox from "./ComboBox";
import * as React from "react";
import { populateDataset, generateOutputObject, generateOutputObjectSchema, getInputSchema, createStartMessage, createEndMessage, createPropsMessage, createInfoMessage } from "../../utils";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

// Start component

export class ComboBoxMUI implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
// Create variables 
    
    public _items : any[] = [];
    private _defaultHeight = 0
    public _data : any[] = [];
    public _defaultSelectedItems : any = []
    public _selectedRecords : any[] = [];
    private _searchText : string = '';
    private _outputHeight : number = 0;
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>


    handleHeightChange = (newHeight: number) => {

        createStartMessage(`ComboBoxMui index triggered handleHeightChange with height: ${newHeight}`)
        this._outputHeight = newHeight
        this.notifyOutputChanged()
        createEndMessage(`ComboBoxMui index ending handleHeightChange with new height: ${this._outputHeight}`)

    }

    handleSearchTextChange = (searchText: string) => {
      
        createStartMessage(`ComboBoxMui index triggered handleSearchTextChange with search text: ${searchText}`)
        this._searchText = searchText
        this.notifyOutputChanged()
        createEndMessage(`ComboBoxMui index ended handleSearchTextChange`)

    }

// Formula to update the selected records in the component

    setSelectedRecords = (selectedRecords: any[], outputHeight: number) => {

        createStartMessage(`ComboBoxMui triggered setSelectedRecords with an output height: ${outputHeight}, and selectedRecords of: `, selectedRecords)

        this._selectedRecords = selectedRecords;
    
        // If new selection is not an empty array

        if (selectedRecords.length > 0) {

            // Loop through the selected records from tsx and search the passed in table for matching id, then append the matching id to arrSelected 

            const arrSelected : any[] = [];  

            selectedRecords.map((selectedRecord : any) => {

                const displayField = this.context.parameters.displayField.raw || 'label'
                const value = selectedRecord[displayField]
                this._items.map((record) => {
                
                if (value == record[displayField]) {

                    arrSelected.push(selectedRecord.recordID)
            
                }
                
            })
            
            
            
        })

    // Update the components output items

        console.log("SETTING SELECTED RECORDS COMBO BOX MUI WITH ", arrSelected)
        this.context.parameters.Items.setSelectedRecordIds(arrSelected)
        console.log("NEW COMP SELECTED VALUE COMBO BOX MUI ", this.context.parameters.Items.getSelectedRecordIds())
        this._outputHeight = outputHeight;
        if (! this._searchText) {
            console.log("SETTING NEW SEARCH TEXT TO BLANK")
            this._searchText = ""
        }
        console.log("TRIGGERING NOTIFY OUTPUT CHANGED COMBO BOX MUI", this._outputHeight) 
        console.log("SEARCH TEXT: ", this._searchText)
        this.notifyOutputChanged()

    } else {

// If selected records array is empty, update the output properties directly

        this._outputHeight = outputHeight
        this.context.parameters.Items.clearSelectedRecordIds();
        this.notifyOutputChanged()
    
    }

    createEndMessage(`ComboBoxMui ending setSelectedRecords with selected ids of: `, this.context.parameters.Items.getSelectedRecordIds())

    }

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.context.parameters.Items.paging.setPageSize(2000)
    }

//Update view stage of component lifecycle

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        createStartMessage(`ComboBoxMui index triggered updateView with updatedProps of: `, context.updatedProperties)

// Loop through table items and create an object with properties of label and id for each item

        const oldLength = this._items.length;
        const newLength = this.context.parameters.Items.sortedRecordIds.length

        if (context.updatedProperties.indexOf("dataset") > -1 ||  newLength > oldLength) {

            console.log("UPDATING DATASET in ComboBoxMUI")
            this._items = populateDataset(this.context.parameters.Items)
        }

// Loop through defaults items passed from power apps and create objects with schema that will match the format from above

            const updateDefaultSelectedValues = () => {
                
                console.log("Combo box mui triggered updateDefaultSelectedValues")

                this._defaultSelectedItems = []

                this.context.parameters.DefaultSelectedItems.sortedRecordIds.map((item : any) => {
                    const valueToAdd : any = {}
                    
                        valueToAdd[context.parameters.displayField.raw || "label"] = context.parameters.DefaultSelectedItems.records[item].getFormattedValue(context.parameters.displayField.raw ||"label");

                        valueToAdd.recordID = context.parameters.DefaultSelectedItems.records[item].getRecordId()
                    
                        this._defaultSelectedItems.push(valueToAdd)
                    
                    

                })
                console.log("Combo box MUI leaving updateDefaultSelectedValues")
            }

            if ( this.context.updatedProperties.indexOf("DefaultSelectedItems_dataset") > -1 || this.context.parameters.DefaultSelectedItems.sortedRecordIds.length > this._defaultSelectedItems.length){

                updateDefaultSelectedValues();
            }

            const defaultHeight = this.context.parameters.defaultHeight.raw || 0

            if (defaultHeight > this._defaultHeight) {

                this._defaultHeight = defaultHeight;
                
                if ( defaultHeight > this._outputHeight ) {
                    this._outputHeight  = defaultHeight;
                    this.notifyOutputChanged()
                }

            }

// Establish props

        const props : ComboBoxProps = {
            displayColumn: context.parameters.displayField.raw || "label",
            useTestData: context.parameters.useTestData.raw || false,
            Items: this._items,
            labelText: context.parameters.labelText.raw || "Label",
            width: context.parameters.containerWidth.raw || 300,
            height: context.parameters.containerHeight.raw || 50,
            allowSelectMultiple: context.parameters.AllowMultipleSelect.raw || false,
            setSelectedRecords: this.setSelectedRecords.bind(this),
            handleNewUserSearchText: this.handleSearchTextChange,
            defaultValues: this._defaultSelectedItems,
            darkMode: context.parameters.DarkMode.raw || false,
            borderStyle: context.parameters.borderStyle.raw || 'none',
            borderColor: context.parameters.borderColor.raw || 'white',
            borderWidth: context.parameters.borderWidth.raw || "1px",
            backgroundColor: context.parameters.backgroundColor.raw || '',
            isDisabled: context.parameters.isDisabled.raw || false,
            defaultHeight: this.context.parameters.defaultHeight.raw || 0,
            handleNewHeight: this.handleHeightChange,
            isRequired: context.parameters.isRequired.raw
        }

        createPropsMessage(`ComboBoxMui index triggering render with props: `, props)

        return React.createElement(
            ComboBox, props
        );
    }

    
    public getOutputs(): IOutputs {

// Return output height (will be updated based on how large the component grows with additional selection tags based on user's selections)

        return {
            outputHeight: this._outputHeight,
            searchText: this._searchText
        };
    }

    public destroy(): void {
    }
}

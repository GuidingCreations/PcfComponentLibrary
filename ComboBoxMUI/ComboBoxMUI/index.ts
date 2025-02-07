// Imports

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ComboBoxProps } from "./ComboBox";
import CheckboxesTags from "./ComboBox";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

// Start component

export class ComboBoxMUI implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
// Create variables 
    
    public _items : any[] = [];
    public _data : any[] = [];
    public _defaultSelectedItems : any = []
    public _selectedRecords : any[] = [];
    private _outputHeight : number = 65;
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>


// Formula to update the selected records in the component

    setSelectedRecords = (selectedRecords: any[], outputHeight: number) => {

        const displayColumn = this.context.parameters.displayField.raw || 'label'
        console.log("DISPLAY COLUMNN: ", displayColumn)
        console.log("TRIGGERED SELECTED RECORDS INDEX.TS COMBOBOX MUI ")
        this._selectedRecords = selectedRecords;

        console.log("SELECTED VALS", this._selectedRecords)
        // If new selection is not an empty array

        if (selectedRecords.length > 0) {

            console.log("More than0 records")
// Loop through the selected records from tsx and search the passed in table for matching id, then append the matching id to arrSelected 

            const arrSelected : any[] = [];            
            selectedRecords.map((selectedRecord : any) => {
                
                const value = selectedRecord.label
                console.log("VALUE FROM MAP", value)   ;
                console.log("LOOP THROUGH ITEMS", this._items)
                this._items.map((record) => {
                
                    console.log("COMPARING ", value, " to ", record.label)
                if (value == record.label) {
                    console.log("MATCHED VALUE!")
                    arrSelected.push(record.id)
            
                } else {
                    console.log("VALUE NOT MATCHED")
                }  
                
            })
            
            
            
        })

// Update the components output items
        console.log("SETTING SELECTED RECORDS COMBO BOX MUI WITH ", arrSelected)
        this.context.parameters.Items.setSelectedRecordIds(arrSelected)
        console.log("NEW COMP SELECTED VALUE COMBO BOX MUI ", this.context.parameters.Items.getSelectedRecordIds)
        this._outputHeight = outputHeight;
        this.notifyOutputChanged()

    } else {

// If selected records array is empty, update the output properties directly

        this._outputHeight = outputHeight
        this.context.parameters.Items.setSelectedRecordIds([]);
        this.notifyOutputChanged()
    
    }
}


    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

//Update view stage of component lifecycle

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        console.log("UPDATE VIEW TRIGGERED COMBO BOX MUI")
// Set max page size to 2000

        context.parameters.Items.paging.setPageSize(2000);
        
// Loop through table items and create an object with properties of label and id for each item

        this._items = []
        context.parameters.Items.sortedRecordIds.map( (recordId : any) => {
        
            const objToAdd : any = {
                label: context.parameters.Items.records[recordId].getFormattedValue(context.parameters.displayField.raw || "label"),
                id: context.parameters.Items.records[recordId].getRecordId()
            }
                
            this._items.push(objToAdd)
            
        }
        )

// Loop through defaults items passed from power apps and create objects with schema that will match the format from above

            const updateDefaultSelectedValues = () => {
                
                this._defaultSelectedItems = []

                this.context.parameters.DefaultSelectedItems.sortedRecordIds.map((item : any) => {
                    const valueToAdd : any = {
                        label: context.parameters.DefaultSelectedItems.records[item].getFormattedValue(context.parameters.displayField.raw ||"label"),
                        id: context.parameters.DefaultSelectedItems.records[item].getRecordId()
                    }
                        this._defaultSelectedItems.push(valueToAdd)
                    
                    

                })
            }

            updateDefaultSelectedValues();

// Establish props

        const props : ComboBoxProps = {
            displayColumn: context.parameters.displayField.raw || "label",
            useTestData: context.parameters.useTestData.raw || false,
            Items: this._items,
            labelText: context.parameters.labelText.raw || "Label",
            width: context.parameters.containerWidth.raw || 300,
            height: context.parameters.containerHeight.raw || 40,
            allowSelectMultiple: context.parameters.AllowMultipleSelect.raw || false,
            setSelectedRecords: this.setSelectedRecords.bind(this),
            defaultValues: this._defaultSelectedItems,
            darkMode: context.parameters.DarkMode.raw || false,
            borderStyle: context.parameters.borderStyle.raw || 'none',
            borderColor: context.parameters.borderColor.raw || 'white',
            borderWidth: context.parameters.borderWidth.raw || "1px",
            backgroundColor: context.parameters.backgroundColor.raw || '',
            isDisabled: context.parameters.isDisabled.raw || false
        }

        console.log("PROPS - ComboBoxMUI", props)

        return React.createElement(
            CheckboxesTags, props
        );
    }

    
    public getOutputs(): IOutputs {

// Return output height (will be updated based on how large the component grows with additional selection tags based on user's selections)

        return {
            outputHeight: this._outputHeight
        };
    }

    public destroy(): void {
    }
}

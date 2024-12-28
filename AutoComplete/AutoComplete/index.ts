// IMPORTS

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import AutoCompleteComponent, { AutoCompleteProps } from "./AutoComplete";
import * as React from "react";
import { JSONSchema4 } from "json-schema";

export class AutoComplete implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
// Declare variables

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    public _selectedItems : any[] = [];
    public _selectedRecordIds: string[] = [];
    public _selectedRecordValues: any[] = []
    public _data: any[] = [];
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    records: {
        [id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
    };

// Function for changing the selected records
setSelectedRecords = (values: any[]): void => {

    console.log("SET SELECTED RECORDS TRIGGERED", values)
    // Store display column info to check against

const displayColumn = this.context.parameters.displayField.raw || 'Name'
    
console.log("_DATA", this._data);

    
// Iterate over data source to gather record IDs


const selectedRecordIDs : any = []

values.map( (value: string) => {

    console.log("THIS VALUE", value)
    this._data.map( (item : any) => {
         console.log("COMPARE VALUE => DATA", value, item.label)
        if ( item.label == value ) {
            selectedRecordIDs.push(item.id)
         }
    })

})

console.log("SELECTED RECORDS IDS", selectedRecordIDs)

// Set selected records to list of selected records from previous iteration so that they populate in the component's SelectedItems property
this._selectedRecordValues = values
this.context.parameters.records.setSelectedRecordIds(selectedRecordIDs);
this.notifyOutputChanged()



};

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */

    //UPDATE VIEW
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    
        
        
        // Loop through each record ID and add append row to data table
        
        const updateData = () => {
            
            this._data = [];
        
            
            
            context.parameters.records.sortedRecordIds.forEach( (recordId) => {
            console.log("TRYING TO ADD RECORD ", recordId)
            const displayColumn = context.parameters.displayField.raw || '';
            this._data.push(
                { 
                    "id": context.parameters.records.records[recordId].getRecordId(),
                    "label" : context.parameters.records.records[recordId].getFormattedValue(displayColumn),
                    "classNames": {} 
                })
                console.log("ADDED RECORD ID ", recordId)
            });
            console.log("DATA", this._data)

        }

        updateData()


        const props : AutoCompleteProps = {
            DarkMode: context.parameters.DarkMode.raw || false,
            height: context.parameters.containerHeight.raw || 50,
            width: context.parameters.containerWidth.raw || 300,
            labelText: context.parameters.labelText.raw || "Autocomplete",
            options: this._data,
            AllowMultipleSelect: context.parameters.AllowMultipleSelect.raw || false,
            data: this._data,
            setSelectedRecords: this.setSelectedRecords,
            defaultSelectedValues: this._selectedRecordValues
        }

        
        // Render Combobox Component
        
        return React.createElement(
            AutoCompleteComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */

    public getOutputs(): IOutputs {
        return {
            selectedRecords: {
                Records: this._selectedItems
            },
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
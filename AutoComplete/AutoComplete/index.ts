// IMPORTS

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import AutoCompleteComponent from "./AutoComplete";
import * as React from "react";
import { JSONSchema4 } from "json-schema";

export class AutoComplete implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
// Declare variables

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    public _selectedItems : any[] = [];
    public _selectedRecordIds: string[] = [];
    public _data: any[] = [];
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    records: {
        [id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
    };

// Function for changing the selected records

    setSelectedRecords = (values: string[]): void => {

        // Store display column info to check against
    
    const displayColumn = this.context.parameters.displayField.raw || 'Name'
        
        
    // Iterate over data source to gather record IDs


    const selectedRecordIDs : any = []
    
    values.map( (value: string) => {
        
        this._data.map( (item : any) => {
             
            if ( item.displayField == value ) {
                selectedRecordIDs.push(item.id)
             }
        })

    })

    // Set selected records to list of selected records from previous iteration so that they populate in the component's SelectedItems property

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
                    "label" : context.parameters.records.records[recordId].getFormattedValue(displayColumn)
                })
                console.log("ADDED RECORD ID ", recordId)
            })
        }

        updateData()

        // Establish props for ComboBox

        /*const props: AutoCompleteProps = {  
            Items: this._data, 
            setSelectedRecords: this.setSelectedRecords,
            height: context.parameters.containerHeight.raw || 300,
            width: context.parameters.containerWidth.raw || 150,
            labelText: context.parameters.labelText.raw || 'Name',
            AllowMultipleSelection: context.parameters.AllowMultipleSelect.raw || false
            };
        
        console.log("PROPS", props)
        */
        // Render Combobox Component
        
        return React.createElement(
            AutoCompleteComponent
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
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ComboBoxComponent from "./ComboBox";
import { ComboBoxProps } from "./ComboBox";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { JSONSchema4 } from "json-schema";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    public _selectedItems : any[] = [];
    public _selectedRecordIds: string[] = [];
    sortedRecordIds: string[] = [];
    context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    

    records: {
        [id: string]: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord;
    };
    setSelectedRecords = (ids: string[]): void => {

        console.log("START setSelectedRecords")

        console.log("RECORDS", this.context.parameters.records.records)
        
        const allRecordValues = Object.keys(this.context.parameters.records.records);
        console.log("ALL RECORDS", allRecordValues)

        const selectedRecordsValues : string[] = [];
        ids.map( (index : any) => selectedRecordsValues.push(allRecordValues[index]))
        console.log("SELECTED RECORD VALUES", selectedRecordsValues)
        this.context.parameters.records.setSelectedRecordIds(selectedRecordsValues)
        console.log("FINISH setSelectedRecords", this.context.parameters.records.getSelectedRecordIds)
	};

    private columnProperties: any;
    eventRow: any



    

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
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        context.parameters.records.clearSelectedRecordIds
        console.log('TRIGGERED UPDATE VIEW')
        
        //const dataset = context.parameters.records;
        // const datasetChanged = context.updatedProperties.indexOf('dataset') > -1
        // if ( datasetChanged) {
        //     this.records = dataset.records;
        //     this.sortedRecordIds = dataset.sortedRecordIds;
        // }
        //this.records = dataset.records
        console.log('try to establish data variable')
        const data : any[] = [];
        console.log('DATA VARIABLE ESTABLISHED', data)
        console.log('REC', context.parameters.records)
        console.log("TRY TO PUSH SORTED RECORDS TO DATA")
        context.parameters.records.sortedRecordIds.forEach( (recordId) => {
            console.log("TRYING TO ADD RECORD ", recordId)
            data.push({"Name": context.parameters.records.records[recordId].getFormattedValue("Name"), "id": context.parameters.records.records[recordId].getFormattedValue("id")})
            console.log("ADDED RECORD ID ", recordId)
        })

        
    
        console.log('DATA', data)
        const props: ComboBoxProps = {  
            data: data, 
            setSelectedRecords: this.setSelectedRecords, 
            };
        console.log("PROPS", props)
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
            selectedRecords: {Records: this._selectedItems},
        };
    }

    
        // public setSelectedRecords = (items: any[]): void => {
        //     this._selectedItems = items;
        //     console.log('SELECTED ITEMS', this._selectedItems)
        //     const selectedRecordIds = this._selectedItems.map( (item) => item.id );
        //     console.log("SELECTED RECORD IDS", selectedRecordIds)
        //     this.context.parameters.records.setSelectedRecordIds(selectedRecordIds)
        //     this.notifyOutputChanged()
        // };

   
 

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private getInputSchema(context: ComponentFramework.Context<IInputs>) {
        const dataset = context.parameters.records;
        const columnProperties: Record<string, any> = {};
        dataset.columns
            .filter((c) => !c.isHidden && (c.displayName || c.name))
            .forEach((c) => {
                const properties = this.getColumnSchema(c);
                columnProperties[c.displayName || c.name] = properties;
            });
        this.columnProperties = columnProperties;
        return columnProperties;
    }
    private getColumnSchema(column: ComponentFramework.PropertyHelper.DataSetApi.Column): JSONSchema4 {
        switch (column.dataType) {
            // Number Types
            case 'TwoOptions':
                return { type: 'boolean' };
            case 'Whole.None':
                return { type: 'integer' };
            case 'Currency':
            case 'Decimal':
            case 'FP':
            case 'Whole.Duration':
                return { type: 'number' };
            // String Types
            case 'SingleLine.Text':
            case 'SingleLine.Email':
            case 'SingleLine.Phone':
            case 'SingleLine.Ticker':
            case 'SingleLine.URL':
            case 'SingleLine.TextArea':
            case 'Multiple':
                return { type: 'string' };
            // Other Types
            case 'DateAndTime.DateOnly':
            case 'DateAndTime.DateAndTime':
                return {
                    type: 'string',
                    format: 'date-time',
                };
            // Choice Types
            case 'OptionSet':
                // TODO: Can we return an enum type dynamically?
                return { type: 'string' };
            case 'MultiSelectPicklist':
                return {
                    type: 'array',
                    items: {
                        type: 'number',
                    },
                };
            // Lookup Types
            case 'Lookup.Simple':
            case 'Lookup.Customer':
            case 'Lookup.Owner':
                // TODO: What is the schema for lookups?
                return { type: 'string' };
            // Other Types
            case 'Whole.TimeZone':
            case 'Whole.Language':
                return { type: 'string' };
        }
        return { type: 'string' };
    }
    
    
    private getOutputObjectRecord(row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord) {
        const outputObject: Record<string, string | number | boolean | number[] | undefined> = {};
        this.context.parameters.records.columns.forEach((c) => {
            const value = this.getRowValue(row, c);
            outputObject[c.displayName || c.name] = value;
        });
        return outputObject;
    }
    private getRowValue(
        row: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord,
        column: ComponentFramework.PropertyHelper.DataSetApi.Column,
    ) {
        switch (column.dataType) {
            // Number Types
            case 'TwoOptions':
                return row.getValue(column.name) as boolean;
            case 'Whole.None':
            case 'Currency':
            case 'Decimal':
            case 'FP':
            case 'Whole.Duration':
                return row.getValue(column.name) as number;
            // String Types
            case 'SingleLine.Text':
            case 'SingleLine.Email':
            case 'SingleLine.Phone':
            case 'SingleLine.Ticker':
            case 'SingleLine.URL':
            case 'SingleLine.TextArea':
            case 'Multiple':
                return row.getFormattedValue(column.name);
            // Date Types
            case 'DateAndTime.DateOnly':
            case 'DateAndTime.DateAndTime':
                return (row.getValue(column.name) as Date)?.toISOString();
            // Choice Types
            case 'OptionSet':
                // TODO: Can we return an enum?
                return row.getFormattedValue(column.name) as string;
            case 'MultiSelectPicklist':
                return row.getValue(column.name) as number[];
            // Lookup Types
            case 'Lookup.Simple':
            case 'Lookup.Customer':
            case 'Lookup.Owner':
                // TODO: How do we return Lookups?
                return (row.getValue(column.name) as ComponentFramework.EntityReference)?.id.guid;
            // Other
            case 'Whole.TimeZone':
            case 'Whole.Language':
                return row.getFormattedValue(column.name);
        }
    }

public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
    const recordsSchema: JSONSchema4 = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'EventRow',
        type: 'object',
        properties: {Records: [{Name: 'test', id: '1'}]},
    };
    return Promise.resolve({
        selectedRecords: recordsSchema,
    });
}
}

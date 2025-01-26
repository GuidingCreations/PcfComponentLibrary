import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import TreeComponent, {TreeComponentProps} from "./Tree";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { TreeDataNode } from "antd";
import { JSONSchema4 } from "json-schema";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Tree implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    private _treeData : TreeDataNode[] = []
    private _outputObjects: any[]=[];
    private _columnProperties : any = {};

    

    setSelectedRecords = (selectedIDs : any[]) => {
        console.log("SELECTED KEYS IN TREE COMPONENT", selectedIDs)
        this._outputObjects = [];
        const displayColumn : any = this.context.parameters.displayColumn.raw
        const keyColumn : any = this.context.parameters.keyColumn.raw
        selectedIDs.map( (key) => {
            const objToAdd : any = {};

            this._treeData.map( (record : any) => {
                if (record[keyColumn] === key) {
                    objToAdd[keyColumn] = record[keyColumn];
                    objToAdd[displayColumn] = record[displayColumn];
                    objToAdd.isTopLevel = record.isTopLevel;
                    console.log("PUSHING PARENT: ", objToAdd )
                    this._outputObjects.push(objToAdd)
                } else {
                    record.children.map((child : any) => {
                        if (child[keyColumn] === key) {
                            objToAdd[keyColumn] = child[keyColumn];
                    objToAdd[displayColumn] = child[displayColumn];
                            objToAdd.isTopLevel = false;
                            console.log("PUSHING CHILD: ", objToAdd )
                    this._outputObjects.push(objToAdd)
                }
                    })
                }
            })


        });
        console.log("ALL TREE OUTPUTS", this._outputObjects)
        this.notifyOutputChanged()
        
    }

    private getInputSchema(context: ComponentFramework.Context<IInputs>) {
        const dataset = context.parameters.Items;
        const columnProperties: Record<string, any> = {};
        dataset.columns
            .filter((c) => !c.isHidden && (c.displayName || c.name))
            .forEach((c) => {
                const properties = this.getColumnSchema(c);
                columnProperties[c.displayName || c.name] = properties;
            });
        this._columnProperties = columnProperties;
        console.log("COLUMN PROPERTIES", this._columnProperties)
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
        this.context =  context
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        this._treeData = [];

        this.getInputSchema(context)

        const displayColumn : any = context.parameters.displayColumn.raw
        const keyColumn : any = context.parameters.keyColumn.raw
        context.parameters.Items.sortedRecordIds.forEach( (id) => {
            console.log("FORMATTED VALUE", context.parameters.Items.records[id].getFormattedValue("children"));
            console.log("UNFORMATTED VALUE", context.parameters.Items.records[id].getValue("children"));

            const objToAdd : any = {};

            objToAdd[displayColumn] = context.parameters.Items.records[id].getFormattedValue(displayColumn);
            objToAdd.key = context.parameters.Items.records[id].getFormattedValue(keyColumn);
            objToAdd.children = context.parameters.Items.records[id].getValue("children");
            objToAdd.isTopLevel = true
            this._treeData.push(objToAdd)
        })

        const props : TreeComponentProps= {
            isCheckable: context.parameters.Checkable.raw || false,
            showLine: true,
            useTestData: context.parameters.useTestData.raw || false,
            treeData: this._treeData,
            fieldName: context.parameters.displayColumn.raw || "title",
            keyColumn: context.parameters.keyColumn.raw || 'id',
            setSelectedRecords: this.setSelectedRecords
        }
        
        return React.createElement(
            TreeComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        console.log("TREE OUTPUTTED ITEMS", this._outputObjects)
        const outputSchema : any = {};
        outputSchema[this.context.parameters.displayColumn.raw || "title"] = "test output schema for items"
        return {
            outputSelectedItems:  this._outputObjects,
            outputItemsSchema: {
               outputSchema
            }
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

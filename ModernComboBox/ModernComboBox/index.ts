import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ModernCombo, {ModernComboProps} from "./ModernCombo";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ModernComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    public _data: any[] = []
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
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._data = []

        context.parameters.Items.columns.map((column) => {
            console.log('COLUMN LOGICAL NAME', column.name);
            console.log("COLUMN DISPLAY NAME", column.displayName);
        })
        
        context.parameters.Items.sortedRecordIds.forEach( (recordId) => {
            const objToAdd : any= {}
            context.parameters.Items.columns.map((column) => {
                objToAdd[column.displayName] = context.parameters.Items.records[recordId].getFormattedValue(column.name)
            });
            console.log("OBJECT TO ADD", objToAdd)
            this._data.push(objToAdd)
        })
        
        const props : ModernComboProps = {
            width: context.parameters.containerWidth.raw || 300,
            labelText: context.parameters.labelText.raw || "Label text",
            items: this._data,
            height: context.parameters.containerHeight.raw || 30,
            useTestData: context.parameters.useTestData.raw || false
        }

        return React.createElement(
            ModernCombo, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

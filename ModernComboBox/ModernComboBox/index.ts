import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ModernCombo, {ModernComboProps} from "./ModernCombo";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ModernComboBox implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    public _data: any[] = [];
    public _defaultSelectedItems : any = []
     
    setSelectedRecords = (selectedRecords: any[]) => {
        console.log("SET SELECTED RECORDS TRIGGERED WITH : ", selectedRecords);
        const arrSelected : any[] = [];
        console.log("_DATA", this._data)
        
        selectedRecords.map((selectedRecord : any) => {
            const label = selectedRecord.label    
            console.log("CHECKING SELECTED RECORD: ", selectedRecord);
            console.log("CHECKING SELECTED RECORD LABEL: ", label);
            
            this._data.map((record) => {
                console.log("RECORD TO CHECK SEL", record)
                console.log("COMPARE SELECTED RECORD LABEL VALUE: ", label, " WITH RECORD LABEL: ", record.label);
                if (label == record.label) {
                    arrSelected.push(record.id)
                }  

            })

            
            
        })
        console.log("SELECTED ARRAY IDS", arrSelected);
        this.context.parameters.Items.setSelectedRecordIds(arrSelected)
        console.log("EXIT SELECT RECORDS")
        this.notifyOutputChanged()
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
        this.context = context;

    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._data = []

    //    Load data

       context.parameters.Items.sortedRecordIds.map( (recordId : any) => {
            const objToAdd : any = {
               label: context.parameters.Items.records[recordId].getFormattedValue("label"),
               chipBackgroundColor: context.parameters.Items.records[recordId].getFormattedValue("chipBackgroundColor"),
               chipTextColor: context.parameters.Items.records[recordId].getFormattedValue("chipTextColor"),
               chipFontSize: context.parameters.Items.records[recordId].getFormattedValue("chipFontSize"),
               chipHeight: context.parameters.Items.records[recordId].getFormattedValue("chipHeight"),
               iconFill: context.parameters.Items.records[recordId].getFormattedValue("iconFill")
                    }
                this._data.push(objToAdd)
            })

    //  If the default values have not been loaded, load them

        if (this.context.parameters.DefaultSelectedItems.sortedRecordIds.length > this._defaultSelectedItems.length) {
            
            this.context.parameters.DefaultSelectedItems.sortedRecordIds.map((item : any) => {
                const valueToAdd : any = {
                    label: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("label"),
                    chipBackgroundColor: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("chipBackgroundColor"),
                    chipTextColor: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("chipTextColor"),
                    chipFontSize: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("chipFontSize"),
                    chipHeight: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("chipHeight"),
                    iconFill: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("iconFill")
                }
                this._defaultSelectedItems.push(valueToAdd)
            })
            console.log("DEFAULTS", this._defaultSelectedItems)
        }


        const props : ModernComboProps = {
            width: context.parameters.containerWidth.raw || 300,
            labelText: context.parameters.labelText.raw || "Label text",
            items: this._data,
            height: context.parameters.containerHeight.raw || 30,
            useTestData: context.parameters.useTestData.raw || false,
            setSelectedRecords: this.setSelectedRecords,
            AllowSelectMultiple: context.parameters.AllowMultipleSelect.raw || false,
            DarkMode: context.parameters.DarkMode.raw || false,
            defaultSelectedValues: this._defaultSelectedItems
        }

        console.log("PROPS", props)

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

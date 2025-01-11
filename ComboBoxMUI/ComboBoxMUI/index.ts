import { IInputs, IOutputs } from "./generated/ManifestTypes";
import CheckboxesTags from "./HelloWorld";
import * as React from "react";
import { ComboBoxProps } from "./HelloWorld";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ComboBoxMUI implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    public _items : any[] = [];
    public _data : any[] = [];
    public _defaultSelectedItems : any = []
    public _selectedRecords : any[] = [];
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>

    setSelectedRecords = (selectedRecords: any[]) => {
        console.log("SET SELECTED RECORDS TRIGGERED WITH : ", selectedRecords);
        this._selectedRecords = [];
        const arrSelected : any[] = [];
        console.log("_DATA", this._data)
        
        selectedRecords.map((selectedRecord : any) => {
            const label = selectedRecord.label    
            console.log("CHECKING SELECTED RECORD: ", selectedRecord);
            console.log("CHECKING SELECTED RECORD LABEL: ", label);
            
            this._items.map((record) => {
                console.log("RECORD TO CHECK SEL", record)
                console.log("COMPARE SELECTED RECORD LABEL VALUE: ", label, " WITH RECORD LABEL: ", record.label);
                if (label == record.label) {
                    console.log("RECORD MATCHED")
                    arrSelected.push(record.id)
                }  

            })

            
            
        })
        console.log("SELECTED ARRAY IDS", arrSelected);
        if (selectedRecords.length == 0) {
            this._selectedRecords = [{label: ""}]
        } else {

            this._selectedRecords = selectedRecords;
        }

        this.context.parameters.Items.setSelectedRecordIds(arrSelected)
        console.log("EXIT SELECT RECORDS")
        this.notifyOutputChanged()
    }


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

        this._items = []

        context.parameters.Items.sortedRecordIds.map( (recordId : any) => {
            const objToAdd : any = {
               label: context.parameters.Items.records[recordId].getFormattedValue("label"),
               id: context.parameters.Items.records[recordId].getRecordId()
                    }
                this._items.push(objToAdd)
            })

            const updateDefaultSelectedValues = () => {
                
                console.log("starting DEFAULTS")
                this._defaultSelectedItems = []

                this.context.parameters.DefaultSelectedItems.sortedRecordIds.map((item : any) => {
                    const valueToAdd : any = {
                        label: context.parameters.DefaultSelectedItems.records[item].getFormattedValue("label"),
                        id: context.parameters.DefaultSelectedItems.records[item].getRecordId()
                    }
                    console.log("ADDING DEFAULT: ", valueToAdd)
                        this._defaultSelectedItems.push(valueToAdd)
                    
                    

                })
                console.log("new DEFAULTS", this._defaultSelectedItems)
            }

            updateDefaultSelectedValues();


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
            borderWidth: context.parameters.borderWidth.raw || "1px"
        }

        console.log("PROPS", props)

        return React.createElement(
            CheckboxesTags, props
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

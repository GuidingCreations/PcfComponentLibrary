import { IInputs, IOutputs } from "./generated/ManifestTypes";
import AccordionComponent, { AccordionProps } from "./Accordion";
import * as React from "react";
import {populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Accordion implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _data : any[] = []
    private outputHeight : number;
    onChangeHeight = (newHeight : number) => {
        console.log("TRIGGERING NEW HEIGHT FROM ", this.outputHeight, " TO ", newHeight)
        this.outputHeight = newHeight;
        console.log("NEW HEIGHT: ", this.outputHeight)
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
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        this._data = populateDataset(context.parameters.accordionData)

        // context.parameters.accordionData.sortedRecordIds.forEach( (recordID) => {
        //     const objToAdd : any = {}
        //     objToAdd.Title = context.parameters.accordionData.records[recordID].getFormattedValue("Title"),
        //     objToAdd.bodyContent = context.parameters.accordionData.records[recordID].getFormattedValue("bodyContent")
        //     this._data.push(objToAdd)
        // })
        

        const props : AccordionProps = {
            darkMode: context.parameters.DarkMode.raw,
            accordionData: this._data,
            useTestData: context.parameters.useTestData.raw,
            height: context.parameters.containerHeight.raw || 250,
            width: context.parameters.containerWidth.raw || 400,
            onChangeHeight: this.onChangeHeight
        }

        return React.createElement(
            AccordionComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        console.log("TRIGGERING NEW OUTPUTS WITH: ", this.outputHeight)
        return {
            outputHeight: this.outputHeight
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

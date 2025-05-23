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
        this.outputHeight = newHeight;
        this.notifyOutputChanged()
    }
   
    constructor() { }
    
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {


        if (context.updatedProperties.indexOf("records") > -1 || context.updatedProperties.indexOf("dataset") > -1 || context.parameters.accordionData.sortedRecordIds.length > this._data.length) {

            this._data = []
            
            context.parameters.accordionData.sortedRecordIds.forEach((recordID : any) => {
                const objToAdd : any = {};
                objToAdd.bodyContent = context.parameters.accordionData.records[recordID].getValue('bodyContent');
                objToAdd.Title = context.parameters.accordionData.records[recordID].getFormattedValue('Title');
                objToAdd.images = context.parameters.accordionData.records[recordID].getValue("images")
                this._data.push(objToAdd)
            })
        }


        // console.log("POP DATA")
        // this._data = populateDataset(context.parameters.accordionData)
        console.log("DATA POPPED: ", this._data)
        
        context.mode.trackContainerResize(true)

        const props : AccordionProps = {
            darkMode: context.parameters.DarkMode.raw,
            accordionData: this._data,
            useTestData: context.parameters.useTestData.raw,
            width: context.mode.allocatedWidth,
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

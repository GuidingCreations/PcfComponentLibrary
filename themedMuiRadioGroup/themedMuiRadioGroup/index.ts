/* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import RadioGroupComponent, { RadioGroupProps } from "./RadioGroup";
import * as React from "react";
import {populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class themedMuiRadioGroup implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    
    private state: ComponentFramework.Dictionary = {
        selectedValue : 'TESTING VALUE',
        Options: []
    }
    
    private handleValueChange = (newValue: string) => {
        console.log("HITTING", newValue, this.state.selectedValue)
        this.state.selectedValue = newValue;
        this.notifyOutputChanged()
    }
    
    constructor() {
        // Empty
    }

    
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

   
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const options = populateDataset(context.parameters.Options)

        const props : RadioGroupProps = {
            displayField: context.parameters.displayField.raw || "Value",
            labelText: context.parameters.labelText.raw || "Options",
            Options: options,
            PrimaryColor: context.parameters.primaryColor.raw || "Green",
            useDarkMode: context.parameters.useDarkMode.raw,
            useTestData: context.parameters.useTestData.raw,
            handleValueChange: this.handleValueChange
        }

        return React.createElement(
            RadioGroupComponent, props
        );
    }

   
    public getOutputs(): IOutputs {
        console.log("TRIGGERED OUTPUTS")
        return {
            selectedValue: this.state.selectedValue
        };
    }

    
    public destroy(): void {

    }
}

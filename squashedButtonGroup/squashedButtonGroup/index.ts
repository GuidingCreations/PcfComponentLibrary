import { IInputs, IOutputs } from "./generated/ManifestTypes";
import SquashedBG, {squashedBgProps} from "./squashedButtonGroup";
import * as React from "react";
import {populateDataset} from '../../utils'
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class squashedButtonGroup implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    
    private state : ComponentFramework.Dictionary = {
        Options: [],
        selectedOption: ''
    }

    onChangeDisplayedOption = (option: any) => {

        if (option != undefined) {

            this.state.selectedOption = option[this.context.parameters.displayField.raw || 'Value']
            
            console.log("STATE: ", this.state);
        } 

        this.notifyOutputChanged()
    }

    onOptionSelect = () => {  

        this.context.events.onClick();

    }

  
    constructor() { }

    
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context
    }

   
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        if (this.context.updatedProperties.indexOf("dataset") > -1 || this.context.updatedProperties.indexOf('records') > -1 || this.context.parameters.Options.sortedRecordIds.length > this.state.Options.length) {

            this.state.Options = populateDataset(this.context.parameters.Options)
        
        }

        const props : squashedBgProps  = {
            options: this.state.Options,
            onOptionSelect: this.onOptionSelect,
            useDarkMode: context.parameters.useDarkMode.raw,
            primaryColor: context.parameters.primaryColor.raw ||"Green",
            displayField: context.parameters.displayField.raw || 'Title',
            onChangedDisplayedOption: this.onChangeDisplayedOption,
            currentOption: this.state.selectedOption,
            useTestData: context.parameters.useTestData.raw,
            isDisabled: context.parameters.isDisabled.raw
        }
        
        const TestItems = populateDataset(context.parameters.Test)
        console.log("TEST COLUMN INFO: ", context.parameters.Test.columns, "DATA: ", TestItems);

        return React.createElement(
            SquashedBG, props
        );
    }

  
    public getOutputs(): IOutputs {

        
        return {
            outputSelectedOption: this.state.selectedOption
        };
    }

  
    public destroy(): void {
    }
}


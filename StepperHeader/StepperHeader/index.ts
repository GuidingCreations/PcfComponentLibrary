/* eslint-disable */

import StepperHeaderComponent, {StepperHeaderProps} from "./StepperHeader";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import {populateDataset} from "../../utils" 
import { IInputs, IOutputs } from "./generated/ManifestTypes";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class StepperHeader implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    context: ComponentFramework.Context<IInputs>
    private notifyOutputChanged: () => void;
    private _testSteps : any[] = [
                    
        {
            stepTitle: "Enter expense details",
            isOptional: false,
        },
        {
            stepTitle: "Submit supporting documentation",
            isOptional: true
        },
        {
            stepTitle: "Confirm expense report details",
            isOptional: false
        }
    ] 
    private _Steps : any [] = this._testSteps

    private GenerateSteps = () => {

        console.log("Stepper Header triggered GenerateSteps");
        
        if ( this.context.parameters.useTestData.raw ) {                
            
            this._Steps = [
                    
                    {
                        stepTitle: "Enter expense details",
                        isOptional: false,
                    },
                    {
                        stepTitle: "Submit supporting documentation",
                        isOptional: true
                    },
                    {
                        stepTitle: "Confirm expense report details",
                        isOptional: false
                    }
            ]         
        
        } else {
    
            this._Steps = populateDataset(this.context.parameters.Steps)
    
        }

            console.log("StepperHeader GenerateSteps returns: ", this._Steps)
        
        

    
    }

    constructor() {
        
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
    
        const updatedProps = context.updatedProperties

        console.log("StepperHeader updateView triggered with changed properties: ", updatedProps)

        // If the dataset or useTestData param changes, re-populate steps

        if ( this.context.updatedProperties.indexOf("dataset") > -1 || this.context.updatedProperties.indexOf("dataset_records") > -1 || this.context.updatedProperties.indexOf("useTestData") > -1 ) {

            this.GenerateSteps()
        }

        const props : StepperHeaderProps = {
            Steps: this._Steps,
            activeStepIndex: context.parameters.activeStepIndex.raw || 0
        }

        return React.createElement(
           StepperHeaderComponent, props
        );
    }

    
    public getOutputs(): IOutputs {
        return {};
    }

    
    public destroy(): void {
      
    }
}

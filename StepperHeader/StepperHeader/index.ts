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
    private _Steps : any [] = []

    private GenerateSteps = () => {

        
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

        // If the dataset or useTestData param changes, re-populate steps

        if ( this.context.updatedProperties.indexOf("dataset") > -1 || this.context.updatedProperties.indexOf("dataset_records") > -1 || this.context.updatedProperties.indexOf("useTestData") > -1 || this.context.parameters.Steps.sortedRecordIds.length > this._Steps.length) {

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

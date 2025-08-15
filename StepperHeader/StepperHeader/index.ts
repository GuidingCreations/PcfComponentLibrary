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

    selectActiveStep = (newStep: any) => {
        this.context.parameters.Steps.setSelectedRecordIds([newStep.recordID]);
        this.notifyOutputChanged();
    }

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

    const params = context.parameters

    this.GenerateSteps()
    if (context.parameters.Steps.getSelectedRecordIds().length == 0 && !params.useTestData.raw && params.Steps.sortedRecordIds.length > 0) {
        context.parameters.Steps.setSelectedRecordIds([params.Steps.sortedRecordIds[0]])
    }

        const props : StepperHeaderProps = {
            Steps: this._Steps,
            activeStepIndex: context.parameters.activeStepIndex.raw ?? 0,
            height: params.containerHeight.raw ?? 75,
            width: params.containerWidth.raw ?? 300,
            useDarkMode: params.useDarkMode.raw,
            primaryColor: params.primaryColor.raw ?? "Green",
            updateSelectedStep: this.selectActiveStep
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

 /* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import StepperComponent, { StepperProps } from "./HelloWorld";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Stepper implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    private _currentStepNumber : number = 0
    context: ComponentFramework.Context<IInputs>

    handleStepChange = (newStepIndex: number) => {
        
        this._currentStepNumber = newStepIndex;
        this.notifyOutputChanged()
    }

    constructor() {
       
    }

    
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const params = context.parameters

        if (this._currentStepNumber == -1) {
            console.log("SETTING TO 0")
            console.log("step changed")
        }


        const props : StepperProps = {
            useTestHarness: params.useTestHarness.raw,
            useDarkMode: params.useDarkMode.raw,
            showBorder: params.showBorder.raw,
            containerHeight: params.containerHeight.raw ?? 57,
            containerWidth: params.containerWidth.raw ?? 300,
            handleStepChange: this.handleStepChange,
            isSubmittable: context.parameters.isSubmittable.raw,
            onSubmit: context.events.OnSubmit,
            variant: params.variantType.raw ?? "text",
            primaryColor: params.primaryColor.raw ?? "Green",
            stepCount: params.stepCount.raw ?? 3
        }

        console.log("PROPS for stepper: ", props)
        return React.createElement(
            StepperComponent, props
        );
    }

  
    public getOutputs(): IOutputs {

        return {
            outputCurrentStepIndex: this._currentStepNumber ?? 0
        };
    }



    public destroy(): void {
    }
}

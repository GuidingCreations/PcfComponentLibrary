 /* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import StepperComponent, { StepperProps } from "./HelloWorld";
import * as React from "react";
import { JSONSchema4 } from "json-schema";
import { populateDataset, generateOutputObject, generateOutputObjectSchema, getInputSchema, generateOutputSchema } from "../../utils";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Stepper implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    private notifyOutputChanged: () => void;
    private _steps : any[] = [];
    context: ComponentFramework.Context<IInputs>
    private _currentStepNumber : number = -1
    private _currentStep : any = {}
    private _inputSchema: any = {}
    
    handleStepChange = (newStepNumber: number, recordID : number) => {
        this._currentStepNumber = newStepNumber
        this._currentStep = generateOutputObject(this.context.parameters.steps.records[recordID], this.context.parameters.steps);
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

        context.mode.trackContainerResize(true)
         this._inputSchema = generateOutputObjectSchema(context, context.parameters.steps, this._inputSchema)
        const params = context.parameters
        this._steps = populateDataset(context.parameters.steps);

        if (this._currentStepNumber == -1) {
            
            this.handleStepChange(0,  this._steps[0].recordID)
        }


        const props : StepperProps = {
            useTestHarness: params.useTestHarness.raw,
            useDarkMode: params.useDarkMode.raw,
            Steps: this._steps,
            showBorder: params.showBorder.raw,
            containerHeight: context.mode.allocatedHeight,
            containerWidth: context.mode.allocatedWidth,
            handleStepChange: this.handleStepChange,
            isSubmittable: context.parameters.isSubmittable.raw,
            onSubmit: context.events.OnSubmit
        }


        return React.createElement(
            StepperComponent, props
        );
    }

  
    public getOutputs(): IOutputs {

        console.log("CURRENT STEP NUMBER: ", this._currentStepNumber);
        console.log("CURRENT STEP: ", this._currentStep)

        return {
            currentStep: this._currentStep,
            currentStepSchema: this._inputSchema
        };
    }


    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
       
        const outputObjectSchema: JSONSchema4 = {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: 'outputObject',
            type: 'object',
            properties:  getInputSchema(context, context.parameters.steps),
        };

        const response =  await Promise.resolve({
            currentStep: outputObjectSchema,
        });

        return response

    }


    public destroy(): void {
    }
}

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
    
    handleStepChange = (newStepNumber: number, newStepID: any) => {
        this._currentStepNumber = newStepNumber
        this._currentStep = generateOutputObject(this.context.parameters.steps.records[newStepID], this.context.parameters.steps);
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

         this._inputSchema = generateOutputObjectSchema(context, context.parameters.steps, this._inputSchema)
        const params = context.parameters
        this._steps = populateDataset(context.parameters.steps);

        if (this._currentStepNumber == -1) {
            
            this.handleStepChange(0, context.parameters.steps.sortedRecordIds[0])
        }


        const props : StepperProps = {
            useTestHarness: params.useTestHarness.raw,
            useDarkMode: params.useDarkMode.raw,
            Steps: this._steps,
            showBorder: params.showBorder.raw,
            containerHeight: params.containerHeight.raw || 50,
            containerWidth: params.containerWidth.raw || 350,
            handleStepChange: this.handleStepChange 
        }


        return React.createElement(
            StepperComponent, props
        );
    }

  
    public getOutputs(): IOutputs {


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

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
    private _currentStepNumber : number = 0
    private _currentStep : any = {}
    private _inputSchema: any = {}
    
    handleStepChange = (newStepNumber: number, recordID : number) => {
        console.log("NEW STEP TRIGGERED: ", newStepNumber, recordID);
        this.context.parameters.steps.setSelectedRecordIds([`${recordID}`])
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
        console.log("GENERATING SCHEMA")
        this._inputSchema = generateOutputObjectSchema(context, context.parameters.steps, this._inputSchema)
        console.log("SCHEMA GENERATED: ", this._inputSchema)
        const params = context.parameters
        console.log("UPDATED PROPS: ", context.updatedProperties)
        if(context.updatedProperties.includes('dataset') || context.updatedProperties.includes('records')) {

            context.parameters.steps.setSelectedRecordIds([ context.parameters.steps.sortedRecordIds[0]]);
            this._steps = populateDataset(context.parameters.steps);
        }

        if (this._currentStepNumber == -1) {
            console.log("SETTING TO 0")
            this.handleStepChange(0,  this._steps[0].recordID);
            console.log("step changed")
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

        console.log("PROPS for stepper: ", props)
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

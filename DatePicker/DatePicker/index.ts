import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DatePickerComponent, { DatePickerComponentProps } from "./HelloWorld";
import * as React from "react";

export class DatePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {

// Establish variables

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _outputDate : string = ''
    private params: any;
    context: ComponentFramework.Context<IInputs>

// Function to be called whenever the date is changed in the datepicker

    handleDateChange = (date: string) => {
        
        this._outputDate = date;
        this.notifyOutputChanged()
    
    }

// Empty constructor

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;

    }

  // Update view portion of component lifecycle


    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
// Establish props

        const props : DatePickerComponentProps = {
            useDarkMode: context.parameters.useDarkMode.raw,
            handleChange: this.handleDateChange,
            labelText: context.parameters.labelText.raw || 'Date label',
            defaultDate: context.parameters.defaultDate.raw || '',
            fontColor: context.parameters.fontColor.raw || 'white',
            backgroundColor: context.parameters.backgroundColor.raw || '',
            height: context.parameters.componentHeight.raw || 50,
            width: context.parameters.componentWidth.raw || 350
        }

// Render element

        return React.createElement(
            DatePickerComponent, props
        );
    }

    
// Return the date as an output property

    public getOutputs(): IOutputs {
        
        return {
        
            outputDate: this._outputDate
        
        };
    }


    public destroy(): void {
    }
}

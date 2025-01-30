import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DatePickerComponent, { DatePickerComponentProps } from "./HelloWorld";
import * as React from "react";

export class DatePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    private _outputDate : string = ''
    private params: any;
    handleDateChange = (date: string) => {
        this._outputDate = date;
        this.notifyOutputChanged()
    }

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;

    }

  
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
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

        return React.createElement(
            DatePickerComponent, props
        );
    }

    
    public getOutputs(): IOutputs {
        return {
            outputDate: this._outputDate
         };
    }


    public destroy(): void {
    }
}

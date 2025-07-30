import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TextFieldComponent, { TextFieldProps } from './TextField'
import * as React from "react";

export class themedMuiTextField implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    

    state: ComponentFramework.Dictionary = {
        textValue: '',
        outputHeight: 65
    }

    private onChangeTextValue = (newText: string, outputHeight: number) => {

        this.state.outputHeight = outputHeight;
        this.state.textValue = newText;
        this.notifyOutputChanged();

    }

    private onChangeHeight = (newHeight : number) => {
        this.state.outputHeight = newHeight;
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
    }


    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        context.mode.trackContainerResize(true);

        const props : TextFieldProps = {
            onChangeText: this.onChangeTextValue,
            primaryColor: context.parameters.primaryColor.raw || 'Green',
            useDarkMode: context.parameters.useDarkMode.raw,
            labelText: context.parameters.labelText.raw || 'Label text',
            isMultiline: context.parameters.isMultiline.raw,
            height: context.mode.allocatedHeight,
            width: context.mode.allocatedWidth,
            defaultText: context.parameters.defaultText.raw || '',
            onChangeHeight: this.onChangeHeight,
            allowNumbersOnly: context.parameters.allowNumbersOnly.raw,
            isCurrency: context.parameters.isCurrency.raw,
            isRequired: context.parameters.isRequired.raw
        }

        return React.createElement(
            TextFieldComponent, props
        );
    }

    public getOutputs(): IOutputs {
        return { 
            outputText: this.state.textValue,
            outputHeight: this.state.outputHeight
        };
    }


    public destroy(): void {
    }
}

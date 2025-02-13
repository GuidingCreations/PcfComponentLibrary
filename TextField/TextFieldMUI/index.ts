import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import TextInput, { TextInputProps } from "./TextField";



export class TextFieldMUI implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    private _outputValue: any = ""
    private _isErrored : boolean = false

    updateOutputValue = (value: any, hasError: boolean) => {
        this._outputValue = value;
        this._isErrored = hasError
        this.notifyOutputChanged()
    }

    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;

    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
        public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props : TextInputProps = { 
            updateOutput: this.updateOutputValue,
            darkMode: context.parameters.useDarkMode.raw || false,
            labelText: context.parameters.labelText.raw || "Label text",
            minLength: context.parameters.minLength.raw || 0,
            useSearchIcon: context.parameters.useSearchIcon.raw,
            accentColor: context.parameters.accentColor.raw ? context.parameters.accentColor.raw : '',
            height: context.parameters.containerHeight.raw || 50,
            backgroundColor: context.parameters.backgroundColor.raw || '',
            labelColor: context.parameters.labelColor.raw || '',
            inputType: context.parameters.inputType.raw || '',
            defaultValue: context.parameters.defaultValue.raw || '',
            isDisabled: context.parameters.isDisabled.raw,
            isCurrency: context.parameters.isCurrency.raw,
            isMultiLine: context.parameters.isMultiLine.raw
            
         };

        return React.createElement(
            TextInput, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            outputValue: this._outputValue,
            isErrored: this._isErrored
         };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

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

        console.log("OUTPUT HEIGHT: ", outputHeight);
        this.state.outputHeight = outputHeight;
        this.state.textValue = newText;
        console.log("NEW STATE TEXT: ", this.state.textValue)
        this.notifyOutputChanged();

    }

    private onChangeHeight = (newHeight : number) => {
        this.state.outputHeight = newHeight;
        this.notifyOutputChanged()
    }
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

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
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        console.log("UPDATED PROPS: ", context.updatedProperties)
        context.mode.trackContainerResize(true);
        console.log("DEMsssS: ", context.mode.allocatedHeight, context.mode.allocatedWidth)

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
            isCurrency: context.parameters.isCurrency.raw
        }

        return React.createElement(
            TextFieldComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            outputText: this.state.textValue,
            outputHeight: this.state.outputHeight
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

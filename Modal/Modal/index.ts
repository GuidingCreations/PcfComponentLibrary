import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ModalComponent, { modalProps } from "./Modal";
import * as React from "react";

export class Modal implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>
    state = {
        outputText: ""
    }

    onInputTextChange = (newText: string) => {

        console.log("UPDATING TEXT: ", "Current text: ", this.state.outputText, " New text: ", newText)

        this.state = {
            ...this.state, outputText: newText
        };
        this.notifyOutputChanged();
    }

    /**
     * Empty constructor.
     */
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
        this.context = context
        
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const props : modalProps= {
            containerHeight: context.parameters.containerHeight.raw ?? 500,
            modalHeader: context.parameters.dialogHeader.raw ?? "",
            modalText: context.parameters.dialogText.raw ?? "",
            confirmText: context.parameters.confirmText.raw ?? "",
            OnCancel: context.events.OnCancel,
            OnConfirm: context.events.OnConfirm,
            modalType: context.parameters.modalType.raw,
            containerWidth: context.parameters.containerWidth.raw ?? 500,
            includeTextInput: context.parameters.includeTextInput.raw,
            inputTextPlaceholder: context.parameters.textInputPlaceholder.raw ?? "Please input reason",
            onInputTextChange: this.onInputTextChange
        }

        return React.createElement(
            ModalComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            outputText: this.state.outputText
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

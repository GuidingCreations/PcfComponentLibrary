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
        this.state = {
            ...this.state, outputText: newText
        };
        this.notifyOutputChanged();
    }

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context
        
    }

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
            onInputTextChange: this.onInputTextChange,
            requiredConfirmationText: context.parameters.requiredConfirmText.raw
        }

        return React.createElement(
            ModalComponent, props
        );
    }

    public getOutputs(): IOutputs {
        return { 
            outputText: this.state.outputText
        };
    }

    public destroy(): void {
    }
}

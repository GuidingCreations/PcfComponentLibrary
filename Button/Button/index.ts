/* eslint-disable */


import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ButtonComponent, { ButtonProps } from "./Button";
import * as React from "react";

export class Button implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    
    constructor() { }

 
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const props : ButtonProps = {
            ButtonText: context.parameters.buttonText.raw || "Click me",
            useDarkMode: context.parameters.DarkMode.raw,
            size: context.parameters.sizeVariant.raw || "small",
            typeVariant: context.parameters.typeVariant.raw || "contained",
            onClick: () => context.events.OnClick(),
            height: context.parameters.containerHeight.raw || 50,
            width: context.parameters.containerWidth.raw || 125,
            isDisabled: context.parameters.isDisabled.raw,
            backgroundColor: context.parameters.backgroundColor.raw || 'blue',
            fontColor: context.parameters.fontColor.raw || 'white',
            borderColor: context.parameters.borderColor.raw || 'white',
            borderWidth: context.parameters.borderWidth.raw || 1,
            textAlign: context.parameters.textAlign.raw || 'center',
            startIcon: context.parameters.startIcon.raw || '',
            endIcon: context.parameters.endIcon.raw || ''
        
        }

        return React.createElement(
           ButtonComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

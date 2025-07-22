import { IInputs, IOutputs } from "./generated/ManifestTypes";
import ButtonComponent, { buttonProps } from "./Button";
import * as React from "react";

export class themedMuiButton implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

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

        const props : buttonProps = {
           
            containerHeight: context.parameters.containerHeight.raw,
            containerWidth: context.parameters.containerWidth.raw,
            PrimaryColor: context.parameters.PrimaryColor.raw || "Green",
            useDarkMode: context.parameters.useDarkMode.raw,
            onClick: context.events.OnClick,
            labelText: context.parameters.labelText.raw || "Button",
            variantType: context.parameters.variant.raw || 'contained',
            isDisabled: context.parameters.isDisabled.raw,
            startIconColor: context.parameters.startIconColor.raw,
            endIconColor: context.parameters.endIconColor.raw,
            startIcon: context.parameters.startIconSVG.raw,
            endIcon: context.parameters.endIconSVG.raw
        }

        return React.createElement(
            ButtonComponent, props
        );
    }


    public getOutputs(): IOutputs {
        return { 
            uselessOutput: "PCFs stupid linting rules don't allow for empty object in output for ManifestTypes.d.ts, but overrides any custom changes made to counteract this during build process, including eslint-disable"
        };
    }


    public destroy(): void {

    }
}

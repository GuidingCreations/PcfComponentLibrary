/* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import bodyTypography, {bodyProps} from "./bodyTypography";
import * as React from "react";

export class bodyText implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private outputHeight : number;
    
    private updateComponentHeight = (newHeight: number) => {
        console.log("NEW HEIght: ", newHeight)

        if (this.outputHeight != newHeight) {
            this.outputHeight = newHeight;
            this.notifyOutputChanged();
        }
    }

    constructor() {
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.outputHeight = 75
    }

     public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
                const params = context.parameters;
        context.mode.trackContainerResize(true)
        
        const props: bodyProps = { 
            isBold: params.isBold.raw,
            Text:  params.Text.raw ?? '',
            useAutoHeight: params.autoHeight.raw,
            TextAlign: params.TextAlign.raw ?? 'left',
            paddingLeft: params.paddingLeft.raw ?? 0,
            paddingRight: params.paddingRight.raw ?? 0,
            paddingBottom: params.paddingBottom.raw ?? 0,
            paddingTop: params.paddingTop.raw ?? 0,
            isItalic: params.isItalic.raw,
            height: params.containerHeight.raw ?? 75,
            width: params.containerWidth.raw ?? 500,
            fontColor: params.fontColor.raw,
            updateComponentHeight: this.updateComponentHeight,
            overflow: params.overflow.raw ?? "scroll"
        };
        return React.createElement(
            bodyTypography, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            outputHeight: this.outputHeight
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

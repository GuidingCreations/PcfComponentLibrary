/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import smallTypography, {smallProps} from "./smallTypography";
import * as React from "react";

export class smallText implements ComponentFramework.ReactControl<IInputs, IOutputs> {
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
        
                const params = context.parameters;
        context.mode.trackContainerResize(true)
        
        const props: smallProps = { 
            isBold: params.isBold.raw,
            Text:  params.Text.raw ?? '',
            TextAlign: params.TextAlign.raw ?? 'left',
            paddingLeft: params.paddingLeft.raw ?? 0,
            paddingRight: params.paddingRight.raw ?? 0,
            paddingBottom: params.paddingBottom.raw ?? 0,
            paddingTop: params.paddingTop.raw ?? 0,
            isItalic: params.isItalic.raw,
            height: context.mode.allocatedHeight,
            width: context.mode.allocatedWidth,
            verticalAlign: params.verticalAlign.raw ?? 'center',
            fontColor: params.fontColor.raw
        };
        return React.createElement(
            smallTypography, props
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

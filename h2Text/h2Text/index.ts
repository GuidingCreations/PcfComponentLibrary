/* eslint-disable */


import { IInputs, IOutputs } from "./generated/ManifestTypes";
import h2Typography, {h2Props} from "./H2";
import * as React from "react";

export class h2Text implements ComponentFramework.ReactControl<IInputs, IOutputs> {
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
        
        const props: h2Props = { 
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
            h2Typography, props
        );
    }

    
    public getOutputs(): IOutputs {
        return { };
    }

    
    public destroy(): void {
    }
}

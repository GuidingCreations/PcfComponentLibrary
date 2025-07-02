/* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Candles, { CandleProps } from "./TrackerCandles";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class TrackerCandles implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    
    constructor() {
    }

  
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        context.mode.trackContainerResize(true);
        console.log("is testing: ", context)

        const props : CandleProps = {
            height: `${context.mode.allocatedHeight}px`,
            width: `${context.mode.allocatedWidth}px`
        }

        
        return React.createElement(
            Candles, props
        );
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
    }
}

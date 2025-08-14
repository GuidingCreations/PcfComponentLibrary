import { IInputs, IOutputs } from "./generated/ManifestTypes";
import LoaderComponent, { loaderProps } from './Loader';
import * as React from "react";

export class Loader implements ComponentFramework.ReactControl<IInputs, IOutputs> {
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
        const props: loaderProps = { containerHeight: context.parameters.containerHeight.raw || 500 };
        return React.createElement(
            LoaderComponent, props
        );
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
    }
}

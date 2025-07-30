import { IInputs, IOutputs } from "./generated/ManifestTypes";
import HeaderComponent from "./Header";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Header implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _value = "";

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        this._value = context.parameters.defaultLink.raw || "";

        const props = {
            navLinks: context.parameters.navItemsJson.raw || "",
            updateValue: this._updateValue.bind(this),
            currentLink: this._value|| ""
        };

        return React.createElement(
            HeaderComponent, props
        );
    }

    public _updateValue(value: string) {
        
        this._value = value;
        this.notifyOutputChanged();
       
    }



    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            selectedLink: this._value
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

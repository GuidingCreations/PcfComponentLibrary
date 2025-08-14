import * as React from "react"
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DatePickerComponent, { DatePickerProps } from "./DatePickerComponent";

export class themedMuiDatepicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    context: ComponentFramework.Context<IInputs>;
    
    // Initialize state

    private state : ComponentFramework.Dictionary = {
        selectedDate: '444'
    }

    private handleDateSelection = (newDate: string) => {
        this.state.selectedDate = newDate
        this.notifyOutputChanged()
    }

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }


    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;

    }


    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        const props : DatePickerProps = {
            useDarkMode: context.parameters.useDarkMode.raw,
            DefaultDate: context.parameters.DefaultDate.raw ?? '',
            primaryColor: context.parameters.primaryColor.raw ?? "Green",
            handleDateSelection: this.handleDateSelection,
            labelText: context.parameters.labelText.raw ?? "Label text",
            isRequired: context.parameters.isRequired.raw,
            height: context.parameters.containerHeight.raw ?? 57,
            width: context.parameters.containerWidth.raw ?? 300
        }

        return React.createElement(
            DatePickerComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            selectedDate: this.state.selectedDate
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

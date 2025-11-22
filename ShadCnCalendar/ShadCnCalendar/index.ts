import { IInputs, IOutputs } from "./generated/ManifestTypes";
import  CalendarComponent, { CalenderComponentProps }  from "./CalendarComponent";
import * as React from "react";

export class ShadCnCalendar implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private varSelectedDate : Date | undefined;
    private varSelectedEndDate: Date | undefined;
    private updateSelectedDate = (newDate : Date) => {
        this.varSelectedDate = newDate;
        this.notifyOutputChanged();
    }

    private updateSelectedDateRange = (startDate?: Date, endDate?: Date) => {
        this.varSelectedDate = startDate;
        this.varSelectedEndDate = endDate;
        this.notifyOutputChanged()
    }


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

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        const calendarMode = context.parameters.calendarMode.raw

        const props : CalenderComponentProps = {
            Width: context.parameters.ComponentWidth.raw ?? 500,
            Height: context.parameters.ComponentHeight.raw ?? 500,
            updateSelectedDate: this.updateSelectedDate,
            updateSelectedDateRange: this.updateSelectedDateRange,
            calendarMode: calendarMode == "single" ? "single" : calendarMode == "range" ? "range" : "single"

        }

        return React.createElement(
            CalendarComponent, props
        )
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            selectedDate: this.varSelectedDate,
            selectedEndDate: this.varSelectedEndDate
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

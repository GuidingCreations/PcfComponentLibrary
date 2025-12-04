import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { BreadcrumbDemo, BreadCrumbProps } from "./ShadCnBreadCrumb";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ShadCnBreadcrumb implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private varSelectedNavItem: string = ''
    context: ComponentFramework.Context<IInputs>

    private onNavItemSelect = (navItemTitle: string) => {

        console.log("TRIGGERED NAV SELECT: ", navItemTitle)
        this.varSelectedNavItem = navItemTitle;
        this.notifyOutputChanged();

        setTimeout(() => {
            this.context.events.onNavSelect()
        }, 100)
    }

    constructor() {
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context

    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        const props : BreadCrumbProps = {
            navItems: [],
            onNavItemSelect: this.onNavItemSelect,
            themeColor: context.parameters.themeColor.raw ?? "green",
            useDarkMode: context.parameters.useDarkMode.raw
        }

        return React.createElement(
            BreadcrumbDemo, props
        );
    }

    public getOutputs(): IOutputs {
        return {
            outputSelectedOption: this.varSelectedNavItem
        };
    }

    public destroy(): void {
    }
}

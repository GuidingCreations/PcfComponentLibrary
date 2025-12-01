/* eslint-disable */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { populateDataset } from "../../utils";
import NavMenu, { NavMenuProps} from "./NavMenu";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ShadCnNavigationMenu implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private state: ComponentFramework.Dictionary
    private colNavItems: any[] = [];
    private selectedNav : string;
    
    private onNavSelect = (navText: string) => {
        this.selectedNav = navText;
        this.notifyOutputChanged();
        setTimeout(() => {
            this.context.events.onNavSelect()
        }, 100);
    }
    constructor() {
    }

    
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.state = state
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        
        if (context.updatedProperties.includes("dataset")) {
            this.colNavItems = populateDataset(this.context.parameters.NavItems)
        }

        const props : NavMenuProps = {
            useDarkMode: context.parameters.useDarkMode.raw,
            NavItems: this.colNavItems,
            useTestData: context.parameters.useTestData.raw,
            onNavSelect: this.onNavSelect
        }

        return React.createElement(
            NavMenu, props
        );
    }

    public getOutputs(): IOutputs {
        return {
            outputSelectedOption: this.selectedNav
        };
    }

    public destroy(): void {
    }
}

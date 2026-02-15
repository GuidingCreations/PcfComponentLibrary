/* eslint-disable */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import  AreaChart, { AreaChartProps }  from "./HelloWorld";
import pcfCoreFunctions from '../../utils'

import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ShadCnAreaChart implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;
    private chartData: any[] = []

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

        pcfCoreFunctions.createInfoMessage("UPDATED PARAMETERS: ", this.context.updatedProperties)
        
        const controlNeedsUpdated = pcfCoreFunctions.needsUpdated(['dataset', 'records'], this.context, this.chartData.length, this.context.parameters.ChartData.sortedRecordIds.length);
        if (controlNeedsUpdated) {
            console.log("Updating Chart Data");
            this.chartData = pcfCoreFunctions.populateDataset(this.context.parameters.ChartData);
            console.log("Updated Chart Data: ", this.chartData);
        }

        context.mode.trackContainerResize(true);


        const props : AreaChartProps= {
            height: this.context.parameters.componentHeight.raw || 300,
            width: this.context.parameters.componentWidth.raw || 400,
            chartData: this.chartData.length > 0 ? this.chartData : undefined,
            useTestData: this.context.parameters.useTestData.raw,
            dateColumn: this.context.parameters.dateColumn.raw ?? undefined,
            secondaryDateColumn: this.context.parameters.secondDateColumn.raw ?? undefined,
            valueColumn: this.context.parameters.valueColumn.raw ?? undefined,
            secondaryValueColumn: this.context.parameters.secondValueColumn.raw ?? undefined,
            chartTitle: this.context.parameters.chartTitle.raw ?? undefined,
            chartSubTitle: this.context.parameters.chartSubTitle.raw ?? undefined,
        };
        return React.createElement(
            AreaChart,
            props
        );
    }

   
    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
    }
}

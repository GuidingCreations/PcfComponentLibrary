import { IInputs, IOutputs } from "./generated/ManifestTypes";
import SidebarTW, {SidebarProps} from "./Sidebar";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class Sidebar2 implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    public _compDarkMode : boolean;
    public _defaultDarkMode: boolean;
    private _navItems : any[] = []
    private _outputScreenName = ""
    context: ComponentFramework.Context<IInputs>;


    updateScreenName = (newScreenName: string) => {
        this._outputScreenName = newScreenName
        
        this.notifyOutputChanged()
     
        console.log("RETURNED FROM OUTPUTS")
    }

    toggleMode = (newValue: boolean) => {
        console.log("TRANSFERRING TO NEW VALUE")
        this._compDarkMode = newValue
        console.log("NOTIFYING OUTPUT", this._compDarkMode)
        this.notifyOutputChanged()
    }
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;

    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        

        // Loop through data source to populate the nav items data
        this._navItems = []
        
        context.parameters.navItems.sortedRecordIds.forEach( (record) => {
            const objToAdd : any = {};
            objToAdd.screenName = context.parameters.navItems.records[record].getFormattedValue("screenName");
            objToAdd.svgData = context.parameters.navItems.records[record].getFormattedValue("svgData")
            this._navItems.push(objToAdd)
            
        }
    
    )
        
        


        const props : SidebarProps = {
            height: context.parameters.containerHeight.raw || 700,
            width: context.parameters.containerWidth.raw || 250,
            defaultDarkMode: context.parameters.useDarkMode.raw,
            useDarkMode: this._compDarkMode,
            handleToggleChange: this.toggleMode,
            navItems: this._navItems,
            adjustScreenName: this.updateScreenName,
            changeScreen: context.events.OnChangeScreen
        }

        console.log("props", props)

        return React.createElement(
            SidebarTW, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            outputScreenName: this._outputScreenName,
            darkModeEnabled: this._compDarkMode
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

/* eslint-disable */ 

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import HelloWorld, {AccesPageProps} from "./HelloWorld";
import * as React from "react";
import { GridColDef } from '@mui/x-data-grid';

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class AccessPage implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    context: ComponentFramework.Context<IInputs>
    private notifyOutputChanged: () => void;
    private groupOwners : any[] = [];
    private groupMembers: any[] = [];
    private allUsers: any[] = [];
    private _navItems: any[] = []
    private userFields : any[] =  [
        {
            field: "displayName",
            align: "center",
            headerName: "displayName",
            display: 'flex',
            headerAlign: 'center',
            flex: 1
        },
        {
            field: "givenName",
            align: "center",
            headerName: "givenName",
            display: 'flex',
            headerAlign: 'center',
            flex: .5 
        },
        {
            field: "surname",
            align: "center",
            headerName: "surname",
            display: 'flex',
            headerAlign: 'center',
            flex: .5
        },
        {
            field: "jobTitle",
            align: "center",
            headerName: "jobTitle",
            display: 'flex',
            headerAlign: 'center',
            flex: .5 
        },
        {
            field: "mail",
            align: "center",
            headerName: "mail",
            display: 'flex',
            headerAlign: 'center',
            flex: 1 
        },
        {
            field: "userType",
            align: "center",
            headerName: "User type",
            display: 'flex',
            headerAlign: 'center' 
        }

        
        
        
        
        
    ]
    
    private getGroupOwners = () => {
        
        this.groupOwners = [];
        
       this.context.parameters.groupOwners.sortedRecordIds.map( (recordID) => {

            const recordToAdd : any = {}
            
            this.userFields.map( (userField) => {
                recordToAdd[userField.field] = this.context.parameters.groupOwners.records[recordID].getFormattedValue(userField.field)    
            })

            recordToAdd.recordID = this.context.parameters.groupOwners.records[recordID].getRecordId()
            recordToAdd.userType = "Owner"

            console.log("ADDING OWNER TO priv variable: ", recordToAdd);
            this.groupOwners.push(recordToAdd)
       })

    }
    
    private getGroupMembers = () => {
        
        this.groupMembers = [];
        
       this.context.parameters.groupMembers.sortedRecordIds.map( (recordID) => {

            const recordToAdd : any = {}
            
            this.userFields.map( (userField) => {
                recordToAdd[userField.field] = this.context.parameters.groupMembers.records[recordID].getFormattedValue(userField.field)    
            })

            recordToAdd.recordID = this.context.parameters.groupMembers.records[recordID].getRecordId()
            recordToAdd.userType = "Member"

            console.log("ADDING Member TO priv variable: ", recordToAdd);
            this.groupMembers.push(recordToAdd)
       })

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
    }

    
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
       
        this.allUsers = []

        this._navItems = []
        
        context.parameters.navItems.sortedRecordIds.forEach( (record) => {
            const objToAdd : any = {};
            objToAdd.screenName = context.parameters.navItems.records[record].getFormattedValue("screenName");
            objToAdd.svgData = context.parameters.navItems.records[record].getFormattedValue("svgData");
            objToAdd.children = context.parameters.navItems.records[record].getValue("children");
            objToAdd.isExpanded = false;
            this._navItems.push(objToAdd)
            
        }
    
    )
        
        this.getGroupOwners();
        console.log("OWNERS: ", this.groupOwners);
        
        this.getGroupMembers();
        console.log("MEMBERS: ", this.groupMembers);
       
        this.allUsers = this.groupOwners.concat(this.groupMembers)
        


        
        const cols : GridColDef<typeof this.userFields>[] = this.userFields
       
       
       
        const props: AccesPageProps = { 
        
            Users: this.allUsers,
            columns: cols,
            width: context.parameters.containerWidth.raw || 500,
            navItems: this._navItems,
            sidebarWidth: context.parameters.sidebarWidth.raw || 300,
            containerHeight: context.parameters.containerHeight.raw || 500,
            headerText: context.parameters.headerText.raw || "Access Control"

        };
        
        return React.createElement(
        
            HelloWorld, props
        
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

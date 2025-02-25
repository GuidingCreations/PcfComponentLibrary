/* eslint-disable */ 

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import HelloWorld, {AccesPageProps} from "./AccessPage";
import * as React from "react";
import { GridColDef } from '@mui/x-data-grid';
import { populateDataset, generateOutputObject, generateOutputObjectSchema, getInputSchema } from "../../utils";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { PublicClientApplication } from "@azure/msal-browser";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class AccessPage implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    context: ComponentFramework.Context<IInputs>

    
    private notifyOutputChanged: () => void;
    private _newUserMail : string = ''
    private _newUserID : string = ''
    private groupOwners : any[] = [];
    private groupMembers: any[] = [];
    private allUsers: any[] = [];
    private _usersList : any[] = []
    private _navItems: any[] = [];
    private _userSearchText : string = ''
    private _selectedRecords: any[] = []
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
        },
        {
            field: "id",
            align: "center",
            headerName: "id",
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

    private handleNewUserSelection = (newUser : any) => {
      
        console.log("INDEX NEW USER: ", newUser)
        this._newUserID = newUser.id
        this._newUserMail = newUser.Mail
        console.log("TRIGGERING NEW OUTPUT: ", this._newUserID, this._newUserMail)
        this.notifyOutputChanged()
    }

    private handleNewSearchText = (newSearchText: string) => {
        console.log("NEW USER SE TExT: ", newSearchText)
        this._userSearchText = newSearchText;
        console.log("UPDATED TEXT: ", this._userSearchText)
        this.notifyOutputChanged()
    }

    private handleAddOwnerToGroup = () => {
        
        console.log("Adding owner: ", this._newUserID, " to group ", this.context.parameters.groupID)
        this.context.events.onAddOwnerToGroup()
    }

    private handleAddMemberToGroup = () => {
        
        console.log("Adding Member: ", this._newUserMail, " to group ", this.context.parameters.groupID)
        this.context.events.onAddMemberToGroup()
    }

    private handleDataTableSelection = (selectedRecordIDs: any[]) => {

        console.log("SELRECS: ", selectedRecordIDs)

        const ownerIDs : any[] = []
        const memberIDs: any[] = []
        selectedRecordIDs.map((recordID) => {

            console.log("owners: ", this.groupOwners);
            console.log("members: ", this.groupMembers);
            const matchingOwners = this.groupOwners.filter((owner : any) => {console.log("COMPARING ownerID ", owner.recordID, " to ", recordID);  return owner.recordID == recordID});
            const matchingMembers = this.groupMembers.filter((member : any) => {console.log("COMPARING ownerID ", member.recordID, " to ", recordID); return member.recordID == recordID})
            console.log("MATCHING OWNS: ", matchingOwners);
            console.log("MATCHING members: ", matchingMembers);
            const accessType = matchingOwners.length > 0 ? "Owner" : "Member"
            console.log("Access type", accessType, recordID)
            if (accessType == "Owner") {
                ownerIDs.push(recordID)
            } else {
                memberIDs.push(recordID)
            }
        }

        
    )

    if (memberIDs.length > 0) {

        this.context.parameters.groupMembers.setSelectedRecordIds(memberIDs);
    } else {
        this.context.parameters.groupMembers.clearSelectedRecordIds()
    }

    if (ownerIDs.length > 0) {

        this.context.parameters.groupOwners.setSelectedRecordIds(ownerIDs)
    } else {
        this.context.parameters.groupOwners.clearSelectedRecordIds()
    }


    console.log("Sel owners: ", ownerIDs)
        



                this.notifyOutputChanged()
    }

    private handleDeleteUsers = () => {
        console.log("HANDLING DELETE USERS")
        this.context.events.onDeleteUsersFromGroup()
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
       
        this._usersList = []

        context.parameters.usersList.sortedRecordIds.map((recordID) => {

            const userToAdd : any = {}
            const userName = `${context.parameters.usersList.records[recordID].getValue("GivenName")} ${context.parameters.usersList.records[recordID].getValue("Surname")}`
            const userMail = context.parameters.usersList.records[recordID].getValue("Mail")
            userToAdd.label = userName
            userToAdd.Mail =  userMail
            userToAdd.recordID = context.parameters.usersList.records[recordID].getRecordId()
            userToAdd.id = context.parameters.usersList.records[recordID].getFormattedValue('Id')
            console.log("USer to ADD: ", userToAdd)
            this._usersList.push(userToAdd)
        })


        
        const cols : GridColDef<typeof this.userFields>[] = this.userFields
       
       
       
        const props: AccesPageProps = { 
        
            Users: this.allUsers,
            columns: cols,
            width: context.parameters.containerWidth.raw || 500,
            navItems: this._navItems,
            sidebarWidth: context.parameters.sidebarWidth.raw || 300,
            containerHeight: context.parameters.containerHeight.raw || 500,
            headerText: context.parameters.headerText.raw || "Access Control",
            usersList: this._usersList,
            useTestData: context.parameters.useTestData.raw,
            handleNewUserSearchText: this.handleNewSearchText,
            userSearchText: this._userSearchText,
            handleNewUserSelection: this.handleNewUserSelection,
            addOwnerToGroup: this.handleAddOwnerToGroup,
            addMemberToGroup: this.handleAddMemberToGroup,
            handleDataTableSelection: this.handleDataTableSelection,
            handleDeleteUsers: this.handleDeleteUsers

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

        console.log("PASSING NEW OUTPUTS - mail: ", this._newUserMail, " id: ", this._newUserID, " search text: ", this._userSearchText)
        return {
            selectedNewUserMail: this._newUserMail,
            selectedNewUserID: this._newUserID,
            userSearchText: this._userSearchText
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

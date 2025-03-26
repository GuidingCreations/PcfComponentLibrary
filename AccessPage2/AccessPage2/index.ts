/* eslint-disable */ 

// imports

import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { GridColDef } from '@mui/x-data-grid';
import { populateDataset, generateOutputObject, generateOutputObjectSchema, getInputSchema, createInfoMessage } from "../../utils";
import HelloWorld, {AccesPageProps} from "./AccessPage";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;


export class AccessPage implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    context: ComponentFramework.Context<IInputs>

    // Establish variables
    
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
    private _outputScreenName = "";
    private _changeType : string = "";
    private _optionText : string = ''

    // Function to fire when an option from a split button group (custom rendered in the data table) is selected

    onOptionSelected = (optionText: string) => {
        console.log("ACCESS PAGE TRIGGERED onOptionSelected with optionText: ", optionText);
        this.context.events.onOptionSelected()
    }

    updateScreenName = (newScreenName: string) => {

        console.log("Sidebar2 Triggered update screen name")
        this._outputScreenName = newScreenName
        this._changeType = "screen"
        this.notifyOutputChanged()
    
    }
    // Fields that will be mapped through to populate group owners array (at the time of writing this, only the first dataset in PCF populates column info, so can't populate it through util as normal)

    private userFields : any[] =  [
        {
            field: "displayName",
            align: "left",
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
    
    // Populate group owners

    private getGroupOwners = () => {
        
        this.groupOwners = [];
        
        // Map through sorted record IDs, with inner map to user fields

        this.context.parameters.groupOwners.sortedRecordIds.map( (recordID : any) => {

            const recordToAdd : any = {}
            
            this.userFields.map( (userField) => {

                recordToAdd[userField.field] = this.context.parameters.groupOwners.records[recordID].getFormattedValue(userField.field)    

            })

            recordToAdd.recordID = this.context.parameters.groupOwners.records[recordID].getRecordId()
            recordToAdd.userType = "Owner"
            this.groupOwners.push(recordToAdd)
       
        })

    }   
    
    // Populate group members

    private getGroupMembers = () => {
        
        this.groupMembers = [];
        
        this.context.parameters.groupMembers.sortedRecordIds.map( (recordID) => {

            const recordToAdd : any = {}
            
            this.userFields.map( (userField) => {
                recordToAdd[userField.field] = this.context.parameters.groupMembers.records[recordID].getFormattedValue(userField.field)    
            })

            recordToAdd.recordID = this.context.parameters.groupMembers.records[recordID].getRecordId()
            recordToAdd.userType = "Member"
            this.groupMembers.push(recordToAdd)
       
        })

    }

    // Formula to be called when a new user is selected from combo box in add user section

    private handleNewUserSelection = (newUser : any) => {
      
        console.log("TRIGGERING NEW USER SEL OM", newUser)
        this._newUserID = newUser.id
        this._newUserMail = newUser.Mail
        this.notifyOutputChanged()

    }

    // Formula to be called to pass the search text to an output property. This is useful in situations such as when you want re-query with new search text, for example you want to re-load the search query to the office users API SearchUserV2. 

    private handleNewSearchText = (newSearchText: string) => {
        this._userSearchText = newSearchText;
        this.notifyOutputChanged()
    }

    // Event to be called when someone tries to add an owner to the group 

    private handleAddOwnerToGroup = () => {
        
        this.context.events.onAddOwnerToGroup()
   
    }

    // Event to be called when someone tries to add a member to the group 

    private handleAddMemberToGroup = () => {
        
        this.context.events.onAddMemberToGroup()

    }

    // Event to be called when a row is selected / unselected from data table. 

    private handleDataTableSelection = (selectedRecordIDs: any[]) => {

        console.log("HANDLE DATA TABLE SELECTION TRIGGERED WITH: ", selectedRecordIDs)

        const ownerIDs : any[] = []
        const memberIDs: any[] = []

        selectedRecordIDs.map((recordID) => {

            
            // Will search for selected record id in owners list, if not found then they are member by default


            const matchingOwners = this.groupOwners.filter((owner : any) => { return owner.recordID == recordID });
            const accessType = matchingOwners.length > 0 ? "Owner" : "Member"

            if (accessType == "Owner") {
                
                ownerIDs.push(recordID)
            
            } else {
            
                memberIDs.push(recordID)
            
            }
        }

        
    )

    // Will loop through both members and owners to set selected values if array is not empty. If it is empty, invoke the clearSelectedRecordIDs method

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

    this.notifyOutputChanged()
    
}

    // Event to call when delete selected button is selected

    private handleDeleteUsers = () => {

        this.context.events.onDeleteUsersFromGroup()

    }

    private updateNavItems = () => {
        
        if (this.context.updatedProperties.indexOf("navItems_dataset") > -1 || this.context.parameters.navItems.sortedRecordIds.length > this._navItems.length) {
            
            console.log("TRIGGERED UPDATE NAV ITEMS")
            this._navItems = [];

             // Generate sidebar items
        
        this.context.parameters.navItems.sortedRecordIds.forEach( (record) => {
            const objToAdd : any = {};
            objToAdd.screenName = this.context.parameters.navItems.records[record].getFormattedValue("screenName");
            objToAdd.svgData = this.context.parameters.navItems.records[record].getFormattedValue("svgData");
            objToAdd.children = this.context.parameters.navItems.records[record].getValue("children");
            objToAdd.isExpanded = false;
            this._navItems.push(objToAdd)
            
        }
    
    )

        }
    }

    updateGroupUsers = () => {
        
        
        if (this.context.updatedProperties.indexOf("dataset") > -1 || this.context.updatedProperties.indexOf("groupOwners_dataset") > -1) {
            
            console.log("triggered update group users")
            
            // Populate owners and members, then mash them together into one table for data grid
    
            this.allUsers = [];
                
            this.getGroupOwners();
        
            this.getGroupMembers();

            this.allUsers = this.groupOwners.concat(this.groupMembers)
       
        }
    }

    updateUserList = () => {

        if (this.context.updatedProperties.indexOf("usersList_dataset") > -1) {
            
            console.log("TRIGGERED UPDATE USER LIST")

            this._usersList = []
        
       
            // Generate user list (to be used in combo box on add user section as a list of users to choose from)
    
            this.context.parameters.usersList.sortedRecordIds.map((recordID) => {
    
                const userToAdd : any = {}
                const displayField = this.context.parameters.userListDisplayField.raw || 'displayName';
                createInfoMessage("Display field: ", displayField)
                const userName = `${this.context.parameters.usersList.records[recordID].getValue(displayField)}`
                const userMail = this.context.parameters.usersList.records[recordID].getValue("Mail")
                userToAdd.label = userName
                userToAdd.Mail =  userMail
                userToAdd.recordID = this.context.parameters.usersList.records[recordID].getRecordId()
                userToAdd.id = this.context.parameters.usersList.records[recordID].getFormattedValue('Id')
                this._usersList.push(userToAdd)
            })
        }

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

        console.log("UPDATE VIEW TRIGGERED IN AccessPage", context.updatedProperties)
       
        
        this.updateNavItems();
        this.updateGroupUsers();
        this.updateUserList();


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
            userSearchText: this._userSearchText,
            onOptionSelected: this.onOptionSelected,
            handleNewUserSearchText: this.handleNewSearchText,
            handleNewUserSelection: this.handleNewUserSelection,
            addOwnerToGroup: this.handleAddOwnerToGroup,
            addMemberToGroup: this.handleAddMemberToGroup,
            handleDataTableSelection: this.handleDataTableSelection,
            handleDeleteUsers: this.handleDeleteUsers,
            handleNewScreenSelection: this.updateScreenName

        };
        
        createInfoMessage("PROPS PASSING TO ACCESS PAGE: ", props)

        return React.createElement(
        
            HelloWorld, props
        
        );
    }

    public getOutputs(): IOutputs {

        const outputs = {
            outputScreenName: this._outputScreenName,
            changeType: this._changeType,
            selectedNewUserMail: this._newUserMail,
            selectedNewUserID: this._newUserID,
            userSearchString: this._userSearchText        
        };

        return outputs

        
    }

    public destroy(): void {

    }
}


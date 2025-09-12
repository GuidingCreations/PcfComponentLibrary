import { ListOwnedGroups_V2_Response } from "../testCodeApp/TestApp/src/Models/Office365GroupsModel";
import { Office365GroupsService } from "../testCodeApp/TestApp/src/Services/Office365GroupsService";

export const  loadGroups = async () => {
        try {
            const loadedGroups  = Promise.resolve( Office365GroupsService.ListOwnedGroups_V2());
            return loadedGroups.then((value) => {console.log("VAL: ", value) ; return value.data.value});
            
        } catch (error : any) {
            throw new Error("An error occurred while loading groups: " + error);
        } 
    }
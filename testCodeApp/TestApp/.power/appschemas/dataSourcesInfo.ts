/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * This file is auto-generated. Do not modify it manually.
 * Changes to this file may be overwritten.
 */

export const dataSourcesInfo = {
  "office365groups": {
    "tableId": "",
    "version": "",
    "primaryKey": "",
    "dataSourceType": "Connector",
    "apis": {
      "ListGroupMembers": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/members",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "OnGroupMembershipChange": {
        "path": "/{connectionId}/trigger/v1.0/groups/delta",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "query",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "$select",
            "in": "query",
            "required": false,
            "type": "string",
            "default": "members"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "array",
            "format": null
          }
        }
      },
      "AddMemberToGroup": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/members/$ref",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "userUpn",
            "in": "query",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "204": {
            "type": "void",
            "format": null
          }
        }
      },
      "ListOwnedGroups": {
        "path": "/{connectionId}/v1.0/me/memberOf/$/microsoft.graph.group",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "ListOwnedGroups_V2": {
        "path": "/{connectionId}/v1.0/me/ownedObjects/$/microsoft.graph.group",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "extractSensitivityLabel",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          },
          {
            "name": "fetchSensitivityLabelMetadata",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "ListOwnedGroups_V3": {
        "path": "/{connectionId}/v2/v1.0/me/memberOf/$/microsoft.graph.group",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "extractSensitivityLabel",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          },
          {
            "name": "fetchSensitivityLabelMetadata",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "ListGroups": {
        "path": "/{connectionId}/v1.0/groups",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "extractSensitivityLabel",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          },
          {
            "name": "fetchSensitivityLabelMetadata",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": null
          },
          {
            "name": "$filter",
            "in": "query",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer",
            "default": null
          },
          {
            "name": "$skiptoken",
            "in": "query",
            "required": false,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "CreateCalendarEvent": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/events",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "type": "object",
            "default": null
          }
        ],
        "responseInfo": {
          "201": {
            "type": "object",
            "format": null
          }
        }
      },
      "CreateCalendarEventV2": {
        "path": "/{connectionId}/v2/v1.0/groups/{groupId}/events",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "type": "object",
            "default": null
          }
        ],
        "responseInfo": {
          "201": {
            "type": "object",
            "format": null
          }
        }
      },
      "CalendarDeleteItem_V2": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/events/{event}",
        "method": "DELETE",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "event",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "204": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "UpdateCalendarEvent": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/events/{event}",
        "method": "PATCH",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "event",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "type": "object",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "RemoveMemberFromGroup": {
        "path": "/{connectionId}/v1.0/groups/{groupId}/members/memberId/$ref",
        "method": "DELETE",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "userUpn",
            "in": "query",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "204": {
            "type": "void",
            "format": null
          }
        }
      },
      "OnNewEvent": {
        "path": "/{connectionId}/trigger/v1.0/groups/{groupId}/events",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "array",
            "format": null
          }
        }
      },
      "HttpRequestV2": {
        "path": "/{connectionId}/v2/httprequest",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "Uri",
            "in": "header",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "Method",
            "in": "header",
            "required": true,
            "type": "string",
            "default": "GET"
          },
          {
            "name": "Body",
            "in": "body",
            "required": false,
            "type": "object",
            "default": null
          },
          {
            "name": "ContentType",
            "in": "header",
            "required": false,
            "type": "string",
            "default": "application/json"
          },
          {
            "name": "CustomHeader1",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader2",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader3",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader4",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader5",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "HttpRequest": {
        "path": "/{connectionId}/httprequest",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "Uri",
            "in": "header",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "Method",
            "in": "header",
            "required": true,
            "type": "string",
            "default": "GET"
          },
          {
            "name": "Body",
            "in": "body",
            "required": false,
            "type": "object",
            "default": null
          },
          {
            "name": "ContentType",
            "in": "header",
            "required": false,
            "type": "string",
            "default": "application/json"
          },
          {
            "name": "CustomHeader1",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader2",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader3",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader4",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "CustomHeader5",
            "in": "header",
            "required": false,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "ListDeletedGroups": {
        "path": "/{connectionId}/v1.0/directory/deletedItems/microsoft.graph.group",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "RestoreDeletedGroup": {
        "path": "/{connectionId}/v1.0/directory/deletedItems/{groupId}/restore",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void",
            "format": null
          }
        }
      },
      "ListDeletedGroupsByOwner": {
        "path": "/{connectionId}/v1.0/directory/deletedItems/getUserOwnedObjects",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "userId",
            "in": "header",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      }
    }
  },
  "test list": {
    "tableId": "0007bdd0-7e76-4e14-abb7-beb0720185b0",
    "version": "",
    "primaryKey": "ID",
    "dataSourceType": "Connector",
    "apis": {}
  }
};
/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * This file is auto-generated. Do not modify it manually.
 * Changes to this file may be overwritten.
 */

export const dataSourcesInfo = {
  "office365users": {
    "tableId": "",
    "version": "",
    "primaryKey": "",
    "dataSourceType": "Connector",
    "apis": {
      "UpdateMyProfile": {
        "path": "/{connectionId}/codeless/v1.0/me",
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
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object",
            "default": null
          }
        ],
        "responseInfo": {
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "MyProfile_V2": {
        "path": "/{connectionId}/codeless/v1.0/me",
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
            "name": "$select",
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
      "UpdateMyPhoto": {
        "path": "/{connectionId}/codeless/v1.0/me/photo/$value",
        "method": "PUT",
        "parameters": [
          {
            "name": "connectionId",
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
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "type": "string",
            "default": "image/jpeg"
          }
        ],
        "responseInfo": {
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "MyTrendingDocuments": {
        "path": "/{connectionId}/codeless/beta/me/insights/trending",
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
            "name": "$filter",
            "in": "query",
            "required": false,
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
      "RelevantPeople": {
        "path": "/{connectionId}/users/{userId}/relevantpeople",
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
            "name": "userId",
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
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "MyProfile": {
        "path": "/{connectionId}/users/me",
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
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "object",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "UserProfile": {
        "path": "/{connectionId}/users/{userId}",
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
            "name": "userId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "object",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "UserPhotoMetadata": {
        "path": "/{connectionId}/users/photo",
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
            "name": "userId",
            "in": "query",
            "required": true,
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
      "UserPhoto": {
        "path": "/{connectionId}/users/photo/value",
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
            "name": "userId",
            "in": "query",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "string",
            "format": "binary"
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "Manager": {
        "path": "/{connectionId}/users/{userId}/manager",
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
            "name": "userId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "object",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "DirectReports": {
        "path": "/{connectionId}/users/{userId}/directReports",
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
            "name": "userId",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "array",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "SearchUser": {
        "path": "/{connectionId}/users",
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
            "name": "searchTerm",
            "in": "query",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "top",
            "in": "query",
            "required": false,
            "type": "integer",
            "default": 0
          }
        ],
        "responseInfo": {
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "array",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "SearchUserV2": {
        "path": "/{connectionId}/v2/users",
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
            "name": "searchTerm",
            "in": "query",
            "required": false,
            "type": "string",
            "default": null
          },
          {
            "name": "top",
            "in": "query",
            "required": false,
            "type": "integer",
            "default": null
          },
          {
            "name": "isSearchTermRequired",
            "in": "query",
            "required": false,
            "type": "boolean",
            "default": true
          },
          {
            "name": "skipToken",
            "in": "query",
            "required": false,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "202": {
            "type": "void",
            "format": null
          },
          "200": {
            "type": "object",
            "format": null
          },
          "400": {
            "type": "void",
            "format": null
          },
          "401": {
            "type": "void",
            "format": null
          },
          "403": {
            "type": "void",
            "format": null
          },
          "500": {
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "TestConnection": {
        "path": "/{connectionId}/testconnection",
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
            "type": "void",
            "format": null
          },
          "default": {
            "type": "void",
            "format": null
          }
        }
      },
      "UserProfile_V2": {
        "path": "/{connectionId}/codeless/v1.0/users/{id}",
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "$select",
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
      "Manager_V2": {
        "path": "/{connectionId}/codeless/v1.0/users/{id}/manager",
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "$select",
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
      "DirectReports_V2": {
        "path": "/{connectionId}/codeless/v1.0/users/{id}/directReports",
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          },
          {
            "name": "$select",
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
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object",
            "format": null
          }
        }
      },
      "UserPhoto_V2": {
        "path": "/{connectionId}/codeless/v1.0/users/{id}/photo/$value",
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "default": null
          }
        ],
        "responseInfo": {
          "200": {
            "type": "string",
            "format": "binary"
          }
        }
      },
      "TrendingDocuments": {
        "path": "/{connectionId}/codeless/beta/users/{id}/insights/trending",
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
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
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
      "HttpRequest": {
        "path": "/{connectionId}/codeless/httprequest",
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
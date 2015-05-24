// TODO cleanup
// this is a port of XML from the ASP.net version

var uiModels=uiModels||{};
uiModels.object = {
    id: 'object',
    icon: "edi_frm.png",
    name: "object",
    namePlural: "objects",
    fnTitle: "Title",
    elements: [
        {
            type: 'panel',
            id: 'pform',
            label: "Object",
            width: 100,
            elements: [
                {
                    label: "Title",
                    help: "example: 'Address book web application'",
                    type: "text",
                    id: "Title",
                    attribute: "Title",
                    maxLength: 100,
                    inMany: true,
                    width: 80,
                    required: true
                },
                {
                    label: "Active",
                    type: "boolean",
                    id: "PUBLISH",
                    attribute: "PUBLISH",
                    inMany: true,
                    width: 20
                },
                {
                    label: "ID",
                    help: "Primary Key in table 'EvoDico_Form'.",
                    type: "text",
                    id: "id",
                    attribute: "id",
                    maxLength: 100,
                    inMany: true,
                    width: 100,
                    readonly: true
                }
            ]
        },
        {
            type: "tab",
            label:'Definition',
            elements: [
                {
                    type: "panel",
                    id: 'p-obj',
                    label: "Object",
                    width: 100,
                    elements: [
                        {
                            label: "Object name",
                            help: "example: 'contact'",
                            type: "text",
                            id: "name",
                            attribute: "name",
                            required: true,
                            maxLength: 50,
                            inMany: true,
                            width: 62
                        },
                        {
                            label: "name (plural)",
                            help: "example: 'contacts'",
                            type: "text",
                            id: "namePlural",
                            attribute: "namePlural",
                            required: true,
                            maxLength: 50,
                            width: 38
                        },
                        {
                            label: "Icon name",
                            type: "text",
                            id: "icon",
                            attribute: "icon",
                            maxLength: "50",
                            width: 62,
                            help: "example='contact.gif'"
                        },
                        {
                            label: "Icon",
                            type: "image",
                            id: "icon",
                            attribute: "icon",
                            width: 38,
                            readonly:true
                        },
                        {
                            label: "Description",
                            type: "textmultiline",
                            id: "Description",
                            attribute: "Description",
                            maxLength: 250,
                            width: 100,
                            height: 7
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label:'Fields',
            elements: [
                {
                    label: "Fields",
                    type: "panel-list",
                    id: "pl-fields",
                    attribute: "obj-fields",
                    width: 100,
                    elements: [
                        {
                            "panelid": "14",
                            label: "Label",
                            type: "text",
                            id: "Label",
                            attribute: "Label",
                            maxLength: 100,
                            listmany:true
                            //"link": "EvoDicoField.aspx?ID=@itemid"
                        },
                        {
                            "panelid": "15",
                            "dbwherelov": "EvoDico_vpanel.formID=@itemid",
                            label: "Panel",
                            type: "lov",
                            id: "panelid",
                            attribute: "panel",
                            "dbtablelov": "EvoDico_vpanel",
                            "dbcolumnreadlov": "label",
                            maxLength: "50",
                            "search": "1",
                            "searchlist": "1",
                            width: "50"
                        },
                        {
                            "panelid": "16",
                            label: "Type",
                            type: "lov",
                            "dbcolumnicon": "Typepix",
                            id: "TypeID",
                            attribute: "Type",
                            "dbtablelov": "EvoDico_vFieldType",
                            maxLength: "100",
                            "search": "1",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: "60",
                            list:uiFieldTypes
                        },
                        {
                            "panelid": "14",
                            label: "Result List",
                            help: "Field shows as header field for lists",
                            "labellist": "List",
                            type: "boolean",
                            id: "searchlist",
                            attribute: "searchlist",
                            "search": "1",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: "50",
                            "img": "checkg.gif"
                        },
                        {
                            "panelid": "14",
                            label: "Search",
                            type: "boolean",
                            id: "search",
                            attribute: "search",
                            "search": "1",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: 100
                        },
                        {
                            "panelid": "14",
                            label: "Position",
                            help: "Integer (gaps OK)",
                            type: "integer",
                            id: "fpos",
                            attribute: "fpos",
                            maxLength: "3",
                            "search": "0",
                            "searchlist": "1",
                            width: 38
                        },
                        {
                            "panelid": "14",
                            label: "Width",
                            help: "Relative width in percentage",
                            type: "integer",
                            "format": "0 '%'",
                            id: "Width",
                            attribute: "Width",
                            maxLength: "3",
                            "search": "0",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: 62
                        },
                        {
                            "panelid": "14",
                            label: "Height",
                            help: "Height in number of lines (for ''Textmultiline'' fields)",
                            type: "integer",
                            id: "Height",
                            attribute: "Height",
                            maxLength: "3",
                            "search": "0",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: 38
                        }
                    ]
                }
            ]
        },
        {
            type: 'tab',
            id: 'tpanels',
            label: "Panels",
            elements: [
                {
                    type: 'panel-list',
                    "id": "p5",
                    attribute: 'obj-panels',
                    label: "Panels",
                    width: 100,
                    "dbtabledetails": "EvoDico_Panel",
                    "dbcolumndetails": "FormID",
                    "dborder": "t.ppos,t.id",
                    elements: [
                        {
                            "panelid": "5",
                            label: "Panel label",
                            type: "text",
                            id: "Label",
                            attribute: "Label",
                            maxLength: "100",
                            "link": "EvoDicoPanel.aspx?ID=@itemid",
                            "search": "1",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: 62
                        },
                        {
                            "panelid": "5",
                            label: "Position",
                            help: "Integer (gaps OK)",
                            type: "integer",
                            id: "ppos",
                            attribute: "ppos",
                            maxLength: "3",
                            "search": "0",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: 38
                        },
                        {
                            "panelid": "5",
                            label: "Width",
                            type: "integer",
                            id: "Width",
                            attribute: "Width",
                            maxLength: "3",
                            "search": "0",
                            "searchlist": "1",
                            "searchadv": "1",
                            width: "31"
                        },
                        {
                            "panelid": "5",
                            label: "CSS Class",
                            "labellist": "CSS",
                            type: "text",
                            id: "cssclass",
                            attribute: "cssclass",
                            maxLength: "100",
                            "searchadv": "1",
                            width: 38
                        }
                    ]
                }
            ]
        },
        {
            type:'tab',
            label: "Database",
            elements:[
                {
                    type:'panel',
                    label: "Database",
                    width: 38,
                    elements: [
                        {
                            label: "DB Table",
                            help: "Driving table",
                            type: "text",
                            id: "dbtable",
                            attribute: "dbtable",
                            maxLength: "100",
                            "search": "1",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "1",
                            required: true
                        },
                        {
                            label: "WHERE clause",
                            help: "Example 'CategoryID=3'",
                            "labellist": "Where",
                            type: "text",
                            id: "dbwhere",
                            attribute: "dbwhere",
                            maxLength: "50",
                            "search": "0",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "1"
                        },
                        {
                            label: "ORDER BY clause",
                            help: "Use 'T' for driving table alias. Example 'T.lastname,T.firstname'",
                            "labellist": "Order",
                            type: "text",
                            id: "dborder",
                            attribute: "dborder",
                            maxLength: "50",
                            "search": "0",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "1"
                        },
                        {
                            label: "Column used as title",
                            help: "Title column",
                            type: "text",
                            id: "dbcolumnlead",
                            attribute: "dbcolumnlead",
                            maxLength: "100",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "1"
                        },
                        {
                            label: "Primary key name",
                            help: "Usually ID",
                            "labellist": "P.Key",
                            type: "text",
                            id: "dbcolumnpk",
                            attribute: "dbcolumnpk",
                            maxLength: "50",
                            "search": "0",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: "50",
                            "height": "1"
                        },
                        {
                            label: "Icon Column",
                            help: "Column used to store the name of a thumnail or icon specific to each record",
                            type: "text",
                            id: "dbColumnicon",
                            attribute: "dbColumnicon",
                            maxLength: "50",
                            "search": "1",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: "50",
                            "height": "1"
                        },
                        {
                            label: "Users table",
                            help: "Table storing users",
                            type: "text",
                            id: "dbtableusers",
                            attribute: "dbtableusers",
                            maxLength: "100",
                            "searchlist": "0",
                            "searchadv": "0",
                            width: "50",
                            "height": "1"
                        },
                        {
                            label: "Comments table",
                            help: "Table storing user comments",
                            type: "text",
                            id: "dbtablecomments",
                            attribute: "dbtablecomments",
                            maxLength: "100",
                            "searchlist": "0",
                            "searchadv": "0",
                            width: "50",
                            "height": "1"
                        }
                    ]
                },
                {
                    type:'panel',
                    label: "Stored Procedures",
                    width: 62,
                    elements: [
                        {
                            label: "Paging",
                            help: "Stored Procedure used for displaying selection lists",
                            "labeledit": "Paging SP",
                            type: "textmultiline",
                            id: "spPaging",
                            attribute: "spPaging",
                            maxLength: "200",
                            "search": "1",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "4"
                        },
                        {
                            label: "Login",
                            help: "Stored Procedure used for user login",
                            type: "textmultiline",
                            "optional": "1",
                            id: "spLogin",
                            attribute: "spLogin",
                            maxLength: "200",
                            "search": "0",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            "height": "2"
                        },
                        {
                            label: "Get",
                            help: "Stored Procedure used to get a single record",
                            type: "textmultiline",
                            id: "spGet",
                            attribute: "spGet",
                            maxLength: 200,
                            "search": "0",
                            "searchlist": "0",
                            "searchadv": "1",
                            width: 100,
                            height: 2
                        },
                        {
                            label: "Delete",
                            help: "Stored Procedure used to delete or disable a record",
                            type: "textmultiline",
                            "optional": "1",
                            id: "spDelete",
                            attribute: "spDelete",
                            maxLength: "200",
                            width: 100,
                            height: 2
                        }
                    ]
                }

            ]
        },
        {
            type: 'tab',
            label: "User Help",
            elements: [
                {
                    type: 'panel',
                    label: "Help",
                    width: 100,
                    elements: [
                        {
                            label: "Help",
                            help: "Help on the field (for edition)",
                            "labeledit": "Help",
                            type: "textmultiline",
                            id: "Help",
                            attribute: "Help",
                            maxLength: "500",
                            width: 100,
                            height: 4
                        }
                    ]
                },
                {
                    type: 'panel-list',
                    width: 100,
                    elements: {
                        id: "fieldsHelp",
                        label: "Fields help",
                        width: 100,
                        elements: [
                            {
                                label: "Label",
                                type: "text",
                                id: "Label",
                                attribute: "Label",
                                "readonly": "2",
                                maxLength: 100,
                                "searchlist": "1",
                                "searchadv": "1",
                                "link": "EvoDicoField.aspx?ID=@itemid"
                            },
                            {
                                label: "Field Help",
                                type: "textmultiline",
                                maxLength: "500",
                                id: "Help",
                                attribute: "Help",
                                "searchlist": "1"
                            }
                        ]
                    }
                }
            ]
        }
    ]
};

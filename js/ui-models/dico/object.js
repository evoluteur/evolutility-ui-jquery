// TODO cleanup
// this is a port of XML from the ASP.net version

var uiFieldTypes=[ // TODO ../dico/pix/
    {id:'text',text:"Text", icon:'ft-txt.gif'},
    {id:'textmultiline',text:"Text multiline", icon:'ft-txtml.gif'},
    {id:'boolean',text:"Boolean", icon:'ft-bool.gif'},
    {id:'decimal',text:"Decimal", icon:'ft-dec.gif'},
    {id:'money',text:"Money", icon:'ft-money.gif'},
    {id:'integer',text:"Integer", icon:'ft-int.gif'},
    {id:'date',text:"Date", icon:'ft-date.gif'},
    {id:'time',text:"Time", icon:'ft-time.gif'},
    {id:'datetime',text:"Date-time", icon:'ft-datehm.gif'},
    {id:'image',text:"Image", icon:'ft-img.gif'},
    {id:'document',text:"Document", icon:'ft-doc.gif'},
    {id:'color',text:"Color", icon:'ft-color.gif'},
    {id:'lov',text:"List (dropdown)", icon:'ft-lov.gif'},
    {id:'list',text:"List (multi-select)", icon:'ft-list.gif'},
    //{id:'html',text:"HTML", icon:'ft-htm.gif'},
    {id:'email',text:"email", icon:'ft-email.gif'},
    {id:'url',text:"Link", icon:'ft-url.gif'},
    {id:'hidden',text:"Hidden", icon:'ft-hidden.gif'}
];


var uiModels=uiModels||{};
uiModels.entity = {
    id: 'entity',
    label: 'Object',
    icon: "cube.gif",
    name: "object",
    namePlural: "objects",
    fnTitle: "title",
    table: 'entity',
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
                    id: "title",
                    attribute: "title",
                    maxLength: 100,
                    inMany: true,
                    width: 52,
                    required: true
                },
                {
                    label: "Id",
                    type: "text",
                    id: "id",
                    attribute: "id",
                    maxLength: 20,
                    inMany: true,
                    width: 18
                },
                {
                    label: "Active",
                    type: "boolean",
                    id: "PUBLISH",
                    attribute: "PUBLISH",
                    inMany: true,
                    width: 20
                }
            ]
        },
        {
            type: "tab",
            label:'Definition',
            elements: [
                {
                    type: "panel",
                    id: 'p-def',
                    label: "Definition",
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
                            id: "description",
                            attribute: "description",
                            maxLength: 250,
                            width: 100,
                            height: 4
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label:'Fields',
            id:'tab-fields',
            elements: [
                {
                    label: "Fields",
                    type: "panel-list",
                    id: "fields",
                    attribute: "fields",
                    width: 100,
                    elements: [
                        {
                            label: "Attribute",
                            type: "text",
                            id: "attribute",
                            attribute: "attribute",
                            maxLength: 100,
                            inMany:true,
                            //"link": "EvoDicoField.aspx?ID=@itemid",
                            required: true
                        },
                        {
                            label: "Label",
                            type: "text",
                            id: "label",
                            attribute: "label",
                            maxLength: 100,
                            inMany:true,
                            required: true
                        },
                        {
                            label: "Type",
                            type: "lov",
                            "dbcolumnicon": "Typepix",
                            id: "type",
                            attribute: "type",
                            width: 60,
                            list:uiFieldTypes
                        },
                        {
                            label: "In List",
                            help: "Field shows as header field for lists",
                            type: "boolean",
                            id: "inMany",
                            attribute: "inMany",
                            width: 50,
                            "img": "checkg.gif"
                        },
                        {
                            "panelid": "14",
                            label: "Required",
                            type: "boolean",
                            id: "required",
                            attribute: "required"
                        },
                        {
                            label: "Max length",
                            help: "Integer (gaps OK)",
                            type: "integer",
                            id: "maxLength",
                            attribute: "maxLength",
                            maxLength: 3,
                            width: 38
                        },
                        {
                            label: "Width",
                            help: "Relative width in percentage",
                            type: "integer",
                            "format": "0 '%'",
                            id: "width",
                            attribute: "width",
                            maxLength: 3,
                            width: 62
                        },
                        {
                            label: "Height",
                            help: "Height in number of lines (for ''Textmultiline'' fields)",
                            type: "integer",
                            id: "height",
                            attribute: "height",
                            maxLength: "3",
                            width: 38
                        }
                    ]
                }
            ]
        }
    ]
};


if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.entity;
}


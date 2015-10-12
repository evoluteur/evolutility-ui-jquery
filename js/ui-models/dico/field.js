function showIfNumber(m, uim){
    return m.get('type')==='integer' || m.get('type')==='decimal'|| m.get('type')==='money';
}

var uiFieldTypes=[
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
    {id:'html',text:"HTML", icon:'ft-htm.gif'},
    {id:'email',text:"email", icon:'ft-email.gif'},
    {id:'url',text:"Link", icon:'ft-url.gif'},
    {id:'hidden',text:"Hidden", icon:'ft-hidden.gif'}
];

var uiModels=uiModels||{};
uiModels.field = {
    id:'field',
    table:'field',
    icon: "edi_fld.png",
    name: "field",
    namePlural: "fields",
    fnTitle: 'label',
    elements: [
        {
            type: "panel",
            label: "Definition",
            width: 62,
            elements: [
                {
                    id:'label',
                    attribute:'label',
                    label: "Label",
                    type: "text",
                    help: "Field title for the user",
                    maxLength: 100,
                    required: true,
                    inMany: true,
                    width: 62
                },
                {
                    id: 'type',
                    attribute: 'type',
                    label: "Type",
                    help: "Type of field: UI type rather than data type.",
                    type: "lov",
                    list:uiFieldTypes,
                    maxLength: 100,
                    required: true,
                    inMany: true,
                    width: 38
                },
                {
                    id: "attribute",
                    attribute: 'attribute',
                    label: "Attribute",
                    help: "Attribute name in the Backbone model",
                    required: true,
                    type: "text",
                    maxLength: 100,
                    width: 62
                },
                {
                    id: 'eid',
                    attribute: 'eid',
                    label: "ID",
                    type: "text",
                    help: 'Field ID in the DOM = prefix + ID',
                    maxLength: 100,
                    width: 38
                },
                {
                    id:'format',
                    attribute:'attribute',
                    label: "Format",
                    type: "text",
                    help: "example '$ 0.00'",
                    maxLength: 30,
                    width: 100
                }
            ]
        },
        {
            type: "panel",
            label: "Layout",
            width: 38,
            elements: [
                {
                    id:'position',
                    attribute:'position',
                    label: "Position",
                    help: "Integer (do not have to be consecutive)",
                    type: "integer",
                    maxLength: 3,
                    width: 62
                },
                {
                    id:'inMany',
                    attribute:'inMany',
                    label: "List",
                    help: "Field shows in lists",
                    type: "boolean",
                    inMany: true,
                    width: 38
                },
                {
                    id:'width',
                    attribute:'width',
                    label: "Width",
                    defaultValue: 100,
                    help: "Relative width of the field (in percentage)",
                    type: "integer",
                    format: "0 '%'",
                    maxLength: 3,
                    width: 62
                },
                {
                    id:'height',
                    attribute:'height',
                    label: "Height",
                    help: 'Height in number of lines (for "Textmultiline" fields)',
                    type: "integer",
                    maxLength: 3,
                    defaultValue: 1,
                    max:30,
                    width: 38
                },
                {
                    id: 'css',
                    attribute: 'css',
                    label: "CSS",
                    help: "Stylesheet class name for the field for the edit view.",
                    type: "text",
                    maxLength: 20,
                    width: 100
                }
            ]
        },
        {
            type: "panel",
            label: "Validation",
            width: 62,
            elements: [
                {
                    id:'required',
                    attribute:'required',
                    label: "Required",
                    //defaultValue: false,
                    help: "Mandatory field",
                    type: "boolean",
                    inMany: true,
                    width: 50,
                    img: "checkr.gif"
                },
                {
                    id:'readonly',
                    attribute:'readonly',
                    label: "Read only",
                    defaultValue:false,
                    help: "Users can view this field value but cannot modify it",
                    type: "boolean",
                    width: 50,
                    img: "checkr.gif"
                },
                {
                    id:'minLength',
                    attribute:'minLength',
                    label: "Min. length",
                    help: "Minimum number of characters required",
                    type: "integer",
                    width: 50
                },
                {
                    id:'maxLength',
                    attribute:'maxLength',
                    label: "Max. length",
                    help: "Maximum number of characters allowed",
                    type: "integer",
                    maxLength: 7,
                    width: 50
                },
                {
                    id:'minvalue',
                    attribute:'minvalue',
                    label: "Min. value",
                    help: "Minimum value allowed for the field",
                    /*conditions: [{
                        'visible': showIfNumber
                     }],*/
                    labelList: "Min.",
                    type: "integer",
                    maxLength: 4,
                    width: 50
                },
                {
                    id:'maxvalue',
                    attribute:'maxvalue',
                    label: "Max. value",
                    help: "Maximum value allowed for the field",
                    /*conditions: [{
                        'visible': showIfNumber
                    }],*/
                    labelList: "Max.",
                    type: "integer",
                    maxLength: 4,
                    width: 50
                },
                {
                    id:'regExp',
                    attribute:'regExp',
                    label: "Regular Expression",
                    labelList: "RegExp",
                    type: "text",
                    maxLength: 100,
                    width: 50,
                    help: 'Regular expression used to validate the field value.'
                },
                {
                    id:'fnValidate',
                    attribute:'fnValidate',
                    label: "Custom Validation Method",
                    type: "text",
                    maxLength: 100,
                    width: 50,
                    help: 'Name of Javascript function for validating the data.'
                }
            ]
        },
        {
            type: "panel",
            id: 'p-help',
            label: "Field Help",
            width: 38,
            elements: [
                {
                    id: 'help',
                    attribute: 'help',
                    label: "Help",
                    help: "Help on the field for edition",
                    type: "textmultiline",
                    maxLength: 500,
                    width: 100,
                    height: 8
                }
            ]
        }
    ]
};

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.field;
}

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
    //{id:'html',text:"HTML", icon:'ft-htm.gif'},
    {id:'email',text:"email", icon:'ft-email.gif'},
    {id:'url',text:"Link", icon:'ft-url.gif'},
    {id:'hidden',text:"Hidden", icon:'ft-hidden.gif'}
];

var uiModels=uiModels||{};
uiModels.field = {
    id:'field',
    icon: "edi_fld.png",
    entity: "field",
    entities: "fields",
    leadfield: 'label',
    elements: [
        {
            type: "panel",
            label: "Definition",
            width: 62,
            elements: [
                {
                    id:'label',
                    label: "Label",
                    type: "text",
                    help: "Field title for the user",
                    maxlength: 100,
                    required: true,
                    viewmany: true,
                    width: 62
                },
                {
                    id: 'type',
                    label: "Type",
                    help: "Type of field: UI type rather than data type.",
                    type: "lov",
                    list:uiFieldTypes,
                    maxlength: 100,
                    required: true,
                    viewmany: true,
                    width: 38
                },
                {
                    id: "attribute",
                    label: "Attribute",
                    help: "Attribute name in the Backbone model",
                    required: true,
                    type: "text",
                    maxlength: 100,
                    width: 62
                },
                {
                    id: 'colpix',
                    label: "ID",
                    labellist: "ID",
                    type: "text",
                    help: 'Field ID in the DOM = prefix + ID',
                    maxlength: 100,
                    width: 38
                },
                {
                    id:'format',
                    label: "Format",
                    type: "text",
                    help: "example '$ 0.00'",
                    maxlength: 30,
                    width: 62
                },
                {
                    id: 'css',
                    label: "CSS",
                    labellist: "CSS Edit",
                    help: "Stylesheet class name for the field for the edit view.",
                    type: "text",
                    maxlength: 20,
                    width: 38
                }
            ]
        },
        {
            type: "panel",
            label: "Validation",
            width: 38,
            elements: [
                {
                    id:'required',
                    label: "Required",
                    //defaultvalue: false,
                    help: "Mandatory field",
                    type: "boolean",
                    viewmany: true,
                    width: 50,
                    img: "checkr.gif"
                },
                {
                    id:'readonly',
                    label: "Read only",
                    defaultvalue:false,
                    help: "Users can view this field value but cannot modify it",
                    type: "boolean",
                    width: 50,
                    img: "checkr.gif"
                },
                {
                    id:'minlength',
                    label: "Min. length",
                    help: "Minimum number of characters required",
                    type: "integer",
                    width: 50
                },
                {
                    id:'maxlength',
                    label: "Max. length",
                    help: "Maximum number of characters allowed",
                    type: "integer",
                    maxlength: 7,
                    width: 50
                },
                {
                    id:'minvalue',
                    label: "Min. value",
                    help: "Minimum value allowed for the field",
                    /*conditions: [{
                        'visible': showIfNumber
                     }],*/
                    labellist: "Min.",
                    type: "integer",
                    maxlength: 4,
                    width: 50
                },
                {
                    id:'maxvalue',
                    label: "Max. value",
                    help: "Maximum value allowed for the field",
                    /*conditions: [{
                        'visible': showIfNumber
                    }],*/
                    labellist: "Max.",
                    type: "integer",
                    maxlength: 4,
                    width: 50
                }/*,
                {
                    id:'regex',
                    label: "Regular Expression",
                    labellist: "RegExp",
                    type: "integer",
                    maxlength: 100,
                    width: 100,
                    help: 'Regular expression used to validate the field value.'
                }*/
            ]
        },
        {
            type: "panel",
            label: "Layout",
            width: 62,
            elements: [
                {
                    id:'position',
                    label: "Position",
                    help: "Integer (do not have to be consecutive)",
                    type: "integer",
                    maxlength: 3,
                    width: 62
                },
                {
                    id:'viewmany',
                    label: "List",
                    help: "Field shows in lists",
                    labellist: "List",
                    type: "boolean",
                    viewmany: true,
                    width: 38
                },
                {
                    id:'height',
                    attribute:'height',
                    label: "Height",
                    help: "Height in number of lines (for ''Textmultiline'' fields)",
                    type: "integer",
                    maxlength: 3,
                    defaultvalue: 1,
                    max:30,
                    width: 62
                },
                {
                    id:'width',
                    label: "Width",
                    defaultvalue: 100,
                    help: "Relative width of the field (in percentage)",
                    type: "integer",
                    format: "0 '%'",
                    maxlength: 3,
                    width: 38
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
                    label: "Help",
                    help: "Help on the field for edition",
                    type: "textmultiline",
                    maxlength: 500,
                    width: 100,
                    height: 4
                }
            ]
        }
    ]
};

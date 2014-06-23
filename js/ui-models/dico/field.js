function showIfNumber(m, uim){
    return m.get('type')==='integer' || m.get('type')==='decimal'|| m.get('type')==='money';
}

var dico_field_ui = {
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
                    cssclass: "FieldMain",
                    cssclassview: "FieldMain",
                    help: "Field title for the user",
                    maxlength: 100,
                    required: true,
                    viewmany: true,
                    width: 62
                },
                {
                    id: 'type',
                    label: "Type",
                    help: "User Type for the field on screen. Text, or emails can be char, varchar or nvarchar...",
                    type: "lov",
                    list:[
                        {id:'text',text:"text", icon:'ft-txt.gif'},
                        {id:'textmultiline',text:"textmultiline", icon:'ft-txtml.gif'},
                        {id:'boolean',text:"boolean", icon:'ft-bool.gif'},
                        {id:'decimal',text:"decimal", icon:'ft-dec.gif'},
                        {id:'money',text:"money", icon:'ft-money.gif'},
                        {id:'integer',text:"integer", icon:'ft-int.gif'},
                        {id:'date',text:"date", icon:'ft-date.gif'},
                        {id:'time',text:"time", icon:'ft-time.gif'},
                        {id:'datetime',text:"datetime", icon:'ft-datehm.gif'},
                        {id:'image',text:"image", icon:'ft-img.gif'},
                        {id:'document',text:"document", icon:'ft-doc.gif'},
                        {id:'color',text:"color", icon:'ft-color.gif'},
                        {id:'lov',text:"lov", icon:'ft-lov.gif'},
                        {id:'formula',text:"formula", icon:'ft-.gif'},
                        {id:'html',text:"html", icon:'ft-htm.gif'},
                        {id:'email',text:"email", icon:'ft-email.gif'},
                        {id:'url',text:"url", icon:'ft-url.gif'}
                    ],
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
                    help: 'Field ID in UI = prefix + ID',
                    maxlength: 100,
                    width: 38
                }
            ]
        },
        {
            type: "panel",
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
                    height: 5
                }
            ]
        },
        {
            type: "panel",
            label: "Display",
            width: 31,
            elements: [
                {
                    id:'format',
                    label: "Format",
                    type: "text",
                    help: "example '$ 0.00'",
                    maxlength: 30,
                    width: 100
                },
                {
                    id: 'css',
                    label: "CSS Field Edit",
                    labellist: "CSS Edit",
                    help: "Stylesheet class name for the field in edit mode.",
                    type: "text",
                    maxlength: 20,
                    width: 100
                },
                {
                    id:'viewmany',
                    label: "List",
                    help: "Field shows in lists",
                    labellist: "List",
                    type: "boolean",
                    viewmany: true,
                    width: 100
                }
            ]
        },
        {
            type: "panel",
            label: "Layout",
            width: 31,
            elements: [
                {
                    id:'position',
                    label: "Position",
                    help: "Integer (do not have to be consecutive)",
                    type: "integer",
                    maxlength: 3,
                    width: 100
                },
                {
                    id:'height',
                    label: "Height",
                    help: "Height in number of lines (for ''Textmultiline'' fields)",
                    type: "integer",
                    maxlength: 3,
                    defaultvalue: 1,
                    max:30,
                    width: 100
                },
                {
                    id:'width',
                    label: "Width",
                    defaultvalue: 100,
                    help: "Relative width of the field (in percentage)",
                    type: "integer",
                    format: "0 '%'",
                    maxlength: 3,
                    width: 100
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
                    defaultvalue: false,
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
                    label: "Minimum value",
                    conditions: [{
                        'visible': showIfNumber
                    }],
                    labellist: "Min.",
                    type: "integer",
                    maxlength: 4,
                    width: 50
                },
                {
                    id:'maxvalue',
                    label: "Maximum value",
                    help: "Maximum value allowed for the field",
                    conditions: [{
                        'visible': showIfNumber
                    }],
                    labellist: "Max.",
                    type: "integer",
                    maxlength: 4,
                    width: 50
                }
            ]
        }
    ]
};

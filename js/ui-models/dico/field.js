var dico_field_ui = {
    icon: "edi_fld.png",
    entity: "field",
    entities: "fields",
    elements: [
        {
            type: "panel",
            label: "Field",
            width: 100,
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
                    width: 100
                }
            ]
        },
        {
            type: "tab",
            label: "Definition",
            elements: [
                {
                    type: "panel",
                    label: "Validation",
                    width: 100,
                    elements: [
                        {
                            id: 'type',
                            label: "Type",
                            help: "User Type for the field on screen. Text, or emails can be char, varchar or nvarchar...",
                            type: "lov",
                            list:[
                                {id:'text',text:"text", icon:'pix/ft-txt.gif'},
                                {id:'textmultiline',text:"textmultiline", icon:'pix/ft-txtml.gif'},
                                {id:'boolean',text:"boolean", icon:'pix/ft-bool.gif'},
                                {id:'decimal',text:"decimal", icon:'pix/ft-dec.gif'},
                                {id:'money',text:"money", icon:'pix/ft-money.gif'},
                                {id:'integer',text:"integer", icon:'pix/ft-int.gif'},
                                {id:'date',text:"date", icon:'pix/ft-date.gif'},
                                {id:'time',text:"time", icon:'pix/ft-time.gif'},
                                {id:'datetime',text:"datetime", icon:'pix/ft-datehm.gif'},
                                {id:'image',text:"image", icon:'pix/ft-img.gif'},
                                {id:'document',text:"document", icon:'pix/ft-doc.gif'},
                                {id:'color',text:"color", icon:'pix/ft-color.gif'},
                                {id:'lov',text:"lov", icon:'pix/ft-lov.gif'},
                                {id:'formula',text:"formula", icon:'pix/ft-.gif'},
                                {id:'html',text:"html", icon:'pix/ft-htm.gif'},
                                {id:'email',text:"email", icon:'pix/ft-email.gif'},
                                {id:'url',text:"url", icon:'pix/ft-url.gif'}
                            ],
                            maxlength: 100,
                            required: true,
                            viewmany: true,
                            width: 62
                        },
                        {
                            id:'required',
                            label: "Required",
                            defaultvalue: false,
                            help: "Mandatory field",
                            type: "boolean",
                            maxlength: 100,
                            viewmany: true,
                            width: 38,
                            img: "checkr.gif"
                        },
                        {
                            id:'maxlength',
                            label: "Max. length",
                            help: "Maximum number of characters allowed",
                            type: "integer",
                            maxlength: 100,
                            width: 62
                        },
                        {
                            id:'readonly',
                            label: "Read only",
                            defaultvalue:false,
                            help: "Users can view this field value but cannot modify it",
                            type: "boolean",
                            maxlength: 100,
                            width: 38,
                            img: "checkr.gif"
                        },
                        {
                            id:'maxvalue',
                            label: "Maximum value",
                            conditions: [{
                                'visible': function(m,uim){
                                    return m.get('type')==='integer' || m.get('type')==='decimal';
                                }
                            }],
                            labellist: "Max.",
                            type: "integer",
                            maxlength: 4,
                            width: 62
                        },
                        {
                            id:'minvalue',
                            label: "Minimum value",
                        conditions: [{
                                'visible': function(m,uim){
                                    return m.get('type')==='integer' || m.get('type')==='decimal';
                                }
                            }],
                            labellist: "Min.",
                            type: "integer",
                            maxlength: 4,
                            width: 38
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "Display",
            elements: [
                {
                    type: "panel",
                    label: "Display",
                    width: 100,
                    elements: [
                        {
                            id:'position',
                            label: "Position",
                            help: "Integer (do not have to be consecutive)",
                            type: "integer",
                            maxlength: 3,
                            width: 38
                        },
                        {
                            id:'height',
                            label: "Height",
                            help: "Height in number of lines (for ''Textmultiline'' fields)",
                            type: "integer",
                            maxlength: 3,
                            defaultvalue: 1,
                            max:30,
                            width: 32
                        },
                        {
                            id:'width',
                            label: "Width",
                            defaultvalue: 100,
                            help: "Relative width of the field (in percentage)",
                            type: "integer",
                            format: "0 '%'",
                            maxlength: 3,
                            width: 30
                        },
                        {
                            id:'format',
                            label: "Format",
                            type: "text",
                            help: "example '$ 0.00'",
                            maxlength: "30",
                            width: "38"
                        },
                        {
                            id: 'css',
                            label: "CSS Field Edit",
                            labellist: "CSS Edit",
                            help: "Stylesheet class name for the field in edit mode.",
                            type: "text",
                            maxlength: 20,
                            width: 32
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
                }
            ]
        },
        {
            type: "tab",
            id: 'tab-model',
            label: "Model",
            elements: [
                {
                    type: "panel",
                    id: 'map',
                    optional: "1",
                    label: "Model",
                    width: 100,
                    elements: [
                        {
                            id: "attribute",
                            label: "Attribute",
                            help: "Attribute name in the Backbone model",
                            required: true,
                            type: "text",
                            maxlength: 100,
                            width: 100
                        },
                        {
                            id: 'colpix',
                            label: "UI name",
                            type: "text",
                            maxlength: 100,
                            width: 100
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "User Help",
            elements: [
                {
                    type: "panel",
                    label: "Field Help",
                    width: 100,
                    elements: [
                        { etype: 'field',
                            id: 'help',
                            label: "Help",
                            help: "Help on the field for edition",
                            type: "textmultiline",
                            maxlength: 500,
                            width: 100,
                            height: 8
                        }
                    ]
                }
            ]
        }
    ]
};

var dico_field_ui = {
    icon: "evodico/edi_fld.png",
    entity: "property",
    entities: "properties",
    elements: [
        {
            type: "panel",
            label: "Field",
            width: "100",
            elements: [
                { etype: 'field',
                    id:'label',
                    label: "Label",
                    type: "text",
                    cssclass: "FieldMain",
                    cssclassview: "FieldMain",
                    help: "Field title for the user",
                    maxlength: "100",
                    required: "1",
                    search: "1",
                    searchlist: "1",
                    width: "100"
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
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: 'type',
                            label: "Type",
                            help: "User Type for the field on screen. Text, or emails can be char, varchar or nvarchar...",
                            type: "lov",
                            list:[
                                {id:'text',label:"text", icon:'pix/evodico/ft-txt.gif'},
                                {id:'txtm',label:"textmultiline", icon:'pix/evodico/ft-txtml.gif'},
                                {id:'bool',label:"boolean", icon:'pix/evodico/ft-bool.gif'},
                                {id:'dec',label:"decimal", icon:'pix/evodico/ft-dec.gif'},
                                {id:'integer',label:"integer", icon:'pix/evodico/ft-int.gif'},
                                {id:'date',label:"date", icon:'pix/evodico/ft-date.gif'},
                                {id:'time',label:"time", icon:'pix/evodico/ft-time.gif'},
                                {id:'datetime',label:"datetime", icon:'pix/evodico/ft-datehm.gif'},
                                {id:'pix',label:"image", icon:'pix/evodico/ft-img.gif'},
                                // {id:'doc',label:"document", icon:'pix/evodico/ft-doc.gif'},
                                // {id:'color',label:"color"}
                                {id:'lov',label:"lov", icon:'pix/evodico/ft-lov.gif'},
                                // {id:'formula',label:"formula", icon:'pix/evodico/ft-.gif'},
                                // {id:'html',label:"html", icon:'pix/evodico/ft-htm.gif'},
                                {id:'email',label:"email", icon:'pix/evodico/ft-email.gif'},
                                {id:'url',label:"url", icon:'pix/evodico/ft-url.gif'}
                            ],
                            maxlength: "100",
                            required: "1",
                            search: "1",
                            searchlist: "1",
                            width: "62"
                        },
                        { etype: 'field',
                            id:'req',
                            label: "Required",
                            default: false,
                            help: "Mandatory field",
                            type: "boolean",
                            maxlength: "100",
                            search: "1",
                            searchlist:'1',
                            width: "38",
                            img: "checkr.gif"
                        },
                        { etype: 'field',
                            id:'max',
                            label: "Max. length",
                            help: "Maximum number of characters allowed",
                            type: "integer",
                            maxlength: "100",
                            width: "62"
                        },
                        { etype: 'field',
                            id:'readonly',
                            label: "Read only",
                            default:false,
                            help: "Users can view this field value but cannot modify it",
                            type: "boolean",
                            maxlength: "100",
                            search: "1",
                            width: "38",
                            img: "checkr.gif"
                        },
                        { etype: 'field',
                            id:'maxval',
                            label: "Maximum value",
                            conditions: [{
                                'visible': function(m,uim){
                                    return m.get('')
                                }
                            }],
                            labellist: "Max.",
                            type: "integer",
                            maxlength: "4",
                            width: "62",
                            height: "1"
                        },
                        { etype: 'field',
                            id:'minval',
                            label: "Minimum value",
                            labellist: "Min.",
                            type: "integer",
                            maxlength: "4",
                            width: "38",
                            height: "1"
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
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id:'pos',
                            label: "Position",
                            help: "Integer (gaps OK)",
                            type: "integer",
                            maxlength: "3",
                            width: "38"
                        },
                        { etype: 'field',
                            id:'height',
                            label: "Height",
                            help: "Height in number of lines (for ''Textmultiline'' fields)",
                            type: "integer",
                            maxlength: "3",
                            width: "32"
                        },
                        { etype: 'field',
                            id:'width',
                            label: "Width",
                            default: 100,
                            help: "Relative width of the field (in percentage)",
                            type: "integer",
                            format: "0 '%'",
                            maxlength: "3",
                            width: "30"
                        },
                        { etype: 'field',
                            id:'format',
                            label: "Format",
                            type: "text",
                            help: "example '$ 0.00'",
                            maxlength: "30",
                            width: "38"
                        },
                        { etype: 'field',
                            id: 'css',
                            label: "CSS Field Edit",
                            labellist: "CSS Edit",
                            help: "Stylesheet class name for the field in edit mode.",
                            type: "text",
                            maxlength: "20",
                            search: "1",
                            width: "32"
                        },
                        { etype: 'field',
                            id:'searchlist',
                            label: "Result List",
                            help: "Field shows as header field for lists",
                            labellist: "List",
                            type: "boolean",
                            search: "1",
                            searchlist: "1",
                            width: "100"
                        },
                        { etype: 'field',
                            id:'search',
                            label: "Search",
                            default:true,
                            help: "Field shows in the search form",
                            type: "boolean",
                            search: "1",
                            searchlist: "1",
                            width: "38"
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
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: "attribute",
                            label: "Attribute",
                            help: "Attribute name",
                            required: "1",
                            type: "text",
                            maxlength: "100",
                            search: "1",
                            width: "100"
                        },
                        { etype: 'field',
                            id: 'colpix',
                            label: "UI name",
                            help: "",
                            required: "",
                            type: "text",
                            maxlength: "100",
                            width: "100"
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
                    optional: "1",
                    label: "Field Help",
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: 'help',
                            label: "Help",
                            help: "Help on the field for edition",
                            type: "textmultiline",
                            maxlength: "500",
                            width: "100",
                            height: "8"
                        }
                    ]
                }
            ]
        }
    ]
};

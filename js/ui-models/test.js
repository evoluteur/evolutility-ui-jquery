var test_ui = {
    entity: "test",
    entities: "tests",
    title: "Test Object",
    elements: [
        {
            type: "panel",
            eindex: "1",
            label: "Panel 1",
            width: "100",
            elements: [
                {
                    id:'name',
                    type: "text",
                    label: "Text field",
                    required: "1",
                    maxlength: "150",
                    search: "1",
                    searchlist: "1",
                    width: "62"
                },
                {
                    id:'name2',
                    type: "text",
                    label: "Text (readonly)",
                    readonly: "1",
                    search: "1",
                    searchlist: "1",
                    width: "38"
                },
            ]
        },
        {
            type: "tab",
            label: "General",
            elements: [
                {
                    type: "panel",
                    eindex: "1",
                    label: "Date",
                    width: "33",
                    elements: [
                        {
                            type: "date",
                            id:'fd1',
                            label: "Date 1",
                            required: "1",
                            width: "100"
                        },
                        {
                            type: "date",
                            id:'fd2',
                            label: "Date 2",
                            width: "100"
                        },
                        {
                            type: "datetime",
                            id:'fdt',
                            label: "DateTime field",
                            maxlength: "100",
                            required: "1",
                            width: "100"
                        },
                        {
                            type: "time",
                            id:'ft',
                            label: "Time field",
                            maxlength: "100",
                            required: "1",
                            width: "100"
                        }

                    ]
                },
                {
                    type: "panel",
                    eindex: "1",
                    label: "LOVs",
                    width: "33",
                    elements: [
                        {
                            type: "lov",
                            id:'bsize',
                            label: "Bottle Size (LOV)",
                            labellist: "Bottle",
                            required: "1",
                            width: "100",
                            list:[
                                {id:750, label:'750 ml'},
                                {id:500, label:'500 ml'},
                                {id:375, label:'375 cl'},
                                {id:1500, label:'1.5 L'},
                                {id:3000, label:'3.0 L'},
                                {id:6000, label:'6.0 L'},
                                {id:8000, label:'8.0 L'}
                            ]
                        },
                        {
                            type: "lov",
                            id:'bsize2',
                            label: "Bottle Size again",
                            labellist: "Bottle",
                            width: "100",
                            list:[
                                {id:750, label:'750 ml'},
                                {id:500, label:'500 ml'},
                                {id:375, label:'375 cl'},
                                {id:1500, label:'1.5 L'},
                                {id:3000, label:'3.0 L'},
                                {id:6000, label:'6.0 L'},
                                {id:8000, label:'8.0 L'}
                            ]
                        },
                        {
                            type: "lov",
                            id:'grape',
                            label: "Grape (big LOV)",
                            search: "1",
                            searchlist: "1",
                            width: "100",
                            list:[
                                {label:'Chardonnay'},
                                {label:'Shiraz'},
                                {label:'Merlot'},
                                {label:'Pinot Noir'},
                                {label:'Cabernet'},
                                {label:'Zinfandel'},
                                {label:'Sauvignon'},
                                {label:'Cabernet Sauvignon'},
                                {label:'Aligoté'},
                                {label:'Alvarinho'},
                                {label:'Blanc Fumé'},
                                {label:'Bual'},
                                {label:'Carignan'},
                                {label:'Chasselas'},
                                {label:'Chemin Blanc'},
                                {label:'Cinsault'},
                                {label:'Clairette'},
                                {label:'Colombard'},
                                {label:'Counoise'},
                                {label:'Fendant'},
                                {label:'Folle Blanche'},
                                {label:'Fürmint'},
                                {label:'Gamay'},
                                {label:'Gewürztraminer'},
                                {label:'Grauburgunder'},
                                {label:'Grechetto'},
                                {label:'Grenache Blanc'},
                                {label:'Grenache Noir'},
                                {label:'Gros Plan'},
                                {label:'Grüner Veltliner'},
                                {label:'Italienischer Riestling'},
                                {label:'Kadarka'},
                                {label:'Kerner'},
                                {label:'Macabeo'},
                                {label:'Malmsey'},
                                {label:'Malvasier'},
                                {label:'Marsanne'},
                                {label:'Melon de Bourgogne'},
                                {label:'Mourvèdre'},
                                {label:'Müller-Thurgau'},
                                {label:'Muscadelle'},
                                {label:'Muscadet'},
                                {label:'Musca'},
                                {label:'Musca d\'Alsace'},
                                {label:'Muskateller'},
                                {label:'Nebbiolo'},
                                {label:'Palomino'},
                                {label:'Pedro Ximérez'},
                                {label:'Petit Verdot'},
                                {label:'Pinot Blanc'},
                                {label:'Pinot Gris'},
                                {label:'Pinot Noir'},
                                {label:'Pinotage'},
                                {label:'Riesling'},
                                {label:'Ruländer'},
                                {label:'Sangiovese'},
                                {label:'Sauvignon Blanc'},
                                {label:'Scheurebe'},
                                {label:'Sémilion'},
                                {label:'Sercial'},
                                {label:'Seyval Blanc'},
                                {label:'Siegerrebe'},
                                {label:'Silvaner'},
                                {label:'Spätburgunder'},
                                {label:'Steen'},
                                {label:'Syrah'},
                                {label:'Tempranillo'},
                                {label:'Tokay'},
                                {label:'Traminer'},
                                {label:'Trebbiano'},
                                {label:'Ugni Blanc'},
                                {label:'Verdejo'},
                                {label:'Verdelho'},
                                {label:'Vermentino'},
                                {label:'Vernaccia'},
                                {label:'Viognier'},
                                {label:'Viura'},
                                {label:'Weißburgunder'}
                            ]
                        }

                    ]
                },
                {
                    type: "panel",
                    label: "An Image",
                    width: "34",
                    elements: [
                        {
                            type: "image",
                            label: "",
                            labeledit: "",
                            labellist: "Label",
                            maxlength: "200",
                            width: "100",
                            searchlist: "1"
                        }

                    ]
                }

            ]
        },
        {
            type: "tab",
            label: "Numbers",
            elements: [
                {
                    type: "panel",
                    eindex: "1",
                    label: "Integers",
                    width: "33",
                    elements: [
                        {
                            type: "integer",
                            id:'int1',
                            label: "Integer (min=0 max=10)",
                            required: "1",
                            maxlength: "10",
                            min: 0,
                            max: 10,
                            width: "100"
                        },
                        {
                            type: "integer",
                            id:'int2',
                            label: "Integer 2",
                            maxlength: "10",
                            width: "100"
                        }
                    ]
                },
                {
                    type: "panel",
                    eindex: "1",
                    label: "Decimals",
                    width: "33",
                    elements: [
                        {
                            type: "decimal",
                            id:'dec1',
                            label: "Decimal 1",
                            required: "1",
                            maxlength: "10",
                            search: "1",
                            width: "100",
                            format: "$ 0.00"
                        },
                        {
                            type: "decimal",
                            id:'dec2',
                            label: "Decimal 2",
                            maxlength: "10",
                            search: "1",
                            searchlist: "1",
                            width: "100",
                            format: "$ 0.00"
                        }
                    ]
                },
                {
                    type: "panel",
                    eindex: "1",
                    label: "Colors",
                    width: "33",
                    elements: [
                        {
                            type: "color",
                            id:'color1',
                            label: "Color",
                            required: true,
                            width: "50"
                        },
                        {
                            type: "color",
                            id:'color2',
                            label: "Color 2",
                            width: "50"
                        },
                        {
                            type: "color",
                            id:'color3',
                            label: "Color 3",
                            width: "50"
                        },
                        {
                            type: "color",
                            id:'color4',
                            label: "Color 4",
                            width: "50"
                        }
                    ]
                }

            ]
        },
        {
            type: "tab",
            label: "Notes",
            elements: [
                {
                    type: "panel",
                    id: "bigtxt1",
                    label: "Comments",
                    width: "100",
                    elements: [
                        {
                            type: "textmultiline",
                            label: "Comments",
                            maxlength: "300",
                            width: "100",
                            height: "8"
                        }

                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "Collection",
            elements: [
                { type: 'panel-list',
                    label: "Collection",
                    width: "100",
                    dbtabledetails: "WineDegustation",
                    dbcolumndetails: "wineid",
                    panelid: "1",
                    dborder: "ddate desc",
                    elements: [
                        {type: "text", panelid: "1", label: "Robe", maxlength: "100", dbcolumn: "Robe", dbcolumnread: "Robe", searchlist: "1"},
                        {type: "date", panelid: "1", dbcolumn: "ddate", dbcolumnread: "ddate", label: "Date", maxlength: "20", searchlist: "1"},
                        {type: "text", panelid: "1", label: "Nose", maxlength: "100", dbcolumn: "Nose", dbcolumnread: "Nose", searchlist: "1"},
                        {type: "text", panelid: "1", label: "Taste", maxlength: "100", dbcolumn: "Taste", dbcolumnread: "Taste", searchlist: "1"},
                        {type: "textmultiline", panelid: "1", dbcolumn: "notes", dbcolumnread: "notes", label: "Note", maxlength: "300", searchlist: "1", width: "100", height: "4"}
                    ]
                }
            ]
        }
    ]
}


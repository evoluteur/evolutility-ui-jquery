var wineCellar_lovs = {
    bottleSize: [
        {id:750, label:'750 ml'},
        {id:500, label:'500 ml'},
        {id:375, label:'375 cl'},
        {id:1500, label:'1.5 L'},
        {id:3000, label:'3.0 L'},
        {id:6000, label:'6.0 L'},
        {id:8000, label:'8.0 L'}
    ],
    grape: [
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
    ],

    type: [
        {label: 'Red', icon:'winered.gif'},
        {label: 'White', icon:'winewhite.gif'},
        {label:'Sweet', icon:'winesweet.gif'},
        {label:'Sparkling', icon:'winespark.gif'},
        {label:'Rose', icon:'winerose.gif'}
    ],

    country: [
        {label:'Argentina'},
        {label:'Austria'},
        {label:'Bulgaria'},
        {label:'Canada'},
        {label:'Chile'},
        {label:'Cyprus'},
        {label:'France'},
        {label:'Germany'},
        {label:'Greece'},
        {label:'Hungary'},
        {label:'Italy'},
        {label:'Luxembourg'},
        {label:'New Zealand'},
        {label:'Portugal'},
        {label:'South Africa'},
        {label:'Spain'},
        {label:'Switzerland'},
        {label:'United States'}
    ]
}

var wineCellar_ui = {
    entity: "wine",
    entities: "wines",
    label: "Wine Cellar",
    elements: [
        {
            type: "panel",
            eindex: "1",
            label: "Wine",
            width: "100",
            elements: [
                {
                    id:'name',
                    type: "text",
                    label: "Name",
                    required: "1",
                    maxlength: "150",
                    search: "1",
                    searchlist: "1",
                    width: "62"
                },
                {
                    id:'vin',
                    type: "integer",
                    label: "Vintage",
                    required: "1",
                    maxlength: "100",
                    search: "1",
                    searchlist: "1",
                    width: "38",
                    min: "1900",
                    max: "2012"
                }

            ]
        },
        {
            type: "tab",
            label: "General",
            elements: [
                {
                    type: "panel",
                    eindex: "1",
                    label: "Wine",
                    width: "80",
                    elements: [
                        {
                            type: "text",
                            id:'winery',
                            label: "Winery",
                            maxlength: "100",
                            required: "1",
                            search: "1",
                            searchlist: "1",
                            width: "62"
                        },
                        {
                            type: "lov",
                            id:'bsize',
                            label: "Bottle Size",
                            labellist: "Bottle",
                            width: "38",
                            list: wineCellar_lovs.bottleSize
                        },
                        {
                            type: "lov",
                            id:'grape',
                            label: "Grape",
                            search: "1",
                            searchlist: "1",
                            width: "62",
                            list: wineCellar_lovs.grape
                        },
                        {
                            type: "lov",
                            label: "Type",
                            search: "1",
                            searchlist: "1",
                            width: "38",
                            list: wineCellar_lovs.type
                        },
                        {
                            type: "text",
                            optional: "1",
                            label: "Appellation",
                            search: "1",
                            width: "100"
                        },
                        {
                            type: "lov",
                            label: "Country",
                            search: "1",
                            width: "32",
                            list: wineCellar_lovs.country
                        },
                        {
                            type: "text",
                            label: "Region",
                            maxlength: "100",
                            width: "30"
                        },
                        {
                            type: "text",
                            label: "Area",
                            maxlength: "100",
                            width: "38"
                        }

                    ]
                },
                {
                    type: "panel",
                    label: "Bottle Label",
                    width: "20",
                    elements: [
                        {
                            type: "image",
                            label: "Label",  
                            maxlength: "200",
                            width: "100",
                            height: "1",
                            searchlist: "1"
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "Purchase",
            elements: [
                {
                    type: "panel",
                    eindex: "1",
                    label: "Purchase",
                    width: "100",
                    elements: [
                        {
                            type: "date",
                            label: "Buying Date",
                            search: "1",
                            width: "40"
                        },
                        {
                            type: "decimal",
                            label: "Price",
                            maxlength: "10",
                            search: "1",
                            searchlist: "1",
                            width: "30",
                            format: "$ 0.00"
                        },
                        {
                            type: "decimal",
                            label: "Value",
                            maxlength: "10",
                            search: "1",
                            width: "30",
                            format: "$ 0.00"
                        },
                        {
                            type: "integer",
                            label: "Bottles Purchased",
                            labellist: "Purchased",
                            maxlength: "10",
                            width: "40"
                        },
                        {
                            type: "integer",
                            label: "Remaining",
                            labeledit: "Bottles Remaining",
                            maxlength: "10",
                            width: "60"
                        },
                        {
                            type: "textmultiline",
                            label: "Note",
                            maxlength: "150",
                            search: "1",
                            width: "100",
                            height: "2"
                        }

                    ]
                }

            ]
        },
        {
            type: "tab",
            label: "Drinking and Score",
            elements: [
                {
                    type: "panel",
                    label: "Drinking",
                    width: "62",
                    elements: [
                        {
                            type: "integer",
                            label: "Drink from (year)",
                            labellist: "Drink",
                            maxlength: "10",
                            searchlist: "1",
                            width: "50",
                            min: "1900",
                            max: "2100"
                        },
                        {
                            type: "integer",
                            label: "to",
                            maxlength: "10",
                            width: "50",
                            min: "1900",
                            max: "2100"
                        },
                        {
                            type: "integer",
                            label: "Peak from",
                            labellist: "Peak",
                            maxlength: "10",
                            width: "50",
                            min: "1900",
                            max: "2100"
                        },
                        {
                            type: "integer",
                            label: "to",
                            maxlength: "10",
                            width: "50",
                            min: "1900",
                            max: "2100"
                        },
                        {
                            type: "textmultiline",
                            label: "Meal",
                            maxlength: "200",
                            search: "1",
                            width: "100",
                            height: "2"
                        }

                    ]
                },
                {
                    type: "panel",
                    eindex: "1",
                    label: "Score",
                    width: "38",
                    elements: [
                        {
                            type: "lov",
                            label: "My Score",
                            labellist: "Score",
                            list: [
                                {id:'', label:'NR', icon:'s00.gif'},
                                {id:0, label:'', icon:'s0.gif'},
                                {id:1, label:'*', icon:'s1.gif'},
                                {id:2, label:'**', icon:'s2.gif'},
                                {id:3, label:'***', icon:'s3.gif'},
                                {id:4, label:'****', icon:'s4.gif'},
                                {id:5, label:'*****', icon:'s5.gif'}
                            ],
                            maxlength: "100",
                            search: "1",
                            searchlist: "0",
                            searchadv: "0",
                            width: "100"
                        },
                        {
                            type: "integer",
                            label: "Parker",
                            maxlength: "10",
                            width: "100"
                        },
                        {
                            type: "integer",
                            label: "WineSpectator",
                            maxlength: "10",
                            width: "100"
                        }

                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "Wine Tasting",
            elements: [

                { type: 'panel-list',
                    label: "Degustations",
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
        },
        {
            type: "tab",
            label: "Notes",
            elements: [
                {
                    type: "panel",
                    eindex: "1",
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
        }
    ]
}


wineTasting = {
    entity: "wine tasting",
    entities: "wine tastings", elements: [
        {
            type: "panel",
            label: "Wine Tasting",
            width: "50",
            elements: [
                {
                    type: "lov",
                    label: "Wine",
                    search: "1",
                    searchlist: "1",
                    width: "62",
                    required: "1",
                    link: "demo_winecellar.aspx?ID=@itemid"
                },
                {
                    type: "date",
                    label: "Date",
                    maxlength: "20",
                    search: "1",
                    searchlist: "1",
                    width: "38"
                },
                {
                    type: "text",
                    label: "Robe",
                    maxlength: "100",
                    search: "1",
                    searchlist: "1",
                    width: "30"
                },
                {
                    type: "text",
                    label: "Nose",
                    maxlength: "100",
                    search: "1",
                    searchlist: "1",
                    width: "32"
                },
                {
                    type: "text",
                    label: "Taste",
                    maxlength: "100",
                    search: "1",
                    searchlist: "1",
                    width: "38"
                },
                {
                    type: "textmultiline",
                    label: "Note",
                    maxlength: "300",
                    search: "1",
                    width: "100",
                    height: "4"
                }
            ]
        }
    ]
}


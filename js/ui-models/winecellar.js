var winecellar_lovs = {
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
        {text:'Chardonnay'},
        {text:'Shiraz'},
        {text:'Merlot'},
        {text:'Pinot Noir'},
        {text:'Cabernet'},
        {text:'Zinfandel'},
        {text:'Sauvignon'},
        {text:'Cabernet Sauvignon'},
        {text:'Aligoté'},
        {text:'Alvarinho'},
        {text:'Blanc Fumé'},
        {text:'Bual'},
        {text:'Carignan'},
        {text:'Chasselas'},
        {text:'Chemin Blanc'},
        {text:'Cinsault'},
        {text:'Clairette'},
        {text:'Colombard'},
        {text:'Counoise'},
        {text:'Fendant'},
        {text:'Folle Blanche'},
        {text:'Fürmint'},
        {text:'Gamay'},
        {text:'Gewürztraminer'},
        {text:'Grauburgunder'},
        {text:'Grechetto'},
        {text:'Grenache Blanc'},
        {text:'Grenache Noir'},
        {text:'Gros Plan'},
        {text:'Grüner Veltliner'},
        {text:'Italienischer Riestling'},
        {text:'Kadarka'},
        {text:'Kerner'},
        {text:'Macabeo'},
        {text:'Malmsey'},
        {text:'Malvasier'},
        {text:'Marsanne'},
        {text:'Melon de Bourgogne'},
        {text:'Mourvèdre'},
        {text:'Müller-Thurgau'},
        {text:'Muscadelle'},
        {text:'Muscadet'},
        {text:'Musca'},
        {text:'Musca d\'Alsace'},
        {text:'Muskateller'},
        {text:'Nebbiolo'},
        {text:'Palomino'},
        {text:'Pedro Ximérez'},
        {text:'Petit Verdot'},
        {text:'Pinot Blanc'},
        {text:'Pinot Gris'},
        {text:'Pinot Noir'},
        {text:'Pinotage'},
        {text:'Riesling'},
        {text:'Ruländer'},
        {text:'Sangiovese'},
        {text:'Sauvignon Blanc'},
        {text:'Scheurebe'},
        {text:'Sémilion'},
        {text:'Sercial'},
        {text:'Seyval Blanc'},
        {text:'Siegerrebe'},
        {text:'Silvaner'},
        {text:'Spätburgunder'},
        {text:'Steen'},
        {text:'Syrah'},
        {text:'Tempranillo'},
        {text:'Tokay'},
        {text:'Traminer'},
        {text:'Trebbiano'},
        {text:'Ugni Blanc'},
        {text:'Verdejo'},
        {text:'Verdelho'},
        {text:'Vermentino'},
        {text:'Vernaccia'},
        {text:'Viognier'},
        {text:'Viura'},
        {text:'Weißburgunder'}
    ],

    type: [
        {id:'red',text:'Red', icon:'winered.gif'},
        {id:'white',text:'White', icon:'winewhite.gif'},
        {id:'sweet',text:'Sweet', icon:'winesweet.gif'},
        {id:'spark',text:'Sparkling', icon:'winespark.gif'},
        {id:'rose',text:'Rose', icon:'winerose.gif'}
    ],

    country: [
        {text:'Argentina'},
        {text:'Austria'},
        {text:'Bulgaria'},
        {text:'Canada'},
        {text:'Chile'},
        {text:'Cyprus'},
        {text:'France'},
        {text:'Germany'},
        {text:'Greece'},
        {text:'Hungary'},
        {text:'Italy'},
        {text:'Luxembourg'},
        {text:'New Zealand'},
        {text:'Portugal'},
        {text:'South Africa'},
        {text:'Spain'},
        {text:'Switzerland'},
        {text:'United States'}
    ]
}

var winecellar_ui = {
    entity: 'wine',
    entities: 'wines',
    label: 'Wine Cellar',
    elements: [
        {
            type: 'panel',
            eindex: '1',
            label: 'Wine',
            width: '100',
            elements: [
                {
                    id:'name',
                    type: 'text',
                    label: 'Name',
                    required: '1',
                    maxlength: '150',
                    search: '1',
                    searchlist: '1',
                    width: '62'
                },
                {
                    id:'vin',
                    type: 'integer',
                    label: 'Vintage',
                    required: '1',
                    maxlength: '100',
                    search: '1',
                    searchlist: '1',
                    width: '38',
                    min: '1900',
                    max: '2012'
                }

            ]
        },
        {
            type: 'tab',
            label: 'General',
            elements: [
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Wine',
                    width: '80',
                    elements: [
                        {
                            type: 'text',
                            id:'winery',
                            label: 'Winery',
                            maxlength: '100',
                            required: '1',
                            search: '1',
                            searchlist: '1',
                            width: '62'
                        },
                        {
                            type: 'lov',
                            id:'bsize',
                            label: 'Bottle Size',
                            labellist: 'Bottle',
                            width: '38',
                            list: winecellar_lovs.bottleSize
                        },
                        {
                            type: 'lov',
                            id:'grape',
                            label: 'Grape',
                            search: '1',
                            searchlist: '1',
                            width: '62',
                            list: winecellar_lovs.grape
                        },
                        {
                            type: 'lov',
                            label: 'Type',
                            search: '1',
                            searchlist: '1',
                            width: '38',
                            list: winecellar_lovs.type
                        },
                        {
                            type: 'text',
                            optional: '1',
                            label: 'Appellation',
                            search: '1',
                            width: '100'
                        },
                        {
                            type: 'lov',
                            label: 'Country',
                            search: '1',
                            width: '32',
                            list: winecellar_lovs.country
                        },
                        {
                            type: 'text',
                            label: 'Region',
                            maxlength: '100',
                            width: '30'
                        },
                        {
                            type: 'text',
                            label: 'Area',
                            maxlength: '100',
                            width: '38'
                        }

                    ]
                },
                {
                    type: 'panel',
                    label: 'Bottle Label',
                    width: '20',
                    elements: [
                        {
                            type: 'image',
                            label: 'Label',  
                            maxlength: '200',
                            width: '100',
                            height: '1',
                            searchlist: '1'
                        }
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Purchase',
            elements: [
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Purchase',
                    width: '100',
                    elements: [
                        {
                            type: 'date',
                            label: 'Buying Date',
                            search: '1',
                            width: '40'
                        },
                        {
                            type: 'decimal',
                            label: 'Price',
                            maxlength: '10',
                            search: '1',
                            searchlist: '1',
                            width: '30',
                            format: '$ 0.00'
                        },
                        {
                            type: 'decimal',
                            label: 'Value',
                            maxlength: '10',
                            search: '1',
                            width: '30',
                            format: '$ 0.00'
                        },
                        {
                            type: 'integer',
                            label: 'Bottles Purchased',
                            labellist: 'Purchased',
                            maxlength: '10',
                            width: '40'
                        },
                        {
                            type: 'integer',
                            label: 'Remaining',
                            labeledit: 'Bottles Remaining',
                            maxlength: '10',
                            width: '60'
                        },
                        {
                            type: 'textmultiline',
                            label: 'Note',
                            maxlength: '150',
                            search: '1',
                            width: '100',
                            height: '2'
                        }

                    ]
                }

            ]
        },
        {
            type: 'tab',
            label: 'Drinking and Score',
            elements: [
                {
                    type: 'panel',
                    label: 'Drinking',
                    width: '62',
                    elements: [
                        {
                            type: 'integer',
                            label: 'Drink from (year)',
                            labellist: 'Drink',
                            maxlength: '10',
                            searchlist: '1',
                            width: '50',
                            min: '1900',
                            max: '2100'
                        },
                        {
                            type: 'integer',
                            label: 'to',
                            maxlength: '10',
                            width: '50',
                            min: '1900',
                            max: '2100'
                        },
                        {
                            type: 'integer',
                            label: 'Peak from',
                            labellist: 'Peak',
                            maxlength: '10',
                            width: '50',
                            min: '1900',
                            max: '2100'
                        },
                        {
                            type: 'integer',
                            label: 'to',
                            maxlength: '10',
                            width: '50',
                            min: '1900',
                            max: '2100'
                        },
                        {
                            type: 'textmultiline',
                            label: 'Meal',
                            maxlength: '200',
                            search: '1',
                            width: '100',
                            height: '2'
                        }

                    ]
                },
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Score',
                    width: '38',
                    elements: [
                        {
                            type: 'lov',
                            label: 'My Score',
                            labellist: 'Score',
                            list: [
                                {id:'', label:'NR', icon:'s00.gif'},
                                {id:0, label:'', icon:'s0.gif'},
                                {id:1, label:'*', icon:'s1.gif'},
                                {id:2, label:'**', icon:'s2.gif'},
                                {id:3, label:'***', icon:'s3.gif'},
                                {id:4, label:'****', icon:'s4.gif'},
                                {id:5, label:'*****', icon:'s5.gif'}
                            ],
                            maxlength: '100',
                            search: '1',
                            searchlist: '0',
                            searchadv: '0',
                            width: '100'
                        },
                        {
                            type: 'integer',
                            label: 'Parker',
                            maxlength: '10',
                            width: '100'
                        },
                        {
                            type: 'integer',
                            label: 'WineSpectator',
                            maxlength: '10',
                            width: '100'
                        }

                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Wine Tasting',
            elements: [

                { type: 'panel-list',
                    label: 'Degustations',
                    width: '100',
                    dbtabledetails: 'WineDegustation',
                    dbcolumndetails: 'wineid',
                    panelid: '1',
                    dborder: 'ddate desc',
                    elements: [
                        {type: 'text', panelid: '1', label: 'Robe', maxlength: '100', dbcolumn: 'Robe', dbcolumnread: 'Robe', searchlist: '1'},
                        {type: 'date', panelid: '1', dbcolumn: 'ddate', dbcolumnread: 'ddate', label: 'Date', maxlength: '20', searchlist: '1'},
                        {type: 'text', panelid: '1', label: 'Nose', maxlength: '100', dbcolumn: 'Nose', dbcolumnread: 'Nose', searchlist: '1'},
                        {type: 'text', panelid: '1', label: 'Taste', maxlength: '100', dbcolumn: 'Taste', dbcolumnread: 'Taste', searchlist: '1'},
                        {type: 'textmultiline', panelid: '1', dbcolumn: 'notes', dbcolumnread: 'notes', label: 'Note', maxlength: '300', searchlist: '1', width: '100', height: '4'}
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Notes',
            elements: [
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Comments',
                    width: '100',
                    elements: [
                        {
                            type: 'textmultiline',
                            label: 'Comments',
                            maxlength: '300',
                            width: '100',
                            height: '8'
                        }

                    ]
                }
            ]
        }
    ]
}

/*
winetasting = {
    entity: 'wine tasting',
    entities: 'wine tastings', elements: [
        {
            type: 'panel',
            label: 'Wine Tasting',
            width: '50',
            elements: [
                {
                    type: 'lov',
                    label: 'Wine',
                    search: '1',
                    searchlist: '1',
                    width: '62',
                    required: '1',
                    link: 'demo_winecellar.aspx?ID=@itemid'
                },
                {
                    type: 'date',
                    label: 'Date',
                    maxlength: '20',
                    search: '1',
                    searchlist: '1',
                    width: '38'
                },
                {
                    type: 'text',
                    label: 'Robe',
                    maxlength: '100',
                    search: '1',
                    searchlist: '1',
                    width: '30'
                },
                {
                    type: 'text',
                    label: 'Nose',
                    maxlength: '100',
                    search: '1',
                    searchlist: '1',
                    width: '32'
                },
                {
                    type: 'text',
                    label: 'Taste',
                    maxlength: '100',
                    search: '1',
                    searchlist: '1',
                    width: '38'
                },
                {
                    type: 'textmultiline',
                    label: 'Note',
                    maxlength: '300',
                    search: '1',
                    width: '100',
                    height: '4'
                }
            ]
        }
    ]
}
*/

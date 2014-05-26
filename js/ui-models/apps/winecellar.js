var winecellar_lovs = {

    bottleSize: [
        {id:750, text:'750 ml'},
        {id:500, text:'500 ml'},
        {id:375, text:'375 cl'},
        {id:1500, text:'1.5 L'},
        {id:3000, text:'3.0 L'},
        {id:6000, text:'6.0 L'},
        {id:8000, text:'8.0 L'}
    ],
    
    grape: [
        {id:'chard', text:'Chardonnay'},
        {id:'shiraz', text:'Shiraz'},
        {id:'merlo', text:'Merlot'},
        {id:'pino', text:'Pinot Noir'},
        {id:'cab', text:'Cabernet'},
        {id:'zin', text:'Zinfandel'},
        {id:'sauv', text:'Sauvignon'},
        {id:'cabsau', text:'Cabernet Sauvignon'},
        {id:'aligo', text:'Aligoté'},
        {id:'alva', text:'Alvarinho'},
        {id:'bf', text:'Blanc Fumé'},
        {id:'bual', text:'Bual'},
        {id:'carg', text:'Carignan'},
        {id:'chass', text:'Chasselas'},
        {id:'cb', text:'Chemin Blanc'},
        {id:'cin', text:'Cinsault'},
        {id:'clair', text:'Clairette'},
        {id:'colomb', text:'Colombard'},
        {id:'counoi', text:'Counoise'},
        {id:'fdt', text:'Fendant'},
        {id:'fb', text:'Folle Blanche'},
        {id:'f', text:'Fürmint'},
        {id:'gamay', text:'Gamay'},
        {id:'gewurz', text:'Gewürztraminer'},
        {id:'graub', text:'Grauburgunder'},
        {id:'grct', text:'Grechetto'},
        {id:'gb', text:'Grenache Blanc'},
        {id:'gn', text:'Grenache Noir'},
        {id:'gp', text:'Gros Plan'},
        {id:'gv', text:'Grüner Veltliner'},
        {id:'ir', text:'Italienischer Riestling'},
        {id:'ka', text:'Kadarka'},
        {id:'ker', text:'Kerner'},
        {id:'mcb', text:'Macabeo'},
        {id:'malm', text:'Malmsey'},
        {id:'malv', text:'Malvasier'},
        {id:'mars', text:'Marsanne'},
        {id:'mdb', text:'Melon de Bourgogne'},
        {id:'mourv', text:'Mourvèdre'},
        {id:'mt', text:'Müller-Thurgau'},
        {id:'mu1', text:'Muscadelle'},
        {id:'mu2', text:'Muscadet'},
        {id:'mu3', text:'Musca'},
        {id:'mu4', text:'Musca d\'Alsace'},
        {id:'mu5', text:'Muskateller'},
        {id:'neb', text:'Nebbiolo'},
        {id:'pal', text:'Palomino'},
        {id:'px', text:'Pedro Ximérez'},
        {id:'pv', text:'Petit Verdot'},
        {id:'pb', text:'Pinot Blanc'},
        {id:'pg', text:'Pinot Gris'},
        {id:'pn', text:'Pinot Noir'},
        {id:'pi', text:'Pinotage'},
        {id:'riesling', text:'Riesling'},
        {id:'rul', text:'Ruländer'},
        {id:'sang', text:'Sangiovese'},
        {id:'sb', text:'Sauvignon Blanc'},
        {id:'sc', text:'Scheurebe'},
        {id:'sem', text:'Sémilion'},
        {id:'ser', text:'Sercial'},
        {id:'sb2', text:'Seyval Blanc'},
        {id:'sieg', text:'Siegerrebe'},
        {id:'silv', text:'Silvaner'},
        {id:'spa', text:'Spätburgunder'},
        {id:'steen', text:'Steen'},
        {id:'syrah', text:'Syrah'},
        {id:'temp', text:'Tempranillo'},
        {id:'tokay', text:'Tokay'},
        {id:'tram', text:'Traminer'},
        {id:'treb', text:'Trebbiano'},
        {id:'ub', text:'Ugni Blanc'},
        {id:'verd', text:'Verdejo'},
        {id:'verdh', text:'Verdelho'},
        {id:'verm', text:'Vermentino'},
        {id:'vern', text:'Vernaccia'},
        {id:'vio', text:'Viognier'},
        {id:'viu', text:'Viura'},
        {id:'w', text:'Weißburgunder'}
    ],

    type: [
        {id:'red',text:'Red', icon:'wine/winered.gif'},
        {id:'white',text:'White', icon:'wine/winewhite.gif'},
        {id:'sweet',text:'Sweet', icon:'wine/winesweet.gif'},
        {id:'spark',text:'Sparkling', icon:'wine/winespark.gif'},
        {id:'rose',text:'Rose', icon:'wine/winerose.gif'}
    ],

    score: [
        //{id:'', text:'NR', icon:'s00.gif'},
        {id:0, text:''},
        {id:1, text:'*'},
        {id:2, text:'**'},
        {id:3, text:'***'},
        {id:4, text:'****'},
        {id:5, text:'*****'}
    ],

    country: [
        {id: 'AR', text: 'Argentina'},
        {id: 'AT', text: 'Austria'},
        {id: 'BG', text: 'Bulgaria'},
        {id: 'CA', text: 'Canada'},
        {id: 'CL', text:'Chile'},
        {id: 'CY', text:'Cyprus'},
        {id: 'FR', text:'France'},
        {id: 'DE', text:'Germany'},
        {id: 'GR', text:'Greece'},
        {id: 'HU', text:'Hungary'},
        {id: 'IT', text:'Italy'},
        {id: 'LU', text:'Luxembourg'},
        {id: 'NZ', text:'New Zealand'},
        {id: 'PT', text:'Portugal'},
        {id: 'ZA', text:'South Africa'},
        {id: 'ES', text:'Spain'},
        {id: 'CH', text:'Switzerland'},
        {id: 'US', text:'United States'}
    ]

};

var winecellar_ui = {
    id: 'evol-winecellar',
    entity: 'wine',
    entities: 'wines',
    label: 'Wine Cellar',
    icon: 'wine.gif',
    leadfield: function(model){
        return model.get('name')+' '+model.get('vintage');
    },
    elements: [
        {
            type: 'panel',
            label: 'Wine',
            width: 100,
            elements: [
                {
                    id:'name',
                    type: 'text',
                    label: 'Name',
                    required: true,
                    maxlength: 150,
                    viewmany: true,
                    width: 62,
                    help: 'Name of the wine as indicated on the label.'
                },
                {
                    id:'vintage',
                    type: 'integer',
                    label: 'Vintage',
                    required: true,
                    maxlength: 4,
                    viewmany: true,
                    width: 38,
                    min: 1900,
                    max: 2020,
                    help: 'Year the wine was produced.'
                }

            ]
        },
        {
            type: 'tab',
            label: 'General',
            elements: [
                {
                    type: 'panel',
                    label: 'Wine',
                    width: 80,
                    elements: [
                        {
                            id:'winery',
                            type: 'text',
                            label: 'Winery',
                            maxlength: 100,
                            required: true,
                            viewmany: true,
                            width: '62',
                            help: 'The establishment where this wine is made.'
                        },
                        {
                            id:'bsize',
                            type: 'lov',
                            label: 'Bottle Size',
                            labellist: 'Bottle',
                            width: 38,
                            list: winecellar_lovs.bottleSize
                        },
                        {
                            id:'grape',
                            type: 'lov',
                            label: 'Grape',
                            viewmany: false,
                            width: 62,
                            list: winecellar_lovs.grape
                        },
                        {
                            id:'type',
                            type: 'lov',
                            label: 'Type',
                            viewmany: true,
                            width: 38,
                            list: winecellar_lovs.type
                        },
                        {
                            id:'appellation',
                            type: 'text',
                            label: 'Appellation',
                            width: 100,
                            help: 'An appellation is a legally defined and protected geographical indication used to identify where the grapes for a wine were grown.'
                        },
                        {
                            id:'country',
                            type: 'lov',
                            label: 'Country',
                            width: 32,
                            list: winecellar_lovs.country
                        },
                        {
                            id:'region',
                            type: 'text',
                            label: 'Region',
                            maxlength: 100,
                            width: 30
                        },
                        {
                            id:'area',
                            type: 'text',
                            label: 'Area',
                            maxlength: 100,
                            width: 38
                        }

                    ]
                },
                {
                    type: 'panel',
                    label: 'Bottle Label',
                    width: 20,
                    elements: [
                        {
                            id:'label_img',
                            type: 'image',
                            label: 'Label',  
                            maxlength: 200,
                            width: 100,
                            viewmany: true
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
                    label: 'Purchase',
                    width: 100,
                    elements: [
                        {
                            id:'buying_date',
                            type: 'date',
                            label: 'Buying Date',
                            width: 40
                        },
                        {
                            id:'price',
                            type: 'money',
                            label: 'Price',
                            viewmany: true,
                            width: 30
                        },
                        {
                            id:'value',
                            type: 'money',
                            label: 'Value',
                            width: 30
                        },
                        {
                            id:'purchased',
                            type: 'integer',
                            label: 'Bottles Purchased',
                            labellist: 'Purchased',
                            maxlength: 10,
                            width: 40
                        },
                        {
                            id:'remaining',
                            type: 'integer',
                            label: 'Remaining',
                            labeledit: 'Bottles Remaining',
                            maxlength: 10,
                            width: 60,
                            viewcharts:false
                        },
                        {
                            id:'notes',
                            type: 'textmultiline',
                            label: 'Notes',
                            maxlength: 150,
                            width: 100,
                            height: 2
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
                    width: 62,
                    elements: [
                        {
                            id:'drink_from',
                            type: 'integer',
                            label: 'Drink from (year)',
                            placeholder: '2013',
                            labellist: 'Drink',
                            maxlength: 10,
                            viewmany: true,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'drink_to',
                            type: 'integer',
                            label: 'to',
                            maxlength: 4,
                            width: 50,
                            min: 1900,
                            max: '2100'
                        },
                        {
                            id:'peak_from',
                            type: 'integer',
                            label: 'Peak from',
                            labellist: 'Peak',
                            maxlength: 4,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'peak_to',
                            type: 'integer',
                            label: 'to',
                            maxlength: 4,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'meal',
                            type: 'textmultiline',
                            label: 'Meal',
                            maxlength: 200,
                            width: 100,
                            height: 2
                        }

                    ]
                },
                {
                    type: 'panel',
                    label: 'Score',
                    width: 38,
                    elements: [
                        {
                            id:'score',
                            type: 'lov',
                            label: 'My Score',
                            labellist: 'Score',
                            list: winecellar_lovs.score,
                            maxlength: 100,
                            width: 100
                        },
                        {
                            id:'score_parker',
                            type: 'integer',
                            label: 'Parker',
                            min: 50,
                            max: 100,
                            maxlength: 3,
                            width: 100
                        },
                        {
                            id:'score_winespectator',
                            type: 'integer',
                            label: 'WineSpectator',
                            min: 0,
                            max: 100,
                            maxlength: 3,
                            width: 100
                        }

                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Wine Tasting',
            elements: [
                {
                    type: 'panel-list',
                    id:'degustations',
                    attr:'degustation',
                    label: 'Degustations',
                    width: 100,
                    elements: [
                        {id: 'ddate', type: 'date', label: 'Date', maxlength: 20, viewmany: true,
                            required:true},
                        {id: 'robe',  type: 'text', label: 'Robe', maxlength: 100, viewmany: true},
                        {id: 'nose', type: 'text', label: 'Nose', maxlength: 100, viewmany: true},
                        {id: 'taste', type: 'text', label: 'Taste', maxlength: 100, viewmany: true},
                        {id: 'notes', type: 'textmultiline', label: 'Note', maxlength: 300, viewmany: true, width: 100, height: 2}
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
                    label: 'Comments',
                    width: 100,
                    elements: [
                        {
                            id: 'comments',
                            type: 'textmultiline',
                            label: 'Comments',
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

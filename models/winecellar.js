var winecellar_lovs = {

    bottleSize: [
        { id: 1, text: "750 ml"},
        { id: 2, text: "500 ml"},
        { id: 3, text: "375 cl"},
        { id: 4, text: "1.5 L"},
        { id: 5, text: "3.0 L"},
        { id: 6, text: "6.0 L"},
        { id: 7, text: "8.0 L"}
    ],
    
    grape: [
        { id: 1, text: "Chardonnay"},
        { id: 2, text: "Shiraz"},
        { id: 3, text: "Merlot"},
        { id: 4, text: "Pinot Noir"},
        { id: 5, text: "Cabernet"},
        { id: 6, text: "Zinfandel"},
        { id: 7, text: "Sauvignon"},
        { id: 8, text: "Cabernet Sauvignon"},
        { id: 9, text: "Aligoté"},
        { id: 10, text: "Alvarinho"},
        { id: 11, text: "Blanc Fumé"},
        { id: 12, text: "Bual"},
        { id: 13, text: "Carignan"},
        { id: 14, text: "Chasselas"},
        { id: 15, text: "Chemin Blanc"},
        { id: 16, text: "Cinsault"},
        { id: 17, text: "Clairette"},
        { id: 18, text: "Colombard"},
        { id: 19, text: "Counoise"},
        { id: 20, text: "Fendant"},
        { id: 21, text: "Folle Blanche"},
        { id: 22, text: "Fürmint"},
        { id: 23, text: "Gamay"},
        { id: 24, text: "Gewürztraminer"},
        { id: 25, text: "Grauburgunder"},
        { id: 26, text: "Grechetto"},
        { id: 27, text: "Grenache Blanc"},
        { id: 28, text: "Grenache Noir"},
        { id: 29, text: "Gros Plan"},
        { id: 30, text: "Grüner Veltliner"},
        { id: 31, text: "Italienischer Riestling"},
        { id: 32, text: "Kadarka"},
        { id: 33, text: "Kerner"},
        { id: 34, text: "Macabeo"},
        { id: 35, text: "Malmsey"},
        { id: 36, text: "Malvasier"},
        { id: 37, text: "Marsanne"},
        { id: 38, text: "Melon de Bourgogne"},
        { id: 39, text: "Mourvèdre"},
        { id: 40, text: "Müller-Thurgau"},
        { id: 41, text: "Muscadelle"},
        { id: 42, text: "Muscadet"},
        { id: 43, text: "Musca"},
        { id: 44, text: "Musca d'Alsace"},
        { id: 45, text: "Muskateller"},
        { id: 46, text: "Nebbiolo"},
        { id: 47, text: "Palomino"},
        { id: 48, text: "Pedro Ximérez"},
        { id: 49, text: "Petit Verdot"},
        { id: 50, text: "Pinot Blanc"},
        { id: 51, text: "Pinot Gris"},
        { id: 52, text: "Pinot Noir"},
        { id: 53, text: "Pinotage"},
        { id: 54, text: "Riesling"},
        { id: 55, text: "Ruländer"},
        { id: 56, text: "Sangiovese"},
        { id: 57, text: "Sauvignon Blanc"},
        { id: 58, text: "Scheurebe"},
        { id: 59, text: "Sémilion"},
        { id: 60, text: "Sercial"},
        { id: 61, text: "Seyval Blanc"},
        { id: 62, text: "Siegerrebe"},
        { id: 63, text: "Silvaner"},
        { id: 64, text: "Spätburgunder"},
        { id: 65, text: "Steen"},
        { id: 66, text: "Syrah"},
        { id: 67, text: "Tempranillo"},
        { id: 68, text: "Tokay"},
        { id: 69, text: "Traminer"},
        { id: 70, text: "Trebbiano"},
        { id: 71, text: "Ugni Blanc"},
        { id: 72, text: "Verdejo"},
        { id: 73, text: "Verdelho"},
        { id: 74, text: "Vermentino"},
        { id: 75, text: "Vernaccia"},
        { id: 76, text: "Viognier"},
        { id: 77, text: "Viura"},
        { id: 78, text: "Weißburgunder"}
    ],

    type: [
        { id:1, text:'Red', icon:'wine/winered.gif'},
        { id:2, text:'White', icon:'wine/winewhite.gif'},
        { id:3, text:'Sweet', icon:'wine/winesweet.gif'},
        { id:4, text:'Sparkling', icon:'wine/winespark.gif'},
        { id:5, text:'Rose', icon:'wine/winerose.gif'}
    ],

    score: [
        //{id:'', text:'NR', icon:'s00.gif'},
        //{id:0, text:''},
        {id:1, text:'*'},
        {id:2, text:'**'},
        {id:3, text:'***'},
        {id:4, text:'****'},
        {id:5, text:'*****'}
    ],

    country: [
        { id: 1, text: "Argentina"},
        { id: 2, text: "Austria"},
        { id: 3, text: "Bulgaria"},
        { id: 4, text: "Canada"},
        { id: 5, text: "Chile"},
        { id: 6, text: "Cyprus"},
        { id: 7, text: "France"},
        { id: 8, text: "Germany"},
        { id: 9, text: "Greece"},
        { id: 10, text: "Hungary"},
        { id: 11, text: "Italy"},
        { id: 12, text: "Luxembourg"},
        { id: 13, text: "New Zealand"},
        { id: 14, text: "Portugal"},
        { id: 15, text: "South Africa"},
        { id: 16, text: "Spain"},
        { id: 17, text: "Switzerland"},
        { id: 18, text: "United States"}
    ]

};

var uiModels = uiModels || {};

uiModels.winecellar = {
    id: 'winecellar',
    name: 'wine',
    namePlural: 'wines',
    label: 'Wine Cellar',
    icon: 'wine.gif',
    fnTitle: function(model){
        return model.get('name')+' '+model.get('vintage');
    },
    fnBadge: function(model){
        return model.get('remaining') || 0;
    },
    fnSearch: ['name', 'winery', 'appellation', 'notes'],
    elements: [
        {
            type: 'panel',
            label: 'Wine',
            width: 100,
            elements: [
                {
                    id:'name',
                    attribute:'name',
                    type: 'text',
                    label: 'Name',
                    required: true,
                    maxLength: 150,
                    inMany: true,
                    width: 62,
                    help: 'Name of the wine as indicated on the label.'
                },
                {
                    id:'vintage',
                    attribute:'vintage',
                    type: 'integer',
                    label: 'Vintage',
                    required: true,
                    maxLength: 4,
                    inMany: true,
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
                            attribute:'winery',
                            type: 'text',
                            label: 'Winery',
                            maxLength: 100,
                            required: true,
                            inMany: true,
                            width: '62',
                            help: 'The establishment where this wine is made.'
                        },
                        {
                            id:'bsize',
                            attribute:'bsize',
                            type: 'lov',
                            label: 'Bottle Size',
                            labelList: 'Bottle',
                            width: 38,
                            list: winecellar_lovs.bottleSize
                        },
                        {
                            id:'grape',
                            attribute:'grape',
                            type: 'lov',
                            label: 'Grape',
                            inMany: false,
                            width: 62,
                            list: winecellar_lovs.grape
                        },
                        {
                            id:'type',
                            attribute:'type',
                            type: 'lov',
                            label: 'Type',
                            inMany: true,
                            width: 38,
                            list: winecellar_lovs.type
                        },
                        {
                            id:'appellation',
                            attribute:'appellation',
                            type: 'text',
                            label: 'Appellation',
                            width: 100,
                            help: 'An appellation is a legally defined and protected geographical indication used to identify where the grapes for a wine were grown.'
                        },
                        {
                            id:'country',
                            attribute:'country',
                            type: 'lov',
                            label: 'Country',
                            width: 32,
                            list: winecellar_lovs.country
                        },
                        {
                            id:'region',
                            attribute:'region',
                            type: 'text',
                            label: 'Region',
                            maxLength: 100,
                            width: 30
                        },
                        {
                            id:'area',
                            attribute:'area',
                            type: 'text',
                            label: 'Area',
                            maxLength: 100,
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
                            attribute:'label_img',
                            type: 'image',
                            label: 'Label',
                            labelCards: '',
                            maxLength: 200,
                            width: 100,
                            inMany: true
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
                            attribute: 'buying_date',
                            type: 'date',
                            label: 'Buying Date',
                            width: 40
                        },
                        {
                            id:'price',
                            attribute: 'price',
                            type: 'money',
                            label: 'Price',
                            inMany: true,
                            width: 30
                        },
                        {
                            id:'value',
                            attribute: 'value',
                            type: 'money',
                            label: 'Value',
                            width: 30
                        },
                        {
                            id:'purchased',
                            attribute: 'purchased',
                            type: 'integer',
                            label: 'Bottles Purchased',
                            labelList: 'Purchased',
                            maxLength: 10,
                            width: 40
                        },
                        {
                            id:'remaining',
                            attribute: 'remaining',
                            type: 'integer',
                            label: 'Remaining',
                            labeledit: 'Bottles Remaining',
                            maxLength: 10,
                            width: 60,
                            inCharts:false
                        },
                        {
                            id:'notes',
                            attribute: 'notes',
                            type: 'textmultiline',
                            label: 'Notes',
                            maxLength: 150,
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
                            attribute: 'drink_from',
                            type: 'integer',
                            label: 'Drink from (year)',
                            labelList: 'Drink',
                            labelCharts: 'Wines by Start drinking period',
                            placeholder: '2012',
                            maxLength: 10,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'drink_to',
                            attribute: 'drink_to',
                            type: 'integer',
                            label: 'to',
                            labelCharts: 'Wines by End drinking period',
                            maxLength: 4,
                            width: 50,
                            min: 1900,
                            max: '2100'
                        },
                        {
                            id:'peak_from',
                            attribute: 'peak_from',
                            type: 'integer',
                            label: 'Peak from',
                            labelCharts: 'Wines by Start peak period',
                            maxLength: 4,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'peak_to',
                            attribute: 'peak_to',
                            type: 'integer',
                            label: 'to',
                            labelCharts: 'Wines by End peak period',
                            maxLength: 4,
                            width: 50,
                            min: 1900,
                            max: 2100
                        },
                        {
                            id:'meal',
                            attribute: 'meal',
                            type: 'textmultiline',
                            label: 'Meal',
                            maxLength: 200,
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
                            attribute: 'score',
                            type: 'lov',
                            label: 'My Score',
                            labelList: 'Score',
                            list: winecellar_lovs.score,
                            maxLength: 100,
                            width: 100
                        },
                        {
                            id:'score_parker',
                            attribute: 'score_parker',
                            type: 'integer',
                            label: 'Parker',
                            labelCharts: 'Parker scores',
                            min: 50,
                            max: 100,
                            maxLength: 3,
                            width: 100
                        },
                        {
                            id:'score_winespectator',
                            attribute: 'score_winespectator',
                            type: 'integer',
                            label: 'Wine Spectator',
                            labelCharts: 'Wine Spectator scores',
                            min: 0,
                            max: 100,
                            maxLength: 3,
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
                    attribute:'degustations',
                    label: 'Degustations',
                    width: 100,
                    elements: [
                        {id: 'ddate', type: 'date', label: 'Date', maxLength: 20, inMany: true,
                            required:true},
                        {id: 'robe',  type: 'text', label: 'Robe', maxLength: 100, inMany: true},
                        {id: 'nose', type: 'text', label: 'Nose', maxLength: 100, inMany: true},
                        {id: 'taste', type: 'text', label: 'Taste', maxLength: 100, inMany: true},
                        {id: 'notes', type: 'textmultiline', label: 'Note', maxLength: 300, inMany: true, width: 100, height: 2}
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
                            attribute: 'comments',
                            type: 'textmultiline',
                            label: 'Comments',
                            maxLength: 500,
                            width: 100,
                            height: 8
                        }
                    ]
                }
            ]
        }
    ]
};

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.winecellar;
}

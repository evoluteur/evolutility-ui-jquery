
var bottleSizes=[
    {id:750, text: '750 ml'},
    {id:500, text: '500 ml'},
    {id:375, text: '375 cl'},
    {id:1500, text: '1.5 L'},
    {id:3000, text: '3.0 L'},
    {id:6000, text: '6.0 L'},
    {id:8000, text: '8.0 L'}
];

var test_ui = {
    entity: 'test',
    entities: 'tests',
    title: 'Test Object',
    leadfield:'name',
    elements: [
        {
            type: 'panel',
            label: 'Panel 1',
            width: 100,
            elements: [
                {
                    id:'name',
                    type: 'text',
                    label: 'Name',
                    required: true,
                    maxlength: '150',
                    viewmany: true,
                    width: 42
                },
                {
                    id:'name2',
                    type: 'text',
                    label: 'Text',
                    viewmany: true,
                    width: '38'
                },
                {
                    id:'name3',
                    type: 'text',
                    label: 'Text (readonly)',
                    readonly: '1',
                    viewmany: true,
                    width: '20'
                }
            ]
        },
        {
            type: 'tab',
            label: 'General',
            elements: [
                {
                    type: 'panel',
                    label: 'Date',
                    width: 33,
                    elements: [
                        {
                            type: 'date',
                            id:'fd1',
                            label: 'Date 1',
                            required: true,
                            width: 100
                        },
                        {
                            type: 'date',
                            id:'fd2',
                            label: 'Date 2',
                            width: 100
                        },
                        {
                            type: 'datetime',
                            id:'fdt',
                            label: 'DateTime field',
                            maxlength: 100,
                            required: true,
                            width: 100
                        },
                        {
                            type: 'time',
                            id:'ft',
                            label: 'Time field',
                            maxlength: 100,
                            required: true,
                            width: 100
                        }

                    ]
                },
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'LOVs',
                    width: '33',
                    elements: [
                        {
                            type: 'lov',
                            id:'bsize',
                            label: 'Bottle Size (LOV)',
                            labellist: 'Bottle',
                            required: true,
                            width: 100,
                            list:bottleSizes
                        },
                        {
                            type: 'lov',
                            id:'bsize2',
                            label: 'Bottle Size again',
                            labellist: 'Bottle',
                            width: 100,
                            list:[
                                {id:750, text: '750 ml'},
                                {id:500, text: '500 ml'},
                                {id:375, text: '375 cl'},
                                {id:1500, text: '1.5 L'},
                                {id:3000, text: '3.0 L'},
                                {id:6000, text: '6.0 L'},
                                {id:8000, text: '8.0 L'}
                            ]
                        },
                        {
                            type: 'lov',
                            id:'grape',
                            label: 'Grape (big LOV)',
                            search: '1',
                            viewmany: true,
                            width: 100,
                            list:[
                                {text: 'Chardonnay'},
                                {text: 'Shiraz'},
                                {text: 'Merlot'},
                                {text: 'Pinot Noir'},
                                {text: 'Cabernet'},
                                {text: 'Zinfandel'},
                                {text: 'Sauvignon'},
                                {text: 'Cabernet Sauvignon'},
                                {text: 'Aligoté'},
                                {text: 'Alvarinho'},
                                {text: 'Blanc Fumé'},
                                {text: 'Bual'},
                                {text: 'Carignan'},
                                {text: 'Chasselas'},
                                {text: 'Chemin Blanc'},
                                {text: 'Cinsault'},
                                {text: 'Clairette'},
                                {text: 'Colombard'},
                                {text: 'Counoise'},
                                {text: 'Fendant'},
                                {text: 'Folle Blanche'},
                                {text: 'Fürmint'},
                                {text: 'Gamay'},
                                {text: 'Gewürztraminer'},
                                {text: 'Grauburgunder'},
                                {text: 'Grechetto'},
                                {text: 'Grenache Blanc'},
                                {text: 'Grenache Noir'},
                                {text: 'Gros Plan'},
                                {text: 'Grüner Veltliner'},
                                {text: 'Italienischer Riestling'},
                                {text: 'Kadarka'},
                                {text: 'Kerner'},
                                {text: 'Macabeo'},
                                {text: 'Malmsey'},
                                {text: 'Malvasier'},
                                {text: 'Marsanne'},
                                {text: 'Melon de Bourgogne'},
                                {text: 'Mourvèdre'},
                                {text: 'Müller-Thurgau'},
                                {text: 'Muscadelle'},
                                {text: 'Muscadet'},
                                {text: 'Musca'},
                                {text: 'Musca d\'Alsace'},
                                {text: 'Muskateller'},
                                {text: 'Nebbiolo'},
                                {text: 'Palomino'},
                                {text: 'Pedro Ximérez'},
                                {text: 'Petit Verdot'},
                                {text: 'Pinot Blanc'},
                                {text: 'Pinot Gris'},
                                {text: 'Pinot Noir'},
                                {text: 'Pinotage'},
                                {text: 'Riesling'},
                                {text: 'Ruländer'},
                                {text: 'Sangiovese'},
                                {text: 'Sauvignon Blanc'},
                                {text: 'Scheurebe'},
                                {text: 'Sémilion'},
                                {text: 'Sercial'},
                                {text: 'Seyval Blanc'},
                                {text: 'Siegerrebe'},
                                {text: 'Silvaner'},
                                {text: 'Spätburgunder'},
                                {text: 'Steen'},
                                {text: 'Syrah'},
                                {text: 'Tempranillo'},
                                {text: 'Tokay'},
                                {text: 'Traminer'},
                                {text: 'Trebbiano'},
                                {text: 'Ugni Blanc'},
                                {text: 'Verdejo'},
                                {text: 'Verdelho'},
                                {text: 'Vermentino'},
                                {text: 'Vernaccia'},
                                {text: 'Viognier'},
                                {text: 'Viura'},
                                {text: 'Weißburgunder'}
                            ]
                        }

                    ]
                },
                {
                    type: 'panel',
                    label: 'An Image',
                    width: '34',
                    elements: [
                        {
                            type: 'image',
                            label: '',
                            labeledit: '',
                            labellist: 'Label',
                            maxlength: '200',
                            width: 100,
                            viewmany: true
                        }

                    ]
                }

            ]
        },
        {
            type: 'tab',
            label: 'Numbers',
            elements: [
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Integers',
                    width: '33',
                    elements: [
                        {
                            type: 'integer',
                            id:'int1',
                            label: 'Integer (min=0 max=10)',
                            required: true,
                            maxlength: 10,
                            min: 0,
                            max: 10,
                            width: 100
                        },
                        {
                            type: 'integer',
                            id:'int2',
                            label: 'Integer 2',
                            maxlength: 10,
                            width: 100
                        }
                    ]
                },
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Decimals',
                    width: '33',
                    elements: [
                        {
                            type: 'decimal',
                            id:'dec1',
                            label: 'Decimal 1',
                            required: true,
                            maxlength: 10,
                            search: '1',
                            width: 100,
                            format: '$ 0.00'
                        },
                        {
                            type: 'decimal',
                            id:'dec2',
                            label: 'Decimal 2',
                            maxlength: 10,
                            search: '1',
                            viewmany: true,
                            width: 100,
                            format: '$ 0.00'
                        },
                        {
                            type: 'money',
                            id:'money',
                            label: 'Money',
                            maxlength: 10,
                            search: '1',
                            viewmany: true,
                            width: 100,
                            format: '$ 0.00'
                        }
                    ]
                },
                {
                    type: 'panel',
                    eindex: '1',
                    label: 'Colors',
                    width: '33',
                    elements: [
                        {
                            type: 'color',
                            id:'color1',
                            label: 'Color',
                            required: true,
                            width: 50
                        },
                        {
                            type: 'color',
                            id:'color2',
                            label: 'Color 2',
                            width: 50
                        },
                        {
                            type: 'color',
                            id:'color3',
                            label: 'Color 3',
                            width: 50
                        },
                        {
                            type: 'color',
                            id:'color4',
                            label: 'Color 4',
                            width: 50
                        }
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
                    id: 'bigtxt1',
                    label: 'Comments',
                    width: 100,
                    elements: [
                        {
                            type: 'textmultiline',
                            label: 'Comments',
                            maxlength: '300',
                            width: 100,
                            height: '8'
                        }

                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Read Only',
            elements: [
                {
                    type: 'panel',
                    label: 'Read Only Fields',
                    width: 100,
                    elements: [
                        {
                            id:'txtro',
                            type: 'text',
                            label: 'Text',
                            readonly: true,
                            width: '33'
                        },
                        {
                            id:'txtml',
                            type: 'textmultiline',
                            label: 'Big Text',
                            readonly: true,
                            width: '67'
                        },
                        {
                            type: 'date',
                            id:'fd1ro',
                            label: 'Date 1',
                            readonly: true,
                            width: 33
                        },
                        {
                            type: 'datetime',
                            id:'fdtro',
                            label: 'DateTime field',
                            maxlength: 100,
                            readonly: true,
                            width: 33
                        },
                        {
                            type: 'time',
                            id:'ftro',
                            label: 'Time field',
                            maxlength: 100,
                            readonly: true,
                            width: 34
                        },
                        {
                            type: 'lov',
                            id:'bsizero',
                            label: 'Bottle Size (LOV)',
                            labellist: 'Bottle',
                            readonly: true,
                            width: 33,
                            list:bottleSizes
                        },
                        {
                            type: 'boolean',
                            id:'bro',
                            label: 'Boolean',
                            maxlength: 100,
                            readonly: true,
                            width: 33
                        },
                        {
                            type: 'email',
                            id:'emailro',
                            label: 'email',
                            readonly: true,
                            width: 34
                        },
                        {
                            type: 'integer',
                            id:'intro',
                            label: 'Integer',
                            readonly: true,
                            width: 33,
                            list:bottleSizes
                        },
                        {
                            type: 'decimal',
                            id:'decro',
                            label: 'Decimal',
                            readonly: true,
                            width: 33
                        },
                        {
                            type: 'money',
                            id:'moneyro',
                            label: 'Money',
                            maxlength: 100,
                            readonly: true,
                            width: 34
                        }
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Collection',
            elements: [
                {
                    type: 'panel-list',
                    id:'degustations',
                    attr:'degustation',
                    label: 'Collection',
                    width: 100,
                    elements: [
                        {id: 'ddate', type: 'date', label: 'Date', maxlength: 20, viewmany: '1',
                            required:true},
                        {id: 'str',  type: 'text', label: 'Text', maxlength: 100, viewmany: '1'},
                        {
                            type: 'lov',
                            id:'bsize',
                            label: 'List',
                            required: true,
                            width: 100,
                            list:bottleSizes
                        },
                        {id: 'notes', type: 'textmultiline', label: 'Note', maxlength: 300, viewmany: '1', width: 100, height: '2'}
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: '2 Collections',
            elements: [
                {
                    type: 'panel-list',
                    id:'degustations2',
                    attr:'degustation2',
                    label: 'Collection 1',
                    width: 100,
                    elements: [
                        {id: 'str1',  type: 'text', label: 'Text 1', maxlength: 100, viewmany: '1'},
                        {id: 'str2',  type: 'text', label: 'Text 2', maxlength: 100, viewmany: '1'},
                        {id: 'str3',  type: 'text', label: 'Text 3', maxlength: 100, viewmany: '1'}
                    ]
                },
                {
                    type: 'panel-list',
                    id:'degustations3',
                    attr:'degustation3',
                    label: 'Collection 2',
                    width: 100,
                    elements: [
                        {id: 'str1',  type: 'text', label: 'Text 1', maxlength: 100, viewmany: '1'},
                        {id: 'str2',  type: 'text', label: 'Text 2', maxlength: 100, viewmany: '1'},
                        {id: 'str3',  type: 'text', label: 'Text 3', maxlength: 100, viewmany: '1'}
                    ]
                }
            ]
        }
    ]
};


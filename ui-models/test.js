// Evolutility ui-model for a test object
// because this ui-model is very repetitive, it is not a JSON but uses functions for repeted patterns ...

var testLOV = [
    {text:'yotta', id:'Y'},
    {text:'zetta', id:'Z'},
    {text:'exa', id:'E'},
    {text:'peta', id:'P'},
    {text:'tera', id:'T'},
    {text:'giga', id:'G'},
    {text:'mega', id:'M'},
    {text:'kilo', id:'k'},
    {text:'hecto', id:'h'},
    {text:'deca', id:'da'}
];

var testLOV2 = [
    {id:'red',text:'Red', icon:'wine/winered.gif'},
    {id:'white',text:'White', icon:'wine/winewhite.gif'},
    {id:'sweet',text:'Sweet', icon:'wine/winesweet.gif'},
    {id:'spark',text:'Sparkling', icon:'wine/winespark.gif'},
    {id:'rose',text:'Rose', icon:'wine/winerose.gif'}
];

function fieldTypePanel(id, label, labelPanel, label2Panel, css){
    var labelP = labelPanel || label || id,
        label2P = label2Panel,
        fields=[
            {
                id: id+'1',
                attribute: id+'1',
                type: id,
                label: label+' 1',
                required: true,
                inMany: true,
                width: 100
            },
            {
                id: id+'2',
                attribute: id+'1', // same col as prev field
                readonly: true,
                groupable: false,
                colorable: false,
                sizable: false,
                help: 'The field "' + label+' 2" is the read-only version of "' + label+'". It\'s value is updated on save.',
                type: id,
                label: label+' 2',
                width: 100
            },
            {
                id: id+'3',
                attribute: id+'3',
                type: id,
                label: label+' 3',
                width: 100
            }
        ];

    if(id==='boolean'){
        fields[1].css='cGreen';
        fields[2].css='cBlue';
    }else if(id==='list' || id==='lov'){
        fields.forEach(function(f){
            f.list=testLOV;
        });
    }else if(id==='hidden'){
        fields[0].required=false;
    }

    return {
        type: 'panel',
        label: labelP,
        label2: label2P,
        width: 33,
        elements: fields,
        css: css
    };
}

var uiModels = uiModels || {};

uiModels.test = {
    id: 'test',
    name: 'test',
    namePlural: 'tests',
    title: 'Test Object',
    icon:'color_wheel.png',
    fnTitle:'name',
    fnSearch:['name','text1','text','text3','textmultiline1','textmultiline','textmultiline3','html1','html','html3','email1','email','email3'],
    elements: [
        {
            type: 'panel',
            css: 'panel-primary',
            label: 'Test object',
            label2: 'with fields of all types.',
            width: 100,
            elements: [
                {
                    id:'name',
                    attribute:'name',
                    type: 'text',
                    label: 'Title',
                    required: true,
                    maxLength: '150',
                    inMany: true,
                    width: 100
                }
            ]
        },
        {
            type: 'tab',
            label: 'Text',
            elements: [
                fieldTypePanel('text', 'Text', 'Text', '', 'panel-success'),
                fieldTypePanel('textmultiline', 'Large Text', '', 'multilines', 'panel-success'),
                fieldTypePanel('html', 'HTML', 'HTML', 'not fully implemented yet', 'panel-danger')
            ]
        },
        {
            type: 'tab',
            label: 'Lists',
            elements: [
                fieldTypePanel('lov', 'List', 'List', 'single value'),
                fieldTypePanel('list', 'List mv', 'List', 'multiple values'),
                {
                    type: 'panel',
                    label: 'List',
                    label2: 'with icons',
                    width: 33,
                    elements: [
                        {
                            id: 'lovicon1',
                            type: 'lov',
                            label: 'List',
                            list:testLOV2,
                            required: true,
                            inMany: true,
                            width: 100
                        },
                        {
                            id: 'lovicon2',
                            type: 'lov',
                            label: 'List 2',
                            readonly: true,
                            list:testLOV2,
                            width: 100
                        },
                        {
                            id: 'lovicon3',
                            type: 'lov',
                            label: 'List 3',
                            list: testLOV2,
                            width: 100
                        }
                    ]
                }
            ]//id==='html'?'not fully implemented yet':''
        },
        {
            type: 'tab',
            label: 'Date & Time',
            elements: [
                fieldTypePanel('date', 'Date', '', '', 'panel-default'),
                fieldTypePanel('time', 'Time', '', '', 'panel-info'),
                fieldTypePanel('datetime', 'Date and Time', '', '', 'panel-primary')
            ]
        },
        {
            type: 'tab',
            label: 'Numbers',
            elements: [
                fieldTypePanel('integer', 'Integer'),
                fieldTypePanel('decimal', 'Decimal'),
                fieldTypePanel('money', 'Money', 'Money', '', 'panel-success')
            ]
        },
        {
            type: 'tab',
            label: 'Checkbox & links',
            elements: [
                fieldTypePanel('boolean', 'Boolean', 'Boolean', 'checkboxes'),
                fieldTypePanel('email', 'email'),
                fieldTypePanel('url', 'url')
            ]
        },
        {
            type: 'tab',
            label: 'Image & Color',
            elements: [
                fieldTypePanel('image', 'Image'),
                fieldTypePanel('color', 'Color'),
                fieldTypePanel('hidden', 'Hidden', '', 'but in the DOM', 'panel-default')
            ]
        },
        {
            type: 'tab',
            label: 'Formulas',
            elements: [
                {
                    type: 'panel', label: 'Formula fields', width: 62,
                    label2: 'Values are updated on save.',
                    elements: [
                        {
                            id: 'ff1', attribute: 'ff1', type: 'formula', 
                            label: 'Formula Title', 
                            formula: function(m){
                                return 'The record name is "'+m.escape('name')+'".';
                            },
                            width: 100, inMany: true
                        },
                        {
                            id: 'fftt', attribute: 'fftt', type: 'formula', 
                            label: 'Formula 2 Titles', 
                            formula: function(m){
                                return m.escape('name')+' '+m.escape('text');
                            },
                            width: 100, inMany: true
                        },
                        {
                            id: 'fflink', attribute: 'fflink', type: 'formula', 
                            label: 'Google search for name', 
                            formula: function(m){
                                return '<a href="http://www.google.com/search?q='+ encodeURI(m.get('name')) + '" target="google">'+ m.escape('name') + ' on Google</a>';
                            },
                            width: 100, inMany: true
                        }
                    ]
                },
                {
                    type: 'panel', label: 'Items counts', width: 38,
                    elements: [
                        {
                            id: 'ffc1', attribute: 'ffc1', type: 'formula', 
                            label: 'Number of items in Collection 1', 
                            labelmany: '# Coll.1',
                            formula: function(m){
                                return (m.get('subCollec1')||[]).length;
                            },
                            width: 100, inMany: true
                        },
                        {
                            id: 'ffc2', attribute: 'ffc2', type: 'formula', 
                            label: 'Number of items in Collection 2', 
                            labelmany: '# Coll.2',
                            formula: function(m){
                                return (m.get('subCollec2')||[]).length;
                            },
                            width: 100, inMany: true
                        },
                        {
                            id: 'ffc3', attribute: 'ffc3', type: 'formula', 
                            label: 'Number of items in Collection 3', 
                            labelmany: '# Coll.3',
                            formula: function(m){
                                return (m.get('subCollec3')||[]).length;
                            },
                            width: 100, inMany: true
                        }
                    ]
                },
                {
                    type: 'panel', label: 'Forest of Items', width: 100,
                    label2: 'One tree for each item in the collections.',
                    elements: [
                        {
                            id: 'ffforest', attribute: 'ffforest', type: 'formula', 
                            label: 'Trees', 
                            formula: function(m){
                                return _.map(m.get('subCollec1'), function(c){
                                    return '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span>';
                                }).join('')+_.map(m.get('subCollec2'), function(c){
                                    return '<span class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></span>';
                                }).join('')+_.map(m.get('subCollec3'), function(c){
                                    return '<span class="glyphicon glyphicon-apple" aria-hidden="true"></span>';
                                }).join('');
                            },
                            width: 100, inMany: true
                        }
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Collections',
            elements: [
                {
                    type: 'panel-list',
                    css: 'panel-info',
                    id:'subCollec1',
                    attribute:'subCollec1',
                    label: 'Collection 1',
                    width: 100,
                    elements: [
                        {id: 'pl1f1',  type: 'text', label: 'Name', required:true, maxLength: 50},
                        {id: 'pl1f2',  type: 'text', label: 'Text', required:true, maxLength: 100},
                        {id: 'pl1f3',  type: 'lov', label: 'Sizes', required:true, list: testLOV}
                    ]
                },
                {
                    type: 'panel-list',
                    css:'panel-info',
                    id:'subCollec2',
                    attribute:'subCollec2',
                    label: 'Collection 2',
                    width: 100,
                    elements: [
                        {id: 'pl2f1',  type: 'text', label: 'Name', maxLength: 50},
                        {id: 'pl2f3',  type: 'date', label: 'Date', inMany: true},
                        {id: 'pl2f4',  type: 'boolean', label: 'Bool'},
                        {id: 'pl2f2',  type: 'text', label: 'Text', maxLength: 100}
                    ]
                },
                {
                    type: 'panel-list',
                    css: 'panel-primary',
                    id:'subCollec3',
                    attribute:'subCollec3',
                    label: 'Collection 3',
                    width: 100,
                    elements: [
                        {id: 'pl3f1', type: 'text', label: 'Name', maxLength: 50},
                        {id: 'pl3f2', type: 'integer', label: 'Integer'},
                        {id: 'pl3f3', type: 'money', label: 'Money'},
                        {id: 'pl3f4', type: 'lov', label: 'Sizes', list: testLOV}
                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'JSON',
            elements: [
                fieldTypePanel('json', 'JSON', 'JSON', '', 'panel-success')
            ]
        }
    ]
};

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.test;
}

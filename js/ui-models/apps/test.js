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

var fieldsPanelList = [
        {id: 'pl1f1',  type: 'text', label: 'Name', required:true, maxLength: 50},
        {id: 'pl1f2',  type: 'text', label: 'Text', required:true, maxLength: 100},
        {id: 'pl1f3',  type: 'lov', label: 'Sizes', required:true, list: testLOV}
    ],
    fieldsPanelList2 = [
        {id: 'pl2f1',  type: 'text', label: 'Name', maxLength: 50},
        {id: 'pl2f3',  type: 'date', label: 'Date', inMany: true},
        {id: 'pl2f4',  type: 'boolean', label: 'Bool', inMany: true},
        {id: 'pl2f2',  type: 'text', label: 'Text', maxLength: 100}
    ],
    fieldsPanelList3 = [
        {id: 'pl3f1',  type: 'text', label: 'Name', maxLength: 50},
        {id: 'pl3f2',  type: 'integer', label: 'Integer'},
        {id: 'pl3f3',  type: 'money', label: 'Money'},
        {id: 'pl3f4',  type: 'lov', label: 'Sizes', required:true, list: testLOV}
    ];

function fieldTypePanel(id, label, labelPanel, label2Panel, css){
    var labelP = labelPanel || label || id,
        label2P = label2Panel,
        fields=[
            {
                id: id,
                type: id,
                label: label,
                required: true,
                inMany: true,
                width: 100
            },
            {
                id: id+'2',
                attribute: id,
                readonly: true,
                help: 'The field "' + label+' 2" is the read-only version of "' + label+'". It\'s value is updated on save.',
                type: id,
                label: label+' 2',
                width: 100
            },
            {
                id: id+'3',
                type: id,
                label: label+' 3',
                width: 100
            }
        ];

    if(id==='list' || id==='lov'){
        fields= _.each(fields, function(f){
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
    fnTitle:'name',
    icon:'color_wheel.png',
    elements: [
        {
            type: 'panel',
            css: 'panel-primary',
            label: 'Test object',
            label2:'with fields of all types.',
            width: 100,
            elements: [
                {
                    id:'name',
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
            label: 'Collections',
            elements: [
                {
                    type: 'panel-list',
                    css: 'panel-info',
                    id:'subCollec1',
                    attribute:'subCollec1',
                    label: 'Collection 1',
                    width: 100,
                    elements: fieldsPanelList
                },
                {
                    type: 'panel-list',
                    css:'panel-info',
                    id:'subCollec2',
                    attribute:'subCollec2',
                    label: 'Collection 2',
                    width: 100,
                    elements: fieldsPanelList2
                },
                {
                    type: 'panel-list',
                    css: 'panel-primary',
                    id:'subCollec3',
                    attribute:'subCollec3',
                    label: 'Collection 3',
                    width: 100,
                    elements: fieldsPanelList3
                }
            ]
        }
    ]
};


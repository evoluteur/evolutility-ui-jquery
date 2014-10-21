
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

var fieldsPanelList = [
        {id: 'pl1f1',  type: 'text', label: 'Name', required:true, maxlength: 50, viewmany: true},
        {id: 'pl1f2',  type: 'text', label: 'Text', required:true, maxlength: 100, viewmany: true},
        {id: 'pl1f3',  type: 'lov', label: 'Sizes', required:true, list: testLOV, viewmany: true}
    ],
    fieldsPanelList2 = [
        {id: 'pl2f1',  type: 'text', label: 'Name', maxlength: 50, viewmany: true},
        {id: 'pl2f3',  type: 'date', label: 'Date', viewmany: true},
        {id: 'pl2f4',  type: 'boolean', label: 'Bool', viewmany: true},
        {id: 'pl2f2',  type: 'text', label: 'Text', maxlength: 100, viewmany: true}
    ];

function fieldTypePanel(id, label, labelPanel, css){
    var labelP = labelPanel || label || id,
        fields=[
            {
                id: id,
                type: id,
                label: label,
                required: true,
                viewmany: true,
                width: 100
            },
            {
                id: id+'2',
                attribute: id,
                readonly: true,
                help: 'The field "' + label+' 2" is readonly.',
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
        width: 33,
        elements: fields,
        css: css
    };
}

var uiModels = uiModels || {};

uiModels.test = {
    id: 'test',
    entity: 'test',
    entities: 'tests',
    title: 'Test Object',
    leadfield:'name',
    icon:'color_wheel.png',
    elements: [
        {
            type: 'panel',
            css: 'panel-primary',
            label: 'Test object',
            width: 100,
            elements: [
                {
                    id:'name',
                    type: 'text',
                    label: 'Title',
                    required: true,
                    maxlength: '150',
                    viewmany: true,
                    width: 100
                }
            ]
        },
        {
            type: 'tab',
            label: 'Text & Lists',
            elements: [
                fieldTypePanel('text', 'Text', 'Text', 'panel-success'),
                fieldTypePanel('lov', 'List', 'List (value)', 'panel-warning'),
                fieldTypePanel('list', 'List mv', 'List (multiple values)', 'panel-warning'),
                fieldTypePanel('textmultiline', 'Large Text', '', 'panel-success'),
                fieldTypePanel('html', 'HTML')
            ]
        },
        {
            type: 'tab',
            label: 'Date & Time',
            elements: [
                fieldTypePanel('date', 'Date', '', 'panel-default'),
                fieldTypePanel('time', 'Time', '', 'panel-info'),
                fieldTypePanel('datetime', 'Date and Time', '', 'panel-primary')
            ]
        },
        {
            type: 'tab',
            label: 'Numbers',
            elements: [
                fieldTypePanel('integer', 'Integer'),
                fieldTypePanel('decimal', 'Decimal'),
                fieldTypePanel('money', 'Money', 'Money', 'panel-success')
            ]
        },
        {
            type: 'tab',
            label: 'Checkbox & links',
            elements: [
                fieldTypePanel('boolean', 'Boolean'),
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
                fieldTypePanel('hidden', 'Hidden')
            ]
        },
        {
            type: 'tab',
            label: 'Collections',
            elements: [
                {
                    type: 'panel-list',
                    css: 'panel-warning',
                    id:'subCollec1',
                    attribute:'subCollec1',
                    label: 'Collection 1',
                    width: 100,
                    elements: fieldsPanelList
                },
                {
                    type: 'panel-list',
                    css:'panel-danger',
                    id:'subCollec2',
                    attribute:'subCollec2',
                    label: 'Collection 2',
                    width: 100,
                    elements: fieldsPanelList2
                }
            ]
        }
    ]
};


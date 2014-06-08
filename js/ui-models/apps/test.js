
var testLOV=[
    {text:'yotta',id:'Y'},
    {text:'zetta',id:'Z'},
    {text:'exa',id:'E'},
    {text:'peta',id:'P'},
    {text:'tera',id:'T'},
    {text:'giga',id:'G'},
    {text:'mega',id:'M'},
    {text:'kilo',id:'k'},
    {text:'hecto',id:'h'},
    {text:'deca',id:'da'}
];

var fieldsPanelList = [
        {id: 'pl1f1',  type: 'text', label: 'Name', maxlength: 100, viewmany: '1'},
        {id: 'pl1f2',  type: 'text', label: 'Text 2', maxlength: 100, viewmany: '1'},
        {id: 'pl1f3',  type: 'lov', label: 'Sizes', list: testLOV, viewmany: '1'}
    ],
    fieldsPanelList2 = [
        {id: 'pl2f1',  type: 'text', label: 'Name', maxlength: 100, viewmany: '1'},
        {id: 'pl2f3',  type: 'date', label: 'Date', viewmany: '1'},
        {id: 'pl2f4',  type: 'boolean', label: 'Bool', viewmany: '1'},
        {id: 'pl2f2',  type: 'text', label: 'Text 2', maxlength: 100, viewmany: '1'}
    ];

function fieldTypePanel(id, label, labelPanel){
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
            id: id+'3',
            attribute: id,
            readonly: true,
            help: 'The field "' + label+' 3" is readonly.',
            type: id,
            label: label+' 3',
            width: 100
        },
        {
            id: id+'2',
            type: id,
            label: label+' 2',
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
        elements: fields
    };
}

var test_ui = {
    entity: 'test',
    entities: 'tests',
    title: 'Test Object',
    leadfield:'name',
    elements: [
        {
            type: 'panel',
            label: 'Testing Evolutility',
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
                fieldTypePanel('text', 'Text'),
                fieldTypePanel('lov', 'List', 'List (value)'),
                fieldTypePanel('list', 'List mv', 'List (multiple values)'),
                fieldTypePanel('textmultiline', 'Large Text'),
                fieldTypePanel('html', 'HTML')
            ]
        },
        {
            type: 'tab',
            label: 'Date & Time',
            elements: [
                fieldTypePanel('date', 'Date'),
                fieldTypePanel('time', 'Time'),
                fieldTypePanel('datetime', 'Date and Time')
            ]
        },
        {
            type: 'tab',
            label: 'Numbers',
            elements: [
                fieldTypePanel('integer', 'Integer'),
                fieldTypePanel('decimal', 'Decimal'),
                fieldTypePanel('money', 'Money')
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
                    id:'degustations2',
                    attr:'degustation2',
                    label: 'Collection 1',
                    width: 100,
                    elements: fieldsPanelList
                },
                {
                    type: 'panel-list',
                    id:'degustations3',
                    attr:'degustation3',
                    label: 'Collection 2',
                    width: 100,
                    elements: fieldsPanelList2
                }
            ]
        }
    ]
};


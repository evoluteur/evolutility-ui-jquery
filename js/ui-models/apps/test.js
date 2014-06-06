
var bottleSizes=[
    {id:750, text: '750 ml'},
    {id:500, text: '500 ml'},
    {id:375, text: '375 cl'},
    {id:1500, text: '1.5 L'},
    {id:3000, text: '3.0 L'},
    {id:6000, text: '6.0 L'},
    {id:8000, text: '8.0 L'}
];

var degustationFields = [
    {id: 'str1',  type: 'text', label: 'Text 1', maxlength: 100, viewmany: '1'},
    {id: 'str2',  type: 'text', label: 'Text 2', maxlength: 100, viewmany: '1'},
    {id: 'str3',  type: 'lov', label: 'LOV 100', list: bottleSizes, viewmany: '1'}
];

function fieldTypePanel(id, label){
    var fields=[
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
            f.list=bottleSizes;
        });
    }
    if(id===''){
        fields= _.each(fields, function(f){
            f.list=bottleSizes;
        });
    }

    return {
        type: 'panel',
        label: label || id,
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
            label: 'General',
            elements: [
                fieldTypePanel('text', 'Text'),
                fieldTypePanel('lov', 'LoV'),
                fieldTypePanel('list', 'List')
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
            label: 'Image & Color',
            elements: [
                fieldTypePanel('image', 'Image'),
                fieldTypePanel('color', 'Color'),
                {
                    type: 'panel',
                    label: 'HTML',
                    width: 33,
                    elements: [
                        {
                            id: 'html',
                            type: 'html',
                            label: 'HTML',
                            maxlength: 5000,
                            width: 100,
                            height: 8
                        }

                    ]
                }
            ]
        },
        {
            type: 'tab',
            label: 'Text big',
            elements: [
                {
                    type: 'panel',
                    label: 'Text multilines',
                    width: 99,
                    elements: [
                        {
                            id: 'notes',
                            required: true,
                            type: 'textmultiline',
                            label: 'Big Text',
                            maxlength: 300,
                            width: 33,
                            height: 4
                        },
                        {
                            id: 'notes2',
                            type: 'textmultiline',
                            label: 'Big Text 2',
                            maxlength: 10,
                            help: 'maxlength = 10 for testing',
                            width: 33,
                            height: 4
                        },
                        {
                            id: 'notes3',
                            attribute: 'notes',
                            readonly: true,
                            type: 'textmultiline',
                            label: 'Big Text 3',
                            maxlength: 300,
                            width: 34,
                            height: 4
                        }

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
                    elements: degustationFields
                },
                {
                    type: 'panel-list',
                    id:'degustations3',
                    attr:'degustation3',
                    label: 'Collection 2',
                    width: 100,
                    elements: degustationFields
                }
            ]
        }
    ]
};


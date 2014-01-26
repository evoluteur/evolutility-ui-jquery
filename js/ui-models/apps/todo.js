
var todo_ui = {
    id: 5,
    label: 'To Do',
    entity: 'task',
    entities: 'tasks',
    icon: 'todo.gif',
    leadfield:'title',
    elements: [
        {
            type: 'panel', label: 'Task', width: 62,
            elements: [
                {
                    id: 'title', type: 'text', label: 'Title', required: true,
                    placeholder: 'Call John',
                    css: 'FieldMain', maxlength: 255,
                    width: 100, viewmany: true
                },
                {
                    id: 'duedate', type: 'date', label: 'Due Date', width: 62, viewmany: true
                },
                {
                    id: 'category', type: 'lov', label: 'Category', width: 38, viewmany: true,
                    list: [
                        {id: 'home', text: 'Home'},
                        {id: 'work', text: 'Work'},
                        {id: 'fun', text: 'Fun'},
                        {id: 'others', text: 'Others'},
                        {id: 'misc', text: 'Misc.'}
                    ]
                }
            ]
        },
        {
            type: 'panel', label: 'Status', width: 38,
            elements: [
                {
                    id: 'priority', type: 'lov', label: 'Priority', required: true,
                    width: 100,  viewmany: true,
                    list: [
                        {id: '1', text: '1 - ASAP'},
                        {id: '2', text: '2 - Urgent'},
                        {id: '3', text: '3 - Important'},
                        {id: '4', text: '4 - Medium'},
                        {id: '5', text: '5 - Low'}
                    ]
                },
                {
                    id: 'complete', type: 'boolean', label: 'Complete', width: 100, viewmany: true
                }
            ]
        },
        {
            type: 'panel', label: 'Notes', width: 100,
            elements: [
                {id: 'notes', type: 'textmultiline', label: 'Notes', maxlength: 1000,
                    width: 100, height: 6, viewmany: false }
            ]
        }
    ]
};


var todo_ui = {
    id: 5,
    label: 'To Do',
    entity: 'task',
    entities: 'tasks',
    icon: 'todo.gif',
    elements: [
        {type: 'panel', label: 'Task', width: 62,
            elements: [
                {id: 'title', type: 'text', label: 'Title', required: true,
                    placeholder: 'Call John',
                    cssclass: 'FieldMain', maxlength: 255,
                    width: 100, search: true, viewmany: true},
                {id: 'duedate', type: 'date', label: 'Due Date', width: 40, search: true, viewmany: true},
                {id: 'category', type: 'lov', label: 'Category', width: 60, search: true, viewmany: true,
                    list: [
                        {id: 'home', text: 'Home'},
                        {id: 'work', text: 'Work'},
                        {id: 'fun', text: 'Fun'},
                        {id: 'others', text: 'Others'},
                        {id: 'misc', text: 'Misc.'}
                    ]
                }
            ]},
        {type: 'panel', label: 'Status', width: 38,
            elements: [
                {id: 'priority', type: 'lov', label: 'Priority', required: true,
                    width: 100, search: 2, viewmany: true,
                    list: [
                        {id: '1', text: '1 - ASAP'},
                        {id: '2', text: '2 - Urgent'},
                        {id: '3', text: '3 - Important'},
                        {id: '4', text: '4 - Medium'},
                        {id: '5', text: '5 - Low'}
                    ]
                },
                {id: 'complete', type: 'boolean', label: 'Complete', width: 100, search: true, viewmany: true}
            ] },
        {type: 'panel', label: 'Notes', width: 100,
            elements: [
                {id: 'notes', type: 'textmultiline', label: 'Notes', maxlength: 1000,
                    width: 100, height: 6, viewmany: false }
            ]
        }
    ]};

todo_data = function(){
    var today=new Date();
    function date2string(nbDays){
        var d=new Date();
        d.setDate(today.getDate()+nbDays);
        return d;
    }
    return [
        {ID: '322', title: 'Test', duedate: date2string(10), priority: '2', category: 'others', complete: false, notes: ''},
        {ID: '304', title: 'Another task', duedate: date2string(15), priority: '3', Category: 'work', complete: false, notes: 'bla bla'},
        {ID: '335', title: 'Testing App', duedate: date2string(30), priority: '3', Category: 'work', complete: false, notes: 'test'},
        {ID: '343', title: 'Demo Task', duedate: date2string(20), priority: '1', Category: 'work', complete: false, notes: 'Check this out'},
        {ID: '344', title: 'Test done', duedate: date2string(-2), priority: '5', Category: 'misc', complete: true, notes: 'notes for my test todo task\nthis is pretty nice with different fonts.\n\n,,'},
        {ID: '345', title: 'Teste do meu TODO', duedate: date2string(61), priority: '2', Category: 'misc', complete: false, notes: 'teste'},
        {ID: '346', title: 'Car wash', duedate: date2string(14), priority: '4', Category: 'work', complete: false, notes: ''},
        {ID: '347', title: 'Watch Inception', duedate: date2string(30), priority: '5', Category: 'fun', complete: false, notes: ''},
        {ID: '348', title: 'Test TODO', duedate: date2string(2), priority: '1', Category: 'work', complete: true, notes: 'Test TODO '}
    ]
}
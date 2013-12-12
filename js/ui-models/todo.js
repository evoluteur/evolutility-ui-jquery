
var todo_ui = {
    id: 5,
    label: "To Do",
    entity: "task",
    entities: "tasks",
    icon: "todo.gif",
    elements: [
        {type: "panel", label: "Task", width: "62",
            elements: [
                {id: "title", type: "text", label: "Title", required: "1",
                    placeholder: 'Task title',
                    cssclass: "FieldMain", maxlength: "255",
                    width: "100", search: true, searchlist: true},
                {id: "duedate", type: "date", label: "Due Date", width: "40", search: true, searchlist: true},
                {id: "CategoryID", type: "lov", label: "Category", width: "60", search: true, searchlist: true,
                    list: [
                        {id: "Bz", label: "Work"},
                        {id: "Fr", label: "Home"},
                        {id: "Fa", label: "Hobbies"}
                    ]
                }
            ]},
        {type: "panel", label: "Status", width: "38",
            elements: [
                {id: "PriorityID", type: "lov", label: "Priority", required: true,
                    width: "100", search: "2", searchlist: "2", 
                    list: [
                        {id: "1", label: "1 - ASAP"},
                        {id: "2", label: "2 - Urgent"},
                        {id: "3", label: "3 - Important"},
                        {id: "4", label: "4 - Medium"},
                        {id: "5", label: "5 - Low"}
                    ]
                },
                {id: "Complete", type: "boolean", label: "Complete", width: "100", search: true, searchlist: true}
            ] },
        {type: "panel", label: "Notes", width: "100",
            elements: [
                {id: "notes", type: "textmultiline", label: "Notes", maxlength: "1000",
                    width: "100", height: "6", searchlist: "0" }
            ]
        }
    ]};

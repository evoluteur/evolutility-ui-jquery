var uiModels = uiModels || {};
uiModels.todo_data = [
    {id: '1', title: 'Release Evolutility v1', priority: '3', category: 'others', complete: false, project:['1','2','3'], description: '10 generic views + a ui-modeling language.', notes:''},
    {id: '2', title: 'Fix open bugs', duedate: '2016-07-25', priority: '3', category: 'work', project:['1','2'], complete: false, description: 'Not much left.'},
    {id: '3', title: 'Testing App', duedate: '2016-06-11', priority: '3', category: 'work', complete: false, project:['1', '2','3'], description: 'test'},
    {id: '4', title: 'Prepare demo', duedate: '2016-05-12', priority: '1', category: 'work', complete: false, project:['4'], description: 'Check this out'},
    {id: '5', title: 'Test latest code', priority: '5', category: 'misc', complete: true, project:['1','2','3'], description: 'notes for my test todo task.'},
    {id: '6', title: 'Car wash', priority: '4', category: 'work', project:['10'], complete: false},
    {id: '7', title: 'Watch Inception', duedate: '2016-01-10', priority: '5', category: 'fun', project:['10'], complete: true},
    {id: '8', title: 'Test TODO', duedate: '2017-01-01', priority: '1', category: 'work', project:['2','3'], complete: true, description: 'Test TODO '},
    {id: '9', title: 'Dentist', priority: '3', category: 'home', complete: true},
    {id: '10', title: 'French translation', priority: '3', category: 'work', project:['5'], complete: true},
    {id: '11', title: 'Italian translation', priority: '4', category: 'work', project:['5']},
    {id: '12', title: 'Chinese translation', priority: '3', category: 'work', project:['5']},
    {id: '13', title: 'Japanese translation', priority: '4', category: 'work', project:['5']},
    {id: '14', title: 'German translation', priority: '4', category: 'work', project:['5']},
    {id: '15', title: 'Russian translation', priority: '4', category: 'work', project:['5']},
    {id: '16', title: 'Polish translation', priority: '4', category: 'work', project:['5']},
    {id: '17', title: 'Klingon translation', priority: '4', category: 'work', project:['5']},
    {id: '18', title: 'Code optimization', duedate: '2017-01-01', priority: '4', category: 'work', project:['1','2','4'], complete: false},
    {id: '19', title: 'Setup demo server', priority: '2', category: 'work', complete: false, project:['4']},
    {id: '20', title: 'Add sample data', duedate: '2016-04-23', priority: '3', category: 'work', project:['1','2','3'], complete: true},
    {id: '21', title: 'Make proposal', priority: '2', category: 'misc', project:['4'], complete: false},
    {id: '22', title: 'Checkout cool restaurant', priority: '3', category: 'fun', project: ['4','10'], complete: false},
    {id: '23', title: 'Kill the vampires', priority: '3', project:['10'], category: 'others'}
];

if(typeof module === "object" && typeof module.exports === "object"){
    module.exports = uiModels.todo_data;
}

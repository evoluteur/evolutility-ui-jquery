
var todo_data = function(){
    var today=new Date();
    function date2string(nbDays){
        var d=new Date();
        d.setDate(today.getDate()+nbDays);
        return d;
    }
    return [
        {id: '322', title: 'Test', duedate: date2string(10), priority: '2', category: 'others', complete: false, notes: ''},
        {id: '304', title: 'Another task', duedate: date2string(15), priority: '3', category: 'work', complete: false, notes: 'bla bla'},
        {id: '335', title: 'Testing App', duedate: date2string(30), priority: '3', category: 'work', complete: false, notes: 'test'},
        {id: '343', title: 'Demo Task', duedate: date2string(20), priority: '1', category: 'work', complete: false, notes: 'Check this out'},
        {id: '344', title: 'Test done', duedate: date2string(-2), priority: '5', category: 'misc', complete: true, notes: 'notes for my test todo task\nthis is pretty nice with different fonts.\n\n,,'},
        {id: '345', title: 'Teste do meu TODO', duedate: date2string(61), priority: '2', category: 'misc', complete: false, notes: 'teste'},
        {id: '346', title: 'Car wash', duedate: date2string(14), priority: '4', category: 'work', complete: false, notes: ''},
        {id: '347', title: 'Watch Inception', duedate: date2string(30), priority: '5', category: 'fun', complete: false, notes: ''},
        {id: '348', title: 'Test TODO', duedate: date2string(2), priority: '1', category: 'work', complete: true, notes: 'Test TODO '}
    ];
};
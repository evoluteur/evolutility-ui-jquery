var EvoDoc = _.sortBy([

/*    Methods    */
/*
    Methods for One & Many
*/
{
    name: 'render()',
    type: 'method',
    one: true,
    many: true,
    description: 'Renders the view in the DOM.'
},
{
    name: 'getFields()',
    type:'method',
    one: true,
    many: true,
    description: 'Returns an array of the UI-model fields present in the view.'
},
{
    name: 'getModel(), setModel(model)',
    type:'method',
    one: true,
    many: true,
    description: 'Gets or sets the Backbone model.'
},
{
    name: 'getUIModel(), setUIModel(uiModel)',
    type:'method',
    one: true,
    many: true,
    description: 'Gets or sets the UI model.'
},
{
    name: 'getTitle(), setTitle(title)',
    type:'method',
    one: true,
    many: true,
    description: 'Gets or sets the view title.'
},
{
    name: 'setDefaults',
    type:'method',
    one: true,
    many: true,
    description: 'Sets all fields to their default value.'
},

/*
    Methods for One
*/
{
    name: 'clear()',
    type:'method',
    one: true,
    many: false,
    description: 'Clears the content of all fields.'
},
{
    name: 'clearErrors()',
    type:'method',
    one: true,
    many: false,
    description: 'Remove previous validation warnings.'
},
{
    name: 'getData()',
    type:'method',
    one: true,
    many: false,
    description: 'setData(data): Gets or sets all fields values at the same time (similar but different than getModel and setModel).'
},
{
    name: 'getFieldValue(fid), setFieldValue(fid, value)',
    type:'method',
    one: true,
    many: false,
    description: 'Gets or sets the value of a specific field.'
},
{
    name: 'getFieldProp(fid, property), setFieldProp(fid, property, value)',
    type:'method',
    one: true,
    many: false,
    description: 'Gets or sets a field property for a specific field. Supported properties: "value", "enabled", "visible".'
},
{
    name: 'getSubCollecs()',
    type:'method',
    one: true,
    many: false,
    description: 'Returns an array of sub-collections definitions from the UI-model.'
},
{
    name: 'validate()',
    type:'method',
    one: true,
    many: false,
    description: 'Validates all fields and shows warnings if necessary.'
},

/*
    Methods for Many
*/
{
    name: 'getCollection(), setCollection(collec)',
    type:'method',
    one: false,
    many: true,
    description: 'Gets or sets the collection.'
},
{
    name: 'getFilter(), setFilter(filter)',
    type:'method',
    one: false,
    many: true,
    description: 'Gets or sets the collection filter (from Evol.ViewAction.Filter).'
},
{
    name: 'getPage(), setPage(pageIndex)',
    type:'method',
    one: false,
    many: true,
    description: 'Gets or sets the page index for pagination.'
},
{
    name: 'sortList(field, upOrDown, [noRemember], [noTrigger])',
    type:'method',
    one: false,
    many: true,
    description: 'Sorts the list by a specific field.'
},
{
    name: 'getSelection(), setSelection([fieldId])',
    type:'method',
    one: false,
    many: true,
    description: 'Gets or sets rows selection.'
},

/*
    Methods for Filter (Evol.ViewAction.Filter)
*/
{
    name: 'val',
    type:'method',
    one: false,
    many: false,
    view: 'filter',
    description: 'Returns the filter value.'
},
{
    name: 'valText',
    type:'method',
    one: false,
    many: false,
    view: 'filter',
    description: 'Returns the filter value as a single string.'
},
{
    name: 'clear',
    type:'method',
    one: false,
    many: false,
    view: 'filter',
    description: 'Remove all filter conditions.'
},
{
    name: 'addCondition(condition), removeCondition(index)',
    type:'method',
    one: false,
    many: false,
    view: 'filter',
    description: 'Default value = false.'
},

/*
    Methods for Export (Evol.ViewAction.Export)
*/
{
    name: 'val',
    type:'method',
    one: false,
    many: false,
    view: 'export',
    description: 'Returns the selected export settings.'
},


/*    Options    */

/*
    Options for One & Many
*/
{
    name: 'iconsPath',
    type:'option',
    one: true,
    many: true,
    description: 'Path to icons for model and list of values.'
},
{
    name: 'model',
    type:'option',
    one: true,
    many: true,
    description: 'Backbone model managed by the component.'
},

/*
    Options for One
*/
{
    name: 'button_addAnother',
    type:'option',
    one: true,
    many: false,
    description: 'Show a "Save and Add Another" button next to "Save". Default value = false.'
},

/*
    Options for Many
*/
{
    name: 'collection',
    type:'option',
    one: false,
    many: true,
    description: 'Backbone collection managed by the component.'
},

/*
    Options for List and Cards
*/ 
{
    name: 'pageSize',
    type:'option',
    one: false,
    many: true,
    view: ['list', 'cards'],
    description: 'Maximum number of models per page. Default value = 20.'
},
{
    name: 'pageIndex',
    type:'option',
    one: false,
    many: true,
    view: ['list', 'cards'],
    description: 'Index of the current page. Default value = 0.'
},
{
    name: 'selectable',
    type:'option',
    one: false,
    many: true,
    view: ['list', 'cards'],
    description: 'Specify if a checkbox will be displayed for each model. Default value = false.'
},


/*
    Options for Filter
*/ 
{
    name: 'pageSize',
    type:'option',
    one: false,
    many: true,
    view: ['list', 'cards'],
    description: 'Maximum number of models per page. Default value = 20.'
}, 
{
    name: 'buttonLabels',
    type:'option',
    view: 'filter',
    description: 'coma separated list of all buttons labels.'
}, 


/*
    Options for Export
*/ 
{
    name: 'sampleMaxSize',
    type:'option',
    view: 'export',
    description: 'Maximum number of models per page. Default value = 20.'
},
{
    name: 'formats',
    type:'option',
    view: 'export',
    description: 'List of possible export formats (in this list: CSV, TAB, HTML, JSON, XML, SQL).'
},
{
    name: 'collection',
    type:'option',
    view: 'export',
    description: 'Backbone collection to use for the export sample.'
},


/*    Events    */

/*
    Events for One (Edit, View, Mini, JSON)
*/
{
    name: 'action',
    type:'event',
    one: true,
    many: false,
    description: 'Triggered when buttons are clicked. data = "add", "add-new", "cancel", "validate".'
},
{
    name: 'toggle.panel',
    type:'event',
    one: true,
    many: false,
    description: 'Triggered when a panel is expended or collapsed.'
},
{
    name: 'change.tab',
    type:'event',
    one: true,
    many: false,
    description: 'Triggered when the active tab changes.'
},


/*
    Events for List and Cards
*/
{
    name: 'selection.many',
    type:'event',
    many:true,
    view:['list', 'cards'],
    description: 'Triggered when the selection changes.'
},
{
    name: 'navigate.many',
    type:'event',
    many:true,
    description: 'Triggered when a link to a model is clicked.'
},
{
    name: 'sort.many',
    type:'event',
    many:true,
    description: 'Triggered when the list order is changed.'
},
{
    name: 'paginate.many',
    type:'event',
    many:true,
    description: 'Triggered on pagination.'
},


/*
    Events for Filter
*/
{
    name: 'change.filter',
    type:'event',
    view: 'filter',
    description: 'Triggered when a filter condition changes.'
},
{
    name: 'close.filter',
    type:'event',
    view: 'filter',
    description: 'Triggered when the filter close button is clicked.'
},
{
    name: 'submit.filter',
    type:'event',
    view: 'filter',
    description: 'Triggered on submit (if options allow the submit button).'
},

/*
    Events for Export
*/
{
    name: 'action',
    type:'event',
    view: 'export',
    description: 'Triggered when the "Download" button is clicked. data = format.'
},
{
    name: 'change.export',
    type:'event',
    view: 'export',
    description: 'Triggered when any export setting changes.'
}
],'name');

function enhanceViewDefinitions(){
    var itemHtml = function(m){
            return '<p><strong>'+m.name+'</strong>:&nbsp;'+m.description+'</p>';
        },
        viewsHtml = function (selector, namespace, opts){//<a name="one" class="evo-anchor">&nbsp;</a>
            var h='<a name="'+selector+'-api" class="evo-anchor">&nbsp;</a><h3>API for "'+selector+'" <span class="view-fullname">'+namespace+'</span></h3>';
            opts.type='option';
            h += '<a name="'+selector+'-api-options" class="evo-anchor">&nbsp;</a><h4><i class="glyphicon glyphicon-list-alt"></i>&nbsp;Options</h4>';
            h += _.map(_.where(EvoDoc, opts), itemHtml).join('');
            opts.type='method';
            h += '<a name="'+selector+'-api-methods" class="evo-anchor">&nbsp;</a><h4><i class="glyphicon glyphicon-console"></i>&nbsp;Methods</h4>';
            h += _.map(_.where(EvoDoc, opts), itemHtml).join('');
            opts.type='event';
            h += '<a name="'+selector+'-api-events" class="evo-anchor">&nbsp;</a><h4><i class="glyphicon glyphicon-flash"></i>&nbsp;Events</h4>';
            h += _.map(_.where(EvoDoc, opts), itemHtml).join('');

            $('#vw-'+selector).append(h);
        };

    viewsHtml('one', 'Evol.ViewOne', {one:true});
    viewsHtml('many', 'Evol.ViewMany', {many:true});
    viewsHtml('filter', 'Evol.ViewAction.Filter', {view:'filter'});
    viewsHtml('export', 'Evol.ViewAction.Export', {view:'export'});
    
}


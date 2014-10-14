# Evolutility.js

Evolutility provides a set of generic Backbone Views to browse, edit, filter, export and chart Backbone models and collections of different structures.
With it you configure views with metadata instead of hand-coding templates, Javascript and CSS.

## Demo apps

[To Do list](http://evoluteur.github.io/evolutility/demo/index.html#todo/list),
[AddressBook](http://evoluteur.github.io/evolutility/demo/index.html#contact/list),
[Wine Cellar](http://evoluteur.github.io/evolutility/demo/index.html#winecellar/list).

## Views

Evolutility's views have a Backbone model (to define the data) and also a UI-model (to define the UI for this model).

All views for a Backbone model and collection are defined by only one UI-Model acting as a single source of truth for the definition of all UI elements across views.

Evolutility provides 3 types of view
* Views for a model: View, Edit, Mini (quick edit), JSON.
* Views for a collection: List, Badges, Charts.
* Views for actions on a model or collection: Export, Filter.

A large part of the API (methods, options and events) is common to all views. Some views have additional API.

## Views for One model
### View
Shows all fields for viewing (read only). Fields are grouped in panels and tabs.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/one-view.png)
```javascript
var vw = new Evol.ViewOne.View(myConfig);
```
### Edit
This view shows all fields for edition to create or update models.
It automatically performs validation based on the UI-model and supports the Master-Details pattern (nested collections).
Fields are grouped in panels and tabs.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/one-edit.png)
```javascript
var vw = new Evol.ViewOne.Edit(myConfig);
```
### Mini (Quick Edit)
Only shows important fields (required or showing as a column in grids). Fields are grouped in a single panel.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/one-mini.png)
```javascript
var vw = new Evol.ViewOne.Mini(myConfig);
```
### JSON
JSON representation of the data.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/one-json.png)
```javascript
var vw = new Evol.ViewOne.JSON(myConfig);
```

## Views for a collection of Many models
### List
Gives a tabular view of a collection with paging.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/many-list.png)
```javascript
var vw = new Evol.ViewMany.List(myConfig);
```
### Badges
Shows records side by side as badges.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/many-badges.png)
```javascript
var vw = new Evol.ViewMany.Badges(myConfig);
```
### Charts
Draws charts about the collection.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/many-charts.png)
```javascript
var vw = new Evol.ViewMany.Charts(myConfig);
```

## Views for Actions
Backbone Views for actions on a collection or a model.
### Export
View to define export options and preview the collection export in different data formats (CSV, TAB, HTML, XML, SQL and JSON).
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/action-export.png)
```javascript
var vw = new Evol.ViewAction.Export(myConfig);
```
### Filter
View used to build a structured query to filter a collection.
![screenshot 1](https://raw.githubusercontent.com/evoluteur/evolutility/master/doc/screenshots/action-filter.png)
```javascript
var vw = new Evol.ViewAction.Filter(myConfig);
```

[Live demo](http://evoluteur.github.io/evolutility/index.html) of these views.

More Views will be added in the future (thinking of Summary, Import, Mass update, Group, Dashboard, Report, PDF, Auto-documentation and specs...).


## UI-model

Views are not defined in templates but configured with a UI-model using [vocabulary](http://evoluteur.github.io/evolutility/doc/ui-model.html) with words like "field", "panel" and "tab" rather than "INPUT" and "DIV" to describe UI elements.

Here is the UI model used to configure all views for the ["To Do" app demo](http://evoluteur.github.io/evolutility/demo/index.html#todo/list):

```javascript
var UIModel_todo = {
    id: 'todo',
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
                    maxlength: 255, width: 100, viewmany: true
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
```

See [UI-Model documentation](http://evoluteur.github.io/evolutility/doc/ui-model.html) for the UI vocabulary available (structure of UI-models or metamodel).

UI Models for the demo apps:
[To Do list](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/todo.js),
[AddressBook](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/contacts.js),
[Wine Cellar](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/winecellar.js).

With Evolutility, a single UI-model defines a full single page applications (SPA) to view, edit, filter and export a Backbone model or collection.

Try it now: Download Evolutility.JS, make modification to the demo UI-models by adding and modifying fields and panels and see the demo apps become your apps.

## Stack and dependencies

Javascript, HTML5, CSS3,
[Backbone] (http://backbonejs.org),
[Underscore] (http://underscorejs.org/),
[jQuery] (http://jquery.com),
[Bootstrap] (http://getbootstrap.com/),
[Bootstrap-datepicker] (http://eternicode.github.io/bootstrap-datepicker/),
[Select2] (http://ivaynberg.github.io/select2/).

## Documentation

Some documentation is in progress at [this page] (http://evoluteur.github.io/evolutility/doc/index.html).

## Previous incarnation

Evolutility.js is a re-write of [Evolutility] (http://www.evolutility.org) generic CRUD UI for ASP.net.


## License

Copyright (c) 2014 Olivier Giulieri.

Evolutility.js is released under the GNU Affero General Public License version 3 [GNU AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html).


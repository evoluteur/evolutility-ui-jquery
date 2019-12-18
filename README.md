# Evolutility-UI-jQuery

Evolutility-UI-jQuery provides a set of generic Backbone Views to browse, edit, filter, export and chart Backbone models and collections of different structures.
With it you can make web applications by configuring views with metadata instead of hand-coding templates, Javascript and CSS.

By default Evolutility-UI-jQuery uses your browser local storage to store data (easier for demos because there is no server or database to setup).

[Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node) provides a matching RESTful API using Node.js, Express, and Postgres. 

## Demo apps

Sample Single Page Apps made with Evolutility: 
[To Do list](http://evoluteur.github.io/evolutility-ui-jquery/demo/index.html#todo/list),
[AddressBook](http://evoluteur.github.io/evolutility-ui-jquery/demo/index.html#contact/list),
[Wine Cellar](http://evoluteur.github.io/evolutility-ui-jquery/demo/index.html#winecellar/list),
[Graphic Novels](http://evoluteur.github.io/evolutility-ui-jquery/demo/index.html#comics/cards).

## Installation

[Download](https://github.com/evoluteur/evolutility-ui-jquery/archive/master.zip) or **clone** Evolutility-UI-jQuery from GitHub.

```bash
# To get the latest stable version, use git from the command line.
git clone https://github.com/evoluteur/evolutility-ui-jquery
```

By default, Evolutility-UI-jQuery is configured use localStorage for storing data. To make it work with a REST API:

- specify the REST root endpoint using the "url" attribute in the "config.js" file,
- run Grunt (to rebuild evolutility-ui-jquery.js (or evolutility-ui-jquery.min.js),
- move the app to a web server.

```bash
# To rebuild the project
cd evolutility-ui-jquery
bower install
grunt
```

For the matching RESTful API you will also need to setup [Evolutility-Server-Node](https://github.com/evoluteur/evolutility-server-node). 



## Views

Evolutility-UI-jQuery's views have a Backbone model (to define the data) and also a UI-model (to define the UI to display the data and interact with it).

All views for a Backbone model and collection share a single UI-Model which defines of all UI elements across views in a simple declarative way.

Evolutility-UI-jQuery provides 3 types of views

* Views for a model: [Browse](#browse), [Edit](#edit), [Mini (quick edit)](#mini), [JSON](#json).
* Views for a collection: [List](#list), [Cards](#cards), [Bubbles](#bubbles), [Charts](#charts).
* Views for actions on a model or collection: [Filter](#filter), [Export](#export), [Import](#import).

A large part of the API (methods, options and events) is common to all views. Some views have additional API.

## Views for One model
### Browse
Shows all fields for viewing (read only). Fields are grouped in panels and tabs.

![Browse](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/one-browse.gif)
```javascript
var vw = new Evol.ViewOne.Browse({
            el: myElement,
            uiModel: myUIModel,
            model: myModel
        });
```

Code: [/js/view-one/one-browse.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-one/one-browse.js)

### Edit
This view shows all fields for edition to create or update models.
It automatically performs validation based on the UI-model and supports the Master-Details pattern (nested collections).
Fields are grouped in panels and tabs.

![Edit](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/one-edit.gif)
```javascript
var vw = new Evol.ViewOne.Edit({
            el: myElement,
            uiModel: myUIModel,
            model: myModel
        });
```

Code: [/js/view-one/one-edit.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-one/one-edit.js)

### Mini
Used for quick edits. Only shows important fields (required or showing as a column in grids). Fields are grouped in a single panel.

![Mini](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/one-mini.gif)
```javascript
var vw = new Evol.ViewOne.Mini({
            el: myElement,
            uiModel: myUIModel,
            model: myModel
        });
```

Code: [/js/view-one/one-mini.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-one/one-mini.js)

### JSON
JSON representation of the data.

![JSON](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/one-json.gif)
```javascript
var vw = new Evol.ViewOne.JSON({
            el: myElement,
            uiModel: myUIModel,
            model: myModel
        });
```

Code: [/js/view-one/one-json.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-one/one-json.js)

## Views for a collection of Many models
### List
Gives a tabular view of a collection with paging.

![List](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/many-list.gif)
```javascript
var vw = new Evol.ViewMany.List({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-many/many-list.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-many/many-list.js)

### Cards
Shows records side by side as cards.

![Cards](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/many-cards.gif)
```javascript
var vw = new Evol.ViewMany.Cards({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-many/many-cards.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-many/many-cards.js)

### Bubbles
The "Bubbles" view displays the data as bubbles with controls to group them and set their color and size (this view uses D3.js). 
    A tooltip with the Card view of the item show on mouse over.

![Bubbles](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/many-bubbles.gif)
```javascript
var vw = new Evol.ViewMany.Bubbles({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-many/many-bubbles.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-many/many-bubbles.js) and [/js/view-many/many-bubbles-d3.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-many/many-bubbles-d3.js)

### Charts
Draws charts about the collection.

![Charts](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/many-charts.gif)
```javascript
var vw = new Evol.ViewMany.Charts({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-many/many-charts.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-many/many-charts.js)

## Views for Actions
Backbone Views for actions on a collection or a model.
### Filter
View used to build a structured query to filter a collection.

![Filter](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/action-filter.gif)
```javascript
var vw = new Evol.ViewAction.Filter({
            el: myElement,
            uiModel: myUIModel
        });
```

Code: [/js/view-action/action-filter.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-action/action-filter.js)

### Export
View to define export options and preview the collection export in different data formats (CSV, TAB, HTML, XML, SQL and JSON).

![Export](https://raw.githubusercontent.com/evoluteur/evolutility-ui-jquery/master/doc/screenshots/action-export.gif)
```javascript
var vw = new Evol.ViewAction.Export({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-action/action-export.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-action/action-export.js)

### Import
View to import data from a CSVor JSON file. It is a work in progress.

```javascript
var vw = new Evol.ViewAction.Import({
            el: myElement,
            uiModel: myUIModel,
            collection: myCollection
        });
```

Code: [/js/view-action/action-import.js](https://github.com/evoluteur/evolutility-ui-jquery/blob/master/js/view-action/action-filter.js)


## UI-model

Views are not defined in templates but configured with a UI-model using a [vocabulary](http://evoluteur.github.io/evolutility-ui-jquery/doc/ui-model.html) with words like "field", "panel" and "tab" rather than "input" and "div" to describe UI elements.

Here is the UI-model used to configure all views for the ["Graphic Novels" app demo](http://evoluteur.github.io/evolutility-ui-jquery/demo/index.html#comics/cards):

Try it now: [Download Evolutility-UI-jQuery](https://github.com/evoluteur/evolutility-ui-jquery/archive/master.zip), make modification to the demo UI-models (in the "model" sub-directory) by adding and modifying fields and panels and see the demo apps become your apps.

```javascript

var uiModels_comics = {
    id: 'comics',
    label: 'Graphic Novels',
    name: 'graphic novel serie',
    namePlural: 'graphic novel series',
    fnTitle: 'title',
    fnBadge: function(m){
        var hNb=m.get('haveNb'),
            sNb=m.get('serieNb');
        return (hNb==sNb)?hNb:hNb+'/'+sNb;
    },
    elements: [
        {
            type: 'panel', label: 'Serie', width: 70,
            elements: [
                {
                    id: 'title', attribute: 'title', type: 'text', 
                    label: 'Title', required: true, 
                    maxLength: 255,
                    width: 62, inMany: true
                },
                {
                    id: 'genre', attribute: 'genre', type: 'lov', 
                    label: 'Genre', width: 38, inMany: true,
                    list: [
                        {id: 1, text: 'Adventure'},
                        {id: 2, text: 'Fairy tale'},
                        {id: 3, text: 'Erotic'},
                        {id: 4, text: 'Fantastic'},
                        {id: 5, text: 'Heroic Fantasy'},
                        {id: 6, text: 'Historic'},
                        {id: 7, text: 'Humor'},
                        {id: 8, text: 'One of a kind'},
                        {id: 9, text: 'Youth'},
                        {id: 10, text: 'Thriller'},
                        {id: 11, text: 'Science-fiction'},
                        {id: 12, text: 'Super Heros'},
                        {id: 13, text: 'Western'} 
                    ]
                },
                {
                    id: 'authors', attribute: 'authors', type: 'text', 
                    label: 'Authors', width: 62, inMany: true
                },
                {
                    id: 'language', attribute: 'language', type: 'lov', 
                    label: 'Language', width: 38, inMany: false,
                    list: [
                        {id: 2, text: 'French', icon:'flag_fr.gif'},
                        {id: 1, text: 'American', icon:'flag_us.gif'}                    ]
                },
                {
                    id: 'serie_nb', attribute: 'serie_nb', type: 'integer', 
                    label: 'Albums', width: 15, inMany: false,
                    inCharts: false 
                },
                {
                    id: 'have_nb', attribute: 'have_nb', type: 'integer',
                    label: 'Owned', width: 15, inMany: false, 
                    inCharts:false 
                },
                {
                    id: 'have', attribute: 'have', type: 'text',
                    label: 'have', width: 32, inMany: false 
                },
                {
                    id: 'complete', attribute: 'complete', type: 'boolean',
                    label: 'Complete', width: 19, inMany: true, 
                    labelFalse:'Incomplete', labelTrue:'Complete'
                },
                {
                    id: 'finished', attribute: 'finished', type: 'boolean', 
                    label: 'Finished', width: 19, inMany: true,
                    labelTrue:'Finished', labelFalse:'Unfinished', css:'cBlue'
                },
                {
                    id:'amazon', type:'formula', 
                    label:'Amazon', width:100, css:'evol-ellipsis',
                    formula:function(m){
                        var urlData=m.get('title')+' '+m.get('authors'),
                        link=m.get('language')=='FR' ?
                            'http://www.amazon.fr/s/ref=sr_nr_n_1?keywords='
                            :'http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=';
                        return '<a target="a" href="'+link+encodeURI(urlData)+'">'+
                            _.escape(urlData)+'</a>';
                    }
                },
                {
                    id: 'notes', attribute: 'notes', type: 'textmultiline', 
                    label: 'Notes', maxLength: 1000,
                    width: 100, height: 6, inMany: false
                }
            ]
        },
        {
            type: 'panel', label: 'Cover', width: 30,
            elements: [
                {
                    id: 'pix', attribute: 'pix', type: 'image',
                    label: 'Cover', width: 100, inMany: true
                }
            ]
        }
    ]
};

```

See [UI-Model documentation](http://evoluteur.github.io/evolutility-ui-jquery/doc/ui-model.html) for the UI vocabulary available (structure of UI-models or metamodel).

UI-Models for the demo apps:
[To Do list](http://github.com/evoluteur/evolutility-ui-jquery/blob/master/models/todo.js),
[AddressBook](http://github.com/evoluteur/evolutility-ui-jquery/blob/master/models/contacts.js),
[Wine Cellar](http://github.com/evoluteur/evolutility-ui-jquery/blob/master/models/winecellar.js),
[Graphic Novels](http://github.com/evoluteur/evolutility-ui-jquery/blob/master/models/comics.js).

## Stack and dependencies

Javascript, HTML5, CSS3,
[Backbone.js](http://backbonejs.org),
[Underscore.js](http://underscorejs.org/),
[jQuery](http://jquery.com),
[D3.js](http://d3js.org),
[Bootstrap](http://getbootstrap.com/),
[Bootstrap-datepicker](http://eternicode.github.io/bootstrap-datepicker/),
[Select2](http://ivaynberg.github.io/select2/),
[Toastr](https://github.com/CodeSeven/toastr).

Note: For convenience, all dependencies are minified together in a single file "dependencies.min.js". The dependencies list is specified in "Gruntfile.js".

The React alternative: 
[Evolutility-UI-React](https://github.com/evoluteur/evolutility-ui-react)

## Documentation

The (beginning of a) [documentation](http://evoluteur.github.io/evolutility-ui-jquery/doc/index.html) is in progress: [ui-models](http://evoluteur.github.io/evolutility-ui-jquery/doc/ui-model.html) and [views](http://evoluteur.github.io/evolutility-ui-jquery/doc/views.html).

## License

Copyright (c) 2019 [Olivier Giulieri](https://evoluteur.github.io/).

Evolutility-UI-jQuery is released under the [MIT license](http://github.com/evoluteur/evolutility-ui-jquery/blob/master/LICENSE.md).

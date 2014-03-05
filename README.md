# evolutility.js

evolutility.js is a work in progress. Eventually it will be a generic UI to build applications who can change form, volume, and structure like living organisms.

The idea is to build a set of generic Backbone views to perform all CRUD (Create, Read, Update and Delete) operations on records of any data structure.
For each object the whole set of views is defined in a single UI-model containing the description of the UI (fields mapping, layout, and behavior).

## The Plan 

1. Update [Evolutility metamodel] (http://www.codeproject.com/Articles/28636/Minimalist-Meta-Model-for-CRUD-Applications) (model of the UI models)
2. Code the generic UI views based on the metamodel
3. Add a toolbar and a controller for all these views
4. Make [demo apps](http://evoluteur.github.io/evolutility/demo/index.html)
5. Make [an app to make apps] (http://www.codeproject.com/Articles/28810/Wizard-and-CRUD-Applications-to-Build-other-CRUD-A)


## 1 - UI-model

To define UI-models evolutility uses some kind of UI language.
It is not fully defined yet but the syntax of UI-models will be based on [Minimalist Meta-Model for CRUD Applications](http://www.codeproject.com/Articles/28636/Minimalist-Meta-Model-for-CRUD-Applications)
using JSON rather than XML this time.

Elements: tabs, panels, panel-list, fields.

Sample UI Models:
[To Do list](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/todo.js),
[AddressBook](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/contacts.js),
[Wine Cellar](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/winecellar.js).

## 2 - Views

evolutility's views have a Backbone model (to define the data) and also a UI model (to define the UI for interacting with the data).

Evolutility will have 3 types of view
* Views for one record (one): new, edit, mini, json...
* Views for a collection (many): list, cards, charts...
* Views for actions on one record or a collection: export, filter, dashboards, Mass Update...

## 3 - Toolbar/Controller

We will also need a toolbar and a controller (for now the same js class).

## 4 - Demo apps

[To Do list](http://evoluteur.github.io/evolutility/demo/todo.html),
[AddressBook](http://evoluteur.github.io/evolutility/demo/contact.html),
[Wine Cellar](http://evoluteur.github.io/evolutility/demo/winecellar.html).


## 5 - The app to make other apps

A set of ui-models and models for the ui-model itself: fields, panels, tabs.
(...and some code in the view themselves to make it possible)


## Techno and Libraries

Javascript, HTML5, CSS3,
[Backbone] (http://backbonejs.org),
[Underscore] (http://underscorejs.org/),
[jQuery] (http://jquery.com),
[Bootstrap] (http://getbootstrap.com/).

## Previous incarnation

evolutility.js is a re-write of [Evolutility] (http://www.evolutility.org) generic CRUD UI for ASP.net.


## License

Copyright (c) 2014 Olivier Giulieri.

evolutility.js is released under the GNU Affero General Public License version 3 [GNU AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html).


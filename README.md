# evolutility.js

Evolutility provides a set of Backbone views which can change form, volume and structure like living organisms.
For each Backbone model, all the views are defined by a shared UI-model describing fields mapping, layout, and behavior for CRUD (Create, Read, Update and Delete) and more.

## Demo apps

[To Do list](http://evoluteur.github.io/evolutility/demo/todo.html),
[AddressBook](http://evoluteur.github.io/evolutility/demo/contact.html),
[Wine Cellar](http://evoluteur.github.io/evolutility/demo/winecellar.html).

## UI-model

All UI-models use the same [API or vocabulary](http://evoluteur.github.io/evolutility/doc/ui-model.html) with words like "field", "panel" and "tab" rather than "INPUT" and "DIV" to describe UI elements.

UI Models for the demo apps:
[To Do list](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/todo.js),
[AddressBook](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/contacts.js),
[Wine Cellar](http://github.com/evoluteur/evolutility/blob/master/js/ui-models/apps/winecellar.js).

## Views

evolutility's views have a Backbone model (to define the data) and also a UI-model (to define the UI for this model).

Evolutility provides 3 types of view
* Views for one record (one): New, Edit, Mini (quick edit), JSON.
* Views for a collection (many): List, Badges, Charts.
* Views for actions on one record or a collection: Export, Filter (will add later Dashboards, Mass update, clone...).

Web demo of [all views](http://evoluteur.github.io/evolutility/index.html)

## Toolbar/Controller

Still under development.

A toolbar and a controller for all views.

## Techno and Open Source Libraries used

Javascript, HTML5, CSS3,
[Backbone] (http://backbonejs.org),
[Underscore] (http://underscorejs.org/),
[jQuery] (http://jquery.com),
[Bootstrap] (http://getbootstrap.com/),
[bootstrap-datepicker] (http://eternicode.github.io/bootstrap-datepicker/),
[Select2] (http://ivaynberg.github.io/select2/).

## Previous incarnation

evolutility.js is a re-write of [Evolutility] (http://www.evolutility.org) generic CRUD UI for ASP.net.


## License

Copyright (c) 2014 Olivier Giulieri.

evolutility.js is released under the GNU Affero General Public License version 3 [GNU AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html).


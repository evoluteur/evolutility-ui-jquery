# Evolutility.js

Evolutility provides a set of generic Backbone Views to browse, edit, filter, export and chart Backbone models and collections of different structures.
With it you configure views with metadata instead of hand-coding templates, Javascript and CSS.

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

Evolutility's views have a Backbone model (to define the data) and also a UI-model (to define the UI for this model).

Evolutility provides 3 types of view
* Views for one model: View, Edit, Mini (quick edit), JSON.
* Views for a collection: List, Badges, Charts.
* Views for actions on a model or collection: Export, Filter (will add later Dashboards, Mass update, Clone...).

Web demo of [all views](http://evoluteur.github.io/evolutility/index.html)

## Techno and Open Source Libraries used

Javascript, HTML5, CSS3,
[Backbone] (http://backbonejs.org),
[Underscore] (http://underscorejs.org/),
[jQuery] (http://jquery.com),
[Bootstrap] (http://getbootstrap.com/),
[Bootstrap-datepicker] (http://eternicode.github.io/bootstrap-datepicker/),
[Select2] (http://ivaynberg.github.io/select2/).

## Previous incarnation

Evolutility.js is a re-write of [Evolutility] (http://www.evolutility.org) generic CRUD UI for ASP.net.


## License

Copyright (c) 2014 Olivier Giulieri.

Evolutility.js is released under the GNU Affero General Public License version 3 [GNU AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html).


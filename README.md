# evol-utility

evol-utility is a work in progress. Eventually it will be a generic UI to build applications who can change form, volume, and structure like living organisms.

Evolutility (Bio.): The faculty possessed by all substances capable of self-nourishment of manifesting the nutritive acts by change of form, of volume, or of structure.

The idea is to build a set of generic Backbone views to perform all CRUD (Create, Read, Update and Delete) on records of any data structure.
These generic Backbone views will all be defined in a single UI-model containing the description of UI (layout, fields and behaviors).

A complete set of views should include the following:

For a model (one):

    * View
    * Edit

For a collection (many):

    * List
    * Charts
    * Dashboards
    * Selections ([some kind of filters] (http://github.com/evoluteur/advancedSearch))
    * Export
    * Mass Update

## Techno

Javascript, HTML5, CSS3,
[Backbone] (http://backbonejs.org),
[Underscore] (http://underscorejs.org/),
[jQuery] (http://jquery.com),
[Bootstrap] (http://getbootstrap.com/).

## Previous incarnation

evol-utility.js is a re-write of [Evolutility] (http://www.evolutility.org) generic UI for CRUD.

## The Plan 

    1- Update [Evolutility metamodel] (http://www.codeproject.com/Articles/28636/Minimalist-Meta-Model-for-CRUD-Applications) (model of the UI models)
    2- Code the generic UI views based on the metamodel
    3- Add a toolbar and a controller for all these views
    4- Make demo apps
    5- Make [an app to make apps] (http://www.codeproject.com/Articles/28810/Wizard-and-CRUD-Applications-to-Build-other-CRUD-A)


## 1 - Meta-model

To define applications we will need some kind of declarative language.
It will be based on [Minimalist Meta-Model for CRUD Applications](http://www.codeproject.com/Articles/28636/Minimalist-Meta-Model-for-CRUD-Applications).

## 2 - Views

evol-utility views have a Backbone model (to define the data) and also a UI model (to define the UI for interacting with the data).
These views can be instanciated for apps like an address book, a to do list, or anything you define it to be.

## License

Copyright (c) 2013 Olivier Giulieri.

evol-utility is released under the GNU Affero General Public License version 3 [GNU AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html).


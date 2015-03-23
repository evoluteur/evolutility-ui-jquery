/*! ***************************************************************************
 *
 * evolutility :: demo.js
 *
 * Demo
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var uidef=null;

var ViewDescriptions = {
 'view': {name: 'View', desc: 'The "View" view shows all fields for viewing (read only). Fields are grouped in panels and tabs.'},
 'edit': {name: 'Edit', desc: 'The "Edit" view shows all fields for edition to create or update models. It automatically performs validation based on the UI-model and supports the Master-Details pattern (nested collections). Fields are grouped in panels and tabs.'},
 'mini': {name: 'Mini (quick-edit)', desc: 'The "Mini" (quick-edit) view only shows important fields (required or showing as a column in grids). Fields are grouped in a single panel.'},
 'json': {name: 'JSON', desc: 'The "JSON" view shows the JSON representation of the data.'},
 'list': {name: 'List', desc: 'The "List" view gives a tabular view of a collection with paging.'},
 'cards': {name: 'Cards', desc: 'The "Cards" Shows records side by side as cards.'},
 'charts': {name: 'Charts', desc: 'The "Charts" view draws charts about the collection.'},
 'filter': {name: 'Filter', desc: 'The "Filter" view is used to build a structured query to filter a collection.'},
 'export': {name: 'Export', desc: 'The "Export" view let\'s you define export options and preview the collection export in different data formats (CSV, TAB, HTML, XML, SQL and JSON).'}
};

function createSampleDataIfEmpty(entityName){
    var lc = new Backbone.LocalStorage('evol-'+entityName),
        M = Backbone.Model.extend({
            localStorage: lc
        }),
        Ms = Backbone.Collection.extend({
            model: M,
            localStorage: lc
        }),
        ms = new Ms();
    ms.fetch({
        success: function(collection){
            // TODO remove sample data
            if(collection.length===0){
                Evol.UI.insertCollection(collection, uiModels[entityName+'_data']);
            }
        }
    });
}

function showUIModel(uiModel){
    if(_.isString(uiModel)){
        uiModel=uiModels[uiModel];
    }
    $('#uimodel').html(Evol.UI.input.textMJSON('uimodel2', uiModel, 10, true))
        .slideDown();
    $('#hide_def').show();
}
function hideUIModel(){
    $('#uimodel').slideUp();
    $('#hide_def').hide();
}

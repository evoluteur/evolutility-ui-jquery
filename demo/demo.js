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

//TODO consolidate this code
var uidef=null;

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

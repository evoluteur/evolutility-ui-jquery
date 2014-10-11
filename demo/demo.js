/*! ***************************************************************************
 *
 * evolutility :: demo.js
 *
 * Demo
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
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

function showUIdef(uiModel){
    if(uidef){
        $('#uimodel').slideUp();
        uidef=false;
    }else{
        var $ui=$('#uimodel');
        if($ui.html()==''){
            $ui.html(Evol.UI.input.textMJSON('uimodel2', uiModel, 12));
        }
        $ui.slideDown();
        uidef=true;
    }
}

function showUIdef2(uiModel){
    var $ui=$('#uimodel');
    $ui.html(Evol.UI.input.textMJSON('uimodel2', uiModel, 10))
        .slideDown();
    $('#hide_def').show();
}
function showUIdef2no(){
    $('#uimodel').slideUp();
    $('#hide_def').hide();
}
function setDemo(uiModel, localStorage, data, style){
    var M = Backbone.Model.extend({
            localStorage: new Backbone.LocalStorage(localStorage)
        }),
        Ms = Backbone.Collection.extend({
            model: M,
            localStorage: new Backbone.LocalStorage(localStorage)
        });

    var ms = new Ms();
    ms.fetch({
        success: function(collection){
            // TODO remove sample data
            if(collection.length===0){
                Evol.UI.insertCollection(collection, data);
            }
            var m = ms.at(0),
                el =$('#evol'),
                vw = new Evol.ViewToolbar({
                    el: el,
                    mode: 'one',
                    style: style,// || 'panel-primary',
                    customize:false,
                    model: m,
                    modelClass: M,
                    collection: ms,
                    collectionClass: Ms,
                    uiModel: uiModel,
                    pageSize: 20,
                    titleSelector: '#title'
                }).render();

            $('#recs > a').on('click', function(evt){
                var id=$(evt.currentTarget).index();
                vw.setModel(ms.get(id));
            })
        }
    });

}

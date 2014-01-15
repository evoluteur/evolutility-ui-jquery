/*! ***************************************************************************
 *
 * evolutility :: demo.js
 *
 * Demo
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var uidef=null;
function showUIdef(uiModel){

    if(uidef){
        $('#uimodel').slideUp();
        uidef=false;
    }else{
        var $ui=$('#uimodel');
        if($ui.html()==''){
            $ui.html(EvoUI.input.textMJSON('uimodel2', uiModel, null, 12));
        }
        $ui.slideDown();
        uidef=true;
    }
}

function setDemo(uiModel, localStorage, data, style){
    M = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage(localStorage)
    });
    Ms = Backbone.Collection.extend({
        model: M,
        localStorage: new Backbone.LocalStorage(localStorage)
    });

    var ms = new Ms();
    ms.fetch({
        success: function(collection){
            Evol.UI.insertCollection(collection, data);
            var m = ms.models[0];
            var el =$('#evol'),
                vw = new Evol.ViewToolbar({
                    el: el,
                    mode: 'one',
                    style: style,// || 'panel-primary',
                    customize:false,
                    model: m,
                    collection: ms,
                    uiModel: uiModel
                });

            $('#recs > a').on('click', function(evt){
                var id=$(evt.target).index();
                vw.setModel(ms.get(id));
            })
        }
    });

}

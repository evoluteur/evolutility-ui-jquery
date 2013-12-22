
var uidef=null;
function showUIdef(uiModel){

    if(uidef){
        $('#uimodel').slideUp();
        uidef=false;
    }else{
        var $ui=$('#uimodel');
        if($ui.html()==''){
            $ui.html(EvoUI.inputTextMJSON('uimodel2', uiModel, null, 12));
        }
        $ui.slideDown();
        uidef=true;
    }
}

function setDemo(uiModel, localStorage, data){
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
            EvoUI.insertCollection(collection, data);
            var m = ms.models[0];
            var el =$('#evol'),
                vw = new Evol.ViewToolbar({
                    el: el,
                    mode: 'one',
                    style:'panel-primary',
                    customize:false,
                    model: m,
                    collection: ms,
                    uiModel: uiModel
                });
            el.on('view.save',function(evt){
                vw.validate(evt);
            })

            $('#recs > a').on('click', function(evt){
                var id=$(evt.target).index();
                vw.setModel(ms.get(id));
            })
        }
    });

}

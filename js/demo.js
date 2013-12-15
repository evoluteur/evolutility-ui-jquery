
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

function setDemoEvol(collName){
    Contact = Backbone.Model.extend({
        initialize: function(){
            //alert("Welcome to this world");
        },
        localStorage: new Backbone.LocalStorage("evol-contacts")
    });
    Contacts = Backbone.Collection.extend({
        model: Contact,
        localStorage: new Backbone.LocalStorage("evol-contacts")
    });

    var contacts = new Contacts();
    contacts.fetch({
        success: function(collection){
            if(collection.length==0){
                collection.reset(contacts_data);
            }
            var contact = contacts.models[0];
            var el =$('#evol'),
                vw = new Evol.ViewToolbar({
                    el: el,
                    mode: 'list',
                    style:'panel-primary',
                    model: contact,
                    collection: contacts,
                    uiModel: contacts_ui // field_ui
                });
            el.on('view.save',function(evt){
                vw.validate(evt);
            })

            $('#recs > a').on('click', function(evt){
                var id=$(evt.target).index();
                vw.setModel(contacts.get(id));
            })
        }
    });

}

/*! ***************************************************************************
 *
 * evol-utility : evol-dico.js
 *
 * Copyright (c) 2013, Olivier Giulieri 
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Dico = {

    fieldTypes: {
        text: 'text',
        txtm: 'textmultiline',
        bool: 'boolean',
        dec: 'decimal',
        integer: 'integer',
        date: 'date',
        time: 'time',
        datetime: 'datetime',
        pix: 'image',
        //doc:'document',
        lov: 'lov',
        //formula:'formula',
        //html:'html',
        email: 'email',
        url: 'url',
        pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        rating: 'rating',
        tag: 'tag'
        //widget: 'widget',
    },

    fields: function (uiModel, fnFilter) {
        // TODO fields details or not?
        var fs = [];

        function collectFields(te) {
            if (te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    collectFields(te);
                });
            } else {
                fs.push(te);
            }
        }

        collectFields(uiModel);
        if (_.isFunction(fnFilter)) {
            fs= _.filter(fs, fnFilter);
        }
        return fs;
    },

    showDesigner: function(id, type, $el){
        var h=[],
            $elDes=$('<div class="evol-des-'+type+'"></div>'),
            uiModel;

        switch(type){
            case 'field':
                uiModel = dico_field_ui
                break;
                
        }    
        $el.closest('.evol-fld').append($elDes);

        vw = new Evol.ViewOne({
            toolbar:true,
            model: null,
            uiModel: uiModel,
            defaultView: 'edit',
            el: $elDes,
            button_addAnother: false
        });
        vw.render();

        $elDes.on('click', 'button#save,button#cancel', function(evt){
            alert('fld click button')
            $elDes.remove();
        });

        return this;
    },

    showInfoBox:function(msg, type){        
        var $m=this.$el.find('.evol-head-info');
        if($m.length){
            $m.html(msg);
        }else{
            var m=['<div class="evol-head-info alert alert-',type,'">',
                EvoUI.iconClose(),msg,'</div>'].join('');
            this.$el.prepend(m);
        }
        return this;
    }

}


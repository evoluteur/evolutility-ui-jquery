/*! ***************************************************************************
 *
 * evolutility :: dico.js
 *
 * Library of helpers for dictionary
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Dico = {

    // enum of supported field types
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
        money: 'money',
        //formula:'formula',
        //html:'html',
        email: 'email',
        url: 'url',
        //pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        tag: 'tag'
        //widget: 'widget',
    },

    // get all "shallow" fields (no sub collections) from a UI model
    getFields: function (uiModel, fnFilter) {
        var fs = [];

        function collectFields(te) {
            if (te && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type!='panel-list'){
                        collectFields(te);
                    }
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

    // get sub collections
    getSubCollecs: function(uiModel){
        var ls = [];

        function collectCollecs(te) {
            if(te.type==='panel-list'){
                ls.push(te);
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls.push(te);
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls.push(te);
            }
        }

        collectCollecs(uiModel);

        return ls;
    },

    lovText:function(hash, f, v){
        if(('list' in f) && f.list.length>0){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list,function(item){
                    return item.id===v;
                });
                if(listItem){
                    var txt=listItem.text;
                    if(listItem.icon){
                        txt='<img src="'+listItem.icon+'"> '+txt;
                    }
                    hashLov[v]=txt;
                    return txt;
                }
            }
        }
        return '';
    },

    isTypeDateOrTime: function(fType){
        return fType == EvoDico.fieldTypes.datetime || EvoDico.fieldTypes.date || fType==EvoDico.fieldTypes.time;
    },

    showDesigner: function(id, type, $el, context){
        var $elDes=$('<div class="evol-des-'+type+'"></div>'),
            model,
            uiModel;
//TODO set record
        this.getFields (dico_field_ui, function(m){
            return m.get('id')=='';
        })
        switch(type){
            case 'field':
                uiModel = dico_field_ui;
                model = context.model;
                break;
        }    
        $el.closest('.evol-fld').after($elDes);

        var vw = new Evol.ViewOne.Edit({
            model: null,
            uiModel: uiModel,
            model: model,
            defaultView: 'edit',
            el: $elDes,
            style:'panel-primary',
            size:'S',
            button_addAnother: false
        }).render();

        $elDes.on('click', 'button#save,button#cancel', function(evt){
            //TODO save field => dependency: uiModel persistence...
            $elDes.remove();
        });

        return this;
    },

    bbComparator:  function(fid){
        return function(modelA,modelB) {
            return modelA.get(fid)>modelB.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA,modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    },

    HTMLField4Many: function(f,v, hashLov){
        var fTypes = Evol.Dico.fieldTypes;
        switch(f.type){
            case fTypes.bool:
                if (v==='true' || v=='1') {
                    return Evol.UI.icon('ok');
                }
                break;
            case fTypes.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                    return Evol.Dico.lovText(hashLov, f, v);
                    //}
                }
                break;
            case fTypes.date:
            case fTypes.time:
            case fTypes.datetime:
                return Evol.UI.formatDateTime(v);
            case fTypes.pix:
                if (v.length) {
                    return Evol.UI.input.img(f.id, v);
                }
                break;
            case fTypes.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            default:
                return v;
        }
        return '';
    },



};

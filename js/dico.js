/*! ***************************************************************************
 *
 * evolutility :: dico.js
 *
 * Library of helpers for dictionary
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Dico = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        i18n = Evol.i18n;

return {

    // enum of supported field types
    fieldTypes: fts,

    fieldOneEdit: {// h, f, fid, fv, iconsPath
        text: function (h, f, fid, fv) {
            h.push(uiInput.text(fid, fv, f, null));
        },
        textmultiline: function (h, f, fid, fv) {
            // fv = _.escape(fv);
            if (f.height === null) {
                f.height = 5;
            } else {
                var fHeight = parseInt(f.height, 10);
                if (fHeight < 1) {
                    f.height = 5;
                }
            }
            h.push(uiInput.textM(fid, fv, f.maxlength, f.height));
        },
        // html:
        boolean: function (h, f, fid, fv) {
            h.push(uiInput.checkbox(fid, fv));
        },
        integer: function (h, f, fid, fv) {
            h.push(uiInput.textInt(fid, fv, f.max, f.min));
        },
        decimal: function (h, f, fid, fv) {
            //todo
            h.push(uiInput.textInt(fid, fv, f.max, f.min));
        },
        money: function (h, f, fid, fv) {
            h.push('<div class="input-group">', uiInput.typeFlag('$'),
                uiInput.textInt(fid, fv), '</div>');
        },
        date: function (h, f, fid, fv) {
            h.push(uiInput.date(fid, fv));
        },
        datetime: function (h, f, fid, fv) {
            h.push(uiInput.dateTime(fid, fv));
        },
        time: function (h, f, fid, fv) {
            h.push(uiInput.time(fid, fv));
        },
        lov: function (h, f, fid, fv) {
            h.push(uiInput.select(fid, fv, '', true, f.list));
        },
        list: function (h, f, fid, fv) { // fv is an array. will use select2
            h.push('<div id="', fid, '" class="w-100 form-control"></div>');
        },
        email: function (h, f, fid, fv) {
            h.push('<div class="input-group">', uiInput.typeFlag(i18n.sgn_email),
                uiInput.text(fid, fv, f),
                '</div>');
        },
        url: function (h, f, fid, fv) {
            h.push(uiInput.text(fid, fv, f));
            //fv!==''?EvoUI.link(fid,'',fv):''
        },
        //doc: function(h, f, fid, fv, iconsPath){
        //},
        image: function(h, f, fid, fv, iconsPath){
            if(fv!==''){
                h.push('<img src="',(fv.substr(0, 2)==='..')?fv:iconsPath + fv,'" class="img-thumbnail">');
            }else{
                h.push('<p class="">',i18n.nopix,'</p>');
            }
            h.push(uiInput.text(fid, fv, f, null));
        },
        color: function(h, f, fid, fv){
            //h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
            h.push(uiInput.color(fid, fv));
        },
        hidden: function(h, f, fid, fv){
            h.push(uiInput.hidden(fid, fv));
        },
        formula: function(h, f, fid, fv){
            h.push(uiInput.text(fid, fv, f, null));
        }
    },

    // -- list of operator and function for filters
    fieldConditions: {
        // filter functions take parameters fv=fieldValue, cv=condition value, cv2
        // -- equals
        'eq': function(fv, cv){
            return cv==fv;
        },
        // -- not equal
        'ne': function(fv, cv){
            return cv!=fv;
        },
        // -- > or after
        'gt': function(fv, cv){
            return fv>cv;
        },
        // -- < or before
        'lt': function(fv, cv){
            return fv<cv;
        },
        // -- between
        'bw': function(fv, cv, cv2){
            return !(cv>fv || fv>cv2);
        },
        // -- start w/
        'sw': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)===0;
        },
        // -- contains
        'ct': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)>-1;
        },
        // -- finish w/
        'fw': function(fv, cv){
            var l1=fv.length,
                l2=cv.length;
            if (l1<l2){
                return false;
            }else{
                return fv.toLocaleLowerCase().substring(l1-l2)===cv;
            }
        },
        // -- empty
        'null': function(fv, cv){
            return  fv=='' || _.isUndefined(fv);
        },
        // -- not null
        'nn': function(fv, cv){
            return !(_.isUndefined(fv) || fv=='');
        },
        // -- in []
        'in': function(fv, cv){
            return  _.contains(cv.split(','),fv);
        },
        // -- true
        '1': function(fv, cv){
            return fv;
        },
        // -- false
        '0': function(fv, cv){
            return !fv;
        }
    },

    isNumberType: function(fType){
        return fType===fts.int || fType===fts.dec || fType===fts.money;
    },
    isDateOrTimeType: function(fType){
        return fType === fts.date || fType === fts.datetime || fType === fts.time;
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

    getFieldTypedValue:function(f, $f){
        switch(f.type) {
            case fts.bool:
                return $f.prop('checked');
            case fts.int:
                return parseInt($f.val(), 10);
            case fts.dec:
            case fts.money:
                return parseFloat($f.val());
            case fts.list:
                return $f.select2('val');
            default:
                return $f.val();
        }
    },

    // get sub collections
    getSubCollecs: function(uiModel){
        var ls = {};

        function collectCollecs(te) {
            if(te.type==='panel-list'){
                ls[te.attribute]=te;
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls[te.attribute]=te;
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls[te.attribute]=te;
            }
        }

        collectCollecs(uiModel);

        return ls;
    },
    /*
     compactUI: function(uiModel){
         var uiM = _.extend({}, uiModel);
         // TODO makes panels 100% + create tabs
         return uiM;
     },
     */
    // get field value (not id but text) for a field of type lov
    lovText:function(f, v, hash, iconsPath){
        if(f.list && f.list.length>0 && hash){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list, function(item){
                    return item.id==v;
                });
                if(listItem){
                    var txt= _.escape(listItem.text);
                    if(listItem.icon!='' && !_.isUndefined(listItem.icon)){
                        txt='<img src="'+iconsPath+listItem.icon+'"> '+txt;
                    }
                    hashLov[v]=txt;
                    return txt;
                }
            }
        }
        return '';
    },

    lovTextNoPix:function(f, v){
        var listItem=_.find(f.list, function(item){
            return item.id==v;
        });
        if(listItem){
            return listItem.text;
        }
        return '';
    },

    /*
     showDesigner: function(id, type, $el, context){
         var css='evodico-'+type,
             //$('<div class="evodico-'+type+'"></div>'),
             model,
             uiModel=context.uiModel,
             f;
         //context.getFields(dico_field_ui);
         switch(type){
             case 'object':
                 //TODO
                 break;
             case 'field':
                 uiModel = uiModels.field;
                 f=context.getFieldsHash(uiModel)[id];
                 model = new Backbone.Model(f);
                 break;
             //case 'list':
             //case 'tab':
             case 'panel':
             //case 'panel-list':
                 uiModel = uiModels.panel;
                 f=context.uiModel.elements[0]; //TODO
                 model = new Backbone.Model(f);
                 break;
         }
         //$el.closest('.evol-fld').after($elDesModal);
         $('body').append($elDesModal);
         var $elDesModal=$(eUI.modal.HTMLModal('m'+id, 'Edit '+type+' '+ f.label, '<div class="'+css+'"></div>')),
         $elDes=$elDesModal.find('.'+css);
         var vw = new Evol.ViewOne.Edit({
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
             $elDesModal.modal('hide').remove();
         });

         $elDesModal.modal('show');

         return this;
     },*/

    filterModels: function(models, filters){
        if(filters.length){
            // TODO pre-build function to avoid repeating loop
            return models.filter(function(model){
                var want=true,
                    fConds=Evol.Dico.fieldConditions;
                for(var i= 0, iMax=filters.length;i<iMax && want;i++){
                    if(want===false){
                        break;
                    }
                    var filter=filters[i],
                        vm=model.get(filter.field.value);// TODO use field.value(m) || field.id

                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    want=fConds[filter.operator.value](vm, filter.value.value, filter.value.value2); // vf2 is only used in "between" conditions
                }
                return want;
            });
        }
        return models;
    },

    HTMLField4Many: function(f, v, hashLov, iconsPath){
        switch(f.type){
            case fts.bool:
                if (v==='true' || v=='1') {
                    return eUI.icon('ok');
                }
                break;
            case fts.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                    //return Evol.Dico.lovText(f, iconPath+v, hashLov);
                    return Evol.Dico.lovText(f, v, hashLov, iconsPath);
                    //}
                }
                break;
            case fts.list:
                if(_.isString(v)){
                    v= v.split(',');
                }
                if(v && v.length){
                    var vs=[];
                    _.each(v, function(vi){
                        vs.push(Evol.Dico.lovText(f, vi, hashLov, iconsPath));
                    });
                    return vs.join(', ');
                }
                return v;
            case fts.date:
                return eUI.formatDate(v);
            case fts.time:
                return eUI.formatTime(v);
            case fts.datetime:
                return eUI.formatDateTime(v);
            case fts.pix:
                if (v && v.length) {
                    //return uiInput.img(f.id, (v.substr(0, 2)==='..')?v:iconsPath + v, 'img-thumbnail');
                    return uiInput.img(f.id, iconsPath + v, 'img-thumbnail');
                }
                break;
            case fts.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            case fts.email:
                return eUI.linkEmail(f.id, v);
            case fts.url:
                return eUI.link(f.id, v, v, f.id);
            //case fts.color:
            //    return uiInput.colorBox(f.id, v, v);
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h=[];
        // --- field label ---
        if(mode==='mini'){
            var fwidth=fld.width;
            fld.width=100;
            h.push('<div class="evol-mini-label">', this.HTMLFieldLabel(fld, mode),
                '</div><div class="evol-mini-content">');
        }else if(!skipLabel){
            h.push(this.HTMLFieldLabel(fld, mode || 'edit'));
        }
        // --- field value ---
        if(fld.readonly || mode==='view'){
            h.push('<div class="disabled evo-rdonly" id="',fid);
            if(fld.type===fts.textml && fld.height>1){
                h.push('" style="height:', fld.height, 'em;overflow-y: auto;');
            }
            h.push('">');
            switch (fld.type) {
                case fts.formula:
                    h.push('<div id="',fid, '" class="form-control">',fld.formula(),'</div>');
                    break;
                case fts.color: // TODO is the color switch necessary?
                    //h.push(uiInput.colorBox(fid, fv), fv);
                    h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    break;
                case fts.email:
                    h.push(eUI.linkEmail(fid, fv));
                    break;
                case fts.url:
                    h.push(eUI.link(fid, fv, fv, fid));
                    break;
                default:
                    h.push(this.HTMLField4Many(fld, fv, {}, iconsPath));
            }
            h.push('&nbsp;</div>');
        }else{
            Evol.Dico.fieldOneEdit[fld.type](h, fld, fid, fv, iconsPath);
        }
        if(mode==='mini'){
            h.push('</div>');
            fld.width=fwidth;
        }
        return h.join('');
    },

    HTMLFieldLabel: function (fld, mode) {
        var h=[];
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label ',fld.csslabel?fld.csslabel:'','" for="', fld.id, '">',
            fld.label);
        if (mode != 'view' && fld.required){
            h.push(eUI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(eUI.icon('question-sign', ''));
        }
        h.push('</label></div>');
        return h.join('');
    },

    HTMLFieldLink: function (id, fld, value, icon, noLink, route) {
        var h='';
        if(!noLink){
            h+='<a href="'+(route?route:'javascript:void(0);')+'" id="'+id+'" class="evol-nav-id">';
        }
        if(icon){
            h+='<img class="evol-many-icon" src="'+icon+'">';
        }/*
         if(_.isUndefined(value) || value===''){
         value='('+model.id+')';
         }*/
        h+=value;
        if(!noLink){
            h+='</a>';
        }
        return h;
    },

    bbComparator: function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA, modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    },

    getRoute: function(){
        var cURL=window.location.href,
            idx=cURL.indexOf('#');
        return (idx>-1)?cURL.substr(idx+1):'';
    },

    setRoute: function(router, title, entity, view, opts, trigger){
        // set route
        if(!_.isUndefined(router)){
            var route = entity + '/' + view;
            if(opts){
                route+='/' + opts;
            }
            if(route!==this.getRoute()){
                router.navigate('#' + route, {trigger: trigger});
            }
        }
        // set page title in head
        if(_.isUndefined(this._$headTitle)){
            this._$headTitle = $('#headTitle');
        }
        this._$headTitle.html(title);
    }

};
}();

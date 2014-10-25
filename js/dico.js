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
        textml: 'textmultiline',
        bool: 'boolean',
        int: 'integer',
        dec: 'decimal',
        money: 'money',
        date: 'date',
        time: 'time',
        datetime: 'datetime',
        pix: 'image',
        doc:'document',
        lov: 'lov',
        list: 'list', // many values for one field (behave like tags - return an array of strings)
        //html:'html',
        email: 'email',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        //widget: 'widget',
        url: 'url'
    },

    viewTypes: {
        // --- One ---
        'view': Evol.ViewOne.View,
        'edit': Evol.ViewOne.Edit,
        'mini': Evol.ViewOne.Mini,
        'json': Evol.ViewOne.JSON,
        // --- Many ---
        'list': Evol.ViewMany.List,
        'badges': Evol.ViewMany.Badges,
        'charts': Evol.ViewMany.Charts,
        // --- Action ---
        'filter': Evol.ViewAction.Filter,
        'export': Evol.ViewAction.Export
        //'uimodel': Evol.ViewAction.UI_Model,
        //'doc': Evol.ViewAction.Doc
    },

    fieldConditions: {
        // filter functions take parameters fv=fieldValue, cv=condition value, cv2
        // equals
        'eq': function(fv, cv){
            return cv==fv;
        },
        // not equal
        'ne': function(fv, cv){
            return cv!=fv;
        },
        // > or after
        'gt': function(fv, cv){
            return fv>cv;
        },
        // < or before
        'lt': function(fv, cv){
            return fv<cv;
        },
        // between
        'bw': function(fv, cv, cv2){
            return !(cv>fv || fv>cv2);
        },
        // start w/
        'sw': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)===0;
        },
        // contains
        'ct': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)>-1;
        },
        // finish w/
        'fw': function(fv, cv){
            var l1=fv.length,
                l2=cv.length;
            if (l1<l2){
                return false;
            }else{
                return fv.toLocaleLowerCase().substring(l1-l2)===cv;
            }
        },
        // empty
        'null': function(fv, cv){
            return  fv=='' || _.isUndefined(fv);
        },
        // not null
        'nn': function(fv, cv){
            return !(_.isUndefined(fv) || fv=='');
        },
        // in []
        'in': function(fv, cv){
            return  _.contains(cv.split(','),fv);
        },
        // true
        '1': function(fv, cv){
            return fv;
        },
        // false
        '0': function(fv, cv){
            return !fv;
        }
    },

    isNumberType: function(fType){
        var ft=Evol.Dico.fieldTypes;
        return fType===ft.int || fType===ft.dec || fType===ft.money;
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
        var ft=Evol.Dico.fieldTypes;
        switch(f.type) {
            case ft.bool:
                return $f.prop('checked');
            case ft.int:
                return parseInt($f.val(),10);
            case ft.dec:
            case ft.money:
                return parseFloat($f.val());
            case ft.list:
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
                    var txt=listItem.text;
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

    isTypeDateOrTime: function(fType){
        var ft=this.fieldTypes;
        return fType == ft.datetime || ft.date || fType == ft.time;
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
        var $elDesModal=$(Evol.UI.modal.HTMLModal('m'+id, 'Edit '+type+' '+ f.label, '<div class="'+css+'"></div>')),
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
    },
*/
    filterModels: function(models, filters){
        if(filters.length){
            // TODO pre-build function to avoid repeating loop
            return models.filter(function(model){
                var want=true;
                for(var i= 0, iMax=filters.length;i<iMax && want;i++){
                    if(want===false){
                        break;
                    }
                    var filter=filters[i],
                        vm=model.get(filter.field.value);// TODO use field.value(m) || field.id

                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    want=Evol.Dico.fieldConditions[filter.operator.value](vm, filter.value.value, filter.value.value2); // vf2 is only used in "between" conditions
                }
                return want;
            });
        }
        return models;
    },

    HTMLField4Many: function(f, v, hashLov, iconsPath){
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
                    //return Evol.Dico.lovText(f, iconPath+v, hashLov);
                    return Evol.Dico.lovText(f, v, hashLov, iconsPath);
                    //}
                }
                break;
            case fTypes.list:
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
            case fTypes.date:
                return Evol.UI.formatDate(v);
            case fTypes.time:
                return Evol.UI.formatTime(v);
            case fTypes.datetime:
                return Evol.UI.formatDateTime(v);
            case fTypes.pix:
                if (v && v.length) {
                    return Evol.UI.input.img(f.id, iconsPath + v, 'img-thumbnail');
                }
                break;
            case fTypes.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            case fTypes.email:
                return Evol.UI.linkEmail(f.id, v);
            case fTypes.url:
                return Evol.UI.link(f.id, v, v, f.id);
            //case fTypes.color:
            //    return Evol.UI.input.colorBox(f.id, v, v);
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h=[],
            EvoUI=Evol.UI,
            uiInput=EvoUI.input,
            fTypes=Evol.Dico.fieldTypes;
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
            if(fld.type===fTypes.textml && fld.height>1){
                h.push('" style="height:', fld.height, 'em;overflow-y: auto;');
            }
            h.push('">');
            switch (fld.type) {
                case fTypes.color: // TODO is the color switch necessary?
                    //h.push(Evol.UI.input.colorBox(fid, fv), fv);
                    h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    break;
                case fTypes.email:
                    h.push(EvoUI.linkEmail(fid, fv));
                    break;
                case fTypes.url:
                    h.push(EvoUI.link(fid, fv, fv, fid));
                    break;
                default:
                    h.push(this.HTMLField4Many(fld, fv, {}, iconsPath));
            }
            h.push('&nbsp;</div>');
        }else{
            switch (fld.type) {
                case fTypes.text:
                    h.push(uiInput.text(fid, fv, fld, null));
                    break;
                case fTypes.int:
                case fTypes.dec:
                    h.push(uiInput.textInt(fid, fv, fld.max, fld.min));
                    break;
                case fTypes.money:
                    h.push('<div class="input-group">', EvoUI.input.typeFlag('$'),
                        uiInput.textInt(fid, fv),
                        '</div>');
                    break;
                case fTypes.bool:
                    h.push(uiInput.checkbox(fid, fv));
                    break;
                case fTypes.textml:
                case fTypes.html:
                    // fv = _.escape(fv);
                    if (fld.height === null) {
                        fld.height = 5;
                    } else {
                        var fHeight = parseInt(fld.height,10);
                        if (fHeight < 1) {
                            fld.height = 5;
                        }
                    }
                    h.push(uiInput.textM(fid, fv, fld.maxlength, fld.height));
                    break;
                case fTypes.date:
                    h.push(uiInput.date(fid, fv));
                    break;
                case fTypes.datetime:
                    h.push(uiInput.dateTime(fid, fv));
                    break;
                case fTypes.time:
                    h.push(uiInput.time(fid, fv));
                    break;
                case fTypes.lov:
                    h.push(uiInput.select(fid, fv, '', true, fld.list));
                    break;
                case fTypes.list: // fv is an array. will use select2
                    h.push('<div id="',fid, '" class="w-100 form-control"></div>');
                    break;
                case fTypes.email:
                    h.push('<div class="input-group">', uiInput.typeFlag(Evol.i18n.sgn_email),
                        uiInput.text(fid, fv, fld),
                        '</div>');
                    break;
                case fTypes.url:
                    h.push(uiInput.text(fid, fv, fld));
                    break;
                //case fTypes.doc:
                case fTypes.pix:
                    if(fv!==''){
                        h.push('<img src="',iconsPath+fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
                    }
                    h.push(uiInput.text(fid, fv, fld, null));
                    break;
                case fTypes.color:
                    //h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    h.push(uiInput.color(fid, fv));
                    break;
                case fTypes.hidden:
                    h.push(uiInput.hidden(fid, fv));
                    break;
            }
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
            h.push(Evol.UI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(Evol.UI.icon('question-sign', ''));
        }
        h.push('</label></div>');
        return h.join('');
    },

    HTMLFieldLink: function (id, fld, value, icon, noLink, route) {
        var h=[];
        if(!noLink){
            h.push('<a href="', route?route:'javascript:void(0);', '" id="', id, '" class="evol-nav-id">');
        }
        if (icon) {
            h.push('<img class="evol-many-icon" src="', icon, '">');
        }/*
        if(_.isUndefined(value) || value===''){
            value='('+model.id+')';
        }*/
        h.push(value);
        if(!noLink){
            h.push('</a>');
        }
        return h.join('');
    },
    /*
    copyOptions:  function(context, options, optList){
        _.each(optList, function(opt){
            context[opt]=options[opt];
        });
        return this;
    },*/

    bbComparator:  function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA,modelB) {
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

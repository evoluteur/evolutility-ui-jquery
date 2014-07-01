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
        dec: 'decimal',
        int: 'integer',
        date: 'date',
        time: 'time',
        datetime: 'datetime',
        pix: 'image',
        doc:'document',
        lov: 'lov',
        list: 'list', // many values for one field (behave like tags - return an array of strings
        money: 'money',
        //formula:'formula',
        //html:'html',
        email: 'email',
        //pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        //widget: 'widget',
        url: 'url'
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
                ls[te.attr]=te;
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls[te.attr]=te;
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls[te.attr]=te;
            }
        }

        collectCollecs(uiModel);

        return ls;
    },

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
        var $elDes=$('<div class="evodico-'+type+'"></div>'),
            model,
            uiModel=context.options.uiModel;

        //TODO set record
        context.getFields(dico_field_ui);
        switch(type){
            case 'object':
                //TODO

                break;
            case 'field':
                uiModel = dico_field_ui;
                model = context.model;
                break;
            case 'list':
            case 'tab':
            case 'panel':
            case 'panel-list':
                //TODO

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
        Evol.UI.HTMLModal();

        return this;
    },
*/
    filterModels: function(models, filters){
        if(filters.length){
            return models.filter(function(model){
                var want=true,
                    i;
                for(i= 0, iMax=filters.length;i<iMax && want;i++){
                    var filter=filters[i],
                        vf=filter.value.value,
                        vm=model.get(filter.field.value);
                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    switch(filter.operator.value){
                        case 'eq': // equals
                            want=vf==vm;
                            break;
                        case 'ne': // not equal
                            want=vf!=vm;
                            break;
                        case 'gt': // > or after
                            want=vm>vf;
                            break;
                        case 'lt': // < or before
                            want=vm<vf;
                            break;
                        case 'bw': // between
                            var vf2=filter.value.value2;
                            want = !(vf>vm || vm>vf2);
                            break;
                        case 'sw': // start w/
                            want=vm.toLocaleLowerCase().indexOf(vf)===0;
                            break;
                        case 'ct': // contain
                            want=vm.toLocaleLowerCase().indexOf(vf)>-1;
                            break;
                        case 'fw': // finish w/
                            var l1=vm.length,
                                l2=vf.length;
                            if (l1>l2){
                                want=false;
                            }else{
                                want=vm.toLocaleLowerCase().substring(l2-l1)===vf;
                            }
                            break;
                        case 'null':
                            want= vm=='' || _.isUndefined(vm);
                            break;
                        case 'nn': // not null
                            want=!(_.isUndefined(vm) || vm=='');
                            break;
                        case 'in': // in []
                            want= _.contains(vf.split(','),vm);
                            break;
                        case 1:
                            want=vm;
                            break;
                        case 0:
                            want=!vm;
                            break;
                    }
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
                    return Evol.UI.input.img(f.id, iconsPath + v);
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
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h=[],
            EvoUI=Evol.UI,
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
            if(fld.type==fTypes.color){
                //h.push(Evol.UI.input.colorBox(fid, fv), fv);
                h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
            }else{
                h.push(this.HTMLField4Many(fld, fv, {}, iconsPath));
            }
            h.push('&nbsp;</div>');
        }else{
            switch (fld.type) {
                case fTypes.text:
                    h.push(EvoUI.input.text(fid, fv, fld, null));
                    break;
                case fTypes.int:
                case fTypes.dec:
                    h.push(EvoUI.input.textInt(fid, fv, fld.max, fld.min));
                    break;
                case fTypes.money:
                    h.push('<div class="input-group">', EvoUI.input.typeFlag('$'),
                        EvoUI.input.textInt(fid, fv), '</div>');
                    break;
                case fTypes.bool:
                    h.push(EvoUI.input.checkbox(fid, fv));
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
                    h.push(EvoUI.input.textM(fid, fv, fld.maxlength, fld.height));
                    break;
                case fTypes.date:
                    h.push(EvoUI.input.date(fid, fv));
                    break;
                case fTypes.datetime:
                    h.push(EvoUI.input.dateTime(fid, fv));
                    break;
                case fTypes.time:
                    h.push(EvoUI.input.time(fid, fv));
                    break;
                case fTypes.lov:
                    h.push(EvoUI.input.select(fid, fv, '', true, fld.list));
                    break;
                case fTypes.list: // fv is an array. will use select2
                    h.push('<div id="',fid, '" class="w-100 form-control"></div>');
                    break;
                case fTypes.email:
                    if (mode === 'view') {
                        h.push(EvoUI.linkEmail(fid, fv));
                    } else {
                        h.push('<div class="input-group">', EvoUI.input.typeFlag(Evol.i18n.sgn_email),
                            EvoUI.input.text(fid, fv, fld), '</div>');
                    }
                    break;
                case fTypes.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, encodeURI(fv), fid));
                    } else {
                        h.push(EvoUI.input.text(fid, fv, fld));
                    }
                    break;
                //case fTypes.doc:
                case fTypes.pix:
                    if(fv!==''){
                        h.push('<img src="',iconsPath+fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
                    }
                    h.push(EvoUI.input.text(fid, fv, fld, null));
                    break;
                case fTypes.color:
                    //h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    h.push(EvoUI.input.color(fid, fv));
                    break;
                case fTypes.hidden:
                    h.push(EvoUI.input.hidden(fid, fv));
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
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label" for="', fld.id, '">', fld.label);
        if (mode != 'view' && fld.required){
            h.push(Evol.UI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(Evol.UI.icon('question-sign', ''));
        }
        h.push('</label></div>');
        return h.join('');
    },

    HTMLFieldLink: function (id, fld, value, icon, noLink) {
        var h=[];
        if(!noLink){
            h.push('<a href="#" id="', id, '" class="evol-nav-id">');
        }
        if (icon) {
            h.push('<img class="evol-table-icon" src="', icon, '">');
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

    bbComparator:  function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA,modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    }

};

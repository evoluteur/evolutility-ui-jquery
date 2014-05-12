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
        doc:'document',
        lov: 'lov',
        money: 'money',
        //formula:'formula',
        //html:'html',
        email: 'email',
        //pwd: 'password',
        color: 'color',
        //hidden: 'hidden',
        //rating: 'rating',
        //tag: 'tag',
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
            case ft.integer:
                return parseInt($f.val(),10);
            case ft.decimal:
            case ft.money:
                return parseFloat($f.val());
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
    lovText:function(f, v, hash){
        if(f.list && f.list.length>0 && hash){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list,function(item){
                    return item.id==v;
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

    lovTextNoPix:function(f, v){
        var listItem=_.find(f.list,function(item){
            return item.id==v;
        });
        if(listItem){
            return listItem.text;
        }
        return '';
    },

    isTypeDateOrTime: function(fType){
        return fType == EvoDico.fieldTypes.datetime || EvoDico.fieldTypes.date || fType==EvoDico.fieldTypes.time;
    },

    showDesigner: function(id, type, $el, context){
        var $elDes=$('<div class="evodico-'+type+'"></div>'),
            model,
            uiModel;
//TODO set record
        this.getFields (dico_field_ui, function(m){
            return m.get('id')=='';
        })
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

        return this;
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
    },

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

    HTMLField4Many: function(f, v, hashLov){
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
                    return Evol.Dico.lovText(f, v, hashLov);
                    //}
                }
                break;
            case fTypes.date:
                return Evol.UI.formatDate(v);
            case fTypes.time:
                return Evol.UI.formatTime(v);
            case fTypes.datetime:
                return Evol.UI.formatDateTime(v);
            case fTypes.pix:
                if (v && v.length) {
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

    HTMLField4One: function(fld, fid, fv, mode, skipLabel){
        var h=[],
            size=50, // TODO fix it
            EvoUI=Evol.UI,
            types=Evol.Dico.fieldTypes;
        // --- field label ---
        if(mode==='mini'){
            var fwidth=fld.width;
            fld.width=100;
            h.push('<div class="evol-mini-label">', this.HTMLFieldLabel(fld, mode),
                '</div><div class="evol-mini-content">');
        }else if(!skipLabel){
            h.push(this.HTMLFieldLabel(fld, mode || 'edit'));
        }
        if(fld.readonly || mode==='view'){
            // TODO: css for readonly fields
            h.push('<div id="',fid, '" class="disabled evo-rdonly">', this.HTMLField4Many(fld, fv, {}), '&nbsp;</div>');
        }else{
            switch (fld.type) {
                case types.text:
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
                    break;
                case types.integer:
                case types.dec:
                    h.push(EvoUI.input.textInt(fid, fv, fld.max, fld.min));
                    break;
                case types.money:
                    h.push('<div class="input-group">', EvoUI.input.typeFlag('$'),
                        EvoUI.input.textInt(fid, fv), '</div>');
                    break;
                case types.bool:
                    h.push(EvoUI.input.checkbox(fid, fv));
                    break;
                case types.txtm:
                case types.html:
                    // fv = _.escape(fv);
                    if (fld.height === null) {
                        fld.height = 5;
                    } else {
                        fHeight = parseInt(fld.height,10);
                        if (fHeight < 1) {
                            fld.height = 5;
                        }
                    }
                    h.push(EvoUI.input.textM(fid, fv, fld.maxlength, fld.height));
                    break;
                case types.date:
                    h.push(EvoUI.input.date(fid, fv));
                    break;
                case types.datetime:
                    h.push(EvoUI.input.dateTime(fid, fv));
                    break;
                case types.time:
                    h.push(EvoUI.input.time(fid, fv));
                    break;
                case types.lov:
                    h.push(EvoUI.input.select(fid, fv, '', true, fld.list));
                    break;
                case types.email:
                    if (mode === 'view') {
                        h.push(EvoUI.linkEmail(fid, fv));
                    } else {
                        h.push('<div class="input-group">', EvoUI.input.typeFlag(Evol.i18n.sgn_email),
                            EvoUI.input.text(fid, fv, fld.maxlength), '</div>');
                    }
                    break;
                case types.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, encodeURI(fv), fid));
                    } else {
                        h.push(EvoUI.input.text(fid, fv, fld.maxlength));
                    }
                    break;
                //case types.doc:
                case types.pix:
                    if(fv!==''){
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
                    }
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
                    break;
                case types.color:
                    h.push(EvoUI.input.color(fid, fv));
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

    HTMLFieldLink: function (fid, fld, value, icon, noLink) {
        var h=[];
        if(!noLink){
            h.push('<a href="#" id="', fid, '" class="evol-nav-id">');
        }
        if (icon) {
            h.push('<img class="evol-table-icon" src="pix/', icon, '">');
        }/*
        if(_.isUndefined(value) || value===''){
            value='('+model.id+')';
        }*/
        h.push(value);
        if(!noLink){
            h.push('</a>');
        }
        return h.join('');
    }

};

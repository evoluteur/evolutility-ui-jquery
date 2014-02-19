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

    getFieldTypedValue:function(f, $f){
        switch(f.type) {
            case Evol.Dico.fieldTypes.bool:
                return $f.prop('checked');
            case Evol.Dico.fieldTypes.integer:
                return parseInt($f.val(),10);
            case Evol.Dico.fieldTypes.decimal:
            case Evol.Dico.fieldTypes.money:
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

    filterModels: function(models, filters){
        if(filters.length){
            return models.filter(function(model){
                var want=true,
                    i;
                for(i= 0, iMax=filters.length;i<iMax && want;i++){
                    var filter=filters[i],
                        vf=filter.value.value,
                        fv=model.get(filter.field.value);
                    if(fv===undefined){
                        fv='';
                    }
                    switch(filter.operator.value){
                        case 'eq':
                            want=vf===fv;
                            break;
                        case 'ne':
                            want=vf!==fv;
                            break;
                        case 'sw':
                            want=fv.indexOf(vf)===0;
                            break;
                        case 'ct':
                            want=fv.indexOf(vf)>-1;
                            break;
                        case 'fw':
                            want=fv.indexOf(vf)===fv.length-vf.length;
                            break;
                        case 'null':
                            want=fv==='' || fv===undefined;
                            break;
                        case 'nn':
                            want=fv!=='' || fv!==undefined;
                            break;
                        case 'in':
                            want= _.contains(vf.split(','),fv);
                            break;
                        case 1:
                            want=fv;
                            break;
                        case 0:
                            want=!fv;
                            break;
                    }
                }
                return want;
            });
        }
        return [];
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

    HTMLField4One: function(fld, fid, fv, mode, skipLabel){
        var h=[],
            size=50, // TODO fix it
            EvoUI=Evol.UI,
            types=Evol.Dico.fieldTypes;
        // --- field label ---
        if(mode==='mini'){
            var fwidth=fld.width;
            fld.width=100;
            h.push('<div class="evol-mini-label">',this.HTMLFieldLabel(fld, mode),
                '</div><div class="evol-mini-content">');
        }else if(!skipLabel){
            h.push(this.HTMLFieldLabel(fld, mode || 'edit'));
        }
        if(fld.readonly>0){
            // TODO: css for readonly fields
            h.push('<div id="',fid, '" class="FieldReadOnly">',fv, '&nbsp;</div>');
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
                    // fv = HttpUtility.HtmlEncode(fv);
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
                        h.push(EvoUI.link(fid, fv, 'mailto:' + HttpUtility.HtmlEncode(fv)));
                    } else {
                        h.push('<div class="input-group">', EvoUI.input.typeFlag(Evol.i18n.sgn_email),
                            EvoUI.input.text(fid, fv, fld.maxlength), '</div>');
                    }
                    break;
                case types.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, HttpUtility.HtmlEncode(fv)));
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
    }

};

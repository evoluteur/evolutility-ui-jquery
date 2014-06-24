/*! ***************************************************************************
 *
 * evolutility :: one.js
 *
 * View one
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne = Backbone.View.extend({

    viewType:'one',
    cardinality: '1',
    editable: true,
    _tabId: false,

    events: {
        'click .evol-buttons>button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs>li>a': 'click_tab',
        'click label>.glyphicon-question-sign': 'click_help',
        'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
        // extra evt for $(window) resize
    },

    options: {
        button_addAnother: false,
        style: 'panel-info',
        titleSelector: '#title',
        iconsPath: 'pix/'
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.mode= opts.mode || this.options.mode || this.viewName;
        this._uTitle=(!_.isUndefined(this.options.titleSelector)) && this.options.titleSelector!=='';
        this._subCollecs=this._subCollecsOK=false;
        /*
        if(this.model){
            this.model.on('change', function(model){
                that.setModel(model);
            });
        }*/
        //TODO set responsive layout
    },

    render: function () {
        var h = [];
        this._render(h, this.mode);
        this.$el.html(h.join(''));
        this.custOn=false;
        this.postRender();
        this.setData(this.model, true); // TODO remove it
        return this;
    },

    postRender: function (){
        // to overwrite...

    },

    getFields: function (){
        if(!this._fields){
            this._fields=Evol.Dico.getFields(this.options.uiModel, this.getFieldsCondition);
            this._fieldHash={};
            var that=this;
            _.each(this._fields,function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getSubCollecs: function (){
        if(!this._subCollecsOK){
            this._subCollecs=Evol.Dico.getSubCollecs(this.options.uiModel);
            this._subCollecsOK=true;
        }
        return this._subCollecs;
    },

    setModel: function(model) {
        this.model = model;
        return this
            .clearMessages()
            .setData(model, true);
    },

    getModel:function() {
        return this.model;
    },

    setUIModel: function(uimodel) {
        this.options.uiModel = uimodel;
        //var d=this.getData();
        return this.clearCache().render();  //.setData(d);
    },
    getUIModel: function() {
        return this.options.uiModel;
    },
/*
    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },*/

    getTitle: function(){
        if(this.model){
            var lf=this.options.uiModel.leadfield;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return Evol.UI.capitalize(this.options.uiModel.entity);
        }
    },

    getData: function (skipReadOnlyFields) {
        var that = this,
            fs=this.getFields(),
            vs = {},
            subCollecs=this.getSubCollecs();

        _.each(fs, function(f){
            vs[f.id]=that.getFieldValue(f);
        });
        if(subCollecs){
            // -- for each sub collection (panel-list)
            _.each(subCollecs, function (sc) {
                var rows=that.$('[data-pid="'+sc.id+'"] tbody tr').not('[data-id="nodata"]').toArray(),
                    v,
                    cells,
                    vs2=[];
                // -- for each row
                _.each(rows,function(row){
                    v={};
                    cells=$(row).children();
                    // -- for each field
                    _.each(sc.elements,function(f, idx){
                        v[f.id]=Evol.Dico.getFieldTypedValue(f, cells.eq(idx).find('input,select,textarea').eq(0));
                    });
                    vs2.push(v);
                });
                vs[sc.attr||sc.id]=vs2;
            });
        }
        if(skipReadOnlyFields){
            _.each(this.getFields(),function(f){
                if(f.readonly){
                    delete vs[f.id];
                }
            });
        }
        return vs;
    },

    setData: function (model, isModel) {
        if(!_.isUndefined(model) && model!==null){
            var fs = this.getFields(),
                that=this,
                fTypes = Evol.Dico.fieldTypes,
                $f, fv,
                prefix='#'+ this.prefix + '-',
                subCollecs=this.getSubCollecs(),
                iconsPath=this.options.iconsPath||'',
                newPix;
            _.each(fs, function (f) {
                $f=that.$(prefix + f.id);
                if(isModel){
                    fv=model.get(f.attribute || f.id);
                }else{
                    fv=model[f.attribute || f.id];
                }
                if(f.readonly){
                    if(f.type===fTypes.pix){
                        newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                        $f.val(fv)
                            .prev().remove();
                        $f.before(newPix);
                    }else{
                        switch(f.type){
                            case fTypes.lov:
                            case fTypes.bool:
                            case fTypes.email:
                            case fTypes.url:
                                $f.html(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov, iconsPath));
                                break;
                            case fTypes.pix:
                                $f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                                break;
                            default:
                                $f.text(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov, iconsPath) || ' ');
                        }
                    }
                }else{
                    switch(f.type) {
                        case fTypes.lov:
                            var $fc=$f.children().removeAttr('selected');
                            if(fv!==''){
                                $fc.filter('[value='+fv+']')
                                    .attr('selected', true);
                            }
                            break;
                        case fTypes.bool:
                            $f.prop('checked', fv);
                            break;
                        case fTypes.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            break;
                        case fTypes.list:
                            $f.select2('val', fv);
                            break;
                        default:
                            $f.val(fv);
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, 'edit');
                    that.$('[data-pid="'+sc.id+'"] tbody')
                        .html(h.join(''));
                });
            }
        }else{
            // TODO show no data msg or something
            this.clear();
        }
        return this.setTitle();
    },

    setFieldValue: function (fid, value){
        this.$('#'+this.fieldViewId(fid))
            .val(value);
        return this;
    },

    getFieldValue: function (f){
        return Evol.Dico.getFieldTypedValue(f, this.$field(f));
    },

    $field: function (f){
        return this.$('#'+this.fieldViewId(f.id));
    },

    clear: function () {
        var ft =Evol.Dico.fieldTypes,
            fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs(),
            defaultVal;

        this.clearMessages();
        _.each(fs, function (f) {
            $f = that.$(prefix + f.id);
            defaultVal = f.defaultvalue || '';
            switch(f.type) {
                case ft.bool:
                    $f.prop('checked', defaultVal);
                    break;
                case ft.list:
                    $f.select2('val', null);
                    break;
                case ft.pix:
                    //var newPix=(defaultVal)?('<img src="'+iconsPath+defaultVal+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                    var newPix='<p class="">'+Evol.i18n.nopix+'</p>';
                    $f.val('')
                        .prev().remove();
                    $f.before(newPix);
                    break;
                default:
                    if(f.readonly){
                        $f.html(defaultVal);
                    }else{
                        $f.val(defaultVal);
                    }
            }
        });
        if(subCollecs){
            _.each(subCollecs, function (sc) {
                that.$('[data-pid="'+sc.id+'"] tbody')
                    .html(that._TRnodata(sc.elements.length, 'edit'));
            });
        }
        return this;
    },

    clearCache: function(fid, fvDefault, mode){
        this._fieldHash=null;
        this._fields=null;
        this._subCollecsOK=false;
        return this;
    },

    getModelFieldValue: function(fid, fvDefault, mode){
        if(this.model && this.model.has(fid)){
            return (mode !== 'new') ? this.model.get(fid) : fvDefault || '';
        }
        return '';
    },

    isDirty: function(){
        function nullOrUndef(v){
            return v==='' || _.isUndefined(v) || v===null || v===false;
        }
        function emptyOrUndef(v){
            return v===null || _.isUndefined(v) || v===[];
        }
        if(this.editable){
            var fs= this.getFields(),
                ft=Evol.Dico.fieldTypes,
                data=this.getData(),
                model=this.model,
                i,
                iMax=fs.length,
                subCollecs=this.getSubCollecs(),
                noModelVal,
                noDataVal;

            for (i = 0; i < iMax; i++) {
                var f=fs[i],
                    prop = f.attribute || f.id,
                    dataVal = data[prop],
                    modelVal = model.get(prop);
                noModelVal = nullOrUndef(modelVal);
                noDataVal = nullOrUndef(dataVal) || (isNaN(dataVal) && (f.type===ft.int || f.type===ft.dec || f.type===ft.money));
                if(_.isArray(modelVal)){
                    if(!_.isEqual(modelVal, dataVal)){
                        return true;
                    }
                    // TODO compare arrays?
                }else if(!(dataVal == modelVal || (noDataVal && noModelVal))) {
                    return true;
                }
            }
            if(subCollecs){
                var scIds=Object.keys(subCollecs);
                iMax=scIds.length;
                for (i = 0; i<iMax; i++) {
                    var scId=scIds[i],
                        dVals=data[scId],
                        mVals=this.model.get(scId),
                        fs2=subCollecs[scId].elements;
                    if(emptyOrUndef(dVals)){
                        dVals=[];
                    }
                    if(emptyOrUndef(mVals)){
                        mVals=[];
                    }
                    if(dVals.length!==mVals.length){
                        return true;
                    }else{
                        for(var r=0;r<dVals.length;r++){
                            var dObj = dVals[r],
                                mObj = mVals[r];
                            for(var j=0;j<fs2.length;j++) {
                                var fid = fs2[j].id,
                                    dv=dObj[fid],
                                    mv=mObj[fid],
                                    dNo=nullOrUndef(dv),
                                    mNo=nullOrUndef(mv);
                                if(dNo!==mNo || (dv!==mv)){
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    showTab: function (tabId) {
        var tab = this.$(tabId);
        if (tab.length > 0) {
            tab.siblings('.tab-pane').hide();
            tab.show();
        }
        tab = this.$('.evol-tabs > li a[href="' + tabId + '"]').parent();
        if (tab.length > 0) {
            tab.siblings('li').removeClass('active');
            tab.addClass('active');
        }
        this._tabId = tabId;
        this.$el.trigger('tab.show', {id:tabId});
        return this;
    },

    _renderButtons: function (h, mode) {
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'),
            Evol.UI.input.button('save', Evol.i18n.bSave, 'btn-primary'));
        if (this.model && this.model.isNew() && this.options.button_addAnother && mode!=='json') {
            h.push(Evol.UI.input.button('save-add', Evol.i18n.bSaveAdd, 'btn-default'));
        }
        h.push('</div>');
    },

    _render: function (h, mode) {
        // EDIT and VIEW forms
        var that=this,
            iTab = -1,
            iPanel = -1,
            opts = this.options,
            elems = opts.uiModel.elements,
            iMax = elems.length;

        h.push('<div class="evo-one-',mode,'">');
        _.each(elems, function(p, idx){
            if(p.type==='tab'){
                if (iPanel > 0) {
                    h.push('</div>');
                    iPanel = -1;
                }
                if (iTab < 0) {
                    h.push(Evol.UI.html.clearer);
                    that.renderTabs(h, elems);
                    h.push('<div class="tab-content">');
                }
                iTab++;
                h.push('<div id="evol-tab-', idx, '" class="tab-pane', (idx === 1 ? ' active">' : '">'));
                that.renderTab(h, p, mode);
                if (iTab == iMax - 1) {
                    h.push('</div>');
                }
            }else{
                if (iPanel < 0) {
                    h.push('<div class="evol-pnls">');
                    iPanel = 1;
                }
                if(p.type==='panel-list'){
                    that.renderPanelList(h, p, mode);
                }else{ // if(p.type==='panel')
                    that.renderPanel(h, p, 'p-' + ((p.id)?p.id:idx), mode);
                }
            }
        });
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
    },

    renderTabs: function (h, tabs) {
        var isFirst = true;
        h.push('<ul class="nav nav-tabs evol-tabs">');
        _.each(tabs, function (tab, idx) {
            if (tab.type === 'tab') {
                if (isFirst) {
                    h.push('<li class="active">');
                    isFirst = false;
                } else {
                    h.push('<li>');
                }
                h.push('<a href="#evol-tab-', idx, '">', tab.label, '</a></li>');
            }
        });
        h.push('</ul>');
    },

    renderTab: function (h, tab, mode) {
        var that = this;
        h.push('<div class="evol-pnls">');
        _.each(tab.elements, function (uip, idx) {
            if (uip.type === 'panel-list') {
                that.renderPanelList(h, uip, mode);
            } else {
                that.renderPanel(h, uip, uip.id || 'pl-'+idx, mode);
            }
        });
        h.push(Evol.UI.html.clearer, '</div></div>'); // TODO 2 div?
    },

    renderPanel: function (h, p, pid, mode, visible) {
        var that = this,
            fTypes=Evol.Dico.fieldTypes,
            iconsPath = this.options.iconsPath || '';
        if(mode==='wiz'){
            var hidden= _.isUndefined(visible)?false:!visible;
            h.push('<div data-p-width="100" class="evol-pnl evo-p-wiz" style="width:100%;',hidden?'display:none;':'','">');
        }else{
            h.push('<div data-p-width="', p.width, '" class="evol-pnl');
            if(mode==='mini'){
                h.push(' w-100 ', (p.class || ''), '">');
            }else{
                h.push(' pull-left" style="width:', p.width, '%">');
            }
        }
        h.push(
            Evol.UI.HTMLPanelBegin(pid, p.label, this.options.style),
            '<fieldset data-pid="', pid, '">');
        if(mode==='mini'){
            _.each(p.elements, function (elem) {
                if(elem.type==fTypes.hidden){
                    h.push(Evol.UI.input.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                }else{
                    h.push('<div class="pull-left evol-fld w-100">');
                    that.renderField(h, elem, mode, iconsPath);
                    h.push("</div>");
                }
            });
        }else{
            _.each(p.elements, function (elem) {
                if(elem.type=='panel-list'){
                    that.renderPanelList(h, elem, mode);
                }else{
                    if(elem.type==fTypes.hidden){
                        h.push(Evol.UI.input.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                    }else{
                        h.push('<div style="width:', parseInt(elem.width, 10), '%" class="pull-left evol-fld">');
                        that.renderField(h, elem, mode, iconsPath);
                        h.push("</div>");
                    }
                }
            });
        }
        h.push('</fieldset>',
            Evol.UI.HTMLPanelEnd(),
            '</div>');
        return this;
    },

    renderPanelList: function (h, p, mode) {
        h.push('<div style="width:', p.width, '%" class="evol-pnl pull-left" data-pid="', p.id,'">',
            Evol.UI.HTMLPanelBegin(p.id, p.label, this.options.style),
            '<table class="table" data-mid="', p.attr,'"><thead><tr>'); // table-striped
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, '</th>');
        });
        if(mode==='edit'){
            h.push('<th></th>');
        }
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h, p, null, mode);
        h.push('</tbody></table>',
            Evol.UI.HTMLPanelEnd(),
            '</div>');
        return this;
    },

    _renderPanelListBody: function (h, uiPnl, fv, mode){
        var that=this,
            fs = uiPnl.elements,
            iconsPath=this.options.iconsPath || '';

        if(this.model){
            var vs = this.model.get(uiPnl.attr);
            if(vs && vs.length>0){
                var TDbPM='<td class="evo-td-plusminus">'+Evol.UI.input.buttonsPlusMinus()+'</td>';
                _.each(vs, function(row, idx){
                    h.push('<tr data-idx="', idx, '">');
                    if(mode==='edit'){
                        that._TDsFieldsEdit(h, uiPnl.elements, row);
                        h.push(TDbPM);
                    }else{
                        _.each(fs, function (f) {
                            h.push('<td>');
                            if(row[f.id]){
                                //form-control
                                if(f.type!==Evol.Dico.fieldTypes.bool){
                                    h.push(_.escape(Evol.Dico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath)));
                                }else{
                                    h.push(Evol.Dico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath));
                                }
                            }else{
                                h.push(Evol.Dico.HTMLField4Many(f, '', Evol.hashLov, iconsPath));
                            }
                            h.push('</td>');
                        });
                    }
                    h.push('</tr>');
                });
                return;
            }
        }
        h.push(this._TRnodata(fs.length, mode));
    },

    _TRnodata: function(colspan, mode){
        return ['<tr data-id="nodata"><td colspan="', mode==='edit'?(colspan+1):colspan, '" class="evol-pl-nodata">',
            Evol.i18n.nodata,
            mode==='edit'?'<div data-id="bPlus" class="glyphicon glyphicon-plus-sign"></div>':'',
            '</td></tr>'].join('');
    },

    _TDsFieldsEdit: function(h, fs, m){
        var fv,
            iconPath=this.options.iconPath || '';
        _.each(fs, function (f) {
            fv=m[f.id];
            if(_.isUndefined(fv)){
                fv='';
            }
            h.push('<td>', Evol.Dico.HTMLField4One(f, f.id, fv, 'edit-details', iconPath, true), '</td>');
        });
    },

    renderField: function (h, f, mode, iconsPath) {
        var fid = this.fieldViewId(f.id),
            fv='';
        if(this.model && this.model.has(f.id)){
            fv = (mode !== 'new') ? this.model.get(f.id) : f.defaultvalue || '';
        }
        h.push(Evol.Dico.HTMLField4One(f, fid, fv, mode, iconsPath));
        return this;
    },

    setTitle: function (title){
        if(this._uTitle){
            var opts=this.options,
                selector=opts.titleSelector;
            if(selector && selector!==''){
                var t,lf=opts.uiModel.leadfield;
                if(title){
                    t=title;
                }else if((!_.isUndefined(lf)) && lf!==''){
                    t=this.getTitle();
                }else{
                    t=Evol.UI.capitalize(opts.uiModel.entities);
                }
                $(selector).text(t);
                this._uTitle=true;
                return this;
            }
            this._uTitle=false;
        }
        return this;
    },

    validate: function (fields) {
        // validate top level fields
        var isValid=true,
            fs = fields?fields:this.getFields();
        this.clearMessages();
        if (_.isArray(fs)) {
            isValid = this.checkFields(this.$el, fs);
        }
        // validate sub-collections
        if(this._subCollecs){
            var that=this;
            //TODO
            //_.each(this._subCollecs, function (sc) {
            //    var trs=that.$('[data-pid="'+sc.id+'"] tbody > tr');
            //    _.each(fs, function(f){

                //  });
            //});
        }
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid;
    },

    valRegEx: {
        email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
        integer: /^[-+]?\d+$/,
        decimalEN: /^\d+(\.\d+)?$/,
        decimalFR: /^\d+(\,\d+)?$/,
        decimalDA: /^\d+(\,\d+)?$/
    },

    checkFields: function (holder, fds) {
        var that = this,
            ft = Evol.Dico.fieldTypes,
            i18nVal = Evol.i18n.validation,
            msgs = [],
            v,
            values = this.getData(true);

        function checkType(fd, fv) {
            var ft = Evol.Dico.fieldTypes,
                i18nVal=Evol.i18n.validation;
            if (fv !== '' && !_.isArray(fv)){
                switch (fd.type) {
                    case ft.int:
                    case ft.email:
                        if (!that.valRegEx[fd.type].test(fv)) {
                            flagField(fd, i18nVal[fd.type]);
                        }
                        break;
                    case ft.dec:
                    case ft.money:
                        var regex = that.valRegEx[ft.dec + Evol.i18n.LOCALE] || that.valRegEx[ft.dec + 'EN'];
                        if (!regex.test(fv))
                            flagField(fd, i18nVal[fd.type]);
                        break;
                    case ft.date:
                    case ft.datetime:
                    case ft.time:
                        if ((fv !== '') && (!_.isDate(new Date(fv)))) {
                            flagField(fd, i18nVal[fd.type]);
                        }
                        break;
                }
            }
        }

        function flagField(fd, msg, r2, r3) {
            var msgf = msg.replace('{0}', fd.label);
            // TODO loop through args
            if (r2 !== null) {
                msgf = msgf.replace('{1}', r2);
            }
            if (r3 !== null) {
                msgf = msgf.replace('{2}', r3);
            }
            if(_.isArray(msgs)){
                msgs.push(msgf);
            }
            var p=that.$field(fd).parent();
            var errlabel = p.find('.text-danger');
            if (errlabel.length) {
                errlabel.html(msgf);
            } else {
                p.append('<p class="text-danger">' + msgf + '</p>');
            }
            p.addClass('has-error');
        }

        _.each(fds,function(f){
            v = values[f.id];

            if(!f.readonly){

                // Check required/empty or check type
                if (f.required && (v==='' ||
                    (f.type===ft.int && isNaN(v)) ||
                    (f.type===ft.dec && isNaN(v)) ||
                    (f.type===ft.money && isNaN(v)) ||
                    (f.type===ft.lov && v==='0') ||
                    (f.type===ft.list && v.length===0) ||
                    (f.type===ft.color && v==='#000000'))){
                    flagField(f, i18nVal.empty);
                } else {
                    if( !(isNaN(v) && (f.type===ft.int || f.type===ft.dec || f.type===ft.money))) {
                        checkType(f, v);
                    }

                    // Check regexp
                    if (f.regex !== null && !_.isUndefined(f.regex)) {
                        var rg = new RegExp(f.regex);
                        if (!v.match(rg)) {
                            flagField(f, i18nVal.regex, f.label);
                        }
                    }
                    /*
                     // Check custom
                     if (f.customvalidation !== null) {
                         //TODO do not use eval
                         var p = eval([f.customvalidation, '("', that.prefix, f.id, '","', f.label, '")'].join(''));
                         if (p !== null && p.length > 0) {
                             flagField(f, p);
                         }
                     }*/

                    // Check min & max
                    if (f.type === ft.int || f.type === ft.dec || f.type === ft.money) {
                        if (v !== '') {
                            if (f.max !== null && parseFloat(v) > f.max) {
                                flagField(f, i18nVal.max, f.max);
                            }
                            if (f.min !== null && parseFloat(v) < f.min) {
                                flagField(f, i18nVal.min, f.min);
                            }
                        }
                    }
                }

                // Check minlength and maxlength
                if (_.isString(v) && v.length > 0) {
                    var ok = true,
                        len = v.length;
                    if (len > 0) {
                        if (f.maxlength) {
                            ok = len <= f.maxlength;
                            if (!ok) {
                                if (f.minlength) {
                                    flagField(f, i18nVal.minmaxlength, f.minlength, f.maxlength);
                                } else {
                                    flagField(f, i18nVal.maxlength, f.maxlength);
                                }
                            }
                        }
                        if (ok && f.minlength) {
                            ok = len >= f.minlength;
                            if (!ok) {
                                if (f.maxlength) {
                                    flagField(f, i18nVal.minmaxlength, f.minlength, f.maxlength);
                                } else {
                                    flagField(f, i18nVal.minlength, f.minlength);
                                }
                            }
                        }
                    }
                }

            }

        });

        if (msgs.length > 0) {
            return [i18nVal.intro, '<ul><li>', msgs.join('</li><li>'), '</li></ul>'].join('');
        } else {
            return '';
        }
    },

    clearErrors: function () {
        this.$('.control-group.error').removeClass("control-group error");
        //this.$('.evol-warn-error').remove();
        this.$('.has-error').removeClass('has-error');
        this.$('.text-danger').remove();
        return this;
    },

    fieldViewId: function(fid){
        return this.prefix + '-' + fid;
    },

    customize: function(){
        var labelSelector = '.evol-field-label>label',
            panelSelector ='.evol-pnl .panel-title';
        if(this.custOn){
            this.$(labelSelector + '>i, '+ panelSelector + '>i').remove();
            this.custOn=false;
        }else{
            _.each(this.$(labelSelector),function(elem){
                var $el=$(elem),
                    id=$el.attr('for');
                $el.append(Evol.UI.iconCustomize(id,'field'));
            });
            this.$(panelSelector).append(Evol.UI.iconCustomize('id','panel'));
            this.custOn=true;
        }
        return this;
    },

    showHelp:function(id, type, $el){
        var fs=this.getFields(),
            fld=_.findWhere(fs,{id:id});

        if(fld && fld.help){
            var $f=$el.closest('.evol-fld'),
                $fh=$f.find('.help-block');
            if($fh.length>0){
                $fh.slideUp(200, function(){
                    $fh.remove();
                });
            }else{
                $fh=$('<span class="help-block">' + _.escape(fld.help) + '</span>').hide();
                $f.append($fh);
                $fh.slideDown(200);
            }
        }
        return this;
    },

    /*
     _setResponsive: function (evt) {
         if(mode==='new' || mode==='edit'){
            this.windowSize='big';
            $(window).resize(function() {
                var pnls = that.$('.evol-pnl');
                 if($(window).width()>480){
                    if(that.windowSize!=='big'){
                        _.each(pnls, function (pnl){
                            var $p=$(pnl),
                            ps=$p.data('p-width');
                            $p.attr('style', 'width:'+ps+'%;');
                        });
                        that.windowSize='big';
                    }
                 }else{
                     if(that.windowSize!=='small'){
                         pnls.attr('style', 'width:100%');
                         that.windowSize='small';
                     }
                }
             });
         }
     }*/

    clearMessages: function(){
        this.$el.trigger('message', null);
        return this.clearErrors();
    },

    sendMessage: function(title,content,style){
        return this.$el.trigger('message',{
            title:title,
            content:content,
            style:style
        });
    },

    setTab: function(tabId){
        this._tabId = tabId;
        this.showTab(tabId);
    },
    getTab: function(){
        return this._tabId;
    },

    click_button: function (evt) {
        var bId = $(evt.currentTarget).data('id');
        evt.stopImmediatePropagation();
        this.$el.trigger('action', bId);
    },

    click_toggle: function (evt) {
        var $this = $(evt.currentTarget),
            content = $this.closest('.panel-heading').next(),
            state = content.data('expState'),
            cssUp = 'glyphicon-chevron-up',
            cssDown = 'glyphicon-chevron-down';
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if(evt.shiftKey){
            var css = (state==='down')?cssDown:cssUp;
            this.$('.evol-title-toggle.'+css)
                .trigger('click');
        }else{
            if (state === 'down') {
                $this.closest('.panel').css('height','');
                content.slideDown(300)
                    .data('expState', 'up');
                $this.addClass(cssUp)
                    .removeClass(cssDown);
            } else {
                content.slideUp(300, function() {
                    $this.closest('.panel').css('height','40px');
                }).data('expState', 'down');
                $this.removeClass(cssUp)
                    .addClass(cssDown);
            }
        }
        this.$el.trigger('panel.toggle');
    },

    click_tab: function (evt) {
        var href = evt.currentTarget.href,
            id = href.substring(href.indexOf('#'));
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if(evt.shiftKey){
            this.$('.tab-content > div').show();
        }else{
            this.showTab(id);
        }
        this._tabId = id;
    },

    click_help: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.closest('label').attr('for'),
            eType=$e.data('type');

        evt.stopImmediatePropagation();
        this.showHelp(id, eType, $e);
        /*if(evt.shiftKey){
            id=0;
            var flds=$e.closest('.evo-one-edit').find('label > .glyphicon-question-sign');
            _.each(flds, function(f){
                // that.showHelp(id, eType, $e);
            });
        }else{
            this.showHelp(id, eType, $e);
        }*/
        this.$el.trigger(eType+'.help', {id: id});
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');
        evt.stopImmediatePropagation();
        Evol.Dico.showDesigner(id, eType, $e, this);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    },

    click_detailsAddDel: function(evt){
        var $targ=$(evt.currentTarget),
            bId=$targ.data('id'),
            tr=$targ.closest('tr');

        evt.stopImmediatePropagation();
        if(bId==='bPlus'){
            var h=[],
                subCollecs=this.getSubCollecs(),
                mid=tr.closest('table').data('mid'),
                elems=(subCollecs[mid])?subCollecs[mid].elements:null;
            h.push('<tr>');
            this._TDsFieldsEdit(h, elems, {});
            h.push('<td class="evo-td-plusminus">',
                Evol.UI.input.buttonsPlusMinus(),
                '</td></tr>');
            $(h.join('')).insertAfter(tr);
            if(tr.data('id')==='nodata'){
                tr.remove();
            }
        }else if(bId==='bMinus'){
            if(tr.siblings().length===0){
                $(this._TRnodata(tr.children().length, 'edit'))
                    .insertAfter(tr);
            }
            tr.remove();
        }
    }

});


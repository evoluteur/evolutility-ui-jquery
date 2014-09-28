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

    events: {
        'click .evol-buttons>button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs>li>a': 'click_tab',
        'click label>.glyphicon-question-sign': 'click_help',
        //'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    options: {
        button_addAnother: false,
        style: 'panel-info',
        titleSelector: '#title',
        iconsPath: 'pix/'
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.mode = opts.mode || this.options.mode || this.viewName;
        this.uiModel = this.options.uiModel;
            /*
            var uim = this.options.uiModel;
            debugger
            if(uim && uim.getFields){
                this.uiModel = uim;
            }else{
                this.uiModel = new Evol.UIModel(uim);
            }*/
        this._tabId = false;
        this._uTitle = (!_.isUndefined(this.options.titleSelector)) && this.options.titleSelector!=='';
        this._subCollecs = this._subCollecsOK = false;
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
            this._fields=Evol.Dico.getFields(this.uiModel, this.getFieldsCondition);
            this._fieldHash={};
            var that=this;
            _.each(this._fields, function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getSubCollecs: function (){
        if(!this._subCollecsOK){
            this._subCollecs=Evol.Dico.getSubCollecs(this.uiModel);
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
        this.uiModel = uimodel;
        //var d=this.getData();
        return this.clearCache().render();  //.setData(d);
    },
    getUIModel: function() {
        return this.uiModel;
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
            if(this.model.isNew()){
                return Evol.i18n.getLabel('NewEntity', this.uiModel.entity);
            }
            var lf=this.uiModel.leadfield;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return Evol.UI.capitalize(this.uiModel.entity);
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
            _.each(fs, function(f){
                if(f.readonly){
                    delete vs[f.id];
                }
            });
        }
        return vs;
    },

    setData: function (model, isModel) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                fTypes = Evol.Dico.fieldTypes,
                $f, fv,
                subCollecs=this.getSubCollecs(),
                iconsPath=this.options.iconsPath||'',
                newPix;

            _.each(this.getFields(), function (f) {
                $f=that.$field(f.id);
                if(isModel){
                    if(f.value){
                        fv=f.value(model);
                    }else{
                        fv=model.get(f.attribute || f.id);
                    }
                }else{
                    fv=model[f.attribute || f.id];
                }
                if(f.readonly){
                    switch(f.type){
                        case fTypes.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            //$f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        case fTypes.textml:
                            $f.html(Evol.UI.cr2br(fv));
                            break;
                        case fTypes.bool:
                        case fTypes.url:
                        case fTypes.email:
                            $f.html(Evol.Dico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                            break;
                        default:
                            $f.text(Evol.Dico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                    }
                }else{
                    switch(f.type) {
                        case fTypes.lov:
                            var $fc=$f.children().removeAttr('selected');
                            if(fv!==''){
                                $fc.filter('[value='+fv+']')
                                    .prop('selected', 'selected'); // FF need prop not attr
                            }
                            break;
                        case fTypes.bool:
                            $f.prop('checked', fv?'checked':false);
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
            // TODO show no data or error msg or something

            this.clear();
        }
        return this.setTitle();
    },

    setFieldValue: function (fid, value){
        this.$field(fid)
            .val(value);
        return this;
    },

    getFieldValue: function (f){
        return Evol.Dico.getFieldTypedValue(f, this.$field(f.id));
    },

    $field: function (id){
        return this.$('#'+this.fieldViewId(id));
    },

    clear: function () {
        var that=this,
            ft =Evol.Dico.fieldTypes,
            $f,
            subCollecs=this.getSubCollecs(),
            defaultVal;

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f = that.$field(f.id);
            defaultVal = f.defaultvalue || '';

            if(f.readonly){
                $f.html(defaultVal);
            }else{
                switch(f.type) {
                    case ft.bool:
                        $f.prop('checked', defaultVal?'checked':false);
                        break;
                    case ft.list:
                        $f.select2('val', null);
                        break;
                    case ft.pix:
                        //var newPix=(defaultVal)?('<img src="'+iconsPath+defaultVal+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                        var newPix='<p>'+Evol.i18n.nopix+'</p>';
                        $f.val('')
                            .prev().remove();
                        $f.before(newPix);
                        break;
                    default:
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

    clearCache: function(){
        this._fieldHash = null;
        this._fields = null;
        this._subCollecs = this._subCollecsOK = false;
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
        this.$el.trigger('show.tab', {id:tabId});
        return this;
    },

    _renderButtons: function (h, mode) {
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.bCancel, 'btn-default'),
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
            elems = this.uiModel.elements,
            iMax1 = elems.length - 1;

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
                h.push('<div id="evol-tab-', idx, '" class="tab-pane', (iTab === 0 ? ' active">' : '">'));
                that.renderTab(h, p, mode);
                if (iTab == iMax1) {
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
                h.push(' evol-p-mini ', (p.class || ''), '">');
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
            '<table class="table" data-mid="', (p.attribute || p.id),'"><thead><tr>');
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, elem.required?Evol.UI.html.required:'', '</th>');
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
            var vs = this.model.get(uiPnl.attribute);
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
            var selector=this.options.titleSelector;
            if(selector && selector!==''){
                var t,lf=this.uiModel.leadfield;
                if(title){
                    t=title;
                }else if((!_.isUndefined(lf)) && lf!==''){
                    t=this.getTitle();
                }else{
                    t=Evol.UI.capitalize(this.uiModel.entities);
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
        // --- validate top level fields
        var fs = fields?fields:this.getFields(),
            data = this.getData(true),
            isValid,
            errMsgs=[];

        this.clearMessages();
        errMsgs = this._checkFields(fs, data);
        isValid = errMsgs==='';
        // validate sub-collections
        if(this._subCollecs){
            var that = this;
            _.each(this._subCollecs, function (sc) {
                var scData = data[sc.id],
                    trs = that.$('[data-pid="'+sc.id+'"] tbody > tr'),
                    scInvalid = 0;
                _.each(scData, function(rowData, idx){
                    _.each(sc.elements, function(f){
                        var msg = that.validateField(f, rowData[f.id]);
                        if(msg){
                            trs.eq(idx).find('#'+f.id).parent().addClass('has-error');
                            scInvalid++;
                        }
                    });
                });
                if(scInvalid>0){
                    var pMsg='validation.invalidList'+((scInvalid===1)?'1':'');
                    pMsg=Evol.i18n.getLabel(pMsg, scInvalid, sc.label);
                    errMsgs.push(pMsg);
                    isValid = false;
                }
            });
        }
        this.$el.trigger('action', 'validate', {valid:isValid});
        return errMsgs;
    },

    valRegEx: {
        email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
        integer: /^[-+]?\d+$/, // /^[0-9]*/,
        decimalEN: /(\+|-)?(\d*\.\d*)?$/
        //decimalFR: /(\+|-)?(\d*\,\d*)?$/,
        //decimalDA: /(\+|-)?(\d*\,\d*)?$/
    },

    _checkFields: function (fds, values) {
        var that = this,
            msgs = [],
            msg1;

        function flagField(fd, msg) {
            if(_.isArray(msgs)){
                msgs.push(msg);
            }
            var p=that.$field(fd.id).parent();
            var errlabel = p.find('.text-danger');
            if (errlabel.length) {
                errlabel.html(msg);
            } else {
                p.append('<p class="text-danger">' + msg + '</p>');
            }
            p.addClass('has-error');
        }

        _.each(fds,function(f){
            msg1=that.validateField(f, values[f.id]);
            if(msg1!==''){
                //.addClass('has-error')
                flagField(f, msg1);
            }
        });

        return msgs;
    },

    validateField: function(f, v){
        var i18nVal = Evol.i18n.validation,
            ft = Evol.Dico.fieldTypes;

        function formatMsg(fLabel, msg, r2, r3){
            return msg.replace('{0}', fLabel)
                .replace('{1}', r2)
                .replace('{2}', r3);
        }

        if(!f.readonly){

            // Check required and empty
            if (f.required && (v==='' ||
                    ((f.type===ft.int || f.type===ft.dec || f.type===ft.money) && isNaN(v)) ||
                    (f.type===ft.lov && v==='0') ||
                    (f.type===ft.list && v.length===0) ||
                    (f.type===ft.color && v==='#000000'))){
                return formatMsg(f.label, i18nVal.empty);
            } else {

                // Check field type
                if( !(isNaN(v) && (f.type===ft.int || f.type===ft.dec || f.type===ft.money))) {
                    if (v !== '' && !_.isArray(v)){
                        switch (f.type) {
                            case ft.int:
                            case ft.email:
                                if (!this.valRegEx[f.type].test(v)) {
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case ft.dec:
                            case ft.money:
                                var regex = this.valRegEx[ft.dec + Evol.i18n.LOCALE] || this.valRegEx[ft.dec + 'EN'];
                                if (!regex.test(v)){
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case ft.date:
                            case ft.datetime:
                            case ft.time:
                                if ((v !== '') && (!_.isDate(new Date(v)))) {
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                        }
                    }
                }

                // Check regexp
                if (f.regex !== null && !_.isUndefined(f.regex)) {
                    var rg = new RegExp(f.regex);
                    if (!v.match(rg)) {
                        return formatMsg(f.label, i18nVal.regex, f.label);
                    }
                }

                // Check min & max
                if (f.type === ft.int || f.type === ft.dec || f.type === ft.money) {
                    if (v !== '') {
                        if (f.max && parseFloat(v) > f.max) {
                            return formatMsg(f.label, i18nVal.max, f.max);
                        }
                        if (f.min && parseFloat(v) < f.min) {
                            return formatMsg(f.label, i18nVal.min, f.min);
                        }
                    }
                }
            }

            // Check custom validation
            if (f.customvalidation) {
                var fValid = f.customvalidation(f, v);
                if (fValid !== '') {
                    return formatMsg(f.label, fValid);
                }
            }

            // Check minlength and maxlength
            if (_.isString(v)) {
                var len = v.length,
                    badMax = f.maxlength?len > f.maxlength:false,
                    badMin = f.minlength?len < f.minlength:false;
                if(badMax || badMin){
                    if(f.maxlength && f.minlength){
                        return formatMsg(f.label, i18nVal.minmaxlength, f.minlength, f.maxlength);
                    }else if(f.maxlength){
                        return formatMsg(f.label, i18nVal.maxlength, f.maxlength);
                    }else{
                        return formatMsg(f.label, i18nVal.minlength, f.minlength);
                    }
                }
            }

        }

        return '';
    },

    // - Remove validation error alerts
    clearErrors: function () {
        this.$('.control-group.error').removeClass("control-group error");
        //this.$('.evol-warn-error').remove();
        this.$('.has-error').removeClass('has-error');
        this.$('.text-danger').remove();
        return this;
    },

    // - return DOM field ID (each view use a different prefix)
    fieldViewId: function(fid){
        return this.prefix + '-' + fid;
    },
/*
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
*/

    // - Show help below field(s)
    showHelp: function(id, type, $el, forceOn){
        var fs=this.getFields(),
            fld=_.findWhere(fs,{id:id}),
            $f,
            $fh;

        if(fld && fld.help){
            $f=$el.closest('.evol-fld');
            if(forceOn){
                $fh=[];
            }else{
                $fh=$f.find('.help-block');
            }
            if($fh.length>0){
                $fh.slideUp(200, function(){
                    $fh.remove();
                });
            }else {
                $fh=$('<span class="help-block">' + _.escape(fld.help) + '</span>')
                    .hide();
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

    sendMessage: function(title, content, style){
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
        this.$el.trigger('toggle.panel');
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
        var id='none';
        evt.stopImmediatePropagation();
        // --- show/hide ALL help tips
        if(evt.shiftKey){
            var that=this,
                mustAdd=!this._allHelp;

            if(mustAdd){
                this.$('.evol-fld>.help-block').remove();
                this._allHelp=true;
                id='all';
            }
            _.each(this.getFields(), function(f){
                if(f.help){
                    var $f=this.$field(f.id);
                    that.showHelp(f.id, f.type, $f, mustAdd);
                }
            });
            this.$el.trigger(eType+'.help', {id: id});
        // --- show/hide one help tip
        }else{
            var $e=$(evt.currentTarget),
                eType=$e.data('type');

            id=$e.closest('label').attr('for');
            this.showHelp(id, eType, $e);
            this.$el.trigger(eType+'.help', {id: id});
        }
    },
/*
    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');
        evt.stopImmediatePropagation();
        Evol.Dico.showDesigner(id, eType, $e, this);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    },
*/
    click_detailsAddDel: function(evt){
        var $target=$(evt.currentTarget),
            bId=$target.data('id'),
            tr=$target.closest('tr');

        evt.stopImmediatePropagation();
        if(bId==='bPlus'){
            // - Add row to details
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
            // - Remove row from details
            if(tr.siblings().length===0){
                $(this._TRnodata(tr.children().length, 'edit'))
                    .insertAfter(tr);
            }
            tr.remove();
        }
    }

});

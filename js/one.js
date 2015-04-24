/*! ***************************************************************************
 *
 * evolutility :: one.js
 *
 * View "one" for other ViewOne views to inherit from.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        eDico = Evol.Dico,
        fts = eDico.fieldTypes;

return Backbone.View.extend({

    viewName: 'One',
    viewType:'one',
    cardinality: '1',
    editable: true,

    events: {
        'click .evol-buttons>button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs>li>a': 'click_tab',
        'click label>.glyphicon-question-sign': 'click_help',
        //'click .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel',
        'keyup [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    options: {
        style: 'panel-info',
        button_addAnother: false,
        titleSelector: '#title',
        iconsPath: 'pix/'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.mode = this.mode || this.viewName;
        this._tabId = false;
        this._uTitle = (!_.isUndefined(this.titleSelector)) && this.titleSelector!=='';
        this._subCollecs = this._subCollecsOK = false;
        /*
         if(this.model){
             this.model.on('change', function(model){
                that.setModel(model);
             });
         }*/
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
            this._fields=eDico.getFields(this.uiModel, this.fieldsetFilter);
            this._fieldHash={};
            var that=this;
            _.each(this._fields, function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getFieldsHash: function (){
        if(!this._fields){
            this.getFields();
        }
        return this._fieldHash;
    },

    getSubCollecs: function (){
        if(!this._subCollecsOK){
            this._subCollecs=eDico.getSubCollecs(this.uiModel);
            this._subCollecsOK=true;
        }
        return this._subCollecs;
    },

    setMode: function(mode) {
        var pMode=this.mode;
        if(mode!=pMode){
            this.mode = mode;
            return this
                .render();
        }
    },

    getMode:function() {
        return this.mode;
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
            if(this.model.isNew && this.model.isNew()){
                return i18n.getLabel('NewEntity', this.uiModel.entity);
            }
            var lf=this.uiModel.leadfield;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return eUI.capitalize(this.uiModel.entity);
        }
    },

    getData: function (skipReadOnlyFields) {
        var that = this,
            fs=this.getFields(),
            vs = {},
            subCollecs=this.getSubCollecs();

        if(skipReadOnlyFields){
            var fnNotReadOnly=function(f){
                return f.readonly!==true;
            };
            fs = _.filter(fs, fnNotReadOnly);
            subCollecs = _.filter(subCollecs, fnNotReadOnly);
        }
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
                        v[f.id]=eDico.getFieldTypedValue(f, cells.eq(idx).find('input,select,textarea').eq(0));
                    });
                    vs2.push(v);
                });
                vs[sc.attr||sc.id]=vs2;
            });
        }
        return vs;
    },

    setData: function (model, isModel) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                $f, fv,
                subCollecs=this.getSubCollecs(),
                iconsPath=this.iconsPath,
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
                        case fts.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            //$f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+i18n.nopix+'</p>'));
                            break;
                        case fts.textml:
                            $f.html(eUI.cr2br(fv));
                            break;/*
                        case fts.bool:
                        case fts.url:
                        case fts.email:
                            $f.html(eDico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                            break;*/
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        default:
                            $f.text(eDico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                    }
                }else{
                    switch(f.type) {
                        case fts.lov:
                            var $fc=$f.children().removeAttr('selected');
                            if(fv!==''){
                                $fc.filter('[value='+fv+']')
                                    .prop('selected', 'selected'); // FF need prop not attr
                            }
                            break;
                        case fts.bool:
                            $f.prop('checked', fv?'checked':false);
                            break;
                        case fts.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            break;
                        case fts.list:
                            $f.select2('val', fv);
                            break;
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        default:
                            $f.val(fv);
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, sc.readonly?'browse':'edit');
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

    setDefaults: function(){
        var that=this;

        this.clear();
        _.each(this.getFields(), function(f){
            if(f.hasOwnProperty('defaultvalue')){
                that.setFieldValue(f.id, f.defaultvalue);
            }
        });
        return this;
    },

    //TODO standardize param type field & fid in set/get FieldValue method
    setFieldValue: function (fid, value){
        this.$field(fid)
            .val(value);
        return this;
    },

    getFieldValue: function (f){
        if(_.isString(f)){
            return eDico.getFieldTypedValue(this._fieldHash[f], this.$field(f));
        }else{
            return eDico.getFieldTypedValue(f, this.$field(f.id));
        }
    },

    setFieldProp: function(fid, prop, value){
        // TODO test and finish
        if(prop==='value'){
            this.setFieldValue(fid, value);
            //}else if(prop==='list' && f.type==='lov' || f.type==='list'){
            // TODO change options list
        }else{
            var $f=this.$field(fid);
            switch (prop){
                case 'enabled':
                    if(value){
                        $f.removeProp('disabled');
                    }else{
                        $f.prop('disabled', true);
                    }
                    break;
                case 'visible':
                    eUI.setVisible($f, value);
                    break;
            }
        }
        return this;
    },

    getFieldProp: function(fid, prop){
        // TODO test and finish
        if(prop==='value'){
            this.setFieldValue(fid, value);
        }else{
            var $f=this.$field(fid);
            switch (prop){
                case 'enabled':
                    return !$f.prop('disabled');
                case 'visible':
                    return $f.is(":visible");
                case 'valid':
                    // TODO this.validateField(f, v)
                    break;
            }
        }
    },

    $field: function (id){
        return this.$('#'+this.fieldViewId(id));
    },

    clear: function () {
        var that=this,
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
                    case fts.bool:
                        $f.prop('checked', defaultVal?'checked':false);
                        break;
                    case fts.list:
                        $f.select2('val', null);
                        break;
                    case fts.pix:
                        //var newPix=(defaultVal)?('<img src="'+iconsPath+defaultVal+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                        var newPix='<p>'+i18n.nopix+'</p>';
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
        //Evol.Dico.clearCacheLOV();
        return this;
    },

    getModelFieldValue: function(fid, fvDefault, mode){
        if(this.model && this.model.has(fid)){
            return (mode !== 'new') ? this.model.get(fid) : fvDefault || '';
        }
        return '';
    },
    /*
    isDirty: function(){
         // TODO not ready yet
         // TODO still needs work
         // diff of top level and subcollecs should use the same code
         function nullOrUndef(v){
            return v==='' || _.isUndefined(v) || v===null || v===false;
         }
         function emptyOrUndef(v){
            return v===null || _.isUndefined(v) || v===[];
         }
         if(this.editable){
             var fs= this.getFields(),
                 isNumType=eDico.isNumberType,
                 data=this.getData(),
                 model=this.model,
                 i,
                 iMax=fs.length,
                 subCollecs=this.getSubCollecs();

             for (i = 0; i < iMax; i++) {
                 var f=fs[i],
                     prop = f.attribute || f.id,
                     dataVal = data[prop],
                     modelVal = model.get(prop);

                 if(isNumType(f.type)){
                     if(isNaN(dataVal)){
                         if(!isNaN(modelVal)){
                            return true;
                         }
                     }else if(isNaN(modelVal)){
                        return true;
                     }
                 }else{
                     if(_.isArray(modelVal)){
                         if(!_.isEqual(modelVal, dataVal)){
                            return true;
                         }
                     }else{
                         if(nullOrUndef(dataVal)!==nullOrUndef(modelVal) || dataVal!==modelVal) {
                            return true;
                         }
                     }
                 }
             }
             if(subCollecs){
                 var scIds=Object.keys(subCollecs);
                    iMax=scIds.length;
                 // TODO improve when add sorting to panel-list
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
                             // - not using _.isEqual b/c ok if dataObj had less attributes than modelObj
                             var dObj = dVals[r],
                             mObj = mVals[r];
                             for(var j=0;j<fs2.length;j++) {
                                 var fid = fs2[j].id,
                                     dv=dObj[fid],
                                     mv=mObj[fid];
                                 if(nullOrUndef(dv)!==nullOrUndef(mv) || dv!==mv){
                                    return true;
                                 }
                             }
                         }
                     }
                 }
             }
         }
        return false;
    },*/

    _showTab: function (tabId) {
        var tab = this.$(tabId);
        if (tab.length > 0) {
            tab.siblings('.tab-pane').removeClass('active').hide();
            tab.addClass('active').show();
        }
        tab = this.$('.evol-tabs > li > a[href="' + tabId + '"]').parent();
        if (tab.length > 0) {
            tab.siblings('li').removeClass('active');
            tab.addClass('active')
                .show();
        }
        this._tabId = tabId;
        this.$el.trigger('change.tab', {id:tabId});
        return this;
    },

    _renderButtons: function (h, mode) {
        h.push(eUI.html.clearer+
            '<div class="evol-buttons panel panel-info">'+
            eUI.button('cancel', i18n.bCancel, 'btn-default')+
            eUI.button('save', i18n.bSave, 'btn-primary'));
        if (this.model && this.model.isNew() && this.button_addAnother && mode!=='json') {
            h.push(eUI.button('save-add', i18n.bSaveAdd, 'btn-default'));
        }
        h.push('</div>');
    },

    _render: function (h, mode) {
        // forms to EDIT and BROWSE
        var that=this,
            iTab = -1,
            iPanel = -1,
            elems = this.uiModel.elements,
            iMax1 = elems.length - 1;

        h.push('<div class="evo-one-'+mode+'">');
        _.each(elems, function(p, idx){
            if(p.type==='tab'){
                if (iPanel > 0) {
                    h.push('</div>');
                    iPanel = -1;
                }
                if (iTab < 0) {
                    h.push(eUI.html.clearer);
                    that._renderTabs(h, elems);
                    h.push('<div class="tab-content">');
                }
                iTab++;
                h.push('<div id="evol-tab-'+idx+'" class="tab-pane'+(iTab === 0 ? ' active">' : '">'));
                that._renderTab(h, p, mode);
                if (iTab == iMax1) {
                    h.push('</div>');
                }
            }else{
                if (iPanel < 0) {
                    h.push('<div class="evol-pnls">');
                    iPanel = 1;
                }
                if(!p.id){
                    p.id='p'+idx;
                }
                if(p.type==='panel-list'){
                    that._renderPanelList(h, p, mode);
                }else{ // if(p.type==='panel')
                    that._renderPanel(h, p, mode);
                }
            }
        });
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
    },

    _renderTabs: function (h, tabs) {
        var isFirst = true;
        h.push('<ul class="nav nav-tabs evol-tabs">');
        _.each(tabs, function (tab, idx) {
            if (tab.type === 'tab') {
                if (isFirst) {
                    h.push('<li class="active '+(tab.csslabel||'')+'">');
                    isFirst = false;
                } else {
                    if(tab.csslabel){
                        h.push('<li class="'+tab.csslabel+'">');
                    }else{
                        h.push('<li>');
                    }
                }
                h.push('<a href="#evol-tab-'+idx+'">'+tab.label+'</a></li>');
            }
        });
        h.push('</ul>');
    },

    _renderTab: function (h, tab, mode) {
        var that = this;
        h.push('<div class="evol-pnls '+(tab.css||'')+'">');
        _.each(tab.elements, function (uip) {
            if (uip.type === 'panel-list') {
                that._renderPanelList(h, uip, mode);
            } else {
                that._renderPanel(h, uip, mode);
            }
        });
        h.push(eUI.html.clearer+'</div></div>'); // TODO 2 div?
    },

    _renderPanel: function (h, p, mode, visible) {
        var that = this,
            iconsPath = this.iconsPath;

        if(mode==='wiz'){
            var hidden= _.isUndefined(visible)?false:!visible;
            h.push('<div data-p-width="100" class="evol-pnl evo-p-wiz" style="width:100%;'+(hidden?'display:none;':'')+'">');
        }else{
            h.push('<div data-p-width="'+p.width+'" class="evol-pnl pull-left" style="width:'+p.width+'%">');
        }
        h.push(eUI.HTMLPanelBegin(p, this.style||'panel-default'),
            '<fieldset data-pid="'+p.id+(p.readonly?'" disabled>':'">'));
        _.each(p.elements, function (elem) {
            if(elem.type=='panel-list'){
                that._renderPanelList(h, elem, elem.readonly?'browse':mode);
            }else{
                if(elem.type==fts.hidden){
                    h.push(uiInput.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                }else{
                    h.push('<div style="width:'+parseInt(elem.width||100, 10)+'%" class="pull-left evol-fld">');
                    that.renderField(h, elem, mode, iconsPath);
                    h.push("</div>");
                }
            }
        });
        h.push('</fieldset>'+
            eUI.HTMLPanelEnd()+
            '</div>');
        return this;
    },

    _renderPanelList: function (h, p, mode) {
        var isEditable = p.readonly?false:(mode!=='browse'),
            vMode=isEditable?mode:'browse';

        h.push('<div style="width:'+p.width+'%" class="evol-pnl pull-left" data-pid="'+p.id+'">',
            eUI.HTMLPanelBegin(p, this.style),
            '<table class="table" data-mid="'+(p.attribute || p.id)+'"><thead><tr>');
        _.each(p.elements, function (elem) {
            h.push('<th>'+elem.label+((isEditable && elem.required)?eUI.html.required:'')+'</th>');
        });
        if(vMode==='edit'){
            h.push('<th></th>');
        }
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h, p, null, vMode);
        h.push('</tbody></table>',
            eUI.HTMLPanelEnd(),
            '</div>');
        return this;
    },

    _renderPanelListBody: function (h, uiPnl, fv, mode){
        var that=this,
            fs = uiPnl.elements,
            iconsPath=this.iconsPath || '',
            editable=mode==='edit' && !uiPnl.readonly;

        if(this.model){
            var vs = this.model.get(uiPnl.attribute);
            if(vs && vs.length>0){
                var TDbPM='<td class="evo-td-plusminus">'+eUI.buttonsPlusMinus()+'</td>';
                _.each(vs, function(row, idx){
                    h.push('<tr data-idx="'+idx+'">');
                    if(editable){
                        that._TDsFieldsEdit(h, uiPnl.elements, row);
                        h.push(TDbPM);
                    }else{
                        _.each(fs, function (f) {
                            h.push('<td>');
                            if(row[f.id]){
                                //form-control
                                if(f.type===fts.bool || f.type===fts.lov){
                                    h.push(eDico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath));
                                }else{
                                    h.push(_.escape(eDico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath)));
                                }
                            }else{
                                h.push(_.escape(eDico.HTMLField4Many(f, '', Evol.hashLov, iconsPath)));
                            }
                            h.push('</td>');
                        });
                    }
                    h.push('</tr>');
                });
                return;
            }
        }
        h.push(this._TRnodata(fs.length||1, mode));
    },

    _TRnodata: function(colspan, mode){
        return '<tr data-id="nodata"><td colspan="'+(mode==='edit'?(colspan+1):colspan)+'" class="evol-pl-nodata">'+
            i18n.nodata+
            (mode==='edit'?eUI.buttonsPlus():'')+
            '</td></tr>';
    },

    _TDsFieldsEdit: function(h, fs, m){
        var fv,
            iconPath=this.iconPath;
        _.each(fs, function (f) {
            fv=m[f.id];
            if(_.isUndefined(fv)){
                fv='';
            }
            h.push('<td>'+
                eDico.HTMLField4One(f, f.id, fv, 'edit-details', iconPath, true)+
                '</td>');
        });
    },

    renderField: function (h, f, mode, iconsPath, skipLabel) {
        var fv='';
        if(this.model && this.model.has(f.id)){
            fv = (mode !== 'new') ? this.model.get(f.id) : f.defaultvalue || '';
        }
        if(f.type==='formula'){
            h.push(Evol.Dico.HTMLFieldLabel(f, mode || 'edit'));
            h.push('<div id="'+this.fieldViewId(f.id)+'" class="disabled evo-rdonly evol-ellipsis">'+
                (this.model?f.formula(this.model):'')+
                '</div>');
        }else{
            h.push(eDico.HTMLField4One(f, this.fieldViewId(f.id), fv, mode, iconsPath, skipLabel));
        }
        return this;
    },

    setTitle: function (title){
        if(this._uTitle){
            var selector=this.titleSelector;
            if(selector && selector!==''){
                var t,
                    lf=this.uiModel.leadfield;
                if(title){
                    t=title;
                }else if((!_.isUndefined(lf)) && lf!==''){
                    t=this.getTitle();
                }else{
                    t=eUI.capitalize(this.uiModel.entities);
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
                        if(that.validateField(f, rowData[f.id])){
                            trs.eq(idx).find('#'+f.id).parent().addClass('has-error');
                            scInvalid++;
                        }
                    });
                });
                if(scInvalid>0){
                    var pMsg='validation.invalidList'+((scInvalid===1)?'1':'');
                    pMsg=i18n.getLabel(pMsg, scInvalid, sc.label);
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
            if(fd.type===fts.email){
                p=p.parent();
            }
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
                flagField(f, msg1);
            }
        });

        return msgs;
    },

    validateField: function(f, v){
        var i18nVal = i18n.validation,
            numberField = eDico.isNumberType(f.type);

        function formatMsg(fLabel, msg, r2, r3){
            return msg.replace('{0}', fLabel)
                .replace('{1}', r2)
                .replace('{2}', r3);
        }

        if(!f.readonly){

            // Check required and empty
            if (f.required && (v==='' ||
                    (numberField && isNaN(v)) ||
                    (f.type===fts.lov && v==='0') ||
                    (f.type===fts.list && v.length===0) ||
                    (f.type===fts.color && v==='#000000'))){
                return formatMsg(f.label, i18nVal.empty);
            } else {

                // Check field type
                if( !(isNaN(v) && numberField)) {
                    if (v !== '' && !_.isArray(v)){
                        switch (f.type) {
                            case fts.int:
                            case fts.email:
                                if (!this.valRegEx[f.type].test(v)) {
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case fts.dec:
                            case fts.money:
                                var regex = this.valRegEx[fts.dec + i18n.LOCALE] || this.valRegEx[fts.dec + 'EN'];
                                if (!regex.test(v)){
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case fts.date:
                            case fts.datetime:
                            case fts.time:
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
                if (numberField) {
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
                 $el.append(eUI.iconCustomize(id,'field'));
             });
             this.$(panelSelector).append(eUI.iconCustomize('id','panel'));
             this.custOn=true;
         }
         return this;
     },*/

    // - Show help below field(s)
    showHelp: function(id, type, $el, forceOn){
        var fld = _.findWhere(this.getFields(), {id:id}),
            $f,
            $fh;

        if(fld && fld.help){
            $f=$el.closest('.evol-fld');
            $fh=forceOn?[]:$f.find('.help-block');
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
     },*/

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
        this._showTab(tabId);
    },
    getTab: function(){
        return this._tabId;
    },

    click_button: function (evt) {
        var bId = $(evt.currentTarget).data('id');
        evt.stopImmediatePropagation();
        if(bId==='save'){
            if(this.validate()){
                this.$el.trigger('action', bId);
            }
        }else{
            this.$el.trigger('action', bId);
        }
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
            this._showTab(id);
        }
        this._tabId = id;
    },

    click_help: function (evt) {
        // -- show/hide help on one specific field / all fields
        var id='none',
            $e=$(evt.currentTarget),
            eType=$e.data('type');

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
                    var $f=that.$field(f.id);
                    that.showHelp(f.id, f.type, $f, mustAdd);
                }
            });
            this.$el.trigger(eType+'.help', {id: id});
            // --- show/hide one help tip
        }else{
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
         eDico.showDesigner(id, eType, $e, this);
         this.$el.trigger(eType+'.customize', {id: id, type:eType});
     },
     */
    click_detailsAddDel: function(evt){
        // -- add/remove row in panel-list (subcollection)
        var $target=$(evt.currentTarget),
            bId=$target.data('id'),
            tr=$target.closest('tr');

        if(evt.keyCode && evt.keyCode!==13){
            return;
        }
        evt.stopImmediatePropagation();
        if(bId==='bPlus'){
            // - Add row to details
            var h=[],
                subCollecs=this.getSubCollecs(),
                mid=tr.closest('table').data('mid'),
                elems=(subCollecs[mid])?subCollecs[mid].elements:null;
            h.push('<tr>');
            this._TDsFieldsEdit(h, elems, {});
            h.push('<td class="evo-td-plusminus">'+
                eUI.buttonsPlusMinus()+
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

}();

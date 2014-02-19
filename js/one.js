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

    events: {
        'click .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs > li > a': 'click_tab',
        'click label > .glyphicon-question-sign': 'click_help',
        'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"]':'click_add_details',
        'click [data-id="bMinus"]':'click_del_details'
        // extra evt for $(window) resize
    },

    cardinality: '1',

    options: {
        button_addAnother: false,
        style: 'panel-info',
        titleSelector: '#title'
    },

    initialize: function (opts) {
        var that=this;
        _.extend(this.options, opts);
        this._uTitle=this.options.titleSelector!==undefined && this.options.titleSelector!=='';
        if(this.model){
            this.model.on('change', function(model){
                that.setModel(model);
            });
        }
        //TODO set responsive layout
    },

    render: function () {
        var h = [];
        this._render(h, this.options.mode);
        this.$el.html(h.join(''));
        this.custOn=false;
        return this;
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
        if(!this._subCollecs){
            this._subCollecs=Evol.Dico.getSubCollecs(this.options.uiModel);
        }
        return this._subCollecs;
    },

    setModel: function(model) {
        this.model = model;
        return this
            .clearMessages()
            .setData(model);
    },

    getModel:function() {
        return this.model;
    },

    setUIModel: function(uimodel) {
        this.options.uiModel = uimodel;
        var d=this.getData();
        return this
            .render()
            .setData(d);
    },
    getUIModel: function() {
        return this.options.uiModel;
    },

    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },

    getTitle: function(){
        if(this.model){
            var lf=this.options.uiModel.leadfield;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return Evol.UI.capitalize(this.options.uiModel.entity);
        }
    },

    getData: function () {
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
                vs[sc.attr]=vs2;
            });
        }
        return vs;
    },

    setData: function (model) {
        if(model!==undefined && model!==null){
            var fs = this.getFields(),
                that=this,
                fTypes = Evol.Dico.fieldTypes,
                $f, fv,
                prefix='#'+ that.prefix + '-',
                subCollecs=this.getSubCollecs();
            _.each(fs, function (f) {
                $f=that.$(prefix + f.id);
                fv=model.get(f.id);
                if(model){
                    switch(f.type) {
                        case fTypes.lov:
                            $f.children().removeAttr('selected')
                                .filter('[value='+fv+']')
                                .attr('selected', true);
                            break;
                        case fTypes.bool:
                            $f.prop('checked', fv);
                            break;
                        case fTypes.pix:
                            var newPix=(fv!=='')?('<img src="'+fv+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
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
        }
        return this.setTitle();
    },

    clear: function () {
        var fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(fs, function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case 'boolean':
                    $f.prop('checked', f.defaultvalue || '');
                    break;
                default:
                    $f.val(f.defaultvalue || '');
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

    isDirty: function(){
        // TODO
         /*
        var data=this.getData(),
            model=this.model;

        for(var prop in data){
            if(data[prop] !== model.get(prop)){
                alert('data[prop]='+data[prop]+' - model.get(prop)='+model.get(prop)); //TODO remove this alert
                return true;
            }
        }*/
        return false;
    },

    setFieldValue: function (fid, value){
        this.$('#'+this.fieldViewId(fid))
            .val(value);
        return this;
    },

    getFieldValue: function (f){
        var $f=this.$('#'+this.fieldViewId(f.id));
        return Evol.Dico.getFieldTypedValue(f, $f);
    },

    showTab: function (tabid) {
        var tab = this.$(tabid);
        if (tab.length > 0) {
            tab.siblings('.tab-pane').hide();
            tab.show();
        }
        tab = this.$('.evol-tabs > li a[href="' + tabid + '"]').parent();
        if (tab.length > 0) {
            tab.siblings('li').removeClass('active');
            tab.addClass('active');
        }
        this.$el.trigger('tab.show');
        return this;
    },

    _renderButtons: function (h, mode) {
        var css=Evol.UI.getSizeCSS(this.options.size);
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'+css),
            Evol.UI.input.button('save', Evol.i18n.Save, 'btn-primary'+css));
        if (this.model && this.model.isNew() && this.options.button_addAnother && mode!=='json') {
            h.push(Evol.UI.input.button('save-add', Evol.i18n.SaveAdd, 'btn-default'+css));
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
        _.each(elems, function(p,idx){
            switch (p.type) {
                case 'tab':
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
                    break;
                case 'panel':
                    if (iPanel < 0) {
                        h.push('<div class="evol-pnls">');
                        iPanel = 1;
                    }
                    that.renderPanel(h, p, 'p-' + p.id, mode);
                    break;
                case 'panel-list':
                    if (iPanel < 0) {
                        h.push('<div class="evol-pnls">');
                        iPanel = 1;
                    }
                    that.renderPanelList(h, p, mode);
                    break;
            }
        });
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
    },

    renderTabs: function (h, ts) {
        var isFirst = true;
        h.push('<ul class="nav nav-tabs evol-tabs">');
        _.each(ts, function (t, idx) {
            if (t.type == 'tab') {
                if (isFirst) {
                    h.push('<li class="active">');
                    isFirst = false;
                } else {
                    h.push('<li>');
                }
                h.push('<a href="#evol-tab-', idx, '">', t.label, '</a></li>');
            }
        });
        h.push('</ul>');
    },

    renderTab: function (h, t, mode) {
        var that = this;
        h.push('<div class="evol-pnls">');
        _.each(t.elements, function (uip, idx) {
            if (uip.type === 'panel-list') {
                that.renderPanelList(h, uip, mode);
            } else {
                that.renderPanel(h, uip, uip.id || 'pl-'+idx, mode);
            }
        });
        h.push(Evol.UI.html.clearer, '</div></div>'); // TODO 2 div?
    },

    renderPanel: function (h, p, pid, mode) {
        var that = this;
        h.push('<div data-p-width="', p.width, '" class="evol-pnl');
        if(mode==='mini'){
            h.push(' w-100 ', (p.class || ''), '">');
        }else{
            h.push(' pull-left" style="width:', p.width, '%">');
        }
        h.push('<div class="panel ', this.options.style, '">',
            Evol.UI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
            '<fieldset data-pid="', pid, '">');
        if(mode==='mini'){
            _.each(p.elements, function (elem) {
                h.push('<div class="pull-left evol-fld w-100">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }else{
            _.each(p.elements, function (elem) {
                h.push('<div style="width:', parseInt(elem.width, 10), '%" class="pull-left evol-fld">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }
        h.push('</fieldset></div></div>');
    },

    renderPanelList: function (h, p, mode) {
        h.push('<div style="width:', p.width, '%" class="evol-pnl pull-left" data-pid="', p.id,'">',
            '<div class="panel ', this.options.style, '">',
            Evol.UI.HTMLPanelLabel(p.label, p.id, 'PanelLabel'),
            '<table class="table" data-mid="', p.attr,'"><thead><tr>'); // table-striped
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, '</th>');
        });
        if(mode==='edit'){
            h.push('<th></th>');
        }
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h, p, null, mode);
        h.push('</tbody></table></div></div>');
    },

    _renderPanelListBody: function (h, uiPnl, fv, mode){
        var that=this,
            attr=uiPnl.attr,
            fs = uiPnl.elements,
            vs = this.model.get(attr);
        if(vs && vs.length>0){
            var TDbPM='<td class="evo-td-plusminus">'+Evol.UI.input.buttonsPlusMinus()+'</td>';
            _.each(vs, function(row, idx){
                h.push('<tr data-idx="',idx,'">');
                if(mode==='edit'){
                    that._TDsFieldsEdit(h, uiPnl.elements, row);
                    h.push(TDbPM);
                }else{
                    _.each(fs, function (f) {
                        if(row[f.id]){
                            h.push('<td>', _.escape(Evol.Dico.HTMLField4Many(f, row[f.id], this.hashLov)),'</td>');
                        }else{
                            h.push('<td>', Evol.Dico.HTMLField4Many(f, '', this.hashLov),'</td>');
                        }
                    });
                }
                h.push('</tr>');
            });
        }else{
            h.push(this._TRnodata(fs.length, mode));
        }
    },

    _TRnodata: function(colspan, mode){
        return ['<tr data-id="nodata"><td colspan="',mode==='edit'?(colspan+1):colspan,'" class="evol-pl-nodata">',
            Evol.i18n.nodata,
            mode==='edit'?'<div data-id="bPlus" class="glyphicon glyphicon-plus-sign"></div>':'',
            '</td></tr>'].join('');
    },

    _TDsFieldsEdit: function(h, fs, m){
        _.each(fs, function (f) {
            var fv=m[f.id];
            if(fv===undefined){
                fv='';
            }
            h.push('<td>', Evol.Dico.HTMLField4One(f, f.id, fv, 'edit-details', true), '</td>');
        });
    },

    renderField: function (h, fld, mode) {
        var EvoDico=Evol.Dico,
            fid = this.fieldViewId(fld.id),
            fv='';
        if(this.model && this.model.has(fld.id)){
            if (mode !== 'new') {
                fv = this.model.get(fld.id);
            }else{
                fv = fld.defaultvalue || '';
            }
        }
        h.push(EvoDico.HTMLField4One(fld, fid, fv, mode));
        return this;
    },

    renderFieldLabel: function (h, fld, mode) {
        h.push(Evol.Dico.HTMLFieldLabel(fld, mode));
    },

    setTitle: function (title){
        if(this._uTitle){
            var opts=this.options,
                selector=opts.titleSelector;
            if(selector && selector!==''){
                var t,lf=opts.uiModel.leadfield;
                if(title){
                    t=title;
                }else if(lf!==undefined && lf!==''){
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

    validate: function () {
        var fs =  this.getFields();
        this.clearMessages();
        if (_.isArray(fs)) {
            return Evol.UI.Validation.checkFields(this.$el, fs, this.prefix);
        }
        if(this._subCollecs){

        }
        this.$el.trigger('action', 'validate');
        return false;
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
        var labelSelector = '.evol-field-label > label',
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
        var fs=Evol.Dico.getFields(this.options.uiModel),
            fld=_.findWhere(fs,{id:id});

        if(fld||fld.help){
            var $f=$el.closest('.evol-fld'),
                $fh=$f.find('.help-block');
            if($fh.length>0){
                $fh.slideUp(300, function(){
                    $fh.remove();
                });
            }else{
                var $elDes=$('<span class="help-block">' + _.escape(fld.help) + '</span>').hide();
                $f.append($elDes);
                $elDes.slideDown(300);
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
        return this.clearErrors();
    },

    click_button: function (evt) {
        var buttonId = $(evt.currentTarget).data('id');
        evt.stopImmediatePropagation();
        this.$el.trigger('action', buttonId);
    },

    click_toggle: function (evt) {
        var $this = $(evt.target),
            content = $this.closest('.panel-heading').next(),
            state = content.data('expState'),
            cssUp = 'glyphicon-chevron-up',
            cssDown = 'glyphicon-chevron-down',
            css;
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if(evt.shiftKey){
            $this = this.$('.evol-title-toggle');
            if (state === 'down') {
                css = cssDown;
            } else {
                css = cssUp;
            }
            $this = this.$('.evol-title-toggle.'+css)
                .trigger('click');
        }else{
            if (state === 'down') {
                $this.closest('.panel').css('height','');
                content.slideDown(400)
                    .data('expState', 'up');
                $this.addClass(cssUp)
                    .removeClass(cssDown);
            } else {
                content.slideUp(400, function() {
                    $this.closest('.panel').css('height','40px');
                }).data('expState', 'down');
                $this.removeClass(cssUp)
                    .addClass(cssDown);
            }
        }
        this.$el.trigger('panel.toggle');
    },

    click_tab: function (evt) {
        var href = evt.target.href,
            id = href.substring(href.indexOf('#'));
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if(evt.shiftKey){
            this.$('.tab-content > div').show();
        }else{
            this.showTab(id);
        }
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

    click_add_details: function(evt){
        var h=[],
            $targ=$(evt.target),
            tr=$targ.closest('tr'),
            mid=tr.closest('table').data('mid'),
            uiPnl=this._subCollecs[mid];

        h.push('<tr>');
        this._TDsFieldsEdit(h, uiPnl.elements, {});
        h.push('<td class="evo-td-plusminus">',
            Evol.UI.input.buttonsPlusMinus(),
            '</td></tr>');
        $(h.join('')).insertAfter(tr);
        if($targ.parent().hasClass('evol-pl-nodata')){
            tr.remove();
        }
    },
    click_del_details: function(evt){
        var tr=$(evt.target).closest('tr');
        if(tr.siblings().length===0){
            $(this._TRnodata(tr.children().length, 'edit'))
                .insertAfter(tr);
        }
        tr.remove();
    }

});


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
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
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
        var mode = this.options.mode,
            h = [];
        this.renderEdit(h, mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
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

    setUIModel: function(uimodel) {
        this.options.uiModel = uimodel;
        var d=this.getData();
        return this
            .render()
            .setData(d);
    },

    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },

    getSummary: function(){
        var lf=this.options.uiModel.leadfield;
        return _.isFunction(lf)?lf(this.model):this.model.get(lf);
    },

    getData: function () {
        var that = this,
            vs = {};
        _.each(this.getFields(), function(f){
            vs[f.id]=that.getFieldValue(f);
        });
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
                            var $img=$f.prev();
                            if($img.get(0).tagName=='IMG'){
                                $img.attr('src',fv);
                            }
                            break;
                        default:
                            $f.val(model.get(f.id));
                    }
                }
            });
            if(subCollecs && subCollecs.length>0){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc);
                    that.$('[data-pid="'+sc.id+'"] tbody')
                        .html(h.join(''));
                });
            }
        }
        return this._updateTitle();
    },

    clear: function () {
        var fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
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
        return this;
    },

    setFieldValue: function (fid, value){
        this.$('#'+this.fieldViewId(fid))
            .val(value);
        return this;
    },
    getFieldValue: function (f){
        var $f=this.$('#'+this.fieldViewId(f.id));
        switch(f.type) {
            case Evol.Dico.fieldTypes.bool:
                return $f.prop('checked');
            default:
                return $f.val();
        }
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
        if (this.options.button_addAnother && mode!=='json') {
            h.push(Evol.UI.input.button('save-add', Evol.i18n.SaveAdd, 'btn-default'+css));
        }
        h.push('</div>');
    },

    renderEdit: function (h, mode) {
        // EDIT and VIEW forms
        var iTab = -1,
            iPanel = -1,
            opts = this.options,
            elems = opts.uiModel.elements;

        if(mode==='mini'){
            var flds = Evol.Dico.getFields(opts.uiModel,function(f){
                    return  f.searchlist || f.required || f.mini;
                },opts.mode),
                miniUIModel= {
                    type: 'panel', class:'evol-mini-holder', label: Evol.UI.capFirstLetter(opts.uiModel.entity), width: 100,
                    elements: flds
                };
            this.renderPanel(h,miniUIModel,'evo-one-mini',mode);
        }else{
            h.push('<div class="evo-one-',mode,'">');
            //this._fieldsHash={};
            for (var i = 0, iMax = elems.length; i < iMax; i++) {
                var p = elems[i];
                switch (p.type) {
                    case 'tab':
                        if (iPanel > 0) {
                            h.push('</div>');
                            iPanel = -1;
                        }
                        if (iTab < 0) {
                            h.push(Evol.UI.html.clearer);
                            this.renderTabs(h, elems);
                            h.push('<div class="tab-content">');
                        }
                        iTab++;
                        h.push('<div id="evol-tab-', i, '" class="tab-pane', (i === 1 ? ' active">' : '">'));
                        this.renderTab(h, p, mode);
                        if (iTab == iMax - 1) {
                            h.push('</div>');
                        }
                        break;
                    case 'panel':
                        if (iPanel < 0) {
                            h.push('<div class="evol-pnls">');
                            iPanel = 1;
                        }
                        this.renderPanel(h, p, 'p-' + p.id, mode);
                        break;
                    case 'panel-list':
                        this._hasSubCollec=true;
                        if (iPanel < 0) {
                            h.push('');
                            iPanel = 1;
                        }
                        this.renderPanelList(h, p, mode);
                        break;
                }
            }
            if (iPanel > 0) {
                h.push('</div>');
            }
            h.push('</div>');
        }
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
        h.push(Evol.UI.html.clearer, '</div></div>');
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
            '<table class="table"><thead><tr>'); // table-striped
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, '</th>');
        });
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h,p,mode);
        h.push('</tbody></table></div></div>');
    },

    _renderPanelListBody: function (h,p,mode){
        var vs = this.model.get(p.attr);
        if(vs && vs.length>0){
            _.each(vs, function(row){
                h.push('<tr>');
                _.each(p.elements, function (elem) {
                    if(row[elem.id]){
                        h.push('<td>',row[elem.id],'</td>'); // TODO row.elem.attr as spec
                    }else{
                        h.push('<td></td>');
                    }
                });
                h.push('</tr>');
            });
        }else{
            h.push('<tr><td colspan="',p.elements.length,'" class="evol-pl-nodata">',Evol.i18n.nodata,'</td></tr>');
        }
    },

    renderField: function (h, fld, mode) {
        var EvoUI = Evol.UI,
            types=Evol.Dico.fieldTypes,
            fid = this.fieldViewId(fld.id),
            fv,
            fwidth,
            size = this.options.size;
        if(this.model && this.model.has(fld.id)){
            if (mode !== 'new') {
                fv = this.model.get(fld.id);
            }else{
                fv = fld.defaultvalue || '';
            }
        }
        // --- field label ---
        if(mode==='mini'){
            fwidth=fld.width;
            fld.width=100;
            h.push('<div class="evol-mini-label">');
            this.renderFieldLabel(h, fld, mode);
            h.push('</div><div class="evol-mini-content">');
        }else{
            this.renderFieldLabel(h, fld, mode);
        }
        if(fld.readonly>0){
            // TODO: css for readonly fields
            h.push('<div id="',fid, '" class="FieldReadOnly">',fv, '&nbsp;</div>');
        }else{
            switch (fld.type) {
                case types.text:
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
                    break;
                case types.email:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, 'mailto:' + HttpUtility.HtmlEncode(fv)));
                    } else {
                        //h.push('<div class="input-group"><span class="input-group-addon">@</span>');
                        h.push(EvoUI.input.text(fid, fv, fld.maxlength));
                        //h.push('</div>');
                    }
                    break;
                case types.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, HttpUtility.HtmlEncode(fv)));
                    } else {
                        h.push(EvoUI.input.text(fid, fv, fld.maxlength));
                    }
                    break;
                case types.integer:
                case types.dec:
                    h.push(EvoUI.input.textInt(fid, fv));
                    break;
                case types.bool:
                    h.push(EvoUI.input.checkbox(fid, fv));
                    break;
                case types.txtm:
                case types.html:
//////    fv = HttpUtility.HtmlEncode(fv);
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
                case types.color:
                    h.push(EvoUI.input.color(fid, fv));
                    break;
                case types.lov:
                    h.push(EvoUI.input.select(fid,'',true, fld.list));
                    break;
                case types.integer:
                    h.push(EvoUI.input.textInt(fid, fv, fld.max, fld.min));
                    break;
                //case types.doc:
                case types.pix:
                    if(fv===''){
                        h.push('<p class="">No picture</p>');
                    }else{
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
                    break;
            }
        }
        if(mode==='mini'){
            h.push('</div>');
            fld.width=fwidth;
        }
    },

    renderFieldLabel: function (h, fld, mode) {
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label" for="', fld.id, '">', fld.label);
        if (mode != 'view' && fld.required){
            h.push(Evol.UI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(Evol.UI.icon('question-sign', ''));
        }
        h.push('</label></div>');
    },

    // prepare to enter a new record
    newItem: function (){
        return this.clear()
            ._updateTitle(Evol.i18n.NewItem.replace('{0}', this.options.uiModel.entity).replace('{1}', this.getSummary()));
    },

    _updateTitle: function (title){
        if(this._uTitle){
            var opts=this.options,
                selector=opts.titleSelector;
            if(selector && selector!==''){
                var t,lf=opts.uiModel.leadfield;
                if(title){
                    t=title;
                }else if(lf!==undefined && lf!==''){
                    t=this.getSummary();
                }else{
                    t=Evol.UI.capFirstLetter(opts.uiModel.entities);
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
            this.$el.trigger('view.validate');
            return Evol.UI.Validation.checkFields(this.$el, fs, this.prefix);
        }
        return false;
    },

    clearErrors: function () {
        this.$('.control-group.error').removeClass("control-group error");
        //this.$('.evol-warn-error').remove();
        this.$('.has-error').removeClass('has-error');
        this.$('.text-danger').remove();
        return this;
    },

    commit: function(fnSuccess, fnError){
        var msg=this.validate();
        if(msg===''){
            var that=this;
            if(this.options.mode==='new'){// || this._isNew
                var collec;
                if(this.model && this.model.collection){
                    collec = this.model.collection;
                }else if(this.collection){
                    collec = this.collection;
                }
                if(collec){
                    collec.create(this.getData(), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage('Record added', Evol.i18n.status.added, 'success');
                            that.trigger('save,add');
                            that._updateTitle();
                        },
                        error: fnError
                    });
                    this.options.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO pretty
                }
            }else{
                this.model.set(this.getData());
                this.model.save({
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage('Record saved', Evol.i18n.status.updated, 'success');
                        that.trigger('save,update');
                        that._updateTitle();
                    },
                    error: fnError
                });
            }
        }else{
            this.setMessage('Invalid data', msg, 'warning');
        }
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

    setMessage: function(title, content,style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            $msg.html('<strong>'+title+'</strong>'+ content);
        }else{
            this.$el.prepend(Evol.UI.HTMLMsg(title, content,style));
        }
        return this;
    },

    clearMessage: function(){
        var $msg=this.$('[data-id="msg"]')
            .fadeOut(300,function(){
                $msg.remove();
            });
        return this;
    },

    clearMessages: function(){
        return this.clearErrors().clearMessage();
    },

    click_button: function (evt) {
        var that=this,
            buttonId = $(evt.currentTarget).data('id');
        evt.stopImmediatePropagation();
        if(buttonId==='cancel'){

        }else{
            this.commit(function(m){
                if (buttonId==='save-add') {
                    that.newItem();
                }else{
                    that.model=m;
                    that.setModel(m);
                }
            },function(){
                alert('error'); //TODO make it nice looking
            });
        }
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
        Evol.Dico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    }

});


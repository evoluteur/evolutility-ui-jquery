/*! ***************************************************************************
 *
 * evolutility :: one.js
 *
 * View one
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

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
    //_hashLov: {},

    options: {
        button_addAnother: false,
        style: 'panel-info',
        titleSelector: ''
    },

    initialize: function (opts) {
        var that=this;
        _.extend(this.options, opts);
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
        if(mode==='json'){
            this.renderJSON(h, mode);
        }else{
            this.renderEdit(h, mode);
        }
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    getFields: function (){
        if(!this._fields){
            this._fields=EvoDico.fields(this.options.uiModel, this.getFieldsCondition);
            this._fieldHash={};
            var that=this;
            _.each(this._fields,function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    setModel: function(model) {
        this.model = model;
        this.clearMessages();
        this.setData(model);
    },

    setUIModel: function(uimodel) {
        this.options.uiModel = uimodel;
        var d=this.getData();
        this.render()
            .setData(d);
    },

    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },

    getData: function () {
        var that = this,
            vs = {},
            fs = this.getFields();

        _.each(fs, function(f){
            vs[f.id]=that.getFieldValue(f);
        });
        return vs;
    },

    setData: function (model) {
        var fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
        _.each(fs, function (f) {
            $f=that.$(prefix + f.id),
            fv=model.get(f.id);
            if(model){
                switch(f.type) {
                    case EvoDico.fieldTypes.lov:
                        $f.children().removeAttr('selected')
                            .filter('[value='+fv+']')
                            .attr('selected', true);
                        break;
                    case EvoDico.fieldTypes.bool:
                        $f.prop('checked', fv);
                        break;
                    case EvoDico.fieldTypes.pix:
                        var $img=$f.prev();
                        if($img.get(0).tagName=='IMG'){
                            $img.attr('src',fv)
                        }
                        break;
                    default:
                        $f.val(model.get(f.id));
                }
            }
        });
        this._updateTitle();
    },

    _updateTitle: function (){/*
        var selector=this.options.titleSelector
        if(selector && selector!=''){
            $(selector).html(this.model.get('title'));
        }*/
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
        this.$('#'+this.fieldViewId(fid)).val(value);
        return this;
    },
    getFieldValue: function (f){
        var $f=this.$('#'+this.fieldViewId(f.id));
        switch(f.type) {
            case EvoDico.fieldTypes.bool:
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
        var css=EvoUI.getSizeCSS(this.options.size);
        h.push(
            EvoUI.html.clearer,
            '<div class="evol-buttons">',
            EvoUI.inputButton('cancel', EvolLang.Cancel, 'btn-default'+css),
            EvoUI.inputButton('save', EvolLang.Save, 'btn-primary'+css)
        );
        if (this.options.button_addAnother && mode!=='json') {
            h.push(EvoUI.inputButton('save-add', EvolLang.SaveAdd, 'btn-default'+css));
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
            var flds = EvoDico.fields(opts.uiModel,function(f){
                    return  f.searchlist || f.required || f.mini;
                },opts.mode),
                miniUIModel= {
                    type: 'panel', class:'evo-mini-holder', label: EvoUI.capFirstLetter(opts.uiModel.entity), width: 100,
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
                            h.push(EvoUI.html.clearer);
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
                        this.renderPanel(h, p, 'pe-' + i, mode);
                        break;
                    case 'panel-list':
                        if (iPanel < 0) {
                            h.push('');
                            iPanel = 1;
                        }
                        this.renderPanelList(h, p, 'pe-' + i, mode);
                        break;
                }
            }
            if (iPanel > 0) {
                h.push('</div>');
            }
            h.push('</div>');
        }
        this._renderButtons(h, mode);
        this._updateTitle();
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
        _.each(t.elements, function (elem, idx) {
            if (elem.type === 'panel-list') {
                that.renderPanelList(h, elem, 'pl-' + idx, mode);
            } else {
                that.renderPanel(h, elem, 'pl-' + idx, mode);
            }
        });
        h.push(EvoUI.html.clearer, '</div></div>');
    },

    renderPanel: function (h, p, pid, mode) {
        var that = this;
        if(mode==='mini'){
            h.push('<div data-p-width="', p.width, '" class="w-100 evol-pnl ', (p.class || ''), '">',
                '<div class="panel ', this.options.style, '">',
                EvoUI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
                '<fieldset data-pid="', pid, '">');
            _.each(p.elements, function (elem) {
                h.push('<div class="pull-left evol-fld w-100">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }else{
            h.push('<div style="width:', p.width, '%" data-p-width="', p.width, '" class="pull-left evol-pnl">',
                '<div class="panel ', this.options.style, '">',
                EvoUI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
                '<fieldset data-pid="', pid, '">');
            _.each(p.elements, function (elem) {
                h.push('<div style="width:', parseInt(elem.width, 10), '%" class="pull-left evol-fld">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }
        h.push('</fieldset></div></div>');
    },

    renderPanelList: function (h, p, pid, mode) { // TODO implement
        h.push('<div style="width:', p.width, '%" class="pull-left evol-pnl">not implemented yet',
            '<div class="panel ', this.options.style, '">',
            EvoUI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
            '<table class="table table-striped"><tr>');
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, '</th>');
        });
        h.push('</tr>');
        var testRow='<tr>';
        _.each(p.elements, function (elem) {
            testRow+='<td>test</td>';
        });
        testRow+='</tr>';
        for(var i=0;i<5;i++){
            h.push(testRow);
        }
        h.push('</tr></table></div></div>');
    },

    renderField: function (h, fld, mode) {
        var types=EvoDico.fieldTypes,
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
            h.push('<div class="evo-mini-label">');
            this.renderFieldLabel(h, fld, mode);
            h.push('</div><div class="evo-mini-content">');
        }else{
            this.renderFieldLabel(h, fld, mode);
        }
        if(fld.readonly>0){
            // TODO: css for readonly fields
            h.push('<div id="',fid, '" class="FieldReadOnly">',fv, '&nbsp;</div>');
        }else{
            switch (fld.type) {
                case types.text:
                    h.push(EvoUI.inputText(fid, fv, fld, null, size));
                    break;
                case types.email:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, 'mailto:' + HttpUtility.HtmlEncode(fv)));
                    } else {
                        //h.push('<div class="input-group"><span class="input-group-addon">@</span>');
                        h.push(EvoUI.inputText(fid, fv, fld.maxlength));
                        //h.push('</div>');
                    }
                    break;
                case types.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, HttpUtility.HtmlEncode(fv)));
                    } else {
                        h.push(EvoUI.inputText(fid, fv, fld.maxlength));
                    }
                    break;
                case types.integer:
                case types.dec:
                    h.push(EvoUI.inputTextInt(fid, fv));
                    break;
                case types.bool:
                    h.push(EvoUI.inputCheckbox(fid, fv));
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
                    h.push(EvoUI.inputTextM(fid, fv, fld.maxlength, fld.height));
                    break;
                case types.date:
                    h.push(EvoUI.inputDate(fid, fv));
                    break;
                case types.datetime:
                    h.push(EvoUI.inputDateTime(fid, fv));
                    break;
                case types.time:
                    h.push(EvoUI.inputTime(fid, fv));
                    break;
                case types.color:
                    h.push(EvoUI.inputColor(fid, fv));
                    break;
                case types.lov:
                    h.push(EvoUI.inputLOV(fid, fv, '', fld.list || []));
                    break;
                case types.integer:
                    h.push(EvoUI.inputTextInt(fid, fv, fld.type, fld.max, fld.min));
                    break;
                //case types.doc:
                case types.pix:
                    if(fv===''){
                        h.push('<p class="">No picture</p>');
                    }else{
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }
                    h.push(EvoUI.inputText(fid, fv, fld, null, size));
                    break;
            }
        }

        if(mode==='mini'){
            h.push('</div>');
            fld.width=fwidth;
        }
    },

    renderFieldLabel: function (h, fld) {
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label" for="', fld.id, '">', fld.label);
        if (fld.required){//mode != 'view' &&
            h.push('<span class="evol-required">*</span>');
        }
        if (fld.help && fld.help!==''){
            h.push(EvoUI.icon('question-sign', ''));
        }
        h.push('</label></div>');
    },

    validate: function () {
        var fs =  this.getFields();
        this.clearMessages();
        if (_.isArray(fs)) {
            this.$el.trigger('view.validate');
            return EvoVal.checkFields(this.$el, fs, this.prefix);
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
            if(this.options.mode==='new'){// || this._isNew
                var collec;
                if(this.model && this.model.collection){
                    collec = this.model.collection;
                }else if(this.collection){
                    collec = this.collection;
                }
                if(collec){
                    collec.create(this.getData(), {
                        success: fnSuccess,
                        error: fnError
                    });
                }else{
                    alert('No collection specified'); //TODO pretty
                }
            }else{
                this.model.set(this.getData());
                this.model.save({
                    success: fnSuccess,
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
            this.$(labelSelector + ' > i, '+ panelSelector + ' > i').remove();
            this.custOn=false;
        }else{
            _.each(this.$(labelSelector),function(elem){
                var $el=$(elem),
                    id=$el.attr('for');
                $el.append(EvoUI.iconCustomize(id,'field'));
            });
            this.$(panelSelector).append(EvoUI.iconCustomize('id','panel'));
            this.custOn=true;
        }
        return this;
    },

    showHelp:function(id, type, $el){
        var fs=EvoDico.fields(this.options.uiModel),
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
            this.$el.prepend(EvoUI.HTMLMsg(title, content,style));
        }
    },

    clearMessage: function(){
        var $msg=this.$('[data-id="msg"]')
            .fadeOut(300,function(){
                $msg.remove();
            });
    },

    clearMessages: function(){
        return this.clearErrors().clearMessage();
    },

    click_button: function (evt) {
        var that=this,
            bId = $(evt.currentTarget).attr('id');
        evt.stopImmediatePropagation();
        this.commit(function(){
            that.setMessage('Record Saved', 'Record was saved.', 'success');
            if ((bId=='save-add')) {
                //that.new();
            }
        },function(){
            alert('error'); //TODO make it nice looking
        });
    },

    click_toggle: function (evt) {
        var $this = $(evt.target),
            content = $this.closest('.panel-heading').next(),
            state = content.data('expState');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if(evt.shiftKey){
            $this = this.$('.evol-title-toggle');
            if (state === 'down') {
                $this = this.$('.evol-title-toggle.glyphicon-chevron-down')
                    .trigger('click');
            } else {
                $this = this.$('.evol-title-toggle.glyphicon-chevron-up')
                    .trigger('click');
            }
        }else{
            if (state === 'down') {
                $this.closest('.panel').css('height','');
                content.slideDown(400)
                    .data('expState', 'up');
                $this.addClass('glyphicon-chevron-up')
                    .removeClass('glyphicon-chevron-down');
            } else {
                content.slideUp(400, function() {
                    $this.closest('.panel').css('height','40px');
                }).data('expState', 'down');
                $this.removeClass('glyphicon-chevron-up')
                    .addClass('glyphicon-chevron-down');
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
        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    }

});


// ############ Validation #################################################################

// this is some very old code from Evolutility ASP.net version
// TODO rewrite or use another open source
var EvoVal = {

    checkMaxLen: function (F, maxL) {
        if (F.value.length > maxL){
            F.value = F.value.substring(0, maxL - 1);
        }
    },

    checkNum: function (F, t) {
        var nv, fv = F.value;
        if (t.substring(0, 1) == 'i')
            nv = parseInt(fv, 10);
        else {
            var ln = EvolLang.LOCALE;
            if (ln == 'FR' || ln == 'DA')
                fv = fv.replace(",", ".");
            nv = parseFloat(fv);
        }
        if (isNaN(nv))
            F.value = '';
        else if (fv != nv)
            F.value = nv;
    },

    setValidationFlags: function (p, msgf) {
        var errlabel = p.find('.text-danger');
        if (errlabel.length) {
            errlabel.html(msgf);
        } else {
            p.append('<p class="text-danger">' + msgf + '</p>');
        }
        p.addClass("has-error");
    },

    checkFields: function (holder, fds, prefix) {
        var evoRegEx = {
            email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
            integer: /^-?\d+$/,
            decimalEN: /^\d+(\.\d+)?$/,
            decimalFR: /^\d+(\,\d+)?$/,
            decimalDA: /^\d+(\,\d+)?$/
        };
        var msgs = [], ff = null;
        for (var i in fds) {
            var fd = fds[i],
                $f = holder.find('#' + prefix + '-' + fd.id).eq(0),
                isHTML = fd.type == 'html';
            if (isHTML) {
                $f.val(nicEditors.findEditor(f.id).getContent());
            }
            if ($f.length > 0) {
                var noErr = true,
                    p, msgf;
                // Check empty & type
                if (fd.required > 0) {
                    if (isEmpty($f, isHTML)) {
                        p = $f.parent();
                        msgf = labMsg(EvolLang.validation.empty);
                        EvoVal.setValidationFlags(p, msgf);
                        noErr = false;
                    } else {
                        $f.parent().removeClass("control-group error")
                            .find('.evol-warn-error').remove();
                        typeCheck();
                    }
                } else {
                    typeCheck();
                }
                // Check regexp
                if (fd.regex !== null && fd.regex !== undefined) {
                    var rg = new RegExp(fd.regex);
                    if (!$f.val().match(rg)) {
                        p = $f.parent();
                        msgf = labMsg(EvolLang.validation.regex, fd.label);
                        EvoVal.setValidationFlags($f.parent(), msgf);
                    }
                }/*
                // Check custom
                if (fd.jsv !== null) {
                    p = eval([fd.jsv, '("', Evol.prefix, fd.id, '","', fd.label, '")'].join(''));
                    if (p !== null && p.length > 0) {
                        EvoVal.setValidationFlags($f.parent(), labMsg(p));
                    }
                }*/
                // Check min & max
                if (noErr) {
                    var fv = EvoUI.trim($f.val());
                    if (fv !== '') {
                        if (fd.max !== null && parseFloat(fv) > fd.max) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang.validation.max, fd.max));
                        }
                        if (fd.min !== null && parseFloat(fv) < fd.min) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang.validation.min, fd.min));
                        }
                    }
                }
            }
        }
        if (msgs.length > 0) {
            return [EvolLang.validation.intro, '<ul><li>', msgs.join('<li>'), '</li></ul>'].join('');
        } else {
            return '';
        }

        function typeCheck() {
            var ft = EvoDico.fieldTypes,
                fv = EvoUI.trim($f.val());
            if (fv !== '')
                switch (fd.type) {
                    case ft.integer:
                    case ft.email:
                        if (!evoRegEx[fd.type].test(fv)) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang[fd.type]));
                        }
                        break;
                    case ft.dec:
                        var myRegExp = evoRegEx[fd.type + EvolLang.LOCALE];
                        if (myRegExp === null) {
                            myRegExp = evoRegEx[fd.type + "EN"]; // default to English with "."
                        }
                        if (!myRegExp.test(fv))
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang[fd.type]));
                        break;
                    case ft.date:
                    case ft.datetime:
                    case ft.time:
                        if ((fv !== '') && (!_.isDate(new Date(fv)))) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang[fd.type]));
                        }
                        break;
                }
        }

        function isEmpty($f, isHTML) {
            var v, tn = $f.tagName;
            if (tn == 'SELECT' && $f.get(0).selectedIndex > -1) {
                v = f.options[$f.get(0).selectedIndex].value == "0";
                /*} else if (tn == 'TEXTAREA' && isHTML) {
                 var editor = nicEditors.findEditor(f.id);
                 if (editor) {
                 v = editor.getContent().trim()
                 v = v == '' || v == '<br>';
                 } else {
                 v = $f.val().trim() == '';
                 }   */
            } else {
                v = EvoUI.trim($f.val()) === '';
            }
            return v;
        }

        function labMsg(msg, r2) {
            var m = msg.replace('{0}', fd.label);
            if (r2 !== null) {
                m = m.replace('{1}', r2);
            }
            msgs.push(m);
            return m;
        }

    }

};

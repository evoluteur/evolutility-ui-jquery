/*! ***************************************************************************
 *
 * evol-utility : evol-view-one.js
 *
 * View one
 * modes: edit, mini, json
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
}

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
    viewName: 'list',
    prefix: 'fe',

    options: {
        mode: 'edit',
        compactView: false,
        button_addAnother: true,
        style: 'panel-info'
    },

    initialize: function (opts) {
        var that=this,
            mode=opts.mode;

        this.options.mode=mode;
        this.options.uiModel=opts.uiModel;
        this.render();
        if(this.model){
            this.model.on('change', function(model){
                that.setModel(model);
            });
        }
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
        this.setData(this.model); // todo fix lov in render => no need for this line
        this.custOn=false;
        return this;
    },

    getFields: function (){
        if(!this._fields){
            this._fields=EvoDico.fields(this.options.uiModel);
        }
        return this._fields;
    },

    setModel: function(model) {
        this.model = model;
        this.clearErrors();
        this.setData(model);
    },

    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },

    getData: function () {
        var mode = this.options.mode,
            ft = EvoDico.fieldTypes,
            vs = {},
            fs = this.getFields(),
            $el=this.$el,
            selPrefix='#'+this.prefix+'-';

        if(mode && mode==='json'){
            var jsonStr = $el.children('textarea').val();
            vs = $.parseJSON(jsonStr);
        }else{
            _.each(fs, function (f) {
                var $f=$el.find(selPrefix+f.id);
                switch(f.type) {
                    case ft.bool:
                        vs[f.id] = $f.prop('checked');
                        break;
                    default:
                        vs[f.id] = $f.val();
                }
            });
        }
        return vs;
    },

    setData: function (m) {
        var fs = this.getFields(),
            mode=this.options.mode,
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
        if(mode && mode==='json'){
            this.$el.children('textarea').val(JSON.stringify(m, null, 2));
        }else{
            _.each(fs, function (f) {
                $f=that.$(prefix + f.id);
                if(m){
                    switch(f.type) {
                        case 'boolean':
                            $f.prop('checked',m.get(f.id));
                            break;
                        default:
                            $f.val(m.get(f.id));
                    }
                }
            });
        }
    },

    clear: function (m) {
        var fs = this.getFields(),
            mode=this.options.mode,
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
        if(mode && mode==='json'){
            this.$el.children('textarea').val('');
        }else{
            _.each(fs, function (f) {
                $f=that.$(prefix + f.id);
                switch(f.type) {
                    case 'boolean':
                        $f.prop('checked', f.default || '');
                        break;
                    default:
                        $f.val(f.default || '');
                }
            });
        }
    },
    setFieldValue: function (fid, value){
        this.$('#'+this.fieldViewId(fid)).val(value);
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
        h.push(
            EvoUI.html.clearer,
            '<div class="evol-buttons form-actions">',
            EvoUI.inputButton('save', EvolLang.Save, 'btn-primary')
        );
        if (this.options.button_addAnother && mode!=='json') {
            h.push(EvoUI.inputButton('save-add', EvolLang.SaveAdd));
        }
        h.push(EvoUI.inputButton('cancel', EvolLang.Cancel),
            '</div>');
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
        //##### BUTTONS #####
        this._renderButtons(h, mode);
    },

    renderJSON: function (h, mode) {
        if(this.model){
            var jsonStr=JSON.stringify(this.model.toJSON(), null, 2);
            h.push(EvoUI.inputTextMJSON('',jsonStr,10));
        }
        //##### BUTTONS #####
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
                h.push('<div style="width:', parseInt(elem.width), '%" class="pull-left evol-fld">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }
        h.push('</fieldset></div></div>');
    },

    renderPanelList: function (h, p, pid, mode) {
        h.push('<div style="width:', p.width, '%" class="pull-left evol-pnl">',
            '<div class="panel ', this.options.style, '">',
            EvoUI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
            '<table width="100%" class="table-striped"><tr>');
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, '</th>');
        });
        h.push('</tr><tr>');
        _.each(p.elements, function (elem) {
            h.push('<td>', elem.label, '</td>');
        });
        h.push('</tr></table></div></div>');
    },

    renderField: function (h, fld, mode) {
        function cleanId(id) {
            return id.toLocaleLowerCase()
                .replace(/ /g, '_')
                .replace(/\(/g, '')
                .replace(/\)/g, '');
        }
        var types=EvoDico.fieldTypes,
            fid, fv, fwidth;
        if (fld.id && fld.id != '') {
            fid = fld.id;
        } else {
            fid = cleanId(fld.label);
            fld.id = fid;
        }
        if(this.model && this.model.has(fid)){
            if (mode != 'new') {
                fv = this.model.get(fid);
            }else if (fld.default){
                fv = fld.default;
            }else{
                fv = '';
            }
        }
        fid = this.fieldViewId(fid);
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
                    h.push(EvoUI.inputText(fid, fv, fld));
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
                    if (fld.height == null) {
                        fld.height = 5;
                    } else {
                        fHeight = parseInt(fld.height);
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
//      case types.doc:
                case types.pix:
                    if(fv==''){
                        h.push('<p class="">No picture</p>');
                    }else{
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }
//        h.push(SMALL_tag);
//        if (fieldValue != string.Empty)
//          h.push("<span class=\"FieldReadOnly\">").Append(fieldValue).Append("</span><br/>");
//        if (fType.Equals(types.pix))
//        {
//          h.push("<br/><img src=\"");
//          if (string.IsNullOrEmpty(fieldValue))
//            h.push(_PathPixToolbar).Append("imgno.gif\" ID=\"");
//          else
//            h.push(_PathPix).Append(fieldValue).Append("\" ID=\"");
//          h.push(fieldName).Append("img\" alt=\"\" class=\"FieldImg\"/><br/>");
//        }
//        buffer = string.Format("UP-evol{0}", i);
//        h.push(EvoUI.HTMLInputHidden(fieldName + "_dp", string.Empty));
//        if (IEbrowser)
//          h.push(EvoUI.HTMLLinkShowVanish(buffer, EvolLang.NewUpload));
//        if (fieldValue != string.Empty)
//        {
//          h.push("<br/>&nbsp;<a href=\"Javascript:Evol.");
//          string pJS = (fType.Equals(types.pix)) ? "pixM" : "docM";
//          h.pushFormat("{0}('{1}')\">{2}</a>", pJS, fieldName, EvolLang.Delete);
//        }
//        h.push("</small><br/>").Append(EvoUI.HTMLDiv(buffer, !IEbrowser));
//        h.push("<input type=\"file\" class=\"Field\" name=\"").AppendFormat("{0}\" id=\"{0}", fieldName);
//        h.push("\" value=\"").Append(HttpUtility.HtmlEncode(fieldValue)).Append("\" width=\"120\" onchange=\"e$('").Append(fieldName);
//        if (fType.Equals(types.pix))
//          h.push("img').src='").Append(_PathPixToolbar).Append("imgupdate.gif';e$('").Append(fieldName);
//        h.push("_dp').value=''\"><br/></div>");
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
        if (mode != 'view' && fld.required > 0){
            h.push('<span class="evol-required">*</span>');
        }
        if (fld.help && fld.help!=''){
            h.push(EvoUI.icon('question-sign', ''));
        }
        h.push('</label></div>');
    },

    validate: function () {
        var fs =  this.getFields();
        this.clearErrors();
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
                $el.append(EvoUI.icons.customize(id,'field'));
            });
            this.$(panelSelector).append(EvoUI.icons.customize('id','panel'));
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
                $fh.remove();
            }else{
                var $elDes=$('<span class="help-block">' + _.escape(fld.help) + '</span>');
                $f.append($elDes);
            }
        }
        return this;
    },

    click_button: function (evt) {
        evt.preventDefault();
        var bId = $(evt.currentTarget).attr('id');
        var msg=this.validate()
        if(msg==''){
            //if ((bId=='save' || bId=='save-add')) {
            //    return;
            //}
            if(this.options.mode==='new'){
                this.model.collection.create(this.getData(), {
                    success: function(m){
                        debugger
                    },
                    error: function(m){
                        debugger
                    }
                });
            }else{
                this.model.set(this.getData());
                this.model.save({
                    success: function(m){
                        debugger
                    },
                    error: function(m){
                        debugger
                    }
                });
            }
            this.$el.trigger('button.' + bId);
        }
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

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    }

});


// ############ Validation #################################################################

var EvoVal = {

    checkMaxLen: function (F, maxL) {
        if (F.value.length > maxL)
            F.value = F.value.substring(0, maxL - 1)
    },

    checkNum: function (F, t) {
        var nv, fv = F.value;
        if (t.substring(0, 1) == 'i')
            nv = parseInt(fv, 10)
        else {
            var ln = EvolLang.LOCALE;
            if (ln == 'FR' || ln == 'DA')
                fv = fv.replace(",", ".");
            nv = parseFloat(fv);
        }
        if (isNaN(nv))
            F.value = ''
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
                var noErr = true;
                // Check empty & type
                if (fd.required > 0) {
                    if (isEmpty($f, isHTML)) {
                        var msgf = labMsg(EvolLang.empty),
                            p = $f.parent();
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
                if (fd.rg != null) {
                    var rg = new RegExp(fd.rg);
                    if (!$f.val().match(rg)) {
                        var msgf = labMsg(EvolLang.reg, fd.rg),
                            p = $f.parent();
                        EvoVal.setValidationFlags($f.parent(), msgf);
                    }
                }
                // Check custom
                if (fd.jsv != null) {
                    p = eval([fd.jsv, '("', Evol.prefix, fd.id, '","', fd.label, '")'].join(''));
                    if (p != null && p.length > 0) {
                        EvoVal.setValidationFlags($f.parent(), labMsg(p));
                    }
                }
                // Check min & max
                if (noErr) {
                    var fv = $f.val().trim();
                    if (fv != '') {
                        if (fd.max != null && parseFloat(fv) > fd.max) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang.max, fd.max));
                        }
                        if (fd.min != null && parseFloat(fv) < fd.min) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang.min, fd.min));
                        }
                    }
                }
            }
        }
        if (msgs.length > 0) {
            return [EvolLang.intro, '<ul><li>', msgs.join('<li>'), '</li></ul>'].join('');
        } else {
            return '';
        }

        function typeCheck() {
            var ft = EvoDico.fieldTypes,
                fv = $f.val().trim();
            if (fv != '')
                switch (fd.type) {
                    case ft.integer:
                    case ft.email:
                        if (!evoRegEx[fd.type].test(fv)) {
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang[fd.type]));
                        }
                        break;
                    case ft.dec:
                        var myRegExp = evoRegEx[fd.type + EvolLang.LOCALE];
                        if (myRegExp == null) {
                            myRegExp = evoRegEx[fd.type + "EN"]; // default to English with "."
                        }
                        if (!myRegExp.test(fv))
                            EvoVal.setValidationFlags($f.parent(), labMsg(EvolLang[fd.type]));
                        break;
                    case ft.date:
                    case ft.datetime:
                    //case ft.time:
                        if ((fv != '') && (!_.isDate(new Date(fv)))) {
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
                v = $f.val().trim() == '';
            }
            return v;
        }

        function labMsg(msg, r2) {
            var m = msg.replace('{0}', fd.label);
            if (r2 != null) {
                m = m.replace('{1}', r2);
            }
            msgs.push(m);
            return m;
        }

    }

}

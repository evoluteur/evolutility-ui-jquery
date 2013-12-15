/*   evol-utility 0.0.1 */

/*   (c) 2013 Olivier Giulieri */

/*! ***************************************************************************
 *
 * evol-utility : evol-dico.js
 *
 * Copyright (c) 2013, Olivier Giulieri 
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Dico = {

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
        //formula:'formula',
        //html:'html',
        email: 'email',
        url: 'url',
        pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        rating: 'rating',
        tag: 'tag'
        //widget: 'widget',
    },

    fields: function (uiModel, fnFilter) { // TODO: str view should be func filter
        var fs = [];

        function collectFields(te) {
            if (te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    collectFields(te);
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

    
    customize: function() {
        this.$el.find('.FieldLabel>label').append(EvoUI.icons.customize('id','field'));
        this.$el.find('.table th,h4.PanelLabel').append(EvoUI.icons.customize('id','panel'));
        return this;
    },

    showDesigner: function(id, type, $el){
        var h=[],
            $elDes=$('<div class="evol-des-'+type+'">designer</div>');
        $el.closest('.evol-fld').append($elDes);


        //$elDes.position({
        //    my: "left top",
        //    at: "right bottom",
        //    of: $el
        //});

        vw = new Evol.ViewOne({
            toolbar:true,
            model: null,
            uiModel: dico_field_ui,
            defaultView: 'edit',
            el: $elDes,
            button_addAnother: false
        });
        vw.render();

        //$elDes.popover('show')
        $elDes.on('button#save,button#cancel', function(evt){
            alert('fld click button')
            $elDes.remove();
        });

        return this;
    },

    showInfoBox:function(msg, type){        
        var $m=this.$el.find('.evol-head-info');
        if($m.length){
            $m.html(msg);
        }else{
            var m=['<div class="evol-head-info alert alert-',type,'">',
                EvoUI.iconClose(),msg,'</div>'].join('');
            this.$el.prepend(m);
        }
        return this;
    }

}

;
/*! ***************************************************************************
 *
 * evol-utility : evol-ui.js
 *
 * Copyright (c) 2013, Olivier Giulieri 
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.UI = {

    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>'
    },

    icons: {
        customize: function (id, type) {
            return ['<i class="glyphicon glyphicon-wrench" data-id="', id, '" data-type="', type, '"></i>'].join('');
        }
    },

    html_more: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-more">', label, '</a>'//,'<div style="display:none;">'
        ].join('');
    },

    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label"><label for="', fID, '">', fLbl, '</label></div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label"><label for="', fID, '">', fLbl, '</label></span>'].join('');
    },

    link: function (fID, label, url) {
        return ['<a class="Field" href="', url, '" id="', fID, '">', label, '</a>'].join('');
    },
    linkEmail: function (fID, label, email) {
        return ['<a class="Field" href="mailto:', email, '" id="', fID, '">', label, '</a>'].join('');
    },
    inputText: function (fID, fV, fd) {
        var h = ['<input class="form-control" type="text" id="', fID, '" value="', fV];
        if (fd) {
            _.each(['min', 'max', 'maxlength', 'max-width', 'min-width', 'placeholder'], function (item) {
                if (fd[item] != undefined) {
                    h.push('" ', item, '="', fd[item]);
                }
            });
            _.each(['readonly'], function (item) {
                var fi = fd[item];
                if (fi || fi == '1') {
                    h.push('" ', item, '="', item);
                }
            });
        }
        h.push('" class="Field">');
        return h.join('');
    },
    inputTextInt: function (fID, fV) {
        return ['<input class="form-control" type="number" id="', fID, '" value="', fV,
            '" class="Field" maxlength="12">'].join('');
    },
    inputTextM: function (fID, fV, ml, h) {
        return [
            '<textarea name="', fID, '" id="', fID, '" class="Field form-control"" rows="', h,
            (ml > 0) ? '" onKeyUp="EvoVal.checkMaxLen(this,' + ml + ')' : '',
            '">', fV, '</textarea>'
        ].join('');
    },
    inputTextMJSON: function (fID, fVobj, h) {
        return ['<textarea rows="',h,'" class="Field evol-json">', _.escape(JSON.stringify(fVobj, null, '\t')), '</textarea>'].join('');
    },
    inputAny: function (type, fId, fVal) {
        return [
            '<input type="', type, '" id="', fId, '" value="', fVal,
            '" class="Field form-control" size="15">'
        ].join('');
    },
    inputDate: function (fID, fV) {
        return EvoUI.inputAny('date', fID, fV);
        //+'&nbsp;<a href="javascript:ShowDatePicker(\'', fID, '\');" class="ico Calendar"></a></nobr>'
    },
    inputDateTime: function (fID, fV) {
        return EvoUI.inputAny('datetime-local', fID, fV);
    },
    inputTime: function (fID, fV) {
        return EvoUI.inputAny('time', fID, fV);
    },
    inputColor: function (fId, fVal) {
        return [
            '<input type="color" id="', fId, '" value="', fVal, '" size="15">'
        ].join('');
    },
    inputCheckbox: function (fID, fV) {
        var fh = ['<input type="checkbox" id="', fID, '"'];
        if (fV != null && fV != '' && fV != '0') {
            fh.push(' checked="checked"');
        }
        fh.push(' value="1">');
        return fh.join('');
    },
    inputRadio: function (fN, fV, fLbl, sel, fID) {
        return ['<label for="', fID, '"><input id="', fID, '" name="', fN, '" type="radio" value="', fV,
            (sel) ? '" checked="checked' : '',
            '">', fLbl, '</label>&nbsp;'
        ].join('');
    },
    inputLOV: function (fID, fV, fVLabel, fLOV) {
        var h = ['<select class="form-control Field" id="', fID, '"><option value="', fV, '" selected>', fVLabel, '</option>'];
        _.each(fLOV, function (item) {
            h.push(EvoUI.inputOption(item.id, item.label));
        });
        h.push('</select>');
        return h.join('');
    },
    inputHidden: function (fID, fV) {
        return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
    },
    inputOption: function (fID, fV) {
        return ['<option value="', fID, '">', fV, '</option>'].join('');
    },
    inputButton: function (id, label, cls) {
        return '<button type="button" id="' + id + '" class="btn' + (cls ? ' ' + cls : '') + '">' + label + '</button>';
    },

    icon: function (icon, cls) {
        return ['<span class="', cls? cls+' ':'', 'glyphicon glyphicon-', icon, '"></span>'].join('');
    },
    icone: function (icon) {
        //return ['<span data-sort="',icon,'" class="glyphicon glyphicon-', icon, '"></span>'].join('');
        return ['<span data-sort="',icon,'" class="glyphicon glyphicon-chevron-', icon, '"></span>'].join('');
    },

    iconClose: function () {
        return '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    },

    getOrCreate: function (fID) {
        var e = $('#' + fID);
        if (e == null) {
            e = $('<div id="' + fID + "></div>");
            $(body).append(e);
        }
        return e;
    },

    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', EvoUI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLMsg: function (title, content) {
        return ['<div class="bs-callout bs-callout-info">',//bs-callout-warning
            '<h4>',title,'</h4>',
            '<p>',content,'</p>',
            '</div>'].join('');
    }

}

;
/*! ***************************************************************************
 *
 * evol-utility : evol-view-many.js
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany = Backbone.View.extend({

    cardinality: 'many',
    viewName: 'list',
    className: 'evol-v-list',

    options: {
        fnFilter : function (f) {
            return f.searchlist;
        }
    },

    events: {
        'click a.evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > span': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function () {
        var that=this;
        /*
        function nameComparator(a, b) {
            return a.get('name').localeCompare(b.get('name'));
        }
        */
        this.render();
        if(this.model){
            this.model.collection.on('change', function(model){
                that.render();
            });
        }
    },
    customize: function () {
        var labels;
        if(this.options.mode=='list-grid'){
            labels = this.$el.find('h4 a.evol-nav-id');
        }else{
            labels = this.$el.find('th > span')
        }
        if(this.custOn){
            labels.find('i').remove();
            this.custOn=false;
        }else{
            labels.append(EvoUI.icons.customize('id','field'));
            this.custOn=true;
        }
        return this;
    },

    render: function () {
        var h = [];
        if(this.model){
            this.renderList(h, this.options.mode);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata));
        }
        this.$el.html(h.join(''));
        this.custOn=false;
        return this;
    },

    setModel: function(model) {
        this.model = model;
        this.render();
    },
    updateModel: function () {
        alert('updateModel')
    },

    renderList: function (h, mode) {
        var opts = this.options,
            uim = opts.uiModel,
            models = this.model.collection.models,
            pSize = opts.pageSize || 50,
            pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
        h.push('<div class="evol-list evol-list-', mode, '">');
        if(mode!='charts'){
            h.push(pSummary,EvoUI.html.clearer);
        }
        this['_HTML' + mode.replace(/-/g,'_')](h, this.getFields(), pSize, uim.icon);
        if(mode!='charts'){
            h.push(pSummary,
                this._paginationHTML(0, pSize, models.length));
        }
        h.push('</div>');
    },

    //EvoDico.fields(uim,fnFilter)
    getFields: function (){
        var opts=this.options;
        if(!this.fields){
            this.fields=EvoDico.fields(opts.uiModel,opts.fnFilter,opts.mode);
        }
        return this.fields;
    },

    _HTMLlist: function (h, fields, pSize, icon) {
        h.push('<table class="table table-bordered table-striped table-hover"><thead>');
        for (var i = 0; i < fields.length; i++) {
            this._renderListHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistbody(h, fields, pSize, icon);
        h.push('</tbody></table>');
    },

    _HTMLlistbody: function(h, fields, pSize, icon){
        var data = this.model.collection.models,
        //var data = _.isArray(this.model)?this.model:this.model.models,
            datalen = _.min([data.length, pSize]);
        if (datalen > 0) {
            for (var r = 0; r < datalen; r++) {
                this._HTMLlistrow(h, fields, data[r], icon);
            }
        }
    },

    _HTMLlistrow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i],
                v = model.get(f.id);
            h.push('<td>');
            if (i == 0) {
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if (icon) {
                    h.push('<img alt="" class="evol-table-icon" src="pix/', icon, '">');
                }
            }
            switch(f.type) {
                case EvoDico.fieldTypes.bool:
                    if (v == '1' || v == 'true'){ // TODO: fix bool types
                        h.push(EvoUI.icon('ok'));
                    }
                    break;
                //case 'lov':
                //    h.push(v); //TODO
                //    break;
                default:
                    h.push(v);
            }
            if (i == 0) {
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _HTMLlist_grid: function (h, fields, pSize, icon) {
        var data = this.model.collection.models,
            datalen = _.min([data.length, pSize]);
        if (datalen > 0) {
            for (var r = 0; r < datalen; r++) {
                h.push('<div class="panel ', this.options.style, '">');
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i],
                        cRow = data[r],
                        v = cRow.get(f.id);
                    h.push('<div data-id="', cRow.id, '">');
                    if (i == 0) {
                        h.push('<h4><a href="#" id="fg-', f.id, '" class="evol-nav-id">');
                        if (icon) {
                            h.push('<img alt="" class="evol-table-icon" src="pix/', icon, '">');
                        }
                    }
                    //if(i>0){
                    //    h.push(EvoUI.fieldLabel(f.id,f.label));
                    //}
                    if (f.type == EvoDico.fieldTypes.bool) {
                        if (v >0 || v == 'True') {
                            h.push(EvoUI.icon('ok'));
                        }
                    } else {
                        h.push(v);
                    }
                    if (i == 0) {
                        h.push('</a></h4>');
                    }
                    h.push('</div>');
                }
                h.push('</div>');
                if (r > 99) {
                    break;
                }
            }
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata));
        }
        h.push(EvoUI.html.clearer);
    },

    _HTMLcharts: function (h, fields, pSize, icon) {
        // TODO real data...
        var urlGoogleChart = 'http://chart.apis.google.com/chart?chd=t:10,18,20,51,14,20,24&amp;chl=Travel (10)|Restaurant (18)|Hobby (20)|Finances (51)|Family (14)|Business (20)|%5bUnfiled%5d (24)&amp;cht=p&amp;chds=0,20&amp;chs=400x200';
        EvoUI.HTMLMsg(h,'Under construction','not live data yet');
        h.push('<div class="ChartHolder"><div class="chartTitle">Contacts per Category</div><img src="',urlGoogleChart,'"><br></div>');
        h.push('<div class="clearer"></div>');
    },

    _renderListHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icone('up'),
            EvoUI.icone('down'),
            '</span></span></th>'
        );
    },

    _paginationSummaryHTML: function (pIdx, pSize, allCount, entity, entities) {
        var rangeBegin = pIdx * pSize + 1, rangeEnd;
        if (pIdx < 1) {
            if (allCount === 0) {
                return allCount + ' ' + entities;
            } else if (allCount === 1) {
                return allCount + ' ' + entity;
            }
            rangeEnd = _.min([pSize, allCount]);
        } else {
            rangeEnd = _.min([rangeBegin + pSize, allCount]);
        }
        return ['<p>', rangeBegin, '-', rangeEnd, ' of ', allCount, ' ', entities, '</p>'].join('')
    },

    _paginationHTML: function (pIdx, pSize, allCount) {
        var h = ['<div class="pagination"><ul>'];
        if (pIdx > 0) {
            h.push('<li data-id="prev"><a href="#">Prev</a></li>');
        }
        var iMin = pIdx * pSize + 1,
            allPages = parseInt(allCount / pSize, 10),
            iMax = (allPages > 5) ? 5 : allPages;
        for (var i = iMin; i < iMax; i++) {
            h.push('<li data-id="', i, '"><a href="#">', i, '</a></li>');
        }
        if (allCount > (pIdx + 1) * pSize) {
            h.push('<li data-id="next"><a href="#">Next</a></li>');
        }
        h.push('</ul></div>');
        return h.join('');
    },

    click_navigate: function (evt) {
        var e=$(evt.currentTarget),
            pTag=this.options.mode==='list'?'tr':'div';
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: e.closest(pTag).data('id')});
    },

    click_sort: function (evt) {
        var collec =this.model.collection,
            target =$(evt.currentTarget),
            fid=target.parent().data('fid'),
            sdir=target.data('sort');
        collec.comparator = function(model) {
            return model.get(fid);
        }
        collec.sort();
        if(sdir==='down'){
            collec.models.reverse();
        }
        this.render(); //todo: renderBody
        target.addClass('evol-last-sort');
        this.$el.trigger('list.sort', {id: fid});
    },

    click_pagination: function (evt) {
        this.$el.trigger('list.paginate', {id: $(evt.currentTarget).closest('li').data('id')});
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id});
    }

});

;
/*! ***************************************************************************
 *
 * evol-utility : evol-view-one.js
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
        'click .evol-pnl > div > div > .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs > li > a': 'click_tab',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
        // extra evt for $(window) resize
    },

    prefix: 'fe',

    options: {
        mode: 'edit', // possible modes: new, edit, view, json, export?
        compactView: false,
        fields: null,
        button_addAnother: true,
        style: 'panel-info'
    },

    initialize: function () {
        var that=this,
            mode=this.options.mode;
        this.render();
        if(this.model){
            this.model.on('change', function(model){
                that.setModel(model);
            });
        }
        if(mode==='new' || mode==='edit'){
            this.windowSize='big';
            $(window).resize(function() {
                var pnls = that.$el.find('.evol-pnl');
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
        if(!this.fields){
            this.fields=EvoDico.fields(this.options.uiModel);
        }
        return this.fields;
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
                    case ft.lov:
                        vs[f.id] = $f.val(); //TODO
                        break;
                    default:
                        vs[f.id] = $f.val();
                }
            });
        }
        return vs;
    },

    setData: function (m) {
        var fs = this.getFields(), //this.$el.find('.Field'),
            mode=this.options.mode,
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
        if(mode && mode==='json'){
            this.$el.children('textarea').val(JSON.stringify(m, null, 2));
        }else{
            _.each(fs, function (f) {
                $f=that.$el.find(prefix + f.id);
                if(m){
                    switch(f.type) {
                        case 'boolean':
                            $f.prop('checked',m.get(f.id));
                            break;
                        case 'lov':
                            $f.val(m.get(f.id)); //TODO
                            break;
                        default:
                            $f.val(m.get(f.id));
                    }
                }
            });
        }
    },

    clear: function (m) {
        var fs = this.getFields(), //this.$el.find('.Field'),
            mode=this.options.mode,
            that=this,
            $f,
            prefix='#'+ that.prefix + '-';
        if(mode && mode==='json'){
            this.$el.children('textarea').val('');
        }else{
            _.each(fs, function (f) {
                $f=that.$el.find(prefix + f.id);
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
        this.$el.find('#'+this.fieldViewId(fid)).val(value);
    },

    showTab: function (tabid) {
        var tab = this.$el.find(tabid);
        if (tab.length > 0) {
            tab.siblings('.tab-pane').hide();
            tab.show();
        }
        tab = this.$el.find('.evol-tabs > li a[href="' + tabid + '"]').parent();
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
            model = opts.uiModel.elements;

        if(mode==='mini'){
            var flds = EvoDico.fields(opts.uiModel,function(f){
                    return  f.searchlist || f.required || f.mini;
                    //return f.readonly || f.searchlist || f.mini;
                },opts.mode),
                miniUIModel= {
                    type: "panel", label: opts.uiModel.entity, width: "100",
                    elements: flds
                };
            this.renderPanel(h,miniUIModel,'evo-mini',mode);
        }else{
            //this.fieldsHash={};
            for (var i = 0, iMax = model.length; i < iMax; i++) {
                var p = model[i];
                switch (p.type) {
                    case 'tab':
                        if (iPanel > 0) {
                            h.push('</div>');
                            iPanel = -1;
                        }
                        if (iTab < 0) {
                            h.push(EvoUI.html.clearer);
                            this.renderTabs(h, model, mode);
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
        }
        //##### BUTTONS #####
        this._renderButtons(h, mode);
    },

    renderJSON: function (h, mode) {
        if(this.model){
            var jsonStr=JSON.stringify(this.model.toJSON(), null, 2);
            h.push(EvoUI.inputTextMJSON('',jsonStr,10));
            //h.push('<textarea rows="10" class="Field evol-json">', _.escape(jsonStr ), '</textarea>');
        }
        //##### BUTTONS #####
        this._renderButtons(h, mode);
    },

    renderTabs: function (h, ts, mode) {
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
            // build the html for 1 panel (in 'edit' or 'view' modes)
            h.push('<div data-p-width="', p.width, '" class="w-100 evol-pnl">',
                '<div class="panel ', this.options.style, '">',
                EvoUI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
                '<fieldset data-pid="', pid, '">');
            _.each(p.elements, function (elem) {
                h.push('<div class="pull-left evol-fld w-100">');
                that.renderField(h, elem, mode);
                h.push("</div>");
            });
        }else{
            // build the html for 1 panel (in 'edit' or 'view' modes)
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
            h.push('<div id="',fid, '" class="Field">',fv, '&nbsp;</div>');
        }else{
            switch (fld.type) {
                case types.text:
                    h.push(EvoUI.inputText(fid, fv, fld));
                    break;
                case types.email:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, 'mailto:' + HttpUtility.HtmlEncode(fv)));
                    } else {
                        h.push(EvoUI.inputText(fid, fv, fld.maxlength));
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
//        nbFileUploads += 1;
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
        this.$el.find('.control-group.error').removeClass("control-group error");
        //this.$el.find('.evol-warn-error').remove();
        this.$el.find('.has-error').removeClass('has-error');
        this.$el.find('.text-danger').remove();
    },
/*
    fields: function (view) { // TODO: str view should be func filter
        var ps = this.options.uiModel.elements,
            fs = [];

        function collectFields(te) {
            if (te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    collectFields(te);
                });
            } else {
                fs.push(te);
            }
        }

        collectFields(this.options.uiModel);
        //if (view === 'list') {
            _.filter(fs, function (f) {
                return f.list == 1;
            })
        //}
        return fs;
    },  */

    fieldViewId: function(fid){
        return this.prefix + '-' + fid;
    },

    customize: function(){
        var labelSelector = '.evol-field-label > label',
            panelSelector ='.evol-pnl .panel-title';
        if(this.custOn){
            this.$el.find(labelSelector + ' > i, '+ panelSelector + ' > i').remove();
            this.custOn=false;
        }else{
            _.each(this.$el.find(labelSelector),function(elem){
                var $el=$(elem),
                    id=$el.attr('for');
                $el.append(EvoUI.icons.customize(id,'field'));
            });
            this.$el.find(panelSelector).append(EvoUI.icons.customize('id','panel'));
            this.custOn=true;
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
            $this = this.$el.find('.evol-title-toggle');
            if (state === 'collapsed') {
                $this = this.$el.find('.evol-title-toggle.glyphicon-chevron-down')
                    .trigger('click');
            } else {
                $this = this.$el.find('.evol-title-toggle.glyphicon-chevron-up')
                    .trigger('click');
            }
        }else{
            if (state === 'down') {
                $this.closest('.panel').css('height','');
                content.slideDown(400).data('expState', 'up');
                $this.addClass('glyphicon-chevron-up')
                    .removeClass('glyphicon-chevron-down');
            } else {
                content.slideUp(400, function() {
                    $this.closest('.panel').css('height','40px');
                }).data('expState', 'down');
                $this.addClass('glyphicon-chevron-down')
                    .removeClass('glyphicon-chevron-up');
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
            this.$el.find('.tab-content > div').show();
        }else{
            this.showTab(id);
        }
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id});
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
;
/*! ***************************************************************************
 *
 * evol-utility : evol-view-toolbar.js
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI;

Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate'
    },

    prefix: 'tbr',

    version: '0.0.1',
	
	options: {
		toolbar: true,
        cardinality: 'one',
		model: null,
		uiModel: null,
		defaultView: 'list',
        style: 'normal'
	},

	state:{},
	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    initialize: function () {
        this.render();
        $('.dropdown-toggle').dropdown();
        //this.model.on("change", function(m){that.refresh(m)});

/*

        var AppRouter = Backbone.Router.extend({
            routes: {
                "posts/:id": "getPost",
                "*actions": "defaultRoute" // Backbone will try match the route above first
            }
        });
        // Instantiate the router
        this.app_router = new AppRouter;
        this.app_router.on('route:getPost', function (id) {
            // Note the variable in the route definition being passed in here
            alert( "Get post number " + id );
        });
        this.app_router.on('route:defaultRoute', function (actions) {
            alert( actions );
        });
        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start();

*/

    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
	},

    _toolbarHTML: function(){
        function link(id, label, icon, card){
            if(card){
                h.push('<li data-cardinality="'+card,'">');
            }else{
                h.push('<li>');
            }
            h.push('<a href="#" data-id="',id,'">',
                htmlIcon(icon),label,'</a></li>');
        }
        function htmlIcon(icon){
            return '<span class="glyphicon glyphicon-'+icon+'" ></span> ';
        }

        function linkDropDowns(){
            h.push('<li class="dropdown">',
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',htmlIcon('th-list'),' <b class="caret"></b></a>',
            '<ul class="dropdown-menu">');
            link('list','List','th-list');
            link('list-grid','Cards','th-large');
            link('charts','Chart','signal');
            //link('list-json','JSON','barcode');
            h.push('</ul>',
                '</li>','<li class="dropdown">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',htmlIcon('stop'),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu">');
            link('edit','All fields','th');
            link('mini','Important fields','th-large'),
            link('json','JSON','barcode');
            h.push('</ul>',
                '</li>');
        }

        var opts = this.options,
            h=[
                '<nav class="navbar" role="navigation">',
                '<div class="navbar-collapse navbar-ex4-collapse">',
                '<ul class="nav navbar-nav">'];
        h.push('<li><div>evol-utility</div></li>');
        h.push('</ul><ul class="nav navbar-nav navbar-right">');
        linkDropDowns();
        link('new','','plus');
        //link('selections','','star');
        link('del','','trash','1');
        //link('export','','arrow-down','n');//'cloud-download');
        //link('customize','','wrench');
        //h.push(link('search','Search','search'));
        link('prev','','chevron-left','1');
        link('next','','chevron-right','1');
        h.push('</ul></div></nav>');
        return h.join('');
    },

	updateModel:function(m){
		this.refresh();
	},

	refresh:function(){
		if(this.viewsHash.list){
			this.viewsHash.list.render();	
		}
		if(this.viewsHash.list-grid){
			this.viewsHash.list-grid.render();	
		}
	},

	setView:function(viewName){
		var mode=viewName,//.toLowerCase(),
			e=this.$el, // this.$el
            eid ='evolw-'+viewName,
			v=e.find('#'+eid),
			vw=this.curView;

        if(!e.length){
            e.append('<div id="'+eid+'"></div>');
            e=e.children().last();
        }

		if(viewName==='customize'){
			if(vw && vw.customize){
				vw.customize();
			}
		}else if(viewName==='filter'){
			//if(this.viewsHash[viewName]){
				var $ff=$('#evol-filter');
				if($ff.length===0){
					$ff=$('<div id="evol-filter" class="table table-bordered">'+
						'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
						'<div class="evol-filter-content"></div></div>');
					//this.$el.prepend($ff);
					e.prepend($ff);
					$ff.find('.evol-filter-content').advancedSearch({fields:contacts_search });

				}
				//this.viewsHash[viewName]=
			//}
		}else{
			//$('#title').html(viewName);
			e.children().not('nav').hide();
			if(v.length){
				this.curView=this.viewsHash[viewName];
				this.curViewName=viewName;
                this.curView.setModel(this.model);
                if(mode==='new'){
                    this.curView.clear();
                }
                v.show();
				this.setToolbar(viewName);
			}else{
				v=$('<div id="evolw-'+viewName+'"></div>');
				e.append(v);
             // TODO fix that one
                if(mode=='list-json'){
                    mode='json';
                }
                var config = {
                    el: v,
                    mode: mode,
                    model: this.model,
                    uiModel: this.options.uiModel
                }
				switch(mode){
					case 'new':
                    case 'edit':
                    case 'mini':
					case 'view':
                    case 'json':
                        var vw = new Evol.ViewOne(config);
                        if(mode!=='json'){
                            this.cardinality='one';
                        }
                        this.setToolbar(mode);
						this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        if(mode==='new'){
                            vw.clear();
                        }
						break;/*
                    case 'export':
                        var vw = new Evol.ViewExport(config);
                        this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        break;*/
					case 'list-grid':
                        this.cardinality='many';
						mode='grid';
					case 'list':
                        $.extend(config,
                            {
                                fields: this.fields('list'),
                                pageSize: 50
                            });
						var vw = new Evol.ViewMany(config);
						this.viewsHash['list']=vw;
						this.setToolbar(mode);
						break;
                    case 'charts':
                        this.cardinality='many';
                        mode='charts';
                        var vw = new Evol.ViewMany(config);
                        this.viewsHash['charts']=vw;
                        this.setToolbar(mode);
                        break;
				}
				this.curView=vw;
				this.curViewName=viewName;
				this.viewsHash[viewName]=vw;
				this.setToolbar(mode);
			}
		}
	},

    setToolbar: function(mode){
		if(this.$el){
			var ones=this.$el.find('li[data-cardinality="1"]'), // #evol-bnew,#evol-bedit,#evol-bdelete
				manys=this.$el.find('li[data-cardinality="n"]'),
				prevNext=this.$el.find('[data-id="prev"],[data-id="next"]'),
                isSearch=mode.indexOf('search')>-1;
            if(mode=='json' || mode==='list-json' || isSearch){
                this.$el.find('a[data-id="customize"]').parent().hide();
            }else{
                this.$el.find('a[data-id="customize"]').parent().show();
            }
			if(mode==='new'){
				prevNext.hide();
			}else{
				prevNext.show();
				if(mode==='list-grid' || mode==='list' || mode==='charts'|| mode==='list-json'){
					ones.hide();
					manys.show();
                    prevNext.hide();
				}else if (isSearch){
                    ones.hide();
                    manys.hide();
                }else{
					ones.show();
					manys.hide();
				}
			}
		}
	},

	setData: function(data){
		if(this.curView){
			this.curView.setData(data);
		}
		return this;
	},

	getData: function(){
		if(this.curView){
			return this.curView.getData();
		}
		return null;
	},

	fields: function(view){ // TODO: str view should be func filter
        var ps=this.options.uiModel.elements,
            fs=[];
        function collectFields(te){
            if(te.elements && te.elements.length>0){
                _.each(te.elements, function(te){
                    collectFields(te);
                });
            }else{
                fs.push(te);
            }
        }
        collectFields(this.options.uiModel);
        if(view==='list'){
            _.filter(fs, function(f){
                return f.list==1;
            })
        }
		return fs;
	},

    click_toolbar: function(evt){
        var e=$(evt.target);
        if(e.tagName!=='A'){
            e=e.closest('a');
        }
        var viewId=e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(viewId){
            case 'del':
                alert('to do');
                //TODO confirmation prompt
                //this.model.destroy();
                //this.model=this.model.collection.models[0];
                break;
            case 'customize':
                this.curView.customize();
                break;
            case 'filter':

                break;
            case 'prev':
            case 'next':
                if(this.model){
                    var collec=this.model.collection,
                        l=collec.length-1,
                        m = this.curView.model,
                        idx =_.indexOf(collec.models, m);
                    if(viewId==='prev'){
                        idx=(idx>0)?idx-1:l;
                    }else{
                        idx=(idx<l)?idx+1:0;
                    }
                    this.model = m = collec.models[idx];
                    _.each(this.views, function(v){
                        v.setModel(m);
                    });
                }
                break;
            default:// 'new' 'edit' 'mini' 'list' 'list-grid' 'export' 'json'
                if(viewId && viewId!==''){
                    this.setView(viewId);
                }
                break;
        }
        evt.stopImmediatePropagation();
    },

    click_navigate: function(evt,ui){
        var m = this.model.collection.get(ui.id);
        this.model=m;
        this.setView('edit');
        this.curView.model=m;
        // todo: change model for all views
        this.curView.render();
        evt.stopImmediatePropagation();
    }

});

;
var dico_field_ui = {
    icon: "evodico/edi_fld.png",
    entity: "property",
    entities: "properties",
    elements: [
        {
            type: "panel",
            label: "Field",
            width: "100",
            elements: [
                { etype: 'field',
                    id:'label',
                    label: "Label",
                    type: "text",
                    cssclass: "FieldMain",
                    cssclassview: "FieldMain",
                    help: "Field title for the user",
                    maxlength: "100",
                    required: "1",
                    search: "1",
                    searchlist: "1",
                    width: "100"
                }
            ]
        },
        {
            type: "tab",
            label: "Definition",
            elements: [
                {
                    type: "panel",
                    label: "Validation",
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: 'type',
                            label: "Type",
                            help: "User Type for the field on screen. Text, or emails can be char, varchar or nvarchar...",
                            type: "lov",
                            list:[
                                {id:'text',label:"text", icon:'pix/evodico/ft-txt.gif'},
                                {id:'txtm',label:"textmultiline", icon:'pix/evodico/ft-txtml.gif'},
                                {id:'bool',label:"boolean", icon:'pix/evodico/ft-bool.gif'},
                                {id:'dec',label:"decimal", icon:'pix/evodico/ft-dec.gif'},
                                {id:'integer',label:"integer", icon:'pix/evodico/ft-int.gif'},
                                {id:'date',label:"date", icon:'pix/evodico/ft-date.gif'},
                                {id:'time',label:"time", icon:'pix/evodico/ft-time.gif'},
                                {id:'datetime',label:"datetime", icon:'pix/evodico/ft-datehm.gif'},
                                {id:'pix',label:"image", icon:'pix/evodico/ft-img.gif'},
                                // {id:'doc',label:"document", icon:'pix/evodico/ft-doc.gif'},
                                // {id:'color',label:"color"}
                                {id:'lov',label:"lov", icon:'pix/evodico/ft-lov.gif'},
                                // {id:'formula',label:"formula", icon:'pix/evodico/ft-.gif'},
                                // {id:'html',label:"html", icon:'pix/evodico/ft-htm.gif'},
                                {id:'email',label:"email", icon:'pix/evodico/ft-email.gif'},
                                {id:'url',label:"url", icon:'pix/evodico/ft-url.gif'}
                            ],
                            maxlength: "100",
                            required: "1",
                            search: "1",
                            searchlist: "1",
                            width: "62"
                        },
                        { etype: 'field',
                            id:'req',
                            label: "Required",
                            default: false,
                            help: "Mandatory field",
                            type: "boolean",
                            maxlength: "100",
                            search: "1",
                            searchlist:'1',
                            width: "38",
                            img: "checkr.gif"
                        },
                        { etype: 'field',
                            id:'max',
                            label: "Max. length",
                            help: "Maximum number of characters allowed",
                            type: "integer",
                            maxlength: "100",
                            width: "62"
                        },
                        { etype: 'field',
                            id:'readonly',
                            label: "Read only",
                            default:false,
                            help: "Users can view this field value but cannot modify it",
                            type: "boolean",
                            maxlength: "100",
                            search: "1",
                            width: "38",
                            img: "checkr.gif"
                        },
                        { etype: 'field',
                            id:'maxval',
                            label: "Maximum value",
                            conditions: [{
                                'visible': function(m,uim){
                                    return m.get('')
                                }
                            }],
                            labellist: "Max.",
                            type: "integer",
                            maxlength: "4",
                            width: "62",
                            height: "1"
                        },
                        { etype: 'field',
                            id:'minval',
                            label: "Minimum value",
                            labellist: "Min.",
                            type: "integer",
                            maxlength: "4",
                            width: "38",
                            height: "1"
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "Display",
            elements: [
                {
                    type: "panel",
                    label: "Display",
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id:'pos',
                            label: "Position",
                            help: "Integer (gaps OK)",
                            type: "integer",
                            maxlength: "3",
                            width: "38"
                        },
                        { etype: 'field',
                            id:'height',
                            label: "Height",
                            help: "Height in number of lines (for ''Textmultiline'' fields)",
                            type: "integer",
                            maxlength: "3",
                            width: "32"
                        },
                        { etype: 'field',
                            id:'width',
                            label: "Width",
                            default: 100,
                            help: "Relative width of the field (in percentage)",
                            type: "integer",
                            format: "0 '%'",
                            maxlength: "3",
                            width: "30"
                        },
                        { etype: 'field',
                            id:'format',
                            label: "Format",
                            type: "text",
                            help: "example '$ 0.00'",
                            maxlength: "30",
                            width: "38"
                        },
                        { etype: 'field',
                            id: 'css',
                            label: "CSS Field Edit",
                            labellist: "CSS Edit",
                            help: "Stylesheet class name for the field in edit mode.",
                            type: "text",
                            maxlength: "20",
                            search: "1",
                            width: "32"
                        },
                        { etype: 'field',
                            id:'searchlist',
                            label: "Result List",
                            help: "Field shows as header field for lists",
                            labellist: "List",
                            type: "boolean",
                            search: "1",
                            searchlist: "1",
                            width: "100"
                        },
                        { etype: 'field',
                            id:'search',
                            label: "Search",
                            default:true,
                            help: "Field shows in the search form",
                            type: "boolean",
                            search: "1",
                            searchlist: "1",
                            width: "38"
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            id: 'tab-model',
            label: "Model",
            elements: [
                {
                    type: "panel",
                    id: 'map',
                    optional: "1",
                    label: "Model",
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: "attribute",
                            label: "Attribute",
                            help: "Attribute name",
                            required: "1",
                            type: "text",
                            maxlength: "100",
                            search: "1",
                            width: "100"
                        },
                        { etype: 'field',
                            id: 'colpix',
                            label: "UI name",
                            help: "",
                            required: "",
                            type: "text",
                            maxlength: "100",
                            width: "100"
                        }
                    ]
                }
            ]
        },
        {
            type: "tab",
            label: "User Help",
            elements: [
                {
                    type: "panel",
                    optional: "1",
                    label: "Field Help",
                    width: "100",
                    elements: [
                        { etype: 'field',
                            id: 'help',
                            label: "Help",
                            help: "Help on the field for edition",
                            type: "textmultiline",
                            maxlength: "500",
                            width: "100",
                            height: "8"
                        }
                    ]
                }
            ]
        }
    ]
};
;
//   Evolutility Localization Library ENGLISH
//   (c) 2013 Olivier Giulieri
//   www.evol-utility.org


var EvolLang={

	LOCALE:"EN",    // ENGLISH

    nodata: 'No data.',

    // validation
	intro:'You are not finished yet:',
	empty:'"{0}" must have a value.',
	email:'"{0}" must be a valid email.',
	integer:'"{0}" must only use numbers.',
	decimal:'"{0}" must be a valid decimal numbers.',
	date:'"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2005".',
	datetime:'"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm am/pm" like "12/24/2005 10:30 am".',
	time:'"{0}" must be a valid date/time, format must be "hh:mm am/pm" like "10:30 am".',
	max:'"{0}" must be smaller or equal to {1}.',
	min:'"{0}" must be greater or equal to {1}.',
	reg:'"{0}" must match the regular expression pattern "{1}".',

    // buttons
    Save:"Save",
    SaveAdd:"Save and Add Another",
    Cancel:"Cancel",
    NoChange:"No Change",
    NoX:"No {0}",

    // --- toolbar ---
    View:"View",
    Edit:"Edit",
    // Login:"Login"
    New:"New",
    NewItem:"New Item",
    NewUpload:"New Upload",
    Search:"Search",
    //AdvSearch:"Advanced Search",
    NewSearch:"New Search",
    Selections:"Selections",
    Selection:"Selection",
    Export:"Export",
    SearchRes:"Search Result",
    MassUpdate:"Mass Update",
    Delete:"Delete",
    ListAll:"List All",
    Print:"Print",
    DeleteEntity:"Delete this {0}?", // {0}=entity
    Back2SearchResults:"Back to search results",
    DownloadEntity:"Download {0}"

}	

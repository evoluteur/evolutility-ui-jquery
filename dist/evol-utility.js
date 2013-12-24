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

    fields: function (uiModel, fnFilter) {
        // TODO fields details or not?
        var fs = [];

        function collectFields(te) {
            if (te && te.elements && te.elements.length > 0) {
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

    showDesigner: function(id, type, $el){
        var h=[],
            $elDes=$('<div class="evol-des-'+type+'"></div>'),
            uiModel;

        switch(type){
            case 'field':
                uiModel = dico_field_ui
                break;
                
        }    
        $el.closest('.evol-fld').append($elDes);

        vw = new Evol.ViewOne({
            toolbar:true,
            model: null,
            uiModel: uiModel,
            defaultView: 'edit',
            el: $elDes,
            button_addAnother: false
        });
        vw.render();

        $elDes.on('click', 'button#save,button#cancel', function(evt){
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

    // html fragments
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

    // reusable html
    html_more: function (label) {
        return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
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
        return ['<textarea rows="',h,'" class="evol-json">', _.escape(JSON.stringify(fVobj, null, '\t')), '</textarea>'].join('');
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
        _.each(fLOV, function (f) {
            h.push(EvoUI.inputOption(f.id, f.text));
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

    inputToggle: function  (items) {
        var h=['<div class="btn-group" data-toggle="buttons">'];
        _.each(items, function(item){
            h.push('<label class="btn btn-info"><input type="radio" name="options" id="',item.id,'">',item.text,'</label>');
        });
        h.push('</div>');
        return h.join('');
    },

    icon: function (icon, cls) {
        return ['<span class="', cls? cls+' ':'', 'glyphicon glyphicon-', icon, '"></span>'].join('');
    },

    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', EvoUI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLMsg: function (title, content, style, dismissable) {
        return [
            '<div class="alert alert-',style,
            dismissable?
                ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                :'">',
            '<strong>',title,'</strong> ', content,'</div>'
        ].join('');
    },

    formatDate: function(d){
        return (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear();
    },
    formatTime: function(d){
        return (d.getHours()) + ":" + (d.getMinutes());
    },

    // get w/ automatic create if not in DOM
    getOrCreate: function (fID) {
        var e = $('#' + fID);
        if (e == null) {
            e = $('<div id="' + fID + "></div>");
            $(body).append(e);
        }
        return e;
    },

    // insert a dataSet into a Backbone collection
    insertCollection: function (collection, dataSet){
        if(collection.length==0){
            _.each(dataSet,function(d){
                collection.create(d);
            })
        }
    },

    capFirstLetter: function(word){
        if(word && word.length>0){
            return word.substring(0,1).toUpperCase() + word.substring(1);
        }else{
            return '';
        }
    },

    setVisible: function($e, visible){
        if(visible){
            $e.show();
        }else{
            $e.hide();
        }
    }

}

;
/*! ***************************************************************************
 *
 * evol-utility : evol-ui-charts.js
 *
 * Copyright (c) 2013, Olivier Giulieri 
 *
 *************************************************************************** */

Evol.UI.Charts = {

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix){
        return [ //class="panel ', this.options.style, '
            '<div class="evol-chart-holder panel panel-info"><label class="evol-chart-title">',title,
            '</label><img src="',urlPix,'"><br></div>'
        ].join('');
    },

    Pie: function (label, data, labels){
        var urlGoogleChart = [EvoUI.Charts.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=360x200'].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart);
    },

    Bars: function (label, data, labels){
        var maxCount = _.max(data),
            urlGoogleChart = [EvoUI.Charts.URL,'?chbh=a&amp;chs=350x200&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
                maxCount,
                '&amp;chd=t:',
                data.join('|'),
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl=',
                labels.join('|')
            ].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart);
    }

}

;
/*! ***************************************************************************
 *
 * evol-utility : evol-view-many.js
 *
 * View many
 * modes: list, cards, charts
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany = Backbone.View.extend({

    cardinality: 'n',
    viewName: 'list',
    className: 'evol-many-list',

    options: {
        style: 'panel-info',
        pageSize: 20
    },

    events: {
        'click a.evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > span': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function (opts) {
        var that=this;
        this.options.mode=opts.mode;
        this.options.uiModel=opts.uiModel;
        this.render();
        if(this.model){
            this.model.collection.on('change', function(model){
                that.render();
            });
        }
    },
    customize: function () {
        var labels;
        if(this.options.mode=='cards'){
            labels = this.$('h4 > a.evol-nav-id');
        }else{
            labels = this.$('th > span')
        }
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(EvoUI.icons.customize('id','field'));
            this._custOn=true;
        }
        return this;
    },

    render: function () {
        var h = [];
        if(this.model){
            this.renderList(h, this.options.mode);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this.$el.html(h.join(''));
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
        h.push('<div class="evol-many-', mode, '">');
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

    getFields: function (){
        if(!this._fields){
            this._fields=EvoDico.fields(this.options.uiModel, function(f){
                return f.searchlist;
            });
        }
        return this._fields;
    },

    _HTMLlist: function (h, fields, pSize, icon) {
        h.push('<div class="panel ',this.options.style,'">');
        h.push('<table class="table table-bordered table-hover"><thead>');
        for (var i=0; i<fields.length; i++) {
            this._renderListHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistbody(h, fields, pSize, icon);
        h.push('</tbody></table></div>');
    },

    _HTMLlistbody: function(h, fields, pSize, icon){
        var data = this.model.collection.models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r = 0; r < rMax; r++) {
                this._HTMLlistrow(h, fields, data[r], icon);
            }
        }
    },

    _hashLov: {},
    _lovText:function(f,v){
        if(('list' in f) && f.list.length>0){
            if(!(f.id in this._hashLov)){
                this._hashLov[f.id]={};
            }
            var hashLov = this._hashLov[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                for(var j=0,jMax=f.list.length;j<jMax;j++){
                    var tuple=f.list[j];
                    if(tuple.id==v){
                        hashLov[v]=tuple.text;
                        return tuple.text;
                    }
                }
            }
        }
        return '';
    },

    _HTMLlistrow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i=0; i<fields.length; i++) {
            var f = fields[i],
                v = model.get(f.id);
            h.push('<td>');
            if (i == 0) {
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if (icon) {
                    h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                }
            }
            h.push(this._HTMLField(f,v));
            if (i == 0) {
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _HTMLcards: function (h, fields, pSize, icon) {
        var data = this.model.collection.models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r=0; r<rMax; r++) {
                h.push('<div class="panel ',this.options.style,'">');
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i],
                        cRow = data[r],
                        v = cRow.get(f.id);
                    h.push('<div data-id="', cRow.id, '">');
                    if (i == 0) {
                        h.push('<h4><a href="#" id="fg-', f.id, '" class="evol-nav-id">');
                        if (icon) {
                            h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                        }
                        h.push(this._HTMLField(f,v));
                        h.push('</a></h4>');
                    }else{
                        //h.push(EvoUI.fieldLabel(f.id,f.label));
                        h.push(this._HTMLField(f,v));
                    }
                    h.push('</div>');
                }
                h.push('</div>');
            }
            h.push(EvoUI.html.clearer);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
    },

    _HTMLField: function(f,v){
        switch(f.type){
            case EvoDico.fieldTypes.bool:
                if (v >0 || v == 'True') {
                    return EvoUI.icon('ok');
                }
                break;
            case EvoDico.fieldTypes.lov:
                if (v != '') {
                    return this._lovText(f,v);
                }
                break;
            case EvoDico.fieldTypes.date:
            case EvoDico.fieldTypes.time:
            case EvoDico.fieldTypes.datetime:
                if (v != '') {
                    var myDate=new Date(v);
                    if(_.isDate(myDate)){
                        var dv=''
                        //return myDate.toLocaleDateString("en-US");
                        if(f.type!=EvoDico.fieldTypes.time){
                            dv+=EvoUI.formatDate(myDate);
                        }
                        if(f.type==EvoDico.fieldTypes.datetime){
                            dv+=' ';
                        }
                        if(f.type!=EvoDico.fieldTypes.date){
                            dv+=EvoUI.formatTime(myDate);
                        }
                        return dv;
                    }
                }
                break;
            default:
                return v;
        }
        return '';
    },

    _HTMLcharts: function (h) {
        var that=this,
            uiModel =this.options.uiModel,
            model = this.model,
            models = model.collection.models,
            chartFields = EvoDico.fields(uiModel, function(f){
                return (f.type==EvoDico.fieldTypes.lov || f.type==EvoDico.fieldTypes.bool);
            });

        _.each(chartFields, function(f){
            var groups = _.countBy(models, function(m) {
                return m.get(f.id);
            });
            var groupData = groups,
                data=[],
                labels=[];
            for(var dataSetName in groupData) {
                var g=groupData[dataSetName];
                data.push(g);
                if(f.type==EvoDico.fieldTypes.lov){
                    labels.push(that._lovText(f,dataSetName)+' ('+g+')');
                }else{
                    labels.push(dataSetName+' ('+g+')');
                }
            }
            var entityName=EvoUI.capFirstLetter(uiModel.entities)
            if(f.type==EvoDico.fieldTypes.lov){
                h.push(EvoUI.Charts.Pie(entityName + ' by ' + f.label, data, labels));
            }else{
                h.push(EvoUI.Charts.Bars(entityName + ': ' + f.label, data, labels));
            }
        });
        h.push(EvoUI.html.clearer);
    },

    _renderListHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icon('chevron-up'),
            EvoUI.icon('chevron-down'),
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
        var iMin = pIdx * pSize + 1,
            allPages = parseInt(allCount / pSize, 10),
            iMax = (allPages > 5) ? 5 : allPages,
            h = ['<ul class="pagination pagination-sm">'];
        if (pIdx > 0) {
            h.push('<li data-id="prev"><a href="#">&laquo;</a></li>');
        }
        for (var i=iMin; i<iMax; i++) {
            h.push('<li data-id="', i, '"><a href="#">', i, '</a></li>');
        }
        if (allCount > (pIdx + 1) * pSize) {
            h.push('<li data-id="next"><a href="#">&raquo;</a></li>');
        }
        h.push('</ul>');
        return h.join('');
    },

    click_navigate: function (evt) {
        var e=$(evt.currentTarget),
            pTag=this.options.mode==='list'?'tr':'div';
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: e.closest(pTag).data('id')});
    },

    click_sort: function (evt) {
        var collec=this.model.collection,
            target=$(evt.currentTarget),
            fid=target.parent().data('fid'),
            up=target.attr('class').indexOf('-up')>0;
        collec.comparator = function(model) {
            return model.get(fid);
        }
        collec.sort();
        if(up){
            collec.models.reverse();
        }
        this.render(); //todo: renderBody
        target.addClass('evol-last-sort');
        this.$el.trigger('list.sort', {id: fid, up:up});
    },

    click_pagination: function (evt) {
        this.$el.trigger('list.paginate', {id: $(evt.currentTarget).closest('li').data('id')});
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    }

});

;
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
/*
    modes: {
        'new':'new',
        'edit':'edit',
        'mini':'mini',
        'view':'view',
        'json':'json',
        'cards':'cards',
        'list':'list',
        'charts':'charts'
    }, */

	options: {
		toolbar: true,
        cardinality: 'one',
		defaultView: 'list',
        style: 'normal',
        customize:false
	},

	state:{},
	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    initialize: function (opts) {
        this.options.mode=opts.mode;
        this.options.uiModel=opts.uiModel;
        this.options.defaultView=opts.defaultView;
        this.render();
        $('.dropdown-toggle').dropdown();
        //this.model.on("change", function(m){that.refresh(m)});
    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
	},

    _toolbarHTML: function(){
        var endMenu='</ul></li>',
            menuDevider='<li role="presentation" class="divider"></li>';
        function beginMenu(icon){
            return ['<li class="dropdown">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',EvoUI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu">'].join('');
        }
        function link(id, label, icon, card){
            var h=[];
            if(card){
                h.push('<li data-cardi="'+card,'">');
            }else{
                h.push('<li>');
            }
            h.push('<a href="#" data-id="',id,'">',EvoUI.icon(icon),label,'</a></li>');
            return h.join('');
        }

        var opts = this.options,
            h=['<ul class="nav nav-pills" style="float:left;">',
                link('new','','plus'),
                link('del','','trash','1'),
                link('list','','th-list'),
                link('charts','','stats')
                //link('selections','','star'),
                //link('search','','search','n');
            ];
        //link('export','','arrow-down','n');//'cloud-download'),
        //link('customize','','wrench'),
        if(this.options && this.options.customize){
            h.push(
                beginMenu('wrench'),
                link('customize','Customize this view','wrench'),
                menuDevider,
                link('new-field','New Field','plus'),
                link('new-panel','New Panel','plus'),
                endMenu);
        }
        h.push(
            link('prev','','chevron-left','1'),
            link('next','','chevron-right','1'),
            '</ul><ul class="nav nav-pills" style="float:right;">',
            link('list','','th-list','n'),
            link('cards','','th-large','n'),
            link('edit','','th','1'),
            link('mini','','th-large','1'),
            link('json','','barcode','1'),
            '</ul>',EvoUI.html.clearer);
        return h.join('');
    },

	updateModel:function(m){
		this.refresh();
	},

	refresh:function(){
		if(this.viewsHash.list){
			this.viewsHash.list.render();	
		}
		if(this.viewsHash.cards){
			this.viewsHash.cards.render();
		}
	},

	setView:function(viewName){
		var mode=viewName,//.toLowerCase(),
			$e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView;

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
					$e.prepend($ff);
					$ff.find('.evol-filter-content').advancedSearch({fields:contacts_search });
				}
				//this.viewsHash[viewName]=
			//}
		}else{
            if(this.curView){
                this.curView.$el.hide();
            }
			if($v.length){
				this.curView=this.viewsHash[viewName];
				this.curViewName=viewName;
                this.curView.options.mode=viewName;
                this.curView.setModel(this.model);
                if(mode==='new'){
                    this.curView.clear();
                }
                $v.show();
				this.setToolbar(viewName);
			}else{
				$v=$('<div data-vid="evolw-'+viewName+'"></div>');
				$e.append($v);
             // TODO fix that one
                var config = {
                    el: $v,
                    mode: mode,
                    model: this.model,
                    uiModel: this.options.uiModel
                }
				switch(viewName){
					case 'new':
                    case 'edit':
                    case 'mini':
					case 'view':
                    case 'json':
                        vw = new Evol.ViewOne(config);
						this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        if(viewName==='new'){
                            vw.clear();
                        }
						break;
                    case 'charts':
					case 'cards':
					case 'list':
						vw = new Evol.ViewMany(config);
						break;/*
                 case 'export':
                 var vw = new Evol.ViewExport(config);
                 this.viewsHash[mode]=vw;
                 this.views.push(vw);
                 break;*/
				}
				this.curView=vw;
				this.curViewName=viewName;
				this.viewsHash[viewName]=vw;
				this.setToolbar(viewName);
			}
		}
	},

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            this._toolbarButtons = {
                ones: this.$el.find('li[data-cardi="1"]'),
                manys: this.$el.find('li[data-cardi="n"]'),
                prevNext: this.$el.find('[data-id="prev"],[data-id="next"]'),
                customize: this.$el.find('a[data-id="customize"]').parent()
            }
        }
        return this._toolbarButtons;
    },

    setToolbar: function(mode){
        function onemany(showOne, showMany){
            EvoUI.setVisible(tbBs.ones, showOne);
            EvoUI.setVisible(tbBs.manys, showMany);
        }
		if(this.$el){
			var tbBs=this.getToolbarButtons(),
                isSearch=mode.indexOf('search')>-1;
            EvoUI.setVisible(tbBs.customize,mode!='json' && !isSearch);
            tbBs.prevNext.hide();
			if(mode==='new'){
                onemany(false, false);
			}else{
				if(mode==='cards' || mode==='list' || mode==='charts'){
                    onemany(false, true);
				}else if (isSearch){
                    onemany(false, false);
                }else{
                    onemany(true, false);
                    tbBs.prevNext.show();
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

    click_toolbar: function(evt){
        var $e=$(evt.target);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var viewId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(viewId){
            case 'del':
                // TODO good looking msgbox
                if (confirm('Are you sure you want to delete this record?')) {
                    var collec = this.model.collection;
                    this.model.destroy({
                        success:function(model, response){

                        },
                        error:function(err){
                            alert('error')
                        }
                    });
                    this.model=collec.models[0];
                    this.curView.setModel(collec.models[0]);
                }
                break;
            case 'customize':
                this.curView.customize();
                break;
            //case 'filter':
            //    break;
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
            case 'new-field':
            case 'new-panel':
                EvoDico.showDesigner('id', 'field', $e);
                break;
            default:// 'new' 'edit' 'mini' 'list' 'cards' 'export' 'json'
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

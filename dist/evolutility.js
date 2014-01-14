/*   evolutility 0.0.1 */

/*   (c) 2014 Olivier Giulieri */

/*! ***************************************************************************
 *
 * evolutility :: ui.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.UI = {

    version: '0.0.1',

    // --- static html fragments ---
    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>',
        emptyOption: '<option value=""></option>'
    },

    // --- field labels ---
    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label"><label for="', fID, '">', fLbl, '</label></div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label"><label for="', fID, '">', fLbl, '</label></span>'].join('');
    },

    // --- input fields ---
    inputText: function (fID, fV, fd, css, size) {
        var fCss= 'evo-field form-control ' + (css || '') + Evol.UI.getSizeCSS(size),
            h = ['<input type="text" id="',fID,'" value="', fV];
        if(fd) {
            // properties mapping to html attributes
            _.each(['id', 'min', 'max', 'maxlength', 'placeholder'], function (item) { // 'max-width', 'min-width',
                if (fd[item] !== undefined) {
                    h.push('" ', item, '="', fd[item]);
                }
            });
            //other fields attributes
            if(fd.readonly){
                var fi = fd.readonly;
                if (fi || fi == '1') {
                    h.push('" ', item, '="', item);
                }
            }
            if(fCss && fCss!==''){
                    h.push('" class="', fCss);
            }
        }
        h.push('">');
        return h.join('');
    },
    inputTextInt: function (fID, fV) {
        return ['<input class="evo-field form-control" type="number" id="', fID, '" value="', fV,
            '" maxlength="12">'].join('');
    },
    inputTextM: function (fID, fV, ml, h) {
        return [
            '<textarea name="', fID, '" id="', fID, '" class="evo-field form-control"" rows="', h,
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
            '" class="evo-field form-control" size="15">'
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
        if (fV !== null && fV !== '' && fV !== '0') {
            fh.push(' checked="checked"');
        }
        fh.push(' value="1">');
        return fh.join('');
    },
    inputCheckboxLOV:function(fLOV){
        var h=[];
        for(var i in fLOV){
            var lv=fLOV[i];
            h.push('<input type="checkbox" id="',lv.id,'" value="',lv.id,'"/>',
                '<label for="',lv.id,'">',lv.text,'</label> ');
        }
        return h.join('');
    },
    inputRadio: function (fN, fV, fLbl, sel, fID) {
        return ['<label for="', fID, '"><input id="', fID, '" name="', fN, '" type="radio" value="', fV,
            (sel) ? '" checked="checked' : '',
            '">', fLbl, '</label>&nbsp;'
        ].join('');
    },
    inputLOV: function (fID, fV, fVLabel, fLOV) {
        var h = ['<select class="evo-field form-control" id="', fID, '"><option value="', fV, '" selected>', fVLabel, '</option>'];
        _.each(fLOV, function (f) {
            h.push(EvoUI.inputOption(f.id, f.text));
        });
        h.push('</select>');
        return h.join('');
    },
    inputHidden: function (fID, fV) {
        return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
    },
    inputHiddens: function (h, list) {
        _.each(function (){
            h.push('<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>');
        });
    },
    inputSelectBegin: function (fID, css, emptyOption) {
        var h=['<select id="', fID, '" class="form-control ',css,'">'];
        if(emptyOption){
            h.push(Evol.UI.html.emptyOption);
        }
        return h.join('');
    },
    inputSelect:function (fID, css, emptyOption, list) {
        return [
            Evol.UI.inputSelectBegin(fID, css, emptyOption),
            Evol.UI.inputOptions(list),'</select>'
        ].join('');
    },
    inputOption: function (fID, fV) {
        return ['<option value="', fID, '">', fV, '</option>'].join('');
    },
    inputOptions: function (fields) {
        var opts=[];
        _.each(fields,function(f){
            opts.push(EvoUI.inputOption(f.id, f.text));
        });
        return opts.join('');
    },
    inputButton: function (id, label, css) {
        return '<button type="button" id="' + id + '" class="btn' + (css ? ' ' + css : '') + '">' + label + '</button>';
    },
/*
    inputToggle: function  (items) {
        var h=['<div class="btn-group" data-toggle="buttons">'];
        _.each(items, function(item){
            h.push('<label class="btn btn-info"><input type="radio" name="options" id="',item.id,'">',item.text,'</label>');
        });
        h.push('</div>');
        return h.join('');
    },*/

    // --- links ---
    link: function (fID, label, url) {
        return ['<a class="evo-field" href="', url, '" id="', fID, '">', label, '</a>'].join('');
    },
    linkEmail: function (fID, label, email) {
        return EvoUI.link(fID, label, email ? 'mailto:' + email : '');
    },
    //html_more: function (label) {
    //    return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
    //},

    // --- icons ---
    icon: function (icon, cls) {
        return ['<i class="', cls? cls+' ':'', 'glyphicon glyphicon-', icon, '"></i>'].join('');
    },

    iconCustomize: function (id, type) {
        return ['<i class="glyphicon glyphicon-wrench" data-id="', id, '" data-type="', type, '"></i>'].join('');
    },

    // --- panels ---
    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', EvoUI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLEmptyPanel: function(id, css, style){
        return '<div class="'+css+' panel panel-'+style+'" data-id="'+id+'"></div>';
    },


    HTMLMsg: function (title, content, style, dismissable) {
        return [
            '<div data-id="msg" class="alert alert-',style || 'info',
            dismissable?
                ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                :'">',
            '<strong>',title,'</strong> ', content,'</div>'
        ].join('');
    },

    // --- date formats ---
    formatDate: function(d){
        return (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear();
    },
    formatTime: function(d){
        return (d.getHours()) + ":" + (d.getMinutes());
    },

    // ---   ---
    getSizeCSS: function(size){
        switch(size){
            case 'S':
                return ' input-sm';
            case 'L':
                return ' input-lg';
        }
        return '';
    },
/*
    // get w/ automatic create if not in DOM
    getOrCreate: function (fID,$holder) {
        var e = $holder.find('#' + fID);
        if (e.length===0) {
            $('<div id="' + fID + '"></div>');
            ($holder || $(body)).append(e);
            e = $holder.find('#' + fID);
        }
        return e;
    },*/

    // insert a dataSet into a Backbone collection
    insertCollection: function (collection, dataSet){
        if(collection.length===0){
            _.each(dataSet,function(d){
                collection.create(d);
            });
        }
    },

    capFirstLetter: function(word){ // TODO use _.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);
        }else{
            return '';
        }
    },

    trim: function(stringValue){ // TODO use _.trim(word);
        if(stringValue){
            return stringValue.replace(/^\s+|\s+$/g,'');
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

};
;
/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return [ //class="panel ', this.options.style, '
            '<div class="evol-chart-holder panel ',style,'"><label class="evol-chart-title">',title,
            '</label><img src="',urlPix,'"><br></div>'
        ].join('');
    },

    Pie: function (label, data, labels, style){
        var urlGoogleChart = [EvoUI.Charts.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=360x200'].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style){
        var maxCount = _.max(data),
            urlGoogleChart = [EvoUI.Charts.URL,'?chbh=a&amp;chs=350x200&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
                maxCount,
                '&amp;chd=t:',
                data.join('|'),
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl=',
                labels.join('|')
            ].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart, style);
    }

};

;
/*! ***************************************************************************
 *
 * evolutility :: ui-dico.js
 *
 * Copyright (c) 2014, Olivier Giulieri
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

    lovText:function(hash, f,v){
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
        return fType == fType==EvoDico.fieldTypes.datetime || EvoDico.fieldTypes.date || fType==EvoDico.fieldTypes.time;
    },

    showDesigner: function(id, type, $el){
        var $elDes=$('<div class="evol-des-'+type+'"></div>'),
            uiModel;

        switch(type){
            case 'field':
                uiModel = dico_field_ui;
                break;
        }    
        $el.closest('.evol-fld').after($elDes);

        vw = new Evol.ViewOne.Edit({
            model: null,
            uiModel: uiModel,
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
    }

};
;
//   Evolutility Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility
//   (c) 2014 Olivier Giulieri


var EvolLang={

	LOCALE:"EN",    // ENGLISH

    // --- toolbar ---
    View:"View",
    Edit:"Edit",
    // Login:"Login"
    New:"New",
    NewItem:"New Item",
    NewUpload:"New Upload",
    //Search:"Search",
    //AdvSearch:"Advanced Search",
    NewSearch:"New Search",
    Selections:"Selections",
    Selection:"Selection",
    Export:"Export",
    SearchRes:"Search Result",
    //MassUpdate:"Mass Update",
    Delete:"Delete",
    All:"All",
    //ListAll:"List All",
    //Print:"Print",
    DeleteEntity:"Delete this {0}?", // {0}=entity
    Back2SearchResults:"Back to search results",

    // --- validation ---
    validation:{
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
        regex:'The value "{0}" is not of the expected format.'
        //regex:'"{0}" must match the regular expression pattern for "{1}".'
    },


    // --- export ---
    export:{
        ExportEntity: "Export this {0}", // {0}=entity
        ExportHeader: "Header",
        ExportSeparator: "Separator",
        ExportFirstLine:"First line for field names",
        ExportFormat: "Export format",
        ExportFields: "Fields to include in the export",
        IDkey: "ID (Primary Key)",
        AllFields: "Show all fields",
        ExportFormats: "Comma separated (CSV, TXT, XLS...)-HTML-SQL Insert Statements (SQL)-Tab separated values (TXT)-XML-Javascript Object Notation (JSON)",
        //xpColors:'Header color-Color odd rows-Color even rows',
        //xpColMap:'Columns map to',
        xpXMLroot:'Element name', // 'Root element name'
        //xpXMLAttr:'Attributes',
        //xpXMLElem:'Elements',
        xpSQL:'SQL Options',
        xpSQLTable:'Table name',
        xpSQLTrans:'Inside transaction',
        xpSQLId:'Enable identity insert',
        DownloadEntity:"Download {0}"
    },

    // --- buttons ---
    Save:"Save",
    SaveAdd:"Save and Add Another",
    Cancel:"Cancel",
    NoChange:"No Change",
    NoX:"No {0}",

    // --- many  ---
    nodata: 'No data.',

    // --- filters ---
    filters:{
        sEqual:'equals',
        sNotEqual:'not equal',
        sStart:'starts with',
        sContain:'contains',
        sFinish:'finishes with',
        sInList:'any of',
        sIsNull:'is empty',
        sIsNotNull:'is not empty',
        sBefore:'before',
        sAfter:'after',
        sNumEqual:'&#61;',
        sNumNotEqual:'!&#61;',
        sGreater:'&#62;',
        sSmaller:'&#60;',
        sOn:'on',
        sNotOn:'not on',
        sAt:'at',
        sNotAt:'not at',
        sBetween:'between',
        opAnd:'and',
        //opOr:'or',
        yes:'Yes',
        no:'No',
        bNewFilter:'New filter',
        bAddFilter:'Add filter',
        bUpdateFilter:'Update filter',
        bSubmit:'Submit',
        bCancel:'Cancel'
    }

};
;
/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View many
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany = Backbone.View.extend({

    cardinality: 'n',
    _hashLov: {},

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    events: {
        'click a.evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function (opts) {
        var that=this;
        _.extend(this.options, opts);
        this._filter=[];
        if(this.collection){
            this.collection.on('change', function(model){
                that.render();
            });
        }
    },

    render:function(){
        var models=this.collection.models;
        if(this.collection.length){
            if(this._filter.length){
                var that=this;
                models=models.filter(function(model){
                    var filters=that._filter,
                        want=true;
                    for(var i= 0, iMax=filters.length;i<iMax && want;i++){
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
                        }
                    }
                    return want;
                });
            }
            this._render(models);
        }else{
            this.$el.html(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        return this;
    },

    _render:function(models){
        alert('_render must be overwritten');
    },

    customize: function () {
        var labels = this.$('th > span');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(EvoUI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    },

    setModel: function(model) {
        if(model.collection){
            this.collection = model.collection;
            this.render();
        }else{
            alert('No collection.');
        }
        return this;
    },

    setCollection: function(collection){
        this.collection = collection;
        this.render();
        return this;
    },

    setFilter: function(filter){
        this._filter=filter;
        return this;
    },

    //updateModel: function () {
    //    alert('updateModel');
    //},

    _updateTitle: function (){
        //$(this.options.title).html(this.model.get('title'));
    },

    getFields: function (){
        if(!this._fields){
            this._fields=EvoDico.fields(this.options.uiModel, function(f){
                return f.viewmany;
            });
            this._fieldHash={};
            var that=this;
            _.each(this._fields,function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getField: function (fid){
        return this._fieldHash[fid];
    },

    _HTMLField: function(f,v){
        switch(f.type){
            case EvoDico.fieldTypes.bool:
                if (v==='true' || v=='1') {
                    return EvoUI.icon('ok');
                }
                break;
            case EvoDico.fieldTypes.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                        return EvoDico.lovText(this._hashLov, f, v);
                    //}
                }
                break;
            case EvoDico.fieldTypes.date:
            case EvoDico.fieldTypes.time:
            case EvoDico.fieldTypes.datetime:
                if (v !== '') {
                    var myDate=new Date(v);
                    if(_.isDate(myDate)){
                        var dv='';
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
        return ['<p>', rangeBegin, '-', rangeEnd, ' of ', allCount, ' ', entities, '</p>'].join('');
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

    sortList: function(f, down){
        var collec=this.collection;
        if(collec!==undefined){
            if(f.type==EvoDico.fieldTypes.text || f.type==EvoDico.fieldTypes.txtm || f.type==EvoDico.fieldTypes.email){
                collec.comparator = EvoDico.bbComparatorText(f.id);
            }else{
                collec.comparator = EvoDico.bbComparator(f.id);
            }
            collec.sort();
            if(down){
                collec.models.reverse();
            }
            if(this.renderBody){
                this.renderBody(collec.models);
            }else{
                this.render();
            }
            this.$el.trigger('list.sort', {id: f.id, direction:down?'down':'up'});
        }
    },

    click_navigate: function (evt) {
        var e=$(evt.currentTarget),
            pTag=this.options.mode==='list'?'tr':'div';
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: e.closest(pTag).data('id')});
    },

    click_sort: function (evt) {
        var target=$(evt.currentTarget),
            fid=target.parent().data('fid'),
            f=this.getField(fid),
            down=target.attr('class').indexOf('-down')>0;
        this.sortList(f,down);
        target.addClass('evol-last-sort');
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
 * evolutility :: many-cards.js
 *
 * View many cards
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(EvoUI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    },

    _render: function (models) {
        var h = [];
        if(models && models.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50,
                pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
            h.push('<div class="evol-many-cards">');
            this._HTMLcards(h, this.getFields(), pSize, uim.icon);
            h.push(pSummary, this._paginationHTML(0, pSize, models.length),
                '</div>');
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcards: function (h, fields, pSize, icon) {
        var data = this.collection.models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r=0; r<rMax; r++) {
                h.push('<div class="panel ',this.options.style,'">');
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i],
                        cRow = data[r],
                        v = cRow.get(f.id);
                    h.push('<div data-id="', cRow.id, '">');
                    if (i === 0) {
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
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: many-charts.js
 *
 * View many charts
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'chart',

    options: {
        style: 'normal',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50;
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, opts.style);
            h.push('</div>');
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcharts: function (h, style) {
        var that=this,
            uiModel = this.options.uiModel,
            models = this.collection.models,
            chartFields = EvoDico.fields(uiModel, function(f){
                return (f.type==EvoDico.fieldTypes.lov || f.type==EvoDico.fieldTypes.bool || f.type==EvoDico.fieldTypes.integer);
            });

        if(chartFields && chartFields.length){
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
                        labels.push(EvoDico.lovText(that._hashLov, f,dataSetName)+' ('+g+')');
                    }else{
                        labels.push(dataSetName+' ('+g+')');
                    }
                }
                var entityName=EvoUI.capFirstLetter(uiModel.entities);
                if(f.type==EvoDico.fieldTypes.lov){
                    h.push(EvoUI.Charts.Pie(entityName + ' by ' + f.label, data, labels, style));
                }else{
                    h.push(EvoUI.Charts.Bars(entityName + ': ' + f.label, data, labels, style));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg('No charts available','The data structure doesn\'t allow for autogenerated charts.'));
        }
        h.push(EvoUI.html.clearer);
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View many list
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',

    options: {
        style: 'panel-info',
        pageSize: 20,
        //title: '#title', // TODO FIX
        selectable: true
    },

    _render: function (models) {
        var h = [],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 50,
            pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
        this._models=models;
        h.push('<div class="evol-many-list">',
            //'<div class="panel ',this.options.style,'">',
            '<table class="table table-bordered table-hover"><thead>');
        for (var i=0; i<fields.length; i++) {
            this._HTMLlistHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistBody(h, fields, pSize, uim.icon);
        h.push('</tbody></table>', //</div>
            pSummary, this._paginationHTML(0, pSize, models.length),
            '</div>');
        this.$el.html(h.join(''));
    },

    renderBody: function(models){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 50;

        this._HTMLlistBody(h, fields, pSize, uim.icon);
        this.$('.table > tbody').html(h.join(''));
    },

    _HTMLlistBody: function(h, fields, pSize, icon){
        var data = this._models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r = 0; r < rMax; r++) {
                this._HTMLlistRow(h, fields, data[r], icon);
            }
        }
    },

    _HTMLlistRow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i=0; i<fields.length; i++) {
            var f = fields[i],
                v = model.escape(f.id);
            h.push('<td>');
            if(i===0){
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if(icon){
                    h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                }
                if(v===''){
                    v='('+model.id+')';
                }
            }
            h.push(this._HTMLField(f,v));
            if(i===0){
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icon('chevron-up'),//'sort-by-alphabet'
            EvoUI.icon('chevron-down'),//'sort-by-alphabet-alt'
            '</span></span></th>'
        );
    }

});

;
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
                            $img.attr('src',fv);
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
;
/*! ***************************************************************************
 *
 * evolutility :: one-edit.js
 *
 * View one edit
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.Edit = Evol.ViewOne.extend({

    viewName: 'edit',
    prefix: 'oe',

    render: function () {
        var h = [];
        this.renderEdit(h);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    renderEdit: function (h) {
        // EDIT and VIEW forms
        var iTab = -1,
            iPanel = -1,
            opts = this.options,
            elems = opts.uiModel.elements,
            mode = 'edit';

        h.push('<div class="evo-one-',mode,'">');
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
                    this.renderPanelList(h, p, 'pl-' + i, mode);
                    break;
            }
        }
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
        this._updateTitle();
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-json.js
 *
 * View one json
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.JSON = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    viewName: 'json',
    prefix: 'oj',

    render: function () {
        var h = [];
        if(this.model){
            var jsonStr=JSON.stringify(this.model, null, 2);
            h.push(EvoUI.inputTextMJSON('',jsonStr,10));
        }
        this._renderButtons(h, 'json');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    getData: function () {
        var jsonStr=this.$el.children('textarea').val();
        return $.parseJSON(jsonStr);
    },

    setData: function (m) {
        var that=this,
            prefix='#'+ that.prefix + '-';
        this.$el.children('textarea').val(JSON.stringify(m, null, 2));
        this._updateTitle();
    },

    clear: function () {
        this.$el.children('textarea').val('');
        return this;
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-mini.js
 *
 * View one mini
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.Mini = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click label > .glyphicon-question-sign': 'click_help'
        // extra evt for $(window) resize
    },

    viewName: 'mini',
    prefix: 'om',

    getFieldsCondition: function(m){
        return m.required || m.viewmany || m.viewmini;
    },

    render: function () {
        var mode = this.options.mode,
            h = [];
        this.renderEdit(h, mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    renderEdit: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            flds = this.getFields(),
            miniUIModel= {
                type: 'panel', class:'evo-mini-holder', label: EvoUI.capFirstLetter(opts.uiModel.entity), width: 100,
                elements: flds
            };
        this.renderPanel(h,miniUIModel,'evo-one-mini',mode);
        this._renderButtons(h, mode);
        this._updateTitle();
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate'
    },

    options: {
        toolbar: true,
        defaultView: 'list',
        style: 'panel-default',
        buttons: {
            // --- views for one ---
            edit: true,
            mini: true,
            json: true,
            // --- views for many ---
            list: true,
            cards: true,
            charts: true,
            // --- actions ---
            'new': true,
            del: true,
            filter: false,
            export: true,
            group: false,
            customize:true
        }
    },

    modesHash: {
        'edit':'Edit',
        'mini':'Mini',
        'json':'JSON',
        'cards':'Cards',
        'list':'List',
        'charts':'Charts'
    },

	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.render();
        this.$('[data-cid="views"] > li').tooltip();
        this.$('.dropdown-toggle').dropdown();
    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
	},

    _toolbarHTML: function(){
        var h=[],
            opts=this.options;
            endMenu='</ul></li>',
            menuDevider='<li role="presentation" class="divider" data-cardi="1"></li>',
            menuDeviderCard1='<li role="presentation" class="divider" data-cardi="1"></li>';

        function beginMenu(icon){
            return ['<li class="dropdown">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',EvoUI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu">'].join('');
        }

        function link2h(id, label, icon, cardi, tooltip){
            h.push('<li data-id="',id,'"');
            if(cardi){
                h.push(' data-cardi="'+cardi,'"');
            }
            if(tooltip && tooltip!==''){
                h.push(' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="',tooltip,'"');
            }
            h.push('><a href="#" data-id="',id,'">',EvoUI.icon(icon));
            if(label && label!==''){
                h.push('&nbsp;',label);
            }
            h.push('</a></li>');
        }

        function linkOpt2h (id, label, icon, cardi, tooltip){
            if(opts.buttons && opts.buttons[id]){
                link2h(id, label, icon, cardi, tooltip);
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-cid="main">');
        linkOpt2h('list',EvolLang.All,'th-list');
        linkOpt2h('new',EvolLang.New,'plus');
        linkOpt2h('del',EvolLang.Delete,'trash','1');
        //linkOpt2h('filter','Filter','filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('export','Export','cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            link2h('prev','','chevron-left','1');
            link2h('next','','chevron-right','1');
            h.push('</ul><ul class="nav nav-pills pull-right" data-cid="views">');

                h.push(beginMenu('eye-open'));
                linkOpt2h('list','List','th-list','n');
                linkOpt2h('cards','Cards','th-large','n');
                linkOpt2h('charts','Charts','stats','n');
                linkOpt2h('edit','All Fields','th','1');
                linkOpt2h('mini','Important Fields only','th-large','1');
                linkOpt2h('json','JSON','barcode','1');
/*
                h.push(menuDeviderCard1);
                linkOpt2h('lg','Big','font','1');
                linkOpt2h('','Normal','font','1');
                linkOpt2h('sm','Small','font','1');
*/
                h.push(endMenu);

            //linkOpt2h('customize','','wrench', '1', 'Customize');
            /*
            if(opts.buttons.customize){
                h.push(beginMenu('wrench'));
                link2h('customize','Customize this view','wrench');
                h.push(menuDevider);
                link2h('new-field','New Field','plus');
                link2h('new-panel','New Panel','plus');
                h.push(endMenu);
            }*/
        }
        h.push('</ul>',EvoUI.html.clearer,'</div>');
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
        return this;
	},

	setView:function(viewName){
		var $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config;

        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this._isNew = true;
            this.curView.clear();
            this.curView.options.mode='new';
        }else{
            this._isNew = false;
            if($v.length){
                this.curView=this.viewsHash[viewName];
                if(!this.isNew){
                    if(this.curView.setModel){
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }

                }
                this.$('[data-cid="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                $v.show()
                    .siblings().not('.evo-toolbar,.evo-filters,.clearfix').hide();
            }else{
                $v=$('<div data-vid="evolw-'+viewName+'"></div>');
                $e.children().not('.evo-toolbar,.evo-filters,.clearfix').hide();
                $e.append($v);
                // TODO fix that one
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: this.collection,
                    uiModel: this.options.uiModel,
                    style: this.options.style
                };
                this.$('[data-id="new"]').show();
                this.$('[data-cid="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');

                switch(viewName){
                    // --- one ---
                    case 'edit':
                    case 'mini':
                    case 'json':
                        vw = new Evol.ViewOne[this.modesHash[viewName]](config).render();
                        this._prevOne=viewName;
                        break;
                    // --- many ---
                    case 'charts':
                    case 'cards':
                    case 'list':
                        vw = new Evol.ViewMany[this.modesHash[viewName]](config).render();
                        this._prevMany=viewName;
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewExport(config);
                        break;
                }
                this.curView=vw;
                this.curViewName=viewName;
                this.viewsHash[viewName]=vw;
            }
        }
        this.setButtons(viewName);
        return this;
	},

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('li');
            this._toolbarButtons = {
                ones: lis.filter('[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                prevNext: this.$('[data-id="prev"],[data-id="next"]'),
                customize: this.$('a[data-id="customize"]').parent()
            };
        }
        return this._toolbarButtons;
    },

    setButtons: function(mode){
        function oneMany(showOne, showMany){
            EvoUI.setVisible(tbBs.ones, showOne);
            EvoUI.setVisible(tbBs.manys, showMany);
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons();
            EvoUI.setVisible(tbBs.customize,mode!='json');
            tbBs.prevNext.hide();
			if(this._isNew || mode==='export'){
                oneMany(false, false);
			}else{
				if(mode==='cards' || mode==='list' || mode==='charts'){
                    this._prevMany=mode;
                    oneMany(false, true);
                }else{
                    this._prevOne=mode;
                    oneMany(true, false);
                    tbBs.prevNext.show();
				}
			}
            EvoUI.setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='cards');
		}
	},

    showFilter: function(){
        if(!this._filters){
            var that=this,
                $ff=$(EvoUI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
            this.$('.evo-toolbar').after($ff);
            this._filters = new Evol.ViewFilter({
                el:$ff,
                fields:EvoDico.fields(this.options.uiModel)
            }).render();
            $ff.on('change.filter', function(){
                that.curView.setFilter(that._filters.val())
                    .render();
            });
        }
        return this;
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

    browse: function(toolId){ // toolId = "prev" or "next"
        var cModel = this.curView.model;
        if(this.model && this.model.collection && this.model.collection.length){
            var collec=this.model.collection,
                l=collec.length-1,
                idx =_.indexOf(collec.models, cModel);
            if(toolId==='prev'){
                idx=(idx>0)?idx-1:l;
            }else{
                idx=(idx<l)?idx+1:0;
            }
            cModel = collec.models[idx];
        }else{
            cModel = null;
        }
        this.model = cModel;
        this.curView.setModel(cModel);
        return this;
    },

    deleteItem: function(){
        // TODO good looking msgbox
        if (confirm('Are you sure you want to delete this record?')) {
            var that=this,
                collec=this.curView.model.collection,
                delModel=this.curView.model,
                modelIdx=_.indexOf(collec.models, delModel);
            delModel.destroy({
                success:function(){
                    that.curView.setMessage('Record Deleted', 'Record was removed.', 'success');
                    if(collec.length===0){
                        that.curView.clear();
                    }else{
                        var newIdx=(modelIdx>=collec.length)?collec.length-1:modelIdx,
                            newModel = delModel.collection.at(newIdx);
                        this.model = newModel;
                        that.curView.setModel(newModel);
                    }
                },
                error:function(err){
                    alert('error');
                }
            });
        }
    },

    click_toolbar: function(evt){
        var $e=$(evt.target);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var toolId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(toolId){
            case 'del':
                this.deleteItem();
                break;
            case 'customize':
                this.curView.customize();
                break;
            case 'group':
                this.showGroup();
                break;
            case 'filter':
                this.showFilter();
                break;
            case 'prev':
            case 'next':
                this.browse(toolId);
                break;
            case 'new-field':// ui-dico
                EvoDico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'cards', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId);
                }
                break;
        }
        evt.stopImmediatePropagation();
        this.$el.trigger('toolbar.'+toolId);
    },

    click_navigate: function(evt,ui){
        var m = this.model.collection.get(ui.id);
        this.model=m;
        this.setView(this._prevOne || 'edit');
        this.curView.model=m;
        // todo: change model for all views / or model event
        this.curView.render();
        evt.stopImmediatePropagation();
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: export.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */



var Evol = Evol || {},
    EvoUI = Evol.UI,
    evoLangXpt = EvolLang.export;


Evol.ViewExport = Backbone.View.extend({

    version: '0.0.1',

    events: {
        "change #tbrevol-xpt-format": "click_format",
        'change input': 'click_preview', //[type="checkbox"],
        'click .evol-more': 'click_toggle_sel',
        'click #XP': 'click_submit'
        // TODO #tbrevol-xpt-format is a bug if change prefix...
    },

    options: {
        toolbar: true,
        cardinality: 'one',
        model: null,
        uiModel: null,
        defaultView: 'list',
        style: 'normal',
        prefix: 'tbr'
    },

    many: true,
    viewName: "export",

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.render();
        var e = this.$el;
        //###  html ###
        //e.addClass('Panel table table-bordered');
        e.addClass('Panel');
        this._preview('CSV');
        return this;
    },

    render: function(){
        this.$el.html(this._renderHTML());
        this._preview('CSV');
        return this;
    },

    _renderHTML: function () {
        var h = [],
            opts = this.options,
            prefix = opts.prefix || '',
            fields = this.getFields();

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<table class="evol-xpt-form"><tr><td class="evol-xpt-flds"><fieldset>');
        //### list of columns to export #########################################
        h.push('<div class="evol-id">', EvoUI.fieldLabel('', evoLangXpt.ExportFields),
            EvoUI.inputCheckbox('showID','1'), '<label for="showID">', evoLangXpt.IDkey, '</label>',
            '</div>'
        );
        for (var i = 0, iMax = fields.length; i < iMax; i++) {
            var f = fields[i],
                fLabel = f.label,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><input type="checkbox" value="1" id="', fID, '" checked="true"><label class="checkbox" for="', fID, '">', fLabel, '</label></div>');
            if (i == 12 && iMax > 16){
                h.push(EvoExport.html_more2(evoLangXpt.AllFields));
            }
        }
        if (iMax > 16){
            h.push('</div>');
        }
        h.push('</fieldset></td><td class="evol-xpt-para">'); // table = 2 columns
        //##### export formats ########################################
        var fId = prefix + 'evol-xpt-format',
            myLabels = evoLangXpt.ExportFormats.split('-');
        h.push('<label for="', fId, '">', evoLangXpt.ExportFormat, '</label>',
            EvoUI.inputSelect(fId,'evol-xpt-format', false, [
                {id: 'CSV', text: myLabels[0]},
                {id: 'TAB', text: myLabels[3]},
                {id: 'HTML', text: myLabels[1]},
                {id: 'JSON', text: myLabels[5]},
                {id: 'SQL', text: myLabels[2]},
                {id: 'XML', text: myLabels[4]}
            ])
        );
        h.push('<div class="evol-xpt-opts">');
        //# field (shared b/w formats - header #######
        fId = prefix + "FLH";
        h.push('<div class="evol-FLH clearfix">');
        //h.push('<label>', evoLangXpt.ExportHeader, '</label>');
        h.push(EvoUI.inputCheckbox(fId, true), EvoUI.fieldLabelSpan(fId, evoLangXpt.ExportFirstLine));
        //##### CSV, TAB - First line for field names #######
        h.push('</div><div id="', prefix, 'CSV">');
        //# field - separator
        //# - csv - any separator #######
        h.push('<div data-id="csv2" class="evol-w120">',
            //EvoExport.html_more2('options'),
            //.evol-FLH
            EvoUI.fieldLabel('FLS_evol', evoLangXpt.ExportSeparator),
            EvoUI.inputText(prefix+'FLS_evol', ',', 0),
            '</div>'); // </div>
        h.push('</div>');
        _.each(['XML','HTML','SQL','JSON'], function(f){
            h.push('<div id="', prefix, f, '" style="display:none;"></div>');
        });
        h.push('</div>');
        //# Preview #######
        h.push('<label>Export Preview</label><div class="evol-xpt-preview"></div>');

        h.push('</td></tr></table>');
        // ## Samples
        //h.push(this._samples());
        // ## Download button
        h.push('<div class="evol-buttons form-actions">');
        h.push('<input class="btn btn-primary" id="XP" type="submit" value="',
            evoLangXpt.DownloadEntity.replace('{0}', this.options.uiModel.entities),
            '">');
        h.push('</div>');
        return h.join('');
    },

    showFormatOpts: function (xFormat) {
        var prefix = '#'+(this.options.prefix||''),
            e=this.$el;
        switch (xFormat) {
            case 'TAB':
                xFormat = 'CSV';
                this.$('[data-id="csv2"]').hide();
                break;
            case 'CSV':
                this.$('[data-id="csv2"]').show();
                break;
            case 'HTML':
            case 'XML':
            case 'SQL':
            case 'JSON':
                var c = this.$(prefix + xFormat);
                if (c.html() === '') {
                    c.html(EvoExport['form' + xFormat](this.options.uiModel.entity));
                }
                break;
        }
        var divOpts=this.$(prefix + xFormat).show()
            .siblings().hide();
        var e1=divOpts.filter('.evol-FLH');
        if(xFormat==='TAB' || xFormat==='CSV'){
            e1.show();
        }else{
            e1.hide();
        }
        EvoExport.cFormat = xFormat;
    },

    getFields: function (){
        var opts=this.options;
        if(!this.fields){
            this.fields=Evol.Dico.fields(opts.uiModel,opts.fnFilter,opts.mode);
        }
        return this.fields;
    },

    _preview: function (format) {
        var data = this.model.collection.models,
            flds = this.getFields(),
            h = ['<textarea class="Field evol-xpt-val form-control">'],
            fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
            fldsDomHash = {},
            prefix='#'+ this.options.prefix,
            useHeader = this.$(prefix+'FLH').prop('checked');

        _.each(fldsDom, function(fd){
            fldsDomHash[fd.id.substring(3)]='';
        });
        flds=_.filter(flds, function(f){
            if(f.id && _.has(fldsDomHash, f.id)){
                return true;
            }
        });

        switch (format) {
            case 'CSV':
            case 'TAB':
            case 'TXT':
                var iMax=flds.length-1,
                    sep = EvoUI.trim(this.$(prefix+'FLS_evol').val());
                if(format=='TAB'){
                    sep='&#09;';
                }
                //header
                if (useHeader) {
                    _.each(flds, function(f,idx){
                        h.push(f.label);
                        if(idx<iMax){
                            h.push(sep);
                        }
                    });
                    h.push('\n');
                }
                //data
                _.each(data, function(m){
                    _.each(flds, function(f,idx){
                        var mj = m.get(f.id);
                        if (mj) {
                            h.push(mj);
                        }
                        if(idx<iMax){
                            h.push(sep);
                        }
                    });
                    h.push('\n');
                });
                h.push('\n');
                break;
            case 'HTML':
                //header
                h.push('<table>\n');
                if (useHeader) {
                    h.push('<tr>\n');
                    _.each(flds, function(f){
                        h.push('<th>', f.id, '</th>');
                    });
                    h.push('</tr>\n');
                }
                //data
                _.each(data, function(d,idx){
                    h.push('<tr>');
                    _.each(flds, function(f){
                        var mj = d.get(f.id);
                        if (mj) {
                            h.push('<td>', mj, '</td>');
                        } else {
                            h.push('<td></td>');
                        }
                    });
                    h.push('</tr>\n');
                });
                h.push('</table>');
                break;
            case 'JSON':
                h.push(JSON.stringify(this.model.toJSON(), null, 2));
                break;
            case 'SQL':
                var fMax = flds.length -1,
                    optTransaction = this.$('#evoxpTRS1').prop('checked'),
                    optIdInsert = this.$('#evoxpTRS2').prop('checked'),
                    sqlTable = this.$('#evoTable').val().replace(/ /g,'_'),
                    sql = ['INSERT INTO ',sqlTable,' ('];

                if(sqlTable===''){
                    sqlTable = this.options.uiModel.entity.replace(/ /g,'_');
                }
                _.each(flds, function(f,idx){
                    sql.push(f.id);
                    if(idx<fMax){
                        sql.push(', ');
                    }
                });
                sql.push(')\n VALUES (');
                sql = sql.join('');
                //options
                if(optTransaction){
                    h.push('BEGIN TRANSACTION\n');
                }
                if(optIdInsert){
                    h.push('SET IDENTITY_INSERT ',sqlTable,' ON;\n');
                }
                //data
                for (var i = 0, iMax1 = data.length; i < iMax1; i++) {
                    h.push(sql);
                    var m = data[i];
                    for (var j = 0, jMax = flds.length; j < jMax; j++) {
                        var mj = m.get(flds[j].id);
                        h.push('"', mj, '"');
                        if(j<fMax){
                            h.push(', ');
                        }
                    }
                    h.push(');\n');
                }
                //options
                if(optIdInsert){
                    h.push('SET IDENTITY_INSERT ',sqlTable,' OFF;\n');
                }
                if(optTransaction){
                    h.push('COMMIT TRANSACTION\n');
                }
                break;
            case 'XML':
                var elemName = this.$('#evoRoot').val() || this.options.uiModel.entity.replace(/ /g,'_');
                h.push('<xml>\n');
                _.each(data, function(m){
                    h.push('<', elemName, ' ');
                    _.each(flds, function(f){
                        h.push(f.id, '="', m.get(f.id), '" ');
                    });
                    h.push('></', elemName, '>\n');
                });
                h.push('</xml>');
                break;
        }
        h.push('</textarea>');
        this.$('.evol-xpt-preview')
            .html(h.join(''));
    },

    val: function (value) {
        if (typeof value == 'undefined') {
            return this._getValue();
        } else {
            this._setValue(value);
            return this;
        }
    },

    _ValFields: function () {
        var v = [],
            flds = this.$('.evol-xpt-flds input:checked').not('#showID');
        for (var i = 0, iMax = flds.length; i < iMax; i++) {
            var fe = $(flds[i]);
            v.push(fe.attr('id'));
        }
        return v;
    },
    _getValue: function () {
        var v = {
                format: this._bFormat.val(),
                fields: this._ValFields(),
                options: {}
            },
            ps = this.$('.evol-xpt-para input'),
            f = ps.eq(0),
            fv = f.attr('checked') !== 'undefined';
        v.options[f.attr('id')] = fv;
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.target).val();//this.$('.evol-xpt-format').val();
        if (format === 'XML') {
            this.$('#XML').html(EvoExport.formXML(this.options.uiModel.entity))
                .show()
                .siblings().not('.evol-FLH').hide();
            EvoExport.cFormat = 'XML';
        }
        this.showFormatOpts(format);
        this._preview(format);
        this.$el.trigger('change.export', 'format', format);//evt.currentTarget.val()
    },

    click_preview: function (evt) {
        var format = this.$('.evol-xpt-format').val();
        this._preview(format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget)
            .hide()
            .next().slideDown();
    },

    click_submit: function (evt) {
        this.$el.trigger('submit.export');
    }
});


var EvoExport = {

    cFormat: 'CSV',

    html_more2: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-more">', label, '</a><div class="evol-more-content">'
        ].join('');
    },

    formHTML: function () {
        return '';
    },

    formXML: function (entity) {
        return [
            EvoExport.html_more2('options'),
            EvoExport.formEntityName('evoRoot', evoLangXpt.xpXMLroot, entity),
            EvoUI.fieldLabel('evoxpC2X', evoLangXpt.xpColMap),
            '</div>'
        ].join('');
    },

    formJSON: function () {
        return '';
    },

    formSQL: function (entity) {
        return [
            EvoExport.html_more2('options'),
            EvoExport.formEntityName('evoTable', evoLangXpt.xpSQLTable, entity),
            '<div>', EvoUI.inputCheckbox('evoxpTRS2', '0'), EvoUI.fieldLabelSpan('evoxpTRS2', evoLangXpt.xpSQLId), '</div>',
            '<div>', EvoUI.inputCheckbox('evoxpTRS1', '0'), EvoUI.fieldLabelSpan('evoxpTRS1', evoLangXpt.xpSQLTrans), '</div>',
            '</div>'
           ].join('');
    },

    formEntityName: function(id,label,entity){
        return [
            EvoUI.fieldLabel(id, label),
            EvoUI.inputText(id, entity.replace(' ', '_'), 30),'<br/>'
            ].join('');
    }

};
;
/*! ***************************************************************************
 *
 * evolutility :: filter.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico,
    evoLang=EvolLang.filters;

var evoAPI={
    sEqual:'eq',
    sNotEqual:'ne',
    sStart:'sw',
    sContain:'ct',
    sFinish:'fw',
    sInList:'in',
    sIsNull:'null',
    sIsNotNull:'nn',
    sGreater:'gt',
    sSmaller:'lt',
    sBetween:'bw'
};

Evol.ViewFilter = Backbone.View.extend({

    events: {
        'click .evo-filters > button': 'click_editFilter',
        'click .evo-filters-btns > button > .glyphicon-remove': 'click_remove'
        // TODO move other events here
    },

    options: {
        fields: [],
        dateFormat: 'mm/dd/yy',
        //highlight: true,
        buttonLabels: false,
        submitButton: false,
        submitReady: false
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        return this;
    },

    render: function(){
        var bClass='btn',
            bLabels=this.options.buttonLabels,
            that=this,
            e=this.$el,
            h=['<div class="evo-filters-btns"></div>',
                '<button class="evo-bNew btn-primary ',bClass,'">',evoLang.bNewFilter,'</button>'];
        if(this.options.submitButton){
            h.push('<button class="evo-bSubmit">',evoLang.bSubmit,'</button>');
        }
        h.push('<div class="evo-editFilter"></div>',
            '<button class="evo-bAdd ',bClass,' btn-primary" style="display:none;">',EvoUI.icon('ok'),'</button>',//, '&nbsp;', evoLang.bAddFilter
            '<button class="evo-bDel ',bClass,'" style="display:none;">',EvoUI.icon('remove'),'</button>');//, '&nbsp;', evoLang.bCancel
        this._step=0;
        e.html(h.join(''));
        if(this.options.submitReady){
            this._hValues=$('<span></span>').appendTo(e);
        }
        // - button submit
        if(this.options.submitButton){
            this._bSubmit=e.find('.evo-bSubmit').button({
                text: bLabels
            }).on('click', function(){
                that.$el.trigger('submit.filter');
            });
        }
        // - editor button new
        this._bNew=e.find('.evo-bNew').button().on('click', function(e){
            if(that._step<1){
                that._setEditorField();
                that._step=1;
            }
            //that._bAdd.find('.ui-button-text').html(evoLang.bAddFilter);
            });
        // - editor button add
        this._bAdd=e.find('.evo-bAdd').button().on('click', function(evt){
            var data=that._getEditorData();
            if(that._cFilter){
                that._enableFilter(data, that.options.highlight);
            }else{
                that.addFilter(data);
            }
            that._removeEditor();
        });
        // - editor button cancel
        this._bDel=e.find('.evo-bDel').button().on('click', function(evt){
                that._removeEditor();
            });
        this._editor=e.find('.evo-editFilter')
            .on('change', '#field', function(evt){
                evt.stopPropagation();
                if(that._step>2){
                    that._editor.find('#value,#value2,.as-Txt').remove();
                }
                if(that._step>1){
                    that._editor.find('#operator').remove();
                    that._bAdd.hide();
                }
                that._step=1;
                var fieldID=$(evt.currentTarget).val();
                if(fieldID!==''){
                    that._field=that._getFieldById(fieldID);
                    var fType=that._type=that._field.type;
                    that._setEditorOperator();
                    if(fType==EvoDico.fieldTypes.lov || fType==EvoDico.fieldTypes.bool){
                        that._setEditorValue();
                    }
                }else{
                    that._field=that._type=null;
                }
            }).on('change', '#operator', function(evt){
                evt.stopPropagation();
                that._operator=$(this).val();
                if(that._step>2){
                    that._editor.find('#value,#value2,.as-Txt').remove();
                    that._bAdd.hide();
                    that._step=2;
                }
                that._setEditorValue();
            }).on('change keyup', '#value,#value2', function(evt){
                evt.stopPropagation();
                var type=that._type,
                    value=$(this).val(),
                    valid=(value!=='') || type==EvoDico.fieldTypes.lov || type==EvoDico.fieldTypes.bool;
                if(type==EvoDico.fieldTypes.number){
                    valid=valid && !isNaN(value);
                }else if(that._operator==evoAPI.sBetween){
                    valid=that._editor.find('#value').val()!=='' && that._editor.find('#value2').val()!=='';
                }
                if(valid){
                    that._bAdd.button('enable');
                    if(evt.which==13){
                        that._bAdd.trigger('click');
                    }
                }else{
                    that._bAdd.button('disable');
                }
            }).on('click', '#checkAll', function(){
                var $this=$(this),
                    vc=$this.attr('checked'),
                    allChecks=$this.siblings();
                if(vc=='checked'){
                    allChecks.attr('checked',vc);
                }else{
                    allChecks.removeAttr('checked');
                }
            });
        this._filters=e.find('.evo-filters-btns').on('click', 'button', function(){
            that._editFilter($(this));
        }).on('click', 'btn-secondary', function(evt){
            evt.stopPropagation();
            var filter=$(this).parent();
            if(!filter.hasClass('ui-state-disabled')){
                filter.fadeOut('slow',function(){
                    filter.remove();
                    that._triggerChange();
                });
            }
        });
        return this;
    },

    _getFieldById: function(fId){
        if(!this._hash){
            this._hash={};
            var fields=this.options.fields;
            for (var i=0,iMax=fields.length;i<iMax;i++){
                this._hash[fields[i].id]=fields[i];
            }
        }
        return this._hash[fId];
    },

    _removeEditor: function(){
        this._editor.empty();
        this._bAdd.hide();
        this._bDel.hide();
        this._enableFilter(null, false);
        this._bNew.removeClass('ui-state-active').show().focus();
        if(this._bSubmit){
            this._bSubmit.removeClass('ui-state-active').show();
        }
        this._step=0;
        this._field=this._type=this._operator=null;
    },

    addFilter: function(filter){
        var f=$(['<button class="btn btn-default btn-sm">',this._htmlFilter(filter),'</button>'].join(''))
            .prependTo(this._filters)
            .button({
                icons: {secondary:'ui-icon-close'}
            })
            .data('filter', filter)
            .fadeIn();
        //if(this.options.highlight){
        //    f.effect('highlight');
        //}
        this._triggerChange();
        return this;
    },

    removeFilter: function(index){
        this._filters.children().eq(index).remove();
        this._triggerChange();
        return this;
    },

    _htmlFilter: function(filter){
        var h=[
            '<span class="evo-lBold">', filter.field.label,'</span> ',
            '<span class="evo-lLight">', filter.operator.label,'</span> ',
            '<span class="evo-lBold">', filter.value.label, '</span>'
        ];
        if(filter.operator.value==evoAPI.sBetween){
            h.push('<span class="evo-lLight"> ', evoLang.opAnd, ' </span>',
                '<span class="evo-lBold">', filter.value.label2, '</span>');
        }
        h.push(EvoUI.icon('remove'));
        return h.join('');
    },

    _enableFilter: function(filter, anim){
        if(this._cFilter){
            this._cFilter.button('enable').removeClass('ui-state-hover ui-state-active');
            //if(anim){
            //    this._cFilter.effect('highlight');
            //}
            if(filter){
                this._cFilter.data('filter', filter)
                    .find(':first-child').html(this._htmlFilter(filter));
                this._cFilter=null;
                this._triggerChange();
            }else{
                this._cFilter=null;
            }
        }
    },

    _editFilter: function($filter){
        var filter=$filter.data('filter'),
            fid=filter.field.value,
            op=filter.operator.value,
            fv=filter.value;
        this._enableFilter(null, false);
        this._removeEditor();
        this._cFilter=$filter.button('disable');
        this._setEditorField(fid);
        this._setEditorOperator(op);
        if(op==evoAPI.sBetween){
            this._setEditorValue(fv.value, fv.value2);
        }else{
            this._setEditorValue(fv.value);
        }
        this._bAdd.find('.ui-button-text').html(evoLang.bUpdateFilter);
        this._step=3;
    },

    _setEditorField: function(fid){
        if(this._step<1){
            this._bNew.stop().hide();
            if(this._bSubmit){
                this._bSubmit.stop().hide();
            }
            this._bDel.show();
            if(!this._fList){
                var fields=this.options.fields,
                    h=[EvoUI.inputSelectBegin('field',null,true)];
                _.each(fields, function(f){
                    h.push(EvoUI.inputOption(f.id, f.label));
                });
                h.push('</select>');
                this._fList=h.join('');
            }
            $(this._fList).appendTo(this._editor).focus();
        }
        if(fid){
            this._field=this._getFieldById(fid);
            this._type=this._field.type;
            this._editor.find('#field').val(fid);
        }
        this._step=1;
    },

    _setEditorOperator: function(cond){
        var evoTypes=EvoDico.fieldTypes,
            fType=this._type;
        if(this._step<2){
            var h=[];
            switch (fType){
                case evoTypes.lov:
                    //h.push(evoLang.sInList);
                    h.push(EvoUI.inputHidden('operator',evoAPI.sInList));
                    this._operator=evoAPI.sInList;
                    break;
                case evoTypes.bool:
                    //h.push(evoLang.sEqual);
                    h.push(EvoUI.inputHidden('operator',evoAPI.sEqual));
                    this._operator=evoAPI.sEqual;
                    break;
                default:
                    h.push(EvoUI.inputSelectBegin('operator','',true));
                    switch (fType){
                        case evoTypes.date:
                        case evoTypes.time:
                            if (fType==evoTypes.time){
                                h.push(EvoUI.inputOption(evoAPI.sEqual, evoLang.sAt),
                                    EvoUI.inputOption(evoAPI.sNotEqual, evoLang.sNotAt));
                            }else{
                                h.push(EvoUI.inputOption(evoAPI.sEqual, evoLang.sOn),
                                    EvoUI.inputOption(evoAPI.sNotEqual, evoLang.sNotOn));
                            }
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sGreater, text: evoLang.sAfter},
                                {id: evoAPI.sSmaller, text: evoLang.sBefore},
                                {id: evoAPI.sBetween, text: evoLang.sBetween}
                            ]));
                            break;
                        case evoTypes.number:
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sEqual, text: evoLang.sNumEqual},
                                {id: evoAPI.sNotEqual, text: evoLang.sNumNotEqual},
                                {id: evoAPI.sGreater, text: evoLang.sGreater},
                                {id: evoAPI.sSmaller, text: evoLang.sSmaller}
                            ]));
                            break;
                        default:
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sEqual, text: evoLang.sEqual},
                                {id: evoAPI.sNotEqual, text: evoLang.sNotEqual},
                                {id: evoAPI.sStart, text: evoLang.sStart},
                                {id: evoAPI.sContain, text: evoLang.sContain},
                                {id: evoAPI.sFinish, text: evoLang.sFinish}
                            ]));
                    }
                    h.push(EvoUI.inputOption(evoAPI.sIsNull, evoLang.sIsNull),
                        EvoUI.inputOption(evoAPI.sIsNotNull, evoLang.sIsNotNull));
                    h.push('</select>');
            }
            this._editor.append(h.join(''));
        }
        if(cond && fType!=evoTypes.lov){
            this._editor.find('#operator').val(cond);
            this._operator=cond;
        }
        this._step=2;
    },

    _setEditorValue: function( v, v2){
        var editor=this._editor,
            fType=this._type,
            evoTypes=EvoDico.fieldTypes,
            opVal=editor.find('#operator').val(),
            opBetween=false,
            addOK=true;
        if(opVal!==''){
            if(fType!=evoTypes.lov && (opVal==evoAPI.sIsNull || opVal==evoAPI.sIsNotNull)){
                editor.append(EvoUI.inputHidden('value',''));
            }else{
                if(this._step<3){
                    var h=[];
                    opBetween=opVal==evoAPI.sBetween;
                    switch (fType){
                        case evoTypes.lov:
                            h.push('<span id="value">');
                            if(this._field.list.length>7){
                                h.push(EvoUI.inputCheckbox('checkAll', true),'<label for="checkAll">',EvolLang.All,'</label>');
                            }
                            h.push(EvoUI.inputCheckboxLOV(this._field.list),
                                '</span>');
                            break;
                        case evoTypes.bool:
                            h.push('<span id="value">',
                                EvoUI.inputRadio('value', '1', evoLang.yes, v!='0', 'value1'),
                                EvoUI.inputRadio('value', '0', evoLang.no, v=='0', 'value0'),
                                '</span>');
                            break;
                        case evoTypes.date:
                        case evoTypes.time:
                        case evoTypes.number:
                            var iType=fType;//(fType==evoTypes.date)?'text':fType;
                            h.push('<input id="value" type="',fType,'"/>');
                            if(opBetween){
                                h.push('<span class="as-Txt">',evoLang.opAnd,' </span>',
                                    '<input id="value2" type="',iType,'"/>');
                            }
                            addOK=false;
                            break;
                        default:
                            h.push(EvoUI.inputText('value', '','evo-w-'));
                            addOK=false;
                    }
                    editor.append(h.join(''));
                    //if(fType==evoTypes.date){
                    //    editor.find('#value,#value2').datepicker({dateFormat:this.options.dateFormat});
                    //}
                }
                if(v){
                    var $value=editor.find('#value');
                    switch (fType){
                        case evoTypes.lov:
                            $value.find('#'+v.split(',').join(',#')).attr('checked', 'checked');
                            break;
                        case evoTypes.bool:
                            $value.find('#value'+v).attr('checked', 'checked');
                            break;
                        default:
                            $value.val(v);
                            addOK=v!=='';
                            if(opBetween){
                                $value.next().next().val(v2);
                                addOK=v!=='' && v2!=='';
                            }
                    }
                }else{
                    addOK=(fType==evoTypes.lov || fType==evoTypes.bool);
                }
            }
            this._bAdd.button(addOK?'enable':'disable').show();
            this._step=3;
        }
    },

    _getEditorData: function(){
        var e=this._editor,
            f=e.find('#field'),
            v=e.find('#value'),
            filter={
                field:{
                    label: f.find('option:selected').text(),
                    value: f.val()
                },
                operator:{},
                value:{}
            },
            evoTypes=EvoDico.fieldTypes,
            op=filter.operator,
            fv=filter.value;
        if(this._type==evoTypes.lov){
            var vs=[], ls=[];
            v.find('input:checked').not('#checkAll').each(function(){
                vs.push(this.value);
                ls.push(this.nextSibling.innerHTML);
            });
            if(vs.length===0){
                op.label=evoLang.sIsNull;
                op.value=evoAPI.sIsNull;
                fv.label=fv.value='';
            }else if(vs.length==1){
                op.label=evoLang.sEqual;
                op.value=evoAPI.sEqual;
                fv.label='"'+ls[0]+'"';
                fv.value=vs[0];
            }else{
                op.label=evoLang.sInList;
                op.value=evoAPI.sInList;
                fv.label='('+ls.join(', ')+')';
                fv.value=vs.join(',');
            }
        }else if(this._type==evoTypes.bool){
            op.label=evoLang.sEqual;
            op.value=evoAPI.sEqual;
            var val=(v.find('#value1').attr('checked')=='checked')?1:0;
            fv.label=(val==1)?evoLang.yes:evoLang.no;
            fv.value=val;
        }else{
            var o=e.find('#operator'),
                opVal=o.val();
            op.label=o.find('option:selected').text();
            op.value=opVal;
            if(opVal==evoAPI.sIsNull || opVal==evoAPI.sIsNotNull){
                fv.label=fv.value='';
            }else{
                if(this._type==evoTypes.number || this._type==evoTypes.date || this._type==evoTypes.time){
                    fv.label=v.val();
                }else{
                    fv.label='"'+v.val()+'"';
                }
                fv.value=v.val();
                if(opVal==evoAPI.sBetween){
                    fv.label2=fv.value2=v.next().next().val();
                }
            }
        }
        return filter;
    },

    _hiddenValue: function(h, filter, idx){
        h.push(EvoUI.inputHidden('fld-'+idx, filter.field.value),
            EvoUI.inputHidden('op-'+idx, filter.operator.value),
            EvoUI.inputHidden('val-'+idx, filter.value.value));
        var v2=filter.value.value2;
        if(v2){
            h.push(EvoUI.inputHidden('val2-'+idx, v2));
        }
    },

    _setHiddenValues: function(){
        var vs=this.val(),
            iMax=vs.length,
            h=[EvoUI.inputHidden('elem', iMax)];
        for(var i=0;i<iMax;i++){
            this._hiddenValue(h, vs[i], i+1);
        }
        //h.push('&label=',encodeURIComponent(this.valText()));
        this._hValues.html(h.join(''));
    },

    _triggerChange: function(){
        if(this.options.submitReady){
            this._setHiddenValues();
        }
        this.$el.trigger('change.filter');
    },

    val: function(value){
        if (typeof value=='undefined'){
            // --- get value
            var v=[];
            this._filters.children().each(function(){
                v.push($(this).data('filter'));
            });
            return v;
        }else{
            // --- set value
            this._filters.empty();
            for(var i=0,iMax=value.length;i<iMax;i++){
                this.addFilter(value[i]);
            }
            this._triggerChange();
            return this;
        }
    },

    valText: function(){
        var v=[];
        this._filters.find('a').each(function(){
            v.push(this.text);
        });
        return v.join(' '+evoLang.opAnd+' ');
    },

    valUrl: function(){
        var vs=this.val(),
            iMax=vs.length,
            url=['filters=',iMax];
        if(iMax<1)
            return '';
        for(var i=0;i<iMax;i++){
            var v=vs[i];
            url.push(
                '&field-',i,'=',v.field.value,
                '&operator-',i,'=',v.operator.value,
                '&value-',i,'=',encodeURIComponent(v.value.value)
            );
            if(v.operator==evoAPI.sBetween){
                url.push('&value2-',i,'=',encodeURIComponent(v.value.value2));
            }
        }
        url.push('&label=',encodeURIComponent(this.valText()));
        return url.join('');
    },

    clear: function(){
        this._cFilter=null;
        this._removeEditor();
        this._filters.empty();
        this._triggerChange();
        return this;
    },

    length: function(){
        return this._filters.children().length;
    },

    destroy: function(){
        var e=this.$el.off();
        e.find('.evo-bNew,.evo-bAdd,.evo-bDel,.evo-filters').off();
        this._editor.off();
        e.empty();
    },

    click_editFilter: function(evt){
        //var idx=$(evt.target).index();
        this._setEditorValue( );
    },

    click_remove: function(evt){
        evt.stopImmediatePropagation();
        var idx=$(evt.target).parent().index();
        this.removeFilter(idx);
    }

});


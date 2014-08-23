/*   evolutility v0.3   */
/*   (c) 2014 Olivier Giulieri   */
/*   https://github.com/evoluteur/evolutility   */
/*! ***************************************************************************
 *
 * evolutility :: ui.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};
Evol.hashLov = {};
Evol.ViewAction = {};
/*
Evol.CSS = {
    field: 'evo-field form-control ',
    fieldLabel: 'evol-field-label',
    panel: '',
    tab: '',
    tabHeader: ''
};*/

Evol.UI = {

    // --- static html fragments ---
    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>',
        emptyOption: '<option value=""></option>',
        glyphicon: 'glyphicon glyphicon-',
        required: '<span class="evol-required">*</span>', // TODO replace by div w/ ":after" css for icon
        buttonClose: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
    },

    // --- field labels ---
    label: function (id, label) {
        return ['<label for="', id, '">', label, '</label>'].join('');
    },
    fieldLabel: function (id, label) {
        return ['<div class="evol-field-label">', this.label(id, label), '</div>'].join('');
    },
    fieldLabelSpan: function (id, label) {
        return ['<span class="evol-field-label">', this.label(id, label), '</span>'].join('');
    },

    // --- input fields ---
    input: {

        text: function (id, value, fd, css) {
            var fCss= 'evo-field form-control ' + (css || ''),
                h = ['<input type="text" id="', id, '" value="', value];
            if(value.indexOf('"')>-1){
                value=value.replace(/"/g,'\"');
            }
            if(fd) {
                // properties mapping to html attributes
                _.each(['id', 'min', 'max', 'maxlength', 'placeholder'], function (item) { // 'max-width', 'min-width',
                    if (!_.isUndefined(fd[item])) {
                        h.push('" ', item, '="', fd[item]);
                    }
                });
                //other fields attributes
                if(fd.readonly){
                    h.push('" ', item, '="', item);
                }
                if(fCss){
                    h.push('" class="', fCss);
                }
            }
            h.push('">');
            return h.join('');
        },
        textInt: function (id, value, min, max) {
            // TODO validation on leave field
            // TODO textDec
            var h=['<input class="evo-field form-control" type="number" id="', id,
                '" value="', value];
            if(!_.isUndefined(min)){
                h.push('" min="', min);
            }
            if(!_.isUndefined(max)){
                h.push('" max="', max);
            }
            h.push('" maxlength="12">');
            return h.join('');
        },
        textM: function (id, value, maxLen, height) {
            return ['<textarea id="', id, '" class="evo-field form-control" rows="', height,
                //(maxLen > 0) ? ('" onKeyUp="Evol.UI.Validation.fixLength(this,' + maxLen + ')') : '',
                '">', value, '</textarea>'
            ].join('');
        },
        textMJSON: function (id, fVobj, height) {
            return ['<textarea id="', id, '" rows="',height,'" class="evol-json evo-field form-control">',
                _.escape(JSON.stringify(fVobj, null, '\t')),
                '</textarea>'].join('');
        },
        myType: function (type, id, value) {
            return [
                '<input type="', type, '" id="', id, '" value="', value,
                '" class="evo-field form-control" size="15">'
            ].join('');
        },
        date: function (id, value) {
            return this.myType('date', id, value);
            //+'&nbsp;<a href="javascript:ShowDatePicker(\'', id, '\');" class="ico Calendar"></a></nobr>'
        },
        dateTime: function (id, value) {
            return this.myType('datetime-local', id, value);
        },
        time: function (id, value) {
            return this.myType('time', id, value);
        },
        typeFlag: function(id){
            return '<span class="input-group-addon">'+id+'</span>';
        },
        color: function (id, value) {
            return [
                '<input type="color" id="', id, '" value="', value, '" size="15">'
            ].join('');
        },
        colorBox: function (id, value) {
            return [
                '<div class="evo-color-box" id="', id,
                '" style="background-color:', value,
                '" title="', value, '"></div>'
            ].join('');
        },

        checkbox: function (id, value) {
            var fh = ['<input type="checkbox" id="', id];
            if (value) {
                fh.push('" checked="checked');
            }
            fh.push('" value="1">');
            return fh.join('');
        },
        checkbox2: function (id, value, css) {
            var fh = ['<input type="checkbox" data-id="', id, '" class="',css,'"'];
            if (value) {
                fh.push(' checked="checked"');
            }
            fh.push(' value="1">');
            return fh.join('');
        },
        checkboxLOV:function(fLOV){
            var h=[];
            for(var i in fLOV){
                var lv=fLOV[i];
                h.push('<input type="checkbox" id="',lv.id,'" value="',lv.id,'"/>',
                    '<label for="',lv.id,'">',lv.text,'</label> ');
            }
            return h.join('');
        },

        radio: function (fN, value, label, sel, id) {
            return ['<label for="', id, '"><input id="', id, '" name="', fN,
                '" type="radio" value="', value,
                (sel) ? '" checked="checked' : '',
                '">', label, '</label>&nbsp;'
            ].join('');
        },
        lov: function (id, value, label, fLOV) {
            var h = ['<select class="evo-field form-control" id="', id, '"><option value="', value, '" selected>', label, '</option>'];
            _.each(fLOV, function (f) {
                h.push(this.option(f.id, f.text));
            });
            h.push('</select>');
            return h.join('');
        },

        img: function (id, value) {
            return ['<img id="', id, '" src="', value, '"/>'].join('');
        },

        hidden: function (id, value) {
            return ['<input type="hidden" name="', id, '" id="', id, '" value="', value, '"/>'].join('');
        },/*
        hiddens: function (h, list) {
            _.each(function (){
                h.push('<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>');
            });
        },*/
        selectBegin: function (id, css, emptyOption) {
            var h=['<select id="', id, '" class="form-control ',css,'">'];
            if(emptyOption){
                h.push(Evol.UI.html.emptyOption);
            }
            return h.join('');
        },
        select:function (id, value, css, emptyOption, list) {
            return [
                this.selectBegin(id, css, emptyOption),
                this.options(list, value),
                '</select>'
            ].join('');
        },

        option: function (id, text) {
            return ['<option value="', id, '">', text, '</option>'].join('');
        },
        options: function (fields, value) {
            var fnOpt = Evol.UI.input.option,
                opts=[];
            _.each(fields,function(f){
                if(f.id===value){
                    opts.push('<option value="', f.id, '" selected="selected">', f.text, '</option>');
                }else{
                    opts.push(fnOpt(f.id, f.text));
                }
            });
            return opts.join('');
        },

        button: function (id, label, css) {
            return '<button type="button" data-id="' + id + '" class="btn' + (css ? ' ' + css : '') + '">' + label + '</button>';
        },
        buttonsPlusMinus: function(){
            return '<div data-id="bPlus" class="glyphicon glyphicon-plus-sign"></div>'+
                '<div data-id="bMinus" class="glyphicon glyphicon-minus-sign"></div>';
        }
        /*
         toggle: function  (items) {
             var h=['<div class="btn-group" data-toggle="buttons">'];
             _.each(items, function(item){
                h.push('<label class="btn btn-info"><input type="radio" name="options" id="',item.id,'">',item.text,'</label>');
             });
             h.push('</div>');
             return h.join('');
         },*/
    },

    toggleCheckbox: function($cb, v){
        if(v){
            $cb.prop('checked', 'checked');
        }else{
            //$cb.removeProp('checked');
            $cb.prop('checked', false);
        }
    },

    // --- links ---
    link: function (id, label, url, target) {
        var h=['<a class="evo-field" href="', url];
        if(id){
            h.push('" id="', id);
        }
        if(target){
            h.push('" target="',target);
        }
        h.push('">', label, '</a>');
        return h.join('');
    },
    linkEmail: function (id, email) {
        if(email){
            email = _.escape(email);
            return this.link(id, email, 'mailto:'+email);
        }else{
            return '';
        }
    },
    //html_more: function (label) {
    //    return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
    //},

    // --- icons ---
    icon: function (icon, css) {
        return ['<i class="', css? css+' ':'', Evol.UI.html.glyphicon, icon, '"></i>'].join('');
    },

    iconCustomize: function (id, type) {
        return Evol.UI.iconId(id, type, 'wrench');
    },

    iconId: function (id, type, icon) {
        return ['<i class="',Evol.UI.html.glyphicon, icon, '" data-id="', id, '" data-type="', type, '"></i>'].join('');
    },

    // --- menu ---
    menu: {
        hBegin: function (id, tag, icon){
            return ['<', tag,' class="dropdown" data-id="',id,'">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',Evol.UI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu evo-dropdown-icons">'].join('');
        },
        hEnd: function(tag){
            return '</ul></' + tag + '>';
        },
        hItem: function(id, label, icon, cardi, style){
            var h=[];
            h.push('<li data-id="',id,'"');
            if(cardi){
                h.push(' data-cardi="'+cardi,'"');
            }
            if(style!=='label'){
                h.push(' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="',label,'"');
            }
            h.push('><a href="javascript:void(0);" data-id="',id,'">',Evol.UI.icon(icon));
            if(style!=='tooltip'){
                h.push('&nbsp;',label);
            }
            h.push('</a></li>');
            return h.join('');
        }
    },

    // --- modal ---
    modal:{

        alert: function(title, msg){
            var $m=$(this.HTMLModal('alert', title, msg, Evol.i18n.bOK))
                    .on('click', 'button', function(evt){
                        $m.remove();
                    })
                    .modal('show');
        },

        confirm: function(id, title, msg, bOK, bCancel, cbOK, cbCancel){
            var $m=$(this.HTMLModal(id, title, msg, bOK, bCancel))
                    .on('click', 'button', function(evt){
                        var isOK=$(evt.currentTarget).hasClass('btn-primary');
                        if(isOK && cbOK){
                            cbOK();
                        }
                        if(!isOK && cbCancel){
                            cbCancel();
                        }
                        $m.remove();
                    })
                    .modal('show');
        },

        HTMLModal: function(id, title, msg, bOK, bCancel) {
            var h=[
                '<div class="modal fade" id="', id, '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
                '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                '<h4 class="modal-title">', title, '</h4>',
                '</div>',
                '<div class="modal-body">', msg, '</div>',
                '<div class="modal-footer">'
            ];
            if(bCancel){
                h.push(this._HTMLButton(bCancel, 'btn-default'));
            }
            if(bOK){
                h.push(this._HTMLButton(bOK, 'btn-primary'));
            }
            h.push('</div></div></div></div>');
            return h.join('');
        },

        _HTMLButton: function(label, css){
            return ['<button type="button" class="btn ', css, '" data-dismiss="modal">', label, '</button>'].join('');
        }
    },

    // --- panels ---
    HTMLPanelBegin: function (pid, label, css) {
        return [
            '<div data-pid="', pid, '" class="panel ', css, '">',
            '<div class="panel-heading">', Evol.UI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', label, '</h3></div>'
        ].join('');
    },
    HTMLPanelEnd: function () {
        return '</div>';
    },

    HTMLEmptyPanel: function(id, css, style){
        return '<div class="'+css+' panel panel-'+style+'" data-id="'+id+'"></div>';
    },

    // --- status ---
    HTMLMsg: function (title, msg, style) {
        return [
            '<div data-id="msg" class="evo-msg alert alert-',style || 'info',
            ' alert-dismissable">', this.html.buttonClose,
            '<strong>', title, '</strong> <span>',
            msg, '</span></div>'
        ].join('');
    },

    // --- date formats ---
    formatDate: function(d){
        if(!_.isUndefined(d) && d!==null){
            var dateParts=d.split('-');
            if(dateParts.length>1){
                return dateParts[1]+'/'+dateParts[2]+'/'+dateParts[0];
            }
        }
        return '';
    },
    formatTime: function(d){
        if(!_.isUndefined(d) && d!==null && d!==''){
            var timeParts=d.split(':'),
                hour=parseInt(timeParts[0],10);
            if(hour>12){
                return (hour-12)+':'+timeParts[1]+' PM';
            }else{
                return hour+':'+timeParts[1]+' AM';
            }
        }
        return '';
    },
    formatDateTime: function(d){
        if(!_.isUndefined(d) && d!==null && d!==''){
            var dateParts=d.split('T');
            if(dateParts.length>1){
                return this.formatDate(dateParts[0])+', '+this.formatTime(dateParts[1]);
            }else{
                return this.formatDate(dateParts[0]);
            }
        }
        return '';
    },

    // ---  Misc. ---
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

    capitalize: function(word){ // TODO use _.str.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }else{
            return '';
        }
    },

    trim: function(stringValue){ // TODO use _.trim(word);
        if(_.isString(stringValue) && stringValue!==''){
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
    },

    cr2br: function(v){
        return v.replace(/[\r\n]/g, '<br/>');
    }

};
;
/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return [ //class="panel ', this.options.style, '
            '<div class="evol-chart-holder panel ',style,'"><label class="evol-chart-title">',
            title,'</label><img src="',urlPix,'"><br></div>'
        ].join('');
    },

    Pie: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'390x200';
        var urlGoogleChart = [this.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=',size].join('');
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'360x200';
        var maxCount = _.max(data),
            urlGoogleChart = [this.URL,'?chbh=a&amp;chs=',size,'&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
                maxCount,
                '&amp;chd=t:',
                data.join('|'),
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl=',
                labels.join('|')
            ].join('');
        return this._HTML(label, urlGoogleChart, style);
    }

};

;
//   Evolutility Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility
//   (c) 2014 Olivier Giulieri

var Evol = Evol || {};

Evol.i18n = {

	LOCALE:'EN',    // ENGLISH

    getLabel: function(label, string1, string2){
        var l;
        if(label.indexOf('.')>-1){
            var ns=label.split('.');
            l=this[ns[0]][ns[1]];
        }else{
            l=this[label];
        }
        if(string1 && l){
            l= l.replace('{0}',string1);
            if(string2){
                l= l.replace('{1}',string2);
            }
        }
        return l;
    },

    // --- toolbar & buttons ---
    View:'View',
    bEdit:'Edit',
    // Login:'Login',
    bNew:'New',
    NewEntity:'New {0}', //'New Item',
    NewUpload:'New Upload',
    //Search:'Search',
    //AdvSearch:'Advanced Search',
    //NewSearch:'New Search',
    Selections:'Selections',
    Selection:'Selection',
    bExport:'Export',
    bCharts:'Charts',
    //SearchRes:'Search Result',
    //MassUpdate:'Mass Update',
    bDelete:'Delete',
    bAll:'All',
    bFilter: 'Filter',
    //bRefresh: 'Refresh',
    //bPrint:'Print',
    bSave:'Save',
    bSaveAdd:'Save and Add Another',
    bOK:'OK',
    bCancel:'Cancel',

    // --- msg & status ---
    saved: '{0} saved.',
    unSavedChanges: 'You have unsaved changes.\nClick OK to navigate without saving your changes.',
    deleteX:'Delete {0}',// {0}=entity
    delete1:'Do you really want to delete the {0} "{1}"?', // {0}=entity {1}=leadfield value,
    deleteN: 'Delete {0} {1}?', // delete 5 tasks
    deleted1:'{0} deleted.', // {0}=entity ,

    notFound:'Item not found.',
    //this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity);
    notFoundMsg:'No {0} found.',
    notFoundMsgId:'No {0} found for ID="(1}".',

    NoChange:'No Change',
    NoX:'No {0}',
    //Back2SearchResults:'Back to search results',
    yes: 'Yes',
    no: 'No',
    none:'None',
    na:'N/A', // 'not available'
    nodata:'No data available.',
    nopix:'No picture.',
    nochart:'No charts available.',
    badchart:'Not enough information provided to draw charts.',
    range: '{0} - {1} of {2} {3}', //rangeBegin, '-', rangeEnd, ' of ', mSize, ' ', entities'
    selected: '{0} selected',
    'sgn_money': '$', // indicator for money
    'sgn_email': '@', // indicator for email

    // --- status ---
    status:{
        added:'New {0} "{1}" added.',
        updated:'{0} "{1}" updated.',
        deleted:'{0} "{1}" deleted.'
    },

    // --- validation ---
    validation:{
        incomplete: 'Incomplete information',
        invalid: 'Invalid format.',
        invalidList: '{0} values in "{1}" are invalid.',
        invalidList1: '1 value in "{1}" is invalid.',
        //intro:'You are not finished yet:',
        empty:'"{0}" must have a value.',
        email:'"{0}" must be a valid email like "abc@company.com".',
        integer:'"{0}" must only use numbers.',
        decimal:'"{0}" must be a valid decimal numbers.',
        money:'"{0}" must be a valid number.',
        date:'"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2014".',
        datetime:'"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2014 10:30 AM".',
        time:'"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
        max:'"{0}" must be smaller or equal to {1}.',
        min:'"{0}" must be greater or equal to {1}.',
        maxlength:'"{0}" must be {1} characters long maximum.',
        minlength:'"{0}" must be at least {1} characters long.',
        minmaxlength:'"{0}" must be between {1} and {2} characters long.',
        regex:'"{0}" is not of the expected format.'
        //regex:'"{0}" must match the regular expression pattern for "{1}".'
    },

    // --- errors ---
    error:'Error',

    // --- charts ---
    charts:{
        aByB:'{0} by {1}',
        aB:'{0}: {1}'
    },

    // --- export ---
    export:{
        ExportEntity: 'Export {0}', // {0}=entity
        ExportEntities: 'Export {0}', // {0}=entities
        preview:'Export preview',
        header: 'Header',
        options: 'options',
        separator: 'Separator',
        firstLine:'First line for field names',
        format: 'Export format',
        xpFields: 'Fields to include in the export',
        IDkey: 'ID',
        allFields: 'Show all fields',
        formatCSV: 'Comma separated (CSV, TXT, XLS...)',
        formatHTML: 'HTML',
        formatSQL: 'SQL Insert Statements (SQL)',
        formatTAB: 'Tab separated values (TXT)',
        formatXML: 'XML',
        formatJSON: 'Javascript Object Notation (JSON)',
        //xpColors:'Header color-Color odd rows-Color even rows',
        //xpColMap:'Columns map to',
        XMLroot:'Element name', // 'Root element name'
        //xpXMLAttr:'Attributes',
        //xpXMLElem:'Elements',
        SQL:'SQL Options',
        SQLTable:'Table name',
        SQLTrans:'In transaction',
        SQLIdInsert:'Identity insert',
        DownloadEntity:'Download {0}'
    },

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
    },

    // --- wizard ---
    prev:'Previous',
    next:'Next',
    finish:'Finish !'/*,

    // --- documentation ---
    doc:{
        entity:'Entity',
        fields:'Fields',
        uiModel: 'UI Model'
    }*/

};
;
/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View many
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany = Backbone.View.extend({

    viewType:'many',
    editable: false,
    cardinality: 'n',

    options: {
        style: 'panel-info',
        pageSize: 20,
        pageIndex:0,
        autoUpdate: false,
        // router: ...
        //titleSelector: '#title',
        selectable: false,
        links: true,
        //noDataString: 'No data to display',
        iconsPath: 'pix/'
    },

    events: {
        'click .evol-sort-icons>i': 'click_sort',
        'click .pagination>li': 'click_pagination',
        //'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    initialize: function (opts) {
        var lastSort = localStorage.getItem(opts.uiModel.id+'-sort'),
            that=this;

        _.extend(this.options, opts);
        this.uiModel=this.options.uiModel;
        this.pageIndex=this.options.pageIndex;
        this.mode=this.options.mode || '';
        this._filter=[];
        if(this.options.autoUpdate){
            if(this.collection){
                this.collection.on('change', function(){
                    that.render();
                });
            }
        }
        if(!this.options.router){
            this.$el.on('click', '.evol-nav-id', function(evt){
                that.click_navigate(evt);
            });
        }else{
            this.router=this.options.router;
        }
        //this._custOn=false;
        if(lastSort!==null){
            var ls=lastSort.split('-'),
                f=this.getField(ls[0]);
            if(ls.length>1 && !_.isUndefined(f)){
                this.sortList(f, ls[1]==='down', true, true);
            }
        }
    },

    render:function(){
        var models=this.collection.models;
        if(this.collection.length){
            models=Evol.Dico.filterModels(models, this._filter);
            this._render(models);
        }else{
            this.$el.html(Evol.UI.HTMLMsg(this.options.noDataString || Evol.i18n.nodata, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLbody: function (h, fields, pSize, icon, pageIdx, selectable) {
        var models = this.collection.models,
            model,
            r,
            rMin = 0,
            rMax = _.min([models.length, rMin+pSize]),
            ico = icon?(this.options.iconsPath || '')+icon:null,
            route=this.getItemRoute();

        if(pageIdx > 0){
            rMin = pageIdx*pSize;
            rMax = _.min([models.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                model=models[r];
                this.HTMLItem(h, fields, model, ico, selectable, route);
            }
        }
    },

    _render:function(models){
        alert('_render must be overwritten');
    },

    _HTMLField: function(f, v){
        var fv=Evol.Dico.HTMLField4Many(f, v, Evol.hashLov, this.options.iconsPath || '');
        if(f.type==='list'){
            return _.escape(fv);
        }
        return fv;
    },

    _HTMLCheckbox: function(cid){
        return Evol.UI.input.checkbox2(cid, false, 'list-sel');
    },
/*
    customize: function () {
        var labels = this.$('th>span');
        if(this._custOn){
            labels.find('i').remove();
        }else{
            labels.append(Evol.UI.iconCustomize('id', 'field'));
        }
        this._custOn=!this._custOn;
        return this;
    },*/

    setCollection: function(collection){
        this.collection = collection;
        return this;//.render();
    },

    getCollection: function(){
        return this.collection;
    },

    setFilter: function(filter){
        this._filter=filter;
        return this;
    },

    getFilter: function(){
        return this._filter;
    },

    setTitle: function (){
        $(this.options.titleSelector).html(this.getTitle());
        return this;
    },

    getTitle: function (){
        return Evol.UI.capitalize(this.uiModel.entities)+' '+this.viewName;
    },

    getFields: function (){
        if(!this._fields){
            this._fields=Evol.Dico.getFields(this.uiModel, function(f){
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
        if(!this._fieldHash){
            this.getFields();
        }
        return this._fieldHash[fid];
    },

    setPage: function(pageIdx){
        var h = [],
            fields = this.getFields(),
            opts = this.options,
            pSize = opts.pageSize,
            collecLength = this.collection.length,
            pSummary = this.pageSummary(pageIdx, pSize, collecLength);

        this._HTMLbody(h, fields, pSize, this.uiModel.icon, pageIdx, opts.selectable);
        this._$body().html(h.join(''));
        h=[];
        this._HTMLpaginationBody(h, pageIdx, pSize, collecLength);
        this.$('.evo-pagination').html(h.join(''));
        this.$('.evo-many-summary').html(pSummary);
        this.pageIndex = pageIdx;
        this.$el.trigger('status', pSummary);
        return this;
    },

    getPage: function(){
        return this.pageIndex;
    },

    _$Selection:function(){
        return this.$('.list-sel:checked').not('[data-id="cbxAll"]');
    },

    getSelection:function(){
        if(this.options.selectable){
            return _.map(this._$Selection().toArray(), function(cbx){
                return $(cbx).data('id');
            });
        }
        return [];
    },

    pageSummary: function (pIdx, pSize, cSize) {
        if (cSize === 0) {
            return '';
        } else if (cSize === 1) {
            return cSize + ' ' + this.uiModel.entity;
        } else if(pSize>=cSize){
            return cSize + ' ' + this.uiModel.entities;
        } else {
            var rangeBegin = (pIdx || 0) * pSize + 1, rangeEnd;
            if (pIdx < 1) {
                rangeEnd = _.min([pSize, cSize]);
            } else {
                rangeEnd = _.min([rangeBegin + pSize -1, cSize]);
            }
            return Evol.i18n.range
                .replace('{0}', rangeBegin)
                .replace('{1}', rangeEnd)
                .replace('{2}', cSize)
                .replace('{3}', this.uiModel.entities);
        }
    },

    _HTMLpagination: function (h, pIdx, pSize, cSize) {
        if(cSize > pSize){
            h.push('<ul class="evo-pagination pagination pagination-sm">');
            this._HTMLpaginationBody(h, pIdx, pSize, cSize);
            h.push('</ul>');
        }
    },

    _HTMLpaginationBody: function (h, pIdx, pSize, cSize){
        if(cSize > pSize){
            var nbPages = Math.ceil(cSize / pSize),
                pId = pIdx + 1,
                iMin,
                iMax;

            if(nbPages<6){
                iMin = 1;
                iMax = nbPages;
            }else {
                iMin = pIdx + 1;
                iMax = iMin + 5;
            }
            h.push('<li data-id="prev"',
                (pId===1)?' class="disabled"':'',
                '><a href="javascript:void(0)">&laquo;</a></li>');
            for (var i=iMin; i<iMax+1; i++) {
                h.push('<li',
                    (pId===i)?' class="active"':'',
                    ' data-id="', i, '"><a href="javascript:void(0)">', i, '</a></li>');
            }
            h.push('<li data-id="next"',
                (cSize > pId * pSize)?'':' class="disabled"',
                '><a href="javascript:void(0)">&raquo;</a></li>');
        }
    },

    sortList: function(f, down, noRemember, noTrigger){
        var collec = this.collection,
            ft = Evol.Dico.fieldTypes;
        if(!_.isUndefined(collec)){
            if(f.type==ft.text || f.type==ft.textml || f.type==ft.email){
                collec.comparator = Evol.Dico.bbComparatorText(f.id);
            }else if(f.value){
                collec.comparator = f.value;
            }else{
                collec.comparator = Evol.Dico.bbComparator(f.id);
            }
            collec.sort();
            if(down){
                collec.models.reverse();
            }
            this.setPage(0);
            var direction = down?'down':'up';
            if(!noRemember){
                localStorage.setItem(this.uiModel.id+'-sort', f.id+'-'+direction);
            }
            if(!noTrigger){
                this.$el.trigger('list.sort', {id: f.id, direction:direction});
            }
        }
    },

    getItemRoute: function(){
        var router = this.router,
            route = null;

        if(router){
            route = '#' + this.uiModel.id + '/view/';
        }
        return route;
    },

    click_navigate: function (evt) {
        var id=$(evt.currentTarget).closest('[data-mid]').data('mid');
        evt.type = 'list.navigate';
        this.$el.trigger(evt, {id: id});
    },

    click_sort: function (evt) {
        var target=$(evt.currentTarget),
            fid=target.parent().data('fid'),
            f=this.getField(fid),
            down=target.attr('class').indexOf('-down')>0;
        this.sortList(f, down);
        target.addClass('evol-last-sort');
    },

    click_pagination: function (evt) {
        this.$el.trigger('list.paginate', {id: $(evt.currentTarget).closest('li').data('id')});
    },
/*
    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        Evol.Dico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    },
*/
    click_selection: function (evt) {
        //if($(evt.currentTarget).data('id')!=='cbxAll'){
            this.$el.trigger('selection');
        //}
    },

    click_checkall: function (evt) {
        var isChecked=this.$('[data-id="cbxAll"]').prop('checked');
        //this.$('.list-sel:checked').not('[data-id="cbxAll"]');
        this.$('.list-sel').prop('checked', isChecked);
        this.$el.trigger('selection');
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: many-badges.js
 *
 * View many badges
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Badges = Evol.ViewMany.extend({

    viewName: 'badges',

    _render: function (models) {
        var h = [],
            opts = this.options,
            pSize = opts.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        h.push('<div class="evol-many-badges"><div class="evol-badges-body">');
        this._HTMLbody(h, this.getFields(), pSize, this.uiModel.icon, 0, opts.selectable);
        h.push('</div>', Evol.UI.html.clearer);
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', pSummary, '</div>');
        h.push('</div>');
        this.$el.html(h.join(''));
        return this;
    },

    _$body: function(){
        return this.$('.evol-badges-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            opts = this.options,
            link = (opts.links!==false);

        h.push('<div class="panel ',this.options.style,'">');
        _.each(fields, function(f, idx){
            if(f.value){
                v = f.value(model);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="', model.id, '"><h4>',
                    selectable?that._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link, route?route+model.id:null),
                    '</h4></div>');
            }else{
                h.push('<div><label>', f.labelbadges?f.labelbadges:f.label,':</label> ', v, '</div>');
            }
        });
        h.push('</div>');
    }/*,

    customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    }*/

});

;
/*! ***************************************************************************
 *
 * evolutility :: many-charts.js
 *
 * View many charts
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

// Quick and easy implementation w/ the old version of google charts
// must be re-written to use D3.js or other cool stuff
Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'charts',

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        autoUpdate: false
    },

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.options.style, this.options.sizes);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this.$el.html(h.join(''));
        return this.setTitle();
    },

    _HTMLcharts: function (h, style, sizes) {
        var EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            i18n = Evol.i18n,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.options.uiModel,
            models = this.collection.models,
            iconsPath = this.options.iconsPath || '',
            chartFields = EvoDico.getFields(uiModel, function(f){
                return f.viewcharts || f.type==fTypes.lov || f.type==fTypes.bool || f.type==fTypes.int;
            });

        if(chartFields && chartFields.length){
            _.each(chartFields, function(f){
                var groups = _.countBy(models, function(m) {
                    return m.get(f.id);
                });
                var groupData = groups,
                    data=[],
                    lb,
                    labels=[];
                for(var dataSetName in groupData) {
                    var nb=groupData[dataSetName];
                    if(_.isUndefined(dataSetName)){
                        lb = i18n.na;
                    }else if(dataSetName==='' || dataSetName==='null'){
                        lb = i18n.none;
                    }else if(f.type===fTypes.lov || f.type===fTypes.list){
                        if(f.list && f.list.length && f.list[0].icon){
                            lb = EvoDico.lovTextNoPix(f, dataSetName);
                        }else{
                            lb = EvoDico.lovText(f, dataSetName, Evol.hashLov, iconsPath);
                        }
                    }else if(f.type===fTypes.bool){
                        lb = (dataSetName==='true')?i18n.yes:i18n.no;
                    }else{
                        lb = dataSetName;
                    }
                    data.push(nb);
                    labels.push(lb+' ('+nb+')');
                }
                var entityName=EvoUI.capitalize(uiModel.entities);
                if(f.type===fTypes.lov){
                    h.push(EvoUI.Charts.Pie(i18n.getLabel('charts.aByB', entityName, f.labelcharts || f.label), data, labels, style, sizes));
                }else{
                    h.push(EvoUI.Charts.Bars(i18n.getLabel('charts.aB', entityName, f.labelcharts || f.label), data, labels, style, sizes));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(i18n.nochart, i18n.badchart));
        }
        h.push(EvoUI.html.clearer);
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View many list
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',

    _render: function (models) {
        var h = [],
            that = this,
            opts = this.options,
            selectable = opts.selectable,
            fields = this.getFields(),
            pSize = opts.pageSize || 50,
            link = (this.options.links!==false),
            hover;

        h.push('<div class="evol-many-list">',
            '<table class="table table-bordered', link?' table-hover':'', '"><thead><tr>');
        if(selectable){
            h.push('<th class="list-td-sel">', this._HTMLCheckbox('cbxAll'), '</th>');
        }
        _.each(fields, function(field){
            that._HTMLlistHeader(h, field);
        });
        h.push('</tr></thead><tbody>');
        this._HTMLbody(h, fields, pSize, this.uiModel.icon, 0, selectable);
        h.push('</tbody></table>');
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', this.pageSummary(opts.pageIndex, pSize, models.length), '</div>');
        h.push('</div>');
        this.$el.html(h.join(''));
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            opts = this.options,
            link = (opts.links!==false);
        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">', this._HTMLCheckbox(model.id), '</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===Evol.Dico.fieldTypes.color){
                v = Evol.UI.input.colorBox(f.id, model.escape(f.attribute || f.id));
            }else if(f.value){
                v = f.value(model);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if(idx===0){
                v = Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link, route?route+model.id:null);
            }
            h.push('<td>', v, '</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.labelmany || field.label,
            '<span class="evol-sort-icons" data-fid="', field.id, '">',
            Evol.UI.icon('chevron-up'),//'sort-by-alphabet'
            Evol.UI.icon('chevron-down'),//'sort-by-alphabet-alt'
            '</span></span></th>');
    }

});

;
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
        this._subCollecs=false;
        this._subCollecsOK=false;
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
            _.each(this._fields,function(f){
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
                prefix='#'+ this.prefix + '-',
                subCollecs=this.getSubCollecs(),
                iconsPath=this.options.iconsPath||'',
                newPix;

            _.each(this.getFields(), function (f) {
                $f=that.$(prefix + f.id);
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
        var that=this,
            ft =Evol.Dico.fieldTypes,
            $f,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs(),
            defaultVal;

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f = that.$(prefix + f.id);
            defaultVal = f.defaultvalue || '';
            switch(f.type) {
                case ft.bool:
                    $f.prop('checked', defaultVal?'checked':false);
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

    clearCache: function(){
        this._fieldHash=null;
        this._fields=null;
        this._subCollecsOK=false;
        this._subCollecs=null;
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
            '<table class="table" data-mid="', (p.attribute || p.id),'"><thead><tr>'); // table-striped
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
        errMsgs = this._checkFields(this.$el, fs, data);
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

    _checkFields: function (holder, fds, values) {
        var that = this,
            msgs = [],
            msg1;

        function flagField(fd, msg) {
            if(_.isArray(msgs)){
                msgs.push(msg);
            }
            var p=that.$field(fd).parent();//holder.find()
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

            // Check required/empty
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
                        if (f.max && parseFloat(v) > f.max) {
                            return formatMsg(f.label, i18nVal.max, f.max);
                        }
                        if (f.min && parseFloat(v) < f.min) {
                            return formatMsg(f.label, i18nVal.min, f.min);
                        }
                    }
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
    showHelp: function(id, type, $el, forceOn){ // isField to be used by shift-click on help icon
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
        var id='none';
        evt.stopImmediatePropagation();
        // --- show/hide ALL help tips
        if(evt.shiftKey){
            var that=this,
                prefix='#'+this.prefix+'-',
                mustAdd=!this._allHelp;

            if(mustAdd){
                this.$('.evol-fld>.help-block').remove();
                this._allHelp=true;
                id='all';
            }
            _.each(this.getFields(), function(f){
                if(f.help){
                    var $f=this.$(prefix+ f.id);
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

;
/*! ***************************************************************************
 *
 * evolutility :: one-edit.js
 *
 * View one edit
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Edit = Evol.ViewOne.extend({

    viewName: 'edit',
    prefix: 'oe',

    postRender:function(){
        var pref = '#' + this.prefix + '-',
            fs= _.filter(this.getFields(), function(f){
                return f.type === 'list' && !f.readonly;
            });
        _.each(fs, function(f){
            this.$(pref + f.id).select2(
                {
                    data: f.list,
                    multiple:true
                }
            );
        });
    }
});
;
/*! ***************************************************************************
 *
 * evolutility :: one-json.js
 *
 * View one json
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.JSON = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button'
    },

    viewName: 'json',

    render: function () {
        var h = [];
        if(this.model){
            var jsonStr=JSON.stringify(this.model, null, 2);
            h.push(Evol.UI.input.textMJSON('', jsonStr, 10));
            this._renderButtons(h, 'json');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        //this._renderButtons(h, 'json');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    },

    validate: function () {
        var isValid=true,
            data=this.getData(),
            $fp=this._getDOMField().parent();

        //this.clearMessages();
        if(data===null){
            isValid=false;
            $fp.addClass('has-error');
        }else{
            $fp.removeClass('has-error');
        }
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid?[]:[Evol.i18n.validation.invalid];
    },

    getData: function () {
        var jsonStr=this._getDOMField().val(),
            obj;

        try{
            obj=$.parseJSON(jsonStr);
        }catch(err){
            obj=null;
        }
        return obj;
    },

    setData: function (m) {
        this.clearError()._getDOMField().val(JSON.stringify(m, null, 2));
        return this.setTitle();
    },

    clear: function () {
        this._getDOMField().val('');
        return this;
    },

    clearError: function(){
        this._getDOMField().parent().removeClass('has-error');
        return this;
    },

    _getDOMField: function(){
        return this.$el.children('textarea');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-mini.js
 *
 * View one mini
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Mini = Evol.ViewOne.Edit.extend({

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

    _render: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            miniUIModel= {
                type: 'panel', class:'evol-mini-holder', label: Evol.UI.capitalize(opts.uiModel.entity), width: 100,
                elements: this.getFields()
            };
        this.renderPanel(h, miniUIModel, 'evol-one-mini', mode);
        this._renderButtons(h, mode);
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-view.js
 *
 * View one view (readonly)
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.View = Evol.ViewOne.extend({

    viewName: 'view',
    editable: false,
    prefix: 'ovw',

    getData: function () {
        // TODO make JSON obj w/ model limited to fields in uimodel?
        return {};
    },

    setData: function (model) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                fTypes = Evol.Dico.fieldTypes,
                $f, fv,
                prefix='#'+ that.prefix + '-',
                subCollecs=this.getSubCollecs(),
                iconsPath=this.options.iconsPath||'';
            _.each(this.getFields(), function (f) {
                $f=that.$(prefix + f.id);
                if(f.value){
                    fv=f.value(model);
                }else{
                    fv=model.get(f.attribute || f.id);
                }
                if(model){
                    switch(f.type){
                        case fTypes.lov:
                        case fTypes.bool:
                        case fTypes.email:
                        case fTypes.url:
                        case fTypes.html:
                            $f.html(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov, iconsPath));
                            break;
                        case fTypes.pix:
                            $f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        case fTypes.textml:
                            if(fv){
                                $f.html(_.escape(fv).replace(/[\r\n]/g, '</br>'));
                            }else{
                                $f.html('');
                            }
                            break;
                        default:
                            $f.text(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov, iconsPath) || ' ');
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, 'view');
                    that.$('[data-pid="'+sc.id+'"] tbody')
                        .html(h.join(''));
                });
            }
        }
        return this.setTitle();
    },

    clear: function () {
        var that=this,
            $f,
            fTypes = Evol.Dico.fieldTypes,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case fTypes.bool:
                    $f.prop('checked', f.defaultvalue?'checked':false);
                    break;
                case fTypes.pix:
                    // TODO

                    break;
                default:
                    $f.html(f.defaultvalue || '');
            }
        });
        if(subCollecs){
            _.each(subCollecs, function (sc) {
                that.$('[data-pid="'+sc.id+'"] tbody')
                    .html(that._TRnodata(sc.elements.length, 'view'));
            });
        }
        return this;
    },

    _renderButtons: function (h) {
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.bCancel, 'btn-default'),
            Evol.UI.input.button('edit', Evol.i18n.bEdit, 'btn-primary'),
            '</div>');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: action-export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var i18nXpt = Evol.i18n.export;

Evol.ViewAction.Export = Backbone.View.extend({

    viewName: 'export',
    cardinality: 'n',

    events: {
        "change .evol-xpt-format": "click_format",
        'change input': 'click_preview',
        'click .evol-xpt-more': 'click_toggle_sel',
        'click button': 'click_button'
    },

    options: {
        model: null,
        uiModel: null,
        many: true,
        sampleMaxSize: 20,
        formats: ['CSV', 'TAB', 'HTML', 'XML', 'SQL', 'JSON']
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.uiModel = this.options.uiModel;
        return this;
    },

    render: function(){
        this.$el.html(this._renderHTML());
        this._preview('CSV');
        return this;
    },

    _renderHTML: function () {
        var h = [],
            EvoUI = Evol.UI,
            fields = this.getFields(),
            iMax = fields.length,
            useMore = iMax > 14;

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds">',
            '<div><label>', i18nXpt.xpFields, '</label></div>',
             '<fieldset>'
        );

        //### list of columns to export #########################################
        //'<div><label class="checkbox"><input type="checkbox" value="1" id="showID" checked="checked">', i18nXpt.IDkey, '</label></div>'
        _.each(fields, function(f, idx){
            var fLabel = f.labelexport || f.label || f.labellist,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><label class="checkbox"><input type="checkbox" value="1" id="', fID, '" checked="checked">', fLabel, '</label></div>');
            if (idx == 10 && useMore){
                h.push(EvoExport.html_more2(i18nXpt.allFields));
            }
        });
        if (useMore){
            h.push('</div>');
        }

        h.push('</fieldset></div><div class="evol-xpt-para">');
        //##### export formats ########################################
        var fId = 'evol-xpt-format',
            formatsList = [];
        h.push('<label for="', fId, '">', i18nXpt.format, '</label>');
        _.each(this.options.formats, function(format){
            formatsList.push({id: format, text: i18nXpt['format'+format]});
        });
        h.push(EvoUI.input.select(fId, '', 'evol-xpt-format', false, formatsList));
        fId = 'xptFLH';
        h.push('<div class="evol-xpt-opts">',
            //# field (shared b/w formats - header #######
            '<div class="evol-FLH clearfix">',
            '<label>', EvoUI.input.checkbox(fId, true), i18nXpt.firstLine, '</label>',
            //##### CSV, TAB - First line for field names #######
            '</div><div id="xptCSV">',
            //# field - separator
            //# - csv - any separator #######
            '<div data-id="csv2" class="evol-w120">',
            EvoUI.fieldLabel('separator', i18nXpt.separator),
            EvoUI.input.text('separator', ',', '0'),
            '</div>', // </div>
        '</div>');
        _.each(['XML','HTML','SQL','JSON'], function(f){
            h.push('<div id="xpt', f, '" style="display:none;"></div>');
        });
        h.push('</div>',
            //# Preview #######
            '<label>',i18nXpt.preview,'</label><div class="evol-xpt-preview">',
            // ## Samples
            '<textarea class="Field evol-xpt-val form-control"></textarea>',
            '</div></div></div></div>',
            // ## Download button
            '<div class="evol-buttons form-actions">',
                EvoUI.input.button('cancel', Evol.i18n.bCancel, 'btn-default'),
                EvoUI.input.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.entities), 'btn btn-primary'),
            '</div>'
        );
        return h.join('');
    },

    setModel: function(model){
        this.options.model=model;
    },

    showFormatOpts: function (xFormat) {
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
                var c = this.$('#xpt' + xFormat);
                if (c.html() === '') {
                    c.html(EvoExport['opts' + xFormat](this.uiModel.entity));
                }
                break;
        }
        var divOpts=this.$('#xpt' + xFormat).show()
            .siblings().hide();
        var $e1=divOpts.filter('.evol-FLH');
        Evol.UI.setVisible($e1, xFormat==='TAB' || xFormat==='CSV' || xFormat==='HTML');
    },

    getFields: function (){
        if(!this.fields){
            this.fields=Evol.Dico.getFields(this.uiModel);
        }
        return this.fields;
    },

    getTitle: function(){
        var keyEnd=this.options.many?'ies':'y';
        return Evol.i18n.getLabel('export.ExportEntit'+keyEnd, this.uiModel['entit'+keyEnd]);
    },

    _preview: function (format) {
        var h=[],
            $e = this.$('.evol-xpt-val'),
            fTypes = Evol.Dico.fieldTypes,
            maxItem = this.options.sampleMaxSize-1;

        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
                fldsDomHash = {},
                useHeader = this.$('#xptFLH').prop('checked');
                //showID=this.$('#showID').prop('checked');

            //if(showID){
            //    flds.unshift({id: 'id', type: 'text', label: 'Id'});
            //}
            _.each(fldsDom, function(f){
                fldsDomHash[f.id.substring(3)]='';
            });
            flds = _.filter(flds, function(f){
                if(f.id && _.has(fldsDomHash, f.id)){
                    return true;
                }
            });
            var fMax = flds.length-1;
            switch (format){
                case 'CSV':
                case 'TAB':
                case 'TXT':
                    var sep = Evol.UI.trim(this.$('#separator').val());
                    if(format=='TAB'){
                        sep='&#09;';
                    }
                    //header
                    if (useHeader) {
                        _.each(flds, function(f, idx){
                            h.push(f.label);
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    }
                    //data
                    _.every(data, function(m, idx){
                        _.each(flds, function(f, idx){
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fTypes.bool){
                                    h.push(mv);
                                //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fTypes.text || f.type==fTypes.textml) && (mv.indexOf(',')>-1)){ // || f.type==fTypes.list
                                    h.push('"', mv.replace('"', '\\"'), '"');
                                }else{
                                    h.push(mv);
                                }
                            }
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                        return idx<maxItem;
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
                    _.every(data, function(d, idx){
                        h.push('<tr>');
                        _.each(flds, function(f){
                            var mj = d.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h.push('<td>', mj, '</td>');
                            } else {
                                h.push('<td></td>');
                            }
                        });
                        h.push('</tr>\n');
                        return idx<maxItem;
                    });
                    h.push('</table>');
                    break;
                case 'JSON':
                    var propList= _.map(flds, function(f){
                        return f.id;
                    });
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    break;
                case 'SQL':
                    var optTransaction = this.$('#transaction').prop('checked'),
                        optIdInsert = this.$('#insertId').prop('checked'),
                        sqlTable = this.$('#table').val().replace(/ /g,'_'),
                        sql = ['INSERT INTO ',sqlTable,' ('];

                    if(sqlTable===''){
                        sqlTable = this.uiModel.entity.replace(/ /g,'_');
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
                        h.push('SET IDENTITY_INSERT ', sqlTable, ' ON;\n');
                    }
                    //data
                    var fValue;
                    _.every(data, function(m, idx){
                        h.push(sql);
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fTypes.int:
                                case fTypes.dec:
                                case fTypes.money:
                                    h.push(fValue?fValue:'NULL');
                                    break;
                                case fTypes.bool:
                                    h.push((typeof fValue === 'boolean')?fValue:'NULL');
                                    break;
                                case fTypes.date:
                                case fTypes.datetime:
                                case fTypes.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                                    break;
                                case fTypes.list:
                                    if(_.isUndefined(fValue) || fValue===''|| (_.isArray(fValue) && fValue.length===0)){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', Evol.Dico.HTMLField4Many(f, fValue, Evol.hashLov, '').replace(/"/g, '""'), '"');
                                    }
                                    break;
                                default:
                                    if(_.isUndefined(fValue)){
                                        h.push('""');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                            }
                            if(idx<fMax){
                                h.push(', ');
                            }
                        });
                        h.push(');\n');
                        return idx<maxItem;
                    });
                    //options
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ', sqlTable, ' OFF;\n');
                    }
                    if(optTransaction){
                        h.push('COMMIT TRANSACTION\n');
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#elementName').val() || this.uiModel.entity.replace(/ /g,'_'),
                        fv;
                    h.push('<xml>\n');
                    _.every(data, function(m, idx){
                        h.push('<', elemName, ' ');
                        _.each(flds, function(f){
                            h.push(f.id, '="');
                            if(f.type===fTypes.text || f.type===fTypes.textml){
                                fv=m.get(f.id);
                                if(!_.isUndefined(fv)){
                                    h.push(fv.replace(/"/g, '\\"'));
                                }
                            }else{
                                h.push(m.get(f.id));
                            }
                            h.push('" ');
                        });
                        h.push('></', elemName, '>\n');
                        return idx<maxItem;
                    });
                    h.push('</xml>');
                    break;
            }
        }else{
            h.push(Evol.i18n.nodata);
        }
        if(this.options.many && format==='JSON'){
            $e.html('['+h.join(',\n')+']');
        }else{
            $e.html(h.join(''));
        }
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            var format = this.$('#evol-xpt-format').val(),
                v = {
                    format: format,
                    fields: this._valFields(),
                    options: {}
                },
                fvs=this.$('#xpt'+format+' input');

            for(var i=0,iMax=fvs.length;i<iMax;i++){
                var $f=fvs.eq(i),
                    fv;
                if($f.attr('type')=='checkbox'){
                    fv = $f.prop('checked');
                }else{
                    fv = $f.val();
                }
                v.options[$f.attr('id')] = fv;
            }
            if(v.format==='CSV' || v.format==='TAB' || v.format==='HTML'){
                v.options.firstLineHeader = this.$('#xptFLH').prop('checked');
                if(v.format==='TAB'){
                    delete v.options.separator;
                }
            }else if(v.format==='HTML'){
                delete v.options;
            }
            return v;
        } else {
            // TODO implement setvalue?
            //this._setValue(value);
            return this;
        }
    },

    _valFields: function () {
        var v = [],
            flds = this.$('.evol-xpt-flds input:checked');//.not('#showID')
        _.each(flds, function(fe){
            v.push(fe.id.substr(3)); // remove prefix "xpt"
        });
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();
        if (format === 'XML') {
            this.$('#XML').html(EvoExport.optsXML(this.uiModel.entity))
                .show()
                .siblings().not('.evol-FLH').hide();
        }
        this.showFormatOpts(format);
        this._preview(format);
        this.$el.trigger('change.export', 'format', format);
    },

    click_preview: function (evt) {
        var format = this.$('.evol-xpt-format').val();
        this._preview(format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget).hide()
            .next().slideDown();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        this.$el.trigger('action', bId);
    }
});


var EvoExport = {

    optEntityName: function(id,label,entity){
        return [
            Evol.UI.fieldLabel(id, label),
            Evol.UI.input.text(id, entity.replace(' ', '_'), 30),'<br/>'
        ].join('');
    },

    optsXML: function(entity){
        return [
            this.html_more2(i18nXpt.options),
            this.optEntityName('elementName', i18nXpt.XMLroot, entity),
            '</div>'
        ].join('');
    },

    optsSQL: function(entity){
        return [
            this.html_more2(i18nXpt.options),
            this.optEntityName('table', i18nXpt.SQLTable, entity),
            '<div>', Evol.UI.input.checkbox('insertId', '0'), Evol.UI.fieldLabelSpan('insertId', i18nXpt.SQLIdInsert), '</div>',
            '<div>', Evol.UI.input.checkbox('transaction', '0'), Evol.UI.fieldLabelSpan('transaction', i18nXpt.SQLTrans), '</div>',
            '</div>'
           ].join('');
    },

    optsHTML: function(){
        return '';
    },

    optsJSON: function(){
        return '';
    },

    html_more2: function (label) {
        return '<a href="javascript:void(0)" class="evol-xpt-more">' + label + '</a><div style="display:none;">';
    }

};
;
/*! ***************************************************************************
 *
 * evolutility :: action-filter.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var evoLang=Evol.i18n.filters;

var fOps={
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

Evol.ViewAction.Filter = Backbone.View.extend({

    viewName: 'filter',

    events: {
        'click .evo-bNew': 'click_new',
        'click .evo-bAdd':'click_add',
        'click .evo-bSubmit':'click_submit',
        'click .evo-zfilters>a>button':'click_remove'
    },

    options: {
        fields: [],
        dateFormat: 'mm/dd/yyyy',
        //highlight: true,
        buttonLabels: false,
        submitButton: false,
        submitReady: false
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        // - if no fields are provided, then get them from the uiModel
        if(this.options.fields && this.options.fields.length!==0){
            this.fields = this.options.fields;
        }else if(this.options.uiModel){
            this.fields = _.map(Evol.Dico.getFields(this.options.uiModel, function(f){
                    return f.type!==Evol.Dico.fieldTypes.hidden;
                }),
                function(f){
                    if(f.type!==Evol.Dico.fieldTypes.list){
                        return f;
                    }else{
                        return _.extend({}, f, {
                            type: Evol.Dico.fieldTypes.lov,
                            trueType: Evol.Dico.fieldTypes.list
                        });
                    }
                });
        }else{
            this.fields = [];
        }
        return this;
    },

    render: function(){
        var bLabels=this.options.buttonLabels,
            that=this,
            e=this.$el,
            h=[];

        h.push('<div class="evo-zfilters"></div>',
            '<a class="evo-bNew btn btn-primary" href="javascript:void(0)">',evoLang.bNewFilter,'</a>');
        if(this.options.submitButton){
            h.push('<a class="evo-bSubmit btn btn-primary" href="javascript:void(0)">',evoLang.bSubmit,'</a>');
        }
        h.push('<div class="evo-editFilter"></div>',
            '<a class="evo-bAdd btn btn-primary" style="display:none;" href="javascript:void(0)">',evoLang.bAddFilter,'</a>',
            '<a class="evo-bDel btn btn-default" style="display:none;" href="javascript:void(0)">',evoLang.bCancel,'</a>');
        this._step=0;
        //this._renderMenu(h);
        e.html(h.join(''));
        if(this.options.submitReady){
            this._hValues=$('<span></span>').appendTo(e);
        }
        // - button submit
        if(this.options.submitButton){
            this._bSubmit=e.find('.evo-bSubmit').button({
                text: bLabels
            });
        }
        // - editor button new
        this._bNew=e.find('.evo-bNew').button({
            text: bLabels,
            icons: {secondary:'ui-icon-plusthick'}
        });
        // - editor button add
        this._bAdd=e.find('.evo-bAdd').button({
            text: bLabels,
            icons: {secondary:'ui-icon-check'}
        });
        // - editor button cancel
        this._bDel=e.find('.evo-bDel').button({
            text: bLabels,
            icons: {secondary:'ui-icon-close'}
        }).on('click', function(evt){
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
                    if(fType==Evol.Dico.fieldTypes.lov || fType==Evol.Dico.fieldTypes.bool){
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
                    valid=(value!=='') || type==Evol.Dico.fieldTypes.lov || type==Evol.Dico.fieldTypes.bool;
                if(type==Evol.Dico.fieldTypes.number){
                    valid=valid && !isNaN(value);
                }else if(that._operator==fOps.sBetween){
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
                var $this=$(this);
                Evol.UI.toggleCheckbox($this.siblings(), $this.prop('checked'));
            });
        this._filters=e.find('.evo-zfilters').on('click', 'a', function(){
            that._editFilter($(this));
        //}).on('click', 'a .ui-button-icon-secondary', function(evt){
        }).on('click', 'a>button', function(evt){
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
/*
    _renderMenu: function(h){
        var eui=Evol.UI.menu;

        h.push(
            eui.hBegin('file', 'div', 'cog'),
            eui.hItem('save', 'Save', '', 1),
            eui.hItem('open', 'Open', '', 1),
            eui.hEnd('div')
        );
    },*/

    _getFieldById: function(fId){
        if(!this._hash){
            this._hash={};
            for (var i=0,iMax=this.fields.length;i<iMax;i++){
                this._hash[this.fields[i].id]=this.fields[i];
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
        var f=$(['<a href="javascript:void(0)">',this._htmlFilter(filter),'</a>'].join(''))
            .prependTo(this._filters)/*
            .button({
                icons: {secondary:'ui-icon-close'}
            })*/
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
        if(filter.operator.value==fOps.sBetween){
            h.push('<span class="evo-lLight"> ', evoLang.opAnd, ' </span>',
                '<span class="evo-lBold">', filter.value.label2, '</span>');
        }
        h.push(Evol.UI.html.buttonClose);
        return h.join('');
    },

    _enableFilter: function(filter, anim){
        if(this._cFilter){
            this._cFilter.removeClass('disabled');
            /*if(anim){
                this._cFilter.effect('highlight');
            }*/
            if(filter){
                this._cFilter.data('filter', filter)//.find(':first-child')
                    .html(this._htmlFilter(filter));
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
        this._cFilter=$filter.addClass('disabled');
        this._setEditorField(fid);
        this._setEditorOperator(op);
        if(op==fOps.sBetween){
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
                var fields=this.fields,
                    h=['<select id="field" class="form-control"><option value=""></option>'];
                for (var i=0,iMax=fields.length;i<iMax;i++){
                    var f=fields[i];
                    h.push(Evol.UI.input.option(f.id,f.label || f.labellist));
                }
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
        var EvoUI=Evol.UI,
            fOption=EvoUI.input.option,
            fTypes=Evol.Dico.fieldTypes,
            fType=this._type;
        if(this._step<2){
            var h=[];
            switch (fType){
                case fTypes.lov:
                    //h.push(evoLang.sInList);
                    h.push(EvoUI.input.hidden('operator',fOps.sInList));
                    this._operator=fOps.sInList;
                    break;
                case fTypes.bool:
                    //h.push(evoLang.sEqual);
                    h.push(EvoUI.input.hidden('operator', fOps.sEqual));
                    this._operator=fOps.sEqual;
                    break;
                default:
                    h.push(EvoUI.input.selectBegin('operator', '', true));
                    switch (fType){
                        case fTypes.date:
                        case fTypes.datetime:
                        case fTypes.time:
                            if (fType==fTypes.time){
                                h.push(fOption(fOps.sEqual, evoLang.sAt),
                                    fOption(fOps.sNotEqual, evoLang.sNotAt));
                            }else{
                                h.push(fOption(fOps.sEqual, evoLang.sOn),
                                    fOption(fOps.sNotEqual, evoLang.sNotOn));
                            }
                            h.push(fOption(fOps.sGreater, evoLang.sAfter),
                                fOption(fOps.sSmaller, evoLang.sBefore),
                                fOption(fOps.sBetween, evoLang.sBetween));
                            break;
                        case fTypes.int:
                        case fTypes.dec:
                        case fTypes.money:
                            h.push(fOption(fOps.sEqual, evoLang.sNumEqual),
                                fOption(fOps.sNotEqual, evoLang.sNumNotEqual),
                                fOption(fOps.sGreater, evoLang.sGreater),
                                fOption(fOps.sSmaller, evoLang.sSmaller));
                            break;
                        default:
                            h.push(fOption(fOps.sEqual, evoLang.sEqual),
                                fOption(fOps.sNotEqual, evoLang.sNotEqual),
                                fOption(fOps.sStart, evoLang.sStart),
                                fOption(fOps.sContain, evoLang.sContain),
                                fOption(fOps.sFinish, evoLang.sFinish));
                    }
                    h.push(fOption(fOps.sIsNull, evoLang.sIsNull),
                        fOption(fOps.sIsNotNull, evoLang.sIsNotNull));
                    h.push('</select>');
            }
            this._editor.append(h.join(''));
        }
        if(cond && fType!=fTypes.lov){
            this._editor.find('#operator').val(cond);
            this._operator=cond;
        }
        this._step=2;
    },

    _setEditorValue: function( v, v2){
        var editor=this._editor,
            fTypes=Evol.Dico.fieldTypes,
            fType=this._type,
            opVal=editor.find('#operator').val(),
            opBetween=false,
            addOK=true;
        if(opVal!==''){
            if(fType!=fTypes.lov && (opVal==fOps.sIsNull || opVal==fOps.sIsNotNull)){
                editor.append(Evol.UI.input.hidden('value',''));
            }else{
                if(this._step<3){
                    var h=[];
                    opBetween=opVal==fOps.sBetween;
                    switch (fType){
                        case fTypes.lov:
                            // TODO use "section" ?
                            h.push('<section id="value">');
                            if(this._field.list.length>7){
                                h.push('(<input type="checkbox" id="checkAll" value="1"/><label for="checkAll">All</label>) ');
                            }
                            h.push(Evol.UI.input.checkboxLOV(this._field.list));
                            h.push('</section>');
                            break;
                        case fTypes.bool:
                            h.push('<span id="value">',
                                Evol.UI.input.radio('value', '1', evoLang.yes, v!='0', 'value1'),
                                Evol.UI.input.radio('value', '0', evoLang.no, v=='0', 'value0'),
                                '</span>');
                            break;
                        case fTypes.date:
                        case fTypes.datetime:
                        case fTypes.time:
                        case fTypes.int:
                        case fTypes.dec:
                        case fTypes.money:
                            var iType=(fType==fTypes.date)?'text':fType;
                            h.push('<input id="value" type="',iType,'" class="form-control"/>');
                            if(opBetween){
                                h.push('<span class="as-Txt">',evoLang.opAnd,' </span>',
                                    '<input id="value2" type="',iType,'" class="form-control"/>');
                            }
                            addOK=false;
                            break;
                        default:
                            h.push('<input id="value" type="text" class="form-control"/>');
                            addOK=false;
                    }
                    editor.append(h.join(''));
                    if(fType==fTypes.date){// TODO add datepicker widget to build and uncomment this
                        editor.find('#value,#value2').datepicker({dateFormat:this.options.dateFormat});
                    }
                }
                if(v){
                    var $value=editor.find('#value');
                    switch (fType){
                        case fTypes.lov:
                            $value.find('#'+v.split(',').join(',#')).prop('checked', 'checked');
                            break;
                        case fTypes.bool:
                            $value.find('#value'+v).prop('checked', 'checked');
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
                    addOK=(fType==fTypes.lov || fType==fTypes.bool);
                }
            }
            this._bAdd.button(addOK?'enable':'disable').show();
            this._step=3;
        }
    },

    _getEditorData: function(){
        function formattedDate(d){
            var dateFrags=vval.split('/');
            if(dateFrags.length>2){
                return dateFrags[2]+'-'+dateFrags[0]+'-'+dateFrags[1];
            }
            return d;
        }
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
            op=filter.operator,
            fv=filter.value;
        if(this._type==Evol.Dico.fieldTypes.lov){
            var vs=[], ls=[];
            v.find('input:checked').not('#checkAll').each(function(){
                vs.push(this.value);
                ls.push(this.nextSibling.innerHTML);
            });
            if(vs.length===0){
                op.label=evoLang.sIsNull;
                op.value=fOps.sIsNull;
                fv.label=fv.value='';
            }else if(vs.length==1){
                op.label=evoLang.sEqual;
                op.value=fOps.sEqual;
                fv.label='"'+ls[0]+'"';
                fv.value=vs[0];
            }else{
                op.label=evoLang.sInList;
                op.value=fOps.sInList;
                fv.label='('+ls.join(', ')+')';
                fv.value=vs.join(',');
            }
        }else if(this._type==Evol.Dico.fieldTypes.bool){
            op.label=evoLang.sEqual;
            op.value=fOps.sEqual;
            var val=(v.find('#value1').prop('checked'))?1:0;
            fv.label=(val==1)?evoLang.yes:evoLang.no;
            fv.value=val;
        }else{
            var o=e.find('#operator'),
                opVal=o.val();
            op.label=o.find('option:selected').text();
            op.value=opVal;
            if(opVal==fOps.sIsNull || opVal==fOps.sIsNotNull){
                fv.label=fv.value='';
            }else{
                var ft = Evol.Dico.fieldTypes,
                    vval = v.val();
                switch(this._type){
                    case ft.text:
                        fv.label=vval;
                        fv.value=vval.toLocaleLowerCase();
                        break;
                    case ft.int:
                    case ft.dec:
                    case ft.time:
                        fv.label=vval;
                        fv.value=vval;
                        break;
                    case ft.date:
                    case ft.datetime:
                        fv.value=formattedDate(vval);
                        fv.label=vval;
                        break;
                    default:
                        fv.label=vval;
                        fv.value=vval;
                        break;
                }
                if(opVal==fOps.sBetween){
                    vval = v.next().next().val();
                    fv.label2=vval;
                    if(this._type===ft.date || this._type===ft.datetime){
                        fv.value2=formattedDate(vval);
                        fv.label2=vval;
                    }else{
                        fv.value2=vval;
                    }
                }
            }
        }
        return filter;
    },

    _hiddenValue: function(h, filter, idx){
        var fHidden=Evol.UI.hidden;
        h.push(fHidden('fld-'+idx, filter.field.value),
            fHidden('op-'+idx, filter.operator.value),
            fHidden('val-'+idx, filter.value.value));
        var v2=filter.value.value2;
        if(v2){
            h.push(fHidden('val2-'+idx, v2));
        }
    },

    _setHiddenValues: function(){
        var vs=this.val(),
            iMax=vs.length,
            h=[Evol.UI.hidden('elem', iMax)];
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
        this.$el.trigger('filter.change');
    },

    val: function(value){
        // --- get value
        if (_.isUndefined(value)){
            var v=[];
            this._filters.find('a').each(function(){
                v.push($(this).data('filter'));
            });
            return v;
        // --- set value
        }else{
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
    /*
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
            if(v.operator==fOps.sBetween){
                url.push('&value2-',i,'=',encodeURIComponent(v.value.value2));
            }
        }
        url.push('&label=',encodeURIComponent(this.valText()));
        return url.join('');
    },*/

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
    /*
    destroy: function(){
        var e=this.$el.off();
        e.find('.evo-bNew,.evo-bAdd,.evo-bDel,.evo-zfilters').off();
        this._editor.off();
        e.clear();
        $.Widget.prototype.destroy.call(this);
    },*/

    click_new: function(evt){
        if(this._step<1){
            this._setEditorField();
            this._step=1;
        }
        this._bAdd.find('.ui-button-text').html(evoLang.bAddFilter);
    },

    click_add: function(evt){
        var data=this._getEditorData();
        if(this._cFilter){
            this._enableFilter(data, this.options.highlight);
        }else{
            this.addFilter(data);
        }
        this._removeEditor();
    },

    click_remove: function(evt){
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        $(evt.currentTarget).closest('a').remove();
        this._triggerChange();
    },

    click_submit: function(e){
        this.$el.trigger('submit.filter');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: dico.js
 *
 * Library of helpers for dictionary
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Dico = {

    // enum of supported field types
    fieldTypes: {
        text: 'text',
        textml: 'textmultiline',
        bool: 'boolean',
        int: 'integer',
        dec: 'decimal',
        money: 'money',
        date: 'date',
        time: 'time',
        datetime: 'datetime',
        pix: 'image',
        doc:'document',
        lov: 'lov',
        list: 'list', // many values for one field (behave like tags - return an array of strings)
        //html:'html',
        email: 'email',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        //widget: 'widget',
        url: 'url'
    },

    viewTypes: {
        // --- One ---
        'view': Evol.ViewOne.View,
        'edit': Evol.ViewOne.Edit,
        'mini': Evol.ViewOne.Mini,
        'json': Evol.ViewOne.JSON,
        // --- Many ---
        'list': Evol.ViewMany.List,
        'badges': Evol.ViewMany.Badges,
        'charts': Evol.ViewMany.Charts,
        // --- Action ---
        'filter': Evol.ViewAction.Filter,
        'export': Evol.ViewAction.Export
        //'uimodel': Evol.ViewAction.UI_Model,
        //'doc': Evol.ViewAction.Doc
    },

    // get all "shallow" fields (no sub collections) from a UI model
    getFields: function (uiModel, fnFilter) {
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

    getFieldTypedValue:function(f, $f){
        var ft=Evol.Dico.fieldTypes;
        switch(f.type) {
            case ft.bool:
                return $f.prop('checked');
            case ft.int:
                return parseInt($f.val(),10);
            case ft.dec:
            case ft.money:
                return parseFloat($f.val());
            case ft.list:
                return $f.select2('val');
            default:
                return $f.val();
        }
    },

    // get sub collections
    getSubCollecs: function(uiModel){
        var ls = {};

        function collectCollecs(te) {
            if(te.type==='panel-list'){
                ls[te.attribute]=te;
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls[te.attribute]=te;
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls[te.attribute]=te;
            }
        }

        collectCollecs(uiModel);

        return ls;
    },

    // get field value (not id but text) for a field of type lov
    lovText:function(f, v, hash, iconsPath){
        if(f.list && f.list.length>0 && hash){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list, function(item){
                    return item.id==v;
                });
                if(listItem){
                    var txt=listItem.text;
                    if(listItem.icon!='' && !_.isUndefined(listItem.icon)){
                        txt='<img src="'+iconsPath+listItem.icon+'"> '+txt;
                    }
                    hashLov[v]=txt;
                    return txt;
                }
            }
        }
        return '';
    },

    lovTextNoPix:function(f, v){
        var listItem=_.find(f.list, function(item){
            return item.id==v;
        });
        if(listItem){
            return listItem.text;
        }
        return '';
    },

    isTypeDateOrTime: function(fType){
        var ft=this.fieldTypes;
        return fType == ft.datetime || ft.date || fType == ft.time;
    },
/*
    showDesigner: function(id, type, $el, context){
        var $elDes=$('<div class="evodico-'+type+'"></div>'),
            model,
            uiModel=context.options.uiModel;

        //TODO set record
        context.getFields(dico_field_ui);
        switch(type){
            case 'object':
                //TODO

                break;
            case 'field':
                uiModel = dico_field_ui;
                model = context.model;
                break;
            case 'list':
            case 'tab':
            case 'panel':
            case 'panel-list':
                //TODO

                break;
        }    
        $el.closest('.evol-fld').after($elDes);

        var vw = new Evol.ViewOne.Edit({
            model: null,
            uiModel: uiModel,
            model: model,
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
        Evol.UI.HTMLModal();

        return this;
    },
*/
    filterModels: function(models, filters){
        if(filters.length){
            return models.filter(function(model){
                var want=true,
                    i;
                for(i= 0, iMax=filters.length;i<iMax && want;i++){
                    var filter=filters[i],
                        vf=filter.value.value,
                        vm=model.get(filter.field.value);
                    // TODO use field.value(m) || field.id

                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    switch(filter.operator.value){
                        case 'eq': // equals
                            want=vf==vm;
                            break;
                        case 'ne': // not equal
                            want=vf!=vm;
                            break;
                        case 'gt': // > or after
                            want=vm>vf;
                            break;
                        case 'lt': // < or before
                            want=vm<vf;
                            break;
                        case 'bw': // between
                            var vf2=filter.value.value2;
                            want = !(vf>vm || vm>vf2);
                            break;
                        case 'sw': // start w/
                            want=vm.toLocaleLowerCase().indexOf(vf)===0;
                            break;
                        case 'ct': // contain
                            want=vm.toLocaleLowerCase().indexOf(vf)>-1;
                            break;
                        case 'fw': // finish w/
                            var l1=vm.length,
                                l2=vf.length;
                            if (l1>l2){
                                want=false;
                            }else{
                                want=vm.toLocaleLowerCase().substring(l2-l1)===vf;
                            }
                            break;
                        case 'null':
                            want= vm=='' || _.isUndefined(vm);
                            break;
                        case 'nn': // not null
                            want=!(_.isUndefined(vm) || vm=='');
                            break;
                        case 'in': // in []
                            want= _.contains(vf.split(','),vm);
                            break;
                        case 1:
                            want=vm;
                            break;
                        case 0:
                            want=!vm;
                            break;
                    }
                }
                return want;
            });
        }
        return models;
    },

    HTMLField4Many: function(f, v, hashLov, iconsPath){
        var fTypes = Evol.Dico.fieldTypes;
        switch(f.type){
            case fTypes.bool:
                if (v==='true' || v=='1') {
                    return Evol.UI.icon('ok');
                }
                break;
            case fTypes.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                    //return Evol.Dico.lovText(f, iconPath+v, hashLov);
                    return Evol.Dico.lovText(f, v, hashLov, iconsPath);
                    //}
                }
                break;
            case fTypes.list:
                if(_.isString(v)){
                    v= v.split(',');
                }
                if(v && v.length){
                    var vs=[];
                    _.each(v, function(vi){
                        vs.push(Evol.Dico.lovText(f, vi, hashLov, iconsPath));
                    });
                    return vs.join(', ');
                }
                return v;
            case fTypes.date:
                return Evol.UI.formatDate(v);
            case fTypes.time:
                return Evol.UI.formatTime(v);
            case fTypes.datetime:
                return Evol.UI.formatDateTime(v);
            case fTypes.pix:
                if (v && v.length) {
                    return Evol.UI.input.img(f.id, iconsPath + v);
                }
                break;
            case fTypes.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            case fTypes.email:
                return Evol.UI.linkEmail(f.id, v);
            case fTypes.url:
                return Evol.UI.link(f.id, v, v, f.id);
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h=[],
            EvoUI=Evol.UI,
            fTypes=Evol.Dico.fieldTypes;
        // --- field label ---
        if(mode==='mini'){
            var fwidth=fld.width;
            fld.width=100;
            h.push('<div class="evol-mini-label">', this.HTMLFieldLabel(fld, mode),
                '</div><div class="evol-mini-content">');
        }else if(!skipLabel){
            h.push(this.HTMLFieldLabel(fld, mode || 'edit'));
        }
        // --- field value ---
        if(fld.readonly || mode==='view'){
            h.push('<div class="disabled evo-rdonly" id="',fid);
            if(fld.type===fTypes.textml && fld.height>1){
                h.push('" style="height:', fld.height, 'em;overflow-y: auto;');
            }
            h.push('">');
            if(fld.type==fTypes.color){
                //h.push(Evol.UI.input.colorBox(fid, fv), fv);
                h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
            }else{
                h.push(this.HTMLField4Many(fld, fv, {}, iconsPath));
            }
            h.push('&nbsp;</div>');
        }else{
            switch (fld.type) {
                case fTypes.text:
                    h.push(EvoUI.input.text(fid, fv, fld, null));
                    break;
                case fTypes.int:
                case fTypes.dec:
                    h.push(EvoUI.input.textInt(fid, fv, fld.max, fld.min));
                    break;
                case fTypes.money:
                    h.push('<div class="input-group">', EvoUI.input.typeFlag('$'),
                        EvoUI.input.textInt(fid, fv), '</div>');
                    break;
                case fTypes.bool:
                    h.push(EvoUI.input.checkbox(fid, fv));
                    break;
                case fTypes.textml:
                case fTypes.html:
                    // fv = _.escape(fv);
                    if (fld.height === null) {
                        fld.height = 5;
                    } else {
                        var fHeight = parseInt(fld.height,10);
                        if (fHeight < 1) {
                            fld.height = 5;
                        }
                    }
                    h.push(EvoUI.input.textM(fid, fv, fld.maxlength, fld.height));
                    break;
                case fTypes.date:
                    h.push(EvoUI.input.date(fid, fv));
                    break;
                case fTypes.datetime:
                    h.push(EvoUI.input.dateTime(fid, fv));
                    break;
                case fTypes.time:
                    h.push(EvoUI.input.time(fid, fv));
                    break;
                case fTypes.lov:
                    h.push(EvoUI.input.select(fid, fv, '', true, fld.list));
                    break;
                case fTypes.list: // fv is an array. will use select2
                    h.push('<div id="',fid, '" class="w-100 form-control"></div>');
                    break;
                case fTypes.email:
                    if (mode === 'view') {
                        h.push(EvoUI.linkEmail(fid, fv));
                    } else {
                        h.push('<div class="input-group">', EvoUI.input.typeFlag(Evol.i18n.sgn_email),
                            EvoUI.input.text(fid, fv, fld), '</div>');
                    }
                    break;
                case fTypes.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, encodeURI(fv), fid));
                    } else {
                        h.push(EvoUI.input.text(fid, fv, fld));
                    }
                    break;
                //case fTypes.doc:
                case fTypes.pix:
                    if(fv!==''){
                        h.push('<img src="',iconsPath+fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
                    }
                    h.push(EvoUI.input.text(fid, fv, fld, null));
                    break;
                case fTypes.color:
                    //h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    h.push(EvoUI.input.color(fid, fv));
                    break;
                case fTypes.hidden:
                    h.push(EvoUI.input.hidden(fid, fv));
                    break;
            }
        }
        if(mode==='mini'){
            h.push('</div>');
            fld.width=fwidth;
        }
        return h.join('');
    },

    HTMLFieldLabel: function (fld, mode) {
        var h=[];
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label" for="', fld.id, '">', fld.label);
        if (mode != 'view' && fld.required){
            h.push(Evol.UI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(Evol.UI.icon('question-sign', ''));
        }
        h.push('</label></div>');
        return h.join('');
    },

    HTMLFieldLink: function (id, fld, value, icon, noLink, route) {
        var h=[];
        if(!noLink){
            if(route){
                h.push('<a href="', route, '" id="', id, '" class="evol-nav-id">');
            }else{
                h.push('<a href="javascript:void(0);" id="', id, '" class="evol-nav-id">');
            }
        }
        if (icon) {
            h.push('<img class="evol-many-icon" src="', icon, '">');
        }/*
        if(_.isUndefined(value) || value===''){
            value='('+model.id+')';
        }*/
        h.push(value);
        if(!noLink){
            h.push('</a>');
        }
        return h.join('');
    },
    /*
    copyOptions:  function(context, options, optList){
        _.each(optList, function(opt){
            context[opt]=options[opt];
        });
        return this;
    },*/

    bbComparator:  function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA,modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    },

    getRoute: function(){
        var cURL=window.location.href,
            idx=cURL.indexOf('#');
        return (idx>-1)?cURL.substr(idx+1):'';
    },

    setRoute: function(router, title, entity, view, opts, trigger){
        // set route
        if(!_.isUndefined(router)){
            var route = entity + '/' + view;
            if(opts){
                route+='/' + opts;
            }
            if(route!==this.getRoute()){
                router.navigate('#' + route, {trigger: trigger});
            }
        }
        // set page title in head
        if(_.isUndefined(this._$headTitle)){
            this._$headTitle = $('#headTitle');
        }
        this._$headTitle.html(title);
    }

};
;
/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate >div': 'click_navigate',
        'list.paginate >div': 'paginate',
        'action >div': 'action_view',
        'status >div': 'status_update',
        'filter.change >div': 'change_filter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        //router:...,
        defaultView: 'list',
        style: 'panel-info',
        display: 'label', // tooltip, text, icon, none
        titleSelector: '#title',
        buttons: {
            // --- views for one ---
            view: true,
            edit: true,
            mini: true,
            //wiz: false,
            json: true,
            // --- views for many ---
            list: true,
            badges: true,
            charts: true,
            // --- actions ---
            'new': true,
            'save':true,
            del: true,
            filter: true,
            'export': true
            //group: false,
            //customize: false
        },
        pageSize:20
    },

    initialize: function (opts) {
        this.options=_.extend(this.options, opts);
        this.pageIndex = this.options.pageIndex;
        this.uiModel = this.options.uiModel;
        this.router = this.options.router;
        this.views=[];
        this.viewsHash={};
        //this.tabId=false;
        //this._group=false;
    },

	render: function() {
		this.$el.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list', false);
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
        // TODO remove test below
        //this.mId=this.uiModel.id;
        return this;
	},

    _toolbarHTML: function(){
        var h=[],
            eui=Evol.UI.menu,
            opts=this.options,
            endMenu='</ul></li>',
            menuDevider='<li class="divider" data-cardi="1"></li>',
            menuDeviderH='<li class="divider-h"></li>';

        function linkOpt2h (id, label, icon, cardi){
            if(opts.buttons && opts.buttons[id]){
                h.push(eui.hItem(id, label, icon, cardi));
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list','','th-list'); // linkOpt2h('list',Evol.i18n.bAll,'th-list');
        linkOpt2h('new','','plus'); // linkOpt2h('new',Evol.i18n.bNew,'plus');
        h.push(menuDeviderH);
        linkOpt2h('edit',Evol.i18n.bEdit,'pencil','1');
        linkOpt2h('save',Evol.i18n.bSave,'floppy-disk','1');
        linkOpt2h('del',Evol.i18n.bDelete,'trash','1');
        linkOpt2h('filter',Evol.i18n.bFilter,'filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('charts',Evol.i18n.bCharts,'stats','n');
        linkOpt2h('export',Evol.i18n.bExport,'cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">',
                '<li class="evo-tb-status" data-cardi="n"></li>',
                eui.hItem('prev','','chevron-left','x'),
                eui.hItem('next','','chevron-right','x')
            );

            h.push(eui.hBegin('views','li','eye-open'));
            linkOpt2h('view','View','file','1');
            linkOpt2h('edit','All Fields','th','1');
            linkOpt2h('mini','Mini','th-large','1'); //Important Fields only
            linkOpt2h('wiz','Wizard','arrow-right','1');
            linkOpt2h('json','JSON','barcode','1');
            h.push(menuDevider);
            linkOpt2h('list','List','th-list','x');
            linkOpt2h('badges','Badges','th-large','x');
            linkOpt2h('charts','Charts','stats','x');
            h.push(eui.hEnd('li'));
            /*
            //linkOpt2h('customize','','wrench', '1', 'Customize');
            if(opts.buttons.customize){
                h.push(beginMenu('cust','wrench'));
                link2h('customize','Customize this view','wrench');
                h.push(menuDevider);
                link2h('new-field','New Field','plus');
                link2h('new-panel','New Panel','plus');
                h.push(endMenu);
            }*/
        }
        h.push('</ul>',Evol.UI.html.clearer,'</div>');
        return h.join('');
    },

	refresh:function(){
        if(this.curView && this.curView.cardinality && this.curView.cardinality==='n'){
            this.curView.render();
        }
        return this;
	},

	setView:function(viewName, updateRoute, skipIcons){
		var opts=this.options,
            $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config,
            collec=this._curCollec();

        if(viewName==='new'){
            viewName=(this._prevViewOne && this._prevViewOne!='view' && this._prevViewOne!='json')?this._prevViewOne:'edit';
            this.setView(viewName, false, true);
            this.model=new opts.modelClass();
            this.model.collection=collec;
            vw.model=this.model;
            this.newItem();
            this.setIcons('new');
            vw.options.mode='new';
        }else{
            if($v.length){
                // -- view already exists and was rendered
                this.model=vw.model;
                if(vw.model){
                    //TODO debug
                    this.model.collection=collec;
                }
                vw=this.viewsHash[viewName];
                if(vw.setCollection){
                    vw.setCollection(collec)
                        .render();
                }
                if(this.model && !this.model.isNew()){
                    if(vw.setModel){
                        if(!vw.collection){
                            vw.collection=this.model.collection;
                        }
                        vw.setModel(this.model);
                    }else{
                        vw.model = this.model;
                    }
                    if(vw.setTitle){
                        vw.setTitle();
                    }
                    if(vw.cardinality==='n' && vw.setPage && this.pageIndex){
                        vw.setPage(this.pageIndex);
                    }
                }else if(vw.clear){
                    vw.clear();
                }
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                this.curView=vw;
                //this._keepTab(viewName);
                $v.show()
                    .siblings().not('.evo-toolbar,.evo-filters,.clearfix').hide();
            }else{
                // -- create new instance of the view
                $v=$('<div data-vid="evolw-'+viewName+'"></div>');
                $e.children().not('.evo-toolbar,.evo-filters,.clearfix').hide();
                $e.append($v);
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: collec,
                    uiModel: this.uiModel,
                    style: opts.style,
                    pageSize: opts.pageSize || 20,
                    pageIndex: this.pageIndex || 0,
                    titleSelector: opts.titleSelector,
                    router: this.router
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                switch(viewName){
                    // --- many ---
                    case 'charts':
                    case 'badges':
                    case 'list':
                        vw = new Evol.Dico.viewTypes[viewName](config)
                            .render();
                        this._prevViewMany=viewName;
                        vw.setTitle();
                        if(viewName!='charts' && this.pageIndex > 0){
                            //var pIdx=this.curView.getPage();
                            vw.setPage(this.pageIndex || 0);
                        }
                        //this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length));
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewAction.Export(config).render();
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                    // --- one --- view, edit, mini, json, wiz
                    default :
                        var vwPrev = null,
                            cData;
                        if(vw && vw.editable){
                            vwPrev = vw;
                            cData=vw.getData();
                        }
                        vw = new Evol.Dico.viewTypes[viewName](config).render();
                        this._prevViewOne=viewName;
                        //this._keepTab(viewName);
                        break;
                }
                if(_.isUndefined(vw)){
                    //TODO error tracking (in other places too)
                    alert('error: invalid route.');
                }else{
                    this.curView=vw;
                    this.viewsHash[viewName]=vw;
                    if(!skipIcons){
                        $(this.options.titleSelector).html(vw.getTitle());
                    }
                }
            }
        }
        if(this.curView.cardinality==='n'){
            this.setRoute('', false);
            if(this._filterOn){ // TODO do not always change flag
                this.showFilter(false);
            }
        }else{
            //if(this.curView.viewName==='wizard'){
            //    this.curView.stepIndex(0);
            //}
            if(updateRoute){
                /*if(!this.model){
                    alert('Error: Invalid route.');
                }*/
                this.setRoute(this.model?this.model.id:null, false);
            }
            this.hideFilter();
        }
        if(!skipIcons){
            this.setIcons(viewName);
        }
        return this;
    },

    getView:function(){
        return this.curView;
    },

    setTitle: function(){
        if(this.curView){
            if(this.curView.viewName==='export'){
                $(this.options.titleSelector)
                    .html(this.curView.getTitle());
            }else{
                this.curView.setTitle();
            }
        }
    },
    /*
    _keepTab: function(viewName){
        if(this.tabId && (viewName=='view'||viewName=='edit')){
            this.curView.setTab(this.tabId);
        }
    },*/

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('.evo-toolbar li'),
                vw=this.$('.evo-toolbar [data-id="views"]');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: this.$('.evo-toolbar [data-id="prev"],.evo-toolbar [data-id="next"]'),
                //customize: this.$('.evo-toolbar a[data-id="customize"]').parent(),
                views: vw,
                viewsIcon: this.$('.glyphicon-eye-open,.glyphicon-eye-close'),
                vws: vw.find('ul>li>a')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var setVisible=Evol.UI.setVisible;

        function oneMany(mode, showOne, showMany){
            setVisible(tbBs.ones, showOne);
            setVisible(tbBs.manys, showMany);
            tbBs.vws.removeAttr('style');
            tbBs.views.find('[data-id="'+mode+'"]>a').css('color', '#428bca');
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons();
            //setVisible(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();//.removeClass('nav-disabled');
            setVisible(tbBs.views, !(mode==='export' || mode=='new'));
            tbBs.del.hide();
            var cssOpen='glyphicon-eye-open',
                cssClose='glyphicon-eye-close';
            if(mode==='mini' || mode==='json'){
                tbBs.viewsIcon.removeClass(cssOpen).addClass(cssClose);
            }else{
                tbBs.viewsIcon.removeClass(cssClose).addClass(cssOpen);
            }
            if(mode==='badges' || mode==='list' || mode==='charts'){
                this._prevViewMany=mode;
                oneMany(mode, false, true);
                if(mode==='charts'){
                    this.setStatus('');
                }else{
                    var cSize=this.collection.length,
                        pSize=this.curView.options.pageSize;
                    if(cSize > pSize){
                        tbBs.prevNext.show();/*
                        // TODO finish disabling of paging buttons
                        if(this.curView.pageIndex===0){
                            tbBs.prevNext.eq(0).addClass('nav-disabled');
                        }else{
                            tbBs.prevNext.eq(0).removeClass('nav-disabled');
                        }
                        if(this.collection.length/this.options.pageSize){
                            tbBs.prevNext.eq(1).addClass('nav-disabled');
                        }else{
                            tbBs.prevNext.eq(1).removeClass('nav-disabled');
                        }*/
                    }
                }
            }else if((this.model && this.model.isNew()) || mode==='new' || mode==='export'){
                oneMany(mode, false, false);
                tbBs.del.hide();
                tbBs.views.hide();
                setVisible(tbBs.save, mode!=='export');
			}else{
                this._prevViewOne=mode;
                oneMany(mode, true, false);
                tbBs.prevNext.show();
                setVisible(tbBs.save, mode!=='view');
                setVisible(tbBs.edit, mode==='view');
            }
            setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='badges');
		}
	},

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(Evol.UI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
                this.$('.evo-toolbar').after($ff);
                this._filters = new Evol.ViewAction.Filter({
                    el: $ff,
                    uiModel: this.uiModel
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val())
                        .render();
                });
                this._filterOn=true;
            }else{
                return this;
            }
        }else{
            this._filters.$el.show();
        }
        return this;
    },

    _flagFilterIcon: function(fOn){
        var css = 'evo-filter-on', //'active',
            $fIco=this.$('a[data-id="filter"]');

        if(fOn){
            $fIco.addClass(css);
        }else{
            $fIco.removeClass(css);
        }
    },

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide();
            this._filterOn=false;
        }
        return this;
    },

    toggleFilter: function(){
        this._filtersOn=!this._filtersOn;
        return this._filtersOn?this.showFilter(true):this.hideFilter();
    },

    /*
    showGroup: function(){
        this._group = true;
        this.curView.showGroup();
        return this;
    },*/

    setStatus: function(msg){
        var $e=this.$('.evo-toolbar .evo-tb-status');
        $e.html(msg);
    },

	setData: function(data){
		if(this.curView){
			this.curView.setData(data);
		}
		return this;
	},

	getData: function(skipReadOnlyFields){
		if(this.curView){
			return this.curView.getData(skipReadOnlyFields);
		}
		return null;
	},

    setModelById: function(id){
        var m=this.collection.get(id);
        if(_.isUndefined(m)){
            alert('Error: Invalid model ID.');
            //TODO: do something
        }else{
            this.model=m;
            if(this.curView.cardinality!='1'){
                this.setView('view');//(this._prevViewOne || 'edit');
            }
            this.curView.setModel(m);
            // todo: decide change model for all views or model event
        }
        return m; // TODO: return "this" ???
    },

    browse: function(direction){ // direction = "prev" or "next"
        var collec=this._curCollec(),
            cModel=this.curView.model;

        if(cModel && collec && collec.length){
            var l=collec.length-1,
                idx =_.indexOf(collec.models, cModel);
            if(direction==='prev'){
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
        if(cModel){
            this.setRoute(cModel?cModel.id:null, false);
        }else{
            //Evol.UI.modal.alert(Evol.i18n.notFound, Evol.i18n.getLabel('notFoundMsg', this.uiModel.entity));
            this.setMessage(Evol.i18n.notFound, Evol.i18n.getLabel('notFoundMsg', this.uiModel.entity));
        }
        return this
            .clearMessage();
    },

    setRoute: function(id, triggerRoute){
        Evol.Dico.setRoute(this.router, this.curView.getTitle(), this.uiModel.id, this.curView.viewName, id, triggerRoute);
        return this;
    },

    saveItem: function(saveAndAdd){
        var that=this,
            vw=this.curView,
            msgs=vw.validate();

        function fnSuccess(m){
            if (saveAndAdd) {
                that.newItem();
            }else{
                m.unset(''); // TODO why is there a "" prop?
                that.model=m;
                if(that._filteredCollection){
                    that._filteredCollection.add(m);
                }
                that.setIcons('edit');
                vw.setModel(m);
            }
            vw.setTitle();
        }

        if(msgs.length===0){
            var entityName=this.uiModel.entity;
            if(_.isUndefined(this.model) || (this.model && this.model.isNew())){
                var collec=this.collection;
                if(collec){
                    collec.create(this.getData(true), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage(Evol.i18n.getLabel('saved', Evol.UI.capitalize(entityName)), Evol.i18n.getLabel('status.added', entityName, _.escape(vw.getTitle())), 'success');
                        },
                        error:function(m, err){
                            alert('error in "saveItem"');
                        }
                    });
                    this.options.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO use bootstrap modal
                }
            }else{
                // TODO fix bug w/ insert when filter applied => dup record
                this.model.set(this.getData(true));
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage(Evol.i18n.getLabel('saved', Evol.UI.capitalize(entityName)), Evol.i18n.getLabel('status.updated', Evol.UI.capitalize(entityName), _.escape(vw.getTitle())), 'success');
                    },
                    error:function(m, err){
                        alert('error in "saveItem"');
                    }
                });
            }
        }else{
            if (msgs.length > 0) {
                var msg = ['<ul><li>', msgs.join('</li><li>'), '</li></ul>'].join(''); // i18nVal.intro,
                this.setMessage(Evol.i18n.validation.incomplete, msg, 'warning');
            }
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName=='view'){
            if(this._prevViewOne!=='view' && this._prevViewOne!=='json'){
                this.setView(this._prevViewOne);
            }else{
                this.setView('edit', false, true);
            }
        }
        return this.curView.clear()
            .setTitle(Evol.i18n.getLabel('NewEntity', this.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var that=this,
            i18n=Evol.i18n,
            entityName=this.uiModel.entity,
            entityValue=this.curView.getTitle();

        if(this.curView.cardinality==='1'){
            var delModel=this.curView.model;
            if(delModel){
                Evol.UI.modal.confirm(
                    'delete',
                    i18n.getLabel('deleteX', entityName),
                    i18n.getLabel('delete1', entityName, _.escape(entityValue)), i18n.bOK, i18n.bCancel,
                    // if OK clicked
                    function(){
                        var collec=that.collection,
                            delIdx=_.indexOf(collec.models, delModel),
                            newIdx=delIdx,
                            newModel=null;

                        if(collec.length>1){
                            if(delIdx===0){
                                newIdx=1;
                            }else if(delIdx<collec.length-1){
                                newIdx=delIdx+1;
                            }else{
                                newIdx=delIdx-1;
                            }
                            newModel = collec.at(newIdx);
                        }
                        if(newModel){
                            newModel.collection = collec;
                        }
                        delModel.destroy({
                            success:function(){
                                if(newModel===null || collec.length===0){
                                    that.curView.clear();
                                }else{
                                    that.model = newModel;
                                    that.curView.setModel(newModel);
                                }
                                var eName=Evol.UI.capitalize(entityName);
                                that.setMessage(i18n.getLabel('deleted1', eName), i18n.getLabel('status.deleted', eName, entityValue), 'success');
                            },
                            error:function(m, err){
                                alert('error in "deleteItem"');
                            }
                        });
                    });
            }
        }else{
            if(that.curView.getSelection){
                var selection=that.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('deleteN', selection.length, that.uiModel.entities))) {
                        //TODO

                    }
                }
            }
        }
    },

    setMessage: function(title, content, style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            $msg.attr('class', 'evo-msg alert alert-'+style+' alert-dismissable');
            $msg.find('>strong').text(title);
            $msg.find('>span').eq(0).html(content); //TODO text ?
            $msg.show();
        }else{
            $(Evol.UI.HTMLMsg(title, ' '+content, style)).insertAfter(this.$el.children()[0]);
        }
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        return this;
    },

    showMessage: function(evt, ui){
        if(ui){
            return this.setMessage(ui.title, ui.content, ui.style);
        }else{
            return this.clearMessage();
        }
    },

    action_view: function(evt, actionId){
        switch(actionId){
            case 'cancel':
                if(this.curView.cardinality==='1' && !this.model.isNew){
                    this.setView(this._prevViewOne || 'view');
                }else{
                    this.setView(this._prevViewMany || 'list');
                }
                break;
            case 'edit':
                this.setView(actionId, true);
                break;
            case 'export':
                Evol.UI.modal.alert(
                    'This feature must be implemented server side.',
                    JSON.stringify(this.curView.val(), null, 2)
                    //Evol.UI.cr2br(JSON.stringify(this.curView.val(), null, 2))
                );
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
                break;
        }
    },

    paginate: function(bId, ui){
        if(ui){
            bId=ui.id;
        }
        var pIdx=this.pageIndex || 0;
        if(bId==='prev'){
            pIdx=(pIdx>0)?pIdx-1:0;
        }else if(bId==='next'){
            if((pIdx+1)*(this.options.pageSize)<this.curView.collection.length){
                pIdx++;
            }
        }else{
            var bIdx=parseInt(bId, 10);
            if(bIdx>0){
                pIdx=bIdx-1;
            }
        }
        this.pageIndex=pIdx;
        if(this.curView.setPage){
            this.curView.setPage(pIdx);
        }
        return this;
    },

    status_update: function(evt, ui){
        this.setStatus(ui);
    },

    _curCollec: function(){
        if (this._filteredCollection){
            return this._filteredCollection;
        }else{
            if(this.collection){
                return this.collection;
            }else{
                return this.model?this.model.collection:new this.options.collectionClass();
            }
        }
    },
/*
    _ok2go: function(){
        if(this.curView && this.curView.editable && this.curView.isDirty && this.curView.isDirty()){
            if(confirm(Evol.i18n.unSavedChanges)){
                return true;
            }
            return false;
        }
        return true;
    },*/

    click_toolbar: function(evt, ui){
        var $e=$(evt.currentTarget);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var toolId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(toolId){
            case 'save':
                this.saveItem(false);
                break;
            case 'del':
                this.deleteItem();
                break;
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    //if(this._ok2go()){
                        this.browse(toolId);
                    //}
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;/*
            case 'group':
                this.showGroup();
                break;
            case 'customize':
                this.curView.customize();
                break;
            case 'new-field':
            case 'new-panel':
                Evol.Dico.showDesigner('', toolId.substr(4), $e);
                break;*/
            default:// 'edit', 'mini', 'list', 'badges', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId, true);
                }
                break;
        }
        this.$el.trigger('toolbar.'+toolId);
    },

    click_navigate: function(evt, ui){
        evt.stopImmediatePropagation();
        this.setModelById(ui.id);
        this.setRoute(ui.id, false);
    },

    change_filter: function(evt){
        var fvs=this._filters.val(),
            collec;
        if(fvs.length){
            var models=Evol.Dico.filterModels(this.model.collection.models, fvs);
            if(this.collectionClass){
                collec=new this.collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection=collec;
            this.setStatus(collec.length+' / '+this.collection.length+' '+this.uiModel.entities);
        }else{
            collec=this.collection;
            this._filteredCollection=null;
            this.setStatus(collec.length+' '+this.uiModel.entities);
        }
        this._flagFilterIcon(fvs.length);
        this.curView.setCollection(collec)
            .render();
    }
    /*
    click_selection: function(evt, ui){
        var status=this.$('.evo-toolbar .evo-tb-status'),
            cbxs=this.$('.list-sel:checked').not('[data-id="cbxAll"]'),
            l=cbxs.length,
            tbBs=this.getToolbarButtons();
        if(l>0){
            this.setStatus(Evol.i18n.getLabel('selected', l));
            tbBs.del.show();
        }else{
            this.setStatus('');
            tbBs.del.hide();
        }
    }
*/
});

;
/*! ***************************************************************************
 *
 * evolutility :: shell.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.Shell = Backbone.View.extend({

    events: {
        //'click .evo-head-links2>li': 'click_entity'
    },

    options: {
        //uiModelsObj: {},
        elements:{
            nav: '.evo-head-links',
            nav2: '.evo-head-links2',
            content: '#evol'
        },
        useRouter: true,
        pageSize:20
    },

    initialize: function (opts) {
        this.options=_.extend({}, this.options, opts);
        this.options.uiModels = _.flatten(this.options.uiModelsObj);
        this._tbs={};
        var es = this.options.elements;
        //this.$nav = $(es.nav);
        this.$nav2 = $(es.nav2);
        //this.$content = $(es.content);
        this.setupRouter();
    },

	//render: function() {
		//this.$el.html(...
        //this.$nav2.html(this._HTMLentities(this.options.uiModels));
        //this.$content.html(...;
        //return this;
	//},

    setupRouter: function(){
        var that=this,
            EvolRouter=Backbone.Router.extend ({
                routes: {
                    '' : 'nav',
                    ':entity/:view/:id': 'nav',
                    ':entity/:view': 'nav',
                    ':entity': 'nav',
                    '*noroute': that.noRoute
                },
                nav: function(entity, view, id){
                    if(entity && that.options.uiModelsObj[entity]){
                        that.setEntity(entity, view, id);
                    }else {
                        // TODO !!!
                        //alert('Error: Invalid route.');
                    }
                }
            });

        this.router = new EvolRouter();
        Backbone.history.start();
    },

    setRoute: function(id, triggerRoute){
        var cView = this._curEntity.curView;
        if(cView){
            Evol.Dico.setRoute(this.options.router, cView.getTitle(), cView.uiModel.id, cView.viewName, id, triggerRoute);
        }else{
            alert('Error: Invalid route.');
        }
        return this;
    },

    noRoute: function(route){
        alert('Error: Invalid route "'+route+'".');
    },

    setEntity: function(eName, view, options){
        var that=this;

        view = view || 'list';

        function cb(){
            that._ents[eName].show().siblings().hide();
            var tb=that._tbs[eName];
            if(tb){
                that._curEntity = tb;
                tb.setView(view, false, false) //tb.setView(view, true, false)
                    .setTitle();
                if(options){
                    if(tb.curView.cardinality==='1'){
                        tb.setModelById(options);
                        that.setRoute(options, false);
                    }else{
                        that.setRoute('', false);
                    }
                }
            }
        }

        if(!this._ents){
            this._ents={};
        }
        if(this._ents[eName]){
            cb();
        }else{
            var $v=$('<div data-eid="'+eName+'"></div>');
            this._ents[eName]=$v;
            this.$el.children().hide();
            this.$el.append($v);
            this.createEntity($v, this.options.uiModelsObj[eName], [], view, options, cb);
        }
        if(this._curEntity!==eName){
            this.$nav2.find('>li>a').removeClass('sel')
                .filter('[data-id="'+eName+'"]').addClass('sel');
            this._curEntity=eName;
        }
        return this;
    },

    createEntity: function($v, uiModel, data, defaultView, options, cb){
        var that=this,
            lc = new Backbone.LocalStorage('evol-'+uiModel.id),
            M = Backbone.Model.extend({
                localStorage: lc
            }),
            Ms = Backbone.Collection.extend({
                model: M,
                localStorage: lc
            });

        var ms = new Ms();
        ms.fetch({
            success: function(collection){
                var m = ms.at(0),
                    config = {
                        el: $v,
                        mode: 'one',
                        model: m,
                        modelClass: M,
                        collection: ms,
                        collectionClass: Ms,
                        uiModel: uiModel,
                        pageSize: 20,
                        titleSelector: '#title'
                    };

                if(defaultView){
                    config.defaultView = defaultView;
                }
                if(that.options.useRouter){
                    config.router = that.router;
                }
                var tb = new Evol.ViewToolbar(config).render();//.setTitle();
                if(options){
                    if(tb.cardinality==='1'){
                        tb.setModelById(options);
                    }
                }
                that._tbs[uiModel.id] = tb;
                if(cb){
                    cb(tb);
                }
            },
            error: function(err){
                alert('Error: invalid route.');
            }
        });
    }/*,

    _HTMLentities: function (es) {
        var h=[];
        _.each(es, function(e){
            h.push('<li><a href="#', e.id, '/list" data-id="', e.id, '">', e.entities, '</a></li>');
        });
        return h.join('');
    }*/

});


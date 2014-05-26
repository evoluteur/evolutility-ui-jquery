/*   evolutility 0.0.4   */
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
        required: '<span class="evol-required">*</span>',
        buttonClose: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
    },

    // --- field labels ---
    label: function (fID, fLbl) {
        return ['<label for="', fID, '">', fLbl, '</label>'].join('');
    },
    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label">', this.label(fID, fLbl), '</div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label">', this.label(fID, fLbl), '</span>'].join('');
    },

    // --- input fields ---
    input: {

        text: function (fID, fV, fd, css) {
            var fCss= 'evo-field form-control ' + (css || ''),
                h = ['<input type="text" id="',fID,'" value="', fV];
            if(fV.indexOf('"')>-1){
                fV=fV.replace(/"/g,'\"');
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
                if(fCss && fCss!==''){
                    h.push('" class="', fCss);
                }
            }
            h.push('">');
            return h.join('');
        },
        textInt: function (fID, fV, min, max) {
            var h=['<input class="evo-field form-control" type="number" id="', fID,'" value="', fV];
            if(!_.isUndefined(min)){
                h.push('" min="', min);
            }
            if(!_.isUndefined(max)){
                h.push('" max="', max);
            }
            h.push('" maxlength="12">');
            return h.join('');
        },
        textM: function (fID, fV, maxLen, h) {
            return ['<textarea id="', fID, '" class="evo-field form-control" rows="', h,
                //(maxLen > 0) ? ('" onKeyUp="Evol.UI.Validation.fixLength(this,' + maxLen + ')') : '',
                '">', fV, '</textarea>'
            ].join('');
        },
        textMJSON: function (fID, fVobj, h) {
            return ['<textarea rows="',h,'" class="evol-json">', _.escape(JSON.stringify(fVobj, null, '\t')), '</textarea>'].join('');
        },
        myType: function (type, fId, fVal) {
            return [
                '<input type="', type, '" id="', fId, '" value="', fVal,
                '" class="evo-field form-control" size="15">'
            ].join('');
        },
        date: function (fID, fV) {
            return this.myType('date', fID, fV);
            //+'&nbsp;<a href="javascript:ShowDatePicker(\'', fID, '\');" class="ico Calendar"></a></nobr>'
        },
        dateTime: function (fID, fV) {
            return this.myType('datetime-local', fID, fV);
        },
        time: function (fID, fV) {
            return this.myType('time', fID, fV);
        },
        typeFlag: function(id){
            return '<span class="input-group-addon">'+id+'</span>';
        },
        color: function (fId, fVal) {
            return [
                '<input type="color" id="', fId, '" value="', fVal, '" size="15">'
            ].join('');
        },
        colorBox: function (fid, fVal) {
            return [
                '<div class="evo-color-box" id="', fid,
                '" style="background-color:', fVal,
                '" title="', fVal, '"></div>'
            ].join('');
        },
        checkbox: function (fID, fV) {
            var fh = ['<input type="checkbox" id="', fID, '"'];
            if (fV === true || fV==='1') {
                fh.push(' checked="checked"');
            }
            fh.push(' value="1">');
            return fh.join('');
        },
        checkbox2: function (fID, fV, cls) {
            var fh = ['<input type="checkbox" data-id="', fID, '" class="',cls,'"'];
            if (fV === true || fV==='1') {
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
        radio: function (fN, fV, fLbl, sel, fID) {
            return ['<label for="', fID, '"><input id="', fID, '" name="', fN, '" type="radio" value="', fV,
                (sel) ? '" checked="checked' : '',
                '">', fLbl, '</label>&nbsp;'
            ].join('');
        },
        lov: function (fID, fV, fVLabel, fLOV) {
            var h = ['<select class="evo-field form-control" id="', fID, '"><option value="', fV, '" selected>', fVLabel, '</option>'];
            _.each(fLOV, function (f) {
                h.push(this.option(f.id, f.text));
            });
            h.push('</select>');
            return h.join('');
        },
        img: function (fID, fV) {
            return ['<img id="', fID, '" src="', fV, '"/>'].join('');
        },
        hidden: function (fID, fV) {
            return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
        },/*
        hiddens: function (h, list) {
            _.each(function (){
                h.push('<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>');
            });
        },*/
        selectBegin: function (fID, css, emptyOption) {
            var h=['<select id="', fID, '" class="form-control ',css,'">'];
            if(emptyOption){
                h.push(Evol.UI.html.emptyOption);
            }
            return h.join('');
        },
        select:function (fID, fV, css, emptyOption, list) {
            return [
                this.selectBegin(fID, css, emptyOption),
                this.options(list, fV),'</select>'
            ].join('');
        },
        option: function (id, text) {
            return ['<option value="', id, '">', text, '</option>'].join('');
        },
        options: function (fields, fV) {
            var fnOpt = Evol.UI.input.option,
                opts=[];
            _.each(fields,function(f){
                if(f.id===fV){
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

    // --- links ---
    link: function (fID, label, url, target) {
        var h=['<a class="evo-field" href="', url];
        if(fID){
            h.push('" id="', fID);
        }
        if(target){
            h.push('" target="',target);
        }
        h.push('">', label, '</a>');
        return h.join('');
    },
    linkEmail: function (fID, email) {
        if(email){
            email = _.escape(email);
            return this.link(fID, email, 'mailto:'+email);
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

    // --- panels ---
    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', Evol.UI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLEmptyPanel: function(id, css, style){
        return '<div class="'+css+' panel panel-'+style+'" data-id="'+id+'"></div>';
    },

    // --- status ---
    HTMLMsg: function (title, msg, style) {
        return [
            '<div data-id="msg" class="evo-msg alert alert-',style || 'info',
            ' alert-dismissable">', this.html.buttonClose,
            '<strong>',title,'</strong><br/><div>',
            msg,'</div></div>'
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

    capitalize: function(word){ // TODO use _.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);
        }else{
            return '';
        }
    },

    trim: function(stringValue){ // TODO use _.str.trim(word);
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
        var size=sizes?sizes:'360x200';
        var urlGoogleChart = [this.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=',size].join('');
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'350x200';
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
        if(string1){
            l= l.replace('{0}',string1);
            if(string2){
                l= l.replace('{1}',string2);
            }
        }
        return l;
    },

    // --- toolbar ---
    View:'View',
    Edit:'Edit',
    // Login:'Login',
    New:'New',
    NewEntity:'New {0}', //'New Item',
    NewUpload:'New Upload',
    //Search:'Search',
    //AdvSearch:'Advanced Search',
    //NewSearch:'New Search',
    Selections:'Selections',
    Selection:'Selection',
    Export:'Export',
    SearchRes:'Search Result',
    //MassUpdate:'Mass Update',
    Delete:'Delete',
    All:'All',
    //ListAll:'List All',
    //Print:'Print',
    //pdf:'PDF',

    // --- buttons ---
    Save:'Save',
    SaveAdd:'Save and Add Another',
    Cancel:'Cancel',

    // --- msg & status ---
    saved: 'Record saved.',
    DeleteEntity:'Delete {0} "{1}"?', // {0}=entity {1}=leadfield value,
    DeleteEntities: 'Delete {0} {1}?', // delete 5 tasks
    NoChange:'No Change',
    NoX:'No {0}',
    Back2SearchResults:'Back to search results',
    yes: 'Yes',
    no: 'No',
    none:'None',
    na:'N/A', // 'not available'
    nodata:'No data available.',
    nopix:'No picture.',
    nochart:'No charts available.',
    badchart:'The data structure doesn\'t allow for auto-generated charts.',
    range: '{0} - {1} of {2} {3}', //rangeBegin, '-', rangeEnd, ' of ', mSize, ' ', entities'
    selected: '{0} selected',
    'sgn_money': '$', // indicator for money
    'sgn_email': '@', // indicator for email

    // --- status ---
    status:{
        added:'New {0} "{1}" added.',
        updated:'{0} "{1}" updated.',
        deleted:'{0} "{1}" removed.'
    },

    // --- validation ---
    validation:{
        incomplete: 'Incomplete information',
        intro:'You are not finished yet:',
        empty:'"{0}" must have a value.',
        email:'"{0}" must be a valid email like "abc@company.com".',
        integer:'"{0}" must only use numbers.',
        decimal:'"{0}" must be a valid decimal numbers.',
        date:'"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2014".',
        datetime:'"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2014 10:30 AM".',
        time:'"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
        max:'"{0}" must be smaller or equal to {1}.',
        min:'"{0}" must be greater or equal to {1}.',
        maxlength:'"{0}" must be {1} characters long maximum.',
        minlength:'"{0}" must be less than {1} characters long.',
        minmaxlength:'"{0}" must be between {1} and {2} characters long.',
        regex:'The value "{0}" is not of the expected format.'
        //regex:'"{0}" must match the regular expression pattern for "{1}".'
    },

    // --- charts ---
    charts:{
        aByB:'{0} by {1}',
        aB:'{0}: {1}'
    },

    // --- export ---
    export:{
        ExportEntity: 'Export {0}', // {0}=entity
        ExportEntities: 'Export {0}', // {0}=entities
        preview:'Export Preview',
        ExportHeader: 'Header',
        ExportSeparator: 'Separator',
        ExportFirstLine:'First line for field names',
        ExportFormat: 'Export format',
        ExportFields: 'Fields to include in the export',
        IDkey: 'ID - Primary Key',
        AllFields: 'Show all fields',
        ExportFormats: 'Comma separated (CSV, TXT, XLS...)-HTML-SQL Insert Statements (SQL)-Tab separated values (TXT)-XML-Javascript Object Notation (JSON)',
        //xpColors:'Header color-Color odd rows-Color even rows',
        //xpColMap:'Columns map to',
        xpXMLroot:'Element name', // 'Root element name'
        //xpXMLAttr:'Attributes',
        //xpXMLElem:'Elements',
        xpSQL:'SQL Options',
        xpSQLTable:'Table name',
        xpSQLTrans:'Inside transaction',
        xpSQLId:'Enable identity insert',
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
        txtm: 'textmultiline',
        bool: 'boolean',
        dec: 'decimal',
        integer: 'integer',
        date: 'date',
        time: 'time',
        datetime: 'datetime',
        pix: 'image',
        doc:'document',
        lov: 'lov',
        list: 'list', // many values for one field (behave like tags - return an array of strings
        money: 'money',
        //formula:'formula',
        //html:'html',
        email: 'email',
        //pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        //widget: 'widget',
        url: 'url'
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
            case ft.integer:
                return parseInt($f.val(),10);
            case ft.decimal:
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
                ls[te.attr]=te;
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls[te.attr]=te;
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls[te.attr]=te;
            }
        }

        collectCollecs(uiModel);

        return ls;
    },

    // get field value (not id but text) for a field of type lov
    lovText:function(f, v, hash){
        if(f.list && f.list.length>0 && hash){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list,function(item){
                    return item.id==v;
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

    lovTextNoPix:function(f, v){
        var listItem=_.find(f.list,function(item){
            return item.id==v;
        });
        if(listItem){
            return listItem.text;
        }
        return '';
    },

    isTypeDateOrTime: function(fType){
        return fType == EvoDico.fieldTypes.datetime || EvoDico.fieldTypes.date || fType==EvoDico.fieldTypes.time;
    },

    showDesigner: function(id, type, $el, context){
        var $elDes=$('<div class="evodico-'+type+'"></div>'),
            model,
            uiModel;
//TODO set record
        this.getFields (dico_field_ui, function(m){
            return m.get('id')=='';
        })
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

        return this;
    },

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

    filterModels: function(models, filters){
        if(filters.length){
            return models.filter(function(model){
                var want=true,
                    i;
                for(i= 0, iMax=filters.length;i<iMax && want;i++){
                    var filter=filters[i],
                        vf=filter.value.value,
                        vm=model.get(filter.field.value);
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

    HTMLField4Many: function(f, v, hashLov){
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
                    return Evol.Dico.lovText(f, v, hashLov);
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
                        vs.push(Evol.Dico.lovText(f, vi, hashLov));
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
                    return Evol.UI.input.img(f.id, v);
                }
                break;
            case fTypes.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, skipLabel){
        var h=[],
            size=50, // TODO fix it
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
        if(fld.readonly || mode==='view'){
            h.push('<div class="disabled evo-rdonly" id="',fid);
            if(fld.type===fTypes.txtm && fld.height>1){
                h.push('" style="height:', fld.height, 'em;');
            }
            h.push('">');
            if(fld.type==fTypes.color){
                //h.push(Evol.UI.input.colorBox(fid, fv), fv);
                h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
            }else{
                h.push(this.HTMLField4Many(fld, fv, {}));
            }
            h.push('&nbsp;</div>');
        }else{
            switch (fld.type) {
                case fTypes.text:
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
                    break;
                case fTypes.integer:
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
                case fTypes.txtm:
                case fTypes.html:
                    // fv = _.escape(fv);
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
                            EvoUI.input.text(fid, fv, fld.maxlength), '</div>');
                    }
                    break;
                case fTypes.url:
                    if (mode === 'view') {
                        h.push(EvoUI.link(fid, fv, encodeURI(fv), fid));
                    } else {
                        h.push(EvoUI.input.text(fid, fv, fld.maxlength));
                    }
                    break;
                //case fTypes.doc:
                case fTypes.pix:
                    if(fv!==''){
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
                    }
                    h.push(EvoUI.input.text(fid, fv, fld, null, size));
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

    HTMLFieldLink: function (fid, fld, value, icon, noLink) {
        var h=[];
        if(!noLink){
            h.push('<a href="#" id="', fid, '" class="evol-nav-id">');
        }
        if (icon) {
            h.push('<img class="evol-table-icon" src="pix/', icon, '">');
        }/*
        if(_.isUndefined(value) || value===''){
            value='('+model.id+')';
        }*/
        h.push(value);
        if(!noLink){
            h.push('</a>');
        }
        return h.join('');
    }

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
    cardinality: 'n',

    options: {
        style: 'panel-info',
        pageSize: 20,
        pageIndex:0,
        autoUpdate: false,
        //titleSelector: '#title',
        selectable: false,
        links: true
    },

    events: {
        'click .evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .pagination>li': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    initialize: function (opts) {
        var that=this;
        this.options=_.extend(this.options, opts);
        this.mode=this.options.mode || '';
        this._filter=[];
        if(this.options.autoUpdate){
            if(this.collection){
                this.collection.on('change', function(model){
                    that.render();
                });
            }
        }
        this._custOn=false;
    },

    render:function(){
        var models=this.collection.models;
        if(this.collection.length){
            models=Evol.Dico.filterModels(models, this._filter);
            this._render(models);
        }else{
            this.$el.html(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        return this.setTitle();
    },

    _render:function(models){
        alert('_render must be overwritten');
    },

    _HTMLCheckbox: function(cid){
        return Evol.UI.input.checkbox2(cid, false, 'list-sel');
    },

    customize: function () {
        var labels = this.$('th>span');
        if(this._custOn){
            labels.find('i').remove();
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
        }
        this._custOn=!this._custOn;
        return this;
    },

    setCollection: function(collection){
        this.collection = collection;
        this.render();
        return this;
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

    //updateModel: function () {
    //    alert('updateModel');
    //},

    setTitle: function (){
        $(this.options.titleSelector).html(this.getTitle());
        return this;
    },

    getTitle: function (){
        return Evol.UI.capitalize(this.options.uiModel.entities);
    },

    getFields: function (){
        if(!this._fields){
            this._fields=Evol.Dico.getFields(this.options.uiModel, function(f){
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

    _HTMLField: function(f, v){
        return Evol.Dico.HTMLField4Many( f, v, Evol.hashLov);
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

    pageSummary: function (pIdx, pSize, cSize, entity, entities) {
        if (cSize === 0) {
            return cSize + ' ' + entities;
        } else if (cSize === 1) {
            return cSize + ' ' + entity;
        }else{
            var rangeBegin = (pIdx || 0) * pSize + 1, rangeEnd;
            if (pIdx < 1) {
                rangeEnd = _.min([pSize, cSize]);
            } else {
                rangeEnd = _.min([rangeBegin + pSize -1, cSize]);
            }
            return Evol.i18n.range.replace('{0}',rangeBegin)
                .replace('{1}',rangeEnd)
                .replace('{2}',cSize)
                .replace('{3}',entities);
        }
    },
        /*
    _HTMLpagination: function (h, pIdx, pSize, cSize) {
        if(cSize>pSize){
            var nbPages = Math.ceil(cSize / pSize),
                pageId = pIdx + 1,
                iMin = pIdx * pSize + 1,
                iMax = ((nbPages > 5) ? 5 : nbPages);

            h.push('<ul class="evo-pagination pagination pagination-sm">');
            h.push('<li data-id="prev"',
                (pageId===1)?' class="disabled"':'',
                '><a href="#">&laquo;</a></li>');
            for (var i=iMin; i<iMax+1; i++) {
                h.push('<li',
                    (pageId===i)?' class="active"':'',
                    ' data-id="', i, '"><a href="#">', i, '</a></li>');
            }
            h.push('<li data-id="next"',
                (cSize > pageId * pSize)?'':' class="disabled"',
                '><a href="#">&raquo;</a></li>');
            h.push('</ul>');
        }
    },*/

    sortList: function(f, down){
        var collec=this.collection,
            ft=Evol.Dico.fieldTypes;
        if(!_.isUndefined(collec)){
            if(f.type==ft.text || f.type==ft.txtm || f.type==ft.email){
                collec.comparator = Evol.Dico.bbComparatorText(f.id);
            }else{
                collec.comparator = Evol.Dico.bbComparator(f.id);
            }
            collec.sort();
            if(down){
                collec.models.reverse();
            }
            if(this.setPage){
                this.setPage(0);
            }else{
                this.render();
            }
            this.$el.trigger('list.sort', {id: f.id, direction:down?'down':'up'});
        }
    },

    click_navigate: function (evt) {
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: $(evt.currentTarget).closest('[data-mid]').data('mid')});
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

        Evol.Dico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    },

    click_selection: function (evt) {
        if($(evt.currentTarget).data('id')==='cbxAll'){

        }else{
            this.$el.trigger('selection');
        }
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
    },

    _render: function (models) {
        var h = [];
        //if(models && models.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50,
                pSummary = this.pageSummary(0, pSize, models.length, uim.entity, uim.entities);
            h.push('<div class="evol-many-badges">');
            this.renderBody(h, this.getFields(), pSize, uim.icon, 0,opts.selectable);
            h.push(pSummary);
            //this._HTMLpagination(h,0, pSize, models.length);
            h.push('</div>');
        //}else{
        //    h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        //}
        this.$el.html(h.join(''));
        return this;
    },

    setPage: function(pageIdx){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 20;

        this.renderBody(h, fields, pSize, uim.icon, pageIdx, opts.selectable);
        this.$('.evol-many-badges').html(h.join(''));
        this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
    },

    renderBody: function (h, fields, pSize, icon, pageIdx, selectable) {
        var data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]);

        if(pageIdx>0){
            rMin=pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], icon, selectable);
            }
            h.push(Evol.UI.html.clearer);
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable){
        var link = (this.options.links!==false);
        h.push('<div class="panel ',this.options.style,'">');
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i],
                v = this._HTMLField(f, model.get(f.id));
            if (i === 0) {
                h.push('<div data-mid="', model.id, '"><h4>',
                    selectable?this._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link),
                    '</h4></div>');
            }else{
                h.push('<div><label>',f.label,':</label> ', v, '</div>');
            }
        }
        h.push('</div>');
    }

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

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'chart',

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
            chartFields = EvoDico.getFields(uiModel, function(f){
                return f.viewcharts || f.type==fTypes.lov || f.type==fTypes.bool || f.type==fTypes.integer;
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
                            lb = EvoDico.lovText(f, dataSetName, Evol.hashLov);
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
                    h.push(EvoUI.Charts.Pie(i18n.getLabel('charts.aByB',entityName,f.label), data, labels, style, sizes));
                }else{
                    h.push(EvoUI.Charts.Bars(i18n.getLabel('charts.aB',entityName,f.label), data, labels, style, sizes));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(i18n.nochart, i18n.badchart));
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
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',

    _render: function (models) {
        var h = [],
            opts = this.options,
            selectable = opts.selectable,
            fields = this.getFields(),
            uim = opts.uiModel,
            pSize = opts.pageSize || 50,
            link = (this.options.links!==false),
            hover;

        h.push('<div class="evol-many-list">',
            //'<div class="panel ',this.options.style,'">',
            '<table class="table table-bordered',link?' table-hover':'','"><thead><tr>');
        if(selectable){
            h.push('<th>',this._HTMLCheckbox('cbxAll'),'</th>');
        }
        for (var i=0; i<fields.length; i++) {
            this._HTMLlistHeader(h, fields[i]);
        }
        h.push('</tr></thead><tbody>');
        this._HTMLlistBody(h, fields, pSize, uim.icon, 0, selectable);
        h.push('</tbody></table>');
        // TODO uncomment & finish it
        // h.push(this.pageSummary(opts.pageIndex, pSize, models.length, uim.entity, uim.entities));
        // //this._HTMLpagination(h, 0, pSize, models.length);
        h.push('</div>');
        this.$el.html(h.join(''));
    },

    setPage: function(pageIdx){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 20;

        this._HTMLlistBody(h, fields, pSize, uim.icon, pageIdx, opts.selectable);
        this.$('.table > tbody').html(h.join(''));
        //this.options.pageIndex=pageIdx;
        this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
        return this;
    },

    _HTMLlistBody: function(h, fields, pSize, icon, pageIdx, selectable){
        var data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]);

        if(pageIdx>0){
            rMin=pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], icon, selectable);
            }
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable){
        var that=this,
            f,
            v,
            link = (this.options.links!==false);
        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">',this._HTMLCheckbox(model.id),'</td>');
        }
        _.each(fields,function(f, idx){
            if(f.type===Evol.Dico.fieldTypes.color){
                v = Evol.UI.input.colorBox(f.id, model.get(f.id));
            }else{
                v = that._HTMLField(f, model.escape(f.id));
            }
            h.push('<td>',
                (idx===0)?Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link):v,
                '</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
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

    events: {
        'click .evol-buttons>button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs>li>a': 'click_tab',
        'click label>.glyphicon-question-sign': 'click_help',
        'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
        // extra evt for $(window) resize
    },

    options: {
        button_addAnother: false,
        style: 'panel-info',
        titleSelector: '#title'
    },

    initialize: function (opts) {
        this.options=_.extend(this.options, opts);
        this.mode= opts.mode || this.options.mode || this.viewName;
        this._uTitle=(!_.isUndefined(this.options.titleSelector)) && this.options.titleSelector!=='';
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
        this.setData(this.model); // TODO remove it
        return this;
    },

    postRender: function (){
        // to overwrite...

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
/*
    modelUpdate: function (model) {
        var that=this;
        _.each(model.changed, function(value, name){
            that.setFieldValue(name, value);
        });
    },*/

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
        if((!_.isUndefined(model)) && model!==null){
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
                    if(f.readonly){
                        $f.text(fv || '');
                    }else{
                        switch(f.type) {
                            case fTypes.lov:
                                var $fc=$f.children().removeAttr('selected');
                                if(fv!==''){
                                    $fc.filter('[value='+fv+']')
                                        .attr('selected', true);
                                }
                                break;
                            case fTypes.bool:
                                $f.prop('checked', fv);
                                break;
                            case fTypes.pix:
                                var newPix=(fv)?('<img src="'+fv+'" class="img-thumbnail">'):('<p class="">'+Evol.i18n.nopix+'</p>');
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
        var ft =Evol.Dico.fieldTypes,
            fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs(),
            defaultVal;

        this.clearMessages();
        _.each(fs, function (f) {
            $f = that.$(prefix + f.id);
            defaultVal = f.defaultvalue || '';
            switch(f.type) {
                case ft.bool:
                    $f.prop('checked', defaultVal);
                    break;
                case ft.bool:
                    $f.prop('checked', defaultVal);
                    break;
                case ft.list:
                    $f.select2('val', null);
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

    getModelFieldValue: function(fid, fvDefault, mode){
        if(this.model && this.model.has(fid)){
            return (mode !== 'new') ? this.model.get(fid) : fvDefault || '';
        }
        return '';
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
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'),
            Evol.UI.input.button('save', Evol.i18n.Save, 'btn-primary'));
        if (this.model && this.model.isNew() && this.options.button_addAnother && mode!=='json') {
            h.push(Evol.UI.input.button('save-add', Evol.i18n.SaveAdd, 'btn-default'));
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

    renderPanel: function (h, p, pid, mode, visible) {
        var that = this,
            fTypes=Evol.Dico.fieldTypes;
        if(mode==='wiz'){
            var hidden= _.isUndefined(visible)?false:!visible;
            h.push('<div data-p-width="100" class="evol-pnl evo-p-wiz" style="width:100%;',hidden?'display:none;':'','">');
        }else{
            h.push('<div data-p-width="', p.width, '" class="evol-pnl');
            if(mode==='mini'){
                h.push(' w-100 ', (p.class || ''), '">');
            }else{
                h.push(' pull-left" style="width:', p.width, '%">');
            }
        }
        h.push('<div class="panel ', this.options.style, '">',
            Evol.UI.HTMLPanelLabel(p.label, pid, 'PanelLabel'),
            '<fieldset data-pid="', pid, '">');
        if(mode==='mini'){
            _.each(p.elements, function (elem) {
                if(elem.type==fTypes.hidden){
                    h.push(Evol.UI.input.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                }else{
                    h.push('<div class="pull-left evol-fld w-100">');
                    that.renderField(h, elem, mode);
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
                        that.renderField(h, elem, mode);
                        h.push("</div>");
                    }
                }
            });
        }
        h.push('</fieldset></div></div>');
        return this;
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
        return this;
    },

    _renderPanelListBody: function (h, uiPnl, fv, mode){
        var that=this,
            fs = uiPnl.elements;

        if(this.model){
            var vs = this.model.get(uiPnl.attr);
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
                                    h.push(_.escape(Evol.Dico.HTMLField4Many(f, row[f.id], Evol.hashLov)));
                                }else{
                                    h.push(Evol.Dico.HTMLField4Many(f, row[f.id], Evol.hashLov));
                                }
                            }else{
                                h.push(Evol.Dico.HTMLField4Many(f, '', Evol.hashLov));
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
        return ['<tr data-id="nodata"><td colspan="',mode==='edit'?(colspan+1):colspan,'" class="evol-pl-nodata">',
            Evol.i18n.nodata,
            mode==='edit'?'<div data-id="bPlus" class="glyphicon glyphicon-plus-sign"></div>':'',
            '</td></tr>'].join('');
    },

    _TDsFieldsEdit: function(h, fs, m){
        var fv;
        _.each(fs, function (f) {
            fv=m[f.id];
            if(_.isUndefined(fv)){
                fv='';
            }
            h.push('<td>', Evol.Dico.HTMLField4One(f, f.id, fv, 'edit-details', true), '</td>');
        });
    },

    renderField: function (h, f, mode) {
        var fid = this.fieldViewId(f.id),
            fv='';
        if(this.model && this.model.has(f.id)){
            fv = (mode !== 'new') ? this.model.get(f.id) : f.defaultvalue || '';
        }
        h.push(Evol.Dico.HTMLField4One(f, fid, fv, mode));
        return this;
    },

    renderFieldLabel: function (h, fld, mode) {
        h.push(Evol.Dico.HTMLFieldLabel(fld, mode));
        return this;
    },

    setTitle: function (title){
        if(this._uTitle){
            var opts=this.options,
                selector=opts.titleSelector;
            if(selector && selector!==''){
                var t,lf=opts.uiModel.leadfield;
                if(title){
                    t=title;
                }else if((!_.isUndefined(lf)) && lf!==''){
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

    validate: function (fields) {
        // validate top level fields
        var isValid=true,
            fs = fields?fields:this.getFields();
        this.clearMessages();
        if (_.isArray(fs)) {
            isValid = this.checkFields(this.$el, fs);
        }
        // validate sub-collections
        if(this._subCollecs){
            var that=this;
            //TODO
            //_.each(subCollecs, function (sc) {
            //    var trs=that.$('[data-pid="'+sc.id+'"] tbody > tr');


            //});
        }
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid;
    },

    valRegEx: {
        email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
        integer: /^-?\d+$/,
        decimalEN: /^\d+(\.\d+)?$/,
        decimalFR: /^\d+(\,\d+)?$/,
        decimalDA: /^\d+(\,\d+)?$/
    },

    checkFields: function (holder, fds) {

        var that = this,
            ft = Evol.Dico.fieldTypes,
            i18nVal = Evol.i18n.validation,
            msgs = [],
            v,
            values = this.getData();

        function checkType(fd, v) {
            var ft = Evol.Dico.fieldTypes,
                fv = _.isArray(v)?'':Evol.UI.trim(v),
                i18nVal=Evol.i18n.validation;
            if (fv !== '' && !_.isArray(fv)){ // && !isNaN(fv)
                switch (fd.type) {
                    case ft.integer:
                    case ft.email:
                        if (!that.valRegEx[fd.type].test(fv)) {
                            flagField(fd, i18nVal[fd.type]);
                        }
                        break;
                    case ft.dec:
                    case ft.money:
                        var regex = that.valRegEx[ft.dec + Evol.i18n.LOCALE];
                        if (regex === null) {
                            regex = that.valRegEx[ft.dec + 'EN']; // default to English with "."
                        }
                        if (!regex.test(fv))
                            flagField(fd, i18nVal[fd.type]);
                        break;
                    case ft.date:
                    case ft.datetime:
                    case ft.time:
                        if ((fv !== '') && (!_.isDate(new Date(fv)))) {
                            flagField(fd, i18nVal[fd.type]);
                        }
                        break;
                }
            }
        }

        function flagField(fd, msg, r2, r3) {
            var msgf = msg.replace('{0}', fd.label);
            // TODO loop through args
            if (r2 !== null) {
                msgf = msgf.replace('{1}', r2);
            }
            if (r3 !== null) {
                msgf = msgf.replace('{2}', r3);
            }
            if(_.isArray(msgs)){
                msgs.push(msgf);
            }
            var p=that.$field(fd).parent();
            var errlabel = p.find('.text-danger');
            if (errlabel.length) {
                errlabel.html(msgf);
            } else {
                p.append('<p class="text-danger">' + msgf + '</p>');
            }
            p.addClass('has-error');
        }

        _.each(fds,function(f){
            v = values[f.id];

            // Check required/empty or check type
            if (f.required && (v==='' ||
                    (f.type===ft.integer && isNaN(v)) ||
                    (f.type===ft.money && isNaN(v)) ||
                    (f.type===ft.lov && v==='0') ||
                    (f.type===ft.list && v.length===0) ||
                    (f.type===ft.color && v==='#000000'))){
                flagField(f, i18nVal.empty);
            }
            checkType(f, v);

            // Check regexp
            if (f.regex !== null && !_.isUndefined(f.regex)) {
                var rg = new RegExp(f.regex);
                if (!v.match(rg)) {
                    flagField(f, i18nVal.regex, f.label);
                }
            }
/*
             // Check custom
             if (f.jsv !== null) {
                 var p = eval([f.jsv, '("', that.prefix, f.id, '","', f.label, '")'].join(''));
                 if (p !== null && p.length > 0) {
                    flagField(f, p);
                 }
             }*/

            // Check min & max
            if (f.type===ft.integer || f.type===ft.decimal || f.type===ft.money) {
                if (v !== '') {
                    if (f.max !== null && parseFloat(v) > f.max) {
                        flagField(f, i18nVal.max, f.max);
                    }
                    if (f.min !== null && parseFloat(v) < f.min) {
                        flagField(f, i18nVal.min, f.min);
                    }
                }
            }

            // Check minlength and maxlength
            if (_.isString(v) && v.length > 0) {
                var ok = true,
                    len = v.length;
                if(len>0){
                    if(f.maxlength){
                        ok = len <= f.maxlength;
                        if(!ok){
                            if(f.minlength){
                                flagField(f, i18nVal.minmaxlength, f.minlength, f.maxlength);
                            }else{
                                flagField(f, i18nVal.maxlength, f.maxlength);
                            }
                        }
                    }
                    if(ok && f.minlength){
                        ok = len >= f.minlength;
                        if(!ok){
                            if(f.maxlength){
                                flagField(f, i18nVal.minmaxlength, f.minlength, f.maxlength);
                            }else{
                                flagField(f, i18nVal.minlength, f.minlength);
                            }
                        }
                    }
                }
            }

        });

        if (msgs.length > 0) {
            return [i18nVal.intro, '<ul><li>', msgs.join('</li><li>'), '</li></ul>'].join('');
        } else {
            return '';
        }

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

    showHelp:function(id, type, $el){
        var fs=this.getFields(),
            fld=_.findWhere(fs,{id:id});

        if(fld||fld.help){
            var $f=$el.closest('.evol-fld'),
                $fh=$f.find('.help-block');
            if($fh.length>0){
                $fh.slideUp(200, function(){
                    $fh.remove();
                });
            }else{
                $fh=$('<span class="help-block">' + _.escape(fld.help) + '</span>').hide();
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

    sendMessage: function(title,content,style){
        return this.$el.trigger('message',{
            title:title,
            content:content,
            style:style
        });
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
            fs=Evol.Dico.getFields(this.options.uiModel, function(m){
            return m.type === 'list';
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
            h.push(Evol.UI.input.textMJSON('',jsonStr,10));
        }
        this._renderButtons(h, 'json');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    },

    getData: function () {
        var jsonStr=this._getDOMField().val();
        return $.parseJSON(jsonStr);
    },

    setData: function (m) {
        this._getDOMField().val(JSON.stringify(m, null, 2));
        return this.setTitle();
    },

    clear: function () {
        this._getDOMField().val('');
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
    prefix: 'ovw',

    getData: function () {
        return {};
    },

    setData: function (model) {
        if(!_.isUndefined(model) && model!==null){
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
                    switch(f.type){
                        case fTypes.lov:
                        case fTypes.bool:
                            $f.html(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov));
                            break;
                        case fTypes.url:
                            $f.html(Evol.UI.link(f.id, fv, fv, f.id));
                            break;
                        case fTypes.email:
                            $f.html(Evol.UI.linkEmail(f.id, fv));
                            break;
                        case fTypes.pix:
                            $f.html((fv)?('<img src="'+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        default:
                            $f.text(Evol.Dico.HTMLField4Many(f, fv, Evol.hashLov) || ' ');
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
            Evol.UI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'),
            Evol.UI.input.button('edit', Evol.i18n.Edit, 'btn-primary'),
            '</div>');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-wizard.js
 *
 * View one wizard
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Wizard = Evol.ViewOne.extend({

    viewName: 'wizard',
    prefix: 'wiz',

    events:{
        'click .evo-wiz-bsteps>div,.evo-wiz-buttons>button':'click_nav',
        'click label > .glyphicon-question-sign': 'click_help',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    stepIndex: function(stepIdx){
        if(_.isUndefined(stepIdx)){
            return this._stepIdx;
        }else if(stepIdx<this._nbStep){
            this._showStep(stepIdx);
            return this;
        }
    },

    _showStep: function(stepIdx, bId){
        var steps=this.$('.evo-p-wiz');
        if(_.isUndefined(bId)){
            this._stepIdx=stepIdx;
            steps.hide()
                .eq(this._stepIdx).show();
        }else if(this.validate(this.options.uiModel.elements[this._stepIdx].elements)===''){
            if(bId==='prev' && this._stepIdx>0){
                steps.hide()
                    .eq(--this._stepIdx).show();
            }else if(bId==='next' && this._stepIdx<this._nbStep){
                steps.hide()
                    .eq(++this._stepIdx).show();
            }
        }
        var bs=this._getButtons();
        if(this._stepIdx===0){
            bs.prev.addClass('disabled');
        }else{
            bs.prev.removeClass('disabled');
        }
        if(this._stepIdx===this._nbStep-1){
            bs.next.hide();
            bs.finish.show();
        }else{
            bs.next.show();
            bs.finish.hide();
        }
    },

    _render: function (h, mode) {
        // WIZARD forms
        var elems = this.options.uiModel.elements;
        this._nbStep=elems.length;
        this._renderBreadcrumb(h, elems, 0)
            ._renderPanels(h, elems, 'wiz')
            ._renderButtons(h, mode)
            ._stepIdx=0;
    },

    _renderBreadcrumb: function (h, elems, stepIdx) {
        // WIZARD top step indicator
        h.push('<ol class="evo-wiz-bsteps breadcrumb">');
        _.each(elems, function(p, idx){
            h.push('<li data-id="',stepIdx,'"><div class="badge ');
            if(idx>stepIdx){
                h.push('future');
            }else if(idx<stepIdx){
                h.push('past');
            }else{
                h.push('present');
            }
            h.push('">', idx+1,'</div><div>', p.label, '</div></li>');
        });
        h.push('</ol>');
        return this;
    },

    _renderPanels: function (h, elems, mode) {
        // WIZARD forms
        var that=this;
        h.push('<div class="evo-one-wiz">');
        _.each(elems, function(pnl, idx){
            switch (pnl.type) {
                case 'panel':
                    that.renderPanel(h, pnl, 'p-'+idx, mode, idx===0);
                    break;
                case 'panel-list':
                    that.renderPanelList(h, pnl, mode, idx===0);
                    break;
            }
        });
        h.push('</div>');
        return this;
    },

    _renderButtons: function (h) {
        h.push(Evol.UI.html.clearer,
            '<div class="evo-wiz-buttons">',
            Evol.UI.input.button('prev', Evol.i18n.prev, 'btn-default disabled'),
            Evol.UI.input.button('next', Evol.i18n.next, 'btn-primary'),
            Evol.UI.input.button('finish', Evol.i18n.finish, 'btn-default'),
            '</div>');
        return this;
    },

    click_nav: function(evt){
        var bId=$(evt.currentTarget).data('id');
        this.clearMessages();
        if(bId==='finish'){
            var v=this.validate();
            if(v===''){
                //TODO what? got ot OneView.View
                this.$el.trigger('action', 'save');
            }else{
                this.sendMessage(Evol.i18n.validation.incomplete, v, 'warning');
            }
        }else{
            var stepIdx=parseInt(bId,10);
            this._showStep(stepIdx, bId);
        }
        this._refreshBreadcrumb();
    },

    _getButtons: function(){
        if(_.isUndefined(this._buttons)){
            var bh=this.$('.evo-wiz-buttons>button');
            this._buttons = {};
            for(var i=0;i<bh.length;i++){
                var b=bh.eq(i);
                this._buttons[b.data('id')]=b;
            }
        }
        return this._buttons;
    },

    _refreshBreadcrumb:function(){
        var stepIdx=this._stepIdx,
            divs=this.$('.evo-wiz-bsteps>div>div');
        _.each(divs, function(d, idx){
            if(idx>stepIdx){
                $(d).attr('class', 'badge future');
            }else if(idx<stepIdx){
                $(d).attr('class', 'badge past');
            }else{
                $(d).attr('class', 'badge present');
            }
        });
        return this;
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

var evoLangXpt = Evol.i18n.export;

Evol.ViewAction.Export = Backbone.View.extend({

    viewName: 'export',

    events: {
        "change .evol-xpt-format": "click_format",
        'change input': 'click_preview', //[type="checkbox"],
        'click .evol-xpt-more': 'click_toggle_sel',
        'click button': 'click_button'
        // TODO #tbrevol-xpt-format is a bug if change prefix...
    },

    options: {
        model: null,
        uiModel: null,
        many: true,
        //style: 'normal',
        prefix: 'tbr'
    },


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
            EvoUI = Evol.UI,
            opts = this.options,
            prefix = opts.prefix || '',
            fields = this.getFields();

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds"><fieldset>');
        //### list of columns to export #########################################
        h.push('<div class="evol-id">', EvoUI.label('', evoLangXpt.ExportFields),'</div>'/*,
            '<div>',EvoUI.input.checkbox('showID','1'), '<label for="showID">', evoLangXpt.IDkey, '</label>','</div>'*/
        );
        for (var i = 0, iMax = fields.length; i < iMax; i++) {
            var f = fields[i],
                fLabel = f.label,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><input type="checkbox" value="1" id="', fID, '" checked="true"><label class="checkbox" for="', fID, '">', fLabel, '</label></div>');
            if (i == 10 && iMax > 14){
                h.push(EvoExport.html_more2(evoLangXpt.AllFields));
            }
        }
        if (iMax > 14){
            h.push('</div>');
        }
        h.push('</fieldset></div><div class="evol-xpt-para">'); // table = 2 columns
        //##### export formats ########################################
        var fId = prefix + 'evol-xpt-format',
            myLabels = evoLangXpt.ExportFormats.split('-');
        h.push('<label for="', fId, '">', evoLangXpt.ExportFormat, '</label>',
            EvoUI.input.select(fId, '', 'evol-xpt-format', false, [
                {id: 'CSV', text: myLabels[0]},
                {id: 'TAB', text: myLabels[3]},
                {id: 'HTML', text: myLabels[1]},
                {id: 'JSON', text: myLabels[5]},
                {id: 'SQL', text: myLabels[2]},
                {id: 'XML', text: myLabels[4]}
            ])
        );
        fId = prefix + "FLH";
        h.push('<div class="evol-xpt-opts">');
        //# field (shared b/w formats - header #######
        h.push('<div class="evol-FLH clearfix">');
        //h.push('<label>', evoLangXpt.ExportHeader, '</label>');
        h.push(EvoUI.input.checkbox(fId, true), EvoUI.fieldLabelSpan(fId, evoLangXpt.ExportFirstLine));
        //##### CSV, TAB - First line for field names #######
        h.push('</div><div id="', prefix, 'CSV">');
        //# field - separator
        //# - csv - any separator #######
        h.push('<div data-id="csv2" class="evol-w120">',
            //EvoExport.html_more2('options'),
            //.evol-FLH
            EvoUI.fieldLabel('FLS_evol', evoLangXpt.ExportSeparator),
            EvoUI.input.text(prefix+'FLS_evol', ',', 0),
            '</div>'); // </div>
        h.push('</div>');
        _.each(['XML','HTML','SQL','JSON'], function(f){
            h.push('<div id="', prefix, f, '" style="display:none;"></div>');
        });
        h.push('</div>');
        //# Preview #######
        h.push('<label>',evoLangXpt.preview,'</label><div class="evol-xpt-preview">');
        // ## Samples
        h.push('<textarea class="Field evol-xpt-val form-control"></textarea>');
        h.push('</div></div></div></div>');
        // ## Download button
        h.push('<div class="evol-buttons form-actions">',
            EvoUI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'),
            EvoUI.input.button('export', evoLangXpt.DownloadEntity.replace('{0}', this.options.uiModel.entities), 'btn btn-primary'));
        return h.join('');
    },

    setModel: function(model){
        this.options.model=model;
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
            this.fields=Evol.Dico.getFields(opts.uiModel,opts.fnFilter,opts.mode);
        }
        return this.fields;
    },

    getTitle: function(){
        if(this.options.many){
            return Evol.i18n.getLabel('export.ExportEntities', this.options.uiModel.entities);
        }else{
            return Evol.i18n.getLabel('export.ExportEntity', this.options.uiModel.entity);
        }
    },

    _preview: function (format) { // TODO add field ID
        var h=[],
            fTypes=Evol.Dico.fieldTypes;
        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
                fldsDomHash = {},
                prefix='#'+ this.options.prefix,
                useHeader = this.$(prefix+'FLH').prop('checked');
                //showID=this.$('#showID').prop('checked');

            //if(showID){
            //    flds.unshift({id: 'id', type: 'text', label: 'Id'});
            //}
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
                        sep = Evol.UI.trim(this.$(prefix+'FLS_evol').val());
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
                            if (!_.isUndefined(mj) && mj!=='') {
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
                    var fValue;
                    _.each(data, function(m){
                        h.push(sql);
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fTypes.integer:
                                case fTypes.decimal:
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
                    });
                    //options
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ',sqlTable,' OFF;\n');
                    }
                    if(optTransaction){
                        h.push('COMMIT TRANSACTION\n');
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#evoRoot').val() || this.options.uiModel.entity.replace(/ /g,'_'),
                        fv;
                    h.push('<xml>\n');
                    _.each(data, function(m){
                        h.push('<', elemName, ' ');
                        _.each(flds, function(f){
                            h.push(f.id, '="');
                            if(f.type===fTypes.text || f.type===fTypes.txtm){
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
                    });
                    h.push('</xml>');
                    break;
            }
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this.$('.evol-xpt-val')
            .html(h.join(''));
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            return this._getValue();
        } else {
            this._setValue(value);
            return this;
        }
    },

    _ValFields: function () {
        var v = [],
            flds = this.$('.evol-xpt-flds input:checked');//.not('#showID')
        _.each(flds, function(fe){
            v.push(fe.attr('id'));
        });
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
            fv = !_.isUndefined(f.attr('checked'));
        v.options[f.attr('id')] = fv;
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();//this.$('.evol-xpt-format').val();
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

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        this.$el.trigger('action', bId);
    }
});


var EvoExport = {

    cFormat: 'CSV',

    html_more2: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-xpt-more">', label, '</a><div style="display:none;">'
        ].join('');
    },

    formHTML: function () {
        return '';
    },

    formXML: function (entity) {
        return [
            EvoExport.html_more2('options'),
            EvoExport.formEntityName('evoRoot', evoLangXpt.xpXMLroot, entity),
            Evol.UI.fieldLabel('evoxpC2X', evoLangXpt.xpColMap),
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
            '<div>', Evol.UI.input.checkbox('evoxpTRS2', '0'), Evol.UI.fieldLabelSpan('evoxpTRS2', evoLangXpt.xpSQLId), '</div>',
            '<div>', Evol.UI.input.checkbox('evoxpTRS1', '0'), Evol.UI.fieldLabelSpan('evoxpTRS1', evoLangXpt.xpSQLTrans), '</div>',
            '</div>'
           ].join('');
    },

    formEntityName: function(id,label,entity){
        return [
            Evol.UI.fieldLabel(id, label),
            Evol.UI.input.text(id, entity.replace(' ', '_'), 30),'<br/>'
            ].join('');
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
        this.options=_.extend(this.options, opts);
        return this;
    },

    render: function(){
        var bLabels=this.options.buttonLabels,
            that=this,
            e=this.$el,
            h=['<div class="evo-zfilters"></div>',
                '<a class="evo-bNew btn btn-primary" href="javascript:void(0)">',evoLang.bNewFilter,'</a>'];
        if(this.options.submitButton){
            h.push('<a class="evo-bSubmit btn btn-primary" href="javascript:void(0)">',evoLang.bSubmit,'</a>');
        }
        h.push('<div class="evo-editFilter"></div>',
            '<a class="evo-bAdd btn btn-primary" style="display:none;" href="javascript:void(0)">',evoLang.bAddFilter,'</a>',
            '<a class="evo-bDel btn btn-default" style="display:none;" href="javascript:void(0)">',evoLang.bCancel,'</a>');
        this._step=0;
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
                var $this=$(this),
                    vc=$this.attr('checked'),
                    allChecks=$this.siblings();
                if(vc=='checked'){
                    allChecks.attr('checked',vc);
                }else{
                    allChecks.removeAttr('checked');
                }
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
                var fields=this.options.fields,
                    h=['<select id="field" class="form-control"><option value=""></option>'];
                for (var i=0,iMax=fields.length;i<iMax;i++){
                    var f=fields[i];
                    h.push(Evol.UI.input.option(f.id,f.label));
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
                        case fTypes.integer:
                        case fTypes.decimal:
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
                            h.push('<span id="value">');
                            if(this._field.list.length>7){
                                h.push('(<input type="checkbox" id="checkAll" value="1"/><label for="checkAll">All</label>) ');
                            }
                            h.push(Evol.UI.input.checkboxLOV(this._field.list));
                            h.push('</span>');
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
                        case fTypes.integer:
                        case fTypes.decimal:
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
                            $value.find('#'+v.split(',').join(',#')).attr('checked', 'checked');
                            break;
                        case fTypes.bool:
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
                    case ft.integer:
                    case ft.decimal:
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
        if (_.isUndefined(value)){
            // --- get value
            var v=[];
            this._filters.find('a').each(function(){
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
        //'list.paginate >div': 'paginate',
        'action >div': 'action_view',
        'status >div': 'status_update',
        'filter.change >div': 'change_filter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        defaultView: 'list',
        style: 'panel-info',
        display: 'label', // tooltip, text, icon, none
        titleSelector: '#title',
        buttons: {
            // --- views for one ---
            view: true,
            edit: true,
            mini: true,
            wiz: false,
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
            'export': true,
            group: false,
            customize:false
        },
        pageSize:20
    },

    modesHash: {
        'view':'View',
        'edit':'Edit',
        'mini':'Mini',
        'wiz':'Wizard',
        'json':'JSON',
        'badges':'Badges',
        'list':'List',
        'charts':'Charts'
    },

	views:[],
	viewsHash:{},
	curView:null,

    _group:false,

    initialize: function (opts) {
        _.extend(this.options, opts);
    },

	render: function() {
		this.$el.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
        this._viewsIcon=this.$('.glyphicon-eye-open');
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
	},

    _toolbarHTML: function(){
        var h=[],
            opts=this.options,
            endMenu='</ul></li>',
            menuDevider='<li role="presentation" class="divider" data-cardi="1"></li>',
            menuDeviderCard1='<li role="presentation" class="divider" data-cardi="1"></li>';

        function beginMenu(id, icon){
            return ['<li class="dropdown" data-id="',id,'">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',Evol.UI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu evo-dropdown-icons">'].join('');
        }

        function link2h(id, label, icon, cardi, style){
            h.push('<li data-id="',id,'"');
            if(cardi){
                h.push(' data-cardi="'+cardi,'"');
            }
            if(style!=='label'){
                h.push(' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="',label,'"');
            }
            h.push('><a href="#" data-id="',id,'">',Evol.UI.icon(icon));
            if(style!=='tooltip'){
                h.push('&nbsp;',label);
            }
            h.push('</a></li>');
        }

        function linkOpt2h (id, label, icon, cardi){
            if(opts.buttons && opts.buttons[id]){
                link2h(id, label, icon, cardi, 'label');
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list',Evol.i18n.All,'th-list');
        linkOpt2h('new',Evol.i18n.New,'plus');
        linkOpt2h('edit',Evol.i18n.Edit,'pencil','1');
        linkOpt2h('save',Evol.i18n.Save,'floppy-disk','1');
        linkOpt2h('del',Evol.i18n.Delete,'trash','1');
        linkOpt2h('filter','Filter','filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('charts','Charts','stats','n');
        linkOpt2h('export','Export','cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            link2h('prev','','chevron-left','x');
            link2h('next','','chevron-right','x');
            h.push('<li class="evo-tb-status" data-cardi="n"></li>');
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">');

            h.push(beginMenu('views','eye-open'));
            linkOpt2h('list','List','th-list','n');
            linkOpt2h('badges','Badges','th-large','n');
            linkOpt2h('charts','Charts','stats','n');
            linkOpt2h('view','View','file','1');
            linkOpt2h('edit','All Fields','th','1');
            linkOpt2h('mini','Mini','th-large','1'); //Important Fields only
            linkOpt2h('wiz','Wizard','arrow-right','1');
            linkOpt2h('json','JSON','barcode','1');
            // TODO
            //linkOpt2h('json','JSON','barcode','n');
/*
            h.push(menuDeviderCard1);
            linkOpt2h('lg','Big','font','1');
            linkOpt2h('','Normal','font','1');
            linkOpt2h('sm','Small','font','1');
*/
            h.push(endMenu);

            linkOpt2h('customize','','wrench', '1', 'Customize');
            /*
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

	updateModel:function(m){
		this.refresh();
	},

	refresh:function(){
		if(this.viewsHash.list){
			this.viewsHash.list.render();	
		}
		if(this.viewsHash.badges){
			this.viewsHash.badges.render();
		}
        return this;
	},

	setView:function(viewName){
		var opts=this.options,
            $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config,
            collec=this._curCollec();

        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this.model=new opts.modelClass();
            this.model.collection=collec;
            this.newItem();
            this.curView.options.mode='new';
        }else{
            if($v.length){
            // -- view already exists and was rendered
                //if(this.curView.model){
                //TODO debug
                    this.model=this.curView.model;
                //}
                this.model.collection=collec;
                this.curView=this.viewsHash[viewName];
                if(this.curView.setCollection){
                    this.curView.setCollection(collec);
                }
                if(this.model && !this.model.isNew()){
                    if(this.curView.setModel){
                        if(!this.curView.collection && m.collection){
                            this.curView.collection=this.model.collection;
                        }
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }
                    if(this.curView.setTitle){
                        this.curView.setTitle();
                    }
                    if(this.curView.cardinality==='n' && this.curView.setPage){
                        this.curView.setPage(this.options.pageIndex);
                    }
                }else if(this.curView.clear){
                    this.curView.clear();
                }
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
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
                    uiModel: opts.uiModel,
                    style: opts.style,
                    pageSize: opts.pageSize || 20,
                    pageIndex: opts.pageIndex || 0,
                    titleSelector: opts.titleSelector
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                switch(viewName){
                    // --- one ---
                    case 'view':
                    case 'edit':
                    case 'mini':
                    case 'json':
                    case 'wiz':
                        vw = new Evol.ViewOne[this.modesHash[viewName]](config)
                            .render();
                        this._prevOne=viewName;
                        break;
                    // --- many ---
                    case 'charts':
                    case 'badges':
                    case 'list':
                        vw = new Evol.ViewMany[this.modesHash[viewName]](config)
                        //vw = new Evol.ViewMany.JSON(config)
                            .render();
                        this._prevMany=viewName;
                        vw.setTitle();
                        if(viewName!='charts' && this.options.pageIndex > 0){
                            vw.setPage(this.options.pageIndex || 0);
                        }
                        //this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewAction.Export(config);
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                }
                this.curView=vw;
                this.viewsHash[viewName]=vw;
                $(this.options.titleSelector).html(this.curView.getTitle());
            }
        }
        if(this.curView.cardinality==='n'){ // TODO do not always change flag
            this.showFilter(false);
        }else{
            if(this.curView.viewName==='wizard'){
                this.curView.stepIndex(0);
            }
            this.hideFilter();
        }
        this.setIcons(viewName);
        return this;
	},

    getView:function(){
        return this.curView;
    },

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('.evo-toolbar li');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: this.$('.evo-toolbar [data-id="prev"],.evo-toolbar [data-id="next"]'),
                customize: this.$('.evo-toolbar a[data-id="customize"]').parent(),
                views: this.$('.evo-toolbar [data-id="views"]')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var setVisible=Evol.UI.setVisible;
        function oneMany(showOne, showMany){
            setVisible(tbBs.ones, showOne);
            setVisible(tbBs.manys, showMany);
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons();
            setVisible(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();
            setVisible(tbBs.views, mode!=='export');
            tbBs.del.hide();
            if(this._viewsIcon){
                var cssOpen='glyphicon-eye-open',
                    cssClose='glyphicon-eye-close';
                if(mode==='mini' || mode==='json'){
                    this._viewsIcon
                        .removeClass(cssOpen).addClass(cssClose);
                }else{
                    this._viewsIcon
                        .removeClass(cssClose).addClass(cssOpen);
                }
            }
			if((this.model && this.model.isNew()) || mode==='export'){
                oneMany(false, false);
                if(this.model.isNew()){
                    $('.evo-dropdown-icons>li[data-cardi="1"]').show();
                }
			}else{
				if(mode==='badges' || mode==='list' || mode==='charts'){
                    this._prevMany=mode;
                    oneMany(false, true);
                    if(mode==='charts'){
                        this.setStatus('');
                    }else if(this.collection.length > this.options.pageSize){
                        tbBs.prevNext.show();
                    }
                }else{
                    this._prevOne=mode;
                    oneMany(true, false);
                    tbBs.prevNext.show();
                    setVisible(tbBs.save, mode!=='view');
                    setVisible(tbBs.edit, mode==='view');
				}
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
                    el:$ff,
                    fields:Evol.Dico.getFields(this.options.uiModel)
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val())
                        .render();
                });
            }else{
                return this;
            }
        }else{
            this._filters.$el.show();
        }
        return this;
    },

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide();
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

	getData: function(){
		if(this.curView){
			return this.curView.getData();
		}
		return null;
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
        this.clearMessage();
        return this;
    },

    saveItem: function(saveAndAdd){
        var that=this,
            vw=this.curView,
            msg=vw.validate();

        function fnSuccess(m){
            if (saveAndAdd) {
                that.newItem();
            }else{
                that.model=m;
                if(that._filteredCollection){
                    that._filteredCollection.add(m);
                }
                that.setIcons('edit');
                vw.setModel(m);
            }
            vw.setTitle();
        }

        if(msg===''){
            var entityName=this.options.uiModel.entity;
            if(this.model.isNew()){
                var collec=this.collection;
                if(collec){
                    collec.create(this.getData(), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage(Evol.i18n.saved, Evol.i18n.getLabel('status.added',entityName, _.escape(vw.getTitle())), 'success');
                        },
                        error:function(err){
                            alert('error');
                        }
                    });
                    this.options.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO pretty
                }
            }else{
                // TODO fix bug w/ insert when filter applied => dup record
                this.model.set(this.getData());
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage(Evol.i18n.saved, Evol.i18n.getLabel('status.updated', Evol.UI.capitalize(entityName),_.escape(vw.getTitle())), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            this.setMessage(Evol.i18n.validation.incomplete, msg, 'warning');
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName=='view'){
            if(this._prevOne!=='view'){
                this.setView(this._prevOne);
            }else{
                this.setView('edit');
            }
        }
        return this.curView.clear()
            .setTitle(Evol.i18n.getLabel('NewEntity', this.options.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var i18n=Evol.i18n,
            entityName=this.options.uiModel.entity,
            entityValue=this.curView.getTitle();

        if(this.curView.cardinality==='1'){
            var delModel=this.curView.model;
            // TODO good looking msgbox
            if (delModel && confirm(i18n.getLabel('DeleteEntity', entityName, entityValue))) {
                var that=this,
                    collec=this.collection,
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
                    newModel.collection=collec;
                }
                delModel.destroy({
                    success:function(){
                        if(collec.length===0){
                            that.curView.clear();
                        }else{
                            this.model = newModel;
                            that.curView.setModel(newModel);
                        }
                        that.setMessage('Record Deleted.', i18n.getLabel('status.deleted', Evol.UI.capitalize(entityName), entityValue), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            if(this.curView.getSelection){
                var selection=this.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('DeleteEntities', selection.length, this.options.uiModel.entities))) {
                        //TODO

                    }
                }
            }
        }
    },

    setMessage: function(title, content, style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            var ch=$msg.children();
            $msg.attr('class', 'evo-msg alert alert-'+style+' alert-dismissable');
            $msg.find('>strong').text(title);
            $msg.find('>span').html(content); //TODO text?
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
                    this.setView(this._prevOne || 'view');
                }else{
                    this.setView(this._prevMany || 'list');
                }
                break;
            case 'edit':
                this.setView(actionId);
                break;
            case 'export':
                alert('Sorry, no demo server yet...');
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
                break;
        }
    },

    paginate: function(bId, ui){
        if(ui){//TODO no need? event?
            bId=ui;
        }
        var pIdx=this.options.pageIndex || 0;
        if(bId==='prev'){
            pIdx=(pIdx>0)?pIdx-1:0;
        }else if(bId==='next'){
            if((pIdx+1)*(this.options.pageSize||20)<this.collection.length){
                pIdx++;
            }
        }else{
            var bIdx=parseInt(bId,10);
            if(bIdx>0){
                pIdx=bIdx;
            }
        }
        this.options.pageIndex=pIdx;
        if(this.curView.setPage){
            this.curView.setPage(pIdx);
        }
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
            case 'customize':
                this.curView.customize();
                break;/*
            case 'group':
                this.showGroup();
                break;*/
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    if(this.curView.isDirty && this.curView.isDirty()){
                        // TODO prompt for save changes
                    }
                    this.browse(toolId);
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;
            case 'new-field':
                Evol.Dico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'badges', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId);
                }
                break;
        }
        this.$el.trigger('toolbar.'+toolId);
    },

    click_navigate: function(evt,ui){
        var m=this.collection.get(ui.id);
        evt.stopImmediatePropagation();
        this.model=m;
        this.setView('view');//(this._prevOne || 'edit');
        this.curView.setModel(m);
        // todo: decide change model for all views or model event
    },

    change_filter: function(evt){
        var fvs=this._filters.val(),
            collec;
        if(fvs.length){
            var models=Evol.Dico.filterModels(this.model.collection.models, fvs);
            if(this.collectionClass){
                collec=new collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection=collec;
            var ccSel=collec.length,
                ccAll=this.collection.length;
            if(ccSel){

            }
            this.setStatus(ccSel+' / '+ccAll+' '+this.options.uiModel.entities);
        }else{
            collec=this.collection;
            this._filteredCollection=null;
            this.setStatus(collec.length+' '+this.options.uiModel.entities);
        }
        this.curView.setCollection(collec);
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


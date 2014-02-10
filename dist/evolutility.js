/*   evolutility 0.0.1 */

/*   (c) 2014 Olivier Giulieri */

/*! ***************************************************************************
 *
 * evolutility :: ui.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};
/*
Evol.CSS = {
    field: 'evo-field form-control ',
    fieldLabel: 'evol-field-label',
    panel: '',
    tab: '',
    tabHeader: ''
};*/

Evol.UI = {

    version: '0.0.1',

    // --- static html fragments ---
    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>',
        emptyOption: '<option value=""></option>',
        glyphicon: 'glyphicon glyphicon-',
        required: '<span class="evol-required">*</span>'
    },

    // --- field labels ---
    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label"><label for="', fID, '">', fLbl, '</label></div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label"><label for="', fID, '">', fLbl, '</label></span>'].join('');
    },

    // --- input fields ---
    input: {

        text: function (fID, fV, fd, css, size) {
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
        textInt: function (fID, fV, min, max) {
            var h=['<input class="evo-field form-control" type="number" id="', fID,
                '" value="', fV];
            if(min!==undefined){
                h.push('" min="', min);
            }
            if(max!==undefined){
                h.push('" max="', max);
            }
            h.push('" maxlength="12">');
            return h.join('');
        },
        textM: function (fID, fV, ml, h) {
            return [
                '<textarea name="', fID, '" id="', fID, '" class="evo-field form-control"" rows="', h,
                (ml > 0) ? '" onKeyUp="Evol.UI.Validation.checkMaxLen(this,' + ml + ')' : '',
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
        checkbox: function (fID, fV) {
            var fh = ['<input type="checkbox" id="', fID, '"'];
            if (fV !== null && fV !== '' && fV !== '0') {
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
            return ['<img id=""', fID, '" src="', fV, '"/>'].join('');
        },
        hidden: function (fID, fV) {
            return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
        },
        hiddens: function (h, list) {
            _.each(function (){
                h.push('<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>');
            });
        },
        selectBegin: function (fID, css, emptyOption) {
            var h=['<select id="', fID, '" class="form-control ',css,'">'];
            if(emptyOption){
                h.push(Evol.UI.html.emptyOption);
            }
            return h.join('');
        },
        select:function (fID, css, emptyOption, list) {
            return [
                this.selectBegin(fID, css, emptyOption),
                this.options(list),'</select>'
            ].join('');
        },
        option: function (fID, fV) {
            return ['<option value="', fID, '">', fV, '</option>'].join('');
        },
        options: function (fields) {
            var fnOpt = Evol.UI.input.option,
                opts=[];
            _.each(fields,function(f){
                opts.push(fnOpt(f.id, f.text));
            });
            return opts.join('');
        },
        button: function (id, label, css) {
            return '<button type="button" data-id="' + id + '" class="btn' + (css ? ' ' + css : '') + '">' + label + '</button>';
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
    link: function (fID, label, url) {
        return ['<a class="evo-field" href="', url, '" id="', fID, '">', label, '</a>'].join('');
    },
    linkEmail: function (fID, label, email) {
        return Evol.UI.link(fID, label, email ? 'mailto:' + email : '');
    },
    //html_more: function (label) {
    //    return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
    //},

    // --- icons ---
    icon: function (icon, cls) {
        return ['<i class="', cls? cls+' ':'', Evol.UI.html.glyphicon, icon, '"></i>'].join('');
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
    formatDate: function(d){ // TODO use date not string as param
        return d;
        //return d.toLocaleDateString();
        //return (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    },
    formatTime: function(d){ // TODO use date not string as param
        return d;
        //return d.toLocaleTimeString();
        //return (d.getHours()) + ":" + (d.getMinutes());
    },
    formatDateTime: function(d){ // TODO use date not string as param
        if(d!==undefined && d!==''){
            var dateParts= d.split('-');
            if(dateParts.length>1){
                return dateParts[1]+'/'+dateParts[2]+'/'+dateParts[0];
            }
        }
        return '';
        /*
        //var myDate = new Date(v);
        //if(_.isDate(myDate)){
            var dv='';
            //return myDate.toLocaleDateString("en-US");
            if(f.type!=fTypes.time){
                dv+=this.formatDate(myDate);
                if(f.type==fTypes.datetime){
                    dv+=' ';
                }
            }
            if(f.type!=fTypes.date){
                dv+=this.formatTime(myDate);
            }
            return dv;
        //}*/
    },

    // ---  Misc. ---
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
 * https://github.com/evoluteur/evolutility
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
        var urlGoogleChart = [this.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=360x200'].join('');
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style){
        var maxCount = _.max(data),
            urlGoogleChart = [this.URL,'?chbh=a&amp;chs=350x200&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
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
/*! ***************************************************************************
 *
 * evolutility :: ui-validation.js
 *
 * Form validation
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

// this is some very old code from Evolutility ASP.net version
// TODO rewrite or use another open source
Evol.UI.Validation = {

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
            var ln = Evol.i18n.LOCALE;
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
        p.addClass('has-error');
    },

    checkFields: function (holder, fds, prefix) {
        var that=this,
            msgs = [],
            i18nVal=Evol.i18n.validation,
            evoRegEx = {
                email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
                integer: /^-?\d+$/,
                decimalEN: /^\d+(\.\d+)?$/,
                decimalFR: /^\d+(\,\d+)?$/,
                decimalDA: /^\d+(\,\d+)?$/
            };
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
                        msgf = labMsg(i18nVal.empty);
                        that.setValidationFlags(p, msgf);
                        noErr = false;
                    } else {
                        $f.parent().removeClass('control-group error')
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
                        msgf = labMsg(i18nVal.regex, fd.label);
                        that.setValidationFlags($f.parent(), msgf);
                    }
                }/*
                // Check custom
                if (fd.jsv !== null) {
                    p = eval([fd.jsv, '("', Evol.prefix, fd.id, '","', fd.label, '")'].join(''));
                    if (p !== null && p.length > 0) {
                        that.setValidationFlags($f.parent(), labMsg(p));
                    }
                }*/
                // Check min & max
                if (noErr) {
                    var fv = Evol.UI.trim($f.val());
                    if (fv !== '') {
                        if (fd.max !== null && parseFloat(fv) > fd.max) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal.max, fd.max));
                        }
                        if (fd.min !== null && parseFloat(fv) < fd.min) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal.min, fd.min));
                        }
                    }
                }
            }
        }
        if (msgs.length > 0) {
            return [i18nVal.intro, '<ul><li>', msgs.join('<li>'), '</li></ul>'].join('');
        } else {
            return '';
        }

        function typeCheck() {
            var ft = Evol.Dico.fieldTypes,
                fv = Evol.UI.trim($f.val());
            if (fv !== ''){
                switch (fd.type) {
                    case ft.integer:
                    case ft.email:
                        if (!evoRegEx[fd.type].test(fv)) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        }
                        break;
                    case ft.dec:
                        var myRegExp = evoRegEx[fd.type + Evol.i18n.LOCALE];
                        if (myRegExp === null) {
                            myRegExp = evoRegEx[fd.type + "EN"]; // default to English with "."
                        }
                        if (!myRegExp.test(fv))
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        break;
                    case ft.date:
                    case ft.datetime:
                    case ft.time:
                        if ((fv !== '') && (!_.isDate(new Date(fv)))) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        }
                        break;
                }
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
                v = Evol.UI.trim($f.val()) === '';
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
    DeleteEntity:'Delete {0} "{1}"?', // {0}=entity {1}=leadfield value
    Back2SearchResults:'Back to search results',
    nodata:'No data available.',
    nopix:'No picture.',
    nochart:'No charts available.',
    badchart:'The data structure doesn\'t allow for auto-generated charts.',

    // --- buttons ---
    Save:'Save',
    SaveAdd:'Save and Add Another',
    Cancel:'Cancel',
    NoChange:'No Change',
    NoX:'No {0}',

    // --- status ---
    status:{
        added:'New {0} "{1}" added.',
        updated:'{0} "{1}" updated.',
        deleted:'{0} "{1}" removed.'
    },

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

    // --- charts ---
    charts:{
        aByB:'{0} by {1}',
        aB:'{0}: {1}'
    },

    // --- export ---
    export:{
        ExportEntity: 'Export {0}', // {0}=entity
        ExportEntities: 'Export {0}', // {0}=entities
        ExportHeader: 'Header',
        ExportSeparator: 'Separator',
        ExportFirstLine:'First line for field names',
        ExportFormat: 'Export format',
        ExportFields: 'Fields to include in the export',
        IDkey: 'ID (Primary Key)',
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
    }

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
        //doc:'document',
        lov: 'lov',
        money: 'money',
        //formula:'formula',
        //html:'html',
        email: 'email',
        url: 'url',
        //pwd: 'password',
        color: 'color',
        hidden: 'hidden',
        //rating: 'rating',
        tag: 'tag'
        //widget: 'widget',
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

    // get sub collections
    getSubCollecs: function(uiModel){
        var ls = [];

        function collectCollecs(te) {
            if(te.type==='panel-list'){
                ls.push(te);
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls.push(te);
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls.push(te);
            }
        }

        collectCollecs(uiModel);

        return ls;
    },

    lovText:function(hash, f, v){
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
        return fType == EvoDico.fieldTypes.datetime || EvoDico.fieldTypes.date || fType==EvoDico.fieldTypes.time;
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

    cardinality: 'n',
    _hashLov: {},

    options: {
        style: 'panel-info',
        pageSize: 20,
        titleSelector: '#title',
        selectable: true
    },

    events: {
        'click .evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function (opts) {
        var that=this;
        this.options=_.extend(this.options, opts);
        this._filter=[];
        if(this.collection){
            this.collection.on('change', function(model){
                that.render();
            });
        }
        this._custOn=false;
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
                            case 'in':
                                want= _.contains(vf.split(','),fv);
                                break;
                            case 1:
                                want=fv;
                                break;
                            case 0:
                                want=!fv;
                                break;

                        }
                    }
                    return want;
                });
            }
            this._render(models);
        }else{
            this.$el.html(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
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
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
        }
        this._custOn=!this._custOn;
        return this;
    },

    setModel: function(model) {
        if(model && model.collection){
            this.collection = model.collection;
        }
        this.render();
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

    getFilter: function(filter){
        return this._filter;
    },

    //updateModel: function () {
    //    alert('updateModel');
    //},

    _updateTitle: function (){
        $(this.options.titleSelector).html(this.getTitle());
    },

    getTitle: function (){
        return Evol.UI.capFirstLetter(this.options.uiModel.entities);
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

    _HTMLField: function(f,v){
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
                        return Evol.Dico.lovText(this._hashLov, f, v);
                    //}
                }
                break;
            case fTypes.date:
            case fTypes.time:
            case fTypes.datetime:
                return Evol.UI.formatDateTime(v);
            case fTypes.pix:
                if (v.length) {
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
        var collec=this.collection,
            ft=Evol.Dico.fieldTypes;
        if(collec!==undefined){
            if(f.type==ft.text || f.type==ft.txtm || f.type==ft.email){
                collec.comparator = Evol.Dico.bbComparatorText(f.id);
            }else{
                collec.comparator = Evol.Dico.bbComparator(f.id);
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

        Evol.Dico.showDesigner(id, eType, $e);
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
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

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
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
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
                    if (i === 0) {
                        h.push('<div data-id="', cRow.id, '">',
                            '<h4><a href="#" id="fg-', f.id, '" class="evol-nav-id">');
                        if (icon) {
                            h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                        }
                        h.push(this._HTMLField(f,v),
                            '</a></h4></div>');
                    }else{
                        //h.push(Evol.UI.fieldLabel(f.id,f.label));
                        h.push('<div>', this._HTMLField(f,v),'</div>');
                    }
                }
                h.push('</div>');
            }
            h.push(Evol.UI.html.clearer);
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
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
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'chart',

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.options.style);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this._updateTitle();
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcharts: function (h, style) {
        var that=this,
            EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.options.uiModel,
            models = this.collection.models,
            chartFields = EvoDico.getFields(uiModel, function(f){
                return (f.type==fTypes.lov || f.type==fTypes.bool || f.type==fTypes.integer);
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
                    if(f.type==fTypes.lov){
                        //var lov=[];
                        //_.each(f.list, function(item){

                        //});
                        labels.push(EvoDico.lovText(that._hashLov, f,dataSetName)+' ('+g+')');
                        //labels.push(EvoDico.lovText(that._hashLov, f,dataSetName)+' ('+g+')');
                    }else{
                        labels.push(dataSetName+' ('+g+')');
                    }
                }
                var entityName=EvoUI.capFirstLetter(uiModel.entities);
                if(f.type==fTypes.lov){
                    h.push(EvoUI.Charts.Pie(Evol.i18n.getLabel('charts.aByB',entityName,f.label), data, labels, style));
                }else{
                    h.push(EvoUI.Charts.Bars(Evol.i18n.getLabel('charts.aB',entityName,f.label), data, labels, style));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(Evol.i18n.nochart, Evol.i18n.nochart));
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

var Evol = Evol || {};

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
                if(_.isFunction(icon) ){
                    h.push('<img class="evol-table-icon" src="pix/', icon(model), '">');
                }else if(icon!==''){
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

    getModel:function(model) {
        return this.model;
    },

    setUIModel: function(uimodel) {
        this.options.uiModel = uimodel;
        var d=this.getData();
        return this
            .render()
            .setData(d);
    },
    getUIModel: function(uimodel) {
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
            return Evol.UI.capFirstLetter(this.options.uiModel.entity);
        }
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
            case Evol.Dico.fieldTypes.integer:
                return parseInt($f.val(),10);
            case Evol.Dico.fieldTypes.decimal:
            case Evol.Dico.fieldTypes.money:
                return parseFloat($f.val());
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
                        h.push('<div class="input-group">', EvoUI.input.typeFlag('@'),
                            EvoUI.input.text(fid, fv, fld.maxlength), '</div>');
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
                case types.money:
                    h.push('<div class="input-group">', EvoUI.input.typeFlag('$'),
                        EvoUI.input.textInt(fid, fv), '</div>');
                    break;
                case types.bool:
                    h.push(EvoUI.input.checkbox(fid, fv));
                    break;
                case types.txtm:
                case types.html:
                    // fv = HttpUtility.HtmlEncode(fv);
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
                    if(fv!==''){
                        h.push('<img src="',fv,'" class="img-thumbnail">');
                    }else{
                        h.push('<p class="">',Evol.i18n.nopix,'</p>');
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

    _updateTitle: function (title){
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
            this.$el.trigger('validate'); // TODO decide if use 'view.validate'
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
        Evol.Dico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
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

var Evol = Evol || {};

Evol.ViewOne.Edit = Evol.ViewOne.extend({

    viewName: 'edit',
    prefix: 'oe',

    render: function () {
        var h = [];
        this.renderEdit(h);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
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

var Evol = Evol || {};

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
        var jsonStr=this.$el.children('textarea').val();
        return $.parseJSON(jsonStr);
    },

    setData: function (m) {
        this.$el.children('textarea')
            .val(JSON.stringify(m, null, 2));
        return this._updateTitle();
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
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

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
        this._renderEdit(h, mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    },

    _renderEdit: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            flds = this.getFields(),
            miniUIModel= {
                type: 'panel', class:'evol-mini-holder', label: Evol.UI.capFirstLetter(opts.uiModel.entity), width: 100,
                elements: flds
            };
        this.renderPanel(h, miniUIModel, 'evol-one-mini', mode);
        this._renderButtons(h, mode);
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

var Evol = Evol || {};

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate',
        'click #XP': 'click_download',
        'action > div': 'action_view'
    },

    options: {
        toolbar: true,
        defaultView: 'list',
        style: 'panel-info',
        display: 'tooltip', // tooltip, text, icon, none
        titleSelector: '#title',
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

    _group:false,

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.render();
        //this.$('[data-toggle]').tooltip();
        this.$('.dropdown-toggle').dropdown();//[data-toggle=
    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
        this._viewsIcon=this.$('.glyphicon-eye-open');
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
                link2h(id, label, icon, cardi, 'tooltip');
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list',Evol.i18n.All,'th-list');
        linkOpt2h('new',Evol.i18n.New,'plus');
        linkOpt2h('del',Evol.i18n.Delete,'trash','1');
        linkOpt2h('filter','Filter','filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('export','Export','cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            link2h('prev','','chevron-left','1');
            link2h('next','','chevron-right','1');
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">');

                h.push(beginMenu('views','eye-open'));
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
		if(this.viewsHash.cards){
			this.viewsHash.cards.render();
		}
        return this;
	},

	setView:function(viewName){
		var opts=this.options,
            $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config;

        var collec=this.model?this.model.collection:new opts.collectionClass();
        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this._isNew = true; // TODO model.isNew
            this.model=new opts.modelClass();
            this.model.collection=collec;
            this.newItem();
            this.curView.options.mode='new';
        }else{
            this._isNew = false;
            if($v.length){
            // -- view already exists and was rendered
                this.model=this.curView.model;
                this.curView=this.viewsHash[viewName];
                if(!this.isNew){
                    if(this.curView.setModel){
                        if(!this.curView.collection && m.collection){
                            this.curView.collection=this.model.collection;
                        }
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }
                    if(!this.model){
                        this.curView.collection=collec;
                    }
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
                // TODO fix that one
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: this.collection,
                    uiModel: opts.uiModel,
                    style: opts.style,
                    titleSelector: opts.titleSelector
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
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
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                }
                this.curView=vw;
                this.curViewName=viewName;
                this.viewsHash[viewName]=vw;
                if(this.curView._updateTitle){
                    this.curView._updateTitle(); // TODO fix: make public?
                }else{
                    //TODO better way
                    $(this.options.titleSelector).html(this.curView.getTitle());
                }
            }
        }
        this.setMode(viewName);
        return this;
	},

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('li');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                prevNext: this.$('[data-id="prev"],[data-id="next"]'),
                customize: this.$('a[data-id="customize"]').parent(),
                views: this.$('[data-id="views"]')
            };
        }
        return this._toolbarButtons;
    },

    setMode: function(mode){
        function oneMany(showOne, showMany){
            Evol.UI.setVisible(tbBs.ones, showOne);
            Evol.UI.setVisible(tbBs.manys, showMany);
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons();
            Evol.UI.setVisible(tbBs.customize,mode!='json');
            tbBs.prevNext.hide();
            Evol.UI.setVisible(tbBs.views, mode!=='export');
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
			if(this._isNew || mode==='export'){
                oneMany(false, false);
                if(this._isNew){

                }
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
            Evol.UI.setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='cards');
		}
	},

    showFilter: function(){
        if(!this._filters){
            var that=this,
                $ff=$(Evol.UI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
            this.$('.evo-toolbar').after($ff);
            this._filters = new Evol.ViewFilter({
                el:$ff,
                fields:Evol.Dico.getFields(this.options.uiModel)
            }).render();
            $ff.on('change.filter', function(){
                that.curView.setFilter(that._filters.val())
                    .render();
            });
        }
        return this;
    },

    showGroup: function(){
        this._group = true;
        this.curView.showGroup();
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

    saveItem: function(saveAndAdd){
        var that=this,
            vw=this.curView,
            msg=vw.validate();

        function fnSuccess(m){
            if (saveAndAdd) {
                that.newItem();
            }else{
                that.model=m;
                that._isNew=false;
                that.setMode('edit');
                vw.setModel(m);
            }
            vw._updateTitle();
        }

        if(msg===''){
            var entityName=Evol.UI.capFirstLetter(this.options.uiModel.entity);
            if(this._isNew){
                var collec=(this.model && this.model.collection)?this.model.collection:this.collection;
                if(collec){
                    collec.create(this.getData(), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage('Record saved.', Evol.i18n.getLabel('status.added',entityName,vw.getTitle()), 'success');
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
                this.model.set(this.getData());
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage('Record saved.', Evol.i18n.getLabel('status.updated',entityName,vw.getTitle()), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            this.setMessage('Invalid data.', msg, 'warning');
        }
        return this;
    },

    cancelItem: function(){

    },

    newItem: function(){
        var vw=this.curView;
        return vw.clear()
            ._updateTitle(Evol.i18n.getLabel('NewEntity', this.options.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var entityName=this.options.uiModel.entity,
            entityValue=this.curView.getTitle(),
            delModel=this.curView.model;
        // TODO good looking msgbox
        if (delModel && confirm(Evol.i18n.getLabel('DeleteEntity', entityName, entityValue))) {
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
                    that.setMessage('Record Deleted.', Evol.i18n.getLabel('status.deleted', Evol.UI.capFirstLetter(entityName), entityValue), 'success');
                },
                error:function(err){
                    alert('error');
                }
            });
        }
    },

    setMessage: function(title, content,style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            $msg.html('<strong>'+title+'</strong>'+content).show();
        }else{
            this.$el.prepend(Evol.UI.HTMLMsg(title, ' '+content, style));
        }
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        return this;
    },

    action_view: function(evt, actionId){
        if(actionId==='cancel'){

        }else{
            this.saveItem(actionId==='save-add');
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
            case 'new-field':
                Evol.Dico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'cards', 'export', 'json', 'new'
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
        this.setView(this._prevOne || 'edit');
        this.curView.setModel(m);
        // todo: change model for all views / or model event
    },

    click_download: function(evt){
        alert('Sorry, no demo server yet...');
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    evoLangXpt = Evol.i18n.export;

Evol.ViewExport = Backbone.View.extend({

    version: '0.0.1',

    events: {
        "change .evol-xpt-format": "click_format",
        'change input': 'click_preview', //[type="checkbox"],
        'click .evol-xpt-more': 'click_toggle_sel',
        'click #XP': 'click_submit'
        // TODO #tbrevol-xpt-format is a bug if change prefix...
    },

    options: {
        toolbar: true,
        model: null,
        uiModel: null,
        many: true,
        style: 'normal',
        prefix: 'tbr'
    },

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
            EvoUI = Evol.UI,
            opts = this.options,
            prefix = opts.prefix || '',
            fields = this.getFields();

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds"><fieldset>');
        //### list of columns to export #########################################
        h.push('<div class="evol-id">', EvoUI.fieldLabel('', evoLangXpt.ExportFields),
            //EvoUI.input.checkbox('showID','1'), '<label for="showID">', evoLangXpt.IDkey, '</label>',
            '</div>');
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
            EvoUI.input.select(fId,'evol-xpt-format', false, [
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
        h.push('<label>Export Preview</label><div class="evol-xpt-preview"></div>');

        h.push('</div>');
        // ## Samples
        //h.push(this._samples());
        // ## Download button
        h.push('<div class="evol-buttons form-actions">');
        h.push('<input class="btn btn-primary" id="XP" type="submit" value="',
            evoLangXpt.DownloadEntity.replace('{0}', this.options.uiModel.entities),
            '"/>');
        h.push('</div></div>');
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

    _preview: function (format) {
        var h=[];
        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
                fldsDomHash = {},
                prefix='#'+ this.options.prefix,
                useHeader = this.$(prefix+'FLH').prop('checked');

            h.push('<textarea class="Field evol-xpt-val form-control">');
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
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
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

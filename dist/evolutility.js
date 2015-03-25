/*   evolutility v0.4   */
/*   (c) 2015 Olivier Giulieri   */
/*   https://github.com/evoluteur/evolutility   */
/*! ***************************************************************************
 *
 * evolutility :: ui.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};
Evol.hashLov = {};
Evol.ViewAction = {};

Evol.UI = {

    // --- static html fragments ---
    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>',
        emptyOption: '<option value=""> - </option>',
        glyphicon: 'glyphicon glyphicon-',
        required: '<span class="evol-required">*</span>', // TODO replace by div w/ ":after" css for icon
        buttonClose: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
    },

    // --- field labels ---
    label: function (id, label) {
        return '<label for="'+id+'">'+label+'</label>';
    },
    fieldLabel: function (id, label) {
        return '<div class="evol-field-label">'+this.label(id, label)+'</div>';
    },
    fieldLabelSpan: function (id, label) {
        return '<span class="evol-field-label">'+this.label(id, label)+'</span>';
    },

    // --- input fields ---
    input: {

        text: function (id, value, fd, css) {
            var fCss= 'evo-field form-control ' + (css || ''),
                h = '<input type="text" id="'+id+'" value="'+value;
            if(value.indexOf('"')>-1){
                value=value.replace(/"/g,'\"');
            }
            if(fd) {
                // properties mapping to html attributes
                _.each(['id', 'min', 'max', 'maxlength', 'placeholder'], function (item) { // 'max-width', 'min-width',
                    if (!_.isUndefined(fd[item])) {
                        h+='" '+item+'="'+fd[item];
                    }
                });
                //other fields attributes
                if(fd.readonly){
                    h+='" disabled="disabled';
                }
                if(fCss){
                    h+='" class="'+fCss;
                }
            }
            h+='">';
            return h;
        },
        textInt: function (id, value, min, max) {
            // TODO validation on leave field
            // TODO textDec
            var h='<input class="evo-field form-control" type="number" id="'+id+'" value="'+value;
            if(!_.isUndefined(min)){
                h+='" min="'+min;
            }
            if(!_.isUndefined(max)){
                h+='" max="'+max;
            }
            h+='" maxlength="12">';
            return h;
        },
        textM: function (id, value, maxLen, height) {
            return '<textarea id="'+id+'" class="evo-field form-control" rows="'+height+'">'+value+'</textarea>';
                //(maxLen > 0) ? ('" onKeyUp="Evol.UI.Validation.fixLength(this,' + maxLen + ')') : '',
        },
        textMJSON: function (id, fVobj, height, disabled) {
            return '<textarea id="'+id+'" rows="'+height+'" class="evol-json evo-field form-control"'+(disabled?' disabled':'')+'>'+
                _.escape(JSON.stringify(fVobj, null, '\t'))+'</textarea>';
        },
        myType: function (type, id, value) {
            return '<input type="'+type+'" id="'+id+'" value="'+value+
                '" class="evo-field form-control" size="15">';
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
            return '<input type="color" id="'+id+'" value="'+value+'" size="15">';
        },
        colorBox: function (id, value, text) {
            return '<div class="evo-color-box" id="'+id+
                '" style="background-color:'+value+'" title="'+value+'">'+
                (text?'<span>'+text+'</span>':'')+'</div>';
        },

        checkbox: function (id, value) {
            return '<input type="checkbox" id="'+id+
                (value?'" checked="checked':'')+'" value="1">';
        },
        checkbox2: function (id, value, css) {
            return '<input type="checkbox" data-id="'+id+'" class="'+css+'"'+
                (value?' checked="checked"':'')+' value="1">';
        },
        checkboxLOV:function(fLOV){
            var h='';
            for(var i in fLOV){
                var lv=fLOV[i];
                h+='<input type="checkbox" id="'+lv.id+'" value="'+lv.id+'"/>'+
                    '<label for="'+lv.id+'">'+lv.text+'</label> ';
            }
            return h;
        },

        radio: function (fN, value, label, sel, id) {
            return '<label for="'+id+'"><input id="'+id+'" name="'+fN+'" type="radio" value="'+value+
                (sel?'" checked="checked':'')+'">'+label+'</label>&nbsp;';
        },
        lov: function (id, value, label, fLOV) {
            var h = '<select class="evo-field form-control" id="'+id+'"><option value="'+value+'" selected>'+label+'</option>';
            _.each(fLOV, function (f) {
                h+=this.option(f.id, f.text);//, f.id===value);
            });
            h+='</select>';
            return h;
        },

        img: function (id, value, css) {
            return '<img id="'+id+'" src="'+value.replace(/"/g,'\"')+(css?'" class="'+css:'')+'">';
        },

        hidden: function (id, value) {
            return '<input type="hidden" name="'+id+'" id="'+id+'" value="'+value.replace(/"/g,'\"')+'"/>';
        },
        selectBegin: function (id, css, emptyOption) {
            return '<select id="'+id+'" class="form-control '+css+'">'+(emptyOption?Evol.UI.html.emptyOption:'');
        },
        select:function (id, value, css, emptyOption, list) {
            return  this.selectBegin(id, css, emptyOption)+this.options(list, value)+'</select>';
        },

        option: function (id, text, selected) {
            return '<option value="'+id+(selected?'" selected':'"')+'>'+text+'</option>';
        },
        options: function (lovList, value) {
            var fnOpt = Evol.UI.input.option,
                opts='';
            _.each(lovList,function(f){
                if(f.id===value){
                    opts+='<option value="'+f.id+'" selected="selected">'+f.text+'</option>';
                }else{
                    opts+=fnOpt(f.id, f.text);
                }
            });
            return opts;
        }/*,

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

    // --- buttons ---
    button: function (id, label, css) {
        return '<button type="button" data-id="'+id+'" class="btn'+(css?' '+css:'')+'">'+label+'</button>';
    },
    buttonsIcon: function(id, cssGlyphIcon){
        return '<div data-id="'+id+'" class="glyphicon glyphicon-'+cssGlyphIcon+'" tabindex="0"></div>';
    },
    buttonsPlus: function(){
        return this.buttonsIcon('bPlus', 'plus-sign');
    },
    buttonsMinus: function(){
        return this.buttonsIcon('bMinus', 'minus-sign');
    },
    buttonsPlusMinus: function(){
        return this.buttonsPlus()+this.buttonsMinus();
    },/*
    buttonsPrev: function(){
        return this.buttonsIcon('bPrev', 'chevron-left');
    },
    buttonsNext: function(){
        return this.buttonsIcon('bNext', 'chevron-right');
    },*/

    // --- links ---
    link: function (id, label, url, target) {
        var h='<a class="evo-field" href="'+encodeURI(url);
        if(id){
            h+='" id="'+id;
        }
        if(target){
            h+='" target="'+target;
        }
        h+='">'+_.escape(label)+'</a>';
        return h;
    },
    linkEmail: function (id, email) {
        if(email){
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
        return '<i class="'+(css?css+' ':'')+Evol.UI.html.glyphicon+icon+'"></i>';
    },

    iconCustomize: function (id, type) {
        return Evol.UI.iconId(id, type, 'wrench');
    },

    iconId: function (id, type, icon) {
        return '<i class="'+Evol.UI.html.glyphicon+icon+'" data-id="'+id+'" data-type="'+type+'"></i>';
    },

    // --- menu ---
    menu: {
        hBegin: function (id, tag, icon){
            return '<'+tag+' class="dropdown" data-id="'+id+'">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+Evol.UI.icon(icon)+' <b class="caret"></b></a>'+
                '<ul class="dropdown-menu evo-dropdown-icons">';
        },
        hEnd: function(tag){
            return '</ul></'+tag+'>';
        },
        hItem: function(id, label, icon, cardi, style){
            var h='<li data-id="'+id;
            if(cardi){
                h+='" data-cardi="'+cardi;
            }
            if(style!=='label'){
                h+='" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="'+label;
            }
            h+='"><a href="javascript:void(0);" data-id="'+id+'">'+Evol.UI.icon(icon);
            if(style!=='tooltip'){
                h+='&nbsp;'+label;
            }
            h+='</a></li>';
            return h;
        }
    },

    // --- modal ---
    modal:{

        alert: function(title, msg){
            var $m=$(this.HTMLModal('alert', title, msg, [{
                    id:'ok',
                    text: Evol.i18n.bOK,
                    class: 'btn-primary'
                }]))
                .on('click', 'button', function(evt){
                    $m.remove();
                })
                .modal('show');
        },

        confirm: function(id, title, msg, callbacks, buttons){
            var $m=$(this.HTMLModal(id, title, msg, buttons))
                .on('click', 'button', function(evt){
                    var bId=$(evt.currentTarget).data('id');
                    if(callbacks && callbacks[bId]){
                        callbacks[bId]();
                    }
                    $m.remove();
                })
                .modal('show');
        },

        HTMLModal: function(id, title, msg, buttons) {
            var hButton = function(id, label, css){
                    return '<button data-id="'+id+'" type="button" class="btn '+css+'" data-dismiss="modal">'+label+'</button>';
                },
                h = '<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                    '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                    '<h4 class="modal-title">'+title+'</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+msg+'</div>'+
                    '<div class="modal-footer">';

            if(!buttons){
                buttons=[
                    {id:'cancel', text:Evol.i18n.bCancel, class:'btn-default'},
                    {id:'ok', text:Evol.i18n.bOK, class:'btn-primary'}
                ];
            }
            _.each(buttons, function(b){
                h+=hButton(b.id, b.text, b.class);
            });
            h+='</div></div></div></div>';
            return h;
        }

    },

    // --- panels ---
    HTMLPanelBegin: function (p, css) {
        return '<div data-pid="'+p.id+'" class="panel '+(p.css?p.css:css)+'">'+
            '<div class="panel-heading '+(p.csslabel? p.csslabel:'')+'">'+
            Evol.UI.icon('chevron-up', 'evol-title-toggle')+
            '<h3 class="panel-title">'+p.label+'</h3>'+
            (p.label2?'<div class="evol-subtitle">'+p.label2+'</div>' : '')+
            (p.help?'<p class="evo-panel-help">'+p.help+'</p>':'')+
            '</div>';
    },

    HTMLPanelEnd: function () {
        return '</div>';
    },

    HTMLEmptyPanel: function(id, css, style){
        return '<div class="'+css+' panel panel-'+style+'" data-id="'+id+'"></div>';
    },

    // --- status ---
    HTMLMsg: function (title, msg, style) {
        return '<div data-id="msg" class="evo-msg alert alert-'+(style || 'info')+
            ' alert-dismissable">'+this.html.buttonClose+
            '<strong>'+title+'</strong> <span>'+msg+'</span></div>';
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
        //if(collection.length===0){
            _.each(dataSet,function(d){
                collection.create(d);
            });
        //}
    },

    capitalize: function(word){ // TODO use _.str.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }
        return '';
    },

    trim: function(stringValue){ // TODO use _.trim(word);
        if(_.isString(stringValue) && stringValue!==''){
            return stringValue.replace(/^\s+|\s+$/g, '');
        }
        return '';
    },

    setVisible: function($e, visible){
        if(visible){
            $e.show();
        }else{
            $e.hide();
        }
    },

    cr2br: function(v){
        return v.replace(/[\r\n]/g, '<br>');
    },

    addRemClass: function ($e, doAdd, css) {
        if(doAdd){
            $e.addClass(css);
        }else{
            $e.removeClass(css);
        }
        return doAdd;
    }
};
;
/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    // same as d3.scale.category10() 
    colors:['1f77b4','ff7f0e','2ca02c','d62728','9467bd','8c564b','e377c2','7f7f7f','bcbd22','17becf'],

    _colorsList: function(nbColors){
        return this.colors.slice(0, nbColors).join(',');
    },

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return '<label class="evol-chart-title">'+
            title+'</label><img src="'+urlPix+'">';
    },

    Pie: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'390x200';
        var urlGoogleChart = this.URL+'?chd=t:'+data.join(',')+
        '&chco='+this._colorsList(data.length)+
            '&amp;chl='+labels.join('|')+
            '&amp;cht=p&amp;chs='+size;
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'360x200';
        var maxCount = _.max(data),
            urlGoogleChart = this.URL+'?chbh=a&amp;chs='+size+'&cht=bvg&chco='+this._colorsList(data.length)+'&chds=0,'+maxCount+
                '&amp;chd=t:'+data.join('|')+
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl='+labels.join('|');
        return this._HTML(label, urlGoogleChart, style);
    }

};

;
//   Evolutility Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility
//   (c) 2015 Olivier Giulieri

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
    bView:'View',
    bEdit:'Edit',
    bMini: 'Mini', // 'Quick Edit'
    // Login:'Login',
    bNew:'New',
    NewEntity:'New {0}', //'New Item',
    //NewUpload:'New Upload',
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
    bList:'List',
    bFilter: 'Filter',
    //bBubbles: 'Bubbles',
    bCards: 'Cards',
    bJSON: 'JSON',
    //bRefresh: 'Refresh',
    //bPrint:'Print',
    bSave:'Save',
    bSaveAdd:'Save and Add Another',
    bOK:'OK',
    bCancel:'Cancel',

    // --- msg & status ---
    saved: '{0} saved.',
    unSavedTitle: 'Changes pending',
    unSavedChanges: 'Do you want to save the changes you made to "{0}"?',
    warnNoSave: 'Your changes will be lost if you don\'t save them.',
    bNoSave: 'Don\'t Save',
    deleteX:'Delete {0}',// {0}=entity
    delete1:'Do you really want to delete the {0} "{1}"?', // {0}=entity {1}=leadfield value,
    deleteN: 'Delete {0} {1}?', // delete 5 tasks
    deleted1:'{0} deleted.', // {0}=entity ,

    notFound:'Item not found.',
    //this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity);
    notFoundMsg:'No {0} found.',
    notFoundMsgId:'No {0} found for ID="{1}".',

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
        email:'"{0}" must be a valid email formatted like "name@domain.com".',
        integer:'"{0}" must only use numbers.',
        decimal:'"{0}" must be a valid decimal numbers.',
        money:'"{0}" must be a valid number.',
        date:'"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2015".',
        datetime:'"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2015 10:30 AM".',
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
        bNewCond:'New filter condition',
        bAddCond:'Add condition',
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
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

// not a "virtual DOM" but an "abstract DOM"
Evol.Dico = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        fts={
            text: 'text',
            textml: 'textmultiline',
            bool: 'boolean',
            int: 'integer',
            dec: 'decimal',
            money: 'money',
            date: 'date',
            datetime: 'datetime',
            time: 'time',
            lov: 'lov',
            list: 'list', // many values for one field (behave like tags - return an array of strings)
            //html:'html',
            formula:'formula', // soon to be a field attribute rather than a field type
            email: 'email',
            pix: 'image',
            doc:'document',
            url: 'url',
            color: 'color',
            hidden: 'hidden'
            //json: 'json',
            //rating: 'rating',
            //widget: 'widget'
        };

return {

    fieldTypes: fts,

    fieldOneEdit: {// h, f, fid, fv, iconsPath
        field: function (h, f, fType, fid, fv) {
            h.push(uiInput[fType](fid, fv, f, null));
        },
        text: function (h, f, fid, fv) {
            h.push(uiInput.text(fid, fv, f, null));
        },
        textmultiline: function (h, f, fid, fv) {
            // fv = _.escape(fv);
            if (f.height === null) {
                f.height = 5;
            } else {
                var fHeight = parseInt(f.height, 10);
                if (fHeight < 1) {
                    f.height = 5;
                }
            }
            h.push(uiInput.textM(fid, fv, f.maxlength, f.height));
        },
        // html:
        boolean: function (h, f, fid, fv) {
            h.push(uiInput.checkbox(fid, fv));
        },
        integer: function (h, f, fid, fv) {
            h.push(uiInput.textInt(fid, fv, f.max, f.min));
        },
        decimal: function (h, f, fid, fv) {
            //todo
            h.push(uiInput.textInt(fid, fv, f.max, f.min));
        },
        money: function (h, f, fid, fv) {
            h.push('<div class="input-group">', uiInput.typeFlag('$'),
                uiInput.textInt(fid, fv), '</div>');
        },
        date: function (h, f, fid, fv) {
            h.push(uiInput.date(fid, fv));
        },
        datetime: function (h, f, fid, fv) {
            h.push(uiInput.dateTime(fid, fv));
        },
        time: function (h, f, fid, fv) {
            h.push(uiInput.time(fid, fv));
        },
        lov: function (h, f, fid, fv) {
            h.push(uiInput.select(fid, fv, '', true, f.list));
        },
        list: function (h, f, fid, fv) { // fv is an array. will use select2
            h.push('<div id="', fid, '" class="w-100 form-control"></div>');
        },
        email: function (h, f, fid, fv) {
            h.push('<div class="input-group">', uiInput.typeFlag(i18n.sgn_email),
                uiInput.text(fid, fv, f),
                '</div>');
        },
        url: function (h, f, fid, fv) {
            h.push(uiInput.text(fid, fv, f));
            //fv!==''?EvoUI.link(fid,'',fv):''
        },
        //doc: function(h, f, fid, fv, iconsPath){
        //},
        image: function(h, f, fid, fv, iconsPath){
            if(fv!==''){
                h.push('<img src="',(fv.substr(0, 2)==='..')?fv:iconsPath + fv,'" class="img-thumbnail">');
            }else{
                h.push('<p class="">',i18n.nopix,'</p>');
            }
            h.push(uiInput.text(fid, fv, f, null));
        },
        color: function(h, f, fid, fv){
            //h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
            h.push(uiInput.color(fid, fv));
        },
        hidden: function(h, f, fid, fv){
            h.push(uiInput.hidden(fid, fv));
        },
        formula: function(h, f, fid, fv){
            h.push('<div class="evol-ellipsis">'+uiInput.text(fid, fv, f, null)+'</div>');
        }
    },

    // -- list of operator and function for filters
    fieldConditions: {
        // filter functions take parameters fv=fieldValue, cv=condition value, cv2
        // -- equals
        'eq': function(fv, cv){
            return cv==fv;
        },
        // -- not equal
        'ne': function(fv, cv){
            return cv!=fv;
        },
        // -- > or after
        'gt': function(fv, cv){
            return fv>cv;
        },
        // -- < or before
        'lt': function(fv, cv){
            return fv<cv;
        },
        // -- between
        'bw': function(fv, cv, cv2){
            return !(cv>fv || fv>cv2);
        },
        // -- start w/
        'sw': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)===0;
        },
        // -- contains
        'ct': function(fv, cv){
            if(fv){
                return fv.toLocaleLowerCase().indexOf(cv)>-1;
            }
            return false;
        },
        // -- finish w/
        'fw': function(fv, cv){
            var l1=fv.length,
                l2=cv.length;
            if (l1<l2){
                return false;
            }else{
                return fv.toLocaleLowerCase().substring(l1-l2)===cv;
            }
        },
        // -- empty
        'null': function(fv, cv){
            return  fv=='' || _.isUndefined(fv);
        },
        // -- not null
        'nn': function(fv, cv){
            return !(_.isUndefined(fv) || fv=='');
        },
        // -- in []
        'in': function(fv, cv){
            return  _.contains(cv.split(','),fv);
        },
        // -- true
        '1': function(fv, cv){
            return fv;
        },
        // -- false
        '0': function(fv, cv){
            return !fv;
        }
    },

    viewIsOne: function(viewName){
        return viewName==='new' || viewName==='edit' || viewName==='view' || viewName==='json';
    },
    viewIsMany: function(viewName){
        return viewName==='list' || viewName==='cards' || viewName==='charts' || viewName==='bubbles';
    },

    fieldInCharts: function (f) {
        return (_.isUndefined(f.viewcharts) || f.viewcharts) && 
            (f.type===fts.lov || f.type===fts.bool || f.type===fts.int || f.type===fts.money);
    },

    isNumberType: function(fType){
        return fType===fts.int || fType===fts.dec || fType===fts.money;
    },
    isDateOrTimeType: function(fType){
        return fType === fts.date || fType === fts.datetime || fType === fts.time;
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
        switch(f.type) {
            case fts.bool:
                return $f.prop('checked');
            case fts.int:
                return parseInt($f.val(), 10);
            case fts.dec:
            case fts.money:
                return parseFloat($f.val());
            case fts.list:
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
    /*
     compactUI: function(uiModel){
         var uiM = _.extend({}, uiModel);
         // TODO makes panels 100% + create tabs
         return uiM;
     },
     */
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
                    var txt= _.escape(listItem.text);
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
/*
     showDesigner: function(id, type, $el, context){
         var css='evodico-'+type,
             //$('<div class="evodico-'+type+'"></div>'),
             model,
             uiModel=context.uiModel,
             f;
         //context.getFields(dico_field_ui);
         switch(type){
             case 'object':
                 //TODO
                 break;
             case 'field':
                 uiModel = uiModels.field;
                 f=context.getFieldsHash(uiModel)[id];
                 model = new Backbone.Model(f);
                 break;
             //case 'list':
             //case 'tab':
             case 'panel':
             //case 'panel-list':
                 uiModel = uiModels.panel;
                 f=context.uiModel.elements[0]; //TODO
                 model = new Backbone.Model(f);
                 break;
         }
         //$el.closest('.evol-fld').after($elDesModal);
         $('body').append($elDesModal);
         var $elDesModal=$(eUI.modal.HTMLModal('m'+id, 'Edit '+type+' '+ f.label, '<div class="'+css+'"></div>')),
         $elDes=$elDesModal.find('.'+css);
         var vw = new Evol.ViewOne.Edit({
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
             $elDesModal.modal('hide').remove();
         });

         $elDesModal.modal('show');

         return this;
     },
*/
    filterModels: function(models, filters){
        if(filters.length){
            // TODO pre-build function to avoid repeating loop
            return models.filter(function(model){
                var want=true,
                    fConds=Evol.Dico.fieldConditions;
                for(var i= 0, iMax=filters.length;i<iMax && want;i++){
                    if(want===false){
                        break;
                    }
                    var filter=filters[i],
                        vm=model.get(filter.field.value);// TODO use field.value(m) || field.id

                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    want=fConds[filter.operator.value](vm, filter.value.value, filter.value.value2); // vf2 is only used in "between" conditions
                }
                return want;
            });
        }
        return models;
    },

    HTMLField4Many: function(f, v, hashLov, iconsPath){
        switch(f.type){
            case fts.bool:
                if (v==='true' || v=='1') {
                    return eUI.icon('ok');
                }
                break;
            case fts.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                    //return Evol.Dico.lovText(f, iconPath+v, hashLov);
                    return Evol.Dico.lovText(f, v, hashLov, iconsPath);
                    //}
                }
                break;
            case fts.list:
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
            case fts.date:
                return eUI.formatDate(v);
            case fts.time:
                return eUI.formatTime(v);
            case fts.datetime:
                return eUI.formatDateTime(v);
            case fts.pix:
                if (v && v.length) {
                    //return uiInput.img(f.id, (v.substr(0, 2)==='..')?v:iconsPath + v, 'img-thumbnail');
                    return uiInput.img(f.id, iconsPath + v, 'img-thumbnail');
                }
                break;
            case fts.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            case fts.email:
                return eUI.linkEmail(f.id, v);
            case fts.url:
                return eUI.link(f.id, v, v, f.id);
            //case fts.color:
            //    return uiInput.colorBox(f.id, v, v);
            default:
                return v;
        }
        return '';
    },

    HTMLField4One: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h=[];
        // --- field label ---
        if(mode==='mini'){
            h.push('<div class="evol-mini-label">', this.HTMLFieldLabel(fld, mode),
                '</div><div class="evol-mini-content">');
        }else if(!skipLabel){
            h.push(this.HTMLFieldLabel(fld, mode || 'edit'));
        }
        // --- field value ---
        if(fld.readonly || mode==='view'){
            h.push('<div class="disabled evo-rdonly" id="',fid);
            if(fld.type===fts.textml && fld.height>1){
                h.push('" style="height:', fld.height, 'em;overflow-y: auto;');
            }
            h.push('">');
            switch (fld.type) {
                case fts.formula:
                    // TODO: in one.js or here?
                    h.push('<div id="',fid, '" class="form-control evol-ellipsis">',fld.formula(),'</div>');
                    break;
                case fts.color: // TODO is the color switch necessary?
                    //h.push(uiInput.colorBox(fid, fv), fv);
                    h.push('<div id="',fid, '" class="form-control">',fv,'</div>');
                    break;
                case fts.email:
                    h.push(eUI.linkEmail(fid, fv));
                    break;
                case fts.url:
                    h.push(eUI.link(fid, fv, fv, fid));
                    break;
                default:
                    h.push(this.HTMLField4Many(fld, fv, {}, iconsPath));
            }
            h.push('&nbsp;</div>');
        }else{
            Evol.Dico.fieldOneEdit[fld.type](h, fld, fid, fv, iconsPath);
        }
        if(mode==='mini'){
            h.push('</div>');
        }
        return h.join('');
    },

    HTMLFieldLabel: function (fld, mode) {
        var h=[];
        h.push('<div class="evol-field-label" id="', fld.id, '-lbl"><label class="control-label ',fld.csslabel?fld.csslabel:'','" for="', fld.id, '">',
            fld.label);
        if (mode != 'view' && fld.required){
            h.push(eUI.html.required);
        }
        if (fld.help && fld.help!==''){
            h.push(eUI.icon('question-sign', ''));
        }
        h.push('</label></div>');
        return h.join('');
    },

    HTMLFieldLink: function (id, fld, value, icon, noLink, route) {
        var h='';
        if(!noLink){
            h+='<a href="'+(route?route:'javascript:void(0);')+'" id="'+id+'" class="evol-nav-id">';
        }
        if(icon){
            h+='<img class="evol-many-icon" src="'+icon+'">';
        }/*
         if(_.isUndefined(value) || value===''){
         value='('+model.id+')';
         }*/
        h+=value;
        if(!noLink){
            h+='</a>';
        }
        return h;
    },

    bbComparator: function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA, modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    },

    sortingText: function(fid){
            //return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        return function(modelA, modelB) {
            if(modelA[fid]<modelB[fid]){
                return 1;
            }
            if(modelB[fid]<modelA[fid]){
                return -1;
            }
            return 0;
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
}();
;
/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View "many" for other ViewMany views to inherit from.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany = function() {

    var eUI = Evol.UI,
        eDico = Evol.Dico,
        i18n = Evol.i18n;

return Backbone.View.extend({

    viewName: 'Many',
    viewType: 'many',
    editable: false,
    cardinality: 'n',

    options: {
        style: 'panel-info',
        pageSize: 20,
        pageIndex: 0,
        autoUpdate: false,
        // router: ...
        //titleSelector: '#title',
        selectable: false,
        links: true,
        noDataString: i18n.nodata, //'No data to display.',
        iconsPath: 'pix/',
        fieldsetFilter: function (f) {
            return f.viewmany;
        }
    },

    events: {
        'click .evol-sort-icons>i': 'click_sort',
        'click .pagination>li': 'click_pagination',
        //'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    initialize: function (opts) {
        var lastSort = localStorage.getItem(opts.uiModel.id + '-sort'),
            that = this;

        _.extend(this, this.options, opts);
        this.mode = this.mode || '';
        this._filter = [];
        if (this.autoUpdate && this.collection) {
            // TODO set later if not specified yet
            this.collection.on('change', function () {
                that.render();
            });
        }
        if (!this.router) {
            this.$el.on('click', '.evol-nav-id', function (evt) {
                that.click_navigate(evt);
            });
        }
        //this._custOn=false;
        if (lastSort !== null) {
            var ls = lastSort.split('-'),
                f = this.getField(ls[0]);
            if (ls.length > 1 && !_.isUndefined(f)) {
                this.sortList(f, ls[1] === 'down', true, true);
            }
        }
    },

    render: function () {
        var models = this.collection.models;
        if (this.collection.length) {
            models = eDico.filterModels(models, this._filter);
            this._render(models);
        } else {
            this.$el.html(eUI.HTMLMsg(this.noDataString, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLbody: function (h, fields, pSize, icon, pageIdx, selectable) {
        var models = this.collection.models,
            model,
            r,
            rMin = (pageIdx > 0) ? pageIdx * pSize : 0,
            rMax = _.min([models.length, rMin + pSize]),
            ico = icon ? (this.iconsPath || '') + icon : null;

        if (rMax > 0) {
            var route = this.getItemRoute();
            for (r = rMin; r < rMax; r++) {
                model = models[r];
                this.HTMLItem(h, fields, model, ico, selectable, route);
            }
        }
    },

    _render: function (models) {
        alert('_render must be overwritten');
    },

    _HTMLField: function (f, v) {
        var that=this,
            fv;
        if(f.type==='formula'){
            fv = '<div class="disabled evo-rdonly evol-ellipsis">' +
                (this.model?f.formula(this.model):'') +
                '</div>';
        }else{
            fv = eDico.HTMLField4Many(f, v, Evol.hashLov, this.iconsPath || '');
            if (f.type === 'list') {
                return _.escape(fv);
            }
        }
        return fv;
    },

    _HTMLCheckbox: function (cid) {
        return eUI.input.checkbox2(cid, false, 'list-sel');
    },
    /*
     customize: function () {
         var labels = this.$('th>span');
         if(this._custOn){
            labels.find('i').remove();
         }else{
            labels.append(eUI.iconCustomize('id', 'field'));
         }
         this._custOn=!this._custOn;
         return this;
     },*/

    setCollection: function (collection) {
        this.collection = collection;
        return this.render();
    },

    getCollection: function () {
        return this.collection;
    },

    setFilter: function (filter) {
        this._filter = filter;
        return this;
    },

    getFilter: function () {
        return this._filter;
    },

    setTitle: function () {
        $(this.titleSelector).html(this.getTitle());
        return this;
    },

    getTitle: function () {
        return eUI.capitalize(this.uiModel.entities) + ' ' + this.viewName;
    },

    getFields: function () {
        if (!this._fields) {
            this._fields = eDico.getFields(this.uiModel, this.fieldsetFilter);
            this._fieldHash = {};
            var fh = this._fieldHash;
            _.each(this._fields, function (f) {
                fh[f.id] = f;
            });
        }
        return this._fields;
    },

    getField: function (fid) {
        if (!this._fieldHash) {
            this.getFields();
        }
        return this._fieldHash[fid];
    },

    setPage: function (pageIdx) {
        var h = [],
            fields = this.getFields(),
            pSize = this.pageSize,
            collecLength = this.collection.length,
            pSummary = this.pageSummary(pageIdx, pSize, collecLength);

        this._HTMLbody(h, fields, pSize, this.uiModel.icon, pageIdx, this.selectable);
        this._$body().html(h.join(''));
        h = [];
        this._HTMLpaginationBody(h, pageIdx, pSize, collecLength);
        this.$('.evo-pagination').html(h.join(''));
        this.$('.evo-many-summary').html(pSummary);
        this.pageIndex = pageIdx;
        this.$el.trigger('status', pSummary);
        return this;
    },

    getPage: function () {
        return this.pageIndex;
    },

    _$Selection: function () {
        return this.$('.list-sel:checked').not('[data-id="cbxAll"]');
    },

    getSelection: function () {
        if (this.selectable) {
            return _.map(this._$Selection().toArray(), function (cbx) {
                return $(cbx).data('id');
            });
        }
        return [];
    },

    setSelection: function (sel) {
        // - param: sel = array of ids like ['1','2']
        if (this.selectable) {
            if (sel.length > 0) {
                // TODO optimize and uncheck prev checked
                var selector = [];
                _.each(sel, function (id) {
                    selector.push('[data-mid=' + id + '] .list-sel');
                });
                this.$(selector.join(',')).prop('checked', true);
            }
        }
        return this;
    },

    pageSummary: function (pIdx, pSize, cSize) {
        if (cSize === 0) {
            return '';
        } else if (cSize === 1) {
            return cSize + ' ' + this.uiModel.entity;
        } else if (pSize >= cSize) {
            return cSize + ' ' + this.uiModel.entities;
        } else {
            var rangeBegin = (pIdx || 0) * pSize + 1, rangeEnd;
            if (pIdx < 1) {
                rangeEnd = _.min([pSize, cSize]);
            } else {
                rangeEnd = _.min([rangeBegin + pSize - 1, cSize]);
            }
            return i18n.range
                .replace('{0}', rangeBegin)
                .replace('{1}', rangeEnd)
                .replace('{2}', cSize)
                .replace('{3}', this.uiModel.entities);
        }
    },

    _HTMLpagination: function (h, pIdx, pSize, cSize) {
        if (cSize > pSize) {
            h.push('<ul class="evo-pagination pagination pagination-sm">');
            this._HTMLpaginationBody(h, pIdx, pSize, cSize);
            h.push('</ul>');
        }
    },

    _HTMLpaginationBody: function (h, pIdx, pSize, cSize) {
        if (cSize > pSize) {
            var nbPages = Math.ceil(cSize / pSize),
                pId = pIdx + 1,
                maxRange,
                bPage = function(id){
                    h.push('<li', pId===id?' class="active"':'',
                        ' data-id="', id, '"><a href="javascript:void(0)">', id, '</a></li>');
                },
                bPageRange = function(pStart, pEnd){
                    for (var i=pStart; i<=pEnd; i++) {
                        bPage(i);
                    }
                },
                bGap = function(){
                    h.push('<li class="disabled"><a href="javascript:void(0)">...</a></li>');
                };
            h.push('<li data-id="prev"',
                (pId===1)?' class="disabled"':'',
                '><a href="javascript:void(0)">&laquo;</a></li>');
            bPage(1);
            if(pId>4 && nbPages>6){
                if(pId===5){
                    bPage(2);
                }else{
                    bGap();
                }
                maxRange=_.min([pId+2, nbPages]);
                bPageRange(_.max([2, pId-2]), maxRange);
            }else{
                maxRange=_.min([_.max([5, pId+2]), nbPages]);
                bPageRange(2, maxRange);
            }
            if(maxRange<nbPages && pId+2<nbPages){
                bGap();
                bPage(nbPages);
            }
            h.push('<li data-id="next"',
                (nbPages > pId) ? '' : ' class="disabled"',
                '><a href="javascript:void(0)">&raquo;</a></li>');
        }
    },

    sortList: function (f, down, noRemember, noTrigger) {
        var collec = this.collection,
            ft = eDico.fieldTypes;
        if (!_.isUndefined(collec)) {
            var sel = this.getSelection();
            if (f.type == ft.text || f.type == ft.textml || f.type == ft.email) {
                collec.comparator = eDico.bbComparatorText(f.id);
            } else if (f.value) {
                collec.comparator = f.value;
            } else {
                collec.comparator = eDico.bbComparator(f.id);
            }
            collec.sort();
            if (down) {
                collec.models.reverse();
            }
            this.setPage(0);
            var direction = down ? 'down' : 'up';
            if (!noRemember) {
                localStorage.setItem(this.uiModel.id + '-sort', f.id + '-' + direction);
            }
            this.setSelection(sel);
            if (!noTrigger) {
                this.$el.trigger('sort.many', {id: f.id, direction: direction});
            }
        }
        return this;
    },

    getItemRoute: function () {
        var router = this.router,
            route = null;

        if (router) {
            route = '#' + this.uiModel.id + '/view/';
        }
        return route;
    },

    click_navigate: function (evt) {
        var id = $(evt.currentTarget).closest('[data-mid]').data('mid');
        evt.type = 'navigate.many';
        this.$el.trigger(evt, {id: id});
    },

    click_sort: function (evt) {
        var target = $(evt.currentTarget),
            fid = target.parent().data('fid'),
            f = this.getField(fid),
            down = target.attr('class').indexOf('-down') > 0;
        this.sortList(f, down);
        target.addClass('evol-last-sort');
    },

    click_pagination: function (evt) {
        this.$el.trigger('paginate.many', {id: $(evt.currentTarget).closest('li').data('id')});
    },
    /*
     click_customize: function (evt) {
         var $e=$(evt.currentTarget),
             id=$e.data('id'),
             eType=$e.data('type');

         eDico.showDesigner(id, eType, $e);
         this.$el.trigger(eType+'.customize', {id: id, type:eType});
     },
     */
    click_selection: function (evt) {
        //if($(evt.currentTarget).data('id')!=='cbxAll'){
        this.$el.trigger('selection.many');
        //}
    },

    click_checkall: function (evt) {
        var isChecked = this.$('[data-id="cbxAll"]').prop('checked');
        //this.$('.list-sel:checked').not('[data-id="cbxAll"]');
        this.$('.list-sel').prop('checked', isChecked);
        this.$el.trigger('selection.many');
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility :: many-cards.js
 *
 * View "many cards" to show a collection as many cards.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

    _render: function (models) {
        var h = [],
            pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        h.push('<div class="evol-many-cards"><div class="evol-cards-body">');
        this._HTMLbody(h, this.getFields(), pSize, this.uiModel.icon, 0, this.selectable);
        h.push('</div>', Evol.UI.html.clearer);
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', pSummary, '</div>',
            '</div>');
        this.$el.html(h.join(''));
        return this;
    },

    _$body: function(){
        return this.$('.evol-cards-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            fts = Evol.Dico.fieldTypes,
            link = (this.links!==false);

        h.push('<div class="panel ',this.style,'">');
        _.each(fields, function(f, idx){
            if(f.value){
                v = f.value(model);
            }else if(f.type===fts.color) {
                v = model.escape(f.attribute || f.id);
                v = Evol.UI.input.colorBox(f.id, v, v);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="', model.id, '">');
                // Item badge
                var bf=that.uiModel.badge;
                if(bf){
                    h.push('<span class="badge pull-right">');
                    if(_.isFunction(bf)){
                        h.push(bf(model));
                    }else if(_.isString(bf)){
                        h.push(model.escape(bf));
                    }
                    h.push('</span>');
                }
                // Item title
                h.push('<h4>',
                    selectable?that._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link, route?route+model.id:null),
                    '</h4></div>');
            }else{
                h.push('<div><label>', f.labelcards?f.labelcards:f.label,':</label> ', v, '</div>');
            }
        });
        h.push('</div>');
        return this;
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
 * View "many charts" to display a collection as a set of charts.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

// Quick and easy implementation w/ the old version of google charts
// must be re-written to use D3.js or other cool stuff

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'charts',

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        fieldsetFilter: Evol.Dico.fieldInCharts,
        autoUpdate: false
    },

    events: {
        'click .evo-chart-config': 'changeChartType'
        //'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        this.entityName=Evol.UI.capitalize(this.uiModel.entities);
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.style, this.sizes);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.$el.html(h.join(''));
        return this.setTitle();
    },

    _HTMLcharts: function (h, style, sizes) {
        var EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            i18n = Evol.i18n,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.uiModel,
            models = this.collection.models,
            iconsPath = this.iconsPath || '',
            chartFields = this.getFields(),
            chartType,
            cData={},
            entityName=this.entityName;

        if(chartFields && chartFields.length){
            var groups,
                lb;
            _.each(chartFields, function(f){
                var data=[],
                    labels=[],
                    nb, dataSetName,
                    isList=f.type===fTypes.lov || f.type===fTypes.list;

                if(f.type===fTypes.bool){
                    groups = _.countBy(models, function(m) {
                        return m.get(f.id)===true;
                    });
                    for(dataSetName in groups) {
                        nb=groups[dataSetName];
                        if(dataSetName==='true'){
                            lb = f.labeltrue || i18n.yes;
                        }else{
                            lb = f.labelfalse || i18n.no;
                        }
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }else{
                    groups = _.countBy(models, function(m) {
                        return m.get(f.id);
                    });
                    for(dataSetName in groups) {
                        nb=groups[dataSetName];
                        if(dataSetName==='undefined'){
                            lb = i18n.na;
                        }else if(dataSetName==='' || dataSetName==='null'){
                            lb = i18n.none;
                        }else if(isList){
                            if(f.list && f.list.length && f.list[0].icon){
                                lb = EvoDico.lovTextNoPix(f, dataSetName);
                            }else{
                                lb = EvoDico.lovText(f, dataSetName, Evol.hashLov, iconsPath);
                            }
                        }else{
                            lb = dataSetName;
                        }
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }
                chartType = f.typechart || (f.type===fTypes.lov ? 'pie':'bars');
                h.push('<div class="evol-chart-holder panel '+style+'">');
                h.push('<div class="glyphicon glyphicon-cog evo-chart-config pull-right" data-id="'+f.id+'" data-ctype="'+chartType+'"></div>');
                h.push('<div class="chart-holder">');
                cData[f.id] = {
                    field: f,
                    data: data,
                    labels: labels,
                    style: style,
                    sizes: sizes
                };
                if(chartType==='pie'){
                    h.push(EvoUI.Charts.Pie(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aByB', entityName, f.label), data, labels, style, sizes));
                }else if(chartType==='bars'){
                    h.push(EvoUI.Charts.Bars(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aB', entityName, f.label), data, labels, style, sizes));
                }
                h.push('</div><br></div>');
            });
            this._cData=cData;
        }else{
            h.push(EvoUI.HTMLMsg(i18n.nochart, i18n.badchart));
        }
        h.push(EvoUI.html.clearer);
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    },

    changeChartType: function(evt){
        var i18n = Evol.i18n,
            el=$(evt.currentTarget),
            id=el.data('id'),
            ctype=el.data('ctype'),
            chart=Evol.UI.Charts,
            oldData=this._cData[id],
            f=oldData.field,
            holder=el.parent().find('.chart-holder');
        if(ctype==='pie'){
            holder.html(chart.Bars(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aB', this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            el.data('ctype', 'bars');
        }else{
            holder.html(chart.Pie(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aByB', this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            el.data('ctype', 'pie');
        }
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View "many list" to display a collection as a list (table w/ sorting and paging).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',
    
    fieldsetFilter: function (f) {
        return f.viewmany || f.viewlist;
    },

    _render: function (models) {
        var h = [],
            that = this,
            fields = this.getFields(),
            pSize = this.pageSize || 50,
            link = (this.links!==false);

        h.push('<div class="evol-many-list">',
            '<table class="table table-bordered', link?' table-hover':'', '"><thead><tr>');
        if(this.selectable){
            h.push('<th class="list-td-sel">', this._HTMLCheckbox('cbxAll'), '</th>');
        }
        _.each(fields, function(field){
            that._HTMLlistHeader(h, field);
        });
        h.push('</tr></thead><tbody>');
        this._HTMLbody(h, fields, pSize, this.uiModel.icon, 0, this.selectable);
        h.push('</tbody></table>');
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', this.pageSummary(this.pageIndex, pSize, models.length), '</div>',
            '</div>');
        this.$el.html(h.join(''));
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            bf = that.uiModel.badge,
            link = (this.links!==false),
            ft = Evol.Dico.fieldTypes;

        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">', this._HTMLCheckbox(model.id), '</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===ft.color){
                v = Evol.UI.input.colorBox(f.id, model.escape(f.attribute || f.id));
            }else if(f.value){
                v = f.value(model);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if(idx===0){
                v = Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link, route?route+model.id:null);
                // Item badge
                if(bf){
                    v+='<span class="badge badge-list">';
                    if(_.isFunction(bf)){
                        v+=bf(model);
                    }else if(_.isString(bf)){
                        v+=model.escape(bf);
                    }
                    v+='</span>';
                }
            }
            if(f.type===ft.textml){
                h.push('<td class="evol-ellipsis">', v, '</td>');
            }else{
                h.push('<td>', v, '</td>');
            }
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, f) {
        h.push('<th><span id="', f.id, '-lbl">',
            f.labellist || f.labelmany || f.label);
        if(f.sortable!==false){
            h.push('<span class="evol-sort-icons" data-fid="', f.id, '">',
                Evol.UI.icon('chevron-up'),//'sort-by-alphabet'
                Evol.UI.icon('chevron-down'),//'sort-by-alphabet-alt'
                '</span>');
        }
        h.push('</span></th>');
    }

});

;
/*! ***************************************************************************
 *
 * evolutility :: one.js
 *
 * View "one" for other ViewOne views to inherit from.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        eDico = Evol.Dico,
        fts = eDico.fieldTypes;

return Backbone.View.extend({

    viewName: 'One',
    viewType:'one',
    cardinality: '1',
    editable: true,

    events: {
        'click .evol-buttons>button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click ul.evol-tabs>li>a': 'click_tab',
        'click label>.glyphicon-question-sign': 'click_help',
        //'click .glyphicon-wrench': 'click_customize',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel',
        'keyup [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    options: {
        style: 'panel-info',
        button_addAnother: false,
        titleSelector: '#title',
        iconsPath: 'pix/'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.mode = this.mode || this.viewName;
        this._tabId = false;
        this._uTitle = (!_.isUndefined(this.titleSelector)) && this.titleSelector!=='';
        this._subCollecs = this._subCollecsOK = false;
        /*
         if(this.model){
             this.model.on('change', function(model){
                that.setModel(model);
             });
         }*/
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
            this._fields=eDico.getFields(this.uiModel, this.fieldsetFilter);
            this._fieldHash={};
            var that=this;
            _.each(this._fields, function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getFieldsHash: function (){
        if(!this._fields){
            this.getFields();
        }
        return this._fieldHash;
    },

    getSubCollecs: function (){
        if(!this._subCollecsOK){
            this._subCollecs=eDico.getSubCollecs(this.uiModel);
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
                return i18n.getLabel('NewEntity', this.uiModel.entity);
            }
            var lf=this.uiModel.leadfield;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return eUI.capitalize(this.uiModel.entity);
        }
    },

    getData: function (skipReadOnlyFields) {
        var that = this,
            fs=this.getFields(),
            vs = {},
            subCollecs=this.getSubCollecs();

        if(skipReadOnlyFields){
            var fnNotReadOnly=function(f){
                return f.readonly!==true;
            };
            fs = _.filter(fs, fnNotReadOnly);
            subCollecs = _.filter(subCollecs, fnNotReadOnly);
        }
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
                        v[f.id]=eDico.getFieldTypedValue(f, cells.eq(idx).find('input,select,textarea').eq(0));
                    });
                    vs2.push(v);
                });
                vs[sc.attr||sc.id]=vs2;
            });
        }
        return vs;
    },

    setData: function (model, isModel) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                $f, fv,
                subCollecs=this.getSubCollecs(),
                iconsPath=this.iconsPath,
                newPix;

            _.each(this.getFields(), function (f) {
                $f=that.$field(f.id);
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
                        case fts.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            //$f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+i18n.nopix+'</p>'));
                            break;
                        case fts.textml:
                            $f.html(eUI.cr2br(fv));
                            break;/*
                        case fts.bool:
                        case fts.url:
                        case fts.email:
                            $f.html(eDico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                            break;*/
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        default:
                            $f.text(eDico.HTMLField4Many(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                    }
                }else{
                    switch(f.type) {
                        case fts.lov:
                            var $fc=$f.children().removeAttr('selected');
                            if(fv!==''){
                                $fc.filter('[value='+fv+']')
                                    .prop('selected', 'selected'); // FF need prop not attr
                            }
                            break;
                        case fts.bool:
                            $f.prop('checked', fv?'checked':false);
                            break;
                        case fts.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            break;
                        case fts.list:
                            $f.select2('val', fv);
                            break;
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        default:
                            $f.val(fv);
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, sc.readonly?'view':'edit');
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

    setDefaults: function(){
        var that=this;

        this.clear();
        _.each(this.getFields(), function(f){
            if(f.hasOwnProperty('defaultvalue')){
                that.setFieldValue(f.id, f.defaultvalue);
            }
        });
        return this;
    },

    //TODO standardize param type field & fid in set/get FieldValue method
    setFieldValue: function (fid, value){
        this.$field(fid)
            .val(value);
        return this;
    },

    getFieldValue: function (f){
        if(_.isString(f)){
            return eDico.getFieldTypedValue(this._fieldHash[f], this.$field(f));
        }else{
            return eDico.getFieldTypedValue(f, this.$field(f.id));
        }
    },

    setFieldProp: function(fid, prop, value){
        // TODO test and finish
        if(prop==='value'){
            this.setFieldValue(fid, value);
            //}else if(prop==='list' && f.type==='lov' || f.type==='list'){
            // TODO change options list
        }else{
            var $f=this.$field(fid);
            switch (prop){
                case 'enabled':
                    if(value){
                        $f.removeProp('disabled');
                    }else{
                        $f.prop('disabled', true);
                    }
                    break;
                case 'visible':
                    eUI.setVisible($f, value);
                    break;
            }
        }
        return this;
    },

    getFieldProp: function(fid, prop){
        // TODO test and finish
        if(prop==='value'){
            this.setFieldValue(fid, value);
        }else{
            var $f=this.$field(fid);
            switch (prop){
                case 'enabled':
                    return !$f.prop('disabled');
                case 'visible':
                    return $f.is(":visible");
                case 'valid':
                    // TODO this.validateField(f, v)
                    break;
            }
        }
    },

    $field: function (id){
        return this.$('#'+this.fieldViewId(id));
    },

    clear: function () {
        var that=this,
            $f,
            subCollecs=this.getSubCollecs(),
            defaultVal;

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f = that.$field(f.id);
            defaultVal = f.defaultvalue || '';
            if(f.readonly){
                $f.html(defaultVal);
            }else{
                switch(f.type) {
                    case fts.bool:
                        $f.prop('checked', defaultVal?'checked':false);
                        break;
                    case fts.list:
                        $f.select2('val', null);
                        break;
                    case fts.pix:
                        //var newPix=(defaultVal)?('<img src="'+iconsPath+defaultVal+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                        var newPix='<p>'+i18n.nopix+'</p>';
                        $f.val('')
                            .prev().remove();
                        $f.before(newPix);
                        break;
                    default:
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
        this._fieldHash = null;
        this._fields = null;
        this._subCollecs = this._subCollecsOK = false;
        return this;
    },

    getModelFieldValue: function(fid, fvDefault, mode){
        if(this.model && this.model.has(fid)){
            return (mode !== 'new') ? this.model.get(fid) : fvDefault || '';
        }
        return '';
    },
    /*
    isDirty: function(){
         // TODO not ready yet
         // TODO still needs work
         // diff of top level and subcollecs should use the same code
         function nullOrUndef(v){
            return v==='' || _.isUndefined(v) || v===null || v===false;
         }
         function emptyOrUndef(v){
            return v===null || _.isUndefined(v) || v===[];
         }
         if(this.editable){
             var fs= this.getFields(),
                 isNumType=eDico.isNumberType,
                 data=this.getData(),
                 model=this.model,
                 i,
                 iMax=fs.length,
                 subCollecs=this.getSubCollecs();

             for (i = 0; i < iMax; i++) {
                 var f=fs[i],
                     prop = f.attribute || f.id,
                     dataVal = data[prop],
                     modelVal = model.get(prop);

                 if(isNumType(f.type)){
                     if(isNaN(dataVal)){
                         if(!isNaN(modelVal)){
                            return true;
                         }
                     }else if(isNaN(modelVal)){
                        return true;
                     }
                 }else{
                     if(_.isArray(modelVal)){
                         if(!_.isEqual(modelVal, dataVal)){
                            return true;
                         }
                     }else{
                         if(nullOrUndef(dataVal)!==nullOrUndef(modelVal) || dataVal!==modelVal) {
                            return true;
                         }
                     }
                 }
             }
             if(subCollecs){
                 var scIds=Object.keys(subCollecs);
                    iMax=scIds.length;
                 // TODO improve when add sorting to panel-list
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
                             // - not using _.isEqual b/c ok if dataObj had less attributes than modelObj
                             var dObj = dVals[r],
                             mObj = mVals[r];
                             for(var j=0;j<fs2.length;j++) {
                                 var fid = fs2[j].id,
                                     dv=dObj[fid],
                                     mv=mObj[fid];
                                 if(nullOrUndef(dv)!==nullOrUndef(mv) || dv!==mv){
                                    return true;
                                 }
                             }
                         }
                     }
                 }
             }
         }
        return false;
    },*/

    _showTab: function (tabId) {
        var tab = this.$(tabId);
        if (tab.length > 0) {
            tab.siblings('.tab-pane').removeClass('active').hide();
            tab.addClass('active').show();
        }
        tab = this.$('.evol-tabs > li > a[href="' + tabId + '"]').parent();
        if (tab.length > 0) {
            tab.siblings('li').removeClass('active');
            tab.addClass('active')
                .show();
        }
        this._tabId = tabId;
        this.$el.trigger('change.tab', {id:tabId});
        return this;
    },

    _renderButtons: function (h, mode) {
        h.push(eUI.html.clearer,
            '<div class="evol-buttons panel panel-info">',
            eUI.button('cancel', i18n.bCancel, 'btn-default'),
            eUI.button('save', i18n.bSave, 'btn-primary'));
        if (this.model && this.model.isNew() && this.button_addAnother && mode!=='json') {
            h.push(eUI.button('save-add', i18n.bSaveAdd, 'btn-default'));
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
                    h.push(eUI.html.clearer);
                    that._renderTabs(h, elems);
                    h.push('<div class="tab-content">');
                }
                iTab++;
                h.push('<div id="evol-tab-', idx, '" class="tab-pane', (iTab === 0 ? ' active">' : '">'));
                that._renderTab(h, p, mode);
                if (iTab == iMax1) {
                    h.push('</div>');
                }
            }else{
                if (iPanel < 0) {
                    h.push('<div class="evol-pnls">');
                    iPanel = 1;
                }
                if(!p.id){
                    p.id='p'+idx;
                }
                if(p.type==='panel-list'){
                    that._renderPanelList(h, p, mode);
                }else{ // if(p.type==='panel')
                    that._renderPanel(h, p, mode);
                }
            }
        });
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
    },

    _renderTabs: function (h, tabs) {
        var isFirst = true;
        h.push('<ul class="nav nav-tabs evol-tabs">');
        _.each(tabs, function (tab, idx) {
            if (tab.type === 'tab') {
                if (isFirst) {
                    h.push('<li class="active ', tab.csslabel||'', '">');
                    isFirst = false;
                } else {
                    if(tab.csslabel){
                        h.push('<li class="', tab.csslabel, '">');
                    }else{
                        h.push('<li>');
                    }
                }
                h.push('<a href="#evol-tab-', idx, '">', tab.label, '</a></li>');
            }
        });
        h.push('</ul>');
    },

    _renderTab: function (h, tab, mode) {
        var that = this;
        h.push('<div class="evol-pnls ',tab.css||'','">');
        _.each(tab.elements, function (uip) {
            if (uip.type === 'panel-list') {
                that._renderPanelList(h, uip, mode);
            } else {
                that._renderPanel(h, uip, mode);
            }
        });
        h.push(eUI.html.clearer, '</div></div>'); // TODO 2 div?
    },

    _renderPanel: function (h, p, mode, visible) {
        var that = this,
            iconsPath = this.iconsPath;
        if(mode==='wiz'){
            var hidden= _.isUndefined(visible)?false:!visible;
            h.push('<div data-p-width="100" class="evol-pnl evo-p-wiz" style="width:100%;',hidden?'display:none;':'','">');
        }else{
            h.push('<div data-p-width="', p.width, '" class="evol-pnl');
            if(mode==='mini'){
                h.push(' evol-p-mini">');
            }else{
                h.push(' pull-left" style="width:', p.width, '%">');
            }
        }
        h.push(eUI.HTMLPanelBegin(p, this.style||'panel-default'),
            '<fieldset data-pid="', p.id, p.readonly?'" disabled>':'">');
        if(mode==='mini'){
            _.each(p.elements, function (elem) {
                if(elem.type==fts.hidden){
                    h.push(uiInput.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                }else{
                    h.push('<div class="pull-left evol-fld w-100">');
                    that.renderField(h, elem, mode, iconsPath);
                    h.push("</div>");
                }
            });
        }else{
            _.each(p.elements, function (elem) {
                if(elem.type=='panel-list'){
                    that._renderPanelList(h, elem, elem.readonly?'view':mode);
                }else{
                    if(elem.type==fts.hidden){
                        h.push(uiInput.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultvalue, mode)));
                    }else{
                        h.push('<div style="width:', parseInt(elem.width||100, 10), '%" class="pull-left evol-fld">');
                        that.renderField(h, elem, mode, iconsPath);
                        h.push("</div>");
                    }
                }
            });
        }
        h.push('</fieldset>',
            eUI.HTMLPanelEnd(),
            '</div>');
        return this;
    },

    _renderPanelList: function (h, p, mode) {
        var isEditable = p.readonly?false:(mode!=='view'),
            vMode=isEditable?mode:'view';

        h.push('<div style="width:', p.width, '%" class="evol-pnl pull-left" data-pid="', p.id, '">',
            eUI.HTMLPanelBegin(p, this.style),
            '<table class="table" data-mid="', (p.attribute || p.id), '"><thead><tr>');
        _.each(p.elements, function (elem) {
            h.push('<th>', elem.label, (isEditable && elem.required)?eUI.html.required:'', '</th>');
        });
        if(vMode==='edit'){
            h.push('<th></th>');
        }
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h, p, null, vMode);
        h.push('</tbody></table>',
            eUI.HTMLPanelEnd(),
            '</div>');
        return this;
    },

    _renderPanelListBody: function (h, uiPnl, fv, mode){
        var that=this,
            fs = uiPnl.elements,
            iconsPath=this.iconsPath || '',
            editable=mode==='edit' && !uiPnl.readonly;

        if(this.model){
            var vs = this.model.get(uiPnl.attribute);
            if(vs && vs.length>0){
                var TDbPM='<td class="evo-td-plusminus">'+eUI.buttonsPlusMinus()+'</td>';
                _.each(vs, function(row, idx){
                    h.push('<tr data-idx="', idx, '">');
                    if(editable){
                        that._TDsFieldsEdit(h, uiPnl.elements, row);
                        h.push(TDbPM);
                    }else{
                        _.each(fs, function (f) {
                            h.push('<td>');
                            if(row[f.id]){
                                //form-control
                                if(f.type===fts.bool || f.type===fts.lov){
                                    h.push(eDico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath));
                                }else{
                                    h.push(_.escape(eDico.HTMLField4Many(f, row[f.id], Evol.hashLov, iconsPath)));
                                }
                            }else{
                                h.push(_.escape(eDico.HTMLField4Many(f, '', Evol.hashLov, iconsPath)));
                            }
                            h.push('</td>');
                        });
                    }
                    h.push('</tr>');
                });
                return;
            }
        }
        h.push(this._TRnodata(fs.length||1, mode));
    },

    _TRnodata: function(colspan, mode){
        return '<tr data-id="nodata"><td colspan="'+(mode==='edit'?(colspan+1):colspan)+'" class="evol-pl-nodata">'+
            i18n.nodata+
            (mode==='edit'?eUI.buttonsPlus():'')+
            '</td></tr>';
    },

    _TDsFieldsEdit: function(h, fs, m){
        var fv,
            iconPath=this.iconPath;
        _.each(fs, function (f) {
            fv=m[f.id];
            if(_.isUndefined(fv)){
                fv='';
            }
            h.push('<td>', eDico.HTMLField4One(f, f.id, fv, 'edit-details', iconPath, true), '</td>');
        });
    },

    renderField: function (h, f, mode, iconsPath) {
        var fv='';
        if(this.model && this.model.has(f.id)){
            fv = (mode !== 'new') ? this.model.get(f.id) : f.defaultvalue || '';
        }
        if(f.type==='formula'){
            h.push(Evol.Dico.HTMLFieldLabel(f, mode || 'edit'));
            h.push('<div id="'+this.fieldViewId(f.id)+'" class="disabled evo-rdonly evol-ellipsis">'+
                (this.model?f.formula(this.model):'')+
                '</div>');
        }else{
            h.push(eDico.HTMLField4One(f, this.fieldViewId(f.id), fv, mode, iconsPath));
        }
        return this;
    },

    setTitle: function (title){
        if(this._uTitle){
            var selector=this.titleSelector;
            if(selector && selector!==''){
                var t,
                    lf=this.uiModel.leadfield;
                if(title){
                    t=title;
                }else if((!_.isUndefined(lf)) && lf!==''){
                    t=this.getTitle();
                }else{
                    t=eUI.capitalize(this.uiModel.entities);
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
        errMsgs = this._checkFields(fs, data);
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
                        if(that.validateField(f, rowData[f.id])){
                            trs.eq(idx).find('#'+f.id).parent().addClass('has-error');
                            scInvalid++;
                        }
                    });
                });
                if(scInvalid>0){
                    var pMsg='validation.invalidList'+((scInvalid===1)?'1':'');
                    pMsg=i18n.getLabel(pMsg, scInvalid, sc.label);
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

    _checkFields: function (fds, values) {
        var that = this,
            msgs = [],
            msg1;

        function flagField(fd, msg) {
            if(_.isArray(msgs)){
                msgs.push(msg);
            }
            var p=that.$field(fd.id).parent();
            if(fd.type===fts.email){
                p=p.parent();
            }
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
                flagField(f, msg1);
            }
        });

        return msgs;
    },

    validateField: function(f, v){
        var i18nVal = i18n.validation,
            numberField = eDico.isNumberType(f.type);

        function formatMsg(fLabel, msg, r2, r3){
            return msg.replace('{0}', fLabel)
                .replace('{1}', r2)
                .replace('{2}', r3);
        }

        if(!f.readonly){

            // Check required and empty
            if (f.required && (v==='' ||
                    (numberField && isNaN(v)) ||
                    (f.type===fts.lov && v==='0') ||
                    (f.type===fts.list && v.length===0) ||
                    (f.type===fts.color && v==='#000000'))){
                return formatMsg(f.label, i18nVal.empty);
            } else {

                // Check field type
                if( !(isNaN(v) && numberField)) {
                    if (v !== '' && !_.isArray(v)){
                        switch (f.type) {
                            case fts.int:
                            case fts.email:
                                if (!this.valRegEx[f.type].test(v)) {
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case fts.dec:
                            case fts.money:
                                var regex = this.valRegEx[fts.dec + i18n.LOCALE] || this.valRegEx[fts.dec + 'EN'];
                                if (!regex.test(v)){
                                    return formatMsg(f.label, i18nVal[f.type]);
                                }
                                break;
                            case fts.date:
                            case fts.datetime:
                            case fts.time:
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

                // Check min & max
                if (numberField) {
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

            // Check custom validation
            if (f.customvalidation) {
                var fValid = f.customvalidation(f, v);
                if (fValid !== '') {
                    return formatMsg(f.label, fValid);
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

    // - Remove validation error alerts
    clearErrors: function () {
        this.$('.control-group.error').removeClass("control-group error");
        //this.$('.evol-warn-error').remove();
        this.$('.has-error').removeClass('has-error');
        this.$('.text-danger').remove();
        return this;
    },

    // - return DOM field ID (each view use a different prefix)
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
                 $el.append(eUI.iconCustomize(id,'field'));
             });
             this.$(panelSelector).append(eUI.iconCustomize('id','panel'));
             this.custOn=true;
         }
         return this;
     },*/

    // - Show help below field(s)
    showHelp: function(id, type, $el, forceOn){
        var fld = _.findWhere(this.getFields(), {id:id}),
            $f,
            $fh;

        if(fld && fld.help){
            $f=$el.closest('.evol-fld');
            $fh=forceOn?[]:$f.find('.help-block');
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
     },*/

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
        this._showTab(tabId);
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
        this.$el.trigger('toggle.panel');
    },

    click_tab: function (evt) {
        var href = evt.currentTarget.href,
            id = href.substring(href.indexOf('#'));
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if(evt.shiftKey){
            this.$('.tab-content > div').show();
        }else{
            this._showTab(id);
        }
        this._tabId = id;
    },

    click_help: function (evt) {
        // -- show/hide help on one specific field / all fields
        var id='none',
            $e=$(evt.currentTarget),
            eType=$e.data('type');

        evt.stopImmediatePropagation();
        // --- show/hide ALL help tips
        if(evt.shiftKey){
            var that=this,
                mustAdd=!this._allHelp;

            if(mustAdd){
                this.$('.evol-fld>.help-block').remove();
                this._allHelp=true;
                id='all';
            }
            _.each(this.getFields(), function(f){
                if(f.help){
                    var $f=that.$field(f.id);
                    that.showHelp(f.id, f.type, $f, mustAdd);
                }
            });
            this.$el.trigger(eType+'.help', {id: id});
            // --- show/hide one help tip
        }else{
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
         eDico.showDesigner(id, eType, $e, this);
         this.$el.trigger(eType+'.customize', {id: id, type:eType});
     },
     */
    click_detailsAddDel: function(evt){
        // -- add/remove row in panel-list (subcollection)
        var $target=$(evt.currentTarget),
            bId=$target.data('id'),
            tr=$target.closest('tr');

        if(evt.keyCode && evt.keyCode!==13){
            return;
        }
        evt.stopImmediatePropagation();
        if(bId==='bPlus'){
            // - Add row to details
            var h=[],
                subCollecs=this.getSubCollecs(),
                mid=tr.closest('table').data('mid'),
                elems=(subCollecs[mid])?subCollecs[mid].elements:null;
            h.push('<tr>');
            this._TDsFieldsEdit(h, elems, {});
            h.push('<td class="evo-td-plusminus">',
                eUI.buttonsPlusMinus(),
                '</td></tr>');
            $(h.join('')).insertAfter(tr);
            if(tr.data('id')==='nodata'){
                tr.remove();
            }
        }else if(bId==='bMinus'){
            // - Remove row from details
            if(tr.siblings().length===0){
                $(this._TRnodata(tr.children().length, 'edit'))
                    .insertAfter(tr);
            }
            tr.remove();
        }
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility :: one-edit.js
 *
 * View "one edit" to edit one backbone model.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
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
 * View "one json" to edit one backbone model in JSON.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.JSON = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button'
    },

    viewName: 'json',

    render: function () {
        var h = [],
            eUI=Evol.UI;
        if(this.model){
            var jsonStr=JSON.stringify(this.model, null, 2);

            h.push(
                eUI.label('uimjson', 'JSON'),
                eUI.input.textMJSON('uimjson', jsonStr, 16));
            this._renderButtons(h, 'json');
        }else{
            h.push(eUI.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.$el.html(h.join(''));
        this.setData(this.model);
        //this.custOn=false;
        return this;
    },

    validate: function () {
        var isValid=true,
            data=this.getData(),
            $fp=this._getDOMField().parent();

        //this.clearMessages();
        isValid=!Evol.UI.addRemClass($fp, data===null, 'has-error');
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
 * View "one mini" to "quick edit" one backbone model (only showing important or required fields).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Mini = Evol.ViewOne.Edit.extend({

    events: { // TODO same as ViewOne ?
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
        'click label > .glyphicon-question-sign': 'click_help'
        // extra evt for $(window) resize
    },

    viewName: 'mini',
    prefix: 'om',

    fieldsetFilter: function(f){
        return (f.required || f.viewmany || f.viewmini) && f.type!='formula';
    },

    _render: function (h, mode) {
        // EDIT and VIEW forms
        var miniUIModel= {
            type: 'panel',
            class:'evol-mini-holder',
            label: Evol.UI.capitalize(this.uiModel.entity),
            width: 100,
            elements: this.getFields()
        };
        
        this._renderPanel(h, miniUIModel, mode);
        this._renderButtons(h, mode);
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: one-view.js
 *
 * View "one view" to browse one model in readonly mode.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
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
                fts = Evol.Dico.fieldTypes,
                HTMLField4Many = Evol.Dico.HTMLField4Many,
                $f, fv,
                prefix='#'+ that.prefix + '-',
                subCollecs=this.getSubCollecs(),
                iconsPath=this.iconsPath||'';
            _.each(this.getFields(), function (f) {
                $f=that.$(prefix + f.id);
                if(f.value){
                    fv=f.value(model);
                }else{
                    fv=model.get(f.attribute || f.id);
                }
                if(model){
                    switch(f.type){
                        case fts.lov:
                        case fts.bool:
                        case fts.email:
                        case fts.url:
                        case fts.html:
                            $f.html(HTMLField4Many(f, fv, Evol.hashLov, iconsPath));
                            break;
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        case fts.pix:
                            $f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        case fts.textml:
                            if(fv){
                                $f.html(_.escape(fv).replace(/[\r\n]/g, '<br>'));
                            }else{
                                $f.html('');
                            }
                            break;
                        default:
                            $f.text(HTMLField4Many(f, fv, Evol.hashLov, iconsPath) || ' ');
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
            fts = Evol.Dico.fieldTypes,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case fts.bool:
                    $f.prop('checked', f.defaultvalue?'checked':false);
                    break;
                case fts.pix:
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
            '<div class="evol-buttons panel panel-info">',
            Evol.UI.button('cancel', Evol.i18n.bCancel, 'btn-default'),
            Evol.UI.button('edit', Evol.i18n.bEdit, 'btn-primary'),
            '</div>');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility :: action-export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewAction.Export = function(){

    var eUI = Evol.UI,
        eDico = Evol.Dico,
        fts = eDico.fieldTypes,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        i18nXpt = i18n.export;

    var EvoExport = {

        optEntityName: function(id,label,entity){
            return eUI.fieldLabel(id, label) +
                uiInput.text(id, entity.replace(/ /g, '_'), 30) +
                '<br>';
        },

        optsXML: function(entity){
            return this.html_more2(i18nXpt.options)+
                this.optEntityName('elementName', i18nXpt.XMLroot, entity)+
                '</div>';
        },

        optsSQL: function(entity){
            return this.html_more2(i18nXpt.options)+
                this.optEntityName('table', i18nXpt.SQLTable, entity)+
                '<div>'+uiInput.checkbox('insertId', '0')+eUI.fieldLabelSpan('insertId', i18nXpt.SQLIdInsert)+'</div>'+
                '<div>'+uiInput.checkbox('transaction', '0')+eUI.fieldLabelSpan('transaction', i18nXpt.SQLTrans)+'</div>'+
                '</div>';
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

return Backbone.View.extend({

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
        formats: ['CSV', 'TAB', 'HTML', 'JSON', 'XML', 'SQL']
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        return this;
    },

    render: function(){
        this.$el.html(this._renderHTML());
        this._preview(this.formats[0]);
        return this;
    },

    _renderHTML: function () {
        var h = [],
            formats = this.formats,
            fields = this.getFields(),
            iMax = fields.length,
            useMore = iMax > 14;

        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds">',
            '<div><label>', i18nXpt.xpFields, '</label></div>',
            '<fieldset class="checkbox">'
        );

        //### list of columns to export #########################################
        h.push('<div><label><input type="checkbox" value="1" id="showID">', i18nXpt.IDkey, '</label></div>');
        _.each(fields, function(f, idx){
            var fLabel = f.labelexport || f.label || f.labellist,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><label><input type="checkbox" value="1" id="', fID, '" checked="checked">', fLabel, '</label></div>');
            if (idx === 10 && useMore){
                h.push(EvoExport.html_more2(i18nXpt.allFields));
            }
        });
        if (useMore){
            h.push('</div>');
        }
        h.push('</fieldset></div><div class="evol-xpt-para">');
        //##### export formats ########################################
        var fId = 'evol-xpt-format',
            formatsList = _.map(formats, function(format){
                    return {
                        id: format,
                        text: i18nXpt['format'+format]
                    };
                });
        h.push('<label for="', fId, '">', i18nXpt.format, '</label>');
        h.push(uiInput.select(fId, '', 'evol-xpt-format', false, formatsList));
        fId = 'xptFLH';
        h.push('<div class="evol-xpt-opts">',
            //# field (shared b/w formats - header #######
            '<div class="evol-FLH clearfix">',
            '<label>', uiInput.checkbox(fId, true), i18nXpt.firstLine, '</label>',
            //##### CSV, TAB - First line for field names #######
            '</div><div id="xptCSV">',
            //# field - separator
            //# - csv - any separator #######
            '<div data-id="csv2" class="evol-w120">',
            eUI.fieldLabel('separator', i18nXpt.separator),
            uiInput.text('separator', ',', '0'),
            '</div>', // </div>
        '</div>');
        _.each(formats, function(f){
            h.push('<div id="xpt', f, '" style="display:none;"></div>');
        });
        h.push('</div>',
            //# Preview #######
            '<label>',i18nXpt.preview,'</label><div class="evol-xpt-preview">',
            // ## Samples
            '<textarea class="evol-xpt-val form-control"></textarea>',
            '</div></div></div></div>',
            // ## Download button
            '<div class="evol-buttons form-actions">',
                eUI.button('cancel', i18n.bCancel, 'btn-default'),
                eUI.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.entities), 'btn btn-primary'),
            '</div>'
        );
        return h.join('');
    },

    setModel: function(model){
        this.model = model;
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
        var divOpts = this.$('#xpt' + xFormat).show()
            .siblings().hide();
        var $e1 = divOpts.filter('.evol-FLH');
        eUI.setVisible($e1, xFormat==='TAB' || xFormat==='CSV' || xFormat==='HTML');
    },

    getFields: function (){
        if(!this.fields){
            this.fields=eDico.getFields(this.uiModel);
        }
        return this.fields;
    },

    getTitle: function(){
        var keyEnd=this.many?'ies':'y';
        return i18n.getLabel('export.ExportEntit'+keyEnd, this.uiModel['entit'+keyEnd]);
    },

    _preview: function (format) {
        this.$('.evol-xpt-val').html(this.exportContent(format));
    },

    exportContent: function(format){
        var h=[],
            maxItem = this.sampleMaxSize-1;

        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'), //_valFields
                fldsDomHash = {},
                useHeader = this.$('#xptFLH').prop('checked'),
                showID = this.$('#showID').prop('checked');

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
                    var sep = eUI.trim(this.$('#separator').val());
                    if(format=='TAB'){
                        sep='&#09;';
                    }
                    // -- header
                    if (useHeader) {
                        if(showID){
                            h.push('ID', sep);
                        }
                        _.each(flds, function(f, idx){
                            h.push(f.label);
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        if(showID){
                            h.push(m.id, sep);
                        }
                        _.each(flds, function(f, idx){
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fts.bool){
                                    h.push(mv);
                                    //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fts.text || f.type==fts.textml) && (mv.indexOf(',')>-1)){ // || f.type==fts.list
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
                    // -- header
                    h.push('<table>\n');
                    if (useHeader) {
                        h.push('<tr>\n');
                        if(showID){
                            h.push('<th>ID</th>');
                        }
                        _.each(flds, function(f){
                            h.push('<th>', f.label, '</th>');
                        });
                        h.push('\n</tr>\n');
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        h.push('<tr>\n');
                        if(showID){
                            h.push('<td>', m.id, '</td>');
                        }
                        _.each(flds, function(f){
                            var mj = m.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h.push('<td>', mj, '</td>');
                            } else {
                                h.push('<td></td>');
                            }
                        });
                        h.push('\n</tr>\n');
                        return idx<maxItem;
                    });
                    h.push('</table>\n');
                    break;
                case 'JSON':
                    var propList= _.map(flds, function(f){
                        return f.id;
                    });
                    if(showID){
                        propList.unshift('id');
                    }
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    break;
                case 'SQL':
                    var optTransaction = this.$('#transaction').prop('checked'),
                        optIdInsert = this.$('#insertId').prop('checked'),
                        sqlTable = this.$('#table').val().replace(/ /g,'_'),
                        sql = ['INSERT INTO ', sqlTable, ' ('];

                    if(sqlTable===''){
                        sqlTable = this.uiModel.entity.replace(/ /g,'_');
                    }
                    if(showID){
                        sql.push('ID, ');
                    }
                    _.each(flds, function(f,idx){
                        sql.push(f.id);
                        if(idx<fMax){
                            sql.push(', ');
                        }
                    });
                    sql.push(')\n VALUES (');
                    sql = sql.join('');
                    // -- options
                    if(optTransaction){
                        h.push('BEGIN TRANSACTION\n');
                    }
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ', sqlTable, ' ON;\n');
                    }
                    // -- data
                    var fValue;
                    _.every(data, function(m, idx){
                        h.push(sql);
                        if(showID){
                            h.push('"', m.id, '", ');
                        }
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fts.int:
                                case fts.dec:
                                case fts.money:
                                    h.push(fValue?fValue:'NULL');
                                    break;
                                case fts.bool:
                                    h.push((typeof fValue === 'boolean')?fValue:'NULL');
                                    break;
                                case fts.date:
                                case fts.datetime:
                                case fts.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                                    break;
                                case fts.list:
                                    if(_.isUndefined(fValue) || fValue===''|| (_.isArray(fValue) && fValue.length===0)){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', eDico.HTMLField4Many(f, fValue, Evol.hashLov, '').replace(/"/g, '""'), '"');
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
                    // -- options
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
                        if(showID){
                            h.push('ID="', m.id, '" ');
                        }
                        _.each(flds, function(f){
                            h.push(f.id, '="');
                            if(f.type===fts.text || f.type===fts.textml){
                                fv=m.get(f.id);
                                if(!_.isArray(fv) && !_.isUndefined(fv)){
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
            h.push(i18n.nodata);
        }
        if(format==='JSON' && this.many){
            return '['+h.join(',\n')+']';
        }
        return h.join('');
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
                if($f.attr('type')==='checkbox'){
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

}();
;
/*! ***************************************************************************
 *
 * evolutility :: action-filter.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */


Evol.ViewAction.Filter = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        fts = Evol.Dico.fieldTypes,
        evoLang = Evol.i18n.filters,
        fOps = {
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

return Backbone.View.extend({

    viewName: 'filter',

    events: {
        'click .evo-bNew': 'click_new',
        'click .evo-bAdd':'click_add',
        'click .evo-bSubmit':'click_submit',
        'click .evo-zfilters>a>button':'click_remove',
        'click .close': 'click_close'
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
        _.extend(this, this.options, opts);
        // - if no fields are provided, then get them from the uiModel
        if(this.fields.length<1 && this.uiModel){
            this.fields = _.map(Evol.Dico.getFields(this.uiModel, function(f){
                    return f.type!==fts.hidden;
                }),
                function(f){
                    if(f.type!==fts.list){
                        return f;
                    }else{
                        return _.extend({}, f, {
                            type: fts.lov,
                            trueType: fts.list
                        });
                    }
                });
        }
        return this;
    },

    render: function(){
        var bLabels=this.buttonLabels,
            that=this,
            e=this.$el,
            h=[];

        h.push(Evol.UI.html.buttonClose+'<div class="evo-zfilters"></div>',
            '<a class="evo-bNew btn btn-primary" href="javascript:void(0)">',evoLang.bNewCond,'</a>');
        if(this.submitButton){
            h.push('<a class="evo-bSubmit btn btn-primary" href="javascript:void(0)">',evoLang.bSubmit,'</a>');
        }
        h.push('<div class="evo-editFilter"></div>',
            '<a class="evo-bAdd btn btn-primary" style="display:none;" href="javascript:void(0)">',evoLang.bAddCond,'</a>',
            '<a class="evo-bDel btn btn-default" style="display:none;" href="javascript:void(0)">',evoLang.bCancel,'</a>');
        this._step=0;
        //this._renderMenu(h);
        e.html(h.join(''));
        if(this.submitReady){
            this._hValues=$('<span></span>').appendTo(e);
        }
        // - button submit
        if(this.submitButton){
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
                    if(fType===fts.lov || fType===fts.bool){
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
                    valid=(value!=='') || type===fts.lov || type===fts.bool;
                if(type=='number'){ // extra type for compatibility w/ another component
                    valid=valid && !isNaN(value);
                }else if(that._operator==fOps.sBetween){
                    valid=that._editor.find('#value').val()!=='' && that._editor.find('#value2').val()!=='';
                }
                if(valid){
                    that._bAdd.button('enable');
                    if(evt.which===13){
                        that._bAdd.trigger('click');
                    }
                }else{
                    that._bAdd.button('disable');
                }
            }).on('click', '#checkAll', function(){
                var $this=$(this);
                eUI.toggleCheckbox($this.siblings(), $this.prop('checked'));
            });
        this._filters=e.find('.evo-zfilters').on('click', 'a', function(){
            that._editCond($(this));
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
         var mn=eUI.menu;

         h.push(
             mn.hBegin('file', 'div', 'cog'),
             mn.hItem('save', 'Save', '', 1),
             mn.hItem('open', 'Open', '', 1),
             mn.hEnd('div')
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
        this._enableCond(null, false);
        this._bNew.removeClass('ui-state-active').show().focus();
        if(this._bSubmit){
            this._bSubmit.removeClass('ui-state-active').show();
        }
        this._step=0;
        this._field=this._type=this._operator=null;
    },

    addCondition: function(filter){
        var f=$('<a href="javascript:void(0)">'+this._htmlCond(filter)+'</a>')
            .prependTo(this._filters)/*
         .button({
         icons: {secondary:'ui-icon-close'}
         })*/
            .data('filter', filter)
            .fadeIn();
        //if(this.highlight){
        //    f.effect('highlight');
        //}
        this._triggerChange();
        return this;
    },

    removeCondition: function(index){
        this._filters.children().eq(index).remove();
        this._triggerChange();
        return this;
    },

    _htmlCond: function(filter){
        var h='<span class="evo-lBold">'+filter.field.label+'</span> '+
            '<span class="evo-lLight">'+filter.operator.label+'</span> '+
            '<span class="evo-lBold">'+filter.value.label+'</span>';

        if(filter.operator.value==fOps.sBetween){
            h+='<span class="evo-lLight"> '+evoLang.opAnd+' </span>'+
                '<span class="evo-lBold">'+filter.value.label2+'</span>';
        }
        h+=eUI.html.buttonClose;
        return h;
    },

    _enableCond: function(filter, anim){
        if(this._cFilter){
            this._cFilter.removeClass('disabled');
            /*if(anim){
             this._cFilter.effect('highlight');
             }*/
            if(filter){
                this._cFilter.data('filter', filter)//.find(':first-child')
                    .html(this._htmlCond(filter));
                this._cFilter=null;
                this._triggerChange();
            }else{
                this._cFilter=null;
            }
        }
    },

    _editCond: function($filter){
        var filter=$filter.data('filter'),
            fid=filter.field.value,
            op=filter.operator.value,
            fv=filter.value;
        this._enableCond(null, false);
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
                    h.push(uiInput.option(f.id,f.label || f.labellist));
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
        var fOption=uiInput.option,
            fType=this._type;
        if(this._step<2){
            var h=[];
            switch (fType){
                case fts.lov:
                    //h.push(evoLang.sInList);
                    h.push(uiInput.hidden('operator',fOps.sInList));
                    this._operator=fOps.sInList;
                    break;
                case fts.bool:
                    //h.push(evoLang.sEqual);
                    h.push(uiInput.hidden('operator', fOps.sEqual));
                    this._operator=fOps.sEqual;
                    break;
                default:
                    h.push(uiInput.selectBegin('operator', '', true));
                    switch (fType){
                        case fts.date:
                        case fts.datetime:
                        case fts.time:
                            if (fType==fts.time){
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
                        case fts.int:
                        case fts.dec:
                        case fts.money:
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
        if(cond && fType!=fts.lov){
            this._editor.find('#operator').val(cond);
            this._operator=cond;
        }
        this._step=2;
    },

    _setEditorValue: function( v, v2){
        var editor=this._editor,
            fType=this._type,
            opVal=editor.find('#operator').val(),
            opBetween=false,
            addOK=true;
        if(opVal!==''){
            if(fType!=fts.lov && (opVal==fOps.sIsNull || opVal==fOps.sIsNotNull)){
                editor.append(uiInput.hidden('value',''));
            }else{
                if(this._step<3){
                    var h=[];
                    opBetween=opVal==fOps.sBetween;
                    switch (fType){
                        case fts.lov:// TODO use "section"?
                            h.push(
                                '<section id="value">',
                                (this._field.list.length>7)?'(<input type="checkbox" id="checkAll" value="1"/><label for="checkAll">All</label>) ':'',
                                uiInput.checkboxLOV(this._field.list),
                                '</section>');
                            break;
                        case fts.bool:
                            h.push('<span id="value">',
                                uiInput.radio('value', '1', evoLang.yes, v!='0', 'value1'),
                                uiInput.radio('value', '0', evoLang.no, v=='0', 'value0'),
                                '</span>');
                            break;
                        case fts.date:
                        case fts.datetime:
                        case fts.time:
                        case fts.int:
                        case fts.dec:
                        case fts.money:
                            var iType=(fType==fts.date)?'text':fType;
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
                    if(fType==fts.date){// TODO add datepicker widget to build and uncomment this
                        editor.find('#value,#value2').datepicker({dateFormat:this.dateFormat});
                    }
                }
                if(v){
                    var $value=editor.find('#value');
                    switch (fType){
                        case fts.lov:
                            $value.find('#'+v.split(',').join(',#')).prop('checked', 'checked');
                            break;
                        case fts.bool:
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
                    addOK=(fType==fts.lov || fType==fts.bool);
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
        if(this._type==fts.lov){
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
        }else if(this._type==fts.bool){
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
                var vval = v.val();
                fv.label=vval;
                switch(this._type){
                    case fts.text:
                        fv.value=vval.toLocaleLowerCase();
                        break;
                    case fts.date:
                    case fts.datetime:
                        fv.value=formattedDate(vval);
                        break;
                    default:
                        fv.value=vval;
                }
                if(opVal==fOps.sBetween){
                    vval = v.next().next().val();
                    fv.label2=vval;
                    if(this._type===fts.date || this._type===fts.datetime){
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
        var fHidden=uiInput.hidden,
            v2=filter.value.value2;
        h.push(fHidden('fld-'+idx, filter.field.value),
            fHidden('op-'+idx, filter.operator.value),
            fHidden('val-'+idx, filter.value.value));
        if(v2){
            h.push(fHidden('val2-'+idx, v2));
        }
    },

    _setHiddenValues: function(){
        var vs=this.val(),
            iMax=vs.length,
            h=[uiInput.hidden('elem', iMax)];
        for(var i=0;i<iMax;i++){
            this._hiddenValue(h, vs[i], i+1);
        }
        //h.push('&label=',encodeURIComponent(this.valText()));
        this._hValues.html(h.join(''));
    },

    _triggerChange: function(){
        if(this.submitReady){
            this._setHiddenValues();
        }
        this.$el.trigger('change.filter');
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
                this.addCondition(value[i]);
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
         if(iMax<1){
            return '';
         }
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

    click_new: function(evt){
        if(this._step<1){
            this._setEditorField();
            this._step=1;
        }
        this._bAdd.find('.ui-button-text').html(evoLang.bAddCond);
    },

    click_add: function(evt){
        var data=this._getEditorData();
        if(this._cFilter){
            this._enableCond(data, this.highlight);
        }else{
            this.addCondition(data);
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
    },

    click_close: function(e){
        this.$el.trigger('close.filter');
        this.clear();
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * View "toolbar" (one toolbar instance manages all views for a UI model).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.viewClasses = {
    // --- One ---
    'view': Evol.ViewOne.View,
    'edit': Evol.ViewOne.Edit,
    'mini': Evol.ViewOne.Mini,
    'json': Evol.ViewOne.JSON,
    // --- Many ---
    'list': Evol.ViewMany.List,
    'cards': Evol.ViewMany.Cards,
    //'bubbles': Evol.ViewMany.Bubbles,
    'charts': Evol.ViewMany.Charts,
    // --- Action ---
    'filter': Evol.ViewAction.Filter,
    'export': Evol.ViewAction.Export
    //'uimodel': Evol.ViewAction.UI_Model,
    //'doc': Evol.ViewAction.Doc
};

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = function() {

    var eUI = Evol.UI,
        i18n = Evol.i18n;

return Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'navigate.many >div': 'click_navigate',
        'paginate.many >div': 'paginate',
        //'selection.many >div': 'click_select',
        'change.tab >div': 'change_tab',
        'action >div': 'action_view',
        'status >div': 'status_update',
        'change.filter >div': 'change_filter',
        'close.filter >div': 'hideFilter',
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
        pageSize:20,
        buttons: {
            always:[
                {id: 'list', label: i18n.bList, icon:'th-list', n:'x'},
                {id: 'new', label: i18n.bNew, icon:'plus', n:'x'}
            ],
                //linkOpt2h('selections','','star');
            actions:[
                {id:'edit', label: i18n.bEdit, icon:'edit', n:'1'},
                {id:'save', label: i18n.bSave, icon:'floppy-disk', n:'1'},
                {id:'del', label: i18n.bDelete, icon:'trash', n:'1'},
                {id:'filter', label: i18n.bFilter, icon:'filter',n:'n'},
                //{id:'group',label: i18n.bGroup, icon:'resize-horizontal',n:'n'},
                {id:'export', label: i18n.bExport, icon:'cloud-download',n:'n'}
                //{id:'cog',label: i18n.bSettings, icon:'cog',n:'n'}
            ],
            prevNext:[
                {id:'prev', label: '', icon:'chevron-left', n:'x'},
                {id:'next', label: '', icon:'chevron-right', n:'x'}
            ],
            views: [
                // -- views ONE ---
                {id:'view', label: i18n.bView, icon:'eye-open',n:'1'},// // ReadOnly
                {id:'edit', label: i18n.bEdit, icon:'edit',n:'1'},// // All Fields for editing
                {id:'mini', label: i18n.bMini, icon:'th-large',n:'1'},// // Important Fields only
                //{id:'wiz',label: i18n.bWizard, icon:'arrow-right',n:'1'},
                {id:'json', label: i18n.bJSON, icon:'barcode',n:'1'},
                // -- views MANY ---
                {id:'list', label: i18n.bList, icon:'th-list',n:'n'},
                {id:'cards', label: i18n.bCards, icon:'th-large',n:'n'},
                //{id:'bubbles', label: i18n.bBubbles, icon:'adjust',n:'n'},
                {id:'charts', label: i18n.bCharts, icon:'stats',n:'n'}
            ]
        }
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.views=[];
        this.viewsHash={};
        //this._group=false;
    },

    render: function() {
        this.$el.html(this._toolbarHTML());
        this.setView(this.defaultView || 'list', false);
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
        return this;
    },

    _toolbarHTML: function(){
        var h,
            that=this,
            eUIm=eUI.menu,
            tb=this.buttons,
            endMenu='</ul></li>',
            menuDevider='<li class="divider" data-cardi="1"></li>',
            menuDeviderH='<li class="divider-h"></li>';

        function menuItem (m, noLabel){
            return eUIm.hItem(m.id, noLabel?'':m.label, m.icon, m.n);
        }
        function menuItems (ms, noLabel){
            return _.map(ms, function(m){
                return menuItem(m, noLabel);
            }).join('');
        }

        h='<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">'+
            menuItems(tb.always)+
            menuDeviderH+
            menuItems(tb.actions);
        if(this.toolbar){
            h+='</ul><ul class="nav nav-pills pull-right" data-id="views">'+
                '<li class="evo-tb-status" data-cardi="n"></li>';
            //h+=eUIm.hBegin('views','li','eye-open');
            h+=menuItems(tb.prevNext);
            h+=menuDeviderH;
            h+=menuItems(tb.views, true);
            //h+=menuDeviderH;
            //h+=eUIm.hItem('customize','','wrench', 'x', 'Customize');
            /*
             if(this.buttons.customize){
                 h+=beginMenu('cust','wrench');
                 link2h('customize','Customize this view','wrench');
                 h.push(menuDevider);
                 link2h('new-field','New Field','plus');
                 link2h('new-panel','New Panel','plus');
                 h+=endMenu;
             } */
        }
        h+='</ul>'+eUI.html.clearer+'</div>';
        return h;
    },

    refresh:function(){
        if(this.curView && this.curView.cardinality && this.curView.cardinality==='n'){
            this.curView.render();
        }
        return this;
    },

    isDirty:function(){
        // -- true if current view had unsaved values
        return (this.curView && this.curView.isDirty && this.curView.isDirty())?true:false;
    },

    _setView:function(viewName, updateRoute, skipIcons){
        var $e=this.$el,
            eid ='evolw-'+viewName,
            $v=this.$('[data-vid="'+eid+'"]'),
            vw=this.curView,
            config,
            collec=this._curCollec();

        if(viewName==='new'){
            viewName=(this._prevViewOne && this._prevViewOne!='view' && this._prevViewOne!='json')?this._prevViewOne:'edit';
            this.setView(viewName, false, true);
            this.model=new this.modelClass();
            this.model.collection=collec;
            vw.model=this.model;
            this.newItem();
            this.setIcons('new');
            vw.mode='new';
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
                    vw.setCollection(collec);
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
                    if(this._tabId && vw.getTab && (this._tabId != vw.getTab())){
                        vw.setTab(this._tabId);
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
                this._keepTab(viewName);
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
                    style: this.style,
                    pageSize: this.pageSize || 20,
                    pageIndex: this.pageIndex || 0,
                    titleSelector: this.titleSelector,
                    router: this.router
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel')
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                if(Evol.Dico.viewIsMany(viewName)){
                    //fieldsetFilter
                    vw = new Evol.viewClasses[viewName](config)
                        .render();
                    this._prevViewMany=viewName;
                    vw.setTitle();
                    if(viewName!='charts' && viewName!='bubbles' && this.pageIndex > 0){
                        //var pIdx=this.curView.getPage();
                        vw.setPage(this.pageIndex || 0);
                    }
                }else{
                    switch(viewName){
                        // --- actions ---
                        case 'export':
                            config.sampleMaxSize = config.pageSize;
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
                            vw = new Evol.viewClasses[viewName](config).render();
                            this._prevViewOne=viewName;
                            this._keepTab(viewName);
                            break;
                    }
                }
                if(_.isUndefined(vw)){
                    //TODO error tracking (in other places too)
                    alert('error: invalid route.');
                }else{
                    this.curView=vw;
                    this.viewsHash[viewName]=vw;
                    if(!skipIcons){
                        $(this.titleSelector).html(vw.getTitle());
                    }
                }
            }
        }
        if(this.curView.cardinality==='n'){
            this.setRoute('', false);
            if(this._filterOn){ // TODO do not always change flag
                this.showFilter(false);
            }
            this.updateNav();
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
            this._enableNav();
        }
        if(!skipIcons){
            this.setIcons(viewName);
        }
    },

    setView:function(viewName, updateRoute, skipIcons){
        var that=this;
        this.proceedIfReady(function(){
            that._setView(viewName, updateRoute, skipIcons);
        });
        return this;
    },

    getView:function(){
        return this.curView;
    },

    setTitle: function(){
        if(this.curView){
            if(this.curView.viewName==='export'){
                $(this.titleSelector)
                    .html(this.curView.getTitle());
            }else{
                this.curView.setTitle();
            }
        }
    },

    proceedIfReady:function(cbOK, cbCancel){
        // -- execute callback if not dirty or after prompt...
        var that=this,
            i18n=i18n,
            msg,
            cbs;
        if(this.isDirty()){
            msg=i18n.unSavedChanges.replace('{0}', this.curView.getTitle())+
                '<br><br>'+i18n.warnNoSave;
            cbs={
                nosave: cbOK,
                ok: function(){
                    if(that.curView.validate().length===0){
                        that.saveItem(false, true);
                        cbOK();
                    }
                }
            };
            if(cbCancel){
                cbs.cancel = cbCancel;
            }
            eUI.modal.confirm(
                'isDirty',
                i18n.unSavedTitle,
                msg,
                cbs,
                [
                    {id:'nosave', text:i18n.bNoSave, class:'btn-default'},
                    {id:'cancel', text:i18n.bCancel, class:'btn-default'},
                    {id:'ok', text:i18n.bSave, class:'btn-primary'}
                ]
            );
        }else{
            cbOK();
        }
        return this;
    },

     _keepTab: function(viewName){
         if(this.tabId && (viewName=='view'||viewName=='edit')){
            this.curView.setTab(this.tabId);
         }
     },

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
                customize: this.$('.evo-toolbar a[data-id="customize"]').parent(),
                views: vw,
                viewsIcon: this.$('.glyphicon-eye-open,.glyphicon-eye-close'),
                vws: vw.find('ul>li>a')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var setVisible=eUI.setVisible;

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
            /*var cssOpen='glyphicon-eye-open',
                cssClose='glyphicon-eye-close';
            if(mode==='mini' || mode==='json'){
                tbBs.viewsIcon.removeClass(cssOpen).addClass(cssClose);
            }else{
                tbBs.viewsIcon.removeClass(cssClose).addClass(cssOpen);
            }*/
            if(Evol.Dico.viewIsMany(mode)){
                this._prevViewMany=mode;
                oneMany(mode, false, true);
                if(mode==='charts' || mode==='bubbles'){
                    this.setStatus('');
                }else{
                    var cSize=this.collection.length,
                        pSize=this.curView.pageSize;
                    if(cSize > pSize){
                        tbBs.prevNext.show();/*
                         // TODO finish disabling of paging buttons
                         if(this.curView.pageIndex===0){
                         tbBs.prevNext.eq(0).addClass('nav-disabled');
                         }else{
                         tbBs.prevNext.eq(0).removeClass('nav-disabled');
                         }
                         if(this.collection.length/this.pageSize){
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
            setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='cards');
        }
    },

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(eUI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
                this.$('.evo-toolbar').after($ff);
                this._filters = new Evol.ViewAction.Filter({
                    el: $ff,
                    uiModel: this.uiModel
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val());
                    if(that.curView.viewName!=='bubbles'){
                        that.curView.render();
                    }
                });
            }
        }else{
            this._filters.$el.show(); //.slideDown();
        }
        this._filterOn=true;
        return this;
    },

    hideFilter: function(evt){
        if(this._filters){
            this._filters.$el.hide(); //.fadeOut(300);
        }
        this._filterOn=false;
        return this;
    },

    _flagFilterIcon: function(fOn){
        eUI.addRemClass(this.$('a[data-id="filter"]'), fOn, 'evo-filter-on');
    },

    toggleFilter: function(){
        this._filterOn=!this._filterOn;
        return this._filterOn?this.showFilter(true):this.hideFilter();
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

    getCollection:function(){
        return this._curCollec();
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
            //eUI.modal.alert(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity));
            this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity));
        }
        return this
            .clearMessage();
    },

    setRoute: function(id, triggerRoute){
        Evol.Dico.setRoute(this.router, this.curView.getTitle(), this.uiModel.id, this.curView.viewName, id, triggerRoute);
        return this;
    },

    saveItem: function(saveAndAdd, skipValidation){
        var that=this,
            vw=this.curView,
            msgs=skipValidation?[]:vw.validate();

        function fnSuccess(m){
            if(saveAndAdd) {
                that.newItem();
                this._trigger('item.added');
            }else{
                m.unset(''); // TODO why is there a "" prop?
                that.model=m;
                if(that._filteredCollection){
                    that._filteredCollection.add(m);
                }
                that.setIcons('edit');
                vw.setModel(m);
                that._trigger('item.saved', {
                    model:m,
                    uiModel:that.uiModel
                });
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
                            that.setMessage(i18n.getLabel('saved', eUI.capitalize(entityName)), i18n.getLabel('status.added', entityName, _.escape(vw.getTitle())), 'success');
                        },
                        error:function(m, err){
                            alert('error in "saveItem"');
                        }
                    });
                    this.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO use bootstrap modal
                }
            }else{
                // TODO fix bug w/ insert when filter applied => dup record
                this.model.set(this.getData(true));
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage(i18n.getLabel('saved', eUI.capitalize(entityName)), i18n.getLabel('status.updated', eUI.capitalize(entityName), _.escape(vw.getTitle())), 'success');
                    },
                    error:function(m, err){
                        alert('error in "saveItem"');
                    }
                });
            }
        }else{
            if (msgs.length > 0) {
                var msg = '<ul><li>'+msgs.join('</li><li>')+'</li></ul>'; // i18nVal.intro,
                this.setMessage(i18n.validation.incomplete, msg, 'warning');
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
        return this.curView.setDefaults() //.clear()
            .setTitle(i18n.getLabel('NewEntity', this.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var that=this,
            entityName=this.uiModel.entity,
            entityValue=this.curView.getTitle();

        if(this.curView.cardinality==='1'){
            var delModel=this.curView.model;
            if(delModel){
                eUI.modal.confirm(
                    'delete',
                    i18n.getLabel('deleteX', entityName),
                    i18n.getLabel('delete1', entityName, _.escape(entityValue)),
                    {
                        'ok': function(){
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
                                    var eName=eUI.capitalize(entityName);
                                    that.setMessage(i18n.getLabel('deleted1', eName), i18n.getLabel('status.deleted', eName, entityValue), 'success');
                                    that._trigger('item.deleted');
                                },
                                error:function(m, err){
                                    alert('error in "deleteItem"');
                                }
                            });
                        }
                    }
                );
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
            $(eUI.HTMLMsg(title, ' '+content, style)).insertAfter(this.$el.children()[0]);
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
                eUI.modal.alert(
                    'This feature must be implemented server side.',
                    JSON.stringify(this.curView.val(), null, 2)
                    //eUI.cr2br(JSON.stringify(this.curView.val(), null, 2))
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
            if((pIdx+1)*this.pageSize<this.curView.collection.length){
                pIdx++;
            }
        }else{
            var bIdx=parseInt(bId, 10);
            if(bIdx>0){
                pIdx=bIdx-1;
            }
        }
        this.pageIndex=pIdx;
        this.updateNav();
        if(this.curView.setPage){
            this.curView.setPage(pIdx);
        }
        return this;
    },

    updateNav: function(){
        var cl=this.curView.collection.length,
            cssDisabled='nav-disabled',
            pIdx=this.pageIndex||0,
            $item=this.$('[data-id="prev"]');

        eUI.addRemClass($item, pIdx===0, cssDisabled);
        eUI.addRemClass($item.next(), (pIdx+1)*this.pageSize>cl, cssDisabled);
    },

    _enableNav: function(){
        this.$('[data-id="prev"],[data-id="next"]')
            .removeClass('nav-disabled');
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
                return this.model?this.model.collection:new this.collectionClass();
            }
        }
    },
    /*
     _ok2go: function(){
     if(this.curView && this.curView.editable && this.curView.isDirty && this.curView.isDirty()){
     if(confirm(i18n.unSavedChanges)){
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
                    var that=this;
                    this.proceedIfReady(function(){
                        that.browse(toolId);
                    });
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;/*
             case 'customize':
                 this.curView.customize();
                 break;
             case 'group':
                 this.showGroup();
                 break;
             case 'new-field':
             case 'new-panel':
                 Evol.Dico.showDesigner('', toolId.substr(4), $e);
                 break;*/
            default:// 'edit', 'mini', 'list', 'cards', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId, true);
                }
        }
        this._trigger('toolbar.'+toolId);
    },

    _trigger: function(name, ui){
        this.$el.trigger(name, ui);
    },

    click_navigate: function(evt, ui){
        evt.stopImmediatePropagation();
        this.setModelById(ui.id);
        this.setRoute(ui.id, false);
    },

    change_tab: function(evt, ui){
        if(ui){
            this._tabId=ui.id;
        }
    },

    change_filter: function(evt){
        if(evt.namespace!=='filter'){
            return;
        }
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
        this.pageIndex=0;
        this.curView.setCollection(collec);
        this.updateNav();
        this._trigger('filter.change');
    }
    /*
    click_selection: function(evt, ui){
        var status=this.$('.evo-toolbar .evo-tb-status'),
            len=this.$('.list-sel:checked').not('[data-id="cbxAll"]').length,
            tbBs=this.getToolbarButtons();
        if(len>0){
            this.setStatus(i18n.getLabel('selected', len));
            tbBs.del.show();
        }else{
            this.setStatus('');
            tbBs.del.hide();
        }
    } */
});

}();
;
/*! ***************************************************************************
 *
 * evolutility :: app.js
 *
 * View "app" to manage the single page app for all objects/ui-models.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.App = Backbone.View.extend({

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
        pageSize:20,
        prefix: 'evol-'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.uiModels = _.flatten(this.uiModelsObj);
        this._tbs={};
        this._ents={};
        var es = this.elements;
        //this.$nav = $(es.nav);
        this.$nav2 = $(es.nav2);
        //this.$content = $(es.content);
        this.setupRouter();
    },

	//render: function() {
		//this.$el.html(...
        //this.$nav2.html(this._HTMLentities(this.uiModels));
        //this.$content.html(...;
        //return this;
	//},

    setupRouter: function(){
        var that=this,
            EvolRouter=Backbone.Router.extend ({
                routes: {
                    '' : 'nav',
                    //':entity/:view/:id': 'nav',
                    //':entity/:view': 'nav',
                    //':entity': 'nav',
                    ':entity(/:view)(/:id)': 'nav',
                    '*noroute': that.noRoute
                },
                nav: function(entity, view, id){
                    if(entity && that.uiModelsObj[entity]){
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
        var cView = this._tbs[this._curEntity].curView;
        if(cView){
            Evol.Dico.setRoute(this.router, cView.getTitle(), cView.uiModel.id, cView.viewName, id, triggerRoute);
        }else{
            alert('Error: Invalid route.');
        }
        return this;
    },

    noRoute: function(route){
        alert('Error: Invalid route "'+route+'".');
    },

    setEntity: function(eName, view, options){
        var that=this,
            tb=this._tbs[this._curEntity],
            cbOK=function(){
                that._setEntity(eName, view, options);
            },
            cbCancel=function(){
                //TODO case w/ no/new model
                if(tb && tb.curView){ // TODO this "if" should not be necessary
                    that.setRoute(tb.curView.model.id, false);
                }
            };

        if(this._curEntity){
            if(tb){
                tb.proceedIfReady(cbOK, cbCancel);
            }else{
                //alert('Error calling proceedIfReady');
                cbCancel();
            }
        }else{
            cbOK();
        }
    },

    _setEntity: function(eName, view, options){
        var that=this;

        view = view || 'list';

        function cb(){
            that._ents[eName].show().siblings().hide();
            var tb=that._tbs[eName];
            if(tb){
                that._curEntity = eName;
                if(tb.curView.viewName !== view){
                    tb.setView(view, false, false) //tb.setView(view, true, false)
                        .setTitle();
                }
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

        if(this._ents[eName]){
            cb();
        }else{
            var $v=$('<div data-eid="'+eName+'"></div>');
            this._ents[eName]=$v;
            this.$el.children().hide();
            this.$el.append($v);
            this.createEntity($v, this.uiModelsObj[eName], [], view, options, cb);
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
            lc = new Backbone.LocalStorage(this.prefix+uiModel.id),
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
                        pageSize: that.pageSize,
                        titleSelector: '#title',
                        style: that.style
                    };

                if(defaultView){
                    config.defaultView = defaultView;
                }
                if(that.useRouter){
                    config.router = that.router;
                }
                var tb = new Evol.ViewToolbar(config).render();//.setTitle();
                if(options && tb.cardinality==='1'){
                    tb.setModelById(options);
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


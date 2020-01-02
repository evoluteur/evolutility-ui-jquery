/*!
   evolutility-ui-jquery 1.2.3 
   (c) 2020 Olivier Giulieri 
   http://evoluteur.github.io/evolutility-ui-jquery/  
*/
// default config for Evolutility-UI-jQuery

var Evol = Evol || {};

Evol.Config = {

	// --- using localStorage
	localStorage: true,

	// --- using evolutility-server-node
	//url: 'http://localhost:2000/api/v1/'

};
;
//   Evolutility-UI-jQuery Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility-ui-jquery
//   (c) 2017 Olivier Giulieri

var Evol = Evol || {};

Evol.i18n = {

	LOCALE: 'EN',    // ENGLISH

    getLabel: function(label, string1, string2){
        var l;
        if(label.indexOf('.')>-1){
            var ns=label.split('.');
            l=this[ns[0]][ns[1]];
        }else{
            l=this[label];
        }
        if(string1 && l){
            l = l.replace('{0}', string1);
            //l = l.replace(/\{0\}/g, string1);
            if(string2){
                l = l.replace('{1}', string2);
                //l = l.replace(/\{1\}/g, string2);
            }
        }
        return l;
    },

    // --- toolbar & buttons ---
    tools:{
        View: 'View',
        bBrowse: 'Browse',
        bEdit: 'Edit',
        bMini: 'Mini', // 'Quick Edit'
        // Login: 'Login',
        bNew: 'New',
        newEntity: 'New {0}', //'New Item',
        //NewUpload: 'New Upload',
        //Search: 'Search',
        //AdvSearch: 'Advanced Search',
        //NewSearch: 'New Search',
        //Selections: 'Selections',
        //Selection: 'Selection',
        bExport: 'Export',
        bImport: 'Import',
        //SearchRes: 'Search Result',
        //MassUpdate: 'Mass Update',
        bDelete: 'Delete',
        //bAll: 'All',
        bList: 'List',
        bCards: 'Cards',
        bJSON: 'JSON',
        bFilter: 'Filter',
        bBubbles: 'Bubbles',
        //bSunburst: 'Sunburst',
        //bScatter:'Scatter',
        bCharts: 'Charts',
        //bRefresh: 'Refresh',
        //bPrint: 'Print',
        bSave: 'Save',
        bSaveAdd: 'Save and Add Another',
        bOK: 'OK',
        bCancel: 'Cancel',

        // --- data visualization ---
        vizGroupBy: 'Group by',
        vizColorBy: 'Color by',
        vizSizeBy: 'Size by',

        //xAxis: 'X Axis',
        //yAxis: 'Y Axis',
        //zAxis: 'Z Axis',

        // --- wizard ---
        prev: 'Previous',
        next: 'Next',
        finish: 'Finish !'
    },

    // --- msg & status ---
    //msg: {
    saved: '{0} saved.',
    unSavedTitle: 'Changes pending',
    unSavedChanges: 'Do you want to save the changes you made to "{0}"?',
    warnNoSave: 'Your changes will be lost if you don\'t save them.',
    bNoSave: 'Don\'t Save',
    deleteX: 'Delete {0}',// {0}=entity
    delete1: 'Do you really want to delete the {0} "{1}"?', // {0}=entity {1}=titlefield value,
    deleteN: 'Delete {0} {1}?', // delete 5 tasks
    deleted1: '{0} deleted.', // {0}=entity ,

    notFound: 'Item not found.',
    //this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.name);
    notFoundMsg: 'No {0} found.',
    notFoundMsgId: 'No {0} found for ID="{1}".',

    //NoChange: 'No Change',
    //NoX: 'No {0}',
    //Back2SearchResults: 'Back to search results',
    yes: 'Yes',
    no: 'No',
    none: 'None',
    na: 'N/A', // 'not available'
    nodata: 'No data available.',
    notEnoughdata: 'Not enough data available.',
    nopix: 'No picture.',
    nochart: 'No charts available.',
    badchart: 'Not enough information provided to draw charts.',
    range: '{0} - {1} of {2} {3}', //rangeBegin, '-', rangeEnd, ' of ', mSize, ' ', entities'
    selected: '{0} selected',
    //},
    
    // --- status ---
    msg:{
        sgn_money: '$', // indicator for money
        sgn_email: '@', // indicator for email
        added: 'New {0} "{1}" added.',
        updated: '{0} "{1}" updated.',
        deleted: '{0} "{1}" deleted.'
        //error: 'Error',
    },

    // --- validation ---
    validation:{
        incomplete: 'Some information is missing or invalid.',
        invalid: 'Invalid format.',
        invalidList: '{0} values in "{1}" are invalid.',
        invalidList1: '1 value in "{1}" is invalid.',
        //intro: 'You are not finished yet: ',
        empty: '"{0}" must have a value.',
        email: '"{0}" must be a valid email formatted like "name@domain.com".',
        integer: '"{0}" must only use numbers.',
        decimal: '"{0}" must be a valid decimal numbers.',
        money: '"{0}" must be a valid number.',
        date: '"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2015".',
        datetime: '"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2015 10:30 AM".',
        time: '"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
        json: '"{0}" must be a valid JSON expression like "{"a": 1}".',
        max: '"{0}" must be smaller or equal to {1}.',
        min: '"{0}" must be greater or equal to {1}.',
        maxLength: '"{0}" must be {1} characters long maximum.',
        minLength: '"{0}" must be at least {1} characters long.',
        minMaxLength: '"{0}" must be between {1} and {2} characters long.',
        regExp: '"{0}" is not of the expected format.'
        //regExp: '"{0}" must match the regular expression pattern for "{1}".'
    },

    // --- charts ---
    charts:{
        aByB: '{0} by {1}',
        aB: '{0}: {1}'
    },

    // --- export ---
    export:{
        exportOne: 'Export {0}', // {0}=entity
        exportMany: 'Export {0}', // {0}=entities
        preview: 'Export preview',
        header: 'Header',
        options: 'options',
        separator: 'Separator',
        firstLine: 'The first row is a header',
        format: 'Export format',
        xpFields: 'Fields to include in the export',
        IDkey: 'ID',
        allFields: 'Show all fields',
        formatCSV: 'Comma separated values (CSV, TXT, XLS...)',
        formatHTML: 'HTML',
        formatSQL: 'SQL Insert Statements (SQL)',
        formatTAB: 'Tab separated values (TXT)',
        formatXML: 'XML',
        formatJSON: 'Javascript Object Notation (JSON)',
        //xpColors: 'Header color-Color odd rows-Color even rows',
        //xpColMap: 'Columns map to',
        XMLroot: 'Element name', // 'Root element name'
        //xpXMLAttr: 'Attributes',
        //xpXMLElem: 'Elements',
        headerLabels: 'Field Labels',
        headerIds: 'Field Attributes or Ids',
        db: 'Database',
        SQL: 'SQL Options',
        SQLTable: 'Table name',
        SQLTrans: 'In transaction',
        SQLIdInsert: 'Identity insert',
        DownloadEntity: 'Download {0}'
    },

    // --- import ---
    import:{
        importOne: 'Import {0}', // {0}=entity
        importMany: 'Import {0}', // {0}=entities
        format: 'Source Format',
        fSample: 'Sample',
        allowDups: 'Allow duplicates',
        data: 'Data to Import',
        success: 'Import done.',
        empty: 'Nothing to Import.'
    },

    // --- filters ---
    filters:{
        sEqual: 'equals',
        sNotEqual: 'not equal',
        sStart: 'starts with',
        sContain: 'contains',
        sNotContain: 'doesn\'t contain',
        sFinish: 'finishes with',
        sInList: 'is any of',
        sIsNull: 'is empty',
        sIsNotNull: 'is not empty',
        sBefore: 'before',
        sAfter: 'after',
        sNumEqual: '&#61;',
        sNumNotEqual: '!&#61;',
        sGreater: '&#62;',
        sSmaller: '&#60;',
        sOn: 'on',
        sNotOn: 'not on',
        sAt: 'at',
        sNotAt: 'not at',
        sBetween: 'between',
        opAnd: 'and',
        //opOr: 'or',
        yes: 'Yes',
        no: 'No',
        bNewCond: 'New filter condition',
        bAddCond: 'Add condition',
        bUpdateFilter: 'Update filter',
        bSubmit: 'Submit',
        bCancel: 'Cancel'
    }/*,

    // --- documentation ---
    doc:{
        entity: 'Entity',
        fields: 'Fields',
        uiModel: 'UI Model'
    }*/

};
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: def.js
 *
 * Library of helpers for metamodel
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Def = function(){

var fts = {
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
    html: 'html',
    formula:'formula', // soon to be a field attribute rather than a field type
    email: 'email',
    pix: 'image',
    //geoloc: 'geolocation',
    //doc:'document',
    url: 'url',
    color: 'color',
    hidden: 'hidden',
    json: 'json'
    //rating: 'rating',
    //widget: 'widget'
};

return {

    fieldTypes: fts,

    /*
    isViewOne: function(viewName){
        return viewName==='new' || viewName==='edit' || viewName==='browse' || viewName==='json';
    },*/
    isViewMany: function(viewName){
        return this.isViewCollection(viewName) || this.isViewCharts(viewName);
    },
    
    isViewCollection: function(viewName){
        return viewName==='list' || viewName==='cards';
    },

    isViewCharts: function(viewName){
        return viewName==='charts' || viewName==='bubbles' || viewName==='scatter' || viewName==='sunburst';
    },

    fieldInCharts: function (f) {
        return (_.isUndefined(f.inCharts) || f.inCharts) && Evol.Def.fieldChartable(f);
    },
    fieldChartable: function (f) {
        //  || f.type===fts.list
        return  f.type===fts.lov || f.type===fts.bool || f.type===fts.int || f.type===fts.money;
    },

    fieldIsNumber: function(f){
        return f.type===fts.int || f.type===fts.dec || f.type===fts.money;
    },/*
    fieldIsDateOrTime: function(fType){
        return fType===fts.date || fType===fts.datetime || fType===fts.time;
    },*/

    fnSearch: function(uiModel, searchString){
        var sfn = uiModel.fnSearch;
        if(_.isFunction(sfn)){
            return function(model){
                return uiModel.fnSearch(model, searchString);
            };
        }else{
            if(_.isArray(sfn)){
                return function(model){
                    var ln=sfn.length;
                    for(var i=0;i<ln;i++){
                        var fn=sfn[i];
                        if(model.get(fn) && model.get(fn).toLowerCase().indexOf(searchString)>-1){
                            return true;
                        }
                    }
                    return false;
                };
            }else if(_.isString(sfn)){
                return function(model){
                    return model.get(fn) ? model.get(fn).toLowerCase().indexOf(searchString)>-1  : false;
                };
            }
        }
    },

    // get all "shallow" fields (no sub collections) from a UI model
    getFields: function (uiModel, fnFilter) {
        var fs = [];

        function collectFields(te) {
            if (te && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (tec) {
                    if(!tec.elements){
                        fs.push(tec);
                    }else if(tec.type!='panel-list'){
                        collectFields(tec);
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

    getFieldsHash: function(fields){
        var h = {};
        _.each(fields, function(f){
            h[f.id] = f;
        });
        return h;
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

    countBy: function(models, f, cData, iconsPath){
        var fTypes=Evol.Def.fieldTypes,
            i18n = Evol.i18n,
            data=[],
            labels=[],
            nb, dataSetName;

        if(f.type===fTypes.bool){
            groups = _.countBy(models, function(m) {
                return m.get(f.id)===true;
            });
            for(dataSetName in groups) {
                nb=groups[dataSetName];
                if(dataSetName==='true'){
                    lb = f.labelTrue || i18n.yes;
                }else{
                    lb = f.labelFalse || i18n.no;
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
                if(_.isUndefined(dataSetName)){
                    lb = i18n.na;
                }else if(dataSetName==='' || dataSetName==='null'){
                    lb = i18n.none;
                }else if(f.type===fTypes.lov || f.type===fTypes.list){
                    if(f.list && f.list.length && f.list[0].icon){
                        lb = Evol.Dico.lovItemTextNoPix(f, dataSetName);
                    }else{
                        lb = Evol.Dico.lovItemText(f, dataSetName, Evol.hashLov, iconsPath);
                    }
                }else{
                    lb = dataSetName;
                }
                data.push(nb);
                labels.push(lb+' ('+nb+')');
            }
        }
        chartType = f.typeChart || (f.type===fTypes.lov ? 'pie':'bars');
        cData[f.id] = {
            field: f,
            data: data,
            labels: labels,
            //style: style,
            //sizes: sizes
        };
        return { data: data, labels: labels};
    },

    sampleDatum: function(f, idx){
        function char(idx){
            return String.fromCharCode(97 + idx)+ String.fromCharCode(98 + idx)+ String.fromCharCode(99 + idx);
        }
        switch(f.type){
            case fts.bool:
                return true;
            case fts.date:
                return '2015-0'+(idx+1)+'-'+(idx+14);
            case fts.datetime:
                return '2015-04-23T17:15';
            case fts.time:
                return '14:30';
            case fts.url:
                return 'http://www.evolutility.org';
            case fts.email:
                return 'abc@abc.com';
            case fts.int:
                if(f.min){
                    return f.min+5+(idx*2);
                }
                return idx;
            case fts.dec:
            case fts.money:
                return (idx+1)*10.2;
            case fts.lov:
                if(f.list && f.list.length){
                    if(idx<f.list.length){
                        return  f.list[idx].id;
                    }
                    return  f.list[0].id;
                }
                break;
            default:
                return char(idx);
        }
    }

};

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: format.js
 *
 * Helpers for string manipulation and date formats
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Format = {

    // --- string helpers ---
    capitalize: function(word){ // TODO use _.string.capitalize(word);
        if(word && word.length>0){
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }
        return '';
    },
    trim: function(stringValue){ // TODO use _.string.trim(word);
        if(_.isString(stringValue) && stringValue!==''){
            return stringValue.replace(/^\s+|\s+$/g, '');
        }
        return '';
    },
    cr2br: function(v, escape){
        if(v==='' || v===null || _.isUndefined(v)){
            return '';
        }
        var txt=escape?_.escape(v):v;
        return txt.replace(/[\r\n]/g, '<br>');
    },

    // --- date formats ---
    dateString: function(d){
        if(d){
            d=d.substring(0, 10);
        }
        if(!_.isUndefined(d) && d!==null){
            var dateParts=d.split('-');
            if(dateParts.length>1){
                return dateParts[1]+'/'+dateParts[2]+'/'+dateParts[0];
            }
        }
        return '';
    },
    timeString: function(d){
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
    datetimeString: function(d){
        if(!_.isUndefined(d) && d!==null && d!==''){
            var dateParts=d.split('T');
            if(dateParts.length>1){
                return this.dateString(dateParts[0])+', '+this.timeString(dateParts[1]);
            }else{
                return this.dateString(dateParts[0]);
            }
        }
        return '';
    },

    // --- JSON formats ---
    jsonString: function(d, cr2br){
        var dd;
        try{
            dd=(_.isString(d) && d!=='') ? $.parseJSON(_.unescape(d)) : d;
        }catch(err){
            alert('Error: format.jsonString'+ err);
            dd={"error": "Evol.Format.jsonString"};
        }
        if(dd===''){
            return dd;
        }else{
            //var txt=JSON.stringify(dd, null, '\t');
            var txt=JSON.stringify(dd, null, 2);
            if(cr2br){
                txt=this.cr2br(txt);
            }
            return txt;
        }
    }

};
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: dom.js
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};
Evol.hashLov = {};
Evol.ViewAction = {};

Evol.DOM = {

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

        formula: function (id, f , model) {
            return '<div class="disabled evo-rdonly evol-ellipsis'+(id?'" id ="'+id:'')+'">'+
                        (f.formula?f.formula(model):'')+
                    '</div>';
        },
        text: function (id, value, fd, css) {
            var h = '<input type="text" id="'+id;
            if(value && _.isString(value)){
                value=value.replace(/"/g,'\"');
            }
            h+='" value="'+value;
            h+='" class="evo-field form-control '+(css || '');
            if(fd){
                // properties mapping to html attributes
                _.each(['id', 'min', 'max', 'maxLength', 'placeholder'], function (item) { // 'max-width', 'min-width',
                    if (!_.isUndefined(fd[item])) {
                        h+='" '+item+'="'+fd[item];
                    }
                });
                //other fields attributes
                if(fd.readonly){
                    h+='" disabled="disabled';
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
        textM: function (id, value, maxLen, height, disabled) {
            return '<textarea id="'+id+'" class="evo-field form-control" rows="'+height+'"'+(disabled?' disabled':'')+'>'+value+'</textarea>';
                //(maxLen > 0) ? ('" onKeyUp="Evol.DOM.Validation.fixLength(this,' + maxLen + ')') : '',
        },
        textMJSON: function (id, fVobj, height, disabled) {
            return '<textarea id="'+id+'" rows="'+height+'" class="evol-json evo-field form-control"'+(disabled?' disabled':'')+'>'+
                    //_.escape(JSON.stringify(fVobj, null, '\t'))+
                    Evol.Format.jsonString(fVobj, false)+
                '</textarea>';
        },
        myType: function (type, id, value) {
            return '<input type="'+type+'" id="'+id+'" value="'+value+
                '" class="evo-field form-control" size="15">';
        },

        date: function (id, value) {
            return this.myType('date', id, (value||'').substring(0, 10));
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
        checkboxLOV: function(fLOV){
            return _.map(fLOV, function(lv){
                return '<input type="checkbox" id="'+lv.id+'" value="'+lv.id+'"/>'+
                    '<label for="'+lv.id+'">'+lv.text+'</label> ';
            }).join('');
        },

        radio: function (fN, value, label, sel, id) {
            return '<label for="'+id+'"><input id="'+id+'" name="'+fN+'" type="radio" value="'+value+
                (sel?'" checked="checked':'')+'">'+label+'</label>&nbsp;';
        },
        lov: function (id, value, text, fLOV) {
            var h = '<select class="evo-field form-control" id="'+id+'">';
            if(text){
                h+='<option value="'+value+'" selected>'+text+'</option>';
            }
            opt=this.option;
            _.each(fLOV, function (f) {
                h+=opt(f.id, f.text);//, f.id===value);
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
            return '<select id="'+id+'" class="form-control '+css+'">'+(emptyOption?Evol.DOM.html.emptyOption:'');
        },
        select:function (id, value, css, emptyOption, list) {
            return  this.selectBegin(id, css, emptyOption)+this.options(list, value)+'</select>';
        },

        option: function (id, text, selected) {
            return '<option value="'+id+(selected?'" selected':'"')+'>'+text+'</option>';
        },
        options: function (lovList, value) {
            var fnOpt = this.option,
                opts='';
            _.each(lovList,function(f){
                if(f.id===value){
                    opts+='<option value="'+f.id+'" selected="selected">'+f.text+'</option>';
                }else{
                    opts+=fnOpt(f.id, f.text);
                }
            });
            return opts;
        }
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
        return '<div data-id="'+id+'" class="'+this.html.glyphicon+cssGlyphIcon+'" tabindex="0"></div>';
    },
    buttonsPlus: function(){
        return this.buttonsIcon('bPlus', 'plus-sign');
    },
    buttonsMinus: function(){
        return this.buttonsIcon('bMinus', 'minus-sign');
    },
    buttonsPlusMinus: function(){
        return this.buttonsPlus()+this.buttonsMinus();
    },

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
        return email ? this.link(id, email, 'mailto:'+email) : '';
    },
    //html_more: function (label) {
    //    return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
    //},

    // --- icons ---
    icon: function (icon, css) {
        return '<i class="'+(css?css+' ':'')+Evol.DOM.html.glyphicon+icon+'"></i>';
    },
    /*
    iconCustomize: function (id, type) {
        return this.iconId(id, type, 'wrench');
    },*/

    iconId: function (id, type, icon) {
        return '<i class="'+this.html.glyphicon+icon+'" data-id="'+id+(type?('" data-type="'+type):'')+'"></i>';
    },

    htmlIcon: function(id, chartType, css){
        return '<div class="glyphicon '+css+'" data-id="'+id+'" data-ctype="'+chartType+'"></div>';
    },

    // --- menu ---
    menu: {
        hBegin: function(id, tag, icon, text, cardi){
            var h='<'+tag+' class="dropdown" data-id="'+id+(cardi ? ('" data-cardi="'+cardi) : '')+'">'+
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">';
                if(text) { h+=text; }
                if(icon) { h+=Evol.DOM.icon(icon); }
                h+=' <b class="caret"></b></a>'+
                    '<ul class="dropdown-menu evo-dropdown-icons">';
            return h;
        },
        hEnd: function(tag){
            return '</ul></'+tag+'>';
        },
        hItem: function(id, label, icon, cardi, style){
            var h='<li data-id="'+id;
            if(cardi){
                h+='" data-cardi="'+cardi;
            }
            h+='" data-balloon-pos="down" data-balloon="'+label;
            h+='"><a href="javascript:void(0);" data-id="'+id+'">'+Evol.DOM.icon(icon);
            /*if(label && style!=='tooltip'){
                h+='<span>'+label+'</span>';
            }*/
            h+='</a></li>';
            return h;
        }
    },

    // --- modal ---
    modal:{

        alert: function(title, msg){
            var $m=$(this.HTMLModal('alert', title, msg, [{
                    id:'ok',
                    text: Evol.i18n.tools.bOK,
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
                    {id:'cancel', text:Evol.i18n.tools.bCancel, class:'btn-default'},
                    {id:'ok', text:Evol.i18n.tools.bOK, class:'btn-primary'}
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
    panelBegin: function (p, css, toggle) {
        var h='<div class="panel '+(p.css?p.css:css);
        if(p.id){
            h+='" data-pid="'+p.id;
        }
        h+='">';
        if(p.label || p.label2){
            h+=this.panelHeader(p, toggle);
        }
        return h;
    },

    panelHeader: function (p, toggle) {
        if(p.label || p.label2){
            return '<div class="panel-heading '+(p.cssLabel? p.cssLabel:'')+'">'+
                        (toggle!==false?this.icon('chevron-up', 'evol-title-toggle'):'')+
                        '<h3 class="panel-title">'+p.label+'</h3>'+
                        (p.label2?'<div class="evol-subtitle">'+p.label2+'</div>' : '')+
                        (p.help?'<p class="evo-panel-help">'+p.help+'</p>':'')+
                    '</div>';
        }
        return '';
    },

    panelEnd: function () {
        return '</div>';
    },

    panelEmpty: function(id, css, style){
        return '<div data-id="'+id+'" class="'+css+' panel panel-'+style+'"></div>';
    },

    // --- status ---
    HTMLMsg: function (title, msg, style) {
        return '<div data-id="msg" class="evo-msg alert alert-'+(style || 'info')+
            ' alert-dismissable">'+this.html.buttonClose+
            '<strong>'+title+'</strong> <span>'+msg+'</span></div>';
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

    showOrHide: function($e, visible){
        if($e){
            if(visible){
                $e.show();
            }else{
                $e.hide();
            }
        }
        else{
            console.log('ERROR: invalid element in "showOrHide".');
        }
    },

    addRemClass: function ($e, doAdd, css) {
        if(doAdd){
            $e.addClass(css);
        }else{
            $e.removeClass(css);
        }
        return doAdd;
    },

    scroll2Top: function(){
        window.scrollTo(0, 0);
    }

};
;

/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: dom-charts.js
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.DOM.Charts = {

    // same as d3.scale.category10() 
    colors:['1f77b4','ff7f0e','2ca02c','d62728','9467bd','8c564b','e377c2','7f7f7f','bcbd22','17becf'],

    _colorsList: function(nbColors){
        return this.colors.slice(0, nbColors).join(',');
    },

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return '<div class="evol-chart-title">'+
            title+'</div><img src="'+urlPix+'">';
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
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: dico.js
 *
 * Library of helpers for dictionary
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

// not a "virtual DOM" but an "abstract DOM"
Evol.Dico = function(){

    var dom = Evol.DOM,
        uiInput = dom.input,
        i18n = Evol.i18n,
        fts = Evol.Def.fieldTypes;

return {

    fieldEdit: {

        field: function (f, fType, fid, fv) {
            return uiInput[fType](fid, fv, f, null);
        },

        default: function (f, fid, fv) {
            return uiInput.text(fid, fv, f, null);
        },

        text: function (f, fid, fv) {
            return uiInput.text(fid, fv, f, null);
        },
        textmultiline: function (f, fid, fv) {
            // fv = _.escape(fv);
            if (f.height === null) {
                f.height = 5;
            } else {
                var fHeight = parseInt(f.height, 10);
                if (fHeight < 1) {
                    f.height = 5;
                }
            }
            return uiInput.textM(fid, fv, f.maxlength, f.height);
        },

        boolean: function (f, fid, fv) {
            return uiInput.checkbox(fid, fv);
        },
        integer: function (f, fid, fv) {
            return uiInput.textInt(fid, fv, f.max, f.min);
        },
        decimal: function (f, fid, fv) {
            //todo
            return uiInput.textInt(fid, fv, f.max, f.min);
        },
        money: function (f, fid, fv) {
            return '<div class="input-group evol-money">'+uiInput.typeFlag('$')+
                uiInput.textInt(fid, fv, f.max, f.min)+'</div>';
        },

        date: function (f, fid, fv) {
            return uiInput.date(fid, fv);
        },
        datetime: function (f, fid, fv) {
            return uiInput.dateTime(fid, fv);
        },
        time: function (f, fid, fv) {
            return uiInput.time(fid, fv);
        },
/*
        geoloc: function (f, fid, fv) {
            return uiInput.geoloc(fid, fv);
        },
*/
        lov: function (f, fid, fv) {
            return uiInput.select(fid, fv, '', true, f.list);
        },
        list: function (f, fid, fv) { // fv is an array. will use select2
            return '<div id="'+fid+'" class="w-100 form-control"></div>';
        },

        email: function (f, fid, fv) {
            return '<div class="input-group">'+uiInput.typeFlag(i18n.msg.sgn_email)+
                uiInput.text(fid, fv, f)+
                '</div>';
        },
        url: function (f, fid, fv) {
            return uiInput.text(fid, fv, f);
            //fv!==''?EvoUI.link(fid,'',fv):''
        },
        //doc: function(f, fid, fv, iconsPath){
        //},
        image: function(f, fid, fv, iconsPath){
            var h='';
            if(fv!==''){
                h+='<img src="'+((fv.substr(0, 2)==='..')?fv:iconsPath + fv)+'" class="img-thumbnail">';
            }else{
                h+='<p class="">'+i18n.nopix+'</p>';
            }
            h+=uiInput.text(fid, fv, f, null);
            return h;
        },
        color: function(f, fid, fv){
            return uiInput.color(fid, fv);
        },
        hidden: function(f, fid, fv){
            return uiInput.hidden(fid, fv);
        },
        html: function (f, fid, fv) {
            // TODO
            return uiInput.textM(fid, fv, f.maxlength, f.height);
        },
        json: function(f, fid, fv){
            // TODO
            return uiInput.textM(fid, fv, f.maxlength, f.height);
        },
        formula: function(f, fid, fv){
            return '<div class="evol-ellipsis">'+uiInput.text(fid, fv, f, null)+'</div>';
        }
    },

    fieldHTML: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h='';
        function emHeight(f){
            var fh = parseInt(f.height || 2, 10);
            if(fh<2){
                fh=2;
            }
            return parseInt(fh*1.6, 10);
        }
        // --- field label ---
        if(!skipLabel){
            h+=this.HTMLFieldLabel(fld, mode || 'edit');
        }
        // --- field value ---
        if(fld.readonly || mode==='browse'){
            h+='<div class="disabled evo-rdonly'+(fld.type===fts.email || fld.type===fts.url?' evol-ellipsis':'')+'" id="'+fid;
            if(fld.type===fts.textml && fld.height>1){
                h+='" style="height:'+emHeight(fld)+'em;overflow-y: auto;';
            }
            h+='">';
            switch (fld.type) {
                case fts.formula:
                    // TODO: in one.js or here?
                    h+='<div id="'+fid+'" class="form-control evol-ellipsis">'+fld.formula()+'</div>';
                    break;
                case fts.color: // TODO is the color switch necessary?
                    h+='<div id="'+fid+'" class="form-control">'+uiInput.colorBox(fid, fv)+'</div>';
                    break;
                default:
                    h+=this.fieldHTML_RO(fld, fv, {}, iconsPath);
            }
            h+='&nbsp;</div>';
        }else{
            var ftc=Evol.Dico.fieldEdit[fld.type];
            if(!ftc){
                ftc=Evol.Dico.fieldEdit.default;
            }
            h+=ftc(fld, fid, fv, iconsPath);
        }
        return h;
    },

    fieldHTML_RO: function(f, v, hashLov, iconsPath, wId){
        switch(f.type){
            case fts.bool:
                if (v==='true' || v=='1') {
                    return dom.icon('ok', f.css);
                }
                break;
            case fts.lov:
                if (v !== '') {
                    return Evol.Dico.lovItemText(f, v, hashLov, iconsPath);
                }
                break;
            case fts.list:
                if(_.isString(v) && v!==''){
                    v = v.split(',');
                }
                if(v && v.length && v[0]!==''){
                    return '<div class="evo-f-list"><div>'+_.map(v, function(vi){
                        return Evol.Dico.lovItemText(f, vi, hashLov, iconsPath);
                    }).join('</div><div>')+'</div></div>';
                }
                return '';
            case fts.date:
            case fts.time:
            case fts.datetime:
                return Evol.Format[f.type+'String'](v);
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
                return dom.linkEmail(wId?f.id:null, v);
            case fts.url:
                return dom.link(f.id, v, v, f.id);
            case fts.json:
                return dom.input.textM(f.id, Evol.Format.jsonString(v, false), f.maxLen, f.height, true);
            //case fts.color:
            //    return uiInput.colorBox(f.id, v, v);
            default:
                return v;
        }
        return '';
    },

    HTMLFieldLabel: function (fld, mode) {
        var h='<div class="evol-field-label" id="'+fld.id+'-lbl"><label class="control-label '+(fld.cssLabel?fld.cssLabel:'')+'" for="'+fld.id+'">'+fld.label;
        if (mode != 'browse' && fld.required){
            h+=dom.html.required;
        }
        if (fld.help && fld.help!==''){
            h+=dom.icon('question-sign', '');
        }
        h+='</label></div>';
        return h;
    },

    fieldLink: function (id, fld, value, icon, noLink, route) {
        var h='';
        if(!noLink){
            var js='javascript'; // necessary for jshint
            h+='<a href="'+(route?route:(js+':void(0);'));
            if(id){
                h+='" id="'+id;
            }
            h+='" class="evol-nav-id">';
        }
        if(icon){
            h+='<img class="evol-many-icon" src="'+icon+'">';
        }/*
         if(_.isUndefined(value) || value===''){
         value='('+model.id+')';
         }*/
        h+='<span>'+value+'</span>';
        if(!noLink){
            h+='</a>';
        }
        return h;
    },

    clearCacheLOV: function(){
        Evol.hashLov={};
    },

    setViewTitle: function(that, title, badge){
        if(that.titleSelector){
            $(that.titleSelector)
                .html(
                    (that.icon?'<i class="glyphicon glyphicon-'+that.icon+'"></i>&nbsp;':'')+
                    (title?title:that.getTitle())+
                    (badge?'<span class="badge badge-one">'+badge+'</span>':'')
                );
        }
        return that;
    },

    getFieldVal:function(f, $f){
        switch(f.type) {
            case fts.bool:
                return $f.prop('checked');
            case fts.int:
                return parseInt($f.val(), 10);
            case fts.dec:
            case fts.money:
                return parseFloat($f.val());
            case fts.list:
                try{
                    return $f.select2('val');
                }catch(e){
                    console.error('error with select2');
                    //alert('error with select2')
                    return '';
                }
                break;
            case fts.date:
                var d=$f.val();
                if(d.length===10){
                    d+='T08:00:00.000Z';
                }
                return d;
            default:
                return $f.val();
        }
    },
    // get field value (not id but text) for a field of type lov
    lovItemText:function(f, v, hash, iconsPath, inDiv){
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
                    if(listItem.glyphicon){
                        txt='<i class="glyphicon glyphicon-'+listItem.glyphicon+'"></i> '+txt;
                    }else if(listItem.icon){
                        txt='<img src="'+((listItem.icon && listItem.icon.substring(0,1)!=='.')?iconsPath:'')+listItem.icon+'"> '+txt;
                    }
                    hashLov[v]=txt;
                    return txt;
                }
            }
        }
        return '';
    },

    lovItemTextNoPix:function(f, v){
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
         var $elDesModal=$(dom.modal.HTMLModal('m'+id, 'Edit '+type+' '+ f.label, '<div class="'+css+'"></div>')),
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

    uiModel2tdbTable: function(uiModel){
        // -- generates SQL script to create a Postgress DB table for the object
        var t=uiModel.id || uiModel.name;
        var fields=Evol.Def.getFields(uiModel);
        var sql='CREATE TABLE '+t;
        sql+='\n(\n';
        sql+=[' id serial NOT NULL,\n'];
        _.forEach(fields, function(f, idx){
            sql+=' "'+(f.attribute || f.id)+'" ';
            switch(f.type){
                case 'boolean':
                case 'integer':
                    sql+=f.type;
                    break;
                case 'date':
                case 'datetime':
                case 'time': 
                    sql+='date';
                    break;
                default:
                    sql+='text';
            }
            if(f.required){
                sql+=' not null';
            }
            sql+=',\n';
        });
        sql+='CONSTRAINT "'+t+'_pkey" PRIMARY KEY (id)';
        sql+='\n) WITH (OIDS=FALSE);';

        return sql;
    },
*/
    filterModels: function(models, filters){
        if(filters.length){
            var fConds=Evol.Dico.fieldConditions;
            return models.filter(function(model){
                var good=true;
                for(var i=0, iMax=filters.length;i<iMax;i++){
                    var filter=filters[i],
                        vm=model.get(filter.field.value);

                    if(_.isArray(vm)){
                        var ln=vm.length,
                            fGood=false;
                        for(var j=0;j<ln;j++){
                            if(fConds[filter.operator.value](vm[j], filter.value.value)){
                                fGood=true;
                                break;
                            }
                        }
                        if(!fGood){
                            return fGood;
                        }
                    }else{
                        if(_.isUndefined(vm)){
                            vm='';
                        }
                        if(!fConds[filter.operator.value](vm, filter.value.value, filter.value.value2)){
                            return false;
                        }
                    }
                }
                return good;
            });
        }
        return models;
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

    bbComparatorFormula: function(fid, fn){
        return function(modelA, modelB) {
            var mA = fn(modelA),
                mB = fn(modelB);
            if(mA<mB){
                return 1;
            }
            if(mB<mA){
                return -1;
            }
            return 0;
           // return (fn(modelA)||'').localeCompare(fn(modelB)||'');
        };
    },

    sortNumber: function(fid){
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

    sortText: function(fid){
        return function(modelA, modelB) {
            return (modelA[fid]||'').localeCompare(modelB[fid]||'');
        };
    },

    setPageTitle: function(title){
        if(_.isUndefined(this._$headTitle)){
            this._$headTitle = $('#headTitle');
        }
        this._$headTitle.html(title);
    },

    getItemTitle: function(e){
        return e.find('h4>a>span').text();
    },

    getRoute: function(){
        var cURL=window.location.href,
            idx=cURL.indexOf('#');
        return (idx>-1)?cURL.substr(idx+1):'';
    },

    setRoute: function(router, entity, view, opts, trigger){
        if(!_.isUndefined(router)){
            var route = entity + '/' + view;
            if(opts){
                route+='/' + opts;
            }
            if(route!==this.getRoute()){
                router.navigate('#' + route, {trigger: trigger});
            }
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
            return fv.substring(0, cv.length).toLocaleLowerCase()===cv;
        },
        // -- contains
        'ct': function(fv, cv){
            if(fv){
                return fv.toLocaleLowerCase().indexOf(cv)>-1;
            }
            return false;
        },
        // -- doesn't contains
        'nct': function(fv, cv){
            if(fv){
                return fv.toLocaleLowerCase().indexOf(cv)===-1;
            }
            return true;
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
            return  fv==='' || _.isUndefined(fv);
        },
        // -- not null
        'nn': function(fv, cv){
            return !(_.isUndefined(fv) || fv==='');
        },
        // -- in []
        'in': function(fv, cv){
            if(_.isArray(fv)){
                var cvs=cv.split(',');
                for(var i=0;i<fv.length;i++){
                    if(_.contains(cvs, fv[i])){
                        return true;
                    }
                }
                return false;
            }else{
                return _.contains(cv.split(','), fv);
            }
        },
        // -- true
        '1': function(fv, cv){
            return fv;
        },
        // -- false
        '0': function(fv, cv){
            return !fv;
        }
    }

};

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many.js
 *
 * View "many" for other ViewMany views to inherit from.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany = {

    menuOne: [
        //{id:'fav', type:null, icon:'star'},
        {id:'edit', type:null, icon:'edit'},
        {id:'delete',type: null, icon:'trash'}
    ],
    
    eventsMany: {
        'click .pagination>li': 'click_pagination',
        //'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'click .evol-actions>i,.evol-actions-nxtTd>i': 'clickAction',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    actionEvents: {
        enterItem: function(icons, fnElem, isTd){
            return function(evt){
                //evt.currentTarget).children().eq(0)
                //$(evt.currentTarget).children().eq(0).append(
                var e=$(evt.currentTarget);
                var css="evol-actions";

                if(fnElem){
                    e=fnElem(e);
                }
                if(isTd && e.width()<190){
                    if(e.siblings().length>e.index()){
                        e=e.next();
                        css="evol-actions-nxtTd";
                    }
                }
                e.append(
                    '<div class="'+css+'">'+
                    _.map(icons, function(i){
                        return Evol.DOM.iconId(i.id, i.type, i.icon);
                    }).join('')+
                    '</div>');
            };
        },
        leaveItem: function(evt){
            $(evt.currentTarget).find('.evol-actions,.evol-actions-nxtTd').remove();
        }
    }

};

Evol.View_Many = function() {

    var dom = Evol.DOM,
        eDico = Evol.Dico,
        i18n = Evol.i18n;

return Backbone.View.extend({

    viewName: 'Many',
    viewType: 'many',
    cardinality: 'n',

    options: {
        style: 'panel-default',
        pageSize: 20,
        pageIndex: 0,
        autoUpdate: false,
        // router: ...
        //titleSelector: '#title',
        //selectable: true,
        //TODO: editable: false,
        links: true,
        noDataString: i18n.nodata, //'No data to display.',
        iconsPath: 'pix/',
        fieldsetFilter: function (f) {
            return f.inMany;
        }
    },

    events: Evol.ViewMany.eventsMany,

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
        var models = this.collection ? this.collection.models : null;
        if (this.collection && this.collection.length) {
            models = eDico.filterModels(models, this._filter);
            this._render(models);
        } else {
            this.$el.html(dom.HTMLMsg(this.noDataString, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLbody: function (fields, pSize, icon, pageIdx, selectable) {
        var h =[],
            models = this.collection.models,
            rMin = (pageIdx > 0) ? pageIdx * pSize : 0,
            rMax = _.min([models.length, rMin + pSize]),
            ico = icon ? (this.iconsPath || '') + icon : null;

        if (rMax > 0) {
            var route = this.getItemRoute();
            for (var r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, models[r], ico, selectable, route);
            }
        }
        return h.join('');
    },

    _render: function (models) {
        alert('_render must be overridden');
    },

    _HTMLField: function (f, v) {
        if(f.type==='formula'){
            var fv = '<div class="disabled evo-rdonly evol-ellipsis">';
            if(f.formula && this.model){
                fv+=f.formula(this.model);
            }
            fv+='</div>';
            return fv;
        }else{
            return eDico.fieldHTML_RO(f, v, Evol.hashLov, this.iconsPath || '');
        }
    },

    _HTMLCheckbox: function (cid) {
        return dom.input.checkbox2(cid, false, 'list-sel');
    },
    /*
     customize: function () {
         var labels = this.$('th>span');
         if(this._custOn){
            labels.find('i').remove();
         }else{
            labels.append(dom.iconCustomize('id', 'field'));
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

    setTitle: function (title){
        return eDico.setViewTitle(this, title||this.getTitle());
    },

    getTitle: function () {
        // -- returns a string like "Contacts list"
        return Evol.Format.capitalize(this.uiModel.namePlural) + ' ' + this.viewName;
    },

    getFields: function () {
        if (!this._fields) {
            this._fields = Evol.Def.getFields(this.uiModel, this.fieldsetFilter);
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
            pSummary = this._pageSummary(pageIdx, pSize, collecLength);

        this._$body().html(this._HTMLbody(fields, pSize, this.uiModel.icon, pageIdx, this.selectable));
        this.$('.evo-pagination').html(this._HTMLpaginationBody(pageIdx, pSize, collecLength));
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
        if (this.selectable && sel.length > 0) {
            // TODO optimize and uncheck prev checked
            var selector = [];
            _.each(sel, function (id) {
                selector.push('[data-mid=' + id + '] .list-sel');
            });
            this.$(selector.join(',')).prop('checked', true);
        }
        return this;
    },

    pageSummary: function(){
        return this._pageSummary(this.pageIndex, this.pageSize, this.collection.length);
    },

    _pageSummary: function (pIdx, pSize, cSize) {
        if (cSize === 0) {
            return '';
        } else if (cSize === 1) {
            return cSize + ' ' + this.uiModel.name;
        } else if (pSize >= cSize) {
            return cSize + ' ' + this.uiModel.namePlural;
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
                .replace('{3}', this.uiModel.namePlural);
        }
    },

    _HTMLpagination: function (pIdx, pSize, cSize) {
        if (cSize > pSize) {
            return '<ul class="evo-pagination pagination pagination-sm">'+
                this._HTMLpaginationBody(pIdx, pSize, cSize)+
                '</ul>';
        }
        return '';
    },

    _HTMLpaginationBody: function (pIdx, pSize, cSize) {
        var h='';
        if (cSize > pSize) {
            var nbPages = Math.ceil(cSize / pSize),
                pId = pIdx + 1,
                maxRange,
                bPage = function(id){
                    h+='<li'+(pId===id?' class="active"':'')+
                        ' data-id="'+id+'"><a href="javascript:void(0)">'+id+'</a></li>';
                },
                bPageRange = function(pStart, pEnd){
                    for (var i=pStart; i<=pEnd; i++) {
                        bPage(i);
                    }
                },
                bGap = function(){
                    h+='<li class="disabled"><a href="javascript:void(0)">...</a></li>';
                };
            h+='<li data-id="prev"'+
                ((pId===1)?' class="disabled"':'')+
                '><a href="javascript:void(0)">&lt;</a></li>';
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
            h+='<li data-id="next"'+
                ((nbPages > pId) ? '' : ' class="disabled"')+
                '><a href="javascript:void(0)">&gt;</a></li>';
        }
        return h;
    },

    sortList: function (f, down, noRemember, noTrigger) {
        var collec = this.collection,
            fts = Evol.Def.fieldTypes;
        if (!_.isUndefined(collec)) {
            var sel = this.getSelection();
            if (f.type == fts.text || f.type == fts.textml || f.type == fts.email) {
                collec.comparator = eDico.bbComparatorText(f.id);
            }  else if (f.type === fts.formula) {
                collec.comparator = eDico.bbComparatorFormula(f.id, f.formula);
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
        if (this.router) {
            return '#' + this.uiModel.id + '/browse/';
        }
        return null;
    },

    click_navigate: function (evt) {
        var id = $(evt.currentTarget).closest('[data-mid]').data('mid');
        evt.type = 'navigate.many';
        this.$el.trigger(evt, {id: id});
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
// Original code and blog post by Steve Hall http://www.delimited.io/blog/2013/12/19/force-bubble-charts-in-d3
// Modified for Evolutility-UI-jQuery http://evoluteur.github.io/evolutility-ui-jquery/

var Evol=Evol||{};

Evol.Bubbles = function(){

var fts = Evol.Def.fieldTypes;

var Bubbles = function(opts){
    _.extend(this, opts);
    this.fieldsH={};
    for(var i in this.fields){
      var f=this.fields[i];
        this.fieldsH[f.id]=f;
    }
    return this;
};

Bubbles.prototype._initialize = function(){
  if(!this.graphInitialized){
  //var fill = d3.scale.ordinal().range(['#827d92','#827354','#523536','#72856a','#2a3285','#383435'])
    this.svg = d3.select(this.elem).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.force = d3.layout.force();
    this.graphInitialized=true;
  }
};

Bubbles.prototype.fixData = function(data){
  return _.map(data, function(d){
    return d;
  });
};

Bubbles.prototype.setData = function(data){
  var that=this,
      len=data.length,
      defaultSize=len<17 ? 20 : (len<100 ? 16 : 10);

  this.defaultSize=defaultSize;

  if(this.sizeFieldId){
    var sizes = _.map(data, function(d){
        var v= d[that.sizeFieldId];
        if(v===null || _.isNaN(v)){
          v=0;
        }
        return v;
      });
    this.plotScale = d3.scale.log().domain([ _.min(sizes), _.max(sizes)]).range([defaultSize, defaultSize+20]);
  }else{
    this.plotScale = function(d){ return defaultSize;};
  }

  this.fill = len<11?d3.scale.category10():d3.scale.category20();

  this.data = data;
  for (var j = 0; j < data.length; j++) {
    data[j].radius = defaultSize;
    data[j].x = Math.random() * this.width;
    data[j].y = Math.random() * this.height;
  }

  this._initialize();

  this.maxRadius = d3.max(_.pluck(data, 'radius'));

  this.nodes = this.svg.selectAll("circle")
    .data(data);

  this.nodes.enter().append("circle")
    .attr("class", "node")
    .attr('data-mid', function (d) { return d.id;})
    .attr("cx", function (d) { 
      return d.x;
    })
    .attr("cy", function (d) { 
      return d.y; 
    })
    .attr("r", function (d) { 
      return d.radius; 
    })
    .style("fill", function (d) { 
      return that.fill(d[that.colorFieldId]); 
    })
    .on("mouseenter", showPopover)
    .on("mouseleave", removePopovers)
    .on("click", removePopovers);

  this.nodes
    .attr('data-mid', function (d) { return d.id;})
    .attr("cx", function (d) { 
      return d.x;
    })
    .attr("cy", function (d) { 
      return d.y; 
    })
    .attr("r", function (d) { 
      return d.radius; 
    })
    .style("fill", function (d) { 
      return that.fill(d[that.colorFieldId]); 
    });


  this.nodes.exit().remove();

  this.changeBubblesSize (this.sizeFieldId);

  this.changeBubblesGroup(this.groupFieldId);

  function removePopovers () {
    $('.popover').each(function() {
      $(this).remove();
    }); 
  }

  function showPopover (d) {
    $(this).popover({
      animation: true,
      placement: 'auto top',
      container: 'body',
      trigger: 'manual',
      html : true,
      content: that.tooltip(d)
    });
    $(this).popover('show', 500);
    if(d3){
      d3.select('.popover').style('opacity', 0)
        .transition().duration(500)
        .style('opacity', 1);
    }
  }

};

Bubbles.prototype.getCenters = function (fId, size, data) {
  var f=this.fieldsH[fId],
      centers, 
      map,
      na='N/A';

  centers = _.uniq(_.pluck(data, fId)).map(function (d) {
    return {name: d, value: 1};
  });

  if(f){
    if(f.type==='lov'){
      var lovH={};
      _.forEach(f.list, function(c){
        lovH[c.id]=c.text;
      });
      _.forEach(centers, function(c){
        c.label=lovH[c.name]||na;
      });
      centers=centers.sort(Evol.Dico.sortText('label'));
    }else if(f.type==='boolean'){
      _.forEach(centers, function(c){
        if(c.name===true){
          c.label = f.labelTrue || Evol.i18n.yes;
        }else if(c.name===false){
          c.label = f.labelFalse || Evol.i18n.no;
        }else{
          c.label=na;
        }
      });
    }else if(Evol.Def.fieldIsNumber(f)){
      centers = centers.sort(Evol.Dico.sortNumber('name'));
      var c=_.findWhere(centers, {'name': null});
      if(c){
        c.label = na;
      }
    }/*else{
      centers = _.sortBy(centers, 'name');
    }*/
  }
  map = d3.layout.treemap().size(size).ratio(1/1);
  map.nodes({children: centers});

  return centers;
};

Bubbles.prototype.changeBubblesGroup = function(groupFieldId){
  var centers = this.getCenters(groupFieldId, [800, 600], this.data);

  this.groupFieldId = groupFieldId;
  this.force.on("tick", this.tick(centers, groupFieldId, this.data));
  this.labels(centers);
  this.force.start();
};

Bubbles.prototype.changeBubblesColor = function (colorFieldId){
  var that=this;
  this.colorFieldId=colorFieldId;
  this.fill = d3.scale.category10();
  this.svg.selectAll('circle')
    .transition().duration(500)
    .style('fill', function(d){
      return colorFieldId?that.fill(d[colorFieldId]):'rgb(31, 119, 180)';
    });
};

Bubbles.prototype.changeBubblesSize = function (sizeFieldId){
  var that=this;

  this.sizeFieldId=sizeFieldId;
  var cs=this.svg.selectAll('circle');
  if(sizeFieldId){
    var sizes = _.map(this.data, function(d){
      var v=d[sizeFieldId];
      return (v===null || v===isNaN || _.isUndefined(v))?0:v;
    });
    this.plotScale = d3.scale.log().domain([ _.min(sizes), _.max(sizes)]).range([10, 25]);
    cs.transition().duration(500)
      .attr('r', function(d){
        var v=sizeFieldId?that.plotScale(d[sizeFieldId]||0):10;
        if(v===null || _.isNaN(v)){
          v=that.defaultSize;
        }
        return v;
      });
      //.ease("elastic");
  }else{
    cs.transition().duration(500)
      .attr('r', that.defaultSize);
      //.ease("elastic");
  }
  //this.force.start();
};

Bubbles.prototype.tick = function (centers, varname) {
  var that=this,
      foci = {};

  for (var i = 0; i < centers.length; i++) {
    foci[centers[i].name] = centers[i];
  }
  return function (e) {
    for (var i = 0; i < that.data.length; i++) {
      var o = that.data[i];
      var f = foci[o[varname]];
      o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
      o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
    }
    that.nodes.each(that.collide(0.12, that.data))
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });
  };
};

Bubbles.prototype.labels = function(centers) {
  this.svg.selectAll(".label").remove();
  this.svg.selectAll(".label")
    .data(centers)
    .enter().append("text")
      .attr("class", "label")
      .text(function (d) { 
        return d.label || d.name ;
      })
      .attr("transform", function (d) {
        return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + 20) + ")";
      });
};

Bubbles.prototype.collide = function(alpha, data) {
  var quadtree = d3.geom.quadtree(data),
      maxRadius=this.maxRadius,
      padding=2;
  return function (d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
};

return Bubbles;

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many-bubbles.js
 *
 * View "many bubbles" to show a Bubble Chart of a collection of many models.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Bubbles = Evol.View_Many.extend({

    viewName: 'bubbles',
    icon: 'adjust', // glyphicon-adjust

    events: {
        //'click .evol-buttons>button': 'click_button',
        //'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
        'click .btn': 'clickGroup',
        'change .bubble-group': 'changeGroup',
        'change .bubble-color': 'changeColor',
        'change .bubble-size': 'changeSize',
        'click svg>circle': 'clickCircle'
    },

    fieldsetFilter: Evol.Def.fieldChartable,

    setupBubbles: function() {
        var that=this,
            ui=this.uiModel,
            models = this.collection.models;

        if(!this._bubblesInitialized){
            var flds = Evol.Def.getFields(this.uiModel, Evol.Def.fieldChartable),
                fd=flds.length?flds[0].id:null;
            this.bubbles = new Evol.Bubbles({
                //selector:'.evol-bubbles-body',
                elem: this.$('.evol-bubbles-body').get(0),
                width:1200, 
                height:700, 
                fields: flds,
                colorFieldId: fd,
                groupFieldId: fd,
                sizeFieldId: null,
                uiModel: this.uiModel,
                tooltip: function(d){
                    var h=[],
                    flds=that.getFields();
                    Evol.ViewMany.Cards.prototype.HTMLItem.call(that, h, flds, new Backbone.Model(d), null, null, null, true);
                    return h.join('');
                }
            });
            this.bubbles.setData(_.map(models, function(m){
                return _.extend({
                    id: m.id
                }, m.attributes);
            }));

            this._bubblesInitialized=true;
        }
    },

    _render: function (models) {
        var dom = Evol.DOM,
            i18nTools = Evol.i18n.tools,
            hOpt = dom.input.option,
            hOptNull = dom.html.emptyOption,
            fo,
            fs2 = Evol.Def.getFields(this.uiModel, Evol.Def.fieldChartable),
            h = '<div class="evol-many-bubbles panel '+this.style+'"><div class="evol-bubbles-body">'+
                '<div class="d3-tooltip" style="opacity:0;"></div>';
        //h+=this._HTMLbody(this.getFields(), pSize, this.uiModel.icon, 0, this.selectable);

        h+='<div class="bubbles-opts '+this.style+'">';
        if(fs2.length){
            // --- Group ---
            h+='<label>'+i18nTools.vizGroupBy+': </label>';
            if(fs2.length>5){
                fo=_.map(fs2, function(f, idx){
                        return hOpt(f.id, f.label, idx===0);
                    });
                h+='<select class="form-control bubble-group">'+hOptNull + fo.join('')+'</select>';
            }else{
                h+='<div class="btn-group" data-toggle="buttons">'+
                _.map(fs2, function(f, idx){
                    if(_.isUndefined(f.groupable) || f.groupable){
                        return '<label class="btn btn-default'+(idx===0?' active':'')+'" id="'+f.id+'">'+
                              '<input type="radio" name="options"'+(idx===0?' checked':'')+'>'+f.label+'</label>';
                    }
                }).join('')+
                '</div>';
            }
            // --- Color ---
            fo=_.map(fs2, function(f, idx){
                    return (_.isUndefined(f.colorable) || f.colorable) ? hOpt(f.id, f.label, idx===0) : '';
                });
            h+='<label>'+i18nTools.vizColorBy+': </label><select class="form-control bubble-color">'+hOptNull + fo.join('')+'</select>';
            // --- Size ---
            fs2=_.filter(fs2, function(f){
                return (_.isUndefined(f.sizable) || f.sizable) ? Evol.Def.fieldIsNumber(f) : '';
            });
            fo=_.map(fs2, function(f, idx){
                return hOpt(f.id, f.label);
            });
            if(fo.length){
                h+='<label>'+i18nTools.vizSizeBy+': </label><select class="form-control bubble-size">'+hOptNull+fo.join('')+'</select>';
            }
            //h+=dom.html.clearer;
        }else{
            h+=Evol.i18n.notEnoughdata;
        }
        h+='</div></div></div>';
        this.$el.html(h);
        this.setupBubbles();
        return this;
    },

    _HTMLbody: function(){

    },

    _HTMLlegend: function(){
        // todo
    },

    _$body: function(){
        return this.$('.evol-bubbles-body');
    },

    setCollection: function(collec){
        this.collection = collec;
        this.bubbles.setData(_.map(collec.models, function(m){
            return _.extend({
                id: m.id
            }, m.attributes);
        }));
        return this;
    },

    clickGroup: function(evt){
        this.bubbles.changeBubblesGroup(evt.currentTarget.id);
    },
    changeGroup: function(evt){
        this.bubbles.changeBubblesGroup(evt.target.value);
    },

    changeColor: function(evt){
        this.bubbles.changeBubblesColor(evt.target.value);
    },

    changeSize: function(evt){
        this.bubbles.changeBubblesSize(evt.target.value);
    },

    clickCircle: function(evt){
        var id=$(evt.currentTarget).data('mid');
        this.$el.trigger('click.bubble', {id:id});
        window.location.href = '#'+ this.uiModel.id + '/browse/'+id;
    }

});

;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many-cards.js
 *
 * View "many cards" to show a collection as many cards.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.View_Many.extend({

    viewName: 'cards',
    // TODO icon should be different than view Mini
    icon: 'th-large', // glyphicon-th-large

    events: _.extend({
        'mouseenter .evol-cards-body>div': 'enterItem',
        'mouseleave .evol-cards-body>div': 'leaveItem'
    }, Evol.ViewMany.eventsMany),

    fieldsetFilter: function (f) {
        return f.inMany || f.inCards;
    },

    _render: function (models) {
        var pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        this.$el.html('<div class="evol-many-cards"><div class="evol-cards-body">'+
            this._HTMLbody(this.getFields(), pSize, this.uiModel.icon, 0, this.selectable)+
            '</div>'+Evol.DOM.html.clearer+
            this._HTMLpagination(0, pSize, models.length)+
            '<div class="evo-many-summary">'+pSummary+'</div>'+
            '</div>');
        return this;
    },

    _$body: function(){
        return this.$('.evol-cards-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route, isTooltip){
        var that = this,
            v,
            fts = Evol.Def.fieldTypes,
            link = (this.links!==false),
            domInput = Evol.DOM.input;

        if(isTooltip){
            h.push('<div class="evol-bubble-tooltip">');
        }else{
            h.push('<div class="panel '+this.style+'">');
        }
        _.each(fields, function(f, idx){
            if(f.type===fts.color) {
                v = model.escape(f.attribute || f.id);
                v = domInput.colorBox(f.id, v, v);
            }else if(f.type==='formula'){
                v = domInput.formula(null, f, model);
            }else if(f.type==='image' && !isTooltip){ 
                v = '<a href="#'+route+model.id+'">'+
                    that._HTMLField(f, model.escape(f.attribute || f.id))+
                    '</a>';
            }else if(f.type===fts.json){
                v = model.get(f.attribute || f.id);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="'+model.id+'">');
                // Item badge
                var bf=that.uiModel.fnBadge;
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
                h.push('<h4>'+(selectable?that._HTMLCheckbox(model.id):'')+
                    Evol.Dico.fieldLink(null, f, v, icon, !link, route?route+model.id:null)+
                    '</h4></div>');
            }else{
                var label2 = f.labelCards,
                    css2=(f.type==fts.email || f.type==fts.url?'evol-ellipsis"':'');
                if(label2===''){
                    css2 += (f.type==fts.pix?'evol-c-center"':'');
                    h.push('<div'+ (css2?' class="'+css2+'"':'') +'>'+v+'</div>');
                }else {
                    if(!label2){
                        label2 = f.labelMany || f.label;
                    }
                    h.push('<div class="'+ css2 +'"><label>'+label2+':</label> '+v+'</div>');
                }
            }
        });
        h.push('</div>');
        return this;
    },

    /* customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(Evol.DOM.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    }*/

    enterItem: Evol.ViewMany.actionEvents.enterItem(Evol.ViewMany.menuOne),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,
    
    clickAction: function(evt){
        var that = this,
            e = $(evt.currentTarget),
            aid = e.data('id'),
            id = e.parent().siblings().eq(0).data('mid'),
            p = e.closest('.panel');
        
        if(aid==='edit'){
            this.$el.trigger('navigate', {id: id, view: aid});
        }else{
            this.$el.trigger('action', {
                id: aid, 
                mid: id, 
                title: Evol.Dico.getItemTitle(p),
                skipWarning: evt.shiftKey,
                fnSuccess: function(escape){
                    p.fadeOut(500, function(){
                        p.remove();
                        that.$el.trigger('status', that.pageSummary());
                    });
                }
            });
        }
    }

});

;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many-charts.js
 *
 * View "many charts" to display a collection as a set of charts.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

// Quick and easy implementation w/ the old version of google charts
// must be re-written to use D3.js or other cool stuff

Evol.ViewMany.Charts = function() {

var dom = Evol.DOM,
    eDico = Evol.Dico,
    i18n = Evol.i18n;

return Evol.View_Many.extend({

    viewName: 'charts',
    icon: 'stats', // glyphicon-stats

    isChart: true,

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        fieldsetFilter: Evol.Def.fieldInCharts,
        autoUpdate: false
    },

    events: {
        'mouseenter .evol-many-charts>div': 'enterItem',
        'mouseleave .evol-many-charts>div': 'leaveItem',
        'click .evol-actions>i': 'clickAction'
        //'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        this.entityName=Evol.Format.capitalize(this.uiModel.namePlural);
        if(this.collection && this.collection.length>0){
            this.$el.html('<div class="evol-many-'+this.viewName+'">'+
                this._HTMLcharts(this.style || 'panel-info', this.sizes)+
                '</div>');
        }else{
            this.$el.html(dom.HTMLMsg(i18n.nodata, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLcharts: function (style, sizes) {
        var h='',
            fTypes = Evol.Def.fieldTypes,
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
                var trData = Evol.Def.countBy(models, f, cData, iconsPath);
                var data=trData.data,
                    labels=trData.labels,
                    nb, dataSetName,
                    isList=f.type===fTypes.lov || f.type===fTypes.list;
/*
                if(f.type===fTypes.bool){
                    groups = _.countBy(models, function(m) {
                        return m.get(f.id)===true;
                    });
                    for(dataSetName in groups) {
                        nb=groups[dataSetName];
                        if(dataSetName==='true'){
                            lb = f.labelTrue || i18n.yes;
                        }else{
                            lb = f.labelFalse || i18n.no;
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
                                lb = eDico.lovItemTextNoPix(f, dataSetName);
                            }else{
                                lb = eDico.lovItemText(f, dataSetName, Evol.hashLov, iconsPath);
                            }
                        }else{
                            lb = dataSetName;
                        }
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }
                */
                chartType = f.typeChart || (f.type===fTypes.lov ? 'pie':'bars');
                h+='<div class="evol-chart-holder panel '+style+'">'+
                    '<div class="opts"></div><div class="chart-holder" data-fid="'+f.id+'" data-ctype="'+chartType+'">';
                if(chartType==='pie'){
                    h+=dom.Charts.Pie(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aByB', entityName, f.label), data, labels, style, sizes);
                }else if(chartType==='bars'){
                    h+=dom.Charts.Bars(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aB', entityName, f.label), data, labels, style, sizes);
                }
                h+='</div><br></div>';
            });
            this._cData=cData;
        }else{
            h+=dom.HTMLMsg(i18n.nochart, i18n.badchart);
        }
        h+=dom.html.clearer;
        return h;
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    },

    enterItem: Evol.ViewMany.actionEvents.enterItem([
        {id:'bars', type:null, icon:'stats'},
        {id:'pie',type: null, icon:'record'},
        //{id:'big',type: null, icon:'resize-full'} // resize-small
    ]),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,

    clickAction: function(evt){
        var el=$(evt.currentTarget),
            cType=el.data('id'),
            holder=el.parent().parent().find('.chart-holder'),
            oType=holder.data('ctype'),
            fid=holder.data('fid'),
            oldData=this._cData[fid],
            f=oldData.field,
            chart=dom.Charts,
            c, cl;

        if(cType!=oType){
            if(cType==='bars'){
                c='Bars';
                cl='charts.aB';
            }else{
                c='Pie';
                cl='charts.aByB';
            }
            holder.html(chart[c](f.labelCharts?f.labelCharts:i18n.getLabel(cl, this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            holder.data('ctype', cType);
        }
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many-list.js
 *
 * View "many list" to display a collection as a list (table w/ sorting and paging).
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.View_Many.extend({

    viewName: 'list',
    icon: 'th-list', // glyphicon-th-list

    events: _.extend({
        'mouseenter tbody>tr': 'enterItem',
        'mouseleave tbody>tr': 'leaveItem',
        'click .evol-sort-icons>i': 'click_sort'
    }, Evol.ViewMany.eventsMany),

    fieldsetFilter: function (f) {
        return f.inMany || f.inList;
    },

    _render: function (models) {
        var h = '',
            that = this,
            fields = this.getFields(),
            pSize = this.pageSize || 50,
            link = (this.links!==false);

        h+='<div class="evol-many-list">'+
            '<div><table class="table'+(link?' table-hover':'')+'"><thead><tr>';
        if(this.selectable){
            h+='<th class="list-td-sel">'+this._HTMLCheckbox('cbxAll')+'</th>';
        }
        _.each(fields, function(field){
            h+=that._HTMLlistHeader(field);
        });
        h+='</tr></thead><tbody>'+
            this._HTMLbody(fields, pSize, this.uiModel.icon, 0, this.selectable)+
            '</tbody></table></div>'+
            this._HTMLpagination(0, pSize, models.length)+
            '<div class="evo-many-summary">'+this.pageSummary(this.pageIndex, pSize, models.length)+'</div>'+
            '</div>';
        this.$el.html(h);
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            bf = that.uiModel.fnBadge,
            link = (this.links!==false),
            ft = Evol.Def.fieldTypes,
            input = Evol.DOM.input;

        h.push('<tr data-mid="'+model.id+'">');
        if(selectable){
            h.push('<td class="list-td-sel">'+this._HTMLCheckbox(model.id)+'</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===ft.color){
                v = input.colorBox(f.id, model.escape(f.attribute || f.id));
            }else if(f.type===ft.formula){
                v = input.formula(null, f, model);
            }else if(f.type===ft.json || f.type===ft.html){
                v = model.get(f.attribute || f.id);
                //if(v && v.length>200){
                    //v = v.subString(0,200)+'...';
                //}
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if(idx===0){
                v = Evol.Dico.fieldLink(null, f, v, icon, !link, route?route+model.id:null);
                // Item badge
                if(bf){
                    var badgeText;
                    if(_.isFunction(bf)){
                       badgeText=bf(model)||'';
                    }else if(_.isString(bf)){
                        badgeText=model.escape(bf)||'';
                    }
                    if(badgeText){
                        v+='<span class="badge badge-list">'+badgeText+'</span>';
                    }
                }
            }
            var css=f.css || '';
            if(f.type===ft.email || f.type===ft.url){
                css+=' evol-ellipsis';
            }else if(f.type===ft.pix){
                css+=' evol-td-pix';
            }else if(Evol.Def.fieldIsNumber(f)){
                css+=' evol-r-align';
            }
            h.push('<td class="'+css+'">'+v+'</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (f) {
        var h='<th><span id="'+f.id+'-lbl">'+
            (f.labelList || f.labelMany || f.label);
        if(f.sortable!==false){
            h+='<span class="evol-sort-icons" data-fid="'+f.id+'">'+
                Evol.DOM.icon('chevron-up')+//'sort-by-alphabet'
                Evol.DOM.icon('chevron-down')+//'sort-by-alphabet-alt'
                '</span>';
        }
        h+='</span></th>';
        return h;
    },

    click_sort: function (evt) {
        var target = $(evt.currentTarget),
            fid = target.parent().data('fid'),
            f = this.getField(fid),
            down = target.attr('class').indexOf('-down') > 0;
        this.sortList(f, down);
        //target.addClass('evol-last-sort');
    },

    enterItem: Evol.ViewMany.actionEvents.enterItem(
        Evol.ViewMany.menuOne, 
        function(e){
            return e.children().eq(0);
        },
        true
    ),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,
    
    clickAction: function(evt){
        var that=this,
            e=$(evt.currentTarget),
            aid=e.data('id'),
            tr=e.closest('tr'),
            id=tr.data('mid');

        if(aid==='edit'){
            this.$el.trigger('navigate', {id: id, view: aid});
        }else{
            this.$el.trigger('action', {
                id: aid, 
                mid: id, 
                title: e.closest('tr').find('a>span').text(),
                skipWarning: evt.shiftKey,
                fnSuccess: function(escape){
                    tr.fadeOut(500, function(){
                        tr.remove();
                        that.$el.trigger('status', that.pageSummary());
                    });
                }
            });
        }
    }

});

;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: one.js
 *
 * View "one" should not be instanciated but inherited.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne = {};

Evol.View_One = function(){

    var dom = Evol.DOM,
        uiInput = dom.input,
        i18n = Evol.i18n,
        i18nTools = i18n.tools,
        eDef=Evol.Def,
        eDico = Evol.Dico,
        fts = eDef.fieldTypes;

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
        'click [data-id="bPlus"],[data-id="bMinus"]': 'click_detailsAddDel',
        'keyup [data-id="bPlus"],[data-id="bMinus"]': 'click_detailsAddDel'
    },

    options: {
        style: 'panel-default',
        button_addAnother: false,
        titleSelector: '#title',
        iconsPath: 'pix/'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.mode = this.mode || this.viewName;
        this._tabId = false;
        this._subCollecs = this._subCollecsOK = false;
    },

    render: function () {
        var h = [];
        this._render(h, this.mode);
        this.$el.html(h.join(''));
        this.custOn=false;
        this.postRender();
        this.setData(this.model, true);
        return this;
    },

    postRender: function (){
        // to overwrite...
    },

    getFields: function (){
        if(!this._fields){
            var that = this;
            this._fields = eDef.getFields(this.uiModel, this.fieldsetFilter);
            this._fieldHash = eDef.getFieldsHash(this._fields);
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
            this._subCollecs = eDef.getSubCollecs(this.uiModel);
            this._subCollecsOK = true;
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
        _.forEach(fs, function(f){
            vs[f.id]=that.getFieldValue(f);
        });
        if(subCollecs && subCollecs.length){
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
                        v[f.id]=eDico.getFieldVal(f, cells.eq(idx).find('input,select,textarea').eq(0));
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
                    fv=model.get(f.attribute || f.id)||'';
                }else{
                    fv=model[f.attribute || f.id]||'';
                }
                if(f.readonly){
                    switch(f.type){
                        case fts.pix:
                            //newPix=(fv)?('<img src="'+iconsPath+fv+'" onError="Evol.PixErr()" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            //$f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+i18n.nopix+'</p>'));
                            break;
                        case fts.textml:
                            $f.html(Evol.Format.cr2br(fv, true));
                            break;
                        case fts.bool:
                        case fts.url:
                        case fts.email:
                        case fts.list:
                        case fts.lov:
                            $f.html(eDico.fieldHTML_RO(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
                            break;
                        case fts.formula:
                            $f.html(f.formula?f.formula(model):'');
                            break;
                        case fts.color:
                            $f.html(uiInput.colorBox(f.id, fv, fv));
                            break;
                        case fts.json:
                            $f.val(Evol.Format.jsonString(fv, false));
                            break;
                        default:
                            $f.text(eDico.fieldHTML_RO(f, _.isUndefined(fv)?'':fv, Evol.hashLov, iconsPath) + ' ');
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
                        case fts.date:
                            if(fv){
                                fv=fv.substring(0, 10);
                            }
                            $f.val(fv);
                            break;
                        case fts.pix:
                            newPix=(fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                            $f.val(fv)
                                .prev().remove();
                            $f.before(newPix);
                            break;
                        case fts.list:
                            //$f.select2('val', fv);
                            try{
                                $f.select2('val', _.isString(fv)?[fv]:fv);
                            }catch(e){
                                console.error('error with select2');
                                return '';
                            }
                            break;
                        case fts.formula:
                            $f.html(f.formula?f.formula(model):'');
                            break;
                        case fts.json:
                            $f.val(Evol.Format.jsonString(fv, false));
                            break;
                        default:
                            $f.val(fv);
                    }
                }
            });
            if(subCollecs){
                _.forEach(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, sc.readonly?'browse':'edit');
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
            if(f.hasOwnProperty('defaultValue')){
                that.setFieldValue(f.id, f.defaultValue);
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
            return eDico.getFieldVal(this._fieldHash[f], this.$field(f));
        }else {
            var fv=eDico.getFieldVal(f, this.$field(f.id));
            if(f.type===fts.json){
                var obj;
                try{
                    obj=$.parseJSON(fv);
                }catch(err){}
                if(_.isUndefined(obj)){
                    return fv;
                }
                return obj;
            }else if(f.type===fts.date){
                var v=eDico.getFieldVal(f, this.$field(f.id));
                return v.length===10?v+'T08:00:00.000Z':v;
            }else{
                return eDico.getFieldVal(f, this.$field(f.id));
            }
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
                    dom.showOrHide($f, value);
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
        //this.setData(new Backbone.Model());
        _.each(this.getFields(), function (f) {
            $f = that.$field(f.id);
            defaultVal = f.defaultValue || '';
            if(f.readonly){
                $f.html(defaultVal);
            }else{
                switch(f.type) {
                    case fts.bool:
                        $f.prop('checked', defaultVal?'checked':false);
                        break;
                    case fts.list:
                        $f.select2('val', defaultVal);
                        break;
                    case fts.pix:
                        //var newPix=(defaultVal)?('<img src="'+iconsPath+defaultVal+'" class="img-thumbnail">'):('<p class="">'+i18n.nopix+'</p>');
                        var newPix='<p>'+i18n.nopix+'</p>';
                        $f.val('')
                            .prev().remove();
                        $f.before(newPix);
                        break;
                    case fts.formula:
                        $f.html('');
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
        //Evol.Dico.clearCacheLOV();
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
                 isNumType=eDef.fieldIsNumber,
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

                 if(isNumType(f)){
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
        h.push(dom.html.clearer+
            '<div class="evol-buttons panel '+this.style+'">'+
            dom.button('cancel', i18n.tools.bCancel, 'btn-default')+
            dom.button('save', i18n.tools.bSave, 'btn-primary'));
        if (this.model && this.model.isNew() && this.button_addAnother && mode!=='json') {
            h.push(dom.button('save-add', i18n.tools.bSaveAdd, 'btn-default'));
        }
        h.push('</div>');
    },

    _render: function (h, mode) {
        // forms to EDIT and BROWSE
        var that=this,
            iTab = -1,
            iPanel = -1,
            elems = this.uiModel.elements;

        h.push('<div class="evo-one-'+mode+'">');
        _.each(elems, function(p, idx){
            if(p.type==='tab'){
                if (iPanel > 0) {
                    h.push('</div>');
                    iPanel = -1;
                }
                if (iTab < 0) {
                    h.push(dom.html.clearer);
                    that._renderTabTitles(h, elems);
                    h.push('<div class="tab-content">');
                }
                iTab++;
                h.push('<div id="evol-tab-'+idx+'" class="tab-pane'+(iTab === 0 ? ' active">' : '" style="display:none;">'));
                that._renderTab(h, p, mode);
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
        if (iTab > 0) {
            h.push('</div>');
        }
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
    },

    _renderTabTitles: function (h, tabs) {
        var isFirst = true;
        h.push('<ul class="nav nav-tabs evol-tabs">');
        _.each(tabs, function (tab, idx) {
            if (tab.type === 'tab') {
                if (isFirst) {
                    h.push('<li class="active '+(tab.cssLabel||'')+'">');
                    isFirst = false;
                } else {
                    if(tab.cssLabel){
                        h.push('<li class="'+tab.cssLabel+'">');
                    }else{
                        h.push('<li>');
                    }
                }
                h.push('<a href="#evol-tab-'+idx+'">'+tab.label+'</a></li>');
            }
        });
        h.push('</ul>');
    },

    _renderTab: function (h, tab, mode) {
        var that = this;
        h.push('<div class="evol-pnls '+(tab.css||'')+'">');
        _.each(tab.elements, function (p, idx) {
            if(!p.id){
                p.id='p-'+idx;
            }
            if (p.type === 'panel-list') {
                that._renderPanelList(h, p, mode);
            } else {
                that._renderPanel(h, p, mode);
            }
        });
        h.push(dom.html.clearer+'</div></div>'); // TODO 2 div?
    },

    _renderPanel: function (h, p, mode, visible) {
        var that = this,
            iconsPath = this.iconsPath;

        if(mode==='wiz'){
            var hidden= _.isUndefined(visible)?false:!visible;
            h.push('<div data-p-width="100" class="evol-pnl evo-p-wiz" style="width:100%;'+(hidden?'display:none;':'')+'">');
        }else{
            h.push('<div data-p-width="'+p.width+'" class="evol-pnl" style="width:'+p.width+'%">');
        }
        h.push(dom.panelBegin(p, this.style||'panel-default', true),
            '<fieldset data-pid="'+p.id+(p.readonly?'" disabled>':'"><div class="evol-fset">'));
        _.each(p.elements, function (elem) {
            if(elem.type=='panel-list'){
                that._renderPanelList(h, elem, elem.readonly?'browse':mode);
            }else{
                if(elem.type==fts.hidden){
                    h.push(uiInput.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultValue, mode)));
                }else{
                    h.push('<div style="width:'+parseInt(elem.width||100, 10)+'%" class="evol-fld">');
                    if(elem.type==='panel'){
                        that._renderPanel(h, elem, mode, iconsPath);
                    }else{
                        that.renderField(h, elem, mode, iconsPath);
                    }
                    h.push("</div>");
                }
            }
        });
        h.push('</div></fieldset>'+
            dom.panelEnd()+
            '</div>');
        return this;
    },

    _renderPanelList: function (h, p, mode) {
        var isEditable = p.readonly?false:(mode!=='browse'),
            vMode=isEditable?mode:'browse',
            fts=eDef.fieldTypes;

        function _th(h, e){
            if(e.type===fts.pix){
                h.push('<th class="evo-col-pix">');
            }else{
                h.push('<th>');
            }
            h.push(e.label+((isEditable && e.required)?dom.html.required:'')+'</th>');
        }

        h.push('<div style="width:'+p.width+'%" class="evol-pnl" data-pid="'+p.id+'">',
            dom.panelBegin(p, this.style, true),
            '<div class="evo-plist"><table class="table" data-mid="'+(p.attribute || p.id)+'"><thead><tr>');
        
        if(_.isArray(p.elements)){
            _.each(p.elements, function (elem) {
                _th(h, elem);
            });
        }else if(_.isObject(p.elements)){
            for( var elem in p.elements){
                _th(h, elements[elem]);
            }
        }
        if(vMode==='edit'){
            h.push('<th></th>');
        }
        h.push('</tr></thead><tbody>');
        this._renderPanelListBody(h, p, null, vMode);
        h.push('</tbody></table></div>',
            dom.panelEnd(),
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
                var TDbPM='<td class="evo-td-plusminus">'+dom.buttonsPlusMinus()+'</td>';
                _.each(vs, function(row, idx){
                    h.push('<tr data-idx="'+idx+'">');
                    if(editable){
                        h.push(that._TDsFieldsEdit(uiPnl.elements, row)+TDbPM);
                    }else{
                        _.each(fs, function (f) {
                            h.push('<td>');
                            if(row[f.id]){
                                if(f.type===fts.bool || f.type===fts.lov || f.type===fts.pix){
                                    h.push(eDico.fieldHTML_RO(f, row[f.id], Evol.hashLov, iconsPath));
                                }else{
                                    h.push(_.escape(eDico.fieldHTML_RO(f, row[f.id], Evol.hashLov, iconsPath)));
                                }
                            }else{
                                h.push(_.escape(eDico.fieldHTML_RO(f, '', Evol.hashLov, iconsPath)));
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
            (mode==='edit'?dom.buttonsPlus():'')+
            '</td></tr>';
    },

    _TDsFieldsEdit: function(fs, m){
        var h='',
            fv,
            iconPath=this.iconPath;
        _.each(fs, function (f) {
            fv=m[f.id];
            if(_.isUndefined(fv)){
                fv='';
            }
            h+='<td>'+eDico.fieldHTML(f, f.id, fv, 'edit-details', iconPath, true)+'</td>';
        });
        return h;
    },

    renderField: function (h, f, mode, iconsPath, skipLabel) {
        var fv='';
        if(this.model && this.model.has(f.id)){
            fv = (mode !== 'new') ? this.model.get(f.id) : f.defaultValue || '';
        }
        if(f.type===fts.formula){
            if(!skipLabel){
                h.push(Evol.Dico.HTMLFieldLabel(f, mode || 'edit'));
            }
            h.push(dom.input.formula(this.fieldViewId(f.id), f, this.model));
        }else if(f.type===fts.json && (mode==='browse' || f.readOnly)){
            if(!skipLabel){
                h.push(Evol.Dico.HTMLFieldLabel(f, mode));
            }
            h.push(dom.input.textM(this.fieldViewId(f.id), Evol.Format.jsonString(fv, false), f.maxLen, f.height, true));
        }else{
            h.push(eDico.fieldHTML(f, this.fieldViewId(f.id), fv, mode, iconsPath, skipLabel));
        }
        return this;
    },

    getTitle: function(){
        if(this.model){
            if(this.model.isNew && this.model.isNew()){
                return i18n.getLabel('tools.newEntity', this.uiModel.name);
            }
            var lf=this.uiModel.fnTitle;
            return _.isFunction(lf)?lf(this.model):this.model.get(lf);
        }else{
            return Evol.Format.capitalize(this.uiModel.name);
        }
    },

    setTitle: function (title){
        var bdg=this.uiModel.fnBadge;
        if(bdg){
            if(_.isString(bdg)){
                bdg=this.model.escape(bdg)||'';
            }else{
                bdg=bdg(this.model);
            }
        }
        return eDico.setViewTitle(this, title, bdg);
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
        // --- validate sub-collections
        if(this._subCollecs){
            var that = this;
            _.each(this._subCollecs, function (sc) {
                var scData = data[sc.id],
                    trs = that.$('[data-pid="'+sc.id+'"] tbody > tr'),
                    scInvalid = 0;
                _.each(scData, function(rowData, idx){
                    _.each(sc.elements, function(f){
                        if(that.validateField(f, (f.type==='date') ? (rowData[f.id]?rowData[f.id].substring(0,10):'') : rowData[f.id])){
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
            numberField = eDef.fieldIsNumber(f);

        function formatMsg(fLabel, msg, r2, r3){
            return msg.replace('{0}', fLabel)
                .replace('{1}', r2)
                .replace('{2}', r3);
        }
        function fieldLabel(f){
            return f.label || f.labelMany;
        }

        if(!f.readonly){

            // Check required and empty
            if (f.required && (v==='' ||
                    (numberField && isNaN(v)) ||
                    (f.type===fts.lov && v==='0') ||
                    (f.type===fts.list && v && v.length===0) //||
                    //(f.type===fts.color && v==='#000000')
                )){
                return formatMsg(f.label, i18nVal.empty);
            } else {

                // Check field type
                if( !(isNaN(v) && numberField)) {
                    if (v !== '' && !_.isArray(v)){
                        switch (f.type) {
                            case fts.int:
                            case fts.email:
                                if (!this.valRegEx[f.type].test(v)) {
                                    return formatMsg(fieldLabel(f), i18nVal[f.type]);
                                }
                                break;
                            case fts.dec:
                            case fts.money:
                                var regex = this.valRegEx[fts.dec + i18n.LOCALE] || this.valRegEx[fts.dec + 'EN'];
                                if (!regex.test(v)){
                                    return formatMsg(fieldLabel(f), i18nVal[f.type]);
                                }
                                break;
                            case fts.date:
                            case fts.datetime:
                            case fts.time:
                                if ((v !== '') && (!_.isDate(new Date(v)))) {
                                    return formatMsg(fieldLabel(f), i18nVal[f.type]);
                                }
                                break;
                            case fts.json:
                                var obj;
                                if(_.isObject(v)){
                                    obj=v;
                                }else{
                                    try{
                                        obj=$.parseJSON(v);
                                    }catch(err){}
                                    if(_.isUndefined(obj)){
                                        return formatMsg(fieldLabel(f), i18nVal[f.type]);
                                    }
                                }
                                break;
                        }
                    }
                }

                // Check regexp
                if (f.regExp !== null && !_.isUndefined(f.regExp)) {
                    var rg = new RegExp(f.regExp);
                    if (!v.match(rg)) {
                        return formatMsg(fieldLabel(f), i18nVal.regExp, fieldLabel(f));
                    }
                }

                // Check min & max
                if (numberField) {
                    if (v !== '') {
                        if (f.max && parseFloat(v) > f.max) {
                            return formatMsg(fieldLabel(f), i18nVal.max, f.max);
                        }
                        if (f.min && parseFloat(v) < f.min) {
                            return formatMsg(fieldLabel(f), i18nVal.min, f.min);
                        }
                    }
                }
            }

            // Check custom validation
            if (f.fnValidate) {
                var fValid = f.fnValidate(f, v);
                if (fValid !== '') {
                    return formatMsg(fieldLabel(f), fValid);
                }
            }

            // Check minLength and maxLength
            if (_.isString(v)) {
                var len = v.length,
                    badMax = f.maxLength?len > f.maxLength:false,
                    badMin = f.minLength?len < f.minLength:false;
                if(badMax || badMin){
                    if(f.maxLength && f.minLength){
                        return formatMsg(fieldLabel(f), i18nVal.minMaxLength, f.minLength, f.maxLength);
                    }else if(f.maxLength){
                        return formatMsg(fieldLabel(f), i18nVal.maxLength, f.maxLength);
                    }else{
                        return formatMsg(fieldLabel(f), i18nVal.minLength, f.minLength);
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

    /*customize: function(){
         var labelSelector = '.evol-field-label>label',
            panelSelector ='.evol-pnl .panel-title';
         if(this.custOn){
             this.$(labelSelector + '>i, '+ panelSelector + '>i').remove();
             this.custOn=false;
         }else{
             _.each(this.$(labelSelector),function(elem){
                 var $el=$(elem),
                 id=$el.attr('for');
                 $el.append(dom.iconCustomize(id,'field'));
             });
             this.$(panelSelector).append(dom.iconCustomize('id','panel'));
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
            if(this.viewName==='mini'){
                $f=$f.find('.evol-mini-content');
            }
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
        if(bId==='save'){
            if(this.validate()){
                this.$el.trigger('action', bId);
            }
        }else{
            this.$el.trigger('action', bId);
        }
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
     },*/

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
            var h='',
                subCollecs=this.getSubCollecs(),
                mid=tr.closest('table').data('mid'),
                elems=(subCollecs[mid])?subCollecs[mid].elements:null;
            h+='<tr>'+
                this._TDsFieldsEdit(elems, {})+
                '<td class="evo-td-plusminus">'+
                dom.buttonsPlusMinus()+
                '</td></tr>';
            $(h).insertAfter(tr);
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
 * evolutility-ui-jquery :: one-browse.js
 *
 * View "one browse" to browse one model in readonly mode.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Browse = Evol.View_One.extend({

    viewName: 'browse',
    editable: false,
    icon: 'eye-open', // glyphicon-eye-open
    prefix: 'ovw',

    getData: function () {
        // TODO make JSON obj w/ model limited to fields in uimodel?
        return {};
    },

    setData: function (model) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                uii=Evol.DOM.input,
                fts = Evol.Def.fieldTypes,
                fieldHTML_ReadOnly = Evol.Dico.fieldHTML_RO,
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
                        case fts.list:
                        case fts.bool:
                        case fts.email:
                        case fts.url:
                        case fts.html:
                            $f.html(fieldHTML_ReadOnly(f, fv, Evol.hashLov, iconsPath));
                            break;
                        case fts.formula:
                            $f.html(f.formula?f.formula(model):'');
                            break;
                        case fts.pix:
                            $f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        case fts.color:
                            $f.html(uii.colorBox(f.id, fv, fv));
                            break;
                        case fts.textml:
                            if(fv){
                                $f.html(_.escape(fv).replace(/[\r\n]/g, '<br>'));
                            }else{
                                $f.html('');
                            }
                            break;
                        case fts.json:
                            $f.val(Evol.Format.jsonString(fv, false));
                            break;
                        default:
                            $f.text(fieldHTML_ReadOnly(f, fv, Evol.hashLov, iconsPath) || ' ');
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, 'browse');
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
            fts = Evol.Def.fieldTypes,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case fts.bool:
                    $f.prop('checked', f.defaultValue?'checked':false);
                    break;
                case fts.pix:
                    // TODO

                    break;
                default:
                    $f.html(f.defaultValue || '');
            }
        });
        if(subCollecs){
            _.each(subCollecs, function (sc) {
                that.$('[data-pid="'+sc.id+'"] tbody')
                    .html(that._TRnodata(sc.elements.length, 'browse'));
            });
        }
        return this;
    },

    _renderButtons: function (h) {
        h.push(Evol.DOM.html.clearer+
            '<div class="evol-buttons panel '+this.style+'">'+
            Evol.DOM.button('cancel', Evol.i18n.tools.bCancel, 'btn-default')+
            Evol.DOM.button('edit', Evol.i18n.tools.bEdit, 'btn-primary')+
            '</div>');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: one-edit.js
 *
 * View "one edit" to edit one backbone model.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Edit = Evol.View_One.extend({

    viewName: 'edit',
    icon: 'edit', // glyphicon-edit
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
 * evolutility-ui-jquery :: one-json.js
 *
 * View "one json" to edit one backbone model in JSON.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.JSON = Evol.View_One.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
    },

    viewName: 'json',
    icon: 'barcode', // glyphicon-barcode

    render: function () {
        var dom=Evol.DOM;
        if(this.model){
            var h = [],
                jsonStr=JSON.stringify(this.model, null, 2);

            h.push(dom.panelBegin({
                    id: 'p-json',
                    label:Evol.Format.capitalize(this.uiModel.name), 
                    label2: 'JSON'
                }, this.style+' evo-p-json', true)+
                '<fieldset>'+
                dom.label('uimjson', 'JSON')+
                dom.input.textMJSON('uimjson', jsonStr, 16)+
                '</fieldset>'+
                dom.panelEnd());

h.push(syntaxHighlight(jsonStr));

            this._renderButtons(h, 'json');
            this.$el.html(h.join(''));
        }else{
            this.$el.html(dom.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.setData(this.model);
        //this.custOn=false;
        return this;
    },

    validate: function () {
        var isValid=true,
            data=this.getData(),
            $fp=this._getDOMField().parent();

        //this.clearMessages();
        isValid=!Evol.DOM.addRemClass($fp, data===null, 'has-error');
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid?[]:[Evol.i18n.validation.invalid];
    },

    getData: function () {
        var jsonStr=this._getDOMField().val(),
            obj;

        if(jsonStr===''){
            return jsonStr;
        }
        try{
            obj=$.parseJSON(jsonStr);
        }catch(err){
            obj=null;
        }
        return obj;
    },

    setData: function (m) {
        this.clearError()._getDOMField().val(JSON.stringify(m.toJSON(), null, 2));
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
        return this.$('textarea');
    }

});

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: one-json.js
 *
 * View "one json" to edit one backbone model in JSON.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.JSON = Evol.View_One.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
    },

    viewName: 'json',
    icon: 'barcode', // glyphicon-barcode

    render: function () {
        var dom=Evol.DOM;
        if(this.model){
            var h = [],
                jsonStr=JSON.stringify(this.model, null, 2);

            h.push(dom.panelBegin({
                    id: 'p-json',
                    label:Evol.Format.capitalize(this.uiModel.name), 
                    label2: 'JSON'
                }, this.style+' evo-p-json', true)+
                '<fieldset>'+
                dom.label('uimjson', 'JSON')+
                dom.input.textMJSON('uimjson', jsonStr, 16)+
                '</fieldset>'+
                dom.panelEnd());
            this._renderButtons(h, 'json');
            this.$el.html(h.join(''));
        }else{
            this.$el.html(dom.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.setData(this.model);
        //this.custOn=false;
        return this;
    },

    validate: function () {
        var isValid=true,
            data=this.getData(),
            $fp=this._getDOMField().parent();

        //this.clearMessages();
        isValid=!Evol.DOM.addRemClass($fp, data===null, 'has-error');
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid?[]:[Evol.i18n.validation.invalid];
    },

    getData: function () {
        var jsonStr=this._getDOMField().val(),
            obj;

        if(jsonStr===''){
            return jsonStr;
        }
        try{
            obj=$.parseJSON(jsonStr);
        }catch(err){
            obj=null;
        }
        return obj;
    },

    setData: function (m) {
        this.clearError()._getDOMField().val(JSON.stringify(m.toJSON(), null, 2));
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
        return this.$('textarea');
    }

});
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: one-mini.js
 *
 * View "one mini" to "quick edit" one backbone model (only showing important or required fields).
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Mini = function(){

    var dom = Evol.DOM,
        fts = Evol.Def.fieldTypes;

return Evol.ViewOne.Edit.extend({

    events: { // TODO same as ViewOne ?
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
        'click label > .glyphicon-question-sign': 'click_help'
    },

    viewName: 'mini',
    icon: 'th-large', // glyphicon-th-large
    prefix: 'om',

    fieldsetFilter: function(f){
        return (f.required || f.inMany || f.inMini);// && f.type!='formula';
    },

    _render: function (h, mode) {
        // TODO browse mode
        // in EDIT and BROWSE modes
        var miniUIModel= {
            id: 'p-mini',
            type: 'panel',
            class: 'evol-mini-holder',
            label: Evol.Format.capitalize(this.uiModel.name),
            width: 100,
            elements: this.getFields()
        };
        
        this._renderPanel(h, miniUIModel, mode);
        this._renderButtons(h, mode);
    },

    _renderPanel: function (h, p, mode, visible) {
        var that = this,
            iconsPath = this.iconsPath;
            
        h.push('<div data-p-width="100%" class="evol-pnl evol-p-mini">'+
            dom.panelBegin(p, this.style, true)+
            '<fieldset data-pid="'+p.id+(p.readonly?'" disabled>':'">'));
        _.each(p.elements, function (elem) {
            if(elem.type==fts.hidden){
                h.push(dom.input.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultValue, mode)));
            }else{
                h.push('<div class="pull-left evol-fld w-100">'+
                    '<div class="evol-mini-label">'+Evol.Dico.HTMLFieldLabel(elem, mode)+
                    '</div><div class="evol-mini-content">');
                that.renderField(h, elem, mode, iconsPath, true);
                h.push("</div></div>");
            }
        });
        h.push('</fieldset>'+
            dom.panelEnd()+
            '</div>');
        return this;
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: action-export.js
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewAction.Export = function(){

    // TODO: add badge value, formula fields as possible exportable fields too.
    var dom = Evol.DOM,
        eDico = Evol.Dico,
        fts = Evol.Def.fieldTypes,
        uiInput = dom.input,
        i18n = Evol.i18n,
        i18nXpt = i18n.export;

return Backbone.View.extend({

    viewName: 'export',
    cardinality: 'n',
    icon: 'cloud-download', // glyphicon-cloud-download

    events: {
        'change .evol-xpt-format': 'click_format',
        'change input, .evol-xpt-db': '_preview',
        'change #xpt-header': '_preview',
        'click .evol-xpt-more': 'click_toggle_sel',
        'click button': 'click_button'
    },

    options: {
        model: null,
        uiModel: null,
        many: true,
        sampleMaxSize: 20,
        formats: ['CSV', 'TAB', 'JSON', 'HTML', 'XML', 'SQL']
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
        var h = '',
            formats = this.formats,
            fields = this.getFields(),
            btnExport = dom.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.namePlural), 'btn btn-primary');

        function checkboxes(){
            var iMax = fields.length,
                useMore = iMax > 14;
            var fLabel, fID;
            //---- export fields: attributes included in the export -----------------------------
            var h='<fieldset class="checkbox">'+
                '<label><input type="checkbox" value="1" id="showID">'+i18nXpt.IDkey+'</label>';
            _.each(fields, function(f, idx){
                fLabel = f.labelExport || f.label || f.labelList;
                fID = 'fx-' + f.id;
                if (fLabel === null || fLabel === '') {
                    fLabel = '(' + fID + ')';
                }
                h+='<label><input type="checkbox" value="1" id="'+fID+'" checked="checked">'+fLabel+'</label>';
                if (idx === 10 && useMore){
                    h+='<a href="javascript:void(0)" class="evol-xpt-more">' + i18nXpt.allFields+ '</a><div style="display:none;">';
                }
            });
            if (useMore){
                h+='</div>';
            }
            h+='</fieldset>';
            return h;
        }
        function exportOptions(fId){
            var h='<div class="evol-xpt-opts">'+
                //---- field (shared b/w formats - header -----------------------------
                '<div class="evol-FLH clearfix">'+
                    '<label class="evol-xpt-cb1">'+uiInput.checkbox(fId, true)+i18nXpt.firstLine+'</label>'+
                    uiInput.select('xpt-header', '', 'evol-xpt-header', false, [
                        {id:'label', text:i18nXpt.headerLabels},
                        {id:'attribute', text:i18nXpt.headerIds}
                    ])+
                //---- CSV, TAB - First line for field names ----
                '</div><div id="xptCSV" class="evol-xpt-opt">'+
                    //# field - separator
                    //# - csv - any separator #######
                    '<div data-id="csv2" class="evol-w120">'+
                    dom.fieldLabel('separator', i18nXpt.separator)+
                    uiInput.text('separator', ',', '0')+
                    '</div>'+
                '</div>';

            _.each(formats, function(f){
                h+='<div id="xpt'+f+'" style="display:none;">&nbsp;</div>';
            });
            h+='</div></div>'+dom.html.clearer;
            return h;
        }

        h+='<div class="evol-xpt panel '+this.style+'">'+
            dom.panelHeader({label:this.getTitle()}, false)+
            '<div class="evol-xpt-form clearfix"><div class="evol-xpt-flds">'+
            '<div><label>'+i18nXpt.xpFields+'</label></div>'+
            checkboxes()+
            '</div><div class="evol-xpt-para">';

        //---- export formats: CSV, JSON... ------------------------------------------------
        var fId = 'evol-xpt-format',
            formatsList = _.map(formats, function(format){
                    return {
                        id: format,
                        text: i18nXpt['format'+format]
                    };
                });
        h+='<div class="evol-xptf"><div class="evol-xpt-format-hld"><label for="'+fId+'">'+i18nXpt.format+'</label>'+
            uiInput.select(fId, '', 'evol-xpt-format', false, formatsList)+'</div>'; 
        h+='<div class="top-btn-xpt">'+btnExport+'</div>';
        h+=exportOptions('xptFLH')+
            //---- Preview -----------------------------
            '<label class="evol-xpt-pvl">'+i18nXpt.preview+'</label>'+
            // ---- Samples ----
            '<textarea class="evol-xpt-val form-control"></textarea>'+
            '</div></div></div>'+
            // ---- Download button ----
            '<div class="panel '+this.style +' evol-buttons form-actions">'+
                dom.button('cancel', i18n.tools.bCancel, 'btn-default')+
                btnExport+
            '</div>'+
            '</div>';
        return h;
    },

    setModel: function(model){
        this.model = model;
    },

    showFormatOpts: function (xFormat) {
        if(xFormat==='TAB') {
            xFormat = 'CSV';
            this.$('[data-id="csv2"]').hide();
        }else if(xFormat==='CSV'){
            this.$('[data-id="csv2"]').show();
        }else{
            this.$('#xpt' + xFormat)
                .html(this._formatOptions(xFormat, this.uiModel.name));
        }
        var divOpts = this.$('#xpt' + xFormat).show()
            .siblings().hide();
        dom.showOrHide(divOpts.filter('.evol-FLH'), xFormat==='TAB' || xFormat==='CSV' || xFormat==='HTML');
        return this;
    },

    getFields: function (){
        if(!this.fields){
            this.fields=Evol.Def.getFields(this.uiModel, function(f){
                // todo: allow formula fields & provide value in export
                return f.type!=fts.formula && f.type!=fts.json && (_.isUndefined(f.inExport) || f.inExport);
            });
        }
        return this.fields;
    },

    getTitle: function(){
        if(this.many){
            return i18n.getLabel('export.exportMany', this.uiModel.namePlural);
        }else{
            return i18n.getLabel('export.exportOne', this.uiModel.name);
        }
    },

    setTitle: function(){
        eDico.setViewTitle(this);
    },

    _preview: function () {
        this.$('.evol-xpt-val').val(
            this.exportContent(this.val())
        );
    },

    exportContent: function(params){
        var h='',
            options = params.options,
            maxItem = this.sampleMaxSize-1;

        if(this.collection || (this.model && this.model.collection)){
            var data = this.collection ? this.collection.models : this.model.collection.models,
                fldsDomHash = {};

            _.each(params.fields, function(fid){
                fldsDomHash[fid]='';
            });
            var flds = _.filter(this.getFields(), function(f){
                if(f.id && _.has(fldsDomHash, f.id)){
                    return true;
                }
            });
            var fMax = flds.length-1;
            var fnLabel;
            if (options.firstLineHeader) {
                fnLabel = options.header==='label' ?
                    function(f){
                        var lbl=f.labelExport || f.label || f.id;
                        if(lbl.indexOf(',')>-1){
                            return '"' + lbl + '"';
                        }
                        return lbl;
                    }:function(f){
                        return f.attribute || f.id;
                    };
            }
            switch (params.format){
                case 'CSV':
                case 'TAB':
                case 'TXT':
                    var sep = Evol.Format.trim(this.$('#separator').val());
                    if(params.format=='TAB'){
                        sep='\t'; //sep='&#09;';
                    }
                    // -- header
                    if (options.firstLineHeader) {
                        if(options.showID){
                            h+='ID'+sep;
                        }
                        _.each(flds, function(f, idx){
                            h+=fnLabel(f);
                            if(idx<fMax){
                                h+=sep;
                            }
                        });
                        h+='\n';
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        if(options.showID){
                            h+=(m.id||('m'+idx))+sep;
                        }
                        _.each(flds, function(f, idx){
                            //var mv = f.type==fts.formula ? f.formula(m) : m.get(f.id);
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fts.bool){
                                    h+=mv;
                                    //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fts.text || f.type==fts.textml) && (mv.indexOf(',')>-1)){
                                    h+=mv ? '"'+mv.replace('"', '\\"')+'"' : '""';
                                }else if(f.type==fts.list){
                                    h+=mv ? '"'+mv+'"' : '""';
                                }else{
                                    h+=mv;
                                }
                            }
                            if(idx<fMax){
                                h+=sep;
                            }
                        });
                        h+='\n';
                        return idx<maxItem;
                    });
                    h+='\n';
                    break;
                case 'HTML':
                    // -- header
                    h='<table>\n';
                    if (options.firstLineHeader) {
                        h+='<tr>\n';
                        if(options.showID){
                            h+='<th>ID</th>';
                        }
                        _.each(flds, function(f){
                            h+='<th>'+fnLabel(f)+'</th>';
                        });
                        h+='\n</tr>\n';
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        h+='<tr>\n';
                        if(options.showID){
                            h+='<td>'+m.id+'</td>';
                        }
                        _.each(flds, function(f){
                            var mj = m.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h+='<td>'+mj+'</td>';
                            } else {
                                h+='<td></td>';
                            }
                        });
                        h+='\n</tr>\n';
                        return idx<maxItem;
                    });
                    h+='</table>\n';
                    break;
                case 'JSON':
                    var propList= _.map(flds, function(f){
                        return f.id;
                    });
                    if(options.showID){
                        propList.unshift('id');
                    }
                    h=[];
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    if(this.many){
                        h = '['+h.join(',\n')+']';
                    }else{
                        h = h.join('');
                    }
                    break;
                case 'SQL':
                    var optIdInsert = false,
                        crlf = '\n',
                        sqlTable = options.table.replace(/ /g,'_'),
                        sql = 'INSERT INTO '+sqlTable+' (',
                        fnString, formatString, emptyString, sNull, beginTrans, commitTrans;
                    switch(options.database){
                        case 'sqlserver':
                            fnString = function(v){
                                if(_.isUndefined(v) || _.isObject(v)){
                                    return '""';
                                }
                                return ('"'+v.replace(/"/g, '""')+'"');
                            };
                            sNull='NULL';
                            emptyString='""';
                            beginTrans='BEGIN TRANSACTION';
                            commitTrans='COMMIT TRANSACTION';
                            optIdInsert=options.showID;
                            break;
                        default: //case 'postgres':
                            fnString = function(v){
                                if(_.isUndefined(v) || _.isObject(v)){
                                    return '""';
                                }
                                return ("'"+v.replace(/'/g, "''")+"'");
                            };
                            sNull='null';
                            emptyString="''";
                            beginTrans='BEGIN;';
                            commitTrans='COMMIT;';
                    }
                    formatString = function(v){
                        if(_.isUndefined(v) || v===null){
                            return sNull;
                        }else if(v===''){
                            return emptyString;
                        }else if(_.isNumber(v)){
                            return v;
                        }else{
                            return fnString(v);
                        }
                    };
                    if(options.showID){
                        sql+='ID, ';
                    }
                    _.each(flds, function(f,idx){
                        sql+=f.id;
                        if(idx<fMax){
                            sql+=', ';
                        }
                    });
                    sql+=')\n VALUES (';
                    // -- options
                    if(options.transaction){
                        h+=beginTrans+crlf;
                    }
                    if(optIdInsert){
                        h+='SET IDENTITY_INSERT '+sqlTable+' ON;'+crlf;
                    }
                    // -- data
                    var fValue;
                    _.every(data, function(m, idx){
                        h+=sql;
                        if(options.showID){
                            h+=formatString(m.id)+', ';
                        }
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fts.int:
                                case fts.dec:
                                case fts.money:
                                    h+=fValue?fValue:sNull;
                                    break;
                                case fts.bool:
                                    h+=(typeof fValue === 'boolean')?fValue:sNull;
                                    break;
                                case fts.date:
                                case fts.datetime:
                                case fts.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h+=sNull;
                                    }else{
                                        h+=formatString(fValue);
                                    }
                                    break;
                                case fts.list:
                                    if(_.isUndefined(fValue) || fValue===''|| (_.isArray(fValue) && fValue.length===0)){
                                        h+=sNull;
                                    }else if(_.isNumber(fValue)){
                                        h+=fValue;
                                    }else{
                                        h+=formatString(eDico.fieldHTML_RO(f, fValue, Evol.hashLov, ''));
                                    }
                                    break;
                                default:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h+=emptyString;
                                    }else if(_.isNumber(fValue)){
                                        h+=fValue;
                                    }else{
                                        h+=formatString(fValue);
                                    }
                            }
                            if(idx<fMax){
                                h+=', ';
                            }
                        });
                        h+=');\n';
                        return idx<maxItem;
                    });
                    // -- options
                    if(optIdInsert){
                        h+='SET IDENTITY_INSERT '+sqlTable+' OFF;'+crlf;
                    }
                    if(options.transaction){
                        h+=commitTrans+crlf;
                    }
                    break;
                case 'XML':
                    var elemName = options.elementName,
                        fv;

                    h='<xml>\n';
                    _.every(data, function(m, idx){
                        h+='<'+elemName+' ';
                        if(options.showID){
                            h+='ID="'+m.id+'" ';
                        }
                        _.each(flds, function(f){
                            h+=f.id+'="';
                            if(f.type===fts.text || f.type===fts.textml){
                                fv=m.get(f.id);
                                if(!_.isArray(fv) && !_.isUndefined(fv) && fv!==''){
                                    h+=fv.replace(/"/g, '\\"');
                                }
                            }else{
                                h+=m.get(f.id);
                            }
                            h+='" ';
                        });
                        h+='></'+elemName+'>\n';
                        return idx<maxItem;
                    });
                    h+='</xml>';
                    break;
            }
        }else{
            h+=i18n.nodata;
        }
        return h;
    },

    fieldHTML: function(id,label,text){
        return dom.fieldLabel(id, label) +
            uiInput.text(id, text.replace(/ /g, '_'), null, 'xpt-mw300');
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            var format = this.$('.evol-xpt-format').val(),
                title = this.uiModel.label || Evol.Format.capitalize(this.uiModel.entities),
                v = {
                    title: title,
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
                if(v.options.firstLineHeader){
                    v.options.header = this.$('#xpt-header').val();
                }
                if(v.format==='TAB'){
                    delete v.options.separator;
                }
            }else if(v.format==='SQL'){
                v.options.database = this.$('.evol-xpt-db').val() || this.uiModel.table || this.uiModel.id;
            }
            v.options.showID = this.$('#showID').prop('checked');
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

    _formatOptions: function(format, entity){
        if(format==='XML'){
            return '<div>'+this.fieldHTML('elementName', i18nXpt.XMLroot, entity)+'</div>';
        }else if(format==='SQL'){
            return '<div><label for="xpt-db">'+i18nXpt.db+'</label> '+
                uiInput.select('xpt-db', 'postgres', 'evol-xpt-db', null, [{id:'postgres', text:'PostgreSQL'},{id:'sqlserver', text:'SQL Server'}])+
                '<div class="evo-inline-holder">'+
                    '<div>'+this.fieldHTML('table', i18nXpt.SQLTable, entity)+'</div>'+
                    '<div><label>'+uiInput.checkbox('transaction', false)+i18nXpt.SQLTrans+'</label></div>'+
                '</div></div>';
        }
        return '&nbsp;';
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();
        if (format === 'XML') {
            this.$('#XML').html(this._formatOptions('XML', this.uiModel.name))
                .show()
                .siblings().not('.evol-FLH').hide();
        }
        this.showFormatOpts(format)
            ._preview();
        this.$el.trigger('change.export', 'format', format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget).hide()
            .next().slideDown();
    },

    change_header: function(evt){
        this._preview();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        if(bId==='export'){
            this.download(this.val());
        }
        this.$el.trigger('action', bId);
    },

    download: function(params){
        var blob = new Blob([this.$('.evol-xpt-val').val()], {type: 'text/plain'}),
            ext = params.format==='TAB' ? 'txt' : params.format.toLowerCase(),
            filename = params.title.replace(/ /g, '_') + '.' + ext,
            a = document.createElement("a");

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        if (a.remove) {
            a.remove();
        }
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: action-filter.js
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */


Evol.ViewAction.Filter = function(){

    var dom = Evol.DOM,
        uiInput = dom.input,
        fts = Evol.Def.fieldTypes,
        evoLang = Evol.i18n.filters,
        fOps = {
            sEqual:'eq',
            sNotEqual:'ne',
            sStart:'sw',
            sContain:'ct',
            sNotContain:'nct',
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
            this.fields = _.map(Evol.Def.getFields(this.uiModel, function(f){
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
            h='';

        h+=dom.html.buttonClose+'<div class="evo-zfilters"></div>'+
            '<a class="evo-bNew btn btn-primary btn-group-sm glyphicon glyphicon-plus" href="javascript:void(0)"></a>';// '+evoLang.bNewCond+'
        if(this.submitButton){
            h+='<a class="evo-bSubmit btn btn-primary glyphicon glyphicon-ok" href="javascript:void(0)"></a>';// '+evoLang.bSubmit+'
        }
        h+='<div class="evo-editFilter"></div>'+
            '<a class="evo-bAdd btn btn-primary glyphicon glyphicon-ok" style="display:none;" href="javascript:void(0)"></a>'+// '+evoLang.bAddCond+'
            '<a class="evo-bDel btn btn-default glyphicon glyphicon-remove" style="display:none;" href="javascript:void(0)"></a>';// '+evoLang.bCancel+'
        e.html(h);
        this._step=0;
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
                dom.toggleCheckbox($this.siblings(), $this.prop('checked'));
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
                that._removeEditor();
            }
        });
        return this;
    },
    /*
     _renderMenu: function(h){
         var mn=dom.menu;

         h.push(
             mn.hBegin('file', 'div', 'cog'),
             mn.hItem('save', 'Save', '', 1),
             mn.hItem('open', 'Open', '', 1),
             mn.hEnd('div')
         );
     },*/

    _getFieldById: function(fId){
        if(!this._hash){
            this._hash=Evol.Def.getFieldsHash(this.fields);
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
        h+=dom.html.buttonClose;
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
                    f,
                    h='<select id="field" class="form-control"><option value=""></option>';
                for (var i=0,iMax=fields.length;i<iMax;i++){
                    f=fields[i];
                    h+=uiInput.option(f.id, f.label || f.labelList || ('('+f.id+')'));
                }
                h+='</select>';
                this._fList=h;
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
            var h='';
            switch (fType){
                case fts.lov:
                    //h+=evoLang.sInList;
                    h+=uiInput.hidden('operator',fOps.sInList);
                    this._operator=fOps.sInList;
                    break;
                case fts.bool:
                    //h+=evoLang.sEqual;
                    h+=uiInput.hidden('operator', fOps.sEqual);
                    this._operator=fOps.sEqual;
                    break;
                default:
                    h+=uiInput.selectBegin('operator', '', true);
                    switch (fType){
                        case fts.date:
                        case fts.datetime:
                        case fts.time:
                            if (fType==fts.time){
                                h+=fOption(fOps.sEqual, evoLang.sAt)+
                                    fOption(fOps.sNotEqual, evoLang.sNotAt);
                            }else{
                                h+=fOption(fOps.sEqual, evoLang.sOn)+
                                    fOption(fOps.sNotEqual, evoLang.sNotOn);
                            }
                            h+=fOption(fOps.sGreater, evoLang.sAfter)+
                                fOption(fOps.sSmaller, evoLang.sBefore);//+
                                //fOption(fOps.sBetween, evoLang.sBetween 
                            break;
                        case fts.int:
                        case fts.dec:
                        case fts.money:
                            h+=fOption(fOps.sEqual, evoLang.sNumEqual)+
                                fOption(fOps.sNotEqual, evoLang.sNumNotEqual)+
                                fOption(fOps.sGreater, evoLang.sGreater)+
                                fOption(fOps.sSmaller, evoLang.sSmaller);
                            break;
                        default:
                            h+= fOption(fOps.sStart, evoLang.sStart)+
                                fOption(fOps.sEqual, evoLang.sEqual)+
                                fOption(fOps.sNotEqual, evoLang.sNotEqual)+
                                fOption(fOps.sContain, evoLang.sContain)+
                                fOption(fOps.sNotContain, evoLang.sNotContain)+
                                fOption(fOps.sFinish, evoLang.sFinish);
                    }
                    h+=fOption(fOps.sIsNull, evoLang.sIsNull)+
                        fOption(fOps.sIsNotNull, evoLang.sIsNotNull)+
                        '</select>';
            }
            this._editor.append(h);
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
                    var h='';
                    opBetween=opVal==fOps.sBetween;
                    switch (fType){
                        case fts.lov:// TODO use "section"?
                            h+='<section id="value">'+
                                ((this._field.list.length>7)?'(<input type="checkbox" id="checkAll" value="1"><label for="checkAll">All</label>) ':'')+
                                uiInput.checkboxLOV(this._field.list)+
                                '</section>';
                            break;
                        case fts.bool:
                            h+='<span id="value">'+
                                uiInput.radio('value', '1', evoLang.yes, v!='0', 'value1')+
                                uiInput.radio('value', '0', evoLang.no, v=='0', 'value0')+
                                '</span>';
                            break;
                        case fts.date:
                        case fts.datetime:
                        case fts.time:
                        case fts.int:
                        case fts.dec:
                        case fts.money:
                            var iType=(fType==fts.date)?'text':fType;
                            h+='<input id="value" type="'+iType+'" class="form-control">';
                            if(opBetween){
                                h+='<span class="as-Txt">'+evoLang.opAnd+' </span>'+
                                    '<input id="value2" type="'+iType+'" class="form-control">';
                            }
                            addOK=false;
                            break;
                        default:
                            h+='<input id="value" type="text" class="form-control">';
                            addOK=false;
                    }
                    editor.append(h);
                    if(fType==fts.date){
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
                    case fts.int:
                        fv.value=vval && typeof(vval)==='string'?parseInt(vval):null;
                        break;
                    case fts.dec:
                        fv.value=vval && typeof(vval)==='string'?parseFloat(vval):null;
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

    _hiddenValue: function(filter, idx){
        var fHidden=uiInput.hidden,
            v2=filter.value.value2,
            h=fHidden('fld-'+idx, filter.field.value)+
                fHidden('op-'+idx, filter.operator.value)+
                fHidden('val-'+idx, filter.value.value);
        if(v2){
            h+=fHidden('val2-'+idx, v2);
        }
        return h;
    },

    _setHiddenValues: function(){
        var vs=this.val(),
            iMax=vs.length,
            h=uiInput.hidden('elem', iMax);
        for(var i=0;i<iMax;i++){
            h+=this._hiddenValue(vs[i], i+1);
        }
        //h.push('&label=',encodeURIComponent(this.valText()));
        this._hValues.html(h);
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
 * evolutility-ui-jquery :: action-import.js
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewAction.Import = function(){

    var dom = Evol.DOM,
        eDico = Evol.Dico,
        fts = Evol.Def.fieldTypes,
        uiInput = dom.input,
        i18n = Evol.i18n,
        i18nX = i18n.export,
        i18nI = i18n.import;

return Backbone.View.extend({

    viewName: 'import',
    cardinality: 'n',
    icon: 'cloud-upload', // glyphicon-cloud-upload

    events: {
        'click button': 'click_button',
        'change #iptFormat': 'change_format',
        'click .ipt-ssample': 'toggle_sample'
    },

    options: {
        noDups:false
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        return this;
    },

    render: function(){
        this.format='csv';
        this.$el.html(this._renderHTML());
        return this;
    },

    _renderHTML: function () {
        var h = dom.panelBegin({id: '', type: 'panel', label: this.getTitle(), width: 100}, 'evol-xpt '+this.style, false)+
            '<div class="evol-fset">'+
                '<div class="evol-fld w-100"><label class="lbl-block">'+i18nI.format+'</label>'+
                //dom.input.text('id', 'value', {}, null)+
                dom.input.lov('iptFormat', 'value', '', [
                        {id:'csv',text: i18nX.formatCSV},
                        {id:'json',text: i18nX.formatJSON}
                    ])+
                    '<a href="javascript:void(0);" class="ipt-ssample">CSV '+i18nI.fSample+'</a>'+
                    dom.html.clearer+
                '</div>'+
                //'<div class="evol-fld checkbox w-38"><label>'+uiInput.checkbox('dupOk', false)+i18nI.allowDups+'</label></div>'+
                '<div class="evol-ipt-fh"><textarea class="evol-ipt-format help-block" style="resize:none;"></textarea></div>'+
                '<div class="evol-fld w-100"><label style="margin-top:10px;">'+i18nI.data+'</label>'+
                '<textarea class="evol-xpt-val form-control" id="import_data" rows="12"></textarea>'+
                '</div>'+
            '</div>'+dom.panelEnd()+
            '<div class="panel '+this.style +' evol-buttons form-actions">'+
                dom.button('cancel', i18n.tools.bCancel, 'btn-default')+
                dom.button('import', i18nI.importMany.replace('{0}', this.uiModel.namePlural), 'btn btn-primary')+
            '</div>';
        return h;
    },

    importData: function(entityId, data, options){
        var M, MS,
            noDuplicates = options && options.noDuplicates;

        if(data){


            // USE this.collection or this.model.colection

            // d3.csv.parse(csv);


            if(Evol.Config.localStorage){
                var lc = new Backbone.LocalStorage('evol-'+entityId);
                M = Backbone.Model.extend({
                    localStorage: lc
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    localStorage: lc
                });
            }else{
                M = new Backbone.Model({
                    urlRoot: Evol.Config.url+entityId
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    url: Evol.Config.url+entityId/*,
                    sync : function(method, collection, options) {
                        //options.dataType = "jsonp";
                        return Backbone.sync(method, collection, options);
                    }*/
                });
            }
            var ms = new Ms(),
                goods = 0,
                bads = 0;
            // TODO: is fetch necessary to init
            ms.fetch({
                success: function(collection){
                    _.each(data, function(d){
                        if(!noDuplicates){
                            delete d.id;
                        }
                        collection.create(d, {
                            success: function(a){
                                goods++;
                            },
                            error: function(a){
                                bads++;
                            }
                        });
                    });
                },
                error: function(a,b){
                    alert('Error'+ a +b);
                }
            });
            // TODO: use promise
            //ms.sync();
            return {
                total: data.length,
                inserts: goods,
                errors: bads
            };
        }else{
            return {
                total: 0,
                inserts: 0,
                errors: 0
            };
        }
    },

    setModel: function(model){
        this.model = model;
    },

    getTitle: function(){
        //if(this.many){
            return i18n.getLabel('import.importMany', this.uiModel.namePlural);
        //}else{
        //    return i18n.getLabel('import.importOne', this.uiModel.name);
        //}
    },

    setTitle: function(){
        eDico.setViewTitle(this);
    },

    val: function (value) {
        return this.$('#import_data').val();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        if(bId==='import'){
            var data;
            if(this.format==='csv'){
                data=Papa.parse(this.val());
                var r0=data.data[0];
                var tData=[];
                _.forEach(data.data, function(r, idx){
                    var item={};
                    if(idx>0){
                        _.forEach(r, function(c, idx){
                            item[r0[idx]]=c;
                        });
                        tData.push(item);
                    }
                });
                data=tData;
            }else{
                try{
                    data = JSON.parse(this.val());
                }catch(err){
                    //todo: flag field
                    alert('Invalid JSON.');
                }
                if(!_.isArray(data)){
                    data = [data];
                }
            }
            if(data){
                this.$el.trigger('action', {id: bId, data: this.importData(this.uiModel.id, data)});
            }
        }
    },

    change_format: function (evt) {
        var bId=$(evt.currentTarget).val();
        this.format=bId;
        this.$('.evol-ipt-format').val(this.makeSample(bId));
        this.$('.ipt-ssample').html(bId.toUpperCase()+' '+i18nI.fSample);
        this.sampled=true;
    },

    makeSample: function(sFormat){
        var fs=this.getFields();
        function sampleItem(idx){
            var item={};
            _.forEach(fs, function(f){
                item[f.attribute]=Evol.Def.sampleDatum(f, idx);
            });
            return item;
        }
        var sample=[
                sampleItem(0), 
                sampleItem(1)
            ],
            h='';

        if(sFormat==='json'){
            h = JSON.stringify(sample, null, '\t');
        }else{
            var r=[];
            for (var p in sample[0]){
                r.push(p);
            }
            h += r.join(',');
            _.each(sample, function(s){
                var cs=[];
                _.each(r, function(f){
                    cs.push(s[f]);
                });
                h += '\n'+cs.join(',');
            });
        }
        return h;
    },

    toggle_sample: function(evt){
        var e=$(evt.currentTarget),
            $fSample=this.$('.evol-ipt-fh');

        if(this.sampleShown){
            $fSample.css('height',0);
        }else{
            if(!this.sampled){
                this.$('.evol-ipt-format').val(this.makeSample('csv'));
            }
            this.sampled=true;
            $fSample.css('height','180px');
        }
        this.sampleShown=!this.sampleShown;
    },

    getFields: function () {
        if (!this._fields) {
            this._fields = Evol.Def.getFields(this.uiModel);
        }
        return this._fields;
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: toolbar.js
 *
 * View "toolbar" (one toolbar instance manages all views for a UI model).
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.viewClasses = {
    getClass: function(className){
        if(this[className]){
            return this[className];
        }else{
            return this.list;
        }
    }
};

_.forEach([ 'browse', 'edit', 'mini', 'json'],function(vn){
    Evol.viewClasses[vn] = Evol.ViewOne[vn==='json'?'JSON':Evol.Format.capitalize(vn)];
});
_.forEach([ 'list', 'cards', 'bubbles', 'charts'],function(vn){
    Evol.viewClasses[vn] =  Evol.ViewMany[Evol.Format.capitalize(vn)];
});
_.forEach([ 'filter', 'export', 'import'],function(vn){
    Evol.viewClasses[vn] =  Evol.ViewAction[Evol.Format.capitalize(vn)];
});

if(toastr){
    toastr.options = {
        hideDuration: 0,
        //preventDuplicates: true,
        closeButton: true,
        progressBar: true
    };
}

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.Toolbar = function() {

    var dom = Evol.DOM,
        i18n = Evol.i18n,
        i18nTool = i18n.tools;

return Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'navigate.many >div': 'click_navigate',
        'paginate.many >div': 'paginate',
        //'selection.many >div': 'click_select',
        'click .evo-search>.btn': 'click_search',
        'keyup .evo-search>input': 'key_search',
        'click .evo-search>.clear-icon': 'clear_search',
        'change.tab >div': 'change_tab',
        'action >div': 'click_action',
        'status >div': 'status_update',
        'change.filter >div': 'change_filter',
        'close.filter >div': 'hideFilter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        readonly: false,
        //router:...,
        defaultView: 'list',
        defaultViewOne: 'browse',
        defaultViewMany: 'list',
        style: 'panel-info',
        display: 'label', // other possible values: tooltip, text, icon, none
        titleSelector: '#title',
        pageSize:20,
        buttons: {
            always:[
                {id: 'list', label: i18nTool.bList, icon:'th-list', n:'x'},
                {id:'charts', label: i18nTool.bCharts, icon:'stats', n:'x'},
                //{id: 'selections', label: i18nTool.Selections, icon:'star', n:'x'},
                {id: 'new', label: i18nTool.bNew, icon:'plus', n:'x', readonly:false},
            ],
            actions:[
                //{id:'browse', label: i18nTool.bBrowse, icon:'eye', n:'1', readonly:false},
                {id:'edit', label: i18nTool.bEdit, icon:'edit', n:'1', readonly:false},
                {id:'save', label: i18nTool.bSave, icon:'floppy-disk', n:'1', readonly:false},
                {id:'del', label: i18nTool.bDelete, icon:'trash', n:'1', readonly:false},
                {id:'filter', label: i18nTool.bFilter, icon:'filter', n:'n'},
                {id:'export', label: i18nTool.bExport, icon:'cloud-download',n:'n'},
            ],
            moreActions:[
                //{id:'import', label: i18nTool.bImport, icon:'cloud-upload',n:'x'},
                //{id:'-'},
                //{id:'cog',label: 'Customize', icon:'cog',n:'x'}
            ],
            prevNext:[
                {id:'prev', label: i18nTool.prev, icon:'chevron-left', n:'x'},
                {id:'next', label: i18nTool.next, icon:'chevron-right', n:'x'}
            ],
            views: [
                // -- views ONE ---
                {id:'browse', label: i18nTool.bBrowse, icon:'eye-open', n:'1'},// // ReadOnly
                {id:'edit', label: i18nTool.bEdit, icon:'edit', n:'1', readonly:false},// // All Fields for editing
                {id:'mini', label: i18nTool.bMini, icon:'th-large', n:'1', readonly:false},// // Important Fields only
                //{id:'wiz',label: i18nTool.bWizard, icon:'arrow-right',n:'1'},
                {id:'json', label: i18nTool.bJSON, icon:'barcode', n:'1', readonly:false},
                // -- views MANY ---
                {id:'list', label: i18nTool.bList, icon:'th-list', n:'n'},
                {id:'cards', label: i18nTool.bCards, icon:'th-large', n:'n'},
                {id:'bubbles', label: i18nTool.bBubbles, icon:'adjust', n:'n'},
            ],
            search: true
        }
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.views=[];
        this.viewsHash={};
    },

    render: function() {
        this.$el.html(this._toolbarHTML());
        this.setView(this.defaultViewMany, false);
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
        return this;
    },

    _toolbarHTML: function(){
        var h,
            isReadOnly=this.readonly!==false,
            that=this,
            itemName=this.uiModel.name||'item',
            domm=dom.menu,
            tb=this.buttons,
            menuDivider='<li class="divider" data-cardi="x"></li>',
            menuDividerH='<li class="divider-h"></li>';

        function menuItem (m, noLabel){
            return domm.hItem(m.id, noLabel?'':((m.label=='New'?'New '+itemName:m.label)), m.icon, m.n);
        }
        function menuItems (ms, noLabel){
            return _.map(ms, function(m){
                if(isReadOnly && m.readonly===false){
                    return null;
                }
                return menuItem(m, noLabel);
            }).join('');
        }

        h='<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">'+
            menuItems(tb.always)+menuDividerH;
        h+=menuItems(tb.actions);
        if(tb.moreActions && tb.moreActions.length){
             h+=domm.hBegin('more','li','menu-hamburger', '', 'n');
             _.each(tb.moreActions, function(m){
                if(m.id==='-'){
                    h+=menuDivider;
                }else{
                    h+=menuItem(m);
                }
            });
            h+=domm.hEnd('li');
        }
        if(tb.search){
            h+=menuDivider;
            h+='<li><div class="input-group evo-search">'+
                '<input class="evo-field form-control" type="text" maxlength="100" required>'+
                '<div class="clear-icon glyphicon glyphicon-remove"></div>'+
                '<span class="btn input-group-addon glyphicon glyphicon-search"></span>'+
                '</div></li>';
        }
        if(this.toolbar){
            h+='</ul><ul class="nav nav-pills pull-right" data-id="views">';
            h+='<li class="evo-tb-status" data-cardi="n"></li>';
            h+=menuItems(tb.prevNext);
            //h+=domm.hBegin('views','li','eye-open');
            h+=menuDividerH+
                menuItems(tb.views, false);
            //h+=domm.hItem('customize','','wrench', 'x', 'Customize');
            /*
             if(this.buttons.customize){
                 h+=beginMenu('cust','wrench');
                 link2h('customize','Customize this view','wrench');
                 h.push(menuDivider);
                 link2h('new-field','New Field','plus');
                 link2h('new-panel','New Panel','plus');
                 h+='</ul></li>';
             } */

        }
        h+='</ul>'+dom.html.clearer+'</div>';
        return h;
    },

    refresh:function(){
        if(this.curView && this.curView.cardinality && this.curView.cardinality==='n'){
            this.curView.render();
        }
        return this;
    },

    clearViews: function(keep){
        //div data-vid="evolw-edit"
        $('[data-vid=evolw-*]').remove();
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
            viewName=(this._prevViewOne && this._prevViewOne!='browse' && this._prevViewOne!='json')?this._prevViewOne:'edit';
            this.setView(viewName, false, true);
            this.model=new this.modelClass();
            this.model.collection=collec;
            vw.model=this.model;
            this.newItem();
            this.setIcons('new');
            vw.mode='new';
            this.hideFilter();
        }else{
            var ViewClass = Evol.viewClasses.getClass(viewName);
            if($v.length){
                // -- view already exists and was rendered
                this.model=vw.model;
                if(vw.model){
                    //TODO debug
                    this.model.collection=collec;
                }
                vw=this.viewsHash[viewName];
                if(vw && vw.setCollection){
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
                    router: this.router//,
                    //iconsPath: this.iconsPath || ''
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel')
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                if(Evol.Def.isViewMany(viewName)){
                    //fieldsetFilter
                    vw = new ViewClass(config)
                                .render();
                    this._prevViewMany=viewName;
                    vw.setTitle();
                    if(viewName!='charts' && viewName!='bubbles' && this.pageIndex > 0){
                        vw.setPage(this.pageIndex || 0);
                    }
                }else{
                    switch(viewName){
                        // --- actions ---
                        case 'export':
                            config.sampleMaxSize = config.pageSize;
                            vw = new ViewClass(config).render();
                            break;
                        case 'import':
                            config = {
                                el: $v,
                                mode: viewName,
                                uiModel: this.uiModel,
                                collection: this.collection,
                                style: this.style,
                                titleSelector: this.titleSelector,
                                router: this.router
                            };
                            vw = new ViewClass(config).render();
                            break;
                        // --- one --- browse, edit, mini, json, wiz
                        default :
                            var vwPrev = null,
                                cData;
                            if(vw && vw.editable){
                                vwPrev = vw;
                                cData=vw.getData();
                            }
                            vw = new ViewClass(config).render();
                            this._prevViewOne=viewName;
                            this._keepTab(viewName);
                            break;
                    }
                }
                if(_.isUndefined(vw)){
                    //TODO error tracking (in other places too)
                    alert('error: invalid route (for toolbar).');
                }else{
                    this.curView=vw;
                    this.viewsHash[viewName]=vw;
                    if(!skipIcons){
                        this.setTitle();
                    }
                }
            }
        }
        this.updateStatus();
        if(vw.cardinality==='n'){
            this.setRoute('', false);
            if(!this._filterOn && this._filterValue){ // TODO do not always change flag
                this.showFilter(false);
            }
            this.updateNav();
        }else{
            this.hideFilter();
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
            dom.modal.confirm(
                'isDirty',
                i18n.unSavedTitle,
                msg,
                cbs,
                [
                    {id:'nosave', text:i18nTool.bNoSave, class:'btn-default'},
                    {id:'cancel', text:i18nTool.bCancel, class:'btn-default'},
                    {id:'ok', text:i18nTool.bSave, class:'btn-primary'}
                ]
            );
        }else{
            cbOK();
        }
        return this;
    },

    _keepTab: function(viewName){
         if(this.tabId && (viewName=='browse'||viewName=='edit')){
            this.curView.setTab(this.tabId);
         }
    },

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var $tb=this.$('.evo-toolbar'),
            lis=$tb.find('>ul>li'),
                vw=$tb.find('[data-id="views"]');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: lis.filter('[data-id="prev"],[data-id="next"]'),
                //customize: lis.filter('[data-id="customize"]').parent(),
                more: lis.filter('[data-id="more"]'),
                views: vw,
                viewsIcon: this.$('.glyphicon-eye-open,.glyphicon-eye-close'),
                vws: vw.find('ul>li>a')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var showOrHide = dom.showOrHide,
            importOrExport = mode==='export' || mode==='import';

        function oneMany(mode, showOne, showMany){
            showOrHide(tbBs.ones, showOne);
            showOrHide(tbBs.manys, showMany);
            tbBs.vws.removeAttr('style');
            tbBs.views.find('[data-id="'+mode+'"]>a').css('color', '#428bca');
        }

        if(this.$el){
            var tbBs=this.getToolbarButtons();
            //showOrHide(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();//.removeClass('disabled');
            showOrHide(tbBs.views, !(importOrExport || mode=='new'));
            tbBs.del.hide();

            if(Evol.Def.isViewMany(mode)){
                this._prevViewMany=mode;
                oneMany(mode, false, true);
                if(mode!=='charts' && mode!=='bubbles'){
                    var cSize=this.collection.length,
                        pSize=this.curView.pageSize;
                    if(cSize > pSize){
                        tbBs.prevNext.show();/*
                         // TODO: finish disabling of paging buttons
                         // use ui.addRemClass
                         if(this.curView.pageIndex===0){
                            tbBs.prevNext.eq(0).addClass('disabled');
                         }else{
                            tbBs.prevNext.eq(0).removeClass('disabled');
                         }
                         if(this.collection.length/this.pageSize){
                            tbBs.prevNext.eq(1).addClass('disabled');
                         }else{
                            tbBs.prevNext.eq(1).removeClass('disabled');
                         }*/
                    }
                }
            }else if((this.model && this.model.isNew()) || mode==='new' || importOrExport){
                oneMany(mode, false, false);
                tbBs.del.hide();
                tbBs.views.hide();
                showOrHide(tbBs.more, importOrExport);
                showOrHide(tbBs.save, !importOrExport);
            }else{
                this._prevViewOne=mode;
                oneMany(mode, true, false);
                tbBs.prevNext.show();
                showOrHide(tbBs.save, mode!=='browse');
                showOrHide(tbBs.edit, mode==='browse');
            }
        }
    },

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(dom.panelEmpty('filters', 'evo-filters', 'info'));
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

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide(); //.fadeOut(300);
        }
        this._filterOn=false;
        return this;
    },

    toggleFilter: function(v){
        this._filterOn = _.isBoolean(v) ? v : !this._filterOn;
        return this._filterOn ? this.showFilter(true) : this.hideFilter();
    },

    _flagFilterIcon: function(fOn){
        dom.addRemClass(this.$('a[data-id="filter"]'), fOn, 'evo-filter-on');
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

    setModelById: function(id, skipNav){
        var that = this,
            m,
            fnSuccess = function(){
                // TODO set collection ??
                that.model = m;
                if(!skipNav){
                    if(that.curView.cardinality!='1'){
                        that.setView(that.defaultViewOne);
                    }
                    that.curView.setModel(m);
                    dom.scroll2Top();
                }
            },
            fnError = function(){
                alert('Error: Invalid model ID.');
            };

        if(Evol.Config.localStorage){
            m = this.collection.get(id);
            if(_.isUndefined(m)){
                fnError();
            }else{
                fnSuccess();
            }
        }else{
            var M = Backbone.Model.extend({
                urlRoot: Evol.Config.url+that.uiModel.id
            });
            m = new M({id:id});
            m.fetch({
                success: fnSuccess,
                error: fnError
            });
        }
        return this;
    },

    navPrevNext: function(direction){ // direction = "prev" or "next"
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
            this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.name), 'error');
        }
        return this
            .clearMessage();
    },

    setRoute: function(id, triggerRoute, view){
        Evol.Dico.setRoute(this.router, this.uiModel.id, view || this.curView.viewName, id, triggerRoute);
        Evol.Dico.setPageTitle(this.curView.getTitle());
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
            var entityName=this.uiModel.name;
            if(_.isUndefined(this.model) || (this.model && this.model.isNew())){ // CREATE
                if(this.collection){
                    this.collection.create(this.getData(true), {
                        success: function(m){
                            fnSuccess(m);
                            that.setRoute(m.id, false);
                            that.setMessage(i18n.getLabel('saved', Evol.Format.capitalize(entityName)), i18n.getLabel('msg.added', entityName, _.escape(vw.getTitle())), 'success');
                        },
                        error:function(m, err){
                            alert('Error in "saveItem"');
                        }
                    });
                    this.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO use bootstrap modal
                }
            }else{ // UPDATE
                // TODO fix bug w/ insert when filter applied => dup record
                var updatedModel = this.getData(true);
                this.model.set(updatedModel);
                this.model.save(this.model.changedAttributes(), {
                    success: function(m){
                        fnSuccess(m);
                        that.collection.set(m, {remove:false});
                        that.setMessage(i18n.getLabel('saved', Evol.Format.capitalize(entityName)), i18n.getLabel('msg.updated', Evol.Format.capitalize(entityName), _.escape(vw.getTitle())), 'success');
                    },
                    error: function(m, err){
                        alert('Error '+err.status+' - '+err.statusText);
                    }
                });
            }
        }else{
            var msg = '<ul><li>'+msgs.join('</li><li>')+'</li></ul>';
            this.setMessage(i18n.validation.incomplete, msg, 'warning');
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName==='browse'){
            if(this._prevViewOne!=='browse' && this._prevViewOne!=='json'){
                this.setView(this._prevViewOne);
            }else{
                this.setView('edit', false, true);
            }
        }
        return this.curView.setDefaults() //.clear()
            .setTitle(i18n.getLabel('tools.newEntity', this.uiModel.name, vw.getTitle()));
    },

    deleteItem: function(skipConfirmation, id, options){
        var that=this,
            uimId=id || this.uiModel.id,
            entityName=this.uiModel.name,
            entityValue=(options && options.title) || this.curView.getTitle(),
            fnSuccess;

        if(id || this.curView.cardinality==='1'){
            if(id){
                //this.setModelById(id, true);
                var mid=Evol.Config.localStorage?''+id:id; // using string or int
                this.model=this.collection.findWhere({id: mid});
                var t=this.uiModel.fnTitle;
                if(t && this.model){
                    if(_.isString(t)){
                        entityValue=this.model.get(t);
                    }else{
                        entityValue=t(that.model);
                    }
                }
            }
            fnSuccess = function(){
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
                var opts = {
                    success: function(){
                        if(newModel===null || collec.length===0){
                            if(that.curView.clear){
                                that.curView.clear();
                            }
                        }else{
                            that.model = newModel;
                            if(!id){
                                that.setRoute(newModel.id, false);
                                that.curView.setModel(newModel);
                            }
                        }
                        var eName= Evol.Format.capitalize(entityName);
                        that.setMessage(i18n.getLabel('deleted1', eName), i18n.getLabel('msg.deleted', eName, entityValue), 'info');
                        if(options && options.fnSuccess){
                            options.fnSuccess();
                        }
                        that._trigger('item.deleted');
                    },
                    error: function(m, err){
                        alert('error in "deleteItem"');
                    }
                };
                if(!(id || Evol.Config.localStorage)){
                    opts.url=that.model.url();
                }
                collec.remove(delModel);
                delModel.destroy(opts);
            };
            var delModel = this.model;
            if(delModel){
                if(skipConfirmation){
                    fnSuccess();
                }else{
                    dom.modal.confirm(
                        'delete',
                        i18n.getLabel('deleteX', entityName),
                        i18n.getLabel('delete1', entityName, _.escape(entityValue)),
                        {
                            'ok': fnSuccess
                        }
                    );
                }
            }
        }/*else{
            if(that.curView.getSelection){
                var selection=that.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('deleteN', selection.length, that.uiModel.namePlural))) {
                        //TODO

                    }
                }
            }
        }*/
    },

    setMessage: function(title, content, style){
        toastr[style || 'info'](content, title);
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        toastr.clear();
        return this;
    },

    showMessage: function(evt, ui){
        if(ui){
            return this.setMessage(ui.title, ui.content, ui.style);
        }else{
            return this.clearMessage();
        }
    },

    setTitle: function(){
        if(this.curView){
            this.curView.setTitle();
        }
        return this;
    },

    getStatus: function(){
        if(this.curView.cardinality==='n'){
            if(this._filteredCollection){
                return this._filteredCollection.length+' / '+this.collection.length+' '+this.uiModel.namePlural;
            }else{
                return this.collection.length+' '+this.uiModel.namePlural;
            }
        }else{
            return '';
        }
    },

    setStatus: function(msg){
        this.$('.evo-toolbar .evo-tb-status')
            .html(msg);
        this.$('.evo-many-summary').html(msg);
    },

    updateStatus: function(){
        this.setStatus(this.getStatus());
    },

    click_action: function(evt, options){
        var actionId;
        if(_.isString(options)){
            actionId=options;
        }else{
            actionId=options.id;
        }
        switch(actionId){
            case 'cancel':
                window.history.back();
                break;
            case 'edit':
                if(options.mid){
                    this.setModelById(options.mid);
                    this.setRoute(options.mid, false, 'edit');
                }else{
                    //todo
                    this.setView(actionId, true);
                }
                break;
            case 'delete':
                if(options.mid){
                    this.deleteItem(options.skipWarning, options.mid, options);
                }
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
                break;
            case 'import':
                var d = options.data;
                var msg, style;
                if(d && d.total){
                    style = d.errors.length ? (d.inserts.length ? 'warning' : 'error') : 'success';
                    msg = d.inserts + ' ' +  this.uiModel.name + ' added.';
                    if(d.errors>0){
                        msg += '<br>' + d.errors.length + ' Errors.';
                    }
                    this.setMessage(i18n.import.success, msg, style);
                }else{
                    this.setMessage(i18n.import.empty, '', 'warning');
                }
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
        var cl=this.curView.collection ? this.curView.collection.length : 0,
            cssDisabled='disabled',
            pIdx=this.pageIndex||0,
            $item=this.$('[data-id="prev"]');

        dom.addRemClass($item, pIdx===0, cssDisabled);
        dom.addRemClass($item.next(), (pIdx+1)*this.pageSize>cl, cssDisabled);
    },

    _enableNav: function(){
        this.$('[data-id="prev"],[data-id="next"]')
            .removeClass('disabled');
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
        //evt.preventDefault();
        //evt.stopImmediatePropagation();
        switch(toolId){
            case 'save':
                this.saveItem(false);
                break;
            case 'del':
                this.deleteItem(evt.shiftKey);
                break;
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    var that=this;
                    this.proceedIfReady(function(){
                        that.navPrevNext(toolId);
                    });
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;/*
             case 'customize':
                 this.curView.customize();
                 break;
             case 'new-field':
             case 'new-panel':
                 Evol.Dico.showDesigner('', toolId.substr(4), $e);
                 break;*/
            default:// 'browse', edit', 'mini', 'json', 'list', 'cards', 'bubbles', 'export'
                if(toolId && toolId!==''){
                    this.setView(toolId, true);
                }
                this.updateStatus();
        }
        this._trigger('toolbar.'+toolId);
    },

    _trigger: function(name, ui){
        this.$el.trigger(name, ui);
    },

    click_navigate: function(evt, ui, view){
        evt.stopImmediatePropagation();
        this.setModelById(ui.id);
        if(ui.view){
            this.setView(ui.view);
        }
        this.setRoute(ui.id, false, ui.view);
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
            var models=this._searchString ? this._filteredCollection.models : this.model.collection.models;
            models=Evol.Dico.filterModels(models, fvs);
            if(this.collectionClass){
                collec=new this.collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection = collec;
            this._filterValue = fvs;
        }else{
            collec=this.collection;
            this._filteredCollection = null;
            this._filterValue = null;
        }
        this.updateStatus();
        this._flagFilterIcon(fvs.length);
        this.pageIndex=0;
        this.curView.setCollection(collec);
        this.updateNav();
        this._trigger('filter.change');
    },
    
    click_search: function(evt){
        var that=this,
            vSearch=this.$('.evo-search>input').val().toLowerCase(),
            fnSearch = Evol.Def.fnSearch(this.uiModel, vSearch),
            collec;

        this._searchString = vSearch;
        if(vSearch){
            var models=(this.collection||this.model.collection).models
                    .filter(fnSearch);
            if(this.collectionClass){
                collec = new this.collectionClass(models);
            }else{
                collec = new Backbone.Collection(models);
            }
            this._filteredCollection = collec;
        }else{
            collec=this.collection;
            this._filteredCollection=null;
        }
        this.updateStatus();
        this.pageIndex=0;
        if(this.curView.viewType!=='many' && !this.curView.isChart){
            this.setView('list', true);
        }
        this.curView.setCollection(collec);
        this.updateNav();
        this._trigger('search');
    },

    key_search: function(evt){
        if(evt.keyCode===13){
            evt.preventDefault();
            this.click_search(evt);
        }
    },

    clear_search: function(evt){
        var collec=this.collection;
        this._filteredCollection=null;
        this.updateStatus();
        this.pageIndex=0;
        if(this.curView.setCollection){
            this.curView.setCollection(collec);
        }
        this._searchString = null;
        this.$('.evo-search>input').val('').focus();
        //this.updateNav();
        //this._trigger('search');
    },

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
    }

});

}();
;
/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: app.js
 *
 * View "app" to manage the single page app for all objects/ui-models.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.App = Backbone.View.extend({

    //events: {
        //'click .evo-head-links2>li': 'click_entity'
    //},

    options: {
        //uiModels: [],
        elements:{
            nav: '.evo-head-links',
            nav2: '.evo-head-links2',
            content: '#evol'
        },
        style: 'panel-default',
        useRouter: true,
        pageSize: 20,
        prefix: 'evol-'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        var uims = {};
        _.forEach(this.uiModels, function(uim, idx){
            uims[uim.id||'uim'+idx] = uim;
        });
        this.uiModelsObj = uims;
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
            EvolRouter = Backbone.Router.extend ({
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
            Evol.Dico.setRoute(this.router, cView.uiModel.id, cView.viewName, id, triggerRoute);
            Evol.Dico.setPageTitle(cView.getTitle());
        }else{
            alert('Error: Invalid route (for app).');
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
        var that=this, url, M, Ms;

        if(Evol.Config){
            if(Evol.Config.localStorage){
                var lc = new Backbone.LocalStorage(this.prefix+(uiModel.table || uiModel.id));
                M = Backbone.Model.extend({
                    localStorage: lc
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    localStorage: lc
                });
            }else{
                url = Evol.Config.url+uiModel.id;
                M = Backbone.Model.extend({
                    urlRoot: url
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    url: url
                });
            }
        }else{
            alert('Error: missing config file.');
        }

        var ms = new Ms();
        ms.fetch({
            success: function(collection){
                var m = ms.at(0),
                    config = {
                        el: $v,
                        mode: 'list',
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
                var toolbar = new Evol.Toolbar(config).render();//.setTitle();
                if(options && toolbar.cardinality==='1'){
                    toolbar.setModelById(options);
                }
                if(that._tbs){
                    that._tbs[uiModel.id] = toolbar;
                }
                if(cb){
                    cb(toolbar);
                }
            },
            error: function(err){
                alert('Error: invalid route (for app).');
            }
        });
    },

    _HTMLentities: function (es) {
        return _.map(es, function(e){
            return '<li><a href="#' + e.id + '/list" data-id="' + e.id + '">' + e.namePlural + '</a></li>';
        }).join('');
    }

});


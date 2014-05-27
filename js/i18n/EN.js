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
    SearchRes:'Search Result',
    //MassUpdate:'Mass Update',
    bDelete:'Delete',
    bAll:'All',
    bFilter: 'Filter',
    //ListAll:'List All',
    //Print:'Print',
    //pdf:'PDF',

    // --- buttons ---
    bSave:'Save',
    bSaveAdd:'Save and Add Another',
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
        preview:'Export preview',
        ExportHeader: 'Header',
        ExportSeparator: 'Separator',
        ExportFirstLine:'First line for field names',
        ExportFormat: 'Export format',
        ExportFields: 'Fields to include in the export',
        IDkey: 'ID - Primary key',
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

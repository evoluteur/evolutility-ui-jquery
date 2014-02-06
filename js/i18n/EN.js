//   Evolutility Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility
//   (c) 2014 Olivier Giulieri

var Evol = Evol || {};

Evol.i18n = {

	LOCALE:'EN',    // ENGLISH

    // --- toolbar ---
    View:'View',
    Edit:'Edit',
    // Login:'Login',
    New:'New',
    NewItem:'New {0}', //'New Item',
    NewUpload:'New Upload',
    //Search:'Search',
    //AdvSearch:'Advanced Search',
    NewSearch:'New Search',
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
    nodata: 'No data available.',
    nopix:'No picture.',

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


    // --- export ---
    export:{
        ExportEntity: 'Export this {0}', // {0}=entity
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

    // --- buttons ---
    Save:'Save',
    SaveAdd:'Save and Add Another',
    Cancel:'Cancel',
    NoChange:'No Change',
    NoX:'No {0}',

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

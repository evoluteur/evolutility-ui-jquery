//   Evolutility Localization Library ENGLISH
//   https://github.com/evoluteur/evolutility
//   (c) 2015 Olivier Giulieri

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
        NewEntity: 'New {0}', //'New Item',
        //NewUpload: 'New Upload',
        //Search: 'Search',
        //AdvSearch: 'Advanced Search',
        //NewSearch: 'New Search',
        //Selections: 'Selections',
        //Selection: 'Selection',
        bExport: 'Export',
        bCharts: 'Charts',
        //SearchRes: 'Search Result',
        //MassUpdate: 'Mass Update',
        bDelete: 'Delete',
        //bAll: 'All',
        bList: 'List',
        bFilter: 'Filter',
        bBubbles: 'Bubbles',
        bCards: 'Cards',
        bJSON: 'JSON',
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

    NoChange: 'No Change',
    NoX: 'No {0}',
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
        ExportOne: 'Export {0}', // {0}=entity
        ExportMany: 'Export {0}', // {0}=entities
        preview: 'Export preview',
        header: 'Header',
        options: 'options',
        separator: 'Separator',
        firstLine: 'First line for field names',
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
        //xpColors: 'Header color-Color odd rows-Color even rows',
        //xpColMap: 'Columns map to',
        XMLroot: 'Element name', // 'Root element name'
        //xpXMLAttr: 'Attributes',
        //xpXMLElem: 'Elements',
        db: 'Database',
        SQL: 'SQL Options',
        SQLTable: 'Table name',
        SQLTrans: 'In transaction',
        SQLIdInsert: 'Identity insert',
        DownloadEntity: 'Download {0}'
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

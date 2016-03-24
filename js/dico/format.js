/*! ***************************************************************************
 *
 * evolutility :: format.js
 *
 * Helpers for string manipulation and date formats
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2016 Olivier Giulieri
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
            return  dd;
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

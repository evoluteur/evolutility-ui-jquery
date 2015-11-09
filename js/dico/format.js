/*! ***************************************************************************
 *
 * evolutility :: format.js
 *
 * Helpers for string manipulation and date formats
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Format = {

    // --- string helpers ---
    capitalize: function(word){ // TODO use _.string.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
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
    cr2br: function(v){
        return (v || '').replace(/[\r\n]/g, '<br>');
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
    jsonString: function(d){
        return _.escape(JSON.stringify(d, null, '\t'));
    }
    

};

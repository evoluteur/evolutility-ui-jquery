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

    version: '0.0.3',

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
            return ['<textarea name="', fID, '" id="', fID, '" class="evo-field form-control"" rows="', h,
                (ml > 0) ? ('" onKeyUp="Evol.UI.Validation.checkMaxLen(this,' + ml + ')') : '',
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
    HTMLMsg: function (title, content, style) {
        return [
            '<div data-id="msg" class="evo-msg alert alert-',style || 'info',
            ' alert-dismissable">', this.html.buttonClose,
            '<strong>',title,'</strong> <span>',
            content,'</span></div>'
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

    capitalize: function(word){ // TODO use _.capitalize(word);
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

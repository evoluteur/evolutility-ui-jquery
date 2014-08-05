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
        required: '<span class="evol-required">*</span>', // TODO replace by div w/ ":after" css for icon
        buttonClose: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
    },

    // --- field labels ---
    label: function (id, label) {
        return ['<label for="', id, '">', label, '</label>'].join('');
    },
    fieldLabel: function (id, label) {
        return ['<div class="evol-field-label">', this.label(id, label), '</div>'].join('');
    },
    fieldLabelSpan: function (id, label) {
        return ['<span class="evol-field-label">', this.label(id, label), '</span>'].join('');
    },

    // --- input fields ---
    input: {

        text: function (id, value, fd, css) {
            var fCss= 'evo-field form-control ' + (css || ''),
                h = ['<input type="text" id="', id, '" value="', value];
            if(value.indexOf('"')>-1){
                value=value.replace(/"/g,'\"');
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
                if(fCss){
                    h.push('" class="', fCss);
                }
            }
            h.push('">');
            return h.join('');
        },
        textInt: function (id, value, min, max) {
            // TODO validation on leave field
            // TODO textDec
            var h=['<input class="evo-field form-control" type="number" id="', id,
                '" value="', value];
            if(!_.isUndefined(min)){
                h.push('" min="', min);
            }
            if(!_.isUndefined(max)){
                h.push('" max="', max);
            }
            h.push('" maxlength="12">');
            return h.join('');
        },
        textM: function (id, value, maxLen, height) {
            return ['<textarea id="', id, '" class="evo-field form-control" rows="', height,
                //(maxLen > 0) ? ('" onKeyUp="Evol.UI.Validation.fixLength(this,' + maxLen + ')') : '',
                '">', value, '</textarea>'
            ].join('');
        },
        textMJSON: function (id, fVobj, height) {
            return ['<textarea id="', id, '" rows="',height,'" class="evol-json evo-field form-control">',
                _.escape(JSON.stringify(fVobj, null, '\t')),
                '</textarea>'].join('');
        },
        myType: function (type, id, value) {
            return [
                '<input type="', type, '" id="', id, '" value="', value,
                '" class="evo-field form-control" size="15">'
            ].join('');
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
            return [
                '<input type="color" id="', id, '" value="', value, '" size="15">'
            ].join('');
        },
        colorBox: function (id, value) {
            return [
                '<div class="evo-color-box" id="', id,
                '" style="background-color:', value,
                '" title="', value, '"></div>'
            ].join('');
        },

        checkbox: function (id, value) {
            var fh = ['<input type="checkbox" id="', id];
            if (value) {
                fh.push('" checked="checked');
            }
            fh.push('" value="1">');
            return fh.join('');
        },
        checkbox2: function (id, value, css) {
            var fh = ['<input type="checkbox" data-id="', id, '" class="',css,'"'];
            if (value) {
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

        radio: function (fN, value, label, sel, id) {
            return ['<label for="', id, '"><input id="', id, '" name="', fN,
                '" type="radio" value="', value,
                (sel) ? '" checked="checked' : '',
                '">', label, '</label>&nbsp;'
            ].join('');
        },
        lov: function (id, value, label, fLOV) {
            var h = ['<select class="evo-field form-control" id="', id, '"><option value="', value, '" selected>', label, '</option>'];
            _.each(fLOV, function (f) {
                h.push(this.option(f.id, f.text));
            });
            h.push('</select>');
            return h.join('');
        },

        img: function (id, value) {
            return ['<img id="', id, '" src="', value, '"/>'].join('');
        },

        hidden: function (id, value) {
            return ['<input type="hidden" name="', id, '" id="', id, '" value="', value, '"/>'].join('');
        },/*
        hiddens: function (h, list) {
            _.each(function (){
                h.push('<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>');
            });
        },*/
        selectBegin: function (id, css, emptyOption) {
            var h=['<select id="', id, '" class="form-control ',css,'">'];
            if(emptyOption){
                h.push(Evol.UI.html.emptyOption);
            }
            return h.join('');
        },
        select:function (id, value, css, emptyOption, list) {
            return [
                this.selectBegin(id, css, emptyOption),
                this.options(list, value),
                '</select>'
            ].join('');
        },

        option: function (id, text) {
            return ['<option value="', id, '">', text, '</option>'].join('');
        },
        options: function (fields, value) {
            var fnOpt = Evol.UI.input.option,
                opts=[];
            _.each(fields,function(f){
                if(f.id===value){
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

    toggleCheckbox: function($cb, v){
        if(v){
            $cb.prop('checked', 'checked');
        }else{
            //$cb.removeProp('checked');
            $cb.prop('checked', false);
        }
    },

    // --- links ---
    link: function (id, label, url, target) {
        var h=['<a class="evo-field" href="', url];
        if(id){
            h.push('" id="', id);
        }
        if(target){
            h.push('" target="',target);
        }
        h.push('">', label, '</a>');
        return h.join('');
    },
    linkEmail: function (id, email) {
        if(email){
            email = _.escape(email);
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
        return ['<i class="', css? css+' ':'', Evol.UI.html.glyphicon, icon, '"></i>'].join('');
    },

    iconCustomize: function (id, type) {
        return Evol.UI.iconId(id, type, 'wrench');
    },

    iconId: function (id, type, icon) {
        return ['<i class="',Evol.UI.html.glyphicon, icon, '" data-id="', id, '" data-type="', type, '"></i>'].join('');
    },

    // --- menu ---
    menu: {
        hBegin: function (id, tag, icon){
            return ['<', tag,' class="dropdown" data-id="',id,'">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',Evol.UI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu evo-dropdown-icons">'].join('');
        },
        hEnd: function(tag){
            return '</ul></' + tag + '>';
        },
        hItem: function(id, label, icon, cardi, style){
            var h=[];
            h.push('<li data-id="',id,'"');
            if(cardi){
                h.push(' data-cardi="'+cardi,'"');
            }
            if(style!=='label'){
                h.push(' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="',label,'"');
            }
            h.push('><a href="javascript:void(0);" data-id="',id,'">',Evol.UI.icon(icon));
            if(style!=='tooltip'){
                h.push('&nbsp;',label);
            }
            h.push('</a></li>');
            return h.join('');
        }
    },

    // --- modal ---
    modal:{

        alert: function(title, msg){
            var $m=$(this.HTMLModal('alert', title, msg, Evol.i18n.bOK))
                    .on('click', 'button', function(evt){
                        $m.remove();
                    })
                    .modal('show');
        },

        confirm: function(id, title, msg, bOK, bCancel, cbOK, cbCancel){
            var $m=$(this.HTMLModal(id, title, msg, bOK, bCancel))
                    .on('click', 'button', function(evt){
                        var isOK=$(evt.currentTarget).hasClass('btn-primary');
                        if(isOK && cbOK){
                            cbOK();
                        }
                        if(!isOK && cbCancel){
                            cbCancel();
                        }
                        $m.remove();
                    })
                    .modal('show');
        },

        HTMLModal: function(id, title, msg, bOK, bCancel) {
            var h=[
                '<div class="modal fade" id="', id, '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
                '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                '<h4 class="modal-title">', title, '</h4>',
                '</div>',
                '<div class="modal-body">', msg, '</div>',
                '<div class="modal-footer">'
            ];
            if(bCancel){
                h.push(this._HTMLButton(bCancel, 'btn-default'));
            }
            if(bOK){
                h.push(this._HTMLButton(bOK, 'btn-primary'));
            }
            h.push('</div></div></div></div>');
            return h.join('');
        },

        _HTMLButton: function(label, css){
            return ['<button type="button" class="btn ', css, '" data-dismiss="modal">', label, '</button>'].join('');
        }
    },

    // --- panels ---
    HTMLPanelBegin: function (pid, label, css) {
        return [
            '<div data-pid="', pid, '" class="panel ', css, '">',
            '<div class="panel-heading">', Evol.UI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', label, '</h3></div>'
        ].join('');
    },
    HTMLPanelEnd: function () {
        return '</div>';
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

    capitalize: function(word){ // TODO use _.str.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }else{
            return '';
        }
    },

    trim: function(stringValue){ // TODO use _.trim(word);
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
    },

    cr2br: function(v){
        return v.replace(/[\r\n]/g, '<br/>');
    }

};

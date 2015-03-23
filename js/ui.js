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

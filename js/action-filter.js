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

/*! ***************************************************************************
 *
 * evolutility :: filter.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico,
    evoLang=EvolLang.filters;

var evoAPI={
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

Evol.ViewFilter = Backbone.View.extend({

    events: {
        'click .evo-filters > button': 'click_editFilter',
        'click .evo-filters-btns > button > .glyphicon-remove': 'click_remove'
        // TODO move other events here
    },

    options: {
        fields: [],
        dateFormat: 'mm/dd/yy',
        //highlight: true,
        buttonLabels: false,
        submitButton: false,
        submitReady: false
    },

    initialize: function (opts) {
        _.extend(this.options, opts);
        return this;
    },

    render: function(){
        var bClass='btn',
            bLabels=this.options.buttonLabels,
            that=this,
            e=this.$el,
            h=['<div class="evo-filters-btns"></div>',
                '<button class="evo-bNew btn-primary ',bClass,'">',evoLang.bNewFilter,'</button>'];
        if(this.options.submitButton){
            h.push('<button class="evo-bSubmit">',evoLang.bSubmit,'</button>');
        }
        h.push('<div class="evo-editFilter"></div>',
            '<button class="evo-bAdd ',bClass,' btn-primary" style="display:none;">',EvoUI.icon('ok'),'</button>',//, '&nbsp;', evoLang.bAddFilter
            '<button class="evo-bDel ',bClass,'" style="display:none;">',EvoUI.icon('remove'),'</button>');//, '&nbsp;', evoLang.bCancel
        this._step=0;
        e.html(h.join(''));
        if(this.options.submitReady){
            this._hValues=$('<span></span>').appendTo(e);
        }
        // - button submit
        if(this.options.submitButton){
            this._bSubmit=e.find('.evo-bSubmit').button({
                text: bLabels
            }).on('click', function(){
                that.$el.trigger('submit.filter');
            });
        }
        // - editor button new
        this._bNew=e.find('.evo-bNew').button().on('click', function(e){
            if(that._step<1){
                that._setEditorField();
                that._step=1;
            }
            //that._bAdd.find('.ui-button-text').html(evoLang.bAddFilter);
            });
        // - editor button add
        this._bAdd=e.find('.evo-bAdd').button().on('click', function(evt){
            var data=that._getEditorData();
            if(that._cFilter){
                that._enableFilter(data, that.options.highlight);
            }else{
                that.addFilter(data);
            }
            that._removeEditor();
        });
        // - editor button cancel
        this._bDel=e.find('.evo-bDel').button().on('click', function(evt){
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
                    if(fType==EvoDico.fieldTypes.lov || fType==EvoDico.fieldTypes.bool){
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
                    valid=(value!=='') || type==EvoDico.fieldTypes.lov || type==EvoDico.fieldTypes.bool;
                if(type==EvoDico.fieldTypes.number){
                    valid=valid && !isNaN(value);
                }else if(that._operator==evoAPI.sBetween){
                    valid=that._editor.find('#value').val()!=='' && that._editor.find('#value2').val()!=='';
                }
                if(valid){
                    that._bAdd.button('enable');
                    if(evt.which==13){
                        that._bAdd.trigger('click');
                    }
                }else{
                    that._bAdd.button('disable');
                }
            }).on('click', '#checkAll', function(){
                var $this=$(this),
                    vc=$this.attr('checked'),
                    allChecks=$this.siblings();
                if(vc=='checked'){
                    allChecks.attr('checked',vc);
                }else{
                    allChecks.removeAttr('checked');
                }
            });
        this._filters=e.find('.evo-filters-btns').on('click', 'button', function(){
            that._editFilter($(this));
        }).on('click', 'btn-secondary', function(evt){
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

    _getFieldById: function(fId){
        if(!this._hash){
            this._hash={};
            var fields=this.options.fields;
            for (var i=0,iMax=fields.length;i<iMax;i++){
                this._hash[fields[i].id]=fields[i];
            }
        }
        return this._hash[fId];
    },

    _removeEditor: function(){
        this._editor.empty();
        this._bAdd.hide();
        this._bDel.hide();
        this._enableFilter(null, false);
        this._bNew.removeClass('ui-state-active').show().focus();
        if(this._bSubmit){
            this._bSubmit.removeClass('ui-state-active').show();
        }
        this._step=0;
        this._field=this._type=this._operator=null;
    },

    addFilter: function(filter){
        var f=$(['<button class="btn btn-default btn-sm">',this._htmlFilter(filter),'</button>'].join(''))
            .prependTo(this._filters)
            .button({
                icons: {secondary:'ui-icon-close'}
            })
            .data('filter', filter)
            .fadeIn();
        //if(this.options.highlight){
        //    f.effect('highlight');
        //}
        this._triggerChange();
        return this;
    },

    removeFilter: function(index){
        this._filters.children().eq(index).remove();
        this._triggerChange();
        return this;
    },

    _htmlFilter: function(filter){
        var h=[
            '<span class="evo-lBold">', filter.field.label,'</span> ',
            '<span class="evo-lLight">', filter.operator.label,'</span> ',
            '<span class="evo-lBold">', filter.value.label, '</span>'
        ];
        if(filter.operator.value==evoAPI.sBetween){
            h.push('<span class="evo-lLight"> ', evoLang.opAnd, ' </span>',
                '<span class="evo-lBold">', filter.value.label2, '</span>');
        }
        h.push(EvoUI.icon('remove'));
        return h.join('');
    },

    _enableFilter: function(filter, anim){
        if(this._cFilter){
            this._cFilter.button('enable').removeClass('ui-state-hover ui-state-active');
            //if(anim){
            //    this._cFilter.effect('highlight');
            //}
            if(filter){
                this._cFilter.data('filter', filter)
                    .find(':first-child').html(this._htmlFilter(filter));
                this._cFilter=null;
                this._triggerChange();
            }else{
                this._cFilter=null;
            }
        }
    },

    _editFilter: function($filter){
        var filter=$filter.data('filter'),
            fid=filter.field.value,
            op=filter.operator.value,
            fv=filter.value;
        this._enableFilter(null, false);
        this._removeEditor();
        this._cFilter=$filter.button('disable');
        this._setEditorField(fid);
        this._setEditorOperator(op);
        if(op==evoAPI.sBetween){
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
                var fields=this.options.fields,
                    h=[EvoUI.inputSelectBegin('field',null,true)];
                _.each(fields, function(f){
                    h.push(EvoUI.inputOption(f.id, f.label));
                });
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
        var evoTypes=EvoDico.fieldTypes,
            fType=this._type;
        if(this._step<2){
            var h=[];
            switch (fType){
                case evoTypes.lov:
                    //h.push(evoLang.sInList);
                    h.push(EvoUI.inputHidden('operator',evoAPI.sInList));
                    this._operator=evoAPI.sInList;
                    break;
                case evoTypes.bool:
                    //h.push(evoLang.sEqual);
                    h.push(EvoUI.inputHidden('operator',evoAPI.sEqual));
                    this._operator=evoAPI.sEqual;
                    break;
                default:
                    h.push(EvoUI.inputSelectBegin('operator','',true));
                    switch (fType){
                        case evoTypes.date:
                        case evoTypes.time:
                            if (fType==evoTypes.time){
                                h.push(EvoUI.inputOption(evoAPI.sEqual, evoLang.sAt),
                                    EvoUI.inputOption(evoAPI.sNotEqual, evoLang.sNotAt));
                            }else{
                                h.push(EvoUI.inputOption(evoAPI.sEqual, evoLang.sOn),
                                    EvoUI.inputOption(evoAPI.sNotEqual, evoLang.sNotOn));
                            }
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sGreater, text: evoLang.sAfter},
                                {id: evoAPI.sSmaller, text: evoLang.sBefore},
                                {id: evoAPI.sBetween, text: evoLang.sBetween}
                            ]));
                            break;
                        case evoTypes.number:
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sEqual, text: evoLang.sNumEqual},
                                {id: evoAPI.sNotEqual, text: evoLang.sNumNotEqual},
                                {id: evoAPI.sGreater, text: evoLang.sGreater},
                                {id: evoAPI.sSmaller, text: evoLang.sSmaller}
                            ]));
                            break;
                        default:
                            h.push(EvoUI.inputOptions([
                                {id: evoAPI.sEqual, text: evoLang.sEqual},
                                {id: evoAPI.sNotEqual, text: evoLang.sNotEqual},
                                {id: evoAPI.sStart, text: evoLang.sStart},
                                {id: evoAPI.sContain, text: evoLang.sContain},
                                {id: evoAPI.sFinish, text: evoLang.sFinish}
                            ]));
                    }
                    h.push(EvoUI.inputOption(evoAPI.sIsNull, evoLang.sIsNull),
                        EvoUI.inputOption(evoAPI.sIsNotNull, evoLang.sIsNotNull));
                    h.push('</select>');
            }
            this._editor.append(h.join(''));
        }
        if(cond && fType!=evoTypes.lov){
            this._editor.find('#operator').val(cond);
            this._operator=cond;
        }
        this._step=2;
    },

    _setEditorValue: function( v, v2){
        var editor=this._editor,
            fType=this._type,
            evoTypes=EvoDico.fieldTypes,
            opVal=editor.find('#operator').val(),
            opBetween=false,
            addOK=true;
        if(opVal!==''){
            if(fType!=evoTypes.lov && (opVal==evoAPI.sIsNull || opVal==evoAPI.sIsNotNull)){
                editor.append(EvoUI.inputHidden('value',''));
            }else{
                if(this._step<3){
                    var h=[];
                    opBetween=opVal==evoAPI.sBetween;
                    switch (fType){
                        case evoTypes.lov:
                            h.push('<span id="value">');
                            if(this._field.list.length>7){
                                h.push(EvoUI.inputCheckbox('checkAll', true),'<label for="checkAll">',EvolLang.All,'</label>');
                            }
                            h.push(EvoUI.inputCheckboxLOV(this._field.list),
                                '</span>');
                            break;
                        case evoTypes.bool:
                            h.push('<span id="value">',
                                EvoUI.inputRadio('value', '1', evoLang.yes, v!='0', 'value1'),
                                EvoUI.inputRadio('value', '0', evoLang.no, v=='0', 'value0'),
                                '</span>');
                            break;
                        case evoTypes.date:
                        case evoTypes.time:
                        case evoTypes.number:
                            var iType=fType;//(fType==evoTypes.date)?'text':fType;
                            h.push('<input id="value" type="',fType,'"/>');
                            if(opBetween){
                                h.push('<span class="as-Txt">',evoLang.opAnd,' </span>',
                                    '<input id="value2" type="',iType,'"/>');
                            }
                            addOK=false;
                            break;
                        default:
                            h.push(EvoUI.inputText('value', '','evo-w-'));
                            addOK=false;
                    }
                    editor.append(h.join(''));
                    //if(fType==evoTypes.date){
                    //    editor.find('#value,#value2').datepicker({dateFormat:this.options.dateFormat});
                    //}
                }
                if(v){
                    var $value=editor.find('#value');
                    switch (fType){
                        case evoTypes.lov:
                            $value.find('#'+v.split(',').join(',#')).attr('checked', 'checked');
                            break;
                        case evoTypes.bool:
                            $value.find('#value'+v).attr('checked', 'checked');
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
                    addOK=(fType==evoTypes.lov || fType==evoTypes.bool);
                }
            }
            this._bAdd.button(addOK?'enable':'disable').show();
            this._step=3;
        }
    },

    _getEditorData: function(){
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
            evoTypes=EvoDico.fieldTypes,
            op=filter.operator,
            fv=filter.value;
        if(this._type==evoTypes.lov){
            var vs=[], ls=[];
            v.find('input:checked').not('#checkAll').each(function(){
                vs.push(this.value);
                ls.push(this.nextSibling.innerHTML);
            });
            if(vs.length===0){
                op.label=evoLang.sIsNull;
                op.value=evoAPI.sIsNull;
                fv.label=fv.value='';
            }else if(vs.length==1){
                op.label=evoLang.sEqual;
                op.value=evoAPI.sEqual;
                fv.label='"'+ls[0]+'"';
                fv.value=vs[0];
            }else{
                op.label=evoLang.sInList;
                op.value=evoAPI.sInList;
                fv.label='('+ls.join(', ')+')';
                fv.value=vs.join(',');
            }
        }else if(this._type==evoTypes.bool){
            op.label=evoLang.sEqual;
            op.value=evoAPI.sEqual;
            var val=(v.find('#value1').attr('checked')=='checked')?1:0;
            fv.label=(val==1)?evoLang.yes:evoLang.no;
            fv.value=val;
        }else{
            var o=e.find('#operator'),
                opVal=o.val();
            op.label=o.find('option:selected').text();
            op.value=opVal;
            if(opVal==evoAPI.sIsNull || opVal==evoAPI.sIsNotNull){
                fv.label=fv.value='';
            }else{
                if(this._type==evoTypes.number || this._type==evoTypes.date || this._type==evoTypes.time){
                    fv.label=v.val();
                }else{
                    fv.label='"'+v.val()+'"';
                }
                fv.value=v.val();
                if(opVal==evoAPI.sBetween){
                    fv.label2=fv.value2=v.next().next().val();
                }
            }
        }
        return filter;
    },

    _hiddenValue: function(h, filter, idx){
        h.push(EvoUI.inputHidden('fld-'+idx, filter.field.value),
            EvoUI.inputHidden('op-'+idx, filter.operator.value),
            EvoUI.inputHidden('val-'+idx, filter.value.value));
        var v2=filter.value.value2;
        if(v2){
            h.push(EvoUI.inputHidden('val2-'+idx, v2));
        }
    },

    _setHiddenValues: function(){
        var vs=this.val(),
            iMax=vs.length,
            h=[EvoUI.inputHidden('elem', iMax)];
        for(var i=0;i<iMax;i++){
            this._hiddenValue(h, vs[i], i+1);
        }
        //h.push('&label=',encodeURIComponent(this.valText()));
        this._hValues.html(h.join(''));
    },

    _triggerChange: function(){
        if(this.options.submitReady){
            this._setHiddenValues();
        }
        this.$el.trigger('change.filter');
    },

    val: function(value){
        if (typeof value=='undefined'){
            // --- get value
            var v=[];
            this._filters.children().each(function(){
                v.push($(this).data('filter'));
            });
            return v;
        }else{
            // --- set value
            this._filters.empty();
            for(var i=0,iMax=value.length;i<iMax;i++){
                this.addFilter(value[i]);
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

    valUrl: function(){
        var vs=this.val(),
            iMax=vs.length,
            url=['filters=',iMax];
        if(iMax<1)
            return '';
        for(var i=0;i<iMax;i++){
            var v=vs[i];
            url.push(
                '&field-',i,'=',v.field.value,
                '&operator-',i,'=',v.operator.value,
                '&value-',i,'=',encodeURIComponent(v.value.value)
            );
            if(v.operator==evoAPI.sBetween){
                url.push('&value2-',i,'=',encodeURIComponent(v.value.value2));
            }
        }
        url.push('&label=',encodeURIComponent(this.valText()));
        return url.join('');
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

    destroy: function(){
        var e=this.$el.off();
        e.find('.evo-bNew,.evo-bAdd,.evo-bDel,.evo-filters').off();
        this._editor.off();
        e.empty();
    },

    click_editFilter: function(evt){
        //var idx=$(evt.target).index();
        this._setEditorValue( );
    },

    click_remove: function(evt){
        evt.stopImmediatePropagation();
        var idx=$(evt.target).parent().index();
        this.removeFilter(idx);
    }

});


/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View many
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany = Backbone.View.extend({

    cardinality: 'n',
    _hashLov: {},

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    events: {
        'click .evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function (opts) {
        var that=this;
        _.extend(this.options, opts);
        this._filter=[];
        if(this.collection){
            this.collection.on('change', function(model){
                that.render();
            });
        }
    },

    render:function(){
        var models=this.collection.models;
        if(this.collection.length){
            if(this._filter.length){
                var that=this;
                models=models.filter(function(model){
                    var filters=that._filter,
                        want=true;
                    for(var i= 0, iMax=filters.length;i<iMax && want;i++){
                        var filter=filters[i],
                            vf=filter.value.value,
                            fv=model.get(filter.field.value);
                        if(fv===undefined){
                            fv='';
                        }
                        switch(filter.operator.value){
                            case 'eq':
                                want=vf===fv;
                                break;
                            case 'ne':
                                want=vf!==fv;
                                break;
                            case 'sw':
                                want=fv.indexOf(vf)===0;
                                break;
                            case 'ct':
                                want=fv.indexOf(vf)>-1;
                                break;
                            case 'fw':
                                want=fv.indexOf(vf)===fv.length-vf.length;
                                break;
                            case 'null':
                                want=fv==='' || fv===undefined;
                                break;
                            case 'nn':
                                want=fv!=='' || fv!==undefined;
                                break;
                            case 'in':
                                want= _.contains(vf.split(','),fv);
                                break;
                            case 1:
                                want=fv;
                                break;
                            case 0:
                                want=!fv;
                                break;

                        }
                    }
                    return want;
                });
            }
            this._render(models);
        }else{
            this.$el.html(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        return this;
    },

    _render:function(models){
        alert('_render must be overwritten');
    },

    customize: function () {
        var labels = this.$('th > span');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(EvoUI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    },

    setModel: function(model) {
        if(model.collection){
            this.collection = model.collection;
            this.render();
        }else{
            alert('No collection.');
        }
        return this;
    },

    setCollection: function(collection){
        this.collection = collection;
        this.render();
        return this;
    },

    setFilter: function(filter){
        this._filter=filter;
        return this;
    },

    //updateModel: function () {
    //    alert('updateModel');
    //},

    _updateTitle: function (){
        //$(this.options.title).html(this.model.get('title'));
    },

    getFields: function (){
        if(!this._fields){
            this._fields=EvoDico.fields(this.options.uiModel, function(f){
                return f.viewmany;
            });
            this._fieldHash={};
            var that=this;
            _.each(this._fields,function(f){
                that._fieldHash[f.id]=f;
            });
        }
        return this._fields;
    },

    getField: function (fid){
        return this._fieldHash[fid];
    },

    _HTMLField: function(f,v){
        switch(f.type){
            case EvoDico.fieldTypes.bool:
                if (v==='true' || v=='1') {
                    return EvoUI.icon('ok');
                }
                break;
            case EvoDico.fieldTypes.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                        return EvoDico.lovText(this._hashLov, f, v);
                    //}
                }
                break;
            case EvoDico.fieldTypes.date:
            case EvoDico.fieldTypes.time:
            case EvoDico.fieldTypes.datetime:
                if (v !== '') {
                    var myDate=new Date(v);
                    if(_.isDate(myDate)){
                        var dv='';
                        //return myDate.toLocaleDateString("en-US");
                        if(f.type!=EvoDico.fieldTypes.time){
                            dv+=EvoUI.formatDate(myDate);
                        }
                        if(f.type==EvoDico.fieldTypes.datetime){
                            dv+=' ';
                        }
                        if(f.type!=EvoDico.fieldTypes.date){
                            dv+=EvoUI.formatTime(myDate);
                        }
                        return dv;
                    }
                }
                break;
            case EvoDico.fieldTypes.pix:
                if (v.length) {
                    return EvoUI.input.img(f.id, v);
                }
                break;
            default:
                return v;
        }
        return '';
    },

    _paginationSummaryHTML: function (pIdx, pSize, allCount, entity, entities) {
        var rangeBegin = pIdx * pSize + 1, rangeEnd;
        if (pIdx < 1) {
            if (allCount === 0) {
                return allCount + ' ' + entities;
            } else if (allCount === 1) {
                return allCount + ' ' + entity;
            }
            rangeEnd = _.min([pSize, allCount]);
        } else {
            rangeEnd = _.min([rangeBegin + pSize, allCount]);
        }
        return ['<p>', rangeBegin, '-', rangeEnd, ' of ', allCount, ' ', entities, '</p>'].join('');
    },

    _paginationHTML: function (pIdx, pSize, allCount) {
        var iMin = pIdx * pSize + 1,
            allPages = parseInt(allCount / pSize, 10),
            iMax = (allPages > 5) ? 5 : allPages,
            h = ['<ul class="pagination pagination-sm">'];
        if (pIdx > 0) {
            h.push('<li data-id="prev"><a href="#">&laquo;</a></li>');
        }
        for (var i=iMin; i<iMax; i++) {
            h.push('<li data-id="', i, '"><a href="#">', i, '</a></li>');
        }
        if (allCount > (pIdx + 1) * pSize) {
            h.push('<li data-id="next"><a href="#">&raquo;</a></li>');
        }
        h.push('</ul>');
        return h.join('');
    },

    sortList: function(f, down){
        var collec=this.collection;
        if(collec!==undefined){
            if(f.type==EvoDico.fieldTypes.text || f.type==EvoDico.fieldTypes.txtm || f.type==EvoDico.fieldTypes.email){
                collec.comparator = EvoDico.bbComparatorText(f.id);
            }else{
                collec.comparator = EvoDico.bbComparator(f.id);
            }
            collec.sort();
            if(down){
                collec.models.reverse();
            }
            if(this.renderBody){
                this.renderBody(collec.models);
            }else{
                this.render();
            }
            this.$el.trigger('list.sort', {id: f.id, direction:down?'down':'up'});
        }
    },

    click_navigate: function (evt) {
        var e=$(evt.currentTarget),
            pTag=this.options.mode==='list'?'tr':'div';
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: e.closest(pTag).data('id')});
    },

    click_sort: function (evt) {
        var target=$(evt.currentTarget),
            fid=target.parent().data('fid'),
            f=this.getField(fid),
            down=target.attr('class').indexOf('-down')>0;
        this.sortList(f,down);
        target.addClass('evol-last-sort');
    },

    click_pagination: function (evt) {
        this.$el.trigger('list.paginate', {id: $(evt.currentTarget).closest('li').data('id')});
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    }

});


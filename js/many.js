/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View many
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany = Backbone.View.extend({

    viewType:'many',
    cardinality: 'n',

    options: {
        style: 'panel-info',
        pageSize: 20,
        pageIndex:0,
        autoUpdate: false,
        //titleSelector: '#title',
        selectable: false,
        links: true,
        iconsPath: 'pix/'
    },

    events: {
        'click .evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .pagination>li': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    initialize: function (opts) {
        var that=this;
        _.extend(this.options, opts);
        this.mode=this.options.mode || '';
        this._filter=[];
        if(this.options.autoUpdate){
            if(this.collection){
                this.collection.on('change', function(){
                    that.render();
                });
            }
        }
        this._custOn=false;
    },

    render:function(){
        var models=this.collection.models;
        if(this.collection.length){
            models=Evol.Dico.filterModels(models, this._filter);
            this._render(models);
        }else{
            this.$el.html(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        return this.setTitle();
    },

    _render:function(models){
        alert('_render must be overwritten');
    },

    _HTMLCheckbox: function(cid){
        return Evol.UI.input.checkbox2(cid, false, 'list-sel');
    },

    customize: function () {
        var labels = this.$('th>span');
        if(this._custOn){
            labels.find('i').remove();
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
        }
        this._custOn=!this._custOn;
        return this;
    },

    setCollection: function(collection){
        this.collection = collection;
        this.render();
        return this;
    },

    getCollection: function(){
        return this.collection;
    },

    setFilter: function(filter){
        this._filter=filter;
        return this;
    },

    getFilter: function(){
        return this._filter;
    },

    //updateModel: function () {
    //    alert('updateModel');
    //},

    setTitle: function (){
        $(this.options.titleSelector).html(this.getTitle());
        return this;
    },

    getTitle: function (){
        return Evol.UI.capitalize(this.options.uiModel.entities);
    },

    getFields: function (){
        if(!this._fields){
            this._fields=Evol.Dico.getFields(this.options.uiModel, function(f){
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

    _HTMLField: function(f, v){
        return Evol.Dico.HTMLField4Many( f, v, Evol.hashLov, this.options.iconsPath || '');
    },

    _$Selection:function(){
        return this.$('.list-sel:checked').not('[data-id="cbxAll"]');
    },

    getSelection:function(){
        if(this.options.selectable){
            return _.map(this._$Selection().toArray(), function(cbx){
                return $(cbx).data('id');
            });
        }
        return [];
    },

    pageSummary: function (pIdx, pSize, cSize, entity, entities) {
        if (cSize === 0) {
            return cSize + ' ' + entities;
        } else if (cSize === 1) {
            return cSize + ' ' + entity;
        } else {
            var rangeBegin = (pIdx || 0) * pSize + 1, rangeEnd;
            if (pIdx < 1) {
                rangeEnd = _.min([pSize, cSize]);
            } else {
                rangeEnd = _.min([rangeBegin + pSize -1, cSize]);
            }
            return Evol.i18n.range
                .replace('{0}',rangeBegin)
                .replace('{1}',rangeEnd)
                .replace('{2}',cSize)
                .replace('{3}',entities);
        }
    },
        /*
    _HTMLpagination: function (h, pIdx, pSize, cSize) {
        if(cSize>pSize){
            var nbPages = Math.ceil(cSize / pSize),
                pageId = pIdx + 1,
                iMin = pIdx * pSize + 1,
                iMax = ((nbPages > 5) ? 5 : nbPages);

            h.push('<ul class="evo-pagination pagination pagination-sm">');
            h.push('<li data-id="prev"',
                (pageId===1)?' class="disabled"':'',
                '><a href="#">&laquo;</a></li>');
            for (var i=iMin; i<iMax+1; i++) {
                h.push('<li',
                    (pageId===i)?' class="active"':'',
                    ' data-id="', i, '"><a href="#">', i, '</a></li>');
            }
            h.push('<li data-id="next"',
                (cSize > pageId * pSize)?'':' class="disabled"',
                '><a href="#">&raquo;</a></li>');
            h.push('</ul>');
        }
    },*/

    sortList: function(f, down){
        var collec=this.collection,
            ft=Evol.Dico.fieldTypes;
        if(!_.isUndefined(collec)){
            if(f.type==ft.text || f.type==ft.textml || f.type==ft.email){
                collec.comparator = Evol.Dico.bbComparatorText(f.id);
            }else{
                collec.comparator = Evol.Dico.bbComparator(f.id);
            }
            collec.sort();
            if(down){
                collec.models.reverse();
            }
            if(this.setPage){
                this.setPage(0);
            }else{
                this.render();
            }
            this.$el.trigger('list.sort', {id: f.id, direction:down?'down':'up'});
        }
    },

    click_navigate: function (evt) {
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: $(evt.currentTarget).closest('[data-mid]').data('mid')});
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

        Evol.Dico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id, type:eType});
    },

    click_selection: function (evt) {
        if($(evt.currentTarget).data('id')==='cbxAll'){

        }else{
            this.$el.trigger('selection');
        }
    },

    click_checkall: function (evt) {
        var isChecked=this.$('[data-id="cbxAll"]').prop('checked');
        //this.$('.list-sel:checked').not('[data-id="cbxAll"]');
        this.$('.list-sel').prop('checked', isChecked);
        this.$el.trigger('selection');
    }

});


/*! ***************************************************************************
 *
 * evol-utility : many.js
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

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    events: {
        'click a.evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > i': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function (opts) {
        var that=this,
            collec;
        this.options.mode=opts.mode;
        this.options.uiModel=opts.uiModel;
        if(this.collection){
            collec = this.collection;
        }else if(this.model && this.model.collection){
            collec = this.model.collection;
        }
        if(collec){
            collec.on('change', function(model){
                that.render();
            });
        }
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

    render: function () {
        var h = [];
        if(this.model && this.model.collection && this.model.collection.length>0){
            this.renderList(h, this.options.mode);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        this.$el.html(h.join(''));
        return this;
    },

    setModel: function(model) {
        this.model = model;
        this.render();
        return this;
    },
    updateModel: function () {
        alert('updateModel');
    },

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

    _hashLov: {},
    _lovText:function(f,v){
        if(('list' in f) && f.list.length>0){
            if(!(f.id in this._hashLov)){
                this._hashLov[f.id]={};
            }
            var hashLov = this._hashLov[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                _.each(f.list,function(obj){
                    if(obj.id==v){
                        var txt=obj.text;
                        if(obj.icon){
                            txt='<img src="'+obj.icon+'"> '+txt;
                        }
                        hashLov[v]=obj.text;
                        return obj.text;
                    }
                });
            }
        }
        return '';
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
                        return this._lovText(f,v);
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
        var collec=this.model.collection;
        if(f.type==EvoDico.fieldTypes.text || f.type==EvoDico.fieldTypes.txtm || f.type==EvoDico.fieldTypes.email){
            collec.comparator = EvoDico.bbComparatorText(f.id);
        }else{
            collec.comparator = EvoDico.bbComparator(f.id);
        }
        collec.sort();
        if(down){
            collec.models.reverse();
        }
        this.render(); //todo: renderBody
        this.$el.trigger('list.sort', {id: f.id, direction:down?'down':'up'});
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


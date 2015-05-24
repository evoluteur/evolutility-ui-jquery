/*! ***************************************************************************
 *
 * evolutility :: many.js
 *
 * View "many" for other ViewMany views to inherit from.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany = function() {

    var eUI = Evol.UI,
        eDico = Evol.Dico,
        i18n = Evol.i18n;

return Backbone.View.extend({

    viewName: 'Many',
    viewType: 'many',
    editable: false,
    cardinality: 'n',

    options: {
        style: 'panel-info',
        pageSize: 20,
        pageIndex: 0,
        autoUpdate: false,
        // router: ...
        //titleSelector: '#title',
        selectable: false,
        links: true,
        noDataString: i18n.nodata, //'No data to display.',
        iconsPath: 'pix/',
        fieldsetFilter: function (f) {
            return f.viewmany;
        }
    },

    events: {
        'click .evol-sort-icons>i': 'click_sort',
        'click .pagination>li': 'click_pagination',
        //'click .evol-field-label .glyphicon-wrench': 'click_customize',
        'change .list-sel': 'click_selection',
        'change [data-id="cbxAll"]': 'click_checkall'
    },

    initialize: function (opts) {
        var lastSort = localStorage.getItem(opts.uiModel.id + '-sort'),
            that = this;

        _.extend(this, this.options, opts);
        this.mode = this.mode || '';
        this._filter = [];
        if (this.autoUpdate && this.collection) {
            // TODO set later if not specified yet
            this.collection.on('change', function () {
                that.render();
            });
        }
        if (!this.router) {
            this.$el.on('click', '.evol-nav-id', function (evt) {
                that.click_navigate(evt);
            });
        }
        //this._custOn=false;
        if (lastSort !== null) {
            var ls = lastSort.split('-'),
                f = this.getField(ls[0]);
            if (ls.length > 1 && !_.isUndefined(f)) {
                this.sortList(f, ls[1] === 'down', true, true);
            }
        }
    },

    render: function () {
        var models = this.collection.models;
        if (this.collection.length) {
            models = eDico.filterModels(models, this._filter);
            this._render(models);
        } else {
            this.$el.html(eUI.HTMLMsg(this.noDataString, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLbody: function (fields, pSize, icon, pageIdx, selectable) {
        var h =[],
            models = this.collection.models,
            model,
            r,
            rMin = (pageIdx > 0) ? pageIdx * pSize : 0,
            rMax = _.min([models.length, rMin + pSize]),
            ico = icon ? (this.iconsPath || '') + icon : null;

        if (rMax > 0) {
            var route = this.getItemRoute();
            for (r = rMin; r < rMax; r++) {
                model = models[r];
                this.HTMLItem(h, fields, model, ico, selectable, route);
            }
        }
        return h.join('');
    },

    _render: function (models) {
        alert('_render must be overwritten');
    },

    _HTMLField: function (f, v) {
        var that=this,
            fv;
        if(f.type==='formula'){
            fv = '<div class="disabled evo-rdonly evol-ellipsis">';
            if(f.formula && this.model){
                fv+=f.formula(this.model);
            }
            fv+='</div>';
        }else{
            fv = eDico.fieldHTML_ReadOny(f, v, Evol.hashLov, this.iconsPath || '');
            if (f.type === 'list') {
                return _.escape(fv);
            }
        }
        return fv;
    },

    _HTMLCheckbox: function (cid) {
        return eUI.input.checkbox2(cid, false, 'list-sel');
    },
    /*
     customize: function () {
         var labels = this.$('th>span');
         if(this._custOn){
            labels.find('i').remove();
         }else{
            labels.append(eUI.iconCustomize('id', 'field'));
         }
         this._custOn=!this._custOn;
         return this;
     },*/

    setCollection: function (collection) {
        this.collection = collection;
        return this.render();
    },

    getCollection: function () {
        return this.collection;
    },

    setFilter: function (filter) {
        this._filter = filter;
        return this;
    },

    getFilter: function () {
        return this._filter;
    },

    setTitle: function () {
        $(this.titleSelector).html(this.getTitle());
        return this;
    },

    getTitle: function () {
        return eUI.capitalize(this.uiModel.namePlural) + ' ' + this.viewName;
    },

    getFields: function () {
        if (!this._fields) {
            this._fields = eDico.getFields(this.uiModel, this.fieldsetFilter);
            this._fieldHash = {};
            var fh = this._fieldHash;
            _.each(this._fields, function (f) {
                fh[f.id] = f;
            });
        }
        return this._fields;
    },

    getField: function (fid) {
        if (!this._fieldHash) {
            this.getFields();
        }
        return this._fieldHash[fid];
    },

    setPage: function (pageIdx) {
        var h = [],
            fields = this.getFields(),
            pSize = this.pageSize,
            collecLength = this.collection.length,
            pSummary = this.pageSummary(pageIdx, pSize, collecLength);

        this._$body().html(this._HTMLbody(fields, pSize, this.uiModel.icon, pageIdx, this.selectable));
        this.$('.evo-pagination').html(this._HTMLpaginationBody(pageIdx, pSize, collecLength));
        this.$('.evo-many-summary').html(pSummary);
        this.pageIndex = pageIdx;
        this.$el.trigger('status', pSummary);
        return this;
    },

    getPage: function () {
        return this.pageIndex;
    },

    _$Selection: function () {
        return this.$('.list-sel:checked').not('[data-id="cbxAll"]');
    },

    getSelection: function () {
        if (this.selectable) {
            return _.map(this._$Selection().toArray(), function (cbx) {
                return $(cbx).data('id');
            });
        }
        return [];
    },

    setSelection: function (sel) {
        // - param: sel = array of ids like ['1','2']
        if (this.selectable) {
            if (sel.length > 0) {
                // TODO optimize and uncheck prev checked
                var selector = [];
                _.each(sel, function (id) {
                    selector.push('[data-mid=' + id + '] .list-sel');
                });
                this.$(selector.join(',')).prop('checked', true);
            }
        }
        return this;
    },

    pageSummary: function (pIdx, pSize, cSize) {
        if (cSize === 0) {
            return '';
        } else if (cSize === 1) {
            return cSize + ' ' + this.uiModel.name;
        } else if (pSize >= cSize) {
            return cSize + ' ' + this.uiModel.namePlural;
        } else {
            var rangeBegin = (pIdx || 0) * pSize + 1, rangeEnd;
            if (pIdx < 1) {
                rangeEnd = _.min([pSize, cSize]);
            } else {
                rangeEnd = _.min([rangeBegin + pSize - 1, cSize]);
            }
            return i18n.range
                .replace('{0}', rangeBegin)
                .replace('{1}', rangeEnd)
                .replace('{2}', cSize)
                .replace('{3}', this.uiModel.namePlural);
        }
    },

    _HTMLpagination: function (pIdx, pSize, cSize) {
        if (cSize > pSize) {
            return '<ul class="evo-pagination pagination pagination-sm">'+
                this._HTMLpaginationBody(pIdx, pSize, cSize)+
                '</ul>';
        }
        return '';
    },

    _HTMLpaginationBody: function (pIdx, pSize, cSize) {
        var h='';
        if (cSize > pSize) {
            var nbPages = Math.ceil(cSize / pSize),
                pId = pIdx + 1,
                maxRange,
                bPage = function(id){
                    h+='<li'+(pId===id?' class="active"':'')+
                        ' data-id="'+id+'"><a href="javascript:void(0)">'+id+'</a></li>';
                },
                bPageRange = function(pStart, pEnd){
                    for (var i=pStart; i<=pEnd; i++) {
                        bPage(i);
                    }
                },
                bGap = function(){
                    h+='<li class="disabled"><a href="javascript:void(0)">...</a></li>';
                };
            h+='<li data-id="prev"'+
                ((pId===1)?' class="disabled"':'')+
                '><a href="javascript:void(0)">&laquo;</a></li>';
            bPage(1);
            if(pId>4 && nbPages>6){
                if(pId===5){
                    bPage(2);
                }else{
                    bGap();
                }
                maxRange=_.min([pId+2, nbPages]);
                bPageRange(_.max([2, pId-2]), maxRange);
            }else{
                maxRange=_.min([_.max([5, pId+2]), nbPages]);
                bPageRange(2, maxRange);
            }
            if(maxRange<nbPages && pId+2<nbPages){
                bGap();
                bPage(nbPages);
            }
            h+='<li data-id="next"'+
                ((nbPages > pId) ? '' : ' class="disabled"')+
                '><a href="javascript:void(0)">&raquo;</a></li>';
        }
        return h;
    },

    sortList: function (f, down, noRemember, noTrigger) {
        var collec = this.collection,
            ft = eDico.fieldTypes;
        if (!_.isUndefined(collec)) {
            var sel = this.getSelection();
            if (f.type == ft.text || f.type == ft.textml || f.type == ft.email) {
                collec.comparator = eDico.bbComparatorText(f.id);
            } else if (f.value) {
                collec.comparator = f.value;
            } else {
                collec.comparator = eDico.bbComparator(f.id);
            }
            collec.sort();
            if (down) {
                collec.models.reverse();
            }
            this.setPage(0);
            var direction = down ? 'down' : 'up';
            if (!noRemember) {
                localStorage.setItem(this.uiModel.id + '-sort', f.id + '-' + direction);
            }
            this.setSelection(sel);
            if (!noTrigger) {
                this.$el.trigger('sort.many', {id: f.id, direction: direction});
            }
        }
        return this;
    },

    getItemRoute: function () {
        var router = this.router,
            route = null;

        if (router) {
            route = '#' + this.uiModel.id + '/browse/';
        }
        return route;
    },

    click_navigate: function (evt) {
        var id = $(evt.currentTarget).closest('[data-mid]').data('mid');
        evt.type = 'navigate.many';
        this.$el.trigger(evt, {id: id});
    },

    click_sort: function (evt) {
        var target = $(evt.currentTarget),
            fid = target.parent().data('fid'),
            f = this.getField(fid),
            down = target.attr('class').indexOf('-down') > 0;
        this.sortList(f, down);
        target.addClass('evol-last-sort');
    },

    click_pagination: function (evt) {
        this.$el.trigger('paginate.many', {id: $(evt.currentTarget).closest('li').data('id')});
    },
    /*
     click_customize: function (evt) {
         var $e=$(evt.currentTarget),
             id=$e.data('id'),
             eType=$e.data('type');

         eDico.showDesigner(id, eType, $e);
         this.$el.trigger(eType+'.customize', {id: id, type:eType});
     },
     */
    click_selection: function (evt) {
        //if($(evt.currentTarget).data('id')!=='cbxAll'){
        this.$el.trigger('selection.many');
        //}
    },

    click_checkall: function (evt) {
        var isChecked = this.$('[data-id="cbxAll"]').prop('checked');
        //this.$('.list-sel:checked').not('[data-id="cbxAll"]');
        this.$('.list-sel').prop('checked', isChecked);
        this.$el.trigger('selection.many');
    }

});

}();

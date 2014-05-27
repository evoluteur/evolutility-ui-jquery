/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View many list
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',

    _render: function (models) {
        var h = [],
            opts = this.options,
            selectable = opts.selectable,
            fields = this.getFields(),
            uim = opts.uiModel,
            pSize = opts.pageSize || 50,
            link = (this.options.links!==false),
            hover;

        h.push('<div class="evol-many-list">',
            //'<div class="panel ',this.options.style,'">',
            '<table class="table table-bordered',link?' table-hover':'','"><thead><tr>');
        if(selectable){
            h.push('<th>',this._HTMLCheckbox('cbxAll'),'</th>');
        }
        for (var i=0; i<fields.length; i++) {
            this._HTMLlistHeader(h, fields[i]);
        }
        h.push('</tr></thead><tbody>');
        this._HTMLlistBody(h, fields, pSize, uim.icon, 0, selectable);
        h.push('</tbody></table>');
        // TODO uncomment & finish it
        // h.push(this.pageSummary(opts.pageIndex, pSize, models.length, uim.entity, uim.entities));
        // //this._HTMLpagination(h, 0, pSize, models.length);
        h.push('</div>');
        this.$el.html(h.join(''));
    },

    setPage: function(pageIdx){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 20;
        this._HTMLlistBody(h, fields, pSize, uim.icon, pageIdx, opts.selectable);
        this.$('.table > tbody').html(h.join(''));
        //this.options.pageIndex=pageIdx;
        this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
        return this;
    },

    _HTMLlistBody: function(h, fields, pSize, icon, pageIdx, selectable){
        var data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]),
            ico=icon?(this.options.iconsPath || '')+icon:null;

        if(pageIdx>0){
            rMin=pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], ico, selectable);
            }
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable){
        var that=this,
            v,
            opts=this.options,
            link = (opts.links!==false);
        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">',this._HTMLCheckbox(model.id),'</td>');
        }
        _.each(fields,function(f, idx){
            if(f.type===Evol.Dico.fieldTypes.color){
                v = Evol.UI.input.colorBox(f.id, model.get(f.id));
            }else{
                v = that._HTMLField(f, model.escape(f.id));
            }
            h.push('<td>',
                (idx===0)?Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link):v,
                '</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            Evol.UI.icon('chevron-up'),//'sort-by-alphabet'
            Evol.UI.icon('chevron-down'),//'sort-by-alphabet-alt'
            '</span></span></th>');
    }

});


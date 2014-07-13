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
            that = this,
            opts = this.options,
            selectable = opts.selectable,
            fields = this.getFields(),
            pSize = opts.pageSize || 50,
            link = (this.options.links!==false),
            hover;

        h.push('<div class="evol-many-list">',
            '<table class="table table-bordered', link?' table-hover':'', '"><thead><tr>');
        if(selectable){
            h.push('<th>',this._HTMLCheckbox('cbxAll'),'</th>');
        }
        _.each(fields, function(field){
            that._HTMLlistHeader(h, field);
        });
        h.push('</tr></thead><tbody>');
        this._HTMLbody(h, fields, pSize, opts.uiModel.icon, 0, selectable);
        h.push('</tbody></table>');
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', this.pageSummary(opts.pageIndex, pSize, models.length), '</div>');
        h.push('</div>');
        this.$el.html(h.join(''));
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    _HTMLbody: function(h, fields, pSize, icon, pageIdx, selectable){
        var opts = this.options,
            data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]),
            ico = icon?(opts.iconsPath || '')+icon:null;

        if(pageIdx>0){
            rMin=pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], ico, selectable, this.getRoute());
            }
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            opts = this.options,
            link = (opts.links!==false);
        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">', this._HTMLCheckbox(model.id), '</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===Evol.Dico.fieldTypes.color){
                v = Evol.UI.input.colorBox(f.id, model.escape(f.id));
            }else{
                v = that._HTMLField(f, model.escape(f.id));
            }
            if(idx===0){
                v = Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link, route?route+model.id:null);
            }
            h.push('<td>', v, '</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.labelmany || field.label,
            '<span class="evol-sort-icons" data-fid="', field.id, '">',
            Evol.UI.icon('chevron-up'),//'sort-by-alphabet'
            Evol.UI.icon('chevron-down'),//'sort-by-alphabet-alt'
            '</span></span></th>');
    }

});


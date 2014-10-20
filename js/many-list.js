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
            h.push('<th class="list-td-sel">', this._HTMLCheckbox('cbxAll'), '</th>');
        }
        _.each(fields, function(field){
            that._HTMLlistHeader(h, field);
        });
        h.push('</tr></thead><tbody>');
        this._HTMLbody(h, fields, pSize, this.uiModel.icon, 0, selectable);
        h.push('</tbody></table>');
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', this.pageSummary(opts.pageIndex, pSize, models.length), '</div>',
            '</div>');
        this.$el.html(h.join(''));
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            opts = this.options,
            link = (opts.links!==false),
            ft = Evol.Dico.fieldTypes;
        h.push('<tr data-mid="', model.id, '">');
        if(selectable){
            h.push('<td class="list-td-sel">', this._HTMLCheckbox(model.id), '</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===ft.color){
                v = Evol.UI.input.colorBox(f.id, model.escape(f.attribute || f.id));
            }else if(f.value){
                v = f.value(model);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if(idx===0){
                v = Evol.Dico.HTMLFieldLink('fv-'+f.id, f, v, icon, !link, route?route+model.id:null);
            }
            if(f.type===ft.textml){
                h.push('<td class="evol-ellipsis">', v, '</td>');
            }else{
                h.push('<td>', v, '</td>');
            }
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, f) {
        h.push('<th><span id="', f.id, '-lbl">',
            f.labellist || f.labelmany || f.label);
        if(f.sortable!==false){
            h.push('<span class="evol-sort-icons" data-fid="', f.id, '">',
                Evol.UI.icon('chevron-up'),//'sort-by-alphabet'
                Evol.UI.icon('chevron-down'),//'sort-by-alphabet-alt'
                '</span>');
        }
        h.push('</span></th>');
    }

});


/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View "many list" to display a collection as a list (table w/ sorting and paging).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',
    
    fieldsetFilter: function (f) {
        return f.viewmany || f.viewlist;
    },

    _render: function (models) {
        var h = [],
            that = this,
            fields = this.getFields(),
            pSize = this.pageSize || 50,
            link = (this.links!==false);

        h.push('<div class="evol-many-list">',
            '<table class="table table-bordered', link?' table-hover':'', '"><thead><tr>');
        if(this.selectable){
            h.push('<th class="list-td-sel">', this._HTMLCheckbox('cbxAll'), '</th>');
        }
        _.each(fields, function(field){
            that._HTMLlistHeader(h, field);
        });
        h.push('</tr></thead><tbody>');
        this._HTMLbody(h, fields, pSize, this.uiModel.icon, 0, this.selectable);
        h.push('</tbody></table>');
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', this.pageSummary(this.pageIndex, pSize, models.length), '</div>',
            '</div>');
        this.$el.html(h.join(''));
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            bf = that.uiModel.badgefield,
            link = (this.links!==false),
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
                // Item badge
                if(bf){
                    v+='<span class="badge badge-list">';
                    if(_.isFunction(bf)){
                        v+=bf(model);
                    }else if(_.isString(bf)){
                        v+=model.escape(bf);
                    }
                    v+='</span>';
                }
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


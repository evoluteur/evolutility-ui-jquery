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

Evol.ViewMany.List = Evol.View_Many.extend({

    viewName: 'list',

    events: _.extend({
        'mouseenter tbody>tr': 'enterItem',
        'mouseleave tbody>tr': 'leaveItem',
        'click .evol-sort-icons>i': 'click_sort'
    }, Evol.ViewMany.eventsMany),

    fieldsetFilter: function (f) {
        return f.inMany || f.inList;
    },

    _render: function (models) {
        var h = '',
            that = this,
            fields = this.getFields(),
            pSize = this.pageSize || 50,
            link = (this.links!==false);

        h+='<div class="evol-many-list">'+
            '<table class="table table-bordered'+(link?' table-hover':'')+'"><thead><tr>';
        if(this.selectable){
            h+='<th class="list-td-sel">'+this._HTMLCheckbox('cbxAll')+'</th>';
        }
        _.each(fields, function(field){
            h+=that._HTMLlistHeader(field);
        });
        h+='</tr></thead><tbody>'+
            this._HTMLbody(fields, pSize, this.uiModel.icon, 0, this.selectable)+
            '</tbody></table>'+
            this._HTMLpagination(0, pSize, models.length)+
            '<div class="evo-many-summary">'+this.pageSummary(this.pageIndex, pSize, models.length)+'</div>'+
            '</div>';
        this.$el.html(h);
    },

    _$body: function(){
        return this.$('.table > tbody');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            bf = that.uiModel.fnBadge,
            link = (this.links!==false),
            ft = Evol.Def.fieldTypes,
            input = Evol.UI.input;

        h.push('<tr data-mid="'+model.id+'">');
        if(selectable){
            h.push('<td class="list-td-sel">'+this._HTMLCheckbox(model.id)+'</td>');
        }
        _.each(fields, function(f, idx){
            if(f.type===ft.color){
                v = input.colorBox(f.id, model.escape(f.attribute || f.id));
            }else if(f.type===ft.formula){
                v = input.formula(null, f, model);
            }else if(f.type===ft.html){
                v = model.get(f.attribute || f.id);
                //if(v && v.length>200){
                    //v = v.subString(0,200)+'...';
                //}
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if(idx===0){
                v = Evol.Dico.fieldLink(null, f, v, icon, !link, route?route+model.id:null);
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
            var css=f.css || '';
            if(f.type===ft.email || f.type===ft.url){
                css+=' evol-ellipsis';
            }else if(f.type===ft.pix){
                css+=' evol-td-pix';
            }else if(Evol.Def.fieldIsNumber(f)){
                css+=' evol-r-align';
            }
            h.push('<td class="'+css+'">'+v+'</td>');
        });
        h.push('</tr>');
    },

    _HTMLlistHeader: function (f) {
        var h='<th><span id="'+f.id+'-lbl">'+
            (f.labelList || f.labelMany || f.label);
        if(f.sortable!==false){
            h+='<span class="evol-sort-icons" data-fid="'+f.id+'">'+
                Evol.UI.icon('chevron-up')+//'sort-by-alphabet'
                Evol.UI.icon('chevron-down')+//'sort-by-alphabet-alt'
                '</span>';
        }
        h+='</span></th>';
        return h;
    },

    click_sort: function (evt) {
        var target = $(evt.currentTarget),
            fid = target.parent().data('fid'),
            f = this.getField(fid),
            down = target.attr('class').indexOf('-down') > 0;
        this.sortList(f, down);
        //target.addClass('evol-last-sort');
    },

    enterItem: Evol.ViewMany.actionEvents.enterItem(
        Evol.ViewMany.menuOne, 
        function(e){
            return e.children().eq(0);
        },
        true
    ),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,
    
    clickAction: function(evt){
        var that=this,
            e=$(evt.currentTarget),
            aid=e.data('id'),
            tr=e.closest('tr'),
            id=tr.data('mid');

        if(aid==='edit'){
            this.$el.trigger('navigate', {id: id, view: aid});
        }else{
            this.$el.trigger('action', {
                id: aid, 
                mid: id, 
                title: e.closest('tr').find('a>span').text(),
                fnSuccess: function(escape){
                    tr.fadeOut(500, function(){
                        tr.remove();
                        that.$el.trigger('status', that.pageSummary());
                    });
                }
            });
        }
    }

});


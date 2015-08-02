/*! ***************************************************************************
 *
 * evolutility :: many-cards.js
 *
 * View "many cards" to show a collection as many cards.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.View_Many.extend({

    viewName: 'cards',

    fieldsetFilter: function (f) {
        return f.inMany || f.inCards;
    },

    _render: function (models) {
        var pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        this.$el.html('<div class="evol-many-cards"><div class="evol-cards-body">'+
            this._HTMLbody(this.getFields(), pSize, this.uiModel.icon, 0, this.selectable)+
            '</div>'+Evol.UI.html.clearer+
            this._HTMLpagination(0, pSize, models.length)+
            '<div class="evo-many-summary">'+pSummary+'</div>'+
            '</div>');
        return this;
    },

    _$body: function(){
        return this.$('.evol-cards-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route, isTooltip){
        var that = this,
            v,
            fts = Evol.Def.fieldTypes,
            link = (this.links!==false);

        if(isTooltip){
            h.push('<div class="evol-bubble-tooltip">');
        }else{
            h.push('<div class="panel '+this.style+'">');
        }
        _.each(fields, function(f, idx){
            if(f.value){
                v = f.value(model);
            }else if(f.type===fts.color) {
                v = model.escape(f.attribute || f.id);
                v = Evol.UI.input.colorBox(f.id, v, v);
            }else if(f.type==='formula'){
                v = Evol.UI.input.formula(null, f, model);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="'+model.id+'">');
                // Item badge
                var bf=that.uiModel.fnBadge;
                if(bf){
                    h.push('<span class="badge pull-right">');
                    if(_.isFunction(bf)){
                        h.push(bf(model));
                    }else if(_.isString(bf)){
                        h.push(model.escape(bf));
                    }
                    h.push('</span>');
                }
                // Item title
                h.push('<h4>'+
                    (selectable?that._HTMLCheckbox(model.id):'')+
                    Evol.Dico.HTMLFieldLink(null, f, v, icon, !link, route?route+model.id:null)+
                    '</h4></div>');
            }else{
                h.push('<div'+ (f.type==fts.email || f.type==fts.url?' class="evol-ellipsis"':'') +'><label>'+
                    (f.labelcards?f.labelcards:f.label)+':</label> '+v+'</div>');
            }
        });
        h.push('</div>');
        return this;
    }/*,

    customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    }*/

});


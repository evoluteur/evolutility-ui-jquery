/*! ***************************************************************************
 *
 * evolutility :: many-cards.js
 *
 * View many cards
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

    _render: function (models) {
        var h = [],
            pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        h.push('<div class="evol-many-cards"><div class="evol-cards-body">');
        this._HTMLbody(h, this.getFields(), pSize, this.uiModel.icon, 0, this.selectable);
        h.push('</div>', Evol.UI.html.clearer);
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', pSummary, '</div>',
            '</div>');
        this.$el.html(h.join(''));
        return this;
    },

    _$body: function(){
        return this.$('.evol-cards-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            fts = Evol.Dico.fieldTypes,
            link = (this.links!==false);

        h.push('<div class="panel ',this.style,'">');
        _.each(fields, function(f, idx){
            if(f.value){
                v = f.value(model);
            }else if(f.type===fts.color) {
                v = model.escape(f.attribute || f.id);
                v = Evol.UI.input.colorBox(f.id, v, v);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="', model.id, '">');
                // Item badge
                var bf=that.uiModel.badgefield;
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
                h.push('<h4>',
                    selectable?that._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link, route?route+model.id:null),
                    '</h4></div>');
            }else{
                h.push('<div><label>', f.labelcards?f.labelcards:f.label,':</label> ', v, '</div>');
            }
        });
        h.push('</div>');
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


/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: many-cards.js
 *
 * View "many cards" to show a collection as many cards.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * (c) 2017 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.View_Many.extend({

    viewName: 'cards',
    // TODO icon should be different than view Mini
    icon: 'th-large', // glyphicon-th-large

    events: _.extend({
        'mouseenter .evol-cards-body>div': 'enterItem',
        'mouseleave .evol-cards-body>div': 'leaveItem'
    }, Evol.ViewMany.eventsMany),

    fieldsetFilter: function (f) {
        return f.inMany || f.inCards;
    },

    _render: function (models) {
        var pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        this.$el.html('<div class="evol-many-cards"><div class="evol-cards-body">'+
            this._HTMLbody(this.getFields(), pSize, this.uiModel.icon, 0, this.selectable)+
            '</div>'+Evol.DOM.html.clearer+
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
            link = (this.links!==false),
            domInput = Evol.DOM.input;

        if(isTooltip){
            h.push('<div class="evol-bubble-tooltip">');
        }else{
            h.push('<div class="panel '+this.style+'">');
        }
        _.each(fields, function(f, idx){
            if(f.type===fts.color) {
                v = model.escape(f.attribute || f.id);
                v = domInput.colorBox(f.id, v, v);
            }else if(f.type==='formula'){
                v = domInput.formula(null, f, model);
            }else if(f.type==='image' && !isTooltip){ 
                v = '<a href="#'+route+model.id+'">'+
                    that._HTMLField(f, model.escape(f.attribute || f.id))+
                    '</a>';
            }else if(f.type===fts.json){
                v = model.get(f.attribute || f.id);
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
                h.push('<h4>'+(selectable?that._HTMLCheckbox(model.id):'')+
                    Evol.Dico.fieldLink(null, f, v, icon, !link, route?route+model.id:null)+
                    '</h4></div>');
            }else{
                var label2 = f.labelCards,
                    css2=(f.type==fts.email || f.type==fts.url?'evol-ellipsis"':'');
                if(label2===''){
                    css2 += (f.type==fts.pix?'evol-c-center"':'');
                    h.push('<div'+ (css2?' class="'+css2+'"':'') +'>'+v+'</div>');
                }else {
                    if(!label2){
                        label2 = f.labelMany || f.label;
                    }
                    h.push('<div class="'+ css2 +'"><label>'+label2+':</label> '+v+'</div>');
                }
            }
        });
        h.push('</div>');
        return this;
    },

    /* customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(Evol.DOM.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    }*/

    enterItem: Evol.ViewMany.actionEvents.enterItem(Evol.ViewMany.menuOne),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,
    
    clickAction: function(evt){
        var that = this,
            e = $(evt.currentTarget),
            aid = e.data('id'),
            id = e.parent().siblings().eq(0).data('mid'),
            p = e.closest('.panel');
        
        if(aid==='edit'){
            this.$el.trigger('navigate', {id: id, view: aid});
        }else{
            this.$el.trigger('action', {
                id: aid, 
                mid: id, 
                title: Evol.Dico.getItemTitle(p),
                skipWarning: evt.shiftKey,
                fnSuccess: function(escape){
                    p.fadeOut(500, function(){
                        p.remove();
                        that.$el.trigger('status', that.pageSummary());
                    });
                }
            });
        }
    }

});


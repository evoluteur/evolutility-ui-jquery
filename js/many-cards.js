/*! ***************************************************************************
 *
 * evolutility :: many-cards.js
 *
 * View many cards
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

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
    },

    _render: function (models) {
        var h = [];
        //if(models && models.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50,
                pSummary = this.pageSummary(0, pSize, models.length, uim.entity, uim.entities);
            h.push('<div class="evol-many-cards">');
            this.renderBody(h, this.getFields(), pSize, uim.icon, 0,opts.selectable);
            h.push(pSummary);
            //this._HTMLpagination(h,0, pSize, models.length);
            h.push('</div>');
        //}else{
        //    h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        //}
        this.$el.html(h.join(''));
        return this;
    },

    setPage: function(pageIdx){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 20;

        this.renderBody(h, fields, pSize, uim.icon, pageIdx, opts.selectable);
        this.$('.evol-many-cards').html(h.join(''));
        this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
    },

    renderBody: function (h, fields, pSize, icon, pageIdx, selectable) {
        var data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]);

        if(pageIdx>0){
            rMin=pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], icon, selectable);
            }
            h.push(Evol.UI.html.clearer);
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable){
        var link = (this.options.links!==false);
        h.push('<div class="panel ',this.options.style,'">');
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i],
                v = this._HTMLField(f, model.get(f.id));
            if (i === 0) {
                h.push('<div data-mid="', model.id, '"><h4>',
                    selectable?this._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link),
                    '</h4></div>');
            }else{
                //h.push(Evol.UI.fieldLabel(f.id,f.label));
                h.push('<div>', v, '</div>');
            }
        }
        h.push('</div>');
    }

});


/*! ***************************************************************************
 *
 * evolutility :: many-badges.js
 *
 * View many badges
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Badges = Evol.ViewMany.extend({

    viewName: 'badges',

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
            h.push('<div class="evol-many-badges">');
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
        var h = [],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 20;

        this.renderBody(h, fields, pSize, uim.icon, pageIdx, opts.selectable);
        this.$('.evol-many-badges').html(h.join(''));
        this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
    },

    renderBody: function (h, fields, pSize, icon, pageIdx, selectable) {
        var data = this.collection.models,
            r,
            rMin=0,
            rMax = _.min([data.length, rMin+pSize]),
            ico = icon?(this.options.iconsPath || '')+icon:null;

        if(pageIdx>0){
            rMin = pageIdx*pSize;
            rMax = _.min([data.length, rMin+pSize]);
        }
        if (rMax > 0) {
            for (r = rMin; r < rMax; r++) {
                this.HTMLItem(h, fields, data[r], ico, selectable);
            }
            h.push(Evol.UI.html.clearer);
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
    },

    HTMLItem: function(h, fields, model, icon, selectable){
        var that=this,
            opts = this.options,
            link = (opts.links!==false);
        h.push('<div class="panel ',this.options.style,'">');
        _.each(fields, function(f, idx){
            var v = that._HTMLField(f, model.escape(f.id));
            if (idx === 0) {
                h.push('<div data-mid="', model.id, '"><h4>',
                    selectable?that._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link),
                    '</h4></div>');
            }else{
                h.push('<div><label>',f.label,':</label> ', v, '</div>');
            }
        });
        h.push('</div>');
    }

});


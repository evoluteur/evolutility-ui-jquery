/*! ***************************************************************************
 *
 * evolutility :: many-cards.js
 *
 * View many cards
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.Cards = Evol.ViewMany.extend({

    viewName: 'cards',

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(EvoUI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    },

    _render: function (models) {
        var h = [];
        if(models && models.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50,
                pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
            h.push('<div class="evol-many-cards">');
            this._HTMLcards(h, this.getFields(), pSize, uim.icon);
            h.push(pSummary, this._paginationHTML(0, pSize, models.length),
                '</div>');
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcards: function (h, fields, pSize, icon) {
        var data = this.collection.models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r=0; r<rMax; r++) {
                h.push('<div class="panel ',this.options.style,'">');
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i],
                        cRow = data[r],
                        v = cRow.get(f.id);
                    h.push('<div data-id="', cRow.id, '">');
                    if (i === 0) {
                        h.push('<h4><a href="#" id="fg-', f.id, '" class="evol-nav-id">');
                        if (icon) {
                            h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                        }
                        h.push(this._HTMLField(f,v));
                        h.push('</a></h4>');
                    }else{
                        //h.push(EvoUI.fieldLabel(f.id,f.label));
                        h.push(this._HTMLField(f,v));
                    }
                    h.push('</div>');
                }
                h.push('</div>');
            }
            h.push(EvoUI.html.clearer);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
    }

});


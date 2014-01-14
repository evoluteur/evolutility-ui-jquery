/*! ***************************************************************************
 *
 * evolutility :: many-list.js
 *
 * View many list
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.List = Evol.ViewMany.extend({

    viewName: 'list',

    options: {
        style: 'panel-info',
        pageSize: 20,
        //title: '#title', // TODO FIX
        selectable: true
    },

    _render: function (models) {
        var h = [],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 50,
            pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
        this._models=models;
        h.push('<div class="evol-many-list">',
            //'<div class="panel ',this.options.style,'">',
            '<table class="table table-bordered table-hover"><thead>');
        for (var i=0; i<fields.length; i++) {
            this._HTMLlistHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistBody(h, fields, pSize, uim.icon);
        h.push('</tbody></table>', //</div>
            pSummary, this._paginationHTML(0, pSize, models.length),
            '</div>');
        this.$el.html(h.join(''));
    },

    renderBody: function(models){
        var h=[],
            fields = this.getFields(),
            opts = this.options,
            uim = opts.uiModel,
            pSize = opts.pageSize || 50;

        this._HTMLlistBody(h, fields, pSize, uim.icon);
        this.$('.table > tbody').html(h.join(''));
    },

    _HTMLlistBody: function(h, fields, pSize, icon){
        var data = this._models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r = 0; r < rMax; r++) {
                this._HTMLlistRow(h, fields, data[r], icon);
            }
        }
    },

    _HTMLlistRow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i=0; i<fields.length; i++) {
            var f = fields[i],
                v = model.escape(f.id);
            h.push('<td>');
            if(i===0){
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if(icon){
                    h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                }
                if(v===''){
                    v='('+model.id+')';
                }
            }
            h.push(this._HTMLField(f,v));
            if(i===0){
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _HTMLlistHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.labellist || field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icon('chevron-up'),//'sort-by-alphabet'
            EvoUI.icon('chevron-down'),//'sort-by-alphabet-alt'
            '</span></span></th>'
        );
    }

});


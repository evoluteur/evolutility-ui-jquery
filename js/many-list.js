/*! ***************************************************************************
 *
 * evol-utility : many-list.js
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

    render: function () {
        var h = [];
        if(this.model && this.model.collection && this.model.collection.length>0){
            this._render(h, this.options.mode);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        this.$el.html(h.join(''));
        return this;
    },

    _render: function (h, mode) {
        var opts = this.options,
            uim = opts.uiModel,
            models = this.model.collection.models,
            pSize = opts.pageSize || 50,
            pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
        h.push('<div class="evol-many-', mode, '">');
        this['_HTML' + mode.replace(/-/g,'_')](h, this.getFields(), pSize, uim.icon);
        if(mode!='charts'){
            h.push(pSummary,
                this._paginationHTML(0, pSize, models.length));
        }
        h.push('</div>');
    },

    _HTMLlist: function (h, fields, pSize, icon) {
        h.push('<div class="panel ',this.options.style,'">');
        h.push('<table class="table table-bordered table-hover"><thead>');
        for (var i=0; i<fields.length; i++) {
            this._renderListHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistbody(h, fields, pSize, icon);
        h.push('</tbody></table></div>');
    },

    _HTMLlistbody: function(h, fields, pSize, icon){
        var data = this.model.collection.models,
            rMax = _.min([data.length, pSize]);
        if (rMax > 0) {
            for (var r = 0; r < rMax; r++) {
                this._HTMLlistrow(h, fields, data[r], icon);
            }
        }
    },

    _HTMLlistrow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i=0; i<fields.length; i++) {
            var f = fields[i],
                v = model.escape(f.id);
            h.push('<td>');
            if (i === 0) {
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if (icon) {
                    h.push('<img class="evol-table-icon" src="pix/', icon, '">');
                }
            }
            h.push(this._HTMLField(f,v));
            if (i === 0) {
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _renderListHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icon('chevron-up'),
            EvoUI.icon('chevron-down'),
            '</span></span></th>'
        );
    }

});


/*! ***************************************************************************
 *
 * evol-utility : one-edit.js
 *
 * View one edit
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.Edit = Evol.ViewOne.extend({

    viewName: 'edit',
    prefix: 'oe',

    render: function () {
        var h = [];
        this.renderEdit(h, 'edit');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    renderEdit: function (h) {
        // EDIT and VIEW forms
        var iTab = -1,
            iPanel = -1,
            opts = this.options,
            elems = opts.uiModel.elements,
            mode = 'edit';

        h.push('<div class="evo-one-',mode,'">');
        for (var i = 0, iMax = elems.length; i < iMax; i++) {
            var p = elems[i];
            switch (p.type) {
                case 'tab':
                    if (iPanel > 0) {
                        h.push('</div>');
                        iPanel = -1;
                    }
                    if (iTab < 0) {
                        h.push(EvoUI.html.clearer);
                        this.renderTabs(h, elems);
                        h.push('<div class="tab-content">');
                    }
                    iTab++;
                    h.push('<div id="evol-tab-', i, '" class="tab-pane', (i === 1 ? ' active">' : '">'));
                    this.renderTab(h, p, mode);
                    if (iTab == iMax - 1) {
                        h.push('</div>');
                    }
                    break;
                case 'panel':
                    if (iPanel < 0) {
                        h.push('<div class="evol-pnls">');
                        iPanel = 1;
                    }
                    this.renderPanel(h, p, 'pe-' + i, mode);
                    break;
                case 'panel-list':
                    if (iPanel < 0) {
                        h.push('');
                        iPanel = 1;
                    }
                    this.renderPanelList(h, p, 'pe-' + i, mode);
                    break;
            }
        }
        if (iPanel > 0) {
            h.push('</div>');
        }
        h.push('</div>');
        this._renderButtons(h, mode);
        this._updateTitle();
    }

});

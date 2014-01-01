/*! ***************************************************************************
 *
 * evol-utility : one-mini.js
 *
 * View one mini
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.Mini = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click label > .glyphicon-question-sign': 'click_help'
        // extra evt for $(window) resize
    },

    viewName: 'mini',
    prefix: 'om',

    getFieldsCondition: function(m){
        return m.required || m.viewmany || m.viewmini;
    },

    render: function () {
        var mode = this.options.mode,
            h = [];
        this.renderEdit(h, mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    renderEdit: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            flds = this.getFields(),
            miniUIModel= {
                type: 'panel', class:'evo-mini-holder', label: EvoUI.capFirstLetter(opts.uiModel.entity), width: 100,
                elements: flds
            };
        this.renderPanel(h,miniUIModel,'evo-one-mini',mode);
        this._renderButtons(h, mode);
        this._updateTitle();
    }

});

/*! ***************************************************************************
 *
 * evolutility :: one-mini.js
 *
 * View one mini
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

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
        this._renderEdit(h, mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    },

    _renderEdit: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            flds = this.getFields(),
            miniUIModel= {
                type: 'panel', class:'evol-mini-holder', label: Evol.UI.capFirstLetter(opts.uiModel.entity), width: 100,
                elements: flds
            };
        this.renderPanel(h, miniUIModel, 'evol-one-mini', mode);
        this._renderButtons(h, mode);
    }

});

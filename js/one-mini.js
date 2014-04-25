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

    _render: function (h, mode) {
        // EDIT and VIEW forms
        var opts = this.options,
            miniUIModel= {
                type: 'panel', class:'evol-mini-holder', label: Evol.UI.capitalize(opts.uiModel.entity), width: 100,
                elements: this.getFields()
            };
        this.renderPanel(h, miniUIModel, 'evol-one-mini', mode);
        this._renderButtons(h, mode);
    }

});

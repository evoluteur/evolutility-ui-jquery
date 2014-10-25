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

Evol.ViewOne.Mini = Evol.ViewOne.Edit.extend({

    events: { // TODO same as ViewOne ?
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
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
        var miniUIModel= {
                type: 'panel',
                class:'evol-mini-holder',
                label: Evol.UI.capitalize(this.uiModel.entity),
                width: 100,
                elements: this.getFields()
            };
        this._renderPanel(h, miniUIModel, mode);
        this._renderButtons(h, mode);
    }

});

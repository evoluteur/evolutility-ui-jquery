/*! ***************************************************************************
 *
 * evolutility :: one-json.js
 *
 * View one json
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne.JSON = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    viewName: 'json',

    render: function () {
        var h = [];
        if(this.model){
            var jsonStr=JSON.stringify(this.model, null, 2);
            h.push(Evol.UI.input.textMJSON('',jsonStr,10));
        }
        this._renderButtons(h, 'json');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    },

    getData: function () {
        var jsonStr=this.$el.children('textarea').val();
        return $.parseJSON(jsonStr);
    },

    setData: function (m) {
        this.$el.children('textarea')
            .val(JSON.stringify(m, null, 2));
        return this._updateTitle();
    },

    clear: function () {
        this.$el.children('textarea').val('');
        return this;
    }

});

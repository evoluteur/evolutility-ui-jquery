/*! ***************************************************************************
 *
 * evolutility :: one-json.js
 *
 * View one json
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewOne.JSON = Evol.ViewOne.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    viewName: 'json',
    prefix: 'oj',

    render: function () {
        var h = [];
        if(this.model){
            var jsonStr=JSON.stringify(this.model.toJSON(), null, 2);
            h.push(EvoUI.inputTextMJSON('',jsonStr,10));
        }
        this._renderButtons(h, 'json');
        this.$el.html(h.join(''));
        this.setData(this.model);
        this._updateTitle();
        this.custOn=false;
        return this;
    },

    getData: function () {
        var jsonStr=this.$el.children('textarea').val();
        return $.parseJSON(jsonStr);
    },

    setData: function (m) {
        var that=this,
            prefix='#'+ that.prefix + '-';
        this.$el.children('textarea').val(JSON.stringify(m, null, 2));
        this._updateTitle();
    },

    clear: function () {
        this.$el.children('textarea').val('');
        return this;
    }

});

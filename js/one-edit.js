/*! ***************************************************************************
 *
 * evolutility :: one-edit.js
 *
 * View one edit
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne.Edit = Evol.ViewOne.extend({

    viewName: 'edit',
    prefix: 'oe',

    render: function () {
        var h = [];
        this._render(h, this.options.mode);
        this.$el.html(h.join(''));
        this.setData(this.model);
        this.custOn=false;
        return this;
    }

});

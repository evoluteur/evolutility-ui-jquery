/*! ***************************************************************************
 *
 * evolutility :: action.js
 *
 * View action
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewAction = Backbone.View.extend({

    viewType:'action',
    cardinality: 'n',
    _hashLov: {},

    options: {
        style: 'panel-info'//,
        //titleSelector: '#title'
    }

});


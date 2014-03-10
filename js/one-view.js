/*! ***************************************************************************
 *
 * evolutility :: one-view.js
 *
 * View one edit
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne.View = Evol.ViewOne.extend({

    viewName: 'view',
    prefix: 'ovw',

    initialize: function(opts){
        Evol.ViewOne.prototype.initialize.apply(this, arguments);
        this.options.mode='view';
    },

    getData: function () {
        return {};
    },

    setData: function (model) {
        if(model!==undefined && model!==null){
            var fs = this.getFields(),
                that=this,
                fTypes = Evol.Dico.fieldTypes,
                $f, fv,
                prefix='#'+ that.prefix + '-',
                subCollecs=this.getSubCollecs();
            _.each(fs, function (f) {
                $f=that.$(prefix + f.id);
                fv=model.get(f.id);
                if(model){
                    switch(f.type){
                        case fTypes.lov:
                        case fTypes.bool:
                            $f.html(Evol.Dico.HTMLField4Many(f, fv, that.hashLov));
                            break;
                        case fTypes.url:
                            $f.html(Evol.UI.link(f.id, fv, fv, f.id));
                            break;
                        case fTypes.email:
                            $f.html(Evol.UI.linkEmail(f.id, fv));
                            break;
                        case fTypes.pix:
                            $f.html((fv)?('<img src="'+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        default:
                            $f.text(Evol.Dico.HTMLField4Many(f, fv) || ' ');
                    }
                }
            });
            if(subCollecs){
                _.each(subCollecs, function (sc) {
                    var h=[];
                    that._renderPanelListBody(h, sc, fv, 'view');
                    that.$('[data-pid="'+sc.id+'"] tbody')
                        .html(h.join(''));
                });
            }
        }
        return this.setTitle();
    },

    clear: function () {
        var fs = this.getFields(),
            that=this,
            $f,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(fs, function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case 'boolean':
                    $f.prop('checked', f.defaultvalue || '');
                    break;
                default:
                    $f.html(f.defaultvalue || '');
            }
        });
        if(subCollecs){
            _.each(subCollecs, function (sc) {
                that.$('[data-pid="'+sc.id+'"] tbody')
                    .html(that._TRnodata(sc.elements.length, 'view'));
            });
        }
        return this;
    },

    _renderButtons: function (h) {
        var css=Evol.UI.getSizeCSS(this.options.size);
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons">',
            Evol.UI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'+css),
            Evol.UI.input.button('edit', Evol.i18n.Edit, 'btn-primary'+css));
        h.push('</div>');
    }

});

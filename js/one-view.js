/*! ***************************************************************************
 *
 * evolutility :: one-view.js
 *
 * View "one view" to browse one model in readonly mode.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.View = Evol.ViewOne.extend({

    viewName: 'view',
    editable: false,
    prefix: 'ovw',

    getData: function () {
        // TODO make JSON obj w/ model limited to fields in uimodel?
        return {};
    },

    setData: function (model) {
        if(!_.isUndefined(model) && model!==null){
            var that=this,
                fts = Evol.Dico.fieldTypes,
                HTMLField4Many = Evol.Dico.HTMLField4Many,
                $f, fv,
                prefix='#'+ that.prefix + '-',
                subCollecs=this.getSubCollecs(),
                iconsPath=this.iconsPath||'';
            _.each(this.getFields(), function (f) {
                $f=that.$(prefix + f.id);
                if(f.value){
                    fv=f.value(model);
                }else{
                    fv=model.get(f.attribute || f.id);
                }
                if(model){
                    switch(f.type){
                        case fts.lov:
                        case fts.bool:
                        case fts.email:
                        case fts.url:
                        case fts.html:
                            $f.html(HTMLField4Many(f, fv, Evol.hashLov, iconsPath));
                            break;
                        case fts.formula:
                            $f.html(f.formula(model));
                            break;
                        case fts.pix:
                            $f.html((fv)?('<img src="'+iconsPath+fv+'" class="img-thumbnail">'):('<p>'+Evol.i18n.nopix+'</p>'));
                            break;
                        case fts.textml:
                            if(fv){
                                $f.html(_.escape(fv).replace(/[\r\n]/g, '<br>'));
                            }else{
                                $f.html('');
                            }
                            break;
                        default:
                            $f.text(HTMLField4Many(f, fv, Evol.hashLov, iconsPath) || ' ');
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
        var that=this,
            $f,
            fts = Evol.Dico.fieldTypes,
            prefix='#'+ that.prefix + '-',
            subCollecs=this.getSubCollecs();

        this.clearMessages();
        _.each(this.getFields(), function (f) {
            $f=that.$(prefix + f.id);
            switch(f.type) {
                case fts.bool:
                    $f.prop('checked', f.defaultvalue?'checked':false);
                    break;
                case fts.pix:
                    // TODO

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
        h.push(Evol.UI.html.clearer,
            '<div class="evol-buttons panel panel-info">',
            Evol.UI.button('cancel', Evol.i18n.bCancel, 'btn-default'),
            Evol.UI.button('edit', Evol.i18n.bEdit, 'btn-primary'),
            '</div>');
    }

});

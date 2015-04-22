/*! ***************************************************************************
 *
 * evolutility :: many-bubbles.js
 *
 * View "many bubbles" to show a Bubble Chart of a collection of many models.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Bubbles = Evol.ViewMany.extend({

    viewName: 'bubbles',

    events: {
        //'click .evol-buttons>button': 'click_button',
        //'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
        'click .btn': 'changeGroup',
        'change .bubble-color': 'changeColor',
        'change .bubble-size': 'changeSize',
        'click svg>circle': 'clickCircle'
    },

    fieldsetFilter: Evol.Dico.fieldChartable,

    setupBubbles: function() {
        var that=this,
            ui=this.uiModel,
            eDico=Evol.Dico,
            models = this.collection.models;

        if(!this._bubblesInitialized){
            var flds = eDico.getFields(this.uiModel, eDico.fieldChartable);
            this.bubbles = new Evol.Bubbles({
                //selector:'.evol-bubbles-body',
                elem: this.$('.evol-bubbles-body').get(0),
                width:1200, 
                height:700, 
                fields: flds,
                colorFieldId: flds[0].id,
                groupFieldId: flds[0].id,
                sizeFieldId: null,
                uiModel: this.uiModel,
                tooltip: function(d){
                    var h=[],
                    flds=that.getFields();//(h, fields, model, icon, selectable, route, isTooltip)
                    Evol.ViewMany.Cards.prototype.HTMLItem.call(that, h, flds, new Backbone.Model(d), null, null, null, true);
                    return h.join('');
                },
                click: function(d){
                    this.$el.trigger('click.bubble', {id:d.id}); 
                }
            });
            this.bubbles.setData(_.map(models, function(m){
                return _.extend({
                    id: m.id
                }, m.attributes);
            }));

            this._bubblesInitialized=true;
        }
    },

    _render: function (models) {
        var eUI = Evol.UI,
            hOpt = eUI.input.option,
            hOptNull = eUI.html.emptyOption,
            fs2 = Evol.Dico.getFields(this.uiModel, Evol.Dico.fieldChartable),
            h = '<div class="evol-many-bubbles panel panel-info"><div class="evol-bubbles-body">'+
                '<div class="d3-tooltip" style="opacity:0;"></div>';
        //this._HTMLbody(h, this.getFields(), pSize, this.uiModel.icon, 0, this.selectable);

        h+='<div class="bubbles-opts">';
        // --- Group ---
        h+='<label>'+Evol.i18n.vizGroupBy+'</label>'+
            '<div class="btn-group" data-toggle="buttons">'+
            _.map(fs2, function(f, idx){
                return '<label class="btn btn-default'+(idx===0?' active':'')+'" id="'+f.id+'">'+
                      '<input type="radio" name="options"'+(idx===0?' checked':'')+'> '+f.label+'</label>';
                }).join('')+
            '</div>';
        // --- Color ---
        var fo=_.map(fs2, function(f, idx){
                return hOpt(f.id, f.label, idx===0);
            });
        h+='<label>'+Evol.i18n.vizColorBy+'</label><select class="form-control bubble-color">'+hOptNull + fo.join('')+'</select>';
        // --- Size ---
        fs2=_.filter(fs2, function(f){
            return Evol.Dico.isNumberType(f.type);
        });
        fo=_.map(fs2, function(f, idx){
            return hOpt(f.id, f.label);
        });
        if(fo.length){
            h+='<label>'+Evol.i18n.vizSizeBy+'</label><select class="form-control bubble-size">'+hOptNull+fo.join('')+'</select>';
        }
        //h+=Evol.UI.html.clearer;
        h+='</div></div></div>';
        this.$el.html(h);
        this.setupBubbles();
        return this;
    },

    _HTMLbody: function (h, fields, pSize, icon, pageIdx, selectable) {/*
        var models = this.collection.models,
            model,
            r,
            rMin = (pageIdx > 0) ? pageIdx * pSize : 0,
            rMax = _.min([models.length, rMin + pSize]),
            ico = icon ? (this.iconsPath || '') + icon : null;


        h.push('<div id="svg-cluster"></div>');
        */
    },

    _$body: function(){
        return this.$('.evol-bubbles-body');
    },

    setCollection: function(collec){
        this.collection = collec;
        this.bubbles.setData(_.map(collec.models, function(m){
            return _.extend({
                id: m.id
            }, m.attributes);
        }));
        return this;
    },

    changeGroup: function(evt){
        this.bubbles.changeBubblesGroup(evt.currentTarget.id);
    },

    changeColor: function(evt){
        this.bubbles.changeBubblesColor(evt.target.value);
    },

    changeSize: function(evt){
        this.bubbles.changeBubblesSize(evt.target.value);
    },

    clickCircle: function(evt){
        var id=$(evt.currentTarget).data('mid');
        window.location.href = '#'+ this.uiModel.id + '/browse/'+id;
    }

});


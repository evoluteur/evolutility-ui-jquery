/*! ***************************************************************************
 *
 * evolutility :: many-charts.js
 *
 * View many charts
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'chart',

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.options.style);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this.setTitle();
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcharts: function (h, style) {
        var that=this,
            EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.options.uiModel,
            models = this.collection.models,
            chartFields = EvoDico.getFields(uiModel, function(f){
                return (f.type==fTypes.lov || f.type==fTypes.bool || f.type==fTypes.integer);
            });

        if(chartFields && chartFields.length){
            _.each(chartFields, function(f){
                var groups = _.countBy(models, function(m) {
                    return m.get(f.id);
                });
                var groupData = groups,
                    data=[],
                    labels=[];
                for(var dataSetName in groupData) {
                    var g=groupData[dataSetName];
                    data.push(g);
                    if(dataSetName==='' || dataSetName==='null'){
                        labels.push(Evol.i18n.none+' ('+g+')');
                    }else if(f.type===fTypes.lov){
                        //var lov=[];
                        //_.each(f.list, function(item){

                        //});
                        labels.push(EvoDico.lovText(that._hashLov, f, dataSetName)+' ('+g+')');
                    }else if(f.type===fTypes.bool){
                        if(dataSetName==='true'){
                            // TODO always tread null as no?
                            labels.push(Evol.i18n.yes+' ('+g+')');
                        }else{
                            labels.push(Evol.i18n.no+' ('+g+')');
                        }
                    }else{
                        labels.push(dataSetName+' ('+g+')');
                    }
                }
                var entityName=EvoUI.capitalize(uiModel.entities);
                if(f.type===fTypes.lov){
                    h.push(EvoUI.Charts.Pie(Evol.i18n.getLabel('charts.aByB',entityName,f.label), data, labels, style));
                }else{
                    h.push(EvoUI.Charts.Bars(Evol.i18n.getLabel('charts.aB',entityName,f.label), data, labels, style));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(Evol.i18n.nochart, Evol.i18n.nochart));
        }
        h.push(EvoUI.html.clearer);
    }

});


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
        this.$el.html(h.join(''));
        return this.setTitle();
    },

    _HTMLcharts: function (h, style) {
        var that=this,
            EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            i18n = Evol.i18n,
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
                    lb,
                    labels=[];
                for(var dataSetName in groupData) {
                    var nb=groupData[dataSetName];
                    if(_.isUndefined(dataSetName)){
                        lb = i18n.na;
                    }else if(dataSetName==='' || dataSetName==='null'){
                        lb = i18n.none;
                    }else if(f.type===fTypes.lov){
                        if(f.list && f.list.length && f.list[0].icon){
                            lb = EvoDico.lovTextNoPix(f, dataSetName);
                        }else{
                            lb = EvoDico.lovText(f, dataSetName, that._hashLov);
                        }
                    }else if(f.type===fTypes.bool){
                        lb = (dataSetName==='true')?i18n.yes:i18n.no;
                    }else{
                        lb = dataSetName;
                    }
                    data.push(nb);
                    labels.push(lb+' ('+nb+')');
                }
                var entityName=EvoUI.capitalize(uiModel.entities);
                if(f.type===fTypes.lov){
                    h.push(EvoUI.Charts.Pie(i18n.getLabel('charts.aByB',entityName,f.label), data, labels, style));
                }else{
                    h.push(EvoUI.Charts.Bars(i18n.getLabel('charts.aB',entityName,f.label), data, labels, style));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(i18n.nochart, i18n.badchart));
        }
        h.push(EvoUI.html.clearer);
    }

});

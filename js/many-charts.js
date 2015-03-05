/*! ***************************************************************************
 *
 * evolutility :: many-charts.js
 *
 * View "many charts" to display a collection as a set of charts.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

// Quick and easy implementation w/ the old version of google charts
// must be re-written to use D3.js or other cool stuff

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'charts',

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        fieldsetFilter: Evol.Dico.fieldInCharts,
        autoUpdate: false
    },
/*
    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },
*/
    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.style, this.sizes);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.$el.html(h.join(''));
        return this.setTitle();
    },

    _HTMLcharts: function (h, style, sizes) {
        var EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            i18n = Evol.i18n,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.uiModel,
            models = this.collection.models,
            iconsPath = this.iconsPath || '',
            chartFields = this.getFields();

        if(chartFields && chartFields.length){
            var groups,
                lb,
                entityName=EvoUI.capitalize(uiModel.entities);
            _.each(chartFields, function(f){
                var data=[],
                    labels=[],
                    nb, dataSetName,
                    isList=f.type===fTypes.lov || f.type===fTypes.list;

                if(f.type===fTypes.bool){
                    groups = _.countBy(models, function(m) {
                        return m.get(f.id)===true;
                    });
                    for(dataSetName in groups) {
                        nb=groups[dataSetName];
                        lb = (dataSetName==='true')?i18n.yes:i18n.no;
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }else{
                    groups = _.countBy(models, function(m) {
                        return m.get(f.id);
                    });
                    for(dataSetName in groups) {
                        nb=groups[dataSetName];
                        if(dataSetName==='undefined'){
                            lb = i18n.na;
                        }else if(dataSetName==='' || dataSetName==='null'){
                            lb = i18n.none;
                        }else if(isList){
                            if(f.list && f.list.length && f.list[0].icon){
                                lb = EvoDico.lovTextNoPix(f, dataSetName);
                            }else{
                                lb = EvoDico.lovText(f, dataSetName, Evol.hashLov, iconsPath);
                            }
                        }else{
                            lb = dataSetName;
                        }
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }
                if(f.type===fTypes.lov){
                    h.push(EvoUI.Charts.Pie(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aByB', entityName, f.label), data, labels, style, sizes));
                }else{
                    h.push(EvoUI.Charts.Bars(f.labelcharts?f.labelcharts:i18n.getLabel('charts.aB', entityName, f.label), data, labels, style, sizes));
                }
            });
        }else{
            h.push(EvoUI.HTMLMsg(i18n.nochart, i18n.badchart));
        }
        h.push(EvoUI.html.clearer);
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    }

});

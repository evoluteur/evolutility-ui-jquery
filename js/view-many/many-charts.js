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

Evol.ViewMany.Charts = function() {

var EvoUI = Evol.UI,
    EvoDico = Evol.Dico,
    i18n = Evol.i18n;

return Evol.View_Many.extend({

    viewName: 'charts',

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        fieldsetFilter: Evol.Def.fieldInCharts,
        autoUpdate: false
    },

    events: {
        'click .evo-chart-config': 'changeChartType'
        //'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        this.entityName=Evol.Format.capitalize(this.uiModel.namePlural);
        if(this.collection && this.collection.length>0){
            this.$el.html('<div class="evol-many-'+this.viewName+'">'+
                this._HTMLcharts(this.style || 'panel-info', this.sizes)+
                '</div>');
        }else{
            this.$el.html(EvoUI.HTMLMsg(i18n.nodata, '', 'info'));
        }
        return this.setTitle();
    },

    _HTMLcharts: function (style, sizes) {
        var h='',
            fTypes = Evol.Def.fieldTypes,
            uiModel = this.uiModel,
            models = this.collection.models,
            iconsPath = this.iconsPath || '',
            chartFields = this.getFields(),
            chartType,
            cData={},
            entityName=this.entityName;

        if(chartFields && chartFields.length){
            var groups,
                lb;
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
                        if(dataSetName==='true'){
                            lb = f.labelTrue || i18n.yes;
                        }else{
                            lb = f.labelFalse || i18n.no;
                        }
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
                chartType = f.typeChart || (f.type===fTypes.lov ? 'pie':'bars');
                h+='<div class="evol-chart-holder panel '+style+'">'+
                    '<div class="glyphicon glyphicon-cog evo-chart-config pull-right" data-id="'+f.id+'" data-ctype="'+chartType+'"></div>'+
                    '<div class="chart-holder">';
                cData[f.id] = {
                    field: f,
                    data: data,
                    labels: labels,
                    style: style,
                    sizes: sizes
                };
                if(chartType==='pie'){
                    h+=EvoUI.Charts.Pie(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aByB', entityName, f.label), data, labels, style, sizes);
                }else if(chartType==='bars'){
                    h+=EvoUI.Charts.Bars(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aB', entityName, f.label), data, labels, style, sizes);
                }
                h+='</div><br></div>';
            });
            this._cData=cData;
        }else{
            h+=EvoUI.HTMLMsg(i18n.nochart, i18n.badchart);
        }
        h+=EvoUI.html.clearer;
        return h;
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    },

    changeChartType: function(evt){
        var el=$(evt.currentTarget),
            id=el.data('id'),
            ctype=el.data('ctype'),
            chart=EvoUI.Charts,
            oldData=this._cData[id],
            f=oldData.field,
            holder=el.parent().find('.chart-holder');
        if(ctype==='pie'){
            holder.html(chart.Bars(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aB', this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            el.data('ctype', 'bars');
        }else{
            holder.html(chart.Pie(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aByB', this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            el.data('ctype', 'pie');
        }
    }

});

}();

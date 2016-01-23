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

var dom = Evol.DOM,
    eDico = Evol.Dico,
    i18n = Evol.i18n;

return Evol.View_Many.extend({

    viewName: 'charts',
    icon: 'stats', // glyphicon-stats

    isChart: true,

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        fieldsetFilter: Evol.Def.fieldInCharts,
        autoUpdate: false
    },

    events: {
        'mouseenter .evol-many-charts>div': 'enterItem',
        'mouseleave .evol-many-charts>div': 'leaveItem',
        'click .evol-actions>i': 'clickAction'
        //'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        this.entityName=Evol.Format.capitalize(this.uiModel.namePlural);
        if(this.collection && this.collection.length>0){
            this.$el.html('<div class="evol-many-'+this.viewName+'">'+
                this._HTMLcharts(this.style || 'panel-info', this.sizes)+
                '</div>');
        }else{
            this.$el.html(dom.HTMLMsg(i18n.nodata, '', 'info'));
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
                var trData = Evol.Def.countBy(models, f, cData, iconsPath);
                var data=trData.data,
                    labels=trData.labels,
                    nb, dataSetName,
                    isList=f.type===fTypes.lov || f.type===fTypes.list;
/*
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
                                lb = eDico.lovItemTextNoPix(f, dataSetName);
                            }else{
                                lb = eDico.lovItemText(f, dataSetName, Evol.hashLov, iconsPath);
                            }
                        }else{
                            lb = dataSetName;
                        }
                        data.push(nb);
                        labels.push(lb+' ('+nb+')');
                    }
                }
                */
                chartType = f.typeChart || (f.type===fTypes.lov ? 'pie':'bars');
                h+='<div class="evol-chart-holder panel '+style+'">'+
                    '<div class="opts"></div><div class="chart-holder" data-fid="'+f.id+'" data-ctype="'+chartType+'">';
                if(chartType==='pie'){
                    h+=dom.Charts.Pie(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aByB', entityName, f.label), data, labels, style, sizes);
                }else if(chartType==='bars'){
                    h+=dom.Charts.Bars(f.labelCharts?f.labelCharts:i18n.getLabel('charts.aB', entityName, f.label), data, labels, style, sizes);
                }
                h+='</div><br></div>';
            });
            this._cData=cData;
        }else{
            h+=dom.HTMLMsg(i18n.nochart, i18n.badchart);
        }
        h+=dom.html.clearer;
        return h;
    },

    setPage: function(){
        // do nothing
        // b/c it can be invoked for all view Many
    },

    enterItem: Evol.ViewMany.actionEvents.enterItem([
        {id:'bars', type:null, icon:'stats'},
        {id:'pie',type: null, icon:'record'},
        //{id:'big',type: null, icon:'resize-full'} // resize-small
    ]),

    leaveItem: Evol.ViewMany.actionEvents.leaveItem,

    clickAction: function(evt){
        var el=$(evt.currentTarget),
            cType=el.data('id'),
            holder=el.parent().parent().find('.chart-holder'),
            oType=holder.data('ctype'),
            fid=holder.data('fid'),
            oldData=this._cData[fid],
            f=oldData.field,
            chart=dom.Charts,
            c, cl;

        if(cType!=oType){
            if(cType==='bars'){
                c='Bars';
                cl='charts.aB';
            }else{
                c='Pie';
                cl='charts.aByB';
            }
            holder.html(chart[c](f.labelCharts?f.labelCharts:i18n.getLabel(cl, this.entityName, f.label), oldData.data, oldData.labels, oldData.style, oldData.sizes));
            holder.data('ctype', cType);
        }
    }

});

}();

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

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'charts',

    options: {
        //sizes: '600x300',
        style: 'panel-info',
        autoUpdate: false
    },

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.options.style, this.options.sizes);
            h.push('</div>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this.$el.html(h.join(''));
        return this.setTitle();
    },

    _HTMLcharts: function (h, style, sizes) {
        var EvoUI = Evol.UI,
            EvoDico = Evol.Dico,
            i18n = Evol.i18n,
            fTypes = EvoDico.fieldTypes,
            uiModel = this.options.uiModel,
            models = this.collection.models,
            iconsPath = this.options.iconsPath || '',
            chartFields = EvoDico.getFields(uiModel, function(f){
                return f.viewcharts || f.type==fTypes.lov || f.type==fTypes.bool || f.type==fTypes.int;
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
                    }else if(f.type===fTypes.lov || f.type===fTypes.list){
                        if(f.list && f.list.length && f.list[0].icon){
                            lb = EvoDico.lovTextNoPix(f, dataSetName);
                        }else{
                            lb = EvoDico.lovText(f, dataSetName, Evol.hashLov, iconsPath);
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
                    h.push(EvoUI.Charts.Pie(i18n.getLabel('charts.aByB', entityName, f.labelcharts || f.label), data, labels, style, sizes));
                }else{
                    h.push(EvoUI.Charts.Bars(i18n.getLabel('charts.aB', entityName, f.labelcharts || f.label), data, labels, style, sizes));
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

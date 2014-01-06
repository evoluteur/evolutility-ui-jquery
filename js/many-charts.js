/*! ***************************************************************************
 *
 * evolutility :: many-charts.js
 *
 * View many charts
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany.Charts = Evol.ViewMany.extend({

    viewName: 'chart',

    options: {
        style: 'panel-info',
        pageSize: 20,
        title: '#title', // TODO FIX
        selectable: true
    },

    events: {
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    render: function () {
        var h = [];
        if(this.collection && this.collection.length>0){
            var opts = this.options,
                uim = opts.uiModel,
                pSize = opts.pageSize || 50;
            h.push('<div class="evol-many-', this.viewName, '">');
            this._HTMLcharts(h, this.getFields(), pSize, uim.icon);
            h.push('</div>');
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata,'','info'));
        }
        this._updateTitle();
        this.$el.html(h.join(''));
        return this;
    },

    _HTMLcharts: function (h) {
        var that=this,
            uiModel =this.options.uiModel,
            models = this.collection.models,
            chartFields = EvoDico.fields(uiModel, function(f){
                return (f.type==EvoDico.fieldTypes.lov || f.type==EvoDico.fieldTypes.bool);
            });

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
                if(EvoDico.isTypeDateOrTime(f)){
                    labels.push(that._lovText(f,dataSetName)+' ('+g+')');
                }else if(f.type==EvoDico.fieldTypes.lov){
                    labels.push(that._lovText(f,dataSetName)+' ('+g+')');
                }else{
                    labels.push(dataSetName+' ('+g+')');
                }
            }
            var entityName=EvoUI.capFirstLetter(uiModel.entities);
            if(f.type==EvoDico.fieldTypes.lov){
                h.push(EvoUI.Charts.Pie(entityName + ' by ' + f.label, data, labels));
            }else{
                h.push(EvoUI.Charts.Bars(entityName + ': ' + f.label, data, labels));
            }
        });
        h.push(EvoUI.html.clearer);
    }

});


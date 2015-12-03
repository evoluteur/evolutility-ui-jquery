/*! ***************************************************************************
 *
 * evolutility :: def.js
 *
 * Library of helpers for metamodel
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.Def = function(){

var fts = {
    text: 'text',
    textml: 'textmultiline',
    bool: 'boolean',
    int: 'integer',
    dec: 'decimal',
    money: 'money',
    date: 'date',
    datetime: 'datetime',
    time: 'time',
    lov: 'lov',
    list: 'list', // many values for one field (behave like tags - return an array of strings)
    html: 'html',
    formula:'formula', // soon to be a field attribute rather than a field type
    email: 'email',
    pix: 'image',
    //geoloc: 'geolocation',
    //doc:'document',
    url: 'url',
    color: 'color',
    hidden: 'hidden',
    json: 'json'
    //rating: 'rating',
    //widget: 'widget'
};

return {

    fieldTypes: fts,

    /*
    isViewOne: function(viewName){
        return viewName==='new' || viewName==='edit' || viewName==='browse' || viewName==='json';
    },*/
    isViewMany: function(viewName){
        return viewName==='list' || viewName==='cards' || viewName==='charts' || viewName==='bubbles'|| viewName==='sunburst';
    },
    
    isViewCollection: function(viewName){
        return viewName==='list' || viewName==='cards';
    },

    fieldInCharts: function (f) {
        return (_.isUndefined(f.inCharts) || f.inCharts) && Evol.Def.fieldChartable(f);
    },
    fieldChartable: function (f) {
        //  || f.type===fts.list
        return  f.type===fts.lov || f.type===fts.bool || f.type===fts.int || f.type===fts.money;
    },

    fieldIsNumber: function(f){
        var ft=f.type;
        return ft===fts.int || ft===fts.dec || ft===fts.money;
    },/*
    fieldIsDateOrTime: function(fType){
        return fType===fts.date || fType===fts.datetime || fType===fts.time;
    },*/

    fnSearch: function(uiModel, searchString){
        var sfn = uiModel.fnSearch;
        if(_.isFunction(sfn)){
            return function(model){
                return uiModel.fnSearch(model, searchString);
            };
        }else{
            if(_.isArray(sfn)){
                return function(model){
                    var ln=sfn.length;
                    for(var i=0;i<ln;i++){
                        var fn=sfn[i];
                        if(model.get(fn) && model.get(fn).toLowerCase().indexOf(searchString)>-1){
                            return true;
                        }
                    }
                    return false;
                };
            }else if(_.isString(sfn)){
                return function(model){
                    return model.get(fn) ? model.get(fn).toLowerCase().indexOf(searchString)>-1  : false;
                };
            }
        }
    },

    // get all "shallow" fields (no sub collections) from a UI model
    getFields: function (uiModel, fnFilter) {
        var fs = [];

        function collectFields(te) {
            if (te && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (tec) {
                    if(!tec.elements){
                        fs.push(tec);
                    }else if(tec.type!='panel-list'){
                        collectFields(tec);
                    }
                });
            } else {
                fs.push(te);
            }
        }

        collectFields(uiModel);
        if (_.isFunction(fnFilter)) {
            fs= _.filter(fs, fnFilter);
        }
        return fs;
    },

    getFieldsHash: function(fields){
        var h = {};
        _.each(fields, function(f){
            h[f.id] = f;
        });
        return h;
    },

    // get sub collections
    getSubCollecs: function(uiModel){
        var ls = {};

        function collectCollecs(te) {
            if(te.type==='panel-list'){
                ls[te.attribute]=te;
            }else if (te.type!=='panel' && te.elements && te.elements.length > 0) {
                _.each(te.elements, function (te) {
                    if(te.type==='panel-list'){
                        ls[te.attribute]=te;
                    }else if(te.type!=='panel'){
                        collectCollecs(te);
                    }
                });
            } else {
                ls[te.attribute]=te;
            }
        }

        collectCollecs(uiModel);
        return ls;
    },

    countBy: function(models, f, cData, iconsPath){
        var fTypes=Evol.Def.fieldTypes,
            i18n = Evol.i18n,
            data=[],
            labels=[],
            nb, dataSetName;

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
                if(_.isUndefined(dataSetName)){
                    lb = i18n.na;
                }else if(dataSetName==='' || dataSetName==='null'){
                    lb = i18n.none;
                }else if(f.type===fTypes.lov || f.type===fTypes.list){
                    if(f.list && f.list.length && f.list[0].icon){
                        lb = Evol.Dico.lovTextNoPix(f, dataSetName);
                    }else{
                        lb = Evol.Dico.lovText(f, dataSetName, Evol.hashLov, iconsPath);
                    }
                }else{
                    lb = dataSetName;
                }
                data.push(nb);
                labels.push(lb+' ('+nb+')');
            }
        }
        chartType = f.typeChart || (f.type===fTypes.lov ? 'pie':'bars');
        cData[f.id] = {
            field: f,
            data: data,
            labels: labels,
            //style: style,
            //sizes: sizes
        };
        return { data: data, labels: labels};
    },

    sampleDatum: function(f, idx){
        function char(idx){
            return String.fromCharCode(97 + idx)+ String.fromCharCode(98 + idx)+ String.fromCharCode(99 + idx);
        }
        switch(f.type){
            case fts.bool:
                return true;
            case fts.date:
                return '2015-0'+(idx+1)+'-'+(idx+14);
            case fts.datetime:
                return '2015-04-23T17:15';
            case fts.time:
                return '14:30';
            case fts.url:
                return 'http://www.evolutility.org';
            case fts.email:
                return 'abc@abc.com';
            case fts.int:
                if(f.min){
                    return f.min+5+(idx*2);
                }
                return idx;
            case fts.dec:
            case fts.money:
                return (idx+1)*10.2;
            case fts.lov:
                if(f.list && f.list.length){
                    if(idx<f.list.length){
                        return  f.list[idx].id;
                    }
                    return  f.list[0].id;
                }
                break;
            default:
                return char(idx);
        }
    }

};

}();

/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    // same as d3.scale.category10() 
    colors:['1f77b4','ff7f0e','2ca02c','d62728','9467bd','8c564b','e377c2','7f7f7f','bcbd22','17becf'],

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return '<div class="evol-chart-holder panel '+style+'"><label class="evol-chart-title">'+
            title+'</label><img src="'+urlPix+'"><br></div>';
    },

    Pie: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'390x200';
        var urlGoogleChart = this.URL+'?chd=t:'+data.join(',')+
        '&chco='+this.colors.join(',')+
            '&amp;chl='+labels.join('|')+
            '&amp;cht=p&amp;chds=0,20&amp;chs='+size;
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'360x200';
        //debugger;
        var maxCount = _.max(data),
            urlGoogleChart = this.URL+'?chbh=a&amp;chs='+size+'&cht=bvg&chco='+this.colors.slice(0, maxCount).join(',')+'&chds=0,'+maxCount+
                '&amp;chd=t:'+data.join('|')+
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl='+labels.join('|');
        return this._HTML(label, urlGoogleChart, style);
    }

};


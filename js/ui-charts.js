/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix, style){
        return [ //class="panel ', this.style, '
            '<div class="evol-chart-holder panel ',style,'"><label class="evol-chart-title">',
            title,'</label><img src="',urlPix,'"><br></div>'
        ].join('');
    },

    Pie: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'390x200';
        var urlGoogleChart = [this.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=',size].join('');
        return this._HTML(label, urlGoogleChart, style || 'panel-default');
    },

    Bars: function (label, data, labels, style, sizes){
        var size=sizes?sizes:'360x200';
        var maxCount = _.max(data),
            urlGoogleChart = [this.URL,'?chbh=a&amp;chs=',size,'&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
                maxCount,
                '&amp;chd=t:',
                data.join('|'),
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl=',
                labels.join('|')
            ].join('');
        return this._HTML(label, urlGoogleChart, style);
    }

};


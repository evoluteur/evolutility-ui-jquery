/*! ***************************************************************************
 *
 * evolutility :: ui-charts.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.UI.Charts = {

    URL: 'http://chart.apis.google.com/chart',

    _HTML: function(title, urlPix){
        return [ //class="panel ', this.options.style, '
            '<div class="evol-chart-holder panel panel-info"><label class="evol-chart-title">',title,
            '</label><img src="',urlPix,'"><br></div>'
        ].join('');
    },

    Pie: function (label, data, labels){
        var urlGoogleChart = [EvoUI.Charts.URL,'?chd=t:',
            data.join(','),
            '&amp;chl=',
            labels.join('|'),
            '&amp;cht=p&amp;chds=0,20&amp;chs=360x200'].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart);
    },

    Bars: function (label, data, labels){
        var maxCount = _.max(data),
            urlGoogleChart = [EvoUI.Charts.URL,'?chbh=a&amp;chs=350x200&cht=bvg&chco=3a87ad,d9edf7&chds=0,',
                maxCount,
                '&amp;chd=t:',
                data.join('|'),
                '&amp;chp=0.05&amp;chts=676767,10.5&amp;chdl=',
                labels.join('|')
            ].join('');
        return EvoUI.Charts._HTML(label, urlGoogleChart);
    }

};


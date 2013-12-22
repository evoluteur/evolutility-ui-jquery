/*! ***************************************************************************
 *
 * evol-utility : evol-view-many.js
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI,
    EvoDico = Evol.Dico;

Evol.ViewMany = Backbone.View.extend({

    cardinality: 'many',
    viewName: 'list',
    className: 'evol-v-list',

    options: {

    },

    events: {
        'click a.evol-nav-id': 'click_navigate',
        'click .evol-sort-icons > span': 'click_sort',
        'click .button.edit': 'click_pagination',
        'click .evol-field-label .glyphicon-wrench': 'click_customize'
    },

    initialize: function () {
        var that=this;
        /*
        function nameComparator(a, b) {
            return a.get('name').localeCompare(b.get('name'));
        }
        */
        this.render();
        if(this.model){
            this.model.collection.on('change', function(model){
                that.render();
            });
        }
    },
    customize: function () {
        var labels;
        if(this.options.mode=='list-grid'){
            labels = this.$el.find('h4 a.evol-nav-id');
        }else{
            labels = this.$el.find('th > span')
        }
        if(this.custOn){
            labels.find('i').remove();
            this.custOn=false;
        }else{
            labels.append(EvoUI.icons.customize('id','field'));
            this.custOn=true;
        }
        return this;
    },

    render: function () {
        var h = [];
        if(this.model){
            this.renderList(h, this.options.mode);
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata));
        }
        this.$el.html(h.join(''));
        this.custOn=false;
        return this;
    },

    setModel: function(model) {
        this.model = model;
        this.render();
    },
    updateModel: function () {
        alert('updateModel')
    },

    renderList: function (h, mode) {
        var opts = this.options,
            uim = opts.uiModel,
            models = this.model.collection.models,
            pSize = opts.pageSize || 50,
            pSummary = this._paginationSummaryHTML(0, pSize, models.length, uim.entity, uim.entities);
        h.push('<div class="evol-list evol-list-', mode, '">');
        if(mode!='charts'){
            h.push(pSummary,EvoUI.html.clearer);
        }
        this['_HTML' + mode.replace(/-/g,'_')](h, this.getFields(), pSize, uim.icon);
        if(mode!='charts'){
            h.push(pSummary,
                this._paginationHTML(0, pSize, models.length));
        }
        h.push('</div>');
    },

    getFields: function (){
        var opts=this.options;
        if(!this.fields){
            this.fields=EvoDico.fields(opts.uiModel, function(f){
                return f.searchlist;
            });
        }
        return this.fields;
    },

    _HTMLlist: function (h, fields, pSize, icon) {
        h.push('<table class="table table-bordered table-hover"><thead>'); //table-striped
        for (var i = 0; i < fields.length; i++) {
            this._renderListHeader(h, fields[i]);
        }
        h.push('</thead><tbody>');
        this._HTMLlistbody(h, fields, pSize, icon);
        h.push('</tbody></table>');
    },

    _HTMLlistbody: function(h, fields, pSize, icon){
        var data = this.model.collection.models,
            datalen = _.min([data.length, pSize]);
        if (datalen > 0) {
            for (var r = 0; r < datalen; r++) {
                this._HTMLlistrow(h, fields, data[r], icon);
            }
        }
    },

    _hashLov: {},
    _lovText:function(f,v){
        if(('list' in f) && f.list.length>0){
            if(!(f.id in this._hashLov)){
                this._hashLov[f.id]={};
            }
            var hashLov = this._hashLov[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                for(var j=0,jMax=f.list.length;j<jMax;j++){
                    var tuple=f.list[j];
                    if(tuple.id==v){
                        hashLov[v]=tuple.text;
                        return tuple.text;
                    }
                }
            }
        }
        return '';
    },

    _HTMLlistrow: function(h, fields, model, icon){
        h.push('<tr data-id="', model.cid, '">');
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i],
                v = model.get(f.id);
            h.push('<td>');
            if (i == 0) {
                h.push('<a href="javascript:void(0)" id="fv-', f.id, '" class="evol-nav-id">');
                if (icon) {
                    h.push('<img alt="" class="evol-table-icon" src="pix/', icon, '">');
                }
            }
            h.push(this._HTMLField(f,v));
            if (i == 0) {
                h.push('</a>');
            }
            h.push('</td>');
        }
        h.push('</tr>');
    },

    _HTMLlist_grid: function (h, fields, pSize, icon) {
        var data = this.model.collection.models,
            datalen = _.min([data.length, pSize]);
        if (datalen > 0) {
            for (var r = 0; r < datalen; r++) {
                h.push('<div class="panel ', this.options.style, '">');
                for (var i = 0; i < fields.length; i++) {
                    var f = fields[i],
                        cRow = data[r],
                        v = cRow.get(f.id);
                    h.push('<div data-id="', cRow.id, '">');
                    if (i == 0) {
                        h.push('<h4><a href="#" id="fg-', f.id, '" class="evol-nav-id">');
                        if (icon) {
                            h.push('<img alt="" class="evol-table-icon" src="pix/', icon, '">');
                        }
                    }
                    //if(i>0){
                    //    h.push(EvoUI.fieldLabel(f.id,f.label));
                    //}
                    h.push(this._HTMLField(f,v));
                    if (i == 0) {
                        h.push('</a></h4>');
                    }
                    h.push('</div>');
                }
                h.push('</div>');
                if (r > 99) {
                    break;
                }
            }
        }else{
            h.push(EvoUI.HTMLMsg(EvolLang.nodata));
        }
        h.push(EvoUI.html.clearer);
    },

    _HTMLField: function(f,v){
        switch(f.type){
            case EvoDico.fieldTypes.bool:
                if (v >0 || v == 'True') {
                    return EvoUI.icon('ok');
                }
                break;
            case EvoDico.fieldTypes.lov:
                if (v != '') {
                    return this._lovText(f,v);
                }
                break;
            case EvoDico.fieldTypes.date:
            case EvoDico.fieldTypes.time:
            case EvoDico.fieldTypes.datetime:
                if (v != '') {
                    var myDate=new Date(v);
                    if(_.isDate(myDate)){
                        var dv=''
                        //return myDate.toLocaleDateString("en-US");
                        if(f.type!=EvoDico.fieldTypes.time){
                            dv+=(myDate.getMonth()+1) + "/" + (myDate.getDate()+1) + "/" + myDate.getFullYear();
                        }
                        if(f.type==EvoDico.fieldTypes.datetime){
                            dv+=' ';
                        }
                        if(f.type!=EvoDico.fieldTypes.date){
                            dv+=(myDate.getMonth()+1) + "/" + (myDate.getDate()+1) + "/" + myDate.getFullYear();
                        }
                        return dv;
                    }
                }
                break;
            default:
                return v;
        }
        return '';
    },

    _HTMLcharts: function (h, fields, pSize, icon) {
        var that=this,
            uiModel =this.options.uiModel,
            model = this.model,
            models = model.collection.models,
            chartFields = EvoDico.fields(uiModel, function(f){
                return (f.type==EvoDico.fieldTypes.lov || f.type==EvoDico.fieldTypes.bool);
            });

        _.each(chartFields, function(f){
            var groups = _.countBy(models, function(model) {
                return model.get(f.id);
            });
            var groupData = groups,
                data=[],
                labels=[];
            for(var dataSetName in groupData) {
                var g=groupData[dataSetName];
                data.push(g);
                if(f.type==EvoDico.fieldTypes.lov){
                    labels.push(that._lovText(f,dataSetName)+' ('+g+')');
                }else{
                    labels.push(dataSetName+' ('+g+')');
                }
            }
            var entityName=EvoUI.capFirstLetter(uiModel.entities)
            if(f.type==EvoDico.fieldTypes.lov){
                h.push(EvoUI.Charts.Pie(entityName + ' by ' + f.label, data, labels));
            }else{
                h.push(EvoUI.Charts.Bars(entityName + ': ' + f.label, data, labels));
            }
        });
        h.push(EvoUI.html.clearer);
    },

    _renderListHeader: function (h, field) {
        h.push('<th><span id="', field.id, '-lbl">',
            field.label,
            '<span class="evol-sort-icons" data-fid="',field.id,'">',
            EvoUI.icone('up'),
            EvoUI.icone('down'),
            '</span></span></th>'
        );
    },

    _paginationSummaryHTML: function (pIdx, pSize, allCount, entity, entities) {
        var rangeBegin = pIdx * pSize + 1, rangeEnd;
        if (pIdx < 1) {
            if (allCount === 0) {
                return allCount + ' ' + entities;
            } else if (allCount === 1) {
                return allCount + ' ' + entity;
            }
            rangeEnd = _.min([pSize, allCount]);
        } else {
            rangeEnd = _.min([rangeBegin + pSize, allCount]);
        }
        return ['<p>', rangeBegin, '-', rangeEnd, ' of ', allCount, ' ', entities, '</p>'].join('')
    },

    _paginationHTML: function (pIdx, pSize, allCount) {
        var h = ['<div class="pagination"><ul>'];
        if (pIdx > 0) {
            h.push('<li data-id="prev"><a href="#">Prev</a></li>');
        }
        var iMin = pIdx * pSize + 1,
            allPages = parseInt(allCount / pSize, 10),
            iMax = (allPages > 5) ? 5 : allPages;
        for (var i = iMin; i < iMax; i++) {
            h.push('<li data-id="', i, '"><a href="#">', i, '</a></li>');
        }
        if (allCount > (pIdx + 1) * pSize) {
            h.push('<li data-id="next"><a href="#">Next</a></li>');
        }
        h.push('</ul></div>');
        return h.join('');
    },

    click_navigate: function (evt) {
        var e=$(evt.currentTarget),
            pTag=this.options.mode==='list'?'tr':'div';
        evt.type='list.navigate';
        this.$el.trigger(evt, {id: e.closest(pTag).data('id')});
    },

    click_sort: function (evt) {
        var collec =this.model.collection,
            target =$(evt.currentTarget),
            fid=target.parent().data('fid'),
            sdir=target.data('sort');
        collec.comparator = function(model) {
            return model.get(fid);
        }
        collec.sort();
        if(sdir==='down'){
            collec.models.reverse();
        }
        this.render(); //todo: renderBody
        target.addClass('evol-last-sort');
        this.$el.trigger('list.sort', {id: fid});
    },

    click_pagination: function (evt) {
        this.$el.trigger('list.paginate', {id: $(evt.currentTarget).closest('li').data('id')});
    },

    click_customize: function (evt) {
        var $e=$(evt.currentTarget),
            id=$e.data('id'),
            eType=$e.data('type');

        EvoDico.showDesigner(id, eType, $e);
        this.$el.trigger(eType+'.customize', {id: id});
    }

});


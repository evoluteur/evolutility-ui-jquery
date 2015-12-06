/*! ***************************************************************************
 *
 * evolutility :: action-import.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewAction.Import = function(){

    var eUI = Evol.UI,
        eDico = Evol.Dico,
        fts = Evol.Def.fieldTypes,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        i18nX = i18n.export,
        i18nI = i18n.import;

return Backbone.View.extend({

    viewName: 'import',
    cardinality: 'n',

    events: {
        'click button': 'click_button',
        'change #iptFormat': 'change_format',
        'click .ipt-ssample': 'toggle_sample'
    },

    options: {
        noDups:false
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        return this;
    },

    render: function(){
        this.format='csv';
        this.$el.html(this._renderHTML());
        return this;
    },

    _renderHTML: function () {
        var h = eUI.panelBegin({id: '', type: 'panel', label: this.getTitle(), width: 100}, 'evol-xpt '+this.style, false)+
            '<div class="evol-fset">'+
                '<div class="evol-fld w-100"><label class="lbl-block">'+i18nI.format+'</label>'+
                //eUI.input.text('id', 'value', {}, null)+
                eUI.input.lov('iptFormat', 'value', '', [
                        {id:'csv',text: i18nX.formatCSV},
                        {id:'json',text: i18nX.formatJSON}
                    ])+
                    '<a href="javascript:void(0);" class="ipt-ssample">CSV '+i18nI.fSample+'</a>'+
                    eUI.html.clearer+
                '</div>'+
                //'<div class="evol-fld checkbox w-38"><label>'+uiInput.checkbox('dupOk', false)+i18nI.allowDups+'</label></div>'+
                '<div class="evol-ipt-fh"><textarea class="evol-ipt-format help-block" style="resize: none;"></textarea></div>'+
                '<div class="evol-fld w-100"><label style="margin-top:10px;">'+i18nI.data+'</label>'+
                '<textarea class="evol-xpt-val form-control" id="import_data" rows="12"></textarea>'+
                '</div>'+
            '</div>'+eUI.panelEnd()+
            '<div class="panel '+this.style +' evol-buttons form-actions">'+
                eUI.button('cancel', i18n.tools.bCancel, 'btn-default')+
                eUI.button('import', i18nI.importMany.replace('{0}', this.uiModel.namePlural), 'btn btn-primary')+
            '</div>';
        return h;
    },

    importData: function(entityName, data, options){
        var M, MS,
            noDuplicates = options && options.noDuplicates;

        if(data){


            // USE this.collection or this.model.colection

            // d3.csv.parse(csv);


            if(Evol.Config.localStorage){
                var lc = new Backbone.LocalStorage('evol-'+entityName);
                M = Backbone.Model.extend({
                    localStorage: lc
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    localStorage: lc
                });
            }else{
                M = new Backbone.Model({
                    urlRoot: Evol.Config.url+entityName
                });
                Ms = Backbone.Collection.extend({
                    model: M,
                    url: Evol.Config.url+entityName/*,
                    sync : function(method, collection, options) {
                        //options.dataType = "jsonp";
                        return Backbone.sync(method, collection, options);
                    }*/
                });
            }
            var ms = new Ms(),
                goods = 0,
                bads = 0;
            // TODO: is fetch necessary to init
            ms.fetch({
                success: function(collection){
                    _.each(data, function(d){
                        if(!noDuplicates){
                            delete d.id;
                        }
                        collection.create(d, {
                            success: function(a){
                                goods++;
                            },
                            error: function(a){
                                bads++;
                            }
                        });
                    });
                },
                error: function(a,b){
                    alert('Error'+ a +b);
                }
            });
            // TODO: use promise
            //ms.sync();
            return {
                total: data.length,
                inserts: goods,
                errors: bads
            };
        }else{
            return {
                total: 0,
                inserts: 0,
                errors: 0
            };
        }
    },

    setModel: function(model){
        this.model = model;
    },

    getTitle: function(){
        //if(this.many){
            return i18n.getLabel('import.importMany', this.uiModel.namePlural);
        //}else{
        //    return i18n.getLabel('import.importOne', this.uiModel.name);
        //}
    },

    setTitle: function(){
        eDico.setViewTitle(this);
    },

    val: function (value) {
        return this.$('#import_data').val();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        if(bId==='import'){
            var data;
            if(this.format==='csv'){
                data=Papa.parse(this.val());
                var r0=data.data[0];
                var tData=[];
                _.forEach(data.data, function(r, idx){
                    var item={};
                    if(idx>0){
                        _.forEach(r, function(c, idx){
                            item[r0[idx]]=c;
                        });
                        tData.push(item);
                    }
                });
                data=tData;
            }else{
                try{
                    data = JSON.parse(this.val());
                }catch(err){
                    //todo: flag field
                    alert('Invalid JSON.');
                }
                if(!_.isArray(data)){
                    data = [data];
                }
            }
            if(data){
                this.$el.trigger('action', {id: bId, data: this.importData(this.uiModel.id, data)});
            }
        }
    },

    change_format: function (evt) {
        var bId=$(evt.currentTarget).val();
        this.format=bId;
        this.$('.evol-ipt-format').val(this.makeSample(bId));
        this.$('.ipt-ssample').html(bId.toUpperCase()+' '+i18nI.fSample);
        this.sampled=true;
    },

    makeSample: function(sFormat){
        var fs=this.getFields();
        function sampleItem(idx){
            var item={};
            _.forEach(fs, function(f){
                item[f.attribute]=Evol.Def.sampleDatum(f, idx);
            });
            return item;
        }
        var sample=[
                sampleItem(0), 
                sampleItem(1)
            ],
            h='';

        if(sFormat==='json'){
            h = JSON.stringify(sample, null, '\t');
        }else{
            var r=[];
            for (p in sample[0]){
                r.push(p);
            }
            h += r.join(',');
            _.each(sample, function(s){
                var cs=[];
                _.each(r, function(f){
                    cs.push(s[f]);
                });
                h += '\n'+cs.join(',');
            });
        }
        return h;
    },

    toggle_sample: function(evt){
        var e=$(evt.currentTarget),
            $fSample=this.$('.evol-ipt-fh');

        if(this.sampleShown){
            $fSample.css('height',0);
        }else{
            if(!this.sampled){
                this.$('.evol-ipt-format').val(this.makeSample('csv'));
            }
            this.sampled=true;
            $fSample.css('height','180px');
        }
        this.sampleShown=!this.sampleShown;
    },

    getFields: function () {
        if (!this._fields) {
            this._fields = Evol.Def.getFields(this.uiModel);
        }
        return this._fields;
    }

});

}();

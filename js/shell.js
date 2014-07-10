/*! ***************************************************************************
 *
 * evolutility :: shell.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.Shell = Backbone.View.extend({

    events: {
        //'click .evo-head-links2>li': 'click_entity'
    },

    options: {/*
        uiModelsObj: {
            todo: todo_ui,
            contact: contacts_ui,
            winecellar: winecellar_ui//, test_ui
        },*/
        elements:{
            nav: '.evo-head-links',
            nav2: '.evo-head-links2',
            content: '#evol'
        },
        pageSize:20
    },

    initialize: function (opts) {
        var that=this,
            es;

        this.options=_.extend({}, this.options, opts);
        this.options.uiModels = _.flatten(this.options.uiModelsObj);
        this._tbs={};
        es = this.options.elements;
        //this.$nav = $(es.nav);
        this.$nav2 = $(es.nav2);
        this.$content = $(es.content);
        //this.setupRouter();

        this.$nav2.on('click', 'a',function(evt){
            that.setEntity($(evt.target).data('id'));
        });/* */
    },

	render: function() {
		//this.$el.html(this._HTML());
        this.$nav2.html(this._HTMLentities(this.options.uiModels));
        //this.$content;
        return this;
	},

    setEntity: function(eName, view, id){
        var $v;
        if(!this._ents){
            this._ents={};
        }
        if(this._ents[eName]){
            this._ents[eName].show().siblings().hide();
            if(this._tbs[eName]){
                this._tbs[eName].setTitle();
            }
        }else{
            $v=$('<div data-eid="'+eName+'"></div>');
            this._ents[eName]=$v;
            this.$el.children().hide();
            this.$el.append($v);
            this.createEntity($v, this.options.uiModelsObj[eName], []);
        }
        //this._curEntity=eName;
        this.$nav2.find('>li>a').removeClass('sel')
            .filter('[data-id="'+eName+'"]').addClass('sel');
    },

    createEntity: function($v, uiModel, data){
        var lc=new Backbone.LocalStorage('evol-'+uiModel.id),
                M = Backbone.Model.extend({
                localStorage: lc
            }),
            Ms = Backbone.Collection.extend({
                model: M,
                localStorage: lc
            });

        var that=this,
            ms = new Ms();
        ms.fetch({
            success: function(collection){
                if(collection.length===0){
                    Evol.UI.insertCollection(collection, data);
                }
                var m = ms.models[0];
                that._tbs[uiModel.id] = new Evol.ViewToolbar({
                        el: $v,
                        mode: 'one',
                        model: m,
                        modelClass: M,
                        collection: ms,
                        collectionClass: Ms,
                        uiModel: uiModel,
                        pageSize: 20,
                        titleSelector: '#title'
                    }).render();//.setTitle();
            }
        });
    },

    _HTMLentities: function (es) {
        var h=[];
        _.each(es, function(e){
            h.push('<li><a href="#', e.id, '" data-id="', e.id, '">', e.id, '</a></li>');
        });
        return h.join('');
    },

    click_entity: function (evt, ui) {
        debugger;
    }

});


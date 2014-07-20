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
        useRouter: true,
        pageSize:20
    },

    initialize: function (opts) {
        this.options=_.extend({}, this.options, opts);
        this.options.uiModels = _.flatten(this.options.uiModelsObj);
        this._tbs={};
        var es = this.options.elements;
        //this.$nav = $(es.nav);
        this.$nav2 = $(es.nav2);
        //this.$content = $(es.content);
        this.setupRouter();
    },

	render: function() {
		//this.$el.html(this._HTML());
        this.$nav2.html(this._HTMLentities(this.options.uiModels));
        //this.$content;
        return this;
	},

    setupRouter: function(){
        var that=this,
            EvolRouter=Backbone.Router.extend ({
                routes: {
                    '' : 'nav',
                    ':entity/:view/:id': 'nav',
                    ':entity/:view': 'nav',
                    ':entity': 'nav',
                    '*noroute': that.noRoute
                },
                nav: function(entity, view, id){
                    if(entity){
                        that.setEntity(entity, view, id);
                    }
                }
            });

        this.router = new EvolRouter();
        Backbone.history.start();
    },

    setRoute: function(id, triggerRoute){
        var cView = this._curEntity.curView;
        if(cView){
            Evol.Dico.setRoute(this.options.router, cView.uiModel.id, cView.viewName, id, triggerRoute);
        }else{
            debugger;
            alert('TODO: debug it')
        }
        return this;
    },

    noRoute: function(route){
        alert('invalid route "'+route+'".');
    },

    setEntity: function(eName, view, options){
        var that=this;

        function cb(){
            that._ents[eName].show().siblings().hide();
            var tb=that._tbs[eName];
            if(tb){
                that._curEntity = tb;
                tb.setView(view)
                    .setTitle();
                if(options){
                    if(tb.curView.cardinality==='1'){
                        tb.setModelById(options);
                        that.setRoute(options, false);
                    }else{
                        that.setRoute('', false);
                    }
                }
            }
        }

        if(!this._ents){
            this._ents={};
        }
        if(this._ents[eName]){
            cb();
        }else{
            var $v=$('<div data-eid="'+eName+'"></div>');
            this._ents[eName]=$v;
            this.$el.children().hide();
            this.$el.append($v);
            this.createEntity($v, this.options.uiModelsObj[eName], [], view, options, cb);
        }
        if(this._curEntity!==eName){
            this.$nav2.find('>li>a').removeClass('sel')
                .filter('[data-id="'+eName+'"]').addClass('sel');
            this._curEntity=eName;
        }
        return this;
    },

    createEntity: function($v, uiModel, data, defaultView, options, cb){
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
                // TODO no more insertCollection
                // insertCollection is for demo purpose only. it will be removed.
                if(collection.length===0){
                    Evol.UI.insertCollection(collection, data);
                }
                var m = ms.models[0],
                    config = {
                        el: $v,
                        mode: 'one',
                        model: m,
                        modelClass: M,
                        collection: ms,
                        collectionClass: Ms,
                        uiModel: uiModel,
                        pageSize: 20,
                        titleSelector: '#title'
                    };

                if(defaultView){
                    config.defaultView = defaultView;
                }
                if(that.options.useRouter){
                    config.router = that.router;
                }
                var tb = new Evol.ViewToolbar(config).render();//.setTitle();
                if(options){
                    if(tb.cardinality==='1'){
                        tb.setModelById(options);
                    }
                }
                that._tbs[uiModel.id] = tb;
                if(cb){
                    cb(tb);
                }
            }
        });
    },

    _HTMLentities: function (es) {
        var h=[];
        _.each(es, function(e){
            h.push('<li><a href="#', e.id, '/list" data-id="', e.id, '">', e.entities, '</a></li>');
        });
        return h.join('');
    }

});


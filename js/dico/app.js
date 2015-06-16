/*! ***************************************************************************
 *
 * evolutility :: app.js
 *
 * View "app" to manage the single page app for all objects/ui-models.
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.App = Backbone.View.extend({

    events: {
        //'click .evo-head-links2>li': 'click_entity'
    },

    options: {
        //uiModels: [],
        elements:{
            nav: '.evo-head-links',
            nav2: '.evo-head-links2',
            content: '#evol'
        },
        style: 'panel-default',
        useRouter: true,
        pageSize:20,
        prefix: 'evol-'
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        var uims = {};
        _.forEach(this.uiModels, function(uim, idx){
            uims[uim.id||'uim'+idx] = uim;
        });
        this.uiModelsObj = uims;
        this._tbs={};
        this._ents={};
        var es = this.elements;
        //this.$nav = $(es.nav);
        this.$nav2 = $(es.nav2);
        //this.$content = $(es.content);
        this.setupRouter();
    },

	//render: function() {
		//this.$el.html(...
        //this.$nav2.html(this._HTMLentities(this.uiModels));
        //this.$content.html(...;
        //return this;
	//},

    setupRouter: function(){
        var that=this,
            EvolRouter = Backbone.Router.extend ({
                routes: {
                    '' : 'nav',
                    //':entity/:view/:id': 'nav',
                    //':entity/:view': 'nav',
                    //':entity': 'nav',
                    ':entity(/:view)(/:id)': 'nav',
                    '*noroute': that.noRoute
                },
                nav: function(entity, view, id){
                    if(entity && that.uiModelsObj[entity]){
                        that.setEntity(entity, view, id);
                    }else {
                        // TODO !!!
                        //alert('Error: Invalid route.');
                    }
                }
            });

        this.router = new EvolRouter();
        Backbone.history.start();
    },

    setRoute: function(id, triggerRoute){
        var cView = this._tbs[this._curEntity].curView;
        if(cView){
            Evol.Dico.setRoute(this.router, cView.getTitle(), cView.uiModel.id, cView.viewName, id, triggerRoute);
        }else{
            alert('Error: Invalid route.');
        }
        return this;
    },

    noRoute: function(route){
        alert('Error: Invalid route "'+route+'".');
    },

    setEntity: function(eName, view, options){
        var that=this,
            tb=this._tbs[this._curEntity],
            cbOK=function(){
                that._setEntity(eName, view, options);
            },
            cbCancel=function(){
                //TODO case w/ no/new model
                if(tb && tb.curView){ // TODO this "if" should not be necessary
                    that.setRoute(tb.curView.model.id, false);
                }
            };

        if(this._curEntity){
            if(tb){
                tb.proceedIfReady(cbOK, cbCancel);
            }else{
                //alert('Error calling proceedIfReady');
                cbCancel();
            }
        }else{
            cbOK();
        }
    },

    _setEntity: function(eName, view, options){
        var that=this;

        view = view || 'list';

        function cb(){
            that._ents[eName].show().siblings().hide();
            var tb=that._tbs[eName];
            if(tb){
                that._curEntity = eName;
                if(tb.curView.viewName !== view){
                    tb.setView(view, false, false) //tb.setView(view, true, false)
                        .setTitle();
                }
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

        if(this._ents[eName]){
            cb();
        }else{
            var $v=$('<div data-eid="'+eName+'"></div>');
            this._ents[eName]=$v;
            this.$el.children().hide();
            this.$el.append($v);
            this.createEntity($v, this.uiModelsObj[eName], [], view, options, cb);
        }
        if(this._curEntity!==eName){
            this.$nav2.find('>li>a').removeClass('sel')
                .filter('[data-id="'+eName+'"]').addClass('sel');
            this._curEntity=eName;
        }
        return this;
    },

    createEntity: function($v, uiModel, data, defaultView, options, cb){
        var that=this,
            lc = new Backbone.LocalStorage(this.prefix+uiModel.id),
            M = Backbone.Model.extend({
                localStorage: lc
            }),
            Ms = Backbone.Collection.extend({
                model: M,
                localStorage: lc
            });

        var ms = new Ms();
        ms.fetch({
            success: function(collection){
                var m = ms.at(0),
                    config = {
                        el: $v,
                        mode: 'list',
                        model: m,
                        modelClass: M,
                        collection: ms,
                        collectionClass: Ms,
                        uiModel: uiModel,
                        pageSize: that.pageSize,
                        titleSelector: '#title',
                        style: that.style
                    };

                if(defaultView){
                    config.defaultView = defaultView;
                }
                if(that.useRouter){
                    config.router = that.router;
                }
                var tb = new Evol.Toolbar(config).render();//.setTitle();
                if(options && tb.cardinality==='1'){
                    tb.setModelById(options);
                }
                if(that._tbs){
                    that._tbs[uiModel.id] = tb;
                }
                if(cb){
                    cb(tb);
                }
            },
            error: function(err){
                alert('Error: invalid route.');
            }
        });
    },

    _HTMLentities: function (es) {
        return _.map(es, function(e){
            return '<li><a href="#' + e.id + '/list" data-id="' + e.id + '">' + e.namePlural + '</a></li>';
        }).join('');
    }

});


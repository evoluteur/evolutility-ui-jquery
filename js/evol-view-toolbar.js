/*! ***************************************************************************
 *
 * evol-utility : evol-view-toolbar.js
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */


var EvolView = EvolView || {};

EvolView.Toolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate'/*,
        '.glyphicon-wrench': 'click_customize'*/
    },

    prefix: 'tbr',

    version: '0.0.1',
	
	options: {
		toolbar: true,
        cardinality: 'one',
		model: null,
		uiModel: null,
		defaultView: 'list',
        style: 'normal'
	},

	state:{},
	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    initialize: function () {
        this.render();
        $('.dropdown-toggle').dropdown();
        //this.model.on("change", function(m){that.refresh(m)});

/*

        var AppRouter = Backbone.Router.extend({
            routes: {
                "posts/:id": "getPost",
                "*actions": "defaultRoute" // Backbone will try match the route above first
            }
        });
        // Instantiate the router
        this.app_router = new AppRouter;
        this.app_router.on('route:getPost', function (id) {
            // Note the variable in the route definition being passed in here
            alert( "Get post number " + id );
        });
        this.app_router.on('route:defaultRoute', function (actions) {
            alert( actions );
        });
        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start();

*/

    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
        //this._setupToolbar();
		this.setView(this.options.defaultView || 'list');
/*
		//customize icons
		e.on('click','.glyphicon-wrench', function(evt){
			var $this=$(this),
				id=$this.data('id'),
				etype=$this.data('type');
			that.curView.showDesigner(id, etype, this);
		})
*/
	},

    _toolbarHTML: function(){
        function link(id, label, icon, card){
            if(card){
                h.push('<li data-cardinality="'+card,'">');
            }else{
                h.push('<li>');
            }
            h.push('<a href="#" data-id="',id,'">',
                htmlIcon(icon),label,'</a></li>');
        }
        function htmlIcon(icon){
            return '<span class="glyphicon glyphicon-'+icon+'" ></span> ';
        }

        function linkDropDowns(){
            h.push('<li class="dropdown">');
            h.push('<a href="#" class="dropdown-toggle" data-toggle="dropdown">',htmlIcon('th-list'),' <b class="caret"></b></a>');
            h.push('<ul class="dropdown-menu">');
            link('list','List','th-list');
            link('list-grid','Cards','th-large');
            link('charts','Chart','signal');
            //link('list-json','JSON','barcode');
            h.push('</ul>');
            h.push('</li>');
            h.push('<li class="dropdown">');
            h.push('<a href="#" class="dropdown-toggle" data-toggle="dropdown">',htmlIcon('stop'),' <b class="caret"></b></a>');
            h.push('<ul class="dropdown-menu">');
            link('edit','All fields','th');
            link('mini','Important fields','th-large'),
            link('json','JSON','barcode');
            h.push('</ul>');
            h.push('</li>');
        }

        var opts = this.options,
            h=[
                '<nav class="navbar" role="navigation">',
                '<div class="navbar-collapse navbar-ex4-collapse">',
                '<ul class="nav navbar-nav">'];
        h.push('<li><div>evol-utility</div></li>');
        h.push('</ul><ul class="nav navbar-nav navbar-right">');
        linkDropDowns();
        link('new','','plus');
        //link('selections','','star');
        link('del','','trash','1');
        //link('export','','arrow-down','n');//'cloud-download');
        //link('customize','','wrench');
        //h.push(link('search','Search','search'));
        link('prev','','chevron-left','1');
        link('next','','chevron-right','1');
        h.push('</ul></div></nav>');
        return h.join('');
    },

	updateModel:function(m){
		this.refresh();
	},

	refresh:function(){
		if(this.viewsHash.list){
			this.viewsHash.list.render();	
		}
		if(this.viewsHash.list-grid){
			this.viewsHash.list-grid.render();	
		}
	},

	setView:function(viewName){
		var mode=viewName,//.toLowerCase(),
			e=this.$el, // this.$el
            eid ='evolw-'+viewName,
			v=e.find('#'+eid),
			vw=this.curView;

        if(!e.length){
            e.append('<div id="'+eid+'"></div>');
            e=e.children().last();
        }

		if(viewName==='customize'){
			if(vw && vw.customize){
				vw.customize();
			}
		}else if(viewName==='filter'){
			//if(this.viewsHash[viewName]){
				var $ff=$('#evol-filter');
				if($ff.length===0){
					$ff=$('<div id="evol-filter" class="table table-bordered">'+
						'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
						'<div class="evol-filter-content"></div></div>');
					//this.$el.prepend($ff);
					e.prepend($ff);
					$ff.find('.evol-filter-content').advancedSearch({fields:contacts_search });

				}
				//this.viewsHash[viewName]=
			//}
		}else{
			//$('#title').html(viewName);
			e.children().not('nav').hide();
			if(v.length){
				this.curView=this.viewsHash[viewName];
				this.curViewName=viewName;
                this.curView.setModel(this.model);
                if(mode==='new'){
                    this.curView.clear();
                }
                v.show();
				this.setToolbar(viewName);
			}else{
				v=$('<div id="evolw-'+viewName+'"></div>');
				e.append(v);
             // TODO fix that one
                if(mode=='list-json'){
                    mode='json';
                }
                var config = {
                    el: v,
                    mode: mode,
                    model: this.model,
                    uiModel: this.options.uiModel
                }
				switch(mode){
					case 'new':
                    case 'edit':
                    case 'mini':
					case 'view':
                    case 'json':
                        var vw = new EvolView.Edit(config);
                        if(mode!=='json'){
                            this.cardinality='one';
                        }
                        this.setToolbar(mode);
						this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        if(mode==='new'){
                            vw.clear();
                        }
						break;/*
                    case 'export':
                        var vw = new EvolView.Export(config);
                        this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        break;*/
					case 'list-grid':
                        this.cardinality='many';
						mode='grid';
					case 'list':
                        $.extend(config,
                            {
                                fields: this.fields('list'),
                                pageSize: 50
                            });
						var vw = new EvolView.List(config);
						this.viewsHash['list']=vw;
						this.setToolbar(mode);
						break;
                    case 'charts':
                        this.cardinality='many';
                        mode='charts';
                        var vw = new EvolView.List(config);
                        this.viewsHash['charts']=vw;
                        this.setToolbar(mode);
                        break;
				}
				this.curView=vw;
				this.curViewName=viewName;
				this.viewsHash[viewName]=vw;
				this.setToolbar(mode);
			}
		}
	},

    setToolbar: function(mode){
		if(this.$el){
			var ones=this.$el.find('li[data-cardinality="1"]'), // #evol-bnew,#evol-bedit,#evol-bdelete
				manys=this.$el.find('li[data-cardinality="n"]'),
				prevNext=this.$el.find('[data-id="prev"],[data-id="next"]'),
                isSearch=mode.indexOf('search')>-1;
            if(mode=='json' || mode==='list-json' || isSearch){
                this.$el.find('a[data-id="customize"]').parent().hide();
            }else{
                this.$el.find('a[data-id="customize"]').parent().show();
            }
			if(mode==='new'){
				prevNext.hide();
			}else{
				prevNext.show();
				if(mode==='list-grid' || mode==='list' || mode==='charts'|| mode==='list-json'){
					ones.hide();
					manys.show();
                    prevNext.hide();
				}else if (isSearch){
                    ones.hide();
                    manys.hide();
                }else{
					ones.show();
					manys.hide();
				}
			}
		}
	},

	setData: function(data){
		if(this.curView){
			this.curView.setData(data);
		}
		return this;
	},

	getData: function(){
		if(this.curView){
			return this.curView.getData();
		}
		return null;
	},

	fields: function(view){ // TODO: str view should be func filter
        var ps=this.options.uiModel.elements,
            fs=[];
        function collectFields(te){
            if(te.elements && te.elements.length>0){
                _.each(te.elements, function(te){
                    collectFields(te);
                });
            }else{
                fs.push(te);
            }
        }
        collectFields(this.options.uiModel);
        if(view==='list'){
            _.filter(fs, function(f){
                return f.list==1;
            })
        }
		return fs;
	},

    click_toolbar: function(evt){
        var e=$(evt.target);
        if(e.tagName!=='A'){
            e=e.closest('a');
        }
        var viewId=e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(viewId){
            case 'del':
                alert('to do');
                //TODO confirmation prompt
                //this.model.destroy();
                //this.model=this.model.collection.models[0];
                break;
            case 'customize':
                this.curView.customize();
                break;
            case 'filter':

                break;
            case 'prev':
            case 'next':
                if(this.model){
                    var collec=this.model.collection,
                        l=collec.length-1,
                        m = this.curView.model,
                        idx =_.indexOf(collec.models, m);
                    if(viewId==='prev'){
                        idx=(idx>0)?idx-1:l;
                    }else{
                        idx=(idx<l)?idx+1:0;
                    }
                    this.model = m = collec.models[idx];
                    _.each(this.views, function(v){
                        v.setModel(m);
                    });
                }
                break;
            default:// 'new' 'edit' 'mini' 'list' 'list-grid' 'export' 'json'
                if(viewId && viewId!==''){
                    this.setView(viewId);
                }
                break;
        }
        evt.stopImmediatePropagation();
    },

    click_navigate: function(evt,ui){
        var m = this.model.collection.get(ui.id);
        this.model=m;
        this.setView('edit');
        this.curView.model=m;
        // todo: change model for all views
        this.curView.render();
        evt.stopImmediatePropagation();
    },

    click_customize: function(evt,ui){

    }

});


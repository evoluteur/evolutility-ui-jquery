/*! ***************************************************************************
 *
 * evol-utility : evol-view-toolbar.js
 *
 * Copyright (c) 2013, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    EvoUI = Evol.UI;

Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate'
    },

    prefix: 'tbr',

    version: '0.0.1',
/*
    modes: {
        'new':'new',
        'edit':'edit',
        'mini':'mini',
        'view':'view',
        'json':'json',
        'cards':'cards',
        'list':'list',
        'charts':'charts'
    }, */

	options: {
		toolbar: true,
        cardinality: 'one',
		defaultView: 'list',
        style: 'normal',
        customize:false
	},

	state:{},
	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    initialize: function (opts) {
        this.options.mode=opts.mode;
        this.options.uiModel=opts.uiModel;
        this.options.defaultView=opts.defaultView;
        this.render();
        $('.dropdown-toggle').dropdown();
        //this.model.on("change", function(m){that.refresh(m)});
    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
	},

    _toolbarHTML: function(){
        var endMenu='</ul></li>',
            menuDevider='<li role="presentation" class="divider"></li>';
        function beginMenu(icon){
            return ['<li class="dropdown">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',EvoUI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu">'].join('');
        }
        function link(id, label, icon, card){
            var h=[];
            if(card){
                h.push('<li data-cardi="'+card,'">');
            }else{
                h.push('<li>');
            }
            h.push('<a href="#" data-id="',id,'">',EvoUI.icon(icon),label,'</a></li>');
            return h.join('');
        }

        var opts = this.options,
            h=['<ul class="nav nav-pills" style="float:left;">',
                link('new','','plus'),
                link('del','','trash','1'),
                link('list','','th-list'),
                link('charts','','stats')
                //link('selections','','star'),
                //link('search','','search','n');
            ];
        //link('export','','arrow-down','n');//'cloud-download'),
        //link('customize','','wrench'),
        if(this.options && this.options.customize){
            h.push(
                beginMenu('wrench'),
                link('customize','Customize this view','wrench'),
                menuDevider,
                link('new-field','New Field','plus'),
                link('new-panel','New Panel','plus'),
                endMenu);
        }
        h.push(
            link('prev','','chevron-left','1'),
            link('next','','chevron-right','1'),
            '</ul><ul class="nav nav-pills" style="float:right;">',
            link('list','','th-list','n'),
            link('cards','','th-large','n'),
            link('edit','','th','1'),
            link('mini','','th-large','1'),
            link('json','','barcode','1'),
            '</ul>',EvoUI.html.clearer);
        return h.join('');
    },

	updateModel:function(m){
		this.refresh();
	},

	refresh:function(){
		if(this.viewsHash.list){
			this.viewsHash.list.render();	
		}
		if(this.viewsHash.cards){
			this.viewsHash.cards.render();
		}
	},

	setView:function(viewName){
		var mode=viewName,//.toLowerCase(),
			$e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView;

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
					$e.prepend($ff);
					$ff.find('.evol-filter-content').advancedSearch({fields:contacts_search });
				}
				//this.viewsHash[viewName]=
			//}
		}else{
            if(this.curView){
                this.curView.$el.hide();
            }
			if($v.length){
				this.curView=this.viewsHash[viewName];
				this.curViewName=viewName;
                this.curView.options.mode=viewName;
                this.curView.setModel(this.model);
                if(mode==='new'){
                    this.curView.clear();
                }
                $v.show();
				this.setToolbar(viewName);
			}else{
				$v=$('<div data-vid="evolw-'+viewName+'"></div>');
				$e.append($v);
             // TODO fix that one
                var config = {
                    el: $v,
                    mode: mode,
                    model: this.model,
                    uiModel: this.options.uiModel
                }
				switch(viewName){
					case 'new':
                    case 'edit':
                    case 'mini':
					case 'view':
                    case 'json':
                        vw = new Evol.ViewOne(config);
						this.viewsHash[mode]=vw;
                        this.views.push(vw);
                        if(viewName==='new'){
                            vw.clear();
                        }
						break;
                    case 'charts':
					case 'cards':
					case 'list':
						vw = new Evol.ViewMany(config);
						break;/*
                 case 'export':
                 var vw = new Evol.ViewExport(config);
                 this.viewsHash[mode]=vw;
                 this.views.push(vw);
                 break;*/
				}
				this.curView=vw;
				this.curViewName=viewName;
				this.viewsHash[viewName]=vw;
				this.setToolbar(viewName);
			}
		}
	},

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            this._toolbarButtons = {
                ones: this.$el.find('li[data-cardi="1"]'),
                manys: this.$el.find('li[data-cardi="n"]'),
                prevNext: this.$el.find('[data-id="prev"],[data-id="next"]'),
                customize: this.$el.find('a[data-id="customize"]').parent()
            }
        }
        return this._toolbarButtons;
    },

    setToolbar: function(mode){
        function onemany(showOne, showMany){
            EvoUI.setVisible(tbBs.ones, showOne);
            EvoUI.setVisible(tbBs.manys, showMany);
        }
		if(this.$el){
			var tbBs=this.getToolbarButtons(),
                isSearch=mode.indexOf('search')>-1;
            EvoUI.setVisible(tbBs.customize,mode!='json' && !isSearch);
            tbBs.prevNext.hide();
			if(mode==='new'){
                onemany(false, false);
			}else{
				if(mode==='cards' || mode==='list' || mode==='charts'){
                    onemany(false, true);
				}else if (isSearch){
                    onemany(false, false);
                }else{
                    onemany(true, false);
                    tbBs.prevNext.show();
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

    click_toolbar: function(evt){
        var $e=$(evt.target);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var viewId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(viewId){
            case 'del':
                // TODO good looking msgbox
                if (confirm('Are you sure you want to delete this record?')) {
                    var collec = this.model.collection;
                    this.model.destroy({
                        success:function(model, response){

                        },
                        error:function(err){
                            alert('error')
                        }
                    });
                    this.model=collec.models[0];
                    this.curView.setModel(collec.models[0]);
                }
                break;
            case 'customize':
                this.curView.customize();
                break;
            //case 'filter':
            //    break;
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
            case 'new-field':
            case 'new-panel':
                EvoDico.showDesigner('id', 'field', $e);
                break;
            default:// 'new' 'edit' 'mini' 'list' 'cards' 'export' 'json'
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
    }

});


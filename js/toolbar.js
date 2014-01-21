/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate',
        'click #XP': 'click_download'
    },

    options: {
        toolbar: true,
        defaultView: 'list',
        style: 'panel-info',
        display: 'tooltip', // tooltip, text, icon, none
        buttons: {
            // --- views for one ---
            edit: true,
            mini: true,
            json: true,
            // --- views for many ---
            list: true,
            cards: true,
            charts: true,
            // --- actions ---
            'new': true,
            del: true,
            filter: false,
            export: true,
            group: false,
            customize:true
        }
    },

    modesHash: {
        'edit':'Edit',
        'mini':'Mini',
        'json':'JSON',
        'cards':'Cards',
        'list':'List',
        'charts':'Charts'
    },

	views:[],
	viewsHash:{},
	curView:null,
	curViewName:'',

    _group:false,

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.render();
        //this.$('[data-toggle]').tooltip();
        this.$('.dropdown-toggle').dropdown();//[data-toggle=
    },

	render: function() {
		var e=this.$el;
        e.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
        this._viewsIcon=this.$('.glyphicon-eye-open');
	},

    _toolbarHTML: function(){
        var h=[],
            opts=this.options,
            endMenu='</ul></li>',
            menuDevider='<li role="presentation" class="divider" data-cardi="1"></li>',
            menuDeviderCard1='<li role="presentation" class="divider" data-cardi="1"></li>';

        function beginMenu(id, icon){
            return ['<li class="dropdown" data-id="',id,'">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',Evol.UI.icon(icon),' <b class="caret"></b></a>',
                '<ul class="dropdown-menu evo-dropdown-icons">'].join('');
        }

        function link2h(id, label, icon, cardi, style){
            h.push('<li data-id="',id,'"');
            if(cardi){
                h.push(' data-cardi="'+cardi,'"');
            }
            if(style!=='label'){
                h.push(' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="',label,'"');
            }
            h.push('><a href="#" data-id="',id,'">',Evol.UI.icon(icon));
            if(style!=='tooltip'){
                h.push('&nbsp;',label);
            }
            h.push('</a></li>');
        }

        function linkOpt2h (id, label, icon, cardi){
            if(opts.buttons && opts.buttons[id]){
                link2h(id, label, icon, cardi, 'tooltip');
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list',Evol.i18n.All,'th-list');
        linkOpt2h('new',Evol.i18n.New,'plus');
        linkOpt2h('del',Evol.i18n.Delete,'trash','1');
        linkOpt2h('filter','Filter','filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('export','Export','cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            link2h('prev','','chevron-left','1');
            link2h('next','','chevron-right','1');
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">');

                h.push(beginMenu('views','eye-open'));
                linkOpt2h('list','List','th-list','n');
                linkOpt2h('cards','Cards','th-large','n');
                linkOpt2h('charts','Charts','stats','n');
                linkOpt2h('edit','All Fields','th','1');
                linkOpt2h('mini','Important Fields only','th-large','1');
                linkOpt2h('json','JSON','barcode','1');
/*
                h.push(menuDeviderCard1);
                linkOpt2h('lg','Big','font','1');
                linkOpt2h('','Normal','font','1');
                linkOpt2h('sm','Small','font','1');
*/
                h.push(endMenu);

            //linkOpt2h('customize','','wrench', '1', 'Customize');
            /*
            if(opts.buttons.customize){
                h.push(beginMenu('cust','wrench'));
                link2h('customize','Customize this view','wrench');
                h.push(menuDevider);
                link2h('new-field','New Field','plus');
                link2h('new-panel','New Panel','plus');
                h.push(endMenu);
            }*/
        }
        h.push('</ul>',Evol.UI.html.clearer,'</div>');
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
        return this;
	},

	setView:function(viewName){
		var $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config;

        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this._isNew = true;
            this.curView.clear();
            this.curView.options.mode='new';
        }else{
            this._isNew = false;
            if($v.length){
                this.curView=this.viewsHash[viewName];
                if(!this.isNew){
                    if(this.curView.setModel){
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }

                }
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                $v.show()
                    .siblings().not('.evo-toolbar,.evo-filters,.clearfix').hide();
            }else{
                $v=$('<div data-vid="evolw-'+viewName+'"></div>');
                $e.children().not('.evo-toolbar,.evo-filters,.clearfix').hide();
                $e.append($v);
                // TODO fix that one
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: this.collection,
                    uiModel: this.options.uiModel,
                    style: this.options.style
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');

                switch(viewName){
                    // --- one ---
                    case 'edit':
                    case 'mini':
                    case 'json':
                        vw = new Evol.ViewOne[this.modesHash[viewName]](config).render();
                        this._prevOne=viewName;
                        break;
                    // --- many ---
                    case 'charts':
                    case 'cards':
                    case 'list':
                        vw = new Evol.ViewMany[this.modesHash[viewName]](config).render();
                        this._prevMany=viewName;
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewExport(config);
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                }
                this.curView=vw;
                this.curViewName=viewName;
                this.viewsHash[viewName]=vw;
            }
        }
        this.setButtons(viewName);
        return this;
	},

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('li');
            this._toolbarButtons = {
                ones: lis.filter('[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                prevNext: this.$('[data-id="prev"],[data-id="next"]'),
                customize: this.$('a[data-id="customize"]').parent(),
                views: this.$('[data-id="views"]')
            };
        }
        return this._toolbarButtons;
    },

    setButtons: function(mode){
        function oneMany(showOne, showMany){
            Evol.UI.setVisible(tbBs.ones, showOne);
            Evol.UI.setVisible(tbBs.manys, showMany);
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons(),
                cssOpen='glyphicon-eye-open',
                cssClose='glyphicon-eye-close';
            Evol.UI.setVisible(tbBs.customize,mode!='json');
            tbBs.prevNext.hide();
            Evol.UI.setVisible(tbBs.views, mode!=='export');
            if(this._viewsIcon){
                if(mode==='mini' || mode==='json'){
                    this._viewsIcon
                        .removeClass(cssOpen).addClass(cssClose);
                }else{
                    this._viewsIcon
                        .removeClass(cssClose).addClass(cssOpen);
                }
            }
			if(this._isNew || mode==='export'){
                oneMany(false, false);
			}else{
				if(mode==='cards' || mode==='list' || mode==='charts'){
                    this._prevMany=mode;
                    oneMany(false, true);
                }else{
                    this._prevOne=mode;
                    oneMany(true, false);
                    tbBs.prevNext.show();
				}
			}
            Evol.UI.setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='cards');
		}
	},

    showFilter: function(){
        if(!this._filters){
            var that=this,
                $ff=$(Evol.UI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
            this.$('.evo-toolbar').after($ff);
            this._filters = new Evol.ViewFilter({
                el:$ff,
                fields:Evol.Dico.fields(this.options.uiModel)
            }).render();
            $ff.on('change.filter', function(){
                that.curView.setFilter(that._filters.val())
                    .render();
            });
        }
        return this;
    },

    showGroup: function(){
        this._group = true;
        this.curView.showGroup();
        return this;
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

    browse: function(toolId){ // toolId = "prev" or "next"
        var cModel = this.curView.model;
        if(this.model && this.model.collection && this.model.collection.length){
            var collec=this.model.collection,
                l=collec.length-1,
                idx =_.indexOf(collec.models, cModel);
            if(toolId==='prev'){
                idx=(idx>0)?idx-1:l;
            }else{
                idx=(idx<l)?idx+1:0;
            }
            cModel = collec.models[idx];
        }else{
            cModel = null;
        }
        this.model = cModel;
        this.curView.setModel(cModel);
        return this;
    },

    deleteItem: function(){
        // TODO good looking msgbox
        if (confirm('Are you sure you want to delete this record?')) {
            var that=this,
                collec=this.curView.model.collection,
                delModel=this.curView.model,
                modelIdx=_.indexOf(collec.models, delModel);
            delModel.destroy({
                success:function(){
                    that.curView.setMessage('Record Deleted', 'Record was removed.', 'success');
                    if(collec.length===0){
                        that.curView.clear();
                    }else{
                        var newIdx=(modelIdx>=collec.length)?collec.length-1:modelIdx,
                            newModel = delModel.collection.at(newIdx);
                        this.model = newModel;
                        that.curView.setModel(newModel);
                    }
                },
                error:function(err){
                    alert('error');
                }
            });
        }
    },

    click_toolbar: function(evt){
        var $e=$(evt.target);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var toolId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(toolId){
            case 'del':
                this.deleteItem();
                break;
            case 'customize':
                this.curView.customize();
                break;
            case 'group':
                this.showGroup();
                break;
            case 'filter':
                this.showFilter();
                break;
            case 'prev':
            case 'next':
                this.browse(toolId);
                break;
            case 'new-field':// ui-dico
                Evol.Dico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'cards', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId);
                }
                break;
        }
        evt.stopImmediatePropagation();
        this.$el.trigger('toolbar.'+toolId);
    },

    click_navigate: function(evt,ui){
        var m = this.model.collection.get(ui.id);
        this.model=m;
        this.setView(this._prevOne || 'edit');
        this.curView.model=m;
        // todo: change model for all views / or model event
        this.curView.render();
        evt.stopImmediatePropagation();
    },

    click_download: function(evt){
        alert('Sorry, no demo server yet...');
    }

});


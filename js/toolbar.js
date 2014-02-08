/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate div': 'click_navigate',
        'click #XP': 'click_download',
        'action > div': 'action_view'
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
		var opts=this.options,
            $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config;

        var collec=this.model?this.model.collection:new opts.collectionClass();
        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this._isNew = true; // TODO model.isNew
            this.model=new opts.modelClass();
            this.model.collection=collec;
            this.newItem();
            this.curView.options.mode='new';
        }else{
            this._isNew = false;
            if($v.length){
            // -- view already exists and was rendered
                this.model=this.curView.model;
                this.curView=this.viewsHash[viewName];
                if(!this.isNew){
                    if(this.curView.setModel){
                        if(!this.curView.collection && m.collection){
                            this.curView.collection=this.model.collection;
                        }
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }
                    if(!this.model){
                        this.curView.collection=collec;
                    }
                }
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                $v.show()
                    .siblings().not('.evo-toolbar,.evo-filters,.clearfix').hide();
            }else{
            // -- create new instance of the view
                $v=$('<div data-vid="evolw-'+viewName+'"></div>');
                $e.children().not('.evo-toolbar,.evo-filters,.clearfix').hide();
                $e.append($v);
                // TODO fix that one
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: this.collection,
                    uiModel: opts.uiModel,
                    style: opts.style
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
                ones: lis.filter('li[data-cardi="1"]'),
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
			var tbBs=this.getToolbarButtons();
            Evol.UI.setVisible(tbBs.customize,mode!='json');
            tbBs.prevNext.hide();
            Evol.UI.setVisible(tbBs.views, mode!=='export');
            if(this._viewsIcon){
                var cssOpen='glyphicon-eye-open',
                    cssClose='glyphicon-eye-close';
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
                if(this._isNew){

                }
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
                fields:Evol.Dico.getFields(this.options.uiModel)
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

    saveItem: function(saveAndAdd){
        var that=this,
            vw=this.curView,
            msg=vw.validate();

        function fnSuccess(m){
            if (saveAndAdd) {
                that.newItem();
            }else{
                that.model=m;
                that._isNew=false;
                that.setButtons('edit');
                vw.setModel(m);
            }
            vw._updateTitle();
        }

        if(msg===''){
            var entityName=Evol.UI.capFirstLetter(this.options.uiModel.entity);
            if(this._isNew){
                var collec=(this.model && this.model.collection)?this.model.collection:this.collection;
                if(collec){
                    collec.create(this.getData(), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage('Record saved.', Evol.i18n.getLabel('status.added',entityName,vw.getSummary()), 'success');
                        },
                        error:function(err){
                            alert('error');
                        }
                    });
                    this.options.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO pretty
                }
            }else{
                this.model.set(this.getData());
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage('Record saved.', Evol.i18n.getLabel('status.updated',entityName,vw.getSummary()), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            this.setMessage('Invalid data.', msg, 'warning');
        }
        return this;
    },

    cancelItem: function(){

    },

    newItem: function(){
        var vw=this.curView;
        return vw.clear()
            ._updateTitle(Evol.i18n.getLabel('NewItem', this.options.uiModel.entity, vw.getSummary()));
    },

    deleteItem: function(){
        var entityName=this.options.uiModel.entity,
            entityValue=this.curView.getSummary(),
            delModel=this.curView.model;
        // TODO good looking msgbox
        if (delModel && confirm(Evol.i18n.getLabel('DeleteEntity', entityName, entityValue))) {
            var that=this,
                collec=this.collection,
                delIdx=_.indexOf(collec.models, delModel),
                newIdx=delIdx,
                newModel=null;

            if(collec.length>1){
                if(delIdx===0){
                    newIdx=1;
                }else if(delIdx<collec.length-1){
                    newIdx=delIdx+1;
                }else{
                    newIdx=delIdx-1;
                }
                newModel = collec.at(newIdx);
            }
            if(newModel){
                newModel.collection=collec;
            }
            delModel.destroy({
                success:function(){
                    if(collec.length===0){
                        that.curView.clear();
                    }else{
                        this.model = newModel;
                        that.curView.setModel(newModel);
                    }
                    that.setMessage('Record Deleted.', Evol.i18n.getLabel('status.deleted', Evol.UI.capFirstLetter(entityName), entityValue), 'success');
                },
                error:function(err){
                    alert('error');
                }
            });
        }
    },

    setMessage: function(title, content,style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            $msg.html('<strong>'+title+'</strong>'+content).show();
        }else{
            this.$el.prepend(Evol.UI.HTMLMsg(title, ' '+content, style));
        }
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        return this;
    },

    action_view: function(evt, actionId){
        if(actionId==='cancel'){

        }else{
            this.saveItem(actionId==='save-add');
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
            case 'new-field':
                Evol.Dico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'cards', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId);
                }
                break;
        }
        this.$el.trigger('toolbar.'+toolId);
    },

    click_navigate: function(evt,ui){
        var m=this.collection.get(ui.id);
        evt.stopImmediatePropagation();
        this.model=m;
        this.setView(this._prevOne || 'edit');
        this.curView.setModel(m);
        // todo: change model for all views / or model event
    },

    click_download: function(evt){
        alert('Sorry, no demo server yet...');
    }

});


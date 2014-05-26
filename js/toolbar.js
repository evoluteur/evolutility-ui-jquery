/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'list.navigate >div': 'click_navigate',
        //'list.paginate >div': 'paginate',
        'action >div': 'action_view',
        'status >div': 'status_update',
        'filter.change >div': 'change_filter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        defaultView: 'list',
        style: 'panel-info',
        display: 'label', // tooltip, text, icon, none
        titleSelector: '#title',
        buttons: {
            // --- views for one ---
            view: true,
            edit: true,
            mini: true,
            wiz: false,
            json: true,
            // --- views for many ---
            list: true,
            badges: true,
            charts: true,
            // --- actions ---
            'new': true,
            'save':true,
            del: true,
            filter: true,
            'export': true,
            group: false,
            customize:false
        },
        pageSize:20
    },

    modesHash: {
        'view':'View',
        'edit':'Edit',
        'mini':'Mini',
        'wiz':'Wizard',
        'json':'JSON',
        'badges':'Badges',
        'list':'List',
        'charts':'Charts'
    },

	views:[],
	viewsHash:{},
	curView:null,

    _group:false,

    initialize: function (opts) {
        _.extend(this.options, opts);
    },

	render: function() {
		this.$el.html(this._toolbarHTML());
		this.setView(this.options.defaultView || 'list');
        this._viewsIcon=this.$('.glyphicon-eye-open');
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
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
                link2h(id, label, icon, cardi, 'label');
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list',Evol.i18n.bAll,'th-list');
        linkOpt2h('new',Evol.i18n.bNew,'plus');
        linkOpt2h('edit',Evol.i18n.bEdit,'pencil','1');
        linkOpt2h('save',Evol.i18n.bSave,'floppy-disk','1');
        linkOpt2h('del',Evol.i18n.bDelete,'trash','1');
        linkOpt2h('filter',Evol.i18n.bFilter,'filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('charts',Evol.i18n.bCharts,'stats','n');
        linkOpt2h('export',Evol.i18n.bExport,'cloud-download','n');
        //linkOpt2h('selections','','star');
        if(opts.toolbar){
            link2h('prev','','chevron-left','x');
            link2h('next','','chevron-right','x');
            h.push('<li class="evo-tb-status" data-cardi="n"></li>');
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">');

            h.push(beginMenu('views','eye-open'));
            linkOpt2h('list','List','th-list','n');
            linkOpt2h('badges','Badges','th-large','n');
            linkOpt2h('charts','Charts','stats','n');
            linkOpt2h('view','View','file','1');
            linkOpt2h('edit','All Fields','th','1');
            linkOpt2h('mini','Mini','th-large','1'); //Important Fields only
            linkOpt2h('wiz','Wizard','arrow-right','1');
            linkOpt2h('json','JSON','barcode','1');
            // TODO
            //linkOpt2h('json','JSON','barcode','n');
/*
            h.push(menuDeviderCard1);
            linkOpt2h('lg','Big','font','1');
            linkOpt2h('','Normal','font','1');
            linkOpt2h('sm','Small','font','1');
*/
            h.push(endMenu);

            linkOpt2h('customize','','wrench', '1', 'Customize');
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
		if(this.viewsHash.badges){
			this.viewsHash.badges.render();
		}
        return this;
	},

	setView:function(viewName){
		var opts=this.options,
            $e=this.$el,
            eid ='evolw-'+viewName,
			$v=this.$('[data-vid="'+eid+'"]'),
			vw=this.curView,
            config,
            collec=this._curCollec();

        if(viewName==='new'){
            viewName=this._prevOne?this._prevOne:'edit';
            this.setView(viewName);
            this.model=new opts.modelClass();
            this.model.collection=collec;
            this.newItem();
            this.curView.options.mode='new';
        }else{
            if($v.length){
            // -- view already exists and was rendered
                //if(this.curView.model){
                //TODO debug
                    this.model=this.curView.model;
                //}
                this.model.collection=collec;
                this.curView=this.viewsHash[viewName];
                if(this.curView.setCollection){
                    this.curView.setCollection(collec);
                }
                if(this.model && !this.model.isNew()){
                    if(this.curView.setModel){
                        if(!this.curView.collection && m.collection){
                            this.curView.collection=this.model.collection;
                        }
                        this.curView.setModel(this.model);
                    }else{
                        this.curView.model = this.model;
                    }
                    if(this.curView.setTitle){
                        this.curView.setTitle();
                    }
                    if(this.curView.cardinality==='n' && this.curView.setPage){
                        this.curView.setPage(this.options.pageIndex);
                    }
                }else if(this.curView.clear){
                    this.curView.clear();
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
                config = {
                    el: $v,
                    mode: viewName,
                    model: this.model,
                    collection: collec,
                    uiModel: opts.uiModel,
                    style: opts.style,
                    pageSize: opts.pageSize || 20,
                    pageIndex: opts.pageIndex || 0,
                    titleSelector: opts.titleSelector
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                switch(viewName){
                    // --- one ---
                    case 'view':
                    case 'edit':
                    case 'mini':
                    case 'json':
                    case 'wiz':
                        vw = new Evol.ViewOne[this.modesHash[viewName]](config)
                            .render();
                        this._prevOne=viewName;
                        break;
                    // --- many ---
                    case 'charts':
                    case 'badges':
                    case 'list':
                        vw = new Evol.ViewMany[this.modesHash[viewName]](config)
                        //vw = new Evol.ViewMany.JSON(config)
                            .render();
                        this._prevMany=viewName;
                        vw.setTitle();
                        if(viewName!='charts' && this.options.pageIndex > 0){
                            vw.setPage(this.options.pageIndex || 0);
                        }
                        //this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length ,uim.entity, uim.entities));
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewAction.Export(config);
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                }
                this.curView=vw;
                this.viewsHash[viewName]=vw;
                $(this.options.titleSelector).html(this.curView.getTitle());
            }
        }
        if(this.curView.cardinality==='n'){ // TODO do not always change flag
            this.showFilter(false);
        }else{
            if(this.curView.viewName==='wizard'){
                this.curView.stepIndex(0);
            }
            this.hideFilter();
        }
        this.setIcons(viewName);
        return this;
	},

    getView:function(){
        return this.curView;
    },

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('.evo-toolbar li');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: this.$('.evo-toolbar [data-id="prev"],.evo-toolbar [data-id="next"]'),
                customize: this.$('.evo-toolbar a[data-id="customize"]').parent(),
                views: this.$('.evo-toolbar [data-id="views"]')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var setVisible=Evol.UI.setVisible;
        function oneMany(showOne, showMany){
            setVisible(tbBs.ones, showOne);
            setVisible(tbBs.manys, showMany);
        }

		if(this.$el){
			var tbBs=this.getToolbarButtons();
            setVisible(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();
            setVisible(tbBs.views, mode!=='export');
            tbBs.del.hide();
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
			if((this.model && this.model.isNew()) || mode==='export'){
                oneMany(false, false);
                if(this.model.isNew()){
                    $('.evo-dropdown-icons>li[data-cardi="1"]').show();
                }
			}else{
				if(mode==='badges' || mode==='list' || mode==='charts'){
                    this._prevMany=mode;
                    oneMany(false, true);
                    if(mode==='charts'){
                        this.setStatus('');
                    }else if(this.collection.length > this.options.pageSize){
                        tbBs.prevNext.show();
                    }
                }else{
                    this._prevOne=mode;
                    oneMany(true, false);
                    tbBs.prevNext.show();
                    setVisible(tbBs.save, mode!=='view');
                    setVisible(tbBs.edit, mode==='view');
				}
			}
            setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='badges');
		}
	},

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(Evol.UI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
                this.$('.evo-toolbar').after($ff);
                this._filters = new Evol.ViewAction.Filter({
                    el: $ff,
                    fields: Evol.Dico.getFields(this.options.uiModel)
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val())
                        .render();
                });
            }else{
                return this;
            }
        }else{
            this._filters.$el.show();
        }
        return this;
    },

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide();
        }
        return this;
    },

    toggleFilter: function(){
        this._filtersOn=!this._filtersOn;
        return this._filtersOn?this.showFilter(true):this.hideFilter();
    },

    /*
    showGroup: function(){
        this._group = true;
        this.curView.showGroup();
        return this;
    },*/

    setStatus: function(msg){
        var $e=this.$('.evo-toolbar .evo-tb-status');
        $e.html(msg);
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

    browse: function(direction){ // direction = "prev" or "next"
        var collec=this._curCollec(),
            cModel=this.curView.model;
        if(cModel && collec && collec.length){
            var l=collec.length-1,
                idx =_.indexOf(collec.models, cModel);
            if(direction==='prev'){
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
        this.clearMessage();
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
                if(that._filteredCollection){
                    that._filteredCollection.add(m);
                }
                that.setIcons('edit');
                vw.setModel(m);
            }
            vw.setTitle();
        }

        if(msg===''){
            var entityName=this.options.uiModel.entity;
            if(this.model.isNew()){
                var collec=this.collection;
                if(collec){
                    collec.create(this.getData(), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage(Evol.i18n.saved, Evol.i18n.getLabel('status.added',entityName, _.escape(vw.getTitle())), 'success');
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
                // TODO fix bug w/ insert when filter applied => dup record
                this.model.set(this.getData());
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage(Evol.i18n.saved, Evol.i18n.getLabel('status.updated', Evol.UI.capitalize(entityName),_.escape(vw.getTitle())), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            this.setMessage(Evol.i18n.validation.incomplete, msg, 'warning');
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName=='view'){
            if(this._prevOne!=='view'){
                this.setView(this._prevOne);
            }else{
                this.setView('edit');
            }
        }
        return this.curView.clear()
            .setTitle(Evol.i18n.getLabel('NewEntity', this.options.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var i18n=Evol.i18n,
            entityName=this.options.uiModel.entity,
            entityValue=this.curView.getTitle();

        if(this.curView.cardinality==='1'){
            var delModel=this.curView.model;
            // TODO good looking msgbox
            if (delModel && confirm(i18n.getLabel('DeleteEntity', entityName, entityValue))) {
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
                        that.setMessage('Record Deleted.', i18n.getLabel('status.deleted', Evol.UI.capitalize(entityName), entityValue), 'success');
                    },
                    error:function(err){
                        alert('error');
                    }
                });
            }
        }else{
            if(this.curView.getSelection){
                var selection=this.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('DeleteEntities', selection.length, this.options.uiModel.entities))) {
                        //TODO

                    }
                }
            }
        }
    },

    setMessage: function(title, content, style){
        var $msg=this.$('[data-id="msg"]');
        if($msg.length){
            $msg.attr('class', 'evo-msg alert alert-'+style+' alert-dismissable');
            $msg.find('>strong').text(title);
            $msg.find('>span').html(content); //TODO text?
            $msg.show();
        }else{
            $(Evol.UI.HTMLMsg(title, ' '+content, style)).insertAfter(this.$el.children()[0]);
        }
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        return this;
    },

    showMessage: function(evt, ui){
        if(ui){
            return this.setMessage(ui.title, ui.content, ui.style);
        }else{
            return this.clearMessage();
        }
    },

    action_view: function(evt, actionId){
        switch(actionId){
            case 'cancel':
                if(this.curView.cardinality==='1' && !this.model.isNew){
                    this.setView(this._prevOne || 'view');
                }else{
                    this.setView(this._prevMany || 'list');
                }
                break;
            case 'edit':
                this.setView(actionId);
                break;
            case 'export':
                alert('Sorry, no demo server yet...');
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
                break;
        }
    },

    paginate: function(bId, ui){
        if(ui){//TODO no need? event?
            bId=ui;
        }
        var pIdx=this.options.pageIndex || 0;
        if(bId==='prev'){
            pIdx=(pIdx>0)?pIdx-1:0;
        }else if(bId==='next'){
            if((pIdx+1)*(this.options.pageSize||20)<this.collection.length){
                pIdx++;
            }
        }else{
            var bIdx=parseInt(bId,10);
            if(bIdx>0){
                pIdx=bIdx;
            }
        }
        this.options.pageIndex=pIdx;
        if(this.curView.setPage){
            this.curView.setPage(pIdx);
        }
    },

    status_update: function(evt, ui){
        this.setStatus(ui);
    },

    _curCollec: function(){
        if (this._filteredCollection){
            return this._filteredCollection;
        }else{
            if(this.collection){
                return this.collection;
            }else{
                return this.model?this.model.collection:new this.options.collectionClass();
            }
        }
    },

    click_toolbar: function(evt, ui){
        var $e=$(evt.currentTarget);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var toolId=$e.data('id');
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(toolId){
            case 'save':
                this.saveItem(false);
                break;
            case 'del':
                this.deleteItem();
                break;
            case 'customize':
                this.curView.customize();
                break;/*
            case 'group':
                this.showGroup();
                break;*/
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    if(this.curView.isDirty && this.curView.isDirty()){
                        // TODO prompt for save changes
                    }
                    this.browse(toolId);
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;
            case 'new-field':
                Evol.Dico.showDesigner('', 'field', $e);
                break;
            //case 'new-panel':// ui-dico
            default:// 'edit', 'mini', 'list', 'badges', 'export', 'json', 'new'
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
        this.setView('view');//(this._prevOne || 'edit');
        this.curView.setModel(m);
        // todo: decide change model for all views or model event
    },

    change_filter: function(evt){
        var fvs=this._filters.val(),
            collec;
        if(fvs.length){
            var models=Evol.Dico.filterModels(this.model.collection.models, fvs);
            if(this.collectionClass){
                collec=new collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection=collec;
            var ccSel=collec.length,
                ccAll=this.collection.length;
            if(ccSel){

            }
            this.setStatus(ccSel+' / '+ccAll+' '+this.options.uiModel.entities);
        }else{
            collec=this.collection;
            this._filteredCollection=null;
            this.setStatus(collec.length+' '+this.options.uiModel.entities);
        }
        this.curView.setCollection(collec);
    }
    /*
    click_selection: function(evt, ui){
        var status=this.$('.evo-toolbar .evo-tb-status'),
            cbxs=this.$('.list-sel:checked').not('[data-id="cbxAll"]'),
            l=cbxs.length,
            tbBs=this.getToolbarButtons();
        if(l>0){
            this.setStatus(Evol.i18n.getLabel('selected', l));
            tbBs.del.show();
        }else{
            this.setStatus('');
            tbBs.del.hide();
        }
    }
*/
});


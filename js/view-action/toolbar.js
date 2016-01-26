/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * View "toolbar" (one toolbar instance manages all views for a UI model).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2016 Olivier Giulieri
 *
 *************************************************************************** */

Evol.viewClasses = {
    getClass: function(className){
        if(this[className]){
            return this[className];
        }else{
            return this.list;
        }
    }
};

_.forEach([ 'browse', 'edit', 'mini', 'json'],function(vn){
    Evol.viewClasses[vn] = Evol.ViewOne[vn==='json'?'JSON':Evol.Format.capitalize(vn)];
});
_.forEach([ 'list', 'cards', 'bubbles', 'charts'],function(vn){
    Evol.viewClasses[vn] =  Evol.ViewMany[Evol.Format.capitalize(vn)];
});
_.forEach([ 'filter', 'export', 'import'],function(vn){
    Evol.viewClasses[vn] =  Evol.ViewAction[Evol.Format.capitalize(vn)];
});

if(toastr){
    toastr.options = {
        hideDuration: 0,
        //preventDuplicates: true,
        closeButton: true,
        progressBar: true
    };
}

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.Toolbar = function() {

    var dom = Evol.DOM,
        i18n = Evol.i18n,
        i18nTool = i18n.tools;

return Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'navigate.many >div': 'click_navigate',
        'paginate.many >div': 'paginate',
        //'selection.many >div': 'click_select',
        'click .evo-search>.btn': 'click_search',
        'keyup .evo-search>input': 'key_search',
        'click .evo-search>.clear-icon': 'clear_search',
        'change.tab >div': 'change_tab',
        'action >div': 'click_action',
        'status >div': 'status_update',
        'change.filter >div': 'change_filter',
        'close.filter >div': 'hideFilter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        readonly: false,
        //router:...,
        defaultView: 'list',
        defaultViewOne: 'browse',
        defaultViewMany: 'list',
        style: 'panel-info',
        display: 'label', // other possible values: tooltip, text, icon, none
        titleSelector: '#title',
        pageSize:20,
        buttons: {
            always:[
                {id: 'list', label: i18nTool.bList, icon:'th-list', n:'x'},
                //{id: 'selections', label: i18nTool.Selections, icon:'star', n:'x'},
                {id: 'new', label: i18nTool.bNew, icon:'plus', n:'x', readonly:false}
            ],
            actions:[
                //{id:'browse', label: i18nTool.bBrowse, icon:'eye', n:'1', readonly:false},
                {id:'edit', label: i18nTool.bEdit, icon:'edit', n:'1', readonly:false},
                {id:'save', label: i18nTool.bSave, icon:'floppy-disk', n:'1', readonly:false},
                {id:'del', label: i18nTool.bDelete, icon:'trash', n:'1', readonly:false}
            ],
            moreActions:[
                {id:'filter', label: i18nTool.bFilter, icon:'filter', n:'n'},
                {id:'-'},
                {id:'export', label: i18nTool.bExport, icon:'cloud-download',n:'x'},
                {id:'import', label: i18nTool.bImport, icon:'cloud-upload',n:'x'},
                //{id:'-'},
                //{id:'cog',label: 'Customize', icon:'cog',n:'x'}
            ],
            prevNext:[
                {id:'prev', label: '', icon:'chevron-left', n:'x'},
                {id:'next', label: '', icon:'chevron-right', n:'x'}
            ],
            views: [
                // -- views ONE ---
                {id:'browse', label: i18nTool.bBrowse, icon:'eye-open',n:'1'},// // ReadOnly
                {id:'edit', label: i18nTool.bEdit, icon:'edit',n:'1', readonly:false},// // All Fields for editing
                {id:'mini', label: i18nTool.bMini, icon:'th-large',n:'1', readonly:false},// // Important Fields only
                //{id:'wiz',label: i18nTool.bWizard, icon:'arrow-right',n:'1'},
                {id:'json', label: i18nTool.bJSON, icon:'barcode',n:'1', readonly:false},
                // -- views MANY ---
                {id:'list', label: i18nTool.bList, icon:'th-list',n:'n'},
                {id:'cards', label: i18nTool.bCards, icon:'th-large',n:'n'},
                {id:'bubbles', label: i18nTool.bBubbles, icon:'adjust',n:'n'},
                {id:'charts', label: i18nTool.bCharts, icon:'stats',n:'n'}
            ],
            search: true
        }
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.views=[];
        this.viewsHash={};
    },

    render: function() {
        this.$el.html(this._toolbarHTML());
        this.setView(this.defaultViewMany, false);
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
        return this;
    },

    _toolbarHTML: function(){
        var h,
            isReadOnly=this.readonly!==false,
            that=this,
            domm=dom.menu,
            tb=this.buttons,
            menuDivider='<li class="divider" data-cardi="x"></li>',
            menuDividerH='<li class="divider-h"></li>';

        function menuItem (m, noLabel){
            return domm.hItem(m.id, noLabel?'':m.label, m.icon, m.n);
        }
        function menuItems (ms, noLabel){
            return _.map(ms, function(m){
                if(isReadOnly && m.readonly===false){
                    return null;
                }
                return menuItem(m, noLabel);
            }).join('');
        }

        h='<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">'+
            menuItems(tb.always)+menuDividerH;
        h+=menuItems(tb.actions);
        if(tb.moreActions && tb.moreActions.length){
             h+=domm.hBegin('more','li','menu-hamburger', '', 'n');
             _.each(tb.moreActions, function(m){
                if(m.id==='-'){
                    h+=menuDivider;
                }else{
                    h+=menuItem(m);
                }
            });
            h+=domm.hEnd('li');
        }
        if(tb.search){
            h+=menuDivider;
            h+='<li><div class="input-group evo-search">'+
                '<input class="evo-field form-control" type="text" maxlength="100" required>'+
                '<div class="clear-icon glyphicon glyphicon-remove"></div>'+
                '<span class="btn input-group-addon glyphicon glyphicon-search"></span>'+
                '</div></li>';
        }
        if(this.toolbar){
            h+='</ul><ul class="nav nav-pills pull-right" data-id="views">';
            h+='<li class="evo-tb-status" data-cardi="n"></li>';
            h+=menuItems(tb.prevNext);
            //h+=domm.hBegin('views','li','eye-open');
            h+=menuDividerH+
                menuItems(tb.views, true);
            //h+=domm.hItem('customize','','wrench', 'x', 'Customize');
            /*
             if(this.buttons.customize){
                 h+=beginMenu('cust','wrench');
                 link2h('customize','Customize this view','wrench');
                 h.push(menuDivider);
                 link2h('new-field','New Field','plus');
                 link2h('new-panel','New Panel','plus');
                 h+='</ul></li>';
             } */

        }
        h+='</ul>'+dom.html.clearer+'</div>';
        return h;
    },

    refresh:function(){
        if(this.curView && this.curView.cardinality && this.curView.cardinality==='n'){
            this.curView.render();
        }
        return this;
    },

    clearViews: function(keep){
        //div data-vid="evolw-edit"
        $('[data-vid=evolw-*]').remove();
    },

    isDirty:function(){
        // -- true if current view had unsaved values
        return (this.curView && this.curView.isDirty && this.curView.isDirty())?true:false;
    },

    _setView:function(viewName, updateRoute, skipIcons){
        var $e=this.$el,
            eid ='evolw-'+viewName,
            $v=this.$('[data-vid="'+eid+'"]'),
            vw=this.curView,
            config,
            collec=this._curCollec();

        if(viewName==='new'){
            viewName=(this._prevViewOne && this._prevViewOne!='browse' && this._prevViewOne!='json')?this._prevViewOne:'edit';
            this.setView(viewName, false, true);
            this.model=new this.modelClass();
            this.model.collection=collec;
            vw.model=this.model;
            this.newItem();
            this.setIcons('new');
            vw.mode='new';
            this.hideFilter();
        }else{
            var ViewClass = Evol.viewClasses.getClass(viewName);
            if($v.length){
                // -- view already exists and was rendered
                this.model=vw.model;
                if(vw.model){
                    //TODO debug
                    this.model.collection=collec;
                }
                vw=this.viewsHash[viewName];
                if(vw && vw.setCollection){
                    vw.setCollection(collec);
                }
                if(this.model && !this.model.isNew()){
                    if(vw.setModel){
                        if(!vw.collection){
                            vw.collection=this.model.collection;
                        }
                        vw.setModel(this.model);
                    }else{
                        vw.model = this.model;
                    }
                    if(vw.setTitle){
                        vw.setTitle();
                    }
                    if(this._tabId && vw.getTab && (this._tabId != vw.getTab())){
                        vw.setTab(this._tabId);
                    }
                    if(vw.cardinality==='n' && vw.setPage && this.pageIndex){
                        vw.setPage(this.pageIndex);
                    }
                }else if(vw.clear){
                    vw.clear();
                }
                this.$('[data-id="views"] > li').removeClass('evo-sel') // TODO optimize
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                this.curView=vw;
                this._keepTab(viewName);
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
                    uiModel: this.uiModel,
                    style: this.style,
                    pageSize: this.pageSize || 20,
                    pageIndex: this.pageIndex || 0,
                    titleSelector: this.titleSelector,
                    router: this.router//,
                    //iconsPath: this.iconsPath || ''
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel')
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                if(Evol.Def.isViewMany(viewName)){
                    //fieldsetFilter
                    vw = new ViewClass(config)
                                .render();
                    this._prevViewMany=viewName;
                    vw.setTitle();
                    if(viewName!='charts' && viewName!='bubbles' && this.pageIndex > 0){
                        vw.setPage(this.pageIndex || 0);
                    }
                }else{
                    switch(viewName){
                        // --- actions ---
                        case 'export':
                            config.sampleMaxSize = config.pageSize;
                            vw = new ViewClass(config).render();
                            break;
                        case 'import':
                            config = {
                                el: $v,
                                mode: viewName,
                                uiModel: this.uiModel,
                                collection: this.collection,
                                style: this.style,
                                titleSelector: this.titleSelector,
                                router: this.router//,
                                //iconsPath: this.iconsPath || ''
                            };
                            vw = new ViewClass(config).render();
                            break;
                        // --- one --- browse, edit, mini, json, wiz
                        default :
                            var vwPrev = null,
                                cData;
                            if(vw && vw.editable){
                                vwPrev = vw;
                                cData=vw.getData();
                            }
                            vw = new ViewClass(config).render();
                            this._prevViewOne=viewName;
                            this._keepTab(viewName);
                            break;
                    }
                }
                if(_.isUndefined(vw)){
                    //TODO error tracking (in other places too)
                    alert('error: invalid route.');
                }else{
                    this.curView=vw;
                    this.viewsHash[viewName]=vw;
                    if(!skipIcons){
                        this.setTitle();
                    }
                }
            }
        }
        this.updateStatus();
        if(vw.cardinality==='n'){
            this.setRoute('', false);
            if(!this._filterOn && this._filterValue){ // TODO do not always change flag
                this.showFilter(false);
            }
            this.updateNav();
        }else{
            this.hideFilter();
            //if(this.curView.viewName==='wizard'){
            //    this.curView.stepIndex(0);
            //}
            if(updateRoute){
                /*if(!this.model){
                 alert('Error: Invalid route.');
                 }*/
                this.setRoute(this.model?this.model.id:null, false);
            }
            this.hideFilter();
            this._enableNav();
        }
        if(!skipIcons){
            this.setIcons(viewName);
        }
    },

    setView:function(viewName, updateRoute, skipIcons){
        var that=this;
        this.proceedIfReady(function(){
            that._setView(viewName, updateRoute, skipIcons);
        });
        return this;
    },

    getView:function(){
        return this.curView;
    },

    proceedIfReady:function(cbOK, cbCancel){
        // -- execute callback if not dirty or after prompt...
        var that=this,
            i18n=i18n,
            msg,
            cbs;
        if(this.isDirty()){
            msg=i18n.unSavedChanges.replace('{0}', this.curView.getTitle())+
                '<br><br>'+i18n.warnNoSave;
            cbs={
                nosave: cbOK,
                ok: function(){
                    if(that.curView.validate().length===0){
                        that.saveItem(false, true);
                        cbOK();
                    }
                }
            };
            if(cbCancel){
                cbs.cancel = cbCancel;
            }
            dom.modal.confirm(
                'isDirty',
                i18n.unSavedTitle,
                msg,
                cbs,
                [
                    {id:'nosave', text:i18nTool.bNoSave, class:'btn-default'},
                    {id:'cancel', text:i18nTool.bCancel, class:'btn-default'},
                    {id:'ok', text:i18nTool.bSave, class:'btn-primary'}
                ]
            );
        }else{
            cbOK();
        }
        return this;
    },

    _keepTab: function(viewName){
         if(this.tabId && (viewName=='browse'||viewName=='edit')){
            this.curView.setTab(this.tabId);
         }
    },

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var $tb=this.$('.evo-toolbar'),
            lis=$tb.find('>ul>li'),
                vw=$tb.find('[data-id="views"]');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: lis.filter('[data-id="prev"],[data-id="next"]'),
                //customize: lis.filter('[data-id="customize"]').parent(),
                more: lis.filter('[data-id="more"]'),
                views: vw,
                viewsIcon: this.$('.glyphicon-eye-open,.glyphicon-eye-close'),
                vws: vw.find('ul>li>a')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var showOrHide = dom.showOrHide,
            importOrExport = mode==='export' || mode==='import';

        function oneMany(mode, showOne, showMany){
            showOrHide(tbBs.ones, showOne);
            showOrHide(tbBs.manys, showMany);
            tbBs.vws.removeAttr('style');
            tbBs.views.find('[data-id="'+mode+'"]>a').css('color', '#428bca');
        }

        if(this.$el){
            var tbBs=this.getToolbarButtons();
            //showOrHide(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();//.removeClass('disabled');
            showOrHide(tbBs.views, !(importOrExport || mode=='new'));
            tbBs.del.hide();

            if(Evol.Def.isViewMany(mode)){
                this._prevViewMany=mode;
                oneMany(mode, false, true);
                if(mode!=='charts' && mode!=='bubbles'){
                    var cSize=this.collection.length,
                        pSize=this.curView.pageSize;
                    if(cSize > pSize){
                        tbBs.prevNext.show();/*
                         // TODO: finish disabling of paging buttons
                         // use ui.addRemClass
                         if(this.curView.pageIndex===0){
                            tbBs.prevNext.eq(0).addClass('disabled');
                         }else{
                            tbBs.prevNext.eq(0).removeClass('disabled');
                         }
                         if(this.collection.length/this.pageSize){
                            tbBs.prevNext.eq(1).addClass('disabled');
                         }else{
                            tbBs.prevNext.eq(1).removeClass('disabled');
                         }*/
                    }
                }
            }else if((this.model && this.model.isNew()) || mode==='new' || importOrExport){
                oneMany(mode, false, false);
                tbBs.del.hide();
                tbBs.views.hide();
                showOrHide(tbBs.more, importOrExport);
                showOrHide(tbBs.save, !importOrExport);
            }else{
                this._prevViewOne=mode;
                oneMany(mode, true, false);
                tbBs.prevNext.show();
                showOrHide(tbBs.save, mode!=='browse');
                showOrHide(tbBs.edit, mode==='browse');
            }
        }
    },

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(dom.panelEmpty('filters', 'evo-filters', 'info'));
                this.$('.evo-toolbar').after($ff);
                this._filters = new Evol.ViewAction.Filter({
                    el: $ff,
                    uiModel: this.uiModel
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val());
                    if(that.curView.viewName!=='bubbles'){
                        that.curView.render();
                    }
                });
            }
        }else{
            this._filters.$el.show(); //.slideDown();
        }
        this._filterOn=true;
        return this;
    },

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide(); //.fadeOut(300);
        }
        this._filterOn=false;
        return this;
    },

    toggleFilter: function(v){
        this._filterOn = _.isBoolean(v) ? v : !this._filterOn;
        return this._filterOn ? this.showFilter(true) : this.hideFilter();
    },

    _flagFilterIcon: function(fOn){
        dom.addRemClass(this.$('a[data-id="filter"]'), fOn, 'evo-filter-on');
    },

    setData: function(data){
        if(this.curView){
            this.curView.setData(data);
        }
        return this;
    },

    getData: function(skipReadOnlyFields){
        if(this.curView){
            return this.curView.getData(skipReadOnlyFields);
        }
        return null;
    },

    getCollection:function(){
        return this._curCollec();
    },

    setModelById: function(id, skipNav){
        var that = this,
            m,
            fnSuccess = function(){
                // TODO set collection ??
                that.model = m;
                if(!skipNav){
                    if(that.curView.cardinality!='1'){
                        that.setView(that.defaultViewOne);
                    }
                    that.curView.setModel(m);
                    dom.scroll2Top();
                }
            },
            fnError = function(){
                alert('Error: Invalid model ID.');
            };

        if(Evol.Config.localStorage){
            m = this.collection.get(id);
            if(_.isUndefined(m)){
                fnError();
            }else{
                fnSuccess();
            }
        }else{
            var M = Backbone.Model.extend({
                urlRoot: Evol.Config.url+that.uiModel.id
            });
            m = new M({id:id});
            m.fetch({
                success: fnSuccess,
                error: fnError
            });
        }
        return this;
    },

    navPrevNext: function(direction){ // direction = "prev" or "next"
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
        if(cModel){
            this.setRoute(cModel?cModel.id:null, false);
        }else{
            this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.name), 'error');
        }
        return this
            .clearMessage();
    },

    setRoute: function(id, triggerRoute, view){
        Evol.Dico.setRoute(this.router, this.uiModel.id, view || this.curView.viewName, id, triggerRoute);
        Evol.Dico.setPageTitle(this.curView.getTitle());
        return this;
    },

    saveItem: function(saveAndAdd, skipValidation){
        var that=this,
            vw=this.curView,
            msgs=skipValidation?[]:vw.validate();

        function fnSuccess(m){
            if(saveAndAdd) {
                that.newItem();
                this._trigger('item.added');
            }else{
                m.unset(''); // TODO why is there a "" prop?
                that.model=m;
                if(that._filteredCollection){
                    that._filteredCollection.add(m);
                }
                that.setIcons('edit');
                vw.setModel(m);
                that._trigger('item.saved', {
                    model:m,
                    uiModel:that.uiModel
                });
            }
            vw.setTitle();
        }

        if(msgs.length===0){
            var entityName=this.uiModel.name;
            if(_.isUndefined(this.model) || (this.model && this.model.isNew())){
                var collec=this.collection;
                if(collec){
                    collec.create(this.getData(true), {
                        success: function(m){
                            fnSuccess(m);
                            //that.collection.set(m, {remove:false});
                            that.setMessage(i18n.getLabel('saved', Evol.Format.capitalize(entityName)), i18n.getLabel('msg.added', entityName, _.escape(vw.getTitle())), 'success');
                        },
                        error:function(m, err){
                            alert('error in "saveItem"');
                        }
                    });
                    this.mode='edit';
                }else{
                    alert('Can\'t save record b/c no collection is specified.'); //TODO use bootstrap modal
                }
            }else{
                // TODO fix bug w/ insert when filter applied => dup record
                var updatedModel = this.getData(true);
                this.model.set(updatedModel);
                this.model.save(this.model.changedAttributes(), {
                    patch: !this.model.isNew(),
                    success: function(m){
                        fnSuccess(m);
                        that.collection.set(m, {remove:false});
                        that.setMessage(i18n.getLabel('saved', Evol.Format.capitalize(entityName)), i18n.getLabel('msg.updated', Evol.Format.capitalize(entityName), _.escape(vw.getTitle())), 'success');
                    },
                    error: function(m, err){
                        alert('Error '+err.status+' - '+err.statusText);
                    }
                });
            }
        }else{
            var msg = '<ul><li>'+msgs.join('</li><li>')+'</li></ul>';
            this.setMessage(i18n.validation.incomplete, msg, 'warning');
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName==='browse'){
            if(this._prevViewOne!=='browse' && this._prevViewOne!=='json'){
                this.setView(this._prevViewOne);
            }else{
                this.setView('edit', false, true);
            }
        }
        return this.curView.setDefaults() //.clear()
            .setTitle(i18n.getLabel('tools.newEntity', this.uiModel.name, vw.getTitle()));
    },

    deleteItem: function(skipConfirmation, id, options){
        var that=this,
            uimId=id || this.uiModel.id,
            entityName=this.uiModel.name,
            entityValue=(options && options.title) || this.curView.getTitle(),
            fnSuccess;

        if(id || this.curView.cardinality==='1'){
            if(id){
                this.setModelById(id, true);
                var t=this.uiModel.fnTitle;
                if(t && this.model){
                    if(_.isString(t)){
                        entityValue=this.model.get(t);
                    }else{
                        entityValue=t(that.model);
                    }
                }
            }
            fnSuccess = function(){
                var collec=that.collection,
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
                    newModel.collection = collec;
                }
                var opts = {
                    success: function(){
                        if(newModel===null || collec.length===0){
                            if(that.curView.clear){
                                that.curView.clear();
                            }
                        }else{
                            that.model = newModel;
                            if(!id){
                                that.setRoute(newModel.id, false);
                                that.curView.setModel(newModel);
                            }
                        }
                        var eName= Evol.Format.capitalize(entityName);
                        that.setMessage(i18n.getLabel('deleted1', eName), i18n.getLabel('msg.deleted', eName, entityValue), 'info');
                        if(options && options.fnSuccess){
                            options.fnSuccess();
                        }
                        that._trigger('item.deleted');
                    },
                    error: function(m, err){
                        alert('error in "deleteItem"');
                    }
                };
                if(!(id || Evol.Config.localStorage)){
                    opts.url=that.model.url();
                }
                collec.remove(delModel);
                delModel.destroy(opts);
            };
            var delModel = this.model;
            if(delModel){
                if(skipConfirmation){
                    fnSuccess();
                }else{
                    dom.modal.confirm(
                        'delete',
                        i18n.getLabel('deleteX', entityName),
                        i18n.getLabel('delete1', entityName, _.escape(entityValue)),
                        {
                            'ok': fnSuccess
                        }
                    );
                }
            }
        }/*else{
            if(that.curView.getSelection){
                var selection=that.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('deleteN', selection.length, that.uiModel.namePlural))) {
                        //TODO

                    }
                }
            }
        }*/
    },

    setMessage: function(title, content, style){
        toastr[style || 'info'](content, title);
        return this;
    },

    clearMessage: function(){
        this.$('[data-id="msg"]').remove();
        toastr.clear();
        return this;
    },

    showMessage: function(evt, ui){
        if(ui){
            return this.setMessage(ui.title, ui.content, ui.style);
        }else{
            return this.clearMessage();
        }
    },

    setTitle: function(){
        if(this.curView){
            this.curView.setTitle();
        }
        return this;
    },

    getStatus: function(){
        if(this.curView.cardinality==='n'){
            if(this._filteredCollection){
                return this._filteredCollection.length+' / '+this.collection.length+' '+this.uiModel.namePlural;
            }else{
                return this.collection.length+' '+this.uiModel.namePlural;
            }
        }else{
            return '';
        }
    },

    setStatus: function(msg){
        this.$('.evo-toolbar .evo-tb-status')
            .html(msg);
        this.$('.evo-many-summary').html(msg);
    },

    updateStatus: function(){
        this.setStatus(this.getStatus());
    },

    click_action: function(evt, options){
        var actionId;
        if(_.isString(options)){
            actionId=options;
        }else{
            actionId=options.id;
        }
        switch(actionId){
            case 'cancel':
                window.history.back();
                break;
            case 'edit':
                if(options.mid){
                    this.setModelById(options.mid);
                    this.setRoute(options.mid, false, 'edit');
                }else{
                    //todo
                    this.setView(actionId, true);
                }
                break;
            case 'delete':
                if(options.mid){
                    this.deleteItem(options.skipWarning, options.mid, options);
                }
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
                break;
            case 'import':
                var d = options.data;
                var msg, style;
                if(d && d.total){
                    style = d.errors.length ? (d.inserts.length ? 'warning' : 'error') : 'success';
                    msg = d.inserts + ' ' +  this.uiModel.name + ' added.';
                    if(d.errors>0){
                        msg += '<br>' + d.errors.length + ' Errors.';
                    }
                    this.setMessage(i18n.import.success, msg, style);
                }else{
                    this.setMessage(i18n.import.empty, '', 'warning');
                }
                break;
        }
    },

    paginate: function(bId, ui){
        if(ui){
            bId=ui.id;
        }
        var pIdx=this.pageIndex || 0;
        if(bId==='prev'){
            pIdx=(pIdx>0)?pIdx-1:0;
        }else if(bId==='next'){
            if((pIdx+1)*this.pageSize<this.curView.collection.length){
                pIdx++;
            }
        }else{
            var bIdx=parseInt(bId, 10);
            if(bIdx>0){
                pIdx=bIdx-1;
            }
        }
        this.pageIndex=pIdx;
        this.updateNav();
        if(this.curView.setPage){
            this.curView.setPage(pIdx);
        }
        return this;
    },

    updateNav: function(){
        var cl=this.curView.collection ? this.curView.collection.length : 0,
            cssDisabled='disabled',
            pIdx=this.pageIndex||0,
            $item=this.$('[data-id="prev"]');

        dom.addRemClass($item, pIdx===0, cssDisabled);
        dom.addRemClass($item.next(), (pIdx+1)*this.pageSize>cl, cssDisabled);
    },

    _enableNav: function(){
        this.$('[data-id="prev"],[data-id="next"]')
            .removeClass('disabled');
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
                return this.model?this.model.collection:new this.collectionClass();
            }
        }
    },
    /*
     _ok2go: function(){
         if(this.curView && this.curView.editable && this.curView.isDirty && this.curView.isDirty()){
             if(confirm(i18n.unSavedChanges)){
                return true;
             }
             return false;
         }
         return true;
     },*/

    click_toolbar: function(evt, ui){
        var $e=$(evt.currentTarget);
        if($e.tagName!=='A'){
            $e=$e.closest('a');
        }
        var toolId=$e.data('id');
        //evt.preventDefault();
        //evt.stopImmediatePropagation();
        switch(toolId){
            case 'save':
                this.saveItem(false);
                break;
            case 'del':
                this.deleteItem(evt.shiftKey);
                break;
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    var that=this;
                    this.proceedIfReady(function(){
                        that.navPrevNext(toolId);
                    });
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;/*
             case 'customize':
                 this.curView.customize();
                 break;
             case 'new-field':
             case 'new-panel':
                 Evol.Dico.showDesigner('', toolId.substr(4), $e);
                 break;*/
            default:// 'browse', edit', 'mini', 'json', 'list', 'cards', 'bubbles', 'export'
                if(toolId && toolId!==''){
                    this.setView(toolId, true);
                }
                this.updateStatus();
        }
        this._trigger('toolbar.'+toolId);
    },

    _trigger: function(name, ui){
        this.$el.trigger(name, ui);
    },

    click_navigate: function(evt, ui, view){
        evt.stopImmediatePropagation();
        this.setModelById(ui.id);
        if(ui.view){
            this.setView(ui.view);
        }
        this.setRoute(ui.id, false, ui.view);
    },

    change_tab: function(evt, ui){
        if(ui){
            this._tabId=ui.id;
        }
    },

    change_filter: function(evt){
        if(evt.namespace!=='filter'){
            return;
        }
        var fvs=this._filters.val(),
            collec;
        if(fvs.length){
            var models=this._searchString ? this._filteredCollection.models : this.model.collection.models;
            models=Evol.Dico.filterModels(models, fvs);
            if(this.collectionClass){
                collec=new this.collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection = collec;
            this._filterValue = fvs;
        }else{
            collec=this.collection;
            this._filteredCollection = null;
            this._filterValue = null;
        }
        this.updateStatus();
        this._flagFilterIcon(fvs.length);
        this.pageIndex=0;
        this.curView.setCollection(collec);
        this.updateNav();
        this._trigger('filter.change');
    },
    
    click_search: function(evt){
        var that=this,
            vSearch=this.$('.evo-search>input').val().toLowerCase(),
            fnSearch = Evol.Def.fnSearch(this.uiModel, vSearch),
            collec;

        this._searchString = vSearch;
        if(vSearch){
            var models=(this.collection||this.model.collection).models
                    .filter(fnSearch);
            if(this.collectionClass){
                collec = new this.collectionClass(models);
            }else{
                collec = new Backbone.Collection(models);
            }
            this._filteredCollection = collec;
        }else{
            collec=this.collection;
            this._filteredCollection=null;
        }
        this.updateStatus();
        this.pageIndex=0;
        if(this.curView.viewType!=='many' && !this.curView.isChart){
            this.setView('list', true);
        }
        this.curView.setCollection(collec);
        this.updateNav();
        this._trigger('search');
    },

    key_search: function(evt){
        if(evt.keyCode===13){
            evt.preventDefault();
            this.click_search(evt);
        }
    },

    clear_search: function(evt){
        var collec=this.collection;
        this._filteredCollection=null;
        this.updateStatus();
        this.pageIndex=0;
        if(this.curView.setCollection){
            this.curView.setCollection(collec);
        }
        this._searchString = null;
        this.$('.evo-search>input').val('').focus();
        //this.updateNav();
        //this._trigger('search');
    },

    click_selection: function(evt, ui){
        var status=this.$('.evo-toolbar .evo-tb-status'),
            len=this.$('.list-sel:checked').not('[data-id="cbxAll"]').length,
            tbBs=this.getToolbarButtons();
        if(len>0){
            this.setStatus(i18n.getLabel('selected', len));
            tbBs.del.show();
        }else{
            this.setStatus('');
            tbBs.del.hide();
        }
    }

});

}();

/*! ***************************************************************************
 *
 * evolutility :: toolbar.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.viewClasses = {
    // --- One ---
    'view': Evol.ViewOne.View,
    'edit': Evol.ViewOne.Edit,
    'mini': Evol.ViewOne.Mini,
    'json': Evol.ViewOne.JSON,
    // --- Many ---
    'list': Evol.ViewMany.List,
    'badges': Evol.ViewMany.Badges,
    'charts': Evol.ViewMany.Charts,
    // --- Action ---
    'filter': Evol.ViewAction.Filter,
    'export': Evol.ViewAction.Export
    //'uimodel': Evol.ViewAction.UI_Model,
    //'doc': Evol.ViewAction.Doc
};

// toolbar widget which also acts as a controller for all views "one" and "many" as well as actions
Evol.ViewToolbar = function() {

    var eUI = Evol.UI,
        i18n = Evol.i18n;

return Backbone.View.extend({

    events: {
        'click .nav a': 'click_toolbar',
        'navigate.many >div': 'click_navigate',
        'paginate.many >div': 'paginate',
        //'selection.many >div': 'click_select',
        'change.tab >div': 'change_tab',
        'action >div': 'action_view',
        'status >div': 'status_update',
        'change.filter >div': 'change_filter',
        'click .alert-dismissable>button': 'clearMessage',
        'message >div':'showMessage'
    },

    options: {
        toolbar: true,
        //router:...,
        defaultView: 'list',
        style: 'panel-info',
        display: 'label', // tooltip, text, icon, none
        titleSelector: '#title',
        buttons: {
            // --- views for one ---
            view: true,
            edit: true,
            mini: true,
            //wiz: false,
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
            'export': true
            //group: false,
            //customize: false
        },
        pageSize:20
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        this.views=[];
        this.viewsHash={};
        //this._group=false;
    },

    render: function() {
        this.$el.html(this._toolbarHTML());
        this.setView(this.defaultView || 'list', false);
        //this.$('[data-toggle="tooltip"]').tooltip();
        this.$('.dropdown-toggle').dropdown();
        return this;
    },

    _toolbarHTML: function(){
        var h=[],
            that=this,
            eUIm=eUI.menu,
            endMenu='</ul></li>',
            menuDevider='<li class="divider" data-cardi="1"></li>',
            menuDeviderH='<li class="divider-h"></li>';

        function linkOpt2h (id, label, icon, cardi){
            if(that.buttons[id]){
                h.push(eUIm.hItem(id, label, icon, cardi));
            }
        }

        h.push('<div class="evo-toolbar"><ul class="nav nav-pills pull-left" data-id="main">');
        linkOpt2h('list','','th-list','x'); // linkOpt2h('list',i18n.bAll,'th-list');
        linkOpt2h('new','','plus'); // linkOpt2h('new',i18n.bNew,'plus');
        h.push(menuDeviderH);
        linkOpt2h('edit',i18n.bEdit,'pencil','1');
        linkOpt2h('save',i18n.bSave,'floppy-disk','1');
        linkOpt2h('del',i18n.bDelete,'trash','1');
        linkOpt2h('filter',i18n.bFilter,'filter','n');
        //linkOpt2h('group','Group','resize-horizontal','n');
        linkOpt2h('charts',i18n.bCharts,'stats','n');
        linkOpt2h('export',i18n.bExport,'cloud-download','n');
        //linkOpt2h('selections','','star');
        if(this.toolbar){
            h.push('</ul><ul class="nav nav-pills pull-right" data-id="views">',
                '<li class="evo-tb-status" data-cardi="n"></li>',
                eUIm.hItem('prev','','chevron-left','x'),
                eUIm.hItem('next','','chevron-right','x')
            );

            h.push(eUIm.hBegin('views','li','eye-open'));
            linkOpt2h('view','View','file','1');
            linkOpt2h('edit','Edit','th','1'); // All Fields
            linkOpt2h('mini','Mini','th-large','1'); // Important Fields only
            linkOpt2h('wiz','Wizard','arrow-right','1');
            linkOpt2h('json','JSON','barcode','1');
            h.push(menuDevider);
            linkOpt2h('list','List','th-list','x');
            linkOpt2h('badges','Badges','th-large','x');
            linkOpt2h('charts','Charts','stats','x');
            h.push(eUIm.hEnd('li'));

            //linkOpt2h('customize','','wrench', '1', 'Customize');
            /*
             if(this.buttons.customize){
                 h.push(beginMenu('cust','wrench'));
                 link2h('customize','Customize this view','wrench');
                 h.push(menuDevider);
                 link2h('new-field','New Field','plus');
                 link2h('new-panel','New Panel','plus');
                 h.push(endMenu);
             } */
        }
        h.push('</ul>',eUI.html.clearer,'</div>');
        return h.join('');
    },

    refresh:function(){
        if(this.curView && this.curView.cardinality && this.curView.cardinality==='n'){
            this.curView.render();
        }
        return this;
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
            viewName=(this._prevViewOne && this._prevViewOne!='view' && this._prevViewOne!='json')?this._prevViewOne:'edit';
            this.setView(viewName, false, true);
            this.model=new this.modelClass();
            this.model.collection=collec;
            vw.model=this.model;
            this.newItem();
            this.setIcons('new');
            vw.mode='new';
        }else{
            if($v.length){
                // -- view already exists and was rendered
                this.model=vw.model;
                if(vw.model){
                    //TODO debug
                    this.model.collection=collec;
                }
                vw=this.viewsHash[viewName];
                if(vw.setCollection){
                    vw.setCollection(collec)
                        .render();
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
                    router: this.router
                };
                this.$('[data-id="new"]').show();
                this.$('[data-id="views"] > li').removeClass('evo-sel')
                    .filter('[data-id="'+viewName+'"]').addClass('evo-sel');
                switch(viewName){
                    // --- many ---
                    case 'charts':
                    case 'badges':
                    case 'list':
                        vw = new Evol.viewClasses[viewName](config)
                            .render();
                        this._prevViewMany=viewName;
                        vw.setTitle();
                        if(viewName!='charts' && this.pageIndex > 0){
                            //var pIdx=this.curView.getPage();
                            vw.setPage(this.pageIndex || 0);
                        }
                        //this.$el.trigger('status', this.pageSummary(pageIdx, pSize, this.collection.length));
                        break;
                    // --- actions ---
                    case 'export':
                        vw = new Evol.ViewAction.Export(config).render();
                        $v.addClass('panel panel-info')
                            .slideDown();
                        break;
                    // --- one --- view, edit, mini, json, wiz
                    default :
                        var vwPrev = null,
                            cData;
                        if(vw && vw.editable){
                            vwPrev = vw;
                            cData=vw.getData();
                        }
                        vw = new Evol.viewClasses[viewName](config).render();
                        this._prevViewOne=viewName;
                        this._keepTab(viewName);
                        break;
                }
                if(_.isUndefined(vw)){
                    //TODO error tracking (in other places too)
                    alert('error: invalid route.');
                }else{
                    this.curView=vw;
                    this.viewsHash[viewName]=vw;
                    if(!skipIcons){
                        $(this.titleSelector).html(vw.getTitle());
                    }
                }
            }
        }
        if(this.curView.cardinality==='n'){
            this.setRoute('', false);
            if(this._filterOn){ // TODO do not always change flag
                this.showFilter(false);
            }
            this.updateNav();
        }else{
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

    setTitle: function(){
        if(this.curView){
            if(this.curView.viewName==='export'){
                $(this.titleSelector)
                    .html(this.curView.getTitle());
            }else{
                this.curView.setTitle();
            }
        }
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
            eUI.modal.confirm(
                'isDirty',
                i18n.unSavedTitle,
                msg,
                cbs,
                [
                    {id:'nosave', text:i18n.bNoSave, class:'btn-default'},
                    {id:'cancel', text:i18n.bCancel, class:'btn-default'},
                    {id:'ok', text:i18n.bSave, class:'btn-primary'}
                ]
            );
        }else{
            cbOK();
        }
        return this;
    },

     _keepTab: function(viewName){
         if(this.tabId && (viewName=='view'||viewName=='edit')){
            this.curView.setTab(this.tabId);
         }
     },

    getToolbarButtons: function(){
        if(!this._toolbarButtons){
            var lis=this.$('.evo-toolbar li'),
                vw=this.$('.evo-toolbar [data-id="views"]');
            this._toolbarButtons = {
                ones: lis.filter('li[data-cardi="1"]'),
                manys: lis.filter('li[data-cardi="n"]'),
                edit: lis.filter('[data-id="main"]>[data-id="edit"]'),
                del: lis.filter('[data-id="del"]'),
                save: lis.filter('[data-id="save"]'),
                prevNext: this.$('.evo-toolbar [data-id="prev"],.evo-toolbar [data-id="next"]'),
                //customize: this.$('.evo-toolbar a[data-id="customize"]').parent(),
                views: vw,
                viewsIcon: this.$('.glyphicon-eye-open,.glyphicon-eye-close'),
                vws: vw.find('ul>li>a')
            };
        }
        return this._toolbarButtons;
    },

    setIcons: function(mode){
        var setVisible=eUI.setVisible;

        function oneMany(mode, showOne, showMany){
            setVisible(tbBs.ones, showOne);
            setVisible(tbBs.manys, showMany);
            tbBs.vws.removeAttr('style');
            tbBs.views.find('[data-id="'+mode+'"]>a').css('color', '#428bca');
        }

        if(this.$el){
            var tbBs=this.getToolbarButtons();
            //setVisible(tbBs.customize, mode!='json');
            tbBs.prevNext.hide();//.removeClass('nav-disabled');
            setVisible(tbBs.views, !(mode==='export' || mode=='new'));
            tbBs.del.hide();
            var cssOpen='glyphicon-eye-open',
                cssClose='glyphicon-eye-close';
            if(mode==='mini' || mode==='json'){
                tbBs.viewsIcon.removeClass(cssOpen).addClass(cssClose);
            }else{
                tbBs.viewsIcon.removeClass(cssClose).addClass(cssOpen);
            }
            if(mode==='badges' || mode==='list' || mode==='charts'){
                this._prevViewMany=mode;
                oneMany(mode, false, true);
                if(mode==='charts'){
                    this.setStatus('');
                }else{
                    var cSize=this.collection.length,
                        pSize=this.curView.pageSize;
                    if(cSize > pSize){
                        tbBs.prevNext.show();/*
                         // TODO finish disabling of paging buttons
                         if(this.curView.pageIndex===0){
                         tbBs.prevNext.eq(0).addClass('nav-disabled');
                         }else{
                         tbBs.prevNext.eq(0).removeClass('nav-disabled');
                         }
                         if(this.collection.length/this.pageSize){
                         tbBs.prevNext.eq(1).addClass('nav-disabled');
                         }else{
                         tbBs.prevNext.eq(1).removeClass('nav-disabled');
                         }*/
                    }
                }
            }else if((this.model && this.model.isNew()) || mode==='new' || mode==='export'){
                oneMany(mode, false, false);
                tbBs.del.hide();
                tbBs.views.hide();
                setVisible(tbBs.save, mode!=='export');
            }else{
                this._prevViewOne=mode;
                oneMany(mode, true, false);
                tbBs.prevNext.show();
                setVisible(tbBs.save, mode!=='view');
                setVisible(tbBs.edit, mode==='view');
            }
            setVisible(tbBs.manys.filter('[data-id="group"]'), mode==='badges');
        }
    },

    showFilter: function( orCreate){
        if(!this._filters){
            if(orCreate){
                var that=this,
                    $ff=$(eUI.HTMLEmptyPanel('filters', 'evo-filters', 'info'));
                this.$('.evo-toolbar').after($ff);
                this._filters = new Evol.ViewAction.Filter({
                    el: $ff,
                    uiModel: this.uiModel
                }).render();
                $ff.on('change.filter', function(){
                    that.curView.setFilter(that._filters.val())
                        .render();
                });
                this._filterOn=true;
            }else{
                return this;
            }
        }else{
            this._filters.$el.show(); //.slideDown();
        }
        return this;
    },

    hideFilter: function(){
        if(this._filters){
            this._filters.$el.hide(); //.fadeOut(300);
            this._filterOn=false;
        }
        return this;
    },

    _flagFilterIcon: function(fOn){
        eUI.addRemClass(this.$('a[data-id="filter"]'), fOn, 'evo-filter-on');
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

    getData: function(skipReadOnlyFields){
        if(this.curView){
            return this.curView.getData(skipReadOnlyFields);
        }
        return null;
    },

    setModelById: function(id){
        var m=this.collection.get(id);
        if(_.isUndefined(m)){
            alert('Error: Invalid model ID.');
            //TODO: do something
        }else{
            this.model=m;
            if(this.curView.cardinality!='1'){
                this.setView('view');//(this._prevViewOne || 'edit');
            }
            this.curView.setModel(m);
            // todo: decide change model for all views or model event
        }
        return m; // TODO: return "this" ???
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
        if(cModel){
            this.setRoute(cModel?cModel.id:null, false);
        }else{
            //eUI.modal.alert(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity));
            this.setMessage(i18n.notFound, i18n.getLabel('notFoundMsg', this.uiModel.entity));
        }
        return this
            .clearMessage();
    },

    setRoute: function(id, triggerRoute){
        Evol.Dico.setRoute(this.router, this.curView.getTitle(), this.uiModel.id, this.curView.viewName, id, triggerRoute);
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
            var entityName=this.uiModel.entity;
            if(_.isUndefined(this.model) || (this.model && this.model.isNew())){
                var collec=this.collection;
                if(collec){
                    collec.create(this.getData(true), {
                        success: function(m){
                            fnSuccess(m);
                            that.setMessage(i18n.getLabel('saved', eUI.capitalize(entityName)), i18n.getLabel('status.added', entityName, _.escape(vw.getTitle())), 'success');
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
                this.model.set(this.getData(true));
                this.model.save('','',{
                    success: function(m){
                        fnSuccess(m);
                        that.setMessage(i18n.getLabel('saved', eUI.capitalize(entityName)), i18n.getLabel('status.updated', eUI.capitalize(entityName), _.escape(vw.getTitle())), 'success');
                    },
                    error:function(m, err){
                        alert('error in "saveItem"');
                    }
                });
            }
        }else{
            if (msgs.length > 0) {
                var msg = ['<ul><li>', msgs.join('</li><li>'), '</li></ul>'].join(''); // i18nVal.intro,
                this.setMessage(i18n.validation.incomplete, msg, 'warning');
            }
        }
        return this;
    },

    newItem: function(){
        var vw=this.curView;
        if(vw.viewName=='view'){
            if(this._prevViewOne!=='view' && this._prevViewOne!=='json'){
                this.setView(this._prevViewOne);
            }else{
                this.setView('edit', false, true);
            }
        }
        return this.curView.setDefaults() //.clear()
            .setTitle(i18n.getLabel('NewEntity', this.uiModel.entity, vw.getTitle()));
    },

    deleteItem: function(){
        var that=this,
            entityName=this.uiModel.entity,
            entityValue=this.curView.getTitle();

        if(this.curView.cardinality==='1'){
            var delModel=this.curView.model;
            if(delModel){
                eUI.modal.confirm(
                    'delete',
                    i18n.getLabel('deleteX', entityName),
                    i18n.getLabel('delete1', entityName, _.escape(entityValue)),
                    {
                        'ok': function(){
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
                            delModel.destroy({
                                success:function(){
                                    if(newModel===null || collec.length===0){
                                        that.curView.clear();
                                    }else{
                                        that.model = newModel;
                                        that.curView.setModel(newModel);
                                    }
                                    var eName=eUI.capitalize(entityName);
                                    that.setMessage(i18n.getLabel('deleted1', eName), i18n.getLabel('status.deleted', eName, entityValue), 'success');
                                    that._trigger('item.deleted');
                                },
                                error:function(m, err){
                                    alert('error in "deleteItem"');
                                }
                            });
                        }
                    }
                );
            }
        }else{
            if(that.curView.getSelection){
                var selection=that.curView.getSelection();
                if(selection.length>0){
                    if (confirm(i18n.getLabel('deleteN', selection.length, that.uiModel.entities))) {
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
            $msg.find('>span').eq(0).html(content); //TODO text ?
            $msg.show();
        }else{
            $(eUI.HTMLMsg(title, ' '+content, style)).insertAfter(this.$el.children()[0]);
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
                    this.setView(this._prevViewOne || 'view');
                }else{
                    this.setView(this._prevViewMany || 'list');
                }
                break;
            case 'edit':
                this.setView(actionId, true);
                break;
            case 'export':
                eUI.modal.alert(
                    'This feature must be implemented server side.',
                    JSON.stringify(this.curView.val(), null, 2)
                    //eUI.cr2br(JSON.stringify(this.curView.val(), null, 2))
                );
                break;
            case 'save':
            case 'save-add':
                this.saveItem(actionId==='save-add');
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
        var cl=this.curView.collection.length,
            cssDisabled='nav-disabled',
            pIdx=this.pageIndex||0,
            $item=this.$('[data-id="prev"]');

        eUI.addRemClass($item, pIdx===0, cssDisabled);
        eUI.addRemClass($item.next(), (pIdx+1)*this.pageSize>cl, cssDisabled);
    },

    _enableNav: function(){
        this.$('[data-id="prev"],[data-id="next"]')
            .removeClass('nav-disabled');
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
        evt.preventDefault();
        evt.stopImmediatePropagation();
        switch(toolId){
            case 'save':
                this.saveItem(false);
                break;
            case 'del':
                this.deleteItem();
                break;
            case 'filter':
                this.toggleFilter();
                break;
            case 'prev':
            case 'next':
                if(this.curView.cardinality==='1'){
                    var that=this;
                    this.proceedIfReady(function(){
                        that.browse(toolId);
                    });
                }else if(this.curView.cardinality==='n'){
                    this.paginate(toolId);
                }
                break;/*
             case 'customize':
                 this.curView.customize();
                 break;
             case 'group':
                 this.showGroup();
                 break;
             case 'new-field':
             case 'new-panel':
                 Evol.Dico.showDesigner('', toolId.substr(4), $e);
                 break;*/
            default:// 'edit', 'mini', 'list', 'badges', 'export', 'json', 'new'
                if(toolId && toolId!==''){
                    this.setView(toolId, true);
                }
        }
        this._trigger('toolbar.'+toolId);
    },

    _trigger: function(name, ui){
        this.$el.trigger(name, ui);
    },

    click_navigate: function(evt, ui){
        evt.stopImmediatePropagation();
        this.setModelById(ui.id);
        this.setRoute(ui.id, false);
    },

    change_tab: function(evt, ui){
        this._tabId=ui.id;
    },

    change_filter: function(evt){
        if(evt.namespace!=='filter'){
            return;
        }
        var fvs=this._filters.val(),
            collec;
        if(fvs.length){
            var models=Evol.Dico.filterModels(this.model.collection.models, fvs);
            if(this.collectionClass){
                collec=new this.collectionClass(models);
            }else{
                collec=new Backbone.Collection(models);
            }
            this._filteredCollection=collec;
            this.setStatus(collec.length+' / '+this.collection.length+' '+this.uiModel.entities);
        }else{
            collec=this.collection;
            this._filteredCollection=null;
            this.setStatus(collec.length+' '+this.uiModel.entities);
        }
        this._flagFilterIcon(fvs.length);
        this.pageIndex=0;
        this.curView.setCollection(collec)
            .render();
        this.updateNav();
        this._trigger('filter.change');
    }
    /*
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
    } */
});

}();

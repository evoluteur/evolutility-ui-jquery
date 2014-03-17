/*! ***************************************************************************
 *
 * evolutility :: one-wizard.js
 *
 * View one edit
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.ViewOne.Wizard = Evol.ViewOne.extend({

    viewName: 'wizard',
    prefix: 'wiz',

    events:{
        'click .evo-wiz-bsteps>div,.evo-wiz-buttons>button':'click_nav',
        //'click .evol-buttons>[data-id="finish"]':'click_finish',
        'click label > .glyphicon-question-sign': 'click_help',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    _render: function (h, mode) {
        // EDIT and VIEW forms
        var elems = this.options.uiModel.elements;
        this._nbStep=elems.length;
        this._renderBreadcrumb(h, elems, 0)
            ._renderPanels(h, elems, 'wiz')
            ._renderButtons(h, mode)
            ._stepIdx=0;
    },

    _renderBreadcrumb: function (h, elems, stepIdx) {
        // WIZARD top step indicator
        h.push('<div class="evo-wiz-bsteps breadcrumb">');
        _.each(elems, function(p, idx){
            h.push('<div><div class="badge');
            if(idx>stepIdx){
                h.push(' future');
            }else if(idx<stepIdx){
                h.push(' past');
            }else{
                h.push(' present');
            }
            h.push('">', idx+1,'</div> ', p.label, '</div>');
        });
        h.push('</div>');
        return this;
    },

    _renderPanels: function (h, elems, mode) {
        // WIZARD forms
        var that=this;

        _.each(elems, function(p){
            switch (p.type) {
                case 'panel':
                    that.renderPanel(h, p, 'p-' + p.id, mode);
                    break;
                case 'panel-list':
                    that.renderPanelList(h, p, mode);
                    break;
            }
        });
        return this;
    },

    _renderButtons: function (h, mode) {
        //var css=Evol.UI.getSizeCSS(this.options.size);
        h.push(Evol.UI.html.clearer,
            '<div class="evo-wiz-buttons">',
            Evol.UI.input.button('prev', Evol.i18n.prev, 'btn-default disabled'),
            Evol.UI.input.button('next', Evol.i18n.next, 'btn-primary'),
            Evol.UI.input.button('finish', Evol.i18n.finish, 'btn-primary'),
            '</div>');
        return this;
    },

    click_nav: function(evt){
        var bId=$(evt.currentTarget).data('id');
        this.clearMessages();
        if(bId==='finish'){
            var v=this.validate();
            if(v===''){
                //TODO what? got ot OneView.View
                this.$el.trigger('action', 'save');
            }else{
                this.sendMessage('Incomplete information', v, 'warning');
            }
        }else{
            var stepIdx=parseInt(bId,10);
            if(stepIdx>0){//!isNaN
                this._stepIdx=stepIdx;
                this.$('.evo-p-wiz')
                    .hide()
                    .eq(this._stepIdx).show();
            }else if(this.validate(this.options.uiModel.elements[this._stepIdx].elements)===''){
                if(bId==='prev' && this._stepIdx>0){
                    this.$('.evo-p-wiz')
                        .hide()
                        .eq(--this._stepIdx).show();
                }else if(bId==='next' && this._stepIdx<this._nbStep){
                    var steps=this.$('.evo-p-wiz');
                    steps.hide();
                    steps.eq(++this._stepIdx).show();
                }
            }
            if(this._stepIdx===0){
                this.$('.evo-wiz-buttons>[data-id="prev"]').addClass('disabled');
            }else{
                this.$('.evo-wiz-buttons>[data-id="prev"]').removeClass('disabled');
            }
            if(this._stepIdx===this._nbStep-1){
                this.$('.evo-wiz-buttons>[data-id="next"]').hide();
                this.$('.evo-wiz-buttons>[data-id="finish"]').show();
            }else{
                this.$('.evo-wiz-buttons>[data-id="next"]').show();
                this.$('.evo-wiz-buttons>[data-id="finish"]').hide();
            }
        }
        this._refreshBreadcrumb();
    },

    _refreshBreadcrumb:function(){
        var stepIdx=this._stepIdx,
            divs=this.$('.evo-wiz-bsteps>div>div');
        _.each(divs, function(d, idx){
            if(idx>stepIdx){
                $(d).attr('class', 'badge future');
            }else if(idx<stepIdx){
                $(d).attr('class', 'badge past');
            }else{
                $(d).attr('class', 'badge present');
            }
        });
    }


});

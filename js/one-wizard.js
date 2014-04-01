/*! ***************************************************************************
 *
 * evolutility :: one-wizard.js
 *
 * View one wizard
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Wizard = Evol.ViewOne.extend({

    viewName: 'wizard',
    prefix: 'wiz',

    events:{
        'click .evo-wiz-bsteps>div,.evo-wiz-buttons>button':'click_nav',
        'click label > .glyphicon-question-sign': 'click_help',
        'click [data-id="bPlus"],[data-id="bMinus"]':'click_detailsAddDel'
    },

    stepIndex: function(stepIdx){
        if(_.isUndefined(stepIdx)){
            return this._stepIdx;
        }else if(stepIdx<this._nbStep){
            this._showStep(stepIdx);
            return this;
        }
    },

    _showStep: function(stepIdx, bId){
        var steps=this.$('.evo-p-wiz');
        if(_.isUndefined(bId)){
            this._stepIdx=stepIdx;
            steps.hide()
                .eq(this._stepIdx).show();
        }else if(this.validate(this.options.uiModel.elements[this._stepIdx].elements)===''){
            if(bId==='prev' && this._stepIdx>0){
                steps.hide()
                    .eq(--this._stepIdx).show();
            }else if(bId==='next' && this._stepIdx<this._nbStep){
                steps.hide()
                    .eq(++this._stepIdx).show();
            }
        }
        var bs=this._getButtons();
        if(this._stepIdx===0){
            bs.prev.addClass('disabled');
        }else{
            bs.prev.removeClass('disabled');
        }
        if(this._stepIdx===this._nbStep-1){
            bs.next.hide();
            bs.finish.show();
        }else{
            bs.next.show();
            bs.finish.hide();
        }
    },

    _render: function (h, mode) {
        // WIZARD forms
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
            h.push('<div data-id="',stepIdx,'"><div class="badge ');
            if(idx>stepIdx){
                h.push('future');
            }else if(idx<stepIdx){
                h.push('past');
            }else{
                h.push('present');
            }
            h.push('">', idx+1,'</div><div>', p.label, '</div></div>');
        });
        h.push('</div>');
        return this;
    },

    _renderPanels: function (h, elems, mode) {
        // WIZARD forms
        var that=this;
        h.push('<div class="evo-one-wiz">');
        _.each(elems, function(pnl, idx){
            switch (pnl.type) {
                case 'panel':
                    that.renderPanel(h, pnl, 'p-'+idx, mode, idx===0);
                    break;
                case 'panel-list':
                    that.renderPanelList(h, pnl, mode, idx===0);
                    break;
            }
        });
        h.push('</div>');
        return this;
    },

    _renderButtons: function (h) {
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
                this.sendMessage(Evol.i18n.validation.incomplete, v, 'warning');
            }
        }else{
            var stepIdx=parseInt(bId,10);
            this._showStep(stepIdx, bId);
        }
        this._refreshBreadcrumb();
    },

    _getButtons: function(){
        if(_.isUndefined(this._buttons)){
            var bh=this.$('.evo-wiz-buttons>button');
            this._buttons = {};
            for(var i=0;i<bh.length;i++){
                var b=bh.eq(i);
                this._buttons[b.data('id')]=b;
            }
        }
        return this._buttons;
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

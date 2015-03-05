/*! ***************************************************************************
 *
 * evolutility :: one-wizard.js
 *
 * View "one wizard" to edit one backbone model using a wizard (one step for each panel in the ui-model).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Wizard = function(){

    var eUI = Evol.UI,
        i18n = Evol.i18n;

return Evol.ViewOne.extend({

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
        }else if(this.validate(this.uiModel.elements[this._stepIdx].elements)===''){
            if(bId==='prev' && this._stepIdx>0){
                steps.hide()
                    .eq(--this._stepIdx).show();
            }else if(bId==='next' && this._stepIdx<this._nbStep){
                steps.hide()
                    .eq(++this._stepIdx).show();
            }
        }
        var bs=this._getButtons();
        eUI.addRemClass(bs.prev, this._stepIdx===0, 'disabled');
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
        var elems = this.uiModel.elements;
        this._nbStep=elems.length;
        this._renderBreadcrumb(h, elems, 0)
            ._renderPanels(h, elems, 'wiz')
            ._renderButtons(h, mode)
            ._stepIdx=0;
    },

    _renderBreadcrumb: function (h, elems, stepIdx) {
        // WIZARD top step indicator
        h.push('<ol class="evo-wiz-bsteps breadcrumb">');
        _.each(elems, function(p, idx){
            h.push('<li data-id="',stepIdx,'"><div class="badge ');
            if(idx>stepIdx){
                h.push('future');
            }else if(idx<stepIdx){
                h.push('past');
            }else{
                h.push('present');
            }
            h.push('">', idx+1,'</div><div>', p.label, '</div></li>');
        });
        h.push('</ol>');
        return this;
    },

    _renderPanels: function (h, elems, mode) {
        // WIZARD forms
        var that=this;
        h.push('<div class="evo-one-wiz">');
        _.each(elems, function(pnl, idx){
            if(!pnl.id){
                pnl.id='p'+idx;
            }
            switch (pnl.type) {
                case 'panel':
                    that._renderPanel(h, pnl, mode, idx===0);
                    break;
                case 'panel-list':
                    that._renderPanelList(h, pnl, mode, idx===0);
                    break;
            }
        });
        h.push('</div>');
        return this;
    },

    _renderButtons: function (h) {
        var b=eUI.button;
        h.push(eUI.html.clearer,
            '<div class="evo-wiz-buttons">',
            b('prev', i18n.prev, 'btn-default disabled'),
            b('next', i18n.next, 'btn-primary'),
            b('finish', i18n.finish, 'btn-default'),
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
                this.sendMessage(i18n.validation.incomplete, v, 'warning');
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
        return this;
    }

});

}();

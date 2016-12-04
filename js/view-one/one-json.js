/*! ***************************************************************************
 *
 * evolutility-ui-jquery :: one-json.js
 *
 * View "one json" to edit one backbone model in JSON.
 *
 * https://github.com/evoluteur/evolutility-ui-jquery
 * Copyright (c) 2016 Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.JSON = Evol.View_One.extend({

    events: {
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
    },

    viewName: 'json',
    icon: 'barcode', // glyphicon-barcode

    render: function () {
        var dom=Evol.DOM;
        if(this.model){
            var h = [],
                jsonStr=JSON.stringify(this.model, null, 2);

            h.push(dom.panelBegin({
                    id: 'p-json',
                    label:Evol.Format.capitalize(this.uiModel.name), 
                    label2: 'JSON'
                }, this.style+' evo-p-json', true)+
                '<fieldset>'+
                dom.label('uimjson', 'JSON')+
                dom.input.textMJSON('uimjson', jsonStr, 16)+
                '</fieldset>'+
                dom.panelEnd());
            this._renderButtons(h, 'json');
            this.$el.html(h.join(''));
        }else{
            this.$el.html(dom.HTMLMsg(Evol.i18n.nodata, '', 'info'));
        }
        this.setData(this.model);
        //this.custOn=false;
        return this;
    },

    validate: function () {
        var isValid=true,
            data=this.getData(),
            $fp=this._getDOMField().parent();

        //this.clearMessages();
        isValid=!Evol.DOM.addRemClass($fp, data===null, 'has-error');
        this.$el.trigger('action', 'validate', {valid:isValid});
        return isValid?[]:[Evol.i18n.validation.invalid];
    },

    getData: function () {
        var jsonStr=this._getDOMField().val(),
            obj;

        if(jsonStr===''){
            return jsonStr;
        }
        try{
            obj=$.parseJSON(jsonStr);
        }catch(err){
            obj=null;
        }
        return obj;
    },

    setData: function (m) {
        this.clearError()._getDOMField().val(JSON.stringify(m.toJSON(), null, 2));
        return this.setTitle();
    },

    clear: function () {
        this._getDOMField().val('');
        return this;
    },

    clearError: function(){
        this._getDOMField().parent().removeClass('has-error');
        return this;
    },

    _getDOMField: function(){
        return this.$('textarea');
    }

});

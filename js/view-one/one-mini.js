/*! ***************************************************************************
 *
 * evolutility :: one-mini.js
 *
 * View "one mini" to "quick edit" one backbone model (only showing important or required fields).
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewOne.Mini = function(){

    var eUI = Evol.UI,
        fts = Evol.Dico.fieldTypes;

return Evol.ViewOne.Edit.extend({

    events: { // TODO same as ViewOne ?
        'click > .evol-buttons > button': 'click_button',
        'click .evol-title-toggle': 'click_toggle',
        //'click .glyphicon-wrench': 'click_customize',
        'click label > .glyphicon-question-sign': 'click_help'
        // extra evt for $(window) resize
    },

    viewName: 'mini',
    prefix: 'om',

    fieldsetFilter: function(f){
        return (f.required || f.inMany || f.inMini) && f.type!='formula';
    },

    _render: function (h, mode) {
        // TODO browse mode
        // in EDIT and BROWSE modes
        var miniUIModel= {
            id: 'p-mini',
            type: 'panel',
            class: 'evol-mini-holder',
            label: Evol.UI.capitalize(this.uiModel.name),
            width: 100,
            elements: this.getFields()
        };
        
        this._renderPanel(h, miniUIModel, mode);
        this._renderButtons(h, mode);
    },

    _renderPanel: function (h, p, mode, visible) {
        var that = this,
            iconsPath = this.iconsPath;
            
        h.push('<div data-p-width="100%" class="evol-pnl evol-p-mini">'+
            eUI.HTMLPanelBegin(p, this.style)+
            '<fieldset data-pid="'+p.id+(p.readonly?'" disabled>':'">'));
        _.each(p.elements, function (elem) {
            if(elem.type==fts.hidden){
                h.push(eUI.input.hidden(that.fieldViewId(elem.id), that.getModelFieldValue(elem.id, elem.defaultValue, mode)));
            }else{
                h.push('<div class="pull-left evol-fld w-100">'+
                    '<div class="evol-mini-label">'+Evol.Dico.HTMLFieldLabel(elem, mode)+
                    '</div><div class="evol-mini-content">');
                that.renderField(h, elem, mode, iconsPath, true);
                h.push("</div></div>");
            }
        });
        h.push('</fieldset>'+
            eUI.HTMLPanelEnd()+
            '</div>');
        return this;
    }

});

}();

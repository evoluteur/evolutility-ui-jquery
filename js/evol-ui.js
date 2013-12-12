/*! ***************************************************************************
 *
 * evol-utility : evol-ui.js
 *
 * Copyright (c) 2013, Olivier Giulieri 
 *
 *************************************************************************** */

var EvoUI = {

    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>'
    },

    icons: {
        customize: function (id, type) {
            return ['<i class="glyphicon glyphicon-wrench" data-id="', id, '" data-type="', type, '"></i>'].join('');
        }
    },

    html_more: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-more">', label, '</a>'//,'<div style="display:none;">'
        ].join('');
    },

    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label"><label for="', fID, '">', fLbl, '</label></div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label"><label for="', fID, '">', fLbl, '</label></span>'].join('');
    },

    link: function (fID, label, url) {
        return ['<a class="Field" href="', url, '" id="', fID, '">', label, '</a>'].join('');
    },
    linkEmail: function (fID, label, email) {
        return ['<a class="Field" href="mailto:', email, '" id="', fID, '">', label, '</a>'].join('');
    },
    inputText: function (fID, fV, fd) {
        var h = ['<input class="form-control" type="text" id="', fID, '" value="', fV];
        if (fd) {
            _.each(['min', 'max', 'maxlength', 'max-width', 'min-width', 'placeholder'], function (item) {
                if (fd[item] != undefined) {
                    h.push('" ', item, '="', fd[item]);
                }
            });
            _.each(['readonly'], function (item) {
                var fi = fd[item];
                if (fi || fi == '1') {
                    h.push('" ', item, '="', item);
                }
            });
        }
        h.push('" class="Field">');
        return h.join('');
    },
    inputTextInt: function (fID, fV) {
        return ['<input class="form-control" type="number" id="', fID, '" value="', fV,
            '" class="Field" maxlength="12">'].join('');
    },
    inputTextM: function (fID, fV, ml, h) {
        return [
            '<textarea name="', fID, '" id="', fID, '" class="Field form-control"" rows="', h,
            (ml > 0) ? '" onKeyUp="EvoVal.checkMaxLen(this,' + ml + ')' : '',
            '">', fV, '</textarea>'
        ].join('');
    },
    inputTextMJSON: function (fID, fVobj, h) {
        return ['<textarea rows="',h,'" class="Field evol-json">', _.escape(JSON.stringify(fVobj, null, '\t')), '</textarea>'].join('');
    },
    inputAny: function (type, fId, fVal) {
        return [
            '<input type="', type, '" id="', fId, '" value="', fVal,
            '" class="Field form-control" size="15">'
        ].join('');
    },
    inputDate: function (fID, fV) {
        return EvoUI.inputAny('date', fID, fV);
        //+'&nbsp;<a href="javascript:ShowDatePicker(\'', fID, '\');" class="ico Calendar"></a></nobr>'
    },
    inputDateTime: function (fID, fV) {
        return EvoUI.inputAny('datetime-local', fID, fV);
    },
    inputTime: function (fID, fV) {
        return EvoUI.inputAny('time', fID, fV);
    },
    inputColor: function (fId, fVal) {
        return [
            '<input type="color" id="', fId, '" value="', fVal, '" size="15">'
        ].join('');
    },
    inputCheckbox: function (fID, fV) {
        var fh = ['<input type="checkbox" id="', fID, '"'];
        if (fV != null && fV != '' && fV != '0') {
            fh.push(' checked="checked"');
        }
        fh.push(' value="1">');
        return fh.join('');
    },
    inputRadio: function (fN, fV, fLbl, sel, fID) {
        return ['<label for="', fID, '"><input id="', fID, '" name="', fN, '" type="radio" value="', fV,
            (sel) ? '" checked="checked' : '',
            '">', fLbl, '</label>&nbsp;'
        ].join('');
    },
    inputLOV: function (fID, fV, fVLabel, fLOV) {
        var h = ['<select class="form-control Field" id="', fID, '"><option value="', fV, '" selected>', fVLabel, '</option>'];
        _.each(fLOV, function (item) {
            h.push(EvoUI.inputOption(item.id, item.label));
        });
        h.push('</select>');
        return h.join('');
    },
    inputHidden: function (fID, fV) {
        return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
    },
    inputOption: function (fID, fV) {
        return ['<option value="', fID, '">', fV, '</option>'].join('');
    },
    inputButton: function (id, label, cls) {
        return '<button type="button" id="' + id + '" class="btn' + (cls ? ' ' + cls : '') + '">' + label + '</button>';
    },

    icon: function (icon, cls) {
        return ['<span class="', cls? cls+' ':'', 'glyphicon glyphicon-', icon, '"></span>'].join('');
    },
    icone: function (icon) {
        //return ['<span data-sort="',icon,'" class="glyphicon glyphicon-', icon, '"></span>'].join('');
        return ['<span data-sort="',icon,'" class="glyphicon glyphicon-chevron-', icon, '"></span>'].join('');
    },

    iconClose: function () {
        return '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    },

    getOrCreate: function (fID) {
        var e = $('#' + fID);
        if (e == null) {
            e = $('<div id="' + fID + "></div>");
            $(body).append(e);
        }
        return e;
    },

    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', EvoUI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLMsg: function (title, content) {
        return ['<div class="bs-callout bs-callout-info">',//bs-callout-warning
            '<h4>',title,'</h4>',
            '<p>',content,'</p>',
            '</div>'].join('');
    }

}


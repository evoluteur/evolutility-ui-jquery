/*! ***************************************************************************
 *
 * evolutility :: ui-validation.js
 *
 * Form validation
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

// this is some very old code from Evolutility ASP.net version
// TODO rewrite or use another open source
Evol.UI.Validation = {

    checkMaxLen: function (f, maxLen) {
        if (f.value.length > maxLen){
            f.value = f.value.substring(0, maxLen - 1);
        }
    },

    checkNum: function (F, t) {
        var nv, fv = F.value;
        if (t.substring(0, 1) == 'i'){
            nv = parseInt(fv, 10);
        }else{
            var ln = Evol.i18n.LOCALE;
            if (ln == 'FR' || ln == 'DA'){
                fv = fv.replace(",", ".");
            }
            nv = parseFloat(fv);
        }
        if (isNaN(nv)){
            F.value = '';
        }else if (fv != nv){
            F.value = nv;
        }
    },

    setValidationFlags: function (p, msgf) {
        var errlabel = p.find('.text-danger');
        if (errlabel.length) {
            errlabel.html(msgf);
        } else {
            p.append('<p class="text-danger">' + msgf + '</p>');
        }
        p.addClass('has-error');
    },

    checkFields: function (holder, fds, prefix) {
        var that=this,
            msgs = [],
            i18nVal=Evol.i18n.validation,
            evoRegEx = {
                email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
                integer: /^-?\d+$/,
                decimalEN: /^\d+(\.\d+)?$/,
                decimalFR: /^\d+(\,\d+)?$/,
                decimalDA: /^\d+(\,\d+)?$/
            };
        for (var i in fds) {
            var fd = fds[i],
                $f = holder.find('#' + prefix + '-' + fd.id).eq(0),
                isHTML = fd.type == 'html';
            //if (isHTML) {
            //    $f.val(nicEditors.findEditor(f.id).getContent());
            //}
            if ($f.length > 0) {
                var noErr = true,
                    p, msgf;
                // Check empty & type
                if (fd.required && isEmpty($f, isHTML)) {
                    p = $f.parent();
                    msgf = labMsg(i18nVal.empty);
                    that.setValidationFlags(p, msgf);
                    noErr = false;
                } else {
                    typeCheck();
                }
                // Check regexp
                if (fd.regex !== null && !_.isUndefined(fd.regex)) {
                    var rg = new RegExp(fd.regex);
                    if (!$f.val().match(rg)) {
                        p = $f.parent();
                        msgf = labMsg(i18nVal.regex, fd.label);
                        that.setValidationFlags($f.parent(), msgf);
                    }
                }/*
                // Check custom
                if (fd.jsv !== null) {
                    p = eval([fd.jsv, '("', Evol.prefix, fd.id, '","', fd.label, '")'].join(''));
                    if (p !== null && p.length > 0) {
                        that.setValidationFlags($f.parent(), labMsg(p));
                    }
                }*/
                // Check min & max
                if (noErr) {
                    var fv = Evol.UI.trim($f.val());
                    if (fv !== '') {
                        if (fd.max !== null && parseFloat(fv) > fd.max) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal.max, fd.max));
                        }
                        if (fd.min !== null && parseFloat(fv) < fd.min) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal.min, fd.min));
                        }
                    }
                }
            }
        }
        if (msgs.length > 0) {
            return [i18nVal.intro, '<ul><li>', msgs.join('<li>'), '</li></ul>'].join('');
        } else {
            return '';
        }

        function typeCheck() {
            var ft = Evol.Dico.fieldTypes,
                fv = Evol.UI.trim($f.val());
            if (fv !== ''){
                switch (fd.type) {
                    case ft.integer:
                    case ft.email:
                        if (!evoRegEx[fd.type].test(fv)) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        }
                        break;
                    case ft.dec:
                    case ft.money:
                        var myRegExp = evoRegEx[fd.type + Evol.i18n.LOCALE];
                        if (myRegExp === null) {
                            myRegExp = evoRegEx[fd.type + "EN"]; // default to English with "."
                        }
                        if (!myRegExp.test(fv))
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        break;
                    case ft.date:
                    case ft.datetime:
                    case ft.time:
                        if ((fv !== '') && (!_.isDate(new Date(fv)))) {
                            that.setValidationFlags($f.parent(), labMsg(i18nVal[fd.type]));
                        }
                        break;
                }
            }
        }

        function isEmpty($f, isHTML) {
            var v, tn = $f.tagName;
            if (tn == 'SELECT' && $f.get(0).selectedIndex > -1) {
                v = f.options[$f.get(0).selectedIndex].value == "0";
                /*} else if (tn == 'TEXTAREA' && isHTML) {
                 var editor = nicEditors.findEditor(f.id);
                 if (editor) {
                 v = editor.getContent().trim()
                 v = v == '' || v == '<br>';
                 } else {
                 v = $f.val().trim() == '';
                 }   */
            } else {
                v = Evol.UI.trim($f.val()) === '';
            }
            return v;
        }

        function labMsg(msg, r2) {
            var m = msg.replace('{0}', fd.label);
            if (r2 !== null) {
                m = m.replace('{1}', r2);
            }
            msgs.push(m);
            return m;
        }

    }

};

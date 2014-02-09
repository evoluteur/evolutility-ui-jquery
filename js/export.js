/*! ***************************************************************************
 *
 * evolutility :: export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {},
    evoLangXpt = Evol.i18n.export;

Evol.ViewExport = Backbone.View.extend({

    version: '0.0.1',

    events: {
        "change .evol-xpt-format": "click_format",
        'change input': 'click_preview', //[type="checkbox"],
        'click .evol-xpt-more': 'click_toggle_sel',
        'click #XP': 'click_submit'
        // TODO #tbrevol-xpt-format is a bug if change prefix...
    },

    options: {
        toolbar: true,
        model: null,
        uiModel: null,
        many: true,
        style: 'normal',
        prefix: 'tbr'
    },

    viewName: "export",

    initialize: function (opts) {
        _.extend(this.options, opts);
        this.render();
        var e = this.$el;
        //###  html ###
        //e.addClass('Panel table table-bordered');
        e.addClass('Panel');
        this._preview('CSV');
        return this;
    },

    render: function(){
        this.$el.html(this._renderHTML());
        this._preview('CSV');
        return this;
    },

    _renderHTML: function () {
        var h = [],
            EvoUI = Evol.UI,
            opts = this.options,
            prefix = opts.prefix || '',
            fields = this.getFields();

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds"><fieldset>');
        //### list of columns to export #########################################
        h.push('<div class="evol-id">', EvoUI.fieldLabel('', evoLangXpt.ExportFields),
            //EvoUI.input.checkbox('showID','1'), '<label for="showID">', evoLangXpt.IDkey, '</label>',
            '</div>');
        for (var i = 0, iMax = fields.length; i < iMax; i++) {
            var f = fields[i],
                fLabel = f.label,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><input type="checkbox" value="1" id="', fID, '" checked="true"><label class="checkbox" for="', fID, '">', fLabel, '</label></div>');
            if (i == 10 && iMax > 14){
                h.push(EvoExport.html_more2(evoLangXpt.AllFields));
            }
        }
        if (iMax > 14){
            h.push('</div>');
        }
        h.push('</fieldset></div><div class="evol-xpt-para">'); // table = 2 columns
        //##### export formats ########################################
        var fId = prefix + 'evol-xpt-format',
            myLabels = evoLangXpt.ExportFormats.split('-');
        h.push('<label for="', fId, '">', evoLangXpt.ExportFormat, '</label>',
            EvoUI.input.select(fId,'evol-xpt-format', false, [
                {id: 'CSV', text: myLabels[0]},
                {id: 'TAB', text: myLabels[3]},
                {id: 'HTML', text: myLabels[1]},
                {id: 'JSON', text: myLabels[5]},
                {id: 'SQL', text: myLabels[2]},
                {id: 'XML', text: myLabels[4]}
            ])
        );
        h.push('<div class="evol-xpt-opts">');
        //# field (shared b/w formats - header #######
        fId = prefix + "FLH";
        h.push('<div class="evol-FLH clearfix">');
        //h.push('<label>', evoLangXpt.ExportHeader, '</label>');
        h.push(EvoUI.input.checkbox(fId, true), EvoUI.fieldLabelSpan(fId, evoLangXpt.ExportFirstLine));
        //##### CSV, TAB - First line for field names #######
        h.push('</div><div id="', prefix, 'CSV">');
        //# field - separator
        //# - csv - any separator #######
        h.push('<div data-id="csv2" class="evol-w120">',
            //EvoExport.html_more2('options'),
            //.evol-FLH
            EvoUI.fieldLabel('FLS_evol', evoLangXpt.ExportSeparator),
            EvoUI.input.text(prefix+'FLS_evol', ',', 0),
            '</div>'); // </div>
        h.push('</div>');
        _.each(['XML','HTML','SQL','JSON'], function(f){
            h.push('<div id="', prefix, f, '" style="display:none;"></div>');
        });
        h.push('</div>');
        //# Preview #######
        h.push('<label>Export Preview</label><div class="evol-xpt-preview"></div>');

        h.push('</div>');
        // ## Samples
        //h.push(this._samples());
        // ## Download button
        h.push('<div class="evol-buttons form-actions">');
        h.push('<input class="btn btn-primary" id="XP" type="submit" value="',
            evoLangXpt.DownloadEntity.replace('{0}', this.options.uiModel.entities),
            '"/>');
        h.push('</div></div>');
        return h.join('');
    },

    setModel: function(model){
        this.options.model=model;
    },

    showFormatOpts: function (xFormat) {
        var prefix = '#'+(this.options.prefix||''),
            e=this.$el;
        switch (xFormat) {
            case 'TAB':
                xFormat = 'CSV';
                this.$('[data-id="csv2"]').hide();
                break;
            case 'CSV':
                this.$('[data-id="csv2"]').show();
                break;
            case 'HTML':
            case 'XML':
            case 'SQL':
            case 'JSON':
                var c = this.$(prefix + xFormat);
                if (c.html() === '') {
                    c.html(EvoExport['form' + xFormat](this.options.uiModel.entity));
                }
                break;
        }
        var divOpts=this.$(prefix + xFormat).show()
            .siblings().hide();
        var e1=divOpts.filter('.evol-FLH');
        if(xFormat==='TAB' || xFormat==='CSV'){
            e1.show();
        }else{
            e1.hide();
        }
        EvoExport.cFormat = xFormat;
    },

    getFields: function (){
        var opts=this.options;
        if(!this.fields){
            this.fields=Evol.Dico.getFields(opts.uiModel,opts.fnFilter,opts.mode);
        }
        return this.fields;
    },

    getTitle: function(){
        if(this.options.many){
            return Evol.i18n.getLabel('export.ExportEntities', this.options.uiModel.entities);
        }else{
            return Evol.i18n.getLabel('export.ExportEntity', this.options.uiModel.entity);
        }
    },

    _preview: function (format) {
        var h=[];
        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
                fldsDomHash = {},
                prefix='#'+ this.options.prefix,
                useHeader = this.$(prefix+'FLH').prop('checked');

            h.push('<textarea class="Field evol-xpt-val form-control">');
            _.each(fldsDom, function(fd){
                fldsDomHash[fd.id.substring(3)]='';
            });
            flds=_.filter(flds, function(f){
                if(f.id && _.has(fldsDomHash, f.id)){
                    return true;
                }
            });
            switch (format) {
                case 'CSV':
                case 'TAB':
                case 'TXT':
                    var iMax=flds.length-1,
                        sep = Evol.UI.trim(this.$(prefix+'FLS_evol').val());
                    if(format=='TAB'){
                        sep='&#09;';
                    }
                    //header
                    if (useHeader) {
                        _.each(flds, function(f,idx){
                            h.push(f.label);
                            if(idx<iMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    }
                    //data
                    _.each(data, function(m){
                        _.each(flds, function(f,idx){
                            var mj = m.get(f.id);
                            if (mj) {
                                h.push(mj);
                            }
                            if(idx<iMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    });
                    h.push('\n');
                    break;
                case 'HTML':
                    //header
                    h.push('<table>\n');
                    if (useHeader) {
                        h.push('<tr>\n');
                        _.each(flds, function(f){
                            h.push('<th>', f.id, '</th>');
                        });
                        h.push('</tr>\n');
                    }
                    //data
                    _.each(data, function(d,idx){
                        h.push('<tr>');
                        _.each(flds, function(f){
                            var mj = d.get(f.id);
                            if (mj) {
                                h.push('<td>', mj, '</td>');
                            } else {
                                h.push('<td></td>');
                            }
                        });
                        h.push('</tr>\n');
                    });
                    h.push('</table>');
                    break;
                case 'JSON':
                    h.push(JSON.stringify(this.model.toJSON(), null, 2));
                    break;
                case 'SQL':
                    var fMax = flds.length -1,
                        optTransaction = this.$('#evoxpTRS1').prop('checked'),
                        optIdInsert = this.$('#evoxpTRS2').prop('checked'),
                        sqlTable = this.$('#evoTable').val().replace(/ /g,'_'),
                        sql = ['INSERT INTO ',sqlTable,' ('];

                    if(sqlTable===''){
                        sqlTable = this.options.uiModel.entity.replace(/ /g,'_');
                    }
                    _.each(flds, function(f,idx){
                        sql.push(f.id);
                        if(idx<fMax){
                            sql.push(', ');
                        }
                    });
                    sql.push(')\n VALUES (');
                    sql = sql.join('');
                    //options
                    if(optTransaction){
                        h.push('BEGIN TRANSACTION\n');
                    }
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ',sqlTable,' ON;\n');
                    }
                    //data
                    for (var i = 0, iMax1 = data.length; i < iMax1; i++) {
                        h.push(sql);
                        var m = data[i];
                        for (var j = 0, jMax = flds.length; j < jMax; j++) {
                            var mj = m.get(flds[j].id);
                            h.push('"', mj, '"');
                            if(j<fMax){
                                h.push(', ');
                            }
                        }
                        h.push(');\n');
                    }
                    //options
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ',sqlTable,' OFF;\n');
                    }
                    if(optTransaction){
                        h.push('COMMIT TRANSACTION\n');
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#evoRoot').val() || this.options.uiModel.entity.replace(/ /g,'_');
                    h.push('<xml>\n');
                    _.each(data, function(m){
                        h.push('<', elemName, ' ');
                        _.each(flds, function(f){
                            h.push(f.id, '="', m.get(f.id), '" ');
                        });
                        h.push('></', elemName, '>\n');
                    });
                    h.push('</xml>');
                    break;
            }
            h.push('</textarea>');
        }else{
            h.push(Evol.UI.HTMLMsg(Evol.i18n.nodata,'','info'));
        }
        this.$('.evol-xpt-preview')
            .html(h.join(''));
    },

    val: function (value) {
        if (typeof value == 'undefined') {
            return this._getValue();
        } else {
            this._setValue(value);
            return this;
        }
    },

    _ValFields: function () {
        var v = [],
            flds = this.$('.evol-xpt-flds input:checked').not('#showID');
        for (var i = 0, iMax = flds.length; i < iMax; i++) {
            var fe = $(flds[i]);
            v.push(fe.attr('id'));
        }
        return v;
    },
    _getValue: function () {
        var v = {
                format: this._bFormat.val(),
                fields: this._ValFields(),
                options: {}
            },
            ps = this.$('.evol-xpt-para input'),
            f = ps.eq(0),
            fv = f.attr('checked') !== 'undefined';
        v.options[f.attr('id')] = fv;
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.target).val();//this.$('.evol-xpt-format').val();
        if (format === 'XML') {
            this.$('#XML').html(EvoExport.formXML(this.options.uiModel.entity))
                .show()
                .siblings().not('.evol-FLH').hide();
            EvoExport.cFormat = 'XML';
        }
        this.showFormatOpts(format);
        this._preview(format);
        this.$el.trigger('change.export', 'format', format);//evt.currentTarget.val()
    },

    click_preview: function (evt) {
        var format = this.$('.evol-xpt-format').val();
        this._preview(format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget)
            .hide()
            .next().slideDown();
    },

    click_submit: function (evt) {
        this.$el.trigger('submit.export');
    }
});


var EvoExport = {

    cFormat: 'CSV',

    html_more2: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-xpt-more">', label, '</a><div style="display:none;">'
        ].join('');
    },

    formHTML: function () {
        return '';
    },

    formXML: function (entity) {
        return [
            EvoExport.html_more2('options'),
            EvoExport.formEntityName('evoRoot', evoLangXpt.xpXMLroot, entity),
            Evol.UI.fieldLabel('evoxpC2X', evoLangXpt.xpColMap),
            '</div>'
        ].join('');
    },

    formJSON: function () {
        return '';
    },

    formSQL: function (entity) {
        return [
            EvoExport.html_more2('options'),
            EvoExport.formEntityName('evoTable', evoLangXpt.xpSQLTable, entity),
            '<div>', Evol.UI.input.checkbox('evoxpTRS2', '0'), Evol.UI.fieldLabelSpan('evoxpTRS2', evoLangXpt.xpSQLId), '</div>',
            '<div>', Evol.UI.input.checkbox('evoxpTRS1', '0'), Evol.UI.fieldLabelSpan('evoxpTRS1', evoLangXpt.xpSQLTrans), '</div>',
            '</div>'
           ].join('');
    },

    formEntityName: function(id,label,entity){
        return [
            Evol.UI.fieldLabel(id, label),
            Evol.UI.input.text(id, entity.replace(' ', '_'), 30),'<br/>'
            ].join('');
    }

};

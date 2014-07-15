/*! ***************************************************************************
 *
 * evolutility :: action-export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var i18nXpt = Evol.i18n.export;

Evol.ViewAction.Export = Backbone.View.extend({

    viewName: 'export',
    cardinality: 'n',

    events: {
        "change .evol-xpt-format": "click_format",
        'change input': 'click_preview',
        'click .evol-xpt-more': 'click_toggle_sel',
        'click button': 'click_button'
    },

    options: {
        model: null,
        uiModel: null,
        many: true,
        sampleMaxSize: 20,
        prefix: 'xpt',
        formats: ['CSV', 'TAB', 'HTML', 'XML', 'SQL', 'JSON']
    },

    initialize: function (opts) {
        this.options = _.extend({}, this.options, opts);
        this.uiModel = this.options.uiModel;
        this.render();
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
            fields = this.getFields(),
            iMax = fields.length;

        //string fieldName, fieldlabel, expOut, buffer;
        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds"><fieldset>');

        //### list of columns to export #########################################
        h.push('<div class="evol-id">', EvoUI.label('', i18nXpt.xpFields),'</div>'/*,
            '<div>',EvoUI.input.checkbox('showID','1'), '<label for="showID">', i18nXpt.IDkey, '</label>','</div>'*/
        );
        _.each(fields, function(f, i){
            var fLabel = f.labelexport || f.label || f.labellist,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><label class="checkbox"><input type="checkbox" value="1" id="', fID, '" checked="checked">', fLabel, '</label></div>');
            if (i == 10 && iMax > 14){
                h.push(EvoExport.html_more2(i18nXpt.allFields));
            }
        });
        if (iMax > 14){
            h.push('</div>');
        }

        h.push('</fieldset></div><div class="evol-xpt-para">'); // table = 2 columns
        //##### export formats ########################################
        var fId = prefix + 'evol-xpt-format',
            formatsList = [];//.split('-');
        h.push('<label for="', fId, '">', i18nXpt.format, '</label>');
        _.each(opts.formats, function(format){
            formatsList.push({id: format, text: i18nXpt['format'+format]});
        });
        h.push(EvoUI.input.select(fId, '', 'evol-xpt-format', false, formatsList));
        fId = prefix + "FLH";
        h.push('<div class="evol-xpt-opts">',
            //# field (shared b/w formats - header #######
            '<div class="evol-FLH clearfix">',
            //h.push('<label>', i18nXpt.header, '</label>');
            '<label>', EvoUI.input.checkbox(fId, true), i18nXpt.firstLine, '</label>',
            //##### CSV, TAB - First line for field names #######
            '</div><div id="', prefix, 'CSV">',
            //# field - separator
            //# - csv - any separator #######
            '<div data-id="csv2" class="evol-w120">',
            //EvoExport.html_more2('options'),
            //.evol-FLH
            EvoUI.fieldLabel('FLS_evol', i18nXpt.separator),
            EvoUI.input.text(prefix+'FLS_evol', ',', 0),
            '</div>', // </div>
        '</div>');
        _.each(['XML','HTML','SQL','JSON'], function(f){
            h.push('<div id="', prefix, f, '" style="display:none;"></div>');
        });
        h.push('</div>',
            //# Preview #######
            '<label>',i18nXpt.preview,'</label><div class="evol-xpt-preview">',
            // ## Samples
            '<textarea class="Field evol-xpt-val form-control"></textarea>',
            '</div></div></div></div>',
            // ## Download button
            '<div class="evol-buttons form-actions">',
                EvoUI.input.button('cancel', Evol.i18n.Cancel, 'btn-default'),
                EvoUI.input.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.entities), 'btn btn-primary'),
            '</div>'
        );
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
                    c.html(EvoExport['opts' + xFormat](this.uiModel.entity));
                }
                break;
        }
        var divOpts=this.$(prefix + xFormat).show()
            .siblings().hide();
        var $e1=divOpts.filter('.evol-FLH');
        Evol.UI.setVisible($e1, xFormat==='TAB' || xFormat==='CSV');
        EvoExport.cFormat = xFormat;
    },

    getFields: function (){
        var opts=this.options;
        if(!this.fields){
            this.fields=Evol.Dico.getFields(this.uiModel, opts.fnFilter, opts.mode);
        }
        return this.fields;
    },

    getTitle: function(){
        if(this.options.many){
            return Evol.i18n.getLabel('export.ExportEntities', this.uiModel.entities);
        }else{
            return Evol.i18n.getLabel('export.ExportEntity', this.uiModel.entity);
        }
    },

    _preview: function (format) { // TODO add field ID
        var h=[],
            $e = this.$('.evol-xpt-val'),
            fTypes = Evol.Dico.fieldTypes,
            maxItem = this.options.sampleMaxSize-1;

        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'),
                fldsDomHash = {},
                prefix='#'+ this.options.prefix,
                useHeader = this.$(prefix+'FLH').prop('checked');
                //showID=this.$('#showID').prop('checked');

            //if(showID){
            //    flds.unshift({id: 'id', type: 'text', label: 'Id'});
            //}
            _.each(fldsDom, function(fd){
                fldsDomHash[fd.id.substring(3)]='';
            });
            flds = _.filter(flds, function(f){
                if(f.id && _.has(fldsDomHash, f.id)){
                    return true;
                }
            });
            var fMax = flds.length-1;
            switch (format){
                case 'CSV':
                case 'TAB':
                case 'TXT':
                    var sep = Evol.UI.trim(this.$(prefix+'FLS_evol').val());
                    if(format=='TAB'){
                        sep='&#09;';
                    }
                    //header
                    if (useHeader) {
                        _.each(flds, function(f, idx){
                            h.push(f.label); //TODO f.labelexported || f.label, // name when "exported"
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    }
                    //data
                    _.every(data, function(m, idx){
                        _.each(flds, function(f, idx){
                            var mj = m.get(f.id);
                            if (mj) {
                                h.push(mj);
                            }
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                        return idx<maxItem;
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
                    _.every(data, function(d, idx){
                        h.push('<tr>');
                        _.each(flds, function(f){
                            var mj = d.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h.push('<td>', mj, '</td>');
                            } else {
                                h.push('<td></td>');
                            }
                        });
                        h.push('</tr>\n');
                        return idx<maxItem;
                    });
                    h.push('</table>');
                    break;
                case 'JSON':
                    _.every(data, function(m, idx){
                        // TODO only show selected fields
                        h.push(JSON.stringify(m.toJSON(), null, 2));
                        return idx<maxItem;
                    });
                    break;
                case 'SQL':
                    var optTransaction = this.$('#evoxpTRS1').prop('checked'),
                        optIdInsert = this.$('#evoxpTRS2').prop('checked'),
                        sqlTable = this.$('#evoTable').val().replace(/ /g,'_'),
                        sql = ['INSERT INTO ',sqlTable,' ('];

                    if(sqlTable===''){
                        sqlTable = this.uiModel.entity.replace(/ /g,'_');
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
                        h.push('SET IDENTITY_INSERT ', sqlTable, ' ON;\n');
                    }
                    //data
                    var fValue;
                    _.every(data, function(m, idx){
                        h.push(sql);
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fTypes.int:
                                case fTypes.dec:
                                case fTypes.money:
                                    h.push(fValue?fValue:'NULL');
                                    break;
                                case fTypes.bool:
                                    h.push((typeof fValue === 'boolean')?fValue:'NULL');
                                    break;
                                case fTypes.date:
                                case fTypes.datetime:
                                case fTypes.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                                    break;
                                default:
                                    if(_.isUndefined(fValue)){
                                        h.push('""');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                            }
                            if(idx<fMax){
                                h.push(', ');
                            }
                        });
                        h.push(');\n');
                        return idx<maxItem;
                    });
                    //options
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT ', sqlTable, ' OFF;\n');
                    }
                    if(optTransaction){
                        h.push('COMMIT TRANSACTION\n');
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#evoRoot').val() || this.uiModel.entity.replace(/ /g,'_'),
                        fv;
                    h.push('<xml>\n');
                    _.every(data, function(m, idx){
                        h.push('<', elemName, ' ');
                        _.each(flds, function(f){
                            h.push(f.id, '="');
                            if(f.type===fTypes.text || f.type===fTypes.textml){
                                fv=m.get(f.id);
                                if(!_.isUndefined(fv)){
                                    h.push(fv.replace(/"/g, '\\"'));
                                }
                            }else{
                                h.push(m.get(f.id));
                            }
                            h.push('" ');
                        });
                        h.push('></', elemName, '>\n');
                        return idx<maxItem;
                    });
                    h.push('</xml>');
                    break;
            }
        }else{
            h.push(Evol.i18n.nodata);
        }
        if(this.options.many && format==='JSON'){
            $e.html('['+h.join(',\n')+']');
        }else{
            $e.html(h.join(''));
        }
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            return this._getValue();
        } else {
            // TODO implement setvalue?
            //this._setValue(value);
            return this;
        }
    },

    _valFields: function () {
        var v = [],
            flds = this.$('.evol-xpt-flds input:checked');//.not('#showID')
        _.each(flds, function(fe){
            v.push(fe.id.substr(3));
        });
        return v;
    },

    _getValue: function () {
        var v = {
                format: EvoExport.cFormat,
                fields: this._valFields(),
                options: {}
            },
            ps = this.$('.evol-xpt-para input'),
            f = ps.eq(0),
            fv = !_.isUndefined(f.prop('checked'));
        v.options[f.attr('id')] = fv;
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();//this.$('.evol-xpt-format').val();
        if (format === 'XML') {
            this.$('#XML').html(EvoExport.optsXML(this.uiModel.entity))
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

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        this.$el.trigger('action', bId);
    }
});


var EvoExport = {

    cFormat: 'CSV',

    html_more2: function (label) {
        return [
            '<a href="javascript:void(0)" class="evol-xpt-more">', label, '</a><div style="display:none;">'
        ].join('');
    },

    optsHTML: function(){
        return '';
    },

    optsXML: function(entity){
        return [
            EvoExport.html_more2('options'),
            EvoExport.optEntityName('evoRoot', i18nXpt.XMLroot, entity),
            Evol.UI.fieldLabel('evoxpC2X', i18nXpt.xpColMap),
            '</div>'
        ].join('');
    },

    optsJSON: function(){
        return '';
    },

    optsSQL: function(entity){
        return [
            EvoExport.html_more2('options'),
            EvoExport.optEntityName('evoTable', i18nXpt.SQLTable, entity),
            '<div>', Evol.UI.input.checkbox('evoxpTRS2', '0'), Evol.UI.fieldLabelSpan('evoxpTRS2', i18nXpt.SQLId), '</div>',
            '<div>', Evol.UI.input.checkbox('evoxpTRS1', '0'), Evol.UI.fieldLabelSpan('evoxpTRS1', i18nXpt.SQLTrans), '</div>',
            '</div>'
           ].join('');
    },

    optEntityName: function(id,label,entity){
        return [
            Evol.UI.fieldLabel(id, label),
            Evol.UI.input.text(id, entity.replace(' ', '_'), 30),'<br/>'
            ].join('');
    }

};

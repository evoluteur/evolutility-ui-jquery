/*! ***************************************************************************
 *
 * evolutility :: action-export.js
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewAction.Export = function(){

    var eUI = Evol.UI,
        eDico = Evol.Dico,
        fts = eDico.fieldTypes,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        i18nXpt = i18n.export;

    var EvoExport = {

        optEntityName: function(id,label,entity){
            return eUI.fieldLabel(id, label) +
                uiInput.text(id, entity.replace(/ /g, '_'), 30) +
                '<br>';
        },

        optsXML: function(entity){
            return this.html_more2(i18nXpt.options)+
                this.optEntityName('elementName', i18nXpt.XMLroot, entity)+
                '</div>';
        },

        optsSQL: function(entity){
            return this.html_more2(i18nXpt.options)+
                this.optEntityName('table', i18nXpt.SQLTable, entity)+
                '<div>'+uiInput.checkbox('insertId', '0')+eUI.fieldLabelSpan('insertId', i18nXpt.SQLIdInsert)+'</div>'+
                '<div>'+uiInput.checkbox('transaction', '0')+eUI.fieldLabelSpan('transaction', i18nXpt.SQLTrans)+'</div>'+
                '</div>';
        },

        optsHTML: function(){
            return '';
        },

        optsJSON: function(){
            return '';
        },

        html_more2: function (label) {
            return '<a href="javascript:void(0)" class="evol-xpt-more">' + label + '</a><div style="display:none;">';
        }

    };

return Backbone.View.extend({

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
        formats: ['CSV', 'TAB', 'HTML', 'JSON', 'XML', 'SQL']
    },

    initialize: function (opts) {
        _.extend(this, this.options, opts);
        return this;
    },

    render: function(){
        this.$el.html(this._renderHTML());
        this._preview(this.formats[0]);
        return this;
    },

    _renderHTML: function () {
        var h = [],
            formats = this.formats,
            fields = this.getFields(),
            iMax = fields.length,
            useMore = iMax > 14;

        h.push('<div class="evol-xpt-form"><div class="evol-xpt-flds">'+
            '<div><label>'+i18nXpt.xpFields+'</label></div>'+
            '<fieldset class="checkbox">');

        //### list of columns to export #########################################
        h.push('<div><label><input type="checkbox" value="1" id="showID">'+i18nXpt.IDkey+'</label></div>');
        _.each(fields, function(f, idx){
            var fLabel = f.labelexport || f.label || f.labellist,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h.push('<div><label><input type="checkbox" value="1" id="'+fID+'" checked="checked">'+fLabel+'</label></div>');
            if (idx === 10 && useMore){
                h.push(EvoExport.html_more2(i18nXpt.allFields));
            }
        });
        if (useMore){
            h.push('</div>');
        }
        h.push('</fieldset></div><div class="evol-xpt-para">');
        //##### export formats ########################################
        var fId = 'evol-xpt-format',
            formatsList = _.map(formats, function(format){
                    return {
                        id: format,
                        text: i18nXpt['format'+format]
                    };
                });
        h.push('<label for="'+fId+'">'+i18nXpt.format+'</label>');
        h.push(uiInput.select(fId, '', 'evol-xpt-format', false, formatsList));
        fId = 'xptFLH';
        h.push('<div class="evol-xpt-opts">'+
            //# field (shared b/w formats - header #######
            '<div class="evol-FLH clearfix">'+
            '<label>'+uiInput.checkbox(fId, true)+i18nXpt.firstLine+'</label>'+
            //##### CSV, TAB - First line for field names #######
            '</div><div id="xptCSV">'+
            //# field - separator
            //# - csv - any separator #######
            '<div data-id="csv2" class="evol-w120">'+
            eUI.fieldLabel('separator', i18nXpt.separator)+
            uiInput.text('separator', ',', '0')+
            '</div>'+ // </div>
        '</div>');
        _.each(formats, function(f){
            h.push('<div id="xpt'+f+'" style="display:none;"></div>');
        });
        h.push('</div>'+
            //# Preview #######
            '<label>'+i18nXpt.preview+'</label><div class="evol-xpt-preview">'+
            // ## Samples
            '<textarea class="evol-xpt-val form-control"></textarea>'+
            '</div></div></div></div>'+
            // ## Download button
            '<div class="evol-buttons form-actions">'+
                eUI.button('cancel', i18n.bCancel, 'btn-default')+
                eUI.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.entities), 'btn btn-primary')+
            '</div>'
        );
        return h.join('');
    },

    setModel: function(model){
        this.model = model;
    },

    showFormatOpts: function (xFormat) {
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
                var c = this.$('#xpt' + xFormat);
                if (c.html() === '') {
                    c.html(EvoExport['opts' + xFormat](this.uiModel.entity));
                }
                break;
        }
        var divOpts = this.$('#xpt' + xFormat).show()
            .siblings().hide();
        var $e1 = divOpts.filter('.evol-FLH');
        eUI.setVisible($e1, xFormat==='TAB' || xFormat==='CSV' || xFormat==='HTML');
    },

    getFields: function (){
        if(!this.fields){
            this.fields=eDico.getFields(this.uiModel);
        }
        return this.fields;
    },

    getTitle: function(){
        var keyEnd=this.many?'ies':'y';
        return i18n.getLabel('export.ExportEntit'+keyEnd, this.uiModel['entit'+keyEnd]);
    },

    _preview: function (format) {
        this.$('.evol-xpt-val').html(this.exportContent(format));
    },

    exportContent: function(format){
        var h=[],
            maxItem = this.sampleMaxSize-1;

        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                flds = this.getFields(),
                fldsDom = this.$('.evol-xpt-flds > fieldset input:checked'), //_valFields
                fldsDomHash = {},
                useHeader = this.$('#xptFLH').prop('checked'),
                showID = this.$('#showID').prop('checked');

            _.each(fldsDom, function(f){
                fldsDomHash[f.id.substring(3)]='';
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
                    var sep = eUI.trim(this.$('#separator').val());
                    if(format=='TAB'){
                        sep='&#09;';
                    }
                    // -- header
                    if (useHeader) {
                        if(showID){
                            h.push('ID'+sep);
                        }
                        _.each(flds, function(f, idx){
                            h.push(f.label);
                            if(idx<fMax){
                                h.push(sep);
                            }
                        });
                        h.push('\n');
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        if(showID){
                            h.push(m.id+sep);
                        }
                        _.each(flds, function(f, idx){
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fts.bool){
                                    h.push(mv);
                                    //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fts.text || f.type==fts.textml) && (mv.indexOf(',')>-1)){ // || f.type==fts.list
                                    h.push('"'+mv.replace('"', '\\"')+'"');
                                }else{
                                    h.push(mv);
                                }
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
                    // -- header
                    h.push('<table>\n');
                    if (useHeader) {
                        h.push('<tr>\n');
                        if(showID){
                            h.push('<th>ID</th>');
                        }
                        _.each(flds, function(f){
                            h.push('<th>'+f.label+'</th>');
                        });
                        h.push('\n</tr>\n');
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        h.push('<tr>\n');
                        if(showID){
                            h.push('<td>'+m.id+'</td>');
                        }
                        _.each(flds, function(f){
                            var mj = m.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h.push('<td>'+mj+'</td>');
                            } else {
                                h.push('<td></td>');
                            }
                        });
                        h.push('\n</tr>\n');
                        return idx<maxItem;
                    });
                    h.push('</table>\n');
                    break;
                case 'JSON':
                    var propList= _.map(flds, function(f){
                        return f.id;
                    });
                    if(showID){
                        propList.unshift('id');
                    }
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    break;
                case 'SQL':
                    var optTransaction = this.$('#transaction').prop('checked'),
                        optIdInsert = this.$('#insertId').prop('checked'),
                        sqlTable = this.$('#table').val().replace(/ /g,'_'),
                        sql = ['INSERT INTO '+sqlTable+' ('];

                    if(sqlTable===''){
                        sqlTable = this.uiModel.entity.replace(/ /g,'_');
                    }
                    if(showID){
                        sql.push('ID, ');
                    }
                    _.each(flds, function(f,idx){
                        sql.push(f.id);
                        if(idx<fMax){
                            sql.push(', ');
                        }
                    });
                    sql.push(')\n VALUES (');
                    sql = sql.join('');
                    // -- options
                    if(optTransaction){
                        h.push('BEGIN TRANSACTION\n');
                    }
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT '+sqlTable+' ON;\n');
                    }
                    // -- data
                    var fValue;
                    _.every(data, function(m, idx){
                        h.push(sql);
                        if(showID){
                            h.push('"', m.id, '", ');
                        }
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fts.int:
                                case fts.dec:
                                case fts.money:
                                    h.push(fValue?fValue:'NULL');
                                    break;
                                case fts.bool:
                                    h.push((typeof fValue === 'boolean')?fValue:'NULL');
                                    break;
                                case fts.date:
                                case fts.datetime:
                                case fts.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h.push('NULL');
                                    }else{
                                        h.push('"', fValue.replace(/"/g, '""'), '"');
                                    }
                                    break;
                                case fts.list:
                                    if(_.isUndefined(fValue) || fValue===''|| (_.isArray(fValue) && fValue.length===0)){
                                        h.push('NULL');
                                    }else{
                                        h.push('"'+eDico.HTMLField4Many(f, fValue, Evol.hashLov, '').replace(/"/g, '""')+'"');
                                    }
                                    break;
                                default:
                                    if(_.isUndefined(fValue)){
                                        h.push('""');
                                    }else{
                                        h.push('"'+fValue.replace(/"/g, '""')+'"');
                                    }
                            }
                            if(idx<fMax){
                                h.push(', ');
                            }
                        });
                        h.push(');\n');
                        return idx<maxItem;
                    });
                    // -- options
                    if(optIdInsert){
                        h.push('SET IDENTITY_INSERT '+sqlTable+' OFF;\n');
                    }
                    if(optTransaction){
                        h.push('COMMIT TRANSACTION\n');
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#elementName').val() || this.uiModel.entity.replace(/ /g,'_'),
                        fv;
                    h.push('<xml>\n');
                    _.every(data, function(m, idx){
                        h.push('<'+elemName+' ');
                        if(showID){
                            h.push('ID="'+m.id+'" ');
                        }
                        _.each(flds, function(f){
                            h.push(f.id, '="');
                            if(f.type===fts.text || f.type===fts.textml){
                                fv=m.get(f.id);
                                if(!_.isArray(fv) && !_.isUndefined(fv)){
                                    h.push(fv.replace(/"/g, '\\"'));
                                }
                            }else{
                                h.push(m.get(f.id));
                            }
                            h.push('" ');
                        });
                        h.push('></'+elemName+'>\n');
                        return idx<maxItem;
                    });
                    h.push('</xml>');
                    break;
            }
        }else{
            h.push(i18n.nodata);
        }
        if(format==='JSON' && this.many){
            return '['+h.join(',\n')+']';
        }
        return h.join('');
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            var format = this.$('#evol-xpt-format').val(),
                v = {
                    format: format,
                    fields: this._valFields(),
                    options: {}
                },
                fvs=this.$('#xpt'+format+' input');

            for(var i=0,iMax=fvs.length;i<iMax;i++){
                var $f=fvs.eq(i),
                    fv;
                if($f.attr('type')==='checkbox'){
                    fv = $f.prop('checked');
                }else{
                    fv = $f.val();
                }
                v.options[$f.attr('id')] = fv;
            }
            if(v.format==='CSV' || v.format==='TAB' || v.format==='HTML'){
                v.options.firstLineHeader = this.$('#xptFLH').prop('checked');
                if(v.format==='TAB'){
                    delete v.options.separator;
                }
            }else if(v.format==='HTML'){
                delete v.options;
            }
            return v;
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
            v.push(fe.id.substr(3)); // remove prefix "xpt"
        });
        return v;
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();
        if (format === 'XML') {
            this.$('#XML').html(EvoExport.optsXML(this.uiModel.entity))
                .show()
                .siblings().not('.evol-FLH').hide();
        }
        this.showFormatOpts(format);
        this._preview(format);
        this.$el.trigger('change.export', 'format', format);
    },

    click_preview: function (evt) {
        var format = this.$('.evol-xpt-format').val();
        this._preview(format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget).hide()
            .next().slideDown();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        this.$el.trigger('action', bId);
    }
});

}();

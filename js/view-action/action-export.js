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
                uiInput.text(id, entity.replace(/ /g, '_'), 30);
        },

        optsXML: function(entity){
            return '<div>'+//this.html_more2(i18nXpt.options)+
                this.optEntityName('elementName', i18nXpt.XMLroot, entity)+
                '</div>';
        },

        optsSQL: function(entity){
            return '<div>'+//this.html_more2(i18nXpt.options)+
                this.optEntityName('table', i18nXpt.SQLTable, entity)+
                '<div class="evo-inline-holder">'+
                    //'<div>'+uiInput.checkbox('insertId', '0')+eUI.fieldLabelSpan('insertId', i18nXpt.SQLIdInsert)+'</div>'+
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
        'change .evol-xpt-format': 'click_format',
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
        var h = '',
            formats = this.formats,
            fields = this.getFields(),
            iMax = fields.length,
            useMore = iMax > 14;

        h+='<div class="evol-xpt panel '+this.style+'"><div class="evol-xpt-form clearfix"><div class="evol-xpt-flds">'+
            '<div><label>'+i18nXpt.xpFields+'</label></div>'+
            '<fieldset class="checkbox">';

        //### list of columns to export #########################################
        h+='<div><label><input type="checkbox" value="1" id="showID">'+i18nXpt.IDkey+'</label></div>';
        _.each(fields, function(f, idx){
            var fLabel = f.labelexport || f.label || f.labellist,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h+='<div><label><input type="checkbox" value="1" id="'+fID+'" checked="checked">'+fLabel+'</label></div>';
            if (idx === 10 && useMore){
                h+=EvoExport.html_more2(i18nXpt.allFields);
            }
        });
        if (useMore){
            h+='</div>';
        }
        h+='</fieldset></div><div class="evol-xpt-para">';
        //##### export formats ########################################
        var fId = 'evol-xpt-format',
            formatsList = _.map(formats, function(format){
                    return {
                        id: format,
                        text: i18nXpt['format'+format]
                    };
                });
        h+='<label for="'+fId+'">'+i18nXpt.format+'</label>'+
            uiInput.select(fId, '', 'evol-xpt-format', false, formatsList);
        fId = 'xptFLH';
        h+='<div class="evol-xpt-opts">'+
            //# field (shared b/w formats - header #######
            '<div class="evol-FLH clearfix">'+
                '<label>'+uiInput.checkbox(fId, true)+i18nXpt.firstLine+'</label>'+
            //##### CSV, TAB - First line for field names #######
            '</div><div id="xptCSV" class="evol-xpt-opt">'+
                //# field - separator
                //# - csv - any separator #######
                '<div data-id="csv2" class="evol-w120">'+
                eUI.fieldLabel('separator', i18nXpt.separator)+
                uiInput.text('separator', ',', '0')+
                '</div>'+ // </div>
            '</div>';
        _.each(formats, function(f){
            h+='<div id="xpt'+f+'" style="display:none;"></div>';
        });
        h+='</div>'+
            //# Preview #######
            '<label>'+i18nXpt.preview+'</label><div class="evol-xpt-preview">'+
            // ## Samples
            '<textarea class="evol-xpt-val form-control"></textarea>'+
            '</div></div></div></div>'+
            // ## Download button
            '<div class="panel '+this.style +' evol-buttons form-actions">'+
                eUI.button('cancel', i18n.tools.bCancel, 'btn-default')+
                eUI.button('export', i18nXpt.DownloadEntity.replace('{0}', this.uiModel.namePlural), 'btn btn-primary')+
            '</div>'+
            '</div>';
        return h;
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
                    c.html(EvoExport['opts' + xFormat](this.uiModel.name));
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
            this.fields=eDico.getFields(this.uiModel, function(f){
                return _.isUndefined(f.inExport) || f.inExport;
            });
        }
        return this.fields;
    },

    getTitle: function(){
        if(this.many){
            return i18n.getLabel('export.ExportMany', this.uiModel.namePlural);
        }else{
            return i18n.getLabel('export.ExportOne', this.uiModel.name);
        }
    },

    setTitle: function(){
        eDico.setViewTitle(this);
    },

    _preview: function (format) {
        this.$('.evol-xpt-val').html(this.exportContent(format));
    },

    exportContent: function(format){
        var h='',
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
                            h+='ID'+sep;
                        }
                        _.each(flds, function(f, idx){
                            h+=f.label;
                            if(idx<fMax){
                                h+=sep;
                            }
                        });
                        h+='\n';
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        if(showID){
                            h+=m.id+sep;
                        }
                        _.each(flds, function(f, idx){
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fts.bool){
                                    h+=mv;
                                    //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fts.text || f.type==fts.textml) && (mv.indexOf(',')>-1)){ // || f.type==fts.list
                                    h+='"'+mv.replace('"', '\\"')+'"';
                                }else{
                                    h+=mv;
                                }
                            }
                            if(idx<fMax){
                                h+=sep;
                            }
                        });
                        h+='\n';
                        return idx<maxItem;
                    });
                    h+='\n';
                    break;
                case 'HTML':
                    // -- header
                    h='<table>\n';
                    if (useHeader) {
                        h+='<tr>\n';
                        if(showID){
                            h+='<th>ID</th>';
                        }
                        _.each(flds, function(f){
                            h+='<th>'+f.label+'</th>';
                        });
                        h+='\n</tr>\n';
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        h+='<tr>\n';
                        if(showID){
                            h+='<td>'+m.id+'</td>';
                        }
                        _.each(flds, function(f){
                            var mj = m.get(f.id);
                            if (!_.isUndefined(mj) && mj!=='') {
                                h+='<td>'+mj+'</td>';
                            } else {
                                h+='<td></td>';
                            }
                        });
                        h+='\n</tr>\n';
                        return idx<maxItem;
                    });
                    h+='</table>\n';
                    break;
                case 'JSON':
                    var propList= _.map(flds, function(f){
                        return f.id;
                    });
                    if(showID){
                        propList.unshift('id');
                    }
                    h=[];
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    if(format==='JSON' && this.many){
                        h = '['+h.join(',\n')+']';
                    }else{
                        h = h.join('');
                    }
                    break;
                case 'SQL':
                    var optTransaction = this.$('#transaction').prop('checked'),
                        optIdInsert = this.$('#insertId').prop('checked'),
                        crlf = '\n',
                        sqlTable = this.$('#table').val().replace(/ /g,'_'),
                        sql = 'INSERT INTO '+sqlTable+' (',
                        //db = 'postgres',//'sqlserver'
                        formatString, emptyString, sNull, beginTrans, commitTrans;
/*
                    switch(db){
                        case 'postgres':*/
                            formatString = function(v){
                                if(_.isUndefined(v) || v===null){
                                    return "''";
                                }else{
                                    return "'"+v.replace(/'/g, "''")+"'";
                                }
                            };
                            sNull='null';
                            emptyString="''";
                            beginTrans='BEGIN;';
                            commitTrans='COMMIT;';/*
                            break;
                        case 'sqlserver':
                            formatString = function(v){
                                return '"'+v.replace(/"/g, '""')+'"';
                            };
                            sNull='NULL';
                            emptyString='""';
                            beginTrans='BEGIN TRANSACTION';
                            commitTrans='COMMIT TRANSACTION';
                            break;
                    }*/
                    if(sqlTable===''){
                        sqlTable = this.uiModel.table || this.uiModel.id;//this.uiModel.name.replace(/ /g,'_');
                    }
                    if(showID){
                        sql+='ID, ';
                    }
                    _.each(flds, function(f,idx){
                        sql+=f.id;
                        if(idx<fMax){
                            sql+=', ';
                        }
                    });
                    sql+=')\n VALUES (';
                    // -- options
                    if(optTransaction){
                        h+=beginTrans+crlf;
                    }
                    if(optIdInsert){
                        h+='SET IDENTITY_INSERT '+sqlTable+' ON;'+crlf;
                    }
                    // -- data
                    var fValue;
                    _.every(data, function(m, idx){
                        h+=sql;
                        if(showID){
                            h+=formatString(fValue)+', ';
                        }
                        _.each(flds, function(f, idx){
                            fValue=m.get(f.id);
                            switch(f.type){
                                case fts.int:
                                case fts.dec:
                                case fts.money:
                                    h+=fValue?fValue:sNull;
                                    break;
                                case fts.bool:
                                    h+=(typeof fValue === 'boolean')?fValue:sNull;
                                    break;
                                case fts.date:
                                case fts.datetime:
                                case fts.time:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h+=sNull;
                                    }else{
                                        h+=formatString(fValue);
                                    }
                                    break;
                                case fts.list:
                                    if(_.isUndefined(fValue) || fValue===''|| (_.isArray(fValue) && fValue.length===0)){
                                        h+=sNull;
                                    }else if(_.isNumber(fValue)){
                                        h+=fValue;
                                    }else{
                                        h+=formatString(eDico.fieldHTML_ReadOny(f, fValue, Evol.hashLov, ''));
                                    }
                                    break;
                                default:
                                    if(_.isUndefined(fValue)||fValue===''){
                                        h+=emptyString;
                                    }else if(_.isNumber(fValue)){
                                        h+=fValue;
                                    }else{
                                        h+=formatString(fValue);
                                    }
                            }
                            if(idx<fMax){
                                h+=', ';
                            }
                        });
                        h+=');\n';
                        return idx<maxItem;
                    });
                    // -- options
                    if(optIdInsert){
                        h+='SET IDENTITY_INSERT '+sqlTable+' OFF;'+crlf;
                    }
                    if(optTransaction){
                        h+=commitTrans+crlf;
                    }
                    break;
                case 'XML':
                    var elemName = this.$('#elementName').val() || this.uiModel.name.replace(/ /g,'_'),
                        fv;

                    h='<xml>\n';
                    _.every(data, function(m, idx){
                        h+='<'+elemName+' ';
                        if(showID){
                            h+='ID="'+m.id+'" ';
                        }
                        _.each(flds, function(f){
                            h+=f.id+'="';
                            if(f.type===fts.text || f.type===fts.textml){
                                fv=m.get(f.id);
                                if(!_.isArray(fv) && !_.isUndefined(fv)){
                                    h+=fv.replace(/"/g, '\\"');
                                }
                            }else{
                                h+=m.get(f.id);
                            }
                            h+='" ';
                        });
                        h+='></'+elemName+'>\n';
                        return idx<maxItem;
                    });
                    h+='</xml>';
                    break;
            }
        }else{
            h+=i18n.nodata;
        }
        return h;
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
            this.$('#XML').html(EvoExport.optsXML(this.uiModel.name))
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

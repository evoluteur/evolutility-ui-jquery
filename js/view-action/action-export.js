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
        fts = Evol.Def.fieldTypes,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        i18nXpt = i18n.export;

return Backbone.View.extend({

    viewName: 'export',
    cardinality: 'n',

    events: {
        'change .evol-xpt-format': 'click_format',
        'change input, .evol-xpt-db': '_preview',
        'click .evol-xpt-more': 'click_toggle_sel',
        'click button': 'click_button'
    },

    options: {
        model: null,
        uiModel: null,
        many: true,
        sampleMaxSize: 20,
        formats: ['CSV', 'TAB', 'JSON', 'HTML', 'XML', 'SQL']
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
        h+='<label><input type="checkbox" value="1" id="showID">'+i18nXpt.IDkey+'</label>';
        _.each(fields, function(f, idx){
            var fLabel = f.labelExport || f.label || f.labelList,
                fID = 'fx-' + f.id;
            if (fLabel === null || fLabel === '') {
                fLabel = '(' + fID + ')';
            }
            h+='<label><input type="checkbox" value="1" id="'+fID+'" checked="checked">'+fLabel+'</label>';
            if (idx === 10 && useMore){
                h+='<a href="javascript:void(0)" class="evol-xpt-more">' + i18nXpt.allFields+ '</a><div style="display:none;">';
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
                '</div>'+
            '</div>';
        _.each(formats, function(f){
            h+='<div id="xpt'+f+'" style="display:none;"></div>';
        });
        h+='</div>'+
            //# Preview #######
            '<label>'+i18nXpt.preview+'</label>'+
            // ## Samples
            '<textarea class="evol-xpt-val form-control"></textarea>'+
            '</div></div></div>'+
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
        if(xFormat==='TAB') {
            xFormat = 'CSV';
            this.$('[data-id="csv2"]').hide();
        }else if(xFormat==='CSV'){
            this.$('[data-id="csv2"]').show();
        }else{
            this.$('#xpt' + xFormat)
                .html(this._formatOptions(xFormat, this.uiModel.name));
        }
        var divOpts = this.$('#xpt' + xFormat).show()
            .siblings().hide();
        eUI.showOrHide(divOpts.filter('.evol-FLH'), xFormat==='TAB' || xFormat==='CSV' || xFormat==='HTML');
        return this;
    },

    getFields: function (){
        if(!this.fields){
            this.fields=Evol.Def.getFields(this.uiModel, function(f){
                // todo: allow formula fields & provide value in export
                return f.type!=fts.formula && f.type!=fts.json && (_.isUndefined(f.inExport) || f.inExport);
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

    _preview: function () {
        this.$('.evol-xpt-val').val(
            this.exportContent(this.val())
        );
    },

    exportContent: function(params){
        var h='',
            options = params.options,
            maxItem = this.sampleMaxSize-1;

        if(this.model && this.model.collection){
            var data = this.model.collection.models,
                fldsDomHash = {};

            _.each(params.fields, function(fid){
                fldsDomHash[fid]='';
            });
            var flds = _.filter(this.getFields(), function(f){
                if(f.id && _.has(fldsDomHash, f.id)){
                    return true;
                }
            });
            var fMax = flds.length-1;
            switch (params.format){
                case 'CSV':
                case 'TAB':
                case 'TXT':
                    var sep = Evol.Format.trim(this.$('#separator').val());
                    if(params.format=='TAB'){
                        sep='\t'; //sep='&#09;';
                    }
                    // -- header
                    if (options.firstLineHeader) {
                        if(options.showID){
                            h+='ID'+sep;
                        }
                        _.each(flds, function(f, idx){
                            h+=f.labelExport || f.label;
                            if(idx<fMax){
                                h+=sep;
                            }
                        });
                        h+='\n';
                    }
                    // -- data
                    _.every(data, function(m, idx){
                        if(options.showID){
                            h+=(m.id||('m'+idx))+sep;
                        }
                        _.each(flds, function(f, idx){
                            var mv = m.get(f.id);
                            if (mv) {
                                if(f.type===fts.bool){
                                    h+=mv;
                                    //}else if((_.isArray(mv) && mv.length>1)|| (mv.indexOf(',')>-1)){
                                }else if((f.type==fts.text || f.type==fts.textml) && (mv.indexOf(',')>-1)){
                                    h+=mv ? '"'+mv.replace('"', '\\"')+'"' : '""';
                                }else if(f.type==fts.list){
                                    h+=mv ? '"'+mv+'"' : '""';
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
                    if (options.firstLineHeader) {
                        h+='<tr>\n';
                        if(options.showID){
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
                        if(options.showID){
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
                    if(options.showID){
                        propList.unshift('id');
                    }
                    h=[];
                    _.every(data, function(m, idx){
                        h.push(JSON.stringify(_.pick(m.toJSON(), propList), null, 2));
                        return idx<maxItem;
                    });
                    if(this.many){
                        h = '['+h.join(',\n')+']';
                    }else{
                        h = h.join('');
                    }
                    break;
                case 'SQL':
                    var optIdInsert = false,
                        crlf = '\n',
                        sqlTable = options.table.replace(/ /g,'_'),
                        sql = 'INSERT INTO '+sqlTable+' (',
                        fnString, formatString, emptyString, sNull, beginTrans, commitTrans;
                    switch(options.database){
                        case 'sqlserver':
                            fnString = function(v){
                                if(_.isUndefined(v) || _.isObject(v)){
                                    return '""';
                                }
                                return ('"'+v.replace(/"/g, '""')+'"');
                            };
                            sNull='NULL';
                            emptyString='""';
                            beginTrans='BEGIN TRANSACTION';
                            commitTrans='COMMIT TRANSACTION';
                            optIdInsert=options.showID;
                            break;
                        default: //case 'postgres':
                            fnString = function(v){
                                if(_.isUndefined(v) || _.isObject(v)){
                                    return '""';
                                }
                                return ("'"+v.replace(/'/g, "''")+"'");
                            };
                            sNull='null';
                            emptyString="''";
                            beginTrans='BEGIN;';
                            commitTrans='COMMIT;';
                    }
                    formatString = function(v){
                        if(_.isUndefined(v) || v===null){
                            return sNull;
                        }else if(v===''){
                            return emptyString;
                        }else if(_.isNumber(v)){
                            return v;
                        }else{
                            return fnString(v);
                        }
                    };
                    if(options.showID){
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
                    if(options.transaction){
                        h+=beginTrans+crlf;
                    }
                    if(optIdInsert){
                        h+='SET IDENTITY_INSERT '+sqlTable+' ON;'+crlf;
                    }
                    // -- data
                    var fValue;
                    _.every(data, function(m, idx){
                        h+=sql;
                        if(options.showID){
                            h+=formatString(m.id)+', ';
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
                                        h+=formatString(eDico.fieldHTML_RO(f, fValue, Evol.hashLov, ''));
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
                    if(options.transaction){
                        h+=commitTrans+crlf;
                    }
                    break;
                case 'XML':
                    var elemName = options.elementName,
                        fv;

                    h='<xml>\n';
                    _.every(data, function(m, idx){
                        h+='<'+elemName+' ';
                        if(options.showID){
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

    fieldHTML: function(id,label,text){
        return eUI.fieldLabel(id, label) +
            uiInput.text(id, text.replace(/ /g, '_'), null, 'xpt-mw300');
    },

    val: function (value) {
        if (_.isUndefined(value)) {
            var format = this.$('.evol-xpt-format').val(),
                title = this.uiModel.label || Evol.Format.capitalize(this.uiModel.entities),
                v = {
                    title: title,
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
            }else if(v.format==='SQL'){
                v.options.database = this.$('.evol-xpt-db').val() || this.uiModel.table || this.uiModel.id;
            }
            v.options.showID = this.$('#showID').prop('checked');
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

    _formatOptions: function(format, entity){
        if(format==='XML'){
            return '<div>'+this.fieldHTML('elementName', i18nXpt.XMLroot, entity)+'</div>';
        }else if(format==='SQL'){
            return '<div><label for="xpt-db">'+i18nXpt.db+'</label> '+
                uiInput.select('xpt-db', 'postgres', 'evol-xpt-db', null, [{id:'postgres', text:'PostgreSQL'},{id:'sqlserver', text:'SQL Server'}])+
                '<div class="evo-inline-holder">'+
                    '<div>'+this.fieldHTML('table', i18nXpt.SQLTable, entity)+'</div>'+
                    '<div><label>'+uiInput.checkbox('transaction', false)+i18nXpt.SQLTrans+'</label></div>'+
                '</div></div>';
        }
        return '';
    },

    click_format: function (evt) {
        var format = $(evt.currentTarget).val();
        if (format === 'XML') {
            this.$('#XML').html(this._formatOptions('XML', this.uiModel.name))
                .show()
                .siblings().not('.evol-FLH').hide();
        }
        this.showFormatOpts(format)
            ._preview();
        this.$el.trigger('change.export', 'format', format);
    },

    click_toggle_sel: function (evt) {
        $(evt.currentTarget).hide()
            .next().slideDown();
    },

    click_button: function (evt) {
        var bId=$(evt.currentTarget).data('id');
        if(bId==='export'){
            this.download(this.val());
        }
        this.$el.trigger('action', bId);
    },

    download: function(params){
        var blob = new Blob([this.$('.evol-xpt-val').val()], {type: 'text/plain'}),
            ext = params.format==='TAB' ? 'txt' : params.format.toLowerCase(),
            filename = params.title.replace(/ /g, '_') + '.' + ext,
            a = document.createElement("a");

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        if (a.remove) {
            a.remove();
        }
    }

});

}();

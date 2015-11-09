/*! ***************************************************************************
 *
 * evolutility :: dico.js
 *
 * Library of helpers for dictionary
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

// not a "virtual DOM" but an "abstract DOM"
Evol.Dico = function(){

    var eUI = Evol.UI,
        uiInput = eUI.input,
        i18n = Evol.i18n,
        fts = Evol.Def.fieldTypes;

return {

    fieldEdit: {
        field: function (f, fType, fid, fv) {
            return uiInput[fType](fid, fv, f, null);
        },
        text: function (f, fid, fv) {
            return uiInput.text(fid, fv, f, null);
        },
        textmultiline: function (f, fid, fv) {
            // fv = _.escape(fv);
            if (f.height === null) {
                f.height = 5;
            } else {
                var fHeight = parseInt(f.height, 10);
                if (fHeight < 1) {
                    f.height = 5;
                }
            }
            return uiInput.textM(fid, fv, f.maxlength, f.height);
        },
        html: function (f, fid, fv) {
            // TODO
            return uiInput.textM(fid, fv, f.maxlength, f.height);
        },
        boolean: function (f, fid, fv) {
            return uiInput.checkbox(fid, fv);
        },
        integer: function (f, fid, fv) {
            return uiInput.textInt(fid, fv, f.max, f.min);
        },
        decimal: function (f, fid, fv) {
            //todo
            return uiInput.textInt(fid, fv, f.max, f.min);
        },
        money: function (f, fid, fv) {
            return '<div class="input-group evol-money">'+uiInput.typeFlag('$')+
                uiInput.textInt(fid, fv, f.max, f.min)+'</div>';
        },
        date: function (f, fid, fv) {
            return uiInput.date(fid, fv);
        },
        datetime: function (f, fid, fv) {
            return uiInput.dateTime(fid, fv);
        },
        time: function (f, fid, fv) {
            return uiInput.time(fid, fv);
        },
        lov: function (f, fid, fv) {
            return uiInput.select(fid, fv, '', true, f.list);
        },
        list: function (f, fid, fv) { // fv is an array. will use select2
            return '<div id="'+fid+'" class="w-100 form-control"></div>';
        },
        email: function (f, fid, fv) {
            return '<div class="input-group">'+uiInput.typeFlag(i18n.msg.sgn_email)+
                uiInput.text(fid, fv, f)+
                '</div>';
        },
        url: function (f, fid, fv) {
            return uiInput.text(fid, fv, f);
            //fv!==''?EvoUI.link(fid,'',fv):''
        },
        //doc: function(f, fid, fv, iconsPath){
        //},
        image: function(f, fid, fv, iconsPath){
            var h='';
            if(fv!==''){
                h+='<img src="'+((fv.substr(0, 2)==='..')?fv:iconsPath + fv)+'" class="img-thumbnail">';
            }else{
                h+='<p class="">'+i18n.nopix+'</p>';
            }
            h+=uiInput.text(fid, fv, f, null);
            return h;
        },
        color: function(f, fid, fv){
            return uiInput.color(fid, fv);
        },
        hidden: function(f, fid, fv){
            return uiInput.hidden(fid, fv);
        },
        formula: function(f, fid, fv){
            return '<div class="evol-ellipsis">'+uiInput.text(fid, fv, f, null)+'</div>';
        }
    },

    fieldHTML: function(fld, fid, fv, mode, iconsPath, skipLabel){
        var h='';
        function getStyleHeight(f){
            var fh = parseInt(f.height || 0, 10);
            if(fh<2){
                fh=2;
            }
            return 'height:'+parseInt(fh*1.6, 10)+'em';
        }
        // --- field label ---
        if(!skipLabel){
            h+=this.HTMLFieldLabel(fld, mode || 'edit');
        }
        // --- field value ---
        if(fld.readonly || mode==='browse'){
            h+='<div class="disabled evo-rdonly'+(fld.type===fts.email || fld.type===fts.url?' evol-ellipsis':'')+'" id="'+fid;
            if(fld.type===fts.textml && fld.height>1){
                h+='" style="'+getStyleHeight(fld)+';overflow-y: auto;';
            }
            h+='">';
            switch (fld.type) {
                case fts.formula:
                    // TODO: in one.js or here?
                    h+='<div id="'+fid+'" class="form-control evol-ellipsis">'+fld.formula()+'</div>';
                    break;
                case fts.color: // TODO is the color switch necessary?
                    h+='<div id="'+fid+'" class="form-control">'+uiInput.colorBox(fid, fv)+'</div>';
                    break;
                case fts.textmultiline:
                    h+='<div id="'+fid+'" class="form-control" style="'+height+'">'+_.escape(fv)+'</div>';
                    break;
                default:
                    h+=this.fieldHTML_RO(fld, fv, {}, iconsPath);
            }
            h+='&nbsp;</div>';
        }else{
            var ftc=Evol.Dico.fieldEdit[fld.type];
            if(!ftc){
                ftc=Evol.Dico.fieldEdit.default;
            }
            h+=ftc(fld, fid, fv, iconsPath);
        }
        return h;
    },

    fieldHTML_RO: function(f, v, hashLov, iconsPath, wId){
        switch(f.type){
            case fts.bool:
                if (v==='true' || v=='1') {
                    return eUI.icon('ok', f.css);
                }
                break;
            case fts.lov:
                if (v !== '') {
                    //if(f.icon && f.list & f.list[0].icon){
                    //    return 'f.icon' + this._lovText(f,v);
                    //}else{
                    //return Evol.Dico.lovText(f, iconPath+v, hashLov);
                    return Evol.Dico.lovText(f, v, hashLov, iconsPath);
                    //}
                }
                break;
            case fts.list:
                if(_.isString(v)){
                    v= v.split(',');
                }
                if(v && v.length){
                    var vs=[];
                    _.each(v, function(vi){
                        vs.push(Evol.Dico.lovText(f, vi, hashLov, iconsPath));
                    });
                    return vs.join(', ');
                }
                return v;
            case fts.date:
            case fts.time:
            case fts.datetime:
                return Evol.Format[f.type+'String'](v);
            case fts.pix:
                if (v && v.length) {
                    //return uiInput.img(f.id, (v.substr(0, 2)==='..')?v:iconsPath + v, 'img-thumbnail');
                    return uiInput.img(f.id, iconsPath + v, 'img-thumbnail');
                }
                break;
            case fts.money:
                var nv=parseFloat(v);
                if (!isNaN(nv)) {
                    return '$'+nv.toFixed(2);
                }
                break;
            case fts.email:
                return eUI.linkEmail(wId?f.id:null, v);
            case fts.url:
                return eUI.link(f.id, v, v, f.id);
            //case fts.color:
            //    return uiInput.colorBox(f.id, v, v);
            default:
                return v;
        }
        return '';
    },

    HTMLFieldLabel: function (fld, mode) {
        var h='<div class="evol-field-label" id="'+fld.id+'-lbl"><label class="control-label '+(fld.cssLabel?fld.cssLabel:'')+'" for="'+fld.id+'">'+fld.label;
        if (mode != 'browse' && fld.required){
            h+=eUI.html.required;
        }
        if (fld.help && fld.help!==''){
            h+=eUI.icon('question-sign', '');
        }
        h+='</label></div>';
        return h;
    },

    fieldLink: function (id, fld, value, icon, noLink, route) {
        var h='';
        if(!noLink){
            h+='<a href="'+(route?route:'javascript:void(0);');
            if(id){
                h+='" id="'+id;
            }
            h+='" class="evol-nav-id">';
        }
        if(icon){
            h+='<img class="evol-many-icon" src="'+icon+'">';
        }/*
         if(_.isUndefined(value) || value===''){
         value='('+model.id+')';
         }*/
        h+='<span>'+value+'</span>';
        if(!noLink){
            h+='</a>';
        }
        return h;
    },

    clearCacheLOV: function(){
        Evol.hashLov={};
    },

    setViewTitle: function(that, title, badge){
        if(that.titleSelector){
            $(that.titleSelector)
                .html(
                    (title?title:that.getTitle())+
                    (badge?'<span class="badge badge-one">'+badge+'</span>':'')
                );
        }
        return that;
    },

    getFieldVal:function(f, $f){
        switch(f.type) {
            case fts.bool:
                return $f.prop('checked');
            case fts.int:
                return parseInt($f.val(), 10);
            case fts.dec:
            case fts.money:
                return parseFloat($f.val());
            case fts.list:
                return $f.select2('val');
            default:
                return $f.val();
        }
    },
    // get field value (not id but text) for a field of type lov
    lovText:function(f, v, hash, iconsPath){
        if(f.list && f.list.length>0 && hash){
            if(!(f.id in hash)){
                hash[f.id]={};
            }
            var hashLov = hash[f.id];
            if(v in hashLov){
                return hashLov[v];
            }else{
                var listItem=_.find(f.list, function(item){
                    return item.id==v;
                });
                if(listItem){
                    var txt= _.escape(listItem.text);
                    if(listItem.icon!=='' && !_.isUndefined(listItem.icon)){
                        txt='<img src="'+((listItem.icon && listItem.icon.substring(0,1)!=='.')?iconsPath:'')+listItem.icon+'"> '+txt;
                    }
                    hashLov[v]=txt;
                    return txt;
                }
            }
        }
        return '';
    },

    lovTextNoPix:function(f, v){
        var listItem=_.find(f.list, function(item){
            return item.id==v;
        });
        if(listItem){
            return listItem.text;
        }
        return '';
    },
/*
    showDesigner: function(id, type, $el, context){
         var css='evodico-'+type,
             //$('<div class="evodico-'+type+'"></div>'),
             model,
             uiModel=context.uiModel,
             f;
         //context.getFields(dico_field_ui);
         switch(type){
             case 'object':
                 //TODO
                 break;
             case 'field':
                 uiModel = uiModels.field;
                 f=context.getFieldsHash(uiModel)[id];
                 model = new Backbone.Model(f);
                 break;
             //case 'list':
             //case 'tab':
             case 'panel':
             //case 'panel-list':
                 uiModel = uiModels.panel;
                 f=context.uiModel.elements[0]; //TODO
                 model = new Backbone.Model(f);
                 break;
         }
         //$el.closest('.evol-fld').after($elDesModal);
         $('body').append($elDesModal);
         var $elDesModal=$(eUI.modal.HTMLModal('m'+id, 'Edit '+type+' '+ f.label, '<div class="'+css+'"></div>')),
         $elDes=$elDesModal.find('.'+css);
         var vw = new Evol.ViewOne.Edit({
             uiModel: uiModel,
             model: model,
             defaultView: 'edit',
             el: $elDes,
             style:'panel-primary',
             size:'S',
             button_addAnother: false
         }).render();

         $elDes.on('click', 'button#save,button#cancel', function(evt){
             //TODO save field => dependency: uiModel persistence...
             $elDesModal.modal('hide').remove();
         });

         $elDesModal.modal('show');

         return this;
     },

    uiModel2tdbTable: function(uiModel){
        // -- generates SQL script to create a Postgress DB table for the object
        var t=uiModel.id || uiModel.name;
        var fields=Evol.Def.getFields(uiModel);
        var sql='CREATE TABLE '+t;
        sql+='\n(\n';
        sql+=[' id serial NOT NULL,\n'];
        _.forEach(fields, function(f, idx){
            sql+=' "'+(f.attribute || f.id)+'" ';
            switch(f.type){
                case 'boolean':
                case 'integer':
                    sql+=f.type;
                    break;
                case 'date':
                case 'datetime':
                case 'time': 
                    sql+='date';
                    break;
                default:
                    sql+='text';
            }
            if(f.required){
                sql+=' not null';
            }
            sql+=',\n';
        });
        sql+='CONSTRAINT "'+t+'_pkey" PRIMARY KEY (id)';
        sql+='\n) WITH (OIDS=FALSE);';

        return sql;
    },
*/
    filterModels: function(models, filters){
        if(filters.length){
            // TODO pre-build function to avoid repeating loop
            return models.filter(function(model){
                var want=true,
                    fConds=Evol.Dico.fieldConditions;
                for(var i= 0, iMax=filters.length;i<iMax && want;i++){
                    if(want===false){
                        break;
                    }
                    var filter=filters[i],
                        vm=model.get(filter.field.value);// TODO use field.value(m) || field.id

                    if(_.isUndefined(vm)){
                        vm='';
                    }
                    want=fConds[filter.operator.value](vm, filter.value.value, filter.value.value2); // vf2 is only used in "between" conditions
                }
                return want;
            });
        }
        return models;
    },

    bbComparator: function(fid){
        return function(modelA) {
            return modelA.get(fid);
        };
    },

    bbComparatorText: function(fid){
        return function(modelA, modelB) {
            return (modelA.get(fid)||'').localeCompare(modelB.get(fid)||'');
        };
    },

    bbComparatorFormula: function(fid, fn){
        return function(modelA, modelB) {
            var mA = fn(modelA),
                mB = fn(modelB);
            if(mA<mB){
                return 1;
            }
            if(mB<mA){
                return -1;
            }
            return 0;
           // return (fn(modelA)||'').localeCompare(fn(modelB)||'');
        };
    },

    sortingNumber: function(fid){
        return function(modelA, modelB) {
            if(modelA[fid]<modelB[fid]){
                return 1;
            }
            if(modelB[fid]<modelA[fid]){
                return -1;
            }
            return 0;
        };
    },

    sortingText: function(fid){
        return function(modelA, modelB) {
            return (modelA[fid]||'').localeCompare(modelB[fid]||'');
        };
    },

    setPageTitle: function(title){
        if(_.isUndefined(this._$headTitle)){
            this._$headTitle = $('#headTitle');
        }
        this._$headTitle.html(title);
    },

    getItemTitle: function(e){
        return e.find('h4>a>span').text();
    },

    getRoute: function(){
        var cURL=window.location.href,
            idx=cURL.indexOf('#');
        return (idx>-1)?cURL.substr(idx+1):'';
    },

    setRoute: function(router, entity, view, opts, trigger){
        if(!_.isUndefined(router)){
            var route = entity + '/' + view;
            if(opts){
                route+='/' + opts;
            }
            if(route!==this.getRoute()){
                router.navigate('#' + route, {trigger: trigger});
            }
        }
    },

    // -- list of operator and function for filters
    fieldConditions: {
        // filter functions take parameters fv=fieldValue, cv=condition value, cv2
        // -- equals
        'eq': function(fv, cv){
            return cv==fv;
        },
        // -- not equal
        'ne': function(fv, cv){
            return cv!=fv;
        },
        // -- > or after
        'gt': function(fv, cv){
            return fv>cv;
        },
        // -- < or before
        'lt': function(fv, cv){
            return fv<cv;
        },
        // -- between
        'bw': function(fv, cv, cv2){
            return !(cv>fv || fv>cv2);
        },
        // -- start w/
        'sw': function(fv, cv){
            return fv.toLocaleLowerCase().indexOf(cv)===0;
        },
        // -- contains
        'ct': function(fv, cv){
            if(fv){
                return fv.toLocaleLowerCase().indexOf(cv)>-1;
            }
            return false;
        },
        // -- finish w/
        'fw': function(fv, cv){
            var l1=fv.length,
                l2=cv.length;
            if (l1<l2){
                return false;
            }else{
                return fv.toLocaleLowerCase().substring(l1-l2)===cv;
            }
        },
        // -- empty
        'null': function(fv, cv){
            return  fv==='' || _.isUndefined(fv);
        },
        // -- not null
        'nn': function(fv, cv){
            return !(_.isUndefined(fv) || fv==='');
        },
        // -- in []
        'in': function(fv, cv){
            return  _.contains(cv.split(','),fv);
        },
        // -- true
        '1': function(fv, cv){
            return fv;
        },
        // -- false
        '0': function(fv, cv){
            return !fv;
        }
    }

};

}();

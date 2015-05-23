var uiModels = uiModels || {};

uiModels.comics = {
    id: 'comics',
    label: 'Graphic Novels',
    name: 'graphic novel serie',
    namePlural: 'graphic novel series',
    //icon: 'serie.gif',
    fnTitle:'title',
    badge:function(m){
        var hNb=m.get('haveNb'),
            sNb=m.get('serieNb');
        return (hNb==sNb)?hNb:hNb+'/'+sNb;
    },
    elements: [
        {
            type: 'panel', label: 'Serie', width: 70,
            elements: [
                {
                    id: 'title', attribute: 'title', type: 'text', label: 'Title', required: true, 
                    maxLength: 255,
                    width: 62, viewmany: true
                },
                {
                    id: 'genre', attribute: 'genre', type: 'lov', label: 'Genre', width: 38, viewmany: true,
                    list: [
                        {id: 'adv', text: 'Adventure'},
                        {id: 'conte', text: 'Fairy tale'},
                        {id: 'eros', text: 'Erotic'},
                        {id: 'fantasy', text: 'Fantastic'},
                        {id: 'hf', text: 'Heroic Fantasy'},
                        {id: 'hist', text: 'Historic'},
                        {id: 'humor', text: 'Humor'},
                        {id: 'nocat', text: 'One of a kind'},
                        {id: 'youth', text: 'Youth'},
                        {id: 'pol', text: 'Thriller'},
                        {id: 'sf', text: 'Science-fiction'},
                        {id: 'sh', text: 'Super Heros'},
                        {id: 'wwest', text: 'Western'} 
                    ]
                },
                {
                    id: 'authors', attribute: 'authors', type: 'text', width: 62, viewmany: true,
                    label: 'Authors'
                },
                {
                    id: 'language', attribute: 'language', type: 'lov', label: 'Language', width: 38, viewmany: false,
                    list: [
                        {id: 'FR', text: 'French'},
                        {id: 'EN', text: 'English'}
                    ]
                },
                {
                    id: 'serieNb', attribute: 'serieNb', type: 'integer', width: 15, viewmany: false,
                    label: 'Albums', viewcharts:false 
                },
                {
                    id: 'haveNb', attribute: 'haveNb', type: 'integer', width: 15, viewmany: false,
                    label: 'Owned', viewcharts:false 
                },
                {
                    id: 'have', attribute: 'have', type: 'text', width: 32, viewmany: false,
                    label: 'have' 
                },
                {
                    id: 'complete', attribute: 'complete', type: 'boolean', width: 19, viewmany: true,
                    label: 'Complete', labelFalse:'Incomplete', labelTrue:'Complete'
                },
                {
                    id: 'finished', attribute: 'finished', type: 'boolean', width: 19, viewmany: true,
                    label: 'Finished', labelTrue:'Finished', labelFalse:'Unfinished', css:'cBlue'
                },
                {
                    id:'amazon', label:'Amazon', type:'formula', width:100, css:'evol-ellipsis',
                    formula:function(m){
                        var link=m.get('language')=='FR' ?
                            'http://www.amazon.fr/s/ref=sr_nr_n_1?keywords='
                            :'http://www.amazon.com/s/ref=nb_sb_noss?field-keywords=';
                        link+=encodeURI(m.get('title')+' '+m.get('authors'));
                        return '<a target="a" href="'+link+'">'+link+'</a>';
                    }
                },
                {
                    id: 'notes', attribute: 'notes', type: 'textmultiline', label: 'Notes', maxLength: 1000,
                    width: 100, height: 6, viewmany: false
                }
            ]
        },
        {
            type: 'panel', label: 'Cover', width: 30,
            elements: [
                {
                    id: 'pix', attribute: 'pix', type: 'image', width: 100, viewmany: true,
                    label: 'Cover'
                }
            ]
        }
    ]
};

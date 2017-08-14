module.exports = function (grunt) {

    function uiDependenciesList(){
        var pkg=grunt.file.readJSON('bower.json'),
        lst = [];
        if(pkg){
            var  deps = pkg.dependencies;
            for(var p in deps){
                lst.push(p+' '+deps[p]); 
            }
        }
        return lst.join(' + ');
    }

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*!\n   <%= pkg.name  %> <%= pkg.version %> \n' +
            '   <%= pkg.copyright %> \n' +
            '   <%= pkg.homepage %>  \n*/\n',

        bannerDependencies: '/*!\n <%= pkg.name %> <%= pkg.version %> dependencies: ' +
            uiDependenciesList()+'\n*/\n',

        // *************************************************************************************
        //      CONCAT
        // *************************************************************************************
        concat: {
            dependencies:{
                options: {
                    banner: '<%= bannerDependencies %>',
                    separator: ';\n'
                },
                src: [

                    // D3.js
                    'bower_components/d3/d3.js',

                    // PapaParse.js (CSV parser)
                    'bower_components/papaparse/papaparse.js',

                    // jQuery
                    'bower_components/jquery/dist/jquery.js',
                    //'bower_components/jquery.csv.js',

                    // Backbone & Underscore
                    'bower_components/underscore/underscore.js',
                    //'bower_components/underscore.string/lib/underscore.string.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',

                    // Twitter Bootstrap
                    'bower_components/bootstrap/js/modal.js',
                    'bower_components/bootstrap/js/dropdown.js',
                    'bower_components/bootstrap/js/button.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    'bower_components/bootstrap/js/popover.js',
                    //'bower_components/bootstrap/js/carousel.js',

                    // Widgets
                    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    'bower_components/select2/select2.js',
                    'bower_components/toastr/toastr.js'
                ],
                dest: '<%= pkg.target %>/dependencies.js'
            },
            js: {
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                },
                src: [
                    'config.js',
                    'js/i18n/EN.js',

                    'js/dico/def.js',
                    'js/dico/format.js',
                    'js/dico/dom.js',
                    'js/dico/dom-*.js',
                    'js/dico/dico.js',

                    'js/view-many/many.js',
                    'js/view-many/many-*.js',

                    'js/view-one/one.js',
                    'js/view-one/one-*.js',
                    '!js/view-one/one-wizard.js', // NOT ! here

                    //'js/view-action/action.js',
                    'js/view-action/action-*.js',
                    'js/view-action/toolbar.js',
                    //'js/navbar.js',

                    'js/dico/app.js',

                    '!*-nogit', // NOT ! here
                ],
                dest: '<%= pkg.target %>/evolutility-ui-jquery.js'
            },
            demo:{
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                    },
                src: [
                    //"demo/demo.js",
                    //"models/todo.js",
                    "models/todo.data.js",
                    //"models/contacts.js",
                    "models/contacts.data.js",
                    //"models/winecellar.js",
                    "models/winecellar.data.js",
                    //"models/comics.js",
                    "models/comics.data.js"
                ],
                dest: 'demo/demo-data.js'
            }
        },

        // *************************************************************************************
        //      COPY
        // *************************************************************************************
        copy: {
          dependencies: {
            files: [
                {
                    expand: true, 
                    flatten: true, 
                    src: [
                        'bower_components/bootstrap/dist/fonts/*'
                    ], 
                    dest: '<%= pkg.target %>/fonts/bootstrap/'
                },
                {
                    expand: true, 
                    flatten: true, 
                    src: [
                        'bower_components/select2/select2-spinner.gif',
                        'bower_components/select2/select2.png',
                        'bower_components/select2/select2x2.png'
                    ], 
                    dest: '<%= pkg.target %>/css'
                }
            ]
          }
        },

        // *************************************************************************************
        //      JSHINT
        // *************************************************************************************
        jshint: {
            dev: [

                'Gruntfile.js',
                'package.json',
                'bower.json',

                'js/dico/*.js',
                'js/i18n/EN.js',

                'js/view-many/many*.js',
                'js/view-one/one*.js',
                'js/view-action/action-*.js',
                'js/view-action/toolbar.js',

                'models/*.js',

                '../demo/demo.js',

                '!js/*/*-nogit.js'
            ]
        },

        // *************************************************************************************
        //      UGLIFY
        // *************************************************************************************
        uglify: {
            prod: {
                options: {
                    banner: '<%= banner %>',
                    mangle: true
                },
                files: [
                    {
                        src: '<%= pkg.target %>/evolutility-ui-jquery.js',
                        dest: '<%= pkg.target %>/evolutility-ui-jquery.min.js'
                    }
                ]
            },
            demo: {
                options: {
                    banner: '/* <%= pkg.name %> v<%= pkg.version %> sample UI-models and data: todo, addressbook, wine cellar. */\n ',
                    mangle: true
                },
                files: [
                    {
                        src: 'demo/demo-data.js',
                        dest: 'demo/demo-data.min.js'
                    }
                ]
            },
            dependencies: {
                options: {
                    banner: '<%= bannerDependencies %>',
                    mangle: true
                },
                files: [
                    {
                        src: '<%= pkg.target %>/dependencies.js',
                        dest: '<%= pkg.target %>/dependencies.min.js'
                    }
                ]
            }
        },

        // *************************************************************************************
        //      SASS
        // *************************************************************************************
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    "dist/css/evolutility-ui-jquery.css": "sass/evolutility.scss"
                }
            },
            prod: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    "dist/css/evolutility-ui-jquery.min.css": "sass/evolutility.scss"
                }
            },
            demo: {
                files: {
                    "dist/css/demo.css": "sass/demo.scss"
                }
            },
            dependencies: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    "dist/css/dependencies.min.css": "sass/dependencies.scss"
                }
            },
        },

    });


    // *************************************************************************************
    //      GRUNT PLUGIN : tasks
    // *************************************************************************************
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('header', 'Evolutility version', function(arg1) {
        var pkg=grunt.file.readJSON('package.json');
        console.log('\n' + 
            '  ______          _       _   _ _ _ _\n'+
            ' |  ____|        | |     | | (_) (_) |\n'+
            ' | |____   _____ | |_   _| |_ _| |_| |_ _   _\n'+
            ' |  __\\ \\ / / _ \\| | | | | __| | | | __| | | |\n'+
            ' | |___\\ V / (_) | | |_| | |_| | | | |_| |_| |\n'+
            ' |______\\_/ \\___/|_|\\__,_|\\__|_|_|_|\\__|\\__, |\n'+
            '        | |  | |_   _|    (_)/ __ \\      __/ |\n'+
            '  ______| |  | | | |______ _| |  | |_   |___/_ _ __ _   _\n'+
            ' |______| |  | | | |______| | |  | | | | |/ _ \\ \'__| | | |\n'+
            '        | |__| |_| |_     | | |__| | |_| |  __/ |  | |_| |\n'+
            '         \\____/|_____|    | |\\___\\_\\\\__,_|\\___|_|   \\__, |\n'+
            '                         _/ |                        __/ |\n'+
            '                        |__/                        |___/\n\n'+
            'Version '+pkg.version+' '+(arg1?arg1:'')+' - '+ new Date()
        );
    });

    // *************************************************************************************
    //      BUILD TASKS : dev prod demo dep
    // *************************************************************************************
    grunt.registerTask('default', ['prod']);

    grunt.registerTask('dev', [
        'header:dev',
        'concat:js', 
        'demo', 
        'sass:dev'
    ]);
    grunt.registerTask('demo', [
        'concat:demo', 
        'sass:demo', 
        'uglify:demo'
    ]);
    grunt.registerTask('prod', [
        'header:prod',
        'jshint', 
        'concat:js', 
        'demo', 
        'sass', 
        'uglify:prod',
        'dep',
    ]); 
    grunt.registerTask('css', [
        'sass:dev', 
        'sass:prod',
        'sass:demo',
    ]);
    grunt.registerTask('js', [
        'concat:js', 
        'uglify:prod',
    ]);

    // **** Dependencies
    grunt.registerTask('dep', [
        'sass:dependencies',
        'concat:dependencies', 
        'copy', 
        'uglify:dependencies',
    ]);
};

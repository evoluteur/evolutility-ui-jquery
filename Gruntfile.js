module.exports = function (grunt) {

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*   <%= pkg.name  %> v<%= pkg.version %>   */\n' +
            '/*   <%= pkg.copyright %>   */\n' +
            '/*   https://github.com/evoluteur/evolutility   */\n',

        // *************************************************************************************
        //      CONCAT
        // *************************************************************************************
        concat: {
            vendors:{
                options: {
                    separator: ';\n'
                },
                src: [
                    // jQuery & jQuery UI
                    'bower_components/jquery/dist/jquery.js',
                    //'bower_components/jquery-ui/ui/jquery.ui.widget.js',
                    //'bower_components/jquery.csv.js',

                    // Backbone & Underscore
                    'bower_components/underscore/underscore.js',
                    //'bower_components/underscore.string/lib/underscore.string.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',

                    // Twitter Bootstrap
                    'bower_components/bootstrap/js/modal.js',
                    //'bower_components/bootstrap/js/tooltip.js',
                    'bower_components/bootstrap/js/button.js',
                    'bower_components/bootstrap/js/dropdown.js',
                    //'bower_components/bootstrap/js/carousel.js',

                    // Widgets
                    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    'bower_components/select2/select2.js'
                ],
                dest: '<%= pkg.target %>/vendors.js'
            },
            js:{
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                },
                src: [
                    'js/ui.js',
                    'js/ui-*.js',
                    'js/i18n/EN.js',
                    'js/dico.js',

                    'js/many.js',
                    'js/many-*.js',
                    'js/one.js',
                    'js/one-*.js',
                    '!js/one-wizard.js', // NOT ! here
                    'js/action.js',
                    'js/action-*.js',

                    //'js/navbar.js',
                    'js/toolbar.js',
                    'js/shell.js'
                    //'js/ui-models/dico/field.js',
                    //'js/ui-models/dico/field-popup.js',
                    //'js/ui-models/dico/panel.js'
                ],
                dest: '<%= pkg.target %>/evolutility.js'
            },
            demo:{
                options: {
                    banner: '<%= banner %>',
                    separator: ';\n'
                    },
                src: [
                    "demo/demo.js",
                    "js/ui-models/apps/todo.js",
                    "js/ui-models/apps/todo.data.js",
                    "js/ui-models/apps/contacts.js",
                    "js/ui-models/apps/contacts.data.js",
                    "js/ui-models/apps/winecellar.js",
                    "js/ui-models/apps/winecellar.data.js"
                ],
                dest: 'demo/demo-ui.js'
            }
        },

        // *************************************************************************************
        //      COPY
        // *************************************************************************************
        copy: {
          main: {
            files: [
              {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: '<%= pkg.target %>/fonts/'}
            ]
          }
        },

        // *************************************************************************************
        //      JSHINT
        // *************************************************************************************
        jshint: {
            dev: [
                // --- tools ---
                'Gruntfile.js',
                'package.json',

                // --- dist ---
                'js/ui*.js',
                'js/i18n/EN.js',

                'js/many*.js',
                'js/one*.js',
                'js/action-*.js',

                //'js/navbar.js',
                'js/toolbar.js',

                'js/ui-models/dico/*.js',

                // --- ui models ---
                'js/ui-models/apps/*.js',
                'js/ui-models/test/*.js'

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
                        src: '<%= pkg.target %>/evolutility.js',
                        dest: '<%= pkg.target %>/evolutility.min.js'
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
                        src: 'demo/demo-ui.js',
                        dest: 'demo/demo-ui.min.js'
                    }
                ]
            },
            vendors: {
                options: {
                    banner: '/* <%= pkg.name %> v<%= pkg.version %> dependencies: \n jquery + backbone + underscore + backbone.localStorage + bootstrap-datepicker */',
                    mangle: true
                },
                files: [
                    {
                        src: '<%= pkg.target %>/vendors.js',
                        dest: '<%= pkg.target %>/vendors.min.js'
                    }
                ]
            }
        },

        // *************************************************************************************
        //      LESS
        // *************************************************************************************
        less: {
            dev: {
                files: {
                    "dist/css/evolutility.css": "less/evol.less"
                }
            },
            demo: {
                files: {
                    "dist/css/demo.css": "less/demo.less"
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    "dist/css/vendors.min.css": "less/vendors.less",
                    "dist/css/evolutility.min.css": "less/evol.less"
                }
            }
        }

    });


    // *************************************************************************************
    //      GRUNT PLUGIN : tasks
    // *************************************************************************************
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');


    // *************************************************************************************
    //      BUILD TASKS : dev prod
    // *************************************************************************************
    // Default task(s).
    grunt.registerTask('default', ['dev']);

    // Dev task(s).
    grunt.registerTask('dev', ['concat:js', 'less:dev', 'less:demo']);

    // Prod task(s).
    grunt.registerTask('prod', ['jshint', 'copy', 'dev', 'concat:demo', 'concat:vendors', 'less:prod', 'uglify']);

};


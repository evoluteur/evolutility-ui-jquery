module.exports = function (grunt) {

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*   <%= pkg.name  %> <%= pkg.version %> */\n\n/*   <%= pkg.copyright %> */\n\n',

        // *************************************************************************************
        //      CONCAT options
        // *************************************************************************************
        concat: {
            options: {
                banner: '<%= banner %>',
                separator: ';\n'
            },
            vendors:{
                  src: [
                      'bower_components/jquery/jquery.js',
                      'bower_components/underscore/underscore.js',
                      //'bower_components/underscore.string/lib/underscore.string.js',
                      'bower_components/backbone/backbone.js',
                      'bower_components/backbone.localStorage/backbone.localStorage.js',
                      'bower_components/bootstrap/js/modal.js',
                      //'bower_components/bootstrap/js/tooltip.js',
                      'bower_components/bootstrap/js/dropdown.js'
                  ],
                  dest: '<%= pkg.target %>/vendors.js'
                },
            js:{
                  src: [
                      'js/evol-dico.js',
                      'js/evol-ui.js',
                      'js/evol-ui-*.js',
                      'js/evol-view-*.js',
                      //'js/dico-models/dico-field.js',
                      //'js/dico-models/dico-panel.js',
                      'js/i18n/EN.js'

                  ],
                  dest: '<%= pkg.target %>/evol-utility.js'
                },
            css: {
                options: {
                    banner: '<%= banner %>',
                    separator: '\n'
                },
              src: [
                    //'app/css/demo.css',
                  'css/evol-dico.css',
                  'css/evol-view-*.css'
              ],
              dest: '<%= pkg.target %>/evol-utility.css'
            }
        },

        // *************************************************************************************
        //      UGLIFY options
        // *************************************************************************************
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: true
            },
            all: {
                files: [
                    {
                        src: '<%= pkg.target %>/evol-utility.js',
                        dest: '<%= pkg.target %>/evol-utility.min.js'
                    },
                    {
                        src: '<%= pkg.target %>/vendors.js',
                        dest: '<%= pkg.target %>/vendors.min.js'
                    }
                ]
            }
        }

    });


    // *************************************************************************************
    //      GRUNT PLUGIN : tasks
    // *************************************************************************************
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');


    // *************************************************************************************
    //      BUILD TASKS : dev prod
    // *************************************************************************************
    // Default task(s).
    grunt.registerTask('default', ['dev']);

    // Dev only task(s).
    grunt.registerTask('dev', ['concat:js', 'concat:css']);

    // Prod only task(s).
    grunt.registerTask('prod', ['dev', 'concat:vendors', 'uglify']);

};


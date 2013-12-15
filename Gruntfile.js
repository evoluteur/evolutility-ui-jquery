module.exports = function (grunt) {

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*   <%= pkg.name  %> <%= pkg.version %> */\n\n/*   <%= pkg.copyright %> */\n\n',

        // *************************************************************************************
        //      BOWER options
        // *************************************************************************************
        
        bower: {
            install: {
                options: {
                    targetDir: './lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false
                }
            }
        },

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
                      'js/vendors/jquery.js',
                      'js/vendors/underscore.js',
                      //'js/vendors/underscore.string.js',
                      'js/vendors/bootstrap.js',
                      //'js/vendors/backbone.js'
                      'js/vendors/backbone*.js'
                  ],
                  dest: '<%= pkg.target %>/vendors.js'
                },
            js:{
                  src: [
                      'js/evol-*.js',
                      //'js/dico-models/dico--*.js',
                      'js/dico-models/dico-field.js',
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
                  'css/evol-ui.css',
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
    grunt.registerTask('dev', ['concat:js', 'concat:vendors', 'concat:css']);

    // Prod only task(s).
    grunt.registerTask('prod', ['dev', 'uglify']);

};


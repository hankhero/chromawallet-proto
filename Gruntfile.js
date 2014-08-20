module.exports = function(grunt) {
    grunt.initConfig({
        srcPath: '.',
        buildPath: 'build',

        browserify: {
          production: {
            src: ['jsx/index.js'],
            dest: 'build/cw-ui.js',
            options: {
                alias: ['jsx/cc-eng-model.js:models'],
                transform:  [ require('grunt-react').browserify ],
                bundleOptions: {
                    debug: true
                }
            }
          },
          demo: {
            src: ['jsx/index.js'],
            dest: 'build/cw-ui-demo.js',
            options: {
                alias: ['jsx/models-mock.js:models'],
                transform:  [ require('grunt-react').browserify ],
                bundleOptions: {
                    debug: true
                }
            }
          }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    environment: 'production'

                    // raw: "\
                    //     require 'modular-scale'\n\
                    //     project_path = '.'\n\
                    //     preferred_syntax = :scss\n\
                    //     css_dir = './css'\n\
                    //     sass_dir = './sass'\n\
                    //     images_dir = './images'\n\
                    //     relative_assets = true\n\
                    //     line_comments = false\n\
                    // "
                }
            }
        },
        cacheBust: {
          options: {
            algorithm: 'sha1',
            length: 32
            //dir: '.'
          },
          assets: {
              files: [{
                  expand: true,
                  src: ['dist/demo-ui.html', 'dist/demo-eng.html'],
                  dest: 'dist/'
              }]
          }
        },

        copy: {
            build_to_dist: {
                expand: true,
                cwd:'build',
                src:'**',
                dest: 'dist/'
            },
            bower_to_dist: {
                expand: true,
                src:'bower_components/**',
                dest: 'dist/'
            },
            css_to_dist: {
                expand: true,
                src:'css/**',
                dest: 'dist/'
            },
            img_to_dist: {
                expand: true,
                src:'img/**',
                dest: 'dist/'
            },
            fonts_to_dist: {
                expand: true,
                src:'fonts/**',
                dest: 'dist/'
            },
            demo_ui: {
                src: 'html/demo-ui.html',
                dest: 'build/demo-ui.html'
            },
            demo_eng: {
                src: 'html/demo-ui.html',
                dest: 'build/demo-eng.html',
                options: {
                    process: function (content, srcpath) {
                        content = content.replace("cw-ui-demo.js", "cw-ui.js");
                        return content;
                    }
                }
            }
        },
        watch: {
          scripts: {
            files: ['jsx/*.js', '!jsx/*_*.js', '!jsx/\.#*'],
            //Second is to exclude flymake files, third auto-save emacs files
            tasks: ['build'],
            options: {
              spawn: false
            }
          },
          sass: {
            files: ['sass/*.scss','sass/var/*.scss'],
            tasks: ['compass'],
            options: {
              spawn: false
            }
          }
        }
    });
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cache-bust');

    grunt.registerTask('dist', [
        'copy:build_to_dist', 'copy:bower_to_dist',
        'copy:css_to_dist', 'copy:img_to_dist','copy:fonts_to_dist']);

    grunt.registerTask('build', [
                           'browserify:production',
                           'browserify:demo',
                           'copy:demo_ui',
                           'copy:demo_eng',
                           'dist',
                           'cacheBust'
                       ]);

    grunt.registerTask('default', [
                           'build',
                           'connect',
                           'watch'
                       ]);

};

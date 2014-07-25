module.exports = function(grunt) {

    grunt.initConfig({
        srcPath: '.',
        buildPath: 'build',
        
        shell: {
            buildJsx: {
                command: [
                    'jsx -x js <%= srcPath %>/jsx/ <%= buildPath %>/'
                    //,'rm -rf <%= src_path %>/jsx/.module-cache/'
                ].join(' && '),
                stdout: true,
                failOnError: true
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
                          //cwd: 'src',
                          src: ['demo.html']
                          //          dest: 'dest/'
                      }]
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
    
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-bust');

    
    grunt.registerTask('build', [
                           'shell:buildJsx',
                           'cacheBust'
                       ]);

    grunt.registerTask('default', [
                           'build',
                           'connect',
                           'watch'
                       ]);

};

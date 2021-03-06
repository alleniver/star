'use strict';
/**
 * Grunt file for front end js check and minify.
 * Date      : 2015/06/15
 * copyright : (c) hustcer
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        // format: require('eslint-stylish')
      },
      node: {
        options: {
          config: 'eslint.json'
        },
        files: {
          src: ['Gruntfile.js', 'star.js', 'lib/**/*.js', '!node_modules/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('check'  , ['eslint']);
  grunt.registerTask('default', ['eslint']);

};
